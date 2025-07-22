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
    <el-menu-item v-else :index="item.url">
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
const props = defineProps({
    item: {
        type: Object as PropType<MenuItem>,
        required: true
    }
})

</script>

<style scoped lang="less"></style>