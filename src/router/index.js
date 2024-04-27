import { createRouter, createWebHistory } from 'vue-router'

import mapShow from '@/components/mapShow.vue'
import roadPlan from '@/components/roadPlan.vue'
import HomePage from '@/components/HomePage.vue'

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/dtzs',
        name: 'mapShow',
        component: mapShow
    },
    {
        path: '/lxgh',
        name: 'roadPlan',
        component: roadPlan
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
