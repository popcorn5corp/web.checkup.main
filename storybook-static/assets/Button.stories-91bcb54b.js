import{_ as x}from"./Button-041be21e.js";import"./DropdownButton-0331ed8d.js";import"./index-31244240.js";import"./extends-98964cd2.js";import"./vue.esm-bundler-da3dfd31.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./slide-ff6c039b.js";console.log("button");const D={title:"checkupuikit/Atoms/Button",component:x,tags:["autodocs"],argTypes:{default:{table:{type:""},control:Object},click:{table:{type:""},control:Object},style:{table:{type:""},control:Object},label:{type:{name:"string",required:!1},defaultValue:"button",control:{type:"text"}},type:{type:{name:"string",required:!1},options:["default","primary","ghost","dashed","text","link"],control:"select",table:{type:{summary:"primary | ghost | dashed | link | text | default"},defaultValue:{summary:"default"}}},icon:{description:"아이콘 추가",type:{name:"string",required:!1},options:["download","plusCircle","excel"],control:"select",table:{type:{summary:"download | plus | excel"}}},size:{type:{name:"string",required:!1},options:["small","middle","large"],control:"select",table:{type:{summary:"large | middle | small"},defaultValue:{summary:"middle"}}},shape:{type:{name:"string",required:!1},options:["default","round","circle"],control:"select",table:{type:{summary:"default | circle | round"},defaultValue:{summary:"default"}}},loading:{type:{name:"boolean",required:!1},table:{type:{summary:"boolean | { delay: number }"},defaultValue:{summary:!1}}},disabled:{type:{name:"boolean",required:!1},table:{type:{summary:"boolean"},defaultValue:{summary:!1}}}},args:{loading:!1,disabled:!1,size:"middle",shape:"default"},parameters:{componentSubtitle:"Button 컴포넌트의 클릭이벤트를 활용하여 다양한 비즈니스 로직을 수행할 수 있습니다."}},e={args:{label:"Button",type:"primary"}},a={args:{label:"Button"}},r={args:{label:"Loading!",type:"primary",loading:!0}},t={args:{shape:"circle",loading:!0}},o={args:{label:"Download",icon:"download"}};var s,l,n;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    label: 'Button',
    type: 'primary'
  }
}`,...(n=(l=e.parameters)==null?void 0:l.docs)==null?void 0:n.source}}};var d,i,m;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    label: 'Button'
  }
}`,...(m=(i=a.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var p,c,u;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    label: 'Loading!',
    type: 'primary',
    loading: true
  }
}`,...(u=(c=r.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var y,g,b;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    shape: 'circle',
    loading: true
  }
}`,...(b=(g=t.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var f,S,h;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    label: 'Download',
    icon: 'download'
  }
}`,...(h=(S=o.parameters)==null?void 0:S.docs)==null?void 0:h.source}}};const O=["Primary","Secondary","LoadingSpinnerWithText","LoadingSpinner","Download"];export{o as Download,t as LoadingSpinner,r as LoadingSpinnerWithText,e as Primary,a as Secondary,O as __namedExportsOrder,D as default};
