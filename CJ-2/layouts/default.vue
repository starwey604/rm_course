<script setup>
import cone from '../../shared/assets/cone.png'
import rm from '../../shared/assets/rm.png'
</script>
<template>
  <div class="slidev-layout default">
    <div class="brand-strip">
      <img :src="cone" class="cone-logo" alt="CONE" />
      <img :src="rm" class="rm-logo" alt="RoboMaster" />
    </div>
    <slot />
  </div>
</template>
