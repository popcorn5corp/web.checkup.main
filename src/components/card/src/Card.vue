<template>
  <div class="card-container">
    <!-- <template v-if="tabList">
      <Card
        style="width: 100%"
        title="Card title"
        :tab-list="tabList"
        :active-tab-key="key"
        @tabChange="(key) => onTabChange(key, 'key')"
      >
        <template #customTab="item">
          <span v-if="item.key === 'tab1'">
            <component :is="item.icon" />
            {{ item.key }}
          </span>
        </template>
        <template #extra>
          <a href="#">More</a>
        </template>
        {{ contentList[key] }}
      </Card>
    </template> -->
    <!-- 사이즈, 스타일, 그리드, 이너카드, 로딩카드, 속성(cover, avatar, title and description),
    타이틀없는, 안에 탭  -->
    <!-- :loading="isLoading" -->
    <Card :title="props.title" :size="props.size">
      <template #extra v-if="props.extraText">
        <a :href="props.extraUrl || '#'">{{ props.extraText }}</a>
      </template>

      <template #cover v-if="props.imgUrl">
        <img alt="cover" :src="props.imgUrl" />
      </template>
      <template v-if="props.content">
        {{ props.content }}
      </template>
      <!-- <p>card content</p>
      <p>card content</p>
      <p>card content</p> -->
      <!-- <template>
          <template v-if="props.gridWidth">
            <a-card-grid style="width: 25%; text-align: center">{{ props.content }}</a-card-grid>
          </template>
          <template v-else>
            <div>{{ props.content }}</div>
          </template>
        </template> -->
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { Card } from 'ant-design-vue'
import { ref, watch } from 'vue'
import type { CardProps } from '../types'

// const props = defineProps<CardProps>()
const props = withDefaults(defineProps<CardProps>(), {
  key: '',
  size: 'default'
})
console.log(props)

const isLoading = ref(false)

// watch(
//   () => props.card
// )
</script>

<style lang="scss" scoped></style>
