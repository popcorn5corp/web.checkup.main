function isEmail(target: string) {
  const regExp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/
  return regExp.test(target)
}

function isId(target?: string): RegExp | boolean {
  const regExp = /^[a-zA-z0-9]{4,15}$/

  return target ? regExp.test(target) : regExp
}

function isPassword(target?: string): RegExp | boolean {
  const regExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,15}$/

  return target ? regExp.test(target) : regExp
}

function isPhone(target: string) {
  return target.match(/^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/)
}

export const ValidateUtil = {
  isEmail,
  isId,
  isPassword,
  isPhone
}
