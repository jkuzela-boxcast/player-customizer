import { defineStore } from 'pinia'
import { ref } from 'vue'

interface PropertyValue {
  value: any
  changed: boolean
}

interface FeatureChanges {
  [propId: string]: PropertyValue
}

export const useUiStore = defineStore('ui', () => {
  const selectedComponent = ref({} as any)
  const selectedFeature = ref({} as any)
  
  // Track changes: featureId -> { propId -> { value, changed } }
  const propertyChanges = ref<{ [featureId: string]: FeatureChanges }>({})
  
  // Track aspect ratio locks: featureId -> { propId: boolean }
  const aspectRatioLocks = ref<{ [featureId: string]: { [propId: string]: boolean } }>({})
  
  const cssOutput = ref<string>('')

  // Get all props that have been changed for a feature
  const getChangedPropsForFeature = (featureId: string) => {
    return propertyChanges.value[featureId] || {}
  }

  // Check if a feature has any changed properties
  const hasChanges = (featureId: string) => {
    const changes = getChangedPropsForFeature(featureId)
    return Object.values(changes).some((prop: PropertyValue) => prop.changed === true)
  }

  // Check if a component has any changed features
  const componentHasChanges = (component: any) => {
    return component.features?.some((feature: any) => hasChanges(feature.id))
  }

  // Update a property value
  const updateProperty = (featureId: string, propId: string, value: any) => {
    if (!propertyChanges.value[featureId]) {
      propertyChanges.value[featureId] = {}
    }
    propertyChanges.value[featureId][propId] = {
      value,
      changed: true
    }
  }

  // Get the current value of a property
  const getPropertyValue = (featureId: string, propId: string, defaultValue: any) => {
    const featureChanges = propertyChanges.value[featureId]
    if (featureChanges && featureChanges[propId]) {
      return featureChanges[propId].value
    }
    return defaultValue
  }

  // Toggle aspect ratio lock
  const toggleAspectRatioLock = (featureId: string, propId: string) => {
    if (!aspectRatioLocks.value[featureId]) {
      aspectRatioLocks.value[featureId] = {}
    }
    aspectRatioLocks.value[featureId][propId] = !aspectRatioLocks.value[featureId][propId]
  }

  // Check if aspect ratio is locked
  const isAspectRatioLocked = (featureId: string, propId: string) => {
    return aspectRatioLocks.value[featureId]?.[propId] ?? false
  }

  // Reset a feature's properties
  const resetFeature = (featureId: string) => {
    delete propertyChanges.value[featureId]
    delete aspectRatioLocks.value[featureId]
  }

  // Reset all properties
  const resetAll = () => {
    propertyChanges.value = {}
    aspectRatioLocks.value = {}
    cssOutput.value = ''
  }

  // Update CSS output
  const updateCssOutput = (css: string) => {
    cssOutput.value = css
  }

  return {
    selectedComponent,
    selectedFeature,
    propertyChanges,
    cssOutput,
    aspectRatioLocks,
    getChangedPropsForFeature,
    hasChanges,
    componentHasChanges,
    updateProperty,
    getPropertyValue,
    toggleAspectRatioLock,
    isAspectRatioLocked,
    resetFeature,
    resetAll,
    updateCssOutput
  }
})
