export const srcRoot = import.meta.url
export function imagePath(name: string) {
  return new URL(`src/assets/images/${name}`, srcRoot).href
}
