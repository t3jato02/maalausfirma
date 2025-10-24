import { useEffect, useRef, useState } from 'react'

export default function CountUp({ end = 0, duration = 1200, suffix = '' }){
  const [val, setVal] = useState(0)
  const startedRef = useRef(false)
  const elRef = useRef(null)

  useEffect(() => {
    const node = elRef.current
    if (!node) return
    const ro = new IntersectionObserver(entries => {
      for (const e of entries){
        if (e.isIntersecting && !startedRef.current){
          startedRef.current = true
          const start = performance.now()
          const from = 0
          const to = Number(end) || 0
          const step = (t) => {
            const p = Math.min(1, (t - start) / duration)
            const cur = Math.round(from + (to - from) * p)
            setVal(cur)
            if (p < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
          ro.disconnect()
        }
      }
    }, { threshold: 0.2 })
    ro.observe(node)
    return () => ro.disconnect()
  }, [end, duration])

  return <span ref={elRef}>{val}{suffix}</span>
}
