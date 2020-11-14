<template>
    <div class="goods-list">
        <router-link tag="div" :to="'/home/goodsinfo/' + item.id" class="goods-item" v-for="item in goodslist" :key="item.id">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">{{item.sell_price}}</span>
                    <span class="old">{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link>


        <mt-button type="danger" size="large" style="margin-top:10px;" @click="getMore">加载更多</mt-button>

    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            page:1, //默认展示第一页数据
            goodslist:[],   //商品列表
            isloaded:false //节流阀，默认为false，表示没有加载完毕
        }
    },
    created() {
        this.getGoodsListByPage()
    },
    methods: {
        getGoodsListByPage(){
            this.$http.get('api/getgoods?pageindex='+this.page).then(result=>{
                if(result.body.status === 0){
                    //当获取到的数组长度为0，表示数据已经加载完毕了
                    if(result.body.message.length<=0){
                        //设置isloaded true，表示没有新数据了
                        this.isloaded = true;
                    }
                    this.goodslist = this.goodslist.concat(result.body.message);
                }
                else{
                    Toast('加载失败')
                }
            })
        },
        getMore(){
           //点击加载更多商品 
           if(this.isloaded) return;
           this.page++;
           this.getGoodsListByPage();
        }
    },
}
</script>
<style lang="scss" scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;

    .goods-item{
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 4px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        img{
            width: 100%;
        }
        .title{
            font-size: 14px;
        }

        .info{
            background-color: #eee;
            p{
                margin: 0;
                padding: 5px;
            }
            .price{
                .now{
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    font-size: 12px;
                    text-decoration: line-through;
                    margin-left: 10px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 12px;
            }
        }
    }
}  
</style>