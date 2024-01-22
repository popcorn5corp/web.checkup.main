import type { TourProps as ATourProps, TourStepProps as ATourStepProps } from 'ant-design-vue'
import { defineStore } from 'pinia'
import { computed, createVNode, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { type RouteLocationRaw, useRouter } from 'vue-router'

const path = {
  DYNAMIC_TABLE: '/samples/dynamic-table'
} as const

type Path = (typeof path)[keyof typeof path]

type Steps = Omit<ATourStepProps, 'target'> & {
  target?: HTMLElement | null
  goPage?: Path
}
interface TourProps extends Omit<ATourProps, 'steps'> {
  steps: Steps[]
}

export const useTourStore = defineStore('tour', () => {
  const { t } = useI18n()
  const router = useRouter()
  const state = reactive<TourProps>({
    open: false,
    steps: [
      {
        title: t('page.tour.step1.title'),
        description: t('page.tour.step1.description'),
        cover: createVNode('img', {
          alt: 'tour.png',
          src: 'https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png'
        }),
        placement: 'top'
      },
      {
        title: t('page.tour.step2.title'),
        description: t('page.tour.step2.description'),
        target: null
      },
      {
        title: t('page.tour.step3.title'),
        description: t('page.tour.step3.description'),
        target: null
      },
      {
        title: t('page.tour.step4.title'),
        description: t('page.tour.step4.description'),
        target: null,
        placement: 'right',
        goPage: path.DYNAMIC_TABLE
      },
      {
        title: t('page.tour.step5.title'),
        description: t('page.tour.step5.description'),
        target: null,
        placement: 'right'
      },
      {
        title: t('page.tour.step6.title'),
        description: t('page.tour.step6.description'),
        target: null,
        placement: 'bottom'
      },
      {
        title: t('page.tour.step7.title'),
        description: t('page.tour.step7.description'),
        target: null,
        placement: 'left'
      },
      {
        title: t('page.tour.step8.title'),
        description: t('page.tour.step8.description'),
        target: null,
        placement: 'left'
      },
      {
        title: t('page.tour.step9.title'),
        description: t('page.tour.step9.description'),
        target: null,
        placement: 'left'
      },
      {
        title: t('page.tour.step10.title'),
        description: t('page.tour.step10.description'),

        target: null,
        placement: 'left'
      }
    ]
  })

  const isOpen = computed(() => state.open)

  const getSteps = computed(() => state.steps)

  function setStep(current: number, targetRef: HTMLElement) {
    state.steps[current].target = targetRef
  }

  function handleOpen(val: boolean) {
    state.open = val
  }

  function changeStep(current: number) {
    const currStep = state.steps[current]

    Object.keys(currStep).includes('goPage') && routerPush(currStep.goPage as RouteLocationRaw)
  }

  function routerPush(path: RouteLocationRaw) {
    router.push(path)
  }

  return {
    isOpen,
    getSteps,
    setStep,
    handleOpen,
    changeStep
  }
})
