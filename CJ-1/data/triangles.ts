export const triangleVariants=[
 {name:'左下直角',iParams:'int i = 1; i <= 4; i++',jParams:'int j = 1; j <= 4; j++',iValues:[1,2,3,4],jValues:[1,2,3,4],changed:'both',note:'i 从 1 走到 4，星号逐行增多；j 从 1 走到 4，先输出星号，再输出行尾的空格。'},
 {name:'左上直角',iParams:'int i = 4; i >= 1; i--',jParams:'int j = 1; j <= 4; j++',iValues:[4,3,2,1],jValues:[1,2,3,4],changed:'outer',note:'只把外层改成 4 → 1：每行星号数从 4 减到 1，三角形上下翻转。'},
 {name:'右上直角',iParams:'int i = 4; i >= 1; i--',jParams:'int j = 4; j >= 1; j--',iValues:[4,3,2,1],jValues:[4,3,2,1],changed:'inner',note:'外层保持 4 → 1，内层也改成 4 → 1：先检查较大的 j，先输出空格，三角形左右翻转。'},
 {name:'右下直角',iParams:'int i = 1; i <= 4; i++',jParams:'int j = 4; j >= 1; j--',iValues:[1,2,3,4],jValues:[4,3,2,1],changed:'outer',note:'内层继续 4 → 1；把外层改回 1 → 4，星号又逐行增多，得到右下直角三角形。'}
]
export function triangleRows(variant:typeof triangleVariants[number]){
 return variant.iValues.map(i=>({i,text:variant.jValues.map(j=>j<=i?'*':' ').join('')}))
}
