const NewNoteForm = ({onSubmit, inputState, inputStateChange}) =>
  <form onSubmit={onSubmit}>
    <input 
      value={inputState} 
      onChange={inputStateChange} />
    <button type="submit">save</button>
  </form>

export default NewNoteForm