# TaroApp

## 技术栈

* Taro
* 小程序云开发
* Redux
* Redux-saga
* TypeScript
* sass
* Eslint

## 使用

### 运行

``` bash
# yarn 安装依赖
# yarn dev:weapp 启动小程序
```

### 代码提交规范

#### 命令

``` shell
git add .
git cz
```

#### type

``` 
# 主要type
feat:     增加新功能
fix:      修复bug

# 特殊type
docs:     只改动了文档相关的内容
style:    不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
build:    构造工具的或者外部依赖的改动，例如webpack，npm
refactor: 代码重构时使用
revert:   执行git revert打印的message

# 不推荐使用type
test:     添加测试或者修改现有测试
perf:     提高性能的改动
ci:       与CI（持续集成服务）有关的改动
chore:    不修改src或者test的其余修改，例如构建过程或辅助工具的变动
```

#### 更多资料

[Git commit message 规范](https://juejin.im/post/5d0b3f8c6fb9a07ec07fc5d0#comment)

### 云函数本地调试

1. 在小程序开发者工具中选择云函数指定函数
2. 右键点击“开启云函数本地调试”，随后出现新的窗口
3. 选择开启本地调试且模拟部分“从小程序端调用”即可

## TODO
> 将待办事项移入语雀文档。
[TODO_LIST](https://www.yuque.com/atrue/fmmuq7/lw0mqg)

## 最佳实践

1. 将组件中的同步逻辑重构到异步逻辑
2. 声明和补充对应需要的异步 sagas 文件
3. 定义 sagas 需要的常量文件
4. 定义 sagas 涉及到的前端 API 文件
5. 创建对于的微信小程序云函数，并编写对应的 Node.js 处理逻辑
6. 定义对应的 reducers 文件

### git commit 工具

1. 全局安装 commitizen

`sudo npm install -g commitizen` 

commitizen 是一个撰写合格 commit message 的工具，用于代替 git commit 指令。

2. 全局安装 cz-conventional-changelog

`sudo npm install -g cz-conventional-changelog` 

cz-conventional-changelog 适配器提供 conventional-changelog 标准（约定式提交标准）。

3. 生成 commitizen 指定 Adapter 配置文件

`echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc` 

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

## 说明

### 权限说明
通过 roles 控制权限，需要根据功能权限表来确定用户是否有该功能的读取/操作权限。

### 功能权限说明

#### 显示功能

* 发表文章 - 0
* 用户列表 - 1

#### 编辑功能

* 权限设置 - 2
* 用户删除 - 3

### 操作日志

记录用户被修改的表，保存以下字段信息

1. 用户Id 
2. 操作用户Id
3. 操作时间
4. roles字段更新前
5. roles 更新后

## 报错

### [ 请先调用 init 完成初始化后再调用其他云 API ]

1. 尝试清空小程序开发者工具中的缓存试试（可能是开发者工具的bug~）
2. 检查项目是否运行中 `yarn dev:weapp` 

### [ 获取不到接口返回的数据 ]

可能是云函数未同步，在开发者工具中上传云函数即可。
