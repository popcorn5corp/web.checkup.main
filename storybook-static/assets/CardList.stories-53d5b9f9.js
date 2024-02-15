import{c as m}from"./checkup_logo_simple_light-830d5302.js";import{w as U}from"./decorator-e53fb076.js";import{b as v}from"./mock-9a51c207.js";import{a as M}from"./CardList-527706f2.js";import"./preview-errors-dde4324f.js";import"./index-356e4a49.js";import"./vue.esm-bundler-06433f34.js";import"./Button-f7730f75.js";import"./motion-8927e1f6.js";import"./compact-item-943b0817.js";import"./extends-98964cd2.js";import"./index-aab19e1a.js";import"./index-df6759cb.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./dayjs.min-bd65d405.js";import"./_commonjsHelpers-de833af9.js";import"./index-fe2cee87.js";import"./_arrayLikeKeys-856a4a59.js";import"./_overRest-fdd2e9e6.js";import"./isArrayLikeObject-18ce9678.js";import"./isPlainObject-7ca50782.js";import"./pinia-1c824524.js";import"./css-1021bd93.js";import"./useMergedState-9fc4af37.js";import"./index-20ecb033.js";import"./KeyCode-5dbefdba.js";import"./pickAttrs-7c36c3e9.js";import"./LeftOutlined-2c031711.js";import"./RightOutlined-811eef93.js";import"./SwapOutlined-5132679b.js";import"./EyeOutlined-3dbe0b46.js";import"./index-30344dd3.js";import"./FormItemContext-d5d2b6af.js";const de={title:"checkupuikit/Atoms/CardList",component:M,tags:["autodocs"],argTypes:{useCheckbox:{description:"카드 체크박스 사용 유무",table:{type:{summary:"boolean"},defaultValue:{summary:!1}}},size:{description:"카드 리스트 크기",type:{name:"string"},options:["middle","large"],control:"select",table:{type:{summary:"middle | large"},defaultValue:{summary:"middle"}}},items:{description:"카드 내용"},imgUrl:{description:"카드 커버 이미지",control:{type:"text"},table:{type:{summary:"string"}}},detailBtnPosition:{description:"카드 상세보기 스타일 타입",type:{name:"string"},options:["middle","bottom"],control:"select",table:{type:{summary:"middle | bottom"},defaultValue:{summary:"middle"}}},imgPreview:{description:"카드 이미지 미리보기 기능 사용 유무",table:{type:{summary:"boolean"},defaultValue:{summary:!0}}}},args:{useCheckbox:!1,imgPreview:!0,imgUrl:m,items:v,size:"middle",detailBtnPosition:"middle"},parameters:{componentSubtitle:"카드 컴포넌트를 사용하여 카드 리스트를 구현 할 수 있습니다.",actions:{}},decorators:[U]},e={args:{items:v}},t={args:{...e.args,size:"middle",detailBtnPosition:"bottom"}},r={args:{...e.args,size:"large",detailBtnPosition:"bottom"}},o={args:{...e.args,detailBtnPosition:"middle"}},s={args:{...e.args,detailBtnPosition:"bottom"}},a={args:{...e.args,imgUrl:m,imgPreview:!0}},i={args:{...e.args,imgUrl:m,useCheckbox:!0}};var n,p,c;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    items: baseContent
  }
}`,...(c=(p=e.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var d,l,u;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    size: 'middle',
    detailBtnPosition: 'bottom'
  }
}`,...(u=(l=t.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var g,b,P;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    size: 'large',
    detailBtnPosition: 'bottom'
  }
}`,...(P=(b=r.parameters)==null?void 0:b.docs)==null?void 0:P.source}}};var f,y,B;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    detailBtnPosition: 'middle'
  }
}`,...(B=(y=o.parameters)==null?void 0:y.docs)==null?void 0:B.source}}};var D,S,h;s.parameters={...s.parameters,docs:{...(D=s.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    detailBtnPosition: 'bottom'
  }
}`,...(h=(S=s.parameters)==null?void 0:S.docs)==null?void 0:h.source}}};var k,z,C;a.parameters={...a.parameters,docs:{...(k=a.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    imgUrl: checkupLogo,
    imgPreview: true
  }
}`,...(C=(z=a.parameters)==null?void 0:z.docs)==null?void 0:C.source}}};var x,w,L;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    imgUrl: checkupLogo,
    useCheckbox: true
  }
}`,...(L=(w=i.parameters)==null?void 0:w.docs)==null?void 0:L.source}}};const le=["Default","MiddleSize","LargeSize","DetailButtonPositionMiddle","DetailButtonPositionBottom","ImgPreview","Checkbox"];export{i as Checkbox,e as Default,s as DetailButtonPositionBottom,o as DetailButtonPositionMiddle,a as ImgPreview,r as LargeSize,t as MiddleSize,le as __namedExportsOrder,de as default};
