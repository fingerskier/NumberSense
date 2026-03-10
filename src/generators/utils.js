/** Random integer in [min, max] inclusive */
export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/** Pick a random element from an array */
export function pick(arr) {
  return arr[randInt(0, arr.length - 1)]
}

/** Greatest common divisor */
export function gcd(a, b) {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) {
    ;[a, b] = [b, a % b]
  }
  return a
}

/** Least common multiple */
export function lcm(a, b) {
  return (a / gcd(a, b)) * b
}

/** Simplify a fraction, returns [num, den] */
export function simplify(num, den) {
  if (den === 0) return [num, den]
  const g = gcd(Math.abs(num), Math.abs(den))
  const sign = den < 0 ? -1 : 1
  return [(sign * num) / g, (sign * den) / g]
}

/** Format a fraction as a string for display */
export function fmtFrac(num, den) {
  const [n, d] = simplify(num, den)
  if (d === 1) return `${n}`
  if (Math.abs(n) > Math.abs(d)) {
    const whole = Math.trunc(n / d)
    const rem = Math.abs(n % d)
    if (rem === 0) return `${whole}`
    return `${whole} ${rem}/${d}`
  }
  return `${n}/${d}`
}
