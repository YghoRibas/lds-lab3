import axios, { type InternalAxiosRequestConfig } from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json'
  }
})

const requestInterceptor = (request: InternalAxiosRequestConfig): InternalAxiosRequestConfig<any> => {
  const accessToken = localStorage.getItem('accessToken')

  if (accessToken != null) request.headers.Authorization = `Bearer ${accessToken}`

  return request
}

const responseErrorInterceptor = async (error: any): Promise<any> => {
  if (error.response.status === 401) {
    localStorage.removeItem('accessToken')
    window.location.reload()
  }

  return await Promise.reject(error)
}

http.interceptors.request.use(requestInterceptor)
http.interceptors.response.use((response) => response, responseErrorInterceptor)

export { http }
