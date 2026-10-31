import { ref } from 'vue'

// 模块级单例：工具栏、快捷键与覆盖层读写同一份开关状态。
const laserEnabled = ref(false)

export function useLaser() {
  const toggle = () => {
    laserEnabled.value = !laserEnabled.value
  }
  return { laserEnabled, toggle }
}
