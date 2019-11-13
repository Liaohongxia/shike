<template>
    <div>
       <div class="top">
           <div>
           <input type="text" placeholder="请输入搜索内容" @click="toSearch" class="InputM">
           </div>
           <div class="Sou">搜索</div>
       </div>  
       <mt-navbar v-model="selected">
  <mt-tab-item id="1">默认</mt-tab-item>
  <mt-tab-item id="2">销量</mt-tab-item>
  <mt-tab-item id="3">价格</mt-tab-item>
</mt-navbar>

<!-- tab-container -->
<mt-tab-container v-model="selected">
  <mt-tab-container-item id="1">
    <mr v-for="(list,i) of list" :key="i" :list="list" :i="i"></mr>       
  </mt-tab-container-item>
  <mt-tab-container-item id="2">
   <xl v-for="(list,i) of list" :key="i" :list="list" :i="i"></xl>
  </mt-tab-container-item>
  <mt-tab-container-item id="3">
    <jg v-for="(list,i) of list" :key="i" :list="list" :i="i"></jg>
  </mt-tab-container-item>
</mt-tab-container>
     
    </div>
</template>
<script>
//引入顶部图标组件

//引入孕期话题，幼儿护理，准备怀孕，可爱宝宝，妈妈厨房这五个组件

import Mr from "./Mr.vue"
import Xl from "./Xl.vue"
import Jg from "./Jg.vue"
export default {
  data(){
    return{
      selected:"1",
      kw:"",
      list:[]
     
    }
  },
  created(){
    this.change();
  },
  methods:{
       change(){
          this.axios.get("product").then(res=>{
          // console.log(res);
            this.list=res.data.data;
            
          })
       },
       toSearch(){
        this.$router.push("/Search");
        
       }
  },
  components:{
  //注册顶部图标组件
    "mr":Mr,
    "xl":Xl,
    "jg":Jg
   
   }
}
</script>
<style scope>
    .top{
        width:100%;
        background: #F3F3F3;
        height:60px;
        position: relative;
        display: flex;}
    .InputM{
        width:65%;
        height:33px;
        position:absolute;
        top:13px;
        left:20px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border:none;
        padding-left:10px;
    }
    .Sou{                                                 
        width:16%;
        height:34px;
        background:#DFDFDF;
        position: absolute;
        top:13px;
        right:40px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        text-align: center;
        line-height: 34px;
        color:#999999;
        font-size:0.9rem;
    }
    .two{
        display: flex;
        justify-content: space-around;
        margin: 13px 0;
    }
    
</style>
