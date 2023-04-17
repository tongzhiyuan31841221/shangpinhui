import { getShopcartList, addOrUpdataShopcart, updateListState, delCartList } from "@/api"
import { add } from "lodash";
const actions = {
    // 获取购物车列表
    async getShopcartList(context, value) {
        let res = await getShopcartList()
        if (res.code == 200) {
            context.commit("GETSHOPCARTLIST", res.data)
        } else {
            alert("请求购物车列表失败")
        }
    },
    // 更新物品的数目
    async updateList(context, { skuId, count }) {
        let res = await addOrUpdataShopcart(skuId, count)
        if (res.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("更新物品的数目fail"))
        }
    },
    // 更新物品的选中状态
    async updateListState(context, { skuId, isChecked }) {
        let res = await updateListState(skuId, isChecked)
        if (res.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("更新物品的选中状态fail"))
        }
    },
    // 删除对应商品的请求
    async delCartList(context, skuId) {
        let res = await delCartList(skuId)
        if (res.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("删除对应商品的请求fail"))
        }
    }
}
const mutations = {
    GETSHOPCARTLIST(state, cartInfo) {
        state.cartInfo = cartInfo
    }
}
const state = {
    cartInfo: []
}
const getters = {
    cartInfo(state) {
        return state.cartInfo[0] || {}
    }
}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}