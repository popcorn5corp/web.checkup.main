<template>
  <div id="container" class="container" v-if="!getLoading">
    <div class="row">
      <!-- SIGN UP -->
      <div class="col align-items-center flex-col sign-up">
        <div class="form-wrapper align-items-center">
          <div class="form sign-up">
            <template v-if="signRenderType === 'signUp'">
              <SignUp :onToggle="onToggle" @updateTitleMsg="(value) => (titleMsg.signUp = value)" />
            </template>
          </div>
        </div>
      </div>
      <!-- END SIGN UP -->

      <!-- SIGN IN -->
      <template v-if="renderComponentType === 'login'">
        <div class="col align-items-center flex-col sign-in">
          <div class="form-wrapper align-items-center">
            <div class="form sign-in">
              <template v-if="signRenderType === 'signIn'">
                <SignIn :onToggle="onToggle" :isSuccessLogin="isSuccessLogin" />
              </template>
              <div class="text-btn-wrapper">
                <div class="text-btn pointer join" @click="onToggle">
                  {{ $t('component.button.signUpText') }}
                </div>
                <div style="display: flex; align-items: center; gap: 5px">
                  <div
                    class="text-btn pointer"
                    @click="
                      () => {
                        renderComponentType = 'findUser'
                        findUserType = 'id'
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
                        renderComponentType = 'findUser'
                        findUserType = 'password'
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
      <!-- FIND USER -->
      <template v-if="renderComponentType === 'findUser'">
        <div class="col align-items-center flex-col find-user">
          <div class="form-wrapper">
            <div class="find-user-wrapper">
              <FindUser :type="findUserType" />
              <p style="margin: 1rem 0; font-size: 14px">
                <b @click="renderComponentType = 'login'" class="pointer">
                  <LeftOutlined />
                  {{ $t('common.backToLogin') }}
                </b>
              </p>
            </div>
          </div>
        </div>
      </template>
      <!-- END FIND USER -->
      <!-- END SIGN IN -->
    </div>
    <!-- END FORM SECTION -->

    <!-- CONTENT SECTION -->
    <div class="row content-row">
      <!-- SIGN IN CONTENT -->
      <div class="col align-items-center flex-col">
        <div class="text sign-in">
          <h2 style="margin: 0">{{ titleMsg.signIn }}</h2>
          <img src="@/assets/images/checkup_logo_light.png" style="width: 500px" class="logo" />
        </div>
      </div>
      <!-- END SIGN IN CONTENT -->
      <!-- SIGN UP CONTENT -->
      <div class="col align-items-center flex-col">
        <div class="img sign-up"></div>
        <div class="text sign-up">
          <h2>{{ titleMsg.signUp }}</h2>
        </div>
      </div>
      <!-- END SIGN UP CONTENT -->
    </div>
    <!-- END CONTENT SECTION -->
    <!-- FORM SECTION -->
  </div>
  <Spinner v-else :text="$t('message.checkingLogin')" :text-width="'13rem'" />
</template>
<script setup lang="ts" name="Login">
import { storeToRefs } from 'pinia'
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/modules/auth'
import { LeftOutlined } from '@/components/icons'
import { Spinner } from '@/components/spinner'
import FindUser from './components/FindUser.vue'
import SignIn from './components/SignIn.vue'
import SignUp from './components/SignUp.vue'
import SocialLoginBnts from './components/SocialLoginBnts.vue'

type SignRenderTypes = 'signUp' | 'signIn'
type ComponentType = 'login' | 'findUser'
export type FindUserFormTypes = 'id' | 'password'

const { t } = useI18n()

const authStore = useAuthStore()
const { getLoading } = storeToRefs(authStore)
const isSuccessLogin = ref(false)
const signRenderType = ref<SignRenderTypes>('signIn')
const renderComponentType = ref<ComponentType>('login')
const findUserType = ref<FindUserFormTypes>('id')
const titleMsg = reactive({
  signIn: t('common.signInTitle'),
  signUp: t('common.signUpTitle')
})

let container: HTMLElement | null = null

const onToggle = () => {
  container!.classList.toggle('sign-up')
  container!.classList.toggle('sign-in')
  titleMsg.signUp = t('common.signUpTitle')

  if (signRenderType.value === 'signUp') signRenderType.value = 'signIn'
  else signRenderType.value = 'signUp'
}

onMounted(() => {
  container = document.getElementById('container')
  setTimeout(() => {
    if (container?.classList) {
      container.classList?.add('sign-in')
    }
  })
})
</script>

<style lang="scss" scoped>
* {
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
}

.form {
  padding: 1rem;
  background-color: $color-white;
  border-radius: 1.5rem;
  width: 100%;
  transform: scale(0);
  transition: 0.5s ease-in-out;
  transition-delay: 0.6s;
}

.form button {
  width: 100%;
  font-size: 16px;
  margin-top: 10px;
}

.form p {
  margin: 1rem 0;
  font-size: 0.7rem;
}

.flex-col {
  flex-direction: column;
}

.pointer {
  cursor: pointer;
}

.sign-in {
  .text {
    font-family: inherit;
    line-height: inherit;
    text-transform: unset;
    text-rendering: optimizeLegibility;

    &-normal {
      font-size: 1rem;
      font-weight: 400;
      color: $color-text-10;
    }

    &-links {
      font-size: 1rem;
      font-weight: 400;
      color: $color-blue-6;

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
      background: $color-gray-5;
    }

    &-text {
      font-family: inherit;
      font-size: 1rem;
      font-weight: 500;
      line-height: inherit;
      color: $color-text-10;
      margin: 0 1rem;
    }
  }
}

.find-user-wrapper {
  padding: 1rem;
  transition: 0.5s ease-in-out;
}

.container.sign-in .form.sign-in,
.container.sign-up .form.sign-up {
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

:deep(.custom-input-container) {
  margin: 0;
}
:deep(.custom-input-container .input-label) {
  background: $color-white !important;
}

:deep(.ant-form) {
  .ant-form-item {
    margin: 0;
    margin-bottom: 1.1rem;
  }
}

.text {
  color: $color-white;
  word-break: keep-all;
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
    color: $color-blue-6;
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
  background-image: linear-gradient(-45deg, $color-blue-6 0%, #57b894 100%);
  transition: 0.6s ease-in-out;
  z-index: 6;
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

  .container.sign-in .col.sign-in,
  .container.sign-up .col.sign-up,
  .col.find-user {
    transform: translateY(0px);
    height: 68%;
    overflow: scroll;
    justify-content: flex-start;
    padding-top: 50px;
  }

  .content-row {
    align-items: flex-start !important;
    .text {
      margin: 0 20px;
    }
  }

  .content-row .col {
    transform: translateY(0);
    background-color: unset;
  }

  .col {
    width: 100%;
    position: absolute;
    padding: 2rem;
    background-color: $color-white;
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
  .find-user-wrapper {
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
  .content-row {
    .sign-in {
      padding-right: 20px;
    }
    .sign-up {
      padding-left: 20px;
    }
  }
}
@include xxl {
  .content-row {
    .sign-in {
      padding-right: 20px;
    }
    .sign-up {
      padding-left: 20px;
    }
  }
}
</style>
