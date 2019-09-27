import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/fontEnd',
    component: Layout,
    redirect: '/fontEnd/htmlCss',
    name: 'FontEnd',
    meta: { title: '前端视频', icon: 'example' },
    children: [
      {
        path: 'htmlCss',
        name: 'HtmlCss',
        component: () => import('@/views/fontEnd/htmlCss'),
        meta: { title: 'htmlCss', icon: 'tree' }
      },
      {
        path: 'javaScript',
        name: 'JavaScript',
        component: () => import('@/views/fontEnd/javaScript'),
        meta: { title: 'javaScript', icon: 'tree' }
      },
      {
        path: 'vueJs',
        name: 'VueJs',
        component: () => import('@/views/fontEnd/vueJs'),
        meta: { title: 'vueJs', icon: 'tree' }
      },
      {
        path: 'nodeJs',
        name: 'NodeJs',
        component: () => import('@/views/fontEnd/nodeJs'),
        meta: { title: 'nodeJs', icon: 'tree' }
      },
      {
        path: 'fontOther',
        name: 'FontOther',
        component: () => import('@/views/fontEnd/fontOther'),
        meta: { title: 'other', icon: 'tree' }
      }
    ]
  },
  {
    path: '/backEnd',
    component: Layout,
    redirect: '/backEnd/php',
    name: 'BackEnd',
    meta: { title: '后端视频', icon: 'table' },
    children: [
      {
        path: 'java',
        name: 'Java',
        component: () => import('@/views/backEnd/java'),
        meta: { title: 'java', icon: 'tree' }
      },
      {
        path: 'php',
        name: 'Php',
        component: () => import('@/views/backEnd/php'),
        meta: { title: 'php', icon: 'tree' }
      },
      {
        path: 'python',
        name: 'Python',
        component: () => import('@/views/backEnd/python'),
        meta: { title: 'python', icon: 'tree' }
      },
      {
        path: 'endOther',
        name: 'endOther',
        component: () => import('@/views/backEnd/endOther'),
        meta: { title: 'other', icon: 'tree' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/userManage',
    name: 'System',
    meta: { title: '系统管理', icon: 'example' },
    children: [
      {
        path: 'userManage',
        name: 'UserManage',
        component: () => import('@/views/system/userManage'),
        meta: { title: 'userManage', icon: 'table' }
      },
      {
        path: 'videoManage',
        name: 'VideoManage',
        component: () => import('@/views/system/videoManage'),
        meta: { title: 'videoManage', icon: 'tree' }
      },
      {
        path: 'orderManage',
        name: 'OrderManage',
        component: () => import('@/views/system/orderManage'),
        meta: { title: 'orderManage', icon: 'tree' }
      },
      {
        path: 'uploadVideo',
        name: 'UploadVideo',
        component: () => import('@/views/system/uploadVideo'),
        meta: { title: 'uploadVideo', icon: 'tree' }
      }
    ]
  },




  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})


//异步挂载的路由
// export const asyncRouterMap = [
//   {
//     path: '/system',
//     component: Layout,
//     redirect: '/system/userManage',
//     name: 'System',
//     meta: { title: 'system', icon: 'example', role: ['admin'] },
//     children: [
//       {
//         path: 'userManage',
//         name: 'UserManage',
//         component: () => import('@/views/system/userManage'),
//         meta: { title: 'userManage', icon: 'table', role: ['admin'] }
//       },
//       {
//         path: 'videoManage',
//         name: 'VideoManage',
//         component: () => import('@/views/system/videoManage'),
//         meta: { title: 'videoManage', icon: 'tree', role: ['admin'] }
//       },
//       {
//         path: 'orderManage',
//         name: 'OrderManage',
//         component: () => import('@/views/system/orderManage'),
//         meta: { title: 'orderManage', icon: 'tree', role: ['admin'] }
//       },
//       {
//         path: 'uploadVideo',
//         name: 'UploadVideo',
//         component: () => import('@/views/system/uploadVideo'),
//         meta: { title: 'uploadVideo', icon: 'tree', role: ['admin'] }
//       }
//     ]
//   },

//   { path: '*', redirect: '/404', hidden: true }
// ];

