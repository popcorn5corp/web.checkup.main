import { Helper } from '@/helpers'
import antdLocale from 'ant-design-vue/es/locale/ko_KR'
import { type LocaleType, localeMap } from '../config'

const locale: LocaleType = localeMap.ko_KR
const modulesFiles = import.meta.glob<Recordable>(`./ko_KR/**/*.ts`, { eager: true })

export default {
  message: {
    ...Helper.Locale.genMessage(modulesFiles, locale),
    antdLocale
  }
}
