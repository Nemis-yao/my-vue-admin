<template>
    <el-sub-menu v-if="item.children" :index="item.url">
        <template #title>
            <el-icon>
                <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
        </template>
        <MenuItem v-for="C in item.children" :key="C.url" :item="C"></MenuItem>
    </el-sub-menu>
    <el-menu-item v-else :index="item.url" @click="add(item.url,item.icon,item.name)"  v-show="!(item.name == '订单详情')">
        <el-icon>
            <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.name }}</span>
    </el-menu-item>
</template>

<script setup lang="ts" name="MenuItem">
import { defineProps } from "vue"
import type { PropType } from 'vue'
import type { MenuItem } from '@/types/user'
import { useTabsStore } from "@/stores/tabs"
const props = defineProps({
    item: {
        type: Object as PropType<MenuItem>,
        required: true
    }
})

const tabsStore = useTabsStore()
function add(url: string, icon: string, name: string) {
    tabsStore.addTabs(url, name, icon) // 添加页签
    tabsStore.setCurrenTab(name,url) // 设置页签高亮
}

</script>

<style scoped lang="less">
.is-active{
    background-color: rgb(32, 136, 255);
    color: #fff !important;
    div{
        span{
            color: #fff;
        }
    }

}
.el-menu-item:hover{
    background-color: rgb(34,136,255) !important;
    color: #fff !important;
}
:deep(.el-sub-menu__title:hover){
    background-color: rgb(34,136,255) !important;
    color: #fff !important;
}
</style>
