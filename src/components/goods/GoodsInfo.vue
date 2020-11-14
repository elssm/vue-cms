<template>
    <div class="goodsinfo-container">
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
				<div class="mui-card-header">页眉</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            市场价：
                            <span style="margin-right:10px;"><del>2699</del></span>
                            销售价：
                            <span style="font-size:16px;color:red;font-weight:bold;">2399</span>
                        </p>
                        <p>购买数量</p>
                        <div>
                            <mt-button type='primary' size='small'>立即购买</mt-button>
                            <mt-button type='danger' size='small'>加入购物车</mt-button>
                        </div>
					</div>
				</div>
			</div>

        <!--商品参数区域-->
        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号：</p>
                        <p>库存情况：</p>
                        <p>上架时间：</p>
					</div>
				</div>
				<div class="mui-card-footer btnarea">
                    <mt-button type='primary' size='large' plain>图文介绍</mt-button>
                    <mt-button type='danger' size='large' plain>商品评论</mt-button>
                </div>
			</div>
    </div>
</template>

<script>
import swiper from '../subcomponents/Swiper.vue'
export default {
    data() {
        return {
            id:this.$route.params.id,
            lunbotuList:[]  //商品的轮播图
        }
    },
    created() {
        this.getlunbotu();
    },
    methods: {
        async getlunbotu(){
            const {data} = await this.$http.get('api/getthumimages/'+ this.id);
            if(data.status === 0) return this.lunbotuList = data.message;
        }
    },
    components:{
        swiper  //注册子组件
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
</style>