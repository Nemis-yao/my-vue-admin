import service from "./axios";
// 返回数据格式
interface ResponseData {
    code: number,
    data: any,
    message: string
}

/**
 * 
 * @param {string} url 请求路径
 * @param {any} [params] 请求参数，将自动拼接为查询字符串
 * @returns 
 */
function get(url: string, params?: any): Promise<ResponseData> {
    return service.get(url, { params })
}

/**
 * 
 * @param {string} url 请求路径
 * @param {any} data 请求体
 * @returns 
 */
function post(url: string, data?: any): Promise<ResponseData> {
    return service.post(url, data)
}


export { get, post }