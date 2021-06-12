import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Goodstype from '../components/basedata/Goodstype.vue'
import GoodsBaseData from '../components/basedata/GoodsBaseData.vue'
import PurchaseDetail from '../components/purchase/PurchaseDetail.vue'
import PurchaseRecord from '../components/purchase/PurchaseRecord.vue'
import Address from '../components/address/Address.vue'
import Address2 from '../components/address/Address2.vue'
import Address3 from '../components/address/Address3.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/goodstype',
        component: Goodstype
      },
      {
        path: '/goodsbasedata',
        component: GoodsBaseData
      },
      {
        path: '/purchasedetail',
        component: PurchaseDetail
      },
      {
        path: '/purchaserecord',
        component: PurchaseRecord
      },
      {
        path: '/address',
        component: Address
      },
      {
        path: '/address2',
        component: Address2
      },
      {
        path: '/address3',
        component: Address3
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
