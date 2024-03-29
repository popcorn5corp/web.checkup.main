<template>
  <div class="content">
    <div class="list-wrapper">
      <div class="list-top">
        <div class="prev-icon">
          <font-awesome-icon :icon="['fas', 'chevron-left']" @click="$router.go(-1)" />
          <!-- <font-awesome-icon :icon="['fas', 'angles-left']" /> -->
        </div>

        <div class="title">
          <h1>{{ $t('page.workspace.listTitle') }}</h1>
          <p class="list-desc">{{ $t('page.workspace.listDesc') }}</p>
        </div>
      </div>

      <div class="list-box">
        <ul>
          <li
            ref="listRef"
            v-for="item in workspaceList"
            :key="item.workspaceId"
            class="list-li"
            :class="[item.active && 'active']"
            @click="onSelectWorkspace(item)"
          >
            <span class="img-box">
              <span class="img"> W </span>
            </span>
            <span class="name">
              {{ item.workspaceName }}
            </span>
            <span class="arrow">
              <ArrowRightOutlined class="icon" />
              <span class="text">
                {{ item.activeTxt }}
              </span>
            </span>
          </li>
        </ul>
      </div>

      <div class="invite-code-wrapper" @click="router.push({ name: 'workspace-invite' })">
        <div class="invite-text">
          <p>{{ $t('page.workspace.listInviteText') }}</p>
          <p class="sub">
            <UserAddOutlined class="user-plus-icon" />{{ $t('page.workspace.listInviteSubText') }}
          </p>
        </div>
        <div class="invite-arrow">
          <ArrowRightOutlined />
        </div>
      </div>

      <div class="check-wrapper">
        <span>
          <Checkbox v-model:checked="getUser.useDefaultWorkspace">
            <p>
              {{ $t('page.workspace.listCheckText') }}
            </p>
          </Checkbox>
        </span>
      </div>
    </div>
  </div>

  <!-- <Spinner :text="$t('message.checkingLogin')" :text-width="'13rem'" /> -->
</template>

<script setup lang="ts" name="WorkspaceList">
import { WorkspaceService } from '@/services'
import { Util } from '@/utils'
import { ArrowRightOutlined, UserAddOutlined } from '@ant-design/icons-vue'
import { Checkbox } from 'ant-design-vue'
import { ref, unref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import type { IWorkspace } from '@/services/workspace/types'
import { useAuthStore } from '@/stores/modules/auth'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import type { Workspace } from '@/stores/modules/workspace/types'
import { WORKSPACE_ID_KEY } from '@/constants/cacheKeyEnum'
import { PagePathEnum } from '@/constants/pageEnum'

type WorkspaceListInfo = IWorkspace.WorkspaceListInfo & { active: boolean; activeTxt: string }

const { t } = useI18n()
const router = useRouter()
const { setSelectedWorkspaceId, getWorkspaceId, initWorkspace } = useWorkspaceStore()
const { getUser } = useAuthStore()
const workspaceList = ref<WorkspaceListInfo[]>()
const listRef = ref()
const currentWorkspaceId = ref(getWorkspaceId || Util.Storage.get(WORKSPACE_ID_KEY))

;(async () => {
  try {
    const {
      data: { workspaceInfoList }
    } = await WorkspaceService.getWorkspaceList({
      currentWorkspaceId: unref(currentWorkspaceId)
    })
    workspaceList.value = workspaceInfoList.map((workspace) => {
      let active = false
      let activeTxt = t('component.button.move')

      if (workspace.workspaceId === unref(currentWorkspaceId)) {
        active = true
        activeTxt = t('page.workspace.listArrowText')
      }

      return { ...workspace, active, activeTxt }
    })
  } catch (err) {
    console.log(err)
  }
})()

async function onSelectWorkspace(workspace: Workspace) {
  try {
    const { workspaceId } = workspace

    await WorkspaceService.updateDefaultWorkspace({
      defaultWorkspace: getUser.useDefaultWorkspace,
      defaultWorkspaceId: workspaceId
    })

    // 기존에 젒속한 워크스페이스와 선택한 워크스페이스가 다를 경우
    if (unref(currentWorkspaceId) !== workspaceId) {
      initWorkspace()
      setSelectedWorkspaceId(workspaceId)
    }

    router.push({ path: PagePathEnum.BASE_HOME })
  } catch (err) {
    console.log(err)
  }
}
</script>

<style lang="scss" scoped>
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;

  .fa-spin {
    color: #acb5c1 !important;
  }
}

.content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.list-wrapper {
  width: 100%;
  height: 80%;
  border: 1px solid rgb(5 5 5 / 10%);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;

  .list-top {
    display: flex;

    .prev-icon {
      > svg {
        font-size: 35px;
        color: $color-gray-7;
        margin-top: 10px;
        cursor: pointer;

        :hover {
          color: $color-gray-6;
        }
      }
    }

    .title {
      flex-grow: 1;
      padding-right: 21.88px;

      h1 {
        text-align: center;
        margin: 1rem 0;
        line-height: 1;
      }
    }
  }

  .list-desc {
    text-align: center;
    color: $color-gray-7;
    margin-bottom: 5px;
    font-size: 16px;
    line-height: 1.2;
  }

  .list-box {
    margin-top: 10px;
    height: 80%;
    overflow-y: auto;
    border: 1px solid $color-gray-5;
    border-radius: 8px;

    ul {
      padding: 0;
    }

    .list-li {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 18px 33px;
      border-bottom: 1px solid $color-gray-5;
      transition: all 0.2s ease-in-out;
      cursor: pointer;

      .img-box {
        width: 55px;
        height: 55px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #3c3c3c;
        color: $color-white;
        padding-top: 3px;
        text-align: center;
        border-radius: 6px;
      }

      .img {
        font-weight: 900;
        font-size: 18px;
      }

      .name {
        width: 32%;
        flex: auto;
        font-size: 22px;
        margin: 0 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .arrow {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
        border-radius: 50%;
        background: $color-blue-6;
        font-size: 17px;
        color: $color-white;
        transition: transform 0.3s ease-in-out;

        .text {
          display: none;
          font-size: 16px;
        }
      }
    }

    .list-li.active {
      background: rgb(237 242 255 / 73%);

      .name {
        font-weight: 700;
      }

      .arrow {
        transform: translateX(10px);
        background: transparent;
        color: $color-blue-6;

        .icon {
          display: none;
        }

        .text {
          display: block;
        }
      }
    }

    .list-li:hover {
      background: rgb(237 242 255 / 73%);

      .name {
        font-weight: 700;
      }

      .arrow {
        transform: translateX(10px);
        background: transparent;
        color: $color-blue-6;

        .icon {
          display: none;
        }

        .text {
          display: block;
        }
      }
    }
  }
}

.btn {
  margin-top: 1rem;
}

.invite-code-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  margin-top: 1.5rem;
  border: 1px solid $color-gray-5;
  border-radius: 8px;
  font-size: 17px;
  cursor: pointer;

  .invite-text {
    p {
      margin: 0;
      margin-top: 3px;
      font-weight: 600;
    }

    .sub {
      font-size: 16px;
      font-weight: 400;
      color: $color-gray-7;
      margin-top: 7px;

      .user-plus-icon {
        font-size: 18px;
        margin-right: 4px;
      }
    }
  }

  .invite-arrow {
    font-size: 18px;
  }
}

.check-wrapper {
  text-align: center;
  margin-top: 1.5rem;

  p {
    display: inline-block;
    margin: 0;
    word-break: keep-all;
  }
}

:deep(.ant-checkbox-wrapper) {
  font-size: 16px;
}

@include xxs {
  .content {
    width: 100% !important;
  }

  .list-wrapper {
    padding: 1rem !important;
    height: 90% !important;
    margin-top: 1rem;

    .list-li {
      padding: 18px !important;
    }
  }

  .img-box {
    width: 40px !important;
    height: 40px !important;
  }

  .name {
    font-size: 17px !important;
  }

  .arrow {
    margin-left: 5px !important;

    .text {
      font-size: 12px !important;
    }

    padding: 6px !important;
  }

  .check-wrapper {
    margin-top: 10px !important;
  }

  :deep(.ant-checkbox-wrapper) {
    font-size: 15px !important;
  }
}

@include xs {
  .content {
    width: 95% !important;
  }

  .img-box {
    width: 50px !important;
    height: 50px !important;
  }

  .name {
    font-size: 18px !important;
  }

  .arrow {
    padding: 8px !important;
  }
}

@include sm {
  .content {
    width: 90% !important;
  }

  .name {
    font-size: 20px !important;
  }

  .arrow {
    padding: 10px !important;
  }
}

@include md {
  .content {
    width: 70% !important;
  }
}

@include lg {
  .content {
    width: 60% !important;
  }
}
</style>
