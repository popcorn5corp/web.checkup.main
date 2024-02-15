import{f as U,d as X,z as Z,N as H,S as J,X as K,Z as L,y as M}from"./vue.esm-bundler-06433f34.js";import{_ as Q}from"./_plugin-vue_export-helper-c27b6911.js";const I=U({__name:"Badge",props:{text:{},size:{},shape:{},theme:{}},setup(R){const j=R,A=X(()=>{const{size:e,shape:p,theme:F}=j;return[{badge:!0,[`badge-${e}`]:!0,[`badge-${p}`]:!0,[`badge-${F}`]:!0}]});return(e,p)=>(M(),Z("span",{class:L(A.value)},[H(J(e.text),1),K(e.$slots,"default",{},void 0,!0)],2))}});const W=Q(I,[["__scopeId","data-v-865e122e"]]);I.__docgenInfo={exportName:"default",displayName:"Badge",description:"",tags:{},props:[{name:"text",description:"배지 내부 텍스트",required:!1,type:{name:"string"}},{name:"size",description:"배지 크기 조정",required:!1,type:{name:"BadgeSize"}},{name:"shape",description:"배지 모양 설정",required:!1,type:{name:"BadgeShape"}},{name:"theme",description:"배지 테마 설정",required:!1,type:{name:"BadgeTheme"}}],slots:[{name:"default"}],sourceFiles:["/Users/kimnayoung/Documents/workspace/web.checkup.main/src/components/badge/Badge.vue"]};const ae={title:"checkupuikit/Atoms/Badge",component:W,tags:["autodocs"],argTypes:{default:{table:{type:""},control:Object},text:{type:{name:"string",required:!0}},size:{type:{name:"string",required:!1},options:["small","middle","large"],control:"select",table:{type:{summary:"small | middle | large"},defaultValue:{summary:"middle"}}},theme:{type:{name:"string",required:!1},options:["primary","primary-outline","orange","orange-outline","red","red-outline","success","success-outline"],control:"select",table:{type:{summary:"primary | primary-outline | orange | orange-outline | red | red-outline | default | default-outline | success | success-outline"},defaultValue:{summary:"primary"}}},shape:{type:{name:"string",required:!1},options:["squared","round","pill"],control:"select",table:{type:{summary:"squared | round | pill"},defaultValue:{summary:"squared"}}}},args:{shape:"squared",size:"middle"},parameters:{componentSubtitle:"Badge를 사용하여 요소(링크)와 연결된 항목 수량을 집계하거나 숫자 값에 대한 빠른 시각적 인식을 도울 수 있습니다."}},a={args:{text:"Grapic Design",theme:"primary"}},r={args:{text:"Grapic Design",theme:"primary-outline"}},s={args:{text:"Grapic Design",theme:"default"}},t={args:{text:"Grapic Design",theme:"default-outline"}},n={args:{text:"Grapic Design",theme:"orange"}},o={args:{text:"Grapic Design",theme:"orange-outline"}},i={args:{text:"Grapic Design",theme:"default",shape:"squared"}},c={args:{text:"Grapic Design",theme:"default",shape:"round"}},u={args:{text:"Grapic Design",theme:"default",shape:"pill"}};var m,d,l;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    text: 'Grapic Design',
    theme: 'primary'
  }
}`,...(l=(d=a.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var g,f,h;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    text: 'Grapic Design',
    theme: 'primary-outline'
  }
}`,...(h=(f=r.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var y,x,D;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(b=(B=n.parameters)==null?void 0:B.docs)==null?void 0:b.source}}};var O,z,k;o.parameters={...o.parameters,docs:{...(O=o.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    text: 'Grapic Design',
    theme: 'orange-outline'
  }
}`,...(k=(z=o.parameters)==null?void 0:z.docs)==null?void 0:k.source}}};var v,P,N;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    text: 'Grapic Design',
    theme: 'default',
    shape: 'squared'
  }
}`,...(N=(P=i.parameters)==null?void 0:P.docs)==null?void 0:N.source}}};var V,$,C;c.parameters={...c.parameters,docs:{...(V=c.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    text: 'Grapic Design',
    theme: 'default',
    shape: 'round'
  }
}`,...(C=($=c.parameters)==null?void 0:$.docs)==null?void 0:C.source}}};var T,w,E;u.parameters={...u.parameters,docs:{...(T=u.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    text: 'Grapic Design',
    theme: 'default',
    shape: 'pill'
  }
}`,...(E=(w=u.parameters)==null?void 0:w.docs)==null?void 0:E.source}}};const re=["Primary","PrimaryOutline","Default","DefaultOutline","Orange","OrangeOutline","Square","Round","Pill"];export{s as Default,t as DefaultOutline,n as Orange,o as OrangeOutline,u as Pill,a as Primary,r as PrimaryOutline,c as Round,i as Square,re as __namedExportsOrder,ae as default};
