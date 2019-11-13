import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./components/HelloWorld.vue"
import Home from "./components/weixin/Home.vue"
//import Login from "./components/xz/Login.vue"
//import Reg from "./components/xz/Reg.vue"
import Bottom from "./components/shike/Bottom.vue"
import Product from "./components/shike/Product.vue"
import Title from "./components/shike/Title.vue"
import Reg from "./components/shike/Reg.vue"
import Login from "./components/shike/Login.vue"
import Cart from "./components/shike/Cart.vue"
import Me from "./components/shike/Me.vue"
import Search from "./components/shike/Search.vue"
Vue.use(Router)
export default new Router({
  routes: [
    {path:'/Bottom',component:Bottom},
    {path:'/Product',component:Product},
    {path:'/Title/:lid',component:Title,props:true},
    {path:'/Reg',component:Reg},
    {path:'/Login',component:Login},
    {path:'/Cart',component:Cart},
    {path:'/Me',component:Me},
    {path:'/Search',component:Search},
    //{path:'/Reg',component:Reg},
    //{path:'/Login',component:Login},
    {path:'/Home',component:Home},
    {path:'/',component:HelloContainer},
  ]
})
