<template>
  <div class="method">
    <div class="method-control" v-for="item in socialLoginTypes" :key="item.url">
      <a class="method-action" @click="onSocialLogin(item)">
        <img :src="item.icon" style="width: 25px; margin-right: 5px" />
        <span>{{ $t('common.socialLoginText', { type: item.type }) }}</span>
      </a>
    </div>
  </div>
</template>
<script setup lang="ts" name="SocialLoginBtns">
import NaverIcon from '@/assets/images/btnG_icon_square.png'
import GoogleIcon from '@/assets/svgs/google_g_logo.svg.webp'
import KakaoIcon from '@/assets/svgs/kakaotalk.svg'

interface SocialLoginType {
  type: 'google' | 'naver' | 'kakao'
  url: string
  icon: string
}

const onSocialLogin = (loginType: SocialLoginType) => {
  const link = import.meta.env.VITE_AUTH_SERVER_API_URL + loginType.url
  window.location.href = link
}

const socialLoginTypes: SocialLoginType[] = [
  {
    type: 'google',
    url: '/oauth2/authorization/google',
    icon: GoogleIcon
  },
  {
    type: 'naver',
    url: '/oauth2/authorization/naver',
    icon: NaverIcon
  },
  {
    type: 'kakao',
    url: '/oauth2/authorization/kakao',
    icon: KakaoIcon
  }
]
</script>
<style lang="scss" scoped>
.method {
  &-control {
    margin-bottom: 1rem;
  }

  &-action {
    font-family: inherit;
    font-size: 0.95rem;
    font-weight: 500;
    line-height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    padding: 0.35rem 1.25rem;
    outline: none;
    border: 0.5px solid var(--color-grayish);
    border-radius: 2rem;
    color: var(--color-black);
    background: var(--color-white);
    text-transform: capitalize;
    text-rendering: optimizeLegibility;
    transition: all 0.35s ease;

    &:hover {
      background: var(--color-light);
    }
  }
}
</style>
