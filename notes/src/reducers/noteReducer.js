import { createSlice } from '@reduxjs/toolkit'
import notesService from '../services/notesJsonService'

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers : {
    setNotes(state, action) {
      return action.payload
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(note =>
        note.id !== id ? note : changedNote
      )
    }
  }
})

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await notesService.getAll()
    dispatch(setNotes(notes))
  }
}

export const createNote = content => {
  return async dispatch => {
    const newNote = await notesService.createNew(content)
    dispatch(appendNote(newNote))
  }
}

export const { setNotes, appendNote, toggleImportanceOf } = noteSlice.actions
export default noteSlice.reducer