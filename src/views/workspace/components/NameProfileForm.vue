<template>
  <div class="text-wrapper">
    <h2>이름을 입력해주세요</h2>
    <p>
      이름과 프로필 사진을 추가하면<br />팀원이 사용자를 쉽게 알아보고 연결하는 데 도움이됩니다.
    </p>
  </div>
  <div class="form-wrapper">
    <Input placeholder="이름을 입력해주세요." v-model:value="formValues.nickname" :maxlength="50" />
    <div class="profile-wrapper">
      <h3>내 프로필 사진</h3>
      <div class="profile-box">
        <div class="img-wrapper">
          <img :src="selectImg" alt="출처 Freepik" />
        </div>
        <div>
          <p>팀원들이 적절한 사람과 대화하고 있음을<br />알 수 있도록 하세요.</p>
          <div class="btn-wrapper">
            <Button label="기본이미지 선택" class="btn" @click="modalVisible = true" />
            <span> 또는 </span>
            <FileUploader
              ref="fileUploader"
              :show-download="false"
              :showRemove="false"
              :showPreview="false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal
    :open="modalVisible"
    title="프로필 기본이미지 선택"
    width="64%"
    centered
    :bodyStyle="{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem'
    }"
    wrapClassName="modal-wrapper"
    :footer="false"
    @cancel="modalVisible = false"
  >
    <div v-for="img in images" :key="img">
      <div class="profile-img-wrapper">
        <img :src="img" alt="출처 Freepik" class="profile-img" />
        <div class="img-masking" @click="onClickImg(img)">
          <span>선택</span>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import img1 from '@/assets/images/avatar/avatar1.jpg'
import img2 from '@/assets/images/avatar/avatar2.jpg'
import img3 from '@/assets/images/avatar/avatar3.jpg'
import img4 from '@/assets/images/avatar/avatar4.jpg'
import img5 from '@/assets/images/avatar/avatar5.jpg'
import img6 from '@/assets/images/avatar/avatar6.jpg'
import img7 from '@/assets/images/avatar/avatar7.jpg'
import img8 from '@/assets/images/avatar/avatar8.jpg'
import img9 from '@/assets/images/avatar/avatar9.jpg'
import img10 from '@/assets/images/avatar/avatar10.jpg'
import { Input, Modal } from 'ant-design-vue'
import { computed, ref } from 'vue'
import { useWorkspceStore } from '@/stores/modules/workspace'
import { Button } from '@/components/button'
import { FileUploader } from '@/components/file-uploader'

const workspaceStore = useWorkspceStore()
const formValues = computed(() => workspaceStore.formValues)

const fileUploader = ref()
const modalVisible = ref(false)
const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]
const selectImg = ref(img1)

// 파일업로드해서 받은 데이터 받아서 formValues에 넣기

// ;(async () => {
//   workspaceStore

// })()
const onClickImg = (e: any) => {
  console.log(e)
  selectImg.value = e
  modalVisible.value = false
}
</script>

<style lang="scss" scoped>
.profile-wrapper {
  margin-top: 2rem;
  .profile-box {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}
.img-wrapper {
  width: 150px;
  img {
    width: 100%;
  }
}
p {
  color: #888;
  line-height: 1.4;
}
.btn-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.8rem;
  font-size: 15px;
}

:deep(.ant-upload-list) {
  height: auto !important;
}
.profile-img-wrapper {
  position: relative;
  cursor: pointer;
  .img-masking {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(87 86 86 / 40%);
    transition: opacity 0.4s;
    opacity: 0;
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
      background: #fff;
      padding: 5px 10px;
      font-weight: 700;
      border-radius: 1rem;
    }
  }
}
.profile-img-wrapper:hover {
  .img-masking {
    opacity: 1;
  }
}
:deep(.ant-select) {
  width: 100%;
}
:deep(.profile-img) {
  width: 130px;
}

@include xxs {
  .btn-wrapper {
    flex-direction: column;
    gap: 0.4rem;
  }
}
@include xs {
  .btn-wrapper {
    flex-direction: column;
    gap: 0.4rem;
  }
}
@include sm {
  .btn-wrapper {
    flex-direction: column;
    gap: 0.4rem;
  }
}
@include md {
  .btn-wrapper {
    flex-direction: column;
    gap: 0.4rem;
  }
}
</style>
