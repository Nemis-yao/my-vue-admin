<template>
    <el-dialog v-model="dialogVisible" title="Tips" :before-close="handleClose">
        <el-form :model="form" label-width="auto" style="max-width: 600px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="站点名称：">
                        <el-input v-model="form.name" />
                    </el-form-item>
                    <el-form-item label="站点ID：">
                        <el-input v-model="form.name" />
                    </el-form-item>
                    <el-form-item label="所属城市：">
                        <el-input v-model="form.name" />
                    </el-form-item>
                    <el-form-item label="站点负责人：">
                        <el-input v-model="form.name" />
                    </el-form-item>
                    <el-form-item label="负责人电话：">
                        <el-input v-model="form.name" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="快充数：">
                        <el-input v-model="form.name" />
                    </el-form-item>
                    <el-form-item label="慢充数：">
                        <el-input v-model="form.name" />
                    </el-form-item>
                    <el-form-item label="充电站状态">
                        <el-input v-model="form.name" />
                    </el-form-item>
                    <el-form-item label="正在充电：">
                        <el-input v-model="form.name" />
                    </el-form-item>
                    <el-form-item label="故障数：">
                        <el-input v-model="form.name" />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'

const dialogVisible = ref(false)

const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}
</script>