import { useRef, useEffect } from 'react'

export default function ProblemCard({ problem, value, onChange, onNext, onPrev }) {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [problem.number])

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      onNext()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      onPrev()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      onNext()
    }
  }

  return (
    <div className="problem-card">
      <div className="problem-card__number">#{problem.number}</div>
      <div className="problem-card__question">{problem.question}</div>
      <input
        ref={inputRef}
        className="problem-card__input"
        type="text"
        inputMode="text"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Answer"
      />
      <div className="problem-card__tier">
        {'★'.repeat(problem.tier)}{'☆'.repeat(3 - problem.tier)}
      </div>
    </div>
  )
}
