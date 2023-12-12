<template>
  <Form :model="formState" style="width: 300px">
    <FormItem
      label="Username"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <Input v-model:value="formState.username">
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
      <InputPassword v-model:value="formState.password">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </InputPassword>
    </FormItem>

    <FormItem>
      <FormItem name="remember" no-style>
        <Checkbox v-model:checked="formState.remember">Remember me</Checkbox>
      </FormItem>
      <a class="login-form-forgot" href="">Forgot password</a>
    </FormItem>

    <FormItem>
      <Button type="primary" html-type="submit" class="login-form-button"> Log in </Button>
      Or
      <a href="">register now!</a>
    </FormItem>
  </Form>
</template>

<script setup lang="ts" name="ComponentsOverviewContentForm">
import { Checkbox, Input, InputPassword } from 'ant-design-vue'
import { reactive } from 'vue'
import { Button } from '@/components/button'
import { Form, FormItem } from '@/components/form'
import { LockOutlined, UserOutlined } from '@/components/icons'

const formState = reactive<Record<string, any>>({
  'input-number': 3,
  'checkbox-group': ['A', 'B', 'C'],
  rate: 3.5
})
</script>
