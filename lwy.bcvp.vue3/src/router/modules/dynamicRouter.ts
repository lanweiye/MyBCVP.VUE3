//动态路由初始化

import router from "@/router/index";
import type { RouteRecordRaw } from "vue-router";
import { ElNotification } from "element-plus";
import { useAuthStore } from "@/stores/auth";
import { useAuthMenuStore } from "@/stores/modules/authMenu";

// 引入views 文件夹下所有 vue 文件  ?
const modules = import.meta.glob("@/views/**/*.vue")

export const initDynamicRouter = async (params: Menu.MenuRequest) => {
    const userStore = useAuthStore()
    const authStore = useAuthMenuStore()

    try {
        // 1.获取菜单列表 && 按钮权限列表
        await authStore.getAuthMenuList(params)
        // await authStore.getAuthMenuList(params)

        // 2.判断当前用户有没有菜单权限
        if (!authStore.authMenuListGet.length) {
            ElNotification({
                title: "无权限访问",
                message: "当前账号无任何菜单权限，请联系系统管理员！",
                type: "warning",
                duration: 3000
            })
            userStore.setToken("");
            router.replace("/login")
            return Promise.reject("No permission")
        }

        console.log("authStore.flatMenuListGet",authStore.flatMenuListGet);

        // 3.添加动态路由
        authStore.flatMenuListGet.forEach(item => {
            item.children && delete item.children;
            if (!item.IsButton && item.path && typeof item.path == "string" && item.path != ' ' && item.path != '-') {
                item.component = modules["src/views" + item.path + ".vue"];
                router.addRoute("layout",item as unknown as RouteRecordRaw)
            }
        })
        
    } catch (error) {
        // 当按钮 || 菜单请求出错时，重定向到登录页
        userStore.setToken("")
        router.replace("/login")
        return Promise.reject(error)
    }
}