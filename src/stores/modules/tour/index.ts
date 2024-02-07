import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { tours } from '@/components/tour/src/mock'
import type { TourSteps, TourStpesState, TourType } from '@/components/tour/types'

/**
 * tours => 투어 목록들
 * tour => 해당 투어
 * currStep => 투어의 현재 스텝
 */

export const useTourStore = defineStore('tour', () => {
  const state = reactive<TourStpesState>({
    tours: tours()
  })

  const getTour = (type: TourType) => {
    return state.tours[type]
  }

  const getCurrStep = (tour: TourSteps[], index: number) => {
    return tour[index]
  }

  function setTourRef(index: number, ref: any, type: TourType) {
    state.tours[type][index].target = ref?.$el
  }

  return {
    getTour,
    getCurrStep,
    setTourRef
  }
})
