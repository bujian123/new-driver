<!-- 主页 -->
<template>
    <div>
        <div></div>
        <router-link to="/operations">
            业务操作
        </router-link>
    </div>
</template>
<script>
    export default {
        data(){
            return{

            }
        },
        mounted () {
            console.log(this.$router)   
        }
    }
</script>
<style>

</style>