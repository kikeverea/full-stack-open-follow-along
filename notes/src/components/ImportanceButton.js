const ImportanceButton = ({showAll, onClick}) =>
  <div>
    <button onClick={onClick}>
      show {showAll ? 'important' : 'all' }
    </button>
  </div>

export default ImportanceButton