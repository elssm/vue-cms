<template>
    <div class="goodsinfo-container">

        <!--要实现动画的小球-->
        <transition
        @before-enter='beforeEnter'
        @enter='enter'
        @after-enter='afterEnter'>
        <div class="ball" v-show="flag"></div>
        </transition>
        

        <!--轮播图区域-->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :lunbotuList="lunbotuList" :imgname="'src'"></swiper>
					</div>
				</div>
			</div>

        <!--商品购买区域-->
        <div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            市场价：
                            <span style="margin-right:10px;"><del>¥{{goodsinfo.market_price}}</del></span>
                            销售价：
                            <span style="font-size:16px;color:red;font-weight:bold;">¥{{goodsinfo.sell_price}}</span>
                        </p>
                        <!--注意：这里的max是库存量-->
                        <!--由于goodsinfo是通过ajax动态获取回来的，但是ajax是异步请求，需要消耗时间，
                        因此可能会导致这样的情况，nobox组件先于ajax渲染出来，此时，组件被渲染的时候，goodsinfo为空对象
                        因此，传递到子组件中的stock_quantity是undifined-->
                        <p>购买数量：<nobox :max="goodsinfo.stock_quantity" @func="getSelectdCount"></nobox></p>
                        <div>
                            <mt-button type='primary' size='small'>立即购买</mt-button>
                            <mt-button type='danger' size='small' @click='addToCart'>加入购物车</mt-button>
                        </div>
					</div>
				</div>
			</div>

        <!--商品参数区域-->
        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号：{{goodsinfo.goods_no}}</p>
                        <p>库存情况：{{goodsinfo.stock_quantity}}</p>
                        <p>上架时间：{{goodsinfo.add_time | dateFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer btnarea">

                    <!--使用编程式导航，来实现路由页面的跳转
                    编程式导航：就是使用JS的代码的方式，来实现路由的跳转-->
                    <!--元素导航：使用router-link元素实现的导航-->
                    <mt-button type='primary' size='large' plain @click="goDesc">图文介绍</mt-button>
                    <mt-button type='danger' size='large' plain @click="goComment">商品评论</mt-button>
                </div>
			</div>
    </div>
</template>

<script>
import nobox from '../subcomponents/goodsinfo_nobox.vue'
import swiper from '../subcomponents/Swiper.vue'
import {mapMutations} from 'vuex'
export default {
    data() {
        return {
            id:this.$route.params.id,
            lunbotuList:[],  //商品的轮播图
            goodsinfo:{},    //商品详情
            flag:false,  //小球的显示与隐藏状态
            selectedCount:1 //用户选择的商品购买数量默认为1
        }
    },
    created() {
        this.getlunbotu();
        this.getGoodsInfoById();
    },
    methods: {
        ...mapMutations(["addToCar"]),
        async getlunbotu(){
            const {data} = await this.$http.get('api/getthumimages/'+ this.id);
            if(data.status === 0) return this.lunbotuList = data.message;
        },
        async getGoodsInfoById(){
            //根据ID获取商品参数
            const {data} = await this.$http.get('api/goods/getinfo/'+ this.id); 
            if(data.status === 0) return this.goodsinfo = data.message[0];
        },
        goDesc(){
            //点击按钮，跳转到商品的描述页面
            this.$router.push('/home/goodsdesc/' + this.goodsinfo.id);
        },
        goComment(){
            // this.$router.push('/home/goodscomment/' + this.goodsinfo.id);
            this.$router.push({name:'goodscmt',params:{id:this.goodsinfo.id}});
        },
        addToCart(){
            //点击加入购物车
            this.flag = !this.flag;
            //调用mutations中的addToCart
            // this.$store.commit('addToCart',{id:this.id,count:this.selectedCount});

            //直接调用mapMutations中映射出来的方法
            this.addToCar({id:this.id,count:this.selectedCount});
        },
        beforeEnter(el){
          //动画开始之前，设置小球的起始状态  
          el.style.transform = 'translate(0,0)';
        },
        enter(el,done){
            el.offsetWidth
            //入场动画结束之后，小球的终止状态


            //动态获取小球的横纵坐标
            const ballPos = el.getBoundingClientRect();
            // console.log(ballPos);

            //动态获取徽标的横纵坐标
            const badgePos = document.getElementById('badge').getBoundingClientRect();
            const left = badgePos.left - ballPos.left
            const top = badgePos.top - ballPos.top


            el.style.transform = "translate("+left+"px,"+top+"px)";
            //贝塞尔曲线在线生成器：http://cubic-bezier.com
            el.style.transition = 'all 0.5s cubic-bezier(.46,-0.4,1,.49)';
            //当入场动画完成之后，需要手动调用done回调函数，直接跳过小球的出场动画
            done()
        },
        afterEnter(el){
            //入场动画完成之后的回调函数
            this.flag = !this.flag;

        },
        getSelectdCount(c){
            // console.log('父组件中拿到了传递过来的count值为' + c);
            //把用户选择的最新数量值，保存在data中，方便用户点击加入购物车按钮时，把数据同步到徽标中
            this.selectedCount = c;
        }
    },
    components:{
        swiper,  //注册子组件
        nobox
        }
}
</script>

<style lang="scss" scoped>

.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;
}
.btnarea{
    flex-direction: column;
    button + button{
       margin-top: 15px; 
    }
}   

.ball{
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
    //让小球脱离标准流
    position: absolute;
    z-index: 99;
    left: 147px;
    top: 392px;
    //将来小球要通过动画位移到的位置
    // transform: translate(90px,228px);
}
</style>