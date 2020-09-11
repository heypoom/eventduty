export function padSpace(s: string) {
  if (s[0] && /[A-z]/.test(s[0])) return ' ' + s

  return s
}
