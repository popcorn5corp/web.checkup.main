import{D as oe,l as R,_ as E,P as J,g as re,m as le,r as N,V as ie,W,X as j,k as $,Y as se,u as Q,w as ce,s as de}from"./compact-item-943b0817.js";import{_ as s}from"./extends-98964cd2.js";import{f as X,b as S,w as H,n as k,e as ue,d as T,j as be,o as fe,k as he,p as ve}from"./vue.esm-bundler-06433f34.js";import{u as Z,F as pe}from"./FormItemContext-d5d2b6af.js";import{K as me}from"./motion-8927e1f6.js";var ge=globalThis&&globalThis.__rest||function(e,a){var t={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&a.indexOf(o)<0&&(t[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,o=Object.getOwnPropertySymbols(e);l<o.length;l++)a.indexOf(o[l])<0&&Object.prototype.propertyIsEnumerable.call(e,o[l])&&(t[o[l]]=e[o[l]]);return t};const xe={prefixCls:String,name:String,id:String,type:String,defaultChecked:{type:[Boolean,Number],default:void 0},checked:{type:[Boolean,Number],default:void 0},disabled:Boolean,tabindex:{type:[Number,String]},readonly:Boolean,autofocus:Boolean,value:J.any,required:Boolean},Ce=X({compatConfig:{MODE:3},name:"Checkbox",inheritAttrs:!1,props:oe(xe,{prefixCls:"rc-checkbox",type:"checkbox",defaultChecked:!1}),emits:["click","change"],setup(e,a){let{attrs:t,emit:o,expose:l}=a;const x=S(e.checked===void 0?e.defaultChecked:e.checked),p=S();H(()=>e.checked,()=>{x.value=e.checked}),l({focus(){var r;(r=p.value)===null||r===void 0||r.focus()},blur(){var r;(r=p.value)===null||r===void 0||r.blur()}});const C=S(),f=r=>{if(e.disabled)return;e.checked===void 0&&(x.value=r.target.checked),r.shiftKey=C.value;const w={target:s(s({},e),{checked:r.target.checked}),stopPropagation(){r.stopPropagation()},preventDefault(){r.preventDefault()},nativeEvent:r};e.checked!==void 0&&(p.value.checked=!!e.checked),o("change",w),C.value=!1},y=r=>{o("click",r),C.value=r.shiftKey};return()=>{const{prefixCls:r,name:w,id:h,type:i,disabled:m,readonly:g,tabindex:D,autofocus:I,value:B,required:z}=e,n=ge(e,["prefixCls","name","id","type","disabled","readonly","tabindex","autofocus","value","required"]),{class:c,onFocus:b,onBlur:d,onKeydown:v,onKeypress:M,onKeyup:_}=t,O=s(s({},n),t),P=Object.keys(O).reduce((V,u)=>((u.startsWith("data-")||u.startsWith("aria-")||u==="role")&&(V[u]=O[u]),V),{}),A=R(r,c,{[`${r}-checked`]:x.value,[`${r}-disabled`]:m}),K=s(s({name:w,id:h,type:i,readonly:g,disabled:m,tabindex:D,class:`${r}-input`,checked:!!x.value,autofocus:I,value:B},P),{onChange:f,onClick:y,onFocus:b,onBlur:d,onKeydown:v,onKeypress:M,onKeyup:_,required:z});return k("span",{class:A},[k("input",E({ref:p},K),null),k("span",{class:`${r}-inner`},null)])}}}),ye=new me("antCheckboxEffect",{"0%":{transform:"scale(1)",opacity:.5},"100%":{transform:"scale(1.6)",opacity:0}}),$e=e=>{const{checkboxCls:a}=e,t=`${a}-wrapper`;return[{[`${a}-group`]:s(s({},N(e)),{display:"inline-flex",flexWrap:"wrap",columnGap:e.marginXS,[`> ${e.antCls}-row`]:{flex:1}}),[t]:s(s({},N(e)),{display:"inline-flex",alignItems:"baseline",cursor:"pointer","&:after":{display:"inline-block",width:0,overflow:"hidden",content:"'\\a0'"},[`& + ${t}`]:{marginInlineStart:0},[`&${t}-in-form-item`]:{'input[type="checkbox"]':{width:14,height:14}}}),[a]:s(s({},N(e)),{position:"relative",whiteSpace:"nowrap",lineHeight:1,cursor:"pointer",alignSelf:"center",[`${a}-input`]:{position:"absolute",inset:0,zIndex:1,cursor:"pointer",opacity:0,margin:0,[`&:focus-visible + ${a}-inner`]:s({},ie(e))},[`${a}-inner`]:{boxSizing:"border-box",position:"relative",top:0,insetInlineStart:0,display:"block",width:e.checkboxSize,height:e.checkboxSize,direction:"ltr",backgroundColor:e.colorBgContainer,border:`${e.lineWidth}px ${e.lineType} ${e.colorBorder}`,borderRadius:e.borderRadiusSM,borderCollapse:"separate",transition:`all ${e.motionDurationSlow}`,"&:after":{boxSizing:"border-box",position:"absolute",top:"50%",insetInlineStart:"21.5%",display:"table",width:e.checkboxSize/14*5,height:e.checkboxSize/14*8,border:`${e.lineWidthBold}px solid ${e.colorWhite}`,borderTop:0,borderInlineStart:0,transform:"rotate(45deg) scale(0) translate(-50%,-50%)",opacity:0,content:'""',transition:`all ${e.motionDurationFast} ${e.motionEaseInBack}, opacity ${e.motionDurationFast}`}},"& + span":{paddingInlineStart:e.paddingXS,paddingInlineEnd:e.paddingXS}})},{[a]:{"&-indeterminate":{[`${a}-inner`]:{"&:after":{top:"50%",insetInlineStart:"50%",width:e.fontSizeLG/2,height:e.fontSizeLG/2,backgroundColor:e.colorPrimary,border:0,transform:"translate(-50%, -50%) scale(1)",opacity:1,content:'""'}}}}},{[`${t}:hover ${a}:after`]:{visibility:"visible"},[`
        ${t}:not(${t}-disabled),
        ${a}:not(${a}-disabled)
      `]:{[`&:hover ${a}-inner`]:{borderColor:e.colorPrimary}},[`${t}:not(${t}-disabled)`]:{[`&:hover ${a}-checked:not(${a}-disabled) ${a}-inner`]:{backgroundColor:e.colorPrimaryHover,borderColor:"transparent"},[`&:hover ${a}-checked:not(${a}-disabled):after`]:{borderColor:e.colorPrimaryHover}}},{[`${a}-checked`]:{[`${a}-inner`]:{backgroundColor:e.colorPrimary,borderColor:e.colorPrimary,"&:after":{opacity:1,transform:"rotate(45deg) scale(1) translate(-50%,-50%)",transition:`all ${e.motionDurationMid} ${e.motionEaseOutBack} ${e.motionDurationFast}`}},"&:after":{position:"absolute",top:0,insetInlineStart:0,width:"100%",height:"100%",borderRadius:e.borderRadiusSM,visibility:"hidden",border:`${e.lineWidthBold}px solid ${e.colorPrimary}`,animationName:ye,animationDuration:e.motionDurationSlow,animationTimingFunction:"ease-in-out",animationFillMode:"backwards",content:'""',transition:`all ${e.motionDurationSlow}`}},[`
        ${t}-checked:not(${t}-disabled),
        ${a}-checked:not(${a}-disabled)
      `]:{[`&:hover ${a}-inner`]:{backgroundColor:e.colorPrimaryHover,borderColor:"transparent"},[`&:hover ${a}:after`]:{borderColor:e.colorPrimaryHover}}},{[`${t}-disabled`]:{cursor:"not-allowed"},[`${a}-disabled`]:{[`&, ${a}-input`]:{cursor:"not-allowed",pointerEvents:"none"},[`${a}-inner`]:{background:e.colorBgContainerDisabled,borderColor:e.colorBorder,"&:after":{borderColor:e.colorTextDisabled}},"&:after":{display:"none"},"& + span":{color:e.colorTextDisabled},[`&${a}-indeterminate ${a}-inner::after`]:{background:e.colorTextDisabled}}}]};function Se(e,a){const t=le(a,{checkboxCls:`.${e}`,checkboxSize:a.controlInteractiveSize});return[$e(t)]}const ee=re("Checkbox",(e,a)=>{let{prefixCls:t}=a;return[Se(t,e)]}),ke=()=>({name:String,prefixCls:String,options:W([]),disabled:Boolean,id:String}),we=()=>s(s({},ke()),{defaultValue:W(),value:W(),onChange:j(),"onUpdate:value":j()}),Ie=()=>({prefixCls:String,defaultChecked:$(),checked:$(),disabled:$(),isGroup:$(),value:J.any,name:String,id:String,indeterminate:$(),type:se("checkbox"),autofocus:$(),onChange:j(),"onUpdate:checked":j(),onClick:j(),skipGroup:$(!1)}),Oe=()=>s(s({},Ie()),{indeterminate:$(!1)}),ae=Symbol("CheckboxGroupContext");var Y=globalThis&&globalThis.__rest||function(e,a){var t={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&a.indexOf(o)<0&&(t[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,o=Object.getOwnPropertySymbols(e);l<o.length;l++)a.indexOf(o[l])<0&&Object.prototype.propertyIsEnumerable.call(e,o[l])&&(t[o[l]]=e[o[l]]);return t};const G=X({compatConfig:{MODE:3},name:"ACheckbox",inheritAttrs:!1,__ANT_CHECKBOX:!0,props:Oe(),setup(e,a){let{emit:t,attrs:o,slots:l,expose:x}=a;const p=Z(),C=pe.useInject(),{prefixCls:f,direction:y,disabled:r}=Q("checkbox",e),[w,h]=ee(f),i=ue(ae,void 0),m=Symbol("checkboxUniId"),g=T(()=>(i==null?void 0:i.disabled.value)||r.value);be(()=>{!e.skipGroup&&i&&i.registerValue(m,e.value)}),fe(()=>{i&&i.cancelValue(m)}),he(()=>{ce(!!(e.checked!==void 0||i||e.value===void 0))});const D=n=>{const c=n.target.checked;t("update:checked",c),t("change",n),p.onFieldChange()},I=S();return x({focus:()=>{var n;(n=I.value)===null||n===void 0||n.focus()},blur:()=>{var n;(n=I.value)===null||n===void 0||n.blur()}}),()=>{var n;const c=de((n=l.default)===null||n===void 0?void 0:n.call(l)),{indeterminate:b,skipGroup:d,id:v=p.id.value}=e,M=Y(e,["indeterminate","skipGroup","id"]),{onMouseenter:_,onMouseleave:O,onInput:P,class:A,style:K}=o,V=Y(o,["onMouseenter","onMouseleave","onInput","class","style"]),u=s(s(s(s({},M),{id:v,prefixCls:f.value}),V),{disabled:g.value});i&&!d?(u.onChange=function(){for(var q=arguments.length,L=new Array(q),F=0;F<q;F++)L[F]=arguments[F];t("change",...L),i.toggleOption({label:c,value:e.value})},u.name=i.name.value,u.checked=i.mergedValue.value.includes(e.value),u.disabled=g.value||i.disabled.value,u.indeterminate=b):u.onChange=D;const te=R({[`${f.value}-wrapper`]:!0,[`${f.value}-rtl`]:y.value==="rtl",[`${f.value}-wrapper-checked`]:u.checked,[`${f.value}-wrapper-disabled`]:u.disabled,[`${f.value}-wrapper-in-form-item`]:C.isFormItemInput},A,h.value),ne=R({[`${f.value}-indeterminate`]:b},h.value);return w(k("label",{class:te,style:K,onMouseenter:_,onMouseleave:O},[k(Ce,E(E({"aria-checked":b?"mixed":void 0},u),{},{class:ne,ref:I,disabled:g.value}),null),c.length?k("span",null,[c]):null]))}}}),U=X({compatConfig:{MODE:3},name:"ACheckboxGroup",inheritAttrs:!1,props:we(),setup(e,a){let{slots:t,attrs:o,emit:l,expose:x}=a;const p=Z(),{prefixCls:C,direction:f}=Q("checkbox",e),y=T(()=>`${C.value}-group`),[r,w]=ee(y),h=S((e.value===void 0?e.defaultValue:e.value)||[]);H(()=>e.value,()=>{h.value=e.value||[]});const i=T(()=>e.options.map(n=>typeof n=="string"||typeof n=="number"?{label:n,value:n}:n)),m=S(Symbol()),g=S(new Map),D=n=>{g.value.delete(n),m.value=Symbol()},I=(n,c)=>{g.value.set(n,c),m.value=Symbol()},B=S(new Map);return H(m,()=>{const n=new Map;for(const c of g.value.values())n.set(c,!0);B.value=n}),ve(ae,{cancelValue:D,registerValue:I,toggleOption:n=>{const c=h.value.indexOf(n.value),b=[...h.value];c===-1?b.push(n.value):b.splice(c,1),e.value===void 0&&(h.value=b);const d=b.filter(v=>B.value.has(v)).sort((v,M)=>{const _=i.value.findIndex(P=>P.value===v),O=i.value.findIndex(P=>P.value===M);return _-O});l("update:value",d),l("change",d),p.onFieldChange()},mergedValue:h,name:T(()=>e.name),disabled:T(()=>e.disabled)}),x({mergedValue:h}),()=>{var n;const{id:c=p.id.value}=e;let b=null;return i.value&&i.value.length>0&&(b=i.value.map(d=>{var v;return k(G,{prefixCls:C.value,key:d.value.toString(),disabled:"disabled"in d?d.disabled:e.disabled,indeterminate:d.indeterminate,value:d.value,checked:h.value.indexOf(d.value)!==-1,onChange:d.onChange,class:`${y.value}-item`},{default:()=>[t.label!==void 0?(v=t.label)===null||v===void 0?void 0:v.call(t,d):d.label]})})),r(k("div",E(E({},o),{},{class:[y.value,{[`${y.value}-rtl`]:f.value==="rtl"},o.class,w.value],id:c}),[b||((n=t.default)===null||n===void 0?void 0:n.call(t))]))}}});G.Group=U;G.install=function(e){return e.component(G.name,G),e.component(U.name,U),e};export{U as C,Ce as V,G as a,Se as g};
