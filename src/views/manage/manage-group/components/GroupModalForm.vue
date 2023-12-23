<template>
  <Form>
    <div class="invite-form-wrapper">
      <h4 class="title">{{ t('page.manage.groupName') }}</h4>
      <Input v-model:value="groupInfo.name" />
      <h4 class="title">{{ t('page.manage.groupDescription') }}</h4>
      <Input v-model:value="groupInfo.content" />
      <br />
      <h4 class="title">{{ t('page.manage.addUserToAGroup') }}</h4>
      <SearchSelect
        v-model="groupInfo.addUsers"
        :filterOption="true"
        :options="options"
        width="100%"
      />
    </div>
  </Form>
</template>

<script setup lang="ts">
import { ManageUserService, ManagerGroupService } from '@/services'
import { Input } from 'ant-design-vue'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { IManageUser } from '@/services/manage-users/interface'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import type { SearchSelectProps } from '@/components/search-select/types'

const { t } = useI18n()
const { getWorkspace } = useWorkspaceStore()

const emit = defineEmits(['update:modelValue'])

const groupInfo = ref(groupDefaultInfo())
const options = ref([])

const getUserList = (param: IManageUser.UserListParam) => {
  return ManageUserService.getUserList(getWorkspace.workspaceId, param)
}

;(async () => {
  if (!options.value.length) {
    const {
      data: {
        workspaceUsers: { content }
      }
    } = await getUserList(getWorkspace.workspaceId)
    console.log(content)

    options.value = content.map((item) => ({
      label: item.nickname,
      value: item.nickname,
      prefixImg: item.thumbnail.url,
      workspaceUserId: item.workspaceUserId
    }))
  }
})()

function groupDefaultInfo() {
  return {
    name: null,
    content: null,
    addUsers: []
  }
}

watch(
  () => groupInfo.value,
  (groupInfo) => {
    console.log(groupInfo)
    emit('update:modelValue', groupInfo)
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.ant-input {
  margin-bottom: 12px !important;
}
</style>
