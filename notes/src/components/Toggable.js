import { useState } from 'react'

const Toggable = ({ label, visible, onToggle, children }) => {
  const [active, setActive] = useState(visible)

  const showWhenActive = {
    display: active ? 'none' : ''
  }

  const hideWhenActive = {
    display: active ? '' : 'none'
  }

  console.log('active? ', active)
  console.log('show ', showWhenActive)
  console.log('hide ', hideWhenActive)

  const toggle = () => {
    const newState = !active
    setActive(newState)
    onToggle(newState)
  }

  return (
    <>
      <div style={ hideWhenActive }>
        <button onClick={ toggle }>{ label }</button>
      </div>
      <div style={ showWhenActive }>
        { children }
      </div>
    </>
  )
}

export default Toggable