<template>
    <div class="bg">
        <div class="login">
            <div class="logo">
                <img class="mr" :src="logo" alt="" width="70px" height="70px">
                <h1>动力港能源管理平台</h1>
            </div>

            <div>
                <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                >
                    <el-form-item  prop="username">
                        <el-input v-model="ruleForm.username"  placeholder="请输入用户名" prefix-icon="User" />
                    </el-form-item>
                    <el-form-item  prop="password">
                        <el-input v-model="ruleForm.password"  placeholder="请输入密码" prefix-icon="Lock" show-password />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="width: 100%;"  @click="submitForm(ruleFormRef)">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import logo from '@/assets/logo.png'
import type { FormInstance, FormRules } from 'element-plus'
import { userUserStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
// 定义表单属性
interface RuleForm {
  username: string
  password: string
}
// 拿到表单实例
const ruleFormRef = ref<FormInstance>()

//初始化表单
const ruleForm = reactive<RuleForm>({
  username: '',
  password: '',
})

//表单规制
const rules = reactive<FormRules<RuleForm>>({
    username:[
        { required: true, message: '用户名不能为空', trigger: 'blur' },
        { min: 4, max: 8, message: '用户名要求4-8位数字字母组合', trigger: 'blur' },
    ],
    password:[
        { required: true, message: '密码不能为空', trigger: 'blur' },
    ]
})

// 实例化
const userStore = userUserStore()
const router = useRouter()
//登录
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
      if (valid) { 
          await userStore.login(ruleForm)
          router.push('/')
    } else {
      console.log('error submit!', fields)
    }
  })
}

</script>

<style scoped lang="less">
.bg {
    background-image: url('../assets/bg.png');
    min-height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    display: flex;
    align-items: center;

    .login {
        width: 90%;
        max-width: 500px;
        padding: 2rem;
        background-color: rgba(255, 255, 255, 0.9);
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
        border-radius: 0.5rem;
        margin-left: 10%;

        .logo {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 2rem;

            img {
                margin-right: 1rem;
                width: 4rem;
                height: 4rem;
            }

            h1 {
                font-size: 1.5rem;
                color: rgb(14, 53, 148);
            }
        }

    }
}

/* 小屏优化（移动端） */
@media (max-width: 480px) {
    .bg {
        .login {
            padding: 1.5rem;
            margin-left: 0;

            .logo {
                flex-direction: column;
                 

                img {
                    margin-right: 0;
                    margin-bottom: 1rem;
                }

                h1 {
                    font-size: 1.25rem;
                    text-align: center;
                }
            }
        }
    }
}

</style>