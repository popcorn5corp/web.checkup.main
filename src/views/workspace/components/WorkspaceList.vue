<template>
  <div class="spinner" v-if="isLoading">
    <i class="fa fa-spinner fa-spin"></i>
  </div>
  <template v-else>
    <div class="list-wrapper">
      <h2>워크스페이스 선택</h2>
      <div class="list-box">
        <ul>
          <li v-for="item in state.companies" :key="item.companyId" class="list-li">
            <span style="margin-right: 10px">
              <img width="30" :src="img" />
            </span>
            <span class="name">
              {{ item.companyName }}
            </span>
            <span class="arrow"><ArrowRightOutlined /></span>
          </li>
        </ul>
      </div>
      <div class="check-wrapper">
        <span>
          <Checkbox> 마지막으로 사용했던 워크스페이스로 기본설정 </Checkbox>
        </span>
      </div>
    </div>
    <Button
      label="선택한 워크스페이스로 이동"
      type="primary"
      size="large"
      class="btn"
      @click="$router.push({ name: 'Root' })"
    />
  </template>
</template>

<script lang="ts" setup>
import img from '@/assets/images/avatar1.png'
import { ArrowRightOutlined } from '@ant-design/icons-vue'
import { Checkbox } from 'ant-design-vue'
import { reactive, ref } from 'vue'
import { Button } from '@/components/button'

const isLoading = ref(false)
const state = reactive({
  companies: [
    {
      companyId: 1,
      companyName: 'checkup',
      type: '기존'
    },
    {
      companyId: 2,
      companyName: '롯데백화점',
      type: '기존'
    },
    {
      companyId: 3,
      companyName: '롯데마트',
      type: '초대'
    },
    {
      companyId: 3,
      companyName: '(주)체크업',
      type: '초대'
    },
    {
      companyId: 3,
      companyName: 'LG',
      type: '초대'
    },
    {
      companyId: 3,
      companyName: 'Samsung',
      type: '초대'
    },
    {
      companyId: 3,
      companyName: '올리브영',
      type: '초대'
    }
  ]
})
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
  width: 80%;
  border: 1px solid rgb(5 5 5 / 10%);
  padding: 1rem;
  h2 {
    text-align: center;
    margin: 1rem 0;
  }

  .list-box {
    .list-li {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 18px 33px;
      border-bottom: 1px solid rgb(5 5 5 / 10%);
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      .name {
        flex: auto;
      }
      .arrow {
        margin-left: 20px;
        font-size: 17px;
        transition: all 0.3s ease-in-out;
      }
    }
    .list-li:hover {
      // background-color: #e6f7ff;
      background: rgb(237 242 255 / 73%);
      .name {
        font-weight: 700;
      }
      .arrow {
        transform: translateX(10px);
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
    font-size: 14px;
  }
}
:deep(.ant-checkbox-wrapper) {
  font-size: 15px;
}
</style>
