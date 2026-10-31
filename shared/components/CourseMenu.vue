<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useNav } from '@slidev/client'
import decks from '../../decks.json'

const props = defineProps<{ current: string }>()
const { isPrintMode } = useNav()
const open = ref(false)
const root = ref<HTMLElement>()
const currentDeck = computed(() => decks.find(deck => deck.slug === props.current))

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') open.value = false
}

function onPointerDown(event: PointerEvent) {
  if (open.value && event.target instanceof Node && !root.value?.contains(event.target)) open.value = false
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('pointerdown', onPointerDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('pointerdown', onPointerDown)
})
</script>

<template>
  <div v-if="!isPrintMode" ref="root" class="course-switcher">
    <button
      class="course-switcher-trigger"
      :aria-expanded="open"
      aria-controls="course-menu-panel"
      :title="`当前：${currentDeck?.title || '课程'}。点击切换课件`"
      @click.stop="open = !open"
    >
      <span class="course-switcher-mark">RM</span>
      <span>课程目录</span>
      <span class="course-switcher-chevron" :class="{ open }">⌄</span>
    </button>

    <Transition name="course-menu">
      <div v-if="open" id="course-menu-panel" class="course-menu-panel" @click.stop>
        <div class="course-menu-heading">
          <div>
            <small>CONE · ROBOMASTER</small>
            <strong>RM 电控系列课程</strong>
          </div>
          <a href="/" title="返回课程首页">首页 ↗</a>
        </div>
        <a
          v-for="deck in decks"
          :key="deck.slug"
          class="course-menu-item"
          :class="{ current: deck.slug === current }"
          :href="`/${deck.slug}/`"
        >
          <span class="course-menu-code">{{ deck.code }}</span>
          <span class="course-menu-copy">
            <strong>{{ deck.subtitle }}</strong>
            <small>{{ deck.duration }} · {{ deck.total }} 页</small>
          </span>
          <span class="course-menu-arrow">{{ deck.slug === current ? '当前' : '→' }}</span>
        </a>
        <div class="course-menu-tip">右上角随时切换 · 激光笔 L · 标注 P</div>
      </div>
    </Transition>
  </div>
</template>
