set names utf8;
drop database if exists sk;
create database sk charset=utf8;
use sk;
/*用户注册表*/
create table sk_user(
uid int primary key auto_increment,
uname varchar(32),
upwd varchar(32),
phone varchar(32)
);

/*食客商品表*/
create table sk_product(
lid int primary key auto_increment,
prc1 varchar(2000),  #商品图片
prc2 varchar(2000),  #商品图片
prc3 varchar(2000),  #商品图片
title varchar(64),   #商品标题
price decimal(7,2),  #商品价格
sales int,    #商品销量
stock int,    #商品库存
fare varchar(56), #运费
details varchar(256) #商品详情
);
insert into sk_product values
(null,'pro_hei.jpg','pro_hei.jpg','heitang.png','黑糖玛奇朵',58,15,100,'包邮','浓缩咖啡与蒸煮牛奶美妙融合的甜蜜印记'),
(null,'pro_chao.jpg','pro_chao.jpg','mang.png','超芒小丸子',68,5,100,'包邮','新鲜泰国芒果，加上爽滑牛奶，夏日标配'),
(null,'pro_tang.png','pro_tang.png','pro_tang.png','鲜盅鸡汤',58,10,100,'包邮',null),
(null,'pro_dou.jpg','pro_dou.jpg','pro_dou.jpg','豆腐火腩饭',48,8,100,'包邮',null),
(null,'pro_xia.jpg','pro_xia.jpg','pro_xia.jpg','虾仁炒饭',38,3,100,'包邮',null),
(null,'pro_fei.jpg','pro_fei.jpg','pro_fei.jpg','让土豆飞',38,4,100,'包邮',null);
create table sk_shoppingcart_item(
iid int primary key auto_increment, 
uid int, #用户编号
lid int, #商品编号
pic varchar(128), #商品图片
title varchar(128), #商品标题
price decimal(10,2), #商品价格
count int #购买数量
);
