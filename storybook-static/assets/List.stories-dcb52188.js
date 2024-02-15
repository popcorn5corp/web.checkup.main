import{b as m}from"./vue.esm-bundler-06433f34.js";import{_ as y}from"./Button-f7730f75.js";import"./DropdownButton-c71d963a.js";import{L as g,_ as k,a as v}from"./ListItemMeta-48975394.js";import{S as h}from"./index-8194f8e1.js";import{A as S}from"./index-761f2d76.js";import{L as s,M as l,S as c}from"./StarOutlined-078379af.js";import"./motion-8927e1f6.js";import"./compact-item-943b0817.js";import"./extends-98964cd2.js";import"./index-aab19e1a.js";import"./index-df6759cb.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./slide-14b3f38e.js";import"./motionUtil-c773f409.js";import"./vnode-0120d1ab.js";import"./_arrayLikeKeys-856a4a59.js";import"./roundedArrow-e2771650.js";import"./RightOutlined-811eef93.js";import"./index-2e1e68bc.js";import"./index-75e981cc.js";import"./LeftOutlined-2c031711.js";import"./index-0b93d195.js";import"./KeyCode-5dbefdba.js";import"./statusUtils-981b964f.js";import"./pickAttrs-7c36c3e9.js";import"./isMobile-12f0741d.js";import"./index-7bc94af2.js";import"./useMergedState-9fc4af37.js";import"./CloseCircleFilled-0e0600c9.js";import"./FormItemContext-d5d2b6af.js";import"./eagerComputed-327a0c00.js";import"./responsiveObserve-dd206e94.js";import"./index-9435a495.js";import"./firstNotUndefined-29a740f3.js";import"./Col-5366a844.js";import"./useFlexGapSupport-b50d290f.js";import"./styleChecker-c17e3bbb.js";import"./index-8de211b8.js";import"./colors-897f8409.js";const lt={title:"checkupuikit/Atoms/List",component:g,tags:["autodocs"],parameters:{layout:"fullscreen",componentSubtitle:"하나의 주제와 관련된 내용을 표시하는 데 사용될 수 있습니다. 내용은 다양한 유형과 크기의 여러 요소로 구성될 수 있습니다.",docs:{description:{component:"리스트의 **Children 컴포넌트**로 **<code>&lt;ListItem/&gt; </code>,<code>&lt;ListItemMeta/&gt; </code>**를 사용할 수 있습니다."}}},argTypes:{itemLayout:{control:"select",options:["horizontal","vertical"]},loading:{type:{name:"boolean",required:!1},table:{type:{summary:"boolean | { delay: number }"},defaultValue:{summary:!1}}},dataSource:{control:Object},default:{description:"기본 slot",table:{type:""},control:Object},loadMore:{description:"하단 버튼 영역 slot",table:{type:""},control:Object},renderItem:{description:"리스트 데이터의 행 데이터",table:{type:""},control:Object}},args:{itemLayout:"vertical",loading:!1}},e={args:{},render:f=>({components:{List:g,ListItem:k,ListItemMeta:v,Skeleton:h,Button:y,Avatar:S,LikeOutlined:s,MessageOutlined:l,StarOutlined:c},setup(){const n=m(!1),o="https://randomuser.me/api/?results=3&inc=name,gender,email,nat,picture&noinfo",i=m(),L=[{icon:c,text:"156"},{icon:s,text:"156"},{icon:l,text:"2"}],r=async()=>{n.value=!0,fetch(o).then(t=>t.json()).then(({results:t})=>{console.log(t),i.value=t.map(a=>({name:a.name.first,email:a.email,description:"A design language for background applications, is refined by Checkup Team",picture:a.picture.large}))}),setTimeout(()=>{n.value=!1},300)};return r(),{args:f,fakeDataUrl:o,fetchData:r,dataSource:i,onLoadMore:()=>{},loading:n,actions:L}},template:`
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
}`,...(u=(d=e.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};const ct=["Default"];export{e as Default,ct as __namedExportsOrder,lt as default};
