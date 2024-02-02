function isEmail(target: string) {
  const regExp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/
  return regExp.test(target)
}

export const ValidateUtil = {
  isEmail
}
