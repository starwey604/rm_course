<script setup lang="ts">
const props = defineProps<{ step: number }>()
const print = new URLSearchParams(location.search).has('print')

function trace(num: number, x: number, count: number) {
  const rows: { num: number; digit: number | null; next: number | null; before: number; after: number }[] = []
  while (num > 0) {
    const digit = num % 10
    const next = Math.floor(num / 10)
    const before = count
    if (digit === x) count++
    rows.push({ num, digit, next, before, after: count })
    num = next
  }
  rows.push({ num, digit: null, next: null, before: count, after: count })
  return rows
}

const cases = [
  { input: '11 1', num: 11, x: 1, start: 2, prior: '1 和 10 已贡献两次' },
  { input: '10 0', num: 10, x: 0, start: 0, prior: '1 到 9 都没有 0' },
].map(example => ({ ...example, rows: trace(example.num, example.x, example.start) }))
const shown = (n: number) => print || props.step >= n
</script>

<template>
  <div class="cj2-digit-trace" :data-step="step">
    <template v-for="(example,i) in cases" :key="example.input">
      <div v-if="shown(i * 3 + 1)" class="cj2-digit-case" :data-input="example.input">
        <div><strong>输入 <code>{{ example.input }}</code></strong> · 拆 <code>{{ example.num }}</code> 时，<code>count = {{ example.start }}</code></div>
        <div class="cj2-digit-prior">{{ example.prior }}</div>
        <table>
          <thead><tr><th>本轮 <code>num</code></th><th>取个位</th><th><code>count</code></th><th>去个位后</th></tr></thead>
          <tbody>
            <template v-for="(row,j) in example.rows" :key="row.num">
              <tr v-if="shown(i * 3 + j + 1)" :class="{ 'cj2-digit-stop': row.digit === null }">
                <td><code>{{ row.num }}</code></td>
                <td><template v-if="row.digit === null">不取位</template><code v-else>{{ row.digit }}</code></td>
                <td :class="{ 'cj2-digit-counted': row.before !== row.after }"><code>{{ row.before === row.after ? row.after : `${row.before} → ${row.after}` }}</code></td>
                <td><code>{{ row.next ?? '—' }}</code></td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </template>
    <p v-if="shown(6)" class="cj2-digit-rule">个位的 <code>0</code> 要数；<code>num = 0</code> 就退出循环。</p>
  </div>
</template>
