<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import Sidebar from './layout/Sidebar.vue'
import { featureGroups, type FeatureGroup } from '../config/features'
import { useUiStore } from '../stores/ui'

const store = useUiStore()

// Slide forward (from right) when opening a group, backward (from left) when going back
const direction = ref<'forward' | 'back'>('forward')

const openGroup = (groupId: string) => {
  direction.value = 'forward'
  store.openGroup(groupId)
}

// While an exclusive feature (UI Overhaul) is on, only its own group can be opened
const isGroupLocked = (group: FeatureGroup) =>
  !!store.exclusiveSubfeature && !group.subfeatures.some((s) => s.id === store.exclusiveSubfeature!.id)

const goBack = () => {
  direction.value = 'back'
  store.openGroup(null)
}
</script>

<template>
  <Sidebar
    side="left"
    label="Features"
    icon="fluent:apps-list-20-regular"
    :default-width="300">
    <template #header>
      <Transition
        mode="out-in"
        enter-active-class="transition-opacity duration-150"
        leave-active-class="transition-opacity duration-150"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0">
        <div
          v-if="store.selectedGroup"
          key="group"
          class="flex min-w-0 items-center gap-1">
          <button
            class="btn btn-ghost btn-sm btn-square"
            title="Back to all features"
            @click="goBack">
            <Icon
              icon="fluent:arrow-left-20-regular"
              class="size-5" />
          </button>
          <span class="truncate text-sm font-semibold">{{ store.selectedGroup.label }}</span>
        </div>
        <span
          v-else
          key="root"
          class="truncate px-1 text-sm font-semibold">
          Features
        </span>
      </Transition>
    </template>

    <div class="relative min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
      <Transition
        mode="out-in"
        enter-active-class="transition duration-200 ease-out"
        leave-active-class="transition duration-150 ease-in"
        :enter-from-class="direction === 'forward' ? 'translate-x-8 opacity-0' : '-translate-x-8 opacity-0'"
        :leave-to-class="direction === 'forward' ? '-translate-x-8 opacity-0' : 'translate-x-8 opacity-0'">
        <!-- Level 2: subfeatures in the selected group -->
        <div
          v-if="store.selectedGroup"
          :key="store.selectedGroup.id">
          <p
            v-if="store.selectedGroup.renderNote"
            class="text-base-content/60 mx-3 mt-3 flex gap-2 text-xs">
            <Icon
              icon="fluent:info-16-regular"
              class="mt-px size-4 shrink-0" />
            {{ store.selectedGroup.renderNote }}
          </p>
          <ul class="menu w-full gap-1">
            <li
              v-for="sub in store.selectedGroup.subfeatures"
              :key="sub.id">
              <button
                class="flex items-center gap-3 py-2"
                :class="{
                  'menu-active': store.selectedSubfeatureId === sub.id,
                  'menu-disabled': store.isLocked(sub.id),
                }"
                :disabled="store.isLocked(sub.id)"
                @click="store.selectedSubfeatureId = sub.id">
                <Icon
                  :icon="sub.icon"
                  class="size-5 shrink-0" />
                <span class="flex min-w-0 flex-1 flex-col items-start">
                  <span class="font-medium">{{ sub.label }}</span>
                  <span class="line-clamp-1 text-xs opacity-60">{{ sub.description }}</span>
                </span>
                <Icon
                  v-if="store.isLocked(sub.id)"
                  icon="fluent:lock-closed-16-regular"
                  class="size-4 shrink-0 opacity-60" />
                <span
                  v-else-if="store.hasChanges(sub.id)"
                  class="status status-primary"
                  title="Has changes" />
              </button>
            </li>
          </ul>
        </div>

        <!-- Level 1: feature groups -->
        <ul
          v-else
          key="root"
          class="menu w-full gap-1">
          <li
            v-for="group in featureGroups"
            :key="group.id">
            <button
              class="group flex items-center gap-3 py-3"
              :class="{ 'menu-disabled': isGroupLocked(group) }"
              :disabled="isGroupLocked(group)"
              @click="openGroup(group.id)">
              <Icon
                :icon="group.icon"
                class="text-primary size-6 shrink-0" />
              <span class="flex min-w-0 flex-1 flex-col items-start">
                <span class="font-semibold">{{ group.label }}</span>
                <span class="line-clamp-1 text-xs opacity-60">{{ group.description }}</span>
              </span>
              <span
                v-if="store.groupHasChanges(group)"
                class="status status-primary"
                title="Has changes" />
              <Icon
                v-if="isGroupLocked(group)"
                icon="fluent:lock-closed-16-regular"
                class="size-4 shrink-0 opacity-60" />
              <Icon
                v-else
                icon="fluent:chevron-right-20-regular"
                class="size-4 shrink-0 opacity-40 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100" />
            </button>
          </li>
        </ul>
      </Transition>
    </div>
  </Sidebar>
</template>
