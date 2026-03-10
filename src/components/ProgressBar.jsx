export default function ProgressBar({ answers, total, current, onJump }) {
  return (
    <div className="progress-bar">
      <div className="progress-bar__track">
        {Array.from({ length: total }, (_, i) => {
          const answered = answers[i] !== undefined && answers[i] !== ''
          const isCurrent = i === current
          return (
            <button
              key={i}
              className={`progress-bar__dot ${answered ? 'progress-bar__dot--answered' : ''} ${isCurrent ? 'progress-bar__dot--current' : ''}`}
              onClick={() => onJump(i)}
              title={`Problem ${i + 1}`}
            >
              {i + 1}
            </button>
          )
        })}
      </div>
      <div className="progress-bar__summary">
        {Object.values(answers).filter((a) => a !== '').length} / {total} answered
      </div>
    </div>
  )
}
