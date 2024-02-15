import{P as g,E as Y,K as I,l as k,g as ee,m as q,r as te,D as oe,u as ne,j as le,a1 as ie,a2 as ae,a3 as re,N as z,I as se,q as pe}from"./compact-item-943b0817.js";import{_ as r}from"./extends-98964cd2.js";import{f as H,n as P,s as R,j as ue,d as A,b as W,w as de}from"./vue.esm-bundler-06433f34.js";import{T as ce}from"./slide-14b3f38e.js";import{p as fe,M as me,g as ge,a as ve}from"./DropdownButton-c71d963a.js";import{c as U}from"./vnode-0120d1ab.js";import{f as ye}from"./firstNotUndefined-29a740f3.js";import{i as be,g as Ce}from"./colors-897f8409.js";import{i as he}from"./Button-f7730f75.js";const Pe={prefixCls:String,id:String,overlayInnerStyle:g.any},Oe=H({compatConfig:{MODE:3},name:"TooltipContent",props:Pe,setup(e,n){let{slots:a}=n;return()=>{var o;return P("div",{class:`${e.prefixCls}-inner`,id:e.id,role:"tooltip",style:e.overlayInnerStyle},[(o=a.overlay)===null||o===void 0?void 0:o.call(a)])}}});var Se=globalThis&&globalThis.__rest||function(e,n){var a={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&n.indexOf(o)<0&&(a[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,o=Object.getOwnPropertySymbols(e);i<o.length;i++)n.indexOf(o[i])<0&&Object.prototype.propertyIsEnumerable.call(e,o[i])&&(a[o[i]]=e[o[i]]);return a};function X(){}const xe=H({compatConfig:{MODE:3},name:"Tooltip",inheritAttrs:!1,props:{trigger:g.any.def(["hover"]),defaultVisible:{type:Boolean,default:void 0},visible:{type:Boolean,default:void 0},placement:g.string.def("right"),transitionName:String,animation:g.any,afterVisibleChange:g.func.def(()=>{}),overlayStyle:{type:Object,default:void 0},overlayClassName:String,prefixCls:g.string.def("rc-tooltip"),mouseEnterDelay:g.number.def(.1),mouseLeaveDelay:g.number.def(.1),getPopupContainer:Function,destroyTooltipOnHide:{type:Boolean,default:!1},align:g.object.def(()=>({})),arrowContent:g.any.def(null),tipId:String,builtinPlacements:g.object,overlayInnerStyle:{type:Object,default:void 0},popupVisible:{type:Boolean,default:void 0},onVisibleChange:Function,onPopupAlign:Function},setup(e,n){let{slots:a,attrs:o,expose:i}=n;const p=R(),f=()=>{const{prefixCls:s,tipId:d,overlayInnerStyle:b}=e;return[P("div",{class:`${s}-arrow`,key:"arrow"},[Y(a,e,"arrowContent")]),P(Oe,{key:"content",prefixCls:s,id:d,overlayInnerStyle:b},{overlay:a.overlay})]};i({getPopupDomNode:()=>p.value.getPopupDomNode(),triggerDOM:p,forcePopupAlign:()=>{var s;return(s=p.value)===null||s===void 0?void 0:s.forcePopupAlign()}});const y=R(!1),S=R(!1);return ue(()=>{const{destroyTooltipOnHide:s}=e;if(typeof s=="boolean")y.value=s;else if(s&&typeof s=="object"){const{keepParent:d}=s;y.value=d===!0,S.value=d===!1}}),()=>{const{overlayClassName:s,trigger:d,mouseEnterDelay:b,mouseLeaveDelay:x,overlayStyle:O,prefixCls:$,afterVisibleChange:M,transitionName:D,animation:w,placement:B,align:V,destroyTooltipOnHide:F,defaultVisible:N}=e,j=Se(e,["overlayClassName","trigger","mouseEnterDelay","mouseLeaveDelay","overlayStyle","prefixCls","afterVisibleChange","transitionName","animation","placement","align","destroyTooltipOnHide","defaultVisible"]),_=r({},j);e.visible!==void 0&&(_.popupVisible=e.visible);const E=r(r(r({popupClassName:s,prefixCls:$,action:d,builtinPlacements:fe,popupPlacement:B,popupAlign:V,afterPopupVisibleChange:M,popupTransitionName:D,popupAnimation:w,defaultPopupVisible:N,destroyPopupOnHide:y.value,autoDestroy:S.value,mouseLeaveDelay:x,popupStyle:O,mouseEnterDelay:b},_),o),{onPopupVisibleChange:e.onVisibleChange||X,onPopupAlign:e.onPopupAlign||X,ref:p,popup:f()});return P(ce,E,{default:a.default})}}}),we=()=>({trigger:[String,Array],open:{type:Boolean,default:void 0},visible:{type:Boolean,default:void 0},placement:String,color:String,transitionName:String,overlayStyle:I(),overlayInnerStyle:I(),overlayClassName:String,openClassName:String,prefixCls:String,mouseEnterDelay:Number,mouseLeaveDelay:Number,getPopupContainer:Function,arrowPointAtCenter:{type:Boolean,default:void 0},autoAdjustOverflow:{type:[Boolean,Object],default:void 0},destroyTooltipOnHide:{type:Boolean,default:void 0},align:I(),builtinPlacements:I(),children:Array,onVisibleChange:Function,"onUpdate:visible":Function,onOpenChange:Function,"onUpdate:open":Function});function Te(e,n){const a=be(n),o=k({[`${e}-${n}`]:n&&a}),i={},p={};return n&&!a&&(i.background=n,p["--antd-arrow-background-color"]=n),{className:o,overlayStyle:i,arrowStyle:p}}const Ne=e=>{const{componentCls:n,tooltipMaxWidth:a,tooltipColor:o,tooltipBg:i,tooltipBorderRadius:p,zIndexPopup:f,controlHeight:v,boxShadowSecondary:y,paddingSM:S,paddingXS:s,tooltipRadiusOuter:d}=e;return[{[n]:r(r(r(r({},te(e)),{position:"absolute",zIndex:f,display:"block","&":[{width:"max-content"},{width:"intrinsic"}],maxWidth:a,visibility:"visible","&-hidden":{display:"none"},"--antd-arrow-background-color":i,[`${n}-inner`]:{minWidth:v,minHeight:v,padding:`${S/2}px ${s}px`,color:o,textAlign:"start",textDecoration:"none",wordWrap:"break-word",backgroundColor:i,borderRadius:p,boxShadow:y},[["&-placement-left","&-placement-leftTop","&-placement-leftBottom","&-placement-right","&-placement-rightTop","&-placement-rightBottom"].join(",")]:{[`${n}-inner`]:{borderRadius:Math.min(p,me)}},[`${n}-content`]:{position:"relative"}}),Ce(e,(b,x)=>{let{darkColor:O}=x;return{[`&${n}-${b}`]:{[`${n}-inner`]:{backgroundColor:O},[`${n}-arrow`]:{"--antd-arrow-background-color":O}}}})),{"&-rtl":{direction:"rtl"}})},ge(q(e,{borderRadiusOuter:d}),{colorBg:"var(--antd-arrow-background-color)",showArrowCls:"",contentRadius:p,limitVerticalRadius:!0}),{[`${n}-pure`]:{position:"relative",maxWidth:"none"}}]},Ae=(e,n)=>ee("Tooltip",o=>{if((n==null?void 0:n.value)===!1)return[];const{borderRadius:i,colorTextLightSolid:p,colorBgDefault:f,borderRadiusOuter:v}=o,y=q(o,{tooltipMaxWidth:250,tooltipColor:p,tooltipBorderRadius:i,tooltipBg:f,tooltipRadiusOuter:v>4?4:v});return[Ne(y),he(o,"zoom-big-fast")]},o=>{let{zIndexPopupBase:i,colorBgSpotlight:p}=o;return{zIndexPopup:i+70,colorBgDefault:p}})(e),De=(e,n)=>{const a={},o=r({},e);return n.forEach(i=>{e&&i in e&&(a[i]=e[i],delete o[i])}),{picked:a,omitted:o}},_e=()=>r(r({},we()),{title:g.any}),Fe=()=>({trigger:"hover",align:{},placement:"top",mouseEnterDelay:.1,mouseLeaveDelay:.1,arrowPointAtCenter:!1,autoAdjustOverflow:!0}),Ie=H({compatConfig:{MODE:3},name:"ATooltip",inheritAttrs:!1,props:oe(_e(),{trigger:"hover",align:{},placement:"top",mouseEnterDelay:.1,mouseLeaveDelay:.1,arrowPointAtCenter:!1,autoAdjustOverflow:!0}),slots:Object,setup(e,n){let{slots:a,emit:o,attrs:i,expose:p}=n;const{prefixCls:f,getPopupContainer:v,direction:y,rootPrefixCls:S}=ne("tooltip",e),s=A(()=>{var t;return(t=e.open)!==null&&t!==void 0?t:e.visible}),d=W(ye([e.open,e.visible])),b=W();let x;de(s,t=>{z.cancel(x),x=z(()=>{d.value=!!t})});const O=()=>{var t;const l=(t=e.title)!==null&&t!==void 0?t:a.title;return!l&&l!==0},$=t=>{const l=O();s.value===void 0&&(d.value=l?!1:t),l||(o("update:visible",t),o("visibleChange",t),o("update:open",t),o("openChange",t))};p({getPopupDomNode:()=>b.value.getPopupDomNode(),open:d,forcePopupAlign:()=>{var t;return(t=b.value)===null||t===void 0?void 0:t.forcePopupAlign()}});const D=A(()=>{const{builtinPlacements:t,arrowPointAtCenter:l,autoAdjustOverflow:C}=e;return t||ve({arrowPointAtCenter:l,autoAdjustOverflow:C})}),w=t=>t||t==="",B=t=>{const l=t.type;if(typeof l=="object"&&t.props&&((l.__ANT_BUTTON===!0||l==="button")&&w(t.props.disabled)||l.__ANT_SWITCH===!0&&(w(t.props.disabled)||w(t.props.loading))||l.__ANT_RADIO===!0&&w(t.props.disabled))){const{picked:C,omitted:m}=De(se(t),["position","left","right","top","bottom","float","display","zIndex"]),h=r(r({display:"inline-block"},C),{cursor:"not-allowed",lineHeight:1,width:t.props&&t.props.block?"100%":void 0}),c=r(r({},m),{pointerEvents:"none"}),u=U(t,{style:c},!0);return P("span",{style:h,class:`${f.value}-disabled-compatible-wrapper`},[u])}return t},V=()=>{var t,l;return(t=e.title)!==null&&t!==void 0?t:(l=a.title)===null||l===void 0?void 0:l.call(a)},F=(t,l)=>{const C=D.value,m=Object.keys(C).find(h=>{var c,u;return C[h].points[0]===((c=l.points)===null||c===void 0?void 0:c[0])&&C[h].points[1]===((u=l.points)===null||u===void 0?void 0:u[1])});if(m){const h=t.getBoundingClientRect(),c={top:"50%",left:"50%"};m.indexOf("top")>=0||m.indexOf("Bottom")>=0?c.top=`${h.height-l.offset[1]}px`:(m.indexOf("Top")>=0||m.indexOf("bottom")>=0)&&(c.top=`${-l.offset[1]}px`),m.indexOf("left")>=0||m.indexOf("Right")>=0?c.left=`${h.width-l.offset[0]}px`:(m.indexOf("right")>=0||m.indexOf("Left")>=0)&&(c.left=`${-l.offset[0]}px`),t.style.transformOrigin=`${c.left} ${c.top}`}},N=A(()=>Te(f.value,e.color)),j=A(()=>i["data-popover-inject"]),[_,E]=Ae(f,A(()=>!j.value));return()=>{var t,l;const{openClassName:C,overlayClassName:m,overlayStyle:h,overlayInnerStyle:c}=e;let u=(l=le((t=a.default)===null||t===void 0?void 0:t.call(a)))!==null&&l!==void 0?l:null;u=u.length===1?u[0]:u;let L=d.value;if(s.value===void 0&&O()&&(L=!1),!u)return null;const T=B(ie(u)&&!ae(u)?u:P("span",null,[u])),K=k({[C||`${f.value}-open`]:!0,[T.props&&T.props.class]:T.props&&T.props.class}),Z=k(m,{[`${f.value}-rtl`]:y.value==="rtl"},N.value.className,E.value),G=r(r({},N.value.overlayStyle),c),J=N.value.arrowStyle,Q=r(r(r({},i),e),{prefixCls:f.value,getPopupContainer:v==null?void 0:v.value,builtinPlacements:D.value,visible:L,ref:b,overlayClassName:Z,overlayStyle:r(r({},J),h),overlayInnerStyle:G,onVisibleChange:$,onPopupAlign:F,transitionName:re(S.value,"zoom-big-fast",e.transitionName)});return _(P(xe,Q,{default:()=>[d.value?U(T,{class:K}):T],arrowContent:()=>P("span",{class:`${f.value}-arrow-content`},null),overlay:V}))}}}),Le=pe(Ie);export{Le as T,we as a,_e as b,Fe as t};
