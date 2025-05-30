import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('@/views/IndexView/LayoutView.vue')
        },
        {
            path: '/learn',
            name: 'learn',
            component: () => import('@/views/LearnView/LayoutView.vue')
        },
        {
            path: '/data',
            name: 'data',
            component: () => import('@/views/DataView/LayoutView.vue')
        },
        {
            path: '/chat',
            name: 'chat',
            component: () => import('@/views/ChatView/LayoutView.vue')
        },
        {
            path: '/pen',
            name: 'pen',
            component: () => import('@/views/PenView/LayoutView.vue')
        },
        {
            path: '/workflow',
            name: 'workflow',
            component: () => import('@/views/WorkflowView/LayoutView.vue')
        },
        {
            path: '/ass',
            name: 'ass',
            component: () => import('@/views/AssView/LayoutView.vue')
        },
        {
            path: '/app',
            name: 'app',
            component: () => import('@/views/AppView/LayoutView.vue')
        },
        {
            path: '/draw',
            name: 'draw',
            component: () => import('@/views/DrawView/LayoutView.vue')
        },
        {
            path: '/gallery',
            name: 'gallery',
            component: () => import('@/views/GalleryView/LayoutView.vue')
        },
        {
            path: '/ppt',
            name: 'ppt',
            component: () => import('@/views/PPTView/LayoutView.vue')
        },
        {
            path: '/music',
            name: 'music',
            component: () => import('@/views/MusicView/LayoutView.vue')
        },
        {
            path: '/file',
            name: 'file',
            component: () => import('@/views/FileView/LayoutView.vue')
        },
        {
            path: '/mind',
            name: 'mind',
            component: () => import('@/views/MindView/LayoutView.vue')
        },
        {
            path: '/plan',
            name: 'plan',
            component: () => import('@/views/PlanView/LayoutView.vue')
        },
        {
            path: '/translate',
            name: 'translate',
            component: () => import('@/views/TranslateView/LayoutView.vue')
        },
        {
            path: '/topic',
            name: 'topic',
            component: () => import('@/views/TopicView/LayoutView.vue')
        },
        {
            path: '/study',
            name: 'study',
            component: () => import('@/views/StudyView/LayoutView.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('@/views/AboutView/LayoutView.vue')
        },
        {
            path: '/key',
            name: 'key',
            component: () => import('@/views/KeyView/LayoutView.vue')
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
        {
            path: '/:catchAll(.*)', // 捕捉所有不匹配的路由
            name: 'NotFound',
            component: () => import('@/components/NotFoundView/NotFoundView.vue')
        }
    ]
})
export default router
