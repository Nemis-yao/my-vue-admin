import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

import { loginApi } from '@/api/user/user'
import type { LoginParams } from '@/api/user/type'

//定义常量
const TOKEN_KEY = "token";
const ROLES_KEY = "roles";
const USERNAME_KEY = "username";
const MENU_KEY = "menu";

export const userUserStore = defineStore("user", () => {
    const user = reactive({
        token: sessionStorage.getItem(TOKEN_KEY) || null,
        roles: sessionStorage.getItem(ROLES_KEY) ? JSON.parse(sessionStorage.getItem(ROLES_KEY)!) : [],
        username: sessionStorage.getItem(USERNAME_KEY) || null,
        menu: sessionStorage.getItem(MENU_KEY) ? JSON.parse(sessionStorage.getItem(MENU_KEY)!) : [],
    })

    // 登录
    async function login(data: LoginParams) {
        try {
            const { data: { token, menulist, user: { username, roles } } } = await loginApi(data);
            // const res = await loginApi(data)
            // console.log(user)
            user.token = token;
            user.roles = roles;
            user.username = username;
            user.menu = menulist;

            // 存储到会话中，避免刷新丢失数据
            sessionStorage.setItem(TOKEN_KEY, token)
            sessionStorage.setItem(ROLES_KEY, JSON.stringify(roles))
            sessionStorage.setItem(USERNAME_KEY, username)
            sessionStorage.setItem(MENU_KEY, JSON.stringify(menulist))
        } catch (error) {
            console.log("error", error)
        }

    }
    // 退出登录
    function logout() {
        user.menu = []
        user.roles = []
        user.token = null
        user.username = null
        sessionStorage.clear()
    }
    return {
        user, login, logout
    }
})