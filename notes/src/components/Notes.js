import Note from './Note'

const Notes = ({ notes, toggleNoteImportance }) =>
  <table>
    <tbody>
      {notes.map(note =>
        <Note key={note.id}
          note={note}
          toggleImportance={toggleNoteImportance}/>

      )}
    </tbody>
  </table>

export default Notes