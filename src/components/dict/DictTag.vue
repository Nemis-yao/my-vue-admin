<template>
    <el-tag :type="defaultData.type" :closable="defaultData.closable" :hit="defaultData.hit" :color="defaultData.color"
        :size="defaultData.size" :effect="defaultData.effect" :round="defaultData.round">{{ defaultData.label }}
    </el-tag>
</template>


<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import type { dictType } from '@/api/dict/type';


const props = defineProps({
    value: Number
})

// 定义默认的数据
const defaultData = reactive<dictType>({
    label: '',
    value: null,
    type: 'primary',
    closable: false,
    hit: false,
    color: '',
    size: 'default',
    effect: 'light',
    round: false,
})

const getDict = async () => {
    const item = data.filter((item) => item.value === props.value)
    Object.assign(defaultData, item[0])
}


onMounted(() => {
    getDict()
})

const data = [
    {
        label: '使用中',
        value: 2,
        type: "primary"
    },
    {
        label: '空闲中',
        value: 3,
        type: "success"
    },
    {
        label: '维护中',
        value: 4,
        type: "warning"
    },
    {
        label: '待维修',
        value: 5,
        type: "danger"
    }
]


</script>





<style scoped lang="less"></style>