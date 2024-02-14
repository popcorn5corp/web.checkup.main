<template>
  <div class="content left">
    <div class="welcome-text-wrapper">
      <h1>
        {{ $t('page.workspace.welcomeTit', { userName: workspaceUserInfo.userName }) }}
      </h1>
      <p>
        {{ $t('page.workspace.welcomeDesc') }}
      </p>
    </div>
    <img :src="welcomeImg" alt="작가 upklyak / 출처 Freepik" />
  </div>
  <div class="content right">
    <!-- <div class="toggle">
      <input type="checkbox" id="darkmode-toggle" />
      <label for="darkmode-toggle" />
    </div> -->
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
</template>

<script setup lang="ts" name="Welcome">
import welcomeImg from '@/assets/images/workspace2.png'
import createImg from '@/assets/images/workspace_create.png'
import inviteImg from '@/assets/images/workspace_invite.png'
import { ArrowRightOutlined } from '@ant-design/icons-vue'
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import type { WorkspaceStepType } from '@/stores/modules/workspace/types'

const { t } = useI18n()
const router = useRouter()
const workspaceStore = useWorkspaceStore()
const { getUser } = useAuthStore()

const workspaceUserInfo = reactive({
  ...getUser
})

const btns = reactive({
  create: {
    type: 'create',
    text: t('page.workspace.createWorkspace'),
    iconClass: ['fas', 'book-open-reader'],
    img: createImg
  },
  invite: {
    type: 'invite',
    text: t('page.workspace.joinWorkspace'),
    iconClass: ['fas', 'pencil'],
    img: inviteImg
  }
})

const onBtnClick = (type: WorkspaceStepType) => {
  workspaceStore.setStepType(type)
  router.push({
    name: type === 'create' ? 'workspace-create' : 'workspace-invite'
  })
}
</script>

<style lang="scss">
.welcome-text-wrapper {
  padding-left: 70px;
  margin-bottom: 1rem;
  text-align: left;
  h1 {
    margin-bottom: 10px;
  }

  p {
    color: $sub-text-dark-gray-color;
    margin-bottom: 5px;
    font-size: 18px;
    white-space: pre-line;
    line-height: 1.5;
  }
}

.welcome-btns-wrapper {
  width: 100%;
  flex-direction: column;
  .btn-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3.5rem 2rem;
    border: 1px solid $border-color;
    border-radius: 10px;
    background: $color-white;
    color: $color-black;
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
      font-size: 22px;
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

// .toggle {
//   label {
//     width: 50px;
//     height: 20px;
//     position: relative;
//     display: block;
//     background: #ebebeb;
//     border-radius: 200px;
//     box-shadow: inset 0px 5px 15px rgba(0, 0, 0, 0.4), inset 0px -5px 15px rgba(255, 255, 255, 0.4);
//     cursor: pointer;
//   }

//   label:after {
//     content: '';
//     width: 18px;
//     height: 18px;
//     position: absolute;
//     top: 2px;
//     left: 4px;
//     background: linear-gradient(180deg, #ffcc89, #d8860b);
//     border-radius: 180px;
//     box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
//   }

//   input {
//     width: 0;
//     height: 0;
//     visibility: hidden;
//   }

//   input:checked + label {
//     background: #242424;
//   }

//   input:checked + label:after {
//     left: 49px;
//     transform: translateX(-100%);
//     background: linear-gradient(180deg, #777, #3a3a3a);
//   }

//   label,
//   label:after {
//     transition: 0.3s;
//   }

//   label:active:after {
//     width: 26px;
//   }
// }
</style>
