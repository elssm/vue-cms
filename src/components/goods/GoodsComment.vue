<template>
    <div>
        <cmtbox :newsid='id'></cmtbox>
    </div>
</template>

<script>
import cmtbox from '../subcomponents/comment.vue'
export default {
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    props:['id'],
    components:{
        cmtbox
    }
}
</script>
<style lang="scss" scoped>
    
</style>