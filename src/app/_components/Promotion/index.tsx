'use client'

import React, { useEffect, useState } from 'react'
import classes from './index.module.scss'

const Promotion = () => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Calculate the target date as the current day plus 6 days
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 6)

  useEffect(() => {
    const timerInterval = setInterval(() => {
      calculateTimeRemaining()
    }, 1000)

    // Clear the interval when the component is unmounted or the target date is reached
    return () => clearInterval(timerInterval)
  }, []) // The empty dependency array ensures that the effect runs only once on mount

  function calculateTimeRemaining() {
    const now = new Date().getTime()
    const difference = Number(targetDate) - now

    if (difference <= 0) {
      // Target date has been reached
      clearInterval(timerInterval)
      setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 })
    } else {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTime({ days, hours, minutes, seconds })
    }
  }

  return (
    <section className={classes.promotion}>
      <div className={classes.textBox}>
        <h3 className={classes.title}>Angebote der Woche</h3>
        <p>Sonderangebote der Woche: Die besten Angebote nur jetzt!</p>

        <ul className={classes.stats}>
          <StatBox label="Tage" value={time.days} />
          <StatBox label="Stunde" value={time.hours} />
          <StatBox label="Minuten" value={time.minutes} />
          <StatBox label="Sekunden" value={time.seconds} />
        </ul>
      </div>
    </section>
  )
}

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className={classes.statBox}>
    <h4>{value}</h4>
    <p>{label}</p>
  </li>
)

export default Promotion
