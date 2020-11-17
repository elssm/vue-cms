<template>
    <div class="shopcar-container">
        <div class="goods-list">

            <div class="mui-card" v-for="item in goodslist"  :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner goods-item">
                        <!--开关-->
						<mt-switch></mt-switch>

                        <!--图片-->
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <div class="goods-info">
                                <span class="price">¥{{item.sell_price}}</span>
                                <!--countObj['item.id']表示这条商品对应的数量-->
                                <nobox :initcount="countObj[item.id]"></nobox>
                                <a href="">删除</a>
                            </div>
                        </div>
					</div>
				</div>
			</div>

            <!--结算区域-->
            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
                        <div class="left">
                            <p>总计（不含运费）</p>
                            <p>
                                已勾选商品<span class="danger">0</span>件，总价<span class="danger">¥0</span>
                            </p>
                        </div>
                        <mt-button type="danger">去结算</mt-button>
					</div>
				</div>
			</div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import nobox from '../subcomponents/shopcar_nobox.vue'
export default {
    data() {
        return {
            goodslist:[] //商品列表
        }
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        async getGoodsList(){
            const {data} = await this.$http.get('api/goods/getshopcarlist/' + this.idstr);
            // console.log(data)
            if(data.status === 0) return (this.goodslist = data.message);
        }
    },
    computed:{
        ...mapGetters(['idstr','countObj'])
    },
    components:{
        nobox
    }
}
</script>

<style lang="scss" scoped>
.shopcar-container{
    background-color: #eee;
    overflow: hidden;

    .goods-item{
        display: flex;
    img{
        width: 60px;
        height: 60px;
    }
    h1{
        font-size: 13px;
    }
    .info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .goods-info{
            display: flex;
            justify-content: space-between;
            align-items: center;
            
            .price{
                color: red;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }
    }
}
.danger{
    color: red;
    font-weight: bold;
    font-size: 16px;
}
.jiesuan{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>