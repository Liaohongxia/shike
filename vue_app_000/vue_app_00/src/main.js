import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'


import'mint-ui/lib/style.css'

import MintUI from 'mint-ui'
import "mint-ui/lib/style.css"
import axios from "axios"
axios.defaults.baseURL="http://127.0.0.1:4000/"
axios.defaults.withCredentials=true
Vue.prototype.axios=axios;
Vue.use(MintUI);
Vue.use(Vuex)
//创建存储对象
var store=new Vuex.Store({
  state:{//共享数据
    alert:false  //控制隐藏和显示的按钮  
  },
  mutations:{//修改共享数据
    setOpen(state){
      state.alert=true;
    },
    setClose(state){
      state.alert=false;
    }
  },
  getters:{//获取共享数据
    getBt(state){
      return state.alert;
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
