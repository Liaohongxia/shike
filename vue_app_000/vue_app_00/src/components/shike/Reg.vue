<template>
  <div>  
      <router-link to="/Me"><img src="../../img/zuojiantou.png"  class="gtt"></router-link>
     <mt-field label="昵称" placeholder="请填写昵称" v-model="uname" :attr="{autofocus:true}"></mt-field>
     <mt-field label="密码" placeholder="请填写密码"  v-model="upwd"></mt-field>
     <mt-field label="手机号" placeholder="请绑定手机号码"  v-model="phone"></mt-field>
     <div class="sex">
       <p class="sex2">性别</p>
    <div class="radio1"  @click="man">
         <img src="../../img/radio.png" class="radio-img"  v-show="alert">
       </div>
        <p class="sex3"  @click="man" id="mm">男</p>
       <div class="radio2"  @click="woman">
          <img src="../../img/radio.png" class="radio-img" v-show="alert2">
           </div>
      <p class="sex4" @click="woman" id="ww">女</p>
     </div>
     <mt-button @click="reg">注册</mt-button>
    
  </div>   
</template>
<script>
 export default{
     data() {
  return {
    uname:"",
    phone:"",
    upwd:"",
    alert:true,
    alert2:false
    //sex_id:[]

  }
},
     
    methods:{
        man(){
           if(this.alert=true){
             this.alert2=false;
           }
        },
        woman(){
          if(this.alert2=true){
            this.alert=false;
          }
        },
        //添加注册函数
        reg(){
            // 对表单中的每个元素进行验证
            // 验证：去掉用户无效操作
            // 1.创建用户名和密码正则表达式
            var ureg=/^[a-z0-9]{3,12}$/i;
            //3.创建手机号正则表达式
            var phone=/^1[3456789]\d{9}$/;
            //3.获取用户输入用户名
            var u=this.uname;
            console.log(u)
            //4.获取用户输入的手机号
            var p=this.phone;
            console.log(p)
            var upw=this.upwd;
            console.log(upw)
            // 6.通过正则表达式来验证用户名是否正确
            if(ureg.test(u)==false){
                 //7.如果验证不正确显示确认消息框
                this.$messagebox("消息","昵称格式不正确")
           
            //8.停在函数执行
            return;
           }
           if(ureg.test(upw)==false){
                 //7.如果验证不正确显示确认消息框
                this.$messagebox("消息","密码格式不正确")
           
            //8.停在函数执行
            return;
           }
            // 9.通过正则表达式验证手机是否正确
           if(phone.test(p)==false){
           //10.如果验证没通过显示确认信息
           this.$messagebox("消息","手机号格式不正确")
           //11.停在函数执行 
           return;
           }
          //  var mm1=document.getElementById("mm")
          //  var ww1=document.getElementById("ww")
          //  this.alert==true?(this.sex_id=mm1.id):(this.sex_id=ww1.id)
           //console.log(this.sex_id)
            //8.发送ajax请求
           var url="reg";
           var obj={uname:u,upwd:upw,phone:p};
           this.axios.get(
               url,{params:obj}
           ).then(res=>{
               console.log(res.result);
               if(res.data.code="1"){
                  alert("注册成功");
                   this.$router.push("/Login")
               }else if(res.data.code=="0"){
                  this.$messagebox("该用户已注册");
               }
           });
         },
   }
 }
</script>   
 
<style scope>
    .Bottom{display:flex;
    justify-content: space-between;}
   .sex{
     display: flex;
     border-top:1px solid #999999;
     padding-right:10px;

   } 
   .radio1,.radio2{
     width:20px;
     height:20px;
     border-radius: 50%;
     border:1px solid red;
     margin-left:67px;
     margin-top:7px;
   }
   .radio-img{
     width:20px;height:20px;
     
   }
   .sex2{
     margin-left:10px;
   }
    .sex3{
     margin-left:5px;
     margin-right:-25px;
   }
    .sex4{
     margin-left:5px;
   }
</style>