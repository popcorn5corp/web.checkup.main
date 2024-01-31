const findType = {
  id: 'id',
  password: 'password'
} as const
export type FindUserType = (typeof findType)[keyof typeof findType]

const componentType = {
  login: 'login',
  findUser: 'findUser'
} as const
export type RenderComponentType = (typeof componentType)[keyof typeof componentType]
