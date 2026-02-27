<script setup lang="ts">
/// src/components/ListItem.vue

import { Icon } from '@iconify/vue'

const props = defineProps<{
  itemName: string
  itemDescription: string
  itemIcon: string
}>()
</script>

<template>
  <div
    class="group flex cursor-pointer items-center justify-between gap-2 border-b border-slate-700 px-2 py-3 transition-all hover:bg-slate-700 hover:pl-2">
    <div class="flex items-center gap-4">
      <Icon
        class="size-10 shrink-0 rounded-md bg-slate-900 p-1.5 text-slate-400"
        :icon="itemIcon" />
      <div class="flex flex-col justify-center gap-1">
        <h4 class="group-hover:text-bxblue text-sm font-semibold group-hover:underline">{{ itemName }}</h4>
        <p
          :title="itemDescription"
          class="line-clamp-1 pr-4 font-mono text-xs">
          {{ itemDescription }}
        </p>
      </div>
    </div>
    <span class="bg-bxblue size-2 shrink-0 -translate-x-full rounded-full"></span>
  </div>
</template>

<style scoped></style>
