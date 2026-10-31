import type { NavOperations, ShortcutOptions } from '@slidev/types'
import { useDrawings } from '@slidev/client'
import { useLaser } from '../composables/useLaser'

// Slidev 直接使用本文件的默认导出作为快捷键 setup，因此这里返回完整快捷键表。
export default (_nav: NavOperations, defaultShortcuts: ShortcutOptions[]) => {
  const { drawingEnabled } = useDrawings()
  const { laserEnabled } = useLaser()

  return [
    ...defaultShortcuts,
    {
      name: 'toggle_laser',
      key: 'l',
      fn: () => {
        if (drawingEnabled.value) return
        laserEnabled.value = !laserEnabled.value
      },
    },
    {
      name: 'toggle_annotation',
      key: 'p',
      fn: () => {
        drawingEnabled.value = !drawingEnabled.value
        if (drawingEnabled.value) laserEnabled.value = false
      },
    },
  ]
}
