<script setup lang="ts">
declare const boxcast: any;

import { onMounted, ref, watch } from "vue";
import { useUiStore } from '../stores/ui'

const CHANNEL_ID = "sb1fihbcionbdcymi7tp";
const styleElementId = "boxcast-custom-styles"
const store = useUiStore()

const playerOptions = {
  market: "internal",
  defaultVideo: "next",
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

  layout: "playlist-to-right",
};

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
  
  // Update the CSS content
  // Filter out the placeholder comment
  const cleanCss = css === '/* no custom styles */' ? '' : css
  styleElement.textContent = cleanCss
}

onMounted(() => {
  const script = document.createElement("script");
  script.src = "//js.boxcast.com/v3.min.js";
  script.onload = () => {
    boxcast
      .noConflict()(`#boxcast-widget-${CHANNEL_ID}`)
      .loadChannel(CHANNEL_ID, playerOptions);
  };
  document.body.appendChild(script);
  
  // Inject any existing styles from the store
  if (store.cssOutput && store.cssOutput !== '/* no custom styles */') {
    injectCustomStyles(store.cssOutput)
  }
});
</script>

<template>
  <div :id="`boxcast-widget-${CHANNEL_ID}`"></div>
</template>
