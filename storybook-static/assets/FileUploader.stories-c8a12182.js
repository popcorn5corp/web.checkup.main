import{F as d}from"./FileUploader-7616bfb5.js";import"./vue.esm-bundler-da3dfd31.js";import"./useTheme-eec4b019.js";import"./vue-router-212c06c4.js";import"./extends-98964cd2.js";import"./vue-i18n.runtime-54aa6b03.js";import"./_baseSet-de153ea0.js";import"./_toKey-6cc18de3.js";import"./index-31244240.js";import"./slide-ff6c039b.js";import"./isArrayLikeObject-523edb65.js";import"./index-b4575248.js";import"./index-f0aafce9.js";import"./KeyCode-9b05785e.js";import"./pickAttrs-d6f9a41a.js";import"./colors-099fe84d.js";import"./Accordion-1ff785b2.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./_commonjsHelpers-de833af9.js";import"./ClockCircleOutlined-566f9eed.js";import"./shallowequal-23878baf.js";import"./collapseMotion-6307b6e4.js";import"./index-6cf4e6ab.js";import"./iframe-8ae88575.js";import"../sb-preview/runtime.js";import"./Button-041be21e.js";import"./DropdownButton-0331ed8d.js";import"./index-9fe1cf39.js";import"./ExclamationCircleFilled-da22edd1.js";import"./SvgIcon-db9b006f.js";import"./index-2a8fec04.js";import"./index-5df3ba7c.js";import"./Col-72edfad4.js";import"./responsiveObserve-1261ffb7.js";import"./useFlexGapSupport-42c61aa1.js";import"./styleChecker-86e19025.js";import"./_flatRest-9379d133.js";import"./hasIn-c3b6575d.js";import"./_arrayIncludesWith-2f006ba6.js";import"./debounce-7fedd673.js";import"./omit-3709658d.js";import"./index-e44b3b0d.js";import"./index-c9501198.js";import"./useRefs-6ca959ac.js";const $={title:"checkupuikit/Atoms/FileUploader",component:d,tags:["autodocs"],argTypes:{files:{description:"파일 리스트",table:{type:{summary:"FileList",detail:"{ fileId: string, ext: string, name: string, originName: string, path: string, size: number, url: string }"}}},readonly:{description:"Read / Edit 모드 구분"},type:{description:"서버 업로드를 위한 파일 타입 (화면 별 API 참조)",table:{type:{summary:"FileType",detail:"'TEST' | string"}}},showDownload:{description:"다운로드 아이콘 노출"},showRemove:{description:"삭제 아이콘 노출"},showPreview:{description:"미리보기 아이콭 노출"}},parameters:{docs:{description:{component:"**FileManager Service** 기반으로 동작하기에 내부 원격 서버로의 업로드에 최적화되어 있습니다. "}},componentSubtitle:"File Uploader 컴포넌트를 사용하여 원격 서버에 이미지, 문서 등의 정보를 업로드할 수 있습니다."},args:{files:[],readonly:!1,type:"TEST",showDownload:!0,showRemove:!1,showPreview:!0}},e={args:{files:[{fileId:"047df5bb-b3f9-4c76-a4c4-034b7f16b7ef",name:"bfd48e19-0fc7-41dd-b62c-415a7568486d.jpeg",originName:"sample2.jpeg",url:"https://sawork-prod.s3.ap-northeast-2.amazonaws.com/CheckUp/test/bfd48e19-0fc7-41dd-b62c-415a7568486d.jpeg",path:"/CheckUp/test/bfd48e19-0fc7-41dd-b62c-415a7568486d.jpeg",ext:"jpeg",size:7618},{fileId:"2b877b44-5185-41b3-80a9-cf1bb0f0512b",name:"34087108-1ca9-47da-9d74-149affa97b1e.jpeg",originName:"sample1.jpeg",url:"https://sawork-prod.s3.ap-northeast-2.amazonaws.com/CheckUp/test/34087108-1ca9-47da-9d74-149affa97b1e.jpeg",path:"/CheckUp/test/34087108-1ca9-47da-9d74-149affa97b1e.jpeg",ext:"jpeg",size:10108}]}},a={args:{files:[{fileId:"047df5bb-b3f9-4c76-a4c4-034b7f16b7ef",name:"bfd48e19-0fc7-41dd-b62c-415a7568486d.jpeg",originName:"sample2.jpeg",url:"https://sawork-prod.s3.ap-northeast-2.amazonaws.com/CheckUp/test/bfd48e19-0fc7-41dd-b62c-415a7568486d.jpeg",path:"/CheckUp/test/bfd48e19-0fc7-41dd-b62c-415a7568486d.jpeg",ext:"jpeg",size:7618},{fileId:"2b877b44-5185-41b3-80a9-cf1bb0f0512b",name:"34087108-1ca9-47da-9d74-149affa97b1e.jpeg",originName:"sample1.jpeg",url:"https://sawork-prod.s3.ap-northeast-2.amazonaws.com/CheckUp/test/34087108-1ca9-47da-9d74-149affa97b1e.jpeg",path:"/CheckUp/test/34087108-1ca9-47da-9d74-149affa97b1e.jpeg",ext:"jpeg",size:10108}]}};var t,p,r;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
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
}`,...(r=(p=e.parameters)==null?void 0:p.docs)==null?void 0:r.source}}};var o,s,i;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
}`,...(i=(s=a.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};const ee=["Default","ExistingFiles"];export{e as Default,a as ExistingFiles,ee as __namedExportsOrder,$ as default};
