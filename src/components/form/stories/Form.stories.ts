import type { Meta, StoryObj } from '@storybook/vue3'
import {
  Checkbox,
  CheckboxGroup,
  Col,
  InputNumber,
  InputPassword,
  Radio,
  RadioButton,
  RadioGroup,
  Rate,
  Row,
  Select,
  SelectOption,
  Slider,
  Switch
} from 'ant-design-vue'
import type { ComponentProps } from 'vue-component-type-helpers'

import ContentForm from '@/views/components-overview/form/components/ContentForm.vue'

import { Button } from '@/components/button'
import { Form, FormItem } from '@/components/form'
import { LockOutlined, UserOutlined } from '@/components/icons'
import { Input } from '@/components/input'

const meta: Meta<ComponentProps<typeof Form>> = {
  title: 'checkupuikit/Atoms/Form',
  component: Form,
  tags: ['autodocs'],
  argTypes: {
    default: {
      table: { type: '' }
    },
    layout: {
      control: 'select',
      options: ['horizontal', 'vertical', 'inline']
    },
    labelAlign: {
      control: 'select',
      options: ['left', 'right']
    }
  },
  parameters: {
    docs: {
      description: {
        component: `Form 컴포넌트의 **Children 컴포넌트**로 **<code>&lt;FormItem/&gt; </code>**를 사용할 수 있습니다.`
      }
    },
    componentSubtitle: `Form 컴포넌트는 인스턴스를 만들거나 정보를 수집해야 하는 경우, 특정 규칙에서 필드의 유효성을 검사해야 하는 경우에 사용할 수 있습니다. `
  },
  args: {
    disabled: false,
    hideRequiredMark: false,
    layout: 'horizontal',
    labelAlign: 'left'
  }
}

export default meta
type Story = StoryObj<typeof Form>

export const Default: Story = {
  args: {
    formState: {
      'input-number': 3,
      'checkbox-group': ['A', 'B', 'C'],
      rate: 3.5
    }
  },

  render: (args) => ({
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
      return { args }
    },
    template: ` 
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
    `
  })
}

export const CustomForm: Story = {
  args: Default.args,
  render: () => ({
    setup() {},
    components: { ContentForm },
    template: `<ContentForm/>`
  })
}
