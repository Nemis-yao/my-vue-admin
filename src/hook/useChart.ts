import { markRaw, onBeforeUnmount, onMounted, type Ref } from 'vue'
import { ref } from 'vue'
import * as echarts from 'echarts'

export function useChart(chartRef: Ref<HTMLElement | null>, setChartData: any) {
  const chartInstance = ref<echarts.ECharts | null>(null)
  const initChart = async () => {
    if (chartRef.value) {
      chartInstance.value = markRaw(echarts.init(chartRef.value)) // 取消vue的响应式，避免resize失效
      const options = await setChartData();
      chartInstance.value.setOption(options)
    }
  }

  // 让图表可以自动变化
  const resizeChart = () => {
    chartInstance.value?.resize()
  }
  onMounted(() => {
    initChart();
    window.addEventListener('resize', resizeChart) // 添加监听事件
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeChart) // 取消监听事件，避免内存泄露
    if (chartInstance.value) {
      chartInstance.value.dispose() //清除图表占用的空间
    }
  })
}
