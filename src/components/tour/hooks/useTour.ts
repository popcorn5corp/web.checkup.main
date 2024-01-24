import type { RouteLocationRaw } from 'vue-router'
import { useRouter } from 'vue-router'
import { useTourStore } from '@/stores/modules/tour'
import { TOUR_TYPE, type TourSteps, type TourType } from '@/components/tour/types'

export function useTour() {
  const tourStore = useTourStore()
  const router = useRouter()

  function setTour(index: number, targetRef: Element, type: TourType = TOUR_TYPE.CHECKUP_TOUR) {
    tourStore.setTourRef(index, targetRef, type)
  }

  function changeTour(currStep: TourSteps) {
    Object.keys(currStep).includes('goPage') && router.push(currStep?.goPage as RouteLocationRaw)
  }

  return {
    setTour,
    changeTour
  }
}
