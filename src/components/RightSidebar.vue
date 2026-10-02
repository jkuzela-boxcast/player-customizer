<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import Sidebar from './layout/Sidebar.vue'
import PropertiesPanel from './PropertiesPanel.vue'
import { useUiStore } from '../stores/ui'

const store = useUiStore()

// Generated output: the stylesheet, plus add-on scripts when an enabled feature needs one
const outputs = {
  css: { label: 'CSS', file: 'boxcast-player-styles.css', type: 'text/css', empty: '/* No custom styles yet */' },
  js: { label: 'JS', file: 'boxcast-player-addons.js', type: 'text/javascript', empty: '// No add-on scripts needed' },
}
const activeOutput = ref<keyof typeof outputs>('css')
const outputText = computed(() => (activeOutput.value === 'css' ? store.cssOutput : store.jsOutput))

// Fall back to CSS when the last add-on is switched off
watch(
  () => store.jsOutput,
  (js) => {
    if (!js) activeOutput.value = 'css'
  }
)

const copied = ref(false)

const copyOutput = async () => {
  await navigator.clipboard.writeText(outputText.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}

const downloadOutput = () => {
  const output = outputs[activeOutput.value]
  const url = URL.createObjectURL(new Blob([outputText.value], { type: output.type }))
  const a = document.createElement('a')
  a.href = url
  a.download = output.file
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <Sidebar
    side="right"
    label="Styles"
    icon="fluent:paint-brush-20-regular"
    :default-width="360">
    <template #header>
      <span class="truncate px-1 text-sm font-semibold">
        {{ store.selectedSubfeature ? store.selectedSubfeature.label : 'Styles' }}
      </span>
    </template>

    <!-- Style inputs for the selected subfeature -->
    <section class="min-h-0 flex-1 overflow-y-auto">
      <PropertiesPanel
        v-if="store.selectedSubfeature"
        :subfeature="store.selectedSubfeature" />
      <div
        v-else
        class="text-base-content/50 flex h-full flex-col items-center justify-center gap-3 p-6 text-center text-sm">
        <Icon
          icon="fluent:cursor-click-20-regular"
          class="size-10" />
        Select a feature on the left to start customizing it.
      </div>
    </section>

    <!-- Generated output -->
    <section class="border-base-300 flex h-2/5 min-h-48 shrink-0 flex-col border-t">
      <div class="flex items-center gap-1 px-3 py-2">
        <div
          role="tablist"
          class="tabs tabs-box tabs-xs flex-1">
          <button
            v-for="(output, key) in outputs"
            :key="key"
            role="tab"
            class="tab gap-1"
            :class="{ 'tab-active': activeOutput === key }"
            :disabled="key === 'js' && !store.jsOutput"
            @click="activeOutput = key">
            {{ output.label }}
            <span
              v-if="key === 'js' && store.jsOutput"
              class="badge badge-primary badge-xs">
              {{ store.enabledAddons.length }}
            </span>
          </button>
        </div>
        <button
          class="btn btn-ghost btn-xs"
          :disabled="!store.cssOutput && !store.jsOutput"
          title="Reset all styles and features"
          @click="store.resetAll()">
          <Icon icon="fluent:arrow-reset-20-regular" />
          Reset
        </button>
        <button
          class="btn btn-ghost btn-xs"
          :disabled="!outputText"
          @click="copyOutput">
          <Icon :icon="copied ? 'fluent:checkmark-20-regular' : 'fluent:copy-20-regular'" />
          {{ copied ? 'Copied' : 'Copy' }}
        </button>
        <button
          class="btn btn-primary btn-xs"
          :disabled="!outputText"
          :title="`Download ${outputs[activeOutput].file}`"
          @click="downloadOutput">
          <Icon icon="fluent:arrow-download-20-regular" />
          Download
        </button>
      </div>
      <p
        v-if="activeOutput === 'js'"
        class="text-base-content/60 mx-3 mb-2 text-xs">
        Add to the page in a &lt;script&gt; tag (plus the CSS, if there is any). It can go before or after the BoxCast
        player script; it waits for the player to render.
      </p>
      <pre
        class="bg-base-200 rounded-box mx-3 mb-3 min-h-0 flex-1 overflow-auto p-3 font-mono text-xs"><code v-if="outputText">{{ outputText }}</code><code
          v-else
          class="opacity-50">{{ outputs[activeOutput].empty }}</code></pre>
    </section>
  </Sidebar>
</template>
