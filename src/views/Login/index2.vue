<template>
  <div id="container" class="container">
    <!-- FORM SECTION -->
    <div class="row">
      <!-- SIGN UP -->
      <div class="col align-items-center flex-col sign-up">
        <div class="form-wrapper align-items-center">
          <div class="form sign-up">
            <h3>{{ text2 }}</h3>

            <div class="input-group">
              <i class="bx bxs-user"></i>
              <input type="text" :placeholder="text3" />
            </div>
            <!-- <div class="input-group">
              <i class="bx bx-mail-send"></i>
              <input type="email" placeholder="Email" />
            </div> -->
            <!-- <div class="input-group">
              <i class="bx bxs-lock-alt"></i>
              <input type="password" placeholder="Password" />
            </div>
            <div class="input-group">
              <i class="bx bxs-lock-alt"></i>
              <input type="password" placeholder="Confirm password" />
            </div> -->
            <button @click="onNext">다음</button>
            <p>
              <span> Already have an account? </span>
              <b @click="onToggle" class="pointer"> Sign in here </b>
            </p>
          </div>
        </div>
      </div>
      <!-- END SIGN UP -->

      <!-- SIGN IN -->
      <div class="col align-items-center flex-col sign-in">
        <div class="form-wrapper align-items-center">
          <div class="form sign-in">
            <div class="heading">
              <h1 class="text text-large">{{ $t('common.loginText') }}</h1>
              <p class="text text-normal">
                {{ $t('common.newUser') }}
                <span @click="onToggle"
                  ><a href="#" class="text text-links" style="color: rgb(37, 104, 249)">{{
                    $t('common.createAccount')
                  }}</a></span
                >
              </p>
            </div>
            <div class="input-group">
              <font-awesome-icon :icon="['fas', 'user']" />
              <input type="text" placeholder="Username" />
            </div>
            <div class="input-group">
              <i class="bx bxs-lock-alt"></i>
              <input type="password" placeholder="Password" />
            </div>
            <button>Sign in</button>
            <p>
              <b> Forgot password? </b>
            </p>
            <p>
              <span> Don't have an account? </span>
              <b @click="onToggle" class="pointer"> Sign up here </b>
            </p>

            <div class="striped">
              <span class="striped-line"></span>
              <span class="striped-text">OR</span>
              <span class="striped-line"></span>
            </div>

            <SocialLoginBnts />
          </div>
        </div>
        <div class="form-wrapper"></div>
      </div>
      <!-- END SIGN IN -->
    </div>
    <!-- END FORM SECTION -->

    <!-- CONTENT SECTION -->
    <div class="row content-row">
      <!-- SIGN IN CONTENT -->
      <div class="col align-items-center flex-col">
        <div class="text sign-in">
          <h2>Checkup</h2>
          <h2>시설 및 안전관리를 한번에</h2>
        </div>
        <div class="img sign-in"></div>
      </div>
      <!-- END SIGN IN CONTENT -->
      <!-- SIGN UP CONTENT -->
      <div class="col align-items-center flex-col">
        <div class="img sign-up"></div>
        <div class="text sign-up">
          <h2>{{ text }}</h2>
        </div>
      </div>
      <!-- END SIGN UP CONTENT -->
    </div>
    <!-- END CONTENT SECTION -->
  </div>
</template>
<script setup lang="ts" name="login2">
import { onMounted, ref } from 'vue'
import SocialLoginBnts from './components/SocialLoginBnts.vue'

let container: HTMLElement | null = null
const text = ref('회사 또는 팀이름을 알려주세요')
const text2 = ref('Checkup 워크스페이스의 이름이 됩니다.')
const text3 = ref('회사 또는 팀이름')

const onToggle = () => {
  container!.classList.toggle('sign-up')
  container!.classList.toggle('sign-in')
}

const onNext = () => {
  text.value = '체크업팀에 또 누가 있나요?'
  text2.value = '이메일로 직장동료를 추가해주세요'
  text3.value = '이메일 검색'
}

onMounted(() => {
  container = document.getElementById('container')

  setTimeout(() => {
    container!.classList.add('sign-in')
  }, 200)
})
</script>
<style lang="scss">
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

.form {
  padding: 1rem;
  background-color: var(--white);
  border-radius: 1.5rem;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transform: scale(0);
  transition: 0.5s ease-in-out;
  transition-delay: 1s;
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
  color: var(--gray-2);
}

.input-group input {
  width: 100%;
  padding: 1rem 3rem;
  font-size: 1rem;
  background-color: var(--gray);
  border-radius: 0.5rem;
  border: 0.125rem solid var(--white);
  outline: none;
}

.input-group input:focus {
  border: 0.125rem solid $color-primary;
}

.form button {
  cursor: pointer;
  width: 100%;
  padding: 0.6rem 0;
  border-radius: 0.5rem;
  border: none;
  background-color: $color-primary;
  color: var(--white);
  font-size: 1.2rem;
  outline: none;
}

.form p {
  margin: 1rem 0;
  font-size: 0.7rem;
}

.flex-col {
  flex-direction: column;
}

.social-list {
  margin: 2rem 0;
  padding: 1rem;
  border-radius: 1.5rem;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transform: scale(0);
  transition: 0.5s ease-in-out;
  transition-delay: 1.2s;
}

.social-list > div {
  color: var(--white);
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
  margin: 4rem;
  color: var(--white);
}

.text h1 {
  font-size: 4rem;
  font-weight: 800;
  margin: 2rem 0;
  transition: 1s ease-in-out;
}

.text h2 {
  font-size: 3.5rem;
  font-weight: 800;
  margin: 2rem 0;
  transition: 1s ease-in-out;
}

.text p {
  font-weight: 600;
  transition: 1s ease-in-out;
  transition-delay: 0.2s;
}

.img img {
  width: 30vw;
  transition: 1s ease-in-out;
  transition-delay: 0.4s;
}

.text.sign-in h2,
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
  background-image: linear-gradient(-45deg, $color-primary 0%, var(--secondary-color) 100%);
  transition: 1s ease-in-out;
  z-index: 6;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
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

@media only screen and (max-width: 425px) {
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
    transform: translateY(0);
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
    background-color: var(--white);
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    transform: translateY(100%);
    transition: 1s ease-in-out;
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
    margin: 0;
  }

  .text p {
    display: none;
  }

  .text h2 {
    margin: 0.5rem;
    font-size: 2rem;
  }
}
</style>
