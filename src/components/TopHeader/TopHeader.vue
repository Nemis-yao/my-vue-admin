<template>
    <div class="header">
        <div class="personal">
            <el-badge :is-dot="msg > 0" class="item"><el-icon>
                    <Message />
                </el-icon></el-badge>
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" class="mr ml" />
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    欢迎您：{{ user.username}}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { userUserStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
const msg = ref(5)

const router = useRouter()
const userStore = userUserStore()
const { user } = storeToRefs(userStore) 

/**
 * 
 * @param command 下拉按钮匹配的参数
 */
function handleCommand(command: string) {
    if (command == 'personal') {
        router.push('/personal')
    } else {
        userStore.logout()
        router.push('/login')
    }
}
</script>

<style scoped lang="less">
.header {
    background-color: white;
    min-height: 70px;
    padding: 0 20px;
    .personal{
        float: right;
        display: flex;
        height: 60px;
        align-items: center;
        .item{
            margin-top: 10px;
        }
    }
}

// 取消黑框使用
 .el-dropdown-link:focus {
      outline: none;
    }

</style>