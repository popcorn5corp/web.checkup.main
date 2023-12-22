function formatRgbaOpacity(rgba: string, opacity: number): string {
  return rgba.replace(/[^,]+(?=\))/, opacity.toString())
}

export const ColorUtil = {
  formatRgbaOpacity
}
