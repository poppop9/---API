import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/components/HomePage.vue'
import mapShow from '@/components/mapShow.vue'
import roadPlan from '@/components/roadPlan.vue'
import SearchLocation from '@/components/SearchLocation.vue'

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
    },
    {
        path: '/search',
        name: 'SearchLocation',
        component: SearchLocation
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
