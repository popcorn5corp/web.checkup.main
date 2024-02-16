import { WorkspaceService } from '@/services'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useWorkspaceStore } from '@/stores/modules/workspace'

interface WorkspaceSettings {
  // 계정 설정
  account: {}
  // 알람 설정
  alarm: {}
  // 디스플레이 설정
  display: {
    theme: 'light' | 'semiDark' | 'dark' // 워크스페이스 테마
    menuPosition: 'sidemenu' | 'topmenu' // 메뉴 위치
    primaryColor: string // 메인 색상
    menuTheme: 'light' | 'dark' // 메뉴 테마
  }
  // 언어 설정
  language: {
    // 사용 언어
    language: 'ko'
  }
  // 접근성 설정
  accessibility: {
    // 글자 크기
    fontSize: number
  }
}

const defaultSettings: WorkspaceSettings = {
  // 계정 설정
  account: {
    // 로그인 계정에 대한 설정 정보
  },
  alarm: {
    // 추후에 알힘 허용 시간, 알림 사운드 등 추가 가능
  },
  // 디스플레이 설정
  display: {
    theme: 'light', // 테마 'light' | 'semiDark' | 'dark'
    menuPosition: 'sidemenu', // 메뉴 위치 'sidemenu' | 'topmenu'
    primaryColor: 'rgba(24, 144, 255, 1)', // 메인 색상
    menuTheme: 'light' // 메뉴 색상 모드 'light' | 'dark'
  },
  // 언어 설정
  language: {
    // 사용 언어
    language: 'ko'
  },
  // 접근성 설정
  accessibility: {
    // 글자 크기
    fontSize: 13
  }
}

export const useSettingsStore = defineStore('settings', () => {
  const { getWorkspaceId } = useWorkspaceStore()
  // console.log('getWorkspaceId :": ', getWorkspaceId)

  async function getWorkspaceSettings() {
    const result = await WorkspaceService.getWorkspaceSettings(getWorkspaceId)
  }

  return {
    getWorkspaceSettings
  }
})
