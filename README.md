# React项目任务列表

- [x] 使用create-react-app创建基于react脚手架应用,

- [x] antd按需引入，自定义主题色(主题色：#08a7fa)

- [x] 搭建项目redux开发环境(redux, react-redux, redux-thunk, redux devtools extension)

- [x] login静态页面

- [x] login的Form表单的静态Form

- [x] login的Form表单给用户名，密码加校验，声明式验证

   > 用户名/密码的的合法性要求
   >
   > 1). 必须输入
   > 2). 必须大于4位
   > 3). 必须小于 12 位
   > 4). 必须是英文、数字或下划线组成

- [x] 封装原生axios，使用请求拦截器统一更改post请求参数为urlencoded编码

- [x] 在config文件夹配置，保存通用性的配置和变量

- [x] 引入nprogress

- [x] 使用响应拦截器，统一处理所有ajax请求的错误 + 从axios返回对象中提取真正服务器返回的数据

- [x] 引入react-router

- [x] Redux保存user和token数据，完成自动登录

- [x] **使用es6的装饰器语法更改connect方法**，安装@babel/plugin-proposal-decorators, 并在config-overrides.js中配置addDecoratorsLegacy

- [x] Admin界面布局 -- 使用antd的Layout组件 

- [x] Header组件静态

- [x] 完成退出登录逻辑

- [x] 解决token到期或修改后未自动跳转到登陆页的bug，用拦截器解决

- [x] Header组件交互--全屏切换，使用screenfull库

- [x] Header组件交互--退出登录，使用antd的Modal提示框组件

- [x] 利用antd完成左侧导航静态布局及切换效果

- [x] 使用全家桶内的menu.js遍历递归生成左侧导航菜单

- [x] Admin子路由搭建 

- [x] 左侧菜单栏的current显示和自动打开

- [x] 完成模拟网速(慢3G情况下)请求数据时的loading效果

- [x] 右上角添加按钮新增和修改商品分类

- [x] 商品管理的静态页面

- [x] 商品管理页面的上架和下架按钮

- [x] 商品搜索功能

- [x] 修复bug: 点击搜索后再点击分页导航按钮时商品又变成所有商品，完善搜索按钮，分页按钮点击时的商品请求函数

- [x] 完成商品菜单，商品里的分类管理用前端分页，商品管理用后端分页

- [x] 使用antd组件Drawer搭建商品详情Detail组件

- [x] 详情页的静态页面，从父组件获取商品的详细信息并展示

- [x] 商品修改changeProduct路由(用多个相似路由或用exact)

- [x] 封装图片上传组件

- [ ] 图片上传组件与后台交互，**图片限制宽高**

- [x] 用Wysiwyg完成富文本编辑器，或者用其他的库

- [x] 角色路由组件的卡片，表格展示，增加角色按钮逻辑，权限设置逻辑和树形控件的引入，回显，添加menu菜单全选按钮

- [ ] 不同角色的不同menu菜单显示

- [ ] 利用echart实现charts页的pie、line、bar表

- [ ] Header组件交互--天气预报，请求的是百度接口，使用了jsonp库发送请求

- [ ] 优化组件数据配置，将可变数据放到最前

- [ ] **配置eslint-plugin-react-hooks插件，尝试使用hook重构class组件，首先就是category.jsx，class和hook都用了**

- [ ] 将组件的配置项提升到文件前方或到单个一个文件内, 

- [ ] 优化代码结构，统一风格

   - [ ] 自定义的函数用handle开头，antd的回调用on开头
   - [ ] 统一modal 组件显示用`<modal/>`或是modal的api

- [ ] 完善组件间的propsType

- [ ] 将请求发送转到action中

- [ ] 封装`添加按钮`为单独的组件

- [ ] **通过mock模拟所有后台数据**



# 所遇问题及解决

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

- [x] 首次加载路由为admin导致无默认选中菜单的bug

  > ​			进行判断，为admin则将defaultSelectedKeys该为home

- [x] admin的footer部分全屏时下方有2px的白边

  > ​		给footer组件添加绝对定位，**为什么相对定位不行？**

- [ ] 在组件外定义无联系的函数方法是否有害于组件本身，如mySider内的flatten函数

- [x] 每次修改category列表数据显示都会翻转(reverse)

  > ​	使用arr.reverse会修改原数组，用三点运算符复制一份在reverse

- [ ] **跳转至changeProduct路由后header的name标题仍然是“商品管理”**，且刷新消失

- [x] antd库Form的initialValue设置无效

  > ​	antd4的initialValue设置到Form组件的话可[传递对象指定Form.Item的initialValue](https://ant.design/components/form/v3-cn#%E5%88%9D%E5%A7%8B%E5%8C%96%E8%B0%83%E6%95%B4)
  >
  > ​										**写到Form.Item组件里的话注意需要有name属性才会生效**

- [ ] **如果是网络请求失败，在instance里中断了promise会导致请求await后的代码永远不执行**

- [x] 图片上传组件ImgWall的图片上传后台返回失败，后台使用multer库

  > **结论：**antd4的Upload组件应该有name属性，且与upload.single(field)的field一致
  >
  > 过程：前端无报错，查看后端源码，打印`upload.single(field)`的回调函数的`err`报出`MulterError: Unexpected field`的错误，谷歌后发现需要字段对应，则添加name属性，成功！(antd文档：`name: 发到后台的文件参数名`)
  >
  > 参考：https://stackoverflow.com/questions/31530200/node-multer-unexpected-field
  >
  > ​			https://blog.csdn.net/kobe246/article/details/79380948
  >
  > 其他：antd 4x. upload组件上传博客学习：https://anandzhang.com/posts/frontend/14

- [ ] **big bug: 自定义图片上传时机为点击‘提交’时，不然若直接退出或地址跳转走了商品的图片信息为上传到数据库但图片却上传了导致耗费内存([参考链接](https://ant.design/components/upload-cn/#components-upload-demo-upload-manually))**

- [x] **product页在分页器在非1时，点击搜索应跳转到第一页**

  > ​		添加state属性currentPage，通过antd的pagination的current属性绑定currentPage

- [ ] category, role, user页的`添加`按钮应该一显示就自动聚焦, 且加入重复自动清除Input的值，form里的应该用setFieldValues来

- [ ] **多次点击不同用户号的`修改`按钮显示的用户信息有延迟，使用`setState`的回调函数也不行，能用forceUpdate吗？有可能是antd本身的问题?**

- [ ] 

- [ ] 

  

# 踩坑记录

1. react里setState对象或数组要解构，因为最后都是引用同一个对象
2. 组件引入图片等需要使用import 引入，在img标签中使用变量指定目标图片
3. 利用state作为任意两标签间通信的介质
4. **this.setState是异步的**![](C:\Users\10615\AppData\Roaming\Typora\typora-user-images\image-20201023160219506.png)
5. redux的action和state都是传入组件的，通过this.props读取
6. 使用nprogress要引入样式
7. fullscreen库更改全屏的api toggle是异步的，返回promise，需要在then中setState新的全屏属性isFullScreen
8. antd会"干扰"css的color属性继承，不要给给父元素加color而是直接加在当前元素上
9. antd 4.获取form字段通过在form元素上添加ref获取，[参考博客地址](https://anandzhang.com/posts/frontend/10)
10. react-router传参的方式：
    1. query
    2. params
    3. state
11. antd的Form组件[隐藏必填表单会出现的星号](https://github.com/ant-design/ant-design-pro/issues/2044)：`hideRequiredMark： 隐藏所有表单项的必选标记 | Boolean | false`
12. 后端只有对添加商品时的重名检查，而更新商品时则没有重名检查
13. `arr.prototype.splice()`返回被删除元素的数组而不是修改后的数组
