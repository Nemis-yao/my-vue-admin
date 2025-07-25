<template>
    <el-card>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
                <el-input v-model.trim="formInline.input" style="width: 600px" placeholder="请输入站点名称或ID">
                    <template #append>
                        <el-select v-model="select" style="width: 115px">
                            <el-option label="按名称查询" value="name" />
                            <el-option label="按ID查询" value="id" />
                        </el-select>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="formInline.value" clearable placeholder="充电站状态" style="width: 240px">
                    <el-option v-for="item in CSoptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button @click="handleReset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card class="mt">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-statistic title="累计充电量（度）" :value="268500" />
            </el-col>
            <el-col :span="6">
                <el-statistic title="累计充电次数（次）" :value="1389" />
            </el-col>
            <el-col :span="6">
                <el-statistic title="服务区域（个）" :value="58" />
            </el-col>
            <el-col :span="6">
                <el-statistic title="累计效益（元）" :value="5437328" />
            </el-col>
        </el-row>
    </el-card>
    <el-card class="mt">
        <el-button type="primary" icon="Plus">新增充电站</el-button>
    </el-card>
    <el-card class="mt">
        <el-table :data="tableData" v-loading="loading">
            <el-table-column type="index" label="序列" width="80" />
            <el-table-column prop="id" label="站点名称" />
            <el-table-column prop="name" label="站点id" />
            <el-table-column prop="city" label="所属城市" />
            <el-table-column prop="fast" label="快充数" />
            <el-table-column prop="slow" label="慢充数" />
            <el-table-column prop="status" label="状态">
                <template #default="scoped">
                    <DictTag :value="scoped.row.status"></DictTag>
                </template>
            </el-table-column>
            <el-table-column prop="now" label="正常充电" />
            <el-table-column prop="fault" label="故障数" />
            <el-table-column prop="person" label="站点负责人" />
            <el-table-column prop="tel" label="负责人电话" />
            <el-table-column label="操作">
                <template #default>
                    <el-button link type="primary">编辑</el-button>
                    <el-button link type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="mt mb" style="display: flex;justify-content: flex-end" v-model:current-page="queryParams.page" v-model:page-size="queryParams.pageSize" background
            :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { ListApi } from '@/api/chargingstation/chargingstation';
import DictTag from '@/components/dict/DictTag.vue';
import type { ListType } from '@/api/chargingstation/type'
const select = ref("name")
const loading = ref(false)
// 定义查询
const formInline = reactive({
    input: '',
    value: 1
})

// 初始查询 
const queryParams = reactive<ListType>({
    page: 1,
    pageSize: 10,
}
)

const onSubmit = () => {
   getTableDataList()
}

// 分页功能

const total =ref<number>(0)
const handleSizeChange = (size:number) => {
    queryParams.pageSize = size
    getTableDataList()
}

const handleCurrentChange = (page:number) => { 
    queryParams.page = page
    getTableDataList()
}

// 定义充电站状态
const CSoptions = [
    {
        label: '全部',
        value: 1
    },
    {
        label: '使用中',
        value: 2
    },

    {
        label: '空闲中',
        value: 3
    },
    {
        label: '维护中',
        value: 4
    },
    {
        label: '维修中',
        value: 5
    },
]

const tableData = ref([])
const getTableDataList = async () => {
    loading.value=true
    const res = await ListApi({...queryParams,status:formInline.value,[select.value]:formInline.input})
    tableData.value = res.data.list
    total.value = res.data.total
    loading.value=false
}

const handleReset = () => {
    formInline.input = ''
    formInline.value = 1
    queryParams.page = 1
    queryParams.status = 1
    queryParams.pageSize = 10
    getTableDataList()
}

onMounted(() => {
    getTableDataList()
})
</script>
<style scoped lang="less">
.demo-form-inline .el-input {
    --el-input-width: 220px;
}

.demo-form-inline .el-select {
    --el-select-width: 220px;
}
</style>