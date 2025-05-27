import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Layout from '../views/layout/Layout.vue'

const isDev = import.meta.env.DEV
const history = isDev ? createWebHistory() : createWebHashHistory()
const baseURL = isDev ? '/all' : '/'
const router = createRouter({
  history: history,
  routes: [
    {
      path: baseURL,
      name: '',
      component: Layout,
      redirect: {
        name: 'home',
      },
      children: [
        {
          path: 'home',
          name: 'home',
          meta: {
            title: '首页',
          },
          component: () => import('../views/pages/Home/Home.vue'),
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/AboutView.vue'),
        },
        {
          path: 'components',
          name: 'components',
          meta: {
            title: '组件库',
          },
          component: () => import('../views/pages/Components.vue'),
        },
        {
          path: 'projects',
          name: 'projects',
          meta: {
            title: '项目',
          },
          component: () => import('../views/pages/Projects/Projects.vue'),
        },
        {
          path: 'docs',
          name: 'docs',
          meta: {
            title: '项目',
          },
          component: () => import('../views/pages/Docs/Docs.vue'),
        },
        {
          path: 'utils',
          name: 'utils',
          meta: {
            title: '项目',
          },
          component: () => import('../views/pages/Utils.vue'),
        },
        {
          path: 'change-log',
          name: 'changLog',
          meta: {
            title: '变更日志',
          },
          component: () => import('../views/pages/ChangeLog.vue'),
        },
        {
          path: 'manage',
          name: 'manage',
          meta: {
            title: '管理',
          },
          component: () => import('../views/pages/manage/Manage.vue'),
        },
        {
          path: 'games',
          name: 'games',
          meta: {
            title: '游戏',
          },
          component: () => import('../views/pages/games/game.vue'),
        },
        {
          path: 'self',
          name: 'self',
          meta: {
            title: '我',
          },
          component: () => import('../views/pages/Self/self.vue'),
        },
        {
          path: 'kaogong',
          name: 'kaogong',
          component: () => import('../views/pages/KaoGong.vue'),
        },
        {
          path: 'img',
          name: 'img',
          meta: {
            title: '图片管理',
          },
          component: () => import('../views/pages/img/img.vue'),
        },
      ]
    },
    {
      path: '/all/time',
      name: 'time',
      component: () => import('@/views/pages/time/time.vue')
    }
  ],
})
router.beforeEach((to, from, next) => {
  console.log('Navigating to:', to.path); // 打印路由路径
  next();
});
export default router
