<script setup lang="ts">
import { useDrawings } from '@slidev/client'
import { useLaser } from '../composables/useLaser'

const { drawingEnabled } = useDrawings()
const { laserEnabled, toggle } = useLaser()

function toggleDrawing() {
  drawingEnabled.value = !drawingEnabled.value
  if (drawingEnabled.value) laserEnabled.value = false
}
</script>

<template>
  <a class="slidev-icon-btn" href="/" title="RM 电控课程首页">
    <span class="sr-only">课程首页</span>
    <svg class="cone-ctrl-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m4 11 8-7 8 7v9h-6v-6h-4v6H4v-9Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" />
    </svg>
  </a>
  <button
    class="slidev-icon-btn"
    :class="{ active: laserEnabled }"
    title="激光笔（L）"
    @click="toggle()"
  >
    <span class="sr-only">激光笔</span>
    <svg class="cone-ctrl-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3.2" fill="currentColor" />
      <circle cx="12" cy="12" r="7.2" stroke="currentColor" stroke-width="1.1" opacity="0.55" />
    </svg>
  </button>
  <button
    class="slidev-icon-btn"
    :class="{ active: drawingEnabled }"
    title="标注（P）"
    @click="toggleDrawing()"
  >
    <span class="sr-only">标注</span>
    <svg class="cone-ctrl-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20h4L19.2 8.8a2.1 2.1 0 0 0-3-3L5 17v3Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" />
      <path d="M15 6.6 17.4 9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
    </svg>
  </button>
</template>
