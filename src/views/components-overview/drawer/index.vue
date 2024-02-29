<template>
  <div style="width: 100%; height: 100%; overflow: hidden">
    <Button label="drawer 열기" @click="openDetail = true" />
    <Divider />

    <div class="opt-box">
      <h3>drawer 옵션</h3>
      <br />
      <div class="title">drawer 위치</div>
      <br />
      <a-radio-group v-model:value="drawerPosition">
        <a-radio-button value="left">left</a-radio-button>
        <a-radio-button value="right">right</a-radio-button>
      </a-radio-group>
      <br />
      <div class="title">mask 사용여부</div>
      <br />
      <a-radio-group v-model:value="mask">
        <a-radio-button :value="true">true</a-radio-button>
        <a-radio-button :value="false">false</a-radio-button>
      </a-radio-group>
    </div>
    <Drawer
      drawerWidth="500px"
      :drawerPosition="drawerPosition"
      drawerTitle="상세"
      :mask="mask"
      :openDetail="openDetail"
      @onClose="openDetail = false"
    >
      <template #drawerContent>
        <div
          style="
            width: 100%;
            height: 400px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #c7e5fe;
          "
        >
          <span> drawer 영역 </span>
        </div>
      </template>
    </Drawer>
  </div>
</template>

<script setup lang="ts" name="ComponentsOverviewDrawer">
import { Divider } from 'ant-design-vue'
import { ref } from 'vue'
import { Button } from '@/components/button'

const openDetail = ref(false)
const drawerPosition = ref('right')
const mask = ref(false)
</script>

<style scoped lang="scss">
h3 {
  padding: 10px;
  display: inline-block;
}
.opt-box {
  border: 1px solid #ddd;
  width: fit-content;
  padding: 1rem;
}
.title {
  display: inline-block;
  margin: 10px;
}
</style>
