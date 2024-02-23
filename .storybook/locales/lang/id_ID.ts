import { Helper } from '@/helpers'
import antdLocale from 'ant-design-vue/es/locale/id_ID'
import { type LocaleType, localeMap } from '../config'

const locale: LocaleType = localeMap.id_ID
// const modulesFiles = import.meta.glob<Recordable>(`./${locale}/**/*.ts`, { eager: true })
const modulesFiles = import.meta.glob<Recordable>(`./id_ID/**/*.ts`, { eager: true })

export default {
  message: {
    ...Helper.Locale.genMessage(modulesFiles, locale),
    antdLocale
  }
}
