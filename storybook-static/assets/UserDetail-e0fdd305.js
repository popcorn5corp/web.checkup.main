import{f as D,r as v,w as y,y as p,z as s,O as r,S as a,n as m,M as n,u as c,N as d,F as g,_ as I}from"./vue.esm-bundler-06433f34.js";import{u as U}from"./index-2fe437c2.js";import{M as b}from"./index-b2fd6c35.js";import{D as l}from"./index-68075f0c.js";import{_ as N}from"./_plugin-vue_export-helper-c27b6911.js";import"./_commonjsHelpers-de833af9.js";import"./index-6cf4e6ab.js";import"./vue-router-09c98cdc.js";import"./index-f9a7754c.js";import"./FilterForm-0cbd5abc.js";import"./index-fe2cee87.js";import"./_arrayLikeKeys-856a4a59.js";import"./compact-item-943b0817.js";import"./extends-98964cd2.js";import"./_overRest-fdd2e9e6.js";import"./isArrayLikeObject-18ce9678.js";import"./isPlainObject-7ca50782.js";import"./dayjs.min-bd65d405.js";import"./pinia-1c824524.js";import"./Accordion-0d466002.js";import"./index-c186720f.js";import"./FormItemContext-d5d2b6af.js";import"./statusUtils-981b964f.js";import"./vnode-0120d1ab.js";import"./CloseCircleFilled-0e0600c9.js";import"./index-9435a495.js";import"./index-aab19e1a.js";import"./index-df6759cb.js";import"./index-7bc94af2.js";import"./EyeOutlined-3dbe0b46.js";import"./index-30344dd3.js";import"./motion-8927e1f6.js";import"./index-0fc5836e.js";import"./index-9c7320cf.js";import"./KeyCode-5dbefdba.js";import"./colors-897f8409.js";import"./ClockCircleOutlined-ec564bb6.js";import"./useMergedState-9fc4af37.js";import"./slide-14b3f38e.js";import"./motionUtil-c773f409.js";import"./index-0b93d195.js";import"./pickAttrs-7c36c3e9.js";import"./isMobile-12f0741d.js";import"./shallowequal-aee54418.js";import"./roundedArrow-e2771650.js";import"./RightOutlined-811eef93.js";import"./firstNotUndefined-29a740f3.js";import"./collapseMotion-a3198536.js";import"./Button-f7730f75.js";import"./DropdownButton-c71d963a.js";import"./_baseSet-597e192b.js";import"./_toKey-f8a2c48c.js";import"./isSymbol-4808126a.js";import"./vue-i18n.runtime-ed730321.js";import"./iframe-4d7f0ef5.js";import"../sb-preview/runtime.js";import"./index-1bdfef9a.js";import"./InfoCircleOutlined-588a8397.js";import"./ExclamationCircleFilled-d404fa4e.js";import"./cloneDeep-63a05421.js";import"./responsiveObserve-dd206e94.js";const B={class:"user-detail-container"},S={class:"title"},$={class:"content-wrapper"},j={class:"title"},x={class:"content-wrapper"},F={class:"group-wrapper"},f=D({__name:"UserDetail",props:{workspaceUserId:{}},setup(h){const k=h,{getWorkspaceId:u}=U(),o=v({data:{detail:{joinDate:"",gender:{label:"",value:""}},groups:[]}}),w=async t=>{u&&await b.getOneById(u,t).then(({success:_,data:i})=>{_&&(o.data={...i})})};return y(()=>k.workspaceUserId,t=>{w(t)},{immediate:!0}),(t,_)=>{var i;return p(),s("div",B,[r("h3",S,a(t.$t("common.detailInfo")),1),r("div",$,[m(c(l),{column:6},{default:n(()=>[m(c(l).Item,{label:t.$t("common.joinDate"),span:6},{default:n(()=>{var e;return[d(a((e=o.data.detail)==null?void 0:e.joinDate),1)]}),_:1},8,["label"]),m(c(l).Item,{label:t.$t("common.gender"),span:6},{default:n(()=>{var e;return[d(a((e=o.data.detail)==null?void 0:e.gender.label),1)]}),_:1},8,["label"])]),_:1})]),r("h3",j,a(t.$t("page.manage.group")),1),r("div",x,[r("div",F,[(i=o.data.groups)!=null&&i.length?(p(!0),s(g,{key:0},I(o.data.groups,e=>(p(),s("span",{key:e.groupId,class:"group-item"},a(e.name),1))),128)):(p(),s(g,{key:1},[d(" - ")],64))])])])}}});const Et=N(f,[["__scopeId","data-v-17374b9f"]]);f.__docgenInfo={exportName:"default",displayName:"UserDetail",description:"",tags:{},props:[{name:"workspaceUserId",required:!0,type:{name:"string"}}],sourceFiles:["/Users/kimnayoung/Documents/workspace/web.checkup.main/src/views/manage/manage-users/components/UserDetail.vue"]};export{Et as default};
