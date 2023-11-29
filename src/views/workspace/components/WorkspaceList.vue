<template>
  <div class="content">
    <div class="list-wrapper">
      <h1>{{ $t('page.workspace.listTitle') }}</h1>
      <p class="list-desc">{{ $t('page.workspace.listDesc') }}</p>
      <div class="list-box">
        <ul>
          <li
            v-for="item in workspaceInfoList"
            :key="item.workspaceId"
            class="list-li"
            @click="onSelectWorkspace(item)"
          >
            <span class="img">
              <img :src="img" />
            </span>
            <span class="name">
              {{ item.workspaceName }}
            </span>
            <span class="arrow">
              <ArrowRightOutlined class="icon" />
              <span class="text">
                {{ $t('component.button.move') }}
              </span>
            </span>
          </li>
        </ul>
      </div>
      <div class="check-wrapper">
        <span>
          <Checkbox>{{ $t('page.workspace.listCheckText') }}</Checkbox>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="WorkspaceList">
import img from '@/assets/images/avatar/avatar4.jpg'
import { useAuthStore } from '@/stores'
import { ArrowRightOutlined } from '@ant-design/icons-vue'
import { Checkbox } from 'ant-design-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { IWorkspace } from '@/services/workspace/interface'
import { type Workspace, useWorkspaceStore } from '@/stores/modules/workspace'

const router = useRouter()
const { getUser } = useAuthStore()
const { setSelectedWorkspace } = useWorkspaceStore()
const workspaceInfoList = ref<IWorkspace.WorkspaceInfo[]>(getUser.workspaceInfoList)

function onSelectWorkspace(workspace: Workspace) {
  setSelectedWorkspace(workspace)
  router.push({ name: 'samples-dynamic-table' })
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
.list-wrapper {
  width: 100%;
  border: 1px solid rgb(5 5 5 / 10%);
  padding: 1.5rem;
  h1 {
    text-align: center;
    margin: 1rem 0;
  }
  .list-desc {
    text-align: center;
    color: #888;
    margin-bottom: 5px;
    font-size: 16px;
  }

  .list-box {
    margin-top: 10px;
    .list-li {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 18px 33px;
      border-bottom: 1px solid rgb(5 5 5 / 10%);
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      .img {
        width: 60px;
        margin-right: 22px;
      }
      .name {
        flex: auto;
        font-size: 22px;
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
.check-wrapper {
  text-align: center;
  p {
    display: inline-block;
    margin: 0;
    margin-left: 10px;
  }
}
:deep(.ant-checkbox-wrapper) {
  font-size: 16px;
}

@include xxs {
  .img {
    width: 50px !important;
  }
  .name {
    font-size: 19px !important;
  }
  .arrow {
    padding: 8px !important;
  }
}
</style>
