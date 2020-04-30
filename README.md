# TaroApp
## 技术栈
* Taro
* 小程序云开发
* Redux
* Redux-saga
* TypeScript
* sass
* Eslint

## 运行
```bash
# yarn 安装依赖
# yarn dev:weapp 启动小程序
```

## 待办
- [x] 登录
- [x] 退出登录
- [x] 发布文章
- [x] 文章列表
- [x] 文章详情
- [x] 按钮登录 loading
- [x] 文章列表 loading
- [x] 文章详情 loading
- [ ] 角色权限
- [ ] 删除文章
- [ ] commit 提交规范
- [ ] 错误监控
- [ ] api 封装
- [ ] api 调用控制台日志打印

## 云函数本地调试
在小程序开发者工具中选择云函数指定函数，右键点击“开启云函数本地调试”，随后出现新的窗口，选择开启本地调试且模拟部分“从小程序端调用”即可。

## 项目中遇到的报错信息
### 请先调用 init 完成初始化后再调用其他云 API
1. 尝试清空小程序开发者工具中的缓存试试（可能是开发者工具的bug~）
2. 检查项目是否运行中 `yarn dev:weapp`

### 获取不到接口返回的数据
可能是云函数未同步，在开发者工具中上传云函数即可。

## 最佳实践
1. 将组件中的同步逻辑重构到异步逻辑
2. 声明和补充对应需要的异步 sagas 文件
3. 定义 sagas 需要的常量文件
4. 定义 sagas 涉及到的前端 API 文件
5. 创建对于的微信小程序云函数，并编写对应的 Node.js 处理逻辑
6. 定义对应的 reducers 文件

## 目录
```
.
├── config                        配置目录
│   ├── dev.js                    开发时配置
│   ├── index.js                  默认配置
│   └── prod.js                   打包时配置
├── dist                          打包后文件
├── functions                     云开发函数
├── src                           代码文件夹
│   ├── api                       api 定义
│   ├── asset                     静态资源
│   │   └── theme                 主题样式
│   ├── components                业务组件
│   ├── images                    图片资源
│   ├── pages                     页面
│   ├── constants                 常量定义
│   ├── store                     状态管理
│   ├── actions
│   ├── reducers
│   ├── sagas
│   ├── app.scss
│   ├── app.tsx
│   └── index.html
├── project.config.json           小程序配置文件
├── global.d.ts                   全局 ts 定义文件
├── tsconfig.json                 ts 配置文件
├── package.json
└── README.md
```
