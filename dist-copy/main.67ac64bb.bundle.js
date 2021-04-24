/*! For license information please see main.67ac64bb.bundle.js.LICENSE.txt */
(()=>{"use strict";var e={705:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var i=e(t);return t[2]?"@media ".concat(t[2]," {").concat(i,"}"):i})).join("")},t.i=function(e,i,s){"string"==typeof e&&(e=[[null,e,""]]);var n={};if(s)for(var r=0;r<this.length;r++){var o=this[r][0];null!=o&&(n[o]=!0)}for(var a=0;a<e.length;a++){var l=[].concat(e[a]);s&&n[l[0]]||(i&&(l[2]?l[2]="".concat(i," and ").concat(l[2]):l[2]=i),t.push(l))}},t}},416:(e,t,i)=>{i.d(t,{Z:()=>r});var s=i(705),n=i.n(s)()((function(e){return e[1]}));n.push([e.id,"body,html{margin:0;padding:0;width:100%;height:100%;overflow-x:hidden;font-size:1rem}.container{padding:10px;margin-right:auto;margin-left:auto}@media (min-width: 576px){.container{max-width:540px}}@media (min-width: 768px){.container{max-width:720px}}@media (min-width: 1200px){.container{max-width:1140px}}#connect_state{position:absolute;left:0;top:0;right:0;bottom:0;z-index:1001;display:none;opacity:0;background-color:rgba(255,255,255,0.7);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);-webkit-transition:opacity 2s linear;transition:opacity 2s linear}#connect_state.show{display:block;opacity:1}#connect_state span{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);width:90%;text-align:center}.displaycontainer{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;grid-gap:4px;gap:4px;margin-top:4px}.displaycontainer *{-webkit-box-flex:1;-ms-flex:auto;flex:auto}.content{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;grid-gap:10px;gap:10px;margin-top:10px;width:100%}ui-gauge{-webkit-box-flex:1;-ms-flex:1;flex:1}ui-range{display:block;width:100%}\n",""]);const r=n},379:(e,t,i)=>{var s,n=function(){var e={};return function(t){if(void 0===e[t]){var i=document.querySelector(t);if(window.HTMLIFrameElement&&i instanceof window.HTMLIFrameElement)try{i=i.contentDocument.head}catch(e){i=null}e[t]=i}return e[t]}}(),r=[];function o(e){for(var t=-1,i=0;i<r.length;i++)if(r[i].identifier===e){t=i;break}return t}function a(e,t){for(var i={},s=[],n=0;n<e.length;n++){var a=e[n],l=t.base?a[0]+t.base:a[0],c=i[l]||0,d="".concat(l," ").concat(c);i[l]=c+1;var p=o(d),u={css:a[1],media:a[2],sourceMap:a[3]};-1!==p?(r[p].references++,r[p].updater(u)):r.push({identifier:d,updater:f(u,t),references:1}),s.push(d)}return s}function l(e){var t=document.createElement("style"),s=e.attributes||{};if(void 0===s.nonce){var r=i.nc;r&&(s.nonce=r)}if(Object.keys(s).forEach((function(e){t.setAttribute(e,s[e])})),"function"==typeof e.insert)e.insert(t);else{var o=n(e.insert||"head");if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}return t}var c,d=(c=[],function(e,t){return c[e]=t,c.filter(Boolean).join("\n")});function p(e,t,i,s){var n=i?"":s.media?"@media ".concat(s.media," {").concat(s.css,"}"):s.css;if(e.styleSheet)e.styleSheet.cssText=d(t,n);else{var r=document.createTextNode(n),o=e.childNodes;o[t]&&e.removeChild(o[t]),o.length?e.insertBefore(r,o[t]):e.appendChild(r)}}function u(e,t,i){var s=i.css,n=i.media,r=i.sourceMap;if(n?e.setAttribute("media",n):e.removeAttribute("media"),r&&"undefined"!=typeof btoa&&(s+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleSheet)e.styleSheet.cssText=s;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(s))}}var h=null,m=0;function f(e,t){var i,s,n;if(t.singleton){var r=m++;i=h||(h=l(t)),s=p.bind(null,i,r,!1),n=p.bind(null,i,r,!0)}else i=l(t),s=u.bind(null,i,t),n=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(i)};return s(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;s(e=t)}else n()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=(void 0===s&&(s=Boolean(window&&document&&document.all&&!window.atob)),s));var i=a(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var s=0;s<i.length;s++){var n=o(i[s]);r[n].references--}for(var l=a(e,t),c=0;c<i.length;c++){var d=o(i[c]);0===r[d].references&&(r[d].updater(),r.splice(d,1))}i=l}}}}},t={};function i(s){var n=t[s];if(void 0!==n)return n.exports;var r=t[s]={id:s,exports:{}};return e[s](r,r.exports,i),r.exports}i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var s in t)i.o(t,s)&&!i.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{const e=new WeakMap,t=t=>"function"==typeof t&&e.has(t),s="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,n=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},r={},o={},a=`{{lit-${String(Math.random()).slice(2)}}}`,l=`\x3c!--${a}--\x3e`,c=new RegExp(`${a}|${l}`),d="$lit$";class p{constructor(e,t){this.parts=[],this.element=t;const i=[],s=[],n=document.createTreeWalker(t.content,133,null,!1);let r=0,o=-1,l=0;const{strings:p,values:{length:h}}=e;for(;l<h;){const e=n.nextNode();if(null!==e){if(o++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let s=0;for(let e=0;e<i;e++)u(t[e].name,d)&&s++;for(;s-- >0;){const t=p[l],i=f.exec(t)[2],s=i.toLowerCase()+d,n=e.getAttribute(s);e.removeAttribute(s);const r=n.split(c);this.parts.push({type:"attribute",index:o,name:i,strings:r}),l+=r.length-1}}"TEMPLATE"===e.tagName&&(s.push(e),n.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(a)>=0){const s=e.parentNode,n=t.split(c),r=n.length-1;for(let t=0;t<r;t++){let i,r=n[t];if(""===r)i=m();else{const e=f.exec(r);null!==e&&u(e[2],d)&&(r=r.slice(0,e.index)+e[1]+e[2].slice(0,-d.length)+e[3]),i=document.createTextNode(r)}s.insertBefore(i,e),this.parts.push({type:"node",index:++o})}""===n[r]?(s.insertBefore(m(),e),i.push(e)):e.data=n[r],l+=r}}else if(8===e.nodeType)if(e.data===a){const t=e.parentNode;null!==e.previousSibling&&o!==r||(o++,t.insertBefore(m(),e)),r=o,this.parts.push({type:"node",index:o}),null===e.nextSibling?e.data="":(i.push(e),o--),l++}else{let t=-1;for(;-1!==(t=e.data.indexOf(a,t+1));)this.parts.push({type:"node",index:-1}),l++}}else n.currentNode=s.pop()}for(const e of i)e.parentNode.removeChild(e)}}const u=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},h=e=>-1!==e.index,m=()=>document.createComment(""),f=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class g{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=s?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],i=this.template.parts,n=document.createTreeWalker(e,133,null,!1);let r,o=0,a=0,l=n.nextNode();for(;o<i.length;)if(r=i[o],h(r)){for(;a<r.index;)a++,"TEMPLATE"===l.nodeName&&(t.push(l),n.currentNode=l.content),null===(l=n.nextNode())&&(n.currentNode=t.pop(),l=n.nextNode());if("node"===r.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(l.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,r.name,r.strings,this.options));o++}else this.__parts.push(void 0),o++;return s&&(document.adoptNode(e),customElements.upgrade(e)),e}}const b=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),y=` ${a} `;class _{constructor(e,t,i,s){this.strings=e,this.values=t,this.type=i,this.processor=s}getHTML(){const e=this.strings.length-1;let t="",i=!1;for(let s=0;s<e;s++){const e=this.strings[s],n=e.lastIndexOf("\x3c!--");i=(n>-1||i)&&-1===e.indexOf("--\x3e",n+1);const r=f.exec(e);t+=null===r?e+(i?y:l):e.substr(0,r.index)+r[1]+r[2]+d+r[3]+a}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==b&&(t=b.createHTML(t)),e.innerHTML=t,e}}const v=e=>null===e||!("object"==typeof e||"function"==typeof e),x=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class w{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new S(this)}_getValue(){const e=this.strings,t=e.length-1,i=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=i[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!x(e))return e}let s="";for(let n=0;n<t;n++){s+=e[n];const t=i[n];if(void 0!==t){const e=t.value;if(v(e)||!x(e))s+="string"==typeof e?e:String(e);else for(const t of e)s+="string"==typeof t?t:String(t)}}return s+=e[t],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class S{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===r||v(e)&&e===this.value||(this.value=e,t(e)||(this.committer.dirty=!0))}commit(){for(;t(this.value);){const e=this.value;this.value=r,e(this)}this.value!==r&&this.committer.commit()}}class k{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(m()),this.endNode=e.appendChild(m())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=m()),e.__insert(this.endNode=m())}insertAfterPart(e){e.__insert(this.startNode=m()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;t(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=r,e(this)}const e=this.__pendingValue;e!==r&&(v(e)?e!==this.value&&this.__commitText(e):e instanceof _?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):x(e)?this.__commitIterable(e):e===o?(this.value=o,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof g&&this.value.template===t)this.value.update(e.values);else{const i=new g(t,e.processor,this.options),s=i._clone();i.update(e.values),this.__commitNode(s),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,s=0;for(const n of e)i=t[s],void 0===i&&(i=new k(this.options),t.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(t[s-1])),i.setValue(n),i.commit(),s++;s<t.length&&(t.length=s,this.clear(i&&i.endNode))}clear(e=this.startNode){n(this.startNode.parentNode,e.nextSibling,this.endNode)}}class P{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;t(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=r,e(this)}if(this.__pendingValue===r)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=r}}class N extends w{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new C(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class C extends S{}let E=!1;(()=>{try{const e={get capture(){return E=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class T{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;t(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=r,e(this)}if(this.__pendingValue===r)return;const e=this.__pendingValue,i=this.value,s=null==e||null!=i&&(e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive),n=null!=e&&(null==i||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),n&&(this.__options=A(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=r}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const A=e=>e&&(E?{capture:e.capture,passive:e.passive,once:e.once}:e.capture),O=new class{handleAttributeExpressions(e,t,i,s){const n=t[0];return"."===n?new N(e,t.slice(1),i).parts:"@"===n?[new T(e,t.slice(1),s.eventContext)]:"?"===n?[new P(e,t.slice(1),i)]:new w(e,t,i).parts}handleTextExpression(e){return new k(e)}};function V(e){let t=$.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},$.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const s=e.strings.join(a);return i=t.keyString.get(s),void 0===i&&(i=new p(e,e.getTemplateElement()),t.keyString.set(s,i)),t.stringsArray.set(e.strings,i),i}const $=new Map,U=new WeakMap;"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const M=(e,...t)=>new _(e,t,"html",O);window.JSCompiler_renameProperty=(e,t)=>e;const z={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},R=(e,t)=>t!==e&&(t==t||e==e),j={attribute:!0,type:String,converter:z,reflect:!1,hasChanged:R};class I extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,i)=>{const s=this._attributeNameForProperty(i,t);void 0!==s&&(this._attributeToPropertyMap.set(s,i),e.push(s))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=j){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():`__${e}`,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const n=this[e];this[t]=s,this.requestUpdateInternal(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||j}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=R){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,s=t.converter||z,n="function"==typeof s?s:s.fromAttribute;return n?n(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,s=t.converter;return(s&&s.toAttribute||z.toAttribute)(e,i)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=j){const s=this.constructor,n=s._attributeNameForProperty(e,i);if(void 0!==n){const e=s._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(n):this.setAttribute(n,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const i=this.constructor,s=i._attributeToPropertyMap.get(e);if(void 0!==s){const e=i.getPropertyOptions(s);this._updateState=16|this._updateState,this[s]=i._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,i){let s=!0;if(void 0!==e){const n=this.constructor;i=i||n.getPropertyOptions(e),n._valueHasChanged(this[e],t,i.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,i))):s=!1}!this._hasRequestedUpdate&&s&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}I.finalized=!0;const L=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(i){i.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};const q=Element.prototype;q.msMatchesSelector||q.webkitMatchesSelector;const H=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,F=Symbol();class B{constructor(e,t){if(t!==F)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(H?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const J=(e,...t)=>{const i=t.reduce(((t,i,s)=>t+(e=>{if(e instanceof B)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[s+1]),e[0]);return new B(i,F)};(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const W={};class D extends I{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,i)=>e.reduceRight(((e,i)=>Array.isArray(i)?t(i,e):(e.add(i),e)),i),i=t(e,new Set),s=[];i.forEach((e=>s.unshift(e))),this._styles=s}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!H){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new B(String(t),F)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?H?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==W&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return W}}D.finalized=!0,D.render=(e,t,i)=>{let s=U.get(t);void 0===s&&(n(t,t.firstChild),U.set(t,s=new k(Object.assign({templateFactory:V},i))),s.appendInto(t)),s.setValue(e),s.commit()},customElements.define("ui-display",class extends D{static get styles(){return J`:host{background-color:#f8f9fa}.ui-display{color:green;padding:6px 10px;margin:4px;text-align:center}`}render(){return M` <div class="ui-display"> <span class="title">${this.title}</span> <span class="value">${this.value}</span> <span class="suffix">${this["data-suffix"]}</span> </div> `}static get properties(){return{value:{type:String},title:{type:String},"data-suffix":{type:String}}}});const Z=J`:host{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.gauge{-webkit-box-flex:1;-ms-flex:auto;flex:auto;max-width:250px;font-family:Roboto,sans-serif;font-size:32px;color:#004033;margin:10px}.gauge__body{width:100%;height:0;padding-bottom:50%;background:#b4c0be;position:relative;border-top-left-radius:100% 200%;border-top-right-radius:100% 200%;overflow:hidden}.gauge__fill{position:absolute;top:100%;left:0;width:inherit;height:100%;background:#009578;-webkit-transform-origin:center top;transform-origin:center top;-webkit-transform:rotate(.25turn);transform:rotate(.25turn);-webkit-transition:-webkit-transform .2s ease-out;transition:-webkit-transform .2s ease-out;transition:transform .2s ease-out;transition:transform .2s ease-out,-webkit-transform .2s ease-out}.gauge__cover{width:65%;top:35%;height:150%;background:#fff;border-radius:50%;position:absolute;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding-bottom:25%;-webkit-box-sizing:border-box;box-sizing:border-box}.gauge__suffix{position:relative;bottom:5px;font-size:.6em;margin-left:3px}.gauge__description{font-size:14px;font-family:Roboto-Medium;text-align:center}`;customElements.define("ui-gauge",class extends D{static get styles(){return[Z]}render(){let e=(this.value-this.min)/(this.max-this.min);return e<0&&(e=0),e>1&&(e=1),M` <div class="gauge"> <div class="gauge__body"> <div class="gauge__fill" style="transform:rotate(${e/2}turn)"></div> <div class="gauge__cover"> ${this.value} <span class="gauge__suffix">${this["data-suffix"]}</span> </div> </div> <div class="gauge__description">${this.title}</div> </div> `}static get properties(){return{title:{type:String},value:{type:Number},min:{type:Number},max:{type:Number},"data-suffix":{type:String}}}}),customElements.define("ui-progress",class extends D{static get styles(){return J`:host{display:flex;height:30px;padding-top:2px;align-items:baseline;gap:6px}p{position:relative;top:-25px}progress{flex:auto;position:relative;bottom:21px}`}render(){return M` <p>${this.title}</p> <progress max="${this.max}" value="${this.value}"> ${this.value}${this["data-suffix"]} </progress> `}static get properties(){return{title:{type:String},value:{type:Number},max:{type:Number},"data-suffix":{type:String}}}});const X=J`:host{color:#000;padding:10px 0;margin:0;text-align:left;display:block}.error{color:red}input[type=number]{padding:5px 8px;max-width:50px;background-color:#f8f9fa;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:1px solid #ced4da;border-radius:.25rem}.form-control{position:relative;-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto;width:1%;min-width:0;display:block;width:100%;padding:.375rem .75rem;font-size:1rem;font-weight:400;line-height:1.5;color:#212529;background-color:#fff;background-clip:padding-box;border:1px solid #ced4da;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:.25rem;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out}.panel{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;grid-gap:8px;gap:8px;-webkit-box-align:baseline;-ms-flex-align:baseline;align-items:baseline}button{padding:7px 10px;font-size:1em;border:1px solid #ced4da;border-radius:.25rem}`;customElements.define("ui-input",class extends D{static get styles(){return[X]}render(){return M` <div class="panel"> <span class="title">${this.title}</span> <input class="form-control" type="number" pattern="[0-9]*" @input="${e=>this._onInput(e)}" value="${this.value}"> <span class="suffix">${this["data-suffix"]}</span> <button @click="${this._onClick}" ?disabled="${!this.isCorrect()}">ОК</button> </div> ${this.hint()} `}hint(){return this.isCorrect()?M``:M`<div class="error">Значение должно находиться в диапазоне ${this.min}..${this.max}.</div>`}isCorrect(){return this.value>=this.min&&this.value<=this.max}_onInput(e){this.value=e.currentTarget.value}_onClick(e){let t=new CustomEvent("change",{detail:{message:"change happened."},bubbles:!0,composed:!0});this.dispatchEvent(t)}static get properties(){return{value:{type:Number},title:{type:String},min:{type:Number},max:{type:Number},"data-suffix":{type:String}}}}),customElements.define("ui-range",class extends D{static get styles(){return J`:host{padding:10px 0}.slidecontainer{display:flex}.slidecontainer input[type=range]{flex:auto}`}render(){return M` <div class="slidecontainer"> <span>${this.title}</span> <input type="range" min="${this.min}" max="${this.max}" value="${this.value}" @change="${e=>this._onChange(e)}" @input="${e=>this._onInput(e)}"> <label>${this.value}</label> </div> `}_onInput(e){this.value=e.currentTarget.value}_onChange(e){this.value=e.currentTarget.value,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0}))}static get properties(){return{title:{type:String},value:{type:Number,reflect:!0},min:{type:Number},max:{type:Number},"data-suffix":{type:String}}}});const G=J`:host{display:-webkit-box;display:-ms-flexbox;display:flex}button{-webkit-box-flex:1;-ms-flex:auto;flex:auto;padding:7px 10px;font-size:1em;border:1px solid #ced4da;border-radius:.25rem}`;var K,Q,Y,ee;customElements.define("ui-button",class extends D{static get styles(){return[G]}render(){return M` <button @click="${e=>this._onClick(e)}">${this.title}</button> `}_onClick(e){console.log("_onClick",this.value,e.currentTarget.value),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0}))}static get properties(){return{title:{type:String},value:{type:Number}}}}),K=e=>{return"function"==typeof e?(t=e,window.customElements.define("my-element",t),t):((e,t)=>{const{kind:i,elements:s}=t;return{kind:i,elements:s,finisher(e){window.customElements.define("my-element",e)}}})(0,e);var t},Q=function(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):L(e,t)}(),K((ee=function(e,t,i,s,n){var r={};return Object.keys(s).forEach((function(e){r[e]=s[e]})),r.enumerable=!!r.enumerable,r.configurable=!!r.configurable,("value"in r||r.initializer)&&(r.writable=!0),void 0===(r=i.slice().reverse().reduce((function(i,s){return s(e,t,i)||i}),r)).initializer&&(Object.defineProperty(e,t,r),r=null),r}((Y=class extends D{constructor(...e){var t,i,s;super(...e),t=this,s=this,(i=ee)&&Object.defineProperty(t,"adjective",{enumerable:i.enumerable,configurable:i.configurable,writable:i.writable,value:i.initializer?i.initializer.call(s):void 0})}render(){return M`<p>your ${this.adjective} template-here</p>`}}).prototype,"adjective",[Q],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return"awesome"}}),Y));var te=i(379),ie=i.n(te),se=i(416);let ne;ie()(se.Z,{insert:"head",singleton:!1}),se.Z.locals;const re=(location.hash||"#").slice(1)||"unknown";console.log("Hello, sushka!"),location.hostname,"localhost"==location.hostname||location.protocol;const oe="localhost"==location.hostname?"ws://localhost:8082/socket":"wss://sushka.navi.cc/socket";document.querySelector("#connect_state");let ae=function e(t,i){const s=t+"?hwid="+i;return console.log("WS: open",s),ne=new WebSocket(s),ne.onopen=()=>{connect_state.classList.remove("show")},ne.onmessage=e=>{const t=JSON.parse(e.data);for(var i in t)if(t.hasOwnProperty(i)){const e=t[i];document.querySelectorAll(`*[data-name=${i}]`).forEach((t=>{t.setAttribute("value",e)}))}},ne.onerror=e=>{console.log("onerror",e.message)},ne.onclose=()=>{connect_state.classList.add("show"),ne=null,setTimeout((function(){e(t)}),1e3)},ne}(oe,re);document.querySelectorAll("ui-input, ui-range, ui-button").forEach((e=>{const t=e.getAttribute("data-name");e.addEventListener("change",(i=>{const s=e.value,n={cmd:"cmd",name:t,value:s};ae.send(JSON.stringify(n))}))}))})()})();