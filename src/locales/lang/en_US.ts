import antdLocale from 'ant-design-vue/es/locale/en_US'
import { genMessage } from '@/helpers/locale'
import { localeMap, type LocaleType } from '../config'

const locale: LocaleType = localeMap.en_US
const modulesFiles = import.meta.glob<Recordable>(`./en_US/**/*.ts`, { eager: true })

export default {
  message: {
    ...genMessage(modulesFiles, locale),
    antdLocale
  }
}
