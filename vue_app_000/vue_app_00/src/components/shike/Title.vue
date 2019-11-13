<template lang="">
    <div>
        <div class="oneDiv">
       <div>
           <div class="ImgDiv">
           <img :src="'http://127.0.0.1:4000/'+lists.prc1" class="Imgclass">
           </div>
           <h4>{{lists.title}}</h4>
           <p class="jiage">￥{{lists.price}}.00</p>
           <p class="Peis">配送费：{{lists.fare}}</p>
           <div class="quhuo">
               <div>取货方式</div><div>快递</div>
           </div>
       </div>
       <div class="Bgcol">
           <div class="Span1"></div>
           <div class="Span3">详情</div>
           <div class="Span2"></div>
       </div>
       <div class="Tit">产品详情</div>
       <div class="Titdiv">
           <img :src="'http://127.0.0.1:4000/'+lists.prc1" class="Titimg">
       </div>
       <div class="Titdiv2">
           <img :src="'http://127.0.0.1:4000/'+lists.prc1" class="Imgclass2">
       </div>
       <div class="bottom" >
            <div class="Bone">
                <img src="../../img/shopping.png" class="Bimg">
                <router-link to="/Cart" >
                <p class="Btp">购物车</p>
                </router-link>
            </div>
            <div class="Bone">
                <img src="../../img/shoucang.png" class="Bimg">
                <p class="Btp">收藏</p>
            </div>
            <div class="Bone">
                <img src="../../img/kefu.png" class="Bimg">
                <p class="Btp">客服</p>
            </div>
           <div class="Bshop" @click="show">加入购物车</div>
           <div class="Bshop2" @click="toBuy">立即购买</div>
           
       </div>
       </div>
       <!-- 隐藏部分 -->
       <div v-show="alert">
           <div class="twoDiv"> </div>
           <div class="Heitang">
           <div class="bb">
               <div class="Hei">
                   <img :src="'http://127.0.0.1:4000/'+lists.prc1" class="Heiimg">
               </div>
               <div class="aa">    
                   <div class="jiage">￥{{lists.price}}.00</div>
                   <div>
                   <img src="../../img/quxiao.png" class="quxiao" @click="hide">
                   </div>
               </div>
               </div>
               <div class="buy">
                  <div class="shuli">购买数量</div>
                   <div>
                        <button @click="reduce" class="btnj2">-</button>
						<input type="text" class="aaa" v-model="n">
						<button class="btnj" @click="add">+</button>
                   </div>
               </div>
               <div class="jiaru" @click="jcart" :data-lid="lists.lid"
             :data-pic="lists.prc1" :data-title="lists.title" :data-price="lists.price">加入购物车</div>
             </div> 
       </div>
       <gobuy :lists="lists"></gobuy>
    </div>
</template>
<script>
import Gobuy from "./Gobuy.vue"
export default {
    data(){
        return{
            n:1,
            alert:false,
            lists:[]
        }
    },
    props:["lid"],
    methods:{
        reduce(){
            if(this.n>1){
                this.n--;
            }
        },
     
       toBuy(){
           this.$store.commit("setOpen");
       },
       add(){
           this.n++;
       },
        show(){this.alert=true},
        hide(){this.alert=false},
        load(){
            var url="title";
            this.axios.get(url,{params:{lid:this.lid}}).then(res=>{
              //  console.log(res)
             this.lists=res.data.data[0];
            //console.log(this.lists);
            })
        },
        jcart(event){
            var n=this.n;
            var lid=event.target.dataset.lid;
            var pic=event.target.dataset.pic;
            var title=event.target.dataset.title;
            var price=event.target.dataset.price;
            //console.log(n,lid,pic,title,price);
            var obj={n,lid,pic,title,price};
            var url="addcart";
            this.axios.get(url,{params:obj}).then(res=>{
               // console.log(res);
                if(res.data.code==-1){
                    this.$router.push("/Login");
                }else{
                    this.$toast("添加成功");
                }
            })
        }
    },
    created () {
        this.load();
    },
    watch: {
        lid(){
            this.load();
        }
    },
    components:{
        "gobuy":Gobuy
    }
}
</script>
<style scoped>
.aaa{
    width:30px;
    text-align: center;
}
.Imgclass2{
    width:100%;
}
.Imgclass{
    width:100%;
}
.ImgDiv{
    width:100%;
    height:370px;
}
*{
    margin:0;padding:0;
}

.shuliang{
    display: inline-block;
    width:20px;height:20px;
   
}
.twoDiv{
    width:100%;
    height:1000px;
    background: rgba(0, 0, 0, 0.6);
    z-index: 3;
    position:absolute;
}
.oneDiv{
    width:100%;
    position:absolute;
    z-index: 0;
}
.jiaru{
    width:100%;
    height:50px;
    background: #FF7100;
    position:fixed;
    top:630px;
    text-align: center;
    line-height: 50px;
    color:#fff;
}
.quxiao{width:30px;
        height:30px;
        margin-left:160px;
        margin-top:10px;
}
.bb{display: flex;
}
.aa{ display: flex;
     justify-content: space-between;
     margin-left:100px;}
.buy{
    display: flex;
    justify-content: space-between;
    margin-top:25px;
    margin-left:20px;
    line-height: 50px;
}

.Heitang{
    width:100%;
    height:420px;
    position:fixed;
    top:300px;
    background: #fff;
    z-index: 9;
    border-radius: 10px;
}
.Hei{width:80px;
     height:80px;
     position: absolute;
     top:-20px;
     left:10px;
     border:1px solid #fff;}
.Heiimg{width:100%;
        height:80px;}
.Bgcol{
    width:100%;
    height:60px;
    background: #f3f3f3;
    display: flex;
    position:relative;
    margin-top:5px;
}
.Span1,.Span2{
    width:50px;height:1px;
    background:#999999;
    position:absolute;
    top:30px;
    left:30%;
}
.Span2{
    left:60%;
}
.Span3{
    font-size:0.8rem;
    position:absolute;
    top:22px;
    left:49%;
}
.quhuo{
    display: flex;
    justify-content: space-between;
    font-size:0.9rem;
    color:#999999;
    margin-left:10px;
}
.Tit{
    margin-top:10px;
    margin-left:10px;
    margin-bottom:25px;
}
.Titdiv{
    width:80%;
    height:300px;
}
.Titimg{
    width:100%;
    margin-left:10px;
}
.Titdiv2{
    width:100%;
    margin-top:50px;
}
.bottom{
    width:100%;
    height:50px;
    display: flex;
    position: fixed;
    top:630px;
}
.Bone{
    width:12%;
    background: #ffffff;
}
.Bimg{
    width:60%;
    margin-bottom:0px;
    margin-top:3px;
    margin-left:7px;
}
.Btp{
    font-size:0.8rem;
    margin-top:-5px;
    text-align: center;
}

.Bshop,.Bshop2{
    width:32%;
    background:#F5A623;
    text-align: center;
    line-height: 50px;
    color:#ffffff;
}
.Bshop2{
    background: #FF7100;
}
.jiage{
    color:#FF6600;
    margin-top:10px;
    margin-left:10px;
}
.Peis{
font-size:0.9rem;
margin-left:10px;
}
h4{
    margin-top:15px;
    margin-left:10px;
}
.btnj{
		margin-right:25px;
        width:20px;
	}
 .btnj2{
        width:20px;
    }
</style>