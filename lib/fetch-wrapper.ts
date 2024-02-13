import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import { GetTokenDBC, RefreshToken } from '@/action/auth-action'

const baseUrl: string = process.env.API_URL || ''

interface ErrorResponse {
  status: number
  message: string
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const token: string | null = await GetTokenDBC()
  if (token && token.length > 0 && config.headers) {
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`
    }
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return handleResponse(response)
  },
  async (error: any) => {
    if (error.response && error.response.status === 401) {
      await RefreshToken()
      return axiosInstance(error.config)
    }
    return Promise.reject(error)
  }
)

async function handleResponse(response: AxiosResponse): Promise<any> {
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

export const fetchWrapper = {
  get: (url: string) => axiosInstance.get<any>(url),
  post: (url: string, body: any) =>
    axiosInstance.post<any, AxiosResponse<any>>(url, body),
  put: (url: string, body: any) =>
    axiosInstance.put<any, AxiosResponse<any>>(url, body),
  del: (url: string) => axiosInstance.delete<any>(url),
  normalPost: (url: string, body: any) =>
    axiosInstance.post<any, AxiosResponse<any>>(url, body)
}
