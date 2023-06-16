<template>
  <Footer>
    <div class="copyright">
      Copyright <CopyrightOutlined /> 2023
      <a href="https://buqiyuan.gitee.io" target="_blank"> buqiyuan.gitee.io </a>
    </div>
  </Footer>
</template>
<script setup lang="ts" name="Footer">
import { Layout } from 'ant-design-vue'
const { Footer } = Layout
</script>
<style lang="scss" scoped>
.page_footer {
  text-align: center;
  //height: $footer-height;

  a {
    color: rgba(0, 0, 0, 0.45);
  }

  .page_footer_link {
    display: flex;
    justify-content: center;
    margin-bottom: 8px;

    a:not(:last-child) {
      margin-right: 40px;
    }
  }

  .copyright {
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
