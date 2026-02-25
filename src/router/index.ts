import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/error-page/404.vue'),
  },
  {
    name: 'bookmarks',
    path: '/bookmarks',
    component: () => import('@/pages/bookmarks/index.vue'),
  },
  {
    name: 'nav-technology',
    path: '/nav-technology',
    component: () => import('@/pages/nav-technology/index.vue'),
  },
  {
    name: 'app',
    path: '/app',
    component: () => import('@/pages/app-list/index.vue'),
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
        component: () => import('@/pages/home/index.vue'),
      },
      {
        name: 'technology',
        path: '/technology',
        meta: {
          title: '技术',
          icon: 'Platform',
        },
        component: () => import('@/pages/technology/index.vue'),
      },
      {
        name: 'life',
        path: '/life',
        meta: {
          title: '生活',
          icon: 'Sunny',
        },
        component: () => import('@/pages/life/index.vue'),
      },
      {
        name: 'about',
        path: '/about',
        meta: {
          title: '关于',
          icon: 'User',
        },
        component: () => import('@/pages/about/index.vue'),
      },
      {
        name: 'navigation',
        path: '/navigation',
        meta: {
          title: '导航',
          icon: 'Compass',
        },
        component: () => import('@/pages/navigation/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
