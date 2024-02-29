import{b as N}from"./vue.esm-bundler-da3dfd31.js";import{_ as P}from"./Button-041be21e.js";import"./DropdownButton-0331ed8d.js";import{_ as S}from"./DrawerContainer-a0c2b9f6.js";import"./index-31244240.js";import"./extends-98964cd2.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./slide-ff6c039b.js";import"./Drawer-003c7dab.js";import"./index-7cccea8d.js";const O={title:"checkupuikit/Template/DrawerContainer",tags:["autodocs"],argTypes:{resize:{description:"드래그로 리사이징 기능 사용여부",type:{name:"boolean"},table:{type:{summary:"boolean"}}},drawerPosition:{description:"drawer 위치",type:{name:"string"},options:["left","right"],control:"select",table:{type:{summary:"left | right"},defaultValue:{summary:"right"}}},floating:{description:"drawer 외의 영역을 덮으면서 나오는지 여부",table:{type:{summary:"boolean"}}},resizeOption:{description:"리사이징 옵션: 영역을 덮으면서 리사이징 여부, 'floating=false' 일 때만 사용가능",table:{type:{summary:"float | push"},defaultValue:{summary:"float"}}},mask:{description:"drawer 뒤에 mask 사용여부, 'floating=true' 일 때만 사용가능",table:{type:{summary:"boolean"}}},drawerWidth:{description:"drawer 너비값",control:{type:"text"},table:{type:{summary:"string"},defaultValue:{summary:"30%"}}},drawerTitle:{description:"drawer 제목",control:{type:"text"},table:{type:{summary:"string"}}},openDetail:{description:"drawer 오픈 여부",table:{type:{summary:"boolean"},defaultValue:{summary:!1}}}},args:{drawerPosition:"right",resizeOption:"float",mask:!1},parameters:{layout:"fullscreen",componentSubtitle:"드래그로 리사이징이 가능한 drawer를 감싸는 컨테이너"}},e={args:{...O.args},render:A=>({components:{DrawerContainer:S,Button:P},setup(){return{openDetail:N(!1),args:A}},template:`
      <DrawerContainer
        v-model:openDetail="openDetail"
        style="overflow: hidden"
        v-bind="args"
      >
        <div style="height: 950px; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #c7e5fe; padding: 1rem 0;">
          <div>content 영역</div>
          <br />
          <Button label="drawer 열기" @click="openDetail = true"/>
        </div>

        <template #drawerContent>
          <div style="padding: 1rem; height: 840px; display: flex; justify-content: center; align-items: center;">drawer 영역</div>
        </template>
      </DrawerContainer>
    `})},r={args:{...e.args,resize:!1},render:e.render},a={args:{...e.args,drawerPosition:"left"},render:e.render},t={args:{...e.args,floating:!1,resizeOption:"float"},render:e.render},n={args:{...e.args,floating:!1,resizeOption:"push"},render:e.render},o={args:{...e.args,floating:!0,mask:!1},render:e.render},s={args:{...e.args,floating:!0,mask:!0},render:e.render};var i,l,d;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    ...meta.args
  },
  render: (args: any) => ({
    components: {
      DrawerContainer,
      Button
    },
    setup() {
      const openDetail = ref(false);
      return {
        openDetail,
        args
      };
    },
    template: \`
      <DrawerContainer
        v-model:openDetail="openDetail"
        style="overflow: hidden"
        v-bind="args"
      >
        <div style="height: 950px; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #c7e5fe; padding: 1rem 0;">
          <div>content 영역</div>
          <br />
          <Button label="drawer 열기" @click="openDetail = true"/>
        </div>

        <template #drawerContent>
          <div style="padding: 1rem; height: 840px; display: flex; justify-content: center; align-items: center;">drawer 영역</div>
        </template>
      </DrawerContainer>
    \`
  })
}`,...(d=(l=e.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var p,c,m;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    resize: false
  },
  render: Default.render
}`,...(m=(c=r.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var u,g,f;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    drawerPosition: 'left'
  },
  render: Default.render
}`,...(f=(g=a.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var D,y,w;t.parameters={...t.parameters,docs:{...(D=t.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    floating: false,
    resizeOption: 'float'
  },
  render: Default.render
}`,...(w=(y=t.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};var b,h,v;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    floating: false,
    resizeOption: 'push'
  },
  render: Default.render
}`,...(v=(h=n.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var k,x,C;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    floating: true,
    mask: false
  },
  render: Default.render
}`,...(C=(x=o.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};var _,z,F;s.parameters={...s.parameters,docs:{...(_=s.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    floating: true,
    mask: true
  },
  render: Default.render
}`,...(F=(z=s.parameters)==null?void 0:z.docs)==null?void 0:F.source}}};const G=["Default","NoResizing","LeftPositionDrawer","NoFloatingAndFloatDrawer","NoFloatingAndPushDrawer","FloatingAndNoMaskDrawer","FloatingAndMaskDrawer"];export{e as Default,s as FloatingAndMaskDrawer,o as FloatingAndNoMaskDrawer,a as LeftPositionDrawer,t as NoFloatingAndFloatDrawer,n as NoFloatingAndPushDrawer,r as NoResizing,G as __namedExportsOrder,O as default};
