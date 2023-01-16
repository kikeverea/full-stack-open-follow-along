import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'
import noteService from '../services/notesJsonService'

const Note = ({ note, handleClick }) => {
  return(
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = () => {
  const dispatch = useDispatch()

  const notes = useSelector(({ filter, notes }) =>
    filter === 'ALL'
      ? notes
      : filter === 'IMPORTANT'
        ? notes.filter(note => note.important)
        : notes.filter(note => !note.important)
  )

  const toggleImportance = async (note) => {
    const toggled = { ...note, important: !note.important }
    const updated = await noteService.updateNote(toggled)
    if (updated) {
      dispatch(toggleImportanceOf(note.id))
    }
  }

  return(
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() => toggleImportance(note)}
        />
      )}
    </ul>
  )
}

export default Notes