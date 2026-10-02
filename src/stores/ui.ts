import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { featureGroups, findSubfeature, isToggleFeature, type FeatureGroup, type StyleProp } from '../config/features'

// number[] is a per-corner radius: [top-left, top-right, bottom-right, bottom-left]
export type PropValue = string | number | boolean | number[]

// Properties that get a px unit when given a plain number
const pixelProperties = ['width', 'height', 'border-radius', 'border-width', 'padding', 'margin', 'font-size']

const formatCssValue = (prop: StyleProp, value: PropValue) => {
  // Toggles are only ever "overflow: hidden" for now
  if (prop.input.type === 'toggle') return 'hidden'
  if (Array.isArray(value)) return value.map((v) => `${v}px`).join(' ')
  if (typeof value === 'number' && pixelProperties.some((p) => prop.cssProperty.includes(p))) return `${value}px`
  return String(value)
}

export const useUiStore = defineStore('ui', () => {
  // Left sidebar navigation
  const selectedGroupId = ref<string | null>(null)
  const selectedSubfeatureId = ref<string | null>(null)

  const selectedGroup = computed(() => featureGroups.find((g) => g.id === selectedGroupId.value) ?? null)
  const selectedSubfeature = computed(() => findSubfeature(selectedSubfeatureId.value))

  const openGroup = (groupId: string | null) => {
    selectedGroupId.value = groupId
    selectedSubfeatureId.value = null
  }

  // Edited values: subfeatureId -> { propId -> value }. Anything in here counts as changed.
  const propertyChanges = ref<Record<string, Record<string, PropValue>>>({})

  // Aspect ratio locks: subfeatureId -> { propId -> locked }
  const aspectRatioLocks = ref<Record<string, Record<string, boolean>>>({})

  const hasChanges = (subfeatureId: string) => Object.keys(propertyChanges.value[subfeatureId] ?? {}).length > 0
  const groupHasChanges = (group: FeatureGroup) => group.subfeatures.some((s) => hasChanges(s.id))

  const updateProperty = (subfeatureId: string, propId: string, value: PropValue) => {
    propertyChanges.value[subfeatureId] ??= {}
    propertyChanges.value[subfeatureId][propId] = value
  }

  const getPropertyValue = (subfeatureId: string, propId: string, defaultValue: PropValue) =>
    propertyChanges.value[subfeatureId]?.[propId] ?? defaultValue

  const toggleAspectRatioLock = (subfeatureId: string, propId: string) => {
    aspectRatioLocks.value[subfeatureId] ??= {}
    aspectRatioLocks.value[subfeatureId][propId] = !aspectRatioLocks.value[subfeatureId][propId]
  }

  const isAspectRatioLocked = (subfeatureId: string, propId: string) =>
    aspectRatioLocks.value[subfeatureId]?.[propId] ?? false

  const resetSubfeature = (subfeatureId: string) => {
    delete propertyChanges.value[subfeatureId]
    delete aspectRatioLocks.value[subfeatureId]
  }

  // On/off subfeatures (Experimental) store an "enabled" flag next to any style edits.
  // Switching off keeps the style edits so switching back on restores them.
  const isPresetEnabled = (subfeatureId: string) => propertyChanges.value[subfeatureId]?.enabled === true

  const setPresetEnabled = (subfeatureId: string, enabled: boolean) => {
    // An exclusive feature (UI Overhaul) replaces everything else
    if (enabled && findSubfeature(subfeatureId)?.exclusive) {
      propertyChanges.value = { [subfeatureId]: { enabled: true } }
      aspectRatioLocks.value = {}
      return
    }
    if (enabled) return updateProperty(subfeatureId, 'enabled', true)
    const changes = propertyChanges.value[subfeatureId]
    if (!changes) return
    delete changes.enabled
    if (Object.keys(changes).length === 0) resetSubfeature(subfeatureId)
  }

  const enabledSubfeatures = computed(() =>
    featureGroups.flatMap((g) => g.subfeatures).filter((s) => isToggleFeature(s) && isPresetEnabled(s.id))
  )

  // While an exclusive feature is on, every other subfeature is locked
  const exclusiveSubfeature = computed(() => enabledSubfeatures.value.find((s) => s.exclusive) ?? null)
  const isLocked = (subfeatureId: string) =>
    !!exclusiveSubfeature.value && exclusiveSubfeature.value.id !== subfeatureId
  const hasOtherChanges = (subfeatureId: string) => Object.keys(propertyChanges.value).some((id) => id !== subfeatureId)

  // Add-on options are stored like props: propertyChanges[subfeatureId][optionId] = true
  const isOptionEnabled = (subfeatureId: string, optionId: string) =>
    propertyChanges.value[subfeatureId]?.[optionId] === true

  const setOptionEnabled = (subfeatureId: string, optionId: string, enabled: boolean) => {
    if (enabled) return updateProperty(subfeatureId, optionId, true)
    const changes = propertyChanges.value[subfeatureId]
    if (!changes) return
    delete changes[optionId]
    if (Object.keys(changes).length === 0) resetSubfeature(subfeatureId)
  }

  // Add-on scripts for enabled features and options, for the preview and the generated JS
  const enabledAddons = computed(() => [
    ...enabledSubfeatures.value.flatMap((s) => (s.addon ? [s.addon] : [])),
    ...featureGroups
      .flatMap((g) => g.subfeatures)
      .flatMap((s) => (s.options ?? []).filter((o) => isOptionEnabled(s.id, o.id)).map((o) => o.addon)),
  ])
  const jsOutput = computed(() => enabledAddons.value.map((a) => a.js.trim()).join('\n\n'))

  const resetAll = () => {
    propertyChanges.value = {}
    aspectRatioLocks.value = {}
  }

  // Generated stylesheet: enabled presets first, so individual property edits can override them,
  // then property edits grouped by selector in config order
  const cssOutput = computed(() => {
    const presets = enabledSubfeatures.value.filter((s) => s.presetCss).map((s) => `/* ${s.label} */\n${s.presetCss}\n`)

    const rules = new Map<string, Map<string, string>>()

    for (const group of featureGroups) {
      for (const subfeature of group.subfeatures) {
        const changes = propertyChanges.value[subfeature.id]
        if (!changes) continue
        // Style edits for an on/off feature only apply while it's on
        if (isToggleFeature(subfeature) && !changes.enabled) continue

        for (const prop of subfeature.props) {
          const value = changes[prop.id]
          if (value === undefined) continue
          if (prop.input.type === 'toggle' && !value) continue

          if (!rules.has(prop.cssSelector)) rules.set(prop.cssSelector, new Map())
          rules.get(prop.cssSelector)!.set(prop.cssProperty, formatCssValue(prop, value))

          const rounded = Array.isArray(value) ? value.some((v) => v > 0) : Number(value) > 0
          if (prop.input.type === 'radius' && prop.input.clip && rounded) {
            rules.get(prop.cssSelector)!.set('overflow', 'hidden')
          }
        }
      }
    }

    const lines: string[] = [...presets]
    rules.forEach((properties, selector) => {
      lines.push(`${selector} {`)
      properties.forEach((value, property) => lines.push(`  ${property}: ${value} !important;`))
      lines.push('}', '')
    })
    return lines.join('\n')
  })

  return {
    selectedGroupId,
    selectedSubfeatureId,
    selectedGroup,
    selectedSubfeature,
    openGroup,
    propertyChanges,
    aspectRatioLocks,
    hasChanges,
    groupHasChanges,
    updateProperty,
    getPropertyValue,
    toggleAspectRatioLock,
    isAspectRatioLocked,
    resetSubfeature,
    isPresetEnabled,
    setPresetEnabled,
    exclusiveSubfeature,
    isLocked,
    hasOtherChanges,
    isOptionEnabled,
    setOptionEnabled,
    enabledAddons,
    jsOutput,
    resetAll,
    cssOutput,
  }
})
