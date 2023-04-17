import { userLogin, userLogout, getUserInfo } from "@/api"
const state = {
    // 最先开始做的时候是直接在home中用本地的,所以这边就不所谓,后来改掉了,但没测试出来
    token: localStorage.getItem("USERTOKEN"),
    userName: ""
}
const actions = {
    // 用户登录
    async userLogin(context, data) {
        let res = await userLogin(data)
        if (res.code == 200) {
            context.commit("USERLOGIN", res.data)
        } else {
            return Promise.reject(new Error("用户登录fail"))
        }
    },
    // 用户退出登录
    async userLogout(context) {
        let res = await userLogout()
        if (res.code == 200) {
            context.commit("USERLOGOUT")

            return "ok"
        } else {
            return Promise.reject(new Error("退出登录fail"))
        }
    },
    // 获取用户信息
    async getUserInfo(context) {
        let res = await getUserInfo()

        if (res.code == 200) {
            context.commit("GETUSERINFO", res.data)
        } else {
            return Promise.reject(new Error("获取用户信息fail"))
        }
    }
}
const mutations = {
    USERLOGIN(state, data) {
        state.token = data.token

        localStorage.setItem("USERTOKEN", data.token)
    },
    GETUSERINFO(state, data) {
        state.userName = data.name

    },
    USERLOGOUT(state) {
        {
            state.token = ""
            localStorage.removeItem("USERTOKEN")
        }
    }
}
const getters = {}
export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}