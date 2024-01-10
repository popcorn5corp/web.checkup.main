<template>
  <Form>
    <div class="invite-form-wrapper">
      <Input v-model:value="groupInfo.name" :label="t('page.manage.groupName')" />

      <Input v-model:value="groupInfo.content" :label="t('page.manage.groupDescription')" />

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
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { IManageGroup } from '@/services/manage-group/interface'
import type { IManageUser } from '@/services/manage-users/interface'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import { Form } from '@/components/form'
import { Input } from '@/components/input'
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
