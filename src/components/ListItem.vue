<script setup lang="ts">
/// src/components/ListItem.vue

import { Icon } from '@iconify/vue'
import { useUiStore } from '../stores/ui'
import { computed } from 'vue'

const props = defineProps<{
  itemName: string
  itemDescription: string
  itemIcon: string
  itemId?: string
  component?: any
  isSelected?: boolean
}>()

const store = useUiStore()

// Check if this item has changes
const showBadge = computed(() => {
  if (props.component) {
    // For components, check if any feature has changes
    return store.componentHasChanges(props.component)
  } else if (props.itemId) {
    // For features, check the specific feature
    return store.hasChanges(props.itemId)
  }
  return false
})
</script>

<template>
  <div
    class="group flex cursor-pointer items-center justify-between gap-2 border-b border-slate-700 px-2 py-3 transition-all hover:bg-slate-700 hover:pl-2"
    :class="{ 'bg-slate-700 pl-2 border-l-2 border-l-bxblue': isSelected }">
    <div class="flex items-center gap-4">
      <Icon
        class="size-10 shrink-0 rounded-md bg-slate-900 p-1.5 text-slate-400"
        :icon="itemIcon" />
      <div class="flex flex-col justify-center gap-1">
        <h4 class="group-hover:text-bxblue text-sm font-semibold group-hover:underline" :class="{ 'text-bxblue': isSelected }">{{ itemName }}</h4>
        <p
          :title="itemDescription"
          class="line-clamp-1 pr-4 font-mono text-xs">
          {{ itemDescription }}
        </p>
      </div>
    </div>
    <span 
      v-if="showBadge"
      class="bg-bxblue size-2 shrink-0 rounded-full transition-all"></span>
    <span 
      v-else
      class=""></span>
  </div>
</template>

<style scoped></style>
