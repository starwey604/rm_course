<script setup>
import { useNav } from '@slidev/client'
const { currentPage }=useNav()
</script>
<template><div class="page-footer"><span>CONE · C语言培训-2</span><span>{{String(currentPage).padStart(2,'0')}}</span></div></template>
