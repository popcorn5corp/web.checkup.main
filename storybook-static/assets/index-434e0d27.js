import{u as k,a as L,f as M,_ as O,C as x,P as F,t as G,b as W,c as q}from"./index-31244240.js";import{_ as p}from"./extends-98964cd2.js";import{d as H,e as i,b as I,w as J,f as v,F as K}from"./vue.esm-bundler-da3dfd31.js";import{u as Q}from"./useFlexGapSupport-42c61aa1.js";const U={small:8,middle:16,large:24},X=()=>({prefixCls:String,size:{type:[String,Number,Array]},direction:F.oneOf(G("horizontal","vertical")).def("horizontal"),align:F.oneOf(G("start","end","center","baseline")),wrap:W()});function Y(e){return typeof e=="string"?U[e]:e||0}const s=H({compatConfig:{MODE:3},name:"ASpace",inheritAttrs:!1,props:X(),slots:Object,setup(e,j){let{slots:r,attrs:d}=j;const{prefixCls:n,space:f,direction:_}=k("space",e),[B,P]=L(n),z=Q(),l=i(()=>{var t,a,o;return(o=(t=e.size)!==null&&t!==void 0?t:(a=f==null?void 0:f.value)===null||a===void 0?void 0:a.size)!==null&&o!==void 0?o:"small"}),g=I(),c=I();J(l,()=>{[g.value,c.value]=(Array.isArray(l.value)?l.value:[l.value,l.value]).map(t=>Y(t))},{immediate:!0});const $=i(()=>e.align===void 0&&e.direction==="horizontal"?"center":e.align),D=i(()=>q(n.value,P.value,`${n.value}-${e.direction}`,{[`${n.value}-rtl`]:_.value==="rtl",[`${n.value}-align-${$.value}`]:$.value})),E=i(()=>_.value==="rtl"?"marginLeft":"marginRight"),R=i(()=>{const t={};return z.value&&(t.columnGap=`${g.value}px`,t.rowGap=`${c.value}px`),p(p({},t),e.wrap&&{flexWrap:"wrap",marginBottom:`${-c.value}px`})});return()=>{var t,a;const{wrap:o,direction:T="horizontal"}=e,h=(t=r.default)===null||t===void 0?void 0:t.call(r),b=M(h),C=b.length;if(C===0)return null;const u=(a=r.split)===null||a===void 0?void 0:a.call(r),w=`${n.value}-item`,A=g.value,y=C-1;return v("div",O(O({},d),{},{class:[D.value,d.class],style:[R.value,d.style]}),[b.map((N,S)=>{const V=h.indexOf(N);let m={};return z.value||(T==="vertical"?S<y&&(m={marginBottom:`${A/(u?2:1)}px`}):m=p(p({},S<y&&{[E.value]:`${A/(u?2:1)}px`}),o&&{paddingBottom:`${c.value}px`})),B(v(K,{key:V},[v("div",{class:w,style:m},[N]),S<y&&u&&v("span",{class:`${w}-split`,style:m},[u])]))})])}}});s.Compact=x;s.install=function(e){return e.component(s.name,s),e.component(x.name,x),e};const ne=s;export{ne as _};
