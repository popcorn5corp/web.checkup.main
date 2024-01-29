import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons-vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import { Avatar, Skeleton } from 'ant-design-vue'
import { ref } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import { Button } from '@/components/button'
import { List, ListItem, ListItemMeta } from '@/components/list'

const meta: Meta<ComponentProps<typeof List>> = {
  title: 'checkupuikit/Atoms/List',
  component: List,
  tags: ['autodocs'],

  // Set Component description
  parameters: {
    layout: 'fullscreen',

    componentSubtitle:
      '하나의 주제와 관련된 내용을 표시하는 데 사용될 수 있습니다. 내용은 다양한 유형과 크기의 여러 요소로 구성될 수 있습니다.',
    docs: {
      description: {
        component: `리스트의 **Children 컴포넌트**로 **<code>&lt;ListItem/&gt; </code>,<code>&lt;ListItemMeta/&gt; </code>**를 사용할 수 있습니다.`
      }
    }
  },
  argTypes: {
    itemLayout: {
      control: 'select',
      options: ['horizontal', 'vertical']
    },
    loading: {
      type: { name: 'boolean', required: false },
      table: {
        type: { summary: 'boolean | { delay: number }' },
        defaultValue: { summary: false }
      }
    },
    dataSource: {
      control: Object
    },
    default: {
      description: '기본 slot',
      table: { type: '' },
      control: Object
    },
    loadMore: {
      description: '하단 버튼 영역 slot',
      table: { type: '' },
      control: Object
    },
    renderItem: {
      description: '리스트 데이터의 행 데이터',
      table: { type: '' },
      control: Object
    }
  },
  args: { itemLayout: 'vertical', loading: false }
}

export default meta
type Story = StoryObj<typeof List>

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: {
      List,
      ListItem,
      ListItemMeta,
      Skeleton,
      Button,
      Avatar,
      LikeOutlined,
      MessageOutlined,
      StarOutlined
    },
    setup() {
      const loading = ref(false)
      const fakeDataUrl = `https://randomuser.me/api/?results=3&inc=name,gender,email,nat,picture&noinfo`
      const dataSource = ref()

      const actions: Record<string, any>[] = [
        { icon: StarOutlined, text: '156' },
        { icon: LikeOutlined, text: '156' },
        { icon: MessageOutlined, text: '2' }
      ]

      const fetchData = async () => {
        loading.value = true

        fetch(fakeDataUrl)
          .then((res) => res.json())
          .then(({ results }) => {
            console.log(results)
            dataSource.value = results.map((item: any) => ({
              name: item.name.first,
              email: item.email,
              description:
                'A design language for background applications, is refined by Checkup Team',
              picture: item.picture.large
            }))
          })

        setTimeout(() => {
          loading.value = false
        }, 300)
      }

      fetchData()

      const onLoadMore = () => {}
      return { args, fakeDataUrl, fetchData, dataSource, onLoadMore, loading, actions }
    },
    template: `
      <List v-bind="args" :dataSource="dataSource" :itemLayout="args.itemLayout">
        <template #loadMore>
          <div style="text-align: center; margin: 1rem">
            <Button :loading="loading" @click="fetchData">loading more</Button>
          </div>
        </template>

        <template #renderItem="{ item }">
          <ListItem>
            <template #actions>
              <span v-for="{ icon, text } in actions" :key="icon">
                <component :is="icon" style="margin-right: 8px" />
                {{ text }}
              </span>
              <a key="list-loadmore-edit">edit</a>
              <a key="list-loadmore-more">more</a>
            </template>

            <Skeleton avatar :title="false" :loading="!!item.loading" active>
              <ListItemMeta :description="item.description">
                <template #title>
                  <a href="#">{{ item.name }}</a>
                </template>

                <template #avatar>
                  <Avatar :src="item.picture" />
                </template>

                <template #content>{{ item.email }}</template>
              </ListItemMeta>
            </Skeleton>
          </ListItem>
        </template>
      </List>
    `
  })
}
