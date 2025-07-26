<template>
    <el-dialog :model-value="dialogVisible" :title="title" @close="handleCancel" destroy-on-close>
        <el-form :model="form" label-width="auto" :rules="rules" ref="fromRef">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="站点名称：" prop="name">
                        <el-input v-model="form.name" />
                    </el-form-item>
                    <el-form-item label="站点ID：" prop="id">
                        <el-input v-model="form.id" :disabled="disabled" />
                    </el-form-item>
                    <el-form-item label="所属城市：" prop="city">
                        <el-input v-model="form.city" />
                    </el-form-item>
                    <el-form-item label="站点负责人：" prop="person">
                        <el-input v-model="form.person" />
                    </el-form-item>
                    <el-form-item label="负责人电话：" prop="tel">
                        <el-input v-model="form.tel" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="快充数：" prop="fast">
                        <el-input v-model="form.fast" />
                    </el-form-item>
                    <el-form-item label="慢充数：" prop="slow">
                        <el-input v-model="form.slow" />
                    </el-form-item>
                    <el-form-item label="充电站状态" prop="status" >
                      <el-select v-model="form.status" placeholder="请选择" :disabled="disabled">
                        <el-option
                          v-for="item in statusOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="正在充电：" prop="now">
                        <el-input v-model="form.now"  :disabled="disabled" />
                    </el-form-item>
                    <el-form-item label="故障数：" prop="fault">
                        <el-input v-model="form.fault"  :disabled="disabled" />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
      <el-row>
        <el-col :span="3" :offset="21">
          <el-button type="primary" @click="handleConfirm(fromRef)">确认</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-col>
      </el-row>

    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import type { RowType} from '@/types/station.ts'
import type { FormInstance,FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import {useStationStore} from '@/stores/staticon.ts'
import { storeToRefs } from 'pinia'
import { editApi } from '@/api/chargingstation/chargingstation.ts'
// 接收传值
const props = defineProps({
  dialogVisible:{
    type: Boolean,
    required: true
  }
})

// 定义事件
const emit = defineEmits(['close','reload'])
const form = ref<RowType>({
  name: "",
  id: "",
  city: "",
  fast: "",
  slow: "",
  status: 1,
  now: "",
  fault: "",
  person: "",
  tel: ""
})
const rules = reactive<FormRules<RowType>>({
  name:[{ required: true,message:"站点名称不能为空",trigger:"blur" }],
  id:[{ required: true,message:"站点ID不能为空",trigger:"blur" }],
  city:[{ required: true,message:"所属城市不能为空",trigger:"blur" }],
  fast:[{ required: true,message:"快充数不能为空",trigger:"blur" }],
  slow:[{ required: true,message:"<UNK>",trigger:"blur" }],
  status:[{ required: true,message:"充电状态不能为空",trigger:"blur" }],
  now:[{ required: true,message:"正在充电数不能为空",trigger:"blur" }],
  fault:[{ required: true,message:"慢充数不能为空",trigger:"blur" }],
  person:[{ required: true,message:"站点负责人不能为空",trigger:"blur" }],
  tel:[{ required: true,message:"站点负责人电话不能为空",trigger:"blur" }],
})


//
const disabled = ref<boolean>(false);

//取值
const stationStore = useStationStore()
const { rowData } = storeToRefs(stationStore)
const title = ref<string>('')
//监听弹窗状态
watch(()=>props.dialogVisible,()=>{
  if (stationStore.rowData.name) {
    title.value = '编辑充电站信息'
    disabled.value=true
  } else {
    title.value = '新增充电站信息'
    disabled.value=false
  }
  form.value = rowData.value
  // Object.assign(form.value, stationStore.rowData)
})
const fromRef = ref<FormInstance>()

// 确认
const handleConfirm =  (formEl: FormInstance | undefined) =>{
  if (!formEl) return
   formEl.validate(async (valid, fields) => {
    if (valid) {
      const res = await editApi(form.value)
      if (res.code === 200) {
        ElMessage({
          message: res.data,
          type: 'success',
        })
        handleCancel()
        emit('reload')
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}


// 关闭弹窗
const handleCancel = ()=>{
  emit('close')
}

// 定义状态
const statusOptions = [
  {
    label: '全部',
    value: 1,
    type: "primary"
  },
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
