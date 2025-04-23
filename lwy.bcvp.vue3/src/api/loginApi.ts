// import axios from 'axios'
import { get, type BaseResponse } from '@/utils/axiosInstance' // 使用配置好的 axios 实例来封装登录请求
import { useAuthStore } from '@/stores/auth'

/**
 * 请求的入参接口
 * @interface LoginRequest
 * @property {string} name - 用户名
 * @property {string} pass - 密码
 */
export interface LoginRequest {
  name: string
  pass: string
}

/**
 * 登录响应接口
 * @interface LoginResponse
 * @property {boolean} success - 是否登录成功
 * @property {string} token - JWT token
 * @property {number} expires_in - token 的有效时长（秒）
 * @property {string} token_type - token 类型，通常为 "Bearer"
 */
export interface LoginResponse {
  success: boolean
  token: string
  expires_in: number
  token_type: string
}

export const userInfo = async () : Promise<BaseResponse<User.UserResponse>> => {
  try {
    const userStore = useAuthStore()
    const response = await get<BaseResponse<User.UserResponse>>('/api/user/getInfoByToken',{
      token: userStore.token,
    })
    return response
  } catch (error) {
    throw new Error('请求失败')
  }
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
    const response = await get<BaseResponse<LoginResponse>>(
      'http://localhost:9291/api/Login/JWTToken3.0',
      {
        name: params.name,
        pass: params.pass,
      },
    )
    return response
  } catch (error) {
    throw new Error('请求失败')
  }
}
/**
 * 获取菜单列表
 * @param params 
 * @returns 
 */
export const getAuthMenuListApi = async (params: Menu.MenuRequest) : Promise<BaseResponse<Menu.MenuOptions>> => {
  try {
    const response = await get<BaseResponse<Menu.MenuOptions>>('/api/permission/GetNavigationBar',{
      uid: params.uid,
    })
    return response
  } catch (error) {
    throw new Error('请求失败')
  }
}
