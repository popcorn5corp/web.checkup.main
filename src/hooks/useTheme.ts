import { computed, ref, toRef, toRefs, unref, watch } from 'vue'
import type { ThemeConfig } from '@/stores/interface'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { Storage } from '@/utils/storage'
import { THEME_KEY } from '@/enums/cacheKeyEnum'

export const useTheme = () => {
  const { config, setConfig } = useProjectConfigStore()
  // const getTheme = computed(() => config.theme)
  const getTheme = ref(config.theme)

  function setTheme(theme: Partial<ThemeConfig>): void {
    Object.entries(theme).map(([key]) => {
      const themeKey = key as keyof Partial<ThemeConfig>
      // config.theme[themeKey] = theme[themeKey] as never
      setConfig({
        theme: {
          ...config.theme,
          [themeKey]: theme[themeKey]
        }
      })
    })
  }

  return {
    getTheme,
    setTheme
  }
}
