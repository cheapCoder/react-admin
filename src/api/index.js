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

// 获取商品列表
// export const reqProductList = (pageNum, pageSize) => instance.get("/manage/product/list", { params: { pageNum, pageSize } });

//请求上架，下架
export const changeProductStatus = (productId, status) => instance.post("/manage/product/updateStatus", { productId, status });

//请求搜索商品
export const reqSearchProduct = ({ pageNum, pageSize, type, keyWord }) => instance.get("/manage/product/search", { params: { pageNum, pageSize, [type]: keyWord } });

// 根据商品ID获取商品
// export const reqProductDetail = (productId) => instance.get('/manage/product/info', { params: { productId } })

//添加商品
export const reqAddProduct = ({ categoryId, name, desc, price, detail, imgs }) => instance.post("/manage/product/add", { categoryId, name, desc, price, detail, imgs })

//更新商品信息
export const reqUpdateProduct = ({ _id, categoryId, name, desc, price, detail, imgs }) => instance.post("/manage/product/update", { _id, categoryId, name, desc, price, detail, imgs });

// 删除图片
export const reqDeletePic = (name) => instance.post("/manage/img/delete", { name });

//获取角色列表
export const reqRoleList = (roleName) =>instance.post("/manage/role/add",{roleName})