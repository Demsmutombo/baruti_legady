const AUTH_KEY = 'baruti-admin-auth'

export function isAuthenticated() {
  try {
    return sessionStorage.getItem(AUTH_KEY) === '1'
  } catch {
    return false
  }
}

export function login() {
  try {
    sessionStorage.setItem(AUTH_KEY, '1')
  } catch {
    /* ignore */
  }
}

export function logout() {
  try {
    sessionStorage.removeItem(AUTH_KEY)
  } catch {
    /* ignore */
  }
}
