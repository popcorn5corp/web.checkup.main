<script setup lang="ts" name="CircularMenu">
import { computed, onMounted } from 'vue'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'

const { config } = useProjectConfigStore()
const circularMenuColor = computed(() => config.theme.primaryColor)

onMounted(() => {
  setTimeout(() => {
    document.getElementById('circularMenu')?.classList.add('active')
  }, 300)

  setTimeout(() => {
    document.getElementById('circularMenu')?.classList.remove('active')
  }, 2000)
})
</script>
<template>
  <div id="circularMenu" class="circular-menu circular-menu-left">
    <a
      class="floating-btn"
      onclick="document.getElementById('circularMenu').classList.toggle('active');"
    >
      <font-awesome-icon icon="fa-solid fa-circle-info" size="xl" beat />
    </a>

    <menu class="items-wrapper">
      <a href="#" class="menu-item"> <font-awesome-icon :icon="['fas', 'comments']" size="xl" /></a>
      <a href="#" class="menu-item"> <font-awesome-icon :icon="['fas', 'headset']" size="xl" /></a>
      <!-- <a href="#" class="menu-item"> <font-awesome-icon :icon="['fas', 'download']" size="xl" /></a> -->
      <a href="#" class="menu-item">
        <font-awesome-icon :icon="['fas', 'circle-play']" size="xl"
      /></a>
      <a href="#" class="menu-item">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" size="xl"
      /></a>
    </menu>
  </div>
</template>
<style lang="scss" scoped>
.circular-menu {
  position: fixed;
  bottom: 1em;
  right: 1em;
  z-index: 999;
}

.circular-menu .floating-btn {
  // display: block;
  width: 3.5em;
  height: 3.5em;
  border-radius: 50%;
  background-color: hsl(4, 98%, 60%);
  box-shadow: 0 2px 5px 0 hsla(0, 0%, 0%, 0.26);
  color: hsl(0, 0%, 100%);
  text-align: center;
  line-height: 3.5;
  cursor: pointer;
  outline: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circular-menu.active .floating-btn {
  box-shadow: inset 0 0 3px hsla(0, 0%, 0%, 0.3);
}

.circular-menu .floating-btn:active {
  box-shadow: 0 4px 8px 0 hsla(0, 0%, 0%, 0.4);
}

.circular-menu .floating-btn i {
  font-size: 1.3em;
  transition: transform 0.2s;
}

.circular-menu.active .floating-btn i {
  transform: rotate(-45deg);
}

.circular-menu:after {
  display: block;
  content: ' ';
  width: 3.5em;
  height: 3.5em;
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: -2;
  background-color: hsl(4, 98%, 60%);
  transition: all 0.3s ease;
}

.circular-menu.active:after {
  transform: scale3d(5.5, 5.5, 1);
  transition-timing-function: cubic-bezier(0.68, 1.55, 0.265, 1);
}

.circular-menu .items-wrapper {
  padding: 0;
  margin: 0;
}

.circular-menu .menu-item {
  position: absolute;
  top: 0.2em;
  right: 0.2em;
  z-index: -1;
  display: block;
  text-decoration: none;
  color: hsl(0, 0%, 100%);
  font-size: 1em;
  width: 3em;
  height: 3em;
  border-radius: 50%;
  text-align: center;
  line-height: 3;
  background-color: hsla(0, 0%, 0%, 0.1);
  transition: transform 0.3s ease, background 0.2s ease;
}

.circular-menu .menu-item:hover {
  background-color: hsla(0, 0%, 0%, 0.3);
}

.circular-menu.active .menu-item {
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.circular-menu.active .menu-item:nth-child(1) {
  transform: translate3d(1em, -7em, 0);
}

.circular-menu.active .menu-item:nth-child(2) {
  transform: translate3d(-3.5em, -6.3em, 0);
}

.circular-menu.active .menu-item:nth-child(3) {
  transform: translate3d(-6.5em, -3.2em, 0);
}

.circular-menu.active .menu-item:nth-child(4) {
  transform: translate3d(-7em, 1em, 0);
}

/**
 * The other theme for this menu
 */

.circular-menu.circular-menu-left {
  right: auto;
  left: 1em;
}

.circular-menu.circular-menu-left .floating-btn {
  background-color: v-bind('circularMenuColor');
}

.circular-menu.circular-menu-left:after {
  background-color: v-bind('circularMenuColor');
}

.circular-menu.circular-menu-left.active .floating-btn i {
  transform: rotate(90deg);
}

.circular-menu.circular-menu-left.active .menu-item:nth-child(1) {
  transform: translate3d(-1em, -7em, 0);
}

.circular-menu.circular-menu-left.active .menu-item:nth-child(2) {
  transform: translate3d(3.5em, -6.3em, 0);
}

.circular-menu.circular-menu-left.active .menu-item:nth-child(3) {
  transform: translate3d(6.5em, -3.2em, 0);
}

.circular-menu.circular-menu-left.active .menu-item:nth-child(4) {
  transform: translate3d(7em, 1em, 0);
}
</style>
