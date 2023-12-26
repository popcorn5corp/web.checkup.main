import type { TableColumnsType } from 'ant-design-vue'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

export const columns = (): TableColumnsType => {
  const { t } = useI18n()
  return [
    {
      // title: '그룹명',
      title: `${t('page.manage.groupName')}`,
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: `${t('page.manage.groupDescription')}`,
      dataIndex: 'content',
      key: 'content'
    },
    {
      title: `${t('common.createdAt')}`,
      dataIndex: 'createdAt',
      key: 'createdAt',
      customRender: ({ text }) => {
        return dayjs.unix(text).format('YYYY-MM-DD')
      }
    },
    {
      title: `${t('common.status')}`,
      dataIndex: 'status',
      key: 'status',
      customRender: ({ value }) => {
        return value.label
      }
    }
  ]
}
