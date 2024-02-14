// eslint-disable-next-line @typescript-eslint/no-unused-vars
import 'axios'
import {  AxiosRequestHeaders } from 'axios'

declare module 'axios' {
  export interface AxiosInstance {
    request<T>(config: AxiosRequestConfig): Promise<T>

    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>

    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>

    head<T>(url: string, config?: AxiosRequestConfig): Promise<T>

    post<T>(
      url: string,
      data?: object | string,
      config?: AxiosRequestConfig
    ): Promise<T>

    put<T>(
      url: string,
      data?: object | string,
      config?: AxiosRequestConfig
    ): Promise<T>

    patch<T>(
      url: string,
      data?: object | string,
      config?: AxiosRequestConfig
    ): Promise<T>
  }

  export interface AxiosRequestConfig {
    handlerEnabled?: boolean
  }

  export interface InternalAxiosRequestConfig<D>
    extends AxiosRequestConfig<D> {
    headers: AxiosRequestHeaders
  }
}
