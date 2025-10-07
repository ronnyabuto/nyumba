"use client"

import { useEffect, useState, useRef } from "react"

interface CountdownTimerProps {
  targetDate: Date
  onComplete?: () => void
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer({ targetDate, onComplete }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const timerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - Date.now()

      if (difference <= 0) {
        onComplete?.()
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / 86400000),
        hours: Math.floor((difference / 3600000) % 24),
        minutes: Math.floor((difference / 60000) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    setTimeLeft(calculateTimeLeft())

    timerRef.current = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [targetDate, onComplete])

  const timeUnits = [
    { value: timeLeft.days, label: "days" },
    { value: timeLeft.hours, label: "hours" },
    { value: timeLeft.minutes, label: "minutes" },
    { value: timeLeft.seconds, label: "seconds" },
  ]

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="flex items-center gap-2 sm:gap-4">
          <div className="flex flex-col items-center">
            <div className="glass-strong rounded-xl px-3 py-2 sm:px-4 sm:py-3 min-w-[60px] sm:min-w-[80px] glow-orange">
              <span className="text-2xl sm:text-4xl font-bold tabular-nums">{String(unit.value).padStart(2, "0")}</span>
            </div>
            <span className="text-xs sm:text-sm text-muted-foreground mt-2 font-medium">{unit.label}</span>
          </div>
          {index < timeUnits.length - 1 && (
            <span className="text-2xl sm:text-4xl font-bold text-[var(--nyumba-orange)] -mt-6">:</span>
          )}
        </div>
      ))}
    </div>
  )
}
