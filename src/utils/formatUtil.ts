function phoneDash(target: string) {
  return target.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
}

export const FormatUtil = {
  phoneDash
}
