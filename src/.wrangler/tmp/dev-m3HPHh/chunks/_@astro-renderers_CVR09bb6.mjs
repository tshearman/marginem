globalThis.process ??= {}; globalThis.process.env ??= {};
import { v as renderJSX, w as createVNode, x as AstroJSX, y as AstroUserError } from './astro/server_BqNpRBsA.mjs';

var n,l$1,u$1,i$1,o$1,r$1,e,f$1,c$1,s$1,a$1,p$1={},v$1=[],y$1=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,d$1=Array.isArray;function w$1(n,l){for(var u in l)n[u]=l[u];return n}function g$1(n){n&&n.parentNode&&n.parentNode.removeChild(n);}function _$1(l,u,t){var i,o,r,e={};for(r in u)"key"==r?i=u[r]:"ref"==r?o=u[r]:e[r]=u[r];if(arguments.length>2&&(e.children=arguments.length>3?n.call(arguments,2):t),"function"==typeof l&&null!=l.defaultProps)for(r in l.defaultProps) void 0===e[r]&&(e[r]=l.defaultProps[r]);return m$1(l,e,i,o,null)}function m$1(n,t,i,o,r){var e={type:n,props:t,key:i,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:null==r?++u$1:r,__i:-1,__u:0};return null==r&&null!=l$1.vnode&&l$1.vnode(e),e}function k$1(n){return n.children}function x$1(n,l){this.props=n,this.context=l;}function S$1(n,l){if(null==l)return n.__?S$1(n.__,n.__i+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return "function"==typeof n.type?S$1(n):null}function C$1(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return C$1(n)}}function M$1(n){(!n.__d&&(n.__d=true)&&i$1.push(n)&&!$$1.__r++||o$1!=l$1.debounceRendering)&&((o$1=l$1.debounceRendering)||r$1)($$1);}function $$1(){for(var n,u,t,o,r,f,c,s=1;i$1.length;)i$1.length>s&&i$1.sort(e),n=i$1.shift(),s=i$1.length,n.__d&&(t=void 0,o=void 0,r=(o=(u=n).__v).__e,f=[],c=[],u.__P&&((t=w$1({},o)).__v=o.__v+1,l$1.vnode&&l$1.vnode(t),O$1(u.__P,t,o,u.__n,u.__P.namespaceURI,32&o.__u?[r]:null,f,null==r?S$1(o):r,!!(32&o.__u),c),t.__v=o.__v,t.__.__k[t.__i]=t,N$1(f,t,c),o.__e=o.__=null,t.__e!=r&&C$1(t)));$$1.__r=0;}function I$1(n,l,u,t,i,o,r,e,f,c,s){var a,h,y,d,w,g,_,m=t&&t.__k||v$1,b=l.length;for(f=P$1(u,l,m,f,b),a=0;a<b;a++)null!=(y=u.__k[a])&&(h=-1==y.__i?p$1:m[y.__i]||p$1,y.__i=a,g=O$1(n,y,h,i,o,r,e,f,c,s),d=y.__e,y.ref&&h.ref!=y.ref&&(h.ref&&B(h.ref,null,y),s.push(y.ref,y.__c||d,y)),null==w&&null!=d&&(w=d),(_=!!(4&y.__u))||h.__k===y.__k?f=A$1(y,f,n,_):"function"==typeof y.type&&void 0!==g?f=g:d&&(f=d.nextSibling),y.__u&=-7);return u.__e=w,f}function P$1(n,l,u,t,i){var o,r,e,f,c,s=u.length,a=s,h=0;for(n.__k=new Array(i),o=0;o<i;o++)null!=(r=l[o])&&"boolean"!=typeof r&&"function"!=typeof r?("string"==typeof r||"number"==typeof r||"bigint"==typeof r||r.constructor==String?r=n.__k[o]=m$1(null,r,null,null,null):d$1(r)?r=n.__k[o]=m$1(k$1,{children:r},null,null,null):void 0===r.constructor&&r.__b>0?r=n.__k[o]=m$1(r.type,r.props,r.key,r.ref?r.ref:null,r.__v):n.__k[o]=r,f=o+h,r.__=n,r.__b=n.__b+1,e=null,-1!=(c=r.__i=L$1(r,u,f,a))&&(a--,(e=u[c])&&(e.__u|=2)),null==e||null==e.__v?(-1==c&&(i>s?h--:i<s&&h++),"function"!=typeof r.type&&(r.__u|=4)):c!=f&&(c==f-1?h--:c==f+1?h++:(c>f?h--:h++,r.__u|=4))):n.__k[o]=null;if(a)for(o=0;o<s;o++)null!=(e=u[o])&&0==(2&e.__u)&&(e.__e==t&&(t=S$1(e)),D$1(e,e));return t}function A$1(n,l,u,t){var i,o;if("function"==typeof n.type){for(i=n.__k,o=0;i&&o<i.length;o++)i[o]&&(i[o].__=n,l=A$1(i[o],l,u,t));return l}n.__e!=l&&(t&&(l&&n.type&&!l.parentNode&&(l=S$1(n)),u.insertBefore(n.__e,l||null)),l=n.__e);do{l=l&&l.nextSibling;}while(null!=l&&8==l.nodeType);return l}function L$1(n,l,u,t){var i,o,r,e=n.key,f=n.type,c=l[u],s=null!=c&&0==(2&c.__u);if(null===c&&null==e||s&&e==c.key&&f==c.type)return u;if(t>(s?1:0))for(i=u-1,o=u+1;i>=0||o<l.length;)if(null!=(c=l[r=i>=0?i--:o++])&&0==(2&c.__u)&&e==c.key&&f==c.type)return r;return  -1}function T$1(n,l,u){"-"==l[0]?n.setProperty(l,null==u?"":u):n[l]=null==u?"":"number"!=typeof u||y$1.test(l)?u:u+"px";}function j$1(n,l,u,t,i){var o,r;n:if("style"==l)if("string"==typeof u)n.style.cssText=u;else {if("string"==typeof t&&(n.style.cssText=t=""),t)for(l in t)u&&l in u||T$1(n.style,l,"");if(u)for(l in u)t&&u[l]==t[l]||T$1(n.style,l,u[l]);}else if("o"==l[0]&&"n"==l[1])o=l!=(l=l.replace(f$1,"$1")),r=l.toLowerCase(),l=r in n||"onFocusOut"==l||"onFocusIn"==l?r.slice(2):l.slice(2),n.l||(n.l={}),n.l[l+o]=u,u?t?u.u=t.u:(u.u=c$1,n.addEventListener(l,o?a$1:s$1,o)):n.removeEventListener(l,o?a$1:s$1,o);else {if("http://www.w3.org/2000/svg"==i)l=l.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!=l&&"height"!=l&&"href"!=l&&"list"!=l&&"form"!=l&&"tabIndex"!=l&&"download"!=l&&"rowSpan"!=l&&"colSpan"!=l&&"role"!=l&&"popover"!=l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null==u||false===u&&"-"!=l[4]?n.removeAttribute(l):n.setAttribute(l,"popover"==l&&1==u?"":u));}}function F$1(n){return function(u){if(this.l){var t=this.l[u.type+n];if(null==u.t)u.t=c$1++;else if(u.t<t.u)return;return t(l$1.event?l$1.event(u):u)}}}function O$1(n,u,t,i,o,r,e,f,c,s){var a,h,p,v,y,_,m,b,S,C,M,$,P,A,H,L,T,j=u.type;if(void 0!==u.constructor)return null;128&t.__u&&(c=!!(32&t.__u),r=[f=u.__e=t.__e]),(a=l$1.__b)&&a(u);n:if("function"==typeof j)try{if(b=u.props,S="prototype"in j&&j.prototype.render,C=(a=j.contextType)&&i[a.__c],M=a?C?C.props.value:a.__:i,t.__c?m=(h=u.__c=t.__c).__=h.__E:(S?u.__c=h=new j(b,M):(u.__c=h=new x$1(b,M),h.constructor=j,h.render=E$1),C&&C.sub(h),h.state||(h.state={}),h.__n=i,p=h.__d=!0,h.__h=[],h._sb=[]),S&&null==h.__s&&(h.__s=h.state),S&&null!=j.getDerivedStateFromProps&&(h.__s==h.state&&(h.__s=w$1({},h.__s)),w$1(h.__s,j.getDerivedStateFromProps(b,h.__s))),v=h.props,y=h.state,h.__v=u,p)S&&null==j.getDerivedStateFromProps&&null!=h.componentWillMount&&h.componentWillMount(),S&&null!=h.componentDidMount&&h.__h.push(h.componentDidMount);else {if(S&&null==j.getDerivedStateFromProps&&b!==v&&null!=h.componentWillReceiveProps&&h.componentWillReceiveProps(b,M),u.__v==t.__v||!h.__e&&null!=h.shouldComponentUpdate&&!1===h.shouldComponentUpdate(b,h.__s,M)){for(u.__v!=t.__v&&(h.props=b,h.state=h.__s,h.__d=!1),u.__e=t.__e,u.__k=t.__k,u.__k.some(function(n){n&&(n.__=u);}),$=0;$<h._sb.length;$++)h.__h.push(h._sb[$]);h._sb=[],h.__h.length&&e.push(h);break n}null!=h.componentWillUpdate&&h.componentWillUpdate(b,h.__s,M),S&&null!=h.componentDidUpdate&&h.__h.push(function(){h.componentDidUpdate(v,y,_);});}if(h.context=M,h.props=b,h.__P=n,h.__e=!1,P=l$1.__r,A=0,S){for(h.state=h.__s,h.__d=!1,P&&P(u),a=h.render(h.props,h.state,h.context),H=0;H<h._sb.length;H++)h.__h.push(h._sb[H]);h._sb=[];}else do{h.__d=!1,P&&P(u),a=h.render(h.props,h.state,h.context),h.state=h.__s;}while(h.__d&&++A<25);h.state=h.__s,null!=h.getChildContext&&(i=w$1(w$1({},i),h.getChildContext())),S&&!p&&null!=h.getSnapshotBeforeUpdate&&(_=h.getSnapshotBeforeUpdate(v,y)),L=a,null!=a&&a.type===k$1&&null==a.key&&(L=V(a.props.children)),f=I$1(n,d$1(L)?L:[L],u,t,i,o,r,e,f,c,s),h.base=u.__e,u.__u&=-161,h.__h.length&&e.push(h),m&&(h.__E=h.__=null);}catch(n){if(u.__v=null,c||null!=r)if(n.then){for(u.__u|=c?160:128;f&&8==f.nodeType&&f.nextSibling;)f=f.nextSibling;r[r.indexOf(f)]=null,u.__e=f;}else {for(T=r.length;T--;)g$1(r[T]);z$1(u);}else u.__e=t.__e,u.__k=t.__k,n.then||z$1(u);l$1.__e(n,u,t);}else null==r&&u.__v==t.__v?(u.__k=t.__k,u.__e=t.__e):f=u.__e=q$1(t.__e,u,t,i,o,r,e,c,s);return (a=l$1.diffed)&&a(u),128&u.__u?void 0:f}function z$1(n){n&&n.__c&&(n.__c.__e=true),n&&n.__k&&n.__k.forEach(z$1);}function N$1(n,u,t){for(var i=0;i<t.length;i++)B(t[i],t[++i],t[++i]);l$1.__c&&l$1.__c(u,n),n.some(function(u){try{n=u.__h,u.__h=[],n.some(function(n){n.call(u);});}catch(n){l$1.__e(n,u.__v);}});}function V(n){return "object"!=typeof n||null==n||n.__b&&n.__b>0?n:d$1(n)?n.map(V):w$1({},n)}function q$1(u,t,i,o,r,e,f,c,s){var a,h,v,y,w,_,m,b=i.props||p$1,k=t.props,x=t.type;if("svg"==x?r="http://www.w3.org/2000/svg":"math"==x?r="http://www.w3.org/1998/Math/MathML":r||(r="http://www.w3.org/1999/xhtml"),null!=e)for(a=0;a<e.length;a++)if((w=e[a])&&"setAttribute"in w==!!x&&(x?w.localName==x:3==w.nodeType)){u=w,e[a]=null;break}if(null==u){if(null==x)return document.createTextNode(k);u=document.createElementNS(r,x,k.is&&k),c&&(l$1.__m&&l$1.__m(t,e),c=false),e=null;}if(null==x)b===k||c&&u.data==k||(u.data=k);else {if(e=e&&n.call(u.childNodes),!c&&null!=e)for(b={},a=0;a<u.attributes.length;a++)b[(w=u.attributes[a]).name]=w.value;for(a in b)if(w=b[a],"children"==a);else if("dangerouslySetInnerHTML"==a)v=w;else if(!(a in k)){if("value"==a&&"defaultValue"in k||"checked"==a&&"defaultChecked"in k)continue;j$1(u,a,null,w,r);}for(a in k)w=k[a],"children"==a?y=w:"dangerouslySetInnerHTML"==a?h=w:"value"==a?_=w:"checked"==a?m=w:c&&"function"!=typeof w||b[a]===w||j$1(u,a,w,b[a],r);if(h)c||v&&(h.__html==v.__html||h.__html==u.innerHTML)||(u.innerHTML=h.__html),t.__k=[];else if(v&&(u.innerHTML=""),I$1("template"==t.type?u.content:u,d$1(y)?y:[y],t,i,o,"foreignObject"==x?"http://www.w3.org/1999/xhtml":r,e,f,e?e[0]:i.__k&&S$1(i,0),c,s),null!=e)for(a=e.length;a--;)g$1(e[a]);c||(a="value","progress"==x&&null==_?u.removeAttribute("value"):null!=_&&(_!==u[a]||"progress"==x&&!_||"option"==x&&_!=b[a])&&j$1(u,a,_,b[a],r),a="checked",null!=m&&m!=u[a]&&j$1(u,a,m,b[a],r));}return u}function B(n,u,t){try{if("function"==typeof n){var i="function"==typeof n.__u;i&&n.__u(),i&&null==u||(n.__u=n(u));}else n.current=u;}catch(n){l$1.__e(n,t);}}function D$1(n,u,t){var i,o;if(l$1.unmount&&l$1.unmount(n),(i=n.ref)&&(i.current&&i.current!=n.__e||B(i,null,u)),null!=(i=n.__c)){if(i.componentWillUnmount)try{i.componentWillUnmount();}catch(n){l$1.__e(n,u);}i.base=i.__P=null;}if(i=n.__k)for(o=0;o<i.length;o++)i[o]&&D$1(i[o],u,t||"function"!=typeof n.type);t||g$1(n.__e),n.__c=n.__=n.__e=void 0;}function E$1(n,l,u){return this.constructor(n,u)}n=v$1.slice,l$1={__e:function(n,l,u,t){for(var i,o,r;l=l.__;)if((i=l.__c)&&!i.__)try{if((o=i.constructor)&&null!=o.getDerivedStateFromError&&(i.setState(o.getDerivedStateFromError(n)),r=i.__d),null!=i.componentDidCatch&&(i.componentDidCatch(n,t||{}),r=i.__d),r)return i.__E=i}catch(l){n=l;}throw n}},u$1=0,x$1.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!=this.state?this.__s:this.__s=w$1({},this.state),"function"==typeof n&&(n=n(w$1({},u),this.props)),n&&w$1(u,n),null!=n&&this.__v&&(l&&this._sb.push(l),M$1(this));},x$1.prototype.forceUpdate=function(n){this.__v&&(this.__e=true,n&&this.__h.push(n),M$1(this));},x$1.prototype.render=k$1,i$1=[],r$1="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,e=function(n,l){return n.__v.__b-l.__v.__b},$$1.__r=0,f$1=/(PointerCapture)$|Capture$/i,c$1=0,s$1=F$1(false),a$1=F$1(true);

var r="diffed",o="__c",i="__s",a="__c",c="__k",u="__d",s="__s",l=/[\s\n\\/='"\0<>]/,f=/^(xlink|xmlns|xml)([A-Z])/,p=/^(?:accessK|auto[A-Z]|cell|ch|col|cont|cross|dateT|encT|form[A-Z]|frame|hrefL|inputM|maxL|minL|noV|playsI|popoverT|readO|rowS|src[A-Z]|tabI|useM|item[A-Z])/,h=/^ac|^ali|arabic|basel|cap|clipPath$|clipRule$|color|dominant|enable|fill|flood|font|glyph[^R]|horiz|image|letter|lighting|marker[^WUH]|overline|panose|pointe|paint|rendering|shape|stop|strikethrough|stroke|text[^L]|transform|underline|unicode|units|^v[^i]|^w|^xH/,d=new Set(["draggable","spellcheck"]);function v(e){ void 0!==e.__g?e.__g|=8:e[u]=true;}function m(e){ void 0!==e.__g?e.__g&=-9:e[u]=false;}function y(e){return void 0!==e.__g?!!(8&e.__g):true===e[u]}var _=/["&<]/;function g(e){if(0===e.length||false===_.test(e))return e;for(var t=0,n=0,r="",o="";n<e.length;n++){switch(e.charCodeAt(n)){case 34:o="&quot;";break;case 38:o="&amp;";break;case 60:o="&lt;";break;default:continue}n!==t&&(r+=e.slice(t,n)),r+=o,t=n+1;}return n!==t&&(r+=e.slice(t,n)),r}var b={},x=new Set(["animation-iteration-count","border-image-outset","border-image-slice","border-image-width","box-flex","box-flex-group","box-ordinal-group","column-count","fill-opacity","flex","flex-grow","flex-negative","flex-order","flex-positive","flex-shrink","flood-opacity","font-weight","grid-column","grid-row","line-clamp","line-height","opacity","order","orphans","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-miterlimit","stroke-opacity","stroke-width","tab-size","widows","z-index","zoom"]),k=/[A-Z]/g;function w(e){var t="";for(var n in e){var r=e[n];if(null!=r&&""!==r){var o="-"==n[0]?n:b[n]||(b[n]=n.replace(k,"-$&").toLowerCase()),i=";";"number"!=typeof r||o.startsWith("--")||x.has(o)||(i="px;"),t=t+o+":"+r+i;}}return t||void 0}function C(){this.__d=true;}function A(e,t){return {__v:e,context:t,props:e.props,setState:C,forceUpdate:C,__d:true,__h:new Array(0)}}function S(e,t,n){if(!e.s){if(n instanceof L){if(!n.s)return void(n.o=S.bind(null,e,t));1&t&&(t=n.s),n=n.v;}if(n&&n.then)return void n.then(S.bind(null,e,t),S.bind(null,e,2));e.s=t,e.v=n;const r=e.o;r&&r(e);}}var L=/*#__PURE__*/function(){function e(){}return e.prototype.then=function(t,n){var r=new e,o=this.s;if(o){var i=1&o?t:n;if(i){try{S(r,1,i(this.v));}catch(e){S(r,2,e);}return r}return this}return this.o=function(e){try{var o=e.v;1&e.s?S(r,1,t?t(o):o):n?S(r,1,n(o)):S(r,2,o);}catch(e){S(r,2,e);}},r},e}();function E(e){return e instanceof L&&1&e.s}function j(e,t,n){for(var r;;){var o=e();if(E(o)&&(o=o.v),!o)return i;if(o.then){r=0;break}var i=n();if(i&&i.then){if(!E(i)){r=1;break}i=i.s;}var a; }var c=new L,u=S.bind(null,c,2);return (0===r?o.then(l):1===r?i.then(s):a.then(f)).then(void 0,u),c;function s(r){i=r;do{if(!(o=e())||E(o)&&!o.v)return void S(c,1,i);if(o.then)return void o.then(l).then(void 0,u);E(i=n())&&(i=i.v);}while(!i||!i.then);i.then(s).then(void 0,u);}function l(e){e?(i=n())&&i.then?i.then(s).then(void 0,u):s(i):S(c,1,i);}function f(){(o=e())?o.then?o.then(l).then(void 0,u):l(o):S(c,1,i);}}function T(e,t){try{var n=e();}catch(e){return t(true,e)}return n&&n.then?n.then(t.bind(null,false),t.bind(null,true)):t(false,n)}var D,P,$,U,Z=function(a,u){try{var s=l$1[i];l$1[i]=!0,D=l$1.__b,P=l$1[r],$=l$1.__r,U=l$1.unmount;var l=_$1(k$1,null);return l[c]=[a],Promise.resolve(T(function(){return Promise.resolve(O(a,u||F,!1,void 0,l,!0,void 0)).then(function(e){var t,n=function(){if(W(e)){var n=function(){var e=o.join(H);return t=1,e},r=0,o=e,i=j(function(){return !!o.some(function(e){return e&&"function"==typeof e.then})&&r++<25},void 0,function(){return Promise.resolve(Promise.all(o)).then(function(e){o=e.flat();})});return i&&i.then?i.then(n):n()}}();return n&&n.then?n.then(function(n){return t?n:e}):t?n:e})},function(t,n){if(l$1[o]&&l$1[o](a,M),l$1[i]=s,M.length=0,t)throw n;return n}))}catch(e){return Promise.reject(e)}},F={},M=[],W=Array.isArray,z=Object.assign,H="",N="\x3c!--$s--\x3e",q="\x3c!--/$s--\x3e";function I(e,t){var n,r=e.type,o=true;return e[a]?(o=false,(n=e[a]).state=n[s]):n=new r(e.props,t),e[a]=n,n.__v=e,n.props=e.props,n.context=t,v(n),null==n.state&&(n.state=F),null==n[s]&&(n[s]=n.state),r.getDerivedStateFromProps?n.state=z({},n.state,r.getDerivedStateFromProps(n.props,n.state)):o&&n.componentWillMount?(n.componentWillMount(),n.state=n[s]!==n.state?n[s]:n.state):!o&&n.componentWillUpdate&&n.componentWillUpdate(),$&&$(e),n.render(n.props,n.state,t)}function O(t,r,o,i,u,_,b){if(null==t||true===t||false===t||t===H)return H;var x=typeof t;if("object"!=x)return "function"==x?H:"string"==x?g(t):t+H;if(W(t)){var k,C=H;u[c]=t;for(var S=t.length,L=0;L<S;L++){var E=t[L];if(null!=E&&"boolean"!=typeof E){var j,T=O(E,r,o,i,u,_,b);"string"==typeof T?C+=T:(k||(k=new Array(S)),C&&k.push(C),C=H,W(T)?(j=k).push.apply(j,T):k.push(T));}}return k?(C&&k.push(C),k):C}if(void 0!==t.constructor)return H;t.__=u,D&&D(t);var Z=t.type,M=t.props;if("function"==typeof Z){var B,V,K,J=r;if(Z===k$1){if("tpl"in M){for(var Q=H,X=0;X<M.tpl.length;X++)if(Q+=M.tpl[X],M.exprs&&X<M.exprs.length){var Y=M.exprs[X];if(null==Y)continue;"object"!=typeof Y||void 0!==Y.constructor&&!W(Y)?Q+=Y:Q+=O(Y,r,o,i,t,_,b);}return Q}if("UNSTABLE_comment"in M)return "\x3c!--"+g(M.UNSTABLE_comment)+"--\x3e";V=M.children;}else {if(null!=(B=Z.contextType)){var ee=r[B.__c];J=ee?ee.props.value:B.__;}var te=Z.prototype&&"function"==typeof Z.prototype.render;if(te)V=/**#__NOINLINE__**/I(t,J),K=t[a];else {t[a]=K=/**#__NOINLINE__**/A(t,J);for(var ne=0;y(K)&&ne++<25;){m(K),$&&$(t);try{V=Z.call(K,M,J);}catch(e){throw e&&"function"==typeof e.then&&(t._suspended=true),e}}v(K);}if(null!=K.getChildContext&&(r=z({},r,K.getChildContext())),te&&l$1.errorBoundaries&&(Z.getDerivedStateFromError||K.componentDidCatch)){V=null!=V&&V.type===k$1&&null==V.key&&null==V.props.tpl?V.props.children:V;try{return O(V,r,o,i,t,_,!1)}catch(e){return Z.getDerivedStateFromError&&(K[s]=Z.getDerivedStateFromError(e)),K.componentDidCatch&&K.componentDidCatch(e,F),y(K)?(V=I(t,r),null!=(K=t[a]).getChildContext&&(r=z({},r,K.getChildContext())),O(V=null!=V&&V.type===k$1&&null==V.key&&null==V.props.tpl?V.props.children:V,r,o,i,t,_,b)):H}finally{P&&P(t),U&&U(t);}}}V=null!=V&&V.type===k$1&&null==V.key&&null==V.props.tpl?V.props.children:V;try{var re=O(V,r,o,i,t,_,b);return P&&P(t),l$1.unmount&&l$1.unmount(t),t._suspended?"string"==typeof re?N+re+q:W(re)?(re.unshift(N),re.push(q),re):re.then(function(e){return N+e+q}):re}catch(n){if(!n||"function"!=typeof n.then)throw n;return n.then(function e(){try{var n=O(V,r,o,i,t,_,b);return t._suspended?N+n+q:n}catch(t){if(!t||"function"!=typeof t.then)throw t;return t.then(e)}})}}var ae,ce="<"+Z,ue=H;for(var se in M){var le=M[se];if("function"!=typeof(le=G(le)?le.value:le)||"class"===se||"className"===se){switch(se){case "children":ae=le;continue;case "key":case "ref":case "__self":case "__source":continue;case "htmlFor":if("for"in M)continue;se="for";break;case "className":if("class"in M)continue;se="class";break;case "defaultChecked":se="checked";break;case "defaultSelected":se="selected";break;case "defaultValue":case "value":switch(se="value",Z){case "textarea":ae=le;continue;case "select":i=le;continue;case "option":i!=le||"selected"in M||(ce+=" selected");}break;case "dangerouslySetInnerHTML":ue=le&&le.__html;continue;case "style":"object"==typeof le&&(le=w(le));break;case "acceptCharset":se="accept-charset";break;case "httpEquiv":se="http-equiv";break;default:if(f.test(se))se=se.replace(f,"$1:$2").toLowerCase();else {if(l.test(se))continue;"-"!==se[4]&&!d.has(se)||null==le?o?h.test(se)&&(se="panose1"===se?"panose-1":se.replace(/([A-Z])/g,"-$1").toLowerCase()):p.test(se)&&(se=se.toLowerCase()):le+=H;}}null!=le&&false!==le&&(ce=true===le||le===H?ce+" "+se:ce+" "+se+'="'+("string"==typeof le?g(le):le+H)+'"');}}if(l.test(Z))throw new Error(Z+" is not a valid HTML tag name in "+ce+">");if(ue||("string"==typeof ae?ue=g(ae):null!=ae&&false!==ae&&true!==ae&&(ue=O(ae,r,"svg"===Z||"foreignObject"!==Z&&o,i,t,_,b))),P&&P(t),U&&U(t),!ue&&R.has(Z))return ce+"/>";var fe="</"+Z+">",pe=ce+">";return W(ue)?[pe].concat(ue,[fe]):"string"!=typeof ue?[pe,ue,fe]:pe+ue+fe}var R=new Set(["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"]);function G(e){return null!==e&&"object"==typeof e&&"function"==typeof e.peek&&"value"in e}

const contexts = /* @__PURE__ */ new WeakMap();
function getContext(result) {
  if (contexts.has(result)) {
    return contexts.get(result);
  }
  let ctx = {
    c: 0,
    get id() {
      return "p" + this.c.toString();
    },
    signals: /* @__PURE__ */ new Map(),
    propsToSignals: /* @__PURE__ */ new Map()
  };
  contexts.set(result, ctx);
  return ctx;
}
function incrementId(ctx) {
  let id = ctx.id;
  ctx.c++;
  return id;
}

function isSignal(x) {
  return x != null && typeof x === "object" && typeof x.peek === "function" && "value" in x;
}
function restoreSignalsOnProps(ctx, props) {
  let propMap;
  if (ctx.propsToSignals.has(props)) {
    propMap = ctx.propsToSignals.get(props);
  } else {
    propMap = /* @__PURE__ */ new Map();
    ctx.propsToSignals.set(props, propMap);
  }
  for (const [key, signal] of propMap) {
    props[key] = signal;
  }
  return propMap;
}
function serializeSignals(ctx, props, attrs, map) {
  const signals = {};
  for (const [key, value] of Object.entries(props)) {
    const isPropArray = Array.isArray(value);
    const isPropObject = !isSignal(value) && typeof props[key] === "object" && props[key] !== null && !isPropArray;
    if (isPropObject || isPropArray) {
      const values = isPropObject ? Object.keys(props[key]) : value;
      values.forEach((valueKey, valueIndex) => {
        const signal = isPropObject ? props[key][valueKey] : valueKey;
        if (isSignal(signal)) {
          const keyOrIndex = isPropObject ? valueKey.toString() : valueIndex;
          props[key] = isPropObject ? Object.assign({}, props[key], { [keyOrIndex]: signal.peek() }) : props[key].map(
            (v, i) => i === valueIndex ? [signal.peek(), i] : v
          );
          const currentMap = map.get(key) || [];
          map.set(key, [...currentMap, [signal, keyOrIndex]]);
          const currentSignals = signals[key] || [];
          signals[key] = [...currentSignals, [getSignalId(ctx, signal), keyOrIndex]];
        }
      });
    } else if (isSignal(value)) {
      props[key] = value.peek();
      map.set(key, value);
      signals[key] = getSignalId(ctx, value);
    }
  }
  if (Object.keys(signals).length) {
    attrs["data-preact-signals"] = JSON.stringify(signals);
  }
}
function getSignalId(ctx, item) {
  let id = ctx.signals.get(item);
  if (!id) {
    id = incrementId(ctx);
    ctx.signals.set(item, id);
  }
  return id;
}

const StaticHtml = ({ value, name, hydrate = true }) => {
  if (!value) return null;
  const tagName = hydrate ? "astro-slot" : "astro-static-slot";
  return _$1(tagName, { name, dangerouslySetInnerHTML: { __html: value } });
};
StaticHtml.shouldComponentUpdate = () => false;
var static_html_default = StaticHtml;

const slotName$1 = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
let originalConsoleError;
let consoleFilterRefs = 0;
async function check$1(Component, props, children) {
  if (typeof Component !== "function") return false;
  if (Component.name === "QwikComponent") return false;
  if (Component.prototype != null && typeof Component.prototype.render === "function") {
    return x$1.isPrototypeOf(Component);
  }
  useConsoleFilter();
  try {
    const { html } = await renderToStaticMarkup$1.call(this, Component, props, children, void 0);
    if (typeof html !== "string") {
      return false;
    }
    return html == "" ? false : !html.includes("<undefined>");
  } catch {
    return false;
  } finally {
    finishUsingConsoleFilter();
  }
}
function shouldHydrate(metadata) {
  return metadata?.astroStaticSlot ? !!metadata.hydrate : true;
}
async function renderToStaticMarkup$1(Component, props, { default: children, ...slotted }, metadata) {
  const ctx = getContext(this.result);
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName$1(key);
    slots[name] = _$1(static_html_default, {
      hydrate: shouldHydrate(metadata),
      value,
      name
    });
  }
  let propsMap = restoreSignalsOnProps(ctx, props);
  const newProps = { ...props, ...slots };
  const attrs = {};
  serializeSignals(ctx, props, attrs, propsMap);
  const vNode = _$1(
    Component,
    newProps,
    children != null ? _$1(static_html_default, {
      hydrate: shouldHydrate(metadata),
      value: children
    }) : children
  );
  const html = await Z(vNode);
  return { attrs, html };
}
function useConsoleFilter() {
  consoleFilterRefs++;
  if (!originalConsoleError) {
    originalConsoleError = console.error;
    try {
      console.error = filteredConsoleError;
    } catch {
    }
  }
}
function finishUsingConsoleFilter() {
  consoleFilterRefs--;
}
function filteredConsoleError(msg, ...rest) {
  if (consoleFilterRefs > 0 && typeof msg === "string") {
    const isKnownReactHookError = msg.includes("Warning: Invalid hook call.") && msg.includes("https://reactjs.org/link/invalid-hook-call");
    if (isKnownReactHookError) return;
  }
  originalConsoleError(msg, ...rest);
}
const renderer$1 = {
  name: "@astrojs/preact",
  check: check$1,
  renderToStaticMarkup: renderToStaticMarkup$1,
  supportsAstroStaticSlot: true
};
var server_default$1 = renderer$1;

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
async function check(Component, props, { default: children = null, ...slotted } = {}) {
  if (typeof Component !== "function") return false;
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  try {
    const result = await Component({ ...props, ...slots, children });
    return result[AstroJSX];
  } catch (e) {
    throwEnhancedErrorIfMdxComponent(e, Component);
  }
  return false;
}
async function renderToStaticMarkup(Component, props = {}, { default: children = null, ...slotted } = {}) {
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  const { result } = this;
  try {
    const html = await renderJSX(result, createVNode(Component, { ...props, ...slots, children }));
    return { html };
  } catch (e) {
    throwEnhancedErrorIfMdxComponent(e, Component);
    throw e;
  }
}
function throwEnhancedErrorIfMdxComponent(error, Component) {
  if (Component[Symbol.for("mdx-component")]) {
    if (AstroUserError.is(error)) return;
    error.title = error.name;
    error.hint = `This issue often occurs when your MDX component encounters runtime errors.`;
    throw error;
  }
}
const renderer = {
  name: "astro:jsx",
  check,
  renderToStaticMarkup
};
var server_default = renderer;

const renderers = [Object.assign({"name":"@astrojs/preact","clientEntrypoint":"@astrojs/preact/client.js","serverEntrypoint":"@astrojs/preact/server.js"}, { ssr: server_default$1 }),Object.assign({"name":"astro:jsx","serverEntrypoint":"file:///Users/toby/projects/blogupdate/node_modules/@astrojs/mdx/dist/server.js"}, { ssr: server_default }),];

export { l$1 as l, renderers as r };
