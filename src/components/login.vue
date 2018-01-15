<!-- 登陆 -->
<template>
    <div>
        <img src="../../static/images/mine/3@2x.png" />
        <form>
                <mt-field label="账号" placeholder="请输入账号" v-model="userName"></mt-field>
                <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>    
                <div style="display:flex;justify-content:center">  <mt-button size="large" style="width:50%">large</mt-button>  </div>   
        </form>
          
          
    </div>
</template>
<script>
    export default{
        data(){
            return {
                userName:'',
                password:''
            }
        }
    }
</script>
<style scoped>

</style>