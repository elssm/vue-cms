import VueRouter from 'vue-router'

//导入对应的路由组件
import HomeContainer from './components/tabber/HomeContainer.vue'
import MemberContainer from './components/tabber/MemberContainer.vue'
import ShopcarContainer from './components/tabber/ShopcarContainer.vue'
import SearchContainer from './components/tabber/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'

var router = new VueRouter({
    routes:[    //配置路由规则
        {path:'/',redirect:'/home'},    //路由重定向
        {path:'/home',component: HomeContainer},
        {path:'/member',component: MemberContainer},
        {path:'/shopcar',component: ShopcarContainer},
        {path:'/search',component: SearchContainer},
        {path:'/home/newslist',component: NewsList},
        {path:'/home/newsinfo/:id',component: NewsInfo},

    ],
    linkActiveClass:'mui-active'    //覆盖默认的路由高亮的类，默认类叫做router-link-active
})

export default router