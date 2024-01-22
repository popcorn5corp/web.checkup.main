<template>
  <div id="container" class="container" v-if="!isSuccessSocialLogin && !isSuccessLogin">
    <div class="row">
      <!-- SIGN UP -->
      <div class="col align-items-center flex-col sign-up">
        <div class="form-wrapper align-items-center">
          <SignUp :onToggle="onToggle" />
        </div>
      </div>
      <!-- END SIGN UP -->

      <!-- SIGN IN -->
      <template v-if="isLogin">
        <div class="col align-items-center flex-col sign-in">
          <div class="form-wrapper align-items-center">
            <div class="form sign-in">
              <div class="heading">
                <h1 class="text text-title">{{ $t('common.loginText') }}</h1>
              </div>

              <Form :model="formData" @validate="onValidate" @finish="onFinish" :rules="rules">
                <FormItem name="userId">
                  <Input
                    id="loginEmail"
                    type="email"
                    :placeholder="$t('component.ph.inputId')"
                    :label="$t('common.idText')"
                    v-model:value="formData.userId"
                  />
                </FormItem>
                <FormItem name="password">
                  <Input
                    id="loginPassword"
                    :placeholder="$t('component.ph.inputPassword')"
                    :label="$t('common.passwordText')"
                    type="password"
                    v-model:value="formData.password"
                  />
                </FormItem>
                <FormItem>
                  <Button
                    :label="$t('common.loginText')"
                    type="primary"
                    size="large"
                    html-type="submit"
                    :loading="isLoading"
                  />
                </FormItem>
              </Form>

              <div class="text-btn-wrapper">
                <div class="text-btn pointer join" @click="onToggle">
                  {{ $t('common.signUpText') }}
                </div>
                <div style="display: flex; align-items: center; gap: 5px">
                  <div
                    class="text-btn pointer"
                    @click="
                      () => {
                        isLogin = false
                        findType = 'id'
                      }
                    "
                  >
                    {{ $t('common.findId') }}
                  </div>
                  <div class="dot" />
                  <div
                    class="text-btn pointer find-password"
                    @click="
                      () => {
                        isLogin = false
                        findType = 'password'
                      }
                    "
                  >
                    {{ $t('common.findPassword') }}
                  </div>
                </div>
              </div>

              <div class="striped">
                <span class="striped-line"></span>
                <span class="striped-text">OR</span>
                <span class="striped-line"></span>
              </div>

              <SocialLoginBnts />
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="col align-items-center">
          <div class="form-wrapper align-items-center flex-col">
            <!-- <FindUser :type="findType" /> -->
            <p style="margin: 1rem 0">
              <b @click="isLogin = true" class="pointer">
                <LeftOutlined />
                {{ $t('common.backToLogin') }}
              </b>
            </p>
          </div>
        </div>
      </template>
      <!-- END SIGN IN -->
    </div>
    <!-- END FORM SECTION -->

    <!-- CONTENT SECTION -->
    <div class="row content-row">
      <!-- SIGN IN CONTENT -->
      <div class="col align-items-center flex-col">
        <div class="text sign-in">
          <h2 style="margin: 0">순간을 모아 미래를 보다</h2>
          <img src="@/assets/images/checkup_logo_light.png" style="width: 500px" class="logo" />
        </div>
        <div class="img sign-in"></div>
      </div>
      <!-- END SIGN IN CONTENT -->
      <!-- SIGN UP CONTENT -->
      <div class="col align-items-center flex-col">
        <div class="img sign-up"></div>
        <div class="text sign-up">
          <h2>체크업의 계정을 만들어보세요</h2>
        </div>
      </div>
      <!-- END SIGN UP CONTENT -->
    </div>
    <!-- END CONTENT SECTION -->
    <!-- FORM SECTION -->
  </div>
  <Spinner v-else :text="$t('common.checkingLogin')" :text-width="'13rem'" />
</template>
<script setup lang="ts" name="login2">
import { AuthService } from '@/services'
import { useAuthStore } from '@/stores'
import { message } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { LeftOutlined } from '@/components/icons'
import { Input } from '@/components/input'
import { Spinner } from '@/components/spinner'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/cacheKeyEnum'
// import FindUser from './components/FindUser.vue'
import SignUp from './components/SignUp.vue'
import SocialLoginBnts from './components/SocialLoginBnts.vue'

const { query } = useRoute()
const { t } = useI18n()
const { setToken, setRefreshToken, login, getToken } = useAuthStore()
const { setTheme, setRealDarkTheme } = useProjectConfigStore()

const accessToken = query.accessToken as string
const refreshToken = query.refreshToken as string
const isSuccessSocialLogin = !!accessToken && !!refreshToken
const isSuccessLogin = ref(false)

;(async () => {
  if (isSuccessSocialLogin && !getToken) {
    console.log('##############')
    setToken(ACCESS_TOKEN_KEY, accessToken)
    await login()
  }

  // set default theme
  const themeName = 'light'
  const defaultPrimary = 'rgba(24, 144, 255, 1)'
  setTheme({ navTheme: themeName })
  setTheme({ isRealDarkTheme: false })
  setTheme({ primaryColor: defaultPrimary })
  setRealDarkTheme(themeName)
})()

let container: HTMLElement | null = null
const isLogin = ref(true)
const findType = ref()
const isLoading = ref(false)
const formData = reactive({
  userId: '',
  password: ''
})

const rules: Record<string, Rule[]> = {
  userId: [{ required: true, message: 'Please input your email!', trigger: 'change' }],
  password: [{ required: true, message: 'Please input your password!', trigger: 'change' }]
}

const onToggle = () => {
  container!.classList.toggle('sign-up')
  container!.classList.toggle('sign-in')
}

const onValidate = (...args: [string, boolean, string[]]) => {
  if (!args[1]) return message.error(t('common.message.signUpValidate'))
}

const onFinish = async () => {
  try {
    isLoading.value = true
    const { data, success } = await AuthService.signIn(formData)
    if (success) {
      setToken(ACCESS_TOKEN_KEY, data.accessToken)
      setRefreshToken(REFRESH_TOKEN_KEY, data.refreshToken)
      isSuccessLogin.value = true

      await login()
    }
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  container = document.getElementById('container')

  setTimeout(() => {
    if (container?.classList) {
      container.classList?.add('sign-in')
    }
  }, 200)
})
</script>
<style lang="scss" scoped>
:root {
  --primary-color: #4ea685;
  --secondary-color: #57b894;
  --black: #000000;
  --white: #ffffff;
  --gray: #efefef;
  --gray-2: #757575;

  --facebook-color: #4267b2;
  --google-color: #db4437;
  --twitter-color: #1da1f2;
  --insta-color: #e1306c;
}

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&display=swap');

* {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100vh;
  overflow: hidden;
}

.container {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background-color: $color-white;
}

.row {
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
}

.col {
  width: 50%;
}

.align-items-center {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.form-wrapper {
  width: 100%;
  max-width: 28rem;

  .sign-in {
    .text {
      font-family: inherit;
      line-height: inherit;
      text-transform: unset;
      text-rendering: optimizeLegibility;

      &-normal {
        font-size: 1rem;
        font-weight: 400;
        color: $color-black;
      }

      &-links {
        font-size: 1rem;
        font-weight: 400;
        color: $color-primary;

        &:hover {
          text-decoration: underline;
        }
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
        background: $color-grayish;
      }

      &-text {
        font-family: inherit;
        font-size: 1rem;
        font-weight: 500;
        line-height: inherit;
        color: $color-black;
        margin: 0 1rem;
      }
    }
  }
}

.form {
  padding: 1rem;
  background-color: $color-white;
  border-radius: 1.5rem;
  width: 100%;
  // box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transform: scale(0);
  transition: 0.5s ease-in-out;
  transition-delay: 0.6s;
}

.text-title {
  font-size: 2rem;
  font-weight: 600;
  margin: 3rem;
  color: $color-black !important;
}

.input-group {
  position: relative;
  width: 100%;
  margin: 1rem 0;
}

.input-group i {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  font-size: 1.4rem;
  color: #757575;
}

.input-group input {
  width: 100%;
  padding: 1rem 3rem;
  font-size: 1rem;
  background-color: #efefef;
  border-radius: 0.5rem;
  border: 0.125rem solid $color-grayish;
  outline: none;
}

.input-group input:focus {
  border: 0.125rem solid $color-primary;
}

.form button {
  width: 100%;
  font-size: 16px;
}

.form p {
  margin: 1rem 0;
  font-size: 0.7rem;
}

.flex-col {
  flex-direction: column;
}

.terms-wrapper {
  margin: 15px 0;
}

.social-list {
  margin: 2rem 0;
  padding: 1rem;
  border-radius: 1.5rem;
  width: 100%;
  // box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transform: scale(0);
  transition: 0.5s ease-in-out;
  transition-delay: 1.2s;
}

.social-list > div {
  color: #ffffff;
  margin: 0 0.5rem;
  padding: 0.7rem;
  cursor: pointer;
  border-radius: 0.5rem;
  cursor: pointer;
  transform: scale(0);
  transition: 0.5s ease-in-out;
}

.social-list > div:nth-child(1) {
  transition-delay: 1.4s;
}

.social-list > div:nth-child(2) {
  transition-delay: 1.6s;
}

.social-list > div:nth-child(3) {
  transition-delay: 1.8s;
}

.social-list > div:nth-child(4) {
  transition-delay: 2s;
}

.social-list > div > i {
  font-size: 1.5rem;
  transition: 0.4s ease-in-out;
}

.social-list > div:hover i {
  transform: scale(1.5);
}

.facebook-bg {
  background-color: var(--facebook-color);
}

.google-bg {
  background-color: var(--google-color);
}

.twitter-bg {
  background-color: var(--twitter-color);
}

.insta-bg {
  background-color: var(--insta-color);
}

.pointer {
  cursor: pointer;
}

.container.sign-in .form.sign-in,
.container.sign-in .social-list.sign-in,
.container.sign-in .social-list.sign-in > div,
.container.sign-up .form.sign-up,
.container.sign-up .social-list.sign-up,
.container.sign-up .social-list.sign-up > div {
  transform: scale(1);
}

.content-row {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 6;
  width: 100%;
}

.text {
  // margin: 3rem;
  color: #ffffff;
}

.text h1 {
  font-size: 4rem;
  font-weight: 800;
  margin: 2rem 0;
  transition: 0.6s ease-in-out;
}

.text h2 {
  font-size: 3.5rem;
  font-weight: 800;
  margin: 2rem 0;
  transition: 0.6s ease-in-out;
}

.text img {
  transition: 0.6s ease-in-out;
}

.text p {
  font-weight: 600;
  transition: 0.6s ease-in-out;
  transition-delay: 0.2s;
}

.img img {
  width: 30vw;
  transition: 0.6s ease-in-out;
  transition-delay: 0.4s;
}

.text-btn-wrapper {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  margin: 1.5rem 0;

  .text-btn {
    padding: 2px;
    color: $color-primary;
    font-weight: 600;
  }
  .join {
    color: $color-gray-6;
  }
  .dot {
    width: 5px;
    height: 5px;
    background: $color-gray-5;
    border-radius: 50%;
  }
}

.text.sign-in h2,
.text.sign-in img,
.text.sign-in p,
.img.sign-in img {
  transform: translateX(-250%);
}

.text.sign-up h2,
.text.sign-up p,
.img.sign-up img {
  transform: translateX(250%);
}

.container.sign-in .text.sign-in h2,
.container.sign-in .text.sign-in img,
.container.sign-in .text.sign-in p,
.container.sign-in .img.sign-in img,
.container.sign-up .text.sign-up h2,
.container.sign-up .text.sign-up p,
.container.sign-up .img.sign-up img {
  transform: translateX(0);
}

/* BACKGROUND */

.container::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: 300vw;
  transform: translate(35%, 0);
  background-image: linear-gradient(-45deg, $color-primary 0%, #57b894 100%);
  transition: 0.6s ease-in-out;
  z-index: 6;
  // box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-bottom-right-radius: max(50vw, 50vh);
  border-top-left-radius: max(50vw, 50vh);
}

.container.sign-in::before {
  transform: translate(0, 0);
  right: 50%;
}

.container.sign-up::before {
  transform: translate(100%, 0);
  right: 50%;
}

.form-container {
  width: 100%;
}

:deep(.custom-input-container) {
  margin: 0;
}

:deep(.ant-form) {
  .ant-form-item {
    margin: 0;
    margin-bottom: 1.2rem;
  }
}

/* RESPONSIVE */

@media only screen and (max-width: 576px) {
  .container::before,
  .container.sign-in::before,
  .container.sign-up::before {
    height: 100vh;
    border-bottom-right-radius: 0;
    border-top-left-radius: 0;
    z-index: 0;
    transform: none;
    right: 0;
  }

  /* .container.sign-in .col.sign-up {
        transform: translateY(100%);
    } */

  .container.sign-in .col.sign-in,
  .container.sign-up .col.sign-up {
    // transform: translateY(0);
    transform: translateY(330px);
    height: 100%;
    justify-content: flex-start;
    padding-top: 50px;
  }

  .content-row {
    align-items: flex-start !important;
  }

  .content-row .col {
    transform: translateY(0);
    background-color: unset;
  }

  .col {
    width: 100%;
    position: absolute;
    padding: 2rem;
    background-color: #ffffff;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    transform: translateY(100%);
    transition: 0.6s ease-in-out;
  }

  .row {
    align-items: flex-end;
    justify-content: flex-end;
  }

  .form,
  .social-list {
    box-shadow: none;
    margin: 0;
    padding: 0;
  }

  .text {
    margin: 30px;
  }

  .text p {
    display: none;
  }

  .text h2 {
    margin: 0.5rem;
    font-size: 2.2rem;
  }

  .logo {
    width: 100% !important;
  }
}

// @include xxs {
//   .text h2 {
//     font-size: 2.3rem;
//   }
//   .logo {
//     width: 400px !important;
//   }
// }
// @include xs {
//   .text h2 {
//     font-size: 2.3rem;
//   }
//   .logo {
//     width: 400px !important;
//   }
// }
@include sm {
  .text h2 {
    font-size: 1.8rem;
  }
  .logo {
    width: 330px !important;
  }
}
@include md {
  .text h2 {
    font-size: 2.3rem;
  }
  .logo {
    width: 400px !important;
  }
}
@include lg {
  .text h2 {
    font-size: 2.8rem;
  }
}
@include xl {
  .text h2 {
    font-size: 3.1rem;
  }
}
</style>
