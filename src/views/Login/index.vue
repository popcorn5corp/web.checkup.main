<script setup lang="ts" name="Login">
import { AuthService } from '@/services'
import { useAuthStore } from '@/stores'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { Input } from 'ant-design-vue'
import { Spin } from 'ant-design-vue'
import { h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Spinner } from '@/components/spinner'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/cacheKeyEnum'
import SocialLoginBtns from './components/SocialLoginBnts.vue'

const { query } = useRoute()
const router = useRouter()
const { setToken, setUser } = useAuthStore()

const accessToken = query.accessToken as string
const refreshToken = query.refreshToken as string
const isSuccessSocialLogin = !!accessToken && !!refreshToken
const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '24px'
  },
  spin: true
})

if (isSuccessSocialLogin) {
  console.log('login success!')
  setToken(ACCESS_TOKEN_KEY, accessToken)
  setToken(REFRESH_TOKEN_KEY, refreshToken)

  AuthService.getUser().then(({ data, success }) => {
    if (success) {
      setUser(data)
    }
  })

  setTimeout(() => {
    router.push({ name: 'dashboard' })
  }, 2000)
}
</script>
<template>
  <main class="login-container">
    <div class="container">
      <section class="wrapper" v-if="!isSuccessSocialLogin">
        <div class="heading">
          <h1 class="text text-large">{{ $t('common.loginText') }}</h1>
          <p class="text text-normal">
            {{ $t('common.newUser') }}
            <span
              ><a href="#" class="text text-links">{{ $t('common.createAccount') }}</a></span
            >
          </p>
        </div>

        <form name="signin" class="form">
          <div class="input-control">
            <label for="email" class="input-label" hidden>Email Address</label>
            <Input
              type="email"
              name="email"
              id="email"
              class="input-field"
              :placeholder="$t('common.idText')"
            />
          </div>
          <div class="input-control">
            <label for="password" class="input-label" hidden>Password</label>
            <Input
              type="password"
              name="password"
              id="password"
              class="input-field"
              :placeholder="$t('common.passwordText')"
            />
          </div>
          <div class="input-control">
            <a href="#" class="text text-links">{{ $t('common.forgotPassword') }}</a>
            <input
              type="submit"
              name="submit"
              class="input-submit"
              :value="$t('common.loginText')"
              disabled
            />
          </div>
        </form>
        <div class="striped">
          <span class="striped-line"></span>
          <span class="striped-text">OR</span>
          <span class="striped-line"></span>
        </div>

        <SocialLoginBtns />
      </section>
      <!-- <Spin v-else :tip="$t('common.checkingLogin')" size="large" :indicator="indicator" /> -->
      <Spinner v-else :text="$t('common.checkingLogin')" :text-width="'13rem'"></Spinner>
    </div>
  </main>
</template>
<style lang="scss">
:root {
  --color-white: #ffffff;
  --color-light: #f1f5f9;
  --color-black: #121212;
  --color-night: #001632;

  --color-red: #f44336;
  --color-blue: #1a73e8;
  --color-gray: #80868b;
  --color-grayish: #dadce0;

  --shadow-normal: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-medium: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-large: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.login-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1rem;
  font-weight: normal;
  line-height: 1.5;
  color: var(--color-black);
  background: var(--color-light);

  a,
  button {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    text-decoration: none;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  // Components
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 80rem;
    min-height: 100vh;
    width: 100%;
    padding: 0 2rem;
    margin: 0 auto;
  }

  .text {
    font-family: inherit;
    line-height: inherit;
    text-transform: unset;
    text-rendering: optimizeLegibility;

    &-large {
      font-size: 2rem;
      font-weight: 600;
      color: var(--color-black);
    }

    &-normal {
      font-size: 1rem;
      font-weight: 400;
      color: var(--color-black);
    }

    &-links {
      font-size: 1rem;
      font-weight: 400;
      color: var(--color-blue);

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .wrapper {
    max-width: 28rem;
    width: 100%;
    margin: 2rem auto;
    padding: 2rem 2.5rem;
    border: none;
    outline: none;
    border-radius: 0.25rem;
    color: var(--color-black);
    background: var(--color-white);
    box-shadow: var(--shadow-large);

    .form {
      width: 100%;
      height: auto;
      margin-top: 2rem;

      .input-control {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.25rem;
      }

      .input-field {
        font-family: inherit;
        font-size: 1rem;
        font-weight: 400;
        line-height: inherit;
        width: 100%;
        height: auto;
        padding: 0.75rem 1.25rem;
        border: none;
        outline: none;
        border-radius: 2rem;
        color: var(--color-black);
        background: var(--color-light);
        text-transform: unset;
        text-rendering: optimizeLegibility;
      }

      .input-submit {
        font-family: inherit;
        font-size: 1rem;
        font-weight: 500;
        line-height: inherit;
        cursor: pointer;
        min-width: 40%;
        height: auto;
        padding: 0.65rem 1.25rem;
        border: none;
        outline: none;
        border-radius: 2rem;
        color: var(--color-white);
        background: var(--color-blue);
        box-shadow: var(--shadow-medium);
        text-transform: capitalize;
        text-rendering: optimizeLegibility;
      }
    }

    .striped {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: 1rem 0;

      &-line {
        flex: auto;
        flex-basis: auto;
        border: none;
        outline: none;
        height: 2px;
        background: var(--color-grayish);
      }

      &-text {
        font-family: inherit;
        font-size: 1rem;
        font-weight: 500;
        line-height: inherit;
        color: var(--color-black);
        margin: 0 1rem;
      }
    }
  }
}
</style>
