<template>
  <div class="group-detail-container">
    <List :dataSource="defaultDataSource">
      <template #renderItem="{ item }">
        <ListItem @click="open = true" style="cursor: pointer">
          <ListItemMeta>
            <template #avatar>
              <a-avatar style="color: #1890ff; background: #1890fa2b">
                <template #icon><UserAddOutlined /></template>
              </a-avatar>
            </template>

            <template #title>
              <a href="#">{{ item.name }}</a>
            </template>
          </ListItemMeta>
        </ListItem>
      </template>
    </List>

    <List :dataSource="dataSource" :loading="loading">
      <template #renderItem="{ item }">
        <ListItem>
          <a-skeleton avatar :title="false" :loading="!!item.loading" active>
            <ListItemMeta :description="item.email">
              <template #avatar>
                <a-avatar :src="item.picture?.large" />
              </template>

              <template #title>
                <a href="#">{{ item.name.last }}</a>
              </template>
            </ListItemMeta>
          </a-skeleton>

          <template #actions>
            <!-- <Badge theme="default" shape="squared">{{ item.status.value }}</Badge> -->

            <a-dropdown v-model:open="item.visible">
              <a class="ant-dropdown-link" @click.prevent> <MoreOutlined /> </a>
              <template #overlay>
                <a-menu @click="handleMenuClick">
                  <a-menu-item key="1">
                    <div style="display: flex; gap: 10px">
                      <MinusOutlined />
                      <span>그룹에서 제거</span>
                    </div>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
        </ListItem>
      </template>
    </List>
  </div>
  <contextHolder />

  <a-modal
    v-model:open="open"
    title="그룹에 사용자 추가"
    ok-text="저장"
    cancel-text="취소"
    @ok="onSubmit"
  >
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
    <p>Bla bla ...</p>
  </a-modal>
</template>

<script setup lang="ts" name="ComponentsOverviewList">
import {
  ExclamationCircleOutlined,
  MinusOutlined,
  MoreOutlined,
  UserAddOutlined
} from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'
import { Modal } from 'ant-design-vue'
import { h, onMounted, ref } from 'vue'
// import { Badge } from '@/components/badge'
import { List, ListItem, ListItemMeta } from '@/components/list'

const count = 3
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`

const loading = ref(true)
const open = ref(false)

const defaultDataSource = ref([{ name: '그룹에 사용자 추가' }])
const dataSource = ref([])

const [modal, contextHolder] = Modal.useModal()
onMounted(() => {
  fetch(fakeDataUrl)
    .then((res) => res.json())
    .then((res) => {
      loading.value = false

      dataSource.value = dataSource.value.concat(
        res.results.map((item: {}) => ({
          ...item,
          visible: false
        }))
      )
    })
})

const onSubmit = () => {
  console.log('onSubmit')
}
const showDeleteConfirm = () => {
  modal.confirm({
    title: '사용자를 그룹에서 제거하시겠습니까?',
    icon: h(ExclamationCircleOutlined),
    okText: '삭제',
    okType: 'danger',
    cancelText: '취소',
    onOk() {
      console.log('OK')
      loading.value = true
      setTimeout(() => (loading.value = false), 300)
    },
    onCancel() {
      console.log('Cancel')
    }
  })
}

const handleMenuClick: MenuProps['onClick'] = () => {
  showDeleteConfirm()
}
</script>

<style lang="scss" scoped>
:deep(.ant-list-item-meta-title) {
  margin-bottom: 0 !important;
}

:deep(.list-item-wrapper) {
  &:hover {
    background: #188fff0d;
  }
}
</style>
