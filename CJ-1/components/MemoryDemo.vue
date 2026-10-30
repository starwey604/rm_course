<script setup lang="ts">
import {computed} from 'vue'
const props=defineProps({kind:{type:String,default:'max'},step:{type:Number,default:0}})
const printMode=location.search.includes('print=true')
const data:any={
max:{items:[34,12,56,9,45],prefix:'a',max:6,states:[[-1,'—','先预测：数组中最大值是多少？','用什么初值才合适？'],[0,34,'先取 a[0] 作为当前最大值。','然后从下标 1 开始比较。'],[1,34,'12 > 34 为假，保持 34。','当前元素改变，最大值不一定改变。'],[2,56,'56 > 34 为真，更新成 56。','只有更大时才更新。'],[3,56,'9 > 56 为假，保持 56。','继续处理下一个有效元素。'],[4,56,'45 > 56 为假，保持 56。','这是最后一个有效元素。'],[-1,56,'遍历结束，最大值是 56。','i = 5 时停止，不访问 a[5]。']]},
pal:{items:['l','e','v','e','l','\\0'],prefix:'s',max:4,states:[[-1,'先预测','level 是回文吗？','有效字符有 5 个，最后一格是结束符。'],[0,"'l' == 'l'",'比较 s[0] 与 s[4]，相同。','left = 0，right = 4。'],[1,"'e' == 'e'",'左右各向中间移动一步，仍然相同。','left = 1，right = 3。'],[2,'left == right','两侧下标在 2 相遇，停止比较。','循环条件 left < right 已不成立。'],[-1,'是回文','需要比较的字符对全部相同。','结束符不参与回文比较。']]},
reverse:{items:[3,1,4,'—','—'],prefix:'a',max:7,states:[[-1,0,'输入：3 1 4 0','先记录有效元素个数 n = 0。'],[0,1,'读到 3，存入 a[0]。','输出：尚未开始'],[1,2,'读到 1，存入 a[1]。','输出：尚未开始'],[2,3,'读到 4，存入 a[2]。','输出：尚未开始'],[-1,3,'遇到 0，结束输入；0 不存入数组。','有效下标是 0、1、2。'],[2,3,'从 n - 1 开始输出 a[2]。','输出：4'],[1,3,'再输出 a[1]。','输出：4 1'],[0,3,'最后输出 a[0]。','输出：4 1 3']]},
string:{items:['R','M','\\0'],prefix:'s',max:2,states:[[-1,'先观察','char s[] = "RM";','字符串结束的位置如何确定？'],[2,'\\0','末尾自动加上结束符。','不是可见字符 0，也不是空格。'],[-1,'2 / 3','strlen(s) = 2，sizeof(s) = 3。','前者数有效字符，后者数这个数组占的字节。']]},
trees:{items:[0,1,2,3,4,5,6,7,8,9,10],prefix:'位置',max:3,states:[[-1,11,'位置 0 到 10，最初有 11 棵树。','两端的树也要计入。'],[-1,7,'移走 [2,5]，还剩 7 棵。','用数组标记每个位置是否还存在树。'],[-1,5,'再移走 [4,7]，只新增移走 6、7。','4、5 已经移走，不能再重复扣减。'],[-1,5,'最后统计仍然存在的树，答案是 5。','剩余位置：0、1、8、9、10。']]}
}
const d=computed(()=>data[props.kind])
const n=computed(()=>location.search.includes('print=true')?d.value.max:Math.min(props.step,d.value.max))
const s=computed(()=>d.value.states[n.value])
function current(i:number){return props.kind==='pal'?n.value>0&&n.value<4&&(i===s.value[0]||i===4-s.value[0]):i===s.value[0]}
function marked(i:number){return props.kind==='trees'?(n.value>=2?i>=2&&i<=7:n.value>=1&&i>=2&&i<=5):props.kind==='pal'&&n.value===4&&i<5}
function value(v:any,i:number){if(props.kind==='string'&&i===2&&n.value===0)return '—';return props.kind==='reverse'&&i>=Math.min(n.value,3)?'—':v}
</script>
<template>
<div class="memory-track"><div v-for="(v,i) in d.items" :key="i" class="memory-item" :class="{current:current(i),marked:marked(i),term:v==='\\0'}"><div class="memory-index">{{d.prefix}}[{{i}}]</div><div class="memory-cell" :style="kind==='trees'?'font-size:30px;height:72px':''">{{value(v,i)}}</div><div class="memory-marker">{{current(i)?kind==='pal'?(s[0]===2?'L / R':i===s[0]?'left ↑':'right ↑'):'↑ i = '+i:kind==='trees'&&marked(i)?'移走':''}}</div></div></div>
<div class="memory-comment"><div><div class="label">{{kind==='max'?'当前最大值':kind==='reverse'?'有效个数 n':kind==='trees'?'剩余棵数':'比较结果'}}</div><div class="memory-big" :style="kind==='pal'?'font-size:34px':''">{{s[1]}}</div></div><div class="memory-explain">{{s[2]}}<small>{{s[3]}}</small></div></div>
<div v-if="printMode&&kind==='max'" class="trace-summary spaced">比较顺序：34（初值）→ 12（保持）→ 56（更新）→ 9（保持）→ 45（保持）。</div>
<div v-if="printMode&&kind==='pal'" class="trace-summary spaced">比较过程：s[0] 与 s[4] 相同；s[1] 与 s[3] 相同；下标在 2 相遇后停止。</div>
</template>
