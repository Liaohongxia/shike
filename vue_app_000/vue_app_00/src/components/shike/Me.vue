<template>
  <div>
    <div class="outer">
        <div class="imgDiv">
        <img src="../../img/yonghu.png" class="yonghu">
        </div>
        <div class="uname">用户名</div>
        <router-link to="/Reg"><img src="../../img/jiantou.png"  class="gt"></router-link>
    </div>
    <div>
    <div class="Grzx">个人中心</div>
     <div class="shopp">
      <router-link to="/Product">
      <img src="../../img/addr.png" class="hang"><p class="Shopf">收货地址</p></router-link>
      <router-link to="/Product">
        <img src="../../img/ding.png" class="hang"><p class="Shopf">我的订单</p></router-link>
      <router-link to="/Cart">
        <img src="../../img/shopping.png" class="hang"><p class="Shopjf">购物车</p></router-link>
      <router-link to>
        <img src="../../img/tongzhi.png" class="hang"><p class="Shopf">系统通知</p></router-link>
    </div>
    <div class="shopp">
      <router-link to="/Product">
      <img src="../../img/vip.png" class="Sho"><p class="Shopf">会员卡</p></router-link>
      <router-link to="/Product">
        <img src="../../img/youhui.png" class="Sho"><p class="Shopf">优惠券</p></router-link>
      <router-link to="/Product">
        <img src="../../img/jifen.png" class="Sho"><p class="Shopjf">积分</p></router-link>
      <router-link to>
        <img src="../../img/money.png" class="Sho"><p class="Shopf">储值金</p></router-link>
    </div>
    
    </div>
  </div>
</template>
<script>
export default {
}
</script>
<style scpoe>
  .outer{
    width:100%;
    height:145px;
    background:#E34747;
    display:flex;
    align-items:center;
  }
  .yonghu{
    width:60%;
    margin:0 35px;
  }
  .uname{
    font-size:1.3rem;
    margin-left:35px;
    color:#7B5E7B;
  }
  .imgDiv{
    width:20%;
  }
  .gt{
    width:40px;
    height:30px;
    margin-left:120px;
  }
  .Grzx{
    font-size:0.8rem;
    position:relative;
    top:30px;
    left:20px;
    border-bottom:1px solid #DFDFDF;
    width:100%;
    height:35px;
  }
  .shopp{
    width:100%;
    display: flex;
    justify-content: space-around;
    margin-top:50px;
  }
  .Shopf{
    font-size:1rem;
    margin-top:-4px;
    margin-left:5px;
  }
 .Shopjf{
    font-size:1rem;
    margin-top:-4px;
    margin-left:13px;
 }
  .hang{
    width:40px;
    height:40px;
    margin-left:13px;
  }
  .Sho{width:40px;
    height:40px;
    margin-left:8px;}
</style>