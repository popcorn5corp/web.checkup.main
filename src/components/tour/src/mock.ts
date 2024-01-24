import { createVNode } from 'vue'
import { useI18n } from 'vue-i18n'
import type { TourStpesState } from '@/components/tour/types'

const path = {
  DYNAMIC_TABLE: '/samples/dynamic-table'
} as const

export function tours(): TourStpesState['tours'] {
  const { t } = useI18n()

  return {
    CHECKUP_TOUR: [
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
        placement: 'topRight'
      },
      {
        title: t('page.tour.step3.title'),
        description: t('page.tour.step3.description'),
        placement: 'left'
      },
      {
        title: t('page.tour.step4.title'),
        description: t('page.tour.step4.description'),
        placement: 'right',
        goPage: path.DYNAMIC_TABLE
      },
      {
        title: t('page.tour.step5.title'),
        description: t('page.tour.step5.description'),
        placement: 'right'
      },
      {
        title: t('page.tour.step6.title'),
        description: t('page.tour.step6.description'),
        placement: 'bottom'
      },
      {
        title: t('page.tour.step7.title'),
        description: t('page.tour.step7.description'),
        placement: 'left'
      },
      {
        title: t('page.tour.step8.title'),
        description: t('page.tour.step8.description'),
        placement: 'left'
      },
      {
        title: t('page.tour.step9.title'),
        description: t('page.tour.step9.description'),
        placement: 'left'
      },
      {
        title: t('page.tour.step10.title'),
        description: t('page.tour.step10.description'),

        placement: 'left'
      }
    ],

    CHECKUP_TOUR_DEMO: [
      {
        title: t('page.tour.step1.title'),
        description: t('page.tour.step1.description'),
        cover: createVNode('img', {
          alt: 'tour.png',
          src: '/.storybook/public/storybook_intro.png'
        }),
        placement: 'top'
      },
      {
        title: t('page.tour.step3.title'),
        description: t('page.tour.step3.description'),
        placement: 'right'
      },
      {
        title: '체크업 공지사항 및 드롭 다운 기능 제공',
        description:
          '공지사항을 간편하게 볼 수 있으며 SaaS 서비스의 디스플레이 설정, 다국어 설정 등 환경설정을 할 수 있습니다.'
      },
      {
        title: '북마크 기능',
        description: '자주 사용하는 기능들을 추가할 수 있습니다.',
        placement: 'right'
      },
      {
        title: '체크업 Tour 컴포넌트',
        description: 'Tour 컴포넌트를 활용하여 제품을 소개해보세요.',
        arrow: false
      }
    ],

    OVERVIEW_PAGE_TOUR: [
      {
        title: '파일을 업로드',
        description: '해당하는 파일을 업로드해주세요.',
        cover: createVNode('img', {
          alt: 'tour.png',
          src: 'https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png'
        }),
        placement: 'rightTop'
      },
      {
        title: '드롭다운',
        description: '드롭다운에 원하는 기능을 넣어보세요.',
        placement: 'rightTop',
        arrow: false
      },
      {
        title: '저장',
        description: '모든 항목을 입력한 후 저장해주세요.',
        placement: 'topRight'
      }
    ]
  }
}
