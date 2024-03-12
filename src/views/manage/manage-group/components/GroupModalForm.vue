<template>
  <Form>
    <div class="invite-form-wrapper">
      <FormItem :label="t('page.manage.groupName')" :required="true">
        <Input
          v-model:value="groupInfo.name"
          :maxlength="20"
          :isError="props.isError"
          @change="onChange"
        />
        <div class="errorMsg" v-if="props.isError">
          {{ $t('message.validate.checkGroupName') }}
        </div>
      </FormItem>
      <FormItem :label="t('page.manage.groupDescription')">
        <Input v-model:value="groupInfo.content" :maxlength="50" />
      </FormItem>

      <br />

      <FormItem :label="t('page.manage.addUserToAGroup')">
        <SearchSelect
          v-model="groupInfo.addUsers"
          :filterOption="true"
          :options="options"
          width="100%"
        />
      </FormItem>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { ManageUserService } from '@/services'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import type { IManageGroup } from '@/services/manage-group/types'
import type { IManageUser } from '@/services/manage-users/types'

import { useWorkspaceStore } from '@/stores/modules/workspace'

import { Form } from '@/components/form'
import { Input } from '@/components/input'
import type { SearchSelectProps } from '@/components/search-select/types'

const { t } = useI18n()
const { getWorkspaceId } = useWorkspaceStore()

type GroupInfoType = Pick<IManageGroup.DefaultGroupInfo, 'name' | 'content' | 'addUsers'>
interface Props {
  isError?: boolean
  handleError?: () => void
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['handleError'])

const groupInfo = ref<GroupInfoType>({
  name: '',
  content: '',
  addUsers: []
})

const options = ref<SearchSelectProps['options']>([])

const getUserListAll = async (): Promise<IManageUser.UserInfo[]> => {
  const { data } = await ManageUserService.getUserList(getWorkspaceId as string)

  return data.workspaceUsers.content
}

const getUserOptions = (content: IManageUser.UserInfo[]) => {
  return content.map((item) => ({
    label: item?.nickname,
    value: item?.nickname,
    prefixImg: item?.thumbnail.url,
    workspaceUserId: item?.workspaceUserId
  }))
}

const onChange = (e: Event) => {
  const inputValue = (e.target as HTMLInputElement).value
  if (inputValue) {
    emit('handleError', false)
  }
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
.search-select-container {
  margin: 10px 0;
}
:deep(.custom-input) {
  padding: 6.5px 11px !important;
}
</style>
