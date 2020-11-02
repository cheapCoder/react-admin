# react项目过程记录

### **问题**：

- [ ] CSS: filter: blur的白边问题

- [ ] 登陆页的背景在F12打开控制台并显示在下方后，图片高度减少并出现滚动条

- [ ] 自己封装的axios请求拦截器每次都会带token发送check_token请求，应该额外判断这种情况并中断axios请求

- [x] 无token信息自动跳转到login页面时会**显示两次401消息**

  > ​	单独判断，将其交给admin组件单独显示

- [x] login登陆成功跳转到admin页面，redux中是新数据，但控制台仍打印老数据

  > ​		login登陆逻辑错误，应先发出action数据更新redux，在进行路由跳转
  >
  > ​		**注意善用debugger语句**			

- [x] 左侧sider组件折叠时，项目标题“后台管理系统”使用visibility或display:none多会有挤压下方菜单menu再回弹的情况

  > ​		不能用visibility，隐藏后仍占位，会挤压下方菜单menu		
  >
  > 给sider绑定onTransitionEnd事件并借助state的collapsed属性判断dispalay为none还是inline
  >
  > 在修改collapse的回调中再次判断display值并修改，注意setState的异步性

- [x] antd 4x的图标名称无法动态指定

  > ​	issue链接：https://github.com/ant-design/ant-design/issues/20668
  >
  > 使用兼容v3的库[Ant Design Compatible](https://github.com/ant-design/compatible#icon), 但会全量引入icon, 增大包体积，且控制台报错
  >
  > ![image-20201030091112297](C:\Users\10615\AppData\Roaming\Typora\typora-user-images\image-20201030091112297.png)
  >
  > 期待更优雅的方案！

- [ ] 首次加载路由为admin导致无默认选中菜单的bug

  > ​			进行判断，为admin则将defaultSelectedKeys该为home

- [ ] admin的footer部分全屏时下方有2px的白边

- [ ] 在组件外定义无联系的函数方法是否有害于组件本身，如mySider内的flatten函数

- [ ] header组件里由于计时器导致render调用，进而导致多次调用获取title信息的方法的性能问题

- [ ] 怎么路由组件传递函数参数

- [ ] 每次修改category列表数据显示都会翻转(reverse)

  > ​	使用arr.reverse会修改原数组，用三点运算符复制一份在reverse

- [ ] 

- [ ] 

- [ ] 

- [ ] 

  

### **注意：**

1. 不要直接对state内的对象或数组解构赋值，因为最后都是引用同一个对象
2. 组件引入图片等需要使用import 引入，在img标签中使用变量指定目标图片
3. 利用state作为任意两标签间通信的介质
4. **this.setState是异步的**![](C:\Users\10615\AppData\Roaming\Typora\typora-user-images\image-20201023160219506.png)
6. redux的action和state都是传入组件的，通过this.props读取
6. 使用nprogress要引入样式
7. fullscreen库更改全屏的api toggle是异步的，返回promise，需要在then中setState新的全屏属性isFullScreen
8. antd会"干扰"css的color属性继承，不要给给父元素加color而是直接加在当前元素上
9. antd 4.获取form字段通过在form元素上添加ref获取，[参考博客地址](https://anandzhang.com/posts/frontend/10)