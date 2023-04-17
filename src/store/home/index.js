// home小仓库
import { resCategoryList } from "@/api"
import { getBanners } from "@/api"
import { getFloors } from "@/api"
let state = {
    category: [],
    banner: [],
    floors: [],
}
let mutations = {
    GETCATEGORY(state, category) {
        state.category = category;
    },
    GETBANNER(state, banner) {
        state.banner = banner
    },
    GETFLOORS(state, value) {
        state.floors = value
    }
}
let actions = {
    async CategoryList(context, value) {
        //获取服务器的数据,存储在vuex仓库中
        //reqCategory函数执行,返回的是Promise对象【pending、成功、失败】
        //await 等待成功的结果
        let result = await resCategoryList();
        //判断服务器返回的状态是200->成功
        // console.log(result.data);
        if (result.code == 200) {
            //提交mutation存储服务器数据
            context.commit("GETCATEGORY", result.data);
        }
    },
    async getBanner(context, value) {
        let res = await getBanners()

        context.commit("GETBANNER", res.data)
    },
    async getFloors(context, value) {
        let res = await getFloors()
        context.commit("GETFLOORS", res.data)
    }
}
let getters = {}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}