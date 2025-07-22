import type { RouteRecordRaw } from "vue-router"
const router:RouteRecordRaw []=[
    {
        path:'/',
        name:'home',
        component:() => import('@/layouts/DefaultLayout.vue')
    },
    {
        path:'/login',
        name:'login',
        component:() => import('@/views/Login.vue')
    },
    {
        path:'/:pathMatch(.*)*',
        name:'NotFound',
        component:() => import('@/views/NotFound.vue')
    }
]
export default router