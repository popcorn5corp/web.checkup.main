import{I as u,R as l,S as c,a as d,L as f,_ as g}from"./ContentForm-d74c1d64.js";import{_ as F}from"./Button-f7730f75.js";import"./DropdownButton-c71d963a.js";import{_ as p,a as I}from"./FormItemRest-17cb8524.js";import"./SvgIcon-c1119032.js";import{I as b,a as _}from"./index-c186720f.js";import{R as h,_ as S,a as w}from"./index-0fc5836e.js";import{C,a as k}from"./index-30344dd3.js";import{U as x}from"./UserOutlined-0136ff76.js";import{_ as y,a as R}from"./index-dbf92ae9.js";import{S as v,a as O}from"./index-0b93d195.js";import"./vue.esm-bundler-06433f34.js";import"./compact-item-943b0817.js";import"./extends-98964cd2.js";import"./slide-14b3f38e.js";import"./motion-8927e1f6.js";import"./motionUtil-c773f409.js";import"./vnode-0120d1ab.js";import"./_arrayLikeKeys-856a4a59.js";import"./isMobile-12f0741d.js";import"./index-7bc94af2.js";import"./index-aab19e1a.js";import"./index-df6759cb.js";import"./KeyCode-5dbefdba.js";import"./FormItemContext-d5d2b6af.js";import"./statusUtils-981b964f.js";import"./index-9435a495.js";import"./index-8de211b8.js";import"./firstNotUndefined-29a740f3.js";import"./colors-897f8409.js";import"./useRefs-d53d1c11.js";import"./index-dcf0c7b3.js";import"./pickAttrs-7c36c3e9.js";import"./isArrayLikeObject-18ce9678.js";import"./_overRest-fdd2e9e6.js";import"./isPlainObject-7ca50782.js";import"./index-6855d82a.js";import"./CloseCircleFilled-0e0600c9.js";import"./ExclamationCircleFilled-d404fa4e.js";import"./cloneDeep-63a05421.js";import"./Col-5366a844.js";import"./responsiveObserve-dd206e94.js";import"./useFlexGapSupport-b50d290f.js";import"./styleChecker-c17e3bbb.js";import"./_flatRest-00fa2235.js";import"./_toKey-f8a2c48c.js";import"./isSymbol-4808126a.js";import"./hasIn-bc278bbb.js";import"./_arrayIncludesWith-2f006ba6.js";import"./debounce-849adbc2.js";import"./collapseMotion-a3198536.js";import"./omit-b91ff683.js";import"./EyeOutlined-3dbe0b46.js";import"./index-8e1e520f.js";import"./useMergedState-9fc4af37.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./roundedArrow-e2771650.js";import"./RightOutlined-811eef93.js";const qe={title:"checkupuikit/Atoms/Form",component:p,tags:["autodocs"],argTypes:{default:{table:{type:""}},layout:{control:"select",options:["horizontal","vertical","inline"]},labelAlign:{control:"select",options:["left","right"]}},parameters:{docs:{description:{component:"Form 컴포넌트의 **Children 컴포넌트**로 **<code>&lt;FormItem/&gt; </code>**를 사용할 수 있습니다."}},componentSubtitle:"Form 컴포넌트는 인스턴스를 만들거나 정보를 수집해야 하는 경우, 특정 규칙에서 필드의 유효성을 검사해야 하는 경우에 사용할 수 있습니다. "},args:{disabled:!1,hideRequiredMark:!1,layout:"horizontal",labelAlign:"left"}},e={args:{formState:{"input-number":3,"checkbox-group":["A","B","C"],rate:3.5}},render:i=>({components:{Form:p,FormItem:I,CheckboxGroup:C,Col:y,Input:b,InputNumber:u,Radio:h,RadioButton:S,Checkbox:k,RadioGroup:w,Rate:l,Button:F,Row:R,Select:v,InputPassword:_,SelectOption:O,Slider:c,Switch:d,UserOutlined:x,LockOutlined:f},setup(){return{args:i}},template:` 
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
    `})},r={args:e.args,render:()=>({setup(){},components:{ContentForm:g},template:"<ContentForm/>"})};var t,o,m;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
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
}`,...(m=(o=e.parameters)==null?void 0:o.docs)==null?void 0:m.source}}};var n,a,s;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: Default.args,
  render: () => ({
    setup() {},
    components: {
      ContentForm
    },
    template: \`<ContentForm/>\`
  })
}`,...(s=(a=r.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const Ae=["Default","CustomForm"];export{r as CustomForm,e as Default,Ae as __namedExportsOrder,qe as default};
