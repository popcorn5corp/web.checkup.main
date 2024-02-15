import{b as f}from"./vue.esm-bundler-06433f34.js";import{_ as x,a as y}from"./ImgSearchSelect-05ed346c.js";import"./SvgIcon-c1119032.js";import{S as g}from"./SearchSelect-5f872db7.js";import{C as T}from"./index-0b93d195.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./index-fe2cee87.js";import"./_arrayLikeKeys-856a4a59.js";import"./compact-item-943b0817.js";import"./extends-98964cd2.js";import"./_overRest-fdd2e9e6.js";import"./isArrayLikeObject-18ce9678.js";import"./isPlainObject-7ca50782.js";import"./dayjs.min-bd65d405.js";import"./_commonjsHelpers-de833af9.js";import"./pinia-1c824524.js";import"./debounce-849adbc2.js";import"./isSymbol-4808126a.js";import"./KeyCode-5dbefdba.js";import"./index-2e1e68bc.js";import"./motion-8927e1f6.js";import"./index-9c7320cf.js";import"./index-df6759cb.js";import"./colors-897f8409.js";import"./slide-14b3f38e.js";import"./motionUtil-c773f409.js";import"./vnode-0120d1ab.js";import"./statusUtils-981b964f.js";import"./pickAttrs-7c36c3e9.js";import"./isMobile-12f0741d.js";import"./index-7bc94af2.js";import"./useMergedState-9fc4af37.js";import"./CloseCircleFilled-0e0600c9.js";import"./FormItemContext-d5d2b6af.js";const re={title:"checkupuikit/Atoms/SearchSelect",component:g,tags:["autodocs"],parameters:{docs:{},componentSubtitle:"SearchSelect 컴포넌트는 선택 요소의 정보를 다양하게 보여줄 수 있습니다. "},argTypes:{statusDisabledText:{description:"비활성화 상태일 경우 텍스트 표현",table:{type:{summary:"string"}}},statusSelectedText:{description:"선택된 상태일 경우 텍스트 표현",table:{type:{summary:"string"}}},width:{description:"넓이 조정",type:{name:"string"},table:{type:{summary:"px, %, em, ref ..."},defaultValue:{summary:"50%"}}},options:{control:Object,table:{type:{summary:"SelectOptions[]"}}},pagination:{control:Object,description:"데이터 Pagination 정보",table:{type:{summary:"Recordable"}}},"update:modelValue":{description:"선택된 데이터 목록",control:Object,table:{type:{summary:"Array"}}},search:{description:"검색시 호출되는 Callback",control:Object,table:{type:{summary:"() => void"}}}},args:{width:"700px",statusSelectedText:"선택됨",statusDisabledText:"비활성화",placeholder:"텍스트를 입력해주세요."}},r={render:e=>({components:{SearchSelect:g,CheckOutlined:T},setup(){const o=f();return fetch("https://randomuser.me/api/?results=5").then(n=>n.json()).then(n=>{o.value=n.results.map((t,b)=>({label:`${t.name.first} ${t.name.last}`,description:`(${t.email})`,value:t.name.first,prefixImg:t.picture.large,disabled:b%2!==0}))}),{args:e,options:o}},template:`
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
}`,...(h=(S=s.parameters)==null?void 0:S.docs)==null?void 0:h.source}}};const ae=["Default","CustomImgSearchSelect","CustomSearchSelect"];export{a as CustomImgSearchSelect,s as CustomSearchSelect,r as Default,ae as __namedExportsOrder,re as default};
