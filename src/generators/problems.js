import { randInt, pick, gcd, simplify, fmtFrac } from './utils.js'

// ─── Problem generators ───────────────────────────────────────────────
// Each generator returns { question: string, answer: number|string }
// Problems are grouped by difficulty tier (1=easy, 2=medium, 3=hard)

// ── Tier 1: Basic arithmetic ──────────────────────────────────────────

function additionBasic() {
  const a = randInt(10, 99)
  const b = randInt(10, 99)
  return { question: `${a} + ${b}`, answer: a + b }
}

function subtractionBasic() {
  const a = randInt(30, 99)
  const b = randInt(10, a)
  return { question: `${a} − ${b}`, answer: a - b }
}

function multiplicationBasic() {
  const a = randInt(2, 12)
  const b = randInt(2, 12)
  return { question: `${a} × ${b}`, answer: a * b }
}

function divisionBasic() {
  const b = randInt(2, 12)
  const answer = randInt(2, 12)
  const a = b * answer
  return { question: `${a} ÷ ${b}`, answer }
}

function addThreeNumbers() {
  const a = randInt(10, 50)
  const b = randInt(10, 50)
  const c = randInt(10, 50)
  return { question: `${a} + ${b} + ${c}`, answer: a + b + c }
}

// ── Tier 2: Intermediate ─────────────────────────────────────────────

function multiplicationLarger() {
  const a = randInt(12, 99)
  const b = randInt(2, 12)
  return { question: `${a} × ${b}`, answer: a * b }
}

function squaresSmall() {
  const n = randInt(2, 15)
  return { question: `${n}²`, answer: n * n }
}

function cubesSmall() {
  const n = randInt(2, 9)
  return { question: `${n}³`, answer: n * n * n }
}

function percentOf() {
  const pcts = [10, 15, 20, 25, 30, 40, 50, 75]
  const p = pick(pcts)
  // Ensure clean answers
  let base
  if (p === 15) base = randInt(2, 20) * 20
  else if (p === 25 || p === 75) base = randInt(2, 25) * 4
  else if (p === 30) base = randInt(2, 20) * 10
  else base = randInt(2, 30) * 10
  const answer = (p / 100) * base
  return { question: `${p}% of ${base}`, answer }
}

function fractionAddition() {
  const denOptions = [2, 3, 4, 5, 6, 8]
  const d1 = pick(denOptions)
  const d2 = pick(denOptions)
  const n1 = randInt(1, d1 - 1)
  const n2 = randInt(1, d2 - 1)
  const num = n1 * d2 + n2 * d1
  const den = d1 * d2
  const [sn, sd] = simplify(num, den)
  const ansStr = fmtFrac(num, den)
  return {
    question: `${fmtFrac(n1, d1)} + ${fmtFrac(n2, d2)}`,
    answer: ansStr,
    answerNum: sn / sd,
  }
}

function fractionMultiplication() {
  const denOptions = [2, 3, 4, 5, 6, 8]
  const d1 = pick(denOptions)
  const d2 = pick(denOptions)
  const n1 = randInt(1, d1 - 1)
  const n2 = randInt(1, d2 - 1)
  const num = n1 * n2
  const den = d1 * d2
  const ansStr = fmtFrac(num, den)
  return {
    question: `${fmtFrac(n1, d1)} × ${fmtFrac(n2, d2)}`,
    answer: ansStr,
    answerNum: num / den,
  }
}

function remainderDivision() {
  const b = randInt(3, 12)
  const q = randInt(2, 15)
  const r = randInt(1, b - 1)
  const a = b * q + r
  return {
    question: `${a} ÷ ${b} remainder`,
    answer: r,
  }
}

function roundingNearest() {
  const places = pick([10, 100])
  const n = randInt(100, 9999)
  const answer = Math.round(n / places) * places
  return {
    question: `Round ${n} to the nearest ${places}`,
    answer,
  }
}

// ── Tier 3: Advanced ──────────────────────────────────────────────────

function squaresLarge() {
  const n = randInt(15, 30)
  return { question: `${n}²`, answer: n * n }
}

function multiplyByEleven() {
  const n = randInt(12, 99)
  return { question: `${n} × 11`, answer: n * 11 }
}

function multiplyBy25() {
  const n = randInt(4, 40)
  return { question: `${n} × 25`, answer: n * 25 }
}

function percentChange() {
  const original = randInt(2, 20) * 10
  const pct = pick([10, 20, 25, 50])
  const increase = pick([true, false])
  const change = (pct / 100) * original
  const answer = increase ? original + change : original - change
  const word = increase ? 'more' : 'less'
  return {
    question: `${pct}% ${word} than ${original}`,
    answer,
  }
}

function squareRoot() {
  const n = randInt(2, 20)
  return { question: `√${n * n}`, answer: n }
}

function cubeRoot() {
  const n = randInt(2, 10)
  return { question: `∛${n * n * n}`, answer: n }
}

function powerOfTwo() {
  const n = randInt(2, 12)
  return { question: `2^${n}`, answer: Math.pow(2, n) }
}

function twoDigitMultiply() {
  const a = randInt(11, 30)
  const b = randInt(11, 30)
  return { question: `${a} × ${b}`, answer: a * b }
}

function compareFractions() {
  const d1 = pick([3, 4, 5, 6, 7, 8])
  const d2 = pick([3, 4, 5, 6, 7, 8])
  const n1 = randInt(1, d1 - 1)
  const n2 = randInt(1, d2 - 1)
  const v1 = n1 / d1
  const v2 = n2 / d2
  if (Math.abs(v1 - v2) < 0.001) return compareFractions() // avoid ties
  const answer = v1 > v2 ? '>' : '<'
  return {
    question: `${fmtFrac(n1, d1)}  ___  ${fmtFrac(n2, d2)}  (> or <)`,
    answer,
  }
}

function decimalToFraction() {
  const fracs = [
    [0.25, '1/4'],
    [0.5, '1/2'],
    [0.75, '3/4'],
    [0.2, '1/5'],
    [0.4, '2/5'],
    [0.6, '3/5'],
    [0.8, '4/5'],
    [0.125, '1/8'],
    [0.375, '3/8'],
    [0.625, '5/8'],
    [0.875, '7/8'],
    [1 / 3, '1/3'],
    [2 / 3, '2/3'],
  ]
  const [dec, ans] = pick(fracs)
  const display = dec === 1 / 3 ? '0.333...' : dec === 2 / 3 ? '0.666...' : `${dec}`
  return { question: `${display} as a fraction`, answer: ans }
}

function orderOfOperations() {
  const a = randInt(2, 10)
  const b = randInt(2, 10)
  const c = randInt(1, 10)
  const type = randInt(0, 1)
  if (type === 0) {
    return { question: `${a} × ${b} + ${c}`, answer: a * b + c }
  } else {
    return { question: `${c} + ${a} × ${b}`, answer: c + a * b }
  }
}

function divisibilityTest() {
  const divisors = [3, 4, 6, 8, 9]
  const d = pick(divisors)
  const isDivisible = pick([true, false])
  let n
  if (isDivisible) {
    n = d * randInt(10, 99)
  } else {
    n = d * randInt(10, 99) + randInt(1, d - 1)
  }
  return {
    question: `Is ${n} divisible by ${d}? (yes/no)`,
    answer: isDivisible ? 'yes' : 'no',
  }
}

// ─── Problem pools by tier ────────────────────────────────────────────

const tier1 = [additionBasic, subtractionBasic, multiplicationBasic, divisionBasic, addThreeNumbers]
const tier2 = [
  multiplicationLarger,
  squaresSmall,
  cubesSmall,
  percentOf,
  fractionAddition,
  fractionMultiplication,
  remainderDivision,
  roundingNearest,
]
const tier3 = [
  squaresLarge,
  multiplyByEleven,
  multiplyBy25,
  percentChange,
  squareRoot,
  cubeRoot,
  powerOfTwo,
  twoDigitMultiply,
  compareFractions,
  decimalToFraction,
  orderOfOperations,
  divisibilityTest,
]

/**
 * Generate a test with the specified number of problems.
 * Problems ramp in difficulty: first third is tier 1, second third tier 2, last third tier 3.
 */
export function generateTest(numProblems = 80) {
  const problems = []
  const t1Count = Math.ceil(numProblems * 0.3)
  const t2Count = Math.ceil(numProblems * 0.35)
  const t3Count = numProblems - t1Count - t2Count

  for (let i = 0; i < t1Count; i++) {
    const gen = pick(tier1)
    problems.push({ ...gen(), tier: 1 })
  }
  for (let i = 0; i < t2Count; i++) {
    const gen = pick(tier2)
    problems.push({ ...gen(), tier: 2 })
  }
  for (let i = 0; i < t3Count; i++) {
    const gen = pick(tier3)
    problems.push({ ...gen(), tier: 3 })
  }

  return problems.map((p, i) => ({ ...p, number: i + 1 }))
}
