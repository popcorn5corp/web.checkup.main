export class TableError extends Error {
  constructor(message: string) {
    super(message)
    this.name = '[CUI :: TableError] '
    this.message = this.name + message
  }

  getError() {}
}

export const ErrorMessage = {
  DATACALLBACK: {
    NO_RETURN_VALUE: `The dataCallback function must have a return value containing 'content'.`,
    NO_CONTENT: `The return value from the dataCallback function does not contain 'content'.`
  }
} as const
