export const reasoningExtras={
 range:{
  max:4,
  questions:[
   {label:'保存什么？',at:1,text:'数组 a、个数 n，以及当前最小值和最大值。起点要来自已有数据。'},
   {label:'判断什么？',at:2,text:'还有元素没比较吗？当前值比记录的最小值小，还是比最大值大？'},
   {label:'更新什么？',at:3,text:'发现更小就改最小值，发现更大就改最大值；下标继续向后走。'}
  ],
  lines:[
   {at:1,text:'int min_val = [①];'},
   {at:1,text:'int max_val = [①];'},
   {at:2,text:'for (int i = 1; i < n; i++) {'},
   {at:3,text:'    if ([②]) min_val = a[i];'},
   {at:3,text:'    if ([③]) max_val = a[i];'},
   {at:2,text:'}'},
   {at:4,text:'printf("%d\\n", max_val - min_val);'}
  ],
  captions:['先拆开目标：求出最大值和最小值，最后相减。','①先想：初始化最值时，应该选哪个已经存在的元素？','已有一个元素作起点，再逐个检查其余元素。','②③分别表达“发现更小”和“发现更大”。','先口头补完三个空，再翻页跟着具体数据核对。']
 },
 reverse:{
  max:4,
  questions:[
   {label:'保存什么？',at:1,text:'数组 a 保存数据；n 记有效个数；x 接住本次输入。'},
   {label:'判断什么？',at:2,text:'读到结束标记了吗？倒序时，还有位置没输出吗？'},
   {label:'更新什么？',at:3,text:'存入一个数后，n 加 1；倒序输出时，每轮向前移一格。'}
  ],
  lines:[
   {at:1,text:'int a[100], n = 0, x;'},
   {at:2,text:'while (1) {'},
   {at:2,text:'    scanf("%d", &x);'},
   {at:2,text:'    if ([①]) break;'},
   {at:3,text:'    a[[②]] = x;'},
   {at:3,text:'    n++;'},
   {at:2,text:'}'},
   {at:3,text:'for (int i = [③]; i >= 0; [④]) {'},
   {at:3,text:'    printf("%d ", a[i]);'},
   {at:3,text:'}'},
   {at:4,text:'printf("\\n");'}
  ],
  captions:['先分成两个阶段：读完并保存，再倒着输出。','n 既记录存了多少个，也帮助确定下一个空位。','先判断是否结束，再决定要不要把 x 存进数组。','③决定从哪里开始；④决定下一步往哪个方向走。','沿用同样的①～④，到下一页独立补完完整程序。']
 },
 uppercase:{
  max:3,
  questions:[
   {label:'保存什么？',at:1,text:'字符数组 s 保存文本；i 标记当前检查的位置。'},
   {label:'判断什么？',at:2,text:'还没遇到结束符吗？当前字符是需要修改的小写字母吗？'},
   {label:'更新什么？',at:3,text:'只修改小写字母，其余保留；每轮把下标向后移。'}
  ],
  lines:[
   {at:1,text:'char s[101];'},
   {at:1,text:'scanf("%100s", s);'},
   {at:2,text:'for (int i = 0; [①]; i++) {'},
   {at:2,text:'    if ([②]) {'},
   {at:3,text:'        s[i] = s[i] - ([③]);'},
   {at:2,text:'    }'},
   {at:2,text:'}'},
   {at:3,text:'printf("%s\\n", s);'}
  ],
  captions:['先确定哪些字符需要处理，再考虑怎样改。','先读入文本，数组容量要给结束符留位置。','①控制遍历何时结束；②选出需要修改的字符。','③表示大小写编码的差。保持这些空白，到下一页独立填写。']
 }
}
