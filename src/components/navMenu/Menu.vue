<template>
    <el-menu>
        <MenuItem v-for="item in Menulist" :key="item.url" :item="item"> </MenuItem>
    </el-menu>
</template>

<script setup lang="ts">
import { userUserStore } from '@/stores/auth';
import MenuItem from '@/components/navMenu/MenuItem.vue';
const userStore = userUserStore()
// 获取菜单列表
const Menulist = userStore.user.menu;
</script>
