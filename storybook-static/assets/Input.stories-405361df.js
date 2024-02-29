import{w as f}from"./decorator-e53fb076.js";import{I as x}from"./CustomInput-b10632ad.js";import"./preview-errors-dde4324f.js";import"./index-356e4a49.js";import"./vue.esm-bundler-da3dfd31.js";import"./useTheme-eec4b019.js";import"./vue-router-212c06c4.js";import"./extends-98964cd2.js";import"./vue-i18n.runtime-54aa6b03.js";import"./_baseSet-de153ea0.js";import"./_toKey-6cc18de3.js";import"./index-31244240.js";import"./slide-ff6c039b.js";import"./isArrayLikeObject-523edb65.js";import"./index-b4575248.js";import"./index-f0aafce9.js";import"./KeyCode-9b05785e.js";import"./pickAttrs-d6f9a41a.js";import"./colors-099fe84d.js";import"./Accordion-1ff785b2.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./_commonjsHelpers-de833af9.js";import"./ClockCircleOutlined-566f9eed.js";import"./shallowequal-23878baf.js";import"./collapseMotion-6307b6e4.js";import"./index-6cf4e6ab.js";import"./iframe-8ae88575.js";import"../sb-preview/runtime.js";import"./Button-041be21e.js";import"./DropdownButton-0331ed8d.js";import"./index-9fe1cf39.js";import"./ExclamationCircleFilled-da22edd1.js";const rr={title:"checkupuikit/Atoms/Input",component:x,tags:["autodocs"],argTypes:{label:{description:"input label",control:{type:"text"},table:{type:{summary:"string"}}},placeholder:{description:"input placeholder",control:{type:"text"},table:{type:{summary:"string"}}},allowClear:{description:"텍스트를 지우는 아이콘 사용 여부",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:!1}}},maxlength:{description:"최대 글자 수",control:{type:"number"},table:{type:{summary:"number"}}},showCount:{description:"글자 수 노출 여부",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:!1}}},type:{description:"input 타입(text, password 등 HTML input type들)",type:{name:"string"},options:["text","password"],control:"select",table:{type:{summary:"text | password"},defaultValue:{summary:"text"}}}},args:{label:"label",placeholder:"입력해주세요.",allowClear:!1,maxlength:100,showCount:!1},parameters:{componentSubtitle:"사용자 입력을 받기 위한 텍스트 필드입니다. 데이터를 제공하거나 변경하기 위해 키보드와 마우스를 사용할 수 있습니다.",docs:{description:{component:"label이 input 안에 위치하다가 클릭하면 상단으로 올라가는 스타일을 가진 input 컴포넌트입니다."}}},decorators:[f]},r={args:{label:"label"}},e={args:{...r.args,placeholder:"OO를 입력해주세요."}},t={args:{...r.args,allowClear:!0}},o={args:{...r.args,showCount:!0,maxlength:10}},a={args:{label:"password",type:"password"}};var s,p,l;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    label: 'label'
  }
}`,...(l=(p=r.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var n,m,i;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    placeholder: 'OO를 입력해주세요.'
  }
}`,...(i=(m=e.parameters)==null?void 0:m.docs)==null?void 0:i.source}}};var c,u,d;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    allowClear: true
  }
}`,...(d=(u=t.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var g,y,b;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    showCount: true,
    maxlength: 10
  }
}`,...(b=(y=o.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var w,h,C;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    label: 'password',
    type: 'password'
  }
}`,...(C=(h=a.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};const er=["Default","Placeholder","AllowClear","MaxlengthAndShowCount","TypePassword"];export{t as AllowClear,r as Default,o as MaxlengthAndShowCount,e as Placeholder,a as TypePassword,er as __namedExportsOrder,rr as default};
