<template>
  <div class="spinner">
    <div class="loader">
      <div class="loader--dot"></div>
      <div class="loader--dot"></div>
      <div class="loader--dot"></div>
      <div class="loader--dot"></div>
      <div class="loader--dot"></div>
      <div class="loader--dot"></div>
      <div class="loader--text">{{ loadingText }}</div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Spinner">
import type { CSSProperties } from 'vue'
import { computed, ref } from 'vue'

interface Spinner {
  text: string
  textWidth?: string
}

const props = defineProps<Spinner>()
const loadingText = ref(props.text)
const styles = computed<CSSProperties>(() => {
  return {
    width: props.textWidth || '4rem'
  }
})

setInterval(() => {
  if (loadingText.value.includes('...')) {
    loadingText.value = props.text
    return
  }

  loadingText.value = loadingText.value + '.'
}, 1000)
</script>
<style lang="scss" scoped>
$loader--width: 250px;
$loader-dot--size: 20px;

.spinner {
  height: 100vh;
  width: 100vw;
  font-family: Helvetica;
}
.loader {
  height: $loader-dot--size;
  width: $loader--width;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  &--dot {
    animation: {
      name: loader;
      timing-function: ease-in-out;
      duration: 3s;
      iteration-count: infinite;
    }
    height: $loader-dot--size;
    width: $loader-dot--size;
    border-radius: 100%;
    background-color: black;
    position: absolute;
    border: 2px solid white;

    &:first-child {
      background-color: #8cc759;
      animation-delay: 0.5s;
    }
    &:nth-child(2) {
      background-color: #8c6daf;
      animation-delay: 0.4s;
    }
    &:nth-child(3) {
      background-color: #ef5d74;
      animation-delay: 0.3s;
    }
    &:nth-child(4) {
      background-color: #f9a74b;
      animation-delay: 0.2s;
    }
    &:nth-child(5) {
      background-color: #60beeb;
      animation-delay: 0.1s;
    }
    &:nth-child(6) {
      background-color: #fbef5a;
      animation-delay: 0s;
    }
  }
  &--text {
    position: absolute;
    top: 200%;
    left: 0;
    right: 0;
    width: v-bind('styles.width');
    margin: auto;
    // text-align: center;

    &:after {
      content: v-bind(loadingText);
      font-weight: bold;
      animation: {
        name: loading-text;
        duration: 3s;
        iteration-count: infinite;
      }
    }
  }

  .loader--text {
    font-weight: bold;
    font-size: 17px;
    animation: {
      name: loading-text;
      duration: 3s;
      iteration-count: infinite;
    }
  }
}
@keyframes loader {
  15% {
    transform: translateX(0);
  }
  45% {
    transform: translateX($loader--width - $loader-dot--size);
  }
  65% {
    transform: translateX($loader--width - $loader-dot--size);
  }
  95% {
    transform: translateX(0);
  }
}

@keyframes loading-text {
  0% {
    content: v-bind('loadingText');
  }
  25% {
    content: v-bind('loadingText');
  }
  50% {
    content: v-bind('loadingText');
  }
  75% {
    content: v-bind('loadingText');
  }
}
</style>
