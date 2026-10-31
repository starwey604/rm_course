<script setup lang="ts">
import {computed} from 'vue'
import CodeTokens from '../../shared/components/CodeTokens.vue'
import {highlightCpp} from '../../shared/utils/highlight'
const props=defineProps<{kind:'cout'|'println'}>()
const snippets={
  cout:'std::cout << "sum=" << sum << ", avg="\n          << std::fixed << std::setprecision(2) << avg << \'\\n\';',
  println:'std::println("sum={}, avg={:.2f}", sum, avg);'
}
const lines=computed(()=>highlightCpp(snippets[props.kind]))
</script>
<template><pre><code class="language-cpp"><template v-for="(line,i) in lines" :key="i"><span class="line"><CodeTokens :tokens="line" /></span>{{i<lines.length-1?'\n':''}}</template></code></pre></template>
