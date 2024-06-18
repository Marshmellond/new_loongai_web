import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'chat',
            component: () => import('@/views/ChatView/LayoutView.vue')
        },
        {
            path: '/app',
            name: 'app',
            component: () => import('../views/AppView/LayoutView.vue')
        },
        {
            path: '/draw',
            name: 'draw',
            component: () => import('@/views/DrawView/LayoutView.vue')
        },
        {
            path: '/gallery',
            name: 'gallery',
            component: () => import('../views/GalleryView/LayoutView.vue')
        },
        {
            path: '/ppt',
            name: 'ppt',
            component: () => import('@/views/PPTView/LayoutView.vue')
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
