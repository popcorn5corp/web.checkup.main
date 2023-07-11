import antdLocale from 'ant-design-vue/es/locale/en_US'
import { genMessage } from '@/helpers/locale'
import { localeMap, type LocaleType } from '../config'

const locale: LocaleType = localeMap.en_US
const modulesFiles = import.meta.glob<Recordable>(`./en-US/**/*.ts`, { eager: true })

console.log('ddddddddd', genMessage(modulesFiles, 'en-US'))

export default {
  message: {
    ...genMessage(modulesFiles, 'en-US'),
    antdLocale
  }
}
