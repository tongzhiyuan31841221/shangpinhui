// 引入mock
import Mock from "mockjs"
// 引入json，你要知道webpack默认暴露的数据：json，图片
import banner from "./banner.json"
import floor from "./floor.json"
// mock数据
Mock.mock("/mock/banner",{
    state:200,
    data:banner
})
Mock.mock("/mock/floor",{
    state:200,
    data:floor
})