<template>
  <Dropdown :trigger="['click']" :placement="'bottomLeft'">
    <div class="option-btn">
      <SettingOutlined />
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
import { MinusOutlined, SettingOutlined } from '@/components/icons'
import { useTabsLayoutStore } from '@/stores/modules/tabs-layout'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

export type TabOptionKeyType = (typeof tabOptionKeyTypes)[keyof typeof tabOptionKeyTypes]

const router = useRouter()
const { t } = useI18n()
const { closeAll, closeOhters } = useTabsLayoutStore()

const tabOptionKeyTypes = {
  CLOSE_ALL: 'closeAll',
  CLOSE_OTHERS: 'closeOthers'
} as const

const tabOptions: { key: TabOptionKeyType; title: string }[] = [
  {
    key: tabOptionKeyTypes.CLOSE_ALL,
    title: t('layout.tabs.closeAll')
  },
  {
    key: tabOptionKeyTypes.CLOSE_OTHERS,
    title: t('layout.tabs.closeAllOthers')
  }
] as const

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
