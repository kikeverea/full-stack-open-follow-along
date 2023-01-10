const Note = ({ note , toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important'
  return (
    <tr>
      <td>{note.content}</td>
      <td>
        <button onClick={() => toggleImportance(note.id)}>
          {label}
        </button>
      </td>
    </tr>
  )
}

export default Note