<script setup>
import { useNav } from '@slidev/client'
const { currentPage, total }=useNav()
</script>
<template><div class="page-footer"><span>CONE · CJ-1</span><span>{{String(currentPage).padStart(2,'0')}}</span></div></template>
