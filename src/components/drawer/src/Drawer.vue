<template>
  <div v-if="openDetail" style="position: relative; height: 100%" class="drawer-wrapper">
    <div class="drawer-mask" v-if="mask"></div>
    <Transition :name="`drawer-${drawerPosition}`" appear>
      <div class="drawer" :class="drawerClasses">
        <div class="title-wrapper">
          <span>
            {{ drawerTitle }}
          </span>
          <Button :size="'large'" style="float: right" @click="emit('onClose')">
            <template #icon>
              <font-awesome-icon class="xmark" :icon="['fas', 'xmark']" />
            </template>
          </Button>
        </div>
        <Divider style="margin-top: 0" />
        <slot name="drawerContent" />
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts" name="Drawer">
import { Divider } from 'ant-design-vue'
import { computed } from 'vue'
import type { DrawerProps } from '../types'

const emit = defineEmits(['onClose'])
const props = withDefaults(defineProps<DrawerProps>(), {
  drawerPosition: 'right'
})

const drawerStyles = computed(() => {
  const { drawerWidth, top, minHeight } = props
  console.log('dddd', drawerWidth)
  return {
    width: drawerWidth ?? '100%',
    height: minHeight ?? '100%',
    top
  }
})

const drawerClasses = computed(() => [
  props.drawerPosition === 'left' ? 'left' : 'right',
  props.openDetail ? 'active' : '',
  props.mask ? 'full-height' : ''
])
</script>
<style lang="scss" scoped>
.drawer-mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 998;
}
.drawer {
  width: v-bind('drawerStyles.width');
  min-height: calc(v-bind('drawerStyles.height'));
  position: absolute;
  top: v-bind('drawerStyles.top');
  background-color: $color-white;
  transition: all 0.3s;
  box-shadow: $elevation-4;

  > .title-wrapper {
    display: flex;
    font-size: 16px;
    font-weight: bold;
    justify-content: space-between;
    padding: 19.5px;
    align-items: center;

    .ant-btn {
      border: none;
      box-shadow: none;
      font-size: 17px;
    }
  }
}

.drawer.right {
  border-left: 0.5px solid $color-gray-4;
}
.drawer.right.active {
  right: 0;
}

.drawer.left {
  border-right: 0.5px solid $color-gray-4;
}
.drawer.left.active {
  left: 0;
}

.drawer.full-height {
  height: 100vh;
  position: fixed;
  top: 0;
  border: none;
  z-index: 999;
}

// transition
.drawer-right-enter-from {
  opacity: 0;
  translate: 500px 0;
}
.drawer-left-enter-from {
  opacity: 0;
  translate: -500px 0;
}

.drawer-right-enter-to {
  opacity: 1;
  translate: 0 0;
}
.drawer-left-enter-to {
  opacity: 1;
  translate: 0 0;
}

.drawer-right-leave-from {
  translate: 0 0;
}
.drawer-left-leave-from {
  translate: 0 0;
}
</style>
