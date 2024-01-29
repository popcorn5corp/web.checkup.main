<template>
  <List :dataSource="list" :loading="initLoading" itemLayout="vertical">
    <template #loadMore>
      <div v-if="!initLoading && !loading" style="text-align: center; margin: 1rem">
        <Button @click="onLoadMore">loading more</Button>
      </div>
    </template>

    <template #renderItem="{ item }">
      <ListItem>
        <template #actions>
          <div v-if="!item.loading" style="display: flex; gap: 15px">
            <span v-for="{ icon, text } in actions" :key="icon">
              <component :is="icon" style="margin-right: 2px" />
              {{ text }}
            </span>

            <template v-if="editMode">
              <a key="list-loadmore-edit">edit</a>
              <a key="list-loadmore-more">more</a>
            </template>
          </div>
        </template>

        <a-skeleton avatar :title="false" :loading="!!item.loading" active>
          <ListItemMeta :description="item.description">
            <template #title>
              <a href="#">{{ item.name.last }}</a>
            </template>

            <template #avatar>
              <a-avatar :src="item.picture.large" />
            </template>

            <template #content>{{ item.email }}</template>
          </ListItemMeta>
        </a-skeleton>
      </ListItem>
    </template>
  </List>
</template>

<script setup lang="ts" name="ComponentsOverviewList">
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons-vue'
import { onMounted, ref, toRefs } from 'vue'
import { Button } from '@/components/button'
import { List, ListItem, ListItemMeta } from '@/components/list'

const count = 3
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`

const initLoading = ref(true)
const loading = ref(false)

const actionsInfo: Record<string, any>[] = [
  { icon: StarOutlined, text: '156' },
  { icon: LikeOutlined, text: '156' },
  { icon: MessageOutlined, text: '2' }
]

const store = ref({
  data: [],
  list: [],
  actions: actionsInfo,
  editMode: true
})

const { data, list, actions, editMode } = toRefs(store.value)

onMounted(() => {
  fetch(fakeDataUrl)
    .then((res) => res.json())
    .then((res) => {
      initLoading.value = false

      data.value = res.results
      list.value = res.results.map((item: any) => ({
        ...item,
        description: 'A design language for background applications, is refined by Checkup Team'
      }))
    })
})

const onLoadMore = () => {
  loading.value = true

  list.value = list.value.concat(
    [...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} })) as []
  )

  fetch(fakeDataUrl)
    .then((res) => res.json())
    .then((res) => {
      const newData = data.value.concat(res.results)

      loading.value = false

      data.value = newData
      list.value = newData.map((item: any) => ({
        ...item,
        description: 'A design language for background applications, is refined by Checkup Team'
      })) as []
    })
}
</script>
