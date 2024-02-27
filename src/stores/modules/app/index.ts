import { defineStore } from 'pinia'
import { computed, ref, unref, watch } from 'vue'
import { useTheme } from '@/hooks/useTheme'

interface AppStoreState {
  title: string
  isCollapse: boolean
  logoFileName: string
  isMobile: boolean
}

export const useAppStore = defineStore('app', () => {
  const settings = ref<AppStoreState>({
    title: 'checkup',
    isCollapse: false,
    logoFileName: '',
    isMobile: false
  })

  const getSettings = computed(() => settings.value)

  const { getTheme } = useTheme()

  watch(
    () => [unref(getTheme).themeName, unref(settings).isCollapse],
    () => {
      setLogo()
    },
    { immediate: true }
  )

  function setLogo() {
    const { title, isCollapse } = unref(settings)
    const { themeName } = unref(getTheme)
    const logoFileName = `${title}_logo${isCollapse ? '_simple' : ''}_${
      themeName === 'dark' || themeName === 'semiDark' ? 'dark' : 'light'
    }.png`
    settings.value.logoFileName = logoFileName
  }

  function setCollapse(isCollapse: boolean) {
    settings.value.isCollapse = isCollapse
  }

  function setMobile(isMobile: boolean) {
    settings.value.isMobile = isMobile
    setCollapse(false)
  }

  return {
    getSettings,
    setLogo,
    setCollapse,
    setMobile
  }
})
