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
import { ManageUserService } from '@/services'
import { Input } from 'ant-design-vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { IManageGroup } from '@/services/manage-group/interface'
import type { IManageUser } from '@/services/manage-users/interface'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import { Form } from '@/components/form'
import type { SearchSelectProps } from '@/components/search-select/types'

const { t } = useI18n()
const { getWorkspaceId } = useWorkspaceStore()

const groupInfo = ref<Partial<IManageGroup.DefaultGroupInfo>>({
  name: undefined,
  content: undefined,
  addUsers: []
})

const options = ref<SearchSelectProps['options']>([])

const getUserListAll = async (): Promise<IManageUser.UserInfo[]> => {
  const { data } = await ManageUserService.getUserList(getWorkspaceId as string)

  return data.workspaceUsers.content
}

const getUserOptions = (content: Partial<IManageUser.UserInfo[]>) => {
  return content.map((item) => ({
    label: item?.nickname,
    value: item?.nickname,
    prefixImg: item?.thumbnail.url,
    workspaceUserId: item?.workspaceUserId
  }))
}

;(() => {
  if (!options.value.length) {
    getUserListAll()
      .then((content) => {
        options.value = getUserOptions(content)
      })
      .catch((error) => console.log(error))
  }
})()

defineExpose({
  getModalInfo: groupInfo.value
})
</script>

<style lang="scss" scoped>
.ant-input {
  margin-bottom: 12px !important;
}
</style>
