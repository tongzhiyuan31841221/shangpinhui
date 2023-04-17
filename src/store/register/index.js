import { getCode, userRegister } from "@/api"
const state = {
    code: "",
}
const actions = {
    // 获取验证码
    async getcode(context, phone) {
        let res = await getCode(phone)
        console.log(res);
        if (res.code == 200) {
            context.commit("GETCODE", res.data)
            return "ok"
        }
        else {
            return Promise.reject(new Error("获取验证码fail"))
        }
    },
    // 注册用户
    async userRegister(context, { phone, password, code }) {
        let res = await userRegister(phone, password, code)
        if (res.code == 200) {
            console.log(res.data);
        } else {
            return Promise.reject(new Error("注册用户fail"))
        }

    }
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },

}
const getters = {
    stocode(state) {
        return state.code
    },
    token(state) {
        return state.token
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}