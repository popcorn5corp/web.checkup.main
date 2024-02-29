import{b as g}from"./vue.esm-bundler-da3dfd31.js";import{_ as f}from"./Button-041be21e.js";import"./DropdownButton-0331ed8d.js";import{_ as u}from"./Drawer-003c7dab.js";import"./index-31244240.js";import"./extends-98964cd2.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./slide-ff6c039b.js";import"./index-7cccea8d.js";const w={title:"checkupuikit/Atoms/Drawer",component:u,tags:["autodocs"],argTypes:{drawerPosition:{description:"drawer 위치",type:{name:"string"},options:["left","right"],control:"select",table:{type:{summary:"left | right"},defaultValue:{summary:"right"}}},mask:{description:"drawer 뒤에 mask 사용여부, 'floating=true' 일 때만 사용가능",table:{type:{summary:"boolean"}}},drawerWidth:{description:"drawer 너비값",control:{type:"text"},table:{type:{summary:"string"},defaultValue:{summary:"30%"}}},drawerTitle:{description:"drawer 제목",control:{type:"text"},table:{type:{summary:"string"}}},openDetail:{description:"drawer 오픈 여부",table:{type:{summary:"boolean"},defaultValue:{summary:!1}}},minHeight:{description:"drawer 최소 높이",control:{type:"text"},table:{type:{summary:"string"}}},top:{description:"drawer 위치 top 값",control:{type:"text"},table:{type:{summary:"string"}}}},args:{drawerPosition:"right",mask:!1,drawerWidth:"30%",drawerTitle:"drawer 제목"},parameters:{layout:"fullscreen",componentSubtitle:"Drawer는 측면에서 나오는 컴포넌트 입니다. 일련의 정보 등이 담겨있습니다. 사용자는 현재 페이지를 떠나지 않고도 Drawer와 상호 작용할 수 있으므로 동일한 컨텍스트 내에서 작업을 보다 효율적으로 수행할 수 있습니다."}},e={args:{...w.args},render:c=>({components:{Drawer:u,Button:f},setup(){return{openDetail:g(!1),args:c}},template:`
      <div style="width: 100%; height: 500px;">
        <Button label="drawer 열기" @click="openDetail = true"/>
        <Drawer
          v-model:openDetail="openDetail"
          v-bind="args"
          @onClose="openDetail = false"
        >
          <template #drawerContent>
            <div style="padding: 1rem; display: flex; justify-content: center; align-items: center; background: #c7e5fe;">drawer 영역</div>
          </template>
        </Drawer>
      </div>
    `})},r={args:{...e.args,drawerPosition:"left"},render:e.render},t={args:{...e.args,mask:!0},render:e.render};var a,n,o;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    ...meta.args
  },
  render: (args: any) => ({
    components: {
      Drawer,
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
      <div style="width: 100%; height: 500px;">
        <Button label="drawer 열기" @click="openDetail = true"/>
        <Drawer
          v-model:openDetail="openDetail"
          v-bind="args"
          @onClose="openDetail = false"
        >
          <template #drawerContent>
            <div style="padding: 1rem; display: flex; justify-content: center; align-items: center; background: #c7e5fe;">drawer 영역</div>
          </template>
        </Drawer>
      </div>
    \`
  })
}`,...(o=(n=e.parameters)==null?void 0:n.docs)==null?void 0:o.source}}};var s,i,l;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    drawerPosition: 'left'
  },
  render: Default.render
}`,...(l=(i=r.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var p,d,m;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    mask: true
  },
  render: Default.render
}`,...(m=(d=t.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};const B=["Default","PositionLeft","UseMask"];export{e as Default,r as PositionLeft,t as UseMask,B as __namedExportsOrder,w as default};
