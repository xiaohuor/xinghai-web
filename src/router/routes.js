import Main from "@/components/main";
export default [
  {
    path: "*",
    component: () => import("@/pages/error-page/404"),
  },
  {
    name: "bookmarks",
    path: "/bookmarks",
    component: () => import("@/pages/bookmarks"),
  },
  {
    name: "nav-technology",
    path: "/nav-technology",
    component: () => import("@/pages/nav-technology"),
  },
  {
    name: "app-list",
    path: "/app-list",
    component: () => import("@/pages/app-list"),
  },
  {
    name: "main",
    path: "/",
    redirect: "home",
    component: () => import("@/components/main"),
    children: [
      {
        name: "home",
        path: "/home",
        meta: {
          title: "首页",
          icon: "md-home",
        },
        component: () => import("@/pages/home"),
      },
      {
        name: "technology",
        path: "/technology",
        meta: {
          title: "技术",
          icon: "logo-codepen",
        },
        component: () => import("@/pages/technology"),
      },
      {
        name: "life",
        path: "/life",
        meta: {
          title: "生活",
          icon: "md-aperture",
        },
        component: () => import("@/pages/life"),
      },
      {
        name: "about",
        path: "/about",
        meta: {
          title: "关于",
          icon: "ios-person",
        },
        component: () => import("@/pages/about"),
      },
      {
        name: "navigation",
        path: "/navigation",
        meta: {
          title: "导航",
          icon: "md-compass",
        },
        component: () => import("@/pages/navigation"),
      },
    ],
  },
];