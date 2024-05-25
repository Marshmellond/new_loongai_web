import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'txt',
            component: () => import('../views/TxtView/LayoutView.vue')
        },
        {
            path: '/app',
            name: 'app',
            component: () => import('../views/AppView/LayoutView.vue')
        },
        {
            path: '/img',
            name: 'img',
            component: () => import('../views/ImgView/LayoutView.vue')
        },
        {
            path: '/gallery',
            name: 'gallery',
            component: () => import('../views/GalleryView/LayoutView.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView/LayoutView.vue')
        },
        {
            path: '/key',
            name: 'key',
            component: () => import('../views/KeyView/LayoutView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/components/LoginView/LoginView.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/components/LoginView/RegisterView.vue')
        },

    ]
})

export default router
