import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { generateTest } from '../generators/problems.js'
import Timer from '../components/Timer.jsx'
import ProblemCard from '../components/ProblemCard.jsx'
import ProgressBar from '../components/ProgressBar.jsx'

export default function Test() {
  const navigate = useNavigate()
  const location = useLocation()
  const { numProblems = 80, seconds = 600 } = location.state || {}

  const [problems] = useState(() => generateTest(numProblems))
  const [answers, setAnswers] = useState({})
  const [current, setCurrent] = useState(0)
  const [running, setRunning] = useState(false)
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)

  function begin() {
    setStarted(true)
    setRunning(true)
  }

  const finish = useCallback(() => {
    if (finished) return
    setRunning(false)
    setFinished(true)
    navigate('/results', { state: { problems, answers } })
  }, [finished, problems, answers, navigate])

  function setAnswer(idx, value) {
    setAnswers((prev) => ({ ...prev, [idx]: value }))
  }

  function goNext() {
    if (current < problems.length - 1) {
      setCurrent((c) => c + 1)
    }
  }

  function goPrev() {
    if (current > 0) {
      setCurrent((c) => c - 1)
    }
  }

  // Keyboard shortcut for submit
  useEffect(() => {
    function handleKey(e) {
      if (!running) return
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault()
        finish()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [running, finish])

  if (!started) {
    return (
      <div className="page test-ready">
        <h2>Ready?</h2>
        <p>
          {numProblems} problems &middot; {Math.floor(seconds / 60)} minutes
        </p>
        <p className="test-ready__hint">
          Problems increase in difficulty. Answer what you can — skipping is okay.
        </p>
        <button className="btn btn--primary" onClick={begin}>
          Begin Test
        </button>
        <button className="btn btn--secondary" onClick={() => navigate('/')}>
          Back
        </button>
      </div>
    )
  }

  return (
    <div className="page test">
      <div className="test__header">
        <Timer seconds={seconds} onTimeUp={finish} running={running} />
        <button className="btn btn--danger test__submit" onClick={finish}>
          Submit Test
        </button>
      </div>

      <ProblemCard
        problem={problems[current]}
        value={answers[current] || ''}
        onChange={(val) => setAnswer(current, val)}
        onNext={goNext}
        onPrev={goPrev}
      />

      <div className="test__nav">
        <button className="btn btn--secondary" onClick={goPrev} disabled={current === 0}>
          ← Prev
        </button>
        <span className="test__position">
          {current + 1} / {problems.length}
        </span>
        <button
          className="btn btn--secondary"
          onClick={goNext}
          disabled={current === problems.length - 1}
        >
          Next →
        </button>
      </div>

      <ProgressBar
        answers={answers}
        total={problems.length}
        current={current}
        onJump={setCurrent}
      />
    </div>
  )
}
