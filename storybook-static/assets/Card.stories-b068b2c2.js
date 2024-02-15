import{c as i}from"./checkup_logo_simple_light-830d5302.js";import{w as A}from"./decorator-e53fb076.js";import{C as P}from"./CardList-527706f2.js";import"./preview-errors-dde4324f.js";import"./index-356e4a49.js";import"./vue.esm-bundler-06433f34.js";import"./Button-f7730f75.js";import"./motion-8927e1f6.js";import"./compact-item-943b0817.js";import"./extends-98964cd2.js";import"./index-aab19e1a.js";import"./index-df6759cb.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./dayjs.min-bd65d405.js";import"./_commonjsHelpers-de833af9.js";import"./index-fe2cee87.js";import"./_arrayLikeKeys-856a4a59.js";import"./_overRest-fdd2e9e6.js";import"./isArrayLikeObject-18ce9678.js";import"./isPlainObject-7ca50782.js";import"./pinia-1c824524.js";import"./css-1021bd93.js";import"./useMergedState-9fc4af37.js";import"./index-20ecb033.js";import"./KeyCode-5dbefdba.js";import"./pickAttrs-7c36c3e9.js";import"./LeftOutlined-2c031711.js";import"./RightOutlined-811eef93.js";import"./SwapOutlined-5132679b.js";import"./EyeOutlined-3dbe0b46.js";import"./index-30344dd3.js";import"./FormItemContext-d5d2b6af.js";const et={title:"checkupuikit/Atoms/Card",component:P,tags:["autodocs"],argTypes:{title:{description:"카드 제목",control:{type:"text"},table:{type:{summary:"string"}}},useCheckbox:{description:"카드 체크박스 사용 유무",table:{type:{summary:"boolean"},defaultValue:{summary:!1}}},item:{description:"카드 내용",control:{type:"text"},table:{type:{summary:"string"}}},imgUrl:{description:"카드 커버 이미지",control:{type:"text"},table:{type:{summary:"string"}}},detailBtnPosition:{description:"카드 상세보기 스타일 타입",type:{name:"string"},options:["middle","bottom"],control:"select",table:{type:{summary:"middle | bottom"},defaultValue:{summary:"middle"}}},imgPreview:{description:"카드 이미지 미리보기 기능 사용 유무",table:{type:{summary:"boolean"},defaultValue:{summary:!0}}},tag:{description:"카드 내용의 구분 태그",control:{type:"text"},table:{type:{summary:"string"}}}},args:{useCheckbox:!1,imgPreview:!0,imgUrl:i,detailBtnPosition:"middle",title:"카드제목",date:"",content:"123",tag:"태그",createdAt:1706511810},parameters:{componentSubtitle:"카드 컴포넌트를 사용하여 단일 주제와 관련된 콘텐츠를 표시할 수 있습니다. 콘텐츠는 다양한 유형과 크기의 여러 요소로 구성될 수 있습니다.",actions:{}},decorators:[A]},t={args:{content:"카드 컴포넌트를 사용하여 단일 주제와 관련된 콘텐츠를 표시할 수 있습니다."}},e={args:{...t.args,title:"카드 제목",detailBtnPosition:"middle"}},r={args:{...t.args,title:"카드 제목",detailBtnPosition:"bottom"}},o={args:{...t.args,title:"카드 제목",content:"카드 컴포넌트를 사용하여 단일 주제와 관련된 콘텐츠를 표시할 수 있습니다.",imgUrl:i,imgPreview:!0}},u={args:{...t.args,title:"카드 제목",imgUrl:i,useCheckbox:!0}};var a,s,m;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    content: '카드 컴포넌트를 사용하여 단일 주제와 관련된 콘텐츠를 표시할 수 있습니다.'
  }
}`,...(m=(s=t.parameters)==null?void 0:s.docs)==null?void 0:m.source}}};var n,C,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: '카드 제목',
    detailBtnPosition: 'middle'
  }
}`,...(p=(C=e.parameters)==null?void 0:C.docs)==null?void 0:p.source}}};var c,l,d;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: '카드 제목',
    detailBtnPosition: 'bottom'
  }
}`,...(d=(l=r.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var g,B,D;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: '카드 제목',
    content: '카드 컴포넌트를 사용하여 단일 주제와 관련된 콘텐츠를 표시할 수 있습니다.',
    imgUrl: checkupLogo,
    imgPreview: true
  }
}`,...(D=(B=o.parameters)==null?void 0:B.docs)==null?void 0:D.source}}};var y,b,E;u.parameters={...u.parameters,docs:{...(y=u.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: '카드 제목',
    imgUrl: checkupLogo,
    useCheckbox: true
  }
}`,...(E=(b=u.parameters)==null?void 0:b.docs)==null?void 0:E.source}}};const rt=["Default","DetailButtonPositionMiddle","DetailButtonPositionBottom","ImgPreview","Checkbox"];export{u as Checkbox,t as Default,r as DetailButtonPositionBottom,e as DetailButtonPositionMiddle,o as ImgPreview,rt as __namedExportsOrder,et as default};
