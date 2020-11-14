<template>
    <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
            <img :src="item[imgname]" alt="" :class="[isfull?'img-full':'img-normal']">
        </mt-swipe-item>
        </mt-swipe>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    props:['lunbotuList','imgname','isfull'],
}
</script>

<style lang="scss" scoped>
.mint-swipe{
    height: 200px;

    .mint-swipe-item{
        //在父元素中，直接让子元素居中显示
        text-align: center;
        // &:nth-child(1) {
        //     background-color: red;
        // }
        // &:nth-child(2) {
        //     background-color: blue;
        // }
        // &:nth-child(3) {
        //     background-color: cyan;
        // }

        .img-full{
            //如果给图片应用了这个类，则图片的宽和高都是撑满父元素的
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .img-normal{
            //如果给图片添加了这个类，则图片的高度100%，宽度是自适应，横向的位置是居中显示
            height: 100%;

        }
    }
}    
</style>