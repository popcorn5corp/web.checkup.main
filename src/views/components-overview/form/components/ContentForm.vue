<template>
  <Form
    v-bind="formItemLayout"
    :model="formState"
    @finishFailed="onFinishFailed"
    @finish="onFinish"
    @submit="onSubmit"
    style="width: 800px"
  >
    <FormItem :wrapper-col="{ span: 12, offset: 6 }" style="text-align: right">
      <Button type="primary" html-type="submit">Submit</Button>
    </FormItem>

    <FormItem label="Plain Text">
      <span class="ant-form-text">China</span>
    </FormItem>

    <FormItem
      name="select"
      label="Select"
      :rules="[{ required: true, message: 'Please select your country!' }]"
    >
      <a-select v-model:value="formState.select" placeholder="Please select a country">
        <a-select-option value="china">China</a-select-option>
        <a-select-option value="usa">U.S.A</a-select-option>
      </a-select>
    </FormItem>

    <FormItem
      name="select-multiple"
      label="Select[multiple]"
      :rules="[{ required: true, message: 'Please select your favourite colors!', type: 'array' }]"
    >
      <a-select
        v-model:value="formState['select-multiple']"
        mode="multiple"
        placeholder="Please select favourite colors"
      >
        <a-select-option value="red">Red</a-select-option>
        <a-select-option value="green">Green</a-select-option>
        <a-select-option value="blue">Blue</a-select-option>
      </a-select>
    </FormItem>

    <FormItem label="InputNumber" :rules="[{ required: true }]">
      <a-input-number v-model:value="formState['input-number']" :min="1" :max="10" />
    </FormItem>

    <FormItem name="switch" label="Switch">
      <a-switch v-model:checked="formState.switch" />
    </FormItem>

    <FormItem name="slider" label="Slider">
      <a-slider
        v-model:value="formState.slider"
        :marks="{
          0: 'A',
          20: 'B',
          40: 'C',
          60: 'D',
          80: 'E',
          100: 'F'
        }"
      />
    </FormItem>

    <FormItem name="radio-group" label="Radio.Group">
      <a-radio-group v-model:value="formState['radio-group']">
        <a-radio value="a">item 1</a-radio>
        <a-radio value="b">item 2</a-radio>
        <a-radio value="c">item 3</a-radio>
      </a-radio-group>
    </FormItem>

    <FormItem
      name="radio-button"
      label="Radio.Button"
      :rules="[{ required: true, message: 'Please pick an item!' }]"
    >
      <a-radio-group v-model:value="formState['radio-button']">
        <a-radio-button value="a">item 1</a-radio-button>
        <a-radio-button value="b">item 2</a-radio-button>
        <a-radio-button value="c">item 3</a-radio-button>
      </a-radio-group>
    </FormItem>

    <FormItem name="checkbox-group" label="Checkbox.Group">
      <a-checkbox-group v-model:value="formState['checkbox-group']">
        <a-row>
          <a-col :span="8">
            <a-checkbox value="A" style="line-height: 32px">A</a-checkbox>
          </a-col>
          <a-col :span="8">
            <a-checkbox value="B" style="line-height: 32px" disabled>B</a-checkbox>
          </a-col>
          <a-col :span="8">
            <a-checkbox value="C" style="line-height: 32px">C</a-checkbox>
          </a-col>
          <a-col :span="8">
            <a-checkbox value="D" style="line-height: 32px">D</a-checkbox>
          </a-col>
          <a-col :span="8">
            <a-checkbox value="E" style="line-height: 32px">E</a-checkbox>
          </a-col>
          <a-col :span="8">
            <a-checkbox value="F" style="line-height: 32px">F</a-checkbox>
          </a-col>
        </a-row>
      </a-checkbox-group>
    </FormItem>

    <FormItem name="rate" label="Rate">
      <a-rate v-model:value="formState.rate" allow-half />
    </FormItem>

    <FormItem label="Dragger">
      <FormItem name="dragger" no-style>
        <a-upload-dragger v-model:fileList="formState.dragger" name="files" action="/upload.do">
          <p class="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p class="ant-upload-text">Click or drag file to this area to upload</p>
          <p class="ant-upload-hint">Support for a single or bulk upload.</p>
        </a-upload-dragger>
      </FormItem>
    </FormItem>
  </Form>
</template>

<script lang="ts" setup name="ComponentsOverviewContentForm">
import { InboxOutlined } from '@ant-design/icons-vue'
import { reactive } from 'vue'
import { Button } from '@/components/button'
import { Form, FormItem } from '@/components/form'

// 보기모드 일 때
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
}

const formState = reactive<Record<string, any>>({
  'input-number': 3,
  'checkbox-group': ['A', 'B', 'C'],
  rate: 3.5
})

const onSubmit = (e: Event) => {
  console.log('onSubmit:', e)
}

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>
