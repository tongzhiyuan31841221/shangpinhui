// 这是假的，但是结构还是一样的，到时候baseURL一换可以直接对接真数据
import axios from "axios"
// 引入进度条
import nprogress from "nprogress"
import "nprogress/nprogress.css"
let request = axios.create({
    // 设置请求的基础路径，发现真实服务器都带/api
    baseURL: "/mock",
    // 设置请求超时时间
    timeout: 5000,
})
// 添加请求拦截器
request.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    // 进度条开始
    nprogress.start()
    return config;
});
// 添加响应拦截器
request.interceptors.response.use((res) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    nprogress.done()
    return res.data;
}, (err) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log(err.message)
    return new Promise();
});
export default request
