import { Helper } from '@/helpers'
import antdLocale from 'ant-design-vue/es/locale/en_US'
import { type LocaleType, localeMap } from '../config'

const locale: LocaleType = localeMap.en_US
const modulesFiles = import.meta.glob<Recordable>(`./en_US/**/*.ts`, { eager: true })

export default {
  message: {
    ...Helper.Locale.genMessage(modulesFiles, locale),
    antdLocale
  }
}
