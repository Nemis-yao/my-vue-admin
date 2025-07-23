<template>
    <!-- 左边 -->
    <el-row>
        <el-col :span="18">
            <!-- 第一块 -->
            <el-card v-loading="loading" element-loading-text="Loading...">
                <div class="title">
                    <h3>今日设备运行状态</h3>
                    <p class="ml">更新时间：{{ formatted }}</p>
                    <el-icon color="#86909c" style="margin-left: 5px;" @click="refresh">
                        <Refresh />
                    </el-icon>
                </div>
                <div class="equipment">
                    <div class="item" v-for="(item, index) in leftFirst">
                        <h4 class="mt mb">{{ item.title }}</h4>
                        <img :src="item.img" class="mt mb">
                        <h1 class="mb">{{ item.value }} / {{ item.total }}</h1>
                        <div class="statistic-card">
                            <el-statistic :value="item.abnormalValue">
                                <template #title>
                                    <div style="display: inline-flex; align-items: center">
                                        异常设备
                                        <el-tooltip effect="dark" :content="`异常设备${item.abnormalValue},请尽快处理`"
                                            placement="top">
                                            <el-icon style="margin-left: 4px" :size="12">
                                                <Warning />
                                            </el-icon>
                                        </el-tooltip>
                                    </div>
                                </template>
                            </el-statistic>
                            <div class="statistic-footer">
                                <div class="footer-item">
                                    <span>相比昨日</span>
                                    <span class="green">
                                        {{ item.number }}
                                        <el-icon>
                                            <CaretTop color="green" />
                                        </el-icon>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-card>
            <el-card class="mt">
                <template #header>
                    <div class="card-header">
                        <span>常用功能</span>
                    </div>
                </template>
                <div class="quick mt mb">
                    <el-row>
                        <el-col :span="4" v-for="(item, index) in leftSecond" :key="index"
                            @click="quickNavigate(item.tite)">
                            <img :src="item.img">
                            <p>{{ item.tite }}</p>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </el-col>
        <!-- 右边 -->
        <el-col :span="6">
        </el-col>
    </el-row>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import flash from '@/assets/flash.png'
import flash2 from '@/assets/flash2.png'
import flash3 from '@/assets/flash3.png'
import repair from '@/assets/repair.png'
import progress from '@/assets/progress.png'
import remain from '@/assets/remain.png'
import total from '@/assets/total.png'
import money from '@/assets/money.png'
import daily from '@/assets/daily.png'

import { useTabsStore } from '@/stores/tabs'
import { userUserStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import type { MenuItem } from '@/types/user'
import { useRouter } from 'vue-router'

// 模拟左一数据
const leftFirst = [
    {
        title: '充电桩使用率',
        value: 72,
        total: 95,
        img: flash,
        abnormalValue: 9,
        number: '24%'
    },
    {
        title: '充电柜使用率',
        value: 655,
        total: 1233,
        img: flash2,
        abnormalValue: 22,
        number: '24%'
    }, {
        title: '充电站使用率',
        value: 2263,
        total: 3398,
        img: flash3,
        abnormalValue: 9,
        number: '24%'
    }
]

// 模拟左二数据
const leftSecond = [
    {
        tite: "系统设置",
        img: repair
    },
    {
        tite: "充电站监控",
        img: progress
    }
    ,
    {
        tite: "订单管理",
        img: remain
    }
    ,
    {
        tite: "营收统计",
        img: total
    }
    ,
    {
        tite: "招商管理",
        img: money
    }
    ,
    {
        tite: "会员卡管理",
        img: daily
    }
]

// ========================== 左一功能 ==========================
// 获取当前时间
const now = new Date()
const formatted = `${now.getFullYear()}年${String(now.getMonth() + 1).padStart(2, '0')}月${String(now.getDate()).padStart(2, '0')}日`

// 刷新
const loading = ref(false)
async function refresh() {
    loading.value = true
    await sleep(2000)
    loading.value = false
}

// 模拟等待
function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// ========================== 左二功能 ==========================
const tabsStore = useTabsStore()
const userStore = userUserStore()
const router = useRouter()
// 快捷跳转
function quickNavigate(name: string) {
    const { user } = storeToRefs(userStore)
    const item = findMenuItemByName(user.value.menu, name)
    router.push(item?.url as string)
    tabsStore.addTabs(item?.url as string,item?.name as string,item?.icon as string)
    tabsStore.setCurrenTab(item?.name as string, item?.url as string)

}

/**
 * 
 * @param arr 当前对象的路由
 * @param name 需要查找的路由名字
 */
function findMenuItemByName(arr: MenuItem[], name: string): MenuItem | null {
    for (const item of arr) {
        if (item.name === name) {
            return item
        }
        if (item.children) {
            const found = findMenuItemByName(item.children, name)
            if (found) {
                return found
            }
        }
    }
    return null
}



</script>
<style scoped lang="less">
.title {
    display: flex;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    align-items: flex-end;
    margin-bottom: 20px;

    p {
        color: #86909C;
    }
}

.equipment {
    display: flex;
    justify-content: space-between;
    padding: 0 50px;

    .item {
        h1 {
            font-size: 36px;
        }
    }
}

.quick {
    text-align: center;
}
</style>