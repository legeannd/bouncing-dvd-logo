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
  const [thirdLastSide, setThirdLastSide] = useState('')
  const [direction, setDirection] = useState('foward')
  const [color, setColor] = useState('')

  function generateColor() {
    return `#${Math.random().toString(16).slice(-6)}`
  }

  useEffect(() => {
    setColor(generateColor())
  }, [lastSide])

  useEffect(() => {
    const interval = setInterval(() => {
      if (logoRef.current) {
        if (maxSize.height - logoRef.current.offsetHeight <= position.top) {
          if (lastSide !== '' && lastSide !== 'bottom') {
            if (secondLastSide !== '') {
              setThirdLastSide(secondLastSide)
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
              setThirdLastSide(secondLastSide)
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
            if (secondLastSide !== '') {
              setThirdLastSide(secondLastSide)
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
              setThirdLastSide(secondLastSide)
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
          if (secondLastSide === 'right') {
            setPosition({
              top: position.top - 1,
              left: position.left - 1,
            })
          } else if (secondLastSide === 'top') {
            if (thirdLastSide === 'right') {
              setPosition({
                top: position.top - 1,
                left: position.left - 1,
              })
            } else if (thirdLastSide === 'left') {
              setPosition({
                top: position.top - 1,
                left: position.left + 1,
              })
            } else if (direction === 'foward') {
              setPosition({
                top: position.top - 1,
                left: position.left + 1,
              })
            } else {
              setPosition({
                top: position.top - 1,
                left: position.left - 1,
              })
            }
          } else {
            setPosition({
              top: position.top - 1,
              left: position.left + 1,
            })
          }
        } else if (lastSide === 'right') {
          if (secondLastSide === 'bottom') {
            setPosition({
              top: position.top - 1,
              left: position.left - 1,
            })
          } else if (secondLastSide === 'top') {
            setPosition({
              top: position.top + 1,
              left: position.left - 1,
            })
          }
        } else if (lastSide === 'top') {
          if (secondLastSide === 'bottom') {
            if (thirdLastSide === 'right') {
              setPosition({
                top: position.top + 1,
                left: position.left - 1,
              })
            } else if (thirdLastSide === 'left') {
              setPosition({
                top: position.top + 1,
                left: position.left + 1,
              })
            } else if (direction === 'back') {
              setPosition({
                top: position.top + 1,
                left: position.left - 1,
              })
            } else if (direction === 'foward') {
              setPosition({
                top: position.top + 1,
                left: position.left + 1,
              })
            }
          } else if (secondLastSide === 'right') {
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
          if (secondLastSide === 'bottom') {
            setPosition({
              top: position.top - 1,
              left: position.left + 1,
            })
          } else if (secondLastSide === 'top') {
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
    lastSide,
    maxSize.height,
    maxSize.width,
    position.left,
    position.top,
    secondLastSide,
    thirdLastSide,
  ])

  return (
    <LogoContainer ref={logoRef} position={position}>
      <DVDLogo color={color} />
    </LogoContainer>
  )
}
