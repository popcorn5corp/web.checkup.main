import type { TourProps } from 'ant-design-vue'
import { defineStore } from 'pinia'
import { computed, createVNode, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { LOGIN_NAME, PAGE_NOT_FOUND_NAME, REDIRECT_NAME } from '@/router/constant'
import type { RouteItem, TabsLayoutState } from '../interface'

export const useTourStore = defineStore('tour', () => {
  const state = reactive<TourProps['steps']>({
    open: false,
    steps: [
      {
        title: '안녕하세요. 반갑습니다.',
        description: '체크업 서비스 사용 안내 입니다.',
        cover: createVNode('img', {
          alt: 'tour.png',
          src: 'https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png'
        }),
        target: () => null,
        placement: 'top'
      },
      {
        title: '드롭다운 기능 제공',
        description: '사스 서비스의 디스플레이 설정, 다국어 설정 등 환경설정을 할 수 있습니다.',
        target: null
      },
      {
        title: '모듈 추가를 통한 메뉴 구성',
        description: '모듈 추가를 통해 다양한 기능을 이용하실 수 있습니다.',
        target: null
      },
      {
        title: '게시물 등록 기능 제공',
        description: '게시물을 등록할 수 있습니다.',
        target: null,
        placement: 'right'
      },
      {
        title: '필터 기능 제공',
        description: '테이블의 필터 기능도 제공하고 있습니다.',
        target: null,
        placement: 'right'
      },
      {
        title: '툴바 기능 제공',
        description: '테이블의 툴바 기능에 대해 소개합니다.',
        target: null,
        placement: 'bottom'
      },
      {
        title: '테이블 새로고침 기능 제공',
        description: '테이블의 데이터를 새로고침 할 수 있는 기능입니다.',
        target: null,
        placement: 'left'
      },
      {
        title: '테이블 다운로드 기능 제공',
        description: '테이블의 데이터를 다운로드 할 수 있는 기능입니다.',
        target: null,
        placement: 'left'
      },
      {
        title: '테이블 사이즈 조정 기능 제공',
        description: '테이블 사이즈 조정을 할 수 있는 기능입니다.',
        target: null,
        placement: 'left'
      },
      {
        title: '테이블 데이터 레이아웃 설정 기능 제공',
        description:
          '테이블의 데이터를 테이블 형식과 카드 형식의 레이아웃을 선택하여 볼 수 있습니다.',
        target: null,
        placement: 'left'
      }
      // {
      //   title: '테이블 컴포넌트에 대한 설명을 마칩니다.',
      //   description: '체크업 SaaS 서비스를 이용해주셔서 감사합니다.',

      //   target: () => null
      // }
    ]
  })

  const getStepInfo = computed(() => state.steps)
  const getMode = computed(() => state.open)

  // action
  function addStep(index, targetElement) {
    state.steps[index].target = targetElement
  }

  function handleMode() {
    state.open = !state.open
  }

  return {
    addStep,
    getStepInfo,
    getMode,
    handleMode
  }
})
