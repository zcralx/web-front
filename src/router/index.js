import {createRouter, createWebHistory} from "vue-router";
import loginView from '../views/LoginMainView.vue'
const routes = [
    {
        path: '/',
        name: 'login',
        component: loginView
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/RegisterUserView.vue')
    },
    {
        path: '/set',
        name: 'setPassword',
        component: () => import('../views/SetNewPassword.vue')
    },
    {
        path: '/menu',
        name: 'MenuView',
        component: () => import('../views/MenuManageView.vue')
    },
    {
        path: '/userlist',
        name: 'UserManage',
        component: () => import('../views/UserManageView.vue')
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
