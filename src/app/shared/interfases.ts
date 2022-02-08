export interface User {
    email: string,
    password: string
    returnSecureToken?: boolean;
}

export interface FbAuthResponse {
    idToken: string
    expiresIn: string
}

export interface PostInt {
    title: string
    text: string
    author: string
    date: Date
    id?: string
}

export interface FbCreateResponse {
    name: string
}