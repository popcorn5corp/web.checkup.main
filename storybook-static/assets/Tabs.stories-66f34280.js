import{f as s}from"./vue.esm-bundler-da3dfd31.js";import{D as M,_ as u}from"./Button-041be21e.js";import"./DropdownButton-0331ed8d.js";import"./SvgIcon-db9b006f.js";import{T as R}from"./Tabs-a74d1225.js";import{A as N}from"./index-31244240.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./slide-ff6c039b.js";import"./extends-98964cd2.js";import"./index-ecf1c700.js";import"./KeyCode-9b05785e.js";import"./index-a0b3e6d9.js";import"./shallowequal-23878baf.js";import"./_arrayIncludesWith-2f006ba6.js";import"./colors-099fe84d.js";import"./index-e44b3b0d.js";import"./collapseMotion-6307b6e4.js";import"./useRefs-6ca959ac.js";import"./_flatRest-9379d133.js";import"./_toKey-6cc18de3.js";import"./_baseSet-de153ea0.js";import"./hasIn-c3b6575d.js";var H={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M811.4 418.7C765.6 297.9 648.9 212 512.2 212S258.8 297.8 213 418.6C127.3 441.1 64 519.1 64 612c0 110.5 89.5 200 199.9 200h496.2C870.5 812 960 722.5 960 612c0-92.7-63.1-170.7-148.6-193.3zm36.3 281a123.07 123.07 0 01-87.6 36.3H263.9c-33.1 0-64.2-12.9-87.6-36.3A123.3 123.3 0 01140 612c0-28 9.1-54.3 26.2-76.3a125.7 125.7 0 0166.1-43.7l37.9-9.9 13.9-36.6c8.6-22.8 20.6-44.1 35.7-63.4a245.6 245.6 0 0152.4-49.9c41.1-28.9 89.5-44.2 140-44.2s98.9 15.3 140 44.2c19.9 14 37.5 30.8 52.4 49.9 15.1 19.3 27.1 40.7 35.7 63.4l13.8 36.5 37.8 10c54.3 14.5 92.1 63.8 92.1 120 0 33.1-12.9 64.3-36.3 87.7z"}}]},name:"cloud",theme:"outlined"};const V=H;function g(n){for(var t=1;t<arguments.length;t++){var e=arguments[t]!=null?Object(arguments[t]):{},o=Object.keys(e);typeof Object.getOwnPropertySymbols=="function"&&(o=o.concat(Object.getOwnPropertySymbols(e).filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),o.forEach(function(a){q(n,a,e[a])})}return n}function q(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var d=function(t,e){var o=g({},t,e.attrs);return s(N,g({},o,{icon:V}),null)};d.displayName="CloudOutlined";d.inheritAttrs=!1;const G=d;var J={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M885.6 230.2L779.1 123.8a80.83 80.83 0 00-57.3-23.8c-21.7 0-42.1 8.5-57.4 23.8L549.8 238.4a80.83 80.83 0 00-23.8 57.3c0 21.7 8.5 42.1 23.8 57.4l83.8 83.8A393.82 393.82 0 01553.1 553 395.34 395.34 0 01437 633.8L353.2 550a80.83 80.83 0 00-57.3-23.8c-21.7 0-42.1 8.5-57.4 23.8L123.8 664.5a80.89 80.89 0 00-23.8 57.4c0 21.7 8.5 42.1 23.8 57.4l106.3 106.3c24.4 24.5 58.1 38.4 92.7 38.4 7.3 0 14.3-.6 21.2-1.8 134.8-22.2 268.5-93.9 376.4-201.7C828.2 612.8 899.8 479.2 922.3 344c6.8-41.3-6.9-83.8-36.7-113.8z"}}]},name:"phone",theme:"filled"};const Q=J;function y(n){for(var t=1;t<arguments.length;t++){var e=arguments[t]!=null?Object(arguments[t]):{},o=Object.keys(e);typeof Object.getOwnPropertySymbols=="function"&&(o=o.concat(Object.getOwnPropertySymbols(e).filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),o.forEach(function(a){U(n,a,e[a])})}return n}function U(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var f=function(t,e){var o=y({},t,e.attrs);return s(N,y({},o,{icon:Q}),null)};f.displayName="PhoneFilled";f.inheritAttrs=!1;const W=f,Tt={title:"checkupuikit/Atoms/Tabs",component:R,tags:["autodocs"],argTypes:{tabs:{description:"탭 목록",table:{type:{summary:"TabList",detail:"Array<{ title: string, key: string }>"}}},type:{description:"탭 기본 스타일",type:{name:"string"},control:"select",options:["line","card","editable-card"],table:{type:{summary:"TabsType",detail:"'line' | 'card' | 'editable-card'"}}},tabPosition:{description:"탭 위치",type:{name:"string"},control:"select",options:["bottom","left","right","top"],table:{type:{summary:"TabPosition",detail:"'bottom' | 'left' | 'right' | 'top'"}}}},parameters:{componentSubtitle:"Tabs 컴포넌트는 콘텐츠 영역을 접거나 펼칠 수 있도록 합니다.",docs:{description:{component:"Tabs 컴포넌트는 **Children 컴포넌트**로 **<code>&lt;TabPane/&gt; </code>**를 사용할 수 있습니다."}}},args:{tabPosition:"top",type:"line"}},r={args:{tabs:[{title:"Tab 1",key:"1"},{title:"Tab 2",key:"2"},{title:"Tab 3",key:"3",closable:!1}]}},i={args:{tabs:[{title:"Tab 1",content:"Content of Tab 1",icon:M,key:"1"},{title:"Tab 2",content:"Content of Tab 2",icon:G,key:"2"},{title:"Tab 3",content:"Content of Tab 3",icon:W,key:"3",closable:!1}]}},l={args:{tabs:[{title:"Tab 1",content:"Content of Tab 1",key:"1"},{title:"Tab 2",content:"Content of Tab 2",key:"2"},{title:"Tab 3",content:"Content of Tab 3",key:"3",closable:!1}]}},c={args:{tabs:[{title:"Tab 1",component:s(u,{label:"First",type:"primary"},null),key:"1"},{title:"Tab 2",component:s(u,{label:"Second",type:"dashed"},null),key:"2"},{title:"Tab 3",component:s(u,{label:"Third",type:"link"},null),key:"3",closable:!1}]}},p={args:{...r.args,tabPosition:"left"}},b={args:{...r.args,tabPosition:"right"}},m={args:{...r.args,tabPosition:"bottom"}};var T,h,P;r.parameters={...r.parameters,docs:{...(T=r.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    tabs: [{
      title: 'Tab 1',
      key: '1'
    }, {
      title: 'Tab 2',
      key: '2'
    }, {
      title: 'Tab 3',
      key: '3',
      closable: false
    }]
  }
}`,...(P=(h=r.parameters)==null?void 0:h.docs)==null?void 0:P.source}}};var C,O,k;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    tabs: [{
      title: 'Tab 1',
      content: 'Content of Tab 1',
      icon: DownloadOutlined,
      key: '1'
    }, {
      title: 'Tab 2',
      content: 'Content of Tab 2',
      icon: CloudOutlined,
      key: '2'
    }, {
      title: 'Tab 3',
      content: 'Content of Tab 3',
      icon: PhoneFilled,
      key: '3',
      closable: false
    }]
  }
}`,...(k=(O=i.parameters)==null?void 0:O.docs)==null?void 0:k.source}}};var S,v,_;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    tabs: [{
      title: 'Tab 1',
      content: 'Content of Tab 1',
      key: '1'
    }, {
      title: 'Tab 2',
      content: 'Content of Tab 2',
      key: '2'
    }, {
      title: 'Tab 3',
      content: 'Content of Tab 3',
      key: '3',
      closable: false
    }]
  }
}`,...(_=(v=l.parameters)==null?void 0:v.docs)==null?void 0:_.source}}};var D,F,j;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    tabs: [{
      title: 'Tab 1',
      component: <Button label="First" type="primary" />,
      key: '1'
    }, {
      title: 'Tab 2',
      component: <Button label="Second" type="dashed" />,
      key: '2'
    }, {
      title: 'Tab 3',
      component: <Button label="Third" type="link" />,
      key: '3',
      closable: false
    }]
  }
}`,...(j=(F=c.parameters)==null?void 0:F.docs)==null?void 0:j.source}}};var w,A,B;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    tabPosition: 'left'
  }
}`,...(B=(A=p.parameters)==null?void 0:A.docs)==null?void 0:B.source}}};var L,x,$;b.parameters={...b.parameters,docs:{...(L=b.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    tabPosition: 'right'
  }
}`,...($=(x=b.parameters)==null?void 0:x.docs)==null?void 0:$.source}}};var z,E,I;m.parameters={...m.parameters,docs:{...(z=m.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    tabPosition: 'bottom'
  }
}`,...(I=(E=m.parameters)==null?void 0:E.docs)==null?void 0:I.source}}};const ht=["Default","TitleIcon","TextContent","ComponentContent","PositionLeft","PositionRight","PositionBottom"];export{c as ComponentContent,r as Default,m as PositionBottom,p as PositionLeft,b as PositionRight,l as TextContent,i as TitleIcon,ht as __namedExportsOrder,Tt as default};
