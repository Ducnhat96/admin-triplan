import Main from '@/components/Main'

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
  ...appRouter
]
