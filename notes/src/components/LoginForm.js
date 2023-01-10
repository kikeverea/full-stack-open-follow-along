import { useState } from 'react'

const LoginForm = ({ handleSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const column = {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  }

  const row = {
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    await handleSubmit(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={ handleLogin } style={ column }>
      <div style={ row }>
        username
        <input
          id='username'
          type="text"
          value={ username }
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div style={ row }>
        password
        <input
          id='password'
          type="password"
          value={ password }
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div>
        <button id='login-button' type="submit">login</button>
      </div>
    </form>
  )
}

export default LoginForm
