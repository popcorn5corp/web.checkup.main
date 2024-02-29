import{d as Ae,h as ot,D as en,G as tn,o as nn,n as an,b as Z,e as ee,w as ge,F as ct,$ as Re,H as rn,f as ln,a0 as sn}from"./vue.esm-bundler-da3dfd31.js";/*!
  * shared v9.4.1
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */const de=typeof window<"u",j=(e,t=!1)=>t?Symbol.for(e):Symbol(e),on=(e,t,n)=>cn({l:e,k:t,s:n}),cn=e=>JSON.stringify(e).replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029").replace(/\u0027/g,"\\u0027"),y=e=>typeof e=="number"&&isFinite(e),un=e=>ut(e)==="[object Date]",_e=e=>ut(e)==="[object RegExp]",fe=e=>b(e)&&Object.keys(e).length===0,k=Object.assign;let Ue;const ae=()=>Ue||(Ue=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function ve(e){return e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")}const _n=Object.prototype.hasOwnProperty;function Ce(e,t){return _n.call(e,t)}const F=Array.isArray,M=e=>typeof e=="function",m=e=>typeof e=="string",C=e=>typeof e=="boolean",L=e=>e!==null&&typeof e=="object",it=Object.prototype.toString,ut=e=>it.call(e),b=e=>{if(!L(e))return!1;const t=Object.getPrototypeOf(e);return t===null||t.constructor===Object},fn=e=>e==null?"":F(e)||b(e)&&e.toString===it?JSON.stringify(e,null,2):String(e);function mn(e,t=""){return e.reduce((n,a,l)=>l===0?n+a:n+t+a,"")}function Se(e){let t=e;return()=>++t}function En(e,t){typeof console<"u"&&(console.warn("[intlify] "+e),t&&console.warn(t.stack))}/*!
  * message-compiler v9.4.1
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */const gn=/\{([0-9a-zA-Z]+)\}/g;function dn(e,...t){return t.length===1&&Nn(t[0])&&(t=t[0]),(!t||!t.hasOwnProperty)&&(t={}),e.replace(gn,(n,a)=>t.hasOwnProperty(a)?t[a]:"")}const Nn=e=>e!==null&&typeof e=="object",h={EXPECTED_TOKEN:1,INVALID_TOKEN_IN_PLACEHOLDER:2,UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER:3,UNKNOWN_ESCAPE_SEQUENCE:4,INVALID_UNICODE_ESCAPE_SEQUENCE:5,UNBALANCED_CLOSING_BRACE:6,UNTERMINATED_CLOSING_BRACE:7,EMPTY_PLACEHOLDER:8,NOT_ALLOW_NEST_PLACEHOLDER:9,INVALID_LINKED_FORMAT:10,MUST_HAVE_MESSAGES_IN_PLURAL:11,UNEXPECTED_EMPTY_LINKED_MODIFIER:12,UNEXPECTED_EMPTY_LINKED_KEY:13,UNEXPECTED_LEXICAL_ANALYSIS:14,UNHANDLED_CODEGEN_NODE_TYPE:15,UNHANDLED_MINIFIER_NODE_TYPE:16,__EXTEND_POINT__:17},Tn={[h.EXPECTED_TOKEN]:"Expected token: '{0}'",[h.INVALID_TOKEN_IN_PLACEHOLDER]:"Invalid token in placeholder: '{0}'",[h.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]:"Unterminated single quote in placeholder",[h.UNKNOWN_ESCAPE_SEQUENCE]:"Unknown escape sequence: \\{0}",[h.INVALID_UNICODE_ESCAPE_SEQUENCE]:"Invalid unicode escape sequence: {0}",[h.UNBALANCED_CLOSING_BRACE]:"Unbalanced closing brace",[h.UNTERMINATED_CLOSING_BRACE]:"Unterminated closing brace",[h.EMPTY_PLACEHOLDER]:"Empty placeholder",[h.NOT_ALLOW_NEST_PLACEHOLDER]:"Not allowed nest placeholder",[h.INVALID_LINKED_FORMAT]:"Invalid linked format",[h.MUST_HAVE_MESSAGES_IN_PLURAL]:"Plural must have messages",[h.UNEXPECTED_EMPTY_LINKED_MODIFIER]:"Unexpected empty linked modifier",[h.UNEXPECTED_EMPTY_LINKED_KEY]:"Unexpected empty linked key",[h.UNEXPECTED_LEXICAL_ANALYSIS]:"Unexpected lexical analysis in token: '{0}'",[h.UNHANDLED_CODEGEN_NODE_TYPE]:"unhandled codegen node type: '{0}'",[h.UNHANDLED_MINIFIER_NODE_TYPE]:"unhandled mimifier node type: '{0}'"};function _t(e,t,n={}){const{domain:a,messages:l,args:s}=n,r=dn((l||Tn)[e]||"",...s||[]),i=new SyntaxError(String(r));return i.code=e,t&&(i.location=t),i.domain=a,i}/*!
  * core-base v9.4.1
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */function In(){typeof __INTLIFY_PROD_DEVTOOLS__!="boolean"&&(ae().__INTLIFY_PROD_DEVTOOLS__=!1),typeof __INTLIFY_DROP_MESSAGE_COMPILER__!="boolean"&&(ae().__INTLIFY_DROP_MESSAGE_COMPILER__=!1)}const B=[];B[0]={w:[0],i:[3,0],"[":[4],o:[7]};B[1]={w:[1],".":[2],"[":[4],o:[7]};B[2]={w:[2],i:[3,0],0:[3,0]};B[3]={i:[3,0],0:[3,0],w:[1,1],".":[2,1],"[":[4,1],o:[7,1]};B[4]={"'":[5,0],'"':[6,0],"[":[4,2],"]":[1,3],o:8,l:[4,0]};B[5]={"'":[4,0],o:8,l:[5,0]};B[6]={'"':[4,0],o:8,l:[6,0]};const On=/^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;function bn(e){return On.test(e)}function Ln(e){const t=e.charCodeAt(0),n=e.charCodeAt(e.length-1);return t===n&&(t===34||t===39)?e.slice(1,-1):e}function Dn(e){if(e==null)return"o";switch(e.charCodeAt(0)){case 91:case 93:case 46:case 34:case 39:return e;case 95:case 36:case 45:return"i";case 9:case 10:case 13:case 160:case 65279:case 8232:case 8233:return"w"}return"i"}function pn(e){const t=e.trim();return e.charAt(0)==="0"&&isNaN(parseInt(e))?!1:bn(t)?Ln(t):"*"+t}function An(e){const t=[];let n=-1,a=0,l=0,s,r,i,o,_,g,d;const E=[];E[0]=()=>{r===void 0?r=i:r+=i},E[1]=()=>{r!==void 0&&(t.push(r),r=void 0)},E[2]=()=>{E[0](),l++},E[3]=()=>{if(l>0)l--,a=4,E[0]();else{if(l=0,r===void 0||(r=pn(r),r===!1))return!1;E[1]()}};function N(){const I=e[n+1];if(a===5&&I==="'"||a===6&&I==='"')return n++,i="\\"+I,E[0](),!0}for(;a!==null;)if(n++,s=e[n],!(s==="\\"&&N())){if(o=Dn(s),d=B[a],_=d[o]||d.l||8,_===8||(a=_[0],_[1]!==void 0&&(g=E[_[1]],g&&(i=s,g()===!1))))return;if(a===7)return t}}const we=new Map;function Rn(e,t){return L(e)?e[t]:null}function Cn(e,t){if(!L(e))return null;let n=we.get(t);if(n||(n=An(t),n&&we.set(t,n)),!n)return null;const a=n.length;let l=e,s=0;for(;s<a;){const r=l[n[s]];if(r===void 0)return null;l=r,s++}return l}const Sn=e=>e,Fn=e=>"",Pn="text",yn=e=>e.length===0?"":mn(e),hn=fn;function We(e,t){return e=Math.abs(e),t===2?e?e>1?1:0:1:e?Math.min(e,2):0}function Mn(e){const t=y(e.pluralIndex)?e.pluralIndex:-1;return e.named&&(y(e.named.count)||y(e.named.n))?y(e.named.count)?e.named.count:y(e.named.n)?e.named.n:t:t}function kn(e,t){t.count||(t.count=e),t.n||(t.n=e)}function Un(e={}){const t=e.locale,n=Mn(e),a=L(e.pluralRules)&&m(t)&&M(e.pluralRules[t])?e.pluralRules[t]:We,l=L(e.pluralRules)&&m(t)&&M(e.pluralRules[t])?We:void 0,s=T=>T[a(n,T.length,l)],r=e.list||[],i=T=>r[T],o=e.named||{};y(e.pluralIndex)&&kn(n,o);const _=T=>o[T];function g(T){const A=M(e.messages)?e.messages(T):L(e.messages)?e.messages[T]:!1;return A||(e.parent?e.parent.message(T):Fn)}const d=T=>e.modifiers?e.modifiers[T]:Sn,E=b(e.processor)&&M(e.processor.normalize)?e.processor.normalize:yn,N=b(e.processor)&&M(e.processor.interpolate)?e.processor.interpolate:hn,I=b(e.processor)&&m(e.processor.type)?e.processor.type:Pn,R={list:i,named:_,plural:s,linked:(T,...A)=>{const[S,O]=A;let p="text",f="";A.length===1?L(S)?(f=S.modifier||f,p=S.type||p):m(S)&&(f=S||f):A.length===2&&(m(S)&&(f=S||f),m(O)&&(p=O||p));const w=g(T)(R),H=p==="vnode"&&F(w)&&f?w[0]:w;return f?d(f)(H,p):H},message:g,type:I,interpolate:N,normalize:E,values:k({},r,o)};return R}let re=null;function vn(e){re=e}function wn(e,t,n){re&&re.emit("i18n:init",{timestamp:Date.now(),i18n:e,version:t,meta:n})}const Wn=Vn("function:translate");function Vn(e){return t=>re&&re.emit(e,t)}const xn={NOT_FOUND_KEY:1,FALLBACK_TO_TRANSLATE:2,CANNOT_FORMAT_NUMBER:3,FALLBACK_TO_NUMBER_FORMAT:4,CANNOT_FORMAT_DATE:5,FALLBACK_TO_DATE_FORMAT:6,EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER:7,__EXTEND_POINT__:8};function Gn(e,t,n){return[...new Set([n,...F(t)?t:L(t)?Object.keys(t):m(t)?[t]:[n]])]}function ft(e,t,n){const a=m(n)?n:Fe,l=e;l.__localeChainCache||(l.__localeChainCache=new Map);let s=l.__localeChainCache.get(a);if(!s){s=[];let r=[n];for(;F(r);)r=Ve(s,r,t);const i=F(t)||!b(t)?t:t.default?t.default:null;r=m(i)?[i]:i,F(r)&&Ve(s,r,!1),l.__localeChainCache.set(a,s)}return s}function Ve(e,t,n){let a=!0;for(let l=0;l<t.length&&C(a);l++){const s=t[l];m(s)&&(a=Yn(e,t[l],n))}return a}function Yn(e,t,n){let a;const l=t.split("-");do{const s=l.join("-");a=Hn(e,s,n),l.splice(-1,1)}while(l.length&&a===!0);return a}function Hn(e,t,n){let a=!1;if(!e.includes(t)&&(a=!0,t)){a=t[t.length-1]!=="!";const l=t.replace(/!/g,"");e.push(l),(F(n)||b(n))&&n[l]&&(a=n[l])}return a}const $n="9.4.1",me=-1,Fe="en-US",xe="",Ge=e=>`${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;function jn(){return{upper:(e,t)=>t==="text"&&m(e)?e.toUpperCase():t==="vnode"&&L(e)&&"__v_isVNode"in e?e.children.toUpperCase():e,lower:(e,t)=>t==="text"&&m(e)?e.toLowerCase():t==="vnode"&&L(e)&&"__v_isVNode"in e?e.children.toLowerCase():e,capitalize:(e,t)=>t==="text"&&m(e)?Ge(e):t==="vnode"&&L(e)&&"__v_isVNode"in e?Ge(e.children):e}}let Bn,mt;function Kn(e){mt=e}let Et;function Xn(e){Et=e}let gt=null;const Ye=e=>{gt=e},Qn=()=>gt;let dt=null;const He=e=>{dt=e},zn=()=>dt;let $e=0;function Jn(e={}){const t=M(e.onWarn)?e.onWarn:En,n=m(e.version)?e.version:$n,a=m(e.locale)?e.locale:Fe,l=F(e.fallbackLocale)||b(e.fallbackLocale)||m(e.fallbackLocale)||e.fallbackLocale===!1?e.fallbackLocale:a,s=b(e.messages)?e.messages:{[a]:{}},r=b(e.datetimeFormats)?e.datetimeFormats:{[a]:{}},i=b(e.numberFormats)?e.numberFormats:{[a]:{}},o=k({},e.modifiers||{},jn()),_=e.pluralRules||{},g=M(e.missing)?e.missing:null,d=C(e.missingWarn)||_e(e.missingWarn)?e.missingWarn:!0,E=C(e.fallbackWarn)||_e(e.fallbackWarn)?e.fallbackWarn:!0,N=!!e.fallbackFormat,I=!!e.unresolving,D=M(e.postTranslation)?e.postTranslation:null,R=b(e.processor)?e.processor:null,T=C(e.warnHtmlMessage)?e.warnHtmlMessage:!0,A=!!e.escapeParameter,S=M(e.messageCompiler)?e.messageCompiler:Bn,O=M(e.messageResolver)?e.messageResolver:mt||Rn,p=M(e.localeFallbacker)?e.localeFallbacker:Et||Gn,f=L(e.fallbackContext)?e.fallbackContext:void 0,w=e,H=L(w.__datetimeFormatters)?w.__datetimeFormatters:new Map,J=L(w.__numberFormatters)?w.__numberFormatters:new Map,X=L(w.__meta)?w.__meta:{};$e++;const x={version:n,cid:$e,locale:a,fallbackLocale:l,messages:s,modifiers:o,pluralRules:_,missing:g,missingWarn:d,fallbackWarn:E,fallbackFormat:N,unresolving:I,postTranslation:D,processor:R,warnHtmlMessage:T,escapeParameter:A,messageCompiler:S,messageResolver:O,localeFallbacker:p,fallbackContext:f,onWarn:t,__meta:X};return x.datetimeFormats=r,x.numberFormats=i,x.__datetimeFormatters=H,x.__numberFormatters=J,__INTLIFY_PROD_DEVTOOLS__&&wn(x,n,X),x}function Pe(e,t,n,a,l){const{missing:s,onWarn:r}=e;if(s!==null){const i=s(e,n,t,l);return m(i)?i:t}else return t}function te(e,t,n){const a=e;a.__localeChainCache=new Map,e.localeFallbacker(e,n,t)}const Nt=h.__EXTEND_POINT__,ie=Se(Nt),K={INVALID_ARGUMENT:Nt,INVALID_DATE_ARGUMENT:ie(),INVALID_ISO_DATE_ARGUMENT:ie(),NOT_SUPPORT_NON_STRING_MESSAGE:ie(),__EXTEND_POINT__:ie()};function z(e){return _t(e,null,void 0)}const le=e=>L(e)&&(e.t===0||e.type===0)&&("b"in e||"body"in e),je=()=>"",G=e=>M(e);function Be(e,...t){const{fallbackFormat:n,postTranslation:a,unresolving:l,messageCompiler:s,fallbackLocale:r,messages:i}=e,[o,_]=Ne(...t),g=C(_.missingWarn)?_.missingWarn:e.missingWarn,d=C(_.fallbackWarn)?_.fallbackWarn:e.fallbackWarn,E=C(_.escapeParameter)?_.escapeParameter:e.escapeParameter,N=!!_.resolvedMessage,I=m(_.default)||C(_.default)?C(_.default)?s?o:()=>o:_.default:n?s?o:()=>o:"",D=n||I!=="",R=m(_.locale)?_.locale:e.locale;E&&qn(_);let[T,A,S]=N?[o,R,i[R]||{}]:Tt(e,o,R,r,d,g),O=T,p=o;if(!N&&!(m(O)||le(O)||G(O))&&D&&(O=I,p=O),!N&&(!(m(O)||le(O)||G(O))||!m(A)))return l?me:o;let f=!1;const w=()=>{f=!0},H=G(O)?O:It(e,o,A,O,p,w);if(f)return O;const J=ta(e,A,S,_),X=Un(J),x=Zn(e,H,X),se=a?a(x,o):x;if(__INTLIFY_PROD_DEVTOOLS__){const oe={timestamp:Date.now(),key:m(o)?o:G(O)?O.key:"",locale:A||(G(O)?O.locale:""),format:m(O)?O:G(O)?O.source:"",message:se};oe.meta=k({},e.__meta,Qn()||{}),Wn(oe)}return se}function qn(e){F(e.list)?e.list=e.list.map(t=>m(t)?ve(t):t):L(e.named)&&Object.keys(e.named).forEach(t=>{m(e.named[t])&&(e.named[t]=ve(e.named[t]))})}function Tt(e,t,n,a,l,s){const{messages:r,onWarn:i,messageResolver:o,localeFallbacker:_}=e,g=_(e,a,n);let d={},E,N=null;const I="translate";for(let D=0;D<g.length&&(E=g[D],d=r[E]||{},(N=o(d,t))===null&&(N=d[t]),!(m(N)||le(N)||G(N)));D++){const R=Pe(e,t,E,s,I);R!==t&&(N=R)}return[N,E,d]}function It(e,t,n,a,l,s){const{messageCompiler:r,warnHtmlMessage:i}=e;if(G(a)){const _=a;return _.locale=_.locale||n,_.key=_.key||t,_}if(r==null){const _=()=>a;return _.locale=n,_.key=t,_}const o=r(a,ea(e,n,l,a,i,s));return o.locale=n,o.key=t,o.source=a,o}function Zn(e,t,n){return t(n)}function Ne(...e){const[t,n,a]=e,l={};if(!m(t)&&!y(t)&&!G(t)&&!le(t))throw z(K.INVALID_ARGUMENT);const s=y(t)?String(t):(G(t),t);return y(n)?l.plural=n:m(n)?l.default=n:b(n)&&!fe(n)?l.named=n:F(n)&&(l.list=n),y(a)?l.plural=a:m(a)?l.default=a:b(a)&&k(l,a),[s,l]}function ea(e,t,n,a,l,s){return{locale:t,key:n,warnHtmlMessage:l,onError:r=>{throw s&&s(r),r},onCacheKey:r=>on(t,n,r)}}function ta(e,t,n,a){const{modifiers:l,pluralRules:s,messageResolver:r,fallbackLocale:i,fallbackWarn:o,missingWarn:_,fallbackContext:g}=e,E={locale:t,modifiers:l,pluralRules:s,messages:N=>{let I=r(n,N);if(I==null&&g){const[,,D]=Tt(g,N,t,i,o,_);I=r(D,N)}if(m(I)||le(I)){let D=!1;const T=It(e,N,t,I,N,()=>{D=!0});return D?je:T}else return G(I)?I:je}};return e.processor&&(E.processor=e.processor),a.list&&(E.list=a.list),a.named&&(E.named=a.named),y(a.plural)&&(E.pluralIndex=a.plural),E}function Ke(e,...t){const{datetimeFormats:n,unresolving:a,fallbackLocale:l,onWarn:s,localeFallbacker:r}=e,{__datetimeFormatters:i}=e,[o,_,g,d]=Te(...t),E=C(g.missingWarn)?g.missingWarn:e.missingWarn;C(g.fallbackWarn)?g.fallbackWarn:e.fallbackWarn;const N=!!g.part,I=m(g.locale)?g.locale:e.locale,D=r(e,l,I);if(!m(o)||o==="")return new Intl.DateTimeFormat(I,d).format(_);let R={},T,A=null;const S="datetime format";for(let f=0;f<D.length&&(T=D[f],R=n[T]||{},A=R[o],!b(A));f++)Pe(e,o,T,E,S);if(!b(A)||!m(T))return a?me:o;let O=`${T}__${o}`;fe(d)||(O=`${O}__${JSON.stringify(d)}`);let p=i.get(O);return p||(p=new Intl.DateTimeFormat(T,k({},A,d)),i.set(O,p)),N?p.formatToParts(_):p.format(_)}const Ot=["localeMatcher","weekday","era","year","month","day","hour","minute","second","timeZoneName","formatMatcher","hour12","timeZone","dateStyle","timeStyle","calendar","dayPeriod","numberingSystem","hourCycle","fractionalSecondDigits"];function Te(...e){const[t,n,a,l]=e,s={};let r={},i;if(m(t)){const o=t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);if(!o)throw z(K.INVALID_ISO_DATE_ARGUMENT);const _=o[3]?o[3].trim().startsWith("T")?`${o[1].trim()}${o[3].trim()}`:`${o[1].trim()}T${o[3].trim()}`:o[1].trim();i=new Date(_);try{i.toISOString()}catch{throw z(K.INVALID_ISO_DATE_ARGUMENT)}}else if(un(t)){if(isNaN(t.getTime()))throw z(K.INVALID_DATE_ARGUMENT);i=t}else if(y(t))i=t;else throw z(K.INVALID_ARGUMENT);return m(n)?s.key=n:b(n)&&Object.keys(n).forEach(o=>{Ot.includes(o)?r[o]=n[o]:s[o]=n[o]}),m(a)?s.locale=a:b(a)&&(r=a),b(l)&&(r=l),[s.key||"",i,s,r]}function Xe(e,t,n){const a=e;for(const l in n){const s=`${t}__${l}`;a.__datetimeFormatters.has(s)&&a.__datetimeFormatters.delete(s)}}function Qe(e,...t){const{numberFormats:n,unresolving:a,fallbackLocale:l,onWarn:s,localeFallbacker:r}=e,{__numberFormatters:i}=e,[o,_,g,d]=Ie(...t),E=C(g.missingWarn)?g.missingWarn:e.missingWarn;C(g.fallbackWarn)?g.fallbackWarn:e.fallbackWarn;const N=!!g.part,I=m(g.locale)?g.locale:e.locale,D=r(e,l,I);if(!m(o)||o==="")return new Intl.NumberFormat(I,d).format(_);let R={},T,A=null;const S="number format";for(let f=0;f<D.length&&(T=D[f],R=n[T]||{},A=R[o],!b(A));f++)Pe(e,o,T,E,S);if(!b(A)||!m(T))return a?me:o;let O=`${T}__${o}`;fe(d)||(O=`${O}__${JSON.stringify(d)}`);let p=i.get(O);return p||(p=new Intl.NumberFormat(T,k({},A,d)),i.set(O,p)),N?p.formatToParts(_):p.format(_)}const bt=["localeMatcher","style","currency","currencyDisplay","currencySign","useGrouping","minimumIntegerDigits","minimumFractionDigits","maximumFractionDigits","minimumSignificantDigits","maximumSignificantDigits","compactDisplay","notation","signDisplay","unit","unitDisplay","roundingMode","roundingPriority","roundingIncrement","trailingZeroDisplay"];function Ie(...e){const[t,n,a,l]=e,s={};let r={};if(!y(t))throw z(K.INVALID_ARGUMENT);const i=t;return m(n)?s.key=n:b(n)&&Object.keys(n).forEach(o=>{bt.includes(o)?r[o]=n[o]:s[o]=n[o]}),m(a)?s.locale=a:b(a)&&(r=a),b(l)&&(r=l),[s.key||"",i,s,r]}function ze(e,t,n){const a=e;for(const l in n){const s=`${t}__${l}`;a.__numberFormatters.has(s)&&a.__numberFormatters.delete(s)}}In();/*!
  * vue-i18n v9.4.1
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */const na="9.4.1";function aa(){typeof __INTLIFY_DROP_MESSAGE_COMPILER__!="boolean"&&(ae().__INTLIFY_DROP_MESSAGE_COMPILER__=!1),typeof __INTLIFY_PROD_DEVTOOLS__!="boolean"&&(ae().__INTLIFY_PROD_DEVTOOLS__=!1)}const Lt=xn.__EXTEND_POINT__,$=Se(Lt);$(),$(),$(),$(),$(),$(),$(),$();const Dt=K.__EXTEND_POINT__,v=Se(Dt),W={UNEXPECTED_RETURN_TYPE:Dt,INVALID_ARGUMENT:v(),MUST_BE_CALL_SETUP_TOP:v(),NOT_INSTALLED:v(),NOT_AVAILABLE_IN_LEGACY_MODE:v(),REQUIRED_VALUE:v(),INVALID_VALUE:v(),CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN:v(),NOT_INSTALLED_WITH_PROVIDE:v(),UNEXPECTED_ERROR:v(),NOT_COMPATIBLE_LEGACY_VUE_I18N:v(),BRIDGE_SUPPORT_VUE_2_ONLY:v(),MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION:v(),NOT_AVAILABLE_COMPOSITION_IN_LEGACY:v(),__EXTEND_POINT__:v()};function V(e,...t){return _t(e,null,void 0)}const Oe=j("__translateVNode"),be=j("__datetimeParts"),Le=j("__numberParts"),ra=j("__setPluralRules"),la=j("__injectWithOption"),De=j("__dispose");function pe(e){if(!L(e))return e;for(const t in e)if(Ce(e,t))if(!t.includes("."))L(e[t])&&pe(e[t]);else{const n=t.split("."),a=n.length-1;let l=e,s=!1;for(let r=0;r<a;r++){if(n[r]in l||(l[n[r]]={}),!L(l[n[r]])){s=!0;break}l=l[n[r]]}s||(l[n[a]]=e[t],delete e[t]),L(l[n[a]])&&pe(l[n[a]])}return e}function pt(e,t){const{messages:n,__i18n:a,messageResolver:l,flatJson:s}=t,r=b(n)?n:F(a)?{}:{[e]:{}};if(F(a)&&a.forEach(i=>{if("locale"in i&&"resource"in i){const{locale:o,resource:_}=i;o?(r[o]=r[o]||{},ne(_,r[o])):ne(_,r)}else m(i)&&ne(JSON.parse(i),r)}),l==null&&s)for(const i in r)Ce(r,i)&&pe(r[i]);return r}const ue=e=>!L(e)||F(e);function ne(e,t){if(ue(e)||ue(t))throw V(W.INVALID_VALUE);for(const n in e)Ce(e,n)&&(ue(e[n])||ue(t[n])?t[n]=e[n]:ne(e[n],t[n]))}function At(e){return e.type}function sa(e,t,n){let a=L(t.messages)?t.messages:{};"__i18nGlobal"in n&&(a=pt(e.locale.value,{messages:a,__i18n:n.__i18nGlobal}));const l=Object.keys(a);l.length&&l.forEach(s=>{e.mergeLocaleMessage(s,a[s])});{if(L(t.datetimeFormats)){const s=Object.keys(t.datetimeFormats);s.length&&s.forEach(r=>{e.mergeDateTimeFormat(r,t.datetimeFormats[r])})}if(L(t.numberFormats)){const s=Object.keys(t.numberFormats);s.length&&s.forEach(r=>{e.mergeNumberFormat(r,t.numberFormats[r])})}}}function Je(e){return ln(sn,null,e,0)}const qe="__INTLIFY_META__";let Ze=0;function et(e){return(t,n,a,l)=>e(n,a,Re()||void 0,l)}const oa=()=>{const e=Re();let t=null;return e&&(t=At(e)[qe])?{[qe]:t}:null};function Rt(e={},t){const{__root:n,__injectWithOption:a}=e,l=n===void 0;let s=C(e.inheritLocale)?e.inheritLocale:!0;const r=Z(n&&s?n.locale.value:m(e.locale)?e.locale:Fe),i=Z(n&&s?n.fallbackLocale.value:m(e.fallbackLocale)||F(e.fallbackLocale)||b(e.fallbackLocale)||e.fallbackLocale===!1?e.fallbackLocale:r.value),o=Z(pt(r.value,e)),_=Z(b(e.datetimeFormats)?e.datetimeFormats:{[r.value]:{}}),g=Z(b(e.numberFormats)?e.numberFormats:{[r.value]:{}});let d=n?n.missingWarn:C(e.missingWarn)||_e(e.missingWarn)?e.missingWarn:!0,E=n?n.fallbackWarn:C(e.fallbackWarn)||_e(e.fallbackWarn)?e.fallbackWarn:!0,N=n?n.fallbackRoot:C(e.fallbackRoot)?e.fallbackRoot:!0,I=!!e.fallbackFormat,D=M(e.missing)?e.missing:null,R=M(e.missing)?et(e.missing):null,T=M(e.postTranslation)?e.postTranslation:null,A=n?n.warnHtmlMessage:C(e.warnHtmlMessage)?e.warnHtmlMessage:!0,S=!!e.escapeParameter;const O=n?n.modifiers:b(e.modifiers)?e.modifiers:{};let p=e.pluralRules||n&&n.pluralRules,f;f=(()=>{l&&He(null);const c={version:na,locale:r.value,fallbackLocale:i.value,messages:o.value,modifiers:O,pluralRules:p,missing:R===null?void 0:R,missingWarn:d,fallbackWarn:E,fallbackFormat:I,unresolving:!0,postTranslation:T===null?void 0:T,warnHtmlMessage:A,escapeParameter:S,messageResolver:e.messageResolver,messageCompiler:e.messageCompiler,__meta:{framework:"vue"}};c.datetimeFormats=_.value,c.numberFormats=g.value,c.__datetimeFormatters=b(f)?f.__datetimeFormatters:void 0,c.__numberFormatters=b(f)?f.__numberFormatters:void 0;const u=Jn(c);return l&&He(u),u})(),te(f,r.value,i.value);function H(){return[r.value,i.value,o.value,_.value,g.value]}const J=ee({get:()=>r.value,set:c=>{r.value=c,f.locale=r.value}}),X=ee({get:()=>i.value,set:c=>{i.value=c,f.fallbackLocale=i.value,te(f,r.value,c)}}),x=ee(()=>o.value),se=ee(()=>_.value),oe=ee(()=>g.value);function Ft(){return M(T)?T:null}function Pt(c){T=c,f.postTranslation=c}function yt(){return D}function ht(c){c!==null&&(R=et(c)),D=c,f.missing=R}const Q=(c,u,Y,U,Ee,ce)=>{H();let q;try{__INTLIFY_PROD_DEVTOOLS__&&Ye(oa()),l||(f.fallbackContext=n?zn():void 0),q=c(f)}finally{__INTLIFY_PROD_DEVTOOLS__&&Ye(null),l||(f.fallbackContext=void 0)}if(y(q)&&q===me){const[Zt,Ca]=u();return n&&N?U(n):Ee(Zt)}else{if(ce(q))return q;throw V(W.UNEXPECTED_RETURN_TYPE)}};function Me(...c){return Q(u=>Reflect.apply(Be,null,[u,...c]),()=>Ne(...c),"translate",u=>Reflect.apply(u.t,u,[...c]),u=>u,u=>m(u))}function Mt(...c){const[u,Y,U]=c;if(U&&!L(U))throw V(W.INVALID_ARGUMENT);return Me(u,Y,k({resolvedMessage:!0},U||{}))}function kt(...c){return Q(u=>Reflect.apply(Ke,null,[u,...c]),()=>Te(...c),"datetime format",u=>Reflect.apply(u.d,u,[...c]),()=>xe,u=>m(u))}function Ut(...c){return Q(u=>Reflect.apply(Qe,null,[u,...c]),()=>Ie(...c),"number format",u=>Reflect.apply(u.n,u,[...c]),()=>xe,u=>m(u))}function vt(c){return c.map(u=>m(u)||y(u)||C(u)?Je(String(u)):u)}const wt={normalize:vt,interpolate:c=>c,type:"vnode"};function Wt(...c){return Q(u=>{let Y;const U=u;try{U.processor=wt,Y=Reflect.apply(Be,null,[U,...c])}finally{U.processor=null}return Y},()=>Ne(...c),"translate",u=>u[Oe](...c),u=>[Je(u)],u=>F(u))}function Vt(...c){return Q(u=>Reflect.apply(Qe,null,[u,...c]),()=>Ie(...c),"number format",u=>u[Le](...c),()=>[],u=>m(u)||F(u))}function xt(...c){return Q(u=>Reflect.apply(Ke,null,[u,...c]),()=>Te(...c),"datetime format",u=>u[be](...c),()=>[],u=>m(u)||F(u))}function Gt(c){p=c,f.pluralRules=p}function Yt(c,u){const Y=m(u)?u:r.value,U=ke(Y);return f.messageResolver(U,c)!==null}function Ht(c){let u=null;const Y=ft(f,i.value,r.value);for(let U=0;U<Y.length;U++){const Ee=o.value[Y[U]]||{},ce=f.messageResolver(Ee,c);if(ce!=null){u=ce;break}}return u}function $t(c){const u=Ht(c);return u??(n?n.tm(c)||{}:{})}function ke(c){return o.value[c]||{}}function jt(c,u){o.value[c]=u,f.messages=o.value}function Bt(c,u){o.value[c]=o.value[c]||{},ne(u,o.value[c]),f.messages=o.value}function Kt(c){return _.value[c]||{}}function Xt(c,u){_.value[c]=u,f.datetimeFormats=_.value,Xe(f,c,u)}function Qt(c,u){_.value[c]=k(_.value[c]||{},u),f.datetimeFormats=_.value,Xe(f,c,u)}function zt(c){return g.value[c]||{}}function Jt(c,u){g.value[c]=u,f.numberFormats=g.value,ze(f,c,u)}function qt(c,u){g.value[c]=k(g.value[c]||{},u),f.numberFormats=g.value,ze(f,c,u)}Ze++,n&&de&&(ge(n.locale,c=>{s&&(r.value=c,f.locale=c,te(f,r.value,i.value))}),ge(n.fallbackLocale,c=>{s&&(i.value=c,f.fallbackLocale=c,te(f,r.value,i.value))}));const P={id:Ze,locale:J,fallbackLocale:X,get inheritLocale(){return s},set inheritLocale(c){s=c,c&&n&&(r.value=n.locale.value,i.value=n.fallbackLocale.value,te(f,r.value,i.value))},get availableLocales(){return Object.keys(o.value).sort()},messages:x,get modifiers(){return O},get pluralRules(){return p||{}},get isGlobal(){return l},get missingWarn(){return d},set missingWarn(c){d=c,f.missingWarn=d},get fallbackWarn(){return E},set fallbackWarn(c){E=c,f.fallbackWarn=E},get fallbackRoot(){return N},set fallbackRoot(c){N=c},get fallbackFormat(){return I},set fallbackFormat(c){I=c,f.fallbackFormat=I},get warnHtmlMessage(){return A},set warnHtmlMessage(c){A=c,f.warnHtmlMessage=c},get escapeParameter(){return S},set escapeParameter(c){S=c,f.escapeParameter=c},t:Me,getLocaleMessage:ke,setLocaleMessage:jt,mergeLocaleMessage:Bt,getPostTranslationHandler:Ft,setPostTranslationHandler:Pt,getMissingHandler:yt,setMissingHandler:ht,[ra]:Gt};return P.datetimeFormats=se,P.numberFormats=oe,P.rt=Mt,P.te=Yt,P.tm=$t,P.d=kt,P.n=Ut,P.getDateTimeFormat=Kt,P.setDateTimeFormat=Xt,P.mergeDateTimeFormat=Qt,P.getNumberFormat=zt,P.setNumberFormat=Jt,P.mergeNumberFormat=qt,P[la]=a,P[Oe]=Wt,P[be]=xt,P[Le]=Vt,P}const ye={tag:{type:[String,Object]},locale:{type:String},scope:{type:String,validator:e=>e==="parent"||e==="global",default:"parent"},i18n:{type:Object}};function ca({slots:e},t){return t.length===1&&t[0]==="default"?(e.default?e.default():[]).reduce((a,l)=>[...a,...l.type===ct?l.children:[l]],[]):t.reduce((n,a)=>{const l=e[a];return l&&(n[a]=l()),n},{})}function Ct(e){return ct}const ia=Ae({name:"i18n-t",props:k({keypath:{type:String,required:!0},plural:{type:[Number,String],validator:e=>y(e)||!isNaN(e)}},ye),setup(e,t){const{slots:n,attrs:a}=t,l=e.i18n||he({useScope:e.scope,__useComponent:!0});return()=>{const s=Object.keys(n).filter(d=>d!=="_"),r={};e.locale&&(r.locale=e.locale),e.plural!==void 0&&(r.plural=m(e.plural)?+e.plural:e.plural);const i=ca(t,s),o=l[Oe](e.keypath,i,r),_=k({},a),g=m(e.tag)||L(e.tag)?e.tag:Ct();return ot(g,_,o)}}}),tt=ia;function ua(e){return F(e)&&!m(e[0])}function St(e,t,n,a){const{slots:l,attrs:s}=t;return()=>{const r={part:!0};let i={};e.locale&&(r.locale=e.locale),m(e.format)?r.key=e.format:L(e.format)&&(m(e.format.key)&&(r.key=e.format.key),i=Object.keys(e.format).reduce((E,N)=>n.includes(N)?k({},E,{[N]:e.format[N]}):E,{}));const o=a(e.value,r,i);let _=[r.key];F(o)?_=o.map((E,N)=>{const I=l[E.type],D=I?I({[E.type]:E.value,index:N,parts:o}):[E.value];return ua(D)&&(D[0].key=`${E.type}-${N}`),D}):m(o)&&(_=[o]);const g=k({},s),d=m(e.tag)||L(e.tag)?e.tag:Ct();return ot(d,g,_)}}const _a=Ae({name:"i18n-n",props:k({value:{type:Number,required:!0},format:{type:[String,Object]}},ye),setup(e,t){const n=e.i18n||he({useScope:"parent",__useComponent:!0});return St(e,t,bt,(...a)=>n[Le](...a))}}),nt=_a,fa=Ae({name:"i18n-d",props:k({value:{type:[Number,Date],required:!0},format:{type:[String,Object]}},ye),setup(e,t){const n=e.i18n||he({useScope:"parent",__useComponent:!0});return St(e,t,Ot,(...a)=>n[be](...a))}}),at=fa;function ma(e,t){const n=e;if(e.mode==="composition")return n.__getInstance(t)||e.global;{const a=n.__getInstance(t);return a!=null?a.__composer:e.global.__composer}}function Ea(e){const t=r=>{const{instance:i,modifiers:o,value:_}=r;if(!i||!i.$)throw V(W.UNEXPECTED_ERROR);const g=ma(e,i.$),d=rt(_);return[Reflect.apply(g.t,g,[...lt(d)]),g]};return{created:(r,i)=>{const[o,_]=t(i);de&&e.global===_&&(r.__i18nWatcher=ge(_.locale,()=>{i.instance&&i.instance.$forceUpdate()})),r.__composer=_,r.textContent=o},unmounted:r=>{de&&r.__i18nWatcher&&(r.__i18nWatcher(),r.__i18nWatcher=void 0,delete r.__i18nWatcher),r.__composer&&(r.__composer=void 0,delete r.__composer)},beforeUpdate:(r,{value:i})=>{if(r.__composer){const o=r.__composer,_=rt(i);r.textContent=Reflect.apply(o.t,o,[...lt(_)])}},getSSRProps:r=>{const[i]=t(r);return{textContent:i}}}}function rt(e){if(m(e))return{path:e};if(b(e)){if(!("path"in e))throw V(W.REQUIRED_VALUE,"path");return e}else throw V(W.INVALID_VALUE)}function lt(e){const{path:t,locale:n,args:a,choice:l,plural:s}=e,r={},i=a||{};return m(n)&&(r.locale=n),y(l)&&(r.plural=l),y(s)&&(r.plural=s),[t,i,r]}function ga(e,t,...n){const a=b(n[0])?n[0]:{},l=!!a.useI18nComponentName;(C(a.globalInstall)?a.globalInstall:!0)&&([l?"i18n":tt.name,"I18nT"].forEach(r=>e.component(r,tt)),[nt.name,"I18nN"].forEach(r=>e.component(r,nt)),[at.name,"I18nD"].forEach(r=>e.component(r,at))),e.directive("t",Ea(t))}const da=j("global-vue-i18n");function Fa(e={},t){const n=C(e.globalInjection)?e.globalInjection:!0,a=!0,l=new Map,[s,r]=Na(e),i=j("");function o(d){return l.get(d)||null}function _(d,E){l.set(d,E)}function g(d){l.delete(d)}{const d={get mode(){return"composition"},get allowComposition(){return a},async install(E,...N){if(E.__VUE_I18N_SYMBOL__=i,E.provide(E.__VUE_I18N_SYMBOL__,d),b(N[0])){const R=N[0];d.__composerExtend=R.__composerExtend,d.__vueI18nExtend=R.__vueI18nExtend}let I=null;n&&(I=Aa(E,d.global)),ga(E,d,...N);const D=E.unmount;E.unmount=()=>{I&&I(),d.dispose(),D()}},get global(){return r},dispose(){s.stop()},__instances:l,__getInstance:o,__setInstance:_,__deleteInstance:g};return d}}function he(e={}){const t=Re();if(t==null)throw V(W.MUST_BE_CALL_SETUP_TOP);if(!t.isCE&&t.appContext.app!=null&&!t.appContext.app.__VUE_I18N_SYMBOL__)throw V(W.NOT_INSTALLED);const n=Ta(t),a=Oa(n),l=At(t),s=Ia(e,l);if(s==="global")return sa(a,e,l),a;if(s==="parent"){let o=ba(n,t,e.__useComponent);return o==null&&(o=a),o}const r=n;let i=r.__getInstance(t);if(i==null){const o=k({},e);"__i18n"in l&&(o.__i18n=l.__i18n),a&&(o.__root=a),i=Rt(o),r.__composerExtend&&(i[De]=r.__composerExtend(i)),Da(r,t,i),r.__setInstance(t,i)}return i}function Na(e,t,n){const a=en();{const l=a.run(()=>Rt(e));if(l==null)throw V(W.UNEXPECTED_ERROR);return[a,l]}}function Ta(e){{const t=tn(e.isCE?da:e.appContext.app.__VUE_I18N_SYMBOL__);if(!t)throw V(e.isCE?W.NOT_INSTALLED_WITH_PROVIDE:W.UNEXPECTED_ERROR);return t}}function Ia(e,t){return fe(e)?"__i18n"in t?"local":"global":e.useScope?e.useScope:"local"}function Oa(e){return e.mode==="composition"?e.global:e.global.__composer}function ba(e,t,n=!1){let a=null;const l=t.root;let s=La(t,n);for(;s!=null;){const r=e;if(e.mode==="composition"&&(a=r.__getInstance(s)),a!=null||l===s)break;s=s.parent}return a}function La(e,t=!1){return e==null?null:t&&e.vnode.ctx||e.parent}function Da(e,t,n){nn(()=>{},t),an(()=>{const a=n;e.__deleteInstance(t);const l=a[De];l&&(l(),delete a[De])},t)}const pa=["locale","fallbackLocale","availableLocales"],st=["t","rt","d","n","tm","te"];function Aa(e,t){const n=Object.create(null);return pa.forEach(l=>{const s=Object.getOwnPropertyDescriptor(t,l);if(!s)throw V(W.UNEXPECTED_ERROR);const r=rn(s.value)?{get(){return s.value.value},set(i){s.value.value=i}}:{get(){return s.get&&s.get()}};Object.defineProperty(n,l,r)}),e.config.globalProperties.$i18n=n,st.forEach(l=>{const s=Object.getOwnPropertyDescriptor(t,l);if(!s||!s.value)throw V(W.UNEXPECTED_ERROR);Object.defineProperty(e.config.globalProperties,`$${l}`,s)}),()=>{delete e.config.globalProperties.$i18n,st.forEach(l=>{delete e.config.globalProperties[`$${l}`]})}}aa();Kn(Cn);Xn(ft);if(__INTLIFY_PROD_DEVTOOLS__){const e=ae();e.__INTLIFY__=!0,vn(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__)}export{Fa as c,he as u};
