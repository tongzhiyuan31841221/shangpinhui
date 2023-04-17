import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Search from "../pages/Search"
import Detail from "@/pages/Detail/index.vue"
import AddCartSuccess from "@/pages/AddCartSuccess"
import ShopCart from "@/pages/ShopCart"
import Trade from "@/pages/Trade"
import Pay from "@/pages/Pay"
import PaySuccess from "@/pages/PaySuccess"
import Center from "@/pages/Center"
import Myorder from "@/pages/Center/Myorder"
import Teamorder from "@/pages/Center/Teamorder"
export default [
    // 重定向遇到坑了http://localhost:8080/#/##
    {
        path: '/',
        redirect: "/home"
    },
    {
        path: "/home",
        name: "home",
        component: Home,
        meta: {
            isfooter: true
        }
    },
    {
        name: "login",
        path: "/login",
        component: Login,
        meta: {
            isfooter: false
        }
    },
    {
        name: "register",
        path: "/register",
        component: Register,
        meta: {
            isfooter: false
        }
    },
    {
        name: "search",
        path: "/search/:keyword?",
        component: Search,
        meta: {
            isfooter: true
        }
    },
    {
        path: "/detail:skuId?",
        name: "detail",
        component: Detail,
        meta: {
            isfooter: true
        }
    },
    {
        path: "/addcartsuccess:num",
        name: "addcartsuccess",
        component: AddCartSuccess
    },
    {
        path: "/shopcart",
        name: "shopcart",
        component: ShopCart,
        beforeEnter(to, from, next) {
            console.log(from.path);
            if (localStorage.getItem("USERTOKEN")) {
                next()
            } else {
                alert("请先登录个人账户")
            }
        }
    },
    {
        name: "trade",
        path: "/trade",
        component: Trade,
        beforeEnter(to, from, next) {
            console.log(from.path);
            if (from.path != '/shopcart') {
                next(false)
            } else {
                next()
            }
        }
    },
    {
        name: "pay",
        path: "/pay",
        component: Pay,
        beforeEnter(to, from, next) {
            if (from.path != '/trade') {

                next(false)
            } else {
                next()
            }
        }
    },
    {
        name: "paysuccess",
        path: "/paysuccess",
        component: PaySuccess,
        beforeEnter(to, from, next) {
            if (from.path != 'pay') {

                next(false)
            } else {
                next()
            }
        }
    },
    {
        name: "center",
        path: "/center",
        component: Center,
        children: [
            {
                name: "myorder",
                path: "myorder",
                component: Myorder
            }, {
                name: "teamorder",
                path: "teamorder",
                component: Teamorder
            }
        ]
    }


]