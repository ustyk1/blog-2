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
  id?: string
  title: string
  text: string
  author: string
  date: Date
}

export interface FbCreateResponse {
  name: string
}
