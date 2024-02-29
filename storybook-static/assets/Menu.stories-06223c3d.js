import{d as S,l as x,j as h,u as M,f as c,v as P,k as p,e as v,X as z,F as w,m as _,y as f,B as K,V as A,x as y,r as V,w as I,S as $,Y as W,Z as G,q as j}from"./vue.esm-bundler-da3dfd31.js";import"./SvgIcon-db9b006f.js";import{M as g}from"./index-a0b3e6d9.js";import{a as H,u as X}from"./vue-router-212c06c4.js";import{a as Y}from"./useTour-3e614e3a.js";import{M as Z,m as J,L as Q,a as R,b as ee}from"./MenuHeader-7e2945e2.js";import{_ as k}from"./_plugin-vue_export-helper-c27b6911.js";import{I as ne}from"./index-31244240.js";import"./extends-98964cd2.js";import"./shallowequal-23878baf.js";import"./slide-ff6c039b.js";import"./_arrayIncludesWith-2f006ba6.js";import"./colors-099fe84d.js";import"./index-e44b3b0d.js";import"./DropdownButton-0331ed8d.js";import"./Button-041be21e.js";import"./KeyCode-9b05785e.js";import"./collapseMotion-6307b6e4.js";import"./vue-i18n.runtime-54aa6b03.js";import"./isNumeric-4ba116a0.js";import"./LeftOutlined-444c44d4.js";import"./useTheme-eec4b019.js";import"./_baseSet-de153ea0.js";import"./_toKey-6cc18de3.js";import"./isArrayLikeObject-523edb65.js";import"./index-b4575248.js";import"./index-f0aafce9.js";import"./pickAttrs-d6f9a41a.js";import"./Accordion-1ff785b2.js";import"./_commonjsHelpers-de833af9.js";import"./ClockCircleOutlined-566f9eed.js";import"./index-6cf4e6ab.js";import"./iframe-8ae88575.js";import"../sb-preview/runtime.js";import"./index-9fe1cf39.js";import"./ExclamationCircleFilled-da22edd1.js";var F=(i=>(i.LOGIN="login",i.REDIRECT="REDIRECT",i.PAGE_NOT_FOUND="PAGE_NOT_FOUND",i))(F||{});const te={class:"menu-item-content"},se={class:"icon"},oe={class:"menu-title"},D=S({name:"MenuItemContent",__name:"MenuItemContent",props:{item:{default:void 0}},setup(i){const a=i;return(e,m)=>{var t,d;const n=x("font-awesome-icon");return p(),h("div",te,[M("span",se,[c(n,{icon:["fas",((t=a.item.meta)==null?void 0:t.icon)||"minus"]},null,8,["icon"])]),M("span",oe,P((d=a.item.meta)==null?void 0:d.title),1)])}}});const N=k(D,[["__scopeId","data-v-f9169a52"]]);D.__docgenInfo={name:"MenuItemContent",exportName:"default",displayName:"MenuItemContent",description:"",tags:{},props:[{name:"item",required:!0,type:{name:"RouteRecordRaw"},defaultValue:{func:!1,value:"undefined"}}],sourceFiles:["/Users/kimnayoung/Documents/workspace/web.checkup.main/src/components/menu/src/components/MenuItemContent.vue"]};const U=S({__name:"MenuItem",props:{menus:{default:()=>[]}},setup(i){const a=i,e=v(()=>[...a.menus].filter(n=>{var t;return!((t=n.meta)!=null&&t.hideInMenu)}).sort((n,t)=>{var d,o;return(((d=n==null?void 0:n.meta)==null?void 0:d.orderNum)||0)-(((o=t==null?void 0:t.meta)==null?void 0:o.orderNum)||0)})),m=n=>{var t,d,o;return((t=n==null?void 0:n.meta)==null?void 0:t.type)===0||!Object.is((d=n==null?void 0:n.meta)==null?void 0:d.hideChildrenInMenu,!0)&&((o=n==null?void 0:n.children)==null?void 0:o.length)};return(n,t)=>{const d=x("MenuItem",!0);return p(!0),h(w,null,z(e.value,o=>(p(),h(w,{key:o.name||o.fullPath},[m(o)?(p(),_(y(g).SubMenu,A({key:o==null?void 0:o.name},n.$attrs),{title:f(()=>[c(N,{item:o},null,8,["item"])]),default:f(()=>[o.children?(p(),_(d,{key:0,menus:o.children},null,8,["menus"])):K("",!0)]),_:2},1040)):(p(),_(y(g).Item,{key:o==null?void 0:o.name},{default:f(()=>[c(N,{item:o},null,8,["item"])]),_:2},1024))],64))),128)}}});const ae=k(U,[["__scopeId","data-v-23077935"]]);U.__docgenInfo={exportName:"default",displayName:"MenuItem",description:"",tags:{},props:[{name:"menus",required:!0,type:{name:"Array",elements:[{name:"RouteRecordRaw"}]},defaultValue:{func:!1,value:"() => []"}}],sourceFiles:["/Users/kimnayoung/Documents/workspace/web.checkup.main/src/components/menu/src/components/MenuItem.vue"]};const ie=i=>(W("data-v-9166eb4c"),i=i(),G(),i),le={class:"menu-container"},de=ie(()=>M("div",{class:"menu-footer"},null,-1)),T=S({__name:"Menu",props:{items:{},collapsed:{type:Boolean},theme:{},mode:{},isSide:{type:Boolean}},setup(i){const a=i,e=H(),m=Y(),n=X(),t=V({openKeys:[],selectedKeys:[(e==null?void 0:e.name)||""]}),d=s=>n==null?void 0:n.getRoutes().find(l=>l.name===s),o=s=>n==null?void 0:n.getRoutes().find(l=>[l.name,l.path].includes(s)),C=()=>{const s=[];return e==null||e.matched.map(l=>{l.name&&s.push(l.name)}),s};I(()=>a.collapsed,s=>{t.openKeys=s?[]:C(),t.selectedKeys=[e==null?void 0:e.name]}),I(()=>e==null?void 0:e.fullPath,()=>{var l;if((e==null?void 0:e.name)===F.LOGIN||a.collapsed)return;t.openKeys=C();const s=e==null?void 0:e.meta;if(s!=null&&s.activeMenu){const r=o(s.activeMenu);t.selectedKeys=[(r==null?void 0:r.name)??(s==null?void 0:s.activeMenu)]}else t.selectedKeys=[((l=e==null?void 0:e.meta)==null?void 0:l.activeMenu)??(e==null?void 0:e.name)]},{immediate:!0});const E=({key:s})=>{if(s===(e==null?void 0:e.name))return;const l=d(s),{isExt:r,openMode:L}=(l==null?void 0:l.meta)||{};r&&L!==2?window.open(s):n==null||n.push({name:s})};return(s,l)=>(p(),h("div",le,[a.mode!=="horizontal"&&a.isSide?(p(),_(Z,{key:0,collapsed:s.collapsed},null,8,["collapsed"])):K("",!0),M("div",{class:$(["menu-content",{"is-side-menu":a.isSide}])},[c(y(g),{ref:r=>y(m).setTour(2,r),"selected-keys":t.selectedKeys,"onUpdate:selectedKeys":l[0]||(l[0]=r=>t.selectedKeys=r),"open-keys":a.isSide?t.openKeys:[],mode:a.mode!=="horizontal"&&a.isSide?"inline":"horizontal",theme:s.theme,collapsed:a.collapsed,onClick:E},{default:f(()=>[c(ae,{menus:a.items},null,8,["menus"])]),_:1},8,["selected-keys","open-keys","mode","theme","collapsed"])],2),de]))}});const q=k(T,[["__scopeId","data-v-9166eb4c"]]);T.__docgenInfo={exportName:"default",displayName:"Menu",description:"",tags:{},props:[{name:"items",required:!0,type:{name:"any"}},{name:"collapsed",required:!0,type:{name:"boolean"}},{name:"theme",required:!1,type:{name:"MenuThemeName"}},{name:"mode",required:!1,type:{name:"MenuMode"}},{name:"isSide",required:!0,type:{name:"boolean"}}],sourceFiles:["/Users/kimnayoung/Documents/workspace/web.checkup.main/src/components/menu/src/Menu.vue"]};const Ge={title:"checkupuikit/Atoms/Menu",component:q,tags:["autodocs"],argTypes:{items:{description:"메뉴 리스트 정보",table:{type:{summary:"MenuList",detail:"Array<{ path: string name: string meta: { title: string icon: string namePath: string[] fullPath: string isNew: boolean } children?: MenuItem[] }>"}}},mode:{description:"메뉴 모드",control:"select",options:["horizontal","vertical","inline"],table:{type:{summary:"MenuMode",detail:"'horizontal' | 'vertical' | 'inline'"}}},theme:{control:"select",options:["dark","light"]}},parameters:{componentSubtitle:"Menu 컴포넌트를 사용하여 다양한 메뉴의 탐색을 할 수 있습니다."},args:{items:J,mode:"inline",collapsed:!1,isSide:!0,theme:"light"}},u={render:i=>({components:{Menu:q,Sider:Q.Sider,Button:ne,MenuUnfoldOutlined:R,MenuFoldOutlined:ee},setup(){const{collapsed:a,mode:e,isSide:m,theme:n}=j(i),t=v(()=>a.value?80:220),d=v(()=>m!=null&&m.value?"inline":e==null?void 0:e.value);return{...i,isSide:m,theme:n,mode:e,asiderWidth:t,menuMode:d,collapsed:a,toggleCollapsed:()=>{a.value=!a.value}}},template:`
      <div>
      <Button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
        <MenuUnfoldOutlined v-if="collapsed" />
        <MenuFoldOutlined v-else />
      </Button>
      </div>
 

      <Sider
        v-if="isSide"
        class="layout-sider"
        v-model:collapsed="collapsed"
  
        :width="asiderWidth"
        :trigger="null"
        collapsible
      >    
        <Menu :items="items" :theme="theme" :collapsed="collapsed" :mode="menuMode" :isSide="isSide" />
      </Sider>

      <Menu v-else :items="items" :theme="theme" :collapsed="collapsed" :mode="menuMode" :isSide="isSide" />
    `})};var O,b,B;u.parameters={...u.parameters,docs:{...(O=u.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: args => ({
    components: {
      Menu,
      Sider: Layout.Sider,
      Button,
      MenuUnfoldOutlined,
      MenuFoldOutlined
    },
    setup() {
      const {
        collapsed,
        mode,
        isSide,
        theme
      } = toRefs(args);
      const asiderWidth = computed(() => collapsed.value ? 80 : 220);
      const menuMode = computed(() => isSide?.value ? 'inline' : mode?.value);
      const toggleCollapsed = () => {
        collapsed.value = !collapsed.value;
      };
      return {
        ...args,
        isSide,
        theme,
        mode,
        asiderWidth,
        menuMode,
        collapsed,
        toggleCollapsed
      };
    },
    template: \`
      <div>
      <Button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
        <MenuUnfoldOutlined v-if="collapsed" />
        <MenuFoldOutlined v-else />
      </Button>
      </div>
 

      <Sider
        v-if="isSide"
        class="layout-sider"
        v-model:collapsed="collapsed"
  
        :width="asiderWidth"
        :trigger="null"
        collapsible
      >    
        <Menu :items="items" :theme="theme" :collapsed="collapsed" :mode="menuMode" :isSide="isSide" />
      </Sider>

      <Menu v-else :items="items" :theme="theme" :collapsed="collapsed" :mode="menuMode" :isSide="isSide" />
    \`
  })
}`,...(B=(b=u.parameters)==null?void 0:b.docs)==null?void 0:B.source}}};const je=["Default"];export{u as Default,je as __namedExportsOrder,Ge as default};
