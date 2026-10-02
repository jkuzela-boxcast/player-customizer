<script setup lang="ts">
import AppHeader from './components/common/AppHeader.vue'
import BoxcastPlayer from './components/BoxcastPlayer.vue'
import LeftSidebar from './components/LeftSidebar.vue'
import RightSidebar from './components/RightSidebar.vue'
</script>

<template>
  <div class="bg-base-300 flex h-screen flex-col">
    <AppHeader />
    <div class="flex min-h-0 flex-1">
      <LeftSidebar />
      <main class="min-w-0 flex-1 overflow-y-auto p-6">
        <!-- The player's own stylesheet assumes a light page background -->
        <div class="rounded-box mx-auto max-w-6xl bg-white p-4 text-black">
          <BoxcastPlayer />
        </div>
      </main>
      <RightSidebar />
    </div>
  </div>
</template>
