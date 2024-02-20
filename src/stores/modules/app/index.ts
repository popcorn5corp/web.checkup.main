import { defineStore } from 'pinia'
import { computed, ref, unref, watch } from 'vue'
import { useTheme } from '@/hooks/useTheme'

interface AppStoreState {
  title: string
  isCollapse: boolean
  logoFileName: string
}

export const useAppStore = defineStore('app', () => {
  const settings = ref<AppStoreState>({
    title: 'checkup',
    isCollapse: false,
    logoFileName: ''
  })

  const getSettings = computed(() => settings.value)

  const { getTheme, setDataTheme } = useTheme()

  function initApp() {}

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

  return {
    getSettings,
    setLogo,
    setCollapse
  }
})
