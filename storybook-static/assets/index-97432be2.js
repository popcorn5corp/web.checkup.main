import{u as V,h as L,j as M,_ as O,C as x,P as j,t as F,k as W,l as q}from"./compact-item-943b0817.js";import{_ as p}from"./extends-98964cd2.js";import{f as H,d as i,b as G,w as J,n as v,F as K}from"./vue.esm-bundler-06433f34.js";import{u as Q}from"./useFlexGapSupport-b50d290f.js";const U={small:8,middle:16,large:24},X=()=>({prefixCls:String,size:{type:[String,Number,Array]},direction:j.oneOf(F("horizontal","vertical")).def("horizontal"),align:j.oneOf(F("start","end","center","baseline")),wrap:W()});function Y(e){return typeof e=="string"?U[e]:e||0}const s=H({compatConfig:{MODE:3},name:"ASpace",inheritAttrs:!1,props:X(),slots:Object,setup(e,I){let{slots:r,attrs:d}=I;const{prefixCls:n,space:f,direction:_}=V("space",e),[B,P]=L(n),h=Q(),l=i(()=>{var t,a,o;return(o=(t=e.size)!==null&&t!==void 0?t:(a=f==null?void 0:f.value)===null||a===void 0?void 0:a.size)!==null&&o!==void 0?o:"small"}),g=G(),c=G();J(l,()=>{[g.value,c.value]=(Array.isArray(l.value)?l.value:[l.value,l.value]).map(t=>Y(t))},{immediate:!0});const z=i(()=>e.align===void 0&&e.direction==="horizontal"?"center":e.align),k=i(()=>q(n.value,P.value,`${n.value}-${e.direction}`,{[`${n.value}-rtl`]:_.value==="rtl",[`${n.value}-align-${z.value}`]:z.value})),D=i(()=>_.value==="rtl"?"marginLeft":"marginRight"),E=i(()=>{const t={};return h.value&&(t.columnGap=`${g.value}px`,t.rowGap=`${c.value}px`),p(p({},t),e.wrap&&{flexWrap:"wrap",marginBottom:`${-c.value}px`})});return()=>{var t,a;const{wrap:o,direction:R="horizontal"}=e,$=(t=r.default)===null||t===void 0?void 0:t.call(r),C=M($),b=C.length;if(b===0)return null;const u=(a=r.split)===null||a===void 0?void 0:a.call(r),w=`${n.value}-item`,A=g.value,y=b-1;return v("div",O(O({},d),{},{class:[k.value,d.class],style:[E.value,d.style]}),[C.map((N,S)=>{const T=$.indexOf(N);let m={};return h.value||(R==="vertical"?S<y&&(m={marginBottom:`${A/(u?2:1)}px`}):m=p(p({},S<y&&{[D.value]:`${A/(u?2:1)}px`}),o&&{paddingBottom:`${c.value}px`})),B(v(K,{key:T},[v("div",{class:w,style:m},[N]),S<y&&u&&v("span",{class:`${w}-split`,style:m},[u])]))})])}}});s.Compact=x;s.install=function(e){return e.component(s.name,s),e.component(x.name,x),e};const ne=s;export{ne as _};
