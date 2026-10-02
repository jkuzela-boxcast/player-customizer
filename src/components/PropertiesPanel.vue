<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useUiStore } from '../stores/ui'
import { isToggleFeature, type StyleProp, type Subfeature } from '../config/features'
import PropertyInput from './PropertyInput.vue'

const props = defineProps<{
  subfeature: Subfeature
}>()

const store = useUiStore()

const onToggle = (e: Event) => {
  const checkbox = e.target as HTMLInputElement
  const id = props.subfeature.id
  if (
    checkbox.checked &&
    props.subfeature.exclusive &&
    store.hasOtherChanges(id) &&
    !window.confirm(`Enabling ${props.subfeature.label} resets all other customizations. Continue?`)
  ) {
    checkbox.checked = false
    return
  }
  store.setPresetEnabled(id, checkbox.checked)
}

// Group properties by their group field, keeping config order
const groupedProps = computed(() => {
  const groups: Record<string, StyleProp[]> = {}
  for (const prop of props.subfeature.props) {
    ;(groups[prop.group] ??= []).push(prop)
  }
  return groups
})
</script>

<template>
  <div class="flex flex-col">
    <p class="text-base-content/60 px-4 pt-3 text-xs">{{ subfeature.description }}</p>

    <div
      v-if="store.isLocked(subfeature.id)"
      class="text-base-content/60 flex flex-col items-center gap-3 p-8 text-center text-sm">
      <Icon
        icon="fluent:lock-closed-20-regular"
        class="size-10" />
      Locked while {{ store.exclusiveSubfeature?.label }} is enabled.
    </div>

    <div
      v-else-if="isToggleFeature(subfeature)"
      class="flex flex-col gap-3 p-4">
      <label class="label text-base-content cursor-pointer justify-between text-sm font-medium">
        Enable {{ subfeature.label }}
        <input
          type="checkbox"
          class="toggle toggle-primary"
          :checked="store.isPresetEnabled(subfeature.id)"
          @change="onToggle" />
      </label>
      <div
        v-if="subfeature.exclusive"
        role="alert"
        class="alert alert-soft alert-warning px-3 py-2 text-xs">
        <Icon
          icon="fluent:warning-16-filled"
          class="size-5 shrink-0" />
        Replaces the player's whole design. Enabling it resets all other customizations and locks them while it's on.
      </div>
      <div
        v-if="subfeature.addon"
        role="alert"
        class="alert alert-soft alert-info px-3 py-2 text-xs">
        <Icon
          icon="fluent:code-js-16-filled"
          class="size-5 shrink-0" />
        Needs an add-on script. When enabled, it's included in the JS tab of the generated output.
      </div>
      <details
        v-if="subfeature.presetCss"
        class="collapse-arrow bg-base-200 rounded-box collapse">
        <summary class="collapse-title min-h-0 py-2 text-xs">CSS applied</summary>
        <pre class="collapse-content overflow-x-auto font-mono text-xs">{{ subfeature.presetCss }}</pre>
      </details>
    </div>

    <div
      v-else-if="subfeature.props.length === 0"
      class="text-base-content/50 flex flex-col items-center gap-3 p-8 text-sm">
      <Icon
        icon="fluent:wrench-settings-20-regular"
        class="size-10" />
      No style controls yet.
    </div>

    <fieldset
      v-if="subfeature.options?.length && !store.isLocked(subfeature.id)"
      class="fieldset border-base-300 gap-3 border-b px-4 py-3">
      <legend class="fieldset-legend text-base-content/60 text-xs uppercase">Options</legend>
      <label
        v-for="option in subfeature.options"
        :key="option.id"
        class="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          class="toggle toggle-primary toggle-sm mt-0.5"
          :checked="store.isOptionEnabled(subfeature.id, option.id)"
          @change="store.setOptionEnabled(subfeature.id, option.id, ($event.target as HTMLInputElement).checked)" />
        <span class="flex flex-col gap-0.5">
          <span class="text-base-content flex items-center gap-1.5 text-xs font-medium">
            {{ option.label }}
            <span
              class="badge badge-soft badge-info badge-xs"
              title="Needs an add-on script, included in the JS tab of the generated output">
              JS
            </span>
          </span>
          <span class="text-base-content/60 text-xs">{{ option.description }}</span>
        </span>
      </label>
    </fieldset>

    <fieldset
      v-for="(groupProps, groupName) in groupedProps"
      :key="groupName"
      class="fieldset border-base-300 gap-3 border-b px-4 py-3"
      :disabled="
        (isToggleFeature(subfeature) && !store.isPresetEnabled(subfeature.id)) || store.isLocked(subfeature.id)
      ">
      <legend class="fieldset-legend text-base-content/60 text-xs uppercase">{{ groupName }}</legend>
      <PropertyInput
        v-for="prop in groupProps"
        :key="prop.id"
        :prop="prop"
        :subfeature-id="subfeature.id"
        :all-props="subfeature.props" />
    </fieldset>

    <div
      v-if="subfeature.props.length > 0"
      class="p-4">
      <button
        class="btn btn-outline btn-error btn-sm w-full"
        :disabled="!store.hasChanges(subfeature.id)"
        @click="store.resetSubfeature(subfeature.id)">
        <Icon icon="fluent:arrow-reset-20-regular" />
        Reset {{ subfeature.label }}
      </button>
    </div>
  </div>
</template>
