import{d as U,e as H,j as J,z as K,v as L,R as M,S as Q,k as W}from"./vue.esm-bundler-da3dfd31.js";import{_ as X}from"./_plugin-vue_export-helper-c27b6911.js";const w=U({__name:"Badge",props:{text:{},size:{},shape:{},theme:{}},setup(E){const I=E,A=H(()=>{const{size:e,shape:p,theme:F}=I;return[{badge:!0,[`badge-${e}`]:!0,[`badge-${p}`]:!0,[`badge-${F}`]:!0}]});return(e,p)=>(W(),J("span",{class:Q(A.value)},[K(L(e.text),1),M(e.$slots,"default",{},void 0,!0)],2))}});const Y=X(w,[["__scopeId","data-v-865e122e"]]);w.__docgenInfo={exportName:"default",displayName:"Badge",description:"",tags:{},props:[{name:"text",description:"배지 내부 텍스트",required:!1,type:{name:"string"}},{name:"size",description:"배지 크기 조정",required:!1,type:{name:"BadgeSize"}},{name:"shape",description:"배지 모양 설정",required:!1,type:{name:"BadgeShape"}},{name:"theme",description:"배지 테마 설정",required:!1,type:{name:"BadgeTheme"}}],slots:[{name:"default"}],sourceFiles:["/Users/kimnayoung/Documents/workspace/web.checkup.main/src/components/badge/Badge.vue"]};const ae={title:"checkupuikit/Atoms/Badge",component:Y,tags:["autodocs"],argTypes:{default:{table:{type:""},control:Object},text:{type:{name:"string",required:!0}},size:{type:{name:"string",required:!1},options:["small","middle","large"],control:"select",table:{type:{summary:"small | middle | large"},defaultValue:{summary:"middle"}}},theme:{type:{name:"string",required:!1},options:["primary","primary-outline","orange","orange-outline","red","red-outline","success","success-outline"],control:"select",table:{type:{summary:"primary | primary-outline | orange | orange-outline | red | red-outline | default | default-outline | success | success-outline"},defaultValue:{summary:"primary"}}},shape:{type:{name:"string",required:!1},options:["squared","round","pill"],control:"select",table:{type:{summary:"squared | round | pill"},defaultValue:{summary:"squared"}}}},args:{shape:"squared",size:"middle"},parameters:{componentSubtitle:"Badge를 사용하여 요소(링크)와 연결된 항목 수량을 집계하거나 숫자 값에 대한 빠른 시각적 인식을 도울 수 있습니다."}},a={args:{text:"Grapic Design",theme:"primary"}},r={args:{text:"Grapic Design",theme:"primary-outline"}},s={args:{text:"Grapic Design",theme:"default"}},t={args:{text:"Grapic Design",theme:"default-outline"}},n={args:{text:"Grapic Design",theme:"orange"}},o={args:{text:"Grapic Design",theme:"orange-outline"}},i={args:{text:"Grapic Design",theme:"default",shape:"squared"}},c={args:{text:"Grapic Design",theme:"default",shape:"round"}},u={args:{text:"Grapic Design",theme:"default",shape:"pill"}};var m,d,l;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    text: 'Grapic Design',
    theme: 'primary'
  }
}`,...(l=(d=a.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var g,h,f;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    text: 'Grapic Design',
    theme: 'primary-outline'
  }
}`,...(f=(h=r.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var y,x,D;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    text: 'Grapic Design',
    theme: 'default'
  }
}`,...(D=(x=s.parameters)==null?void 0:x.docs)==null?void 0:D.source}}};var _,G,S;t.parameters={...t.parameters,docs:{...(_=t.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    text: 'Grapic Design',
    theme: 'default-outline'
  }
}`,...(S=(G=t.parameters)==null?void 0:G.docs)==null?void 0:S.source}}};var q,B,b;n.parameters={...n.parameters,docs:{...(q=n.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    text: 'Grapic Design',
    theme: 'orange'
  }
}`,...(b=(B=n.parameters)==null?void 0:B.docs)==null?void 0:b.source}}};var O,k,z;o.parameters={...o.parameters,docs:{...(O=o.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    text: 'Grapic Design',
    theme: 'orange-outline'
  }
}`,...(z=(k=o.parameters)==null?void 0:k.docs)==null?void 0:z.source}}};var v,P,V;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    text: 'Grapic Design',
    theme: 'default',
    shape: 'squared'
  }
}`,...(V=(P=i.parameters)==null?void 0:P.docs)==null?void 0:V.source}}};var $,C,N;c.parameters={...c.parameters,docs:{...($=c.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    text: 'Grapic Design',
    theme: 'default',
    shape: 'round'
  }
}`,...(N=(C=c.parameters)==null?void 0:C.docs)==null?void 0:N.source}}};var R,T,j;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    text: 'Grapic Design',
    theme: 'default',
    shape: 'pill'
  }
}`,...(j=(T=u.parameters)==null?void 0:T.docs)==null?void 0:j.source}}};const re=["Primary","PrimaryOutline","Default","DefaultOutline","Orange","OrangeOutline","Square","Round","Pill"];export{s as Default,t as DefaultOutline,n as Orange,o as OrangeOutline,u as Pill,a as Primary,r as PrimaryOutline,c as Round,i as Square,re as __namedExportsOrder,ae as default};
