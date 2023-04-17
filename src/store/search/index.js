// search小仓库
import { getList } from "@/api/index"
let state = {
    List: {}
}
let mutations = {
    GETSEARCHLIST(state, value) {
        state.List = value
    }
}
let actions = {
    async getSearchList(context, params = {}) {
        let res = await getList(params)
        if (res.code === 200) {
            context.commit("GETSEARCHLIST", res.data)
        }else {
            console.log("请求出错",params)
        }
        
    }
}
let getters = {
    attrsList(state) {
        return state.List.attrsList
    },
    goodsList(state) {
        return state.List.goodsList
    },
    trademarkList(state) {
        return state.List.trademarkList
    },
    total(state) {
        return state.List.total
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}