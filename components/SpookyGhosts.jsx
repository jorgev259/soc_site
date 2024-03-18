import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import styles from '@/styles/Spooky.module.scss'

const size = 55
const negSize = 0 - size
const step = 75

function getRandom(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min // max & min both included
}

export default function SpookyGhosts() {
  return (
    <div
      className={clsx(styles.cover, 'position-fixed overflow-hidden')}
      style={{ height: '100vh', width: '100vw' }}
    >
      <Ghost />
      <Ghost />
      <Ghost />
    </div>
  )
}

function Ghost() {
  const ref = useRef(null)
  const [cord, setCord] = useState()
  const [direct, setDirect] = useState({ top: 1, left: 1 })
  const [opacity, setOpacity] = useState(1)

  const newCord = (side) =>
    cord[side] + step * direct[side] * (opacity === 0 ? 2 : 1)

  useEffect(() => {
    const newCordObj = {
      top: getRandom(negSize, window.innerHeight + size),
      left: getRandom(negSize, window.innerWidth + size)
    }
    setCord(newCordObj)
  }, [])

  useEffect(() => {
    if (!cord) return
    let newDirect = { ...direct }
    const rect = ref.current.getBoundingClientRect()
    const gamble = getRandom(0, 10)

    if (gamble === 5) newDirect = { top: -direct.top, left: -direct.left }

    if (rect.top >= window.innerHeight) newDirect.top = -1
    else if (rect.bottom <= 0) newDirect.top = 1

    if (rect.left >= window.innerWidth) newDirect.left = -1
    else if (rect.right <= 0) newDirect.left = 1

    if (newDirect.top !== direct.top || newDirect.left !== direct.left) {
      if (opacity === 0) setOpacity(1)
      setDirect(newDirect)
    }
    setTimeout(
      () => setCord({ top: newCord('top'), left: newCord('left') }),
      1000
    )
  }, [cord])

  const onMouseEnter = (event) => {
    if (opacity === 1) setOpacity(0)
  }

  if (!cord) return null

  return (
    <div
      ref={ref}
      onMouseEnter={onMouseEnter}
      className={styles.ghost}
      style={{
        animationName: 'float',
        top: cord.top,
        left: cord.left,
        opacity
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          transform: `scaleX(${direct?.left === 1 ? -1 : 1})`
        }}
      ></div>
    </div>
  )
}
