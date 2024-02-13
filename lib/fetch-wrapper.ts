import { GetTokenDBC, RefreshToken } from '@/action/auth-action'

const baseUrl: string = process.env.API_URL || ''

interface ErrorResponse {
  status: number
  message: string
}

async function getHeaders(): Promise<Record<string, string>> {
  const token: string | null = await GetTokenDBC()
  const headers: Record<string, string> = { 'Content-type': 'application/json' }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  return headers
}

async function get(url: string) {
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: await getHeaders()
  }

  const response: Response = await fetch(baseUrl + url, requestOptions)
  return await handleResponse(response)
}

async function post(url: string, body: object) {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: await getHeaders(),
    body: JSON.stringify(body)
  }
  const response: Response = await fetch(baseUrl + url, requestOptions)
  return await handleResponse(response)
}

async function put(url: string, body: object) {
  const requestOptions: RequestInit = {
    method: 'PUT',
    headers: await getHeaders(),
    body: JSON.stringify(body)
  }
  const response: Response = await fetch(baseUrl + url, requestOptions)
  return await handleResponse(response)
}

async function del(url: string) {
  const requestOptions: RequestInit = {
    method: 'DELETE',
    headers: await getHeaders()
  }
  const response: Response = await fetch(baseUrl + url, requestOptions)
  return await handleResponse(response)
}

async function normalPost(url: string, body: object) {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(body)
  }
  const response: Response = await fetch(baseUrl + url, requestOptions)
  return await handleResponse(response)
}

async function handleResponse(response: Response) {
  const text: string = await response.text()
  let data: unknown

  try {
    data = JSON.parse(text)
  } catch (error) {
    data = text
  }

  if (response.status === 401) {
    await RefreshToken()
  }

  if (response.ok) {
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
  get,
  post,
  put,
  del,
  normalPost
}
