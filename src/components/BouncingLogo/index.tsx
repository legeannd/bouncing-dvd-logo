import { useEffect, useRef, useState } from 'react'
import { DVDLogo } from '../../assets/logo'
import { LogoContainer } from './styles'

interface BouncingLogoProps {
  maxSize: {
    width: number
    height: number
  }
}

export function BouncingLogo({ maxSize }: BouncingLogoProps) {
  const logoRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [lastSide, setLastSide] = useState('')
  const [secondLastSide, setSecondLastSide] = useState('')
  const [horizontalDir, setHorizontalDir] = useState('down')
  const [direction, setDirection] = useState('foward')
  const [color, setColor] = useState('')

  function generateColor() {
    return `#${Math.random().toString(16).slice(-6)}`
  }

  useEffect(() => {
    console.log('--------------')
    console.log(direction, 'direction')
    console.log(horizontalDir, 'horizontalDir')
    console.log(lastSide, 'last')
    console.log('--------------')
  }, [lastSide])

  useEffect(() => {
    setColor(generateColor())
  }, [lastSide])

  useEffect(() => {
    const interval = setInterval(() => {
      if (logoRef.current) {
        if (maxSize.height - logoRef.current.offsetHeight <= position.top) {
          if (lastSide !== '' && lastSide !== 'bottom') {
            setHorizontalDir('up')
            if (secondLastSide !== '') {
              setSecondLastSide(lastSide)
              setLastSide('bottom')
            } else {
              setSecondLastSide(lastSide)
              setLastSide('bottom')
            }
          } else {
            setLastSide('bottom')
          }
        } else if (
          maxSize.width - logoRef.current.offsetWidth <=
          position.left
        ) {
          if (lastSide !== '' && lastSide !== 'right') {
            setDirection('back')
            if (secondLastSide !== '') {
              setSecondLastSide(lastSide)
              setLastSide('right')
            } else {
              setSecondLastSide(lastSide)
              setLastSide('right')
            }
          } else {
            setLastSide('right')
          }
        } else if (position.top === 0) {
          if (lastSide !== '' && lastSide !== 'top') {
            setHorizontalDir('down')
            if (secondLastSide !== '') {
              setSecondLastSide(lastSide)
              setLastSide('top')
            } else {
              setSecondLastSide(lastSide)
              setLastSide('top')
            }
          } else {
            setLastSide('top')
          }
        } else if (position.left === 0) {
          setDirection('foward')
          if (lastSide !== '' && lastSide !== 'left') {
            if (secondLastSide !== '') {
              setSecondLastSide(lastSide)
              setLastSide('left')
            } else {
              setSecondLastSide(lastSide)
              setLastSide('left')
            }
          } else {
            setLastSide('left')
          }
        }

        if (lastSide === 'bottom') {
          if (direction === 'back') {
            setPosition({
              top: position.top - 1,
              left: position.left - 1,
            })
          } else {
            setPosition({
              top: position.top - 1,
              left: position.left + 1,
            })
          }
        } else if (lastSide === 'right') {
          if (horizontalDir === 'down') {
            setPosition({
              top: position.top + 1,
              left: position.left - 1,
            })
          } else {
            setPosition({
              top: position.top - 1,
              left: position.left - 1,
            })
          }
        } else if (lastSide === 'top') {
          if (direction === 'back') {
            setPosition({
              top: position.top + 1,
              left: position.left - 1,
            })
          } else {
            setPosition({
              top: position.top + 1,
              left: position.left + 1,
            })
          }
        } else if (lastSide === 'left') {
          if (horizontalDir === 'up') {
            setPosition({
              top: position.top - 1,
              left: position.left + 1,
            })
          } else {
            setPosition({
              top: position.top + 1,
              left: position.left + 1,
            })
          }
        } else {
          const newPosition = {
            top: position.top + 1,
            left: position.left + 1,
          }
          setPosition(newPosition)
        }
      }
    }, 5)

    return () => {
      clearInterval(interval)
    }
  }, [
    direction,
    horizontalDir,
    lastSide,
    maxSize.height,
    maxSize.width,
    position.left,
    position.top,
    secondLastSide,
  ])

  return (
    <LogoContainer ref={logoRef} position={position}>
      <DVDLogo color={color} />
    </LogoContainer>
  )
}
