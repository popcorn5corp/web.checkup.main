<template>
  <Spinner :text="$t('message.checkingLogin')" :text-width="'13rem'" />
</template>
<script setup lang="ts" name="SocialLogin">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth'
import { Spinner } from '@/components/spinner'

const router = useRouter()
const {
  query: { accessToken, refreshToken }
} = router.currentRoute.value

const authStore = useAuthStore()
const { setToken, setRefreshToken, loginSocial } = authStore

const isSuccessSocialLogin = !!accessToken && !!refreshToken

;(async () => {
  if (isSuccessSocialLogin) {
    setToken(accessToken as string)
    setRefreshToken(refreshToken as string)
    loginSocial().then(({ goPath }) => {
      router.push(goPath)
    })
  }
})()
</script>
