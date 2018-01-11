import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import mine from '@/components/mine'
import dongtai from '@/components/dongtai'
import workbench from '@/components/workbench'
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'index',
        component: index,
        children: [{
            path: '/workbench',
            name: 'workbench',
            meta: { header: '工作台' },
            component: workbench
        }, {
            path: '/dongtai',
            name: 'dongtai',
            meta: { header: '动态' },
            component: dongtai
        }, {
            path: '/mine',
            name: 'mine',
            meta: { header: '我的' },
            component: mine
        }]
    }]
})
var formaterTimeZone = function(data, TZ) {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000 - TZ * 3600000;
    return new Date(timestamp);
}