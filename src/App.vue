<script setup lang="ts">
/// src/App.vue
import { Icon } from '@iconify/vue'
import { ref, onMounted, computed } from 'vue'
import BoxcastPlayer from './components/BoxcastPlayer.vue'
import { useResizable } from './composables/useResizable'
import ListItem from './components/ListItem.vue'
import { useUiStore } from './stores/ui'

const store = useUiStore()

const featureHandle = useResizable(35)
const cssHandle = useResizable(75)

const playerComponents = ref([
  {
    label: 'Video Player',
    id: 'video-player',
    description: 'The video player itself.',
    icon: 'fluent:filmstrip-play-16-filled',
    features: [
      {
        label: 'Large Play Button',
        id: 'large-play-button',
        description: 'Play button visible when player first loads.',
      },
    ],
  },
  {
    label: 'Description Box',
    id: 'description-box',
    description: 'The description box below the video player.',
    icon: 'fluent:text-description-16-filled',
    features: [
      {
        label: 'Broadcast Title',
        id: 'description-broadcast-title',
        description: 'Name of the broadcast',
      },
    ],
  },
  {
    label: 'Related Videos',
    id: 'related-videos',
    description: 'The playlist for viewing other broadcasts in the channel.',
    icon: 'fluent:text-bullet-list-square-16-filled',
    features: [
      {
        label: 'Heading Text',
        id: 'playlist-heading-text',
        description: "'Related Videos text'",
      },
    ],
  },
  {
    label: 'Viewer Chat',
    id: 'viewer-chat',
    description: 'The window for viewer chat messages.',
    icon: 'fluent:people-chat-20-filled',
  },
])

function handleComponentClick(comp: any) {
  store.selectedComponent = comp
}
</script>

<template>
  <div class="flex h-screen flex-col">
    <header class="flex items-center justify-between border-b border-slate-700 bg-slate-900 px-4 py-2 text-slate-50">
      <div class="flex items-center gap-2">
        <Icon
          class="text-bxblue"
          icon="fluent:code-16-filled" />
        <h1 class="text-bxblue">Embed Style Editor</h1>
        <span>|</span>
        <h2>CSS Generator</h2>
      </div>
      <div>
        <button
          class="flex cursor-pointer items-center gap-2 rounded-md border px-2 py-1 text-slate-700 hover:text-red-400 hover:text-shadow-2xs hover:text-shadow-red-500">
          <Icon icon="fluent:arrow-reset-24-filled" />
          Reset All
        </button>
      </div>
    </header>

    <!-- main grid -->
    <main class="grid flex-1 grid-cols-[2fr_8fr_2fr] text-slate-50">
      <!-- left sidebar -->
      <aside
        :ref="(el) => (featureHandle.containerRef.value = el as HTMLElement)"
        class="flex flex-col">
        <!-- components panel -->
        <section
          class="flex flex-col bg-slate-800"
          :style="{ height: featureHandle.topHeight.value + '%' }">
          <h3 class="text-bxblue border-b border-slate-700 bg-slate-900 px-4 py-2">Components</h3>
          <div class="flex flex-col overflow-y-auto">
            <ListItem
              v-for="component in playerComponents"
              :key="component.label"
              :item-name="component.label"
              :item-description="component.description"
              :item-icon="component.icon"
              @click="handleComponentClick(component)" />
          </div>
        </section>

        <!-- drag handle -->
        <div
          class="group relative z-10 flex h-1.5 cursor-row-resize items-center justify-center bg-slate-700 transition-all hover:py-2"
          :class="featureHandle.isDragging.value ? 'bg-purple-500!' : ''"
          @mousedown="featureHandle.onMouseDown"
          @dblclick="featureHandle.onDblClick">
          <!-- grip indicator -->
          <div class="flex gap-0.5 opacity-50 group-hover:opacity-100">
            <span class="h-0.5 w-3 rounded-full bg-slate-300" />
            <span class="h-0.5 w-3 rounded-full bg-slate-300" />
          </div>
        </div>

        <!-- features panel -->
        <section class="flex flex-1 flex-col overflow-hidden bg-slate-800">
          <h3 class="text-bxblue border-b border-slate-700 bg-slate-900 px-4 py-2">Features</h3>
          <div
            v-if="store.selectedComponent === 'none'"
            class="flex flex-1 flex-col items-center justify-center gap-4 text-slate-500">
            <Icon
              icon="fluent:arrow-up-32-filled"
              class="size-16" />
            <p>Select an embed component</p>
          </div>
          <div v-else-if="store.selectedComponent?.features">
            <div v-for="feature in store.selectedComponent?.features">
              <p>{{ feature.label }}</p>
            </div>
          </div>
        </section>
      </aside>

      <!-- player preview -->
      <div class="flex items-center justify-center p-4 text-black">
        <BoxcastPlayer class="flex-1" />
      </div>

      <!-- right sidebar -->
      <aside
        :ref="(el) => (cssHandle.containerRef.value = el as HTMLElement)"
        class="flex flex-col">
        <!-- properties panel -->
        <section
          class="flex flex-col bg-slate-800"
          :style="{ height: cssHandle.topHeight.value + '%' }">
          <h3 class="text-bxblue border-b border-slate-700 bg-slate-900 px-4 py-2">Properties</h3>
          <div class="flex flex-col overflow-y-auto"></div>
        </section>

        <!-- drag handle -->
        <div
          class="group relative z-10 flex h-1.5 cursor-row-resize items-center justify-center bg-slate-700 transition-all hover:py-2"
          :class="cssHandle.isDragging.value ? 'bg-purple-500!' : ''"
          @mousedown="cssHandle.onMouseDown"
          @dblclick="cssHandle.onDblClick">
          <!-- grip indicator -->
          <div class="flex gap-0.5 opacity-50 group-hover:opacity-100">
            <span class="h-0.5 w-3 rounded-full bg-slate-300" />
            <span class="h-0.5 w-3 rounded-full bg-slate-300" />
          </div>
        </div>

        <!-- css output panel -->
        <section class="flex flex-1 flex-col overflow-hidden bg-slate-800">
          <div class="flex items-center justify-between border-b border-slate-700 bg-slate-900">
            <h3 class="text-bxblue px-4 py-2">CSS Output</h3>
            <div class="flex items-center gap-2">
              <button
                title="copy CSS"
                class="cursor-pointer rounded-md border border-cyan-700 p-2 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-800 hover:text-cyan-50">
                <Icon icon="fluent:copy-16-filled" />
              </button>
              <button
                title="download CSS"
                class="cursor-pointer rounded-md border border-orange-700 p-2 text-orange-300 hover:border-orange-400 hover:bg-orange-800 hover:text-orange-50">
                <Icon icon="fluent:arrow-download-16-filled" />
              </button>
            </div>
          </div>
          <div class="flex h-full p-2">
            <pre class="flex-1 rounded-md bg-slate-900 p-2 text-xs">/* no custom styles */</pre>
          </div>
        </section>
      </aside>
    </main>
  </div>
</template>
