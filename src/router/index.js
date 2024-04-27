import { createRouter, createWebHistory } from 'vue-router'

import mapShow from '@/components/mapShow.vue'
import roadPlan from '@/components/roadPlan.vue'

const routes = [
    {
        path: '/',
        redirect: '/dtzs'
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
