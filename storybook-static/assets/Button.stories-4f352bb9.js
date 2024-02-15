import{_}from"./Button-f7730f75.js";import"./DropdownButton-c71d963a.js";import"./motion-8927e1f6.js";import"./vue.esm-bundler-06433f34.js";import"./compact-item-943b0817.js";import"./extends-98964cd2.js";import"./index-aab19e1a.js";import"./index-df6759cb.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./slide-14b3f38e.js";import"./motionUtil-c773f409.js";import"./vnode-0120d1ab.js";import"./_arrayLikeKeys-856a4a59.js";import"./roundedArrow-e2771650.js";import"./RightOutlined-811eef93.js";const G={title:"checkupuikit/Atoms/Button",component:_,tags:["autodocs"],argTypes:{default:{table:{type:""},control:Object},click:{table:{type:""},control:Object},style:{table:{type:""},control:Object},label:{type:{name:"string",required:!1},defaultValue:"button",control:{type:"text"}},type:{type:{name:"string",required:!1},options:["default","primary","dashed","text","link"],control:"select",table:{type:{summary:"primary | ghost | dashed | link | text | default"},defaultValue:{summary:"default"}}},icon:{description:"아이콘 추가",type:{name:"string",required:!1},options:["download","plusCircle","excel"],control:"select",table:{type:{summary:"download | plus | excel"}}},size:{type:{name:"string",required:!1},options:["small","middle","large"],control:"select",table:{type:{summary:"large | middle | small"},defaultValue:{summary:"middle"}}},shape:{type:{name:"string",required:!1},options:["default","round","circle"],control:"select",table:{type:{summary:"default | circle | round"},defaultValue:{summary:"default"}}},loading:{type:{name:"boolean",required:!1},table:{type:{summary:"boolean | { delay: number }"},defaultValue:{summary:!1}}},disabled:{type:{name:"boolean",required:!1},table:{type:{summary:"boolean"},defaultValue:{summary:!1}}}},args:{loading:!1,disabled:!1,size:"middle",shape:"default"},parameters:{componentSubtitle:"Button 컴포넌트의 클릭이벤트를 활용하여 다양한 비즈니스 로직을 수행할 수 있습니다."}},e={args:{label:"Button",type:"primary"}},a={args:{...e.args},parameters:{designToken:{tabs:["Colors"]}}},r={args:{label:"Button"}},t={args:{label:"Loading!",type:"primary",loading:!0}},o={args:{shape:"circle",loading:!0}},s={args:{label:"Download",icon:"download"}};var n,l,i;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    label: 'Button',
    type: 'primary'
  }
}`,...(i=(l=e.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};var m,p,d;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    ...Primary.args
  },
  parameters: {
    designToken: {
      tabs: ['Colors']
    }
  }
}`,...(d=(p=a.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var c,u,y;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    label: 'Button'
  }
}`,...(y=(u=r.parameters)==null?void 0:u.docs)==null?void 0:y.source}}};var g,b,f;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    label: 'Loading!',
    type: 'primary',
    loading: true
  }
}`,...(f=(b=t.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var S,h,x;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    shape: 'circle',
    loading: true
  }
}`,...(x=(h=o.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var w,k,q;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    label: 'Download',
    icon: 'download'
  }
}`,...(q=(k=s.parameters)==null?void 0:k.docs)==null?void 0:q.source}}};const H=["Primary","ColorsOnly","Secondary","LoadingSpinnerWithText","LoadingSpinner","Download"];export{a as ColorsOnly,s as Download,o as LoadingSpinner,t as LoadingSpinnerWithText,e as Primary,r as Secondary,H as __namedExportsOrder,G as default};
