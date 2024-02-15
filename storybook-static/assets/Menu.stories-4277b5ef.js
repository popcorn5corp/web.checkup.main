import{f as k,A as x,z as g,O as _,n as u,S as q,y as d,d as M,_ as z,F as b,B as f,M as y,R as B,V as E,u as P,r as $,w as C,Z as G,$ as W,a0 as j,K as H}from"./vue.esm-bundler-06433f34.js";import"./SvgIcon-c1119032.js";import{M as v}from"./index-b8ebef0a.js";import{a as Z,u as J}from"./vue-router-09c98cdc.js";import{a as Q}from"./useTour-42456f6d.js";import{M as X,L as Y,a as R,b as ee}from"./MenuHeader-75fa5743.js";import{_ as w}from"./_plugin-vue_export-helper-c27b6911.js";import{i as te}from"./index-f9a7754c.js";import{B as ae}from"./index-aab19e1a.js";import"./compact-item-943b0817.js";import"./extends-98964cd2.js";import"./shallowequal-aee54418.js";import"./slide-14b3f38e.js";import"./motion-8927e1f6.js";import"./motionUtil-c773f409.js";import"./vnode-0120d1ab.js";import"./_arrayLikeKeys-856a4a59.js";import"./_arrayIncludesWith-2f006ba6.js";import"./isMobile-12f0741d.js";import"./index-7bc94af2.js";import"./index-8de211b8.js";import"./DropdownButton-c71d963a.js";import"./roundedArrow-e2771650.js";import"./Button-f7730f75.js";import"./RightOutlined-811eef93.js";import"./firstNotUndefined-29a740f3.js";import"./colors-897f8409.js";import"./KeyCode-5dbefdba.js";import"./collapseMotion-a3198536.js";import"./pinia-1c824524.js";import"./vue-i18n.runtime-ed730321.js";import"./isNumeric-4ba116a0.js";import"./LeftOutlined-2c031711.js";import"./index-fe2cee87.js";import"./_overRest-fdd2e9e6.js";import"./isArrayLikeObject-18ce9678.js";import"./isPlainObject-7ca50782.js";import"./dayjs.min-bd65d405.js";import"./_commonjsHelpers-de833af9.js";import"./index-2fe437c2.js";import"./index-6cf4e6ab.js";import"./iframe-4d7f0ef5.js";import"../sb-preview/runtime.js";import"./index-1bdfef9a.js";import"./InfoCircleOutlined-588a8397.js";import"./ExclamationCircleFilled-d404fa4e.js";import"./CloseCircleFilled-0e0600c9.js";import"./cloneDeep-63a05421.js";import"./FilterForm-0cbd5abc.js";import"./Accordion-0d466002.js";import"./index-c186720f.js";import"./FormItemContext-d5d2b6af.js";import"./statusUtils-981b964f.js";import"./index-9435a495.js";import"./EyeOutlined-3dbe0b46.js";import"./index-30344dd3.js";import"./index-0fc5836e.js";import"./index-9c7320cf.js";import"./index-df6759cb.js";import"./ClockCircleOutlined-ec564bb6.js";import"./useMergedState-9fc4af37.js";import"./index-0b93d195.js";import"./pickAttrs-7c36c3e9.js";import"./_baseSet-597e192b.js";import"./_toKey-f8a2c48c.js";import"./isSymbol-4808126a.js";var U=(m=>(m.LOGIN="login",m.REDIRECT="REDIRECT",m.PAGE_NOT_FOUND="PAGE_NOT_FOUND",m))(U||{});const ne={class:"menu-item-content"},oe={class:"icon"},se={class:"menu-title"},K=k({name:"MenuItemContent",__name:"MenuItemContent",props:{item:{default:void 0}},setup(m){const s=m;return(e,r)=>{var a,p;const t=x("font-awesome-icon");return d(),g("div",ne,[_("span",oe,[u(t,{icon:["fas",((a=s.item.meta)==null?void 0:a.icon)||"minus"]},null,8,["icon"])]),_("span",se,q((p=s.item.meta)==null?void 0:p.title),1)])}}});const I=w(K,[["__scopeId","data-v-f9169a52"]]);K.__docgenInfo={name:"MenuItemContent",exportName:"default",displayName:"MenuItemContent",description:"",tags:{},props:[{name:"item",required:!0,type:{name:"RouteRecordRaw"},defaultValue:{func:!1,value:"undefined"}}],sourceFiles:["/Users/kimnayoung/Documents/workspace/web.checkup.main/src/components/menu/src/components/MenuItemContent.vue"]};const T=k({__name:"MenuItem",props:{menus:{default:()=>[]}},setup(m){const s=m,e=M(()=>[...s.menus].filter(t=>{var a;return!((a=t.meta)!=null&&a.hideInMenu)}).sort((t,a)=>{var p,o;return(((p=t==null?void 0:t.meta)==null?void 0:p.orderNum)||0)-(((o=a==null?void 0:a.meta)==null?void 0:o.orderNum)||0)})),r=t=>{var a,p,o;return((a=t==null?void 0:t.meta)==null?void 0:a.type)===0||!Object.is((p=t==null?void 0:t.meta)==null?void 0:p.hideChildrenInMenu,!0)&&((o=t==null?void 0:t.children)==null?void 0:o.length)};return(t,a)=>{const p=x("MenuItem",!0);return d(!0),g(b,null,z(e.value,o=>(d(),g(b,{key:o.name||o.fullPath},[r(o)?(d(),f(P(v).SubMenu,E({key:o==null?void 0:o.name},t.$attrs),{title:y(()=>[u(I,{item:o},null,8,["item"])]),default:y(()=>[o.children?(d(),f(p,{key:0,menus:o.children},null,8,["menus"])):B("",!0)]),_:2},1040)):(d(),f(P(v).Item,{key:o==null?void 0:o.name},{default:y(()=>[u(I,{item:o},null,8,["item"])]),_:2},1024))],64))),128)}}});const me=w(T,[["__scopeId","data-v-23077935"]]);T.__docgenInfo={exportName:"default",displayName:"MenuItem",description:"",tags:{},props:[{name:"menus",required:!0,type:{name:"Array",elements:[{name:"RouteRecordRaw"}]},defaultValue:{func:!1,value:"() => []"}}],sourceFiles:["/Users/kimnayoung/Documents/workspace/web.checkup.main/src/components/menu/src/components/MenuItem.vue"]};const le=m=>(W("data-v-9e6a8e3e"),m=m(),j(),m),ie={class:"menu-container"},pe=le(()=>_("div",{class:"menu-footer"},null,-1)),F=k({__name:"Menu",props:{items:{},collapsed:{type:Boolean},theme:{},mode:{},isSide:{type:Boolean}},setup(m){const s=m,e=Z(),r=Q(),t=J(),a=$({openKeys:[],selectedKeys:[(e==null?void 0:e.name)||""]}),p=n=>t==null?void 0:t.getRoutes().find(l=>l.name===n),o=n=>t==null?void 0:t.getRoutes().find(l=>[l.name,l.path].includes(n)),S=()=>{const n=[];return e==null||e.matched.map(l=>{l.name&&n.push(l.name)}),n};C(()=>s.collapsed,n=>{a.openKeys=n?[]:S(),a.selectedKeys=[e==null?void 0:e.name]}),C(()=>e==null?void 0:e.fullPath,()=>{var l;if((e==null?void 0:e.name)===U.LOGIN||s.collapsed)return;a.openKeys=S();const n=e==null?void 0:e.meta;if(n!=null&&n.activeMenu){const c=o(n.activeMenu);a.selectedKeys=[(c==null?void 0:c.name)??(n==null?void 0:n.activeMenu)]}else a.selectedKeys=[((l=e==null?void 0:e.meta)==null?void 0:l.activeMenu)??(e==null?void 0:e.name)]},{immediate:!0});const L=({key:n})=>{if(n===(e==null?void 0:e.name))return;const l=p(n),{isExt:c,openMode:A}=(l==null?void 0:l.meta)||{};c&&A!==2?window.open(n):t==null||t.push({name:n})};return(n,l)=>(d(),g("div",ie,[s.mode!=="horizontal"&&s.isSide?(d(),f(X,{key:0,collapsed:n.collapsed},null,8,["collapsed"])):B("",!0),_("div",{class:G(["menu-content",{"is-side-menu":s.isSide}])},[u(P(v),{ref:c=>P(r).setTour(2,c),"selected-keys":a.selectedKeys,"onUpdate:selectedKeys":l[0]||(l[0]=c=>a.selectedKeys=c),"open-keys":s.isSide?a.openKeys:[],mode:s.mode!=="horizontal"&&s.isSide?"inline":"horizontal",theme:n.theme,collapsed:s.collapsed,onClick:L},{default:y(()=>[u(me,{menus:s.items},null,8,["menus"])]),_:1},8,["selected-keys","open-keys","mode","theme","collapsed"])],2),pe]))}});const V=w(F,[["__scopeId","data-v-9e6a8e3e"]]);F.__docgenInfo={exportName:"default",displayName:"Menu",description:"",tags:{},props:[{name:"items",required:!0,type:{name:"any"}},{name:"collapsed",required:!0,type:{name:"boolean"}},{name:"theme",required:!1,type:{name:"MenuTheme"}},{name:"mode",required:!1,type:{name:"MenuMode"}},{name:"isSide",required:!0,type:{name:"boolean"}}],sourceFiles:["/Users/kimnayoung/Documents/workspace/web.checkup.main/src/components/menu/src/Menu.vue"]};const{t:i}=te.global,re=[{path:"/dashboard",name:"dashboard",meta:{title:i("data.menu.dashboard"),icon:"magnifying-glass-chart",namePath:["dashboard"],fullPath:"/dashboard",isNew:!0},children:[{path:"dashboard",name:"dashboard",meta:{title:i("data.menu.dashboard"),namePath:["dashboard","dashboard"],fullPath:"/dashboard"}}]},{path:"/work",name:"work",meta:{title:i("data.menu.work"),icon:"satellite-dish",namePath:["work"],fullPath:"/work"},children:[{path:"template-manage",name:"work-template-manage",meta:{title:i("data.menu.workTemplateManage"),namePath:["work","template-manage"],fullPath:"/work/template-manage"}},{path:"work-status",name:"work-work-status",meta:{title:i("data.menu.workStatus"),namePath:["work","work-status"],fullPath:"/work/work-status"}},{path:"report-manage",name:"work-report-manage",meta:{title:i("data.menu.reportManage"),namePath:["work","report-manage"],fullPath:"/work/report-manage"}}]},{path:"/facility",name:"facility",component:{name:"LayoutParentView",__hmrId:"f60f4a90",__file:"/Users/insukim/Desktop/Develop/vite-vue3-admin/src/layout/routerView/index.vue"},meta:{title:i("data.menu.facility"),icon:"plug-circle-bolt",namePath:["facility"],fullPath:"/facility"},children:[{path:"status",name:"facility-status",meta:{title:i("data.menu.facilityStatus"),namePath:["facility","facility-status"],fullPath:"/facility/facility-status"}},{path:"category",name:"facility-category",meta:{title:i("data.menu.facilityCategory"),namePath:["facility","facility-category"],fullPath:"/facility/facility-category"}},{path:"part",name:"facility-part",meta:{title:i("data.menu.facilityPart"),namePath:["facility","facility-part"],fullPath:"/facility/facility-part"}}]},{path:"/purchase",name:"purchase",component:{name:"LayoutParentView",__hmrId:"f60f4a90",__file:"/Users/insukim/Desktop/Develop/vite-vue3-admin/src/layout/routerView/index.vue"},meta:{title:i("data.menu.purchase"),icon:"handshake",namePath:["purchase"],fullPath:"/purchase"},children:[{path:"apply-status",name:"purchase-apply-status",meta:{title:i("data.menu.applyStatus"),namePath:["purchase","apply-status"],fullPath:"/purchase/apply-status"}}]},{path:"/manage",name:"manage",component:{name:"LayoutParentView",__hmrId:"f60f4a90",__file:"/Users/insukim/Desktop/Develop/vite-vue3-admin/src/layout/routerView/index.vue"},meta:{title:i("data.menu.manage"),icon:"users",namePath:["manage"],fullPath:"/manage"},children:[{path:"users",name:"manage-users",meta:{title:i("data.menu.manageUsers"),namePath:["manage","manage-users"],fullPath:"/manage/users"}},{path:"group",name:"manage-group",meta:{title:i("data.menu.manageGroup"),namePath:["manage","manage-group"],fullPath:"/manage/group"}},{path:"module",name:"manage-module",meta:{title:i("data.menu.manageModule"),namePath:["manage","manage-module"],fullPath:"/manage/module"}}]},{path:"/samples",name:"samples",meta:{title:"Samples",icon:"kaaba",namePath:["samples"],fullPath:"/samples"},children:[{path:"dynamic-table",name:"samples-dynamic-table",meta:{title:"Dynamic Table",icon:"kaaba",namePath:["samples","samples-dynamic-table"],fullPath:"/samples/dynamic-table"}}]},{path:"/components",name:"components",meta:{title:"UI Components",icon:"icons",namePath:["components"],fullPath:"/components"},children:[{path:"table",name:"components-table",meta:{title:"Table",namePath:["components","components-table"],fullPath:"/components/table"}},{path:"accordion",name:"components-accordion",meta:{title:"Accordion",namePath:["components","components-accordion"],fullPath:"/components/accordion"}},{path:"modal",name:"components-modal",meta:{title:"Modal",namePath:["components","components-modal"],fullPath:"/components/modal"}},{path:"card",name:"components-card",meta:{title:"Card",namePath:["components","components-card"],fullPath:"/components/card"}},{path:"list",name:"components-list",meta:{title:"List",namePath:["components","components-list"],fullPath:"/components/list"}},{path:"form",name:"components-form",meta:{title:"Form",namePath:["components","components-form"],fullPath:"/components/form"}},{path:"timeline",name:"components-timeline",meta:{title:"Timeline",namePath:["components","components-timeline"],fullPath:"/components/timeline"}},{path:"search-select",name:"components-search-select",meta:{title:"SearchSelect",namePath:["components","components-search-select"],fullPath:"/components/search-select"}},{path:"input",name:"components-input",meta:{title:"Input",namePath:["components","components-input"],fullPath:"/components/input"}},{path:"select",name:"components-select",meta:{title:"Select",namePath:["components","components-select"],fullPath:"/components/select"}},{path:"tour",name:"components-tour",meta:{title:"Tour",namePath:["components","components-tour"],fullPath:"/components/tour"}}]}],wt={title:"checkupuikit/Atoms/Menu",component:V,tags:["autodocs"],argTypes:{items:{description:"메뉴 리스트 정보",table:{type:{summary:"MenuList",detail:"Array<{ path: string name: string meta: { title: string icon: string namePath: string[] fullPath: string isNew: boolean } children?: MenuItem[] }>"}}},mode:{description:"메뉴 모드",control:"select",options:["horizontal","vertical","inline"],table:{type:{summary:"MenuMode",detail:"'horizontal' | 'vertical' | 'inline'"}}},theme:{control:"select",options:["dark","light"]}},parameters:{componentSubtitle:"Menu 컴포넌트를 사용하여 다양한 메뉴의 탐색을 할 수 있습니다."},args:{items:re,mode:"inline",collapsed:!1,isSide:!0,theme:"light"}},h={render:m=>({components:{Menu:V,Sider:Y.Sider,Button:ae,MenuUnfoldOutlined:R,MenuFoldOutlined:ee},setup(){const{collapsed:s,mode:e,isSide:r,theme:t}=H(m),a=M(()=>s.value?80:220),p=M(()=>r!=null&&r.value?"inline":e==null?void 0:e.value);return{...m,isSide:r,theme:t,mode:e,asiderWidth:a,menuMode:p,collapsed:s,toggleCollapsed:()=>{s.value=!s.value}}},template:`
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
    `})};var N,O,D;h.parameters={...h.parameters,docs:{...(N=h.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(D=(O=h.parameters)==null?void 0:O.docs)==null?void 0:D.source}}};const St=["Default"];export{h as Default,St as __namedExportsOrder,wt as default};
