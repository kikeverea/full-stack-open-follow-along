import { useState, useEffect } from 'react'
import Notes from './components/Notes'
import ImportanceButton from './components/ImportanceButton'
import NewNoteForm from './components/NewNoteForm'
import noteService from './services/noteService'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    noteService
      .getAll()
      .then(allNotes => setNotes(allNotes))
  }

  useEffect(hook, [])
  
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
    console.log('Called')

    const note = notes.find(note => note.id === noteId)
    const changedNote = {...note, important: !note.important}
    noteService
      .update(note.id, changedNote)
      .then(() =>
        setNotes(notes.map(note => note.id !== noteId ? note : changedNote)))
  }

  return (
    <div>
      <h1>Notes</h1>
      <ImportanceButton showAll={showAll} onClick={() => setShowAll(!showAll)} />
      <Notes notes={notesToShow} toggleNoteImportance={toggleNoteImportance} />
      <NewNoteForm 
        onSubmit={addNote} 
        inputState={newNote} 
        inputStateChange={newNoteChange} />
    </div>
  )
}

export default App 