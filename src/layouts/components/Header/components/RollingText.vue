<template>
  <div class="rolling-text-wrapper" :style="getSize">
    <ul :style="marqueeStyle" @mouseover="onMouseOver" @mouseleave="onMouseLeave">
      <li v-for="(marquee, index) in marqueeList" :key="index" :style="getSize">
        <slot :marquee="marquee"></slot>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts" name="RollingText">
import { ref, type CSSProperties, computed, onMounted } from 'vue';

interface Props {
  list: Array<{
    title: string
    isNew: boolean;
  }>
  width: number;
  height: number;
  duration: number;
  speed: number;
}

const props = withDefaults(defineProps<Props>(), {
  width: 200,
  height: 35,
  duration: 1000,
  speed: 1000
})

const marqueeList = ref([...props.list, props.list[0]]);
const rollDistance = ref(0);
const marqueeIndex = ref(0);
const transitionSpeed = ref(0);
const rollIntervalTimer = ref();
const rollTimeoutTimer = ref();

const marqueeListLength = computed(() => marqueeList.value.length || 0);
const marqueeStyle = computed<CSSProperties>(() => {
  return {
    transform: `translateY(${rollDistance.value}px)`,
    transitionDuration: `${transitionSpeed.value}ms`,
  };
});

const getSize = computed<CSSProperties>(() => {
  return {
    width: props.width + 'px',
    height: props.height + 'px'
  }
})

onMounted(() => {
  resetRoll();
  startToRoll();
});

const onRolling = (height: number, speed: number): void => {
  rollDistance.value = height;
  transitionSpeed.value = speed;
};

const resetRoll = (): void => {
  marqueeIndex.value = 0;
  rollDistance.value = 0;

  if (rollIntervalTimer.value) clearInterval(rollIntervalTimer.value);
  if (rollTimeoutTimer.value) clearTimeout(rollTimeoutTimer.value);
};

const startToRoll = (): void => {
  rollIntervalTimer.value = setInterval(() => {
    onRolling(++marqueeIndex.value * -props.height, props.speed);

    if (marqueeIndex.value === marqueeListLength.value - 1) {
      rollTimeoutTimer.value = setTimeout(() => {
        onRolling(0, 0);
        marqueeIndex.value = 0;
      }, props.speed);
    }
  }, props.duration);
};

const onMouseOver = (): void => {
  rollIntervalTimer.value && clearInterval(rollIntervalTimer.value);
};

const onMouseLeave = (): void => {
  startToRoll();
};

// watch(
//   () => props.list,
//   (list) => {
//     if (list && list.length) {
//       marqueeList.value = [...list, list[0]] as never[];
//       resetRoll();
//       startToRoll();
//     }
//   },
//   { immediate: true, deep: true }
// );

// const onClickPre = (): void => {
//   if (
//     marqueeIndex.value > 0 &&
//     marqueeIndex.value < marqueeListLength.value - 1
//   ) {
//     marqueeIndex.value = marqueeIndex.value - 1;
//     onRolling(marqueeIndex.value * -props.height, props.speed);
//   }
// };

// const onClickNext = (): void => {
//   if (marqueeIndex.value < marqueeListLength.value - 1) {
//     marqueeIndex.value = marqueeIndex.value + 1;
//     onRolling(marqueeIndex.value * -props.height, props.speed);
//   } else if (marqueeIndex.value === marqueeListLength.value - 1) {
//     onRolling(0, 0);
//     marqueeIndex.value = 0;
//   }
// };

</script>
<style lang="scss" scoped>
.rolling-text-wrapper {
  position: relative;
  overflow: hidden;

  ul {
    padding: 0;
    margin: 0;
    width: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
  }

  li {
    display: inherit;
    list-style: none;
    align-items: center;
    overflow: hidden;
    box-sizing: border-box;

    a {
      display: inline-block;
      width: 100%;
      line-height: 18px;
    }
  }
}
</style>