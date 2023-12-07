<script setup lang="ts" name="LanguageSetting">
import { Descriptions, Modal, Select } from 'ant-design-vue'
import { createVNode, ref, unref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { localeList } from '@/locales/config'
import type { LocaleType } from '@/locales/config'
import { useLocale } from '@/locales/hooks/useLocale'
import { QuestionCircleTwoTone } from '@/components/icons'

const { Option } = Select

const { setLocale, setPersistedLocale, getLocale } = useLocale()
const selectedLocale = ref<LocaleType>(unref(getLocale))
let prevLocale = selectedLocale.value
const router = useRouter()
const { getLocaleMessage } = useI18n()

const onChangeLang = async (locale: LocaleType) => {
  Modal.confirm({
    content: (getLocaleMessage(locale).common as any).message.changeLang.source,
    width: 450,
    icon: createVNode(QuestionCircleTwoTone),
    onOk() {
      // prevLocale = locale
      // await setLocale(locale)
      setPersistedLocale(locale)
      router.go(0)
    },
    onCancel() {
      selectedLocale.value = prevLocale
      // await setLocale(prevLocale)
    }
  })
}
</script>
<template>
  <Descriptions :title="$t('common.lang')" :column="5">
    <Descriptions.Item>
      <Select
        v-model:value="selectedLocale"
        ref="select"
        style="width: 200px"
        @change="onChangeLang(selectedLocale)"
      >
        <Option v-for="locale in localeList" :key="locale.lang" :value="locale.lang"
          >{{ locale.label }}{{ locale.icon }}
        </Option>
      </Select>
    </Descriptions.Item>
  </Descriptions>
</template>
<style lang="scss" scoped></style>
