import router from "./index";
import { userUserStore } from "@/stores/auth";
router.beforeEach((to) => {
    const userStore = userUserStore()
    const isLogin = userStore.user.token;
    console.log("路由", isLogin)
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
    }
})