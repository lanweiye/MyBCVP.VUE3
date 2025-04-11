import router from '@/router'
import { defineStore } from 'pinia'
import piniaPersistConfig from '../config/piniaPersist'
import type { TabsState, TabsMenuProps } from '../interface'
import { useKeepAliveStore } from './keepAlive'

const keepAliveStore = useKeepAliveStore()

export const useTabsStore = defineStore('lwyblogvue3-tabs', {
  state: (): TabsState => ({
    tabsMenuList: [],
  }),
  actions: {
    // 添加标签栏
    async addTabs(tabItem: TabsMenuProps) {
        if (this.tabsMenuList.every(item => item.path != tabItem.path)) {
            this.tabsMenuList.push(tabItem)
        }
    },

    // 删除标签栏
    async removeTabs(tabPath: string, isCurrent: boolean = true) {
        const tabsMenuList = this.tabsMenuList;
        // 如果是删除当前路由
        if (isCurrent) {
            tabsMenuList.forEach((item,index) => {
                if (item.path !== tabPath) {
                    return
                }
                // 让页面自动加载前一个或者后一个路由页面
                const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1]
                if (!nextTab) {
                    return
                }
                router.push(nextTab.path)
            })
        }
        // 数据清理
        this.tabsMenuList = tabsMenuList.filter(item => item.path !== tabPath)
    },

    // 关闭在位的标签
    async closeTabsOnSide(path: string, type: "left" | "right") {
        // 关闭左侧、右侧
        const currentIndex = this.tabsMenuList.findIndex(item => item.path === path)
        if (currentIndex !== -1) {
            const range = type === "left" ? [0, currentIndex] : [currentIndex + 1,this.tabsMenuList.length]
            this.tabsMenuList = this.tabsMenuList.filter((item,index) => {
                // 删除left ,返回index > range[1]， 删除right ,返回  ,!item.close有什么用
                return index >= range[1] || index < range[0] || !item.close 
            })            
        }
        keepAliveStore.setKeepAliveName(this.tabsMenuList.map(item => item.name))
    },
    // 关闭多个标签页 closeMultipleTab
    async closeMultipleTab(tabsMenuValue?: string){
        // 关闭其他
        this.tabsMenuList = this.tabsMenuList.filter(item => item.path === tabsMenuValue || !item.close)

        // 跟上面写法有什么区别
        // this.tabsMenuList = this.tabsMenuList.filter(item => {
        //     return item.path === tabsMenuValue || !item.close;
        //   });
        keepAliveStore.setKeepAliveName(this.tabsMenuList.map(item => item.name))
    },

      // Set Tabs
      async setTabs(tabsMenuList: TabsMenuProps[]) {
        this.tabsMenuList = tabsMenuList;
      },
      // Set Tabs Title
      async setTabsTitle(title: string) {
        const nowFullPath = location.hash.substring(1);
        this.tabsMenuList.forEach(item => {
          if (item.path == nowFullPath) item.title = title;
        });
      }
  },
  persist: piniaPersistConfig("lwyblogvue3-tabs")
})
