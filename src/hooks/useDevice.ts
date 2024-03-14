import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { useAppStore } from '@/stores/modules/app'

import { DeviceEnum } from '@/constants/appKey'

const appStore = useAppStore()
const { device } = storeToRefs(appStore)
const isMobile = computed(() => device.value === DeviceEnum.Mobile)
const isDesktop = computed(() => device.value === DeviceEnum.Desktop)

export function useDevice() {
  return { isMobile, isDesktop }
}
