<template>
  <Teleport to="#detail-content">
    <div class="sample-content">
      <div class="profile">asdasdas</div>
      <div class="detail">
        <!-- <Tabs :tabPosition="'top'">
          <TabPane key="1" :tab="$t('layout.header.settings.tabAccount')">
            <UserAccount />
          </TabPane>
          <TabPane key="2" :tab="$t('layout.header.settings.tabDisplaySetting')" force-render>
            <DisplaySetting />
          </TabPane>
        </Tabs> -->
      </div>
    </div>
  </Teleport>
</template>
<script setup lang="ts" name="TableDetailForm"></script>
<style lang="scss"></style>
