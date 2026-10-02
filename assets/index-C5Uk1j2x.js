(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();function Fo(e){const t=Object.create(null);for(const n of e.split(","))t[n]=1;return n=>n in t}const ae={},Mt=[],Qe=()=>{},hr=()=>!1,Fn=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),Ho=e=>e.startsWith("onUpdate:"),be=Object.assign,Vo=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},Yi=Object.prototype.hasOwnProperty,te=(e,t)=>Yi.call(e,t),j=Array.isArray,Rt=e=>bn(e)==="[object Map]",xr=e=>bn(e)==="[object Set]",ps=e=>bn(e)==="[object Date]",G=e=>typeof e=="function",pe=e=>typeof e=="string",Fe=e=>typeof e=="symbol",ne=e=>e!==null&&typeof e=="object",gr=e=>(ne(e)||G(e))&&G(e.then)&&G(e.catch),mr=Object.prototype.toString,bn=e=>mr.call(e),Qi=e=>bn(e).slice(8,-1),yr=e=>bn(e)==="[object Object]",Hn=e=>pe(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Yt=Fo(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Vn=e=>{const t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},Xi=/-\w/g,gt=Vn(e=>e.replace(Xi,t=>t.slice(1).toUpperCase())),Zi=/\B([A-Z])/g,Et=Vn(e=>e.replace(Zi,"-$1").toLowerCase()),vr=Vn(e=>e.charAt(0).toUpperCase()+e.slice(1)),so=Vn(e=>e?`on${vr(e)}`:""),bt=(e,t)=>!Object.is(e,t),ro=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},wr=(e,t,n,o=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:o,value:n})},ea=e=>{const t=parseFloat(e);return isNaN(t)?e:t},ta=e=>{const t=pe(e)?Number(e):NaN;return isNaN(t)?e:t};let bs;const zn=()=>bs||(bs=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Un(e){if(j(e)){const t={};for(let n=0;n<e.length;n++){const o=e[n],s=pe(o)?ra(o):Un(o);if(s)for(const r in s)t[r]=s[r]}return t}else if(pe(e)||ne(e))return e}const na=/;(?![^(]*\))/g,oa=/:([^]+)/,sa=/\/\*[^]*?\*\//g;function ra(e){const t={};return e.replace(sa,"").split(na).forEach(n=>{if(n){const o=n.split(oa);o.length>1&&(t[o[0].trim()]=o[1].trim())}}),t}function De(e){let t="";if(pe(e))t=e;else if(j(e))for(let n=0;n<e.length;n++){const o=De(e[n]);o&&(t+=o+" ")}else if(ne(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const ia="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",aa=Fo(ia);function Sr(e){return!!e||e===""}function la(e,t){if(e.length!==t.length)return!1;let n=!0;for(let o=0;n&&o<e.length;o++)n=zo(e[o],t[o]);return n}function zo(e,t){if(e===t)return!0;let n=ps(e),o=ps(t);if(n||o)return n&&o?e.getTime()===t.getTime():!1;if(n=Fe(e),o=Fe(t),n||o)return e===t;if(n=j(e),o=j(t),n||o)return n&&o?la(e,t):!1;if(n=ne(e),o=ne(t),n||o){if(!n||!o)return!1;const s=Object.keys(e).length,r=Object.keys(t).length;if(s!==r)return!1;for(const i in e){const a=e.hasOwnProperty(i),l=t.hasOwnProperty(i);if(a&&!l||!a&&l||!zo(e[i],t[i]))return!1}}return String(e)===String(t)}const _r=e=>!!(e&&e.__v_isRef===!0),le=e=>pe(e)?e:e==null?"":j(e)||ne(e)&&(e.toString===mr||!G(e.toString))?_r(e)?le(e.value):JSON.stringify(e,Cr,2):String(e),Cr=(e,t)=>_r(t)?Cr(e,t.value):Rt(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[o,s],r)=>(n[io(o,r)+" =>"]=s,n),{})}:xr(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>io(n))}:Fe(t)?io(t):ne(t)&&!j(t)&&!yr(t)?String(t):t,io=(e,t="")=>{var n;return Fe(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};let ge;class kr{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=ge,!t&&ge&&(this.index=(ge.scopes||(ge.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].pause();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].resume();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].resume()}}run(t){if(this._active){const n=ge;try{return ge=this,t()}finally{ge=n}}}on(){++this._on===1&&(this.prevScope=ge,ge=this)}off(){this._on>0&&--this._on===0&&(ge=this.prevScope,this.prevScope=void 0)}stop(t){if(this._active){this._active=!1;let n,o;for(n=0,o=this.effects.length;n<o;n++)this.effects[n].stop();for(this.effects.length=0,n=0,o=this.cleanups.length;n<o;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,o=this.scopes.length;n<o;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Tr(e){return new kr(e)}function Pr(){return ge}function ca(e,t=!1){ge&&ge.cleanups.push(e)}let ie;const ao=new WeakSet;class Ar{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,ge&&ge.active&&ge.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,ao.has(this)&&(ao.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Ir(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,hs(this),Or(this);const t=ie,n=Be;ie=this,Be=!0;try{return this.fn()}finally{Lr(this),ie=t,Be=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)qo(t);this.deps=this.depsTail=void 0,hs(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?ao.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){So(this)&&this.run()}get dirty(){return So(this)}}let Er=0,Qt,Xt;function Ir(e,t=!1){if(e.flags|=8,t){e.next=Xt,Xt=e;return}e.next=Qt,Qt=e}function Uo(){Er++}function Wo(){if(--Er>0)return;if(Xt){let t=Xt;for(Xt=void 0;t;){const n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;Qt;){let t=Qt;for(Qt=void 0;t;){const n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(o){e||(e=o)}t=n}}if(e)throw e}function Or(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Lr(e){let t,n=e.depsTail,o=n;for(;o;){const s=o.prevDep;o.version===-1?(o===n&&(n=s),qo(o),ua(o)):t=o,o.dep.activeLink=o.prevActiveLink,o.prevActiveLink=void 0,o=s}e.deps=t,e.depsTail=n}function So(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&($r(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function $r(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===sn)||(e.globalVersion=sn,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!So(e))))return;e.flags|=2;const t=e.dep,n=ie,o=Be;ie=e,Be=!0;try{Or(e);const s=e.fn(e._value);(t.version===0||bt(s,e._value))&&(e.flags|=128,e._value=s,t.version++)}catch(s){throw t.version++,s}finally{ie=n,Be=o,Lr(e),e.flags&=-3}}function qo(e,t=!1){const{dep:n,prevSub:o,nextSub:s}=e;if(o&&(o.nextSub=s,e.prevSub=void 0),s&&(s.prevSub=o,e.nextSub=void 0),n.subs===e&&(n.subs=o,!o&&n.computed)){n.computed.flags&=-5;for(let r=n.computed.deps;r;r=r.nextDep)qo(r,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function ua(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}let Be=!0;const Dr=[];function rt(){Dr.push(Be),Be=!1}function it(){const e=Dr.pop();Be=e===void 0?!0:e}function hs(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const n=ie;ie=void 0;try{t()}finally{ie=n}}}let sn=0;class fa{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Ko{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!ie||!Be||ie===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==ie)n=this.activeLink=new fa(ie,this),ie.deps?(n.prevDep=ie.depsTail,ie.depsTail.nextDep=n,ie.depsTail=n):ie.deps=ie.depsTail=n,Mr(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const o=n.nextDep;o.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=o),n.prevDep=ie.depsTail,n.nextDep=void 0,ie.depsTail.nextDep=n,ie.depsTail=n,ie.deps===n&&(ie.deps=o)}return n}trigger(t){this.version++,sn++,this.notify(t)}notify(t){Uo();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Wo()}}}function Mr(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let o=t.deps;o;o=o.nextDep)Mr(o)}const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}const In=new WeakMap,Pt=Symbol(""),_o=Symbol(""),rn=Symbol("");function ye(e,t,n){if(Be&&ie){let o=In.get(e);o||In.set(e,o=new Map);let s=o.get(n);s||(o.set(n,s=new Ko),s.map=o,s.key=n),s.track()}}function ot(e,t,n,o,s,r){const i=In.get(e);if(!i){sn++;return}const a=l=>{l&&l.trigger()};if(Uo(),t==="clear")i.forEach(a);else{const l=j(e),u=l&&Hn(n);if(l&&n==="length"){const c=Number(o);i.forEach((d,b)=>{(b==="length"||b===rn||!Fe(b)&&b>=c)&&a(d)})}else switch((n!==void 0||i.has(void 0))&&a(i.get(n)),u&&a(i.get(rn)),t){case"add":l?u&&a(i.get("length")):(a(i.get(Pt)),Rt(e)&&a(i.get(_o)));break;case"delete":l||(a(i.get(Pt)),Rt(e)&&a(i.get(_o)));break;case"set":Rt(e)&&a(i.get(Pt));break}}Wo()}function da(e,t){const n=In.get(e);return n&&n.get(t)}function It(e){const t=ee(e);return t===e?t:(ye(t,"iterate",rn),Re(e)?t:t.map(He))}function Wn(e){return ye(e=ee(e),"iterate",rn),e}function ft(e,t){return at(e)?Bt(st(e)?He(t):t):He(t)}const pa={__proto__:null,[Symbol.iterator](){return lo(this,Symbol.iterator,e=>ft(this,e))},concat(...e){return It(this).concat(...e.map(t=>j(t)?It(t):t))},entries(){return lo(this,"entries",e=>(e[1]=ft(this,e[1]),e))},every(e,t){return Ze(this,"every",e,t,void 0,arguments)},filter(e,t){return Ze(this,"filter",e,t,n=>n.map(o=>ft(this,o)),arguments)},find(e,t){return Ze(this,"find",e,t,n=>ft(this,n),arguments)},findIndex(e,t){return Ze(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return Ze(this,"findLast",e,t,n=>ft(this,n),arguments)},findLastIndex(e,t){return Ze(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return Ze(this,"forEach",e,t,void 0,arguments)},includes(...e){return co(this,"includes",e)},indexOf(...e){return co(this,"indexOf",e)},join(e){return It(this).join(e)},lastIndexOf(...e){return co(this,"lastIndexOf",e)},map(e,t){return Ze(this,"map",e,t,void 0,arguments)},pop(){return Ut(this,"pop")},push(...e){return Ut(this,"push",e)},reduce(e,...t){return xs(this,"reduce",e,t)},reduceRight(e,...t){return xs(this,"reduceRight",e,t)},shift(){return Ut(this,"shift")},some(e,t){return Ze(this,"some",e,t,void 0,arguments)},splice(...e){return Ut(this,"splice",e)},toReversed(){return It(this).toReversed()},toSorted(e){return It(this).toSorted(e)},toSpliced(...e){return It(this).toSpliced(...e)},unshift(...e){return Ut(this,"unshift",e)},values(){return lo(this,"values",e=>ft(this,e))}};function lo(e,t,n){const o=Wn(e),s=o[t]();return o!==e&&!Re(e)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.done||(r.value=n(r.value)),r}),s}const ba=Array.prototype;function Ze(e,t,n,o,s,r){const i=Wn(e),a=i!==e&&!Re(e),l=i[t];if(l!==ba[t]){const d=l.apply(e,r);return a?He(d):d}let u=n;i!==e&&(a?u=function(d,b){return n.call(this,ft(e,d),b,e)}:n.length>2&&(u=function(d,b){return n.call(this,d,b,e)}));const c=l.call(i,u,o);return a&&s?s(c):c}function xs(e,t,n,o){const s=Wn(e);let r=n;return s!==e&&(Re(e)?n.length>3&&(r=function(i,a,l){return n.call(this,i,a,l,e)}):r=function(i,a,l){return n.call(this,i,ft(e,a),l,e)}),s[t](r,...o)}function co(e,t,n){const o=ee(e);ye(o,"iterate",rn);const s=o[t](...n);return(s===-1||s===!1)&&Kn(n[0])?(n[0]=ee(n[0]),o[t](...n)):s}function Ut(e,t,n=[]){rt(),Uo();const o=ee(e)[t].apply(e,n);return Wo(),it(),o}const ha=Fo("__proto__,__v_isRef,__isVue"),Rr=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(Fe));function xa(e){Fe(e)||(e=String(e));const t=ee(this);return ye(t,"has",e),t.hasOwnProperty(e)}class Nr{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,o){if(n==="__v_skip")return t.__v_skip;const s=this._isReadonly,r=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return r;if(n==="__v_raw")return o===(s?r?Ta:Hr:r?Fr:Br).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(o)?t:void 0;const i=j(t);if(!s){let l;if(i&&(l=pa[n]))return l;if(n==="hasOwnProperty")return xa}const a=Reflect.get(t,n,fe(t)?t:o);if((Fe(n)?Rr.has(n):ha(n))||(s||ye(t,"get",n),r))return a;if(fe(a)){const l=i&&Hn(n)?a:a.value;return s&&ne(l)?ko(l):l}return ne(a)?s?ko(a):qn(a):a}}class jr extends Nr{constructor(t=!1){super(!1,t)}set(t,n,o,s){let r=t[n];const i=j(t)&&Hn(n);if(!this._isShallow){const u=at(r);if(!Re(o)&&!at(o)&&(r=ee(r),o=ee(o)),!i&&fe(r)&&!fe(o))return u||(r.value=o),!0}const a=i?Number(n)<t.length:te(t,n),l=Reflect.set(t,n,o,fe(t)?t:s);return t===ee(s)&&(a?bt(o,r)&&ot(t,"set",n,o):ot(t,"add",n,o)),l}deleteProperty(t,n){const o=te(t,n);t[n];const s=Reflect.deleteProperty(t,n);return s&&o&&ot(t,"delete",n,void 0),s}has(t,n){const o=Reflect.has(t,n);return(!Fe(n)||!Rr.has(n))&&ye(t,"has",n),o}ownKeys(t){return ye(t,"iterate",j(t)?"length":Pt),Reflect.ownKeys(t)}}class ga extends Nr{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const ma=new jr,ya=new ga,va=new jr(!0);const Co=e=>e,vn=e=>Reflect.getPrototypeOf(e);function wa(e,t,n){return function(...o){const s=this.__v_raw,r=ee(s),i=Rt(r),a=e==="entries"||e===Symbol.iterator&&i,l=e==="keys"&&i,u=s[e](...o),c=n?Co:t?Bt:He;return!t&&ye(r,"iterate",l?_o:Pt),be(Object.create(u),{next(){const{value:d,done:b}=u.next();return b?{value:d,done:b}:{value:a?[c(d[0]),c(d[1])]:c(d),done:b}}})}}function wn(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function Sa(e,t){const n={get(s){const r=this.__v_raw,i=ee(r),a=ee(s);e||(bt(s,a)&&ye(i,"get",s),ye(i,"get",a));const{has:l}=vn(i),u=t?Co:e?Bt:He;if(l.call(i,s))return u(r.get(s));if(l.call(i,a))return u(r.get(a));r!==i&&r.get(s)},get size(){const s=this.__v_raw;return!e&&ye(ee(s),"iterate",Pt),s.size},has(s){const r=this.__v_raw,i=ee(r),a=ee(s);return e||(bt(s,a)&&ye(i,"has",s),ye(i,"has",a)),s===a?r.has(s):r.has(s)||r.has(a)},forEach(s,r){const i=this,a=i.__v_raw,l=ee(a),u=t?Co:e?Bt:He;return!e&&ye(l,"iterate",Pt),a.forEach((c,d)=>s.call(r,u(c),u(d),i))}};return be(n,e?{add:wn("add"),set:wn("set"),delete:wn("delete"),clear:wn("clear")}:{add(s){!t&&!Re(s)&&!at(s)&&(s=ee(s));const r=ee(this);return vn(r).has.call(r,s)||(r.add(s),ot(r,"add",s,s)),this},set(s,r){!t&&!Re(r)&&!at(r)&&(r=ee(r));const i=ee(this),{has:a,get:l}=vn(i);let u=a.call(i,s);u||(s=ee(s),u=a.call(i,s));const c=l.call(i,s);return i.set(s,r),u?bt(r,c)&&ot(i,"set",s,r):ot(i,"add",s,r),this},delete(s){const r=ee(this),{has:i,get:a}=vn(r);let l=i.call(r,s);l||(s=ee(s),l=i.call(r,s)),a&&a.call(r,s);const u=r.delete(s);return l&&ot(r,"delete",s,void 0),u},clear(){const s=ee(this),r=s.size!==0,i=s.clear();return r&&ot(s,"clear",void 0,void 0),i}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=wa(s,e,t)}),n}function Go(e,t){const n=Sa(e,t);return(o,s,r)=>s==="__v_isReactive"?!e:s==="__v_isReadonly"?e:s==="__v_raw"?o:Reflect.get(te(n,s)&&s in o?n:o,s,r)}const _a={get:Go(!1,!1)},Ca={get:Go(!1,!0)},ka={get:Go(!0,!1)};const Br=new WeakMap,Fr=new WeakMap,Hr=new WeakMap,Ta=new WeakMap;function Pa(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Aa(e){return e.__v_skip||!Object.isExtensible(e)?0:Pa(Qi(e))}function qn(e){return at(e)?e:Jo(e,!1,ma,_a,Br)}function Ea(e){return Jo(e,!1,va,Ca,Fr)}function ko(e){return Jo(e,!0,ya,ka,Hr)}function Jo(e,t,n,o,s){if(!ne(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const r=Aa(e);if(r===0)return e;const i=s.get(e);if(i)return i;const a=new Proxy(e,r===2?o:n);return s.set(e,a),a}function st(e){return at(e)?st(e.__v_raw):!!(e&&e.__v_isReactive)}function at(e){return!!(e&&e.__v_isReadonly)}function Re(e){return!!(e&&e.__v_isShallow)}function Kn(e){return e?!!e.__v_raw:!1}function ee(e){const t=e&&e.__v_raw;return t?ee(t):e}function Yo(e){return!te(e,"__v_skip")&&Object.isExtensible(e)&&wr(e,"__v_skip",!0),e}const He=e=>ne(e)?qn(e):e,Bt=e=>ne(e)?ko(e):e;function fe(e){return e?e.__v_isRef===!0:!1}function Te(e){return Vr(e,!1)}function Ia(e){return Vr(e,!0)}function Vr(e,t){return fe(e)?e:new Oa(e,t)}class Oa{constructor(t,n){this.dep=new Ko,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:ee(t),this._value=n?t:He(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){const n=this._rawValue,o=this.__v_isShallow||Re(t)||at(t);t=o?t:ee(t),bt(t,n)&&(this._rawValue=t,this._value=o?t:He(t),this.dep.trigger())}}function M(e){return fe(e)?e.value:e}const La={get:(e,t,n)=>t==="__v_raw"?e:M(Reflect.get(e,t,n)),set:(e,t,n,o)=>{const s=e[t];return fe(s)&&!fe(n)?(s.value=n,!0):Reflect.set(e,t,n,o)}};function zr(e){return st(e)?e:new Proxy(e,La)}function $a(e){const t=j(e)?new Array(e.length):{};for(const n in e)t[n]=Ma(e,n);return t}class Da{constructor(t,n,o){this._object=t,this._key=n,this._defaultValue=o,this.__v_isRef=!0,this._value=void 0,this._raw=ee(t);let s=!0,r=t;if(!j(t)||!Hn(String(n)))do s=!Kn(r)||Re(r);while(s&&(r=r.__v_raw));this._shallow=s}get value(){let t=this._object[this._key];return this._shallow&&(t=M(t)),this._value=t===void 0?this._defaultValue:t}set value(t){if(this._shallow&&fe(this._raw[this._key])){const n=this._object[this._key];if(fe(n)){n.value=t;return}}this._object[this._key]=t}get dep(){return da(this._raw,this._key)}}function Ma(e,t,n){return new Da(e,t,n)}class Ra{constructor(t,n,o){this.fn=t,this.setter=n,this._value=void 0,this.dep=new Ko(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=sn-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=o}notify(){if(this.flags|=16,!(this.flags&8)&&ie!==this)return Ir(this,!0),!0}get value(){const t=this.dep.track();return $r(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function Na(e,t,n=!1){let o,s;return G(e)?o=e:(o=e.get,s=e.set),new Ra(o,s,n)}const Sn={},On=new WeakMap;let Ct;function ja(e,t=!1,n=Ct){if(n){let o=On.get(n);o||On.set(n,o=[]),o.push(e)}}function Ba(e,t,n=ae){const{immediate:o,deep:s,once:r,scheduler:i,augmentJob:a,call:l}=n,u=E=>s?E:Re(E)||s===!1||s===0?pt(E,1):pt(E);let c,d,b,g,O=!1,k=!1;if(fe(e)?(d=()=>e.value,O=Re(e)):st(e)?(d=()=>u(e),O=!0):j(e)?(k=!0,O=e.some(E=>st(E)||Re(E)),d=()=>e.map(E=>{if(fe(E))return E.value;if(st(E))return u(E);if(G(E))return l?l(E,2):E()})):G(e)?t?d=l?()=>l(e,2):e:d=()=>{if(b){rt();try{b()}finally{it()}}const E=Ct;Ct=c;try{return l?l(e,3,[g]):e(g)}finally{Ct=E}}:d=Qe,t&&s){const E=d,W=s===!0?1/0:s;d=()=>pt(E(),W)}const A=Pr(),K=()=>{c.stop(),A&&A.active&&Vo(A.effects,c)};if(r&&t){const E=t;t=(...W)=>{E(...W),K()}}let B=k?new Array(e.length).fill(Sn):Sn;const z=E=>{if(!(!(c.flags&1)||!c.dirty&&!E))if(t){const W=c.run();if(s||O||(k?W.some((F,X)=>bt(F,B[X])):bt(W,B))){b&&b();const F=Ct;Ct=c;try{const X=[W,B===Sn?void 0:k&&B[0]===Sn?[]:B,g];B=W,l?l(t,3,X):t(...X)}finally{Ct=F}}}else c.run()};return a&&a(z),c=new Ar(d),c.scheduler=i?()=>i(z,!1):z,g=E=>ja(E,!1,c),b=c.onStop=()=>{const E=On.get(c);if(E){if(l)l(E,4);else for(const W of E)W();On.delete(c)}},t?o?z(!0):B=c.run():i?i(z.bind(null,!0),!0):c.run(),K.pause=c.pause.bind(c),K.resume=c.resume.bind(c),K.stop=K,K}function pt(e,t=1/0,n){if(t<=0||!ne(e)||e.__v_skip||(n=n||new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,fe(e))pt(e.value,t,n);else if(j(e))for(let o=0;o<e.length;o++)pt(e[o],t,n);else if(xr(e)||Rt(e))e.forEach(o=>{pt(o,t,n)});else if(yr(e)){for(const o in e)pt(e[o],t,n);for(const o of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,o)&&pt(e[o],t,n)}return e}function hn(e,t,n,o){try{return o?e(...o):e()}catch(s){Gn(s,t,n)}}function Ve(e,t,n,o){if(G(e)){const s=hn(e,t,n,o);return s&&gr(s)&&s.catch(r=>{Gn(r,t,n)}),s}if(j(e)){const s=[];for(let r=0;r<e.length;r++)s.push(Ve(e[r],t,n,o));return s}}function Gn(e,t,n,o=!0){const s=t?t.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:i}=t&&t.appContext.config||ae;if(t){let a=t.parent;const l=t.proxy,u=`https://vuejs.org/error-reference/#runtime-${n}`;for(;a;){const c=a.ec;if(c){for(let d=0;d<c.length;d++)if(c[d](e,l,u)===!1)return}a=a.parent}if(r){rt(),hn(r,null,10,[e,l,u]),it();return}}Fa(e,n,s,o,i)}function Fa(e,t,n,o=!0,s=!1){if(s)throw e;console.error(e)}const Ce=[];let Ge=-1;const Nt=[];let dt=null,$t=0;const Ur=Promise.resolve();let Ln=null;function Qo(e){const t=Ln||Ur;return e?t.then(this?e.bind(this):e):t}function Ha(e){let t=Ge+1,n=Ce.length;for(;t<n;){const o=t+n>>>1,s=Ce[o],r=an(s);r<e||r===e&&s.flags&2?t=o+1:n=o}return t}function Xo(e){if(!(e.flags&1)){const t=an(e),n=Ce[Ce.length-1];!n||!(e.flags&2)&&t>=an(n)?Ce.push(e):Ce.splice(Ha(t),0,e),e.flags|=1,Wr()}}function Wr(){Ln||(Ln=Ur.then(Kr))}function Va(e){j(e)?Nt.push(...e):dt&&e.id===-1?dt.splice($t+1,0,e):e.flags&1||(Nt.push(e),e.flags|=1),Wr()}function gs(e,t,n=Ge+1){for(;n<Ce.length;n++){const o=Ce[n];if(o&&o.flags&2){if(e&&o.id!==e.uid)continue;Ce.splice(n,1),n--,o.flags&4&&(o.flags&=-2),o(),o.flags&4||(o.flags&=-2)}}}function qr(e){if(Nt.length){const t=[...new Set(Nt)].sort((n,o)=>an(n)-an(o));if(Nt.length=0,dt){dt.push(...t);return}for(dt=t,$t=0;$t<dt.length;$t++){const n=dt[$t];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}dt=null,$t=0}}const an=e=>e.id==null?e.flags&2?-1:1/0:e.id;function Kr(e){try{for(Ge=0;Ge<Ce.length;Ge++){const t=Ce[Ge];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),hn(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;Ge<Ce.length;Ge++){const t=Ce[Ge];t&&(t.flags&=-2)}Ge=-1,Ce.length=0,qr(),Ln=null,(Ce.length||Nt.length)&&Kr()}}let Oe=null,Gr=null;function $n(e){const t=Oe;return Oe=e,Gr=e&&e.type.__scopeId||null,t}function Tt(e,t=Oe,n){if(!t||e._n)return e;const o=(...s)=>{o._d&&Rn(-1);const r=$n(t);let i;try{i=e(...s)}finally{$n(r),o._d&&Rn(1)}return i};return o._n=!0,o._c=!0,o._d=!0,o}function vt(e,t,n,o){const s=e.dirs,r=t&&t.dirs;for(let i=0;i<s.length;i++){const a=s[i];r&&(a.oldValue=r[i].value);let l=a.dir[o];l&&(rt(),Ve(l,n,8,[e.el,a,e,t]),it())}}function za(e,t){if(ke){let n=ke.provides;const o=ke.parent&&ke.parent.provides;o===n&&(n=ke.provides=Object.create(o)),n[e]=t}}function Zt(e,t,n=!1){const o=os();if(o||At){let s=At?At._context.provides:o?o.parent==null||o.ce?o.vnode.appContext&&o.vnode.appContext.provides:o.parent.provides:void 0;if(s&&e in s)return s[e];if(arguments.length>1)return n&&G(t)?t.call(o&&o.proxy):t}}function Ua(){return!!(os()||At)}const Wa=Symbol.for("v-scx"),qa=()=>Zt(Wa);function ht(e,t,n){return Jr(e,t,n)}function Jr(e,t,n=ae){const{immediate:o,deep:s,flush:r,once:i}=n,a=be({},n),l=t&&o||!t&&r!=="post";let u;if(fn){if(r==="sync"){const g=qa();u=g.__watcherHandles||(g.__watcherHandles=[])}else if(!l){const g=()=>{};return g.stop=Qe,g.resume=Qe,g.pause=Qe,g}}const c=ke;a.call=(g,O,k)=>Ve(g,c,O,k);let d=!1;r==="post"?a.scheduler=g=>{Ee(g,c&&c.suspense)}:r!=="sync"&&(d=!0,a.scheduler=(g,O)=>{O?g():Xo(g)}),a.augmentJob=g=>{t&&(g.flags|=4),d&&(g.flags|=2,c&&(g.id=c.uid,g.i=c))};const b=Ba(e,t,a);return fn&&(u?u.push(b):l&&b()),b}function Ka(e,t,n){const o=this.proxy,s=pe(e)?e.includes(".")?Yr(o,e):()=>o[e]:e.bind(o,o);let r;G(t)?r=t:(r=t.handler,n=t);const i=xn(this),a=Jr(s,r.bind(o),n);return i(),a}function Yr(e,t){const n=t.split(".");return()=>{let o=e;for(let s=0;s<n.length&&o;s++)o=o[n[s]];return o}}const Ga=Symbol("_vte"),Qr=e=>e.__isTeleport,Je=Symbol("_leaveCb"),Wt=Symbol("_enterCb");function Ja(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Qn(()=>{e.isMounted=!0}),ri(()=>{e.isUnmounting=!0}),e}const Ne=[Function,Array],Xr={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Ne,onEnter:Ne,onAfterEnter:Ne,onEnterCancelled:Ne,onBeforeLeave:Ne,onLeave:Ne,onAfterLeave:Ne,onLeaveCancelled:Ne,onBeforeAppear:Ne,onAppear:Ne,onAfterAppear:Ne,onAppearCancelled:Ne},Zr=e=>{const t=e.subTree;return t.component?Zr(t.component):t},Ya={name:"BaseTransition",props:Xr,setup(e,{slots:t}){const n=os(),o=Ja();return()=>{const s=t.default&&ni(t.default(),!0);if(!s||!s.length)return;const r=ei(s),i=ee(e),{mode:a}=i;if(o.isLeaving)return uo(r);const l=ms(r);if(!l)return uo(r);let u=To(l,i,o,n,d=>u=d);l.type!==ve&&ln(l,u);let c=n.subTree&&ms(n.subTree);if(c&&c.type!==ve&&!kt(c,l)&&Zr(n).type!==ve){let d=To(c,i,o,n);if(ln(c,d),a==="out-in"&&l.type!==ve)return o.isLeaving=!0,d.afterLeave=()=>{o.isLeaving=!1,n.job.flags&8||n.update(),delete d.afterLeave,c=void 0},uo(r);a==="in-out"&&l.type!==ve?d.delayLeave=(b,g,O)=>{const k=ti(o,c);k[String(c.key)]=c,b[Je]=()=>{g(),b[Je]=void 0,delete u.delayedLeave,c=void 0},u.delayedLeave=()=>{O(),delete u.delayedLeave,c=void 0}}:c=void 0}else c&&(c=void 0);return r}}};function ei(e){let t=e[0];if(e.length>1){for(const n of e)if(n.type!==ve){t=n;break}}return t}const Qa=Ya;function ti(e,t){const{leavingVNodes:n}=e;let o=n.get(t.type);return o||(o=Object.create(null),n.set(t.type,o)),o}function To(e,t,n,o,s){const{appear:r,mode:i,persisted:a=!1,onBeforeEnter:l,onEnter:u,onAfterEnter:c,onEnterCancelled:d,onBeforeLeave:b,onLeave:g,onAfterLeave:O,onLeaveCancelled:k,onBeforeAppear:A,onAppear:K,onAfterAppear:B,onAppearCancelled:z}=t,E=String(e.key),W=ti(n,e),F=(T,x)=>{T&&Ve(T,o,9,x)},X=(T,x)=>{const D=x[1];F(T,x),j(T)?T.every(S=>S.length<=1)&&D():T.length<=1&&D()},H={mode:i,persisted:a,beforeEnter(T){let x=l;if(!n.isMounted)if(r)x=A||l;else return;T[Je]&&T[Je](!0);const D=W[E];D&&kt(e,D)&&D.el[Je]&&D.el[Je](),F(x,[T])},enter(T){if(W[E]===e)return;let x=u,D=c,S=d;if(!n.isMounted)if(r)x=K||u,D=B||c,S=z||d;else return;let J=!1;T[Wt]=xe=>{J||(J=!0,xe?F(S,[T]):F(D,[T]),H.delayedLeave&&H.delayedLeave(),T[Wt]=void 0)};const ce=T[Wt].bind(null,!1);x?X(x,[T,ce]):ce()},leave(T,x){const D=String(e.key);if(T[Wt]&&T[Wt](!0),n.isUnmounting)return x();F(b,[T]);let S=!1;T[Je]=ce=>{S||(S=!0,x(),ce?F(k,[T]):F(O,[T]),T[Je]=void 0,W[D]===e&&delete W[D])};const J=T[Je].bind(null,!1);W[D]=e,g?X(g,[T,J]):J()},clone(T){const x=To(T,t,n,o,s);return s&&s(x),x}};return H}function uo(e){if(Jn(e))return e=mt(e),e.children=null,e}function ms(e){if(!Jn(e))return Qr(e.type)&&e.children?ei(e.children):e;if(e.component)return e.component.subTree;const{shapeFlag:t,children:n}=e;if(n){if(t&16)return n[0];if(t&32&&G(n.default))return n.default()}}function ln(e,t){e.shapeFlag&6&&e.component?(e.transition=t,ln(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function ni(e,t=!1,n){let o=[],s=0;for(let r=0;r<e.length;r++){let i=e[r];const a=n==null?i.key:String(n)+String(i.key!=null?i.key:r);i.type===de?(i.patchFlag&128&&s++,o=o.concat(ni(i.children,t,a))):(t||i.type!==ve)&&o.push(a!=null?mt(i,{key:a}):i)}if(s>1)for(let r=0;r<o.length;r++)o[r].patchFlag=-2;return o}function Le(e,t){return G(e)?be({name:e.name},t,{setup:e}):e}function oi(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function ys(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}const Dn=new WeakMap;function en(e,t,n,o,s=!1){if(j(e)){e.forEach((k,A)=>en(k,t&&(j(t)?t[A]:t),n,o,s));return}if(jt(o)&&!s){o.shapeFlag&512&&o.type.__asyncResolved&&o.component.subTree.component&&en(e,t,n,o.component.subTree);return}const r=o.shapeFlag&4?ss(o.component):o.el,i=s?null:r,{i:a,r:l}=e,u=t&&t.r,c=a.refs===ae?a.refs={}:a.refs,d=a.setupState,b=ee(d),g=d===ae?hr:k=>ys(c,k)?!1:te(b,k),O=(k,A)=>!(A&&ys(c,A));if(u!=null&&u!==l){if(vs(t),pe(u))c[u]=null,g(u)&&(d[u]=null);else if(fe(u)){const k=t;O(u,k.k)&&(u.value=null),k.k&&(c[k.k]=null)}}if(G(l))hn(l,a,12,[i,c]);else{const k=pe(l),A=fe(l);if(k||A){const K=()=>{if(e.f){const B=k?g(l)?d[l]:c[l]:O()||!e.k?l.value:c[e.k];if(s)j(B)&&Vo(B,r);else if(j(B))B.includes(r)||B.push(r);else if(k)c[l]=[r],g(l)&&(d[l]=c[l]);else{const z=[r];O(l,e.k)&&(l.value=z),e.k&&(c[e.k]=z)}}else k?(c[l]=i,g(l)&&(d[l]=i)):A&&(O(l,e.k)&&(l.value=i),e.k&&(c[e.k]=i))};if(i){const B=()=>{K(),Dn.delete(e)};B.id=-1,Dn.set(e,B),Ee(B,n)}else vs(e),K()}}}function vs(e){const t=Dn.get(e);t&&(t.flags|=8,Dn.delete(e))}zn().requestIdleCallback;zn().cancelIdleCallback;const jt=e=>!!e.type.__asyncLoader,Jn=e=>e.type.__isKeepAlive;function Xa(e,t){si(e,"a",t)}function Za(e,t){si(e,"da",t)}function si(e,t,n=ke){const o=e.__wdc||(e.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return e()});if(Yn(t,o,n),n){let s=n.parent;for(;s&&s.parent;)Jn(s.parent.vnode)&&el(o,t,n,s),s=s.parent}}function el(e,t,n,o){const s=Yn(t,e,o,!0);Zo(()=>{Vo(o[t],s)},n)}function Yn(e,t,n=ke,o=!1){if(n){const s=n[e]||(n[e]=[]),r=t.__weh||(t.__weh=(...i)=>{rt();const a=xn(n),l=Ve(t,n,e,i);return a(),it(),l});return o?s.unshift(r):s.push(r),r}}const lt=e=>(t,n=ke)=>{(!fn||e==="sp")&&Yn(e,(...o)=>t(...o),n)},tl=lt("bm"),Qn=lt("m"),nl=lt("bu"),ol=lt("u"),ri=lt("bum"),Zo=lt("um"),sl=lt("sp"),rl=lt("rtg"),il=lt("rtc");function al(e,t=ke){Yn("ec",e,t)}const ll=Symbol.for("v-ndc");function xt(e,t,n,o){let s;const r=n,i=j(e);if(i||pe(e)){const a=i&&st(e);let l=!1,u=!1;a&&(l=!Re(e),u=at(e),e=Wn(e)),s=new Array(e.length);for(let c=0,d=e.length;c<d;c++)s[c]=t(l?u?Bt(He(e[c])):He(e[c]):e[c],c,void 0,r)}else if(typeof e=="number"){s=new Array(e);for(let a=0;a<e;a++)s[a]=t(a+1,a,void 0,r)}else if(ne(e))if(e[Symbol.iterator])s=Array.from(e,(a,l)=>t(a,l,void 0,r));else{const a=Object.keys(e);s=new Array(a.length);for(let l=0,u=a.length;l<u;l++){const c=a[l];s[l]=t(e[c],c,l,r)}}else s=[];return s}function ws(e,t,n={},o,s){if(Oe.ce||Oe.parent&&jt(Oe.parent)&&Oe.parent.ce){const u=Object.keys(n).length>0;return t!=="default"&&(n.name=t),L(),we(de,null,[Y("slot",n,o&&o())],u?-2:64)}let r=e[t];r&&r._c&&(r._d=!1),L();const i=r&&ii(r(n)),a=n.key||i&&i.key,l=we(de,{key:(a&&!Fe(a)?a:`_${t}`)+(!i&&o?"_fb":"")},i||(o?o():[]),i&&e._===1?64:-2);return l.scopeId&&(l.slotScopeIds=[l.scopeId+"-s"]),r&&r._c&&(r._d=!0),l}function ii(e){return e.some(t=>un(t)?!(t.type===ve||t.type===de&&!ii(t.children)):!0)?e:null}const Po=e=>e?Ti(e)?ss(e):Po(e.parent):null,tn=be(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Po(e.parent),$root:e=>Po(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>li(e),$forceUpdate:e=>e.f||(e.f=()=>{Xo(e.update)}),$nextTick:e=>e.n||(e.n=Qo.bind(e.proxy)),$watch:e=>Ka.bind(e)}),fo=(e,t)=>e!==ae&&!e.__isScriptSetup&&te(e,t),cl={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:n,setupState:o,data:s,props:r,accessCache:i,type:a,appContext:l}=e;if(t[0]!=="$"){const b=i[t];if(b!==void 0)switch(b){case 1:return o[t];case 2:return s[t];case 4:return n[t];case 3:return r[t]}else{if(fo(o,t))return i[t]=1,o[t];if(s!==ae&&te(s,t))return i[t]=2,s[t];if(te(r,t))return i[t]=3,r[t];if(n!==ae&&te(n,t))return i[t]=4,n[t];Ao&&(i[t]=0)}}const u=tn[t];let c,d;if(u)return t==="$attrs"&&ye(e.attrs,"get",""),u(e);if((c=a.__cssModules)&&(c=c[t]))return c;if(n!==ae&&te(n,t))return i[t]=4,n[t];if(d=l.config.globalProperties,te(d,t))return d[t]},set({_:e},t,n){const{data:o,setupState:s,ctx:r}=e;return fo(s,t)?(s[t]=n,!0):o!==ae&&te(o,t)?(o[t]=n,!0):te(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(r[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:o,appContext:s,props:r,type:i}},a){let l;return!!(n[a]||e!==ae&&a[0]!=="$"&&te(e,a)||fo(t,a)||te(r,a)||te(o,a)||te(tn,a)||te(s.config.globalProperties,a)||(l=i.__cssModules)&&l[a])},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:te(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function Ss(e){return j(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let Ao=!0;function ul(e){const t=li(e),n=e.proxy,o=e.ctx;Ao=!1,t.beforeCreate&&_s(t.beforeCreate,e,"bc");const{data:s,computed:r,methods:i,watch:a,provide:l,inject:u,created:c,beforeMount:d,mounted:b,beforeUpdate:g,updated:O,activated:k,deactivated:A,beforeDestroy:K,beforeUnmount:B,destroyed:z,unmounted:E,render:W,renderTracked:F,renderTriggered:X,errorCaptured:H,serverPrefetch:T,expose:x,inheritAttrs:D,components:S,directives:J,filters:ce}=t;if(u&&fl(u,o,null),i)for(const q in i){const se=i[q];G(se)&&(o[q]=se.bind(n))}if(s){const q=s.call(n,n);ne(q)&&(e.data=qn(q))}if(Ao=!0,r)for(const q in r){const se=r[q],Xe=G(se)?se.bind(n,n):G(se.get)?se.get.bind(n,n):Qe,mn=!G(se)&&G(se.set)?se.set.bind(n):Qe,yt=he({get:Xe,set:mn});Object.defineProperty(o,q,{enumerable:!0,configurable:!0,get:()=>yt.value,set:ze=>yt.value=ze})}if(a)for(const q in a)ai(a[q],o,n,q);if(l){const q=G(l)?l.call(n):l;Reflect.ownKeys(q).forEach(se=>{za(se,q[se])})}c&&_s(c,e,"c");function Q(q,se){j(se)?se.forEach(Xe=>q(Xe.bind(n))):se&&q(se.bind(n))}if(Q(tl,d),Q(Qn,b),Q(nl,g),Q(ol,O),Q(Xa,k),Q(Za,A),Q(al,H),Q(il,F),Q(rl,X),Q(ri,B),Q(Zo,E),Q(sl,T),j(x))if(x.length){const q=e.exposed||(e.exposed={});x.forEach(se=>{Object.defineProperty(q,se,{get:()=>n[se],set:Xe=>n[se]=Xe,enumerable:!0})})}else e.exposed||(e.exposed={});W&&e.render===Qe&&(e.render=W),D!=null&&(e.inheritAttrs=D),S&&(e.components=S),J&&(e.directives=J),T&&oi(e)}function fl(e,t,n=Qe){j(e)&&(e=Eo(e));for(const o in e){const s=e[o];let r;ne(s)?"default"in s?r=Zt(s.from||o,s.default,!0):r=Zt(s.from||o):r=Zt(s),fe(r)?Object.defineProperty(t,o,{enumerable:!0,configurable:!0,get:()=>r.value,set:i=>r.value=i}):t[o]=r}}function _s(e,t,n){Ve(j(e)?e.map(o=>o.bind(t.proxy)):e.bind(t.proxy),t,n)}function ai(e,t,n,o){let s=o.includes(".")?Yr(n,o):()=>n[o];if(pe(e)){const r=t[e];G(r)&&ht(s,r)}else if(G(e))ht(s,e.bind(n));else if(ne(e))if(j(e))e.forEach(r=>ai(r,t,n,o));else{const r=G(e.handler)?e.handler.bind(n):t[e.handler];G(r)&&ht(s,r,e)}}function li(e){const t=e.type,{mixins:n,extends:o}=t,{mixins:s,optionsCache:r,config:{optionMergeStrategies:i}}=e.appContext,a=r.get(t);let l;return a?l=a:!s.length&&!n&&!o?l=t:(l={},s.length&&s.forEach(u=>Mn(l,u,i,!0)),Mn(l,t,i)),ne(t)&&r.set(t,l),l}function Mn(e,t,n,o=!1){const{mixins:s,extends:r}=t;r&&Mn(e,r,n,!0),s&&s.forEach(i=>Mn(e,i,n,!0));for(const i in t)if(!(o&&i==="expose")){const a=dl[i]||n&&n[i];e[i]=a?a(e[i],t[i]):t[i]}return e}const dl={data:Cs,props:ks,emits:ks,methods:Jt,computed:Jt,beforeCreate:_e,created:_e,beforeMount:_e,mounted:_e,beforeUpdate:_e,updated:_e,beforeDestroy:_e,beforeUnmount:_e,destroyed:_e,unmounted:_e,activated:_e,deactivated:_e,errorCaptured:_e,serverPrefetch:_e,components:Jt,directives:Jt,watch:bl,provide:Cs,inject:pl};function Cs(e,t){return t?e?function(){return be(G(e)?e.call(this,this):e,G(t)?t.call(this,this):t)}:t:e}function pl(e,t){return Jt(Eo(e),Eo(t))}function Eo(e){if(j(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function _e(e,t){return e?[...new Set([].concat(e,t))]:t}function Jt(e,t){return e?be(Object.create(null),e,t):t}function ks(e,t){return e?j(e)&&j(t)?[...new Set([...e,...t])]:be(Object.create(null),Ss(e),Ss(t??{})):t}function bl(e,t){if(!e)return t;if(!t)return e;const n=be(Object.create(null),e);for(const o in t)n[o]=_e(e[o],t[o]);return n}function ci(){return{app:null,config:{isNativeTag:hr,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let hl=0;function xl(e,t){return function(o,s=null){G(o)||(o=be({},o)),s!=null&&!ne(s)&&(s=null);const r=ci(),i=new WeakSet,a=[];let l=!1;const u=r.app={_uid:hl++,_component:o,_props:s,_container:null,_context:r,_instance:null,version:Kl,get config(){return r.config},set config(c){},use(c,...d){return i.has(c)||(c&&G(c.install)?(i.add(c),c.install(u,...d)):G(c)&&(i.add(c),c(u,...d))),u},mixin(c){return r.mixins.includes(c)||r.mixins.push(c),u},component(c,d){return d?(r.components[c]=d,u):r.components[c]},directive(c,d){return d?(r.directives[c]=d,u):r.directives[c]},mount(c,d,b){if(!l){const g=u._ceVNode||Y(o,s);return g.appContext=r,b===!0?b="svg":b===!1&&(b=void 0),e(g,c,b),l=!0,u._container=c,c.__vue_app__=u,ss(g.component)}},onUnmount(c){a.push(c)},unmount(){l&&(Ve(a,u._instance,16),e(null,u._container),delete u._container.__vue_app__)},provide(c,d){return r.provides[c]=d,u},runWithContext(c){const d=At;At=u;try{return c()}finally{At=d}}};return u}}let At=null;const gl=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${gt(t)}Modifiers`]||e[`${Et(t)}Modifiers`];function ml(e,t,...n){if(e.isUnmounted)return;const o=e.vnode.props||ae;let s=n;const r=t.startsWith("update:"),i=r&&gl(o,t.slice(7));i&&(i.trim&&(s=n.map(c=>pe(c)?c.trim():c)),i.number&&(s=n.map(ea)));let a,l=o[a=so(t)]||o[a=so(gt(t))];!l&&r&&(l=o[a=so(Et(t))]),l&&Ve(l,e,6,s);const u=o[a+"Once"];if(u){if(!e.emitted)e.emitted={};else if(e.emitted[a])return;e.emitted[a]=!0,Ve(u,e,6,s)}}const yl=new WeakMap;function ui(e,t,n=!1){const o=n?yl:t.emitsCache,s=o.get(e);if(s!==void 0)return s;const r=e.emits;let i={},a=!1;if(!G(e)){const l=u=>{const c=ui(u,t,!0);c&&(a=!0,be(i,c))};!n&&t.mixins.length&&t.mixins.forEach(l),e.extends&&l(e.extends),e.mixins&&e.mixins.forEach(l)}return!r&&!a?(ne(e)&&o.set(e,null),null):(j(r)?r.forEach(l=>i[l]=null):be(i,r),ne(e)&&o.set(e,i),i)}function Xn(e,t){return!e||!Fn(t)?!1:(t=t.slice(2).replace(/Once$/,""),te(e,t[0].toLowerCase()+t.slice(1))||te(e,Et(t))||te(e,t))}function Ts(e){const{type:t,vnode:n,proxy:o,withProxy:s,propsOptions:[r],slots:i,attrs:a,emit:l,render:u,renderCache:c,props:d,data:b,setupState:g,ctx:O,inheritAttrs:k}=e,A=$n(e);let K,B;try{if(n.shapeFlag&4){const E=s||o,W=E;K=Ye(u.call(W,E,c,d,g,b,O)),B=a}else{const E=t;K=Ye(E.length>1?E(d,{attrs:a,slots:i,emit:l}):E(d,null)),B=t.props?a:vl(a)}}catch(E){nn.length=0,Gn(E,e,1),K=Y(ve)}let z=K;if(B&&k!==!1){const E=Object.keys(B),{shapeFlag:W}=z;E.length&&W&7&&(r&&E.some(Ho)&&(B=wl(B,r)),z=mt(z,B,!1,!0))}return n.dirs&&(z=mt(z,null,!1,!0),z.dirs=z.dirs?z.dirs.concat(n.dirs):n.dirs),n.transition&&ln(z,n.transition),K=z,$n(A),K}const vl=e=>{let t;for(const n in e)(n==="class"||n==="style"||Fn(n))&&((t||(t={}))[n]=e[n]);return t},wl=(e,t)=>{const n={};for(const o in e)(!Ho(o)||!(o.slice(9)in t))&&(n[o]=e[o]);return n};function Sl(e,t,n){const{props:o,children:s,component:r}=e,{props:i,children:a,patchFlag:l}=t,u=r.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return o?Ps(o,i,u):!!i;if(l&8){const c=t.dynamicProps;for(let d=0;d<c.length;d++){const b=c[d];if(fi(i,o,b)&&!Xn(u,b))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:o===i?!1:o?i?Ps(o,i,u):!0:!!i;return!1}function Ps(e,t,n){const o=Object.keys(t);if(o.length!==Object.keys(e).length)return!0;for(let s=0;s<o.length;s++){const r=o[s];if(fi(t,e,r)&&!Xn(n,r))return!0}return!1}function fi(e,t,n){const o=e[n],s=t[n];return n==="style"&&ne(o)&&ne(s)?!zo(o,s):o!==s}function _l({vnode:e,parent:t},n){for(;t;){const o=t.subTree;if(o.suspense&&o.suspense.activeBranch===e&&(o.el=e.el),o===e)(e=t.vnode).el=n,t=t.parent;else break}}const di={},pi=()=>Object.create(di),bi=e=>Object.getPrototypeOf(e)===di;function Cl(e,t,n,o=!1){const s={},r=pi();e.propsDefaults=Object.create(null),hi(e,t,s,r);for(const i in e.propsOptions[0])i in s||(s[i]=void 0);n?e.props=o?s:Ea(s):e.type.props?e.props=s:e.props=r,e.attrs=r}function kl(e,t,n,o){const{props:s,attrs:r,vnode:{patchFlag:i}}=e,a=ee(s),[l]=e.propsOptions;let u=!1;if((o||i>0)&&!(i&16)){if(i&8){const c=e.vnode.dynamicProps;for(let d=0;d<c.length;d++){let b=c[d];if(Xn(e.emitsOptions,b))continue;const g=t[b];if(l)if(te(r,b))g!==r[b]&&(r[b]=g,u=!0);else{const O=gt(b);s[O]=Io(l,a,O,g,e,!1)}else g!==r[b]&&(r[b]=g,u=!0)}}}else{hi(e,t,s,r)&&(u=!0);let c;for(const d in a)(!t||!te(t,d)&&((c=Et(d))===d||!te(t,c)))&&(l?n&&(n[d]!==void 0||n[c]!==void 0)&&(s[d]=Io(l,a,d,void 0,e,!0)):delete s[d]);if(r!==a)for(const d in r)(!t||!te(t,d))&&(delete r[d],u=!0)}u&&ot(e.attrs,"set","")}function hi(e,t,n,o){const[s,r]=e.propsOptions;let i=!1,a;if(t)for(let l in t){if(Yt(l))continue;const u=t[l];let c;s&&te(s,c=gt(l))?!r||!r.includes(c)?n[c]=u:(a||(a={}))[c]=u:Xn(e.emitsOptions,l)||(!(l in o)||u!==o[l])&&(o[l]=u,i=!0)}if(r){const l=ee(n),u=a||ae;for(let c=0;c<r.length;c++){const d=r[c];n[d]=Io(s,l,d,u[d],e,!te(u,d))}}return i}function Io(e,t,n,o,s,r){const i=e[n];if(i!=null){const a=te(i,"default");if(a&&o===void 0){const l=i.default;if(i.type!==Function&&!i.skipFactory&&G(l)){const{propsDefaults:u}=s;if(n in u)o=u[n];else{const c=xn(s);o=u[n]=l.call(null,t),c()}}else o=l;s.ce&&s.ce._setProp(n,o)}i[0]&&(r&&!a?o=!1:i[1]&&(o===""||o===Et(n))&&(o=!0))}return o}const Tl=new WeakMap;function xi(e,t,n=!1){const o=n?Tl:t.propsCache,s=o.get(e);if(s)return s;const r=e.props,i={},a=[];let l=!1;if(!G(e)){const c=d=>{l=!0;const[b,g]=xi(d,t,!0);be(i,b),g&&a.push(...g)};!n&&t.mixins.length&&t.mixins.forEach(c),e.extends&&c(e.extends),e.mixins&&e.mixins.forEach(c)}if(!r&&!l)return ne(e)&&o.set(e,Mt),Mt;if(j(r))for(let c=0;c<r.length;c++){const d=gt(r[c]);As(d)&&(i[d]=ae)}else if(r)for(const c in r){const d=gt(c);if(As(d)){const b=r[c],g=i[d]=j(b)||G(b)?{type:b}:be({},b),O=g.type;let k=!1,A=!0;if(j(O))for(let K=0;K<O.length;++K){const B=O[K],z=G(B)&&B.name;if(z==="Boolean"){k=!0;break}else z==="String"&&(A=!1)}else k=G(O)&&O.name==="Boolean";g[0]=k,g[1]=A,(k||te(g,"default"))&&a.push(d)}}const u=[i,a];return ne(e)&&o.set(e,u),u}function As(e){return e[0]!=="$"&&!Yt(e)}const es=e=>e==="_"||e==="_ctx"||e==="$stable",ts=e=>j(e)?e.map(Ye):[Ye(e)],Pl=(e,t,n)=>{if(t._n)return t;const o=Tt((...s)=>ts(t(...s)),n);return o._c=!1,o},gi=(e,t,n)=>{const o=e._ctx;for(const s in e){if(es(s))continue;const r=e[s];if(G(r))t[s]=Pl(s,r,o);else if(r!=null){const i=ts(r);t[s]=()=>i}}},mi=(e,t)=>{const n=ts(t);e.slots.default=()=>n},yi=(e,t,n)=>{for(const o in t)(n||!es(o))&&(e[o]=t[o])},Al=(e,t,n)=>{const o=e.slots=pi();if(e.vnode.shapeFlag&32){const s=t._;s?(yi(o,t,n),n&&wr(o,"_",s,!0)):gi(t,o)}else t&&mi(e,t)},El=(e,t,n)=>{const{vnode:o,slots:s}=e;let r=!0,i=ae;if(o.shapeFlag&32){const a=t._;a?n&&a===1?r=!1:yi(s,t,n):(r=!t.$stable,gi(t,s)),i=t}else t&&(mi(e,t),i={default:1});if(r)for(const a in s)!es(a)&&i[a]==null&&delete s[a]},Ee=Dl;function Il(e){return Ol(e)}function Ol(e,t){const n=zn();n.__VUE__=!0;const{insert:o,remove:s,patchProp:r,createElement:i,createText:a,createComment:l,setText:u,setElementText:c,parentNode:d,nextSibling:b,setScopeId:g=Qe,insertStaticContent:O}=e,k=(f,p,h,w=null,m=null,y=null,P=void 0,C=null,_=!!p.dynamicChildren)=>{if(f===p)return;f&&!kt(f,p)&&(w=yn(f),ze(f,m,y,!0),f=null),p.patchFlag===-2&&(_=!1,p.dynamicChildren=null);const{type:v,ref:N,shapeFlag:I}=p;switch(v){case Zn:A(f,p,h,w);break;case ve:K(f,p,h,w);break;case bo:f==null&&B(p,h,w,P);break;case de:S(f,p,h,w,m,y,P,C,_);break;default:I&1?W(f,p,h,w,m,y,P,C,_):I&6?J(f,p,h,w,m,y,P,C,_):(I&64||I&128)&&v.process(f,p,h,w,m,y,P,C,_,Vt)}N!=null&&m?en(N,f&&f.ref,y,p||f,!p):N==null&&f&&f.ref!=null&&en(f.ref,null,y,f,!0)},A=(f,p,h,w)=>{if(f==null)o(p.el=a(p.children),h,w);else{const m=p.el=f.el;p.children!==f.children&&u(m,p.children)}},K=(f,p,h,w)=>{f==null?o(p.el=l(p.children||""),h,w):p.el=f.el},B=(f,p,h,w)=>{[f.el,f.anchor]=O(f.children,p,h,w,f.el,f.anchor)},z=({el:f,anchor:p},h,w)=>{let m;for(;f&&f!==p;)m=b(f),o(f,h,w),f=m;o(p,h,w)},E=({el:f,anchor:p})=>{let h;for(;f&&f!==p;)h=b(f),s(f),f=h;s(p)},W=(f,p,h,w,m,y,P,C,_)=>{if(p.type==="svg"?P="svg":p.type==="math"&&(P="mathml"),f==null)F(p,h,w,m,y,P,C,_);else{const v=f.el&&f.el._isVueCE?f.el:null;try{v&&v._beginPatch(),T(f,p,m,y,P,C,_)}finally{v&&v._endPatch()}}},F=(f,p,h,w,m,y,P,C)=>{let _,v;const{props:N,shapeFlag:I,transition:R,dirs:U}=f;if(_=f.el=i(f.type,y,N&&N.is,N),I&8?c(_,f.children):I&16&&H(f.children,_,null,w,m,po(f,y),P,C),U&&vt(f,null,w,"created"),X(_,f,f.scopeId,P,w),N){for(const re in N)re!=="value"&&!Yt(re)&&r(_,re,null,N[re],y,w);"value"in N&&r(_,"value",null,N.value,y),(v=N.onVnodeBeforeMount)&&Ke(v,w,f)}U&&vt(f,null,w,"beforeMount");const Z=Ll(m,R);Z&&R.beforeEnter(_),o(_,p,h),((v=N&&N.onVnodeMounted)||Z||U)&&Ee(()=>{v&&Ke(v,w,f),Z&&R.enter(_),U&&vt(f,null,w,"mounted")},m)},X=(f,p,h,w,m)=>{if(h&&g(f,h),w)for(let y=0;y<w.length;y++)g(f,w[y]);if(m){let y=m.subTree;if(p===y||_i(y.type)&&(y.ssContent===p||y.ssFallback===p)){const P=m.vnode;X(f,P,P.scopeId,P.slotScopeIds,m.parent)}}},H=(f,p,h,w,m,y,P,C,_=0)=>{for(let v=_;v<f.length;v++){const N=f[v]=C?nt(f[v]):Ye(f[v]);k(null,N,p,h,w,m,y,P,C)}},T=(f,p,h,w,m,y,P)=>{const C=p.el=f.el;let{patchFlag:_,dynamicChildren:v,dirs:N}=p;_|=f.patchFlag&16;const I=f.props||ae,R=p.props||ae;let U;if(h&&wt(h,!1),(U=R.onVnodeBeforeUpdate)&&Ke(U,h,p,f),N&&vt(p,f,h,"beforeUpdate"),h&&wt(h,!0),(I.innerHTML&&R.innerHTML==null||I.textContent&&R.textContent==null)&&c(C,""),v?x(f.dynamicChildren,v,C,h,w,po(p,m),y):P||se(f,p,C,null,h,w,po(p,m),y,!1),_>0){if(_&16)D(C,I,R,h,m);else if(_&2&&I.class!==R.class&&r(C,"class",null,R.class,m),_&4&&r(C,"style",I.style,R.style,m),_&8){const Z=p.dynamicProps;for(let re=0;re<Z.length;re++){const oe=Z[re],Pe=I[oe],Ae=R[oe];(Ae!==Pe||oe==="value")&&r(C,oe,Pe,Ae,m,h)}}_&1&&f.children!==p.children&&c(C,p.children)}else!P&&v==null&&D(C,I,R,h,m);((U=R.onVnodeUpdated)||N)&&Ee(()=>{U&&Ke(U,h,p,f),N&&vt(p,f,h,"updated")},w)},x=(f,p,h,w,m,y,P)=>{for(let C=0;C<p.length;C++){const _=f[C],v=p[C],N=_.el&&(_.type===de||!kt(_,v)||_.shapeFlag&198)?d(_.el):h;k(_,v,N,null,w,m,y,P,!0)}},D=(f,p,h,w,m)=>{if(p!==h){if(p!==ae)for(const y in p)!Yt(y)&&!(y in h)&&r(f,y,p[y],null,m,w);for(const y in h){if(Yt(y))continue;const P=h[y],C=p[y];P!==C&&y!=="value"&&r(f,y,C,P,m,w)}"value"in h&&r(f,"value",p.value,h.value,m)}},S=(f,p,h,w,m,y,P,C,_)=>{const v=p.el=f?f.el:a(""),N=p.anchor=f?f.anchor:a("");let{patchFlag:I,dynamicChildren:R,slotScopeIds:U}=p;U&&(C=C?C.concat(U):U),f==null?(o(v,h,w),o(N,h,w),H(p.children||[],h,N,m,y,P,C,_)):I>0&&I&64&&R&&f.dynamicChildren&&f.dynamicChildren.length===R.length?(x(f.dynamicChildren,R,h,m,y,P,C),(p.key!=null||m&&p===m.subTree)&&vi(f,p,!0)):se(f,p,h,N,m,y,P,C,_)},J=(f,p,h,w,m,y,P,C,_)=>{p.slotScopeIds=C,f==null?p.shapeFlag&512?m.ctx.activate(p,h,w,P,_):ce(p,h,w,m,y,P,_):xe(f,p,_)},ce=(f,p,h,w,m,y,P)=>{const C=f.component=Hl(f,w,m);if(Jn(f)&&(C.ctx.renderer=Vt),Vl(C,!1,P),C.asyncDep){if(m&&m.registerDep(C,Q,P),!f.el){const _=C.subTree=Y(ve);K(null,_,p,h),f.placeholder=_.el}}else Q(C,f,p,h,m,y,P)},xe=(f,p,h)=>{const w=p.component=f.component;if(Sl(f,p,h))if(w.asyncDep&&!w.asyncResolved){q(w,p,h);return}else w.next=p,w.update();else p.el=f.el,w.vnode=p},Q=(f,p,h,w,m,y,P)=>{const C=()=>{if(f.isMounted){let{next:I,bu:R,u:U,parent:Z,vnode:re}=f;{const We=wi(f);if(We){I&&(I.el=re.el,q(f,I,P)),We.asyncDep.then(()=>{Ee(()=>{f.isUnmounted||v()},m)});return}}let oe=I,Pe;wt(f,!1),I?(I.el=re.el,q(f,I,P)):I=re,R&&ro(R),(Pe=I.props&&I.props.onVnodeBeforeUpdate)&&Ke(Pe,Z,I,re),wt(f,!0);const Ae=Ts(f),Ue=f.subTree;f.subTree=Ae,k(Ue,Ae,d(Ue.el),yn(Ue),f,m,y),I.el=Ae.el,oe===null&&_l(f,Ae.el),U&&Ee(U,m),(Pe=I.props&&I.props.onVnodeUpdated)&&Ee(()=>Ke(Pe,Z,I,re),m)}else{let I;const{el:R,props:U}=p,{bm:Z,m:re,parent:oe,root:Pe,type:Ae}=f,Ue=jt(p);wt(f,!1),Z&&ro(Z),!Ue&&(I=U&&U.onVnodeBeforeMount)&&Ke(I,oe,p),wt(f,!0);{Pe.ce&&Pe.ce._hasShadowRoot()&&Pe.ce._injectChildStyle(Ae);const We=f.subTree=Ts(f);k(null,We,h,w,f,m,y),p.el=We.el}if(re&&Ee(re,m),!Ue&&(I=U&&U.onVnodeMounted)){const We=p;Ee(()=>Ke(I,oe,We),m)}(p.shapeFlag&256||oe&&jt(oe.vnode)&&oe.vnode.shapeFlag&256)&&f.a&&Ee(f.a,m),f.isMounted=!0,p=h=w=null}};f.scope.on();const _=f.effect=new Ar(C);f.scope.off();const v=f.update=_.run.bind(_),N=f.job=_.runIfDirty.bind(_);N.i=f,N.id=f.uid,_.scheduler=()=>Xo(N),wt(f,!0),v()},q=(f,p,h)=>{p.component=f;const w=f.vnode.props;f.vnode=p,f.next=null,kl(f,p.props,w,h),El(f,p.children,h),rt(),gs(f),it()},se=(f,p,h,w,m,y,P,C,_=!1)=>{const v=f&&f.children,N=f?f.shapeFlag:0,I=p.children,{patchFlag:R,shapeFlag:U}=p;if(R>0){if(R&128){mn(v,I,h,w,m,y,P,C,_);return}else if(R&256){Xe(v,I,h,w,m,y,P,C,_);return}}U&8?(N&16&&Ht(v,m,y),I!==v&&c(h,I)):N&16?U&16?mn(v,I,h,w,m,y,P,C,_):Ht(v,m,y,!0):(N&8&&c(h,""),U&16&&H(I,h,w,m,y,P,C,_))},Xe=(f,p,h,w,m,y,P,C,_)=>{f=f||Mt,p=p||Mt;const v=f.length,N=p.length,I=Math.min(v,N);let R;for(R=0;R<I;R++){const U=p[R]=_?nt(p[R]):Ye(p[R]);k(f[R],U,h,null,m,y,P,C,_)}v>N?Ht(f,m,y,!0,!1,I):H(p,h,w,m,y,P,C,_,I)},mn=(f,p,h,w,m,y,P,C,_)=>{let v=0;const N=p.length;let I=f.length-1,R=N-1;for(;v<=I&&v<=R;){const U=f[v],Z=p[v]=_?nt(p[v]):Ye(p[v]);if(kt(U,Z))k(U,Z,h,null,m,y,P,C,_);else break;v++}for(;v<=I&&v<=R;){const U=f[I],Z=p[R]=_?nt(p[R]):Ye(p[R]);if(kt(U,Z))k(U,Z,h,null,m,y,P,C,_);else break;I--,R--}if(v>I){if(v<=R){const U=R+1,Z=U<N?p[U].el:w;for(;v<=R;)k(null,p[v]=_?nt(p[v]):Ye(p[v]),h,Z,m,y,P,C,_),v++}}else if(v>R)for(;v<=I;)ze(f[v],m,y,!0),v++;else{const U=v,Z=v,re=new Map;for(v=Z;v<=R;v++){const $e=p[v]=_?nt(p[v]):Ye(p[v]);$e.key!=null&&re.set($e.key,v)}let oe,Pe=0;const Ae=R-Z+1;let Ue=!1,We=0;const zt=new Array(Ae);for(v=0;v<Ae;v++)zt[v]=0;for(v=U;v<=I;v++){const $e=f[v];if(Pe>=Ae){ze($e,m,y,!0);continue}let qe;if($e.key!=null)qe=re.get($e.key);else for(oe=Z;oe<=R;oe++)if(zt[oe-Z]===0&&kt($e,p[oe])){qe=oe;break}qe===void 0?ze($e,m,y,!0):(zt[qe-Z]=v+1,qe>=We?We=qe:Ue=!0,k($e,p[qe],h,null,m,y,P,C,_),Pe++)}const us=Ue?$l(zt):Mt;for(oe=us.length-1,v=Ae-1;v>=0;v--){const $e=Z+v,qe=p[$e],fs=p[$e+1],ds=$e+1<N?fs.el||Si(fs):w;zt[v]===0?k(null,qe,h,ds,m,y,P,C,_):Ue&&(oe<0||v!==us[oe]?yt(qe,h,ds,2):oe--)}}},yt=(f,p,h,w,m=null)=>{const{el:y,type:P,transition:C,children:_,shapeFlag:v}=f;if(v&6){yt(f.component.subTree,p,h,w);return}if(v&128){f.suspense.move(p,h,w);return}if(v&64){P.move(f,p,h,Vt);return}if(P===de){o(y,p,h);for(let I=0;I<_.length;I++)yt(_[I],p,h,w);o(f.anchor,p,h);return}if(P===bo){z(f,p,h);return}if(w!==2&&v&1&&C)if(w===0)C.beforeEnter(y),o(y,p,h),Ee(()=>C.enter(y),m);else{const{leave:I,delayLeave:R,afterLeave:U}=C,Z=()=>{f.ctx.isUnmounted?s(y):o(y,p,h)},re=()=>{y._isLeaving&&y[Je](!0),I(y,()=>{Z(),U&&U()})};R?R(y,Z,re):re()}else o(y,p,h)},ze=(f,p,h,w=!1,m=!1)=>{const{type:y,props:P,ref:C,children:_,dynamicChildren:v,shapeFlag:N,patchFlag:I,dirs:R,cacheIndex:U}=f;if(I===-2&&(m=!1),C!=null&&(rt(),en(C,null,h,f,!0),it()),U!=null&&(p.renderCache[U]=void 0),N&256){p.ctx.deactivate(f);return}const Z=N&1&&R,re=!jt(f);let oe;if(re&&(oe=P&&P.onVnodeBeforeUnmount)&&Ke(oe,p,f),N&6)Ji(f.component,h,w);else{if(N&128){f.suspense.unmount(h,w);return}Z&&vt(f,null,p,"beforeUnmount"),N&64?f.type.remove(f,p,h,Vt,w):v&&!v.hasOnce&&(y!==de||I>0&&I&64)?Ht(v,p,h,!1,!0):(y===de&&I&384||!m&&N&16)&&Ht(_,p,h),w&&ls(f)}(re&&(oe=P&&P.onVnodeUnmounted)||Z)&&Ee(()=>{oe&&Ke(oe,p,f),Z&&vt(f,null,p,"unmounted")},h)},ls=f=>{const{type:p,el:h,anchor:w,transition:m}=f;if(p===de){Gi(h,w);return}if(p===bo){E(f);return}const y=()=>{s(h),m&&!m.persisted&&m.afterLeave&&m.afterLeave()};if(f.shapeFlag&1&&m&&!m.persisted){const{leave:P,delayLeave:C}=m,_=()=>P(h,y);C?C(f.el,y,_):_()}else y()},Gi=(f,p)=>{let h;for(;f!==p;)h=b(f),s(f),f=h;s(p)},Ji=(f,p,h)=>{const{bum:w,scope:m,job:y,subTree:P,um:C,m:_,a:v}=f;Es(_),Es(v),w&&ro(w),m.stop(),y&&(y.flags|=8,ze(P,f,p,h)),C&&Ee(C,p),Ee(()=>{f.isUnmounted=!0},p)},Ht=(f,p,h,w=!1,m=!1,y=0)=>{for(let P=y;P<f.length;P++)ze(f[P],p,h,w,m)},yn=f=>{if(f.shapeFlag&6)return yn(f.component.subTree);if(f.shapeFlag&128)return f.suspense.next();const p=b(f.anchor||f.el),h=p&&p[Ga];return h?b(h):p};let oo=!1;const cs=(f,p,h)=>{let w;f==null?p._vnode&&(ze(p._vnode,null,null,!0),w=p._vnode.component):k(p._vnode||null,f,p,null,null,null,h),p._vnode=f,oo||(oo=!0,gs(w),qr(),oo=!1)},Vt={p:k,um:ze,m:yt,r:ls,mt:ce,mc:H,pc:se,pbc:x,n:yn,o:e};return{render:cs,hydrate:void 0,createApp:xl(cs)}}function po({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function wt({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function Ll(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function vi(e,t,n=!1){const o=e.children,s=t.children;if(j(o)&&j(s))for(let r=0;r<o.length;r++){const i=o[r];let a=s[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[r]=nt(s[r]),a.el=i.el),!n&&a.patchFlag!==-2&&vi(i,a)),a.type===Zn&&(a.patchFlag===-1&&(a=s[r]=nt(a)),a.el=i.el),a.type===ve&&!a.el&&(a.el=i.el)}}function $l(e){const t=e.slice(),n=[0];let o,s,r,i,a;const l=e.length;for(o=0;o<l;o++){const u=e[o];if(u!==0){if(s=n[n.length-1],e[s]<u){t[o]=s,n.push(o);continue}for(r=0,i=n.length-1;r<i;)a=r+i>>1,e[n[a]]<u?r=a+1:i=a;u<e[n[r]]&&(r>0&&(t[o]=n[r-1]),n[r]=o)}}for(r=n.length,i=n[r-1];r-- >0;)n[r]=i,i=t[i];return n}function wi(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:wi(t)}function Es(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function Si(e){if(e.placeholder)return e.placeholder;const t=e.component;return t?Si(t.subTree):null}const _i=e=>e.__isSuspense;function Dl(e,t){t&&t.pendingBranch?j(e)?t.effects.push(...e):t.effects.push(e):Va(e)}const de=Symbol.for("v-fgt"),Zn=Symbol.for("v-txt"),ve=Symbol.for("v-cmt"),bo=Symbol.for("v-stc"),nn=[];let Me=null;function L(e=!1){nn.push(Me=e?null:[])}function Ml(){nn.pop(),Me=nn[nn.length-1]||null}let cn=1;function Rn(e,t=!1){cn+=e,e<0&&Me&&t&&(Me.hasOnce=!0)}function Ci(e){return e.dynamicChildren=cn>0?Me||Mt:null,Ml(),cn>0&&Me&&Me.push(e),e}function V(e,t,n,o,s,r){return Ci($(e,t,n,o,s,r,!0))}function we(e,t,n,o,s){return Ci(Y(e,t,n,o,s,!0))}function un(e){return e?e.__v_isVNode===!0:!1}function kt(e,t){return e.type===t.type&&e.key===t.key}const ki=({key:e})=>e??null,kn=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?pe(e)||fe(e)||G(e)?{i:Oe,r:e,k:t,f:!!n}:e:null);function $(e,t=null,n=null,o=0,s=null,r=e===de?0:1,i=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&ki(t),ref:t&&kn(t),scopeId:Gr,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:o,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:Oe};return a?(ns(l,n),r&128&&e.normalize(l)):n&&(l.shapeFlag|=pe(n)?8:16),cn>0&&!i&&Me&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&Me.push(l),l}const Y=Rl;function Rl(e,t=null,n=null,o=0,s=null,r=!1){if((!e||e===ll)&&(e=ve),un(e)){const a=mt(e,t,!0);return n&&ns(a,n),cn>0&&!r&&Me&&(a.shapeFlag&6?Me[Me.indexOf(e)]=a:Me.push(a)),a.patchFlag=-2,a}if(ql(e)&&(e=e.__vccOpts),t){t=Nl(t);let{class:a,style:l}=t;a&&!pe(a)&&(t.class=De(a)),ne(l)&&(Kn(l)&&!j(l)&&(l=be({},l)),t.style=Un(l))}const i=pe(e)?1:_i(e)?128:Qr(e)?64:ne(e)?4:G(e)?2:0;return $(e,t,n,o,s,i,r,!0)}function Nl(e){return e?Kn(e)||bi(e)?be({},e):e:null}function mt(e,t,n=!1,o=!1){const{props:s,ref:r,patchFlag:i,children:a,transition:l}=e,u=t?jl(s||{},t):s,c={__v_isVNode:!0,__v_skip:!0,type:e.type,props:u,key:u&&ki(u),ref:t&&t.ref?n&&r?j(r)?r.concat(kn(t)):[r,kn(t)]:kn(t):r,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:a,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==de?i===-1?16:i|16:i,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:l,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&mt(e.ssContent),ssFallback:e.ssFallback&&mt(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return l&&o&&ln(c,l.clone(c)),c}function me(e=" ",t=0){return Y(Zn,null,e,t)}function Ie(e="",t=!1){return t?(L(),we(ve,null,e)):Y(ve,null,e)}function Ye(e){return e==null||typeof e=="boolean"?Y(ve):j(e)?Y(de,null,e.slice()):un(e)?nt(e):Y(Zn,null,String(e))}function nt(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:mt(e)}function ns(e,t){let n=0;const{shapeFlag:o}=e;if(t==null)t=null;else if(j(t))n=16;else if(typeof t=="object")if(o&65){const s=t.default;s&&(s._c&&(s._d=!1),ns(e,s()),s._c&&(s._d=!0));return}else{n=32;const s=t._;!s&&!bi(t)?t._ctx=Oe:s===3&&Oe&&(Oe.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else G(t)?(t={default:t,_ctx:Oe},n=32):(t=String(t),o&64?(n=16,t=[me(t)]):n=8);e.children=t,e.shapeFlag|=n}function jl(...e){const t={};for(let n=0;n<e.length;n++){const o=e[n];for(const s in o)if(s==="class")t.class!==o.class&&(t.class=De([t.class,o.class]));else if(s==="style")t.style=Un([t.style,o.style]);else if(Fn(s)){const r=t[s],i=o[s];i&&r!==i&&!(j(r)&&r.includes(i))&&(t[s]=r?[].concat(r,i):i)}else s!==""&&(t[s]=o[s])}return t}function Ke(e,t,n,o=null){Ve(e,t,7,[n,o])}const Bl=ci();let Fl=0;function Hl(e,t,n){const o=e.type,s=(t?t.appContext:e.appContext)||Bl,r={uid:Fl++,vnode:e,type:o,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new kr(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:xi(o,s),emitsOptions:ui(o,s),emit:null,emitted:null,propsDefaults:ae,inheritAttrs:o.inheritAttrs,ctx:ae,data:ae,props:ae,attrs:ae,slots:ae,refs:ae,setupState:ae,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=t?t.root:r,r.emit=ml.bind(null,r),e.ce&&e.ce(r),r}let ke=null;const os=()=>ke||Oe;let Nn,Oo;{const e=zn(),t=(n,o)=>{let s;return(s=e[n])||(s=e[n]=[]),s.push(o),r=>{s.length>1?s.forEach(i=>i(r)):s[0](r)}};Nn=t("__VUE_INSTANCE_SETTERS__",n=>ke=n),Oo=t("__VUE_SSR_SETTERS__",n=>fn=n)}const xn=e=>{const t=ke;return Nn(e),e.scope.on(),()=>{e.scope.off(),Nn(t)}},Is=()=>{ke&&ke.scope.off(),Nn(null)};function Ti(e){return e.vnode.shapeFlag&4}let fn=!1;function Vl(e,t=!1,n=!1){t&&Oo(t);const{props:o,children:s}=e.vnode,r=Ti(e);Cl(e,o,r,t),Al(e,s,n||t);const i=r?zl(e,t):void 0;return t&&Oo(!1),i}function zl(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,cl);const{setup:o}=n;if(o){rt();const s=e.setupContext=o.length>1?Wl(e):null,r=xn(e),i=hn(o,e,0,[e.props,s]),a=gr(i);if(it(),r(),(a||e.sp)&&!jt(e)&&oi(e),a){if(i.then(Is,Is),t)return i.then(l=>{Os(e,l)}).catch(l=>{Gn(l,e,0)});e.asyncDep=i}else Os(e,i)}else Pi(e)}function Os(e,t,n){G(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:ne(t)&&(e.setupState=zr(t)),Pi(e)}function Pi(e,t,n){const o=e.type;e.render||(e.render=o.render||Qe);{const s=xn(e);rt();try{ul(e)}finally{it(),s()}}}const Ul={get(e,t){return ye(e,"get",""),e[t]}};function Wl(e){const t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,Ul),slots:e.slots,emit:e.emit,expose:t}}function ss(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(zr(Yo(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in tn)return tn[n](e)},has(t,n){return n in t||n in tn}})):e.proxy}function ql(e){return G(e)&&"__vccOpts"in e}const he=(e,t)=>Na(e,t,fn);function Lo(e,t,n){try{Rn(-1);const o=arguments.length;return o===2?ne(t)&&!j(t)?un(t)?Y(e,null,[t]):Y(e,t):Y(e,null,t):(o>3?n=Array.prototype.slice.call(arguments,2):o===3&&un(n)&&(n=[n]),Y(e,t,n))}finally{Rn(1)}}const Kl="3.5.29";let $o;const Ls=typeof window<"u"&&window.trustedTypes;if(Ls)try{$o=Ls.createPolicy("vue",{createHTML:e=>e})}catch{}const Ai=$o?e=>$o.createHTML(e):e=>e,Gl="http://www.w3.org/2000/svg",Jl="http://www.w3.org/1998/Math/MathML",tt=typeof document<"u"?document:null,$s=tt&&tt.createElement("template"),Yl={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,o)=>{const s=t==="svg"?tt.createElementNS(Gl,e):t==="mathml"?tt.createElementNS(Jl,e):n?tt.createElement(e,{is:n}):tt.createElement(e);return e==="select"&&o&&o.multiple!=null&&s.setAttribute("multiple",o.multiple),s},createText:e=>tt.createTextNode(e),createComment:e=>tt.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>tt.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,o,s,r){const i=n?n.previousSibling:t.lastChild;if(s&&(s===r||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),n),!(s===r||!(s=s.nextSibling)););else{$s.innerHTML=Ai(o==="svg"?`<svg>${e}</svg>`:o==="mathml"?`<math>${e}</math>`:e);const a=$s.content;if(o==="svg"||o==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,n)}return[i?i.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},ct="transition",qt="animation",dn=Symbol("_vtc"),Ei={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},Ql=be({},Xr,Ei),Xl=e=>(e.displayName="Transition",e.props=Ql,e),Ds=Xl((e,{slots:t})=>Lo(Qa,Zl(e),t)),St=(e,t=[])=>{j(e)?e.forEach(n=>n(...t)):e&&e(...t)},Ms=e=>e?j(e)?e.some(t=>t.length>1):e.length>1:!1;function Zl(e){const t={};for(const S in e)S in Ei||(t[S]=e[S]);if(e.css===!1)return t;const{name:n="v",type:o,duration:s,enterFromClass:r=`${n}-enter-from`,enterActiveClass:i=`${n}-enter-active`,enterToClass:a=`${n}-enter-to`,appearFromClass:l=r,appearActiveClass:u=i,appearToClass:c=a,leaveFromClass:d=`${n}-leave-from`,leaveActiveClass:b=`${n}-leave-active`,leaveToClass:g=`${n}-leave-to`}=e,O=ec(s),k=O&&O[0],A=O&&O[1],{onBeforeEnter:K,onEnter:B,onEnterCancelled:z,onLeave:E,onLeaveCancelled:W,onBeforeAppear:F=K,onAppear:X=B,onAppearCancelled:H=z}=t,T=(S,J,ce,xe)=>{S._enterCancelled=xe,_t(S,J?c:a),_t(S,J?u:i),ce&&ce()},x=(S,J)=>{S._isLeaving=!1,_t(S,d),_t(S,g),_t(S,b),J&&J()},D=S=>(J,ce)=>{const xe=S?X:B,Q=()=>T(J,S,ce);St(xe,[J,Q]),Rs(()=>{_t(J,S?l:r),et(J,S?c:a),Ms(xe)||Ns(J,o,k,Q)})};return be(t,{onBeforeEnter(S){St(K,[S]),et(S,r),et(S,i)},onBeforeAppear(S){St(F,[S]),et(S,l),et(S,u)},onEnter:D(!1),onAppear:D(!0),onLeave(S,J){S._isLeaving=!0;const ce=()=>x(S,J);et(S,d),S._enterCancelled?(et(S,b),Fs(S)):(Fs(S),et(S,b)),Rs(()=>{S._isLeaving&&(_t(S,d),et(S,g),Ms(E)||Ns(S,o,A,ce))}),St(E,[S,ce])},onEnterCancelled(S){T(S,!1,void 0,!0),St(z,[S])},onAppearCancelled(S){T(S,!0,void 0,!0),St(H,[S])},onLeaveCancelled(S){x(S),St(W,[S])}})}function ec(e){if(e==null)return null;if(ne(e))return[ho(e.enter),ho(e.leave)];{const t=ho(e);return[t,t]}}function ho(e){return ta(e)}function et(e,t){t.split(/\s+/).forEach(n=>n&&e.classList.add(n)),(e[dn]||(e[dn]=new Set)).add(t)}function _t(e,t){t.split(/\s+/).forEach(o=>o&&e.classList.remove(o));const n=e[dn];n&&(n.delete(t),n.size||(e[dn]=void 0))}function Rs(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}let tc=0;function Ns(e,t,n,o){const s=e._endId=++tc,r=()=>{s===e._endId&&o()};if(n!=null)return setTimeout(r,n);const{type:i,timeout:a,propCount:l}=nc(e,t);if(!i)return o();const u=i+"end";let c=0;const d=()=>{e.removeEventListener(u,b),r()},b=g=>{g.target===e&&++c>=l&&d()};setTimeout(()=>{c<l&&d()},a+1),e.addEventListener(u,b)}function nc(e,t){const n=window.getComputedStyle(e),o=O=>(n[O]||"").split(", "),s=o(`${ct}Delay`),r=o(`${ct}Duration`),i=js(s,r),a=o(`${qt}Delay`),l=o(`${qt}Duration`),u=js(a,l);let c=null,d=0,b=0;t===ct?i>0&&(c=ct,d=i,b=r.length):t===qt?u>0&&(c=qt,d=u,b=l.length):(d=Math.max(i,u),c=d>0?i>u?ct:qt:null,b=c?c===ct?r.length:l.length:0);const g=c===ct&&/\b(?:transform|all)(?:,|$)/.test(o(`${ct}Property`).toString());return{type:c,timeout:d,propCount:b,hasTransform:g}}function js(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((n,o)=>Bs(n)+Bs(e[o])))}function Bs(e){return e==="auto"?0:Number(e.slice(0,-1).replace(",","."))*1e3}function Fs(e){return(e?e.ownerDocument:document).body.offsetHeight}function oc(e,t,n){const o=e[dn];o&&(t=(t?[t,...o]:[...o]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const Hs=Symbol("_vod"),sc=Symbol("_vsh"),rc=Symbol(""),ic=/(?:^|;)\s*display\s*:/;function ac(e,t,n){const o=e.style,s=pe(n);let r=!1;if(n&&!s){if(t)if(pe(t))for(const i of t.split(";")){const a=i.slice(0,i.indexOf(":")).trim();n[a]==null&&Tn(o,a,"")}else for(const i in t)n[i]==null&&Tn(o,i,"");for(const i in n)i==="display"&&(r=!0),Tn(o,i,n[i])}else if(s){if(t!==n){const i=o[rc];i&&(n+=";"+i),o.cssText=n,r=ic.test(n)}}else t&&e.removeAttribute("style");Hs in e&&(e[Hs]=r?o.display:"",e[sc]&&(o.display="none"))}const Vs=/\s*!important$/;function Tn(e,t,n){if(j(n))n.forEach(o=>Tn(e,t,o));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const o=lc(e,t);Vs.test(n)?e.setProperty(Et(o),n.replace(Vs,""),"important"):e[o]=n}}const zs=["Webkit","Moz","ms"],xo={};function lc(e,t){const n=xo[t];if(n)return n;let o=gt(t);if(o!=="filter"&&o in e)return xo[t]=o;o=vr(o);for(let s=0;s<zs.length;s++){const r=zs[s]+o;if(r in e)return xo[t]=r}return t}const Us="http://www.w3.org/1999/xlink";function Ws(e,t,n,o,s,r=aa(t)){o&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(Us,t.slice(6,t.length)):e.setAttributeNS(Us,t,n):n==null||r&&!Sr(n)?e.removeAttribute(t):e.setAttribute(t,r?"":Fe(n)?String(n):n)}function qs(e,t,n,o,s){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?Ai(n):n);return}const r=e.tagName;if(t==="value"&&r!=="PROGRESS"&&!r.includes("-")){const a=r==="OPTION"?e.getAttribute("value")||"":e.value,l=n==null?e.type==="checkbox"?"on":"":String(n);(a!==l||!("_value"in e))&&(e.value=l),n==null&&e.removeAttribute(t),e._value=n;return}let i=!1;if(n===""||n==null){const a=typeof e[t];a==="boolean"?n=Sr(n):n==null&&a==="string"?(n="",i=!0):a==="number"&&(n=0,i=!0)}try{e[t]=n}catch{}i&&e.removeAttribute(s||t)}function cc(e,t,n,o){e.addEventListener(t,n,o)}function uc(e,t,n,o){e.removeEventListener(t,n,o)}const Ks=Symbol("_vei");function fc(e,t,n,o,s=null){const r=e[Ks]||(e[Ks]={}),i=r[t];if(o&&i)i.value=o;else{const[a,l]=dc(t);if(o){const u=r[t]=hc(o,s);cc(e,a,u,l)}else i&&(uc(e,a,i,l),r[t]=void 0)}}const Gs=/(?:Once|Passive|Capture)$/;function dc(e){let t;if(Gs.test(e)){t={};let o;for(;o=e.match(Gs);)e=e.slice(0,e.length-o[0].length),t[o[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):Et(e.slice(2)),t]}let go=0;const pc=Promise.resolve(),bc=()=>go||(pc.then(()=>go=0),go=Date.now());function hc(e,t){const n=o=>{if(!o._vts)o._vts=Date.now();else if(o._vts<=n.attached)return;Ve(xc(o,n.value),t,5,[o])};return n.value=e,n.attached=bc(),n}function xc(e,t){if(j(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(o=>s=>!s._stopped&&o&&o(s))}else return t}const Js=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,gc=(e,t,n,o,s,r)=>{const i=s==="svg";t==="class"?oc(e,o,i):t==="style"?ac(e,n,o):Fn(t)?Ho(t)||fc(e,t,n,o,r):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):mc(e,t,o,i))?(qs(e,t,o),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&Ws(e,t,o,i,r,t!=="value")):e._isVueCE&&(/[A-Z]/.test(t)||!pe(o))?qs(e,gt(t),o,r,t):(t==="true-value"?e._trueValue=o:t==="false-value"&&(e._falseValue=o),Ws(e,t,o,i))};function mc(e,t,n,o){if(o)return!!(t==="innerHTML"||t==="textContent"||t in e&&Js(t)&&G(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&e.tagName==="IFRAME"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=e.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Js(t)&&pe(n)?!1:t in e}const yc=["ctrl","shift","alt","meta"],vc={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>yc.some(n=>e[`${n}Key`]&&!t.includes(n))},wc=(e,t)=>{if(!e)return e;const n=e._withMods||(e._withMods={}),o=t.join(".");return n[o]||(n[o]=((s,...r)=>{for(let i=0;i<t.length;i++){const a=vc[t[i]];if(a&&a(s,t))return}return e(s,...r)}))},Sc=be({patchProp:gc},Yl);let Ys;function _c(){return Ys||(Ys=Il(Sc))}const Cc=((...e)=>{const t=_c().createApp(...e),{mount:n}=t;return t.mount=o=>{const s=Tc(o);if(!s)return;const r=t._component;!G(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const i=n(s,!1,kc(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),i},t});function kc(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function Tc(e){return pe(e)?document.querySelector(e):e}let Ii;const eo=e=>Ii=e,Oi=Symbol();function Do(e){return e&&typeof e=="object"&&Object.prototype.toString.call(e)==="[object Object]"&&typeof e.toJSON!="function"}var on;(function(e){e.direct="direct",e.patchObject="patch object",e.patchFunction="patch function"})(on||(on={}));function Pc(){const e=Tr(!0),t=e.run(()=>Te({}));let n=[],o=[];const s=Yo({install(r){eo(s),s._a=r,r.provide(Oi,s),r.config.globalProperties.$pinia=s,o.forEach(i=>n.push(i)),o=[]},use(r){return this._a?n.push(r):o.push(r),this},_p:n,_a:null,_e:e,_s:new Map,state:t});return s}const Li=()=>{};function Qs(e,t,n,o=Li){e.add(t);const s=()=>{e.delete(t)&&o()};return!n&&Pr()&&ca(s),s}function Ot(e,...t){e.forEach(n=>{n(...t)})}const Ac=e=>e(),Xs=Symbol(),mo=Symbol();function Mo(e,t){e instanceof Map&&t instanceof Map?t.forEach((n,o)=>e.set(o,n)):e instanceof Set&&t instanceof Set&&t.forEach(e.add,e);for(const n in t){if(!t.hasOwnProperty(n))continue;const o=t[n],s=e[n];Do(s)&&Do(o)&&e.hasOwnProperty(n)&&!fe(o)&&!st(o)?e[n]=Mo(s,o):e[n]=o}return e}const Ec=Symbol();function Ic(e){return!Do(e)||!Object.prototype.hasOwnProperty.call(e,Ec)}const{assign:ut}=Object;function Oc(e){return!!(fe(e)&&e.effect)}function Lc(e,t,n,o){const{state:s,actions:r,getters:i}=t,a=n.state.value[e];let l;function u(){a||(n.state.value[e]=s?s():{});const c=$a(n.state.value[e]);return ut(c,r,Object.keys(i||{}).reduce((d,b)=>(d[b]=Yo(he(()=>{eo(n);const g=n._s.get(e);return i[b].call(g,g)})),d),{}))}return l=$i(e,u,t,n,o,!0),l}function $i(e,t,n={},o,s,r){let i;const a=ut({actions:{}},n),l={deep:!0};let u,c,d=new Set,b=new Set,g;const O=o.state.value[e];!r&&!O&&(o.state.value[e]={});let k;function A(H){let T;u=c=!1,typeof H=="function"?(H(o.state.value[e]),T={type:on.patchFunction,storeId:e,events:g}):(Mo(o.state.value[e],H),T={type:on.patchObject,payload:H,storeId:e,events:g});const x=k=Symbol();Qo().then(()=>{k===x&&(u=!0)}),c=!0,Ot(d,T,o.state.value[e])}const K=r?function(){const{state:T}=n,x=T?T():{};this.$patch(D=>{ut(D,x)})}:Li;function B(){i.stop(),d.clear(),b.clear(),o._s.delete(e)}const z=(H,T="")=>{if(Xs in H)return H[mo]=T,H;const x=function(){eo(o);const D=Array.from(arguments),S=new Set,J=new Set;function ce(q){S.add(q)}function xe(q){J.add(q)}Ot(b,{args:D,name:x[mo],store:W,after:ce,onError:xe});let Q;try{Q=H.apply(this&&this.$id===e?this:W,D)}catch(q){throw Ot(J,q),q}return Q instanceof Promise?Q.then(q=>(Ot(S,q),q)).catch(q=>(Ot(J,q),Promise.reject(q))):(Ot(S,Q),Q)};return x[Xs]=!0,x[mo]=T,x},E={_p:o,$id:e,$onAction:Qs.bind(null,b),$patch:A,$reset:K,$subscribe(H,T={}){const x=Qs(d,H,T.detached,()=>D()),D=i.run(()=>ht(()=>o.state.value[e],S=>{(T.flush==="sync"?c:u)&&H({storeId:e,type:on.direct,events:g},S)},ut({},l,T)));return x},$dispose:B},W=qn(E);o._s.set(e,W);const X=(o._a&&o._a.runWithContext||Ac)(()=>o._e.run(()=>(i=Tr()).run(()=>t({action:z}))));for(const H in X){const T=X[H];if(fe(T)&&!Oc(T)||st(T))r||(O&&Ic(T)&&(fe(T)?T.value=O[H]:Mo(T,O[H])),o.state.value[e][H]=T);else if(typeof T=="function"){const x=z(T,H);X[H]=x,a.actions[H]=T}}return ut(W,X),ut(ee(W),X),Object.defineProperty(W,"$state",{get:()=>o.state.value[e],set:H=>{A(T=>{ut(T,H)})}}),o._p.forEach(H=>{ut(W,i.run(()=>H({store:W,app:o._a,pinia:o,options:a})))}),O&&r&&n.hydrate&&n.hydrate(W.$state,O),u=!0,c=!0,W}function $c(e,t,n){let o;const s=typeof t=="function";o=s?n:t;function r(i,a){const l=Ua();return i=i||(l?Zt(Oi,null):null),i&&eo(i),i=Ii,i._s.has(e)||(s?$i(e,t,o,i):Lc(e,o,i)),i._s.get(e)}return r.$id=e,r}const Di=/^[a-z0-9]+(-[a-z0-9]+)*$/,to=(e,t,n,o="")=>{const s=e.split(":");if(e.slice(0,1)==="@"){if(s.length<2||s.length>3)return null;o=s.shift().slice(1)}if(s.length>3||!s.length)return null;if(s.length>1){const a=s.pop(),l=s.pop(),u={provider:s.length>0?s[0]:o,prefix:l,name:a};return t&&!Pn(u)?null:u}const r=s[0],i=r.split("-");if(i.length>1){const a={provider:o,prefix:i.shift(),name:i.join("-")};return t&&!Pn(a)?null:a}if(n&&o===""){const a={provider:o,prefix:"",name:r};return t&&!Pn(a,n)?null:a}return null},Pn=(e,t)=>e?!!((t&&e.prefix===""||e.prefix)&&e.name):!1,Mi=Object.freeze({left:0,top:0,width:16,height:16}),jn=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),no=Object.freeze({...Mi,...jn}),Ro=Object.freeze({...no,body:"",hidden:!1});function Dc(e,t){const n={};!e.hFlip!=!t.hFlip&&(n.hFlip=!0),!e.vFlip!=!t.vFlip&&(n.vFlip=!0);const o=((e.rotate||0)+(t.rotate||0))%4;return o&&(n.rotate=o),n}function Zs(e,t){const n=Dc(e,t);for(const o in Ro)o in jn?o in e&&!(o in n)&&(n[o]=jn[o]):o in t?n[o]=t[o]:o in e&&(n[o]=e[o]);return n}function Mc(e,t){const n=e.icons,o=e.aliases||Object.create(null),s=Object.create(null);function r(i){if(n[i])return s[i]=[];if(!(i in s)){s[i]=null;const a=o[i]&&o[i].parent,l=a&&r(a);l&&(s[i]=[a].concat(l))}return s[i]}return Object.keys(n).concat(Object.keys(o)).forEach(r),s}function Rc(e,t,n){const o=e.icons,s=e.aliases||Object.create(null);let r={};function i(a){r=Zs(o[a]||s[a],r)}return i(t),n.forEach(i),Zs(e,r)}function Ri(e,t){const n=[];if(typeof e!="object"||typeof e.icons!="object")return n;e.not_found instanceof Array&&e.not_found.forEach(s=>{t(s,null),n.push(s)});const o=Mc(e);for(const s in o){const r=o[s];r&&(t(s,Rc(e,s,r)),n.push(s))}return n}const Nc={provider:"",aliases:{},not_found:{},...Mi};function yo(e,t){for(const n in t)if(n in e&&typeof e[n]!=typeof t[n])return!1;return!0}function Ni(e){if(typeof e!="object"||e===null)return null;const t=e;if(typeof t.prefix!="string"||!e.icons||typeof e.icons!="object"||!yo(e,Nc))return null;const n=t.icons;for(const s in n){const r=n[s];if(!s||typeof r.body!="string"||!yo(r,Ro))return null}const o=t.aliases||Object.create(null);for(const s in o){const r=o[s],i=r.parent;if(!s||typeof i!="string"||!n[i]&&!o[i]||!yo(r,Ro))return null}return t}const er=Object.create(null);function jc(e,t){return{provider:e,prefix:t,icons:Object.create(null),missing:new Set}}function Ft(e,t){const n=er[e]||(er[e]=Object.create(null));return n[t]||(n[t]=jc(e,t))}function ji(e,t){return Ni(t)?Ri(t,(n,o)=>{o?e.icons[n]=o:e.missing.add(n)}):[]}function Bc(e,t,n){try{if(typeof n.body=="string")return e.icons[t]={...n},!0}catch{}return!1}let pn=!1;function Bi(e){return typeof e=="boolean"&&(pn=e),pn}function Fc(e){const t=typeof e=="string"?to(e,!0,pn):e;if(t){const n=Ft(t.provider,t.prefix),o=t.name;return n.icons[o]||(n.missing.has(o)?null:void 0)}}function Hc(e,t){const n=to(e,!0,pn);if(!n)return!1;const o=Ft(n.provider,n.prefix);return t?Bc(o,n.name,t):(o.missing.add(n.name),!0)}function Vc(e,t){if(typeof e!="object")return!1;if(typeof t!="string"&&(t=e.provider||""),pn&&!t&&!e.prefix){let s=!1;return Ni(e)&&(e.prefix="",Ri(e,(r,i)=>{Hc(r,i)&&(s=!0)})),s}const n=e.prefix;if(!Pn({prefix:n,name:"a"}))return!1;const o=Ft(t,n);return!!ji(o,e)}const Fi=Object.freeze({width:null,height:null}),Hi=Object.freeze({...Fi,...jn}),zc=/(-?[0-9.]*[0-9]+[0-9.]*)/g,Uc=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function tr(e,t,n){if(t===1)return e;if(n=n||100,typeof e=="number")return Math.ceil(e*t*n)/n;if(typeof e!="string")return e;const o=e.split(zc);if(o===null||!o.length)return e;const s=[];let r=o.shift(),i=Uc.test(r);for(;;){if(i){const a=parseFloat(r);isNaN(a)?s.push(r):s.push(Math.ceil(a*t*n)/n)}else s.push(r);if(r=o.shift(),r===void 0)return s.join("");i=!i}}function Wc(e,t="defs"){let n="";const o=e.indexOf("<"+t);for(;o>=0;){const s=e.indexOf(">",o),r=e.indexOf("</"+t);if(s===-1||r===-1)break;const i=e.indexOf(">",r);if(i===-1)break;n+=e.slice(s+1,r).trim(),e=e.slice(0,o).trim()+e.slice(i+1)}return{defs:n,content:e}}function qc(e,t){return e?"<defs>"+e+"</defs>"+t:t}function Kc(e,t,n){const o=Wc(e);return qc(o.defs,t+o.content+n)}const Gc=e=>e==="unset"||e==="undefined"||e==="none";function Jc(e,t){const n={...no,...e},o={...Hi,...t},s={left:n.left,top:n.top,width:n.width,height:n.height};let r=n.body;[n,o].forEach(k=>{const A=[],K=k.hFlip,B=k.vFlip;let z=k.rotate;K?B?z+=2:(A.push("translate("+(s.width+s.left).toString()+" "+(0-s.top).toString()+")"),A.push("scale(-1 1)"),s.top=s.left=0):B&&(A.push("translate("+(0-s.left).toString()+" "+(s.height+s.top).toString()+")"),A.push("scale(1 -1)"),s.top=s.left=0);let E;switch(z<0&&(z-=Math.floor(z/4)*4),z=z%4,z){case 1:E=s.height/2+s.top,A.unshift("rotate(90 "+E.toString()+" "+E.toString()+")");break;case 2:A.unshift("rotate(180 "+(s.width/2+s.left).toString()+" "+(s.height/2+s.top).toString()+")");break;case 3:E=s.width/2+s.left,A.unshift("rotate(-90 "+E.toString()+" "+E.toString()+")");break}z%2===1&&(s.left!==s.top&&(E=s.left,s.left=s.top,s.top=E),s.width!==s.height&&(E=s.width,s.width=s.height,s.height=E)),A.length&&(r=Kc(r,'<g transform="'+A.join(" ")+'">',"</g>"))});const i=o.width,a=o.height,l=s.width,u=s.height;let c,d;i===null?(d=a===null?"1em":a==="auto"?u:a,c=tr(d,l/u)):(c=i==="auto"?l:i,d=a===null?tr(c,u/l):a==="auto"?u:a);const b={},g=(k,A)=>{Gc(A)||(b[k]=A.toString())};g("width",c),g("height",d);const O=[s.left,s.top,l,u];return b.viewBox=O.join(" "),{attributes:b,viewBox:O,body:r}}const Yc=/\sid="(\S+)"/g,Qc="IconifyId"+Date.now().toString(16)+(Math.random()*16777216|0).toString(16);let Xc=0;function Zc(e,t=Qc){const n=[];let o;for(;o=Yc.exec(e);)n.push(o[1]);if(!n.length)return e;const s="suffix"+(Math.random()*16777216|Date.now()).toString(16);return n.forEach(r=>{const i=typeof t=="function"?t(r):t+(Xc++).toString(),a=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");e=e.replace(new RegExp('([#;"])('+a+')([")]|\\.[a-z])',"g"),"$1"+i+s+"$3")}),e=e.replace(new RegExp(s,"g"),""),e}const No=Object.create(null);function eu(e,t){No[e]=t}function jo(e){return No[e]||No[""]}function rs(e){let t;if(typeof e.resources=="string")t=[e.resources];else if(t=e.resources,!(t instanceof Array)||!t.length)return null;return{resources:t,path:e.path||"/",maxURL:e.maxURL||500,rotate:e.rotate||750,timeout:e.timeout||5e3,random:e.random===!0,index:e.index||0,dataAfterTimeout:e.dataAfterTimeout!==!1}}const is=Object.create(null),Kt=["https://api.simplesvg.com","https://api.unisvg.com"],An=[];for(;Kt.length>0;)Kt.length===1||Math.random()>.5?An.push(Kt.shift()):An.push(Kt.pop());is[""]=rs({resources:["https://api.iconify.design"].concat(An)});function tu(e,t){const n=rs(t);return n===null?!1:(is[e]=n,!0)}function as(e){return is[e]}const nu=()=>{let e;try{if(e=fetch,typeof e=="function")return e}catch{}};let nr=nu();function ou(e,t){const n=as(e);if(!n)return 0;let o;if(!n.maxURL)o=0;else{let s=0;n.resources.forEach(i=>{s=Math.max(s,i.length)});const r=t+".json?icons=";o=n.maxURL-s-n.path.length-r.length}return o}function su(e){return e===404}const ru=(e,t,n)=>{const o=[],s=ou(e,t),r="icons";let i={type:r,provider:e,prefix:t,icons:[]},a=0;return n.forEach((l,u)=>{a+=l.length+1,a>=s&&u>0&&(o.push(i),i={type:r,provider:e,prefix:t,icons:[]},a=l.length),i.icons.push(l)}),o.push(i),o};function iu(e){if(typeof e=="string"){const t=as(e);if(t)return t.path}return"/"}const au=(e,t,n)=>{if(!nr){n("abort",424);return}let o=iu(t.provider);switch(t.type){case"icons":{const r=t.prefix,a=t.icons.join(","),l=new URLSearchParams({icons:a});o+=r+".json?"+l.toString();break}case"custom":{const r=t.uri;o+=r.slice(0,1)==="/"?r.slice(1):r;break}default:n("abort",400);return}let s=503;nr(e+o).then(r=>{const i=r.status;if(i!==200){setTimeout(()=>{n(su(i)?"abort":"next",i)});return}return s=501,r.json()}).then(r=>{if(typeof r!="object"||r===null){setTimeout(()=>{r===404?n("abort",r):n("next",s)});return}setTimeout(()=>{n("success",r)})}).catch(()=>{n("next",s)})},lu={prepare:ru,send:au};function cu(e){const t={loaded:[],missing:[],pending:[]},n=Object.create(null);e.sort((s,r)=>s.provider!==r.provider?s.provider.localeCompare(r.provider):s.prefix!==r.prefix?s.prefix.localeCompare(r.prefix):s.name.localeCompare(r.name));let o={provider:"",prefix:"",name:""};return e.forEach(s=>{if(o.name===s.name&&o.prefix===s.prefix&&o.provider===s.provider)return;o=s;const r=s.provider,i=s.prefix,a=s.name,l=n[r]||(n[r]=Object.create(null)),u=l[i]||(l[i]=Ft(r,i));let c;a in u.icons?c=t.loaded:i===""||u.missing.has(a)?c=t.missing:c=t.pending;const d={provider:r,prefix:i,name:a};c.push(d)}),t}function Vi(e,t){e.forEach(n=>{const o=n.loaderCallbacks;o&&(n.loaderCallbacks=o.filter(s=>s.id!==t))})}function uu(e){e.pendingCallbacksFlag||(e.pendingCallbacksFlag=!0,setTimeout(()=>{e.pendingCallbacksFlag=!1;const t=e.loaderCallbacks?e.loaderCallbacks.slice(0):[];if(!t.length)return;let n=!1;const o=e.provider,s=e.prefix;t.forEach(r=>{const i=r.icons,a=i.pending.length;i.pending=i.pending.filter(l=>{if(l.prefix!==s)return!0;const u=l.name;if(e.icons[u])i.loaded.push({provider:o,prefix:s,name:u});else if(e.missing.has(u))i.missing.push({provider:o,prefix:s,name:u});else return n=!0,!0;return!1}),i.pending.length!==a&&(n||Vi([e],r.id),r.callback(i.loaded.slice(0),i.missing.slice(0),i.pending.slice(0),r.abort))})}))}let fu=0;function du(e,t,n){const o=fu++,s=Vi.bind(null,n,o);if(!t.pending.length)return s;const r={id:o,icons:t,callback:e,abort:s};return n.forEach(i=>{(i.loaderCallbacks||(i.loaderCallbacks=[])).push(r)}),s}function pu(e,t=!0,n=!1){const o=[];return e.forEach(s=>{const r=typeof s=="string"?to(s,t,n):s;r&&o.push(r)}),o}var bu={resources:[],index:0,timeout:2e3,rotate:750,random:!1,dataAfterTimeout:!1};function hu(e,t,n,o){const s=e.resources.length,r=e.random?Math.floor(Math.random()*s):e.index;let i;if(e.random){let F=e.resources.slice(0);for(i=[];F.length>1;){const X=Math.floor(Math.random()*F.length);i.push(F[X]),F=F.slice(0,X).concat(F.slice(X+1))}i=i.concat(F)}else i=e.resources.slice(r).concat(e.resources.slice(0,r));const a=Date.now();let l="pending",u=0,c,d=null,b=[],g=[];typeof o=="function"&&g.push(o);function O(){d&&(clearTimeout(d),d=null)}function k(){l==="pending"&&(l="aborted"),O(),b.forEach(F=>{F.status==="pending"&&(F.status="aborted")}),b=[]}function A(F,X){X&&(g=[]),typeof F=="function"&&g.push(F)}function K(){return{startTime:a,payload:t,status:l,queriesSent:u,queriesPending:b.length,subscribe:A,abort:k}}function B(){l="failed",g.forEach(F=>{F(void 0,c)})}function z(){b.forEach(F=>{F.status==="pending"&&(F.status="aborted")}),b=[]}function E(F,X,H){const T=X!=="success";switch(b=b.filter(x=>x!==F),l){case"pending":break;case"failed":if(T||!e.dataAfterTimeout)return;break;default:return}if(X==="abort"){c=H,B();return}if(T){c=H,b.length||(i.length?W():B());return}if(O(),z(),!e.random){const x=e.resources.indexOf(F.resource);x!==-1&&x!==e.index&&(e.index=x)}l="completed",g.forEach(x=>{x(H)})}function W(){if(l!=="pending")return;O();const F=i.shift();if(F===void 0){if(b.length){d=setTimeout(()=>{O(),l==="pending"&&(z(),B())},e.timeout);return}B();return}const X={status:"pending",resource:F,callback:(H,T)=>{E(X,H,T)}};b.push(X),u++,d=setTimeout(W,e.rotate),n(F,t,X.callback)}return setTimeout(W),K}function zi(e){const t={...bu,...e};let n=[];function o(){n=n.filter(a=>a().status==="pending")}function s(a,l,u){const c=hu(t,a,l,(d,b)=>{o(),u&&u(d,b)});return n.push(c),c}function r(a){return n.find(l=>a(l))||null}return{query:s,find:r,setIndex:a=>{t.index=a},getIndex:()=>t.index,cleanup:o}}function or(){}const vo=Object.create(null);function xu(e){if(!vo[e]){const t=as(e);if(!t)return;const n=zi(t),o={config:t,redundancy:n};vo[e]=o}return vo[e]}function gu(e,t,n){let o,s;if(typeof e=="string"){const r=jo(e);if(!r)return n(void 0,424),or;s=r.send;const i=xu(e);i&&(o=i.redundancy)}else{const r=rs(e);if(r){o=zi(r);const i=e.resources?e.resources[0]:"",a=jo(i);a&&(s=a.send)}}return!o||!s?(n(void 0,424),or):o.query(t,s,n)().abort}function sr(){}function mu(e){e.iconsLoaderFlag||(e.iconsLoaderFlag=!0,setTimeout(()=>{e.iconsLoaderFlag=!1,uu(e)}))}function yu(e){const t=[],n=[];return e.forEach(o=>{(o.match(Di)?t:n).push(o)}),{valid:t,invalid:n}}function Gt(e,t,n){function o(){const s=e.pendingIcons;t.forEach(r=>{s&&s.delete(r),e.icons[r]||e.missing.add(r)})}if(n&&typeof n=="object")try{if(!ji(e,n).length){o();return}}catch(s){console.error(s)}o(),mu(e)}function rr(e,t){e instanceof Promise?e.then(n=>{t(n)}).catch(()=>{t(null)}):t(e)}function vu(e,t){e.iconsToLoad?e.iconsToLoad=e.iconsToLoad.concat(t).sort():e.iconsToLoad=t,e.iconsQueueFlag||(e.iconsQueueFlag=!0,setTimeout(()=>{e.iconsQueueFlag=!1;const{provider:n,prefix:o}=e,s=e.iconsToLoad;if(delete e.iconsToLoad,!s||!s.length)return;const r=e.loadIcon;if(e.loadIcons&&(s.length>1||!r)){rr(e.loadIcons(s,o,n),c=>{Gt(e,s,c)});return}if(r){s.forEach(c=>{const d=r(c,o,n);rr(d,b=>{const g=b?{prefix:o,icons:{[c]:b}}:null;Gt(e,[c],g)})});return}const{valid:i,invalid:a}=yu(s);if(a.length&&Gt(e,a,null),!i.length)return;const l=o.match(Di)?jo(n):null;if(!l){Gt(e,i,null);return}l.prepare(n,o,i).forEach(c=>{gu(n,c,d=>{Gt(e,c.icons,d)})})}))}const wu=(e,t)=>{const n=pu(e,!0,Bi()),o=cu(n);if(!o.pending.length){let l=!0;return t&&setTimeout(()=>{l&&t(o.loaded,o.missing,o.pending,sr)}),()=>{l=!1}}const s=Object.create(null),r=[];let i,a;return o.pending.forEach(l=>{const{provider:u,prefix:c}=l;if(c===a&&u===i)return;i=u,a=c,r.push(Ft(u,c));const d=s[u]||(s[u]=Object.create(null));d[c]||(d[c]=[])}),o.pending.forEach(l=>{const{provider:u,prefix:c,name:d}=l,b=Ft(u,c),g=b.pendingIcons||(b.pendingIcons=new Set);g.has(d)||(g.add(d),s[u][c].push(d))}),r.forEach(l=>{const u=s[l.provider][l.prefix];u.length&&vu(l,u)}),t?du(t,o,r):sr};function Su(e,t){const n={...e};for(const o in t){const s=t[o],r=typeof s;o in Fi?(s===null||s&&(r==="string"||r==="number"))&&(n[o]=s):r===typeof n[o]&&(n[o]=o==="rotate"?s%4:s)}return n}const _u=/[\s,]+/;function Cu(e,t){t.split(_u).forEach(n=>{switch(n.trim()){case"horizontal":e.hFlip=!0;break;case"vertical":e.vFlip=!0;break}})}function ku(e,t=0){const n=e.replace(/^-?[0-9.]*/,"");function o(s){for(;s<0;)s+=4;return s%4}if(n===""){const s=parseInt(e);return isNaN(s)?0:o(s)}else if(n!==e){let s=0;switch(n){case"%":s=25;break;case"deg":s=90}if(s){let r=parseFloat(e.slice(0,e.length-n.length));return isNaN(r)?0:(r=r/s,r%1===0?o(r):0)}}return t}function Tu(e,t){let n=e.indexOf("xlink:")===-1?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const o in t)n+=" "+o+'="'+t[o]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+n+">"+e+"</svg>"}function Pu(e){return e.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ")}function Au(e){return"data:image/svg+xml,"+Pu(e)}function Eu(e){return'url("'+Au(e)+'")'}const ir={...Hi,inline:!1},Iu={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","aria-hidden":!0,role:"img"},Ou={display:"inline-block"},Bo={backgroundColor:"currentColor"},Ui={backgroundColor:"transparent"},ar={Image:"var(--svg)",Repeat:"no-repeat",Size:"100% 100%"},lr={webkitMask:Bo,mask:Bo,background:Ui};for(const e in lr){const t=lr[e];for(const n in ar)t[e+n]=ar[n]}const En={};["horizontal","vertical"].forEach(e=>{const t=e.slice(0,1)+"Flip";En[e+"-flip"]=t,En[e.slice(0,1)+"-flip"]=t,En[e+"Flip"]=t});function cr(e){return e+(e.match(/^[-0-9.]+$/)?"px":"")}const ur=(e,t)=>{const n=Su(ir,t),o={...Iu},s=t.mode||"svg",r={},i=t.style,a=typeof i=="object"&&!(i instanceof Array)?i:{};for(let k in t){const A=t[k];if(A!==void 0)switch(k){case"icon":case"style":case"onLoad":case"mode":case"ssr":break;case"inline":case"hFlip":case"vFlip":n[k]=A===!0||A==="true"||A===1;break;case"flip":typeof A=="string"&&Cu(n,A);break;case"color":r.color=A;break;case"rotate":typeof A=="string"?n[k]=ku(A):typeof A=="number"&&(n[k]=A);break;case"ariaHidden":case"aria-hidden":A!==!0&&A!=="true"&&delete o["aria-hidden"];break;default:{const K=En[k];K?(A===!0||A==="true"||A===1)&&(n[K]=!0):ir[k]===void 0&&(o[k]=A)}}}const l=Jc(e,n),u=l.attributes;if(n.inline&&(r.verticalAlign="-0.125em"),s==="svg"){o.style={...r,...a},Object.assign(o,u);let k=0,A=t.id;return typeof A=="string"&&(A=A.replace(/-/g,"_")),o.innerHTML=Zc(l.body,A?()=>A+"ID"+k++:"iconifyVue"),Lo("svg",o)}const{body:c,width:d,height:b}=e,g=s==="mask"||(s==="bg"?!1:c.indexOf("currentColor")!==-1),O=Tu(c,{...u,width:d+"",height:b+""});return o.style={...r,"--svg":Eu(O),width:cr(u.width),height:cr(u.height),...Ou,...g?Bo:Ui,...a},Lo("span",o)};Bi(!0);eu("",lu);if(typeof document<"u"&&typeof window<"u"){const e=window;if(e.IconifyPreload!==void 0){const t=e.IconifyPreload,n="Invalid IconifyPreload syntax.";typeof t=="object"&&t!==null&&(t instanceof Array?t:[t]).forEach(o=>{try{(typeof o!="object"||o===null||o instanceof Array||typeof o.icons!="object"||typeof o.prefix!="string"||!Vc(o))&&console.error(n)}catch{console.error(n)}})}if(e.IconifyProviders!==void 0){const t=e.IconifyProviders;if(typeof t=="object"&&t!==null)for(let n in t){const o="IconifyProviders["+n+"] is invalid.";try{const s=t[n];if(typeof s!="object"||!s||s.resources===void 0)continue;tu(n,s)||console.error(o)}catch{console.error(o)}}}}const Lu={...no,body:""},ue=Le((e,{emit:t})=>{const n=Te(null);function o(){n.value&&(n.value.abort?.(),n.value=null)}const s=Te(!!e.ssr),r=Te(""),i=Ia(null);function a(){const u=e.icon;if(typeof u=="object"&&u!==null&&typeof u.body=="string")return r.value="",{data:u};let c;if(typeof u!="string"||(c=to(u,!1,!0))===null)return null;let d=Fc(c);if(!d){const O=n.value;return(!O||O.name!==u)&&(d===null?n.value={name:u}:n.value={name:u,abort:wu([c],l)}),null}o(),r.value!==u&&(r.value=u,Qo(()=>{t("load",u)}));const b=e.customise;if(b){d=Object.assign({},d);const O=b(d.body,c.name,c.prefix,c.provider);typeof O=="string"&&(d.body=O)}const g=["iconify"];return c.prefix!==""&&g.push("iconify--"+c.prefix),c.provider!==""&&g.push("iconify--"+c.provider),{data:d,classes:g}}function l(){const u=a();u?u.data!==i.value?.data&&(i.value=u):i.value=null}return s.value?l():Qn(()=>{s.value=!0,l()}),ht(()=>e.icon,l),Zo(o),()=>{const u=i.value;if(!u)return ur(Lu,e);let c=e;return u.classes&&(c={...e,class:u.classes.join(" ")}),ur({...no,...u.data},c)}},{props:["icon","mode","ssr","width","height","style","color","inline","rotate","hFlip","horizontalFlip","vFlip","verticalFlip","flip","id","ariaHidden","customise","title"],emits:["load"]}),$u={class:"bg-base-200"},Du={class:"navbar"},Mu={class:"navbar-end"},Ru={href:"https://github.com/jkuzela-boxcast"},Nu=Le({__name:"AppHeader",setup(e){return(t,n)=>(L(),V("header",$u,[$("nav",Du,[n[0]||(n[0]=$("div",{class:"navbar-start"},[$("h1",{class:"text-2xl font-bold"},"Web Player Customizer")],-1)),$("div",Mu,[$("a",Ru,[Y(M(ue),{icon:"mdi:github",class:"size-8"})])])])]))}}),ju=`/*
 * BoxCast Player add-on: Consolidated Sidebar
 *
 * Shows the player's right-hand column (Playlist, Documents, Highlights, Chat) one panel at a time,
 * with tabs along the bottom, and keeps the column the same height as the player + description.
 * Tabs only appear for the panels the current broadcast actually has.
 *
 * Include this anywhere on the page, before or after the BoxCast player script. The player renders
 * asynchronously and re-renders when switching broadcasts, so this watches the page and re-applies
 * itself whenever the player's markup appears or changes.
 *
 * It never moves the player's own elements; it only adds a tab bar and some classes/attributes,
 * and hides inactive panels with CSS.
 */
;(function () {
  var NAME = 'consolidated-sidebar'
  var addons = (window.BoxcastAddons = window.BoxcastAddons || {})
  if (addons[NAME]) return // already loaded

  var COLUMN = '.boxcast-with-playlist-to-right-col-2'
  var STYLE_ID = 'boxcast-addon-' + NAME

  // Tab order and labels
  var TABS = [
    { key: 'playlist', label: 'Videos' },
    { key: 'documents', label: 'Documents' },
    { key: 'highlights', label: 'Highlights' },
    { key: 'chat', label: 'Chat' },
  ]

  // Height matching only applies when the column sits beside the player (md/lg player sizes).
  // Smaller sizes stack everything vertically, so panels keep their natural height there.
  var SIDE = ':is(.boxcast-size-md, .boxcast-size-lg) .bx-tabbed'
  var CSS = [
    '.bx-tabbed > [data-bx-panel]:not(.bx-active) { display: none !important; }',
    '.bx-tabbed .boxcast-chat--shell > .boxcast-well-title { display: none !important; }',
    '.bx-tabbed.bx-has-tabs > .bx-active, .bx-tabbed.bx-has-tabs > .bx-active > .boxcast-chat--shell { margin-bottom: 0 !important; }',

    // \`contain: size\` stops the column's content from setting the row height, so it stretches to
    // match the player + description column instead. The padding mirrors that column's padding.
    SIDE + ' { contain: size; display: flex !important; flex-direction: column !important; padding-bottom: 10px; }',
    SIDE +
      ' > .bx-active { flex: 1 1 0 !important; min-height: 0 !important; display: flex !important; flex-direction: column !important; }',
    SIDE +
      ' > .bx-active .boxcast-playlist-list { flex: 1 1 0 !important; min-height: 0 !important; overflow-y: auto !important; }',
    // Single document: fill the panel instead of a fixed square
    SIDE +
      ' > .bx-active .boxcast-playlist-list > div[style*="padding-top"] { padding-top: 0 !important; height: 100% !important; }',
    // Chat: fill the panel. The player gives these fixed pixel heights.
    SIDE +
      ' > .bx-active > .boxcast-chat--shell { flex: 1 1 0 !important; min-height: 0 !important; height: auto !important; display: flex !important; flex-direction: column !important; }',
    SIDE +
      ' > .bx-active > .boxcast-chat--shell > div:not(.boxcast-well-title) { flex: 1 1 0 !important; min-height: 0 !important; display: flex !important; flex-direction: column !important; }',
    SIDE +
      ' > .bx-active .boxcast-chat--msgcontainer, ' +
      SIDE +
      ' > .bx-active .boxcast-chat--msgcontainer-messages { flex: 1 1 0 !important; min-height: 0 !important; height: auto !important; }',

    // Tab bar: joins the bottom of the active panel like a footer
    '.bx-tabs { order: 99; display: flex; gap: 4px; padding: 4px; margin: 0 0 10px; border: 1px solid #bfbfbf; border-top: 0; background: #f5f5f5; }',
    '.bx-tabs .bx-tab { flex: 1; margin: 0; padding: 6px 8px; border: 0; border-radius: 4px; background: transparent; color: #555; font: inherit; font-size: 13px; font-weight: bold; cursor: pointer; }',
    '.bx-tabs .bx-tab:hover { background: rgba(0, 0, 0, 0.06); }',
    '.bx-tabs .bx-tab[aria-selected="true"] { background: #00a3bb; color: #fff; }',
  ].join('\\n')

  // Which panel is this child of the column? Relies on the player's markup:
  // - Chat is wrapped in .boxcast-chat
  // - Playlist and Documents/Index are both .boxcast-playlist.boxcast-well; only the Playlist
  //   wraps its heading in a div (\`.boxcast-well-title > div > h3\`)
  // - Highlights is a plain .boxcast-well
  function panelKey(el) {
    if (el.classList.contains('boxcast-chat')) return 'chat'
    if (!el.classList.contains('boxcast-well')) return null
    if (el.classList.contains('boxcast-playlist')) {
      return el.querySelector(':scope > .boxcast-well-title > div > h3') ? 'playlist' : 'documents'
    }
    return 'highlights'
  }

  function openChat(column) {
    var closedShell = column.querySelector('.boxcast-chat--shell.closed')
    var toggle = closedShell && closedShell.querySelector('.boxcast-chat--link')
    if (toggle) toggle.click()
  }

  function apply(column) {
    var panels = {}
    for (var i = 0; i < column.children.length; i++) {
      var child = column.children[i]
      var key = panelKey(child)
      if (!key) continue
      panels[key] = child
      if (child.getAttribute('data-bx-panel') !== key) child.setAttribute('data-bx-panel', key)
    }

    var tabs = TABS.filter(function (t) {
      return panels[t.key]
    })
    if (tabs.length === 0) return

    var active = column.getAttribute('data-bx-active')
    if (!panels[active]) active = tabs[0].key
    column.setAttribute('data-bx-active', active)
    column.classList.add('bx-tabbed')
    for (var key in panels) panels[key].classList.toggle('bx-active', key === active)

    // The player hides chat behind its own "Show Chat" toggle; open it when its tab is shown
    if (active === 'chat') openChat(column)

    var bar = column.querySelector(':scope > .bx-tabs')
    var signature = tabs
      .map(function (t) {
        return t.key
      })
      .join(',')

    if (tabs.length < 2) {
      if (bar) bar.remove()
      column.classList.remove('bx-has-tabs')
      return
    }

    // Rebuild buttons only when the set of panels changes (e.g. switching broadcasts)
    if (!bar || bar.getAttribute('data-bx-tabs') !== signature) {
      if (!bar) {
        bar = document.createElement('div')
        bar.className = 'bx-tabs'
        bar.setAttribute('role', 'tablist')
        bar.addEventListener('click', function (e) {
          var button = e.target.closest('.bx-tab')
          if (!button) return
          column.setAttribute('data-bx-active', button.getAttribute('data-bx-tab'))
          apply(column)
        })
        column.appendChild(bar)
      }
      bar.setAttribute('data-bx-tabs', signature)
      bar.innerHTML = tabs
        .map(function (t) {
          return '<button type="button" role="tab" class="bx-tab" data-bx-tab="' + t.key + '">' + t.label + '</button>'
        })
        .join('')
    }
    column.classList.add('bx-has-tabs')

    var buttons = bar.querySelectorAll('.bx-tab')
    for (var b = 0; b < buttons.length; b++) {
      buttons[b].setAttribute('aria-selected', String(buttons[b].getAttribute('data-bx-tab') === active))
    }
  }

  // Batch DOM changes into one pass per frame. Our own changes cause at most one extra pass,
  // since apply() only touches the DOM when something actually differs.
  var scheduled = false
  function scheduleApply() {
    if (scheduled) return
    scheduled = true
    requestAnimationFrame(function () {
      scheduled = false
      document.querySelectorAll(COLUMN).forEach(apply)
    })
  }

  var observer = new MutationObserver(scheduleApply)

  function start() {
    if (!document.getElementById(STYLE_ID)) {
      var style = document.createElement('style')
      style.id = STYLE_ID
      style.textContent = CSS
      document.head.appendChild(style)
    }
    observer.observe(document.body, { childList: true, subtree: true })
    scheduleApply()
  }

  if (document.body) start()
  else document.addEventListener('DOMContentLoaded', start)

  addons[NAME] = {
    // Undo everything (used by the customizer preview when the feature is switched off)
    destroy: function () {
      observer.disconnect()
      var style = document.getElementById(STYLE_ID)
      if (style) style.remove()
      document.querySelectorAll(COLUMN).forEach(function (column) {
        var bar = column.querySelector(':scope > .bx-tabs')
        if (bar) bar.remove()
        column.classList.remove('bx-tabbed', 'bx-has-tabs')
        column.removeAttribute('data-bx-active')
        column.querySelectorAll(':scope > [data-bx-panel]').forEach(function (panel) {
          panel.removeAttribute('data-bx-panel')
          panel.classList.remove('bx-active')
        })
      })
      delete addons[NAME]
    },
  }
})()
`,Bu=`/*
 * BoxCast Player add-on: Simplified Broadcast Date
 *
 * Changes the description box's date line from e.g. "Broadcasted 7/23/23 1:00pm - 7/23/23 1:03pm"
 * to just the start date and time: "7/23/23 1:00pm".
 *
 * Include this anywhere on the page, before or after the BoxCast player script. The player renders
 * asynchronously and re-renders when switching broadcasts, so this watches the page and re-applies
 * itself whenever the date line appears or changes.
 */
;(function () {
  var NAME = 'simplified-date'
  var addons = (window.BoxcastAddons = window.BoxcastAddons || {})
  if (addons[NAME]) return // already loaded

  var SELECTOR = 'p.boxcast-start-stop'

  // The player's (English) date lines; the first group is the start date/time.
  // The end part is optional because the player drops it when there's no end time.
  var PATTERNS = [
    /^Broadcasted (.+?)(?: - .*)?$/, // past
    /^Scheduled to broadcast (.+?)(?: - .*)?$/, // upcoming
    /^Broadcast started (.+?)(?: \\(ending .*\\))?$/, // live
  ]

  function startOf(text) {
    for (var i = 0; i < PATTERNS.length; i++) {
      var match = PATTERNS[i].exec(text.trim())
      if (match) return match[1]
    }
    return null // unrecognized text is left alone
  }

  function apply(el) {
    var text = el.textContent
    if (el.getAttribute('data-bx-simplified') === text) return // already simplified
    var start = startOf(text)
    if (!start) return
    // Keep the original so it can be restored. When the player renders a new line it replaces
    // this text, which the observer picks up and simplifies again.
    el.setAttribute('data-bx-original', text)
    el.setAttribute('data-bx-simplified', start)
    el.textContent = start
  }

  // Batch DOM changes into one pass per frame
  var scheduled = false
  function scheduleApply() {
    if (scheduled) return
    scheduled = true
    requestAnimationFrame(function () {
      scheduled = false
      document.querySelectorAll(SELECTOR).forEach(apply)
    })
  }

  var observer = new MutationObserver(scheduleApply)

  function start() {
    observer.observe(document.body, { childList: true, characterData: true, subtree: true })
    scheduleApply()
  }

  if (document.body) start()
  else document.addEventListener('DOMContentLoaded', start)

  addons[NAME] = {
    // Undo everything (used by the customizer preview when the option is switched off)
    destroy: function () {
      observer.disconnect()
      document.querySelectorAll(SELECTOR + '[data-bx-original]').forEach(function (el) {
        if (el.textContent === el.getAttribute('data-bx-simplified'))
          el.textContent = el.getAttribute('data-bx-original')
        el.removeAttribute('data-bx-original')
        el.removeAttribute('data-bx-simplified')
      })
      delete addons[NAME]
    },
  }
})()
`,Fu=`/*
 * BoxCast Player add-on: UI Overhaul (styles)
 *
 * Embedded into ui-overhaul.js by the customizer, so sites only include the script.
 * Everything is scoped to \`.boxcast-boxoffice.bxo\`; the script adds \`bxo\` to each player root.
 * \`!important\` is used where the player sets inline styles or more specific rules of its own.
 *
 * Colors and sizing are CSS variables, so a site can still adjust the theme, e.g.
 *   .boxcast-boxoffice.bxo { --bxo-accent: #7c3aed; }
 */

/* ---------- Theme ---------- */

.boxcast-boxoffice.bxo {
  --bxo-accent: #00a3bb;
  --bxo-on-accent: #ffffff;
  --bxo-live: #e5252a;
  --bxo-text: #0f0f0f;
  --bxo-muted: #606060;
  --bxo-surface: #f2f2f2;
  --bxo-panel: #ffffff;
  --bxo-border: #e5e5e5;
  --bxo-hover: rgba(0, 0, 0, 0.05);
  --bxo-radius: 12px;
  --bxo-font: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

  font-family: var(--bxo-font) !important;
  color: var(--bxo-text);
  line-height: 1.4;
}

.boxcast-boxoffice.bxo.boxcast-theme-dark {
  --bxo-text: #f1f1f1;
  --bxo-muted: #aaaaaa;
  --bxo-surface: #272727;
  --bxo-panel: #181818;
  --bxo-border: #333333;
  --bxo-hover: rgba(255, 255, 255, 0.08);
}

/* ---------- Layout ---------- */

/* md/lg: video + details on the left, sidebar card on the right (the player only uses flex at these sizes) */
.boxcast-boxoffice.bxo .boxcast-with-playlist-to-right {
  gap: 16px;
}

.boxcast-boxoffice.bxo .boxcast-with-playlist-to-right-col-1 {
  min-width: 0;
  padding: 0 !important;
}

.boxcast-boxoffice.bxo .boxcast-with-playlist-to-right-col-2 {
  box-sizing: border-box;
  display: flex !important;
  flex-direction: column;
  margin: 0 !important;
  overflow: hidden;
  border: 1px solid var(--bxo-border);
  border-radius: var(--bxo-radius);
  background: var(--bxo-panel);
}

.boxcast-boxoffice.bxo.boxcast-size-lg .boxcast-with-playlist-to-right-col-2 {
  flex: 0 0 400px;
  width: 400px !important;
}

.boxcast-boxoffice.bxo.boxcast-size-md .boxcast-with-playlist-to-right-col-2 {
  flex: 0 0 300px;
  width: 300px !important;
}

/* \`contain: size\` keeps the sidebar's content from setting the row height,
   so it stretches to match the video + details column instead */
.boxcast-boxoffice.bxo:is(.boxcast-size-md, .boxcast-size-lg) .boxcast-with-playlist-to-right-col-2 {
  contain: size;
}

/* xs/sm: everything stacks; the sidebar gets a fixed height so its panels scroll */
.boxcast-boxoffice.bxo:is(.boxcast-size-xs, .boxcast-size-sm) .boxcast-with-playlist-to-right-col-2 {
  height: 520px;
  margin-top: 16px !important;
}

/* ---------- Video ---------- */

.boxcast-boxoffice.bxo .boxcast-player-container {
  overflow: hidden;
  border-radius: var(--bxo-radius);
  background: #000;
}

.boxcast-boxoffice.bxo #boxcast-big-play-button {
  display: flex !important;
  align-items: center;
  justify-content: center;
  width: 72px !important;
  height: 72px !important;
  margin: auto !important;
  border: 0;
  border-radius: 50% !important;
  background: rgba(15, 15, 15, 0.6) !important;
  backdrop-filter: blur(6px);
  opacity: 1 !important;
  transition:
    background-color 0.15s,
    transform 0.15s;
}

.boxcast-boxoffice.bxo #boxcast-big-play-button:hover {
  background: var(--bxo-accent) !important;
  transform: scale(1.06);
}

.boxcast-boxoffice.bxo #boxcast-big-play-button svg {
  width: 30px !important;
  height: 30px !important;
  margin-left: 4px; /* optical centering of the triangle */
}

.boxcast-boxoffice.bxo .media-control-background {
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6)) !important;
}

.boxcast-boxoffice.bxo .media-control .bar-background {
  background-color: rgba(255, 255, 255, 0.2) !important;
}

.boxcast-boxoffice.bxo .media-control .bar-fill-1 {
  background-color: rgba(255, 255, 255, 0.4) !important;
}

/* The player sets the progress color inline */
.boxcast-boxoffice.bxo .media-control .bar-fill-2 {
  background-color: var(--bxo-accent) !important;
}

.boxcast-boxoffice.bxo .media-control .bar-scrubber-icon {
  background-color: var(--bxo-accent) !important;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25) !important;
}

/* ---------- Details (title, date, actions, description) ---------- */

/* A wrapping flex row; \`order\` sets the visual order:
   title / date + badge ... actions / description card / everything else / BoxCast link */
.boxcast-boxoffice.bxo .boxcast-with-playlist-to-right-col-1 > .boxcast-well {
  display: flex !important;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
  margin: 12px 0 0 !important;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: none !important;
  box-shadow: none !important;
  color: var(--bxo-text);
}

/* Spacer that pushes the action buttons to the right of the date row */
.boxcast-boxoffice.bxo .boxcast-with-playlist-to-right-col-1 > .boxcast-well::before {
  content: '';
  order: 4;
  flex: 1 1 0;
}

.boxcast-boxoffice.bxo .boxcast-with-playlist-to-right-col-1 > .boxcast-well > * {
  order: 20;
  flex-basis: 100%;
  margin: 0 !important;
}

.boxcast-boxoffice.bxo .boxcast-with-playlist-to-right-col-1 > .boxcast-well > span:empty {
  display: none;
}

.boxcast-boxoffice.bxo .boxcast-with-playlist-to-right-col-1 > .boxcast-well > .boxcast-title {
  order: 1;
  color: var(--bxo-text) !important;
  font-size: 20px !important;
  font-weight: 600 !important;
  line-height: 1.3 !important;
}

.boxcast-boxoffice.bxo .boxcast-with-playlist-to-right-col-1 > .boxcast-well > .boxcast-start-stop {
  order: 2;
  display: flex;
  flex-basis: auto;
  align-items: center;
  gap: 8px;
  color: var(--bxo-muted) !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  line-height: 1.4;
}

/* LIVE / UPCOMING chip; the script sets data-bxo-status */
.boxcast-boxoffice.bxo .boxcast-start-stop[data-bxo-status]::before {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 14px;
}

.boxcast-boxoffice.bxo .boxcast-start-stop[data-bxo-status='live']::before {
  content: 'LIVE';
  background: var(--bxo-live);
  color: #fff;
}

.boxcast-boxoffice.bxo .boxcast-start-stop[data-bxo-status='upcoming']::before {
  content: 'UPCOMING';
  background: var(--bxo-surface);
  color: var(--bxo-text);
}

/* Resolution badge */
.boxcast-boxoffice.bxo .boxcast-with-playlist-to-right-col-1 > .boxcast-well > aside {
  order: 3;
  flex-basis: auto;
}

.boxcast-boxoffice.bxo .boxcast-well > aside dl {
  display: flex;
  margin: 0;
}

.boxcast-boxoffice.bxo .boxcast-well > aside dd {
  margin: 0 !important;
  padding: 1px 6px !important;
  border: 1px solid var(--bxo-border);
  border-radius: 4px !important;
  background: none !important;
  color: var(--bxo-muted) !important;
  font-size: 11px !important;
  font-weight: 600;
  line-height: 16px;
}

/* Ticket / donate buttons */
.boxcast-boxoffice.bxo .boxcast-with-playlist-to-right-col-1 > .boxcast-well > .boxcast-ticket {
  order: 5;
  display: flex;
  flex-basis: auto;
  align-items: center;
  gap: 8px;
  color: var(--bxo-muted);
  font-size: 13px;
}

.boxcast-boxoffice.bxo .boxcast-ticket p {
  margin: 0;
}

.boxcast-boxoffice.bxo .boxcast-ticket-button {
  height: 36px;
  padding: 0 16px !important;
  border: 0 !important;
  border-radius: 18px !important;
  background: var(--bxo-surface) !important;
  color: var(--bxo-text) !important;
  font: 600 14px/36px var(--bxo-font) !important;
  cursor: pointer;
  transition: background-color 0.15s;
}

.boxcast-boxoffice.bxo .boxcast-ticket-button:hover {
  background: var(--bxo-border) !important;
}

/* Ticket purchase is the primary action. (Donate renders its button in the second span.) */
.boxcast-boxoffice.bxo .boxcast-ticket > span:first-child > .boxcast-ticket-button {
  background: var(--bxo-accent) !important;
  color: var(--bxo-on-accent) !important;
}

.boxcast-boxoffice.bxo .boxcast-ticket > span:first-child > .boxcast-ticket-button:hover {
  filter: brightness(1.08);
}

/* Description card. The script adds \`bxo-clampable\` when it's taller than 150px
   (keep in sync with COLLAPSED_HEIGHT in ui-overhaul.js) and toggles \`bxo-expanded\`. */
.boxcast-boxoffice.bxo .boxcast-with-playlist-to-right-col-1 > .boxcast-well > .boxcast-description {
  order: 6;
  box-sizing: border-box;
  margin-top: 4px !important;
  padding: 12px 14px !important;
  border-radius: var(--bxo-radius);
  background: var(--bxo-surface);
  color: var(--bxo-text) !important;
  font-size: 14px !important;
  line-height: 1.5 !important;
}

.boxcast-boxoffice.bxo .boxcast-description.bxo-empty {
  display: none !important;
}

.boxcast-boxoffice.bxo .boxcast-description * {
  font-size: inherit !important;
  line-height: inherit !important;
}

.boxcast-boxoffice.bxo .boxcast-description p {
  margin: 0 0 8px;
}

.boxcast-boxoffice.bxo .boxcast-description > :last-child {
  margin-bottom: 0;
}

.boxcast-boxoffice.bxo .boxcast-description ul,
.boxcast-boxoffice.bxo .boxcast-description ol {
  margin: 0 0 8px;
  padding-left: 22px;
}

.boxcast-boxoffice.bxo .boxcast-description ul {
  list-style: disc;
}

.boxcast-boxoffice.bxo .boxcast-description ol {
  list-style: decimal;
}

.boxcast-boxoffice.bxo .boxcast-description a {
  color: var(--bxo-accent) !important;
}

.boxcast-boxoffice.bxo .bxo-clampable:not(.bxo-expanded) > .boxcast-description {
  position: relative;
  max-height: 150px;
  overflow: hidden;
}

/* Fade out the clipped text behind the "Show more" button */
.boxcast-boxoffice.bxo .bxo-clampable:not(.bxo-expanded) > .boxcast-description::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 72px;
  background: linear-gradient(transparent, var(--bxo-surface) 65%);
}

.boxcast-boxoffice.bxo .bxo-expanded > .boxcast-description {
  padding-bottom: 44px !important;
}

/* "Show more" / "Show less", pulled up into the bottom of the description card */
.boxcast-boxoffice.bxo .boxcast-with-playlist-to-right-col-1 > .boxcast-well > .bxo-more {
  display: none;
  position: relative;
  order: 7;
  flex-basis: auto !important;
  height: 32px;
  margin: -44px 0 0 14px !important;
  padding: 0;
  border: 0;
  background: none;
  color: var(--bxo-text);
  font: 600 14px var(--bxo-font);
  cursor: pointer;
}

.boxcast-boxoffice.bxo .boxcast-with-playlist-to-right-col-1 > .boxcast-well.bxo-clampable > .bxo-more {
  display: inline-block;
}

.boxcast-boxoffice.bxo .boxcast-with-playlist-to-right-col-1 > .boxcast-well > .bxo-more:hover {
  text-decoration: underline;
}

.boxcast-boxoffice.bxo .boxcast-with-playlist-to-right-col-1 > .boxcast-well > .boxcast-linkback {
  order: 30;
  margin-top: 4px !important;
  color: var(--bxo-muted) !important;
  font-size: 12px !important;
  text-decoration: none;
}

/* ---------- Sidebar tabs ---------- */

/* Only the active panel is shown; the script marks panels with data-bxo-panel and \`bxo-active\` */
.boxcast-boxoffice.bxo .bxo-col > [data-bxo-panel]:not(.bxo-active) {
  display: none !important;
}

.boxcast-boxoffice.bxo .bxo-col > [data-bxo-panel] {
  flex: 1 1 0;
  min-height: 0;
}

.boxcast-boxoffice.bxo .bxo-tabs {
  display: flex;
  flex: none;
  order: -1;
  gap: 6px;
  padding: 10px;
  border-bottom: 1px solid var(--bxo-border);
}

.boxcast-boxoffice.bxo .bxo-tab {
  display: inline-flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 32px;
  margin: 0 !important;
  padding: 0 10px !important;
  border: 0;
  border-radius: 8px;
  background: var(--bxo-surface);
  color: var(--bxo-text);
  font: 600 13px var(--bxo-font) !important;
  cursor: pointer;
  transition: background-color 0.15s;
}

.boxcast-boxoffice.bxo .bxo-tab:hover {
  background: var(--bxo-border);
}

.boxcast-boxoffice.bxo .bxo-tab[aria-selected='true'] {
  background: var(--bxo-text);
  color: var(--bxo-panel);
}

/* Live dot on the Chat tab */
.boxcast-boxoffice.bxo .bxo-tab[data-bxo-live]::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--bxo-live);
}

/* Panels sit inside the sidebar card, so drop the player's own box styling */
.boxcast-boxoffice.bxo .bxo-col > .boxcast-well,
.boxcast-boxoffice.bxo .bxo-col .boxcast-chat--shell {
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: none !important;
  box-shadow: none !important;
}

/* ---------- Playlist panel ---------- */

.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] {
  display: flex;
  flex-direction: column;
}

.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] > .boxcast-well-title {
  margin: 0 !important;
  padding: 10px 10px 4px !important;
  border: 0 !important;
}

/* The tab already says "Videos"; keep only the search box (shown when there's more than one page) */
.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] > .boxcast-well-title > div:first-child,
.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] > .boxcast-well-title > br,
.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] > .boxcast-well-title:not(:has(.boxcast-playlist-search)) {
  display: none !important;
}

.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] > .boxcast-well-title > div {
  float: none !important;
}

.boxcast-boxoffice.bxo .boxcast-playlist-search,
.boxcast-boxoffice.bxo .boxcast-playlist-search > input {
  width: 100% !important;
}

.boxcast-boxoffice.bxo .boxcast-playlist-search > input {
  box-sizing: border-box;
  height: 36px !important;
  padding: 0 14px !important;
  border: 1px solid var(--bxo-border) !important;
  border-radius: 18px !important;
  outline: none;
  background: var(--bxo-panel) !important;
  color: var(--bxo-text) !important;
  font: 14px/34px var(--bxo-font) !important;
}

.boxcast-boxoffice.bxo .boxcast-playlist-search > input:focus {
  border-color: var(--bxo-accent) !important;
}

.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] .boxcast-playlist-list {
  flex: 1 1 0;
  min-height: 0;
  padding: 4px 6px 6px;
  overflow-y: auto;
}

.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] .boxcast-playlist-list ul {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Whole row is clickable (the script forwards clicks to the title link) */
.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] .boxcast-playlist-item {
  display: flex !important;
  align-items: flex-start;
  gap: 10px;
  height: auto !important;
  min-height: 0 !important;
  padding: 6px !important;
  border: 0 !important;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.15s;
}

.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] .boxcast-playlist-item:hover {
  background: var(--bxo-hover);
}

.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] .boxcast-playlist-item.boxcast-selected {
  background: var(--bxo-surface);
}

.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] .boxcast-preview-icon {
  flex: 0 0 42%;
  width: 42% !important;
  height: auto !important;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 8px;
  background: #000;
}

.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] .boxcast-preview-icon-preview {
  width: 100% !important;
  height: 100% !important;
}

.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] .boxcast-preview-duration {
  right: 4px !important;
  bottom: 4px !important;
  padding: 1px 4px !important;
  border-radius: 4px;
  font: 600 11px/16px var(--bxo-font) !important;
}

.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] .boxcast-preview-timeframe {
  position: absolute;
  top: 4px;
  left: 4px;
  padding: 1px 5px;
  border-radius: 4px;
  background: var(--bxo-live);
  color: #fff;
  font: 700 10px/14px var(--bxo-font);
  text-transform: uppercase;
}

.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] .boxcast-playlist-item-meta {
  display: flex !important;
  flex: 1 1 0;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  width: auto !important;
  padding: 0 !important;
}

.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] .boxcast-playlist-item-meta > h3 {
  display: -webkit-box;
  margin: 0 !important;
  overflow: hidden;
  font: 600 14px/1.35 var(--bxo-font) !important;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] .boxcast-playlist-item-meta > h3 a {
  color: var(--bxo-text) !important;
  text-decoration: none !important;
}

.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] .boxcast-selected .boxcast-playlist-item-meta > h3 a {
  color: var(--bxo-accent) !important;
}

/* Rows show title + date only; the description is hidden */
.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] .boxcast-playlist-item-meta > p:not(:last-of-type) {
  display: none;
}

.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] .boxcast-playlist-item-meta > p {
  margin: 0 !important;
  color: var(--bxo-muted) !important;
  font-size: 12px !important;
  line-height: 1.4 !important;
}

/* Pagination: "‹  Page 1 of 2  ›" */
.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] .boxcast-page-controls {
  display: flex !important;
  flex: none;
  align-items: center;
  justify-content: space-between;
  margin: 0 !important;
  padding: 8px 10px !important;
  border-top: 1px solid var(--bxo-border);
  background: none !important;
}

.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] .boxcast-page-controls > span {
  color: var(--bxo-muted) !important;
  font-size: 12px !important;
}

.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] .boxcast-page-controls > button {
  position: relative;
  flex: none;
  width: 32px !important;
  height: 32px;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 50%;
  background: var(--bxo-surface) !important;
  font-size: 0 !important;
  opacity: 1 !important;
  cursor: pointer;
}

.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] .boxcast-page-controls > button:hover:not(:disabled) {
  background: var(--bxo-border) !important;
}

.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] .boxcast-page-controls > button:disabled {
  opacity: 0.4 !important;
  cursor: default;
}

/* Chevron drawn with two borders */
.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] .boxcast-page-controls > button::before {
  content: '';
  position: absolute;
  inset: 0;
  width: 7px;
  height: 7px;
  margin: auto;
  border: solid var(--bxo-text);
  border-width: 2px 2px 0 0;
}

.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] .boxcast-page-controls > button:first-child::before {
  transform: translateX(2px) rotate(-135deg);
}

.boxcast-boxoffice.bxo [data-bxo-panel='playlist'] .boxcast-page-controls > button:last-child::before {
  transform: translateX(-2px) rotate(45deg);
}

/* ---------- Documents panel ---------- */

.boxcast-boxoffice.bxo [data-bxo-panel='documents'] {
  display: flex;
  flex-direction: column;
}

.boxcast-boxoffice.bxo [data-bxo-panel='documents'] > .boxcast-well-title {
  margin: 0 !important;
  padding: 12px !important;
  border: 0 !important;
  border-bottom: 1px solid var(--bxo-border) !important;
}

.boxcast-boxoffice.bxo [data-bxo-panel='documents'] > .boxcast-well-title h3 {
  margin: 0;
  overflow: hidden;
  color: var(--bxo-text) !important;
  font: 600 14px/1.4 var(--bxo-font) !important;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.boxcast-boxoffice.bxo [data-bxo-panel='documents'] .boxcast-playlist-list {
  flex: 1 1 0;
  min-height: 0;
  overflow-y: auto;
}

/* Single document: the viewer fills the panel instead of a fixed square */
.boxcast-boxoffice.bxo [data-bxo-panel='documents'] .boxcast-playlist-list > div[style*='padding-top'] {
  height: 100%;
  padding-top: 0 !important;
}

/* Several documents: a simple list of links */
.boxcast-boxoffice.bxo [data-bxo-panel='documents'] .boxcast-playlist-item {
  padding: 10px 12px !important;
  border: 0 !important;
  border-bottom: 1px solid var(--bxo-border) !important;
}

.boxcast-boxoffice.bxo [data-bxo-panel='documents'] .boxcast-playlist-item a {
  color: var(--bxo-text) !important;
  font: 500 14px var(--bxo-font) !important;
}

/* ---------- Highlights panel ---------- */

.boxcast-boxoffice.bxo [data-bxo-panel='highlights'] {
  padding: 12px !important;
  overflow-y: auto;
}

/* ---------- Chat panel ---------- */

.boxcast-boxoffice.bxo [data-bxo-panel='chat'] {
  display: flex;
  flex-direction: column;
}

.boxcast-boxoffice.bxo [data-bxo-panel='chat'] .boxcast-chat--shell {
  display: flex !important;
  flex: 1 1 0;
  flex-direction: column;
  min-height: 0;
  height: auto !important;
}

.boxcast-boxoffice.bxo [data-bxo-panel='chat'] .boxcast-chat--shell > .boxcast-well-title {
  display: none !important;
}

.boxcast-boxoffice.bxo [data-bxo-panel='chat'] .boxcast-chat--shell > div:not(.boxcast-well-title) {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  min-height: 0;
}

.boxcast-boxoffice.bxo [data-bxo-panel='chat'] .boxcast-chat--msgcontainer,
.boxcast-boxoffice.bxo [data-bxo-panel='chat'] .boxcast-chat--msgcontainer-messages {
  flex: 1 1 0;
  min-height: 0;
  height: auto !important;
  margin: 0 !important;
  background: none !important;
}

.boxcast-boxoffice.bxo [data-bxo-panel='chat'] .boxcast-chat--empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100% !important;
  color: var(--bxo-muted);
  font-size: 14px;
}

/* Compact, Twitch-style message rows: "Name  message text" */
.boxcast-boxoffice.bxo [data-bxo-panel='chat'] .boxcast-chat--msgcontainer li {
  padding: 4px 12px !important;
}

.boxcast-boxoffice.bxo [data-bxo-panel='chat'] .boxcast-chat--msgcontainer li:hover {
  background: var(--bxo-hover) !important;
}

.boxcast-boxoffice.bxo [data-bxo-panel='chat'] .boxcast-chat--msg {
  margin: 0 !important;
  padding: 0 !important;
  border-radius: 0 !important;
  background: none !important;
  box-shadow: none !important;
  color: var(--bxo-text);
  font-size: 13px !important;
  line-height: 1.45;
}

.boxcast-boxoffice.bxo [data-bxo-panel='chat'] .boxcast-chat--name,
.boxcast-boxoffice.bxo [data-bxo-panel='chat'] .boxcast-chat--msg strong {
  display: inline !important;
  margin-right: 6px !important;
  color: var(--bxo-accent);
  font-weight: 700;
}

.boxcast-boxoffice.bxo [data-bxo-panel='chat'] .boxcast-chat--text {
  display: inline !important;
}

.boxcast-boxoffice.bxo [data-bxo-panel='chat'] .boxcast-chat--inputcontainer {
  width: auto !important;
  height: auto !important;
  margin: 0 !important;
  padding: 10px 12px !important;
  border-top: 1px solid var(--bxo-border);
  background: none !important;
}

.boxcast-boxoffice.bxo [data-bxo-panel='chat'] .boxcast-chat--form input[type='text'] {
  box-sizing: border-box;
  width: 100%;
  height: 36px;
  padding: 0 14px;
  border: 1px solid var(--bxo-border);
  border-radius: 18px;
  outline: none;
  background: var(--bxo-surface);
  color: var(--bxo-text);
  font: 14px var(--bxo-font);
}

.boxcast-boxoffice.bxo [data-bxo-panel='chat'] .boxcast-chat--form input[type='text']:focus {
  border-color: var(--bxo-accent);
}

.boxcast-boxoffice.bxo [data-bxo-panel='chat'] .boxcast-chat--send button {
  height: 32px;
  padding: 0 14px !important;
  border: 0;
  border-radius: 16px;
  background: var(--bxo-accent);
  color: var(--bxo-on-accent);
  font: 600 13px var(--bxo-font) !important;
  cursor: pointer;
}
`,Hu=`/*
 * BoxCast Player add-on: UI Overhaul
 *
 * A complete redesign of the BoxCast player (layout "playlist-to-right"):
 * - Video and details on the left; a tabbed sidebar card (Videos / Documents / Highlights / Chat) on
 *   the right that matches their height. Narrow players stack everything.
 * - Details: large title, friendly date with LIVE / UPCOMING chip, resolution badge, pill-shaped
 *   ticket and donate buttons, and a description card with "Show more".
 * - Playlist rows: 16:9 thumbnails, two-line titles, dates; the whole row is clickable.
 * - Follows the player's light/dark theme. Colors are CSS variables (see the stylesheet below).
 *
 * Include this anywhere on the page, before or after the BoxCast player script. The player renders
 * asynchronously and re-renders when switching broadcasts, so this watches the page and re-applies
 * itself whenever the player's markup appears or changes. It never moves the player's own elements;
 * it adds a few elements, classes and attributes, and rewrites date text.
 */
;(function () {
  var NAME = 'ui-overhaul'
  var addons = (window.BoxcastAddons = window.BoxcastAddons || {})
  if (addons[NAME]) return // already loaded

  var STYLE_ID = 'boxcast-addon-' + NAME
  var CSS = __BXO_CSS__ // replaced with ui-overhaul.css when the customizer builds this script

  // Descriptions taller than this get collapsed behind "Show more" (matches the stylesheet)
  var COLLAPSED_HEIGHT = 150

  var TABS = [
    { key: 'playlist', label: 'Videos' },
    { key: 'documents', label: 'Documents' },
    { key: 'highlights', label: 'Highlights' },
    { key: 'chat', label: 'Chat' },
  ]

  // ---------- Dates ----------

  // The player's (English) date lines. The first group is the start date/time; the end part is
  // optional because the player drops it when there's no end time.
  var DATE_LINES = [
    { status: 'past', pattern: /^Broadcasted (.+?)(?: - .*)?$/ },
    { status: 'upcoming', pattern: /^Scheduled to broadcast (.+?)(?: - .*)?$/ },
    { status: 'live', pattern: /^Broadcast started (.+?)(?: \\(ending .*\\))?$/ },
  ]

  // "7/23/23 1:00pm" -> Date
  function parseClock(text) {
    var m = /^(\\d{1,2})\\/(\\d{1,2})\\/(\\d{2,4})\\s+(\\d{1,2}):(\\d{2})\\s*([ap]m)$/i.exec(text)
    if (!m) return null
    var year = Number(m[3]) < 100 ? 2000 + Number(m[3]) : Number(m[3])
    var hour = (Number(m[4]) % 12) + (m[6].toLowerCase() === 'pm' ? 12 : 0)
    return new Date(year, Number(m[1]) - 1, Number(m[2]), hour, Number(m[5]))
  }

  function parseDateLine(text) {
    for (var i = 0; i < DATE_LINES.length; i++) {
      var match = DATE_LINES[i].pattern.exec(text.trim())
      if (match) return { status: DATE_LINES[i].status, raw: match[1], start: parseClock(match[1]) }
    }
    return null
  }

  // Viewer's locale, e.g. "Jul 23, 2023" and "1:00 PM"
  function formatDay(d) {
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
  }
  function formatTime(d) {
    return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
  }

  // Details row: "Jul 23, 2023 · 1:00 PM", or "Started 1:00 PM" while live
  function formatDetailsDate(info) {
    if (!info.start) return info.raw
    if (info.status === 'live') return 'Started ' + formatTime(info.start)
    return formatDay(info.start) + ' · ' + formatTime(info.start)
  }

  // Playlist rows: "Jul 23, 2023", "Upcoming · Jul 23, 2023" or "Live now"
  function formatRowDate(info) {
    if (info.status === 'live') return 'Live now'
    var day = info.start ? formatDay(info.start) : info.raw
    return info.status === 'upcoming' ? 'Upcoming · ' + day : day
  }

  // Replace the player's date text, keeping the original so it can be restored. When the player
  // renders a new line it replaces this text, which the observer picks up and rewrites again.
  function rewriteDate(el, format) {
    var text = el.textContent
    if (el.getAttribute('data-bxo-text') === text) return
    var info = parseDateLine(text)
    if (!info) return
    var next = format(info)
    el.setAttribute('data-bxo-original', text)
    el.setAttribute('data-bxo-text', next)
    if (info.status === 'past') el.removeAttribute('data-bxo-status')
    else el.setAttribute('data-bxo-status', info.status)
    el.textContent = next
  }

  // ---------- Description "Show more" ----------

  function applyDescription(details) {
    var description = details.querySelector(':scope > .boxcast-description')
    var button = details.querySelector(':scope > .bxo-more')
    // The player renders an empty description element for broadcasts without one
    var empty = !!description && !description.textContent.trim() && !description.querySelector('img, iframe, video')
    if (description) description.classList.toggle('bxo-empty', empty)
    if (!description || empty) {
      if (button) button.remove()
      details.classList.remove('bxo-clampable', 'bxo-expanded')
      return
    }
    if (!button) {
      button = document.createElement('button')
      button.type = 'button'
      button.className = 'bxo-more'
      details.appendChild(button)
    }
    var expanded = details.classList.contains('bxo-expanded')
    // scrollHeight is the full content height even while collapsed
    details.classList.toggle('bxo-clampable', expanded || description.scrollHeight > COLLAPSED_HEIGHT + 1)
    var label = expanded ? 'Show less' : 'Show more'
    if (button.textContent !== label) button.textContent = label
    button.setAttribute('aria-expanded', String(expanded))
  }

  // ---------- Sidebar tabs ----------

  // Which panel is this child of the sidebar column? Relies on the player's markup:
  // - Chat is wrapped in .boxcast-chat
  // - Playlist and Documents/Index are both .boxcast-playlist.boxcast-well; only the Playlist
  //   wraps its heading in a div (\`.boxcast-well-title > div > h3\`)
  // - Highlights is a plain .boxcast-well
  function panelKey(el) {
    if (el.classList.contains('boxcast-chat')) return 'chat'
    if (!el.classList.contains('boxcast-well')) return null
    if (el.classList.contains('boxcast-playlist')) {
      return el.querySelector(':scope > .boxcast-well-title > div > h3') ? 'playlist' : 'documents'
    }
    return 'highlights'
  }

  function applyColumn(column, live) {
    var panels = {}
    for (var i = 0; i < column.children.length; i++) {
      var child = column.children[i]
      var key = panelKey(child)
      if (!key) continue
      panels[key] = child
      if (child.getAttribute('data-bxo-panel') !== key) child.setAttribute('data-bxo-panel', key)
    }

    var tabs = TABS.filter(function (t) {
      return panels[t.key]
    })
    column.classList.add('bxo-col')
    if (tabs.length === 0) return

    // Keep the viewer's choice; otherwise open chat for live broadcasts (like Twitch), else the first tab
    var active = column.getAttribute('data-bxo-tab')
    if (!panels[active]) active = live && panels.chat ? 'chat' : tabs[0].key
    for (var key in panels) panels[key].classList.toggle('bxo-active', key === active)

    // The player hides chat behind its own "Show Chat" toggle; open it when its tab is shown
    if (active === 'chat') {
      var closedShell = column.querySelector('.boxcast-chat--shell.closed')
      var toggle = closedShell && closedShell.querySelector('.boxcast-chat--link')
      if (toggle) toggle.click()
    }

    var bar = column.querySelector(':scope > .bxo-tabs')
    if (tabs.length < 2) {
      if (bar) bar.remove()
      return
    }

    // Rebuild buttons only when the set of panels changes (e.g. switching broadcasts)
    var signature = tabs
      .map(function (t) {
        return t.key
      })
      .join(',')
    if (!bar) {
      bar = document.createElement('div')
      bar.className = 'bxo-tabs'
      bar.setAttribute('role', 'tablist')
      column.appendChild(bar)
    }
    if (bar.getAttribute('data-bxo-tabs') !== signature) {
      bar.setAttribute('data-bxo-tabs', signature)
      bar.innerHTML = tabs
        .map(function (t) {
          return (
            '<button type="button" role="tab" class="bxo-tab" data-bxo-tab="' + t.key + '">' + t.label + '</button>'
          )
        })
        .join('')
    }

    var buttons = bar.querySelectorAll('.bxo-tab')
    for (var b = 0; b < buttons.length; b++) {
      var tabKey = buttons[b].getAttribute('data-bxo-tab')
      buttons[b].setAttribute('aria-selected', String(tabKey === active))
      buttons[b].toggleAttribute('data-bxo-live', tabKey === 'chat' && live)
    }
  }

  // ---------- Apply ----------

  function apply(root) {
    root.classList.add('bxo')

    var details = root.querySelector('.boxcast-with-playlist-to-right-col-1 > .boxcast-well')
    var dateLine = details && details.querySelector(':scope > .boxcast-start-stop')
    if (dateLine) rewriteDate(dateLine, formatDetailsDate)
    root.querySelectorAll('.boxcast-playlist-item-meta > p > span').forEach(function (el) {
      rewriteDate(el, formatRowDate)
    })
    if (details) applyDescription(details)

    var column = root.querySelector('.boxcast-with-playlist-to-right-col-2')
    var live = !!dateLine && dateLine.getAttribute('data-bxo-status') === 'live'
    if (column) applyColumn(column, live)
  }

  // Batch DOM changes into one pass per frame. Our own changes cause at most one extra pass,
  // since apply() only touches the DOM when something actually differs.
  var scheduled = false
  function scheduleApply() {
    if (scheduled) return
    scheduled = true
    requestAnimationFrame(function () {
      scheduled = false
      document.querySelectorAll('.boxcast-boxoffice').forEach(apply)
    })
  }

  // One delegated listener for tabs, "Show more" and playlist rows
  function onClick(e) {
    var target = e.target
    if (!(target instanceof Element) || !target.closest('.boxcast-boxoffice.bxo')) return

    var tab = target.closest('.bxo-tab')
    if (tab) {
      tab.closest('.bxo-col').setAttribute('data-bxo-tab', tab.getAttribute('data-bxo-tab'))
      return scheduleApply()
    }

    var more = target.closest('.bxo-more')
    if (more) {
      more.parentElement.classList.toggle('bxo-expanded')
      return scheduleApply()
    }

    // Playlist rows: the player only listens on the thumbnail and title link
    var row = target.closest('[data-bxo-panel="playlist"] .boxcast-playlist-item')
    if (row && !target.closest('a, button, input, .boxcast-preview-icon')) {
      var link = row.querySelector('h3 a')
      if (link) link.click()
    }
  }

  var observer = new MutationObserver(scheduleApply)

  function start() {
    if (!document.getElementById(STYLE_ID)) {
      var style = document.createElement('style')
      style.id = STYLE_ID
      style.textContent = CSS
      document.head.appendChild(style)
    }
    document.addEventListener('click', onClick)
    observer.observe(document.body, { childList: true, characterData: true, subtree: true })
    scheduleApply()
  }

  if (document.body) start()
  else document.addEventListener('DOMContentLoaded', start)

  addons[NAME] = {
    // Undo everything (used by the customizer preview when the feature is switched off)
    destroy: function () {
      observer.disconnect()
      document.removeEventListener('click', onClick)
      var style = document.getElementById(STYLE_ID)
      if (style) style.remove()

      document.querySelectorAll('[data-bxo-original]').forEach(function (el) {
        if (el.textContent === el.getAttribute('data-bxo-text')) el.textContent = el.getAttribute('data-bxo-original')
      })
      document.querySelectorAll('.bxo-tabs, .bxo-more').forEach(function (el) {
        el.remove()
      })
      var classes = ['bxo', 'bxo-col', 'bxo-active', 'bxo-clampable', 'bxo-expanded', 'bxo-empty']
      document.querySelectorAll('.' + classes.join(', .')).forEach(function (el) {
        el.classList.remove.apply(el.classList, classes)
      })
      var attributes = ['data-bxo-original', 'data-bxo-text', 'data-bxo-status', 'data-bxo-panel', 'data-bxo-tab']
      document.querySelectorAll('[' + attributes.join('], [') + ']').forEach(function (el) {
        attributes.forEach(function (a) {
          el.removeAttribute(a)
        })
      })
      delete addons[NAME]
    },
  }
})()
`,Bn=e=>!!(e.presetCss||e.addon),fr=[{label:"None",value:"none"},{label:"Solid",value:"solid"},{label:"Dashed",value:"dashed"},{label:"Dotted",value:"dotted"}],dr=[{label:"Normal",value:400},{label:"Bold",value:700}],Vu=Hu.replace("__BXO_CSS__",()=>"`\n"+Fu.replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/\$\{/g,"\\${")+"`"),je=".boxcast-playlist:has(> .boxcast-well-title > div > h3)",Lt=".boxcast-playlist:not(:has(> .boxcast-well-title > div > h3))",Se=".boxcast-with-playlist-to-right-col-1 > .boxcast-well",_n=".boxcast-ticket > span:first-child > button.boxcast-ticket-button",Cn=".boxcast-ticket > span:nth-child(2) > button.boxcast-ticket-button",Dt=[{id:"player",label:"Player",description:"The video player and its controls.",icon:"fluent:filmstrip-play-16-filled",subfeatures:[{id:"player-frame",label:"Frame",description:"The element containing the video player.",icon:"fluent:frame-16-regular",props:[{group:"Border",label:"Color",id:"player-frame-border-color",cssProperty:"border-color",cssSelector:".boxcast-player-container",input:{type:"color",default:"#000000"}},{group:"Border",label:"Thickness",id:"player-frame-border-width",cssProperty:"border-width",cssSelector:".boxcast-player-container",input:{type:"range",default:0,min:0,max:20,step:1}},{group:"Border",label:"Style",id:"player-frame-border-style",cssProperty:"border-style",cssSelector:".boxcast-player-container",input:{type:"select",default:"none",options:fr}},{group:"Border",label:"Radius",id:"player-frame-border-radius",cssProperty:"border-radius",cssSelector:".boxcast-player-container",input:{type:"radius",default:0,max:64,clip:!0}}]},{id:"player-controls",label:"Player Controls",description:"Seek bar and buttons shown while the video is active.",icon:"fluent:video-play-pause-20-filled",props:[{group:"Seek Bar",label:"Handle Color",id:"player-controls-scrubber-handle-color",cssProperty:"background-color",cssSelector:".bar-scrubber-icon",input:{type:"color",default:"#ffffff"}},{group:"Seek Bar",label:"Progress Color",id:"player-controls-scrubber-progress-color",cssProperty:"background-color",cssSelector:".bar-fill-2",input:{type:"color",default:"#ffffff"}},{group:"Seek Bar",label:"Buffered Color",id:"player-controls-scrubber-buffered-color",cssProperty:"background-color",cssSelector:".bar-fill-1",input:{type:"color",default:"#888888"}}]},{id:"player-play-button",label:"Initial Play Button",description:"Centered play button shown before playback starts.",icon:"fluent:play-circle-28-filled",props:[{group:"Button",label:"Color",id:"player-play-button-bg-color",cssProperty:"background-color",cssSelector:"#boxcast-big-play-button",input:{type:"color",default:"#000000"}},{group:"Button",label:"Width",id:"player-play-button-width",cssProperty:"width",cssSelector:"#boxcast-big-play-button",input:{type:"range",default:80,min:20,max:200,step:5}},{group:"Button",label:"Height",id:"player-play-button-height",cssProperty:"height",cssSelector:"#boxcast-big-play-button",input:{type:"range",default:80,min:20,max:200,step:5}},{group:"Icon",label:"Color",id:"player-play-button-icon-color",cssProperty:"fill",cssSelector:"#boxcast-big-play-button > svg > path",input:{type:"color",default:"#ffffff"}},{group:"Icon",label:"Width",id:"player-play-button-icon-width",cssProperty:"width",cssSelector:"#boxcast-big-play-button > svg",input:{type:"range",default:80,min:20,max:200,step:5}},{group:"Icon",label:"Height",id:"player-play-button-icon-height",cssProperty:"height",cssSelector:"#boxcast-big-play-button > svg",input:{type:"range",default:80,min:20,max:200,step:5}}]}]},{id:"description",label:"Description Box",description:"Broadcast details below the player.",icon:"fluent:text-description-16-filled",subfeatures:[{id:"description-frame",label:"Frame",description:"The box containing the broadcast details.",icon:"fluent:frame-16-regular",props:[{group:"Background",label:"Color",id:"description-frame-bg-color",cssProperty:"background-color",cssSelector:Se,input:{type:"color",default:"#ffffff"}},{group:"Border",label:"Color",id:"description-frame-border-color",cssProperty:"border-color",cssSelector:Se,input:{type:"color",default:"#dddddd"}},{group:"Border",label:"Thickness",id:"description-frame-border-width",cssProperty:"border-width",cssSelector:Se,input:{type:"range",default:0,min:0,max:20,step:1}},{group:"Border",label:"Style",id:"description-frame-border-style",cssProperty:"border-style",cssSelector:Se,input:{type:"select",default:"none",options:fr}},{group:"Border",label:"Radius",id:"description-frame-border-radius",cssProperty:"border-radius",cssSelector:Se,input:{type:"radius",default:0,max:64,clip:!0}}]},{id:"description-title",label:"Broadcast Title",description:"Name of the broadcast.",icon:"fluent:slide-text-title-16-filled",props:[{group:"Typography",label:"Color",id:"description-title-color",cssProperty:"color",cssSelector:"h1.boxcast-title",input:{type:"color",default:"#333333"}},{group:"Typography",label:"Size",id:"description-title-font-size",cssProperty:"font-size",cssSelector:"h1.boxcast-title",input:{type:"range",default:24,min:12,max:48,step:1}},{group:"Typography",label:"Weight",id:"description-title-font-weight",cssProperty:"font-weight",cssSelector:"h1.boxcast-title",input:{type:"select",default:400,options:dr}}]},{id:"description-text",label:"Description",description:"Description text of the broadcast.",icon:"fluent:subtitles-20-filled",props:[{group:"Typography",label:"Color",id:"description-text-color",cssProperty:"color",cssSelector:".boxcast-description",input:{type:"color",default:"#333333"}},{group:"Typography",label:"Link Color",id:"description-text-link-color",cssProperty:"color",cssSelector:".boxcast-description a",input:{type:"color",default:"#006c80"}},{group:"Typography",label:"Size",id:"description-text-font-size",cssProperty:"font-size",cssSelector:".boxcast-description, .boxcast-description > *",input:{type:"range",default:14,min:10,max:24,step:1}},{group:"Typography",label:"Weight",id:"description-text-font-weight",cssProperty:"font-weight",cssSelector:".boxcast-description",input:{type:"select",default:400,options:dr}}]},{id:"description-datetime",label:"Broadcast Date/Time",description:"Scheduled start and stop times.",icon:"fluent:clock-12-filled",options:[{id:"description-datetime-simplified",label:"Simplified Date",description:'Show only the start date and time, e.g. "7/23/23 1:00pm".',addon:{name:"simplified-date",js:Bu}}],props:[{group:"Typography",label:"Color",id:"description-datetime-color",cssProperty:"color",cssSelector:".boxcast-start-stop",input:{type:"color",default:"#333333"}},{group:"Typography",label:"Size",id:"description-datetime-font-size",cssProperty:"font-size",cssSelector:".boxcast-start-stop",input:{type:"range",default:12,min:10,max:20,step:1}}]},{id:"description-donate-button",label:"Donation Button",description:"Shown when donations are enabled.",icon:"fluent:heart-16-filled",props:[{group:"Appearance",label:"Background Color",id:"description-donate-button-bg-color",cssProperty:"background-color",cssSelector:Cn,input:{type:"color",default:"#ffffff"}},{group:"Appearance",label:"Border Color",id:"description-donate-button-border-color",cssProperty:"border-color",cssSelector:Cn,input:{type:"color",default:"#333333"}},{group:"Appearance",label:"Text Color",id:"description-donate-button-text-color",cssProperty:"color",cssSelector:Cn,input:{type:"color",default:"#333333"}},{group:"Appearance",label:"Corner Radius",id:"description-donate-button-border-radius",cssProperty:"border-radius",cssSelector:Cn,input:{type:"radius",default:4,max:24}}]},{id:"description-ticket-button",label:"Ticket Purchase Button",description:"Shown for ticketed broadcasts.",icon:"fluent:ticket-20-filled",props:[{group:"Appearance",label:"Background Color",id:"description-ticket-button-bg-color",cssProperty:"background-color",cssSelector:_n,input:{type:"color",default:"#ffffff"}},{group:"Appearance",label:"Border Color",id:"description-ticket-button-border-color",cssProperty:"border-color",cssSelector:_n,input:{type:"color",default:"#333333"}},{group:"Appearance",label:"Text Color",id:"description-ticket-button-text-color",cssProperty:"color",cssSelector:_n,input:{type:"color",default:"#333333"}},{group:"Appearance",label:"Corner Radius",id:"description-ticket-button-border-radius",cssProperty:"border-radius",cssSelector:_n,input:{type:"radius",default:4,max:24}}]},{id:"description-brand-link",label:"Brand Callback Button",description:'"Powered by BoxCast" link.',icon:"fluent:link-16-filled",props:[{group:"Typography",label:"Color",id:"description-brand-link-color",cssProperty:"color",cssSelector:"a.boxcast-linkback",input:{type:"color",default:"#aaaaaa"}},{group:"Typography",label:"Size",id:"description-brand-link-font-size",cssProperty:"font-size",cssSelector:"a.boxcast-linkback",input:{type:"range",default:10,min:8,max:20,step:1}}]}]},{id:"playlist",label:"Playlist",description:"Other broadcasts in the channel.",icon:"fluent:text-bullet-list-square-16-filled",subfeatures:[{id:"playlist-frame",label:"Frame",description:"The box containing the playlist.",icon:"fluent:frame-16-regular",props:[{group:"Background",label:"Color",id:"playlist-frame-bg-color",cssProperty:"background-color",cssSelector:je,input:{type:"color",default:"#ffffff"}},{group:"Border",label:"Color",id:"playlist-frame-border-color",cssProperty:"border-color",cssSelector:je,input:{type:"color",default:"#dddddd"}},{group:"Border",label:"Thickness",id:"playlist-frame-border-width",cssProperty:"border-width",cssSelector:je,input:{type:"range",default:1,min:0,max:20,step:1}},{group:"Border",label:"Radius",id:"playlist-frame-border-radius",cssProperty:"border-radius",cssSelector:je,input:{type:"radius",default:0,max:32,clip:!0}}]},{id:"playlist-header",label:"Header",description:"Playlist heading text and search input.",icon:"fluent:search-16-filled",props:[{group:"Heading",label:"Color",id:"playlist-header-heading-color",cssProperty:"color",cssSelector:`${je} > .boxcast-well-title h3`,input:{type:"color",default:"#333333"}},{group:"Heading",label:"Size",id:"playlist-header-heading-font-size",cssProperty:"font-size",cssSelector:`${je} > .boxcast-well-title h3`,input:{type:"range",default:18,min:8,max:32,step:1}},{group:"Search Input",label:"Background",id:"playlist-header-search-bg-color",cssProperty:"background-color",cssSelector:".boxcast-playlist-search > input",input:{type:"color",default:"#ffffff"}},{group:"Search Input",label:"Text",id:"playlist-header-search-text-color",cssProperty:"color",cssSelector:".boxcast-playlist-search > input",input:{type:"color",default:"#333333"}},{group:"Search Input",label:"Placeholder",id:"playlist-header-search-placeholder-color",cssProperty:"color",cssSelector:".boxcast-playlist-search > input::placeholder",input:{type:"color",default:"#999999"}},{group:"Search Input",label:"Border Color",id:"playlist-header-search-border-color",cssProperty:"border-color",cssSelector:".boxcast-playlist-search > input",input:{type:"color",default:"#cccccc"}},{group:"Search Input",label:"Border Thickness",id:"playlist-header-search-border-width",cssProperty:"border-width",cssSelector:".boxcast-playlist-search > input",input:{type:"range",default:1,min:0,max:8,step:1}},{group:"Search Input",label:"Corner Radius",id:"playlist-header-search-border-radius",cssProperty:"border-radius",cssSelector:".boxcast-playlist-search > input",input:{type:"radius",default:12,max:32}},{group:"Search Input",label:"Width",id:"playlist-header-search-width",cssProperty:"width",cssSelector:".boxcast-playlist-search > input",input:{type:"range",default:130,min:0,max:280,step:10}},{group:"Search Input",label:"Height",id:"playlist-header-search-height",cssProperty:"height",cssSelector:".boxcast-playlist-search > input",input:{type:"range",default:28,min:28,max:64,step:4}},{group:"Search Input",label:"Font Size",id:"playlist-header-search-font-size",cssProperty:"font-size",cssSelector:".boxcast-playlist-search > input",input:{type:"range",default:16,min:8,max:32,step:1}}]},{id:"playlist-videos",label:"Video List",description:"Rows with each broadcast thumbnail, title, description and air date.",icon:"fluent:list-16-filled",props:[{group:"Color",label:"Title",id:"playlist-videos-title-color",cssProperty:"color",cssSelector:".boxcast-playlist-item-meta > h3, .boxcast-playlist-item-meta > h3 > a",input:{type:"color",default:"#333333"}},{group:"Color",label:"Description",id:"playlist-videos-description-color",cssProperty:"color",cssSelector:".boxcast-playlist-item-meta > p:nth-of-type(1)",input:{type:"color",default:"#333333"}},{group:"Color",label:"Air Date",id:"playlist-videos-datetime-color",cssProperty:"color",cssSelector:".boxcast-playlist-item-meta > p:nth-of-type(2)",input:{type:"color",default:"#333333"}}]},{id:"playlist-footer",label:"Footer",description:"Pagination controls.",icon:"fluent:arrow-next-12-filled",props:[{group:"Color",label:"Background",id:"playlist-footer-bg-color",cssProperty:"background-color",cssSelector:".boxcast-page-controls",input:{type:"color",default:"#ffffff"}},{group:"Color",label:"Page Label",id:"playlist-footer-label-color",cssProperty:"color",cssSelector:".boxcast-page-controls > span",input:{type:"color",default:"#333333"}},{group:"Color",label:"Button Background",id:"playlist-footer-button-bg-color",cssProperty:"background-color",cssSelector:".boxcast-page-controls > button",input:{type:"color",default:"#ffffff"}},{group:"Color",label:"Button Text",id:"playlist-footer-button-text-color",cssProperty:"color",cssSelector:".boxcast-page-controls > button",input:{type:"color",default:"#333333"}}]}]},{id:"documents",label:"Document Box",description:"PDF viewer for documents attached to the broadcast.",icon:"fluent:document-pdf-16-filled",renderNote:"Only rendered when the playing broadcast has documents attached.",subfeatures:[{id:"documents-frame",label:"Frame",description:"The box around the PDF viewer. The PDF itself cannot be styled.",icon:"fluent:frame-16-regular",props:[{group:"Background",label:"Color",id:"documents-frame-bg-color",cssProperty:"background-color",cssSelector:Lt,input:{type:"color",default:"#ffffff"}},{group:"Border",label:"Color",id:"documents-frame-border-color",cssProperty:"border-color",cssSelector:Lt,input:{type:"color",default:"#dddddd"}},{group:"Border",label:"Thickness",id:"documents-frame-border-width",cssProperty:"border-width",cssSelector:Lt,input:{type:"range",default:1,min:0,max:20,step:1}},{group:"Border",label:"Radius",id:"documents-frame-border-radius",cssProperty:"border-radius",cssSelector:Lt,input:{type:"radius",default:0,max:32,clip:!0}}]},{id:"documents-title",label:"File Name",description:"Document file name shown above the viewer.",icon:"fluent:text-16-filled",props:[{group:"Typography",label:"Color",id:"documents-title-color",cssProperty:"color",cssSelector:`${Lt} > .boxcast-well-title h3`,input:{type:"color",default:"#333333"}},{group:"Typography",label:"Size",id:"documents-title-font-size",cssProperty:"font-size",cssSelector:`${Lt} > .boxcast-well-title h3`,input:{type:"range",default:18,min:8,max:32,step:1}}]}]},{id:"chat",label:"Chat Box",description:"Viewer chat for the broadcast.",icon:"fluent:people-chat-20-filled",renderNote:"Only rendered when Viewer Chat is enabled for the playing broadcast.",subfeatures:[{id:"chat-frame",label:"Frame",description:'The chat box and its "Chat" header.',icon:"fluent:frame-16-regular",props:[{group:"Background",label:"Color",id:"chat-frame-bg-color",cssProperty:"background-color",cssSelector:".boxcast-chat--shell, .boxcast-chat--msgcontainer",input:{type:"color",default:"#ffffff"}},{group:"Border",label:"Color",id:"chat-frame-border-color",cssProperty:"border-color",cssSelector:".boxcast-chat--shell",input:{type:"color",default:"#dddddd"}},{group:"Border",label:"Thickness",id:"chat-frame-border-width",cssProperty:"border-width",cssSelector:".boxcast-chat--shell",input:{type:"range",default:1,min:0,max:16,step:1}},{group:"Border",label:"Radius",id:"chat-frame-border-radius",cssProperty:"border-radius",cssSelector:".boxcast-chat--shell",input:{type:"radius",default:0,max:32,clip:!0}},{group:"Header",label:"Text Color",id:"chat-frame-header-color",cssProperty:"color",cssSelector:".boxcast-chat--shell > .boxcast-well-title > h3",input:{type:"color",default:"#333333"}},{group:"Header",label:"Text Size",id:"chat-frame-header-font-size",cssProperty:"font-size",cssSelector:".boxcast-chat--shell > .boxcast-well-title > h3",input:{type:"range",default:18,min:8,max:32,step:1}}]},{id:"chat-messages",label:"Messages",description:"Chat message bubbles.",icon:"fluent:chat-16-filled",props:[{group:"Bubble",label:"Background",id:"chat-messages-bubble-bg-color",cssProperty:"background-color",cssSelector:".boxcast-chat--msgcontainer .boxcast-chat--msg",input:{type:"color",default:"#ffffff"}},{group:"Bubble",label:"Radius",id:"chat-messages-bubble-border-radius",cssProperty:"border-radius",cssSelector:".boxcast-chat--msgcontainer .boxcast-chat--msg",input:{type:"radius",default:4,max:24}},{group:"Text",label:"Name Color",id:"chat-messages-name-color",cssProperty:"color",cssSelector:".boxcast-chat--msg .boxcast-chat--name",input:{type:"color",default:"#333333"}},{group:"Text",label:"Message Color",id:"chat-messages-text-color",cssProperty:"color",cssSelector:".boxcast-chat--msg .boxcast-chat--text",input:{type:"color",default:"#333333"}}]},{id:"chat-input",label:"Message Input",description:"Field for viewers to type and send messages.",icon:"fluent:textbox-16-regular",props:[{group:"Container",label:"Background",id:"chat-input-container-bg-color",cssProperty:"background-color",cssSelector:".boxcast-chat--inputcontainer",input:{type:"color",default:"#fafafa"}},{group:"Text Field",label:"Background",id:"chat-input-field-bg-color",cssProperty:"background-color",cssSelector:".boxcast-chat--form input[type=text]",input:{type:"color",default:"#ffffff"}},{group:"Text Field",label:"Text Color",id:"chat-input-field-text-color",cssProperty:"color",cssSelector:".boxcast-chat--form input[type=text]",input:{type:"color",default:"#333333"}}]}]},{id:"experimental",label:"Experimental",description:"Layout changes that go beyond the default player design.",icon:"fluent:beaker-16-filled",subfeatures:[{id:"experimental-ui-overhaul",label:"UI Overhaul",description:"A complete modern redesign of the player: tabbed sidebar, refreshed details and playlist. Not further customizable.",icon:"fluent:sparkle-20-filled",exclusive:!0,addon:{name:"ui-overhaul",js:Vu},props:[]},{id:"experimental-description-layout",label:"New Description Layout",description:"YouTube-style order: title + resolution badge, date + buttons, description, then BoxCast link.",icon:"fluent:layout-row-three-20-filled",props:[],presetCss:`${Se} {
  display: flex !important;
  flex-wrap: wrap !important;
  align-items: center !important;
  column-gap: 10px !important;
}
${Se}::before {
  content: '' !important;
  order: 3 !important;
  flex-basis: 100% !important;
  height: 0 !important;
}
${Se} > * {
  order: 9 !important;
  margin: 0 !important;
}
${Se} > h1.boxcast-title {
  order: 1 !important;
}
${Se} > aside {
  order: 2 !important;
}
${Se} > aside dd {
  margin: 0 !important;
}
${Se} > .boxcast-start-stop {
  order: 4 !important;
  margin-top: 8px !important;
}
${Se} > .boxcast-ticket {
  order: 5 !important;
  margin-top: 8px !important;
}
${Se} > .boxcast-description {
  order: 7 !important;
  flex-basis: 100% !important;
  margin-top: 12px !important;
}
${Se} > .boxcast-linkback {
  order: 10 !important;
  flex-basis: 100% !important;
  margin-top: 12px !important;
}`},{id:"experimental-consolidated-sidebar",label:"Consolidated Sidebar",description:"Shows Playlist, Documents and Chat one at a time with tabs, matching the height of the player + description.",icon:"fluent:tab-desktop-20-filled",addon:{name:"consolidated-sidebar",js:ju},props:[{group:"Tab Bar",label:"Background",id:"experimental-consolidated-sidebar-bar-bg-color",cssProperty:"background-color",cssSelector:".bx-tabs",input:{type:"color",default:"#f5f5f5"}},{group:"Tab Bar",label:"Border Color",id:"experimental-consolidated-sidebar-bar-border-color",cssProperty:"border-color",cssSelector:".bx-tabs",input:{type:"color",default:"#bfbfbf"}},{group:"Tabs",label:"Text",id:"experimental-consolidated-sidebar-tab-text-color",cssProperty:"color",cssSelector:".bx-tabs .bx-tab",input:{type:"color",default:"#555555"}},{group:"Tabs",label:"Active Background",id:"experimental-consolidated-sidebar-active-bg-color",cssProperty:"background-color",cssSelector:'.bx-tabs .bx-tab[aria-selected="true"]',input:{type:"color",default:"#00a3bb"}},{group:"Tabs",label:"Active Text",id:"experimental-consolidated-sidebar-active-text-color",cssProperty:"color",cssSelector:'.bx-tabs .bx-tab[aria-selected="true"]',input:{type:"color",default:"#ffffff"}},{group:"Tabs",label:"Corner Radius",id:"experimental-consolidated-sidebar-tab-border-radius",cssProperty:"border-radius",cssSelector:".bx-tabs .bx-tab",input:{type:"radius",default:4,max:16}}]},{id:"experimental-zero-gaps",label:"Zero Gaps",description:"Removes the spacing between the player, description box, playlist, chat, etc.",icon:"fluent:arrow-minimize-20-filled",props:[],presetCss:`.boxcast-with-playlist-to-right-col-1 {
  padding: 0 !important;
}
.boxcast-with-playlist-to-right-col-2 {
  margin: 0 !important;
  padding: 0 !important;
}
.boxcast-boxoffice .boxcast-well,
.boxcast-boxoffice .bx-tabs {
  margin: 0 !important;
}`},{id:"experimental-playlist-header",label:"New Playlist Design",description:'Moves the search bar below the "Related Videos" heading, at full width.',icon:"fluent:text-bullet-list-square-search-20-filled",props:[],presetCss:`${je} > .boxcast-well-title {
  display: flex !important;
  flex-direction: column !important;
  gap: 8px !important;
}
${je} > .boxcast-well-title > div {
  float: none !important;
}
${je} > .boxcast-well-title > br {
  display: none !important;
}
${je} .boxcast-playlist-search,
${je} .boxcast-playlist-search > input {
  width: 100% !important;
}`}]}],pr=e=>Dt.flatMap(t=>t.subfeatures).find(t=>t.id===e)??null,zu=["width","height","border-radius","border-width","padding","margin","font-size"],Uu=(e,t)=>e.input.type==="toggle"?"hidden":Array.isArray(t)?t.map(n=>`${n}px`).join(" "):typeof t=="number"&&zu.some(n=>e.cssProperty.includes(n))?`${t}px`:String(t),gn=$c("ui",()=>{const e=Te(null),t=Te(null),n=he(()=>Dt.find(x=>x.id===e.value)??null),o=he(()=>pr(t.value)),s=x=>{e.value=x,t.value=null},r=Te({}),i=Te({}),a=x=>Object.keys(r.value[x]??{}).length>0,l=x=>x.subfeatures.some(D=>a(D.id)),u=(x,D,S)=>{r.value[x]??={},r.value[x][D]=S},c=(x,D,S)=>r.value[x]?.[D]??S,d=(x,D)=>{i.value[x]??={},i.value[x][D]=!i.value[x][D]},b=(x,D)=>i.value[x]?.[D]??!1,g=x=>{delete r.value[x],delete i.value[x]},O=x=>r.value[x]?.enabled===!0,k=(x,D)=>{if(D&&pr(x)?.exclusive){r.value={[x]:{enabled:!0}},i.value={};return}if(D)return u(x,"enabled",!0);const S=r.value[x];S&&(delete S.enabled,Object.keys(S).length===0&&g(x))},A=he(()=>Dt.flatMap(x=>x.subfeatures).filter(x=>Bn(x)&&O(x.id))),K=he(()=>A.value.find(x=>x.exclusive)??null),B=x=>!!K.value&&K.value.id!==x,z=x=>Object.keys(r.value).some(D=>D!==x),E=(x,D)=>r.value[x]?.[D]===!0,W=(x,D,S)=>{if(S)return u(x,D,!0);const J=r.value[x];J&&(delete J[D],Object.keys(J).length===0&&g(x))},F=he(()=>[...A.value.flatMap(x=>x.addon?[x.addon]:[]),...Dt.flatMap(x=>x.subfeatures).flatMap(x=>(x.options??[]).filter(D=>E(x.id,D.id)).map(D=>D.addon))]),X=he(()=>F.value.map(x=>x.js.trim()).join(`

`)),H=()=>{r.value={},i.value={}},T=he(()=>{const x=A.value.filter(J=>J.presetCss).map(J=>`/* ${J.label} */
${J.presetCss}
`),D=new Map;for(const J of Dt)for(const ce of J.subfeatures){const xe=r.value[ce.id];if(xe&&!(Bn(ce)&&!xe.enabled))for(const Q of ce.props){const q=xe[Q.id];if(q===void 0||Q.input.type==="toggle"&&!q)continue;D.has(Q.cssSelector)||D.set(Q.cssSelector,new Map),D.get(Q.cssSelector).set(Q.cssProperty,Uu(Q,q));const se=Array.isArray(q)?q.some(Xe=>Xe>0):Number(q)>0;Q.input.type==="radius"&&Q.input.clip&&se&&D.get(Q.cssSelector).set("overflow","hidden")}}const S=[...x];return D.forEach((J,ce)=>{S.push(`${ce} {`),J.forEach((xe,Q)=>S.push(`  ${Q}: ${xe} !important;`)),S.push("}","")}),S.join(`
`)});return{selectedGroupId:e,selectedSubfeatureId:t,selectedGroup:n,selectedSubfeature:o,openGroup:s,propertyChanges:r,aspectRatioLocks:i,hasChanges:a,groupHasChanges:l,updateProperty:u,getPropertyValue:c,toggleAspectRatioLock:d,isAspectRatioLocked:b,resetSubfeature:g,isPresetEnabled:O,setPresetEnabled:k,exclusiveSubfeature:K,isLocked:B,hasOtherChanges:z,isOptionEnabled:E,setOptionEnabled:W,enabledAddons:F,jsOutput:X,resetAll:H,cssOutput:T}}),Wu=["id"],wo="sb1fihbcionbdcymi7tp",br="boxcast-custom-styles",qu=Le({__name:"BoxcastPlayer",setup(e){const t=gn(),n={market:"internal",defaultVideo:"next",playInline:!1,dvr:!0,showTitle:!0,showDescription:!0,showHighlights:!0,showRelated:!0,showCountdown:!0,showDonations:!0,showDocuments:!0,showIndex:!0,showChat:!0,hidePreBroadcastTextOverlay:!1,layout:"playlist-to-right"};ht(()=>t.cssOutput,r=>{o(r)});const o=r=>{let i=document.getElementById(br);i||(i=document.createElement("style"),i.id=br,document.head.appendChild(i)),i.textContent=r},s=r=>{const i=window.BoxcastAddons??={},a=new Set(r.map(l=>l.name));for(const l of Object.keys(i))a.has(l)||i[l].destroy?.();for(const l of r){if(i[l.name])continue;const u=document.createElement("script");u.textContent=l.js,document.body.appendChild(u),u.remove()}};return ht(()=>t.enabledAddons,s),Qn(()=>{s(t.enabledAddons);const r=document.createElement("script");r.src="//js.boxcast.com/v3.min.js",r.onload=()=>{boxcast.noConflict()(`#boxcast-widget-${wo}`).loadChannel(wo,n)},document.body.appendChild(r),o(t.cssOutput)}),(r,i)=>(L(),V("div",{id:`boxcast-widget-${wo}`},null,8,Wu))}}),Ku=["title"],Gu={class:"border-base-300 flex h-12 shrink-0 items-center gap-2 border-b px-2"},Ju={class:"flex min-w-0 flex-1 items-center gap-2"},Yu={class:"truncate px-1 text-sm font-semibold"},Qu=["title"],Xu={class:"flex min-h-0 flex-1 flex-col"},Wi=Le({__name:"Sidebar",props:{side:{},label:{},icon:{},defaultWidth:{default:320},minWidth:{default:240},maxWidth:{default:640}},setup(e){const t=e,n=Te(t.defaultWidth),o=Te(!1),s=Te(!1),r=he(()=>t.side==="left"?"fluent:panel-left-contract-20-regular":"fluent:panel-right-contract-20-regular"),i=he(()=>t.side==="left"?"fluent:panel-left-expand-20-regular":"fluent:panel-right-expand-20-regular"),a=l=>{const u=l.currentTarget,c=l.clientX,d=n.value;u.setPointerCapture(l.pointerId),s.value=!0;const b=O=>{const k=t.side==="left"?O.clientX-c:c-O.clientX;n.value=Math.min(t.maxWidth,Math.max(t.minWidth,d+k))},g=()=>{s.value=!1,u.removeEventListener("pointermove",b),u.removeEventListener("pointerup",g),u.removeEventListener("pointercancel",g)};u.addEventListener("pointermove",b),u.addEventListener("pointerup",g),u.addEventListener("pointercancel",g)};return(l,u)=>o.value?(L(),V("aside",{key:0,class:De(["bg-base-100 border-base-300 flex w-12 shrink-0 flex-col items-center gap-3 py-3",e.side==="left"?"border-r":"border-l"])},[$("button",{class:"btn btn-ghost btn-sm btn-square",title:`Show ${e.label}`,onClick:u[0]||(u[0]=c=>o.value=!1)},[Y(M(ue),{icon:i.value,class:"size-5"},null,8,["icon"])],8,Ku),Y(M(ue),{icon:e.icon,class:"text-base-content/50 size-5"},null,8,["icon"])],2)):(L(),V("aside",{key:1,class:De(["bg-base-100 border-base-300 relative flex shrink-0 flex-col",[e.side==="left"?"border-r":"border-l",{"select-none":s.value}]]),style:Un({width:`${n.value}px`})},[$("header",Gu,[$("div",Ju,[ws(l.$slots,"header",{},()=>[$("span",Yu,le(e.label),1)])]),$("button",{class:De(["btn btn-ghost btn-sm btn-square",e.side==="right"?"order-first":""]),title:`Hide ${e.label}`,onClick:u[1]||(u[1]=c=>o.value=!0)},[Y(M(ue),{icon:r.value,class:"size-5"},null,8,["icon"])],10,Qu)]),$("div",Xu,[ws(l.$slots,"default")]),$("div",{class:De(["hover:bg-primary/40 absolute inset-y-0 z-10 w-1.5 cursor-col-resize transition-colors",[e.side==="left"?"-right-0.75":"-left-0.75",{"bg-primary/60":s.value}]]),onPointerdown:wc(a,["prevent"]),onDblclick:u[2]||(u[2]=c=>n.value=e.defaultWidth)},null,34)],6))}}),Zu={key:"group",class:"flex min-w-0 items-center gap-1"},ef={class:"truncate text-sm font-semibold"},tf={key:"root",class:"truncate px-1 text-sm font-semibold"},nf={class:"relative min-h-0 flex-1 overflow-x-hidden overflow-y-auto"},of={key:0,class:"text-base-content/60 mx-3 mt-3 flex gap-2 text-xs"},sf={class:"menu w-full gap-1"},rf=["disabled","onClick"],af={class:"flex min-w-0 flex-1 flex-col items-start"},lf={class:"font-medium"},cf={class:"line-clamp-1 text-xs opacity-60"},uf={key:1,class:"status status-primary",title:"Has changes"},ff={key:"root",class:"menu w-full gap-1"},df=["disabled","onClick"],pf={class:"flex min-w-0 flex-1 flex-col items-start"},bf={class:"font-semibold"},hf={class:"line-clamp-1 text-xs opacity-60"},xf={key:0,class:"status status-primary",title:"Has changes"},gf=Le({__name:"LeftSidebar",setup(e){const t=gn(),n=Te("forward"),o=i=>{n.value="forward",t.openGroup(i)},s=i=>!!t.exclusiveSubfeature&&!i.subfeatures.some(a=>a.id===t.exclusiveSubfeature.id),r=()=>{n.value="back",t.openGroup(null)};return(i,a)=>(L(),we(Wi,{side:"left",label:"Features",icon:"fluent:apps-list-20-regular","default-width":300},{header:Tt(()=>[Y(Ds,{mode:"out-in","enter-active-class":"transition-opacity duration-150","leave-active-class":"transition-opacity duration-150","enter-from-class":"opacity-0","leave-to-class":"opacity-0"},{default:Tt(()=>[M(t).selectedGroup?(L(),V("div",Zu,[$("button",{class:"btn btn-ghost btn-sm btn-square",title:"Back to all features",onClick:r},[Y(M(ue),{icon:"fluent:arrow-left-20-regular",class:"size-5"})]),$("span",ef,le(M(t).selectedGroup.label),1)])):(L(),V("span",tf," Features "))]),_:1})]),default:Tt(()=>[$("div",nf,[Y(Ds,{mode:"out-in","enter-active-class":"transition duration-200 ease-out","leave-active-class":"transition duration-150 ease-in","enter-from-class":n.value==="forward"?"translate-x-8 opacity-0":"-translate-x-8 opacity-0","leave-to-class":n.value==="forward"?"-translate-x-8 opacity-0":"translate-x-8 opacity-0"},{default:Tt(()=>[M(t).selectedGroup?(L(),V("div",{key:M(t).selectedGroup.id},[M(t).selectedGroup.renderNote?(L(),V("p",of,[Y(M(ue),{icon:"fluent:info-16-regular",class:"mt-px size-4 shrink-0"}),me(" "+le(M(t).selectedGroup.renderNote),1)])):Ie("",!0),$("ul",sf,[(L(!0),V(de,null,xt(M(t).selectedGroup.subfeatures,l=>(L(),V("li",{key:l.id},[$("button",{class:De(["flex items-center gap-3 py-2",{"menu-active":M(t).selectedSubfeatureId===l.id,"menu-disabled":M(t).isLocked(l.id)}]),disabled:M(t).isLocked(l.id),onClick:u=>M(t).selectedSubfeatureId=l.id},[Y(M(ue),{icon:l.icon,class:"size-5 shrink-0"},null,8,["icon"]),$("span",af,[$("span",lf,le(l.label),1),$("span",cf,le(l.description),1)]),M(t).isLocked(l.id)?(L(),we(M(ue),{key:0,icon:"fluent:lock-closed-16-regular",class:"size-4 shrink-0 opacity-60"})):M(t).hasChanges(l.id)?(L(),V("span",uf)):Ie("",!0)],10,rf)]))),128))])])):(L(),V("ul",ff,[(L(!0),V(de,null,xt(M(Dt),l=>(L(),V("li",{key:l.id},[$("button",{class:De(["group flex items-center gap-3 py-3",{"menu-disabled":s(l)}]),disabled:s(l),onClick:u=>o(l.id)},[Y(M(ue),{icon:l.icon,class:"text-primary size-6 shrink-0"},null,8,["icon"]),$("span",pf,[$("span",bf,le(l.label),1),$("span",hf,le(l.description),1)]),M(t).groupHasChanges(l)?(L(),V("span",xf)):Ie("",!0),s(l)?(L(),we(M(ue),{key:1,icon:"fluent:lock-closed-16-regular",class:"size-4 shrink-0 opacity-60"})):(L(),we(M(ue),{key:2,icon:"fluent:chevron-right-20-regular",class:"size-4 shrink-0 opacity-40 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100"}))],10,df)]))),128))]))]),_:1},8,["enter-from-class","leave-to-class"])])]),_:1}))}}),mf={class:"input input-sm w-full cursor-pointer"},yf=["value"],vf={class:"font-mono text-xs"},wf=Le({__name:"ColorInput",props:{modelValue:{}},emits:["update:modelValue"],setup(e,{emit:t}){const n=t,o=s=>n("update:modelValue",s.target.value);return(s,r)=>(L(),V("label",mf,[$("input",{value:e.modelValue,type:"color",class:"size-5 shrink-0 cursor-pointer rounded border-0 bg-transparent p-0",onInput:o},null,40,yf),$("span",vf,le(e.modelValue),1)]))}}),Sf={class:"flex items-center gap-3"},_f=["value","min","max","step"],Cf=["value","min","max","step"],qi=Le({__name:"RangeInput",props:{modelValue:{},min:{},max:{},step:{}},emits:["update:modelValue"],setup(e,{emit:t}){const n=t,o=s=>n("update:modelValue",parseFloat(s.target.value)||0);return(s,r)=>(L(),V("div",Sf,[$("input",{type:"range",value:e.modelValue,min:e.min,max:e.max,step:e.step,class:"range range-primary range-xs flex-1",onInput:o},null,40,_f),$("input",{type:"number",value:e.modelValue,min:e.min,max:e.max,step:e.step,class:"input input-sm w-18 font-mono text-xs",onChange:o},null,40,Cf)]))}}),kf={class:"flex items-start gap-2"},Tf={key:1,class:"grid flex-1 grid-cols-2 gap-2"},Pf=["title"],Af=["max","value","onInput"],Ef=["title"],If=Le({__name:"RadiusInput",props:{modelValue:{},max:{}},emits:["update:modelValue"],setup(e,{emit:t}){const n=e,o=t,s=he(()=>!Array.isArray(n.modelValue)),r=[{index:0,label:"Top left",rotate:"rotate-0"},{index:1,label:"Top right",rotate:"rotate-90"},{index:3,label:"Bottom left",rotate:"-rotate-90"},{index:2,label:"Bottom right",rotate:"rotate-180"}],i=()=>{const l=n.modelValue;o("update:modelValue",Array.isArray(l)?l[0]??0:[l,l,l,l])},a=(l,u)=>{const c=[...n.modelValue];c[l]=Math.min(n.max,Math.max(0,parseFloat(u.target.value)||0)),o("update:modelValue",c)};return(l,u)=>(L(),V("div",kf,[s.value?(L(),we(qi,{key:0,class:"flex-1","model-value":e.modelValue,min:0,max:e.max,step:1,"onUpdate:modelValue":u[0]||(u[0]=c=>o("update:modelValue",c))},null,8,["model-value","max"])):(L(),V("div",Tf,[(L(),V(de,null,xt(r,c=>$("label",{key:c.index,class:"input input-sm",title:c.label},[$("span",{class:De(["size-2.5 shrink-0 rounded-tl-[4px] border-t-2 border-l-2 border-current opacity-60",c.rotate])},null,2),$("input",{type:"number",min:"0",max:e.max,value:e.modelValue[c.index],class:"font-mono text-xs",onInput:d=>a(c.index,d)},null,40,Af)],8,Pf)),64))])),$("button",{class:De(["btn btn-ghost btn-sm btn-square",{"btn-active text-primary":!s.value}]),title:s.value?"Set corners individually":"Use one radius for all corners",onClick:i},[Y(M(ue),{icon:s.value?"fluent:link-20-regular":"fluent:link-dismiss-20-regular",class:"size-4"},null,8,["icon"])],10,Ef)]))}}),Of=["value"],Lf=["value"],$f=Le({__name:"SelectInput",props:{modelValue:{},options:{}},emits:["update:modelValue"],setup(e,{emit:t}){const n=t,o=s=>n("update:modelValue",s.target.value);return(s,r)=>(L(),V("select",{value:e.modelValue,class:"select select-sm w-full",onChange:o},[(L(!0),V(de,null,xt(e.options,i=>(L(),V("option",{key:i.value,value:i.value},le(i.label),9,Lf))),128))],40,Of))}}),Df={class:"label cursor-pointer gap-3 text-xs"},Mf=["checked"],Rf=Le({__name:"ToggleInput",props:{modelValue:{type:Boolean}},emits:["update:modelValue"],setup(e,{emit:t}){const n=t;return(o,s)=>(L(),V("label",Df,[$("input",{type:"checkbox",class:"toggle toggle-primary toggle-sm",checked:e.modelValue,onChange:s[0]||(s[0]=r=>n("update:modelValue",r.target.checked))},null,40,Mf),me(" "+le(e.modelValue?"Enabled":"Disabled"),1)]))}}),Nf={class:"flex flex-col gap-1.5"},jf={class:"flex items-center justify-between"},Bf={class:"label text-base-content text-xs font-medium"},Ff={key:0,class:"status status-primary status-xs",title:"Changed"},Hf=["title"],Vf=Le({__name:"PropertyInput",props:{prop:{},subfeatureId:{},allProps:{}},setup(e){const t=e,n=gn(),o=d=>n.getPropertyValue(t.subfeatureId,d.id,d.input.default),s=he(()=>o(t.prop)),r=he(()=>n.propertyChanges[t.subfeatureId]?.[t.prop.id]!==void 0),i=he(()=>{const d=t.prop.id;return t.prop.input.type!=="range"?null:d.endsWith("-width")?t.allProps.find(b=>b.id===d.replace(/-width$/,"-height"))??null:d.endsWith("-height")?t.allProps.find(b=>b.id===d.replace(/-height$/,"-width"))??null:null}),a=he(()=>!!i.value&&n.isAspectRatioLocked(t.subfeatureId,t.prop.id)),l=Te(1),u=d=>{n.updateProperty(t.subfeatureId,t.prop.id,d),a.value&&i.value&&typeof d=="number"&&n.updateProperty(t.subfeatureId,i.value.id,Math.round(d*l.value))},c=()=>{const d=i.value;d&&(a.value||(l.value=Number(o(d))/(Number(s.value)||1)),n.toggleAspectRatioLock(t.subfeatureId,t.prop.id),n.toggleAspectRatioLock(t.subfeatureId,d.id))};return(d,b)=>(L(),V("div",Nf,[$("div",jf,[$("label",Bf,[me(le(e.prop.label)+" ",1),r.value?(L(),V("span",Ff)):Ie("",!0)]),i.value?(L(),V("button",{key:0,class:De(["btn btn-ghost btn-xs btn-square",{"btn-active text-primary":a.value}]),title:a.value?"Aspect ratio locked":"Lock aspect ratio",onClick:c},[Y(M(ue),{icon:a.value?"fluent:lock-closed-16-regular":"fluent:lock-open-16-regular"},null,8,["icon"])],10,Hf)):Ie("",!0)]),e.prop.input.type==="color"?(L(),we(wf,{key:0,"model-value":String(s.value),"onUpdate:modelValue":u},null,8,["model-value"])):e.prop.input.type==="range"?(L(),we(qi,{key:1,"model-value":Number(s.value),min:e.prop.input.min,max:e.prop.input.max,step:e.prop.input.step,"onUpdate:modelValue":u},null,8,["model-value","min","max","step"])):e.prop.input.type==="radius"?(L(),we(If,{key:2,"model-value":s.value,max:e.prop.input.max,"onUpdate:modelValue":u},null,8,["model-value","max"])):e.prop.input.type==="select"?(L(),we($f,{key:3,"model-value":s.value,options:e.prop.input.options,"onUpdate:modelValue":u},null,8,["model-value","options"])):e.prop.input.type==="toggle"?(L(),we(Rf,{key:4,"model-value":!!s.value,"onUpdate:modelValue":u},null,8,["model-value"])):Ie("",!0)]))}}),zf={class:"flex flex-col"},Uf={class:"text-base-content/60 px-4 pt-3 text-xs"},Wf={key:0,class:"text-base-content/60 flex flex-col items-center gap-3 p-8 text-center text-sm"},qf={key:1,class:"flex flex-col gap-3 p-4"},Kf={class:"label text-base-content cursor-pointer justify-between text-sm font-medium"},Gf=["checked"],Jf={key:0,role:"alert",class:"alert alert-soft alert-warning px-3 py-2 text-xs"},Yf={key:1,role:"alert",class:"alert alert-soft alert-info px-3 py-2 text-xs"},Qf={key:2,class:"collapse-arrow bg-base-200 rounded-box collapse"},Xf={class:"collapse-content overflow-x-auto font-mono text-xs"},Zf={key:2,class:"text-base-content/50 flex flex-col items-center gap-3 p-8 text-sm"},ed={key:3,class:"fieldset border-base-300 gap-3 border-b px-4 py-3"},td=["checked","onChange"],nd={class:"flex flex-col gap-0.5"},od={class:"text-base-content flex items-center gap-1.5 text-xs font-medium"},sd={class:"text-base-content/60 text-xs"},rd=["disabled"],id={class:"fieldset-legend text-base-content/60 text-xs uppercase"},ad={key:4,class:"p-4"},ld=["disabled"],cd=Le({__name:"PropertiesPanel",props:{subfeature:{}},setup(e){const t=e,n=gn(),o=r=>{const i=r.target,a=t.subfeature.id;if(i.checked&&t.subfeature.exclusive&&n.hasOtherChanges(a)&&!window.confirm(`Enabling ${t.subfeature.label} resets all other customizations. Continue?`)){i.checked=!1;return}n.setPresetEnabled(a,i.checked)},s=he(()=>{const r={};for(const i of t.subfeature.props)(r[i.group]??=[]).push(i);return r});return(r,i)=>(L(),V("div",zf,[$("p",Uf,le(e.subfeature.description),1),M(n).isLocked(e.subfeature.id)?(L(),V("div",Wf,[Y(M(ue),{icon:"fluent:lock-closed-20-regular",class:"size-10"}),me(" Locked while "+le(M(n).exclusiveSubfeature?.label)+" is enabled. ",1)])):M(Bn)(e.subfeature)?(L(),V("div",qf,[$("label",Kf,[me(" Enable "+le(e.subfeature.label)+" ",1),$("input",{type:"checkbox",class:"toggle toggle-primary",checked:M(n).isPresetEnabled(e.subfeature.id),onChange:o},null,40,Gf)]),e.subfeature.exclusive?(L(),V("div",Jf,[Y(M(ue),{icon:"fluent:warning-16-filled",class:"size-5 shrink-0"}),i[1]||(i[1]=me(" Replaces the player's whole design. Enabling it resets all other customizations and locks them while it's on. ",-1))])):Ie("",!0),e.subfeature.addon?(L(),V("div",Yf,[Y(M(ue),{icon:"fluent:code-js-16-filled",class:"size-5 shrink-0"}),i[2]||(i[2]=me(" Needs an add-on script. When enabled, it's included in the JS tab of the generated output. ",-1))])):Ie("",!0),e.subfeature.presetCss?(L(),V("details",Qf,[i[3]||(i[3]=$("summary",{class:"collapse-title min-h-0 py-2 text-xs"},"CSS applied",-1)),$("pre",Xf,le(e.subfeature.presetCss),1)])):Ie("",!0)])):e.subfeature.props.length===0?(L(),V("div",Zf,[Y(M(ue),{icon:"fluent:wrench-settings-20-regular",class:"size-10"}),i[4]||(i[4]=me(" No style controls yet. ",-1))])):Ie("",!0),e.subfeature.options?.length&&!M(n).isLocked(e.subfeature.id)?(L(),V("fieldset",ed,[i[6]||(i[6]=$("legend",{class:"fieldset-legend text-base-content/60 text-xs uppercase"},"Options",-1)),(L(!0),V(de,null,xt(e.subfeature.options,a=>(L(),V("label",{key:a.id,class:"flex cursor-pointer items-start gap-3"},[$("input",{type:"checkbox",class:"toggle toggle-primary toggle-sm mt-0.5",checked:M(n).isOptionEnabled(e.subfeature.id,a.id),onChange:l=>M(n).setOptionEnabled(e.subfeature.id,a.id,l.target.checked)},null,40,td),$("span",nd,[$("span",od,[me(le(a.label)+" ",1),i[5]||(i[5]=$("span",{class:"badge badge-soft badge-info badge-xs",title:"Needs an add-on script, included in the JS tab of the generated output"}," JS ",-1))]),$("span",sd,le(a.description),1)])]))),128))])):Ie("",!0),(L(!0),V(de,null,xt(s.value,(a,l)=>(L(),V("fieldset",{key:l,class:"fieldset border-base-300 gap-3 border-b px-4 py-3",disabled:M(Bn)(e.subfeature)&&!M(n).isPresetEnabled(e.subfeature.id)||M(n).isLocked(e.subfeature.id)},[$("legend",id,le(l),1),(L(!0),V(de,null,xt(a,u=>(L(),we(Vf,{key:u.id,prop:u,"subfeature-id":e.subfeature.id,"all-props":e.subfeature.props},null,8,["prop","subfeature-id","all-props"]))),128))],8,rd))),128)),e.subfeature.props.length>0?(L(),V("div",ad,[$("button",{class:"btn btn-outline btn-error btn-sm w-full",disabled:!M(n).hasChanges(e.subfeature.id),onClick:i[0]||(i[0]=a=>M(n).resetSubfeature(e.subfeature.id))},[Y(M(ue),{icon:"fluent:arrow-reset-20-regular"}),me(" Reset "+le(e.subfeature.label),1)],8,ld)])):Ie("",!0)]))}}),ud={class:"truncate px-1 text-sm font-semibold"},fd={class:"min-h-0 flex-1 overflow-y-auto"},dd={key:1,class:"text-base-content/50 flex h-full flex-col items-center justify-center gap-3 p-6 text-center text-sm"},pd={class:"border-base-300 flex h-2/5 min-h-48 shrink-0 flex-col border-t"},bd={class:"flex items-center gap-1 px-3 py-2"},hd={role:"tablist",class:"tabs tabs-box tabs-xs flex-1"},xd=["disabled","onClick"],gd={key:0,class:"badge badge-primary badge-xs"},md=["disabled"],yd=["disabled"],vd=["disabled","title"],wd={key:0,class:"text-base-content/60 mx-3 mb-2 text-xs"},Sd={class:"bg-base-200 rounded-box mx-3 mb-3 min-h-0 flex-1 overflow-auto p-3 font-mono text-xs"},_d={key:0},Cd={key:1,class:"opacity-50"},kd=Le({__name:"RightSidebar",setup(e){const t=gn(),n={css:{label:"CSS",file:"boxcast-player-styles.css",type:"text/css",empty:"/* No custom styles yet */"},js:{label:"JS",file:"boxcast-player-addons.js",type:"text/javascript",empty:"// No add-on scripts needed"}},o=Te("css"),s=he(()=>o.value==="css"?t.cssOutput:t.jsOutput);ht(()=>t.jsOutput,l=>{l||(o.value="css")});const r=Te(!1),i=async()=>{await navigator.clipboard.writeText(s.value),r.value=!0,setTimeout(()=>r.value=!1,1500)},a=()=>{const l=n[o.value],u=URL.createObjectURL(new Blob([s.value],{type:l.type})),c=document.createElement("a");c.href=u,c.download=l.file,c.click(),URL.revokeObjectURL(u)};return(l,u)=>(L(),we(Wi,{side:"right",label:"Styles",icon:"fluent:paint-brush-20-regular","default-width":360},{header:Tt(()=>[$("span",ud,le(M(t).selectedSubfeature?M(t).selectedSubfeature.label:"Styles"),1)]),default:Tt(()=>[$("section",fd,[M(t).selectedSubfeature?(L(),we(cd,{key:0,subfeature:M(t).selectedSubfeature},null,8,["subfeature"])):(L(),V("div",dd,[Y(M(ue),{icon:"fluent:cursor-click-20-regular",class:"size-10"}),u[1]||(u[1]=me(" Select a feature on the left to start customizing it. ",-1))]))]),$("section",pd,[$("div",bd,[$("div",hd,[(L(),V(de,null,xt(n,(c,d)=>$("button",{key:d,role:"tab",class:De(["tab gap-1",{"tab-active":o.value===d}]),disabled:d==="js"&&!M(t).jsOutput,onClick:b=>o.value=d},[me(le(c.label)+" ",1),d==="js"&&M(t).jsOutput?(L(),V("span",gd,le(M(t).enabledAddons.length),1)):Ie("",!0)],10,xd)),64))]),$("button",{class:"btn btn-ghost btn-xs",disabled:!M(t).cssOutput&&!M(t).jsOutput,title:"Reset all styles and features",onClick:u[0]||(u[0]=c=>M(t).resetAll())},[Y(M(ue),{icon:"fluent:arrow-reset-20-regular"}),u[2]||(u[2]=me(" Reset ",-1))],8,md),$("button",{class:"btn btn-ghost btn-xs",disabled:!s.value,onClick:i},[Y(M(ue),{icon:r.value?"fluent:checkmark-20-regular":"fluent:copy-20-regular"},null,8,["icon"]),me(" "+le(r.value?"Copied":"Copy"),1)],8,yd),$("button",{class:"btn btn-primary btn-xs",disabled:!s.value,title:`Download ${n[o.value].file}`,onClick:a},[Y(M(ue),{icon:"fluent:arrow-download-20-regular"}),u[3]||(u[3]=me(" Download ",-1))],8,vd)]),o.value==="js"?(L(),V("p",wd," Add to the page in a <script> tag (plus the CSS, if there is any). It can go before or after the BoxCast player script; it waits for the player to render. ")):Ie("",!0),$("pre",Sd,[s.value?(L(),V("code",_d,le(s.value),1)):(L(),V("code",Cd,le(n[o.value].empty),1))])])]),_:1}))}}),Td={class:"bg-base-300 flex h-screen flex-col"},Pd={class:"flex min-h-0 flex-1"},Ad={class:"min-w-0 flex-1 overflow-y-auto p-6"},Ed={class:"rounded-box mx-auto max-w-6xl bg-white p-4 text-black"},Id=Le({__name:"App",setup(e){return(t,n)=>(L(),V("div",Td,[Y(Nu),$("div",Pd,[Y(gf),$("main",Ad,[$("div",Ed,[Y(qu)])]),Y(kd)])]))}}),Ki=Cc(Id);Ki.use(Pc());Ki.mount("#app");
