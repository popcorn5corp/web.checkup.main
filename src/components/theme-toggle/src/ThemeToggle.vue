<template>
  <button class="theme-toggle-btn" @click="onChangeMode">
    <div class="toggle-box">
      <div class="toggle-icon-wrapper" :class="isDark && 'active'">
        <div class="moon icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fill-rule="evenodd"
              d="M20.614 14.614A9 9 0 0 1 9.385 3.386a9 9 0 1 0 11.229 11.229Z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div class="sun icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <g
              fill="#f3cf56"
              stroke-width="1"
              stroke-linecap="butt"
              stroke-linejoin="miter"
              stroke-miterlimit="10"
              stroke-dasharray=""
              stroke-dashoffset="0"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
              style="mix-blend-mode: normal"
            >
              <path
                d="M4.069 13H0v-2h4.069c-.041.328-.069.661-.069 1s.028.672.069 1zm3.034-7.312L4.222 2.807 2.808 4.221l2.881 2.881a8.019 8.019 0 0 1 1.414-1.414zm11.209 1.414 2.881-2.881-1.414-1.414-2.881 2.881a8.121 8.121 0 0 1 1.414 1.414zM12 4c.339 0 .672.028 1 .069V0h-2v4.069A8.047 8.047 0 0 1 12 4zm0 16c-.339 0-.672-.028-1-.069V24h2v-4.069A8.047 8.047 0 0 1 12 20zm7.931-9c.041.328.069.661.069 1s-.028.672-.069 1H24v-2h-4.069zm-3.033 7.312 2.88 2.88 1.415-1.414-2.88-2.88a8.127 8.127 0 0 1-1.415 1.414zm-11.21-1.415-2.88 2.88 1.414 1.414 2.88-2.88a8.053 8.053 0 0 1-1.414-1.414zM12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z"
              ></path>
            </g>
          </svg>
        </div>
      </div>
    </div>
  </button>
</template>

<script lang="ts" setup name="ThemeToggle">
import { ref, unref } from 'vue'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'

const { setTheme, setRealDarkTheme, getTheme } = useProjectConfigStore()

const isDark = ref(getTheme.isRealDarkTheme)

const onChangeMode = () => {
  isDark.value = !isDark.value
  const themeName = unref(isDark) ? 'realDark' : 'light'
  setTheme({ navTheme: themeName })
  setTheme({ isRealDarkTheme: themeName === 'realDark' })
  setRealDarkTheme(themeName)
}
</script>

<style lang="scss" scoped>
.theme-toggle-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.25rem;
  position: relative;

  .toggle-box {
    .toggle-icon-wrapper {
      opacity: 1;
      transition: all 0.3s;
      font-size: 18px;

      .icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -45%);
        transition: all 0.3s;
      }

      .sun {
        opacity: 1;
        color: $color-black;
      }

      .moon {
        opacity: 0;
        color: $color-white;
        transform: none;
      }
    }

    .toggle-icon-wrapper.active {
      .sun {
        opacity: 0;
        transform: scale(1) rotate(90deg) translateZ(0px);
      }

      .moon {
        opacity: 1;
        transform: scale(1) rotate(3deg) translateX(-50%) translateY(-40%);
      }
    }
  }
}

.theme-toggle-btn:hover {
  background: rgb(255 255 255 / 10%);
}
</style>
