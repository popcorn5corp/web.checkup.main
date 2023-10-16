<script setup lang="ts" name="ComponentsOverviewModal">
import { Card } from '@/components/card'

const content = `
      <p>card content</p>
      <p>card content</p>
      <p>card content</p>
`
</script>

<template>
  <Card title="카드 타이틀" extraText="더보기" :content="content" />
  <br />
  <Card />
</template>
