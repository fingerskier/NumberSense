import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PRESETS = [
  { label: 'Quick Practice', problems: 20, minutes: 4 },
  { label: 'Half Test', problems: 40, minutes: 5 },
  { label: 'Full Test', problems: 80, minutes: 10 },
]

export default function Home() {
  const navigate = useNavigate()
  const [numProblems, setNumProblems] = useState(80)
  const [minutes, setMinutes] = useState(10)
  const [custom, setCustom] = useState(false)

  function startTest() {
    navigate('/test', { state: { numProblems, seconds: minutes * 60 } })
  }

  return (
    <div className="page home">
      <h1 className="home__title">NumberSense</h1>
      <p className="home__subtitle">Mental Math Timed Test</p>

      <div className="home__presets">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            className={`home__preset ${!custom && numProblems === p.problems ? 'home__preset--active' : ''}`}
            onClick={() => {
              setNumProblems(p.problems)
              setMinutes(p.minutes)
              setCustom(false)
            }}
          >
            <span className="home__preset-label">{p.label}</span>
            <span className="home__preset-detail">
              {p.problems} problems &middot; {p.minutes} min
            </span>
          </button>
        ))}
      </div>

      <button className="home__custom-toggle" onClick={() => setCustom(!custom)}>
        {custom ? 'Hide' : 'Show'} Custom Settings
      </button>

      {custom && (
        <div className="home__custom">
          <label>
            Problems:
            <input
              type="number"
              min={5}
              max={200}
              value={numProblems}
              onChange={(e) => setNumProblems(Number(e.target.value))}
            />
          </label>
          <label>
            Minutes:
            <input
              type="number"
              min={1}
              max={30}
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
            />
          </label>
        </div>
      )}

      <button className="btn btn--primary home__start" onClick={startTest}>
        Start Test
      </button>

      <div className="home__info">
        <h3>How it works</h3>
        <ul>
          <li>Answer as many mental math problems as you can before time runs out</li>
          <li>Problems increase in difficulty — easy arithmetic first, then fractions, percentages, and powers</li>
          <li>Use <kbd>Enter</kbd> to move to the next problem, arrow keys to navigate</li>
          <li>Click any problem number in the progress bar to jump to it</li>
          <li>Scoring: +5 correct, −4 incorrect, 0 skipped</li>
        </ul>
      </div>
    </div>
  )
}
