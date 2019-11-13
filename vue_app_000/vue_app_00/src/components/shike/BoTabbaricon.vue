<template>
  <div>
     <div>
       <!-- 显示一张图片并且完成切换 -->
       <img :src="focused?selectedImage:normalImage" class="imgstyle">
     </div>
  </div>
</template>
<script>
export default {
  props:{
    focused:false,
    selectedImage:{default:""},
    normalImage:{default:""}
  }
}
</script>
<style scoped>
  .imgstyle{
    width:30px;
    height:30px;
  }
</style>