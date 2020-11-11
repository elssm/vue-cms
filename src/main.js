//入口文件
import Vue from 'vue'

//1.1导入路由的包
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)

//导入格式化时间的组件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat',function(dataStr,pattern='YYYY-MM-DD HH:mm:ss'){
    return moment(dataStr).format(pattern)
})

//2.1导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
//设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005/';
//全局设置post时候，表单数据的组织形式
Vue.http.options.emulateJSON = true;

//按需导入MintUI中的组件
// import { Header, Swipe, SwipeItem, Button,Lazyload } from 'mint-ui'
// Vue.component(Header.name,Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)

// Vue.use(Lazyload);
import MintUI from 'mint-ui'
Vue.use(MintUI);
import 'mint-ui/lib/style.css'


//导入MUI样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
// import './lib/mui/js/mui.js'
import './lib/css/golbal.css'


//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//1.3导入自己的router.js路由模块
import router from './router.js'


//导入App根组件
import app from './App.vue'

var vm =  new Vue({
    el:'#app',
    render:c=>c(app),
    router //1.4挂载路由对象到VM实例上
})