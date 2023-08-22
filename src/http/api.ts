import axios, { AxiosResponse } from 'axios'

const server = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-type': 'application/json',
  },
})

const withRetry = async (res: () => Promise<AxiosResponse>, attempt: number = 1) => {
  let response = await res()
  if (response.status == 503 && (attempt < 3)) {
    console.log('Retrying...' + attempt)
    response = await withRetry(res, attempt + 1)
  }
  return response
}

const generate = async (goal: string) => {
  return withRetry(() => server.post('/generate', { goal }))
}

export default {
  server,
  generate
}