import{F as m}from"./FileUploader-258d34f1.js";import"./vue.esm-bundler-06433f34.js";import"./index-2fe437c2.js";import"./_commonjsHelpers-de833af9.js";import"./index-6cf4e6ab.js";import"./vue-router-09c98cdc.js";import"./index-f9a7754c.js";import"./FilterForm-0cbd5abc.js";import"./index-fe2cee87.js";import"./_arrayLikeKeys-856a4a59.js";import"./compact-item-943b0817.js";import"./extends-98964cd2.js";import"./_overRest-fdd2e9e6.js";import"./isArrayLikeObject-18ce9678.js";import"./isPlainObject-7ca50782.js";import"./dayjs.min-bd65d405.js";import"./pinia-1c824524.js";import"./Accordion-0d466002.js";import"./index-c186720f.js";import"./FormItemContext-d5d2b6af.js";import"./statusUtils-981b964f.js";import"./vnode-0120d1ab.js";import"./CloseCircleFilled-0e0600c9.js";import"./index-9435a495.js";import"./index-aab19e1a.js";import"./index-df6759cb.js";import"./index-7bc94af2.js";import"./EyeOutlined-3dbe0b46.js";import"./index-30344dd3.js";import"./motion-8927e1f6.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./index-0fc5836e.js";import"./index-9c7320cf.js";import"./KeyCode-5dbefdba.js";import"./colors-897f8409.js";import"./ClockCircleOutlined-ec564bb6.js";import"./useMergedState-9fc4af37.js";import"./slide-14b3f38e.js";import"./motionUtil-c773f409.js";import"./index-0b93d195.js";import"./pickAttrs-7c36c3e9.js";import"./isMobile-12f0741d.js";import"./shallowequal-aee54418.js";import"./roundedArrow-e2771650.js";import"./RightOutlined-811eef93.js";import"./firstNotUndefined-29a740f3.js";import"./collapseMotion-a3198536.js";import"./Button-f7730f75.js";import"./DropdownButton-c71d963a.js";import"./_baseSet-597e192b.js";import"./_toKey-f8a2c48c.js";import"./isSymbol-4808126a.js";import"./vue-i18n.runtime-ed730321.js";import"./iframe-4d7f0ef5.js";import"../sb-preview/runtime.js";import"./index-1bdfef9a.js";import"./InfoCircleOutlined-588a8397.js";import"./ExclamationCircleFilled-d404fa4e.js";import"./cloneDeep-63a05421.js";import"./SvgIcon-c1119032.js";import"./index-dcf0c7b3.js";import"./index-6855d82a.js";import"./Col-5366a844.js";import"./responsiveObserve-dd206e94.js";import"./useFlexGapSupport-b50d290f.js";import"./styleChecker-c17e3bbb.js";import"./_flatRest-00fa2235.js";import"./hasIn-bc278bbb.js";import"./_arrayIncludesWith-2f006ba6.js";import"./debounce-849adbc2.js";import"./omit-b91ff683.js";import"./index-8de211b8.js";import"./index-8e1e520f.js";import"./useRefs-d53d1c11.js";const Ee={title:"checkupuikit/Atoms/FileUploader",component:m,tags:["autodocs"],argTypes:{files:{description:"파일 리스트",table:{type:{summary:"FileList",detail:"{ fileId: string, ext: string, name: string, originName: string, path: string, size: number, url: string }"}}},readonly:{description:"Read / Edit 모드 구분"},type:{description:"서버 업로드를 위한 파일 타입 (화면 별 API 참조)",table:{type:{summary:"FileType",detail:"'TEST' | string"}}},showDownload:{description:"다운로드 아이콘 노출"},showRemove:{description:"삭제 아이콘 노출"},showPreview:{description:"미리보기 아이콭 노출"}},parameters:{docs:{description:{component:"**FileManager Service** 기반으로 동작하기에 내부 원격 서버로의 업로드에 최적화되어 있습니다. "}},componentSubtitle:"File Uploader 컴포넌트를 사용하여 원격 서버에 이미지, 문서 등의 정보를 업로드할 수 있습니다."},args:{files:[],readonly:!1,type:"TEST",showDownload:!0,showRemove:!1,showPreview:!0}},e={args:{files:[{fileId:"047df5bb-b3f9-4c76-a4c4-034b7f16b7ef",name:"bfd48e19-0fc7-41dd-b62c-415a7568486d.jpeg",originName:"sample2.jpeg",url:"https://sawork-prod.s3.ap-northeast-2.amazonaws.com/CheckUp/test/bfd48e19-0fc7-41dd-b62c-415a7568486d.jpeg",path:"/CheckUp/test/bfd48e19-0fc7-41dd-b62c-415a7568486d.jpeg",ext:"jpeg",size:7618},{fileId:"2b877b44-5185-41b3-80a9-cf1bb0f0512b",name:"34087108-1ca9-47da-9d74-149affa97b1e.jpeg",originName:"sample1.jpeg",url:"https://sawork-prod.s3.ap-northeast-2.amazonaws.com/CheckUp/test/34087108-1ca9-47da-9d74-149affa97b1e.jpeg",path:"/CheckUp/test/34087108-1ca9-47da-9d74-149affa97b1e.jpeg",ext:"jpeg",size:10108}]}},t={args:{files:[{fileId:"047df5bb-b3f9-4c76-a4c4-034b7f16b7ef",name:"bfd48e19-0fc7-41dd-b62c-415a7568486d.jpeg",originName:"sample2.jpeg",url:"https://sawork-prod.s3.ap-northeast-2.amazonaws.com/CheckUp/test/bfd48e19-0fc7-41dd-b62c-415a7568486d.jpeg",path:"/CheckUp/test/bfd48e19-0fc7-41dd-b62c-415a7568486d.jpeg",ext:"jpeg",size:7618},{fileId:"2b877b44-5185-41b3-80a9-cf1bb0f0512b",name:"34087108-1ca9-47da-9d74-149affa97b1e.jpeg",originName:"sample1.jpeg",url:"https://sawork-prod.s3.ap-northeast-2.amazonaws.com/CheckUp/test/34087108-1ca9-47da-9d74-149affa97b1e.jpeg",path:"/CheckUp/test/34087108-1ca9-47da-9d74-149affa97b1e.jpeg",ext:"jpeg",size:10108}]}};var a,p,r;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    files: [{
      fileId: '047df5bb-b3f9-4c76-a4c4-034b7f16b7ef',
      name: 'bfd48e19-0fc7-41dd-b62c-415a7568486d.jpeg',
      originName: 'sample2.jpeg',
      url: 'https://sawork-prod.s3.ap-northeast-2.amazonaws.com/CheckUp/test/bfd48e19-0fc7-41dd-b62c-415a7568486d.jpeg',
      path: '/CheckUp/test/bfd48e19-0fc7-41dd-b62c-415a7568486d.jpeg',
      ext: 'jpeg',
      size: 7618
    }, {
      fileId: '2b877b44-5185-41b3-80a9-cf1bb0f0512b',
      name: '34087108-1ca9-47da-9d74-149affa97b1e.jpeg',
      originName: 'sample1.jpeg',
      url: 'https://sawork-prod.s3.ap-northeast-2.amazonaws.com/CheckUp/test/34087108-1ca9-47da-9d74-149affa97b1e.jpeg',
      path: '/CheckUp/test/34087108-1ca9-47da-9d74-149affa97b1e.jpeg',
      ext: 'jpeg',
      size: 10108
    }]
  }
}`,...(r=(p=e.parameters)==null?void 0:p.docs)==null?void 0:r.source}}};var o,i,s;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    files: [{
      fileId: '047df5bb-b3f9-4c76-a4c4-034b7f16b7ef',
      name: 'bfd48e19-0fc7-41dd-b62c-415a7568486d.jpeg',
      originName: 'sample2.jpeg',
      url: 'https://sawork-prod.s3.ap-northeast-2.amazonaws.com/CheckUp/test/bfd48e19-0fc7-41dd-b62c-415a7568486d.jpeg',
      path: '/CheckUp/test/bfd48e19-0fc7-41dd-b62c-415a7568486d.jpeg',
      ext: 'jpeg',
      size: 7618
    }, {
      fileId: '2b877b44-5185-41b3-80a9-cf1bb0f0512b',
      name: '34087108-1ca9-47da-9d74-149affa97b1e.jpeg',
      originName: 'sample1.jpeg',
      url: 'https://sawork-prod.s3.ap-northeast-2.amazonaws.com/CheckUp/test/34087108-1ca9-47da-9d74-149affa97b1e.jpeg',
      path: '/CheckUp/test/34087108-1ca9-47da-9d74-149affa97b1e.jpeg',
      ext: 'jpeg',
      size: 10108
    }]
  }
}`,...(s=(i=t.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};const Se=["Default","ExistingFiles"];export{e as Default,t as ExistingFiles,Se as __namedExportsOrder,Ee as default};
