import { computed, watch } from 'vue'
import { useUiStore } from '../stores/ui'

export function useCssGenerator(playerComponents: any) {
  const store = useUiStore()

  // Format CSS value based on property type
  const formatCssValue = (value: any, cssProperty: string): string => {
    // Properties that need px unit
    const pixelProperties = ['width', 'height', 'border-radius', 'border-width', 'padding', 'margin', 'font-size', 'line-height']
    
    // Check if it's a number and needs px
    if (typeof value === 'number' && pixelProperties.some(prop => cssProperty.includes(prop))) {
      return `${value}px`
    }
    
    return String(value)
  }

  // Generate CSS from current property changes
  const generateCss = () => {
    const cssLines: string[] = []
    const cssRules: Map<string, Map<string, string>> = new Map()

    // Iterate through all components and features
    playerComponents.forEach((component: any) => {
      component.features?.forEach((feature: any) => {
        const changes = store.getChangedPropsForFeature(feature.id)
        
        Object.entries(changes).forEach(([propId, propData]: [string, any]) => {
          if (!propData.changed) return

          // Find the prop definition
          const prop = feature.props?.find((p: any) => p.id === propId)
          if (!prop) return

          // Skip toggle if it's false (don't include the property)
          if (prop.input.type === 'toggle' && !propData.value) return

          const selector = prop.cssSelector
          const propertyName = prop.cssProperty
          let value = propData.value

          // Handle toggle inputs - use 'hidden' for overflow when true
          if (prop.input.type === 'toggle' && propData.value === true) {
            value = 'hidden'
          }

          // Format value with proper units
          const formattedValue = formatCssValue(value, propertyName)

          // Group rules by selector
          if (!cssRules.has(selector)) {
            cssRules.set(selector, new Map())
          }
          cssRules.get(selector)!.set(propertyName, formattedValue)
        })
      })
    })

    // Build CSS output
    if (cssRules.size === 0) {
      store.updateCssOutput('/* no custom styles */')
    } else {
      cssRules.forEach((properties, selector) => {
        cssLines.push(`${selector} {`)
        properties.forEach((value, property) => {
          cssLines.push(`  ${property}: ${value} !important;`)
        })
        cssLines.push('}')
        cssLines.push('')
      })
      store.updateCssOutput(cssLines.join('\n'))
    }
  }

  // Watch for property changes and regenerate CSS
  watch(
    () => store.propertyChanges,
    () => {
      generateCss()
    },
    { deep: true }
  )

  return {
    generateCss
  }
}
