import { useNav } from '@slidev/client'
export default () => {
  document.addEventListener('click',(event:MouseEvent)=>{
    const target=event.target as HTMLElement
    if(/presenter|overview|export|notes/.test(location.pathname)||location.search.includes('print'))return
    if(!target.closest('.slidev-layout')||target.closest('a,button,input,textarea,select'))return
    if(window.getSelection()?.toString())return
    useNav().next()
  })
}
