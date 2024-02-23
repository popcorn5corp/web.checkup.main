export class WorkspaceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = '[WorkspaceError] '
    this.message = this.name + message
  }

  showError(message: string) {
    alert(this.name + message)
  }
}
