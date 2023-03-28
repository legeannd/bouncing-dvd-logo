import { useEffect, useRef, useState } from 'react'
import { BouncingLogo } from '../../components/BouncingLogo'
import { Container } from './styles'

export function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [maxSize, setMaxSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleWindowResize = () => {
      setMaxSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  })

  return (
    <Container ref={containerRef}>
      <BouncingLogo maxSize={maxSize} />
    </Container>
  )
}
