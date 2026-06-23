export function asset(path) {
  const normalized = path.startsWith('/') ? path.slice(1) : path
  return `/admin/${normalized}`
}
