import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosError
} from 'axios'
import { GetTokenDBC, RefreshToken } from '@/action/auth-action'

// Define the type for the headers in the request config
interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders
}

// Define the type for the error response
interface ErrorResponse {
  status: number
  message: string
}

const baseUrl: string = process.env.API_URL || ''

// Create an Axios instance with the defined base URL and default headers
const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add an interceptor to modify the request config before the request is sent
axiosInstance.interceptors.request.use(
  async (config: AdaptAxiosRequestConfig) => {
    const token: string | null = await GetTokenDBC()
    if (token && token.length > 0 && config.headers) {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`
      }
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }
)

// Add an interceptor to handle the response of the request
axiosInstance.interceptors.response.use(
  response => {
    return handleResponse(response)
  },
  async (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      await RefreshToken()
      // Provide a default configuration object if error.config is undefined
      const config = error.config || {}
      return axiosInstance(config)
    }
    return Promise.reject(error)
  }
)

// Handle the response data and error
async function handleResponse(response: AxiosResponse) {
  const data = response.data
  if (response.status === 401) {
    await RefreshToken()
  }

  if (response.status >= 200 && response.status < 300) {
    return data || response.statusText
  } else {
    const error: ErrorResponse = {
      status: response.status,
      message:
        typeof data === 'string' && data.length > 0 ? data : response.statusText
    }
    return { error }
  }
}

// Create a wrapper object for making different types of requests
export const AxiosWrapper = {
  get: (url: string) => axiosInstance.get<AxiosResponse>(url),
  post: (url: string, body: object) =>
    axiosInstance.post<AxiosResponse>(url, body),
  put: (url: string, body: object) =>
    axiosInstance.put<AxiosResponse>(url, body),
  del: (url: string) => axiosInstance.delete<AxiosResponse>(url),
  normalPost: (url: string, body: object) =>
    axiosInstance.post<AxiosResponse>(url, body)
}
