<template>
    <el-tabs v-model="currenTab.name" class="demo-tabs" type="card" :closable="true" @tab-click="handleClick"
        @tab-remove="remove">
        <el-tab-pane v-for="item in tabs" :key="item.url" :label="item.name" :name="item.name">
            <template #label>
                <span class="custom-tabs-label">
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>&nbsp;{{ item.name }}</span>
                </span>
            </template>
        </el-tab-pane>
    </el-tabs>
    <RouterView></RouterView>
</template>

<script lang="ts" setup>
import type { TabsPaneContext } from 'element-plus'
import { useTabsStore } from '@/stores/tabs'
import { userUserStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { onBeforeMount } from 'vue'
const tabsStore = useTabsStore()
const userStore = userUserStore()
const router = useRouter()
const route = useRoute()
const { tabs, currenTab } = storeToRefs(tabsStore)
const { user } = storeToRefs(userStore)

/**
 * 与当前路径匹配的页签
 * @param arr 需要查询的数组
 * @param url 路径
 */
function findTabsByUrl(arr: any[], url: string) {
    for (let item of arr) {
        if (item.url === url) {
            return item
        }
        if (item.children) {
            const found: any[] = findTabsByUrl(item.children, url)
            if (found) {
                return found
            }
        }
    }
    return null
}
onBeforeMount(() => {
    const { name, url, icon } = findTabsByUrl(user.value.menu, route.path)
    tabsStore.addTabs(url, name, icon) // 添加页签
    tabsStore.setCurrenTab(name, url) // 高亮页签 
})

//跳转
const handleClick = (tab: TabsPaneContext, event: Event) => {
    const index = tab.index as unknown as number;
    const name = tabs.value[index].name
    const url = tabs.value[index].url
    router.push(url)
    tabsStore.setCurrenTab(name, url) // 设置页签高亮
}
//删除
const remove = (TabPaneName: string) => {
    tabsStore.removeTabs(TabPaneName)
    // 当标签全部删除之后，跳转到数据看板
    if (tabs.value.length == 0) {
        tabs.value = [
            {
                name: "数据看板",
                url: "/dashboard",
                icon: "DataLine"
            }
        ]
        router.push("/dashboard")
        tabsStore.setCurrenTab(tabs.value[0].name,tabs.value[0].url)
    } else {
        router.push(currenTab.value.url)
    }
}
</script>

<style scoped lang="less">
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.demo-tabs .custom-tabs-label .el-icon {
    vertical-align: middle;
}

.demo-tabs .custom-tabs-label span {
    vertical-align: middle;
    margin-left: 4px;
}
</style>