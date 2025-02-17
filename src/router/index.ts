import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/layout/Layout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/all',
      name: '',
      component: Layout,
      redirect: '/all/home',
      children: [
        {
          path: 'home',
          name: 'home',
          meta: {
            title: '首页',
          },
          component: () => import('../views/pages/Home.vue'),
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
          component: () => import('../views/pages/Docs.vue'),
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
      ]
    },
    
  ],
})

export default router
