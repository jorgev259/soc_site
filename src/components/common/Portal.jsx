'use client'
import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function Portal (props) {
  const { children, selector } = props
  const ref = useRef()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector(selector)
    setMounted(true)
  }, [selector])

  return mounted ? createPortal(children, ref.current) : null
}
