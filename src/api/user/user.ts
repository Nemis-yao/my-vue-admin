import { post } from '@/utils/http'
import type { LoginParams } from '@/api/user/type'
// 枚举请求地址
enum Api {
    Login = "/login"
}

function loginApi(data: LoginParams): Promise<any> {
    return post(Api.Login, data)
}

export {
    loginApi
}