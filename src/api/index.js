//统一管理项目前部的接口
//这里是真会发请求的
import request from "./request"
//这里是求取假数据
import mockrequest from "./mockrequest"
export const resCategoryList = () => {
    // 不要再封装axios只返回一个data
    return request({
        method: 'get',
        url: '/product/getBaseCategoryList'
    })
}
export const getBanners = () => {
    return mockrequest({
        method: "get",
        url: "/banner"
    })
}
export const getFloors = () => {
    return mockrequest({
        method: "get",
        url: "/floor"
    })
}
export const getList = (params) => {

    return request({
        method: "post",
        url: "/list",
        data: params
    })
}
export const getGoodinfo = (skuId) => {
    return request({
        method: "get",
        url: `/item/${skuId}`,
    })

}
// 当前商品上传到购物车/api/cart/addToCart/{ skuId }/{ skuNum }
export const addOrUpdataShopcart = (skuId, skuNum) => {

    return request({
        method: "post",
        url: `/cart/addToCart/${skuId}/${skuNum}`
    })
}
// 向服务器获取当前购物车列表 /api/cart/cartList
export const getShopcartList = () => {
    // 要用请求头带上游客都uuid
    return request({
        method: "get",
        url: "cart/cartList"
    })

}
// export const UpdataShopcart = ({skuId, skuNum}) => {
// console.log(skuId, skuNum);
//     return request({
//         method: "post",
//         url: `/cart/addToCart`,
//         data:{
//             skuId,
//             skuNum
//         }
//     })好像不行才
// }
// console.log("这是测试一下参数",UpdataShopcart({skuId:2, skuNum:1}))
// /api/cart/checkCart/{skuID}/{isChecked}
export const updateListState = (skuID, isChecked) => {
    return request({
        method: "get",
        url: `/cart/checkCart/${skuID}/${isChecked}`
    })
}
// 删除对应的商品/api/cart/deleteCart/{skuId}
export const delCartList = (skuId) => {
    return request({
        method: "delete",
        url: `/cart/deleteCart/${skuId}`
    })
}
// 获取验证码/api/user/passport/sendCode/{phone}
export const getCode = (phone) => {
    return request({
        method: "get",
        url: `/user/passport/sendCode/${phone}`
    })
}
// getCode("13685713074")
// 用户注册/api/user/passport/register
export const userRegister = (phone, password, code) => {
    return request({
        method: "post",
        url: "/user/passport/register",
        data: {
            phone,
            password,
            code
        }
    })
}
// 用户登录/api/user/passport/login,{phone,password}
export const userLogin = (data) => {
    return new request({
        method: "post",
        url: "/user/passport/login",
        data
    })
}
//   userLogin({phone:'13685713074',password:'123'})
// 通知服务器用户退出登录/api/user/passport/logout
export const userLogout = () => {
    return request({
        method: "get",
        url: "/user/passport/logout"
    })
}
export const getUserInfo = () => {
    return request({
        url: `/user/passport/auth/getUserInfo`,
        method: 'get'
    })
};
// 获取交易页信息 /api/order/auth/trade get
export const getTradeinfo = () => {
    return request({
        method: "get",
        url: "/order/auth/trade"
    })
}
//提交订单信息 /api/order/auth/submitOrder?tradeNo={tradeNo}
export const submitOrder = (tradeNo, data) => {
    return request({
        method: "post",
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data
    })
}
// 获取支付信息/api/payment/weixin/createNative/{orderId}
export const getPayinfo = (orderId) => {
    return request({
        method: "get",
        url: `/payment/weixin/createNative/${orderId}`
    })

}
//查询订单支付状态/api/payment/weixin/queryPayStatus/{orderId}
export const getpayState = (orderId) => {
    return request({
        method: "get",
        url: `/payment/weixin/createNative/${orderId}`
    })
}
// 获取我的订单/api/order/auth/{page}/{limit}
export const getOrderList=(page,limit)=>{
    return request({
        method:"get",
        url:`/order/auth/${page}/${limit}`
    })
}