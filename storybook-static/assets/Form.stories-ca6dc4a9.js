import{I as u,R as l,S as c,a as d,L as g,_ as f}from"./ContentForm-ac76be76.js";import{_ as F}from"./Button-041be21e.js";import"./DropdownButton-0331ed8d.js";import{_ as p,a as I}from"./FormItemRest-1bf65526.js";import"./SvgIcon-db9b006f.js";import{C as b,I as _,R as h,_ as S,a as w,b as C,c as k}from"./index-b4575248.js";import{U as x}from"./UserOutlined-639f3976.js";import{_ as y,a as R}from"./index-610f7029.js";import{S as v,a as O}from"./index-f0aafce9.js";import"./vue.esm-bundler-da3dfd31.js";import"./index-31244240.js";import"./extends-98964cd2.js";import"./slide-ff6c039b.js";import"./colors-099fe84d.js";import"./KeyCode-9b05785e.js";import"./index-e44b3b0d.js";import"./useRefs-6ca959ac.js";import"./index-2a8fec04.js";import"./pickAttrs-d6f9a41a.js";import"./isArrayLikeObject-523edb65.js";import"./_toKey-6cc18de3.js";import"./index-5df3ba7c.js";import"./ExclamationCircleFilled-da22edd1.js";import"./Col-72edfad4.js";import"./responsiveObserve-1261ffb7.js";import"./useFlexGapSupport-42c61aa1.js";import"./styleChecker-86e19025.js";import"./_flatRest-9379d133.js";import"./hasIn-c3b6575d.js";import"./_arrayIncludesWith-2f006ba6.js";import"./debounce-7fedd673.js";import"./collapseMotion-6307b6e4.js";import"./omit-3709658d.js";import"./index-c9501198.js";import"./_plugin-vue_export-helper-c27b6911.js";const le={title:"checkupuikit/Atoms/Form",component:p,tags:["autodocs"],argTypes:{default:{table:{type:""}},layout:{control:"select",options:["horizontal","vertical","inline"]},labelAlign:{control:"select",options:["left","right"]}},parameters:{docs:{description:{component:"Form 컴포넌트의 **Children 컴포넌트**로 **<code>&lt;FormItem/&gt; </code>**를 사용할 수 있습니다."}},componentSubtitle:"Form 컴포넌트는 인스턴스를 만들거나 정보를 수집해야 하는 경우, 특정 규칙에서 필드의 유효성을 검사해야 하는 경우에 사용할 수 있습니다. "},args:{disabled:!1,hideRequiredMark:!1,layout:"horizontal",labelAlign:"left"}},e={args:{formState:{"input-number":3,"checkbox-group":["A","B","C"],rate:3.5}},render:i=>({components:{Form:p,FormItem:I,CheckboxGroup:b,Col:y,Input:_,InputNumber:u,Radio:h,RadioButton:S,Checkbox:w,RadioGroup:C,Rate:l,Button:F,Row:R,Select:v,InputPassword:k,SelectOption:O,Slider:c,Switch:d,UserOutlined:x,LockOutlined:g},setup(){return{args:i}},template:` 
    <Form v-bind="args" :model="args.formState" >
    <FormItem
      label="Username"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <Input v-model:value="args.formState.username">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </Input>
    </FormItem>

    <FormItem
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <InputPassword v-model:value="args.formState.password">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </InputPassword>
    </FormItem>

    <FormItem>
      <FormItem name="remember" no-style>
        <Checkbox v-model:checked="args.formState.remember">Remember me</Checkbox>
      </FormItem>
      <a class="login-form-forgot" href="">Forgot password</a>
    </FormItem>

    <FormItem>
      <Button type="primary" html-type="submit" class="login-form-button"> Log in </Button>
      Or
      <a href="">register now!</a>
    </FormItem>
  </Form>
    `})},t={args:e.args,render:()=>({setup(){},components:{ContentForm:f},template:"<ContentForm/>"})};var r,o,n;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    formState: {
      'input-number': 3,
      'checkbox-group': ['A', 'B', 'C'],
      rate: 3.5
    }
  },
  render: args => ({
    components: {
      Form,
      FormItem,
      CheckboxGroup,
      Col,
      Input,
      InputNumber,
      Radio,
      RadioButton,
      Checkbox,
      RadioGroup,
      Rate,
      Button,
      Row,
      Select,
      InputPassword,
      SelectOption,
      Slider,
      Switch,
      UserOutlined,
      LockOutlined
    },
    setup() {
      return {
        args
      };
    },
    template: \` 
    <Form v-bind="args" :model="args.formState" >
    <FormItem
      label="Username"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <Input v-model:value="args.formState.username">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </Input>
    </FormItem>

    <FormItem
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <InputPassword v-model:value="args.formState.password">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </InputPassword>
    </FormItem>

    <FormItem>
      <FormItem name="remember" no-style>
        <Checkbox v-model:checked="args.formState.remember">Remember me</Checkbox>
      </FormItem>
      <a class="login-form-forgot" href="">Forgot password</a>
    </FormItem>

    <FormItem>
      <Button type="primary" html-type="submit" class="login-form-button"> Log in </Button>
      Or
      <a href="">register now!</a>
    </FormItem>
  </Form>
    \`
  })
}`,...(n=(o=e.parameters)==null?void 0:o.docs)==null?void 0:n.source}}};var m,a,s;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: Default.args,
  render: () => ({
    setup() {},
    components: {
      ContentForm
    },
    template: \`<ContentForm/>\`
  })
}`,...(s=(a=t.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const ce=["Default","CustomForm"];export{t as CustomForm,e as Default,ce as __namedExportsOrder,le as default};
