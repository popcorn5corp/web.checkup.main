import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import { FileUploader } from '../'

const meta: Meta<ComponentProps<typeof FileUploader>> = {
  title: 'checkupuikit/Atoms/FileUploader',
  component: FileUploader,
  tags: ['autodocs'],
  argTypes: {
    files: {
      description: '파일 리스트',
      table: {
        type: {
          summary: 'FileList',
          detail: `{ fileId: string, ext: string, name: string, originName: string, path: string, size: number, url: string }`
        }
      }
    },
    readonly: {
      description: 'Read / Edit 모드 구분'
    },
    type: {
      description: '서버 업로드를 위한 파일 타입 (화면 별 API 참조)',
      table: {
        type: {
          summary: 'FileType',
          detail: `'TEST' | string`
        }
      }
    },
    showDownload: {
      description: '다운로드 아이콘 노출'
    },
    showRemove: {
      description: '삭제 아이콘 노출'
    },
    showPreview: {
      description: '미리보기 아이콭 노출'
    }
  },
  parameters: {
    docs: {
      description: {
        component: `**FileManager Service** 기반으로 동작하기에 내부 원격 서버로의 업로드에 최적화되어 있습니다. `
      }
    },
    componentSubtitle:
      'File Uploader 컴포넌트를 사용하여 원격 서버에 이미지, 문서 등의 정보를 업로드할 수 있습니다.'
  },
  args: {
    files: [],
    readonly: false,
    type: 'TEST',
    showDownload: true,
    showRemove: true,
    showPreview: true
  }
}

export default meta
type Story = StoryObj<typeof FileUploader>

export const Default: Story = {
  args: {
    files: [
      {
        fileId: '047df5bb-b3f9-4c76-a4c4-034b7f16b7ef',
        name: 'bfd48e19-0fc7-41dd-b62c-415a7568486d.jpeg',
        originName: 'sample2.jpeg',
        url: 'https://sawork-prod.s3.ap-northeast-2.amazonaws.com/CheckUp/test/bfd48e19-0fc7-41dd-b62c-415a7568486d.jpeg',
        path: '/CheckUp/test/bfd48e19-0fc7-41dd-b62c-415a7568486d.jpeg',
        ext: 'jpeg',
        size: 7618
      },
      {
        fileId: '2b877b44-5185-41b3-80a9-cf1bb0f0512b',
        name: '34087108-1ca9-47da-9d74-149affa97b1e.jpeg',
        originName: 'sample1.jpeg',
        url: 'https://sawork-prod.s3.ap-northeast-2.amazonaws.com/CheckUp/test/34087108-1ca9-47da-9d74-149affa97b1e.jpeg',
        path: '/CheckUp/test/34087108-1ca9-47da-9d74-149affa97b1e.jpeg',
        ext: 'jpeg',
        size: 10108
      }
    ]
  }
}

export const ExistingFiles: Story = {
  args: {
    files: [
      {
        fileId: '047df5bb-b3f9-4c76-a4c4-034b7f16b7ef',
        name: 'bfd48e19-0fc7-41dd-b62c-415a7568486d.jpeg',
        originName: 'sample2.jpeg',
        url: 'https://sawork-prod.s3.ap-northeast-2.amazonaws.com/CheckUp/test/bfd48e19-0fc7-41dd-b62c-415a7568486d.jpeg',
        path: '/CheckUp/test/bfd48e19-0fc7-41dd-b62c-415a7568486d.jpeg',
        ext: 'jpeg',
        size: 7618
      },
      {
        fileId: '2b877b44-5185-41b3-80a9-cf1bb0f0512b',
        name: '34087108-1ca9-47da-9d74-149affa97b1e.jpeg',
        originName: 'sample1.jpeg',
        url: 'https://sawork-prod.s3.ap-northeast-2.amazonaws.com/CheckUp/test/34087108-1ca9-47da-9d74-149affa97b1e.jpeg',
        path: '/CheckUp/test/34087108-1ca9-47da-9d74-149affa97b1e.jpeg',
        ext: 'jpeg',
        size: 10108
      }
    ]
  }
}
