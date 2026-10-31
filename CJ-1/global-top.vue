<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useNav } from '@slidev/client'
import { useLaser } from './composables/useLaser'

const { isPrintMode } = useNav()
const { laserEnabled } = useLaser()

const root = ref<HTMLElement>()
const x = ref(0)
const y = ref(0)
const visible = ref(false)

let frame = 0
let last: { x: number, y: number } | null = null

// 覆盖层铺满幻灯片容器，因此按它自身的盒子换算百分比，缩放后仍与鼠标对齐。
function render() {
  frame = 0
  const box = root.value?.getBoundingClientRect()
  if (!last || !box || !box.width || !box.height || isPrintMode.value || !laserEnabled.value) {
    visible.value = false
    return
  }
  const inside = last.x >= box.left && last.x <= box.right
    && last.y >= box.top && last.y <= box.bottom
  visible.value = inside
  if (!inside) return
  x.value = (last.x - box.left) / box.width * 100
  y.value = (last.y - box.top) / box.height * 100
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(render)
}

function onPointerMove(event: PointerEvent) {
  last = { x: event.clientX, y: event.clientY }
  if (!laserEnabled.value || isPrintMode.value) return
  schedule()
}

function onWindowLeave() {
  visible.value = false
}

onMounted(() => {
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  document.addEventListener('pointerleave', onWindowLeave)
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onPointerMove)
  document.removeEventListener('pointerleave', onWindowLeave)
  if (frame) cancelAnimationFrame(frame)
  document.body.classList.remove('cone-laser-on')
})

// 开启时隐藏系统光标；关闭后恢复。用最近一次指针位置立即画出光点，避免必须再动一下鼠标。
watch(laserEnabled, (on) => {
  document.body.classList.toggle('cone-laser-on', on && !isPrintMode.value)
  if (on) schedule()
  else visible.value = false
}, { immediate: true })
</script>

<template>
  <div v-if="!isPrintMode" ref="root" class="cone-laser-layer">
    <div
      v-show="laserEnabled && visible"
      class="cone-laser-dot"
      :style="{ left: `${x}%`, top: `${y}%` }"
    />
  </div>
</template>
