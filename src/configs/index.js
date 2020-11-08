import echartTheme from "./myEcharts"



//用户名，密码表单验证规则
const validateRuler = [
  { required: true, message: "这是必输项" },
  { max: 12, message: "输入超出上限" },
  { min: 4, message: "输入不及下限" },
  { whitespace: true, message: "are you kidding？" },
  { pattern: /^\w+$/, message: '必须是英文、数组或下划线组成' }
]

//公开路由，不用验证角色权限
const pulicRoutes = ["login", "home"]


export {
  validateRuler,
  echartTheme,
  pulicRoutes,
}