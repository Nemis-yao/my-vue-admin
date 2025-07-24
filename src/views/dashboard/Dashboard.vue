<template>
  <!-- 左边 -->
  <el-row :gutter="20">
    <el-col :span="18">
      <!-- 第一块 -->
      <el-card v-loading="loading" element-loading-text="Loading...">
        <div class="title">
          <h3>今日设备运行状态</h3>
          <p class="ml">更新时间：{{ formatted }}</p>
          <el-icon color="#86909c" style="margin-left: 5px" @click="refresh">
            <Refresh />
          </el-icon>
        </div>
        <div class="equipment">
          <div v-for="item in leftFirst" :key="item.title" class="item">
            <h4 class="mt mb">{{ item.title }}</h4>
            <img :src="item.img" class="mt mb" />
            <h1 class="mb">{{ item.value }} / {{ item.total }}</h1>
            <div class="statistic-card">
              <el-statistic :value="item.abnormalValue">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    异常设备
                    <el-tooltip :content="`异常设备${item.abnormalValue},请尽快处理`" effect="dark" placement="top">
                      <el-icon :size="12" style="margin-left: 4px">
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
      <!-- 第二块-->
      <el-card class="mt">
        <template #header>
          <div class="card-header">
            <span>常用功能</span>
          </div>
        </template>
        <div class="quick mt mb">
          <el-row>
            <el-col v-for="(item, index) in leftSecond" :key="index" :span="4" @click="quickNavigate(item.tite)">
              <img :src="item.img" />
              <p>{{ item.tite }}</p>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <!--第三块-->
      <el-card class="mt">
        <template #header>
          <div class="card-header">
            <span>能源统计</span>
          </div>
        </template>
        <el-row>
          <el-col :span="6">
            <div ref="chart1" class="chart"></div>
          </el-col>
          <el-col :span="18">
            <div ref="chart2" class="chart"></div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <!-- 右边 -->
    <el-col :span="6">
      <!-- 第一块 -->
      <el-card>
        <template #header>
          <div class="card-header">
            <span>设备总览</span>
          </div>
        </template>
        <div ref="chart3" class="chart" style="height: 240px;"></div>
      </el-card>
      <!-- 第二块 -->
      <el-card class="mt">
        <template #header>
          <div class="card-header">
            <span>营收统计</span>
          </div>
        </template>
        <ul class="ranking-list">
          <li class="ranking-item" v-for="item in revenue" :key="item.id">
            <span class="rank" :style="{
              backgroundColor:
              item.id === 1 ? 'rgb(103, 194, 58)' :
              item.id === 2 ? 'rgb(255, 193, 7)' :
              item.id === 3 ? 'rgb(33, 150, 243)' : '',
              color: '#fff'
            }" v-if="item.id <= 3">
              {{ item.id }}
            </span>
            <span class="rank" v-else>{{ item.id }}</span>
            <span class="store-name">{{ item.location }}</span>
            <span class="sales">{{ formatNumber(item.total) }}</span>
            <span style="width: 15%;margin-left: 50px; text-align: right;">{{ item.percentage }}
              <el-icon color="green" v-if="item.isUp === 0">
                <CaretTop></CaretTop>
              </el-icon>
              <el-icon color="red" v-else>
                <CaretBottom></CaretBottom>
              </el-icon>
            </span>


          </li>
        </ul>
      </el-card>
      <!-- 第三块 -->
       <el-card class="mt">
        <template #header>
          <div class="card-header">
            <span>故障警报</span>
          </div>
        </template>
         <el-timeline style="max-width: 600px">
    <el-timeline-item timestamp="2033/1/1" placement="top">
      <el-card>
        <h4>新纪元星际工厂</h4>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2033/1/13" placement="top">
      <el-card>
        <h4>纳米工程实验室</h4>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2033/1/17" placement="top">
      <el-card>
        <h4>超导能量站</h4>
      </el-card>
    </el-timeline-item>
  </el-timeline>
       </el-card>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
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
import { useChart } from '@/hook/useChart.ts'
import { chartDataApi, chartDataApi2, chartDataApi3 } from '@/api/dashboard/dashboard'
import { CaretBottom } from '@element-plus/icons-vue'
// 模拟左一数据
const leftFirst = [
  {
    title: '充电桩使用率',
    value: 72,
    total: 95,
    img: flash,
    abnormalValue: 9,
    number: '24%',
  },
  {
    title: '充电柜使用率',
    value: 655,
    total: 1233,
    img: flash2,
    abnormalValue: 22,
    number: '24%',
  },
  {
    title: '充电站使用率',
    value: 2263,
    total: 3398,
    img: flash3,
    abnormalValue: 9,
    number: '24%',
  },
]

// 模拟左二数据
const leftSecond = [
  {
    tite: '系统设置',
    img: repair,
  },
  {
    tite: '充电站监控',
    img: progress,
  },
  {
    tite: '订单管理',
    img: remain,
  },
  {
    tite: '营收统计',
    img: total,
  },
  {
    tite: '招商管理',
    img: money,
  },
  {
    tite: '会员卡管理',
    img: daily,
  },
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
  return new Promise((resolve) => setTimeout(resolve, ms))
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
  tabsStore.addTabs(item?.url as string, item?.name as string, item?.icon as string)
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

// ========================== 左三功能 --- 折线图 ==========================
// 对图标实例进行初始化
const chart2 = ref(null)
const setChartData = async () => {
  // 定义基础模板
  const chart1Options = reactive({
    title: {
      text: '电量统计'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: []
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']
    },
    yAxis: {
      type: 'value',
      min: 0, // 最小值
      max: 200, // 最大值
      interval: 20, // 固定间隔
      axisLabel: {
        formatter: '{value} KW'
      }
    },
    series: [
      {
        name: '',
        type: 'line',
        smooth: true,
        data: [],
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },

      },
      {
        name: '',
        type: 'line',
        smooth: true,
        data: [],
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
      },
      {
        name: '',
        type: 'line',
        smooth: true,
        data: [],
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
      },
    ]
  });

  // 请求接口
  const res = await chartDataApi()
  chart1Options.legend.data = res.data.list.map((item: any) => item.name)
  for (let i = 0; i < res.data.list.length; i++) {
    chart1Options.series[i].name = res.data.list[i].name
    chart1Options.series[i].data = res.data.list[i].data
  }

  return chart1Options  // 处理好后的数据
}
useChart(chart2, setChartData)

// ========================== 左三功能 --- 饼图 ==========================
const chart1 = ref(null)

const setChartData1 = async () => {
  const chart1Options = reactive({
    legend: {
      top: 'bottom'
    },
    tooltip: {
      trigger: "item",
      formatter: '{a}<br/>{b}:{c}'
    },
    series: [
      {
        name: '营收占比',
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['50%', '50%'],
        roseType: 'area',
        data: []
      }
    ],
    graphic: {
      type: "text",
      left: "center",
      top: "center",
      style: {
        text: '营收占比',
        fontSize: 20,
        color: '#333'
      }
    }
  })

  const res = await chartDataApi2()
  chart1Options.series[0].data = res.data.list
  return chart1Options
}

useChart(chart1, setChartData1)

// ========================== 右一 --- 雷达图 ==========================
const chart3 = ref(null)
const setChartData3 = async () => {
  const chart1Options = reactive({
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '闲置数', max: 65 },
        { name: '使用数', max: 160 },
        { name: '故障数', max: 300 },
        { name: '维修数', max: 380 },
        { name: '更换数', max: 520 },
        { name: '报废数', max: 250 }
      ]
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [],
            name: 'Allocated Budget'
          }
        ]
      }
    ]
  })

  const res = await chartDataApi3()
  chart1Options.series[0].data[0].value = res.data.list
  return chart1Options
}

useChart(chart3, setChartData3)

// ========================== 右二 ==========================
// 营收收入
const revenue = [
  { "id": 1, "location": "北京", "total": 100000, "percentage": "25%", "isUp": 0 },
  { "id": 2, "location": "上海", "total": 150000, "percentage": "37.5%", "isUp": 1 },
  { "id": 3, "location": "广州", "total": 80000, "percentage": "20%", "isUp": 0 },
  { "id": 4, "location": "深圳", "total": 90000, "percentage": "22.5%", "isUp": 1 },
  { "id": 5, "location": "杭州", "total": 110000, "percentage": "27.5%", "isUp": 1 },
  { "id": 6, "location": "成都", "total": 75000, "percentage": "18.8%", "isUp": 0 },
  { "id": 7, "location": "重庆", "total": 60000, "percentage": "15%", "isUp": 0 },
  { "id": 8, "location": "南京", "total": 85000, "percentage": "21.3%", "isUp": 1 },
  { "id": 9, "location": "武汉", "total": 70000, "percentage": "17.5%", "isUp": 0 },
  { "id": 10, "location": "苏州", "total": 95000, "percentage": "23.8%", "isUp": 1 }
];

//用正则实现千分位逗号分隔
function formatNumber(num:number) {
  const str = String(num);
  if (str.length <= 3) {
    return str;
  }
  // 用正则实现千分位逗号分隔
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



</script>
<style lang="less" scoped>
.title {
  display: flex;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  align-items: flex-end;
  margin-bottom: 20px;

  p {
    color: #86909c;
  }
}
.el-header{
  height: 70px !important;
  --el-header-height: 70px;
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

.chart {
  width: 100%;
  height: 600px;
}

.ranking-list {
  .ranking-item {
    display: flex;
    justify-content: space-between;
    padding: 10px;

    .rank {
      display: inline-block;
      font-weight: bold;
      color: #666;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      text-align: center;
      line-height: 30px;
    }

    .store-name {
      flex-grow: 1;
      padding: 0 10px;
    }

    .sales {
      color: #666;
    }
  }

  .ranking-item:nth-child(even) {
    background-color: rgb(253, 246, 236);
  }
}
</style>
