import Note from "./Note"

const Notes = ({notes, toggleNoteImportance}) =>
  <ul>
    {notes.map(note => 
      <Note key={note.id} 
            note={note} 
            toggleImportance={toggleNoteImportance}/>

    )}
  </ul>

export default Notes