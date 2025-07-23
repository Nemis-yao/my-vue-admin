<template>
    <div class="logo">
        <img :src="logo" width="34px" height="34px" />
        <h1>动力港湾</h1>
    </div>
    <el-menu :router="true" :default-active="$route.path">
        <MenuItem v-for="item in Menulist" :key="item.url" :item="item"> </MenuItem>
    </el-menu>
</template>

<script setup lang="ts">
import { userUserStore } from '@/stores/auth';
import MenuItem from '@/components/navMenu/MenuItem.vue';
import logo from "@/assets/logo.png"
const userStore = userUserStore()
// 获取菜单列表
const Menulist = userStore.user.menu;
</script>

<style scoped lang="less">
.logo{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    padding: 10px 0;
    img{
        margin-left: -10px;
    }
    h1{
        color: #333;
        margin-left: 10px;
        font-size: 22px;
    }
}
.el-menu{
    border-right: none;
}
</style>
