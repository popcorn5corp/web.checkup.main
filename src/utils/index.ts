import { isObject, mergeWith } from 'lodash-es'

export function deepMerge<T extends object | null | undefined, U extends object | null | undefined>(
  target: T,
  source: U
): T & U {
  return mergeWith(target, source, (prevValue, nextValue) => {
    return isObject(prevValue) && isObject(nextValue) ? undefined : prevValue || nextValue
  })
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
