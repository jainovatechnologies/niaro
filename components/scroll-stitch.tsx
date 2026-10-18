'use client'

import React from 'react'
import { m, useScroll, useSpring } from 'framer-motion'

export function ScrollStitch() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return <m.div className="scroll-stitch" style={{ scaleX: progress }} />
}
