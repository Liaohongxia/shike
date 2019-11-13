<template>
    <div>
        <div class="shopping">
            <router-link to="/Login"><img src="../../img/zuojiantou.png"  class="gtt"></router-link>
          <div>购物车</div>
          <button @click="delm" class="dele">删除所选</button>
      </div>
       <div class="Carttop" v-for="(item,i) of list" :key="i" >
           <div class="Xuan">
               <input @change="selectItem" type="checkbox" v-model="item.cb">
           </div>
           <div class="List"><img :src="'http://127.0.0.1:4000/'+item.pic" class="List-true"></div>
           <div class="tit">
               <p class="Font-one">{{item.title}}</p>
               <p class="Font-two">￥{{item.price}}.00</p>
           </div>
           <div class="Shuli">
               <span class="Shu" @click="reduce(i)">-</span>
               <input type="text" v-model="item.count" class="Input">
               <span class="Shu" @click="add(i)">+</span>
           </div>
           <div class="Xuan">
               <img src="../../img/delete.png" class="Xuan-true" @click="del" :data-id="item.iid">
           </div>
       </div>
       <div class="Bot">
           <div class="Bott">
               <input @change="selectAll" type="checkbox" v-model="allcb">
           </div>
           <div class="heji">
              <div>合计</div>
              <span class="hjq">￥{{sum}}.00</span>
           </div>
           <div class="jiesuan">结算</div>
       </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
           list:[],
           allcb:false
        }
    },
   created(){//1:添加生命周期
   this.load();
       
   },
   methods:{
       
        selectItem(){
      //累加商品状态
      //创建变量
      var sum=0;
      //创建循环遍历商品状态
      if(this.list!==undefined){
        for(var item of this.list){
          if(item.cb){
            sum++;
          }
        }
      }
      console.log(sum);
      console.log(this.list.length);
      //如果选中数量与数组相同，将全选
      //allcb=true;
      if(sum==this.list.length){
        this.allcb=true;
      }else{
        this.allcb=false;
      }
    },
       selectAll(event){
       //添加参数event
       //获取当前全选按钮状态
       var all=event.target.checked;
      // console.log(all);
      for(var item of this.list){
        item.cb=all;
      }//赋值所有商品cb
     },
           //删除指定商品
    delm(){
      //显示交互提示框，请用户再次确认是否删除指定商品
      this.$messagebox.confirm("是否删除指定的商品")
      .then(res=>{
        //选择确认  创建空字符串
        var str="";
      //创建遍历list数组判断如果当前cb值为true将对象编号拼接
      for(var item of this.list){
        if(item.cb){
          str+=item.lid+","
        }
      }
      console.log(str);
      //判断用户是否选择选中商品提示请选择要删除商品
      if(str.length==0){
        this.$messagebox("请选择要删除的商品");
        console.log(111)
        return;
      }
      //0 起始下标  str.length-1 保存几个字符串
      str=str.substring(0,str.length-1);
      console.log(222);
      //创建url
      var url="delm";
      var obj={lid:str};
      this.axios.get(url,{params:obj})
      .then(res=>{
        //console.log(res);
        //再重新加载购物车
        console.log(333)
        this.load();
        //提示删除成功
        this.$toast("删除成功");
      })
      }).catch(err=>{})
    },
       del(event){
       //1.为删除按钮添加自定义属性
       //data-id 保存当前购物车商品id
       //2.添加点击事件 click del
       //2.1交互提示：是否删除商品
       this.$messagebox.confirm("是否删除指定商品").then(res=>{
       //回调函数
       //3.获取当前商品id 
       var iid=event.target.dataset.id;
       //4.输出id
       console.log(iid);
       //5.发送ajax请求
        var url="del";
        var obj={iid};
        this.axios.get(url,{params:obj}).then(res=>{
            //6.获取服务器端返回数据
            console.log(res)
            if(res.data.code==1){
            //7.提示删除成功
            this.$toast("删除成功");
            //8.重新调用load
            this.load();
           }
        });     
       }).catch(err=>{
           //取消
       })
       },
       reduce(i){
         if(this.list[i].count>1){
            this.list[i].count--;
         }
       },
       add(i){
           if(this.list[i].count){
               this.list[i].count++;
           }
       },
           load(){
               var url="findcart";
               this.axios.get(url).then(res=>{
                   console.log(res);
                   if(res.data.code==-1){
                       this.$messagebox("请登录").then(res=>{
                           this.$router.push("/Login");
                       })
                   }else{
                       var list=res.data.data;
                       if(list!==undefined){
                           for(var item of list){
                               item.cb=false;
                           }
                       }
                       this.list=list;
                       console.log(this.list);
                   }
               })
           }
       },
    computed:{
    sum(){
      var total=0;
      for(var i=0;i<this.list.length;i++){
        total+=parseFloat(this.list[i].price)*parseFloat(this.list[i].count);
      }
      return total;//计算总价
    }
  }

   }

</script>
<style>
.dele{
    margin-left:50%;
}
.hjq{
    margin-left:0px;
    color:#ff7223;
  }

.gtt{
   
    width:40px;
    height:30px;
    margin-left:10px;
    margin-top:5px;
  
}
.Bott{
    width:80px;height:40px;
    display: flex;
    line-height: 40px;
    align-items: center;
    margin-left:10px;
}
.Img{
    width:25px;height:25px;
    margin-right:0px;
}
.Carttop{
    display: flex;
    justify-content: space-around;
    margin-top:30px;
    border-bottom: 1px solid #f3f3f3;
   
}
.Xuan{
    width:25px;
    height:25px;
    margin-top:20px;
    margin-left:0px;
    display: flex;
}
.Xuan-true{
    width:100%;
}
.List{
    width:80px;height:80px;
    margin-left:-15px;
}
.List-true{
    width:100%;
}
.Input{
    width:15px;
    height:15px;
    text-align: center;
    border:none;
}
.Shu{
    width:18px;height:18px;
    display:inline-block;
    border:1px solid #f3f3f3;
    text-align: center;
    line-height: 18px;
}
.Font-one{
    font-size:1rem;
}
.Font-two{
    color:#FF7100
}
.Shuli{
    margin-top:20px;
}
.tit{
    margin-left:-20px;
}
.shopping{
    width:100%;
    height:40px;
    background: #f3f3f3;
    align-items: center;
    display: flex;
     
}
.Bot{
    width:100%;
    display: flex;
    position: fixed;
    top:620px;
}
.jiesuan{
    width:80px;height:40px;
    background: #FF7100;
    color:#fff;
    text-align: center;
    line-height: 40px;
    margin-left:90px;
    border-radius: 5px;
}
.heji{
    line-height: 40px;
    display: flex;
    
}
</style>
