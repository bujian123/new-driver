<!-- 清罐 -->
<template>
  <div class="wrap">
    <div class="top">
      <div class="dispatch_no">{{routerParams.dispatch_no}}</div>
      <div class="bottom">
        <div class="customer_name">{{routerParams.customer_name}}</div>
        <div class="vehicle_no">{{routerParams.vehicle_no}}</div>
        <div class="state" v-if="routerParams.is_already_clean_pot">已清罐</div>
        <div class="state" v-if="!routerParams.is_already_clean_pot">未清罐</div>
      </div>     
    </div>
    <div class="main">
        <mt-field label="清理日期" placeholder="请输入用户名" v-model="date"></mt-field>
    </div>
    <img src="../../../../static/images/1.png" />
  </div>

</template>
<script>
  export default {
    data() {
      return {
        item: {},
        date:'',
        routerParams: {}
      }
    },
    methods: {
      getParams() {
        // 取到路由带过来的参数 
        this.routerParams = this.$route.params
      },
      getDetail() {
        var useInfo = JSON.parse(sessionStorage.getItem("loginData"));
        console.log(useInfo);
        var params = {
          id: useInfo.user_id,
          company_id: this.routerParams.company_id,
          dispatch_no: this.routerParams.dispatch_no,
          clean_pot_time: this.routerParams.unload_time,
          clean_pot_remark: this.routerParams.unload_remark,
          operator: useInfo.user_uuid
        }
        console.log('params', params);
        var that = this;
        return;
        this.$api.post('/dispatch/csDispatchOrder/cleanPotConfirmHandler', params, function (data) {
          that.item = data.obj;
          console.log(JSON.parse(JSON.stringify(data.obj)));
        })
      },
      getNowDate(){
        this.date = this.$api.formatData(new Date()) ;
      }
    },
    created() {
      this.getParams();
      this.getDetail();
      this.getNowDate();
    }

  }

</script>
<style scoped>
  .top {
    padding: 0.3rem;
    border-bottom: 3px solid #eeeeee;
  }

  .top .dispatch_no {
    color: black;
    font-size: 0.4rem;
    height: 0.6rem;
    font-weight: bold;
    text-align: left;
    line-height: 0.6rem;
  }

  .bottom {
    display: flex;
  }

  .customer_name {
    font-weight: bold;
  }

  .vehicle_no {
    margin: 0 0.4rem;
  }

</style>
