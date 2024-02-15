import{_ as f,a as g}from"./ReserveLoadingTimeline-eb5fe157.js";import{T as p}from"./index-17b6ca45.js";import"./vue.esm-bundler-06433f34.js";import"./ClockCircleOutlined-ec564bb6.js";import"./compact-item-943b0817.js";import"./extends-98964cd2.js";import"./Button-f7730f75.js";import"./motion-8927e1f6.js";import"./index-aab19e1a.js";import"./index-df6759cb.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./DropdownButton-c71d963a.js";import"./slide-14b3f38e.js";import"./motionUtil-c773f409.js";import"./vnode-0120d1ab.js";import"./_arrayLikeKeys-856a4a59.js";import"./roundedArrow-e2771650.js";import"./RightOutlined-811eef93.js";import"./index-e64babe4.js";import"./vue-i18n.runtime-ed730321.js";const w={title:"checkupuikit/Atoms/Timeline",component:p,tags:["autodocs"],parameters:{layout:"fullscreen",componentSubtitle:"일련의 정보를 시간별로 정렬해야 하는 경우, 시각적 연결을 위해 타임라인이 필요한 경우에 사용할 수 있습니다. ",docs:{description:{component:"타임라인의 **Children 컴포넌트**로 **<code>&lt;TimelineItem/&gt; </code>를 사용할 수 있습니다."}}},argTypes:{default:{description:"기본 슬롯, 타임라인 컴포넌트의 자식 컴포넌트인 <Timeline.Item> 사용",table:{type:""},control:Object},click:{control:Object,table:{type:""}},reload:{description:"버튼 클릭 이벤트"},"button-text":{description:"버튼 텍스트 슬롯",type:{name:"string"},table:{type:"string"}}},args:{showBtn:!0,loading:!1,"button-text":"더 불러오기"}},e={args:{items:[{issuedDate:"2024-01-02",logs:[{logId:"a35cf87f-8b03-4f63-bed0-02f64b891c43",status:{label:"가입",value:"JOIN"},uid:"faad2d48-5297-4980-8529-81f2b86d1af1",nickname:"김길동",createTime:"18:09"},{logId:"791ed4b5-4918-47b2-b3e0-6230401256b6",status:{label:"생성",value:"CREATE"},uid:"faad2d48-5297-4980-8529-81f2b86d1af1",nickname:"이길동",createTime:"18:09"}]},{issuedDate:"2024-01-05",logs:[{logId:"a35cf87f-8b03-4f63-bed0-02f64b891c43",status:{label:"가입",value:"JOIN"},uid:"faad2d48-5297-4980-8529-81f2b86d1af1",nickname:"박길동",createTime:"18:09"},{logId:"791ed4b5-4918-47b2-b3e0-6230401256b6",status:{label:"생성",value:"CREATE"},uid:"faad2d48-5297-4980-8529-81f2b86d1af1",nickname:"홍길동",createTime:"18:09"}]}]},render:a=>({components:{Timeline:p},setup(){function b(){a.loading=!0,setTimeout(()=>{a.loading=!1},400)}return{args:a,onReload:b}},template:`
      <Timeline v-bind="args"  @reload="onReload">
        <template #button-text>
          {{ args['button-text'] }}
        </template>
      </Timeline>
    `})},n={render:()=>({components:{AlternateTimeline:f},template:"<AlternateTimeline/>"})},t={render:()=>({components:{ReserveLoadingTimeline:g},template:"<ReserveLoadingTimeline/>"})};var o,i,r;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    items: [{
      issuedDate: '2024-01-02',
      logs: [{
        logId: 'a35cf87f-8b03-4f63-bed0-02f64b891c43',
        status: {
          label: '가입',
          value: 'JOIN'
        },
        uid: 'faad2d48-5297-4980-8529-81f2b86d1af1',
        nickname: '김길동',
        createTime: '18:09'
      }, {
        logId: '791ed4b5-4918-47b2-b3e0-6230401256b6',
        status: {
          label: '생성',
          value: 'CREATE'
        },
        uid: 'faad2d48-5297-4980-8529-81f2b86d1af1',
        nickname: '이길동',
        createTime: '18:09'
      }]
    }, {
      issuedDate: '2024-01-05',
      logs: [{
        logId: 'a35cf87f-8b03-4f63-bed0-02f64b891c43',
        status: {
          label: '가입',
          value: 'JOIN'
        },
        uid: 'faad2d48-5297-4980-8529-81f2b86d1af1',
        nickname: '박길동',
        createTime: '18:09'
      }, {
        logId: '791ed4b5-4918-47b2-b3e0-6230401256b6',
        status: {
          label: '생성',
          value: 'CREATE'
        },
        uid: 'faad2d48-5297-4980-8529-81f2b86d1af1',
        nickname: '홍길동',
        createTime: '18:09'
      }]
    }]
  },
  render: args => ({
    components: {
      Timeline
    },
    setup() {
      function onReload() {
        args.loading = true;
        setTimeout(() => {
          args.loading = false;
        }, 400);
      }
      return {
        args,
        onReload
      };
    },
    template: \`
      <Timeline v-bind="args"  @reload="onReload">
        <template #button-text>
          {{ args['button-text'] }}
        </template>
      </Timeline>
    \`
  })
}`,...(r=(i=e.parameters)==null?void 0:i.docs)==null?void 0:r.source}}};var s,l,m;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => ({
    components: {
      AlternateTimeline
    },
    template: \`<AlternateTimeline/>\`
  })
}`,...(m=(l=n.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var d,u,c;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => ({
    components: {
      ReserveLoadingTimeline
    },
    template: \`<ReserveLoadingTimeline/>\`
  })
}`,...(c=(u=t.parameters)==null?void 0:u.docs)==null?void 0:c.source}}};const $=["Default","CustomAlternateTimeline","CustomReserveLoadingTimeline"];export{n as CustomAlternateTimeline,t as CustomReserveLoadingTimeline,e as Default,$ as __namedExportsOrder,w as default};
