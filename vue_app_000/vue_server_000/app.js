//app.js 服务器端程序
//1:下载三个模块 
//  cors            完成跨域处理
//  express-session session对象
//  mysql           数据库驱动
//  express         web服务器
//下载命令在线  
//npm i cors express-session express  mysql
//2:将以上四个模块引入到当程序
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session"); 
const bodyParser = require('body-parser');
//3:创建数据库连接池(池 提高效率)
var pool = mysql.createPool({
    host:"127.0.0.1", //数据库地址
    user:"root",      //数据库用户名
    password:"",      //数据库密码
    port:3306,      //数据库端口
    database:"sk",//库名
    connectionLimit:15//15连接
})
//4:配置跨域模块
//  允许哪个程序跨域访问服务器
//  脚手架:3001 允许3001访问我
//  服务器:4000 你
var server = express();
server.use(cors({
  //允许程序列表
  origin:["http://127.0.0.1:3001","http://localhost:3001"],
  credentials:true//每次请求需要验证
}))
//5:配置session模块?????????
server.use(session({
   secret:"128位字符串",//安全字符串
   resave:true,//请求时更新数据
   saveUninitialized:true//保存初始数据
}))
server.use(bodyParser.urlencoded({
    extended: false
}));
//6:配置项目静态目录 public
server.use(express.static("public"))
//7:创建express对象绑定4000端口
server.listen(4000);
//完成用户注册功能
server.get("/reg",(req,res)=>{
  var uname=req.query.uname;
  //console.log(uname);
  var upwd=req.query.upwd;
  var phone=req.query.phone;
  var sql1="SELECT uid FROM sk_user WHERE uname=?";
   pool.query(sql1,[uname],(err,result)=>{
     if(err) throw err;
    if(result.length==0){
      var sql2="INSERT INTO sk_user VALUES(null,?,?,?)";
      pool.query(sql2,[uname,upwd,phone],(err,result)=>{
        if(err) throw err; 
        if(result.affectedRows==0){
          res.send({code:-1,msg:"注册失败"})
        }else{
          res.send({code:1,msg:"注册成功"})
      }  
    })
   }else{
     res.send({code:0,msg:"当前用户名已经注册"})
    }
   })
})
//8:功能一:完成用户登录
server.get("/login",(req,res)=>{
//(1)获取脚手架参数 uname upwd
var uname = req.query.uname;
var upwd = req.query.upwd;
//(2)创建sql语句查询
var sql = "SELECT uid FROM sk_user WHERE uname = ? AND upwd = ?";
//(3)执行sql语句
pool.query(sql,[uname,upwd],(err,result)=>{
 if(err)throw err;
 //(4)获取执行结果
 //(5)判断查询是否成功 result.length
 if(result.length>0){
   req.session.uid=result[0].uid;
   res.send({code:1,data:result})
 }else{
   res.send({code:-1,msg:"登录失败"})
 }
 //(6)将结果返回脚手架
})
})
//模糊查询
server.get("/search",(req,res)=>{
  var kw=req.query.kw;
  var sql=`select lid,prc1,prc2,prc3,title,price,sales,stock,fare,details from sk_product where title like '%${kw}%'`;
  pool.query(sql,[kw],(err,result)=>{
    if(err) throw err;
  if(result.length>0){
    res.send({code:1,data:result})
  }else{
  res.send({code:0})
  }
})
})
//精选信息加载
server.get("/product",(req,res)=>{
  //(2)创建sql语句查询
  var sql = "select * from sk_product";
  //(3)执行sql语句
  pool.query(sql,(err,result)=>{
   if(err)throw err;
   //(4)获取执行结果
   //(5)判断查询是否成功 result.length
   if(result.length>0){
     res.send({code:1,msg:"查询成功",data:result})
   }else{
     res.send({code:-1,msg:"查询失败"})
   }
   //(6)将结果返回脚手架
  })
  })
//详情页面加载
server.get("/title",(req,res)=>{
  //获取mid参数
  var lid=req.query.lid;
  //创建sql语句查询
  var sql="select lid,prc1,prc2,prc3,title,price,sales,stock,fare,details from sk_product where lid = ?";
  //执行sql语句
  pool.query(sql,[lid],(err,result)=>{
    if(err)throw err;
    //(4)获取执行结果
    //(5)判断查询是否成功 result.length
    if(result.length>0){
      res.send({code:1,msg:"查询成功",data:result})
    }else{
      res.send({code:-1,msg:"查询失败"})
    }
    //(6)将结果返回脚手架
   })
})
server.get("/addcart",(req,res)=>{
  //2:获取当前用户登录凭证 uid
  var uid = req.session.uid;
//  console.log(uid);
  //3:如果用户没登录返回错误消息
  if(!uid){
   res.send({code:-1,msg:"请登录"});return; 
  }
  //4:获取商品编号/商品价格/商品名称
  var lid=req.query.lid;
  var pic=req.query.pic;
  var title=req.query.title;
  var price=req.query.price;
  var count=req.query.n;
 // console.log(lid,pic,title,price,count);
  //5:查询指定用户是否购买过此商品
  var sql = "SELECT iid FROM sk_shoppingcart_item WHERE uid = ? AND lid = ?";
  //6:执行sql
  pool.query(sql,[uid,lid],(err,result)=>{
   if(err)throw err; 
   //7:在回调函数判断是否购买过
   if(result.length==0){
   //8:添加一条数据
   var sql = `INSERT INTO sk_shoppingcart_item VALUES(null,${uid},${lid},'${pic}','${title}',${price},${count})`;
   }else{
   //9:更新一条数据
  
   var sql = `UPDATE sk_shoppingcart_item SET count=${count} WHERE uid=${uid} AND lid=${lid}`;
   }
   //10:执行sql
   pool.query(sql,(err,result)=>{
     if(err)throw err;
     res.send({code:1,msg:"添加成功"})
     //console.log(count);
   })
   //11:将执行结果返回脚手架 
  })
 });
 //查看购物车数据
 server.get("/findcart",(req,res)=>{
   //获取当前用户uid
   var uid=req.session.uid;
   //console.log(uid);
   if(!uid){res.send({code:-1,msg:"请登录"});return;}
   var sql="select iid,uid,lid,pic,title,price,count from sk_shoppingcart_item where uid=?";
   pool.query(sql,[uid],(err,result)=>{
     if(err)throw err;
     //console.log(result);
     res.send({code:1,msg:"查询成功",data:result});
   })
 });
 server.get("/del",(req,res)=>{
   var uid=req.session.uid;
   console.log(uid);
   if(!uid){res.send({code:-1,msg:"请登录"});return;}
   var iid=req.query.iid;
   console.log(iid);
   var sql="delete from sk_shoppingcart_item where iid=?";
   pool.query(sql,[iid],(err,result)=>{
     if(err)throw err;
     if(result.affectedRows>0){
       res.send({code:1,msg:"删除成功"})
     }else{
       res.send({code:-1,msg:"删除失败"})
     }
   })
 })
//删除多个指定购物车商品
server.get("/delm",(req,res)=>{
  var uid=req.session.uid;
  if(!uid){res.send({code:-2,msg:"请登录"});return;}
  //获取一组lid
  var lid=req.query.lid;
  var sql=`DELETE FROM sk_shoppingcart_item WHERE lid IN(${lid})`;
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"删除成功"});
    }else{
      res.send({code:-1,msg:'删除失败'})
    }
  })
})
//   http://127.0.0.1:4000/login?uname=tom&upwd=123
//   http://127.0.0.1:4000/login?uname=tom&upwd=122   
//app.js 复9~73   



