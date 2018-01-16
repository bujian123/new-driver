<!-- 业务操作 -->
<template>
    <div>
        <mt-navbar v-model="selected" class="tabDiv">
            <mt-tab-item id="1">待执行</mt-tab-item>
            <mt-tab-item id="2">执行中</mt-tab-item>
            <mt-tab-item id="3">已完成</mt-tab-item>
        </mt-navbar>

        <mt-tab-container v-model="selected" style="background: #eeeeee">
            <!-- 待执行 -->
            <mt-tab-container-item id="1">
                <div v-for='(item,index) in unfinshData.data' class="orderList">
                    <div class="orderTop">
                        <p style="font-weight: bold;font-size: .4rem;text-align: left;">{{item.dispatch_no}}</p>
                        <p>
                            <span style="font-weight:bold">{{item.customer_name}}</span>
                            <span style="padding-left:2.625rem">{{item.require_time_to}}</span>
                        </p>
                        <p>{{item.shipper_city}}-{{item.consignee_city}}
                            <span style="padding-left:2.625rem">计划量：
                                <span style="color:red">{{item.plan_amount}}</span>
                            </span>
                        </p>
                    </div>
                    <div class="orderCenter" style="justify-content:normal">
                        <img style=" height: 0.8435rem;margin-right:0.375rem;" src="../../../static/images/home/shipper.png">
                        <div>
                            <p>
                                <span style="padding-right:.2rem">{{item.shipper_city}}</span>
                                <span style="padding-right:.3rem">{{item.shipper_county}}</span>
                                <span>{{item.shipper_address}}</span>
                            </p>
                            <p style="color:#9E9E9E">
                                要求
                                <span style="padding:0.2rem;font-size:.4rem;color:#000">{{item.require_time_from}}</span>
                                抵达
                            </p>
                        </div>
                    </div>
                    <div class="orderBottom">
                        <img style=" height: 0.625rem;margin-right:0.375rem;" src="../../../static/images/home/remark.png">
                        <div style="width:7.53125rem">
                            <div>
                                <p>装货前需要清罐
                                    <!-- <span v-if='item.is_clean_pot == 0' style="font-size:.4rem;color:rgb(255, 165, 0);padding-left: .3rem;">待清灌</span> -->
                                    <span v-if='item.is_clean_pot == 1' class="strong">待清灌</span>
                                </p>
                                <p>已抵达
                                    <span style="color:red">{{item.time_diff}}</span>小时，请尽快执行
                                </p>
                            </div>
                        </div>
                        <mt-button @click='sureGo(item.id,item.company_id,item.dispatch_no,item.depart_time,item.depart_remark)' type="primary" style="width: 1.75rem; height: 1.75rem;">发车
                            <br>确认</mt-button>
                    </div>
                </div>

            </mt-tab-container-item>
            <!-- 执行中 -->
            <mt-tab-container-item id="2">
                <div v-for='(item,index) in doingData.data' class="orderList">
                    <div class="orderTop">
                        <p style="font-weight: bold;font-size: .4rem;text-align: left;">
                            <span style="padding-right:.75rem">{{item.dispatch_no}}</span>
                            <span v-if='item.dispatch_status ==20'>已审核</span>
                            <span v-else-if='item.dispatch_status ==30'>已发车</span>
                            <span v-else-if='item.dispatch_status ==35'>已到厂</span>
                            <span v-else-if='item.dispatch_status ==40'>已装货</span>
                            <span v-else-if='item.dispatch_status ==45'>已抵达</span>
                            <span v-else-if='item.dispatch_status ==50'>已卸货</span>
                            <span v-else-if='item.dispatch_status ==60'>完成</span>
                        </p>
                        <p>
                            <span style="font-weight:bold">{{item.customer_name}}</span>
                            <span style="padding:0 1.15625rem 0 0.78125rem">{{item.require_time_to}}</span>
                            <span>{{item.shipper_city}}-{{item.consignee_city}}</span>
                        </p>
                        <p style="color:#808080;padding-right:0.875rem;display:flex;display:-webkit-flex;justify-content: space-between;">
                            <span>计划量：
                                <span>{{item.plan_amount}}</span>T
                            </span>
                            <span>装货量：
                                <span>{{item.load_amount}}</span>T
                            </span>
                            <span>卸货量：
                                <span>{{item.unload_amount}}</span>T
                            </span>
                        </p>
                    </div>
                    <div class="orderCenter">
                        <img style=" height: 0.8435rem;margin-right:0.375rem;" src="../../../static/images/home/shipper.png">
                        <div style="flex-grow:1">
                            <p>
                                <span style="padding-right:.2rem">{{item.shipper_city}}</span>
                                <span style="padding-right:.3rem">{{item.shipper_county}}</span>
                                <span>{{item.shipper_address}}</span>
                            </p>
                            <p style="color:#9E9E9E">
                                要求
                                <span style="padding:0.2rem;font-size:.4rem;color:#000">{{item.require_time_from}}</span>
                                抵达
                            </p>
                        </div>
                        <span class="telPhone" @click='sendTel(item.shipper_contact_mobile)'>
                            <img src="../../../static/images/home/tel2x.png">
                        </span>
                    </div>
                    <div class="orderCenter">
                        <img style=" height: 0.8435rem;margin-right:0.375rem;" src="../../../static/images/home/consignee.png">
                        <div style="flex-grow:1">
                            <p>
                                <span style="padding-right:.2rem">{{item.consignee_city}}</span>
                                <span style="padding-right:.3rem">{{item.consignee_county}}</span>
                                <span>{{item.consignee_address}}</span>
                            </p>
                            <p style="color:#9E9E9E">
                                要求
                                <span style="padding:0.2rem;font-size:.4rem;color:#000">{{item.require_time_to}}</span>
                                送达
                            </p>
                        </div>
                        <span class="telPhone" @click='receive(item.consignee_contact_mobile)'>
                            <img src="../../../static/images/home/tel2x.png">
                        </span>
                    </div>

                    <div class="orderBottom">
                        <img style=" height: 0.625rem;margin-right:0.375rem;" src="../../../static/images/home/remark.png">
                        <div style="width:7.53125rem">
                            <div>
                                <p>装货前需要清罐
                                    <!-- <span v-if='item.is_clean_pot == 0' style="font-size:.4rem;color:rgb(255, 165, 0);padding-left: .3rem;">待清灌</span> -->
                                    <span v-if='item.is_clean_pot == 1 && item.is_already_clean_pot ==1' class="strong">已清灌</span>
                                    <span v-else-if='item.is_clean_pot == 1 && item.is_already_clean_pot !=1' class="strong">待清灌</span>
                                </p>
                                <p v-if='item.receivables_way== 10 && item.receivable_cost>0'>
                                    <span v-if="item.charge_node == 'load'">运费根据装货磅重计算</span>
                                    <span v-if="item.charge_node == 'unload'">运费根据卸货磅重计算</span>
                                    <span class="strong">{{item.receivable_cost}}元</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </mt-tab-container-item>
            <!-- 已完成 -->
            <mt-tab-container-item id="3">
                <div class="doingSelect">
                    <div class="selecondition">
                            <span class="dateLable">运输日期</span>
                            <div class="dateRange">
                                    <span style="padding-right: 0.625rem;">{{now}}</span>到<span style="padding-left: 0.625rem;">{{lastMonth}}</span>
                            </div>
                            
                    </div>
                    <div style="padding: 0.34375rem 0;">
                            <mt-button @click='selectDoing'  type="primary" style="width:2.15rem;height:1rem" >查询</mt-button>
                            <mt-button @click='resetDoing'  type="primary" style="width:2.15rem;height:1rem">重置</mt-button>
                    </div>
                </div>
                <div v-for='(item,index) in finshedData.data' class="orderList">
                        <div class="orderTop">
                            <p style="font-weight: bold;font-size: .4rem;text-align: left;">
                                <span style="padding-right:.75rem">{{item.dispatch_no}}</span>                            
                            </p>
                            <p>
                                <span style="font-weight:bold">{{item.customer_name}}</span>
                                <span style="padding:0 1.15625rem 0 0.78125rem">{{item.require_time_to}}</span>
                                <span>{{item.shipper_city}}-{{item.consignee_city}}</span>
                            </p>
                            <p style="color:#808080;padding-right:0.875rem;display:flex;display:-webkit-flex;justify-content: space-between;">
                                <span>装货量:
                                    <span>{{item.load_amount}}</span>T
                                </span>
                                <span>卸货量：
                                        <span>{{item.unload_amount}}</span>T
                                    </span>
                                <span>磅差：
                                    <span style="color:red">{{item.difference_amount}}T</span>
                                </span>
                              
                            </p>
                        </div>
                        <div class="orderCenter">
                            <img style=" height: 0.8435rem;margin-right:0.375rem;" src="../../../static/images/home/shipper.png">
                            <div style="flex-grow:1">
                                <p>
                                    <span style="padding-right:.2rem">{{item.shipper_city}}</span>
                                    <span style="padding-right:.3rem">{{item.shipper_county}}</span>
                                    <span>{{item.shipper_address}}</span>
                                </p>
                                <p style="color:#9E9E9E">
                                    要求
                                    <span style="padding:0.2rem;font-size:.4rem;color:#000">{{item.require_time_from}}</span>
                                    抵达
                                </p>
                            </div>
                            <span class="telPhone" @click='sendTel(item.shipper_contact_mobile)'>
                                <img src="../../../static/images/home/tel2x.png">
                            </span>
                        </div>
                        <div class="orderCenter">
                            <img style=" height: 0.8435rem;margin-right:0.375rem;" src="../../../static/images/home/consignee.png">
                            <div style="flex-grow:1">
                                <p>
                                    <span style="padding-right:.2rem">{{item.consignee_city}}</span>
                                    <span style="padding-right:.3rem">{{item.consignee_county}}</span>
                                    <span>{{item.consignee_address}}</span>
                                </p>
                                <p style="color:#9E9E9E">
                                    要求
                                    <span style="padding:0.2rem;font-size:.4rem;color:#000">{{item.require_time_to}}</span>
                                    送达
                                </p>
                            </div>
                            <span class="telPhone" @click='receive(item.consignee_contact_mobile)'>
                                <img src="../../../static/images/home/tel2x.png">
                            </span>
                        </div>                      
                    </div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
<script>
    import { MessageBox } from 'mint-ui';
    export default {
        data() {
            return {
                selected: '1',
                unfinshData: {
                    pageSize: 10,
                    pageNo: 1,
                    timeFrom: '2017-12-19',
                    timeTo: '2017-01-15',
                    data: []
                },
                doingData: {
                    pageSize: 1,
                },
                finshedData: {
                    pageSize: 1,
                },
                user: {},
                now:'',
                lastMonth:''
            }
        },
        mounted() {
            this.unfinished();
            this.doing();
            this.finshed();
            this.user = JSON.parse(sessionStorage.getItem('loginData'));
        },
        watch: {
            // selected(curval){
            //     switch (curval){
            //         case '2':this.doing();
            //     }
            // }
        },
        methods: {
            unfinished() {
                let that = this,
                    parms = {
                        page_size: this.unfinshData.pageSize,
                        page_no: this.unfinshData.pageNo,
                        // create_time_from:this.unfinshData.timeFrom,
                        // create_time_to:this.unfinshData.timeTo
                    };
                this.$api.post('/wechat/pendingDispatchOrder', parms, function (data) {
                    that.unfinshData.data = data.obj.list;
                    console.log(data)
                }, function (error) {
                    alert(error.msg)
                })
            },
            doing() {
                let that = this,
                    parms = {
                        page_size: this.unfinshData.pageSize,
                        page_no: this.unfinshData.pageNo,
                        // create_time_from:this.unfinshData.timeFrom,
                        // create_time_to:this.unfinshData.timeTo
                    };
                this.$api.post('/wechat/executingDispatchOrder', parms, function (data) {
                    that.doingData.data = data.obj.list;
                    console.log(data);
                }, function (error) {
                    alert(error.msg)
                })
            },
            finshed() {
               this.resetDoing();
                let that = this,
                    parms = {
                        page_size: this.unfinshData.pageSize,
                        page_no: this.unfinshData.pageNo,
                        // create_time_from:this.now,
                        // create_time_to:this.lastMonth
                    };
                this.$api.post('/wechat/historyDispatchOrder', parms, function (data) {
                    that.finshedData.data = data.obj.list;                 
                    console.log(data)
                }, function (error) {
                    alert(error.msg)
                })
            },
            sureGo(id, company_id, dispatch_no, depart_time, depart_remark) {

                let that = this,
                    parms = {
                        id: id,
                        company_id: company_id,
                        dispatch_no: dispatch_no,
                        depart_time: depart_time,
                        depart_remark: depart_remark,
                        operator: this.user.user_uuid
                    };
                console.log(parms);
                console.log('这里');
                this.$api.post('/wechat/executingDispatchOrder', parms, function (data) {
                    console.log('成功发车')
                    console.log(data);
                }, function (error) {
                    alert(error.msg)
                })
            },
            // 发货联系人  点击可拨打
            sendTel(number) {
                let that = this;
                MessageBox({
                    title: '发货联系方式',
                    message: number,
                    confirmButtonText: '拨打',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonHighlight: true
                }).then(function () {
                    console.log('拨打');
                    that.phone(number);
                });
            },
            // 收获联系人  点击可拨打
            receive(number) {
                let that = this;
                MessageBox({
                    title: '收货联系方式',
                    message: number,
                    confirmButtonText: '拨打',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonHighlight: true
                }).then(function () {
                    console.log('拨打');
                    that.phone(number);
                });

            },
            //拨打电话
            phone(number) {

            },
            resetDoing(){
                let now =new Date();
                this.now = now.Format("yyyy-MM-dd");
                this.lastMonth =new Date(now.setMonth(now.getMonth()-1)).Format("yyyy-MM-dd");
            }     
        }
    }
</script>
<style scoped>
    .tabDiv {
        background: #0489ff;
        color: #fff
    }

    .orderTop {
        border-bottom: 1px solid #ccc;
    }

    .orderCenter {
        display: flex;
        padding: 0.2rem 0;
        border-bottom: 1px solid #ccc
    }

    .orderBottom {
        display: flex;
        padding: 0.2rem 0;
    }

    p {
        margin: 0 0 .2rem 0;
    }

    .orderList {
        text-align: left;
        padding: 0.2rem 0.3125rem 0 0.3125rem;
        margin-bottom: .1rem;
        background: #fff;
        box-sizing: border-box
    }

    .strong {
        font-size: .4rem;
        color: rgb(255, 165, 0);
        padding-left: .3rem;
    }
    .doingSelect{
      background:#fff
    }
    .selecondition{
        display: flex;
    /* justify-content: space-between; */
    padding-left: 0.40625rem;
    padding-right: 0.625rem;
    height: 1.21875rem;
    align-items: center;
    }
    .dateLable{
        color: #9E9E9E;
    }
    .dateRange{
        margin-left: 0.375rem;
    height: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    }
</style>
<style>
    .mint-navbar .mint-tab-item.is-selected {
        border-bottom: 2px solid #fff;
        color: #fff;
        font-weight: bold;
        margin-bottom: -3px;
        margin-bottom: .1rem;
    }
</style>