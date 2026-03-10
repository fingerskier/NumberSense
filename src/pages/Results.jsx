import { useLocation, useNavigate } from 'react-router-dom'

function normalize(val) {
  if (val === undefined || val === null) return ''
  return String(val).trim().toLowerCase().replace(/\s+/g, ' ')
}

function checkAnswer(problem, userAnswer) {
  const ua = normalize(userAnswer)
  if (ua === '') return 'skipped'

  const expected = normalize(problem.answer)

  // Exact match
  if (ua === expected) return 'correct'

  // Numeric comparison for number answers
  const uaNum = parseFloat(ua)
  const expNum = typeof problem.answer === 'number' ? problem.answer : parseFloat(expected)
  if (!isNaN(uaNum) && !isNaN(expNum) && Math.abs(uaNum - expNum) < 0.001) return 'correct'

  // For fraction answers, also check answerNum
  if (problem.answerNum !== undefined && !isNaN(uaNum)) {
    if (Math.abs(uaNum - problem.answerNum) < 0.001) return 'correct'
  }

  // Allow fraction equivalence: user types "1/2" for answer "1/2"
  // Parse fraction from user input
  const fracMatch = ua.match(/^(-?\d+)\s*\/\s*(\d+)$/)
  if (fracMatch) {
    const uFrac = parseInt(fracMatch[1]) / parseInt(fracMatch[2])
    if (problem.answerNum !== undefined && Math.abs(uFrac - problem.answerNum) < 0.001)
      return 'correct'
    if (!isNaN(expNum) && Math.abs(uFrac - expNum) < 0.001) return 'correct'
  }

  // Mixed number: "1 1/2"
  const mixedMatch = ua.match(/^(-?\d+)\s+(\d+)\s*\/\s*(\d+)$/)
  if (mixedMatch) {
    const whole = parseInt(mixedMatch[1])
    const frac = parseInt(mixedMatch[2]) / parseInt(mixedMatch[3])
    const uVal = whole >= 0 ? whole + frac : whole - frac
    if (problem.answerNum !== undefined && Math.abs(uVal - problem.answerNum) < 0.001)
      return 'correct'
  }

  return 'incorrect'
}

export default function Results() {
  const navigate = useNavigate()
  const location = useLocation()
  const { problems = [], answers = {} } = location.state || {}

  if (problems.length === 0) {
    return (
      <div className="page results">
        <h2>No results</h2>
        <button className="btn btn--primary" onClick={() => navigate('/')}>
          Go Home
        </button>
      </div>
    )
  }

  const results = problems.map((p, i) => ({
    ...p,
    userAnswer: answers[i] || '',
    result: checkAnswer(p, answers[i]),
  }))

  const correct = results.filter((r) => r.result === 'correct').length
  const incorrect = results.filter((r) => r.result === 'incorrect').length
  const skipped = results.filter((r) => r.result === 'skipped').length
  const score = correct * 5 - incorrect * 4
  const attempted = correct + incorrect
  const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0

  return (
    <div className="page results">
      <h2>Results</h2>

      <div className="results__summary">
        <div className="results__score">
          <span className="results__score-number">{score}</span>
          <span className="results__score-label">Score</span>
        </div>
        <div className="results__stats">
          <div className="results__stat results__stat--correct">
            <span>{correct}</span> correct (+{correct * 5})
          </div>
          <div className="results__stat results__stat--incorrect">
            <span>{incorrect}</span> incorrect (−{incorrect * 4})
          </div>
          <div className="results__stat results__stat--skipped">
            <span>{skipped}</span> skipped
          </div>
          <div className="results__stat">
            <span>{accuracy}%</span> accuracy
          </div>
        </div>
      </div>

      <div className="results__actions">
        <button className="btn btn--primary" onClick={() => navigate('/')}>
          New Test
        </button>
      </div>

      <div className="results__detail">
        <h3>Problem Review</h3>
        <div className="results__table">
          <div className="results__row results__row--header">
            <span>#</span>
            <span>Problem</span>
            <span>Your Answer</span>
            <span>Correct Answer</span>
            <span>Result</span>
          </div>
          {results.map((r) => (
            <div key={r.number} className={`results__row results__row--${r.result}`}>
              <span>{r.number}</span>
              <span>{r.question}</span>
              <span>{r.userAnswer || '—'}</span>
              <span>{String(r.answer)}</span>
              <span className={`results__badge results__badge--${r.result}`}>
                {r.result === 'correct' ? '✓' : r.result === 'incorrect' ? '✗' : '—'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
