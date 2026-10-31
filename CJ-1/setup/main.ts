import { useNav } from '@slidev/client'
export default () => {
  // 打印与 PDF 导出时不带出课堂标注：只加一个标记类，由 cone.css 隐藏标注层。
  if(location.search.includes('print'))document.documentElement.classList.add('cone-print')
  document.addEventListener('click',(event:MouseEvent)=>{
    const target=event.target as HTMLElement
    if(/presenter|overview|export|notes/.test(location.pathname)||location.search.includes('print'))return
    if(!target.closest('.slidev-layout')||target.closest('a,button,input,textarea,select'))return
    if(window.getSelection()?.toString())return
    useNav().next()
  })
}
