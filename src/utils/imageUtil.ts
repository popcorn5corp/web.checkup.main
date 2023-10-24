const srcRoot = import.meta.url
function imagePath(name: string) {
  return new URL(`src/assets/images/${name}`, srcRoot).href
}

export const ImageUtil = {
  imagePath
}
