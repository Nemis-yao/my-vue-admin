<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-card>
          <div class="title">
            <div class="round">
              <el-icon>
                <Document />
              </el-icon>
            </div>
            <h4>今日总收入（元）</h4>
          </div>
          <div class="total mt">
            <h1>{{toThousands(11238245)}}</h1>
            <div class="percent" style="color: green">-21%</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import toThousands from '@/utils/toThousands.ts'
</script>
<style lang="less" scoped>
.title {
  display: flex;
  align-items: center;

  .round {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: rgb(235, 236, 245);
    text-align: center;
    line-height: 30px;
  }

  h4 {
    color: #666;
  }
}

.total {
  display: flex;
  align-items: center;

  h1 {
    font-size: 30px;
    margin-right: 20px;
  }

  .percent {
    display: flex;
    padding: 3px 5px;
    height: 20px;
    line-height: 20px;
    background-color: rgb(235, 247, 239);
    border-radius: 2px;
    line-height: 20px;
  }
}
</style>
