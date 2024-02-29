import{b as s}from"./vue.esm-bundler-da3dfd31.js";import{_ as y}from"./Button-041be21e.js";import"./DropdownButton-0331ed8d.js";import{L as g,_ as k,a as v}from"./ListItemMeta-2a8c86fc.js";import{S as h}from"./index-f53e67c5.js";import{A as S}from"./index-bbe486c9.js";import{L as m,M as l,S as c}from"./StarOutlined-fdac8653.js";import"./index-31244240.js";import"./extends-98964cd2.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./slide-ff6c039b.js";import"./index-bf79754e.js";import"./index-df5fee73.js";import"./LeftOutlined-444c44d4.js";import"./index-f0aafce9.js";import"./KeyCode-9b05785e.js";import"./pickAttrs-d6f9a41a.js";import"./colors-099fe84d.js";import"./eagerComputed-853093c5.js";import"./responsiveObserve-1261ffb7.js";import"./Col-72edfad4.js";import"./useFlexGapSupport-42c61aa1.js";import"./styleChecker-86e19025.js";import"./index-e44b3b0d.js";const P={title:"checkupuikit/Atoms/List",component:g,tags:["autodocs"],parameters:{layout:"fullscreen",componentSubtitle:"하나의 주제와 관련된 내용을 표시하는 데 사용될 수 있습니다. 내용은 다양한 유형과 크기의 여러 요소로 구성될 수 있습니다.",docs:{description:{component:"리스트의 **Children 컴포넌트**로 **<code>&lt;ListItem/&gt; </code>,<code>&lt;ListItemMeta/&gt; </code>**를 사용할 수 있습니다."}}},argTypes:{itemLayout:{control:"select",options:["horizontal","vertical"]},loading:{type:{name:"boolean",required:!1},table:{type:{summary:"boolean | { delay: number }"},defaultValue:{summary:!1}}},dataSource:{control:Object},default:{description:"기본 slot",table:{type:""},control:Object},loadMore:{description:"하단 버튼 영역 slot",table:{type:""},control:Object},renderItem:{description:"리스트 데이터의 행 데이터",table:{type:""},control:Object}},args:{itemLayout:"vertical",loading:!1}},e={args:{},render:f=>({components:{List:g,ListItem:k,ListItemMeta:v,Skeleton:h,Button:y,Avatar:S,LikeOutlined:m,MessageOutlined:l,StarOutlined:c},setup(){const n=s(!1),o="https://randomuser.me/api/?results=3&inc=name,gender,email,nat,picture&noinfo",i=s(),L=[{icon:c,text:"156"},{icon:m,text:"156"},{icon:l,text:"2"}],r=async()=>{n.value=!0,fetch(o).then(t=>t.json()).then(({results:t})=>{console.log(t),i.value=t.map(a=>({name:a.name.first,email:a.email,description:"A design language for background applications, is refined by Checkup Team",picture:a.picture.large}))}),setTimeout(()=>{n.value=!1},300)};return r(),{args:f,fakeDataUrl:o,fetchData:r,dataSource:i,onLoadMore:()=>{},loading:n,actions:L}},template:`
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
    `})};var p,d,u;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {},
  render: args => ({
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
      const loading = ref(false);
      const fakeDataUrl = \`https://randomuser.me/api/?results=3&inc=name,gender,email,nat,picture&noinfo\`;
      const dataSource = ref();
      const actions: Record<string, any>[] = [{
        icon: StarOutlined,
        text: '156'
      }, {
        icon: LikeOutlined,
        text: '156'
      }, {
        icon: MessageOutlined,
        text: '2'
      }];
      const fetchData = async () => {
        loading.value = true;
        fetch(fakeDataUrl).then(res => res.json()).then(({
          results
        }) => {
          console.log(results);
          dataSource.value = results.map((item: any) => ({
            name: item.name.first,
            email: item.email,
            description: 'A design language for background applications, is refined by Checkup Team',
            picture: item.picture.large
          }));
        });
        setTimeout(() => {
          loading.value = false;
        }, 300);
      };
      fetchData();
      const onLoadMore = () => {};
      return {
        args,
        fakeDataUrl,
        fetchData,
        dataSource,
        onLoadMore,
        loading,
        actions
      };
    },
    template: \`
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
    \`
  })
}`,...(u=(d=e.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};const Q=["Default"];export{e as Default,Q as __namedExportsOrder,P as default};
