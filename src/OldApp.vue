<script setup lang="ts">
/// src/App.vue
import { Icon } from '@iconify/vue'
import { ref, onMounted, computed } from 'vue'
import BoxcastPlayer from './components/BoxcastPlayer.vue'
import { useResizable } from './composables/useResizable'
import { useCssGenerator } from './composables/useCssGenerator'
import ListItem from './components/ListItem.vue'
import PropertiesPanel from './components/PropertiesPanel.vue'
import { useUiStore } from './stores/ui'
import { menuItems } from './config/menuItems'

const store = useUiStore()

const featureHandle = useResizable(35)
const cssHandle = useResizable(75)

const maxCssLines = 50
const truncatedCss = computed(() => {
  const lines = store.cssOutput.split('\n')
  if (lines.length > maxCssLines) {
    return [...lines.slice(0, maxCssLines), '/* ...output truncated */'].join('\n')
  }
  return store.cssOutput
})

// Initialize CSS generator
const { generateCss } = useCssGenerator(menuItems)

function handleComponentClick(comp: any) {
  if (store.selectedComponent.id === comp.id) {
    store.selectedComponent = {}
    store.selectedFeature = {}
    return
  }
  store.selectedComponent = comp
  store.selectedFeature = {}
}

function handleFeatureClick(feature: any) {
  if (store.selectedFeature.id === feature.id) {
    store.selectedFeature = {}
    return
  }
  store.selectedFeature = feature
}

function handleResetFeature(featureId: string) {
  store.resetFeature(featureId)
  generateCss()
}

function togglePreviewTheme() {
  store.togglePreviewTheme()
}

function handleResetAll() {
  store.resetAll()
  generateCss()
}

function handleCopyCss() {
  navigator.clipboard.writeText(store.cssOutput)
}

function handleDownloadCss() {
  const element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(store.cssOutput))
  element.setAttribute('download', 'custom-styles.css')
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

function dismissDisclaimer() {
  const disclaimer = document.getElementById('support-disclaimer')
  if (disclaimer) {
    disclaimer.style.display = 'none'
  }
}
</script>

<template>
  <!-- 2-column layout discalimer -->
  <div
    id="support-disclaimer"
    class="absolute top-2 right-1/4 left-1/4 flex justify-between rounded-md bg-cyan-600 p-3 text-slate-50 shadow-md shadow-cyan-800">
    <p class="text-center">
      <span class="font-bold">NOTE:</span> Only the 2-Column player layout is supported at this time.
    </p>
    <button
      @click="dismissDisclaimer"
      class="cursor-pointer rounded-lg p-1 hover:bg-cyan-800">
      <Icon icon="fluent:dismiss-12-filled" />
    </button>
  </div>
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
      <div class="flex items-center gap-2">
        <button
          @click="togglePreviewTheme"
          class="flex cursor-pointer items-center gap-2 rounded-md border border-cyan-700 bg-cyan-900 px-2 py-1 text-cyan-300 transition-all hover:border-cyan-400 hover:bg-cyan-800 hover:text-cyan-100">
          <Icon icon="fluent:dark-theme-20-filled" />
          Preview Background
        </button>
        <button
          @click="handleResetAll"
          class="flex cursor-pointer items-center gap-2 rounded-md border border-red-700 bg-red-900 px-2 py-1 text-red-300 transition-all hover:border-red-400 hover:bg-red-800 hover:text-red-100">
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
        class="flex min-w-0 flex-col">
        <!-- components panel -->
        <section
          class="flex flex-col bg-slate-800"
          :style="{ height: featureHandle.topHeight.value + '%' }">
          <h3 class="text-bxblue border-b border-slate-700 bg-slate-900 px-4 py-2">Components</h3>
          <div class="menu flex flex-col overflow-y-auto">
            <ListItem
              v-for="component in menuItems"
              :key="component.label"
              :item-name="component.label"
              :item-description="component.description"
              :item-icon="component.icon"
              :component="component"
              :is-selected="component.id === store.selectedComponent.id"
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
            v-if="Object.keys(store.selectedComponent).length === 0"
            class="flex flex-1 flex-col items-center justify-center gap-4 text-slate-500">
            <Icon
              icon="fluent:arrow-up-32-filled"
              class="size-16" />
            <p>Select an embed component</p>
          </div>
          <div
            v-else
            class="flex flex-col overflow-y-auto">
            <ListItem
              v-for="feature in store.selectedComponent.features"
              :key="feature.label"
              :item-name="feature.label"
              :item-icon="feature.icon || 'fluent:star-16-filled'"
              :item-description="feature.description"
              :item-id="feature.id"
              :is-selected="feature.id === store.selectedFeature.id"
              @click="handleFeatureClick(feature)" />
          </div>
        </section>
      </aside>

      <!-- player preview -->
      <div
        class="flex items-center justify-center gap-8 p-4 text-black"
        :class="store.previewThemeDark ? 'bg-slate-950' : 'bg-slate-100'">
        <BoxcastPlayer class="flex-1" />
      </div>

      <!-- right sidebar -->
      <aside
        :ref="(el) => (cssHandle.containerRef.value = el as HTMLElement)"
        class="flex min-w-0 flex-col">
        <!-- properties panel -->
        <section
          class="flex flex-col bg-slate-800"
          :style="{ height: cssHandle.topHeight.value + '%' }">
          <h3 class="text-bxblue border-b border-slate-700 bg-slate-900 px-4 py-2">Properties</h3>
          <div
            v-if="Object.keys(store.selectedFeature).length === 0"
            class="flex flex-1 flex-col items-center justify-center gap-4 text-slate-500">
            <Icon
              icon="fluent:arrow-left-32-filled"
              class="size-16" />
            <p>Select a component feature</p>
          </div>
          <PropertiesPanel
            v-else
            :feature="store.selectedFeature"
            @reset-feature="handleResetFeature" />
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
                @click="handleCopyCss"
                title="copy CSS"
                class="cursor-pointer rounded-md border border-cyan-700 p-2 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-800 hover:text-cyan-50">
                <Icon icon="fluent:copy-16-filled" />
              </button>
              <button
                @click="handleDownloadCss"
                title="download CSS"
                class="cursor-pointer rounded-md border border-orange-700 p-2 text-orange-300 hover:border-orange-400 hover:bg-orange-800 hover:text-orange-50">
                <Icon icon="fluent:arrow-download-16-filled" />
              </button>
            </div>
          </div>
          <div class="flex h-full p-2">
            <pre class="max-h-32 w-full flex-1 overflow-auto rounded-md bg-slate-900 p-2 text-xs text-slate-300">{{
              truncatedCss
            }}</pre>
          </div>
        </section>
      </aside>
    </main>
  </div>
</template>

<style>
/* ============================================================
   MODERN THIN SCROLLBARS — Vue 3 App
   Covers: WebKit (Chrome, Safari, Edge), Firefox, and future
   standard properties. Drop into your App.vue <style> or a
   global CSS file imported in main.js / main.ts
   ============================================================ */

/* ──────────────────────────────────────────────────────────────
   1. FIREFOX  (standards-based)
   ────────────────────────────────────────────────────────────── */
* {
  scrollbar-width: thin; /* "auto" | "thin" | "none" */
  scrollbar-color: #888 transparent; /* thumb  track */
}

/* ──────────────────────────────────────────────────────────────
   2. WEBKIT / BLINK  (Chrome, Edge, Safari, Opera)
   ────────────────────────────────────────────────────────────── */

/* 2a. Overall scrollbar size */
::-webkit-scrollbar {
  width: 6px; /* vertical scrollbar width   */
  height: 6px; /* horizontal scrollbar height */
}

/* 2b. The track (the groove the thumb slides in) */
::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 999px;
}

/* 2c. The draggable thumb */
::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 999px;
  border: 2px solid transparent; /* creates padding around thumb */
  background-clip: content-box; /* keeps colour inside the border */
  transition: background-color 0.2s ease;
}

/* 2d. Thumb on hover */
::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

/* 2e. Thumb while being dragged */
::-webkit-scrollbar-thumb:active {
  background-color: #333;
}

/* 2f. The corner where vertical + horizontal scrollbars meet */
::-webkit-scrollbar-corner {
  background: transparent;
}

/* 2g. The increment / decrement buttons (arrows) — hide them */
::-webkit-scrollbar-button {
  display: none;
  width: 0;
  height: 0;
}

/* ──────────────────────────────────────────────────────────────
   3. DARK MODE  — auto-switches via prefers-color-scheme
   ────────────────────────────────────────────────────────────── */
@media (prefers-color-scheme: dark) {
  * {
    scrollbar-color: #555 transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #555;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #888;
  }

  ::-webkit-scrollbar-thumb:active {
    background-color: #aaa;
  }
}

/* ──────────────────────────────────────────────────────────────
   4. HIDE scrollbars entirely on specific elements
      (content still scrollable — great for carousels / sidebars)
   ────────────────────────────────────────────────────────────── */
.scrollbar-hidden {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE / Edge legacy */
}

.scrollbar-hidden::-webkit-scrollbar {
  display: none; /* WebKit */
}

/* ──────────────────────────────────────────────────────────────
   5. OVERLAY scrollbars — only appear on hover
      Apply class="scrollbar-overlay" to any scrollable container
   ────────────────────────────────────────────────────────────── */
.scrollbar-overlay {
  overflow: auto;
}

.scrollbar-overlay::-webkit-scrollbar-thumb {
  background-color: transparent;
  transition: background-color 0.3s ease;
}

.scrollbar-overlay:hover::-webkit-scrollbar-thumb {
  background-color: #888;
}

/* ──────────────────────────────────────────────────────────────
   6. ACCENT-COLOURED scrollbars
      Use a CSS variable so Vue components can override the colour
      e.g. <div class="scrollbar-accent" style="--sb-color: #6366f1">
   ────────────────────────────────────────────────────────────── */
.scrollbar-accent {
  --sb-color: #6366f1; /* default: indigo — override per element */
  scrollbar-color: var(--sb-color) transparent;
}

.scrollbar-accent::-webkit-scrollbar-thumb {
  background-color: var(--sb-color);
}

.scrollbar-accent::-webkit-scrollbar-thumb:hover {
  filter: brightness(1.2);
}

/* ──────────────────────────────────────────────────────────────
   7. EXTRA THIN variant (4 px) for dense UI panels
   ────────────────────────────────────────────────────────────── */
.scrollbar-xs::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

/* ──────────────────────────────────────────────────────────────
   8. SMOOTH SCROLLING — good companion rule
   ────────────────────────────────────────────────────────────── */
html {
  scroll-behavior: smooth;
}

/* ──────────────────────────────────────────────────────────────
   9. MOMENTUM SCROLLING for iOS / touch (Safari on iPhone/iPad)
   ────────────────────────────────────────────────────────────── */
.scroll-touch {
  -webkit-overflow-scrolling: touch;
}
</style>
