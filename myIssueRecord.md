# react项目过程记录

### **问题**：

- [ ] CSS: filter: blur的白边问题
- [ ] 登陆页的背景在F12打开控制台并显示在下方后，图片高度减少并出现滚动条
- [ ] 自己封装的axios请求拦截器每次都会带token发送check_token请求，应该额外判断这种情况并中断axios请求





### **注意：**

1. 不要直接对state内的对象或数组解构赋值，因为最后都是引用同一个对象
2. 组件引入图片等需要使用import 引入，在img标签中使用变量指定目标图片
3. 利用state作为任意两标签间通信的介质
4. **this.setState是异步的**![](C:\Users\10615\AppData\Roaming\Typora\typora-user-images\image-20201023160219506.png)
5. 使用nprogress要引入样式