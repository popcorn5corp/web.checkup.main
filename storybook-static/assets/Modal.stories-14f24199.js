import{w as F}from"./decorator-e53fb076.js";import{d as G,b as H}from"./vue.esm-bundler-06433f34.js";import{_ as I}from"./Button-f7730f75.js";import{M as j}from"./Modal-80582b28.js";import"./preview-errors-dde4324f.js";import"./index-356e4a49.js";import"./motion-8927e1f6.js";import"./compact-item-943b0817.js";import"./extends-98964cd2.js";import"./index-aab19e1a.js";import"./index-df6759cb.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./index-9943d5fa.js";import"./index-20ecb033.js";import"./KeyCode-5dbefdba.js";import"./pickAttrs-7c36c3e9.js";import"./styleChecker-c17e3bbb.js";import"./ExclamationCircleFilled-d404fa4e.js";import"./CloseCircleFilled-0e0600c9.js";import"./InfoCircleOutlined-588a8397.js";import"./index-1bdfef9a.js";import"./motionUtil-c773f409.js";const e=G(()=>({positionCenter:!1,isModalLoading:!1,useTitle:!0,useDesc:!0,useBody:!0,useCancelBtn:!0,useOkBtn:!0})),me={title:"checkupuikit/Atoms/Modal",component:j,tags:["autodocs"],parameters:{layout:"fullscreen",componentSubtitle:"사용자의 작업 흐름을 방해하지 않으면서 새 페이지로 이동하거나, 확인 창 등을 띄울때 Modal을 사용하여 현재 페이지 위에 새 부동 레이어를 만들어 사용자 피드백을 얻거나 정보를 표시할 수 있습니다."},argTypes:{positionCenter:{description:"모달창 중간 위치여부",table:{type:{summary:"boolean"},defaultValue:{summary:!1}}},isModalLoading:{description:"완료 버튼 로딩여부",table:{type:{summary:"boolean"},defaultValue:{summary:!1}}},okBtnText:{description:"완료 버튼 텍스트",table:{type:{summary:"string"},defaultValue:{summary:"완료"}}},useOkBtn:{description:"완료 버튼 사용여부",table:{type:{summary:"boolean"},defaultValue:{summary:!0}}},cancelBtnText:{description:"취소 버튼 텍스트",table:{type:{summary:"string"},defaultValue:{summary:"취소"}}},useCancelBtn:{description:"취소 버튼 사용여부",table:{type:{summary:"boolean"},defaultValue:{summary:!0}}}},args:{...e.value,cancelBtnText:"취소",okBtnText:"완료"},decorators:[F]},t=(q,p)=>({render:c=>({components:{Button:I,Modal:j},setup(){const m=H(!1),z=()=>{m.value=!1};return q&&(c=p),{args:c,options:p,isVisible:m,handleComplete:z}},template:`
      <div style="width: 100%; text-align: center; padding: 1rem 0">
        <Button label="Open Modal" @click="isVisible = true"/>
      </div>
      <Modal v-if="isVisible" @cancel="isVisible = false" @ok="handleComplete" :positionCenter="args.positionCenter"  :isModalLoading="args.isModalLoading" :cancelBtnText="args.cancelBtnText" :useCancelBtn="args.useCancelBtn" :useOkBtn="args.useOkBtn" :okBtnText="args.okBtnText">
        <template #title v-if="args.useTitle">모달 제목</template>
        <template #desciption v-if="args.useDesc">모달 설명</template>
        <template #body v-if="args.useBody">
          <div>
            모달 내용내용내용내용...<br />
            모달 내용내용내용내용내용내용...<br />
            모달 내용내용내용내용내용내용내용내용...<br />
          </div>
        </template>
      </Modal>
    `})}),a=t(!1,e.value),r=t(!0,{...e.value,positionCenter:!0}),s=t(!0,{...e.value,isModalLoading:!0}),o=t(!0,{...e.value,useTitle:!1}),n=t(!0,{...e.value,useDesc:!1}),u=t(!0,{...e.value,useBody:!1}),l=t(!0,{...e.value,useCancelBtn:!1}),i=t(!0,{...e.value,useOkBtn:!1});var d,f,g;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:"generateStory(false, defaultOptions.value)",...(g=(f=a.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var y,B,v;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`generateStory(true, {
  ...defaultOptions.value,
  positionCenter: true
})`,...(v=(B=r.parameters)==null?void 0:B.docs)==null?void 0:v.source}}};var b,C,S;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`generateStory(true, {
  ...defaultOptions.value,
  isModalLoading: true
})`,...(S=(C=s.parameters)==null?void 0:C.docs)==null?void 0:S.source}}};var O,k,T;o.parameters={...o.parameters,docs:{...(O=o.parameters)==null?void 0:O.docs,source:{originalSource:`generateStory(true, {
  ...defaultOptions.value,
  useTitle: false
})`,...(T=(k=o.parameters)==null?void 0:k.docs)==null?void 0:T.source}}};var M,x,N;n.parameters={...n.parameters,docs:{...(M=n.parameters)==null?void 0:M.docs,source:{originalSource:`generateStory(true, {
  ...defaultOptions.value,
  useDesc: false
})`,...(N=(x=n.parameters)==null?void 0:x.docs)==null?void 0:N.source}}};var V,D,L;u.parameters={...u.parameters,docs:{...(V=u.parameters)==null?void 0:V.docs,source:{originalSource:`generateStory(true, {
  ...defaultOptions.value,
  useBody: false
})`,...(L=(D=u.parameters)==null?void 0:D.docs)==null?void 0:L.source}}};var _,h,w;l.parameters={...l.parameters,docs:{...(_=l.parameters)==null?void 0:_.docs,source:{originalSource:`generateStory(true, {
  ...defaultOptions.value,
  useCancelBtn: false
})`,...(w=(h=l.parameters)==null?void 0:h.docs)==null?void 0:w.source}}};var A,P,E;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`generateStory(true, {
  ...defaultOptions.value,
  useOkBtn: false
})`,...(E=(P=i.parameters)==null?void 0:P.docs)==null?void 0:E.source}}};const de=["Default","PositionCenter","CompleteButtonLoadingSpinner","NoTitle","NoDesc","NoBody","NoCancelBtn","NoOkBtn"];export{s as CompleteButtonLoadingSpinner,a as Default,u as NoBody,l as NoCancelBtn,n as NoDesc,i as NoOkBtn,o as NoTitle,r as PositionCenter,de as __namedExportsOrder,me as default};
