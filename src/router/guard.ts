import router from "./index";
import { userUserStore } from "@/stores/auth";

router.beforeEach((to) => {
    const userStore = userUserStore()
    const isLogin = userStore.user.token;
    if (!isLogin) {
        // 未登录
        if (to.path !== "/login") {
            return { path: "/login" }
        }
    } else {
        // 登录 - 避免本地存储问题
        if (to.path == "/login") {
            return { path: "/" }
        }


        const needAuthRoles = to.meta?.needAuth as string[] | undefined; // 获取路由需要的权限
        const userRoles = userStore.user.roles; // 获取当前账号的权限
        const requiresAuth = Array.isArray(needAuthRoles) && needAuthRoles.length > 0; // 判断是否需要权限
        const hasPermission = userRoles.some((role: string) => needAuthRoles?.includes(role)); // 是否有权限访问
        if (requiresAuth && !hasPermission) {
            // 无权限
            return { path: "/" }
        }
    }
})