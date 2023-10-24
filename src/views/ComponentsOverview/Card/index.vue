<script setup lang="ts" name="ComponentsOverviewModal">
import avatar1 from '@/assets/images/avatar1.png'
import imgUrl from '@/assets/images/checkup_logo_light.png'
import checkupLogo from '@/assets/images/checkup_logo_simple_light.png'
import { Card, CardList } from '@/components/card'
import { contentData } from './mock'
</script>

<template>
  <div>
    <Card
      key="1234"
      :imgUrl="checkupLogo"
      title="카드 타이틀"
      tag="구분태그"
      content="내용내용내용내용내용내용내용내용내용내용내용내용내용"
      goDetailType="MIDDLE"
    />
    <hr style="margin: 1rem 0" />
    <Card
      key="1234"
      :imgUrl="checkupLogo"
      title="카드 타이틀"
      tag="구분태그"
      content="내용내용내용내용내용내용내용내용내용내용내용내용내용"
      goDetailText="상세보기"
      goDetailType="MIDDLE"
    />
    <hr style="margin: 1rem 0" />
    <CardList
      key="1234"
      :imgUrl="avatar1"
      goDetailText="상세보기"
      title="카드 타이틀"
      tag="구분"
      :useCheckbox="true"
      :content="contentData"
      goDetailType="BOTTOM"
    />
  </div>
</template>
