<template>
    <div class="mui-numbox" data-numbox-min='1' style="height: 25px;">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" ref="nobox" @change='countChanged'/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
		</div>
</template>

<script>
//导入mui从而支持初始化数字框
import mui from '../../lib/mui/js/mui.js'
import {mapMutations} from 'vuex'
export default {
    data() {
        return {
            
        }
    },
    mounted() {
        //当组件挂在到页面中之后，去初始化数字框
        mui('.mui-numbox').numbox()
    },
    methods: {
        countChanged(){
            //获取选择的商品数量
            const val = parseInt(this.$refs.nobox.value);
            //调用Mutations方法，更新数量
            this.updataGoodsCount({id:this.id,count:val})

        },
        ...mapMutations(['updataGoodsCount'])
    },
    props:['initcount','id']
}
</script>

<style lang="scss" scoped>
    
</style>