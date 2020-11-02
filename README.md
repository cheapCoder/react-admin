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

- [ ] 修复bug: 点击搜索后再点击分页导航按钮时商品又变成所有商品，完善搜索按钮，分页按钮点击时的商品请求函数

- [ ] 完成商品菜单，商品里的分类管理用前端分页，商品管理用后端分页

- [ ] 配置商品详情Detail和商品修改GoodAddOrUpdate路由(用多个相似路由或用exact)

- [ ] 修改跳转到详情页或添加修改页头部标题和左侧路由丢失的

- [ ] 详情页的静态页面及，从父组件获取商品的详细信息并展示

- [ ] 用dangerouslySetInnerHtml解决商品描述渲染问题，用后台数据请求解决详情页刷新数据丢失问题

- [ ] 详情页的商品分类id到分类名

- [ ] 详情页detail的loading效果

- [ ] 商品修改页的必填*效果通过规则的require动态展示

- [ ] 封装图片上传组件

- [ ] 图片上传组件与后台交互，注意图片限制宽高

- [ ] 用Wysiwyg完成富文本编辑器，或者用其他的库

- [ ] 角色路由组件的卡片，表格展示，增加角色按钮逻辑，权限设置逻辑和树形控件的引入，回显，添加menu菜单全选按钮

- [ ] 用户管理路由的用户显示

- [ ] 不同角色的不同menu菜单显示逻辑

- [ ] Header组件交互--天气预报，请求的是百度接口，使用了jsonp库发送请求

- [ ] 优化组件数据配置，将数据放到最前

- [ ] **配置eslint-plugin-react-hooks插件，尝试使用hook重构class组件，首先就是category.jsx，class和hook都用了**

- [ ] 将组件的配置项提升到文件前方或到单个一个文件内

