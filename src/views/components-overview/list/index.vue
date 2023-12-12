<template>
  <template v-for="({ list, actions, editMode }, index) in store" :key="index">
    <List
      :dataSource="list"
      :loading="initLoading"
      :itemLayout="index === 0 ? 'horizontal' : 'vertical'"
    >
      <template #loadMore>
        <div v-if="!initLoading && !loading" style="text-align: center; margin: 1rem">
          <Button @click="onLoadMore(index)">loading more</Button>
        </div>
      </template>

      <template #renderItem="{ item }">
        <ListItem>
          <template #actions>
            <span v-for="{ icon, text } in actions" :key="icon">
              <component :is="icon" style="margin-right: 8px" />
              {{ text }}
            </span>

            <template v-if="editMode">
              <a key="list-loadmore-edit">edit</a>
              <a key="list-loadmore-more">more</a>
            </template>
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
</template>

<script setup lang="ts" name="ComponentsOverviewList">
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons-vue'
import { onMounted, ref } from 'vue'
import { Button } from '@/components/button'
import { List, ListItem, ListItemMeta } from '@/components/list'

const count = 3
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`

const initLoading = ref(true)
const loading = ref(false)

const actions: Record<string, any>[] = [
  { icon: StarOutlined, text: '156' },
  { icon: LikeOutlined, text: '156' },
  { icon: MessageOutlined, text: '2' }
]

const store = ref([
  {
    data: [],
    list: [],
    actions: [],
    editMode: true
  },
  {
    data: [],
    list: [],
    actions,
    editMode: false
  }
])

onMounted(() => {
  fetch(fakeDataUrl)
    .then((res) => res.json())
    .then((res) => {
      initLoading.value = false

      store.value.forEach((_, index) => {
        store.value[index].data = res.results
        store.value[index].list = res.results.map((item: any) => ({
          ...item,
          description: 'A design language for background applications, is refined by Checkup Team'
        }))
      })
    })
})

const onLoadMore = (index: number) => {
  loading.value = true

  store.value[index].list = store.value[index].data.concat(
    [...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} })) as []
  )

  fetch(fakeDataUrl)
    .then((res) => res.json())
    .then((res) => {
      const newData = store.value[index].data.concat(res.results)

      loading.value = false

      store.value[index].data = newData
      store.value[index].list = newData.map((item: any) => ({
        ...item,
        description: 'A design language for background applications, is refined by Checkup Team'
      })) as []
    })
}
</script>
