import instance from './instance'

//请求登陆
export const reqLogin = (username, password) => instance.post("/login", { username, password });

//验证token 
export const reqVerifyToken = () => instance.post("/check_token")

// 高德天气接口
// export const reqWeather = () => instance.post("")


//获取分类列表
export const reqCategoryList = () => instance.get("/manage/category/list");

// 添加分类列表
export const addCategoryList = (categoryName) => instance.post("/manage/category/add", { categoryName });

// 更改分类列表
export const updateCategoryList = (categoryId, categoryName) => instance.post("/manage/category/update", { categoryId, categoryName });

