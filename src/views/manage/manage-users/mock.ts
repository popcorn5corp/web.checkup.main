import type { TableColumnsType } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'

export const columns = (): TableColumnsType => {
  const { t } = useI18n()
  return [
    {
      title: `${t('common.name')}`,
      dataIndex: 'nickname',
      key: 'nickname'
    },
    {
      title: `${t('common.email')}`,
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: `${t('common.phone')}`,
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: `${t('page.manage.joinDate')}`,
      dataIndex: 'joinDate',
      key: 'joinDate'
    },
    {
      title: `${t('common.status')}`,
      dataIndex: 'userStatus',
      key: 'userStatus',
      customRender: ({ value }) => {
        return value.label
      }
    }
  ]
}
