import{p as j,d as v,e as K,f as M,a3 as z,w as U,l as _,v as k,n as D,ac as H,j as A,s as C,k as V,o as q,g as G}from"./vue.esm-bundler-06433f34.js";import{P as T,n as g,a7 as Q,a8 as E,k as J,N as x}from"./compact-item-943b0817.js";import{_ as p}from"./extends-98964cd2.js";let W=!1;try{const e=Object.defineProperty({},"passive",{get(){W=!0}});window.addEventListener("testPassive",null,e),window.removeEventListener("testPassive",null,e)}catch{}const X=W;function ce(e,n,o,t){if(e&&e.addEventListener){let i=t;i===void 0&&X&&(n==="touchstart"||n==="touchmove"||n==="wheel")&&(i={passive:!1}),e.addEventListener(n,o,i)}return{remove:()=>{e&&e.removeEventListener&&e.removeEventListener(n,o)}}}class Y{constructor(n,o){this._keyframe=!0,this.name=n,this.style=o}getName(){let n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"";return n?`${n}-${this.name}`:this.name}}const fe=Y,I=Symbol("PortalContextKey"),Z=function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{inTriggerContext:!0};j(I,{inTriggerContext:n.inTriggerContext,shouldRender:v(()=>{const{sPopupVisible:o,popupRef:t,forceRender:i,autoDestroy:a}=e||{};let s=!1;return(o||t||i)&&(s=!0),!o&&a&&(s=!1),s})})},ee=()=>{Z({},{inTriggerContext:!1});const e=K(I,{shouldRender:v(()=>!1),inTriggerContext:!1});return{shouldRender:v(()=>e.shouldRender.value||e.inTriggerContext===!1)}},te=M({compatConfig:{MODE:3},name:"Portal",inheritAttrs:!1,props:{getContainer:T.func.isRequired,didUpdate:Function},setup(e,n){let{slots:o}=n,t=!0,i;const{shouldRender:a}=ee();z(()=>{t=!1,a.value&&(i=e.getContainer())});const s=U(a,()=>{a.value&&!i&&(i=e.getContainer()),i&&s()});return _(()=>{k(()=>{var l;a.value&&((l=e.didUpdate)===null||l===void 0||l.call(e,e))})}),()=>{var l;return a.value?t?(l=o.default)===null||l===void 0?void 0:l.call(o):i?D(H,{to:i},o):null:null}}});let P;function B(e){if(typeof document>"u")return 0;if(e||P===void 0){const n=document.createElement("div");n.style.width="100%",n.style.height="200px";const o=document.createElement("div"),t=o.style;t.position="absolute",t.top="0",t.left="0",t.pointerEvents="none",t.visibility="hidden",t.width="200px",t.height="150px",t.overflow="hidden",o.appendChild(n),document.body.appendChild(o);const i=n.offsetWidth;o.style.overflow="scroll";let a=n.offsetWidth;i===a&&(a=o.clientWidth),document.body.removeChild(o),P=i-a}return P}function N(e){const n=e.match(/^(.*)px$/),o=Number(n==null?void 0:n[1]);return Number.isNaN(o)?B():o}function ve(e){if(typeof document>"u"||!e||!(e instanceof Element))return{width:0,height:0};const{width:n,height:o}=getComputedStyle(e,"::-webkit-scrollbar");return{width:N(n),height:N(o)}}const ne=`vc-util-locker-${Date.now()}`;let L=0;function oe(){return document.body.scrollHeight>(window.innerHeight||document.documentElement.clientHeight)&&window.innerWidth>document.body.offsetWidth}function ae(e){const n=v(()=>!!e&&!!e.value);L+=1;const o=`${ne}_${L}`;A(t=>{if(g()){if(n.value){const i=B(),a=oe();Q(`
html body {
  overflow-y: hidden;
  ${a?`width: calc(100% - ${i}px);`:""}
}`,o)}else E(o);t(()=>{E(o)})}},{flush:"post"})}let c=0;const h=g(),R=e=>{if(!h)return null;if(e){if(typeof e=="string")return document.querySelectorAll(e)[0];if(typeof e=="function")return e();if(typeof e=="object"&&e instanceof window.HTMLElement)return e}return document.body},me=M({compatConfig:{MODE:3},name:"PortalWrapper",inheritAttrs:!1,props:{wrapperClassName:String,forceRender:{type:Boolean,default:void 0},getContainer:T.any,visible:{type:Boolean,default:void 0},autoLock:J(),didUpdate:Function},setup(e,n){let{slots:o}=n;const t=C(),i=C(),a=C(),s=g()&&document.createElement("div"),l=()=>{var r,u;t.value===s&&((u=(r=t.value)===null||r===void 0?void 0:r.parentNode)===null||u===void 0||u.removeChild(t.value)),t.value=null};let f=null;const y=function(){return(arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1)||t.value&&!t.value.parentNode?(f=R(e.getContainer),f?(f.appendChild(t.value),!0):!1):!0},S=()=>h?(t.value||(t.value=s,y(!0)),$(),t.value):null,$=()=>{const{wrapperClassName:r}=e;t.value&&r&&r!==t.value.className&&(t.value.className=r)};_(()=>{$(),y()});const F=G();return ae(v(()=>e.autoLock&&e.visible&&g()&&(t.value===document.body||t.value===s))),V(()=>{let r=!1;U([()=>e.visible,()=>e.getContainer],(u,m)=>{let[w,d]=u,[O,b]=m;h&&(f=R(e.getContainer),f===document.body&&(w&&!O?c+=1:r&&(c-=1))),r&&(typeof d=="function"&&typeof b=="function"?d.toString()!==b.toString():d!==b)&&l(),r=!0},{immediate:!0,flush:"post"}),k(()=>{y()||(a.value=x(()=>{F.update()}))})}),q(()=>{const{visible:r}=e;h&&f===document.body&&(c=r&&c?c-1:c),l(),x.cancel(a.value)}),()=>{const{forceRender:r,visible:u}=e;let m=null;const w={getOpenCount:()=>c,getContainer:S};return(r||u||i.value)&&(m=D(te,{getContainer:S,ref:i,didUpdate:e.didUpdate},{default:()=>{var d;return(d=o.default)===null||d===void 0?void 0:d.call(o,w)}})),m}}}),ie=e=>({animationDuration:e,animationFillMode:"both"}),re=e=>({animationDuration:e,animationFillMode:"both"}),pe=function(e,n,o,t){const a=(arguments.length>4&&arguments[4]!==void 0?arguments[4]:!1)?"&":"";return{[`
      ${a}${e}-enter,
      ${a}${e}-appear
    `]:p(p({},ie(t)),{animationPlayState:"paused"}),[`${a}${e}-leave`]:p(p({},re(t)),{animationPlayState:"paused"}),[`
      ${a}${e}-enter${e}-enter-active,
      ${a}${e}-appear${e}-appear-active
    `]:{animationName:n,animationPlayState:"running"},[`${a}${e}-leave${e}-leave-active`]:{animationName:o,animationPlayState:"running",pointerEvents:"none"}}};export{fe as K,me as P,ce as a,te as b,ve as c,B as g,pe as i,X as s,Z as u};
