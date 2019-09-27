# yudukongjian201909
## 一、 yuedu.1539.ink - 域名 - 部署 - yuedu-server
### 1. 修改 prod.env.js
BASE_API: '"http://yuedu.1539.ink"',
### 2.修改api
delete ‘/apis’
### 3.修改所有页面img的src
delete 'http://localhost:8081'+
### 4. 修改 router/index.js
commented system
### 5. 修改 index.html
cancle commented 百度统计
### 6. src\views\layout\components\Navbar.vue
commented musicUrlList
### 7.打包
npm run build

## 二、http://47.104.171.247:8081 - 部署 - yuedu-admin - server
### 1. 修改 prod.env.js
BASE_API: '"http://47.104.171.247:808"',
### 2.修改api
delete ‘/apis’
### 3.修改所有页面img的src
delete 'http://localhost:8081'+
### 4. 修改 router/index.js
cancle commented system
### 5. 修改 index.html
commented 百度统计
### 6. src\views\layout\components\Navbar.vue
commented musicUrlList
### 7.打包
npm run build

## 三、本地 - 部署
### 1. 修改 config/index.js
target: 'http://127.0.0.1:8081',
### 2.修改api
add  ‘/apis’