import{c as f,t as o,a as t}from"./_toKey-f8a2c48c.js";import{g as s,b as m}from"./cloneDeep-63a05421.js";import{b as a,f as g}from"./_flatRest-00fa2235.js";import{c}from"./isArrayLikeObject-18ce9678.js";import{i as L}from"./isPlainObject-7ca50782.js";function v(e,n,i){var l=-1,r=e.length;n<0&&(n=-n>r?0:r+n),i=i>r?r:i,i<0&&(i+=r),r=n>i?0:i-n>>>0,n>>>=0;for(var u=Array(r);++l<r;)u[l]=e[l+n];return u}function O(e){var n=e==null?0:e.length;return n?e[n-1]:void 0}function A(e,n){return n.length<2?e:a(e,v(n,0,-1))}function _(e,n){return n=f(n,e),e=A(e,n),e==null||delete e[o(O(n))]}function C(e){return L(e)?void 0:e}var E=1,F=2,G=4,N=g(function(e,n){var i={};if(e==null)return i;var l=!1;n=t(n,function(u){return u=f(u,e),l||(l=u.length>1),u}),c(e,s(e),i),l&&(i=m(i,E|F|G,C));for(var r=n.length;r--;)_(i,n[r]);return i});const D=N;export{D as o};
