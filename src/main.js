import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import moment from 'moment'
import ElementUI from 'element-ui'
import VueLazyLoad from 'vue-lazyload'

//基于vue的组件，需要使用Vue.use()
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueLazyLoad,{
    loading:'src/statics/site/images/01.gif'
})

//不是基于Vue的插件，如果想绑定到Vue 上面
Vue.prototype.$axios = axios
axios.defaults.baseURL = "http://39.108.135.214:8899/"

//全局过滤器
Vue.filter('dateFmt', (input, formatString = "YYYY-MM-DD") => {
    return moment(input).format(formatString)
})

//导入全局样式
import 'element-ui/lib/theme-chalk/index.css'
import "./statics/site/css/style.css"

//导入根组件
import App from './App.vue'

// 导入组件
import layout from './components/layout'
import goodslist from './components/goods/goodslist'
import goodsinfo from './components/goods/goodsinfo'

//设置路由
const router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/site/goodslist'
        },
        {
            path: '/site',
            component: layout,
            children: [{
                path: 'goodslist',
                component: goodslist
            }, {
                path: 'goodsinfo/:goodsId',
                component: goodsinfo
            }]
        }
    ]
})

new Vue({
    el: "#app",
    router,
    render: h => h(App)
})