<template>
  <div class="drawer-container" ref="containerRef">
    <div ref="contentRef" class="content">
      <div
        v-if="drawerPosition === 'left'"
        class="resizer-line"
        ref="resizerRef"
        id="resizer"
        @mouseover="isResizerActive = true"
        @mouseleave="isResizerActive = false"
        :class="resizerClasses"
        :style="{
          cursor: resizerCursor
        }"
      />
      <slot></slot>
    </div>
    <Transition name="drawerContainer" appear>
      <div ref="drawerRef" class="drawer" :class="drawerClasses">
        <div
          v-if="drawerPosition === 'right'"
          class="resizer-line"
          ref="resizerRef"
          id="resizer"
          @mouseover="isResizerActive = true"
          @mouseleave="isResizerActive = false"
          :class="resizerClasses"
          :style="{
            cursor: resizerCursor
          }"
        />

        <Drawer
          v-if="openDetail"
          minHeight="calc(100vh - 165px + 15px)"
          :resize="true"
          :floating="false"
          :mask="false"
          :openDetail="openDetail"
          :drawerTitle="drawerTitle"
          @onClose="emit('update:openDetail', false)"
        >
          <template #drawerContent>
            <slot name="drawerContent" />
          </template>
        </Drawer>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts" name="DrawerContainer">
// import { useDynamicTableContext } from '@/components/dynamic-table/hooks/useDynamicTableContext'
import { computed, ref, watch } from 'vue'
import { Drawer } from '@/components/drawer'
import type { DrawerContainerProps } from '../types'

// const { closeFilter, closeDetail } = useDynamicTableContext()
const emit = defineEmits(['update:openDetail'])
const props = withDefaults(defineProps<DrawerContainerProps>(), {
  drawerWidth: '30%',
  resize: true,
  drawerPosition: 'right'
})

const isResizerActive = ref(false)
const resizerRef = ref()
const contentRef = ref()
const drawerRef = ref()
const containerRef = ref()

const contentWidth = computed(() => `${100 - parseInt(props.drawerWidth)}%`)
const contentStyles = computed(() => {
  const { floating, openDetail, drawerPosition } = props
  return {
    paddingRight: !floating && openDetail && drawerPosition === 'right' ? '20px' : '0',
    paddingLeft: !floating && openDetail && drawerPosition === 'left' ? '20px' : '0',
    width: openDetail && !floating ? contentWidth.value : '100%',
    maxWidth: openDetail && !floating ? contentWidth.value : '100%',
    float: drawerPosition === 'left' ? 'right' : ''
  }
})
const drawerStyles = computed(() => {
  const { drawerWidth } = props
  return {
    width: drawerWidth,
    minWidth: drawerWidth
  }
})

const resizerClasses = computed(() => ({
  active: props.resize && isResizerActive.value
}))
const drawerClasses = computed(() => [
  props.drawerPosition === 'left' ? 'left' : 'right',
  props.openDetail ? 'active' : '',
  props.floating && props.mask ? 'full-height' : ''
])

const resizerCursor = computed(() => (props.resize ? 'col-resize' : 'default'))

const resizingHandler = () => {
  let startX = 0
  let drawerWidth = 0
  let containerWidth = 0
  /**
   * @description resizer에 마우스 이벤트가 발생하면 실행하는 Handler
   */
  const mouseDownHandler = (e: MouseEvent) => {
    // 마우스 위치값을 가져와 x, y에 할당
    startX = e.clientX

    // Element에 Viewport 상 width 값을 넣어줌
    drawerWidth = drawerRef.value?.getBoundingClientRect().width
    containerWidth = containerRef.value?.getBoundingClientRect().width

    // 마우스 이동과 해제 이벤트를 등록
    window.addEventListener('mousemove', mouseMoveHandler)
    window.addEventListener('mouseup', mouseUpHandler)
  }

  /**
   * @description 마우스가 이동하면 발생하면 실행하는 Handler
   */
  const mouseMoveHandler = (e: MouseEvent) => {
    if (!contentRef.value || !drawerRef.value || !containerRef.value) return
    const { floating, drawerPosition, resizeOption } = props

    // 크기 조절 중 마우스 커서를 변경함(container 영역으로)
    containerRef.value.style.cursor = 'col-resize'
    // 크기 조절 중 양쪽 영역에서 마우스 이벤트&transition 방지하기 위해 추가
    setElementStyles('none', 'none', 'none')

    let newDrawerWidth = 0
    const dx = floating ? startX - e.clientX : e.clientX - startX

    if (drawerPosition === 'right') {
      // 오른쪽 drawer 너비 재정의
      newDrawerWidth = floating
        ? ((drawerWidth + dx) * 100) / containerWidth
        : ((drawerWidth - dx) * 100) / containerWidth
      drawerRef.value.style.width = `${newDrawerWidth}%`
    } else {
      // 왼쪽 drawer 너비 재정의
      newDrawerWidth = floating
        ? ((drawerWidth - dx) * 100) / containerWidth
        : ((drawerWidth + dx) * 100) / containerWidth
      drawerRef.value.style.width = `${newDrawerWidth}%`
    }
    if (!floating && resizeOption === 'push') {
      // 밀면서 들어오기 content 너비 재정의
      const newContentWidth = 100 - newDrawerWidth
      contentRef.value.style.width = `${newContentWidth}%`
    }
  }

  /**
   * @description 마우스를 떼면 이벤트가 발생하면 실행하는 Handler
   */
  const mouseUpHandler = () => {
    // 마우스 커서 되돌려놓기
    resizerRef.value.style.removeProperty('cursor')
    containerRef.value.style.removeProperty('cursor')

    // 마우스 이벤트 되돌려놓기
    setElementStyles('', '', 'all 0.3s')

    // 등록한 마우스 이벤트를 제거
    window.removeEventListener('mousemove', mouseMoveHandler)
    window.removeEventListener('mouseup', mouseUpHandler)
  }

  const setElementStyles = (userSelect: string, pointEvents: string, tansition: string) => {
    if (contentRef.value && drawerRef.value) {
      contentRef.value.style.userSelect = userSelect
      contentRef.value.style.pointerEvents = pointEvents
      contentRef.value.style.transition = tansition
      drawerRef.value.style.userSelect = userSelect
      drawerRef.value.style.pointerEvents = pointEvents
      drawerRef.value.style.transition = tansition
    }
  }

  // 마우스 down 이벤트를 등록
  resizerRef.value?.addEventListener('mousedown', mouseDownHandler)
}

watch(
  () => resizerRef,
  () => {
    if (props.resize) {
      resizingHandler()
    }
  },
  { immediate: true, deep: true }
)

watch(
  () => props.openDetail,
  (openDetail) => {
    if (!openDetail) {
      contentRef.value.style.width = '100%'
      drawerRef.value.style.width = '0'
    }
  }
)
</script>

<style lang="scss" scoped>
$container-min-height: calc(100vh - 160px);
$header-btns-height: 15px;
$transition: all 0.3s;

.drawer-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  .resizer-line {
    width: 5px;
    height: 100%;
    min-height: $container-min-height;
    position: absolute;
    top: 0;
    user-select: none;
    cursor: col-resize;
    transition: $transition;
    z-index: 9;
  }
  .resizer-line::after {
    content: '';
    width: 13px;
    height: 100%;
    position: absolute;
    top: 0;
    left: -3px;
  }
  .resizer-line.active {
    background-color: $color-blue-5;
    box-shadow: $elevation-2;
  }

  .content {
    width: v-bind('contentStyles.width');
    height: 100%;
    max-width: v-bind('contentStyles.maxWidth');
    min-width: 10%;
    float: v-bind('contentStyles.float');
    padding-right: v-bind('contentStyles.paddingRight');
    padding-left: v-bind('contentStyles.paddingLeft');
    transition: $transition;
    position: relative;

    .resizer-line {
      min-height: $container-min-height;
      top: -15px;
      left: 0;
    }
  }

  .drawer {
    width: v-bind('drawerStyles.width');
    min-width: v-bind('drawerStyles.minWidth');
    min-height: calc($container-min-height + $header-btns-height);
    max-width: 90%;
    position: absolute;
    top: -$header-btns-height;
    z-index: 1000;
    background: $color-white;
    box-sizing: border-box;
    overflow: hidden;
    transition: $transition;

    > .title-wrapper {
      display: flex;
      font-size: 16px;
      font-weight: bold;
      justify-content: space-between;
      padding: 19.5px;
      align-items: end;
    }
  }

  .drawer.active {
    box-shadow: $elevation-4;
  }

  .drawer.right {
    right: -100%;
  }
  .drawer.right.active {
    right: 0;
  }

  .drawer.left {
    left: -100%;
  }
  .drawer.left.active {
    left: 0;
  }

  .drawer.full-height {
    height: 100vh;
    position: fixed;
    top: 0;
    border: none;
  }
}

// transition
.drawerContainer-enter-from {
  opacity: 0;
  translate: 500px 0;
}
.drawerContainer-enter-to {
  opacity: 1;
  translate: 0 0;
}
.drawerContainer-leave-from {
  translate: 0 0;
}
</style>
