import { useEffect, useRef } from 'react'
import { DVDLogo } from '../../assets/logo'
import { Container } from './styles'

export function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log(containerRef.current?.clientHeight)
  }, [])

  return (
    <Container ref={containerRef}>
      <DVDLogo color="white" />
    </Container>
  )
}
