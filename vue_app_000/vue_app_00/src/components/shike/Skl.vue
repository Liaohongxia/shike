<template>
  <div>
      <div class="lunbo">
     <mt-swipe :auto="4000">
         <mt-swipe-item><img src="../../img/lunbo3.png" class="img1"></mt-swipe-item>
         <mt-swipe-item><img src="../../img/lunbo4.png" class="img1"></mt-swipe-item>
     </mt-swipe> 
    </div>
    <div class="topDiv">
        <div class="hb_Div"><img src="../../img/hongbei.png" class="bj_img">
        </div>
        <div class="topDiv2">
            <div class="ms_Div"><img src="../../img/meishi.png" class="bj_img">
            </div>
            <div class="cy_Div"><img src="../../img/chuyi.png" class="bj_img">
            </div>
         </div> 
    </div>
    <div class="twoDiv">
       <div class="topDiv3">
          <div class="ms_Div">
            <img src="../../img/mmp.png" class="bj_img">
            </div>
            <div class="cy_Div"><img src="../../img/xiachu.png" class="bj_img">
            </div>
          </div> 
        <div class="ys_Div"><img src="../../img/yinshi.png" class="bj_img">
        </div> 
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scpoe>
.lunbo{
  width:100%;height:220px;
}
.img1{
  width:100%;height:220px;
}
.topDiv,.twoDiv{
  display:flex;
  width:100%;
  margin:0 auto;
}
.hb_Div{
  width:55%;
  margin:8px 8px 8px 0px;

}
.topDiv2{
  width:55%;
  margin:8px 0px 8px 0px;
}
.ys_Div{
  width:55%;
  margin:-5px 0px 0px 0px;
}
.topDiv3{
  width:55%;
  margin:-5px 8px 0px 0px;
}
.bj_img{
  width:100%;
}
.ms_Div{
  margin-bottom:3px;
}
</style>