import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error-page/404.vue'),
  },
  {
    name: 'bookmarks',
    path: '/bookmarks',
    component: () => import('@/views/bookmarks/index.vue'),
  },
  {
    name: 'nav-technology',
    path: '/nav-technology',
    component: () => import('@/views/nav-technology/index.vue'),
  },
  {
    name: 'app',
    path: '/app',
    component: () => import('@/views/app-list/index.vue'),
  },
  {
    path: '/camera',
    name: 'camera',
    component: () => import('@/views/camera/index.vue'),
    meta: {
      title: '相机功能'
    }
  },
  // 任务列表-一城一家审核列表
  {
    path: '/task-list',
    name: 'task-list',
    component: () => import('@/views/task-list/index.vue'),
    meta: {
      title: '任务列表'
    }
  },
  {
    name: 'main',
    path: '/',
    redirect: 'home',
    component: () => import('@/components/main/index.vue'),
    children: [
      {
        name: 'home',
        path: '/home',
        meta: {
          title: '首页',
          icon: 'HomeFilled',
        },
        component: () => import('@/views/home/index.vue'),
      },
      {
        name: 'technology',
        path: '/technology',
        meta: {
          title: '技术',
          icon: 'Platform',
        },
        component: () => import('@/views/technology/index.vue'),
      },
      {
        name: 'life',
        path: '/life',
        meta: {
          title: '生活',
          icon: 'Sunny',
        },
        component: () => import('@/views/life/index.vue'),
      },
      {
        name: 'about',
        path: '/about',
        meta: {
          title: '关于',
          icon: 'User',
        },
        component: () => import('@/views/about/index.vue'),
      },
      {
        name: 'navigation',
        path: '/navigation',
        meta: {
          title: '导航',
          icon: 'Compass',
        },
        component: () => import('@/views/navigation/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
