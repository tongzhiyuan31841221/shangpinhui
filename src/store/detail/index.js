import { getGoodinfo, addOrUpdataShopcart } from "@/api"
import {createUserId} from "@/utils/USER_id"
const state = {
    goodinfo: {},
    uuid_token: localStorage.getItem("USER_ID") || createUserId(),
}
const actions = {
    async getinfo(context, params) {
        let res = await getGoodinfo(params)
        if (res.code == 200) {
            // console.log(res.data);
            context.commit("GETINFO", res.data)
        }
    },
    async addshopcart(context, { skuId, num }) {
        let res = await addOrUpdataShopcart(skuId, num)
        console.log("actions中", skuId, num);
        if (res.code == 200) {
            console.log(res.code);
            return "success"
        } else {
            return Promise.reject(new Error("failed"))
        }
    }
}
const mutations = {
    GETINFO(state, goodinfo) {
        state.goodinfo = goodinfo

    }
}
const getters = {
    //面包屑的数据
    categoryView(state) {
        //研究这个问题:
        //起始状态:state.detailInfo起始状态空对象,空对象.categoryView->undefined
        //当服务器数据回来之后state.detailInfo,并非空对象,获取的即为服务器返回的数据{7个K}
        //当前属性值:服务器的数据有值，用服务器的。服务器数据没有回来至少有一个空对象兜底【不能undefined兜底】
        return state.goodinfo.categoryView || {}
    },
    //商品信息的数据
    skuInfo() {
        return state.goodinfo.skuInfo || {}
    },
    //商品销售属性列表的数据
    spuSaleAttrList() {
        return state.goodinfo.spuSaleAttrList || []
    }


}
export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}