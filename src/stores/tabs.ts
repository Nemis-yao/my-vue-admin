import { defineStore } from "pinia";
import { ref } from "vue";
import type { MenuItem } from "@/types/user";
export const useTabsStore = defineStore("tabs", () => {
    // 定义页面初始化
    const tabs = ref<MenuItem[]>([])

    // 定义初始化 选中的页签
    const currenTab = ref<{ name: string, url: string }>({
        name: '',
        url: ''
    })

    /**
     * 添加页签
     * @param url 路径
     * @param name 名字
     * @param icon 图标
     */
    function addTabs(url: string, name: string, icon: string) {
        if (!tabs.value.some((tab) => tab.url === url)) {
            tabs.value.push({ url, name, icon })
        }
    }

    /**
     * 页签与导航绑定
     * @param name 名字
     * @param url 路径
     */
    function setCurrenTab(name: string, url: string) {
        currenTab.value = { name, url }
    }

    function removeTabs(TabsName: string) {
        const index = tabs.value.findIndex(item => item.name === TabsName)
        const isCurrenTab = currenTab.value.name === TabsName ? true : false;
        if (index > 0 && isCurrenTab) {
            setCurrenTab(tabs.value[index - 1].name, tabs.value[index - 1].url)
        }
        tabs.value = tabs.value.filter(item => item.name !== TabsName)

    }

    return {
        tabs, addTabs, currenTab, setCurrenTab, removeTabs
    }
})