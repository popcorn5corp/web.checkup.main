import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import ContentForm from '@/views/components-overview/form/components/ContentForm.vue'
import LoginForm from '@/views/components-overview/form/components/LoginForm.vue'
import { Form } from '../'

const meta: Meta<ComponentProps<typeof Form>> = {
  title: 'checkupuikit/Atoms/Form',
  component: Form,
  tags: ['autodocs'],
  argTypes: {
    model: {
      'input-number': 3,
      'checkbox-group': ['A', 'B', 'C'],
      rate: 3.5
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
    model: []
  }
}

export default meta
type Story = StoryObj<typeof Form>

export const DefaultValidForm: Story = {
  args: {
    model: { username: '', password: '', remember: true }
  },

  render: (args) => ({
    components: {
      ContentForm
    },
    setup() {
      return { args }
    },
    template: ` 
     <ContentForm/>
     
    `
  })
}

export const LoginValidForm: Story = {
  args: {
    model: { username: '', password: '', remember: true }
  },

  render: (args) => ({
    components: {
      LoginForm
    },
    setup() {
      return { args }
    },
    template: `<LoginForm/>`
  })
}
