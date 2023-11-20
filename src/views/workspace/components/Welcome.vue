<template>
  <div id="workspace-container" v-if="props.userName">
    <div class="left">
      <div class="welcome-text-wrapper">
        <h2>
          <span>{{ props.userName }}</span
          >님 환영합니다!
        </h2>
        <p>체크업에 가입해주셔서 감사합니다.</p>
        <p>이제 업무를 시작하기 위해 원하시는 선택지를 선택해주세요.</p>
      </div>
      <img :src="welcomeImg" alt="작가 upklyak / 출처 Freepik" />
    </div>
    <div class="right">
      <div id="container">
        <div class="welcome-btns-wrapper">
          <div v-for="btn in btns" :key="btn.type">
            <div
              :class="`btn-box ${btn.type}-btn-box`"
              @click="onBtnClick(btn.type as WorkspaceStepType)"
            >
              <div class="img">
                <img :src="btn.img" alt="Image by storyset / on Freepik" />
              </div>
              <div class="text">{{ btn.text }}</div>
              <span class="arrow"><ArrowRightOutlined /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import welcomeImg from '@/assets/images/workspace2.png'
import createImg from '@/assets/images/workspace_create.png'
import inviteImg from '@/assets/images/workspace_invite.png'
import { ArrowRightOutlined } from '@ant-design/icons-vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useWorkspceStore } from '@/stores/modules/workspace'
import { type WorkspaceStepType } from '@/stores/modules/workspace'

const router = useRouter()
const workspaceStore = useWorkspceStore()

const props = defineProps({
  userName: {
    type: String,
    default: ''
  }
})

const btns = reactive({
  create: {
    type: 'create',
    text: '워크스페이스 만들기',
    iconClass: ['fas', 'book-open-reader'],
    img: createImg
  },
  invite: {
    type: 'invite',
    text: '워크스페이스 초대 코드 입력하기',
    iconClass: ['fas', 'pencil'],
    emit: 'goInvite',
    img: inviteImg
  }
})

const onBtnClick = (type: WorkspaceStepType) => {
  console.log(type)
  workspaceStore.setType(type)
  router.push({
    name: type === 'create' ? 'create' : 'invite'
  })
}

;(async () => {
  workspaceStore.resetType()
})()
</script>

<style lang="scss" scoped>
.welcome-btns-wrapper {
  width: 100%;
  flex-direction: column;
  .btn-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3.5rem 2rem;
    border: 1px solid rgba(201, 201, 201, 0.45);
    border-radius: 10px;
    background: #fff;
    color: #000;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    .img {
      width: 150px;
      margin-right: 10px;
      overflow: hidden;
      img {
        width: 100%;
        transition: all 0.3s ease-in-out;
      }
    }
    .text {
      font-size: 20px;
      flex: 1;
    }
    .arrow {
      margin-left: 20px;
      font-size: 20px;
      transition: all 0.3s ease-in-out;
    }
  }
  .create-btn-box:hover,
  .invite-btn-box:hover {
    box-shadow: rgb(56 158 242 / 48%) 0px 0px 21px;
    .img img {
      transform: scale(1.2);
    }
    .arrow {
      transform: translateX(10px);
    }
  }
  .btn-box:first-child {
    margin-bottom: 20px;
  }
}

@include xxs {
  .welcome-btns-wrapper .img {
    width: 80px !important;
  }
  .welcome-btns-wrapper .text {
    font-size: 15px !important;
  }
}
@include xs {
  .welcome-btns-wrapper .img {
    width: 110px !important;
  }
  .welcome-btns-wrapper .text {
    font-size: 15px !important;
  }
}
@include sm {
  .welcome-btns-wrapper .img {
    width: 115px !important;
  }
  .welcome-btns-wrapper .text {
    font-size: 19px !important;
  }
}
@include md {
  .welcome-btns-wrapper .img {
    width: 115px !important;
  }
  .welcome-btns-wrapper .text {
    font-size: 17px !important;
  }
}
@include lg {
  .welcome-btns-wrapper .img {
    width: 115px !important;
  }
  .welcome-btns-wrapper .text {
    font-size: 17px !important;
  }
}
</style>
