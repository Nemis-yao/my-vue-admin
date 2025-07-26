import {defineStore} from 'pinia'
import type { RowType} from '@/types/station.ts'
import { ref } from 'vue'

export  const useStationStore = defineStore('stations', ()=>{
  const rowData = ref<RowType>({
    name:'',
    id:'',
    city:"",
    fast:"",
    slow:"",
    status:1,
    now:'',
    fault:"",
    person:'',
    tel:''
  })

  const setRowData = (row: RowType) => {
    // Object.assign(rowData, row)
    row = JSON.parse((JSON.stringify(row)))
    rowData.value = row
  }
  return {
    rowData,setRowData,
  }
})
