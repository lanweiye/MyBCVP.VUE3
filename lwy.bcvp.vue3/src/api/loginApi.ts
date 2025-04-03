import axios from 'axios'
import type { AxiosResponse } from 'axios'

/**
 * @description
 * @author YouYou
 * @export
 * @interface LoginRequest
 */
export interface LoginRequest {
  name: string
  pass: string
}

/**
 * @description
 * @author YouYou
 * @export
 * @interface BaseResponse
 * @template T
 */
export interface BaseResponse<T> {
  status: number
  success: boolean
  msg: string
  msgDev?: string | null
  response: T
}

/**
 * @description
 * @author YouYou
 * @export
 * @interface LoginResponse
 */
export interface LoginResponse {
  success: boolean
  token: string
  expires_in: number
  token_type: string
}

/**
 * 发起登录请求
 * @function login
 * @param {LoginRequest} params - 登录请求的参数
 * @returns {Promise<BaseResponse<LoginResponse>>} 返回一个包含登录响应数据的 Promise
 * @throws {Error} 请求失败时抛出错误
 */
export const login = async (params: LoginRequest): Promise<BaseResponse<LoginResponse>> => {
  try {
    const response: AxiosResponse<BaseResponse<LoginResponse>> = await axios.get(
      'http://localhost:9291/api/Login/JWTToken3.0',
      {
        params: {
          name: params.name,
          pass: params.pass,
        },
      },
    )
    return response.data
  } catch (error) {
    throw new Error('请求失败')
  }
}
