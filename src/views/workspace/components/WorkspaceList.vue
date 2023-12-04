<template>
  <div class="content">
    <div class="list-wrapper">
      <h1>{{ $t('page.workspace.listTitle') }}</h1>
      <p class="list-desc">{{ $t('page.workspace.listDesc') }}</p>
      <div class="list-box">
        <ul>
          <li
            ref="listRef"
            v-for="item in workspaceList"
            :key="item.workspaceId"
            :data-set="item.workspaceId"
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
          <Checkbox v-model:checked="useDefaultWorkspace">
            <p>
              {{ $t('page.workspace.listCheckText') }}
            </p>
          </Checkbox>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="WorkspaceList">
import { WorkspaceService } from '@/services'
import { ArrowRightOutlined, UserAddOutlined } from '@ant-design/icons-vue'
import { Checkbox } from 'ant-design-vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import type { IWorkspace } from '@/services/workspace/interface'
import { type Workspace, useWorkspaceStore } from '@/stores/modules/workspace'

type WorkspaceListInfo = IWorkspace.WorkspaceListInfo & { active: boolean; activeTxt: string }

const { t } = useI18n()
const router = useRouter()
const { setSelectedWorkspace, getWorkspace } = useWorkspaceStore()
const workspaceList = ref<WorkspaceListInfo[]>()
const listRef = ref()
const useDefaultWorkspace = ref(false)

;(async () => {
  try {
    const { data } = await WorkspaceService.getWorkspaceList()
    workspaceList.value = data.workspaceInfoList.map((workspace) => {
      let active = false
      let activeTxt = t('component.button.move')

      if (workspace.workspaceId === getWorkspace.workspaceId) {
        active = true
        activeTxt = t('page.workspace.listArrowText')
      }

      return {
        ...workspace,
        active,
        activeTxt
      }
    })
  } catch (err) {
    console.log(err)
  }
})()

async function onSelectWorkspace(workspace: Workspace) {
  try {
    await WorkspaceService.setDefaultWorkspace({
      defaultWorkspace: useDefaultWorkspace.value,
      defaultWorkspaceId: workspace.workspaceId
    })

    setSelectedWorkspace(workspace)
    router.push({ name: 'samples-dynamic-table' })
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
  h1 {
    text-align: center;
    margin: 1rem 0;
    // height: 30px;
    line-height: 1;
  }
  .list-desc {
    text-align: center;
    color: #888;
    margin-bottom: 5px;
    font-size: 16px;
    line-height: 1.2;
  }

  .list-box {
    margin-top: 10px;
    height: 80%;
    overflow-y: auto;

    .list-li {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 18px 33px;
      border-bottom: 1px solid rgb(5 5 5 / 10%);
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      .img-box {
        width: 55px;
        height: 55px;
        margin-right: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #3c3c3c;
        color: #fff;
        padding-top: 3px;
        text-align: center;
        border-radius: 6px;
      }
      .img {
        font-weight: 900;
        font-size: 18px;
      }
      .name {
        flex: auto;
        font-size: 22px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .arrow {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 20px;
        padding: 12px;
        border-radius: 50%;
        background: #3e7cff;
        font-size: 17px;
        color: #fff;
        transition: transform 0.3s ease-in-out;
        .text {
          display: none;
          font-size: 18px;
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
        color: #3e7cff;
        .icon {
          display: none;
        }
        .text {
          display: block;
          font-size: 18px;
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
        color: #3e7cff;
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
  border: 1px solid rgba(5, 5, 5, 0.1);
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
      color: #888;
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
    .list-li {
      padding: 18px !important;
    }
  }
  .img-box {
    width: 40px !important;
    height: 40px !important;
  }
  .name {
    width: 40% !important;
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
