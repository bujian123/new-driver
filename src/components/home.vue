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
        data() {
            return {

            }
        },
        mounted() {
            console.log(this.$router)
        },
        created() {
            var url = 'wechat/login'
            var params = {
                    username: 1124214214,
                    password: 102412
                }
                // this.$api.post(url, params, function(data) {
                //     console.log(data);
                // })
                // var url = 'wechat/getDispatchOrderByNo'
                // var params = {
                //     dispatch_no: 124,
                //     company_id: 102412
                // }
            this.$api.post(url, params, function(data) {
                console.log(data);
            })
        },
    }
</script>
<style>

</style>