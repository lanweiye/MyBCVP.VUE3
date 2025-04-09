import { defineStore } from "pinia";
import type { AuthState } from "@/stores/interface"
import { getAuthMenuListApi } from "@/api/loginApi";
import { getFlatMenuList, getShowMenuList, getAllBreadcrumbList } from "@/utils";
import { breadcrumbItemProps } from "element-plus";

export const useAuthMenuStore = defineStore("blogvue3-auth",{
    state: (): AuthState => ({
        // 按钮权限列表
        authButtonList: {},
        // 菜单权限列表
        authMenuList: [],
        // 当前页面的router name, 用来做按钮权限筛选
        routeName: ""
    }),
    getters: {
        // 按钮权限列表
        authButtonListGet: state => state.authButtonList,
        // 菜单权限列表 ==> 这里的菜单没有经过任何处理
        authMenuListGet: state => state.authMenuList,
        // 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide == true
        showMenuListGet: state => getShowMenuList(state.authMenuList),
        // 菜单权限列表 ==> 扁平化之后的一维数组菜单， 主要用来添加动态路由
        flatMenuListGet: state => getFlatMenuList(state.authMenuList),
        // 递归处理后的所有面包屑导航列表
        breadcrumbListGet: state => getAllBreadcrumbList(state.authMenuList)
    },
    actions: {
        async getAuthMenuList(params: Menu.MenuRequest) {
            // 使用解构赋值{} 获取响应中的 response 属性, 
            const { response,msg,msgDev } = await getAuthMenuListApi(params)
            this.authMenuList = response.children ?? []
        },
        async setRouteName(name: string) {
            this.routeName = name
        }
    }
})