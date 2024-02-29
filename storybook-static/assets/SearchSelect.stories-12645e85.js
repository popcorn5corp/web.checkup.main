import{b as f}from"./vue.esm-bundler-da3dfd31.js";import{_ as x,a as y}from"./ImgSearchSelect-ef8db7d5.js";import"./SvgIcon-db9b006f.js";import{S as g}from"./SearchSelect-04b559f6.js";import{C as T}from"./index-f0aafce9.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./useTheme-eec4b019.js";import"./vue-router-212c06c4.js";import"./extends-98964cd2.js";import"./vue-i18n.runtime-54aa6b03.js";import"./_baseSet-de153ea0.js";import"./_toKey-6cc18de3.js";import"./index-31244240.js";import"./slide-ff6c039b.js";import"./isArrayLikeObject-523edb65.js";import"./index-b4575248.js";import"./pickAttrs-d6f9a41a.js";import"./colors-099fe84d.js";import"./Accordion-1ff785b2.js";import"./_commonjsHelpers-de833af9.js";import"./KeyCode-9b05785e.js";import"./ClockCircleOutlined-566f9eed.js";import"./shallowequal-23878baf.js";import"./collapseMotion-6307b6e4.js";import"./index-6cf4e6ab.js";import"./iframe-8ae88575.js";import"../sb-preview/runtime.js";import"./Button-041be21e.js";import"./DropdownButton-0331ed8d.js";import"./index-9fe1cf39.js";import"./ExclamationCircleFilled-da22edd1.js";import"./debounce-7fedd673.js";import"./index-bf79754e.js";const te={title:"checkupuikit/Atoms/SearchSelect",component:g,tags:["autodocs"],parameters:{docs:{},componentSubtitle:"SearchSelect 컴포넌트는 선택 요소의 정보를 다양하게 보여줄 수 있습니다. "},argTypes:{statusDisabledText:{description:"비활성화 상태일 경우 텍스트 표현",table:{type:{summary:"string"}}},statusSelectedText:{description:"선택된 상태일 경우 텍스트 표현",table:{type:{summary:"string"}}},width:{description:"넓이 조정",type:{name:"string"},table:{type:{summary:"px, %, em, ref ..."},defaultValue:{summary:"50%"}}},options:{control:Object,table:{type:{summary:"SelectOptions[]"}}},pagination:{control:Object,description:"데이터 Pagination 정보",table:{type:{summary:"Recordable"}}},"update:modelValue":{description:"선택된 데이터 목록",control:Object,table:{type:{summary:"Array"}}},search:{description:"검색시 호출되는 Callback",control:Object,table:{type:{summary:"() => void"}}}},args:{width:"700px",statusSelectedText:"선택됨",statusDisabledText:"비활성화",placeholder:"텍스트를 입력해주세요."}},r={render:e=>({components:{SearchSelect:g,CheckOutlined:T},setup(){const o=f();return fetch("https://randomuser.me/api/?results=5").then(n=>n.json()).then(n=>{o.value=n.results.map((t,b)=>({label:`${t.name.first} ${t.name.last}`,description:`(${t.email})`,value:t.name.first,prefixImg:t.picture.large,disabled:b%2!==0}))}),{args:e,options:o}},template:`
      <SearchSelect v-bind="args" :options="options" :placeholder="args.placeholder">
        <template #statusDisabledText>{{args.statusDisabledText}}</template>
        <template #statusSelectedText>{{args.statusSelectedText}}</template>
      </SearchSelect>
    `})},a={render:e=>({components:{ImgSearchSelect:x},setup(){return{args:e}},template:'<ImgSearchSelect width="args.width"/>'})},s={render:e=>({components:{DefaultSearchSelect:y},setup(){return{args:e}},template:'<DefaultSearchSelect width="args.width"/>'})};var p,m,c;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: args => ({
    components: {
      SearchSelect,
      CheckOutlined
    },
    setup() {
      const options = ref();
      fetch('https://randomuser.me/api/?results=5').then(response => response.json()).then(data => {
        options.value = data.results.map((user: any, index: any) => ({
          label: \`\${user.name.first} \${user.name.last}\`,
          description: \`(\${user.email})\`,
          value: user.name.first,
          prefixImg: user.picture.large,
          disabled: index % 2 === 0 ? false : true
        }));
      });
      return {
        args,
        options
      };
    },
    template: \`
      <SearchSelect v-bind="args" :options="options" :placeholder="args.placeholder">
        <template #statusDisabledText>{{args.statusDisabledText}}</template>
        <template #statusSelectedText>{{args.statusSelectedText}}</template>
      </SearchSelect>
    \`
  })
}`,...(c=(m=r.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var i,l,u;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: args => ({
    components: {
      ImgSearchSelect
    },
    setup() {
      return {
        args
      };
    },
    template: \`<ImgSearchSelect width="args.width"/>\`
  })
}`,...(u=(l=a.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var d,S,h;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: args => ({
    components: {
      DefaultSearchSelect
    },
    setup() {
      return {
        args
      };
    },
    template: \`<DefaultSearchSelect width="args.width"/>\`
  })
}`,...(h=(S=s.parameters)==null?void 0:S.docs)==null?void 0:h.source}}};const re=["Default","CustomImgSearchSelect","CustomSearchSelect"];export{a as CustomImgSearchSelect,s as CustomSearchSelect,r as Default,re as __namedExportsOrder,te as default};
