import{d as l,b as t,w as u,k as d,j as f,f as _,x as g}from"./vue.esm-bundler-da3dfd31.js";import"./useTheme-eec4b019.js";import{M as v}from"./index-e5788dd4.js";import{T as h}from"./index-9b7dca2f.js";import{_ as y}from"./_plugin-vue_export-helper-c27b6911.js";import"./vue-router-212c06c4.js";import"./extends-98964cd2.js";import"./vue-i18n.runtime-54aa6b03.js";import"./_baseSet-de153ea0.js";import"./_toKey-6cc18de3.js";import"./index-31244240.js";import"./slide-ff6c039b.js";import"./isArrayLikeObject-523edb65.js";import"./index-b4575248.js";import"./index-f0aafce9.js";import"./KeyCode-9b05785e.js";import"./pickAttrs-d6f9a41a.js";import"./colors-099fe84d.js";import"./Accordion-1ff785b2.js";import"./_commonjsHelpers-de833af9.js";import"./ClockCircleOutlined-566f9eed.js";import"./shallowequal-23878baf.js";import"./collapseMotion-6307b6e4.js";import"./index-6cf4e6ab.js";import"./iframe-8ae88575.js";import"../sb-preview/runtime.js";import"./Button-041be21e.js";import"./DropdownButton-0331ed8d.js";import"./index-9fe1cf39.js";import"./ExclamationCircleFilled-da22edd1.js";import"./index-5b2aa10a.js";const T={class:"group-history-container"},p=l({__name:"UserTimeline",props:{groupId:{default:"79adc938-1512-4afd-a6d5-e8eb22590bae"}},setup(c){const i=c,r=t(),a=t(0),o=t(!1),s=()=>{o.value=!o.value};u(i,()=>{m()},{immediate:!0});function m(){s(),a.value+=5,v.getGroupHistory(i.groupId,{size:a.value}).then(({success:e,data:n})=>{e&&(r.value=n.posts.content)}).catch(e=>console.log(e)).finally(()=>setTimeout(()=>{s()},300))}return(e,n)=>(d(),f("div",T,[_(g(h),{items:r.value,showBtn:!0,loading:o.value,onClick:m},null,8,["items","loading"])]))}});const Z=y(p,[["__scopeId","data-v-cfc15a75"]]);p.__docgenInfo={exportName:"default",displayName:"UserTimeline",description:"",tags:{},props:[{name:"groupId",required:!0,type:{name:"string"},defaultValue:{func:!1,value:"'79adc938-1512-4afd-a6d5-e8eb22590bae'"}}],sourceFiles:["/Users/kimnayoung/Documents/workspace/web.checkup.main/src/views/manage/manage-users/components/UserTimeline.vue"]};export{Z as default};
