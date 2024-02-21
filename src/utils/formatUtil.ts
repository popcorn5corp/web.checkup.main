function phoneDash(target: string) {
  return target.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
}

function toFirstUpperCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const FormatUtil = {
  phoneDash,
  toFirstUpperCase
}
