import axios from 'axios'

const baseUrl = '/api/notes'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async note => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, note, config)
  return response.data
}

const update = async (id, note) => {
  const response = await axios.put(`${baseUrl}/${id}`, note)
  return response.data
}

export default { getAll, create, update, setToken }