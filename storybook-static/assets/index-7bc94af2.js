import{_ as l}from"./extends-98964cd2.js";import{i as O}from"./vnode-0120d1ab.js";import{f as R,r as C,k as x,l as M,m as H,w as W,g as _}from"./vue.esm-bundler-06433f34.js";import{f as B}from"./compact-item-943b0817.js";const y=R({compatConfig:{MODE:3},name:"ResizeObserver",props:{disabled:Boolean,onResize:Function},emits:["resize"],setup(i,v){let{slots:c}=v;const n=C({width:0,height:0,offsetHeight:0,offsetWidth:0});let h=null,s=null;const r=()=>{s&&(s.disconnect(),s=null)},b=e=>{const{onResize:t}=i,o=e[0].target,{width:z,height:w}=o.getBoundingClientRect(),{offsetWidth:d,offsetHeight:f}=o,m=Math.floor(z),g=Math.floor(w);if(n.width!==m||n.height!==g||n.offsetWidth!==d||n.offsetHeight!==f){const u={width:m,height:g,offsetWidth:d,offsetHeight:f};l(n,u),t&&Promise.resolve().then(()=>{t(l(l({},u),{offsetWidth:d,offsetHeight:f}),o)})}},p=_(),a=()=>{const{disabled:e}=i;if(e){r();return}const t=B(p);t!==h&&(r(),h=t),!s&&t&&(s=new O(b),s.observe(t))};return x(()=>{a()}),M(()=>{a()}),H(()=>{r()}),W(()=>i.disabled,()=>{a()},{flush:"post"}),()=>{var e;return(e=c.default)===null||e===void 0?void 0:e.call(c)[0]}}});export{y as R};
