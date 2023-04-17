import Vue from 'vue'
import VeeValidate, { Validator, } from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN' // 引入中文文件
Validator.addLocale(zh)
const config = {
    locale: 'zh_CN',
    fieldsBagName: 'fieldBags'
}
Vue.use(VeeValidate, config)
// 配置中文信息
const dictionary = {
    zh_CN: {
        messages: {
            required: (field) => '请输入',
            numeric: (field) => field + '必须为数值',
            url: () => '请输入正确格式的服务器地址',
            ip: () => '请输入正确的IP地址'
        },
        attributes: {
            ip: 'IP地址',
            httpPort: 'HTTP端口'
        }
    }
}
Validator.updateDictionary(dictionary)
// 用的话就三种差不多,完全自定义错误信息和方法,返回promise或者bool
// 用于预定义字符串直接上
// 用自定义正则,对象形式就行

