import{w as f}from"./decorator-e53fb076.js";import{I as x}from"./CustomInput-dd06c449.js";import"./preview-errors-dde4324f.js";import"./index-356e4a49.js";import"./vue.esm-bundler-06433f34.js";import"./index-fe2cee87.js";import"./_arrayLikeKeys-856a4a59.js";import"./compact-item-943b0817.js";import"./extends-98964cd2.js";import"./_overRest-fdd2e9e6.js";import"./isArrayLikeObject-18ce9678.js";import"./isPlainObject-7ca50782.js";import"./dayjs.min-bd65d405.js";import"./_commonjsHelpers-de833af9.js";import"./pinia-1c824524.js";import"./index-c186720f.js";import"./FormItemContext-d5d2b6af.js";import"./statusUtils-981b964f.js";import"./vnode-0120d1ab.js";import"./CloseCircleFilled-0e0600c9.js";import"./index-9435a495.js";import"./index-aab19e1a.js";import"./index-df6759cb.js";import"./index-7bc94af2.js";import"./EyeOutlined-3dbe0b46.js";import"./_plugin-vue_export-helper-c27b6911.js";const U={title:"checkupuikit/Atoms/Input",component:x,tags:["autodocs"],argTypes:{label:{description:"input label",control:{type:"text"},table:{type:{summary:"string"}}},placeholder:{description:"input placeholder",control:{type:"text"},table:{type:{summary:"string"}}},allowClear:{description:"텍스트를 지우는 아이콘 사용 여부",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:!1}}},maxlength:{description:"최대 글자 수",control:{type:"number"},table:{type:{summary:"number"}}},showCount:{description:"글자 수 노출 여부",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:!1}}},type:{description:"input 타입(text, password 등 HTML input type들)",type:{name:"string"},options:["text","password"],control:"select",table:{type:{summary:"text | password"},defaultValue:{summary:"text"}}}},args:{label:"label",placeholder:"입력해주세요.",allowClear:!1,maxlength:100,showCount:!1},parameters:{componentSubtitle:"사용자 입력을 받기 위한 텍스트 필드입니다. 데이터를 제공하거나 변경하기 위해 키보드와 마우스를 사용할 수 있습니다.",docs:{description:{component:"label이 input 안에 위치하다가 클릭하면 상단으로 올라가는 스타일을 가진 input 컴포넌트입니다."}}},decorators:[f]},e={args:{label:"label"}},r={args:{...e.args,placeholder:"OO를 입력해주세요."}},t={args:{...e.args,allowClear:!0}},a={args:{...e.args,showCount:!0,maxlength:10}},o={args:{label:"password",type:"password"}};var s,l,p;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    label: 'label'
  }
}`,...(p=(l=e.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var n,m,c;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    placeholder: 'OO를 입력해주세요.'
  }
}`,...(c=(m=r.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var u,i,d;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    allowClear: true
  }
}`,...(d=(i=t.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var g,y,b;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    showCount: true,
    maxlength: 10
  }
}`,...(b=(y=a.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var w,h,C;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    label: 'password',
    type: 'password'
  }
}`,...(C=(h=o.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};const W=["Default","Placeholder","AllowClear","MaxlengthAndShowCount","TypePassword"];export{t as AllowClear,e as Default,a as MaxlengthAndShowCount,r as Placeholder,o as TypePassword,W as __namedExportsOrder,U as default};
