import { useState, useEffect, useRef } from 'react'

export default function Timer({ seconds, onTimeUp, running }) {
  const [remaining, setRemaining] = useState(seconds)
  const onTimeUpRef = useRef(onTimeUp)

  useEffect(() => {
    onTimeUpRef.current = onTimeUp
  }, [onTimeUp])

  useEffect(() => {
    setRemaining(seconds)
  }, [seconds])

  useEffect(() => {
    if (!running) return
    if (remaining <= 0) {
      onTimeUpRef.current()
      return
    }
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(id)
          onTimeUpRef.current()
          return 0
        }
        return r - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [running, remaining <= 0])

  const mins = Math.floor(remaining / 60)
  const secs = remaining % 60
  const urgent = remaining <= 60

  return (
    <div className={`timer ${urgent ? 'timer--urgent' : ''}`}>
      <span className="timer__icon">⏱</span>
      <span className="timer__display">
        {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </span>
    </div>
  )
}
