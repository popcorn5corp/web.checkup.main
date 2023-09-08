// import type { Meta, StoryObj } from '@storybook/vue3'
// import { ref } from 'vue'
// import Table from '@/components/table/Table.vue'

// const meta = {
//   title: 'checkupuikit/Atoms/Table',
//   component: Table,
//   tags: ['autodocs'],
//   args: {
//     total: 0,
//     size: 'default',
//     loading: false,
//     options: { pointer: false, isPagination: true, isShowNo: false }
//   },
//   argTypes: {
//     dataSource: {
//       description: 'Data record array to be displayed',
//       type: { name: 'array', required: true },
//       table: {
//         type: { summary: 'array' }
//       }
//     },

//     options: {
//       description: 'Props option of table custom',
//       type: { name: 'object', required: true },
//       table: {
//         type: { summary: 'object' },
//         defaultValue: { summary: null }
//       }
//     },

//     columns: {
//       description: 'Columns of table config',
//       type: { name: 'array', required: true },
//       table: {
//         type: { summary: 'array' }
//       }
//     },

//     total: {
//       description: 'Count of table row',
//       type: { name: 'number', required: false },
//       control: 'number',
//       table: {
//         type: { summary: 'number' }
//       }
//     },

//     size: {
//       description: 'Size of table',
//       type: { name: 'string', required: false },
//       options: ['default', 'middle', 'small', 'large'],
//       control: 'select',
//       table: {
//         type: { summary: 'default | middle | small | large' },
//         defaultValue: { summary: 'default' }
//       }
//     },

//     loading: {
//       description: '	Loading status of table',
//       type: { name: 'boolean', required: false },
//       table: {
//         type: { summary: 'boolean' },
//         defaultValue: { summary: false }
//       }
//     }
//   }
// } satisfies Meta<typeof Table>

// export default meta

// type Story = StoryObj<typeof meta>

// export const Primary: Story = {
//   args: {
//     dataSource: [
//       {
//         key: '1',
//         name: 'Mike',
//         age: 32,
//         address: '10 Downing Street'
//       },
//       {
//         key: '2',
//         name: 'John',
//         age: 42,
//         address: '10 Downing Street'
//       }
//     ],

//     columns: [
//       {
//         title: '이름',
//         dataIndex: 'name',
//         key: 'name'
//       },
//       {
//         title: '나이',
//         dataIndex: 'age',
//         key: 'age'
//       },
//       {
//         title: '주소',
//         dataIndex: 'address',
//         key: 'address'
//       }
//     ]
//   }
// }
// eslint-disable-next-line storybook/story-exports
export default {}
