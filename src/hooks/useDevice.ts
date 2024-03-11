import { computed } from "vue"
import { useAppStore } from "@/stores/modules/app"
import { DeviceEnum } from "@/constants/appKey"

const appStore = useAppStore()
const isMobile = computed(() => appStore.device === DeviceEnum.Mobile)
const isDesktop = computed(() => appStore.device === DeviceEnum.Desktop)

export function useDevice() {
  return { isMobile, isDesktop }
}
