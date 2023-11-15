<template>
  <div class="text-wrapper">
    <h2>000 워크 스페이스에 참여되었어요!</h2>
    <p>어쩌고저쩌고~~~~~~~~~~~~~~~~~~</p>
  </div>
  <div class="user-wrapper">
    <a-avatar-group
      :max-count="2"
      max-popover-trigger="click"
      size="large"
      :max-style="{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }"
    >
      <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      <a-avatar style="background-color: #f56a00">K</a-avatar>
      <a-tooltip title="Ant User" placement="top">
        <a-avatar style="background-color: #87d068">
          <template #icon><UserOutlined /></template>
        </a-avatar>
      </a-tooltip>
      <a-avatar style="background-color: #1890ff">
        <template #icon><AntDesignOutlined /></template>
      </a-avatar>
    </a-avatar-group>
    이/가 사용중이에요.
  </div>
</template>

<script lang="ts" setup>
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons-vue'
</script>

<style lang="scss">
.user-wrapper {
  text-align: center;
  margin: 1rem 0;
}
</style>
