export interface User {
  email: string
  password?: string
  returnSecureToken?: boolean
  displayName?: string
  expiresIn?: string
  idToken?: string
  kind?: string
  localId?: string
  refreshToken?: string
  registered?: boolean
}

export interface FbAuthResponse {
  idToken: string
  expiresIn: string
}

export interface Post {
  _id?: string
  title: string
  description: string
  author: string
  createdAt?: string
  updatedAt?: string
}

export interface FbCreateResponse {
  name: string
}
