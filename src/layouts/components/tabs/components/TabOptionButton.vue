<template>
  <Dropdown :trigger="['click']" :placement="'bottomLeft'">
    <div class="option-btn">
      <DownOutlined />
    </div>

    <template #overlay>
      <Menu @click="handleTabOption">
        <MenuItem v-for="option in tabOptions" :key="option.key">
          <MinusOutlined />
          {{ option.title }}
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>
<script setup lang="ts" name="TabOptionButton">
import { Dropdown, Menu, MenuItem, type MenuProps } from 'ant-design-vue'
import { MinusOutlined, DownOutlined } from '@/components/icons'
import { useTabsLayoutStore } from '@/stores/modules/tabs-layout'
import { useRouter } from 'vue-router'
import { tabOptionKeyTypes, tabOptions } from '@/stores/modules/tabs-layout/data'
import type { TabOptionKeyType } from '@/stores/modules/tabs-layout/types'

const router = useRouter()
const { closeAll, closeOhters } = useTabsLayoutStore()

const handleTabOption: MenuProps['onClick'] = ({ key }) => {
  const optionKey = key as TabOptionKeyType

  if (optionKey === tabOptionKeyTypes.CLOSE_ALL) {
    closeAll()
    router.push('/dashboard')
  } else if (optionKey === tabOptionKeyTypes.CLOSE_OTHERS) {
    closeOhters()
  }
}
</script>
<style lang="scss" scoped></style>
