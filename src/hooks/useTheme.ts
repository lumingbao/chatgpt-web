import type { GlobalThemeOverrides } from 'naive-ui'
import { computed, watch } from 'vue'
import { darkTheme, useOsTheme } from 'naive-ui'
import { useAppStore } from '@/store'

export function useTheme() {
  const appStore = useAppStore()

  const OsTheme = useOsTheme()

  const isDark = computed(() => {
    if (appStore.theme === 'auto')
      return OsTheme.value === 'dark'
    else
      return appStore.theme === 'dark'
  })

  const theme = computed(() => {
    return isDark.value ? darkTheme : undefined
  })

  const themeOverrides = computed<GlobalThemeOverrides>(() => {
    if (isDark.value) {
      return {
        common: {
          primaryColor: '#096dd9',
					primaryColorHover: '#096dd9',
					primaryColorPressed: '#096dd9',
					primaryColorSuppl: '#096dd9'
				},
				Button: {
					textColor: '#096dd9'
				}
      }
    }
    return {
			common: {
				primaryColor: '#096dd9',
				primaryColorHover: '#096dd9',
				primaryColorPressed: '#096dd9',
				primaryColorSuppl: '#096dd9'
			},
			Button: {
				textColor: '#096dd9'
			}
		}
  })

  watch(
    () => isDark.value,
    (dark) => {
      if (dark)
        document.documentElement.classList.add('dark')
      else
        document.documentElement.classList.remove('dark')
    },
    { immediate: true },
  )

  return { theme, themeOverrides }
}
