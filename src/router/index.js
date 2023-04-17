import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)
import routes from "./routes"
import store from "@/store/index"
const orignPush = VueRouter.prototype.push
const orignReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, reslove, reject) {

    if (reslove && reject)
        orignPush.call(this, location, reslove, reject)
    else
        orignPush.call(this, location, () => { }, () => { })

}

VueRouter.prototype.replace = function (location, reslove, reject) {

    if (reslove && reject)
        orignReplace.call(this, location, reslove, reject)
    else
        orignReplace.call(this, location, () => { }, () => { })

}
let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})
export default router
// 设置不可重新登录的功能
router.beforeEach(async (to, from, next) => {
    let token = store.state.login.token
    let name = store.state.login.userName

    if (token) {
        //用户登录了,不能去login
        if (to.path == "/login") {
            next("home")
        } else {
            //   如果你有token和name,那直接放行
            if (name) {
                next()
            } else {
                try {
                    //发请求获取用户信息以后在放行
                    await store.dispatch('login/getUserInfo');
                    next();
                } catch (error) {
                    //用户没有信息，还携带token发请求获取用户信息【失败】
                    //token【学生证失效了】
                    //token失效:本地清空数据、服务器的token通知服务器清除
                    await store.dispatch('login/userLogout');
                    //回到登录页，重新获取一个新的学生证
                    next('/login');
                }
            }
        }
    }
    // 没有token,先让你过后期来改
    else {
        // 没有登陆你不可以进入这些页面
        if (to.path.indexOf("shopcart") != -1 || to.path.indexOf('pay') != -1 || to.path.indexOf("center") != -1) {
            alert("未登录无法访问")
            let path=to.path
            next(`/login?topath=${path}`);
        }
        next()
    }

})
