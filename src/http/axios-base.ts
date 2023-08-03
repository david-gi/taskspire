import axios from 'axios'

const server = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-type': 'application/json',
  },
})

const ai = axios.create({
  baseURL: 'http://openai.com/',
  headers: {
    'Content-type': 'application/json',
  },
})

export default {
  server,
  ai
}