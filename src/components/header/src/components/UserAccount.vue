<template>
  <div class="user-account" v-if="!isLoading">
    <!-- <MenuHeader :collapsed="false" /> -->
    <!-- 보기 모드 -->
    <Form v-bind="formItemLayout" class="form-wrapper read-mode" v-if="!isEdit">
      <div class="profile-wrapper">
        <div class="img-wrapper">
          <img :src="formState.data.profile" />
        </div>
      </div>
      <FormItem :label="$t('page.userAccount.profileName')" name="nickname">
        <!-- 프로필명 -->
        {{ formState.data.nickname }}
      </FormItem>
      <FormItem :label="$t('common.idText')" name="id">
        <!-- 아이디 -->
        <span v-if="isSocialUser">
          <img :src="socialImg" class="social-img" />
        </span>
        <span>{{ formState.data.email }}</span>
      </FormItem>
      <FormItem :label="$t('common.name')" name="name">
        <!-- 이름 -->
        {{ formState.data.email }}
      </FormItem>
      <FormItem :label="$t('common.phone')" name="phone">
        <!-- 휴대폰 -->
        {{ formState.data.email }}
      </FormItem>
      <FormItem :label="$t('common.email')" name="email">
        <!-- 이메일 -->
        {{ formState.data.email }}
      </FormItem>

      <Dropdown
        v-model:open="dropdownOpen"
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

    <!-- 수정 모드 -->
    <Form
      v-else
      ref="formRef"
      layout="horizontal"
      class="form-wrapper edit-mode"
      :model="formState.cloneData"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <FormItem name="profile">
        <UserProfile v-model:url="formState.cloneData.profile" />
      </FormItem>
      <!-- 프로필명 -->
      <FormItem
        name="nickname"
        :label="$t('page.userAccount.profileName')"
        :rules="[{ required: true, message: $t('message.validate.checkProfileName') }]"
      >
        <Input v-model:value="formState.cloneData.nickname" :max="10" />
      </FormItem>
      <!-- 아이디 -->
      <template v-if="isSocialUser">
        <FormItem :label="$t('common.idText')" name="id">
          <span><img :src="socialImg" class="social-img" /></span>
          <span>{{ formState.cloneData.email }}</span>
        </FormItem>
      </template>
      <template v-else>
        <FormItem
          :label="$t('common.idText')"
          name="id"
          :rules="[{ required: true, message: $t('message.validate.checkId') }]"
        >
          <Input v-model:value="formState.cloneData.email" />
        </FormItem>
      </template>
      <template v-if="!isSocialUser">
        <!-- 비밀번호 -->
        <FormItem :label="$t('common.passwordText')" type="password" name="password">
          <Button
            :label="$t('component.button.changePassword')"
            @click="passwordVisible = true"
            v-if="!isPasswordOk"
          />
          <Input v-else v-model:value="formState.cloneData.email" :max="15" :min="8" />
          <template #validText> {{ $t('message.validate.checkSetPassword') }} </template>
        </FormItem>
        <!-- 비밀번호 확인 -->
        <FormItem
          v-if="isPasswordOk"
          :label="$t('common.rePasswordText')"
          :isError="isError.varifyPassword"
        >
          <Input v-model:value="formState.cloneData.email" @input="onVerifyPassword" />
          <template #validText> {{ $t('message.validate.checkVerifyPassword') }} </template>
        </FormItem>
      </template>

      <!-- 이름 -->
      <FormItem :label="$t('common.name')" name="name">
        <!-- :rules="[{ required: true, message: $t('message.validate.checkName') }]" -->
        <Input v-model:value="formState.cloneData.email" :disabled="true" />
      </FormItem>
      <!-- 휴대폰 -->
      <FormItem :label="$t('common.phone')" name="phone">
        <!-- :rules="[{ required: true, message: $t('message.validate.checkPhone') }]" -->
        <div class="input-wrapper">
          <Input v-model:value="formState.cloneData.email" :disabled="true" />
          <Button
            class="btn"
            :label="$t('component.button.change')"
            @click="onCheckPhone"
            size="small"
          >
            <!-- TODO 본인인증 -->
            <!-- <template #icon v-if="isConfirm">
            <CheckOutlined />
          </template> -->
          </Button>
        </div>
      </FormItem>
      <!-- 이메일 -->
      <FormItem :label="$t('common.email')" name="email" :isError="isError.email">
        <Input v-model:value="formState.cloneData.email" @change="onValidEmail" />
        <template #validText>{{ $t('message.validate.checkEmail') }}</template>
      </FormItem>
      <div class="btn-wrapper">
        <Button type="primary" :label="$t('component.button.ok')" html-type="submit" />
        <Button @click="onCancel" :label="$t('component.button.cancel')" />
      </div>
    </Form>

    <contextHolder />
  </div>

  <!-- 비밀번호 변경 버튼 클릭 시 비밀번호 확인 모달 -->
  <Modal v-model:open="passwordVisible" :width="400" centered>
    <div style="text-align: center; padding: 1rem; font-size: 15px">
      {{ $t('page.userAccount.passwordConfirm') }}
    </div>
    <FormItem>
      <Input :placeholder="$t('message.validate.checkInputPassword')" />
      <template #validText>{{ $t('message.validate.checkCorrectPassword') }}</template>
    </FormItem>
    <template #footer>
      <div class="btn-wrapper" style="display: flex; justify-content: center; gap: 7px">
        <Button type="primary" :label="$t('component.button.ok')" @click="onPasswordOk" />
        <Button :label="$t('component.button.cancel')" @click="passwordVisible = false" />
      </div>
    </template>
  </Modal>
</template>

<script lang="ts" setup name="UserAccount">
import NaverIcon from '@/assets/images/btnG_icon_square.png'
import GoogleIcon from '@/assets/svgs/google_g_logo.svg.webp'
import KakaoIcon from '@/assets/svgs/kakaotalk.svg'
import { Util } from '@/utils'
import { Dropdown, Menu, MenuItem, Modal } from 'ant-design-vue'
import { cloneDeep, isEqual } from 'lodash-es'
import { storeToRefs } from 'pinia'
import { h, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useWorkspaceStore } from '@/stores/modules/workspace'

import { Button } from '@/components/button'
import { Form } from '@/components/form'
import {
  DeleteOutlined,
  FormOutlined,
  MoreOutlined,
  QuestionCircleTwoTone
} from '@/components/icons'
import { Input } from '@/components/input'

import UserProfile from './UserProfile.vue'

interface WorkspaceUsers {
  nickname: string
  email: string
  profile: string
}
interface FormState {
  data: WorkspaceUsers
  cloneData: WorkspaceUsers
}

const { t } = useI18n()
const [modal, contextHolder] = Modal.useModal()

const { getWorkspace } = storeToRefs(useWorkspaceStore())

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 9 }
}

const isLoading = ref(false)
const isEdit = ref(false)

const dropdownOpen = ref(false)
const passwordVisible = ref(false)

const isPasswordOk = ref(false)

const isSocialUser = ref(false)
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
const socialImg = ref()
const socialTypes = reactive({
  google: { icon: GoogleIcon },
  naver: { icon: NaverIcon },
  kakao: { icon: KakaoIcon }
})
const isError = reactive({
  email: false,
  varifyPassword: false
})

;(async () => {
  isLoading.value = true
  formState.data = {
    ...getWorkspace.value.user
  }
  formState.cloneData = cloneDeep(getWorkspace.value.user)
  isLoading.value = false

  // // TODO 소셜 타입 이미지 넣기
  // socialImg.value = socialTypes[data.socialType].icon
  socialImg.value = socialTypes.google.icon
})()

const initState = () => {
  dropdownOpen.value = false
  isEdit.value = false
  isPasswordOk.value = false

  // TODO 처음 데이터 다시 받아오기
  formState.cloneData = cloneDeep(getWorkspace.value.user)
}

const onCancel = () => {
  if (!isEqual(formState.data, formState.cloneData)) {
    modal.confirm({
      title: h('pre', t('page.userAccount.closeEditModal')),
      icon: h(QuestionCircleTwoTone),
      onOk() {
        initState()
      }
    })
  } else initState()
}

const onVerifyPassword = (e: Event) => {
  // TODO 비밀번호 확인 필드
  const value = (e.target as HTMLInputElement).value

  // isError.varifyPassword = (formState.cloneData.password !== formState.cloneData.verifyPassword)
}

const onValidEmail = (e: Event) => {
  const value = (e.target as HTMLInputElement).value

  const validateEmail = Util.Validate.isEmail(value)

  isError.email = !validateEmail
}

const onPasswordOk = () => {
  // TODO 비밀번호 맞는지 확인
  isPasswordOk.value = true
  passwordVisible.value = false
}

const onCheckPhone = () => {
  // TODO 본인인증
}

const onFinish = (values: any) => {
  console.log('on finish', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('failed', errorInfo)
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

  .social-img {
    width: 25px;
    margin-right: 5px;
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
:deep(.file-uplaod-wrapper) {
  .anticon {
    display: none;
  }
  button {
    border: none !important;
    padding: 0 !important;
    span {
      margin: 0;
    }
  }
}
</style>
