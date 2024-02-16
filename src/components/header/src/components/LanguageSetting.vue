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
<script setup lang="ts" name="LanguageSetting">
// import { localeMessages } from '@/locales'
import { Descriptions, Modal, Select } from 'ant-design-vue'
import { createVNode, ref, unref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { localeList } from '@/locales/config'
import type { LocaleType } from '@/locales/config'
import { useLocale } from '@/locales/hooks/useLocale'
import { QuestionCircleTwoTone } from '@/components/icons'

const { Option } = Select

const { setPersistedLocale, getLocale, setLocale } = useLocale()
const selectedLocale = ref<LocaleType>(unref(getLocale))
let prevLocale = selectedLocale.value
const router = useRouter()
const { t } = useI18n()

const onChangeLang = async (locale: LocaleType) => {
  Modal.confirm({
    content: t('message.changeLang'),
    // content: (localeMessages[locale].common as any).message.changeLang.source,
    width: 450,
    icon: createVNode(QuestionCircleTwoTone),
    onOk() {
      setLocale(locale)
      // router.go(0)
    },
    onCancel() {
      selectedLocale.value = prevLocale
    }
  })
}
</script>
<style lang="scss" scoped></style>
