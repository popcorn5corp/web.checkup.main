import{e as i}from"./vue.esm-bundler-da3dfd31.js";import{u as c,a as d,T as l}from"./useTour-3e614e3a.js";import{_ as f}from"./Button-041be21e.js";import{_ as T}from"./DropdownButton-0331ed8d.js";import"./SvgIcon-db9b006f.js";import{L as _,_ as y,a as O}from"./ListItemMeta-2a8c86fc.js";import{_ as m}from"./Tour-65933301.js";import{S as M}from"./index-f53e67c5.js";import{A as B}from"./index-bbe486c9.js";import{M as g,_ as I}from"./index-a0b3e6d9.js";import{_ as S}from"./index-434e0d27.js";import{D as v}from"./index-7cccea8d.js";import{U as D}from"./UserOutlined-639f3976.js";import"./vue-router-212c06c4.js";import"./vue-i18n.runtime-54aa6b03.js";import"./index-31244240.js";import"./extends-98964cd2.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./slide-ff6c039b.js";import"./index-bf79754e.js";import"./index-df5fee73.js";import"./LeftOutlined-444c44d4.js";import"./index-f0aafce9.js";import"./KeyCode-9b05785e.js";import"./pickAttrs-d6f9a41a.js";import"./colors-099fe84d.js";import"./eagerComputed-853093c5.js";import"./responsiveObserve-1261ffb7.js";import"./Col-72edfad4.js";import"./useFlexGapSupport-42c61aa1.js";import"./styleChecker-86e19025.js";import"./index-e44b3b0d.js";import"./shallowequal-23878baf.js";import"./_arrayIncludesWith-2f006ba6.js";import"./collapseMotion-6307b6e4.js";const se={title:"checkupuikit/Atoms/Tour",component:m,tags:["autodocs"],parameters:{layout:"fullscreen",componentSubtitle:"사용자에게 제품을 소개하고 싶을 때 사용합니다.",docs:{description:{component:"스텝 이동시 이벤트 및 액션을 줄 수 있으며, 화면 이동도 가능합니다. "}}},argTypes:{open:{control:"boolean"},steps:{control:Object},change:{control:Object},"update:open":{control:Object}},args:{open:!1}},e={render:t=>({setup(){const n=c(),s=d(),o=l.OVERVIEW_PAGE_TOUR,a=i(()=>n.getTour(o));return{args:t,tourStore:n,tour:s,tourType:o,steps:a,handleOpen:()=>{t.open=!0}}},components:{List:_,ListItem:y,ListItemMeta:O,Skeleton:M,DropdownButton:T,Button:f,Avatar:B,Menu:g,MenuItem:I,Space:S,Divider:v,Tour:m,UserOutlined:D},template:`
      <Tour :steps="steps" v-model:open="args.open" @change="onChange" />

      <Button type="primary" @click="handleOpen(true)">Begin Tour</Button>
    
      <Divider/>
    
      <Space>
        <Button :ref="(ref) => tour.setTour(0, ref, tourType)">Upload</Button>
    
        <div >
          <DropdownButton :ref="(ref) => tour.setTour(1, ref, tourType)">
            Dropdown
            <template #overlay>
              <Menu>
                <MenuItem key="1">
                  <UserOutlined />
                  1st menu item
                </MenuItem>
                <MenuItem key="2">
                  <UserOutlined />
                  2nd menu item
                </MenuItem>
                <MenuItem key="3">
                  <UserOutlined />
                  3rd item
                </MenuItem>
              </Menu>
            </template>
          </DropdownButton>
        </div>
    
        <Button :ref="(ref) => tour.setTour(2, ref, tourType)" type="primary"
          >Save</Button
        >
      </Space>
    `})};var r,u,p;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: args => ({
    setup() {
      const tourStore = useTourStore();
      const tour = useTour();
      const tourType = TOUR_TYPE.OVERVIEW_PAGE_TOUR;
      const steps = computed(() => tourStore.getTour(tourType));
      const handleOpen = () => {
        args.open = true;
      };
      return {
        args,
        tourStore,
        tour,
        tourType,
        steps,
        handleOpen
      };
    },
    components: {
      List,
      ListItem,
      ListItemMeta,
      Skeleton,
      DropdownButton,
      Button,
      Avatar,
      Menu,
      MenuItem,
      Space,
      Divider,
      Tour,
      UserOutlined
    },
    template: \`
      <Tour :steps="steps" v-model:open="args.open" @change="onChange" />

      <Button type="primary" @click="handleOpen(true)">Begin Tour</Button>
    
      <Divider/>
    
      <Space>
        <Button :ref="(ref) => tour.setTour(0, ref, tourType)">Upload</Button>
    
        <div >
          <DropdownButton :ref="(ref) => tour.setTour(1, ref, tourType)">
            Dropdown
            <template #overlay>
              <Menu>
                <MenuItem key="1">
                  <UserOutlined />
                  1st menu item
                </MenuItem>
                <MenuItem key="2">
                  <UserOutlined />
                  2nd menu item
                </MenuItem>
                <MenuItem key="3">
                  <UserOutlined />
                  3rd item
                </MenuItem>
              </Menu>
            </template>
          </DropdownButton>
        </div>
    
        <Button :ref="(ref) => tour.setTour(2, ref, tourType)" type="primary"
          >Save</Button
        >
      </Space>
    \`
  })
}`,...(p=(u=e.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};const ae=["Default"];export{e as Default,ae as __namedExportsOrder,se as default};
