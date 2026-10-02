<script setup lang="ts">
declare const boxcast: any

import { onMounted, ref, watch } from 'vue'
import { useUiStore } from '../stores/ui'

const CHANNEL_ID = 'sb1fihbcionbdcymi7tp'
const styleElementId = 'boxcast-custom-styles'
const store = useUiStore()

const playerOptions = {
  market: 'internal',
  defaultVideo: 'next',
  playInline: false,
  dvr: true,

  showTitle: true,
  showDescription: true,
  showHighlights: true,
  showRelated: true,
  showCountdown: true,
  showDonations: true,
  showDocuments: true,
  showIndex: true,
  showChat: true,
  hidePreBroadcastTextOverlay: false,

  layout: 'playlist-to-right',
}

// Watch for CSS changes and inject them
watch(
  () => store.cssOutput,
  (newCss) => {
    injectCustomStyles(newCss)
  }
)

const injectCustomStyles = (css: string) => {
  let styleElement = document.getElementById(styleElementId) as HTMLStyleElement

  // Create style element if it doesn't exist
  if (!styleElement) {
    styleElement = document.createElement('style')
    styleElement.id = styleElementId
    document.head.appendChild(styleElement)
  }

  styleElement.textContent = css
}

// Run add-on scripts for enabled features, and tear them down when switched off.
// Each add-on registers `window.BoxcastAddons[name] = { destroy }` and waits for the player on its own,
// so it doesn't matter whether it runs before or after the player has rendered.
const runAddons = (addons: { name: string; js: string }[]) => {
  const registry = ((window as any).BoxcastAddons ??= {})
  const wanted = new Set(addons.map((a) => a.name))

  for (const name of Object.keys(registry)) {
    if (!wanted.has(name)) registry[name].destroy?.()
  }
  for (const addon of addons) {
    if (registry[addon.name]) continue
    const script = document.createElement('script')
    script.textContent = addon.js
    document.body.appendChild(script)
    script.remove() // already executed
  }
}

watch(() => store.enabledAddons, runAddons)

onMounted(() => {
  runAddons(store.enabledAddons)

  const script = document.createElement('script')
  script.src = '//js.boxcast.com/v3.min.js'
  script.onload = () => {
    boxcast.noConflict()(`#boxcast-widget-${CHANNEL_ID}`).loadChannel(CHANNEL_ID, playerOptions)
  }
  document.body.appendChild(script)

  // Inject any existing styles from the store
  injectCustomStyles(store.cssOutput)
})
</script>

<template>
  <div :id="`boxcast-widget-${CHANNEL_ID}`"></div>
</template>
