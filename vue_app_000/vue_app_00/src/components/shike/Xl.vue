<template>
    <div>
          <router-link :to="'/Title/'+list.lid"  class="Pro">
           <div class="Pro-one">
           <img :src="'http://127.0.0.1:4000/'+list.prc1" class="ProImg">
           </div>
           <div class="Prop">
               <p>{{list.title}}</p>
               <p class="Ptwo">￥{{list.price.toFixed(2)}}</p>
               <div class="Pro-M">
               <p class="Pthree">销量：{{list.sales}}</p>
               <img src="../../img/che.png" class="Pro-che">
               </div>
           </div>
       </router-link>
       
   
    </div>
</template>
<script>
export default {
    props:["list","i"]
}
</script>
<style scope>
.Pro{
        display: flex;
        width:100%;
        height:135px;
        /* border-top:#DFDFDF; */
        border:1px solid #dfdfdf;
        align-items: center;
        padding-left:10px;
    }
    .Pro-one{
        width:35%;
        height:125px;
    }
    .ProImg{
        width:100%;
        height:120px;
       
    }
    p{
        font-size:1.2rem;
    }
    .Prop{
        margin-left:13px;
    }
    .Ptwo{
       color:#FF6600; 
       margin-top:25px;
       margin-bottom:15px;
    }
    .Pthree{
        font-size:1rem;
    }
  .Pro-che{
      width:13%;;
      height:30px;
      margin-left:50%;
  }
  .Pro-M{
      display: flex;
   
  }
</style>
