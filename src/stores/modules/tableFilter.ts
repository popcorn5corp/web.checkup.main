import { reactive, computed, ref, unref} from 'vue'
import { defineStore } from 'pinia'
import { filterList } from '@/components/Table/mock'

export const useTableFilterStore = defineStore('tableFilter', () =>{
  const state = reactive({
    selectedItems: [] as String[],

  })

  function addItems(item:any) {}
  
  return{
    selectedItems: state.selectedItems,
    filterList,
    addItems
  }
})
 