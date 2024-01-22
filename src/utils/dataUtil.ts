import { isObject, mergeWith } from 'lodash-es'

function deepMerge<T extends object | null | undefined, U extends object | null | undefined>(
  target: T,
  source: U
): T & U {
  return mergeWith(target, source, (prevValue, nextValue) => {
    return isObject(prevValue) && isObject(nextValue) ? undefined : prevValue || nextValue
  })
}

function phoneDash(target: string) {
  return target.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
}

function isEmail(target: string) {
  const regExp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/
  return regExp.test(target)
}
// export function deepMerge<T extends object | null | undefined, U extends object | null | undefined>(
//   target: T,
//   source: U
// ): T & U {
//   return mergeWith(cloneDeep(target), source, (objValue, srcValue) => {
//     if (isObject(objValue) && isObject(srcValue)) {
//       return mergeWith(cloneDeep(objValue), srcValue, (prevValue, nextValue) => {
//         return isArray(prevValue) ? uniq(prevValue, nextValue) : undefined
//       })
//     }
//   })
// }

export const DataUtil = {
  deepMerge,
  phoneDash,
  isEmail
}
