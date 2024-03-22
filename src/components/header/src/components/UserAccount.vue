<template>
  <div class="user-account" v-if="!isLoading">
    <!-- <MenuHeader :collapsed="false" /> -->
    <Form v-bind="formItemLayout" class="form-wrapper read-mode" v-if="!isEdit">
      <div class="profile-wrapper">
        <div class="img-wrapper">
          <img :src="getWorkspace?.user.profile" />
        </div>
      </div>
      <FormItem label="프로필명" name="nickname">
        <!-- 프로필명 -->
        {{ getWorkspace?.user.nickname }}
      </FormItem>
      <FormItem :label="$t('common.idText')" name="id">
        <!-- 아이디 -->
        {{ getWorkspace?.user.email }}
      </FormItem>
      <FormItem :label="$t('common.name')" name="name">
        <!-- 이름 -->
        {{ getWorkspace?.user.email }}
      </FormItem>
      <FormItem :label="$t('common.phone')" name="phone">
        <!-- 휴대폰 -->
        {{ getWorkspace?.user.email }}
      </FormItem>
      <FormItem :label="$t('common.email')" name="email">
        <!-- 이메일 -->
        {{ getWorkspace?.user.email }}
      </FormItem>

      <Dropdown
        v-model:open="visible"
        :trigger="['click']"
        placement="bottomRight"
        class="set-mode"
      >
        <a class="ant-dropdown-link" @click.prevent><MoreOutlined style="font-size: 20px" /></a>
        <template #overlay>
          <Menu @click="isEdit = true">
            <MenuItem key="1">
              <!-- 수정 -->
              <span class="item edit"><FormOutlined />{{ $t('component.button.edit') }}</span>
            </MenuItem>
            <MenuItem key="2">
              <!-- 삭제 -->
              <span class="item delete"><DeleteOutlined />{{ $t('component.button.delete') }}</span>
            </MenuItem>
          </Menu>
        </template>
      </Dropdown>
    </Form>

    <Form
      v-else
      ref="formRef"
      layout="horizontal"
      class="form-wrapper edit-mode"
      :model="formState"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      @submit="onSubmit"
    >
      <div class="profile-wrapper">
        <Dropdown :trigger="['click']" placement="bottomLeft">
          <a class="ant-dropdown-link" @click.prevent>
            <EditOutlined style="font-size: 20px" />
            {{ $t('component.button.edit') }}
          </a>
          <template #overlay>
            <Menu>
              <MenuItem key="1" @click="isProfileImgOpen = true">
                <span>{{ $t('component.button.selectImgBtn') }}</span>
              </MenuItem>
              <MenuItem key="2">
                <span>{{ '내 파일에서 업로드' }}</span>
              </MenuItem>
            </Menu>
          </template>
        </Dropdown>
        <div class="img-wrapper">
          <img :src="formState.data.profile" />
        </div>
      </div>
      <FormItem
        label="프로필명"
        name="nickname"
        :rules="[{ required: true, message: '프로필명은 10자 이내로 입력해주세요.' }]"
      >
        <!-- 프로필명 -->
        <Input v-model:value="formState.data.nickname" />
      </FormItem>
      <FormItem
        :label="$t('common.idText')"
        name="id"
        :rules="[{ required: true, message: '영문/숫자 4~15자로 입력해주세요.' }]"
      >
        <!-- 아이디 -->
        <Input v-model:value="formState.data.email" />
      </FormItem>
      <FormItem
        :label="$t('common.passwordText')"
        name="password"
        :rules="[{ message: '영문,숫자,특수문자 8~15자로 입력해주세요.' }]"
      >
        <!-- 비밀번호 -->
        <Button label="비밀번호 변경" @click="isPasswordOpen = true" v-if="!isPasswordOk" />
        <Input v-model:value="formState.data.email" v-else />
      </FormItem>
      <FormItem label="비밀번호 확인" v-if="isPasswordOk">
        <Input v-model:value="formState.data.email" />
        <template #validText> {{ '비밀번호가 일치하지 않습니다.' }} </template>
      </FormItem>
      <FormItem
        :label="$t('common.name')"
        name="name"
        :rules="[{ required: true, message: '이름 에러' }]"
      >
        <!-- 이름 -->
        <Input v-model:value="formState.data.email" />
      </FormItem>
      <FormItem
        :label="$t('common.phone')"
        name="phone"
        :rules="[{ required: true, message: '휴대폰 에러' }]"
      >
        <!-- 휴대폰 -->
        <div class="input-wrapper">
          <Input v-model:value="formState.data.email" />
          <Button class="btn" label="변경" @click="onCheckPhone" size="small">
            <!-- <template #icon v-if="isConfirm">
            <CheckOutlined />
          </template> -->
          </Button>
        </div>
      </FormItem>
      <FormItem :label="$t('common.email')" name="email">
        <!-- 이메일 -->
        <Input v-model:value="formState.data.email" @input="onValidEmail" />
      </FormItem>
      <div class="btn-wrapper">
        <Button type="primary" label="확인" html-type="submit" />
        <Button @click="initState" label="취소" />
      </div>
    </Form>

    <contextHolder />
  </div>

  <Modal v-model:open="isPasswordOpen" :width="400" centered>
    <div style="text-align: center; padding: 1rem; font-size: 15px">
      개인정보 보호를 위해
      <br />
      비밀번호를 확인합니다.
    </div>
    <FormItem>
      <Input placeholder="비밀번호를 입력해주세요." />
      <template #validText>올바른 비밀번호를 입력해주세요.</template>
    </FormItem>
    <template #footer>
      <div class="btn-wrapper" style="display: flex; justify-content: center; gap: 7px">
        <Button type="primary" label="입력" @click="onVerifyPasswordOk" />
        <Button label="취소" @click="isPasswordOpen = false" />
      </div>
    </template>
  </Modal>

  <ProfileSelectModal
    :modalVisible="isProfileImgOpen"
    v-model:selectImg="formState.data.profile"
    @cancel="isProfileImgOpen = false"
  />
</template>

<script lang="ts" setup name="UserAccount">
import { Dropdown, Menu, MenuItem, Modal } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

import { useWorkspaceStore } from '@/stores/modules/workspace'

import ProfileSelectModal from '@/views/workspace/components/ProfileSelectModal.vue'

import { Button } from '@/components/button'
import { Form } from '@/components/form'
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  FormOutlined,
  MoreOutlined
} from '@/components/icons'
import { Input } from '@/components/input'

// import MenuHeader from '@/components/menu/src/components/MenuHeader.vue'

interface WorkspaceUsers {
  nickname: string
  email: string
  profile: string
}
interface FormState {
  data: WorkspaceUsers
  cloneData: WorkspaceUsers
}

const [modal, contextHolder] = Modal.useModal()

const { getWorkspace } = storeToRefs(useWorkspaceStore())

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 9 }
}

const isLoading = ref(false)
const isEdit = ref(false)
const visible = ref(false)
const isPasswordOpen = ref(false)
const isPasswordOk = ref(false)
const isProfileImgOpen = ref(false)
const formState = reactive<FormState>({
  data: {
    nickname: '',
    email: '',
    profile: ''
  },
  cloneData: {
    nickname: '',
    email: '',
    profile: ''
  }
})

;(async () => {
  isLoading.value = true
  formState.data = {
    ...getWorkspace.value.user
  }
  formState.cloneData = cloneDeep(getWorkspace.value.user)
  isLoading.value = false
})()

const initState = () => {
  // TODO 변경사항 있을 시 팝업 띄움
  visible.value = false
  isEdit.value = false
  isPasswordOk.value = false
  formState.data = formState.cloneData
}

const onVerifyPasswordOk = () => {
  // TODO 비밀번호 맞는지 확인
  isPasswordOk.value = true
  isPasswordOpen.value = false
}

const onCheckPhone = () => {
  // TODO 본인인증
}

const onValidEmail = () => {
  // TODO email 정규식
}

const onSubmit = (e: Event) => {
  console.log('click onSubmit', e)
}

const onFinish = (values: any) => {
  console.log('on finish', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('on finish failed', errorInfo)
}
</script>

<style lang="scss" scoped>
$img-size: 160px;

.user-account {
  .form-wrapper {
    position: relative;
    .profile-wrapper {
      width: fit-content;
      margin: 0 auto 1rem;
    }
    .img-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: $img-size;
      height: $img-size;
      border: 1px solid $color-gray-5;
      overflow: hidden;
      border-radius: 50%;
      > img {
        width: 100%;
        border-radius: 10px;
      }
    }

    .set-mode {
      position: absolute;
      top: 0;
      right: 0;
    }

    .btn-wrapper {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }
  }
  .form-wrapper.edit-mode {
    .profile-wrapper {
      width: fit-content;
      position: relative;
    }
    .img-wrapper {
      position: relative;
    }
    .ant-dropdown-link {
      position: absolute;
      bottom: 10px;
      right: 0;
      display: flex;
      align-items: center;
      gap: 2px;
      background: $color-white;
      padding: 3px 5px;
      border-radius: 5px;
      border: 1px solid;
      z-index: 2;
    }
    .input-wrapper {
      position: relative;

      .btn {
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
      }
    }
  }

  :deep(.read-mode .ant-form) {
    .form-item-wrapper .ant-form-item .ant-row {
      justify-content: center;
      margin-left: 50px;
    }
  }
  // :deep(.menu-header) {
  //   .user-preview .info {
  //     .name {
  //       color: $color-text-10;
  //     }

  //     .email {
  //       color: $color-gray-7;
  //     }
  //   }
  // }
}
:deep(.item) {
  .anticon {
    margin-right: 5px;
  }
}

:deep(.item.edit) {
  .anticon {
    color: $color-blue-6;
  }
}
:deep(.item.delete) {
  .anticon {
    color: $color-red-6;
  }
}
</style>
