<!-- 登陆 -->
<template>
  <div>
    <img src="../../static/images/mine/3@2x.png" />
    <form>
      <mt-field label="账号" placeholder="请输入账号" v-model="userName"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <div style="display:flex;justify-content:center">
        <mt-button @click='login' size="large" style="width:50%">large</mt-button>
      </div>
    </form>


  </div>
</template>
<script>
  export default {
    data() {
      return {
        userName: '',
        password: ''
      }
    },
    methods: {
      login() {
        const that = this;
        this.$http.post('/Login', qs.stringify(this.form)).then(function (res) {
          var res = res.data;
          that.fullscreenLoading = false;
          if (res.result == 0) {
            sessionStorage.setItem('loginName', that.form.userName);
            that.$router.push({
              'path': '/index/addArticle'
            })
          } else if (res.result == 1) {
            that.$message({
              message: '用户名或密码错误',
              type: 'warning'
            });
          }
        }).catch(function (error) {
          console.log(error);
          that.fullscreenLoading = false;
          that.$message({
            message: '服务器出现问题！请联系金爸爸',
            type: 'warning'
          });
        })
      }
    }
  }

</script>
<style scoped>


</style>
