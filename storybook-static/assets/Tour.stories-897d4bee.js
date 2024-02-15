import{d as a}from"./vue.esm-bundler-06433f34.js";import{u as c,a as d,T as l}from"./useTour-42456f6d.js";import{_}from"./Button-f7730f75.js";import{_ as f}from"./DropdownButton-c71d963a.js";import"./SvgIcon-c1119032.js";import{L as T,_ as y,a as O}from"./ListItemMeta-48975394.js";import{_ as m}from"./Tour-0c272c60.js";import{S as M}from"./index-8194f8e1.js";import{A as g}from"./index-761f2d76.js";import{M as B,_ as I}from"./index-b8ebef0a.js";import{_ as S}from"./index-97432be2.js";import{_ as v}from"./index-d2655575.js";import{U}from"./UserOutlined-0136ff76.js";import"./vue-router-09c98cdc.js";import"./pinia-1c824524.js";import"./vue-i18n.runtime-ed730321.js";import"./motion-8927e1f6.js";import"./compact-item-943b0817.js";import"./extends-98964cd2.js";import"./index-aab19e1a.js";import"./index-df6759cb.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./slide-14b3f38e.js";import"./motionUtil-c773f409.js";import"./vnode-0120d1ab.js";import"./_arrayLikeKeys-856a4a59.js";import"./roundedArrow-e2771650.js";import"./RightOutlined-811eef93.js";import"./index-2e1e68bc.js";import"./index-75e981cc.js";import"./LeftOutlined-2c031711.js";import"./index-0b93d195.js";import"./KeyCode-5dbefdba.js";import"./statusUtils-981b964f.js";import"./pickAttrs-7c36c3e9.js";import"./isMobile-12f0741d.js";import"./index-7bc94af2.js";import"./useMergedState-9fc4af37.js";import"./CloseCircleFilled-0e0600c9.js";import"./FormItemContext-d5d2b6af.js";import"./eagerComputed-327a0c00.js";import"./responsiveObserve-dd206e94.js";import"./index-9435a495.js";import"./firstNotUndefined-29a740f3.js";import"./Col-5366a844.js";import"./useFlexGapSupport-b50d290f.js";import"./styleChecker-c17e3bbb.js";import"./index-8de211b8.js";import"./colors-897f8409.js";import"./shallowequal-aee54418.js";import"./_arrayIncludesWith-2f006ba6.js";import"./collapseMotion-a3198536.js";const Ut={title:"checkupuikit/Atoms/Tour",component:m,tags:["autodocs"],parameters:{layout:"fullscreen",componentSubtitle:"사용자에게 제품을 소개하고 싶을 때 사용합니다.",docs:{description:{component:"스텝 이동시 이벤트 및 액션을 줄 수 있으며, 화면 이동도 가능합니다. "}}},argTypes:{open:{control:"boolean"},steps:{control:Object},change:{control:Object},"update:open":{control:Object}},args:{open:!1}},t={render:e=>({setup(){const o=c(),s=d(),n=l.OVERVIEW_PAGE_TOUR,i=a(()=>o.getTour(n));return{args:e,tourStore:o,tour:s,tourType:n,steps:i,handleOpen:()=>{e.open=!0}}},components:{List:T,ListItem:y,ListItemMeta:O,Skeleton:M,DropdownButton:f,Button:_,Avatar:g,Menu:B,MenuItem:I,Space:S,Divider:v,Tour:m,UserOutlined:U},template:`
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
    `})};var r,p,u;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
}`,...(u=(p=t.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};const Dt=["Default"];export{t as Default,Dt as __namedExportsOrder,Ut as default};
