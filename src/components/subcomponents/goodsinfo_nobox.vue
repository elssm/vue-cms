<template>
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" ref="nobox" @change='countChanged'/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
		</div>
</template>

<script>
//导入mui从而支持初始化数字框
import mui from '../../lib/mui/js/mui.js'
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
            const val = this.$refs.nobox.value;
            //每当nobox子组件中的count变化之后，要立即把最新的数量值，传递给goodsinfo父组件，这样
            //每当我们点击【加入购物车】按钮时候，就能立即把最新的count值，同步到购物车的徽标中
            //这样就涉及到了父子组件传值
            this.$emit('func',parseInt(val));
            // console.log('数量改变了' + val);
        }
    },
    props:['max'],   //接收父组件传递过来的库存量max
    watch: {
        //使用场景：监听单个的虚拟的数据
        max: function(newval,oldval){
            //不论外界传递给nobox的max值是什么，
            //最后传递的那个max值，一定是一个合法的数值
            //每当监听到max值的改变，不论这个值是否合法，我们都重新为数字框，使用
            //JS API 来手动设置最大值
            mui('.mui-numbox').numbox().setOption('max',newval); 
        }
    },
}
</script>

<style lang="scss" scoped>
    
</style>