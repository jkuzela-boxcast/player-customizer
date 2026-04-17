<script setup lang="ts">
import { ref } from 'vue'

import { Icon } from '@iconify/vue'

import AppHeader from './components/common/AppHeader.vue'
import BoxcastPlayer from './components/BoxcastPlayer.vue'

const selectedEl = ref('')
</script>

<template>
  <div class="bg-base-300 flex h-screen flex-col">
    <AppHeader />
    <section class="divide-base-300 grid flex-1 grid-cols-3 divide-x-2">
      <div class="bg-base-100">
        <ul class="menu w-full">
          <li class="menu-title">Features</li>
          <li>
            <button
              class="hover:border-primary group flex items-center justify-between border-3 border-transparent bg-transparent py-4 text-xl font-bold transition-all duration-500 hover:rounded-2xl hover:pl-4">
              <p>Video Player</p>
              <Icon
                icon="mdi:arrow-right"
                class="text-primary opacity-0 transition-all duration-500 group-hover:opacity-100" />
            </button>
          </li>
        </ul>
      </div>
      <div class="bg-base-100">
        <ul class="menu">
          <li class="menu-title">Properties</li>
        </ul>
      </div>
      <div class="bg-base-100 p-2">
        <h2 class="menu-title mb-4">Generated CSS</h2>
        <div class="rounded-box bg-base-300 p-2">
          <pre><code><span class="text-success">.css-selector</span> {</code></pre>
          <pre><code>  <span class="text-info">property-name</span>: <span class="text-error">value</span>;</code></pre>
          <pre><code>}</code></pre>
        </div>
      </div>
    </section>
    <main class="h-1/2 overflow-y-scroll p-4">
      <BoxcastPlayer class="" />
    </main>
  </div>
</template>
