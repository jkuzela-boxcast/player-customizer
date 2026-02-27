<script setup lang="ts">
declare const boxcast: any;

import { onMounted } from "vue";

const CHANNEL_ID = "sb1fihbcionbdcymi7tp";

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

onMounted(() => {
  const script = document.createElement("script");
  script.src = "//js.boxcast.com/v3.min.js";
  script.onload = () => {
    boxcast
      .noConflict()(`#boxcast-widget-${CHANNEL_ID}`)
      .loadChannel(CHANNEL_ID, playerOptions);
  };
  document.body.appendChild(script);
});
</script>

<template>
  <div :id="`boxcast-widget-${CHANNEL_ID}`"></div>
</template>
