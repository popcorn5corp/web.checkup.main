import{w as u}from"./decorator-e53fb076.js";import{S as d}from"./CustomSelect-c0661bdf.js";import"./preview-errors-dde4324f.js";import"./index-356e4a49.js";import"./vue.esm-bundler-06433f34.js";import"./index-fe2cee87.js";import"./_arrayLikeKeys-856a4a59.js";import"./compact-item-943b0817.js";import"./extends-98964cd2.js";import"./_overRest-fdd2e9e6.js";import"./isArrayLikeObject-18ce9678.js";import"./isPlainObject-7ca50782.js";import"./dayjs.min-bd65d405.js";import"./_commonjsHelpers-de833af9.js";import"./pinia-1c824524.js";import"./index-0b93d195.js";import"./slide-14b3f38e.js";import"./motion-8927e1f6.js";import"./motionUtil-c773f409.js";import"./vnode-0120d1ab.js";import"./KeyCode-5dbefdba.js";import"./statusUtils-981b964f.js";import"./pickAttrs-7c36c3e9.js";import"./isMobile-12f0741d.js";import"./index-7bc94af2.js";import"./useMergedState-9fc4af37.js";import"./CloseCircleFilled-0e0600c9.js";import"./FormItemContext-d5d2b6af.js";import"./_plugin-vue_export-helper-c27b6911.js";const g=[{label:"활성",value:"ACTIVE"},{label:"비활성",value:"INACTIVE"},{label:"탈퇴",value:"WITHDRAWN"},{label:"퇴출",value:"REVOKE"}],G={title:"checkupuikit/Atoms/Select",component:d,tags:["autodocs"],argTypes:{label:{description:"라벨 텍스트",table:{type:{summary:"string"}}},width:{description:"라벨 넓이 조정",table:{type:{summary:"string"}}},options:{description:"선택 옵션값",control:{type:"array"},table:{type:{summary:"array"}}},placeholder:{description:"선택시 표출되는 placeholder",control:{type:"text"},table:{type:{summary:"string"}}},allowClear:{description:"선택항목을 지우는 아이콘 사용 여부",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:!1}}}},args:{placeholder:"내용을 선택해주세요.",width:"300px",options:g,allowClear:!1},parameters:{componentSubtitle:"사용자 입력을 받기 위한 텍스트 필드입니다. 데이터를 제공하거나 변경하기 위해 키보드와 마우스를 사용할 수 있습니다.",docs:{description:{component:"label이 input 안에 위치하다가 클릭하면 상단으로 올라가는 스타일을 가진 input 컴포넌트입니다."}}},decorators:[u]},r={args:{label:"label"}},e={args:{...r.args,placeholder:"OO를 입력해주세요."}},t={args:{...r.args,allowClear:!0}};var a,o,l;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    label: 'label'
  }
}`,...(l=(o=r.parameters)==null?void 0:o.docs)==null?void 0:l.source}}};var s,p,i;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    placeholder: 'OO를 입력해주세요.'
  }
}`,...(i=(p=e.parameters)==null?void 0:p.docs)==null?void 0:i.source}}};var m,c,n;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    allowClear: true
  }
}`,...(n=(c=t.parameters)==null?void 0:c.docs)==null?void 0:n.source}}};const J=["Default","Placeholder","AllowClear"];export{t as AllowClear,r as Default,e as Placeholder,J as __namedExportsOrder,G as default};
