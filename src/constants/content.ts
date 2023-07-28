export const contentModes: Record<'C' | 'R' | 'U' | 'D', ContentMode> = {
  C: 'CREATE',
  R: 'READ',
  U: 'UPDATE',
  D: 'DELETE'
} as const
