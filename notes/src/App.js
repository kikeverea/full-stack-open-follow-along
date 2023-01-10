import { useState, useEffect } from 'react'
import Notes from './components/Notes'
import ImportanceButton from './components/ImportanceButton'
import NewNoteForm from './components/NewNoteForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'

import './App.css'

import noteService from './services/noteService'
import loginService from './services/login'

const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [loginActive, setLoginActive] = useState(false)

  const LOCAL_STORAGE_USER_KEY = 'loggedUser'

  const getAllNotes = () => {
    noteService
      .getAll()
      .then(allNotes => setNotes(allNotes))
  }

  const checkUserLoggedIn = () => {
    const loggedInJSON = window.localStorage.getItem(LOCAL_STORAGE_USER_KEY)

    if (loggedInJSON) {
      const user = JSON.parse(loggedInJSON)
      setUser(user)
      noteService.setToken(user.token)
      setLoginActive(false)
    }
    else {
      setLoginActive(true)
    }
  }

  useEffect(checkUserLoggedIn, [])
  useEffect(getAllNotes, [])

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const newNoteChange = (event) =>
    setNewNote(event.target.value)

  const addNote = (event) => {
    event.preventDefault()

    const note = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5,
    }

    noteService
      .create(note)
      .then(newNote => {
        setNotes(notes.concat(newNote))
        setNewNote('')
      })
  }

  const toggleNoteImportance = (noteId) => {
    const note = notes.find(note => note.id === noteId)
    const changedNote = { ...note, important: !note.important }
    noteService
      .update(note.id, changedNote)
      .then(() =>
        setNotes(notes.map(note => note.id !== noteId ? note : changedNote)))
  }

  const handleLoginForm = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })

      if (user) {
        handleLogin(user)
      }
      else {
        showNotification('Wrong credentials', 'fail')
      }
    }
    catch (exception) {
      console.log(exception)
      showNotification('Wrong credentials', 'fail')
    }
  }

  const handleLogin = (user) => {
    setUser(user)
    window.localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user))
    noteService.setToken(user.token)
    setLoginActive(false)
  }

  const showNotification = (message, type) => {
    setNotification({
      message: message,
      type: type
    })

    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const showUser = () => {
    return (
      <div style={{ padding: '0 0 60px 0' }}>
        <h3>{ user.username } is logged-in</h3>
        <button onClick={ handleLogout }>logout</button>
      </div>
    )
  }

  const handleLogout = () => {
    setUser(null)
    setLoginActive(true)
    window.localStorage.removeItem(LOCAL_STORAGE_USER_KEY)
    noteService.setToken(null)
  }

  const newNoteForm = () => {
    return (
      <NewNoteForm
        onSubmit={addNote}
        inputState={newNote}
        inputStateChange={newNoteChange} />
    )
  }

  const index = () =>
    <div>
      { user !== null && showUser()}
      { user !== null && newNoteForm() }
      <br />
      <ImportanceButton showAll={showAll} onClick={() => setShowAll(!showAll)} />
      <br />
      <Notes notes={notesToShow} toggleNoteImportance={toggleNoteImportance} />
    </div>

  return (
    <>
      <h1 className='title'>Notes</h1>
      <Notification notification={ notification }/>
      <Toggable label={ 'login' } onToggle={ setLoginActive } visible={ loginActive }>
        <LoginForm handleSubmit={ handleLoginForm } />
      </Toggable>
      { !loginActive && index()}
    </>
  )
}

export default App