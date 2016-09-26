#super-touch
 <h5>提供DOM元素基础的触摸的能力</h5>
##Install
npm install super-touch
##Use
<pre>
var Touch = require('super-touch');
var touch = new Touch(el);

touch.on('touch:start',function(res){
    res.x1 //x轴位置
    res.y1 //y轴位置
    res.e //Dom事件
    res.el //触发时间的元素
    res.timestamp //事件戳
});

touch.on('touch:move',function(res){
    res.x1 //开始触摸x轴位置
    res.y1 //开始触摸y轴位置
    res.x2 //每次滑动x轴位置
    res.y2 //每次滑动y轴位置
    res.e //DOM事件
    res.toUp //上次滑动到这次滑动是向上的吗(垂直方向)
    res.toLeft //上次滑动到这次滑动是向左的吗(水平方向)
    res.xrange //上次滑动到这次滑动的X轴距离
    res.yrange //上次滑动到这次滑动的Y轴距离
    res.spend //滑动总共花费的事件
});

touch.on('touch:end',function(res){
    res.x1 //开始触摸x轴位置
    res.y1 //开始触摸y轴位置
    res.x2 //每次滑动x轴位置
    res.y2 //每次滑动y轴位置
    res.e //DOM事件
    res.dir //滑动的方向
});

touch.on('touch:cancle',function(res){
    res.x1 //开始触摸x轴位置
    res.y1 //开始触摸y轴位置
    res.x2 //每次滑动x轴位置
    res.y2 //每次滑动y轴位置
    res.dir //滑动的方向
});

//改变绑定的DOM的元素
touch.on('touch:el',el);

//监听的window滚轴
touch.on('touch:scroll', function(e){

));
</pre>