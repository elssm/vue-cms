import VueRouter from 'vue-router'

//导入对应的路由组件
import HomeContainer from './components/tabber/HomeContainer.vue'
import MemberContainer from './components/tabber/MemberContainer.vue'
import ShopcarContainer from './components/tabber/ShopcarContainer.vue'
import SearchContainer from './components/tabber/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'

var router = new VueRouter({
    routes:[    //配置路由规则
        {path:'/',redirect:'/home'},    //路由重定向
        {path:'/home',component: HomeContainer},
        {path:'/member',component: MemberContainer},
        {path:'/shopcar',component: ShopcarContainer},
        {path:'/search',component: SearchContainer},
        {path:'/home/newslist',component: NewsList},
        {path:'/home/newsinfo/:id',component: NewsInfo},
        {path:'/home/photolist',component: PhotoList},
        {path:'/home/photoinfo/:id',component: PhotoInfo},
        {path:'/home/goodslist',component: GoodsList},

    ],
    linkActiveClass:'mui-active'    //覆盖默认的路由高亮的类，默认类叫做router-link-active
})

export default router