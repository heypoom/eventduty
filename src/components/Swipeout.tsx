import React from 'react'
import c from 'classnames'
import {useDrag} from 'react-use-gesture'
import {useSpring, animated} from 'react-spring'

interface SwipeDirection {
  children: React.ReactNode
  onSwipe?: () => void
  className?: string
}

interface SwipeoutProps {
  left?: SwipeDirection
  right?: SwipeDirection
  disabled?: boolean
  style?: any
  children?: JSX.Element[]
}

interface SwipeActionProps {
  button: SwipeDirection | undefined
  position: string
}

function SwipeAction(props: SwipeActionProps) {
  const {button, position} = props
  if (!button) return null

  const {className, children} = button

  return (
    <div className={`swipeout-actions swipeout-actions-${position}`}>
      <div className={c('swipeout-btn', className)} role="button">
        <div className="swipeout-btn-text">{children}</div>
      </div>
    </div>
  )
}

export default function Swipeout(props: SwipeoutProps) {
  const {left, right, disabled, children, ...divProps} = props
  const [{x}, set] = useSpring(() => ({x: 0}))

  const bind = useDrag(event => {
    const {
      movement: [mx],
      down,
      last,
    } = event

    if (last && mx > 80 && left && left.onSwipe) {
      left.onSwipe()
    }

    if (last && mx < -80 && right && right.onSwipe) {
      right.onSwipe()
    }

    set({x: down ? mx : 0})
  })

  const cls = c('swipeout', {[`swipeout-swiping`]: true})

  const isSwipeable = (left || right) && !disabled

  if (!isSwipeable) {
    return (
      <animated.div {...bind()} {...divProps}>
        {children}
      </animated.div>
    )
  }

  const contentStyle = {
    left: x,
  }

  const coverStyle = {
    display: 'block',
    left: x,
  }

  return (
    <div className={cls} {...bind()} {...divProps}>
      <animated.div className="swipeout-cover" style={coverStyle} />

      <SwipeAction button={left} position="left" />
      <SwipeAction button={right} position="right" />

      <animated.div className="swipeout-content" style={contentStyle}>
        {children}
      </animated.div>
    </div>
  )
}
