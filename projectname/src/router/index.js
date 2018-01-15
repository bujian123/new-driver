import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index' //主界面
import mine from '@/components/mine' //我的
import notice from '@/components/notice' //通告
import home from '@/components/home' //主页
import operations from '@/components/home/operations' //业务操作
import login from '@/components/login' //业务操作
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: index,
      meta: {
        header: '曙光TMS'
      },
      children: [{
        path: '/home',
        name: 'home',
        meta: {
          header: '曙光TMS'
        },
        component: home,
      }, {
        path: '/notice',
        name: 'notice',
        meta: {
          header: '通告'
        },
        component: notice
      }, {
        path: '/mine',
        name: 'mine',
        meta: {
          header: '我的'
        },
        component: mine
      }],
    },
    {
      path: '/operations',
      name: 'operations',
      meta: {
        header: '派车单-业务操作',
        isBack: true
      },
      isBack: true,
      component: operations,
    },{
        path: '/login',
        name: 'login',
        meta: {
          header: '曙光TMS'
        },
        component: login,
    }
  ],
  mode: 'history'
})
var formaterTimeZone = function (data, TZ) {
  var timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000 - TZ * 3600000;
  return new Date(timestamp);
}
