export const ACCESS_TOKEN = 'accessToken'
export const REFRESH_TOKEN = 'refreshToken'

export const ACCESS_MAX_AGE = 60 * 60 * 24 * 2 // would expire after 2 days
export const REFRESH_MAX_AGE = 60 * 60 * 24 * 365 // would expire after 1 year

export const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const passwordPattern=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{9,}$/
export const firstNamePattern = /^(?:\S\s*){3,}$/
export const lastNamePattern = /^(?:\S\s*){4,}$/
export const userNamePattern = /^(?:\S\s*){4,}$/

export const socketUrl = 'https://node-js-socket-1mecb04y3-hemdadi71gmailcoms-projects.vercel.app' // https://mysocket.liara.run    or   http://localhost:3001
