<template style="height:100%;">
  <div class="wrap">
    <div class="head">
      <div class="top">
        <div class="dispatch_no">{{detail.dispatch_no}}</div>
        <div class="status">
          <span v-if='detail.dispatch_status ==20'>已审核</span>
          <span v-else-if='detail.dispatch_status ==30'>已发车</span>
          <span v-else-if='detail.dispatch_status ==35'>已到厂</span>
          <span v-else-if='detail.dispatch_status ==40'>已装货</span>
          <span v-else-if='detail.dispatch_status ==45'>已抵达</span>
          <span v-else-if='detail.dispatch_status ==50'>已卸货</span>
          <span v-else-if='detail.dispatch_status ==60'>完成</span>
        </div>
      </div>
      <div class="site_wrap">
        <div class="left">
          {{detail.shipper_city}}
        </div>
        <div class="center">
          <div class="customer_name">{{detail.customer_name}}</div>
          <img class="bar" src="../../static/images/icon/flow_to.png" />
          <div class="require_time_to">{{detail.require_time_to}}</div>
        </div>
        <div class="right">
          {{detail.consignee_city}}
        </div>
      </div>
    </div>
    <div class="main">
      <div class="child">
        <div class="top">{{detail.plan_amount}}</div>
        <div class="bottom">计划量</div>
      </div>
      <div class="child">
        <div class="top" v-if="detail.load_amount">{{detail.load_amount}}</div>
        <div class="top" style="color:#ffa500" v-if="!detail.load_amount">待装</div>
        <div class="bottom">装货量</div>
      </div>
      <div class="child">
        <div class="top" v-if="detail.unload_amount">{{detail.unload_amount}}</div>
        <div class="top" style="color:#ffa500" v-if="!detail.unload_amount">待装</div>
        <div class="bottom">卸货量</div>
      </div>
      <div class="child">
        <div class="top" @click="nine_button_click('清罐')" v-if="detail.is_clean_pot">
          <img src="../../static/images/icon/clean_pot.png" />
        </div>
        <div class="top" v-if="!detail.is_clean_pot">
          <img src="../../static/images/icon/clean_pot_done.png" />
        </div>
        <div class="bottom">清罐</div>
      </div>
      <div class="child">
        <div class="top" @click="nine_button_click('发车')" v-if="!detail.depart_time">
          <img src="../../static/images/icon/dispatched.png" />
        </div>
        <div class="top" v-if="detail.depart_time">
          <img src="../../static/images/icon/dispatched_done.png" />
        </div>
        <div class="bottom">发车</div>
      </div>
      <div class="child">
        <div class="top" @click="nine_button_click('到厂')" v-if="!detail.arrive_load_time">
          <img src="../../static/images/icon/arrive_load.png" />
        </div>
        <div class="top" v-if="detail.arrive_load_time">
          <img src="../../static/images/icon/arrive_load_done.png" />
        </div>
        <div class="bottom">到厂</div>
      </div>
      <div class="child">
        <div class="top" @click="nine_button_click('装车')" v-if="!detail.load_time">
          <img src="../../static/images/icon/load.png" />
        </div>
        <div class="top" v-if="detail.load_time">
          <img src="../../static/images/icon/load_done.png" />
        </div>
        <div class="bottom">装车</div>
      </div>
      <div class="child">
        <div class="top" @click="nine_button_click('铅封')" v-if="!detail.is_seal">
          <img src="../../static/images/icon/seal.png" />
        </div>
        <div class="top" v-if="detail.is_seal">
          <img src="../../static/images/icon/seal_done.png" />
        </div>
        <div class="bottom">铅封</div>
      </div>
      <div class="child">
        <div class="top" @click="nine_button_click('抵达')" v-if="detail.arrive_unload_time">
          <img src="../../static/images/icon/arrive_unload.png" />
        </div>
        <div class="top" v-if="!detail.arrive_unload_time">
          <img src="../../static/images/icon/arrive_unload_done.png" />
        </div>
        <div class="bottom">抵达</div>
      </div>
      <div class="child">
        <div class="top" @click="nine_button_click('取样')" v-if="!detail.is_sample">
          <img src="../../static/images/icon/sample.png" />
        </div>
        <div class="top" v-if="detail.is_sample">
          <img src="../../static/images/icon/sample_done.png" />
        </div>
        <div class="bottom">取样</div>
      </div>
      <div class="child">
        <div class="top" @click="nine_button_click('卸车')" v-if="!detail.unload_time">
          <img src="../../static/images/icon/unload.png" />
        </div>
        <div class="top" v-if="detail.unload_time">
          <img src="../../static/images/icon/unload_done.png" />
        </div>
        <div class="bottom">卸车</div>
      </div>
      <div class="child">
        <div class="top" @click="nine_button_click('在途反馈')">
          <img src="../../static/images/icon/intransit.png" />
        </div>
        <div class="bottom">在途反馈</div>
      </div>
    </div>
    <div class="remark">
      <img src="../../static/images/icon/remark.png" />
      <div>装货前需要清罐</div>
      <div style="color:#ffa500;">待清罐审核</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        dispatch_no: 'DO2017102600001',
        company_id: null,
        selected: 'tab1',
        detail: {},
      }
    },
    methods: {
      nine_button_click: function (type) {
        //在这里做接下去的跳转路由事件
        switch (type) {
          case '清罐':
            this.$router.push({
              'name': 'nine1',
              params:this.detail,
            })
            break;
          case '发车':
            break;
          case '到厂':
            break;
          case '装车':
            break;
          case '铅封':
            break;
          case '抵达':
            break;
          case '取样':
            break;
          case '卸车':
            break;
          case '在途反馈':
            break;
        }
      }
    },
    created() {
      var params = {
        dispatch_no: this.dispatch_no,
        company_id: this.company_id,
      }
      var that = this;
      this.$api.post('/wechat/getDispatchOrderByNo', params, function (data) {
        that.detail = data.obj;
      })
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  li {
    list-style-type: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .wrap {
    background: #0489ff;
    height: 3.5rem;
    padding: 0.2rem;
  }

  .top {
    display: flex;
    border-bottom: 1px solid white;
    padding-bottom: 0.1rem;
  }

  .top .dispatch_no {
    color: white;
    font-size: 0.4rem;
    height: 0.6rem;
    line-height: 0.6rem;
    margin-left: 0.4rem;
  }

  .top .status {
    background-image: url(../../static/images/icon/status.png);
    color: #0489ff;
    padding: 0.1rem;
    width: 2rem;height: 0.5rem;
    line-height: 0.4rem;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border-radius: 0.1rem;
    margin-left: 0.4rem;
  }

  .site_wrap {
    display: flex;
    display: -webkit-flex;
    color: white;
    justify-content: space-between;
    margin-top: 0.1rem;
  }

  .site_wrap .left,
  .site_wrap .right {
    width: 2rem;
    display: flex;
    display: -webkit-flex;
    align-items: center;
  }

  .site_wrap .right {
    width: 2rem;
  }

  .site_wrap .center {
    width: 5.4rem;
    display: flex;
    flex-direction: column;
  }

  .site_wrap .center .bar {
    width: 100%;
  }

  .site_wrap .center .customer_name {
    height: 0.5rem;
    line-height: 0.5rem;
  }

  .site_wrap .center .require_time_to {
    height: 0.7rem;
    line-height: 0.7rem;
  }

  .main {
    width: 9rem;
    margin-left: 0.3rem;
    background: white;
    border-radius: 0.5rem;
    height: 11rem;
  }

  .main {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    padding: 0.3rem 0.6rem;
    flex-wrap: wrap;
  }

  .child {
    display: flex;
    width: 2.2rem;
    display: -webkit-flex;
    flex-direction: column;
  }

  .child .top {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .top img {
    width: 100%;
    height: 2.2rem;
  }

  .remark {
    display: flex;
    padding-bottom: 0.6rem;
  }

  .remark img {
    height: 0.6rem;
    margin: 0 0.2rem;
  }

  .remark div {
    margin-right: 0.3rem;
  }

</style>
