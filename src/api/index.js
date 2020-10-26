import instance from './instance'

export const reqLogin = (username, password) => instance.post("/login", {username, password});