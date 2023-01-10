import axios from 'axios'
const client = axios.create({
  baseURL: window.location.origin,
  timeout: 1000,
  withCredentials: true
})

const ENDPOINTS = {
  me: '/.netlify/functions/me',
  logout: '/.netlify/functions/logout',
  login: '/.netlify/functions/login',
  refresh: '/.netlify/functions/refresh',
  serverStatus: '/.netlify/functions/server-status',
  startServer: '/.netlify/functions/start-server'
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getUser = async () => {
  return await client.get(ENDPOINTS.me)
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getServers = async () => {
  return await client.get(ENDPOINTS.serverStatus)
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getLogin = async () => {
  return await client.get(ENDPOINTS.login)
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const startServer = async (instanceId: string) => {
  return await client.post(ENDPOINTS.startServer, {
    instanceId
  })
}

// Add a request interceptor
client.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, async function (error) {
  // Do something with request error
  return await Promise.reject(error)
})

// Add a response interceptor
client.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, async function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return await Promise.reject(error)
})

export { getUser, getServers, getLogin, startServer, ENDPOINTS }
