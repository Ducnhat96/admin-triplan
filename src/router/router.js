import Main from '@/components/Main'

import accountRoutes from '@/components/account/routes'

export const page403 = {
  path: '/403',
  meta: {
    title: '403-Bạn không được phép'
  },
  name: 'error-403',
  component: () => import('@/components/error-page/403')
}

export const page404 = {
  path: '/*',
  meta: {
    title: '404-Trang không tồn tại'
  },
  name: 'error-404',
  component: () => import('@/components/error-page/404')
}

export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/contact',
  component: Main,
  children: [
    { path: 'home', title: 'Trang chủ', name: 'home_index', component: () => import('@/components/Home.vue') },
    { path: 'contact', title: 'Contact', name: 'contact', component: () => import('@/components/Contact.vue') }
  ]
}

export const page500 = {
  path: '/500',
  meta: {
    title: '500-Lỗi máy chủ'
  },
  name: 'error-500',
  component: () => import('@/components/error-page/500.vue')
}

export const appRouter = [
  {
    path: '/merchant',
    icon: 'favorite',
    title: 'Danh sách nhà xe',
    name: 'merchant',
    submenu: false,
    component: Main,
    children: [
      { path: 'index', icon: 'favorite', title: {i18n: 'merchant_index_title'}, name: 'merchant_index', component: () => import('@/components/merchant/Index.vue') },
      { path: 'new', icon: 'favorite', title: 'New nhà xe', name: 'merchant_new', component: () => import('@/components/merchant/New.vue') }
    ]
  }
]

export const routers = [
  otherRouter,
  ...accountRoutes,
  ...appRouter,
  page403,
  page500,
  page404
]
