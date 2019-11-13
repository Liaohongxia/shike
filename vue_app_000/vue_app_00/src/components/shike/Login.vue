<template>
    <div>
        <!-- 1.用户输入框 -->
     <mt-field label="用户名" placeholder="请输入用户名"  :attr="{autofocus:true}" v-model="uname"></mt-field>
     <!--2.密码输入框 -->
     <mt-field label="密码" placeholder="请输入密码" v-model="upwd"></mt-field>
     <div>
         <mt-field label="验证码" placeholder="请输入验证码" v-model="inputyzm">
             <canvas id="c3" width="170" height="48" @click="change"></canvas>
         </mt-field>
     </div>
     <!-- 3.登录按钮 -->
     <mt-button size="large"  @click="login">登录</mt-button>
    </div>
</template>
<script>
export default {
    data(){
        return{
          uname:[],
          upwd:[],
          yzm:[],
          inputyzm:[]
        }
    },
    mounted(){
        this.change()
    },
    methods:{
        change(){
            //功能：点击更换验证码
            var c3=document.getElementById("c3");
            console.log(c3);
            var ctx=c3.getContext("2d");
            var a=Math.floor(Math.random()*10);
            var b=Math.floor(Math.random()*10);
            var c=Math.floor(Math.random()*10);
            var d=Math.floor(Math.random()*10);
            this.yzm=a+""+b+""+c+""+d;
            //随机背景颜色
            var r=Math.floor(Math.random()*255);
            var g=Math.floor(Math.random()*255);
            var q=Math.floor(Math.random()*255);
            c3.style.background=`rgba(`+r+`,`+g+`,`+q+`,`+`0.6)`
            //console.log(a);
            ctx.font="28px SimHei"
            ctx.clearRect(0,0,999,999);
            ctx.fillText(this.yzm,60,40);
        },
        login(){
            //功能，完成用户登录操作
            //1获取用户输入的用户名和密码
            var uname=this.uname;
            var upwd=this.upwd;
            //创建正则表达式
            var reg=/^[a-z0-9]{3,12}$/i;
            //验证用户信息
             if(reg.test(uname)==false){
                 //7.如果验证不正确显示确认消息框
                this.$messagebox("消息","昵称格式不正确")
           
            //8.停在函数执行
            return;
           }
           if(reg.test(upwd)==false){
                 //7.如果验证不正确显示确认消息框
                this.$messagebox("消息","密码格式不正确")
           
            //8.停在函数执行
            return;
           }
           //验证码判断
           var yzm=this.yzm;
           var inputyzm=this.inputyzm;
           if(!(inputyzm===yzm)){
               this.$messagebox("验证码不正确");
               return;
           }
           //发送ajax请求
           var url="login";
           var obj={uname:uname,upwd:upwd};
           this.axios.get(
               url,{params:obj}
           ).then(res=>{
               console.log(res.data.code);
               if(res.data.code<0){
                   this.$messagebox("用户名或密码有误")
                   
               }else{
                   //跳转到Product组件
                   sessionStorage.uid=res.data.data[0].uid;
                   this.$router.push("/Bottom")
               }
           });
        }

    }
}
</script>