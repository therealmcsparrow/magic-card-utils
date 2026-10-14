(()=>{"use strict";var e={506(e,t,i){var n=i(601),r=i.n(n),a=i(314),o=i.n(a)()(r());o.push([e.id,":root {\n  --swiper-navigation-size: 44px;\n  /*\n  --swiper-navigation-top-offset: 50%;\n  --swiper-navigation-sides-offset: 4px;\n  --swiper-navigation-color: var(--swiper-theme-color);\n  */\n}\n.swiper-button-prev,\n.swiper-button-next {\n  position: absolute;\n\n  width: var(--swiper-navigation-size);\n  height: var(--swiper-navigation-size);\n\n  z-index: 10;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--swiper-navigation-color, var(--swiper-theme-color));\n  &.swiper-button-disabled {\n    opacity: 0.35;\n    cursor: auto;\n    pointer-events: none;\n  }\n  &.swiper-button-hidden {\n    opacity: 0;\n    cursor: auto;\n    pointer-events: none;\n  }\n  .swiper-navigation-disabled & {\n    display: none !important;\n  }\n\n  ::slotted(svg),\n  svg {\n    width: 100%;\n    height: 100%;\n    object-fit: contain;\n    transform-origin: center;\n    fill: currentColor;\n    pointer-events: none;\n  }\n}\n\n.swiper-button-lock {\n  display: none;\n}\n\n.swiper-button-prev,\n.swiper-button-next {\n  top: var(--swiper-navigation-top-offset, 50%);\n  margin-top: calc(0px - (var(--swiper-navigation-size) / 2));\n}\n.swiper-button-prev {\n  left: var(--swiper-navigation-sides-offset, 4px);\n  right: auto;\n  ::slotted(.swiper-navigation-icon),\n  .swiper-navigation-icon {\n    transform: rotate(180deg);\n  }\n}\n.swiper-button-next {\n  right: var(--swiper-navigation-sides-offset, 4px);\n  left: auto;\n}\n.swiper-horizontal {\n  .swiper-button-prev,\n  .swiper-button-next,\n  ~ .swiper-button-prev,\n  ~ .swiper-button-next {\n    top: var(--swiper-navigation-top-offset, 50%);\n    margin-top: calc(0px - (var(--swiper-navigation-size) / 2));\n    margin-left: 0;\n  }\n  .swiper-button-prev,\n  & ~ .swiper-button-prev,\n  &.swiper-rtl .swiper-button-next,\n  &.swiper-rtl ~ .swiper-button-next {\n    left: var(--swiper-navigation-sides-offset, 4px);\n    right: auto;\n  }\n  .swiper-button-next,\n  & ~ .swiper-button-next,\n  &.swiper-rtl .swiper-button-prev,\n  &.swiper-rtl ~ .swiper-button-prev {\n    right: var(--swiper-navigation-sides-offset, 4px);\n    left: auto;\n  }\n  .swiper-button-prev,\n  & ~ .swiper-button-prev,\n  &.swiper-rtl .swiper-button-next,\n  &.swiper-rtl ~ .swiper-button-next {\n    ::slotted(.swiper-navigation-icon),\n    .swiper-navigation-icon {\n      transform: rotate(180deg);\n    }\n  }\n  &.swiper-rtl .swiper-button-prev,\n  &.swiper-rtl ~ .swiper-button-prev {\n    ::slotted(.swiper-navigation-icon),\n    .swiper-navigation-icon {\n      transform: rotate(0deg);\n    }\n  }\n}\n.swiper-vertical {\n  .swiper-button-prev,\n  .swiper-button-next,\n  ~ .swiper-button-prev,\n  ~ .swiper-button-next {\n    left: var(--swiper-navigation-top-offset, 50%);\n    right: auto;\n    margin-left: calc(0px - (var(--swiper-navigation-size) / 2));\n    margin-top: 0;\n  }\n  .swiper-button-prev,\n  ~ .swiper-button-prev {\n    top: var(--swiper-navigation-sides-offset, 4px);\n    bottom: auto;\n    ::slotted(.swiper-navigation-icon),\n    .swiper-navigation-icon {\n      transform: rotate(-90deg);\n    }\n  }\n  .swiper-button-next,\n  ~ .swiper-button-next {\n    bottom: var(--swiper-navigation-sides-offset, 4px);\n    top: auto;\n    ::slotted(.swiper-navigation-icon),\n    .swiper-navigation-icon {\n      transform: rotate(90deg);\n    }\n  }\n}\n",""]);const s=o;i.d(t,["A",0,s])},124(e,t,i){var n=i(601),r=i.n(n),a=i(314),o=i.n(a)()(r());o.push([e.id,":root {\n  /*\n  --swiper-pagination-color: var(--swiper-theme-color);\n  --swiper-pagination-left: auto;\n  --swiper-pagination-right: 8px;\n  --swiper-pagination-bottom: 8px;\n  --swiper-pagination-top: auto;\n  --swiper-pagination-fraction-color: inherit;\n  --swiper-pagination-progressbar-bg-color: rgba(0,0,0,0.25);\n  --swiper-pagination-progressbar-size: 4px;\n  --swiper-pagination-bullet-size: 8px;\n  --swiper-pagination-bullet-width: 8px;\n  --swiper-pagination-bullet-height: 8px;\n  --swiper-pagination-bullet-border-radius: 50%;\n  --swiper-pagination-bullet-inactive-color: #000;\n  --swiper-pagination-bullet-inactive-opacity: 0.2;\n  --swiper-pagination-bullet-opacity: 1;\n  --swiper-pagination-bullet-horizontal-gap: 4px;\n  --swiper-pagination-bullet-vertical-gap: 6px;\n  */\n}\n.swiper-pagination {\n  position: absolute;\n  text-align: center;\n  transition: 300ms opacity;\n  transform: translate3d(0, 0, 0);\n  z-index: 10;\n  &.swiper-pagination-hidden {\n    opacity: 0;\n  }\n  .swiper-pagination-disabled > &,\n  &.swiper-pagination-disabled {\n    display: none !important;\n  }\n}\n/* Common Styles */\n.swiper-pagination-fraction,\n.swiper-pagination-custom,\n.swiper-horizontal > .swiper-pagination-bullets,\n.swiper-pagination-bullets.swiper-pagination-horizontal {\n  bottom: var(--swiper-pagination-bottom, 8px);\n  top: var(--swiper-pagination-top, auto);\n  left: 0;\n  width: 100%;\n}\n/* Bullets */\n.swiper-pagination-bullets-dynamic {\n  overflow: hidden;\n  font-size: 0;\n  .swiper-pagination-bullet {\n    transform: scale(0.33);\n    position: relative;\n  }\n  .swiper-pagination-bullet-active {\n    transform: scale(1);\n  }\n  .swiper-pagination-bullet-active-main {\n    transform: scale(1);\n  }\n  .swiper-pagination-bullet-active-prev {\n    transform: scale(0.66);\n  }\n  .swiper-pagination-bullet-active-prev-prev {\n    transform: scale(0.33);\n  }\n  .swiper-pagination-bullet-active-next {\n    transform: scale(0.66);\n  }\n  .swiper-pagination-bullet-active-next-next {\n    transform: scale(0.33);\n  }\n}\n.swiper-pagination-bullet {\n  width: var(--swiper-pagination-bullet-width, var(--swiper-pagination-bullet-size, 8px));\n  height: var(--swiper-pagination-bullet-height, var(--swiper-pagination-bullet-size, 8px));\n  display: inline-block;\n  border-radius: var(--swiper-pagination-bullet-border-radius, 50%);\n  background: var(--swiper-pagination-bullet-inactive-color, #000);\n  opacity: var(--swiper-pagination-bullet-inactive-opacity, 0.2);\n  button& {\n    border: none;\n    margin: 0;\n    padding: 0;\n    box-shadow: none;\n    appearance: none;\n  }\n  .swiper-pagination-clickable & {\n    cursor: pointer;\n  }\n\n  &:only-child {\n    display: none !important;\n  }\n}\n.swiper-pagination-bullet-active {\n  opacity: var(--swiper-pagination-bullet-opacity, 1);\n  background: var(--swiper-pagination-color, var(--swiper-theme-color));\n}\n\n.swiper-vertical > .swiper-pagination-bullets,\n.swiper-pagination-vertical.swiper-pagination-bullets {\n  right: var(--swiper-pagination-right, 8px);\n  left: var(--swiper-pagination-left, auto);\n  top: 50%;\n  transform: translate3d(0px, -50%, 0);\n  .swiper-pagination-bullet {\n    margin: var(--swiper-pagination-bullet-vertical-gap, 6px) 0;\n    display: block;\n  }\n  &.swiper-pagination-bullets-dynamic {\n    top: 50%;\n    transform: translateY(-50%);\n    width: 8px;\n    .swiper-pagination-bullet {\n      display: inline-block;\n      transition:\n        200ms transform,\n        200ms top;\n    }\n  }\n}\n.swiper-horizontal > .swiper-pagination-bullets,\n.swiper-pagination-horizontal.swiper-pagination-bullets {\n  .swiper-pagination-bullet {\n    margin: 0 var(--swiper-pagination-bullet-horizontal-gap, 4px);\n  }\n  &.swiper-pagination-bullets-dynamic {\n    left: 50%;\n    transform: translateX(-50%);\n    white-space: nowrap;\n    .swiper-pagination-bullet {\n      transition:\n        200ms transform,\n        200ms left;\n    }\n  }\n}\n.swiper-horizontal.swiper-rtl > .swiper-pagination-bullets-dynamic .swiper-pagination-bullet {\n  transition:\n    200ms transform,\n    200ms right;\n}\n/* Fraction */\n.swiper-pagination-fraction {\n  color: var(--swiper-pagination-fraction-color, inherit);\n}\n/* Progress */\n.swiper-pagination-progressbar {\n  background: var(--swiper-pagination-progressbar-bg-color, rgba(0, 0, 0, 0.25));\n  position: absolute;\n  .swiper-pagination-progressbar-fill {\n    background: var(--swiper-pagination-color, var(--swiper-theme-color));\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    transform: scale(0);\n    transform-origin: left top;\n  }\n  .swiper-rtl & .swiper-pagination-progressbar-fill {\n    transform-origin: right top;\n  }\n  .swiper-horizontal > &,\n  &.swiper-pagination-horizontal,\n  .swiper-vertical > &.swiper-pagination-progressbar-opposite,\n  &.swiper-pagination-vertical.swiper-pagination-progressbar-opposite {\n    width: 100%;\n    height: var(--swiper-pagination-progressbar-size, 4px);\n    left: 0;\n    top: 0;\n  }\n  .swiper-vertical > &,\n  &.swiper-pagination-vertical,\n  .swiper-horizontal > &.swiper-pagination-progressbar-opposite,\n  &.swiper-pagination-horizontal.swiper-pagination-progressbar-opposite {\n    width: var(--swiper-pagination-progressbar-size, 4px);\n    height: 100%;\n    left: 0;\n    top: 0;\n  }\n}\n.swiper-pagination-lock {\n  display: none;\n}\n",""]);const s=o;i.d(t,["A",0,s])},870(e,t,i){var n=i(601),r=i.n(n),a=i(314),o=i.n(a)()(r());o.push([e.id,'/**\n * Swiper 14.3.0\n * Most modern mobile touch slider and framework with hardware accelerated transitions\n * https://swiperjs.com\n *\n * Copyright 2014-2026 Vladimir Kharlampidi\n *\n * Released under the MIT License\n *\n * Released on: September 28, 2026\n */\n\n:root {\n  --swiper-theme-color: #007aff;\n  /*\n  --swiper-preloader-color: var(--swiper-theme-color);\n  --swiper-wrapper-transition-timing-function: initial;\n  */\n}\n:host {\n  position: relative;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  z-index: 1;\n}\n.swiper {\n  margin-left: auto;\n  margin-right: auto;\n  position: relative;\n  overflow: hidden;\n  list-style: none;\n  padding: 0;\n  /* Fix of Webkit flickering */\n  z-index: 1;\n  display: block;\n}\n.swiper-vertical > .swiper-wrapper {\n  flex-direction: column;\n}\n.swiper-wrapper {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  z-index: 1;\n  display: flex;\n  transition-property: transform;\n  transition-timing-function: var(--swiper-wrapper-transition-timing-function, initial);\n  box-sizing: content-box;\n}\n.swiper-android .swiper-slide,\n.swiper-ios .swiper-slide,\n.swiper-wrapper {\n  transform: translate3d(0px, 0, 0);\n}\n.swiper-horizontal {\n  touch-action: pan-y;\n}\n.swiper-vertical {\n  touch-action: pan-x;\n}\n.swiper-slide {\n  flex-shrink: 0;\n  width: 100%;\n  height: 100%;\n  position: relative;\n  transition-property: transform;\n  display: block;\n}\n.swiper-slide-invisible-blank {\n  visibility: hidden;\n}\n/* Auto Height */\n.swiper-autoheight,\n.swiper-autoheight .swiper-slide {\n  height: auto;\n}\n.swiper-autoheight .swiper-wrapper {\n  align-items: flex-start;\n  transition-property: transform, height;\n}\n.swiper-backface-hidden .swiper-slide {\n  transform: translateZ(0);\n  backface-visibility: hidden;\n}\n/* 3D Effects */\n.swiper-3d.swiper-css-mode .swiper-wrapper {\n  perspective: 1200px;\n}\n.swiper-3d .swiper-wrapper {\n  transform-style: preserve-3d;\n}\n.swiper-3d {\n  perspective: 1200px;\n  .swiper-slide,\n  .swiper-cube-shadow {\n    transform-style: preserve-3d;\n  }\n}\n\n/* CSS Mode */\n.swiper-css-mode {\n  > .swiper-wrapper {\n    overflow: auto;\n    scrollbar-width: none; /* For Firefox */\n    -ms-overflow-style: none; /* For Internet Explorer and Edge */\n    &::-webkit-scrollbar {\n      display: none;\n    }\n  }\n  > .swiper-wrapper > .swiper-slide {\n    scroll-snap-align: start start;\n  }\n  &.swiper-horizontal {\n    > .swiper-wrapper {\n      scroll-snap-type: x mandatory;\n    }\n    > .swiper-wrapper > .swiper-slide:first-child {\n      margin-inline-start: var(--swiper-slides-offset-before);\n      scroll-margin-inline-start: var(--swiper-slides-offset-before);\n    }\n    > .swiper-wrapper > .swiper-slide:last-child {\n      margin-inline-end: var(--swiper-slides-offset-after);\n    }\n  }\n  &.swiper-vertical {\n    > .swiper-wrapper {\n      scroll-snap-type: y mandatory;\n    }\n    > .swiper-wrapper > .swiper-slide:first-child {\n      margin-block-start: var(--swiper-slides-offset-before);\n      scroll-margin-block-start: var(--swiper-slides-offset-before);\n    }\n    > .swiper-wrapper > .swiper-slide:last-child {\n      margin-block-end: var(--swiper-slides-offset-after);\n    }\n  }\n  &.swiper-free-mode {\n    > .swiper-wrapper {\n      scroll-snap-type: none;\n    }\n    > .swiper-wrapper > .swiper-slide {\n      scroll-snap-align: none;\n    }\n  }\n  &.swiper-centered {\n    > .swiper-wrapper::before {\n      content: "";\n      flex-shrink: 0;\n      order: 9999;\n    }\n    > .swiper-wrapper > .swiper-slide {\n      scroll-snap-align: center center;\n      scroll-snap-stop: always;\n    }\n  }\n  &.swiper-centered.swiper-horizontal {\n    > .swiper-wrapper > .swiper-slide:first-child {\n      margin-inline-start: var(--swiper-centered-offset-before);\n    }\n    > .swiper-wrapper::before {\n      height: 100%;\n      min-height: 1px;\n      width: var(--swiper-centered-offset-after);\n    }\n  }\n  &.swiper-centered.swiper-vertical {\n    > .swiper-wrapper > .swiper-slide:first-child {\n      margin-block-start: var(--swiper-centered-offset-before);\n    }\n    > .swiper-wrapper::before {\n      width: 100%;\n      min-width: 1px;\n      height: var(--swiper-centered-offset-after);\n    }\n  }\n}\n\n/* Slide styles start */\n/* 3D Shadows */\n.swiper-3d {\n  .swiper-slide-shadow,\n  .swiper-slide-shadow-left,\n  .swiper-slide-shadow-right,\n  .swiper-slide-shadow-top,\n  .swiper-slide-shadow-bottom,\n  .swiper-slide-shadow,\n  .swiper-slide-shadow-left,\n  .swiper-slide-shadow-right,\n  .swiper-slide-shadow-top,\n  .swiper-slide-shadow-bottom {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    pointer-events: none;\n    z-index: 10;\n  }\n  .swiper-slide-shadow {\n    background: rgba(0, 0, 0, 0.15);\n  }\n  .swiper-slide-shadow-left {\n    background-image: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  }\n  .swiper-slide-shadow-right {\n    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  }\n  .swiper-slide-shadow-top {\n    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  }\n  .swiper-slide-shadow-bottom {\n    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  }\n}\n.swiper-lazy-preloader {\n  width: 42px;\n  height: 42px;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  margin-left: -21px;\n  margin-top: -21px;\n  z-index: 10;\n  transform-origin: 50%;\n  box-sizing: border-box;\n  border: 4px solid var(--swiper-preloader-color, var(--swiper-theme-color));\n  border-radius: 50%;\n  border-top-color: transparent;\n}\n.swiper:not(.swiper-watch-progress),\n.swiper-watch-progress .swiper-slide-visible {\n  .swiper-lazy-preloader {\n    animation: swiper-preloader-spin 1s infinite linear;\n  }\n}\n.swiper-lazy-preloader-white {\n  --swiper-preloader-color: #fff;\n}\n.swiper-lazy-preloader-black {\n  --swiper-preloader-color: #000;\n}\n@keyframes swiper-preloader-spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n/* Slide styles end */\n',""]);const s=o;i.d(t,["A",0,s])},314(e){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var i="",n=void 0!==t[5];return t[4]&&(i+="@supports (".concat(t[4],") {")),t[2]&&(i+="@media ".concat(t[2]," {")),n&&(i+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),i+=e(t),n&&(i+="}"),t[2]&&(i+="}"),t[4]&&(i+="}"),i}).join("")},t.i=function(e,i,n,r,a){"string"==typeof e&&(e=[[null,e,void 0]]);var o={};if(n)for(var s=0;s<this.length;s++){var l=this[s][0];null!=l&&(o[l]=!0)}for(var c=0;c<e.length;c++){var d=[].concat(e[c]);n&&o[d[0]]||(void 0!==a&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=a),i&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=i):d[2]=i),r&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=r):d[4]="".concat(r)),t.push(d))}},t}},601(e){e.exports=function(e){return e[1]}}};const t={};function i(n){const r=t[n];if(void 0!==r)return r.exports;const a=t[n]={id:n,exports:{}};return e[n](a,a.exports,i),a.exports}i.n=e=>{const t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.cw=e=>{var t;return()=>{if(e){var i=e;e=0,t={exports:{}},i.call(t.exports,t,t.exports)}return t.exports}},i.d=(e,t)=>{if(Array.isArray(t))for(var n=0;n<t.length;){var r=t[n++],a=t[n++],o=0===a?{enumerable:!0,value:t[n++]}:{enumerable:!0,get:a};i.o(e,r)||Object.defineProperty(e,r,o)}else for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i.nc=void 0;var n=i.cw(function(e,t){var i=[];function n(e){for(var t=-1,n=0;n<i.length;n++)if(i[n].identifier===e){t=n;break}return t}function r(e,t){for(var r={},o=[],s=0;s<e.length;s++){var l=e[s],c=t.base?l[0]+t.base:l[0],d=r[c]||0,p="".concat(c," ").concat(d);r[c]=d+1;var u=n(p),h={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==u)i[u].references++,i[u].updater(h);else{var m=a(h,t);t.byIndex=s,i.splice(s,0,{identifier:p,updater:m,references:1})}o.push(p)}return o}function a(e,t){var i=t.domAPI(t);i.update(e);return function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;i.update(e=t)}else i.remove()}}e.exports=function(e,t){var a=r(e=e||[],t=t||{});return function(e){e=e||[];for(var o=0;o<a.length;o++){var s=n(a[o]);i[s].references--}for(var l=r(e,t),c=0;c<a.length;c++){var d=n(a[c]);0===i[d].references&&(i[d].updater(),i.splice(d,1))}a=l}}}),r=i.cw(function(e,t){var i={};e.exports=function(e,t){var n=function(e){if(void 0===i[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}i[e]=t}return i[e]}(e);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");n.appendChild(t)}}),a=i.cw(function(e,t){e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}}),o=i.cw(function(e,t){e.exports=function(e){var t=i.nc;t&&e.setAttribute("nonce",t)}}),s=i.cw(function(e,t){e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(i){!function(e,t,i){var n="";i.supports&&(n+="@supports (".concat(i.supports,") {")),i.media&&(n+="@media ".concat(i.media," {"));var r=void 0!==i.layer;r&&(n+="@layer".concat(i.layer.length>0?" ".concat(i.layer):""," {")),n+=i.css,r&&(n+="}"),i.media&&(n+="}"),i.supports&&(n+="}");var a=i.sourceMap;a&&"undefined"!=typeof btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(n,e,t.options)}(t,e,i)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}}),l=i.cw(function(e,t){e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}});const c="magic-card",d="magic-card-editor",p=["content","controls","layout","advanced"],u=globalThis,h=u.ShadowRoot&&(void 0===u.ShadyCSS||u.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,m=Symbol(),g=new WeakMap;class f{constructor(e,t,i){if(this._$cssResult$=!0,i!==m)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(h&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=g.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&g.set(t,e))}return e}toString(){return this.cssText}}const b=e=>new f("string"==typeof e?e:e+"",void 0,m),v=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,n)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[n+1],e[0]);return new f(i,e,m)},y=h?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return b(t)})(e):e,{is:w,defineProperty:x,getOwnPropertyDescriptor:_,getOwnPropertyNames:$,getOwnPropertySymbols:k,getPrototypeOf:S}=Object,C=globalThis,T=C.trustedTypes,M=T?T.emptyScript:"",A=C.reactiveElementPolyfillSupport,E=(e,t)=>e,P={toAttribute(e,t){switch(t){case Boolean:e=e?M:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},z=(e,t)=>!w(e,t),R={attribute:!0,type:String,converter:P,reflect:!1,useDefault:!1,hasChanged:z};Symbol.metadata??=Symbol("metadata"),C.litPropertyMetadata??=new WeakMap;class I extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=R){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(e,i,t);void 0!==n&&x(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){const{get:n,set:r}=_(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:n,set(t){const a=n?.call(this);r?.call(this,t),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??R}static _$Ei(){if(this.hasOwnProperty(E("elementProperties")))return;const e=S(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(E("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(E("properties"))){const e=this.properties,t=[...$(e),...k(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(y(e))}else void 0!==e&&t.push(y(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(h)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of t){const t=document.createElement("style"),n=u.litNonce;void 0!==n&&t.setAttribute("nonce",n),t.textContent=i.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(void 0!==n&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:P).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,n=i._$Eh.get(e);if(void 0!==n&&this._$Em!==n){const e=i.getPropertyOptions(n),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:P;this._$Em=n;const a=r.fromAttribute(t,e.type);this[n]=a??this._$Ej?.get(n)??a,this._$Em=null}}requestUpdate(e,t,i,n=!1,r){if(void 0!==e){const a=this.constructor;if(!1===n&&(r=this[e]),i??=a.getPropertyOptions(e),!((i.hasChanged??z)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:n,wrapped:r},a){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==r||void 0!==a)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===n&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,n=this[t];!0!==e||this._$AL.has(t)||void 0===n||this.C(t,void 0,i,n)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}}I.elementStyles=[],I.shadowRootOptions={mode:"open"},I[E("elementProperties")]=new Map,I[E("finalized")]=new Map,A?.({ReactiveElement:I}),(C.reactiveElementVersions??=[]).push("2.1.2");const L=globalThis,O=e=>e,D=L.trustedTypes,N=D?D.createPolicy("lit-html",{createHTML:e=>e}):void 0,F="$lit$",j=`lit$${Math.random().toFixed(9).slice(2)}$`,B="?"+j,q=`<${B}>`,H=document,G=()=>H.createComment(""),U=e=>null===e||"object"!=typeof e&&"function"!=typeof e,V=Array.isArray,W=e=>V(e)||"function"==typeof e?.[Symbol.iterator],K="[ \t\n\f\r]",Q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y=/-->/g,X=/>/g,Z=RegExp(`>|${K}(?:([^\\s"'>=/]+)(${K}*=${K}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),J=/'/g,ee=/"/g,te=/^(?:script|style|textarea|title)$/i,ie=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),ne=ie(1),re=(ie(2),ie(3),Symbol.for("lit-noChange")),ae=Symbol.for("lit-nothing"),oe=new WeakMap,se=H.createTreeWalker(H,129);function le(e,t){if(!V(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==N?N.createHTML(t):t}const ce=(e,t)=>{const i=e.length-1,n=[];let r,a=2===t?"<svg>":3===t?"<math>":"",o=Q;for(let t=0;t<i;t++){const i=e[t];let s,l,c=-1,d=0;for(;d<i.length&&(o.lastIndex=d,l=o.exec(i),null!==l);)d=o.lastIndex,o===Q?"!--"===l[1]?o=Y:void 0!==l[1]?o=X:void 0!==l[2]?(te.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=Z):void 0!==l[3]&&(o=Z):o===Z?">"===l[0]?(o=r??Q,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,s=l[1],o=void 0===l[3]?Z:'"'===l[3]?ee:J):o===ee||o===J?o=Z:o===Y||o===X?o=Q:(o=Z,r=void 0);const p=o===Z&&e[t+1].startsWith("/>")?" ":"";a+=o===Q?i+q:c>=0?(n.push(s),i.slice(0,c)+F+i.slice(c)+j+p):i+j+(-2===c?t:p)}return[le(e,a+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),n]};class de{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let r=0,a=0;const o=e.length-1,s=this.parts,[l,c]=ce(e,t);if(this.el=de.createElement(l,i),se.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(n=se.nextNode())&&s.length<o;){if(1===n.nodeType){if(n.hasAttributes())for(const e of n.getAttributeNames())if(e.endsWith(F)){const t=c[a++],i=n.getAttribute(e).split(j),o=/([.?@])?(.*)/.exec(t);s.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?ge:"?"===o[1]?fe:"@"===o[1]?be:me}),n.removeAttribute(e)}else e.startsWith(j)&&(s.push({type:6,index:r}),n.removeAttribute(e));if(te.test(n.tagName)){const e=n.textContent.split(j),t=e.length-1;if(t>0){n.textContent=D?D.emptyScript:"";for(let i=0;i<t;i++)n.append(e[i],G()),se.nextNode(),s.push({type:2,index:++r});n.append(e[t],G())}}}else if(8===n.nodeType)if(n.data===B)s.push({type:2,index:r});else{let e=-1;for(;-1!==(e=n.data.indexOf(j,e+1));)s.push({type:7,index:r}),e+=j.length-1}r++}}static createElement(e,t){const i=H.createElement("template");return i.innerHTML=e,i}}function pe(e,t,i=e,n){if(t===re)return t;let r=void 0!==n?i._$Co?.[n]:i._$Cl;const a=U(t)?void 0:t._$litDirective$;return r?.constructor!==a&&(r?._$AO?.(!1),void 0===a?r=void 0:(r=new a(e),r._$AT(e,i,n)),void 0!==n?(i._$Co??=[])[n]=r:i._$Cl=r),void 0!==r&&(t=pe(e,r._$AS(e,t.values),r,n)),t}class ue{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,n=(e?.creationScope??H).importNode(t,!0);se.currentNode=n;let r=se.nextNode(),a=0,o=0,s=i[0];for(;void 0!==s;){if(a===s.index){let t;2===s.type?t=new he(r,r.nextSibling,this,e):1===s.type?t=new s.ctor(r,s.name,s.strings,this,e):6===s.type&&(t=new ve(r,this,e)),this._$AV.push(t),s=i[++o]}a!==s?.index&&(r=se.nextNode(),a++)}return se.currentNode=H,n}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class he{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,n){this.type=2,this._$AH=ae,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=pe(this,e,t),U(e)?e===ae||null==e||""===e?(this._$AH!==ae&&this._$AR(),this._$AH=ae):e!==this._$AH&&e!==re&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):W(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ae&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(H.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,n="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=de.createElement(le(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(t);else{const e=new ue(n,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=oe.get(e.strings);return void 0===t&&oe.set(e.strings,t=new de(e)),t}k(e){V(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,n=0;for(const r of e)n===t.length?t.push(i=new he(this.O(G()),this.O(G()),this,this.options)):i=t[n],i._$AI(r),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=O(e).nextSibling;O(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class me{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,n,r){this.type=1,this._$AH=ae,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=ae}_$AI(e,t=this,i,n){const r=this.strings;let a=!1;if(void 0===r)e=pe(this,e,t,0),a=!U(e)||e!==this._$AH&&e!==re,a&&(this._$AH=e);else{const n=e;let o,s;for(e=r[0],o=0;o<r.length-1;o++)s=pe(this,n[i+o],t,o),s===re&&(s=this._$AH[o]),a||=!U(s)||s!==this._$AH[o],s===ae?e=ae:e!==ae&&(e+=(s??"")+r[o+1]),this._$AH[o]=s}a&&!n&&this.j(e)}j(e){e===ae?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ge extends me{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ae?void 0:e}}class fe extends me{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ae)}}class be extends me{constructor(e,t,i,n,r){super(e,t,i,n,r),this.type=5}_$AI(e,t=this){if((e=pe(this,e,t,0)??ae)===re)return;const i=this._$AH,n=e===ae&&i!==ae||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==ae&&(i===ae||n);n&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ve{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){pe(this,e)}}const ye={M:F,P:j,A:B,C:1,L:ce,R:ue,D:W,V:pe,I:he,H:me,N:fe,U:be,B:ge,F:ve},we=L.litHtmlPolyfillSupport;we?.(de,he),(L.litHtmlVersions??=[]).push("3.3.3");const xe=globalThis;class _e extends I{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const n=i?.renderBefore??t;let r=n._$litPart$;if(void 0===r){const e=i?.renderBefore??null;n._$litPart$=r=new he(t.insertBefore(G(),e),e,void 0,i??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return re}}_e._$litElement$=!0,_e.finalized=!0,xe.litElementHydrateSupport?.({LitElement:_e});const $e=xe.litElementPolyfillSupport;$e?.({LitElement:_e});(xe.litElementVersions??=[]).push("4.2.2");const ke=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},Se={attribute:!0,type:String,converter:P,reflect:!1,hasChanged:z},Ce=(e=Se,t,i)=>{const{kind:n,metadata:r}=i;let a=globalThis.litPropertyMetadata.get(r);if(void 0===a&&globalThis.litPropertyMetadata.set(r,a=new Map),"setter"===n&&((e=Object.create(e)).wrapped=!0),a.set(i.name,e),"accessor"===n){const{name:n}=i;return{set(i){const r=t.get.call(this);t.set.call(this,i),this.requestUpdate(n,r,e,!0,i)},init(t){return void 0!==t&&this.C(n,void 0,e,t),t}}}if("setter"===n){const{name:n}=i;return function(i){const r=this[n];t.call(this,i),this.requestUpdate(n,r,e,!0,i)}}throw Error("Unsupported decorator location: "+n)};function Te(e){return(t,i)=>"object"==typeof i?Ce(e,t,i):((e,t,i)=>{const n=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),n?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function Me(e){return Te({...e,state:!0,attribute:!1})}const Ae=v`
  :host {
    --mc-primary: var(--primary-color, #6366f1);
    --mc-bg: var(--card-background-color, #ffffff);
    --mc-text: var(--primary-text-color, #1a1a2e);
    --mc-text-secondary: var(--secondary-text-color, #6b7280);
    --mc-border: var(--divider-color, #e5e7eb);
    --mc-surface-recessed: color-mix(in srgb, var(--primary-text-color, #1a1a2e) 5%, transparent);
    --mc-primary-light: color-mix(in srgb, var(--mc-primary) 15%, transparent);
    --mc-gap: 10px;
    --mc-gap-xs: 4px;
    --mc-gap-sm: 8px;
    --mc-gap-md: 14px;
    --mc-padding: 16px;
    --mc-radius: 12px;
    --mc-radius-sm: 4px;
    --mc-radius-md: 8px;
    --mc-radius-lg: 12px;
    --mc-font-size-xs: 0.75rem;
    --mc-font-size-sm: 0.875rem;
    --mc-font-size-md: 1rem;
    --mc-font-size-lg: 1.125rem;
    --mc-font-size-xl: 1.25rem;
    --mc-font-size-2xl: 1.5rem;
    --mc-transition-duration: 0.2s;
    --mc-icon-size-sm: 18px;
    --mc-icon-size-md: 24px;
    --mc-icon-size-lg: 32px;
    --mc-icon-size-xl: 36px;
    --mc-button-padding: 10px 16px;
    --mc-button-padding-icon: 8px;
    --mc-button-radius: var(--mc-radius-md);
    --mc-button-color: var(--primary-color, #03a9f4);
    --mc-button-text-color: var(--text-primary-color, #fff);
    --mc-button-font-size: var(--mc-font-size-md);
    --mc-button-icon-size: 20px;
    --mc-slider-vertical-height: 120px;
    --mc-slider-radius: var(--mc-radius-lg);
    --mc-light-color-temp: #ff9800;
    --mc-light-label-opacity: 0.7;
    --mc-light-color-input-size: 32px;
    --mc-spinbox-gap: var(--mc-gap-md);
    --mc-spinbox-btn-size: 32px;
    --mc-spinbox-btn-color: var(--primary-color, #03a9f4);
    --mc-spinbox-btn-text-color: var(--text-primary-color, #fff);
    --mc-spinbox-btn-font-size: 18px;
    --mc-spinbox-value-font-size: 20px;
    --mc-spinbox-value-font-weight: 600;
    --mc-spinbox-value-min-width: 40px;
    --mc-bar-height: 8px;
    --mc-bar-radius: var(--mc-radius-sm);
    --mc-bar-transition: 0.3s ease;
    --mc-dropdown-padding: 10px 14px;
    --mc-dropdown-radius: var(--mc-radius-md);
    --mc-dropdown-font-size: var(--mc-font-size-md);
    --mc-forecast-icon-size: 20px;
    --mc-modal-radius: 12px;
    --mc-modal-input-radius: 6px;
    --mc-modal-overlay-bg: rgba(0, 0, 0, 0.5);
    --mc-modal-z-index: 10000;
    --mc-modal-width: 420px;
    --mc-modal-max-height: 80vh;
    --mc-modal-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    --mc-modal-header-bg: var(--mc-bg);
    --mc-modal-item-gap: 14px;
    --mc-modal-item-padding: 14px 16px;
    --mc-modal-item-hover-bg: color-mix(in srgb, var(--mc-primary) 8%, transparent);
    --mc-modal-item-border: 1px solid var(--mc-border);
    --mc-modal-item-icon-size: 40px;
    --mc-modal-item-icon-bg: color-mix(in srgb, var(--mc-primary) 12%, transparent);
    --mc-modal-item-icon-radius: 50%;
    --mc-modal-list-max-height: 400px;
    --mc-modal-btn-bg: var(--mc-primary);
    --mc-modal-btn-color: var(--text-primary-color, #fff);
    --mc-modal-btn-radius: 6px;
    --mc-modal-save-bg: var(--success-color, #4caf50);
    --mc-modal-save-color: var(--text-primary-color, #fff);
    --mc-modal-cancel-bg: var(--error-color, #f44336);
    --mc-modal-cancel-color: var(--text-primary-color, #fff);
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`,Ee=v`
  :host {
    --mc-accent: var(--primary-color, #03a9f4);
    --mc-accent-ink: color-mix(in srgb, var(--primary-color, #03a9f4) 60%, var(--primary-text-color, #212121));
    /* filled accent surfaces (primary button, checked switch): darkened so white text/knob stays >= 4.5:1 in both themes */
    --mc-accent-fill: color-mix(in srgb, var(--primary-color, #03a9f4) 70%, #000);
    --mc-on-accent: #fff;
    --mc-accent-tint: color-mix(in srgb, var(--primary-color, #03a9f4) 12%, transparent);
    --mc-surface: var(--card-background-color, #fff);
    --mc-surface-2: var(--secondary-background-color, #f2f3f5);
    --mc-ground: var(--primary-background-color, #fafafa);
    --mc-text: var(--primary-text-color, #212121);
    --mc-text-2: var(--secondary-text-color, #5f6368);
    --mc-divider: var(--divider-color, rgba(0, 0, 0, 0.12));
    --mc-field-border: color-mix(in srgb, var(--primary-text-color, #212121) 40%, transparent);
    --mc-warn-ink: color-mix(in srgb, var(--warning-color, #ff9800) 45%, var(--primary-text-color, #212121));
    --mc-warn-tint: color-mix(in srgb, var(--warning-color, #ff9800) 12%, transparent);
    --mc-error-ink: color-mix(in srgb, var(--error-color, #db4437) 75%, var(--primary-text-color, #212121));
    --mc-success: var(--success-color, #43a047);
    /*
     * Selection colour per level (canvas frame, handles, name tag, hover; layers + inspector tile).
     * stroke: frame/hover border; fill: name tag behind white text (mixed toward black, >= 4.5:1);
     * ink: text/icons on Surface or on the 12% tint (>= 4.5:1 light + dark); tint: selected-row wash.
     */
    --mc-sel-module: var(--mc-accent);
    --mc-sel-module-fill: var(--mc-accent-fill);
    --mc-sel-module-ink: var(--mc-accent-ink);
    --mc-sel-module-tint: var(--mc-accent-tint);
    --mc-sel-col: color-mix(in srgb, var(--success-color, #43a047) 85%, var(--primary-text-color, #212121));
    --mc-sel-col-fill: color-mix(in srgb, var(--success-color, #43a047) 70%, #000);
    --mc-sel-col-ink: color-mix(in srgb, var(--success-color, #43a047) 60%, var(--primary-text-color, #212121));
    --mc-sel-col-tint: color-mix(in srgb, var(--success-color, #43a047) 12%, transparent);
    --mc-sel-row: color-mix(in srgb, var(--warning-color, #ff9800) 70%, var(--primary-text-color, #212121));
    --mc-sel-row-fill: color-mix(in srgb, var(--warning-color, #ff9800) 55%, #000);
    --mc-sel-row-ink: var(--mc-warn-ink);
    --mc-sel-row-tint: var(--mc-warn-tint);
    --mc-sel-card: var(--mc-text-2);
    --mc-sel-card-fill: color-mix(in srgb, var(--secondary-text-color, #5f6368) 70%, #000);
    --mc-sel-card-ink: color-mix(in srgb, var(--secondary-text-color, #5f6368) 60%, var(--primary-text-color, #212121));
    --mc-sel-card-tint: color-mix(in srgb, var(--secondary-text-color, #5f6368) 12%, transparent);
    --mc-canvas: color-mix(in srgb, var(--primary-text-color, #212121) 6%, var(--primary-background-color, #fafafa));
    --mc-canvas-dot: color-mix(in srgb, var(--primary-text-color, #212121) 16%, transparent);
    --mc-shadow-float: 0 8px 24px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.08);
    --mc-mono: 'Roboto Mono', ui-monospace, SFMono-Regular, Consolas, monospace;
    --mc-radius: 8px;
    --mc-radius-lg: 12px;
    font-family: inherit;
    color: var(--mc-text);
    caret-color: var(--mc-accent);
  }
`,Pe=v`
  /* ---------------------------------------------------------------- base */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  ::selection {
    background: var(--mc-accent-tint);
    color: var(--mc-text);
  }
  /* ------------------------------------------------- selection level */
  /* Sets --k / --k-fill / --k-ink / --k-tint to one level's selection colours. */
  .k-module {
    --k: var(--mc-sel-module);
    --k-fill: var(--mc-sel-module-fill);
    --k-ink: var(--mc-sel-module-ink);
    --k-tint: var(--mc-sel-module-tint);
  }
  .k-column {
    --k: var(--mc-sel-col);
    --k-fill: var(--mc-sel-col-fill);
    --k-ink: var(--mc-sel-col-ink);
    --k-tint: var(--mc-sel-col-tint);
  }
  .k-row {
    --k: var(--mc-sel-row);
    --k-fill: var(--mc-sel-row-fill);
    --k-ink: var(--mc-sel-row-ink);
    --k-tint: var(--mc-sel-row-tint);
  }
  .k-card {
    --k: var(--mc-sel-card);
    --k-fill: var(--mc-sel-card-fill);
    --k-ink: var(--mc-sel-card-ink);
    --k-tint: var(--mc-sel-card-tint);
  }
  * {
    scrollbar-width: thin;
    scrollbar-color: var(--mc-field-border) transparent;
  }
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--mc-divider);
    border-radius: 9999px;
    border: 2px solid transparent;
    background-clip: padding-box;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: var(--mc-field-border);
  }
  button,
  input,
  select,
  textarea {
    font: inherit;
    color: inherit;
  }
  button {
    cursor: pointer;
  }
  :focus-visible {
    outline: 2px solid var(--mc-accent);
    outline-offset: 2px;
  }
  .mono {
    font-family: var(--mc-mono);
    font-size: 0.8125rem;
  }
  [hidden] {
    display: none !important;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }

  /* ------------------------------------------------- the ONE tab / segmented style */
  .seg {
    display: inline-flex;
    align-items: stretch;
    gap: 2px;
    padding: 3px;
    background: var(--mc-surface-2);
    border: 1px solid var(--mc-divider);
    border-radius: 10px;
    max-width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .seg::-webkit-scrollbar {
    display: none;
  }
  .seg.full {
    display: flex;
    width: 100%;
  }
  .seg.full > button {
    flex: 1 0 auto;
    justify-content: center;
  }
  .seg > button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 32px;
    padding: 0 10px;
    border: 0;
    border-radius: 7px;
    background: transparent;
    white-space: nowrap;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--mc-text-2);
    transition: background-color 0.15s ease-out, color 0.15s ease-out;
  }
  .seg > button ha-icon {
    --mdc-icon-size: 18px;
  }
  .seg > button:hover {
    color: var(--mc-text);
    background: color-mix(in srgb, var(--mc-surface) 55%, transparent);
  }
  .seg > button[aria-selected='true'],
  .seg > button[aria-checked='true'],
  .seg > button.active {
    background: var(--mc-surface);
    color: var(--mc-accent-ink);
    box-shadow: 0 0 0 1px var(--mc-divider), 0 1px 2px rgba(0, 0, 0, 0.08);
  }
  .seg > button:focus-visible {
    outline-offset: -2px;
  }

  /* ------------------------------------------------- the ONE chip style */
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    min-height: 24px;
    padding: 0 10px;
    border-radius: 9999px;
    border: 1px solid var(--mc-divider);
    background: var(--mc-surface);
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1;
    color: var(--mc-text-2);
    white-space: nowrap;
  }
  .chip ha-icon {
    --mdc-icon-size: 14px;
  }
  button.chip {
    min-height: 28px;
  }
  button.chip:hover {
    border-color: var(--mc-field-border);
    color: var(--mc-text);
  }
  .chip.is-accent {
    color: var(--mc-accent-ink);
    border-color: color-mix(in srgb, var(--mc-accent) 45%, transparent);
    background: var(--mc-accent-tint);
  }
  .chip.is-warn {
    color: var(--mc-warn-ink);
    border-color: color-mix(in srgb, var(--mc-warn-ink) 40%, transparent);
    background: var(--mc-warn-tint);
  }
  .chip.is-count {
    min-height: 20px;
    padding: 0 8px;
  }

  /* ------------------------------------------------- the ONE button hierarchy */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 40px;
    padding: 0 16px;
    border-radius: var(--mc-radius);
    border: 1px solid transparent;
    font-size: 0.875rem;
    font-weight: 500;
    white-space: nowrap;
    transition: background-color 0.15s ease-out, border-color 0.15s ease-out, box-shadow 0.15s ease-out;
  }
  .btn ha-icon {
    --mdc-icon-size: 18px;
  }
  .btn-primary {
    background: var(--mc-accent-fill);
    color: var(--mc-on-accent);
  }
  .btn-primary:hover {
    box-shadow: inset 0 0 0 999px rgba(255, 255, 255, 0.1);
  }
  .btn-primary:active {
    box-shadow: inset 0 0 0 999px rgba(0, 0, 0, 0.1);
  }
  .btn-secondary {
    background: var(--mc-surface);
    border-color: var(--mc-field-border);
    color: var(--mc-text);
  }
  .btn-secondary:hover {
    background: var(--mc-surface-2);
  }
  .btn-text {
    background: transparent;
    color: var(--mc-accent-ink);
    padding: 0 12px;
  }
  .btn-text:hover {
    background: var(--mc-accent-tint);
  }
  .btn-sm {
    min-height: 32px;
    padding: 0 12px;
    font-size: 0.8125rem;
  }
  .btn:disabled,
  .icon-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    box-shadow: none;
  }
  .icon-btn {
    display: inline-grid;
    place-items: center;
    width: 40px;
    height: 40px;
    flex: none;
    padding: 0;
    border: 0;
    border-radius: var(--mc-radius);
    background: transparent;
    color: var(--mc-text-2);
    --mdc-icon-size: 20px;
  }
  .icon-btn:hover:not(:disabled) {
    background: var(--mc-surface-2);
    color: var(--mc-text);
  }
  .icon-btn.sm {
    width: 32px;
    height: 32px;
    --mdc-icon-size: 18px;
  }
  .icon-btn.danger:hover:not(:disabled) {
    color: var(--mc-error-ink);
  }

  /* ------------------------------------------------- fields */
  .field {
    display: grid;
    gap: 6px;
    min-width: 0;
  }
  .field-head {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 24px;
  }
  .field-head label,
  .field-head .lbl {
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--mc-text);
    flex: 1;
    min-width: 0;
  }
  /* reset of a set field (field-reset.ts): a 32px icon button that does not grow the 24px head */
  .field-reset {
    margin: -4px -6px -4px 0;
  }
  .help {
    margin: 0;
    font-size: 0.75rem;
    color: var(--mc-text-2);
  }
  .help.lead {
    font-size: 0.875rem;
  }
  .input {
    width: 100%;
    min-height: 40px;
    margin: 0;
    padding: 8px 12px;
    border: 1px solid var(--mc-field-border);
    border-radius: var(--mc-radius);
    background: var(--mc-surface);
    color: var(--mc-text);
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.4;
    transition: border-color 0.15s ease-out, box-shadow 0.15s ease-out;
  }
  .input::placeholder {
    color: var(--mc-text-2);
    opacity: 1;
  }
  .input:hover {
    border-color: var(--mc-text-2);
  }
  .input:focus {
    outline: none;
    border-color: var(--mc-accent);
    box-shadow: 0 0 0 1px var(--mc-accent);
  }
  .input:disabled {
    background: var(--mc-surface-2);
    color: var(--mc-text-2);
    cursor: not-allowed;
  }
  textarea.input {
    resize: vertical;
    min-height: 88px;
    line-height: 1.5;
    font-family: var(--mc-mono);
    font-size: 0.8125rem;
  }
  .input.mono {
    font-family: var(--mc-mono);
    font-size: 0.8125rem;
  }
  .with-icon {
    position: relative;
  }
  .with-icon > ha-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    --mdc-icon-size: 18px;
    color: var(--mc-text-2);
    pointer-events: none;
  }
  .with-icon > .input {
    padding-left: 40px;
  }
  /* a small icon button inside the right edge of a field (browse entities / icons) */
  .with-action > .input {
    padding-right: 44px;
  }
  .with-icon > .field-action {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
  }
  .with-icon + .entity-meta {
    margin: 6px 0 0;
  }
  .select {
    position: relative;
    display: block;
    min-width: 0;
  }
  .select select {
    appearance: none;
    -webkit-appearance: none;
    padding-right: 36px;
    cursor: pointer;
  }
  .select > ha-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--mc-text-2);
    --mdc-icon-size: 18px;
  }
  .unit {
    display: flex;
    min-width: 0;
  }
  .unit > .input {
    flex: 1 1 auto;
    min-width: 7ch;
    border-radius: var(--mc-radius) 0 0 var(--mc-radius);
  }
  .unit > .select {
    flex: none;
    width: 76px;
  }
  .unit > .select select {
    border-radius: 0 var(--mc-radius) var(--mc-radius) 0;
    margin-left: -1px;
    padding-left: 10px;
  }
  .unit > .input:focus,
  .unit > .select select:focus {
    position: relative;
    z-index: 1;
  }
  .color {
    display: flex;
    gap: 8px;
    align-items: center;
    min-width: 0;
  }
  .color .input {
    flex: 1;
    min-width: 0;
  }
  .swatch {
    flex: none;
    width: 40px;
    height: 40px;
    padding: 0;
    border: 1px solid var(--mc-field-border);
    border-radius: var(--mc-radius);
    background: none;
    cursor: pointer;
  }
  .box-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px 12px;
  }
  .box-side {
    display: grid;
    gap: 4px;
    min-width: 0;
  }
  .box-side-label {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.75rem;
    color: var(--mc-text-2);
    --mdc-icon-size: 16px;
  }
  .box-foot {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .box-foot .select {
    width: 96px;
  }
  .switch-row {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 40px;
  }
  .switch-row .txt {
    flex: 1;
    min-width: 0;
    font-size: 0.8125rem;
    font-weight: 500;
  }
  .switch-row .txt .help {
    margin-top: 2px;
    font-weight: 400;
  }
  .switch {
    position: relative;
    flex: none;
    width: 40px;
    height: 24px;
    border-radius: 9999px;
    border: 0;
    padding: 0;
    background: var(--mc-field-border);
    transition: background-color 0.15s ease-out;
  }
  .switch::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    transition: transform 0.15s ease-out;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
  .switch[aria-checked='true'] {
    background: var(--mc-accent-fill);
  }
  .switch[aria-checked='true']::after {
    transform: translateX(16px);
  }
  .switch:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
  .sync {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    min-height: 24px;
    padding: 0 6px;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: var(--mc-text-2);
    font-size: 0.75rem;
    font-weight: 500;
    white-space: nowrap;
    --mdc-icon-size: 16px;
  }
  .sync:hover {
    background: var(--mc-surface-2);
    color: var(--mc-text);
  }
  .sync.is-over {
    color: var(--mc-warn-ink);
  }
  .sync.is-over:hover {
    background: var(--mc-warn-tint);
    color: var(--mc-warn-ink);
  }
  .entity-meta {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.75rem;
    color: var(--mc-text-2);
  }
  .entity-meta .dot,
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--mc-success);
    flex: none;
  }

  /* ------------------------------------------------- groups, conditions, layout */
  .group {
    display: grid;
    gap: 16px;
  }
  .group + .group {
    padding-top: 20px;
    border-top: 1px solid var(--mc-divider);
  }
  .group-head {
    display: flex;
    align-items: center;
    gap: 8px;
    --mdc-icon-size: 18px;
  }
  .group-head > ha-icon {
    color: var(--mc-text-2);
  }
  .group-head h3 {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 500;
    flex: 1;
  }
  .cond {
    border: 1px solid var(--mc-divider);
    border-radius: var(--mc-radius-lg);
    padding: 12px;
    display: grid;
    gap: 12px;
  }
  .cond-head {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .cond-head .n {
    font-size: 0.8125rem;
    font-weight: 500;
    flex: 1;
    min-width: 0;
  }
  .two {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
    gap: 16px 12px;
  }
  .empty {
    display: grid;
    justify-items: center;
    text-align: center;
    gap: 8px;
    padding: 24px 16px;
    border: 1px dashed var(--mc-divider);
    border-radius: var(--mc-radius-lg);
  }
  .empty > ha-icon {
    --mdc-icon-size: 28px;
    color: var(--mc-text-2);
  }
  .empty strong {
    font-weight: 500;
  }
  .empty p {
    margin: 0;
    color: var(--mc-text-2);
    font-size: 0.8125rem;
    max-width: 32ch;
  }
  .sectors {
    display: grid;
    border: 1px solid var(--mc-divider);
    border-radius: var(--mc-radius-lg);
    overflow: hidden;
  }
  .sector + .sector {
    border-top: 1px solid var(--mc-divider);
  }
  .sector-btn {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 48px;
    padding: 8px 12px;
    border: 0;
    background: transparent;
    text-align: left;
  }
  .sector-btn:hover {
    background: var(--mc-surface-2);
  }
  .sector-btn:focus-visible {
    outline-offset: -2px;
  }
  .sector-btn > ha-icon:first-child {
    --mdc-icon-size: 18px;
    color: var(--mc-text-2);
  }
  .sector-btn .nm {
    flex: 1;
    min-width: 0;
    font-weight: 500;
  }
  .sector-btn .chev {
    --mdc-icon-size: 20px;
    color: var(--mc-text-2);
    transition: transform 0.15s ease-out;
  }
  .sector-btn[aria-expanded='true'] .chev {
    transform: rotate(180deg);
  }
  .sector-body {
    padding: 4px 12px 16px;
    display: grid;
    gap: 16px;
  }
  .no-results {
    color: var(--mc-text-2);
    font-size: 0.8125rem;
    padding: 12px;
  }

  /* ------------------------------------------------- menu */
  .menu {
    position: absolute;
    z-index: 30;
    min-width: 240px;
    padding: 6px;
    border-radius: var(--mc-radius-lg);
    background: var(--mc-surface);
    border: 1px solid var(--mc-divider);
    box-shadow: var(--mc-shadow-float);
    display: grid;
  }
  .menu button {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 40px;
    padding: 0 12px;
    border: 0;
    border-radius: var(--mc-radius);
    background: transparent;
    text-align: left;
  }
  .menu button:hover,
  .menu button:focus-visible {
    background: var(--mc-surface-2);
    outline: none;
  }
  .menu button ha-icon {
    --mdc-icon-size: 18px;
    color: var(--mc-text-2);
  }
  .menu .menu-note {
    font-size: 0.75rem;
    color: var(--mc-text-2);
    padding: 6px 12px 8px;
  }
  .menu hr {
    border: 0;
    border-top: 1px solid var(--mc-divider);
    margin: 4px 0;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      transition-duration: 0s !important;
      animation-duration: 0s !important;
    }
  }
`,ze=b(":is(.mc-field, .mc-act-field, .mc-cond-field) :is(input, select, textarea):not([type='checkbox']):not([type='color']):not([type='range']):not([type='radio'])"),Re=[Ee,Pe,v`
  .mc-tab-content {
    display: grid;
    gap: 16px;
  }
  .mc-field {
    display: grid;
    gap: 6px;
    min-width: 0;
  }
  .mc-field-label,
  .mc-field > label,
  .mc-input-label {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 24px;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--mc-text);
    text-transform: none;
    letter-spacing: normal;
  }
  .mc-field-hint,
  .mc-mode-help {
    font-size: 0.75rem;
    font-style: normal;
    color: var(--mc-text-2);
  }

  /* inputs: identical to .input */
  ${ze},
  .mc-input-field.mc-input-field {
    width: 100%;
    min-height: 40px;
    margin: 0;
    padding: 8px 12px;
    border: 1px solid var(--mc-field-border);
    border-radius: var(--mc-radius);
    background: var(--mc-surface);
    color: var(--mc-text);
    font: inherit;
    font-size: 0.875rem;
    line-height: 1.4;
    outline: none;
    box-shadow: none;
    transition: border-color 0.15s ease-out, box-shadow 0.15s ease-out;
  }
  ${ze}::placeholder,
  .mc-input-field.mc-input-field::placeholder {
    color: var(--mc-text-2);
    opacity: 1;
  }
  ${ze}:hover,
  .mc-input-field.mc-input-field:hover {
    border-color: var(--mc-text-2);
  }
  ${ze}:focus,
  .mc-input-field.mc-input-field:focus {
    outline: none;
    border-color: var(--mc-accent);
    box-shadow: 0 0 0 1px var(--mc-accent);
  }
  ${ze}:disabled {
    background: var(--mc-surface-2);
    color: var(--mc-text-2);
    cursor: not-allowed;
  }
  ${ze}.mono {
    font-family: var(--mc-mono);
    font-size: 0.8125rem;
  }
  /* selects: .select look (bare selects get the chevron as a background image) */
  ${ze}:is(select):not([multiple]):not([size]) {
    appearance: none;
    -webkit-appearance: none;
    padding-right: 36px;
    cursor: pointer;
  }
  ${ze}:is(select):not(.input):not([multiple]):not([size]) {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%238b919a' d='M7.41 8.58 12 13.17l4.59-4.59L18 10l-6 6-6-6 1.41-1.42Z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 18px 18px;
  }
  /* textareas: textarea.input */
  ${ze}:is(textarea) {
    resize: vertical;
    min-height: 88px;
    line-height: 1.5;
    font-family: var(--mc-mono);
    font-size: 0.8125rem;
  }

  /* sections = .group */
  .mc-section {
    display: grid;
    gap: 16px;
  }
  .mc-section + .mc-section {
    padding-top: 20px;
    border-top: 1px solid var(--mc-divider);
  }
  .mc-section-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--mc-text);
  }

  /* buttons = .btn hierarchy */
  .mc-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 40px;
    padding: 0 16px;
    border-radius: var(--mc-radius);
    border: 1px solid transparent;
    font-size: 0.875rem;
    font-weight: 500;
    white-space: nowrap;
    filter: none;
    transform: none;
    transition: background-color 0.15s ease-out, border-color 0.15s ease-out, box-shadow 0.15s ease-out;
    --mdc-icon-size: 18px;
  }
  .mc-btn-primary {
    background: var(--mc-accent-fill);
    border-color: transparent;
    color: var(--mc-on-accent);
  }
  .mc-btn-primary:hover {
    filter: none;
    box-shadow: inset 0 0 0 999px rgba(255, 255, 255, 0.1);
  }
  .mc-btn-primary:active {
    box-shadow: inset 0 0 0 999px rgba(0, 0, 0, 0.1);
  }
  .mc-btn-secondary {
    background: var(--mc-surface);
    border: 1px solid var(--mc-field-border);
    color: var(--mc-text);
  }
  .mc-btn-secondary:hover {
    background: var(--mc-surface-2);
  }
  .mc-btn-small {
    min-height: 32px;
    padding: 0 12px;
    font-size: 0.8125rem;
  }
  .mc-btn-icon {
    display: inline-grid;
    place-items: center;
    width: 32px;
    height: 32px;
    flex: none;
    padding: 0;
    border: 0;
    border-radius: var(--mc-radius);
    background: transparent;
    color: var(--mc-text-2);
    --mdc-icon-size: 18px;
  }
  .mc-btn-icon:hover:not(:disabled) {
    background: var(--mc-surface-2);
    color: var(--mc-text);
  }
  :is(.mc-btn, .mc-btn-primary, .mc-btn-secondary, .mc-btn-icon):active {
    opacity: 1;
    transform: none;
  }
  :is(.mc-btn, .mc-btn-primary, .mc-btn-secondary, .mc-btn-icon):disabled {
    opacity: 0.45;
    cursor: not-allowed;
    box-shadow: none;
  }
  :is(.mc-btn, .mc-btn-primary, .mc-btn-secondary, .mc-btn-icon):focus-visible {
    outline: 2px solid var(--mc-accent);
    outline-offset: 2px;
  }

  /* conditions = .cond */
  .mc-conditions-list {
    display: grid;
    gap: 12px;
    margin: 0;
  }
  .mc-condition-item {
    position: relative;
    border: 1px solid var(--mc-divider);
    border-radius: var(--mc-radius-lg);
    padding: 12px;
    display: grid;
    gap: 12px;
  }

  /* tabs = .seg (full width) */
  .mc-tabs-header,
  .mc-editor-tab-switcher {
    display: flex;
    width: 100%;
    align-items: stretch;
    gap: 2px;
    padding: 3px;
    margin: 0;
    background: var(--mc-surface-2);
    border: 1px solid var(--mc-divider);
    border-radius: 10px;
    max-width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .mc-tab-button,
  .mc-editor-tab-switcher > button {
    flex: 1 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-height: 32px;
    padding: 0 10px;
    border: 0;
    border-radius: 7px;
    background: transparent;
    white-space: nowrap;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--mc-text-2);
    box-shadow: none;
    transition: background-color 0.15s ease-out, color 0.15s ease-out;
    --mdc-icon-size: 18px;
  }
  .mc-tab-button:hover,
  .mc-editor-tab-switcher > button:hover {
    color: var(--mc-text);
    background: color-mix(in srgb, var(--mc-surface) 55%, transparent);
  }
  .mc-tab-button.active,
  .mc-tab-button[aria-selected='true'],
  .mc-editor-tab-switcher > button.active,
  .mc-editor-tab-switcher > button[aria-selected='true'] {
    background: var(--mc-surface);
    color: var(--mc-accent-ink);
    box-shadow: 0 0 0 1px var(--mc-divider), 0 1px 2px rgba(0, 0, 0, 0.08);
  }
  .mc-tab-button:focus-visible,
  .mc-editor-tab-switcher > button:focus-visible {
    outline: 2px solid var(--mc-accent);
    outline-offset: -2px;
  }
`],Ie=e=>e.channels.includes("glow")||e.channels.includes("fx")||!!e.colour,Le=[{id:"linear",label:"Linear",css:"linear"},{id:"ease",label:"Ease",css:"ease"},{id:"ease-in",label:"Ease in",css:"ease-in"},{id:"ease-out",label:"Ease out",css:"ease-out"},{id:"ease-in-out",label:"Ease in-out",css:"ease-in-out"},{id:"spring",label:"Spring",css:"cubic-bezier(0.34, 1.56, 0.64, 1)"},{id:"smooth",label:"Smooth",css:"cubic-bezier(0.45, 0, 0.55, 1)"},{id:"snap",label:"Snap",css:"cubic-bezier(0.7, 0, 0.3, 1)"}],Oe=(e,t=1080)=>({label:e,unit:"deg",min:0,max:t}),De=(e,t=100)=>({label:e,unit:"%",min:0,max:t}),Ne=(e,t=60)=>({label:e,unit:"px",min:0,max:t}),Fe=(e="Particles",t=12)=>({label:e,unit:"",min:1,max:t}),je=Fe();function Be(e,t,i){const{direction:n="normal",...r}=i.extra||{};return{id:e,name:t,group:i.group,channels:i.channels,defaults:{duration:`${i.duration}s`,delay:"0s",easing:i.easing??"ease-in-out",iterations:"infinite",direction:n,intensity:i.intensity[1]},intensity:i.intensity[0],...r}}const qe={iconKeyframes:!0},He=[Be("breathe","Breathe",{group:"Glow & pulse",channels:["scale","opacity"],duration:3.2,intensity:[De("Scale",50),4]}),Be("glow-pulse","Glow pulse",{group:"Glow & pulse",channels:["glow"],duration:2,intensity:[Ne("Glow size"),16],extra:qe}),Be("halo-ripple","Halo ripple",{group:"Glow & pulse",channels:["glow"],duration:1.8,easing:"ease-out",intensity:[Ne("Ring size"),14],extra:qe}),Be("aura","Aura",{group:"Glow & pulse",channels:["glow"],duration:4,intensity:[Ne("Glow size"),24],extra:qe}),Be("heartbeat","Heartbeat",{group:"Glow & pulse",channels:["scale"],duration:1.4,intensity:[De("Scale",50),12]}),Be("spin","Spin",{group:"Motion",channels:["rotate"],duration:2,easing:"linear",intensity:[Oe("Rotation"),360]}),Be("fast-spin","Fast spin",{group:"Motion",channels:["rotate"],duration:.6,easing:"linear",intensity:[Oe("Rotation"),360]}),Be("sway","Sway",{group:"Motion",channels:["rotate"],duration:2.4,intensity:[Oe("Angle",90),6]}),Be("wobble","Wobble",{group:"Motion",channels:["translate","rotate"],duration:1.2,intensity:[Ne("Distance"),6]}),Be("shake-alert","Shake alert",{group:"Motion",channels:["translate"],duration:2,intensity:[Ne("Distance"),4]}),Be("rumble","Rumble",{group:"Motion",channels:["translate"],duration:.3,easing:"linear",intensity:[Ne("Distance",10),1]}),Be("float","Float",{group:"Motion",channels:["translate"],duration:3,intensity:[Ne("Distance"),6]}),Be("flame-flicker","Flame flicker",{group:"Weather & device",channels:["scale","rotate","filter"],duration:1.2,intensity:[De("Flicker",30),5],extra:{origin:"50% 100%",colour:!0}}),Be("steam-rise","Steam rise",{group:"Weather & device",channels:["fx"],duration:3,easing:"ease-out",intensity:[je,4],extra:{particles:"count"}}),Be("bubbles","Bubbles",{group:"Weather & device",channels:["fx"],duration:3.5,easing:"ease-in",intensity:[je,6],extra:{particles:"count"}}),Be("snow-fall","Snow fall",{group:"Weather & device",channels:["fx"],duration:5,easing:"linear",intensity:[je,6],extra:{particles:"count"}}),Be("rain-fall","Rain fall",{group:"Weather & device",channels:["fx"],duration:.9,easing:"linear",intensity:[je,6],extra:{particles:"count"}}),Be("liquid-wave","Liquid wave",{group:"Weather & device",channels:["fx"],duration:6,easing:"linear",intensity:[De("Fill level"),40],extra:{particles:2}}),Be("storm-flash","Storm flash",{group:"Weather & device",channels:["fx"],duration:5,easing:"linear",intensity:[De("Brightness"),75],extra:{particles:1,front:!0}}),Be("shine-sweep","Shine sweep",{group:"Light & colour",channels:["fx"],duration:3,intensity:[De("Shine"),45],extra:{particles:1,front:!0}}),Be("bounce","Bounce",{group:"Playful",channels:["translate","scale"],duration:1.6,easing:"ease",intensity:[Ne("Height"),10],extra:{origin:"50% 100%"}}),Be("jello","Jello",{group:"Playful",channels:["scale"],duration:1.8,easing:"ease",intensity:[De("Squash",50),12]}),Be("rubber-band","Rubber band",{group:"Playful",channels:["scale"],duration:1.6,easing:"ease",intensity:[De("Stretch",50),25]}),Be("tada","Tada",{group:"Playful",channels:["scale","rotate"],duration:2,easing:"ease",intensity:[Oe("Angle",45),3]}),Be("swing","Swing",{group:"Playful",channels:["rotate"],duration:2,easing:"ease-in-out",intensity:[Oe("Angle",90),15],extra:{origin:"50% 0"}}),Be("flip","Flip",{group:"Playful",channels:["rotate"],duration:2.4,easing:"smooth",intensity:[Oe("Rotation"),360]}),Be("pop","Pop",{group:"Playful",channels:["scale"],duration:1.8,easing:"ease-out",intensity:[De("Scale",50),18]}),Be("head-shake","Head shake",{group:"Playful",channels:["translate","rotate"],duration:1.6,easing:"ease-in-out",intensity:[Ne("Distance",30),6]}),Be("blink","Blink",{group:"Light & colour",channels:["opacity"],duration:1,easing:"linear",intensity:[De("Dim"),85]}),Be("neon-flicker","Neon flicker",{group:"Light & colour",channels:["opacity","filter"],duration:3,easing:"linear",intensity:[Ne("Glow size",30),8],extra:{colour:!0}}),Be("rainbow-hue","Rainbow hue",{group:"Light & colour",channels:["filter"],duration:6,easing:"linear",intensity:[Oe("Hue range",720),360]}),Be("glitch","Glitch",{group:"Light & colour",channels:["translate","filter"],duration:2.5,easing:"linear",intensity:[Ne("Offset",20),3],extra:{colour:!0}}),Be("fade-pulse","Fade pulse",{group:"Light & colour",channels:["opacity"],duration:2.4,intensity:[De("Fade"),60]}),Be("ping","Ping",{group:"Rings & sweeps",channels:["fx"],duration:2,easing:"ease-out",intensity:[De("Ring size",200),90],extra:{particles:1}}),Be("ripple-rings","Ripple rings",{group:"Rings & sweeps",channels:["fx"],duration:3,easing:"ease-out",intensity:[Fe("Rings",6),3],extra:{particles:"count"}}),Be("radar-sweep","Radar sweep",{group:"Rings & sweeps",channels:["fx"],duration:3,easing:"linear",intensity:[Oe("Beam width",180),70],extra:{particles:1}}),Be("conic-border-spin","Conic border spin",{group:"Rings & sweeps",channels:["fx"],duration:3,easing:"linear",intensity:[Ne("Border width",12),2],extra:{particles:1}}),Be("breathing-border","Breathing border",{group:"Rings & sweeps",channels:["glow"],duration:3,intensity:[Ne("Border width",12),2],extra:qe}),Be("fireflies","Fireflies",{group:"Scenes",channels:["fx"],duration:6,intensity:[je,8],extra:{particles:"count"}}),Be("confetti","Confetti",{group:"Scenes",channels:["fx"],duration:3.5,easing:"linear",intensity:[je,10],extra:{particles:"count"}}),Be("falling-leaves","Falling leaves",{group:"Scenes",channels:["fx"],duration:7,easing:"linear",intensity:[je,5],extra:{particles:"count"}}),Be("lightning","Lightning",{group:"Scenes",channels:["fx"],duration:4,easing:"linear",intensity:[De("Brightness"),90],extra:{particles:1,front:!0}}),Be("ocean-waves","Ocean waves",{group:"Scenes",channels:["fx"],duration:4,easing:"linear",intensity:[De("Wave height"),35],extra:{particles:3}}),Be("sun-rays","Sun rays",{group:"Scenes",channels:["fx"],duration:24,easing:"linear",intensity:[Oe("Ray width",30),6],extra:{particles:1}}),Be("heat-shimmer","Heat shimmer",{group:"Scenes",channels:["translate","filter"],duration:1.2,easing:"ease-in-out",intensity:[Ne("Strength",10),2]}),Be("wind-lines","Wind lines",{group:"Scenes",channels:["fx"],duration:2.2,intensity:[je,5],extra:{particles:"count"}}),Be("drip","Drip",{group:"Scenes",channels:["fx"],duration:2.4,easing:"ease-in",intensity:[je,3],extra:{particles:"count"}}),Be("equalizer-bars","Equalizer bars",{group:"Scenes",channels:["fx"],duration:.9,intensity:[Fe("Bars"),5],extra:{particles:"count",direction:"alternate"}}),Be("charging-stripes","Charging stripes",{group:"Scenes",channels:["fx"],duration:1,easing:"linear",intensity:[De("Stripe strength"),100],extra:{particles:1}}),Be("orbit-dots","Orbit dots",{group:"Scenes",channels:["fx"],duration:2.4,easing:"linear",intensity:[Fe("Dots",8),3],extra:{particles:"count"}}),Be("typing-dots","Typing dots",{group:"Scenes",channels:["fx"],duration:1.2,intensity:[Ne("Bounce",20),4],extra:{particles:3}})],Ge=["Glow & pulse","Motion","Playful","Light & colour","Rings & sweeps","Weather & device","Scenes"].filter(e=>He.some(t=>t.group===e)),Ue=new Map(He.map(e=>[e.id,e])),Ve=e=>e?Ue.get(e):void 0,We="animation-delay: calc(var(--mc-fx-delay, 0s) - var(--mc-anim-k) * var(--mc-fx-dur, 1s));",Ke={...{breathe:"\n    0%, 100% { scale: 1; opacity: 1; }\n    50% { scale: calc(1 + $i / 100); opacity: 0.78; }","glow-pulse":"\n    0%, 100% { box-shadow: 0 0 0 0 transparent; }\n    50% { box-shadow: 0 0 calc($i * 1px) calc($i * 0.19px) $c; }","glow-pulse-icon":"\n    0%, 100% { filter: drop-shadow(0 0 0 transparent); }\n    50% { filter: drop-shadow(0 0 calc($i * 0.375px) $c); }","halo-ripple":"\n    0% { box-shadow: 0 0 0 0 $c; }\n    100% { box-shadow: 0 0 0 calc($i * 1px) transparent; }","halo-ripple-icon":"\n    0% { filter: drop-shadow(0 0 0 $c); }\n    100% { filter: drop-shadow(0 0 calc($i * 0.7px) transparent); }",aura:"\n    0%, 100% {\n      box-shadow: 0 0 calc($i * 0.42px) calc($i * 0.04px) color-mix(in srgb, $c 60%, transparent),\n        inset 0 0 calc($i * 0.42px) color-mix(in srgb, $c 24%, transparent);\n    }\n    50% {\n      box-shadow: 0 0 calc($i * 1px) calc($i * 0.25px) $c,\n        inset 0 0 calc($i * 0.75px) color-mix(in srgb, $c 48%, transparent);\n    }","aura-icon":"\n    0%, 100% { filter: drop-shadow(0 0 calc($i * 0.125px) color-mix(in srgb, $c 50%, transparent)); }\n    50% { filter: drop-shadow(0 0 calc($i * 0.42px) $c); }",heartbeat:"\n    0%, 70%, 100% { scale: 1; }\n    14% { scale: calc(1 + $i / 100); }\n    28% { scale: 1; }\n    42% { scale: calc(1 + $i / 150); }",spin:"\n    from { rotate: 0deg; }\n    to { rotate: calc($i * 1deg); }","fast-spin":"\n    from { rotate: 0deg; }\n    to { rotate: calc($i * 1deg); }",sway:"\n    0%, 100% { rotate: calc($i * -1deg); }\n    50% { rotate: calc($i * 1deg); }",wobble:"\n    0%, 100% { translate: 0 0; rotate: 0deg; }\n    15% { translate: calc($i * -1px) 0; rotate: calc($i * -0.66deg); }\n    30% { translate: calc($i * 0.83px) 0; rotate: calc($i * 0.5deg); }\n    45% { translate: calc($i * -0.66px) 0; rotate: calc($i * -0.33deg); }\n    60% { translate: calc($i * 0.33px) 0; rotate: calc($i * 0.17deg); }\n    75% { translate: calc($i * -0.17px) 0; rotate: calc($i * -0.08deg); }","shake-alert":"\n    0%, 50%, 100% { translate: 0 0; }\n    5%, 15%, 25%, 35%, 45% { translate: calc($i * -1px) 0; }\n    10%, 20%, 30%, 40% { translate: calc($i * 1px) 0; }",rumble:"\n    0%, 100% { translate: 0 0; }\n    25% { translate: calc($i * 1px) calc($i * -1px); }\n    50% { translate: calc($i * -1px) calc($i * 1px); }\n    75% { translate: calc($i * 1px) calc($i * 1px); }",float:"\n    0%, 100% { translate: 0 0; }\n    50% { translate: 0 calc($i * -1px); }","flame-flicker":"\n    0%, 100% { scale: 1 1; rotate: 0deg; filter: drop-shadow(0 0 2px $c) brightness(1); }\n    25% { scale: calc(1 - $i * 0.004) calc(1 + $i / 100); rotate: calc($i * 0.3deg); filter: drop-shadow(0 -1px 6px $c) brightness(1.15); }\n    50% { scale: calc(1 + $i * 0.004) calc(1 - $i * 0.006); rotate: calc($i * -0.2deg); filter: drop-shadow(0 0 3px $c) brightness(0.95); }\n    75% { scale: calc(1 - $i * 0.002) calc(1 + $i * 0.008); rotate: calc($i * -0.4deg); filter: drop-shadow(0 -1px 5px $c) brightness(1.1); }","steam-rise":"\n    0% { translate: 0 0; scale: 0.5; opacity: 0; }\n    25% { opacity: 1; }\n    100% { translate: 0 -100cqh; scale: 1.7; opacity: 0; }",bubbles:"\n    0% { translate: 0 0; opacity: 0; }\n    10% { opacity: 1; }\n    50% { translate: 4px -55cqh; }\n    90% { opacity: 0.8; }\n    100% { translate: -3px calc(-100cqh - 12px); opacity: 0; }","snow-fall":"\n    0% { translate: 0 0; opacity: 0; }\n    10% { opacity: 1; }\n    50% { translate: 6px 50cqh; }\n    100% { translate: -2px calc(100cqh + 12px); opacity: 0.7; }","rain-fall":"\n    0% { translate: 0 0; opacity: 0; }\n    10% { opacity: 1; }\n    100% { translate: 0 calc(100cqh + 24px); opacity: 0.6; }","liquid-wave":"\n    from { rotate: 0deg; }\n    to { rotate: 360deg; }","storm-flash":"\n    0%, 88%, 100% { opacity: 0; }\n    90% { opacity: calc($i / 100); }\n    91.5% { opacity: 0.1; }\n    93.5% { opacity: calc($i / 125); }\n    96% { opacity: 0; }","shine-sweep":"\n    0% { translate: -100% 0; }\n    60%, 100% { translate: 100cqw 0; }",blink:"\n    0%, 45%, 100% { opacity: 1; }\n    50%, 95% { opacity: calc(1 - $i / 100); }","neon-flicker":"\n    0%, 17%, 23%, 26%, 52%, 58%, 100% { opacity: 1; filter: drop-shadow(0 0 calc($i * 1px) $c) brightness(1.1); }\n    20%, 25%, 55% { opacity: 0.45; filter: drop-shadow(0 0 0 transparent) brightness(0.8); }\n    24% { opacity: 0.8; filter: drop-shadow(0 0 calc($i * 0.4px) $c) brightness(1); }","rainbow-hue":"\n    from { filter: hue-rotate(0deg); }\n    to { filter: hue-rotate(calc($i * 1deg)); }",glitch:"\n    0%, 86%, 100% { translate: 0 0; filter: none; }\n    88% { translate: calc($i * -1px) 0; filter: drop-shadow(calc($i * 0.7px) 0 0 $c) drop-shadow(calc($i * -0.7px) 0 0 color-mix(in srgb, $c 35%, #00e5ff)); }\n    90% { translate: calc($i * 1px) calc($i * 0.3px); filter: drop-shadow(calc($i * -0.7px) 0 0 $c) hue-rotate(40deg); }\n    92% { translate: calc($i * -0.5px) 0; filter: drop-shadow(calc($i * 0.4px) 0 0 color-mix(in srgb, $c 35%, #ff1744)); }\n    94% { translate: 0 0; filter: none; }","fade-pulse":"\n    0%, 100% { opacity: 1; }\n    50% { opacity: calc(1 - $i / 100); }",bounce:"\n    0%, 20%, 53%, 100% { translate: 0 0; scale: 1 1; }\n    40%, 43% { translate: 0 calc($i * -1px); scale: 0.96 1.06; }\n    70% { translate: 0 calc($i * -0.5px); scale: 0.98 1.03; }\n    80% { translate: 0 0; scale: 1.04 0.96; }\n    90% { translate: 0 calc($i * -0.12px); scale: 1 1; }",jello:"\n    0%, 10%, 60%, 100% { scale: 1 1; }\n    18% { scale: calc(1 + $i / 100) calc(1 - $i / 100); }\n    26% { scale: calc(1 - $i / 100) calc(1 + $i / 100); }\n    34% { scale: calc(1 + $i / 200) calc(1 - $i / 200); }\n    42% { scale: calc(1 - $i / 400) calc(1 + $i / 400); }\n    50% { scale: calc(1 + $i / 800) calc(1 - $i / 800); }","rubber-band":"\n    0%, 55%, 100% { scale: 1 1; }\n    15% { scale: calc(1 + $i / 100) calc(1 - $i / 100); }\n    20% { scale: calc(1 - $i / 100) calc(1 + $i / 100); }\n    25% { scale: calc(1 + $i / 160) calc(1 - $i / 160); }\n    33% { scale: calc(1 - $i / 500) calc(1 + $i / 500); }\n    42% { scale: calc(1 + $i / 500) calc(1 - $i / 500); }",tada:"\n    0%, 50%, 100% { scale: 1; rotate: 0deg; }\n    5%, 10% { scale: 0.9; rotate: calc($i * -1deg); }\n    15%, 25%, 35%, 45% { scale: 1.1; rotate: calc($i * 1deg); }\n    20%, 30%, 40% { scale: 1.1; rotate: calc($i * -1deg); }",swing:"\n    0%, 60%, 100% { rotate: 0deg; }\n    12% { rotate: calc($i * 1deg); }\n    24% { rotate: calc($i * -0.66deg); }\n    36% { rotate: calc($i * 0.33deg); }\n    48% { rotate: calc($i * -0.2deg); }",flip:"\n    0%, 10% { rotate: y 0deg; }\n    60%, 100% { rotate: y calc($i * 1deg); }",pop:"\n    0%, 40%, 100% { scale: 1; }\n    10% { scale: calc(1 + $i / 100); }\n    20% { scale: calc(1 - $i / 400); }\n    30% { scale: calc(1 + $i / 600); }","head-shake":"\n    0%, 50%, 100% { translate: 0 0; rotate: 0deg; }\n    6.5% { translate: calc($i * -1px) 0; rotate: calc($i * -1deg); }\n    18.5% { translate: calc($i * 0.8px) 0; rotate: calc($i * 0.8deg); }\n    31.5% { translate: calc($i * -0.5px) 0; rotate: calc($i * -0.5deg); }\n    43.5% { translate: calc($i * 0.3px) 0; rotate: calc($i * 0.3deg); }"},...{ping:"\n    0% { scale: 0.15; opacity: 1; }\n    80%, 100% { scale: 1; opacity: 0; }","ripple-rings":"\n    0% { scale: 0.1; opacity: 1; }\n    100% { scale: 1; opacity: 0; }","radar-sweep":"\n    from { rotate: 0deg; }\n    to { rotate: 360deg; }","conic-border-spin":"\n    from { rotate: 0deg; }\n    to { rotate: 360deg; }","breathing-border":"\n    0%, 100% { box-shadow: inset 0 0 0 calc($i * 1px) color-mix(in srgb, $c 30%, transparent), 0 0 0 0 transparent; }\n    50% { box-shadow: inset 0 0 0 calc($i * 1px) $c, 0 0 calc($i * 4px) color-mix(in srgb, $c 35%, transparent); }","breathing-border-icon":"\n    0%, 100% { filter: drop-shadow(0 0 calc($i * 0.5px) color-mix(in srgb, $c 40%, transparent)); }\n    50% { filter: drop-shadow(0 0 calc($i * 1.5px) $c); }",fireflies:"\n    0% { translate: 0 0; opacity: 0; }\n    20% { opacity: 1; }\n    40% { translate: 10px -8px; }\n    60% { opacity: 0.3; }\n    75% { translate: -6px -14px; opacity: 1; }\n    100% { translate: 4px -22px; opacity: 0; }",confetti:"\n    0% { translate: 0 0; rotate: 0deg; opacity: 1; }\n    25% { translate: 8px 25cqh; rotate: 160deg; }\n    50% { translate: -6px 50cqh; rotate: 300deg; }\n    75% { translate: 6px 75cqh; rotate: 420deg; }\n    100% { translate: 0 calc(100cqh + 14px); rotate: 540deg; opacity: 1; }","falling-leaves":"\n    0% { translate: 0 0; rotate: 0deg; opacity: 0; }\n    10% { opacity: 1; }\n    30% { translate: 14px 30cqh; rotate: 60deg; }\n    55% { translate: -8px 55cqh; rotate: -20deg; }\n    80% { translate: 12px 80cqh; rotate: 80deg; }\n    100% { translate: 0 calc(100cqh + 16px); rotate: 20deg; opacity: 0.8; }",lightning:"\n    0%, 89%, 100% { opacity: 0; }\n    90% { opacity: calc($i / 100); }\n    91.5% { opacity: 0.15; }\n    93% { opacity: calc($i / 100); }\n    96% { opacity: 0; }","ocean-waves":"\n    from { translate: 0 0; }\n    to { translate: -40px 0; }","sun-rays":"\n    from { rotate: 0deg; }\n    to { rotate: 360deg; }","heat-shimmer":"\n    0%, 100% { translate: 0 0; filter: blur(0); }\n    25% { translate: calc($i * 0.5px) calc($i * -0.5px); filter: blur(calc($i * 0.3px)); }\n    50% { translate: calc($i * -0.5px) 0; filter: blur(0); }\n    75% { translate: 0 calc($i * 0.5px); filter: blur(calc($i * 0.2px)); }","wind-lines":"\n    0% { translate: 0 0; opacity: 0; }\n    15% { opacity: 1; }\n    85% { opacity: 0.8; }\n    100% { translate: calc(100cqw + 100%) 0; opacity: 0; }",drip:"\n    0% { translate: 0 0; scale: 0.4 0.2; opacity: 0; }\n    15% { scale: 1 1; opacity: 1; }\n    35% { translate: 0 2px; scale: 0.9 1.25; }\n    45% { translate: 0 4px; scale: 1 1; }\n    100% { translate: 0 calc(100cqh + 12px); scale: 0.9 1.3; opacity: 0.7; }","equalizer-bars":"\n    0% { scale: 1 0.15; }\n    30% { scale: 1 0.8; }\n    60% { scale: 1 0.35; }\n    100% { scale: 1 1; }","charging-stripes":"\n    from { translate: 0 0; }\n    to { translate: 28.2843px 0; }","orbit-dots":"\n    from { rotate: 0deg; }\n    to { rotate: 360deg; }","typing-dots":"\n    0%, 60%, 100% { translate: 0 0; opacity: 0.35; }\n    30% { translate: 0 calc($i * -1px); opacity: 1; }"}},Qe={...{"steam-rise":"\n    bottom: -12px; width: 18px; height: 18px; margin-left: -9px; border-radius: 50%;\n    background: $c; filter: blur(5px);",bubbles:"\n    bottom: -10px; width: 8px; height: 8px; margin-left: -4px; border-radius: 50%;\n    border: 1.5px solid $c;\n    background: color-mix(in srgb, $c 22%, transparent);","bubbles|:nth-child(even)":"width: 5px; height: 5px;","snow-fall":"\n    top: -8px; width: 5px; height: 5px; border-radius: 50%;\n    background: $c;","rain-fall":"\n    top: -18px; width: 2px; height: 14px; border-radius: 1px;\n    background: linear-gradient(transparent, $c);","liquid-wave":"\n    left: -50%; top: calc(100% - $i * 1%); width: 200%; aspect-ratio: 1; border-radius: 42%;\n    background: color-mix(in srgb, $c 50%, transparent); opacity: 1;","liquid-wave|:nth-child(2)":"\n    top: calc(100% - $i * 0.9%); border-radius: 38%;\n    background: $c; animation-direction: reverse;","storm-flash":"inset: 0; background: color-mix(in srgb, $c 35%, rgba(255, 255, 255, 0.55));","shine-sweep":"\n    top: 0; bottom: 0; left: 0; width: 45%; opacity: 1;\n    background: linear-gradient(100deg, transparent 0%,\n      color-mix(in srgb, var(--mca-shine-sweep-c, #fff) calc($i * 1%), transparent) 50%, transparent 100%);"},...{ping:"\n    left: 50%; top: 50%; width: calc($i * 1cqmin); aspect-ratio: 1; translate: -50% -50%;\n    border: 2px solid $c; border-radius: 50%; box-sizing: border-box;","ripple-rings":`\n    left: 50%; top: 50%; width: 110cqmin; aspect-ratio: 1; translate: -50% -50%;\n    border: 1.5px solid $c; border-radius: 50%; box-sizing: border-box; ${We}`,"radar-sweep":"\n    left: 50%; top: 50%; width: 150cqmax; aspect-ratio: 1; translate: -50% -50%; border-radius: 50%; opacity: 1;\n    background: conic-gradient(from 0deg, transparent 0deg calc(360deg - $i * 1deg),\n      $c 360deg);","conic-border-spin":"\n    left: 50%; top: 50%; width: 150cqmax; aspect-ratio: 1; translate: -50% -50%; opacity: 1;\n    background: conic-gradient(from 0deg, transparent 0% 55%, $c 80%, transparent 100%);",fireflies:"\n    top: calc(12% + var(--mc-anim-phase) * 72%); width: 4px; height: 4px; margin: -2px 0 0 -2px; border-radius: 50%;\n    background: $c; box-shadow: 0 0 6px 2px $c;",confetti:"top: -10px; width: 6px; height: 10px; border-radius: 1px; background: $c;","confetti|:nth-child(3n + 2)":"background: color-mix(in srgb, $c 40%, #ffeb3b);","confetti|:nth-child(3n)":"width: 8px; height: 6px; background: color-mix(in srgb, $c 40%, #e91e63);","falling-leaves":"\n    top: -14px; width: 10px; height: 10px; border-radius: 0 80% 0 80%;\n    background: $c;","falling-leaves|:nth-child(even)":"background: color-mix(in srgb, $c 75%, #7cb342);",lightning:"\n    left: 50%; top: 0; width: 32cqmin; height: 100%; translate: -50% 0;\n    background: color-mix(in srgb, $c 40%, #fff);\n    clip-path: polygon(58% 0, 22% 56%, 46% 56%, 32% 100%, 80% 40%, 56% 40%, 72% 0);","ocean-waves":"\n    left: 0; bottom: 0; width: calc(100% + 40px); height: calc($i * 1%); opacity: 1;\n    background: radial-gradient(22px 12px at 20px 0, transparent 98%, color-mix(in srgb, $c 45%, transparent) 100%) 0 0 / 40px 100% repeat-x;","ocean-waves|:nth-child(2)":"\n    height: calc($i * 0.75%); animation-direction: reverse; animation-duration: calc(var(--mc-fx-dur) * 1.5);\n    background: radial-gradient(22px 10px at 20px 0, transparent 98%, color-mix(in srgb, $c 70%, transparent) 100%) 0 0 / 40px 100% repeat-x;","ocean-waves|:nth-child(3)":"\n    height: calc($i * 0.5%); animation-duration: calc(var(--mc-fx-dur) * 0.7);\n    background: radial-gradient(22px 8px at 20px 0, transparent 98%, $c 100%) 0 0 / 40px 100% repeat-x;","sun-rays":"\n    left: 50%; top: 50%; width: 170cqmax; aspect-ratio: 1; translate: -50% -50%; opacity: 1;\n    background: repeating-conic-gradient(from 0deg, $c 0deg calc($i * 1deg),\n      transparent calc($i * 1deg) calc($i * 3deg));\n    mask: radial-gradient(closest-side, #000 15%, transparent 70%);","wind-lines":"\n    left: -35%; top: calc(10% + var(--mc-anim-phase) * 80%); width: 35%; height: 2px; border-radius: 2px;\n    background: linear-gradient(90deg, transparent, $c);",drip:"\n    top: -4px; width: 6px; height: 9px; margin-left: -3px; transform-origin: 50% 0;\n    border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%; background: $c;","equalizer-bars":"\n    left: calc(10% + var(--mc-anim-k) * 80%); bottom: 0; width: max(3px, 5%); height: 70%; opacity: 1;\n    border-radius: 2px 2px 0 0; transform-origin: 50% 100%; background: $c;","charging-stripes":"\n    top: 0; bottom: 0; left: -28.2843px; width: calc(100% + 28.2843px); opacity: 1;\n    background: repeating-linear-gradient(-45deg, color-mix(in srgb, $c calc($i * 1%), transparent) 0 10px, transparent 10px 20px);","orbit-dots":`\n    left: 50%; top: calc(50% - 38cqmin); width: 6px; height: 6px; margin: -3px 0 0 -3px; border-radius: 50%; opacity: 1;\n    background: $c; transform-origin: 3px calc(3px + 38cqmin); ${We}`,"typing-dots":"\n    left: calc(50% - 12px + var(--mc-anim-k) * 36px); top: 50%; width: 6px; height: 6px; margin: -3px 0 0 -3px;\n    border-radius: 50%; background: $c;\n    animation-delay: calc(var(--mc-fx-delay, 0s) - (1 - var(--mc-anim-k)) * var(--mc-fx-dur, 1s) * 0.5);"}},Ye={...{"conic-border-spin":"\n    padding: calc($i * 1px); box-sizing: border-box;\n    background: color-mix(in srgb, $c 18%, transparent);\n    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);\n    -webkit-mask-composite: xor;\n    mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);"}};function Xe(e,t,i=!1){const n=Ve(t),r=`var(--mca-${t}-c, var(--mc-anim-c))`;return e.replace(/\$i/g,`var(--mca-${t}-i, ${n?.defaults.intensity??1})`).replace(/\$c/g,i?`color-mix(in srgb, ${r} calc(var(--mca-${t}-s, 1) * 100%), transparent)`:r)}const Ze=v`
  [data-mc-anim],
  [data-mc-anim-fx] {
    --mc-anim-c: var(--mc-anim-color, var(--mc-design-color, var(--primary-color, #03a9f4)));
  }

  [data-mc-anim~='module'] {
    animation: var(--mc-anim-m);
    transform-origin: var(--mc-anim-om, center);
  }

  /* Transforms need a box (ha-icon is inline). inline-block, not inline-flex: a flex container's
     baseline is synthesized from its bottom edge (ha-svg-icon has no text baseline), which drops the
     module's baseline to the icon's bottom and adds the line's descent under it (+4px stretch).
     As a flex item it blockifies to block, the same box an unanimated ha-icon gets. */
  [data-mc-anim~='icon'] .mc-anim-icon {
    display: inline-block;
    animation: var(--mc-anim-i);
    transform-origin: var(--mc-anim-oi, center);
  }

  /* a module without its icon (a button with no icon set) animates itself with both lists */
  [data-mc-anim~='icon']:not(:has(.mc-anim-icon)) {
    animation: var(--mc-anim-mi);
    transform-origin: var(--mc-anim-om, var(--mc-anim-oi, center));
  }

  /* particle layers: decorative, behind the content (front: above), clipped to the wrapper's shape */
  [data-mc-anim-fx] {
    position: relative;
    isolation: isolate;
  }
  .mc-anim-fx {
    position: absolute;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
    border-radius: inherit;
    container-type: size;
  }
  .mc-anim-fx[data-front] {
    z-index: auto;
  }
  .mc-anim-fx > i {
    position: absolute;
    display: block;
    left: var(--mc-anim-x, 50%);
    opacity: 0;
    will-change: translate, scale, rotate, opacity;
    animation: var(--mc-fx-anim);
    animation-delay: calc(var(--mc-fx-delay, 0s) - var(--mc-anim-phase, 0) * var(--mc-fx-dur, 1s));
  }

  ${b(function(){const e=Object.entries(Ke).map(([e,t])=>`@keyframes mc-anim-${e} {${Xe(t,e.replace(/-icon$/,""),!0)}\n}`),t=He.filter(e=>void 0!==e.particles).map(e=>`.mc-anim-fx[data-fx="${e.id}"] {\n  opacity: var(--mca-${e.id}-s, 1);\n}`);return[...e,...t,...Object.entries(Ye).map(([e,t])=>`.mc-anim-fx[data-fx="${e}"] {${Xe(t,e)}\n}`),...Object.entries(Qe).map(([e,t])=>{const[i,n=""]=e.split("|");return`.mc-anim-fx[data-fx="${i}"] > i${n} {${Xe(t,i)}\n}`})].join("\n")}())}

  @media (prefers-reduced-motion: reduce) {
    [data-mc-anim],
    [data-mc-anim] .mc-anim-icon,
    .mc-anim-fx > i {
      animation: none !important;
    }
    .mc-anim-fx {
      display: none;
    }
  }
`,Je=[Ae,v`
  :host {
    display: block;
  }

  ha-card {
    overflow: hidden;
    height: 100%;
  }

  .mc-card-content {
    display: flex;
    flex-direction: column;
    padding: var(--mc-padding);
    gap: var(--mc-gap);
  }

  /* Columns fill their grid cell (stretch): vertical_align then has room to work and the studio
     frames the cell, not just the column's modules. */
  .mc-row {
    display: grid;
    gap: var(--mc-gap);
    align-items: stretch;
  }

  .mc-column {
    display: flex;
    flex-direction: column;
    gap: var(--mc-gap);
    min-width: 0;
  }

  .mc-column[data-valign='center'] {
    justify-content: center;
  }
  .mc-column[data-valign='end'] {
    justify-content: flex-end;
  }
  .mc-column[data-valign='stretch'] {
    justify-content: stretch;
  }

  /* Module base styles */
  .mc-module {
    min-width: 0;
    overflow-wrap: break-word;
  }

  .mc-text {
    font-size: var(--mc-font-size, inherit);
  }

  /* "unavailable" after a missing entity's id */
  .mc-text-muted {
    color: var(--mc-design-color, var(--secondary-text-color));
  }

  .mc-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .mc-icon ha-icon {
    --mdc-icon-size: var(--mc-icon-size, 24px);
  }

  .mc-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .mc-info-name {
    font-weight: 500;
    font-size: var(--mc-font-size-md);
    color: var(--mc-design-color, var(--mc-text));
  }

  .mc-info-state {
    font-size: var(--mc-font-size-xl);
    font-weight: 600;
    color: var(--mc-design-color, var(--mc-text));
  }

  .mc-info-secondary {
    font-size: var(--mc-font-size-sm);
    color: var(--mc-design-color, var(--mc-text-secondary));
  }

  .mc-image {
    width: 100%;
    overflow: hidden;
    border-top-left-radius: var(--mc-design-radius-tl, 0);
    border-top-right-radius: var(--mc-design-radius-tr, 0);
    border-bottom-right-radius: var(--mc-design-radius-br, 0);
    border-bottom-left-radius: var(--mc-design-radius-bl, 0);
  }

  .mc-image img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  .mc-markdown {
    line-height: 1.5;
  }

  .mc-bar-container {
    width: 100%;
  }

  .mc-bar {
    width: 100%;
    height: var(--mc-bar-height);
    background: var(--mc-border);
    border-radius: var(--mc-bar-radius);
    overflow: hidden;
  }

  .mc-bar-fill {
    height: 100%;
    border-radius: var(--mc-bar-radius);
    transition: width var(--mc-bar-transition);
    background: var(--mc-primary);
  }

  .mc-bar-value {
    font-size: var(--mc-font-size-md);
    margin-top: var(--mc-gap-xs);
    color: var(--mc-design-color, var(--mc-text-secondary));
    white-space: nowrap;
  }

  /* Bar horizontal layout */
  .mc-bar-horizontal {
    display: flex;
    align-items: center;
    gap: var(--mc-gap-sm);
    width: 100%;
  }

  .mc-bar-horizontal .mc-bar-track {
    flex: 1;
    border-top-left-radius: var(--mc-design-radius-tl, var(--mc-bar-radius));
    border-top-right-radius: var(--mc-design-radius-tr, var(--mc-bar-radius));
    border-bottom-right-radius: var(--mc-design-radius-br, var(--mc-bar-radius));
    border-bottom-left-radius: var(--mc-design-radius-bl, var(--mc-bar-radius));
    overflow: hidden;
  }

  .mc-bar-horizontal .mc-bar-track .mc-bar-fill {
    transition: width var(--mc-bar-transition);
  }

  /* Bar vertical layout */
  .mc-bar-vertical {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--mc-gap-xs);
  }

  .mc-bar-vertical .mc-bar-track {
    min-height: 40px;
    border-top-left-radius: var(--mc-design-radius-tl, var(--mc-bar-radius));
    border-top-right-radius: var(--mc-design-radius-tr, var(--mc-bar-radius));
    border-bottom-right-radius: var(--mc-design-radius-br, var(--mc-bar-radius));
    border-bottom-left-radius: var(--mc-design-radius-bl, var(--mc-bar-radius));
    position: relative;
    overflow: hidden;
  }

  .mc-bar-vertical .mc-bar-track .mc-bar-fill {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: var(--mc-bar-radius);
    transition: height var(--mc-bar-transition);
  }

  .mc-separator {
    width: 100%;
    border: none;
    border-top: 1px solid var(--mc-border);
    margin: var(--mc-gap-xs) 0;
  }

  .mc-separator-vertical {
    width: auto;
    height: 100%;
    border: none;
    border-left: 1px solid var(--mc-border);
    margin: 0 var(--mc-gap-xs);
  }

  /* Button module wrapper */
  .mc-button {
    display: inline-flex;
    align-items: center;
    gap: var(--mc-gap-sm);
    padding: var(--mc-button-padding);
    border-top-left-radius: var(--mc-design-radius-tl, var(--mc-button-radius));
    border-top-right-radius: var(--mc-design-radius-tr, var(--mc-button-radius));
    border-bottom-right-radius: var(--mc-design-radius-br, var(--mc-button-radius));
    border-bottom-left-radius: var(--mc-design-radius-bl, var(--mc-button-radius));
    border: 1px solid var(--mc-border);
    background: var(--mc-bg);
    color: var(--mc-design-color, var(--mc-text));
    cursor: pointer;
    font-size: var(--mc-button-font-size);
    transition: background var(--mc-transition-duration);
  }

  .mc-button:hover {
    background: var(--mc-border);
  }

  /* Button inner element + variants */
  .mc-button-inner {
    display: inline-flex;
    align-items: center;
    gap: var(--mc-gap-sm);
    padding: var(--mc-button-padding);
    border-top-left-radius: var(--mc-design-radius-tl, var(--mc-button-radius));
    border-top-right-radius: var(--mc-design-radius-tr, var(--mc-button-radius));
    border-bottom-right-radius: var(--mc-design-radius-br, var(--mc-button-radius));
    border-bottom-left-radius: var(--mc-design-radius-bl, var(--mc-button-radius));
    border: none;
    background: var(--mc-design-bg, var(--mc-button-color));
    color: var(--mc-design-color, var(--mc-button-text-color));
    cursor: pointer;
    font-size: var(--mc-button-font-size);
    font-weight: 500;
  }

  .mc-button-inner ha-icon {
    --mdc-icon-size: var(--mc-button-icon-size);
  }

  .mc-button-inner--default {
    background: var(--mc-design-bg, var(--mc-button-color));
    color: var(--mc-design-color, var(--mc-button-text-color));
    border: none;
  }

  .mc-button-inner--outline {
    background: var(--mc-design-bg, transparent);
    color: var(--mc-design-color, var(--mc-button-color));
    border: 1px solid var(--mc-button-color);
  }

  .mc-button-inner--flat {
    background: var(--mc-design-bg, transparent);
    color: var(--mc-design-color, var(--mc-button-color));
    border: none;
  }

  .mc-button-inner--icon-only {
    padding: var(--mc-button-padding-icon);
  }

  .mc-button-state {
    opacity: 0.8;
    font-size: var(--mc-font-size-xs);
  }

  .mc-tile-slider {
    position: relative;
    width: 100%;
    height: 40px;
    border-radius: var(--mc-slider-radius);
    overflow: hidden;
    cursor: pointer;
  }

  .mc-tile-slider--vertical {
    width: 40px;
    height: 100%;
  }

  .mc-tile-slider-background {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: var(--mc-slider-background, var(--disabled-color, #9e9e9e));
    opacity: 0.2;
  }

  .mc-tile-slider-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: var(--mc-slider-color, var(--primary-color, #03a9f4));
    border-radius: var(--mc-slider-radius);
    transform: translate3d(calc((var(--slider-value, 0) - 1) * 100%), 0, 0);
    transition: transform 180ms ease-in-out, background-color 180ms ease-in-out;
  }

  .mc-tile-slider-bar::after {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 5px;
    margin: auto;
    height: 50%;
    width: 4px;
    border-radius: var(--mc-radius-sm);
    background-color: var(--text-primary-color, #fff);
  }

  .mc-tile-slider--vertical .mc-tile-slider-bar {
    top: auto;
    bottom: 0;
    transform: translate3d(0, calc((1 - var(--slider-value, 0)) * 100%), 0);
  }

  .mc-tile-slider--vertical .mc-tile-slider-bar::after {
    top: 5px;
    right: 0;
    left: 0;
    bottom: auto;
    width: 50%;
    height: 4px;
  }

  .mc-slider-value {
    font-size: var(--mc-font-size-md);
    min-width: 36px;
    text-align: center;
    color: var(--mc-design-color, var(--mc-text-secondary));
  }

  /* Slider container layout */
  .mc-slider-container {
    display: flex;
    align-items: center;
    gap: var(--mc-gap-sm);
    width: 100%;
  }

  /* the slider module's track takes the design radius (the light module's sliders keep theirs) */
  .mc-slider-container > .mc-tile-slider {
    border-top-left-radius: var(--mc-design-radius-tl, var(--mc-slider-radius));
    border-top-right-radius: var(--mc-design-radius-tr, var(--mc-slider-radius));
    border-bottom-right-radius: var(--mc-design-radius-br, var(--mc-slider-radius));
    border-bottom-left-radius: var(--mc-design-radius-bl, var(--mc-slider-radius));
  }

  .mc-slider-container--vertical {
    flex-direction: column;
    width: auto;
    height: var(--mc-slider-vertical-height);
  }

  .mc-slider-container--horizontal {
    flex-direction: row;
    width: 100%;
  }

  /* Spinbox */
  .mc-spinbox {
    display: flex;
    align-items: center;
    gap: var(--mc-spinbox-gap);
  }

  .mc-spinbox-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--mc-spinbox-btn-size);
    height: var(--mc-spinbox-btn-size);
    border: none;
    border-radius: 50%;
    background: var(--mc-spinbox-btn-color);
    color: var(--mc-design-color, var(--mc-spinbox-btn-text-color));
    font-size: var(--mc-spinbox-btn-font-size);
    font-weight: bold;
    cursor: pointer;
    line-height: 1;
  }

  .mc-spinbox-value {
    font-size: var(--mc-spinbox-value-font-size);
    font-weight: var(--mc-spinbox-value-font-weight);
    min-width: var(--mc-spinbox-value-min-width);
    text-align: center;
  }

  /* Dropdown */
  .mc-dropdown {
    width: 100%;
  }

  .mc-dropdown select {
    width: 100%;
    padding: var(--mc-dropdown-padding);
    border: 1px solid var(--mc-border);
    border-top-left-radius: var(--mc-design-radius-tl, var(--mc-dropdown-radius));
    border-top-right-radius: var(--mc-design-radius-tr, var(--mc-dropdown-radius));
    border-bottom-right-radius: var(--mc-design-radius-br, var(--mc-dropdown-radius));
    border-bottom-left-radius: var(--mc-design-radius-bl, var(--mc-dropdown-radius));
    background: var(--mc-design-bg, var(--mc-bg));
    color: var(--mc-design-color, var(--mc-text));
    font-size: var(--mc-dropdown-font-size);
    font-family: inherit;
    cursor: pointer;
    appearance: auto;
  }

  .mc-gauge {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .mc-gauge svg {
    overflow: visible;
  }

  .mc-gauge-value {
    font-size: var(--mc-font-size-2xl);
    font-weight: 600;
    margin-top: -20px;
  }

  /* Light module */
  .mc-light {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: var(--mc-gap-sm);
  }

  .mc-light--compact {
    flex-direction: row;
    align-items: center;
    gap: var(--mc-gap-md);
  }

  .mc-light-header {
    display: flex;
    align-items: center;
    gap: var(--mc-gap-sm);
  }

  .mc-light-header ha-icon {
    --mdc-icon-size: var(--mc-icon-size-lg);
  }

  .mc-light--compact .mc-light-header ha-icon {
    --mdc-icon-size: var(--mc-icon-size-md);
  }

  .mc-light-name {
    font-weight: 500;
  }

  .mc-light-name--compact {
    font-weight: 500;
    flex: 1;
  }

  .mc-light-info {
    flex: 1;
  }

  .mc-light-secondary {
    font-size: var(--mc-font-size-xs);
    opacity: var(--mc-light-label-opacity);
  }

  .mc-light-control {
    display: flex;
    align-items: center;
    gap: var(--mc-gap-sm);
  }

  .mc-light-control ha-icon {
    --mdc-icon-size: var(--mc-icon-size-sm);
    opacity: var(--mc-light-label-opacity);
  }

  .mc-light-value {
    font-size: var(--mc-font-size-xs);
    min-width: 32px;
    text-align: right;
  }

  .mc-light-color-input {
    width: var(--mc-light-color-input-size);
    height: var(--mc-light-color-input-size);
    border: none;
    padding: 0;
    cursor: pointer;
  }

  .mc-slider {
    width: 100%;
    position: relative;
  }

  .mc-slider .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mc-slider .swiper-button-prev,
  .mc-slider .swiper-button-next {
    color: var(--mc-primary);
    --swiper-navigation-size: 24px;
  }

  .mc-slider .swiper-pagination-bullet-active {
    background: var(--mc-primary);
  }

  .mc-horizontal {
    display: flex;
    flex-direction: row;
    gap: var(--mc-gap);
    align-items: center;
  }

  .mc-vertical {
    display: flex;
    flex-direction: column;
    gap: var(--mc-gap);
  }

  .mc-tabs-header {
    display: flex;
    gap: var(--mc-gap-xs);
    border-bottom: 1px solid var(--mc-border);
    margin-bottom: var(--mc-gap-sm);
  }

  .mc-tab-button {
    padding: var(--mc-button-padding);
    border: none;
    background: none;
    cursor: pointer;
    font-size: var(--mc-font-size-sm);
    color: var(--mc-design-color, var(--mc-text-secondary));
    border-bottom: 2px solid transparent;
    transition: all var(--mc-transition-duration);
  }

  /* the label follows the design colour; the underline / pill keeps the accent */
  .mc-tab-button.active {
    color: var(--mc-design-color, var(--mc-primary));
    border-bottom-color: var(--mc-primary);
  }

  .mc-tab-button ha-icon {
    --mdc-icon-size: 16px;
  }

  /* Tab style: pills */
  .mc-tabs[data-style='pills'] .mc-tabs-header {
    border-bottom: none;
  }

  .mc-tabs[data-style='pills'] .mc-tab-button {
    border-bottom: none;
    border-radius: var(--mc-radius-md);
    background: transparent;
  }

  .mc-tabs[data-style='pills'] .mc-tab-button.active {
    background: var(--mc-primary);
    color: var(--mc-design-color, var(--text-primary-color, #fff));
  }

  /* Tab style: underline */
  .mc-tabs[data-style='underline'] .mc-tabs-header {
    border-bottom: 2px solid var(--mc-border);
  }

  .mc-tabs[data-style='underline'] .mc-tab-button {
    border-bottom-width: 3px;
    font-weight: 500;
  }

  .mc-tabs[data-style='underline'] .mc-tab-button.active {
    border-bottom-width: 3px;
    font-weight: 700;
  }

  .mc-clock {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .mc-clock-time {
    font-size: 2rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  .mc-clock-date {
    font-size: var(--mc-font-size-sm);
    color: var(--mc-design-color, var(--mc-text-secondary));
  }

  /* Weather module */
  .mc-weather {
    display: flex;
    align-items: center;
    gap: var(--mc-gap-md);
  }

  .mc-weather > ha-icon {
    --mdc-icon-size: var(--mc-icon-size-xl);
  }

  .mc-weather-temp {
    font-size: 2rem;
    font-weight: 600;
  }

  .mc-weather-condition {
    font-size: var(--mc-font-size-md);
    color: var(--mc-design-color, var(--mc-text-secondary));
    text-transform: capitalize;
  }

  /* Forecast module */
  .mc-forecast {
    display: flex;
    gap: var(--mc-gap-sm);
    overflow-x: auto;
  }

  .mc-forecast-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--mc-gap-xs);
    padding: var(--mc-gap-sm);
    min-width: 60px;
  }

  .mc-forecast-item ha-icon {
    --mdc-icon-size: var(--mc-forecast-icon-size);
  }

  .mc-forecast-label {
    font-size: var(--mc-font-size-xs);
    color: var(--mc-design-color, var(--mc-text-secondary));
  }

  .mc-forecast-temp {
    font-size: var(--mc-font-size-md);
  }

  .mc-video-bg {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .mc-video-bg video {
    width: 100%;
    display: block;
  }

  /* Video background placeholder */
  .mc-video-bg-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
    background: var(--mc-border);
    border-radius: var(--mc-radius-md);
  }

  .mc-video-bg-placeholder ha-icon {
    --mdc-icon-size: var(--mc-icon-size-lg);
    color: var(--mc-text-secondary);
  }

  /* Camera module */
  .mc-camera {
    width: 100%;
    overflow: hidden;
    border-top-left-radius: var(--mc-design-radius-tl, 0);
    border-top-right-radius: var(--mc-design-radius-tr, 0);
    border-bottom-right-radius: var(--mc-design-radius-br, 0);
    border-bottom-left-radius: var(--mc-design-radius-bl, 0);
  }

  .mc-camera img {
    width: 100%;
    display: block;
  }

  .mc-camera-fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background: var(--mc-border);
    color: var(--mc-text-secondary);
    font-size: var(--mc-font-size-md);
  }

  .mc-camera-fallback ha-icon {
    margin-right: var(--mc-gap-sm);
  }

  /* Graphs module */
  .mc-graphs {
    width: 100%;
  }

  .mc-graphs svg {
    width: 100%;
    height: auto;
  }

  .mc-graphs-label {
    font-size: var(--mc-font-size-xs);
    color: var(--mc-design-color, var(--mc-text-secondary));
    margin-top: var(--mc-gap-xs);
  }

  /* Image fallback */
  .mc-image-fallback {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--mc-border);
    color: var(--mc-text-secondary);
  }

  /* Custom card placeholder */
  .mc-custom-card-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--mc-gap-sm);
    min-height: 80px;
    background: var(--mc-border);
    border-radius: var(--mc-radius-md);
    color: var(--mc-text-secondary);
    font-size: var(--mc-font-size-md);
  }

  .mc-custom-card-placeholder ha-icon {
    --mdc-icon-size: 28px;
  }

  .mc-custom-card-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60px;
    color: var(--mc-text-secondary);
  }

  /* Nested row module */
  .mc-nested-row {
    width: 100%;
    min-width: 0;
  }

  .mc-nested-col {
    display: flex;
    flex-direction: column;
    gap: var(--mc-gap);
    min-width: 0;
  }

  /* Placeholder text (e.g. empty tabs) */
  .mc-placeholder-text {
    color: var(--mc-text-secondary);
    font-size: var(--mc-font-size-xs);
  }

  /* Hover effect support */
  .mc-hoverable {
    transition: all var(--mc-transition-duration) ease;
  }

  /*
   * Design surface vars (--mc-design-radius-*, --mc-design-bg) apply to one module's own surface:
   * reset them on every module wrapper (its inline design style sets them again) and on modules
   * nested inside a layout module, so a row, column or parent module never restyles inner surfaces.
   */
  .mc-module-wrapper,
  :not(.mc-module-wrapper) > .mc-module {
    --mc-design-radius-tl: initial;
    --mc-design-radius-tr: initial;
    --mc-design-radius-br: initial;
    --mc-design-radius-bl: initial;
    --mc-design-bg: initial;
    --mc-anim-color: initial;
    --mc-anim-m: initial;
    --mc-anim-i: initial;
    --mc-anim-mi: initial;
    --mc-anim-om: initial;
    --mc-anim-oi: initial;
  }

  /* the design background fills the button / dropdown itself, not a full-width band behind it */
  .mc-module-wrapper:has(> .mc-button, > .mc-dropdown) {
    background: none !important;
  }

  .mc-module-wrapper[role='button'] {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .mc-module-wrapper[role='button']:focus-visible {
    outline: 2px solid var(--mc-primary);
    outline-offset: 2px;
  }

  /* border_length: the wrapper's border stays (transparent, same width); this overlay covers the
     border box (same border-radius); each side is a layer with only that side's border, masked to
     the length, so it follows rounded corners (resolveBorderLength). */
  [data-mc-border-fx] {
    position: relative;
  }
  .mc-border-fx {
    position: absolute;
    pointer-events: none;
  }
  .mc-border-fx > i {
    position: absolute;
    display: block;
    box-sizing: border-box;
  }

  /* Editor canvas: modules/rows/columns hidden by display conditions stay selectable */
  .mc-module-wrapper[data-mc-hidden],
  .mc-row[data-mc-hidden],
  .mc-column[data-mc-hidden] {
    opacity: 0.45;
  }

  /* Editor canvas: an empty column keeps a selectable, visible cell */
  .mc-column[data-mc-empty] {
    min-height: 40px;
    border-radius: 8px;
    outline: 1px dashed color-mix(in srgb, currentColor 35%, transparent);
    outline-offset: -1px;
  }

  /* Hidden by display condition */
  .mc-hidden {
    display: none !important;
  }

  /* Error state */
  .mc-error {
    color: var(--error-color, #ef4444);
    padding: var(--mc-gap-sm);
    font-size: var(--mc-font-size-md);
  }

  /* Interactive feedback — focus-visible, active, tap highlight */
  .mc-button,
  .mc-button-inner,
  .mc-tab-button,
  .mc-spinbox-btn {
    -webkit-tap-highlight-color: transparent;
  }

  .mc-button:focus-visible,
  .mc-button-inner:focus-visible,
  .mc-tab-button:focus-visible,
  .mc-spinbox-btn:focus-visible {
    outline: 2px solid var(--mc-primary);
    outline-offset: 2px;
  }

  .mc-button:active,
  .mc-button-inner:active,
  .mc-tab-button:active,
  .mc-spinbox-btn:active {
    opacity: 0.85;
    transform: scale(0.98);
  }

  /* Font-family inherit for interactive elements */
  .mc-tab-button,
  .mc-spinbox-btn {
    font-family: inherit;
  }
`,Ze],et=[Ae,v`
  :host {
    color: var(--primary-text-color, #1a1a2e);
    font-family: var(--paper-font-body1_-_font-family, 'Roboto', sans-serif);
  }

  input,
  select,
  textarea,
  button {
    font-family: inherit;
    color: inherit;
  }

  input[type='text'],
  input[type='number'],
  input[type='time'],
  select,
  textarea {
    padding: 8px 10px;
    border: 1px solid var(--divider-color, #e5e7eb);
    border-radius: 8px;
    font-size: var(--ha-font-size-s, 0.875rem);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color, #1a1a2e);
    outline: none;
    box-sizing: border-box;
  }

  input:focus,
  select:focus,
  textarea:focus {
    border-color: var(--primary-color, #6366f1);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary-color, #6366f1) 20%, transparent);
  }

  button {
    border-radius: 8px;
  }
`,v`
  :host {
    display: block;
  }

  .mc-editor {
    padding: 20px;
    font-family: var(--paper-font-body1_-_font-family, 'Roboto', sans-serif);
    color: var(--mc-text);
  }

  .mc-mode-help {
    margin: 0 0 20px;
    font-size: var(--ha-font-size-xs, 0.75rem);
    color: var(--mc-text-secondary);
    line-height: 1.5;
    max-width: 60ch;
  }

  /* Toolbar */
  .mc-editor-toolbar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 16px;
  }

  .mc-toolbar-spacer {
    flex: 1;
  }

  .mc-toolbar-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    background: none;
    border-radius: 6px;
    cursor: pointer;
    color: var(--mc-text-secondary);
    transition: all 0.15s;
  }

  .mc-toolbar-btn:hover:not(:disabled) {
    background: var(--mc-border);
    color: var(--mc-text);
  }

  .mc-toolbar-btn:disabled {
    opacity: 0.3;
    cursor: default;
  }

  .mc-editor-toolbar .mc-btn {
    height: 32px;
    padding: 0 12px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border-radius: 8px;
    font-size: var(--ha-font-size-s, 0.875rem);
  }

  .mc-linked-indicator {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    height: 32px;
    color: var(--mc-primary);
    background: var(--mc-primary-light);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.15s;
    border: none;
    font-size: var(--ha-font-size-s, 0.875rem);
    font-weight: 500;
  }

  .mc-toolbar-template-name {
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mc-linked-indicator:hover {
    filter: brightness(0.95);
  }

  .mc-linked-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
    border-radius: 8px;
    background: var(--mc-primary);
    color: var(--text-primary-color, #fff);
    font-size: 10px;
    font-weight: 700;
    line-height: 16px;
    text-align: center;
    box-shadow: 0 0 0 2px var(--mc-bg);
  }

  /* Linked template popup */
  .mc-linked-popup {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 4px;
    background: var(--card-background-color, #fff);
    border: 1px solid var(--mc-border);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 12px;
    min-width: 220px;
    z-index: 100;
  }

  .mc-linked-popup-name {
    font-size: var(--ha-font-size-s, 0.875rem);
    font-weight: 600;
    color: var(--mc-text);
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .mc-linked-popup-sync-summary {
    padding: 8px 0;
    margin-bottom: 4px;
    border-top: 1px solid var(--mc-border);
    border-bottom: 1px solid var(--mc-border);
  }

  .mc-sync-summary-header {
    font-size: var(--ha-font-size-xs, 0.75rem);
    font-weight: 600;
    color: var(--warning-color, #ff9800);
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 4px;
  }

  .mc-sync-summary-header.synced {
    color: var(--success-color, #4caf50);
    margin-bottom: 0;
  }

  .mc-sync-summary-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
    max-height: 150px;
    overflow-y: auto;
  }

  .mc-sync-summary-item {
    display: flex;
    flex-direction: column;
    padding: 3px 0 3px 20px;
    font-size: var(--ha-font-size-xs, 0.75rem);
  }

  .mc-sync-summary-location {
    font-weight: 600;
    color: var(--mc-text);
  }

  .mc-sync-summary-paths {
    color: var(--secondary-text-color, #666);
  }

  .mc-linked-popup-actions {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .mc-linked-popup-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    border: none;
    background: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: var(--ha-font-size-s, 0.875rem);
    color: var(--mc-text);
    transition: background 0.15s;
    width: 100%;
    text-align: left;
  }

  .mc-linked-popup-btn:hover {
    background: var(--mc-border);
  }

  .mc-linked-popup-btn.danger {
    color: var(--error-color, #f44336);
  }

  .mc-linked-popup-btn.danger:hover {
    background: color-mix(in srgb, var(--error-color, #f44336) 10%, transparent);
  }

  /* Toolbar container for popup positioning */
  .mc-toolbar-linked-container {
    position: relative;
  }

  .mc-selected-context {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    border: none;
    border-left: 3px solid var(--mc-primary);
    border-radius: 6px;
    background: var(--mc-primary-light);
    margin-bottom: 12px;
    font-size: var(--ha-font-size-s, 0.875rem);
    color: var(--mc-text);
  }

  .mc-selected-context ha-icon {
    color: var(--mc-primary);
    flex-shrink: 0;
  }

  .mc-selected-context strong {
    font-weight: 600;
    color: var(--mc-primary);
  }

  /* Sync confirmation dialog */
  .mc-sync-dialog {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10001;
    padding: 16px;
  }

  .mc-sync-dialog-content {
    background: var(--card-background-color, #fff);
    border-radius: 12px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    width: 360px;
    max-width: 100%;
    padding: 20px;
  }

  .mc-sync-dialog-title {
    font-size: var(--ha-font-size-m, 1rem);
    font-weight: 600;
    color: var(--primary-text-color);
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .mc-sync-dialog-text {
    font-size: var(--ha-font-size-s, 0.875rem);
    color: var(--secondary-text-color);
    margin-bottom: 16px;
    line-height: 1.5;
  }

  .mc-sync-dialog-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }

  /* Settings Panel */
  .mc-settings-panel {
    border: 1px solid var(--mc-border);
    border-radius: var(--mc-radius-md);
    overflow: hidden;
    margin-top: 12px;
  }

  .mc-settings-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 16px;
    background: var(--mc-primary-light);
    border-bottom: 1px solid var(--mc-border);
    font-size: var(--ha-font-size-s, 0.875rem);
    font-weight: 500;
  }

  .mc-settings-tabs {
    display: flex;
    border-bottom: 1px solid var(--mc-border);
  }

  .mc-settings-tab {
    flex: 1;
    padding: 10px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: var(--ha-font-size-xs, 0.75rem);
    font-weight: 500;
    color: var(--mc-text-secondary);
    border-bottom: 2px solid transparent;
    transition: all 0.15s;
    text-align: center;
  }

  .mc-settings-tab.active {
    color: var(--mc-primary);
    border-bottom-color: var(--mc-primary);
  }

  .mc-settings-tab:hover:not(.active) {
    color: var(--mc-text);
  }

  .mc-settings-content {
    padding: 16px;
  }

  .mc-bp-xs,
  .mc-bp-sm {
    padding: 14px;
  }

  .mc-bp-xs .mc-editor-toolbar,
  .mc-bp-sm .mc-editor-toolbar {
    gap: 6px;
    margin-bottom: 10px;
  }

  .mc-bp-xs .mc-btn,
  .mc-bp-sm .mc-btn {
    padding: 8px 10px;
  }

  /* Shared Form Styles */
  .mc-tab-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .mc-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .mc-section-header {
    font-size: var(--ha-font-size-s, 0.875rem);
    font-weight: 600;
    color: var(--mc-text);
    padding-bottom: 6px;
    border-bottom: 1px solid var(--mc-border);
    margin-top: 12px;
  }

  .mc-section-header-split {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .mc-section-header-actions {
    display: flex;
    gap: 4px;
  }

  .mc-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .mc-field-label {
    font-size: var(--mc-font-size-xs, 0.75rem);
    font-weight: 500;
    color: var(--mc-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .mc-field input[type='text'],
  .mc-field input[type='number'],
  .mc-field select,
  .mc-field textarea {
    padding: 10px 12px;
    border: 1px solid var(--mc-border);
    border-radius: 8px;
    font-size: var(--ha-font-size-s, 0.875rem);
    background: var(--mc-bg);
    color: var(--mc-text);
    outline: none;
    transition: border-color 0.15s;
    width: 100%;
    box-sizing: border-box;
  }

  .mc-field input:focus,
  .mc-field select:focus,
  .mc-field textarea:focus {
    border-color: var(--mc-primary);
  }

  .mc-field-toggle {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .mc-field-toggle input[type='checkbox'] {
    width: 18px;
    height: 18px;
    accent-color: var(--mc-primary);
  }

  .mc-field-hint {
    font-size: var(--ha-font-size-xs, 0.75rem);
    color: var(--mc-text-secondary);
    font-style: italic;
  }

  .mc-field-hint-tight {
    margin-top: -4px;
    margin-bottom: 8px;
  }

  .mc-field-hint-with-margin {
    margin-bottom: 8px;
  }

  .mc-entity-field {
    position: relative;
  }

  .mc-entity-field input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid var(--mc-border);
    border-radius: 8px;
    font-size: var(--ha-font-size-s, 0.875rem);
    background: var(--mc-bg);
    color: var(--mc-text);
    outline: none;
    transition: border-color 0.15s;
    box-sizing: border-box;
  }

  .mc-entity-field input:focus {
    border-color: var(--mc-primary);
  }

  /* Buttons */
  .mc-btn {
    padding: 10px 18px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-size: var(--ha-font-size-s, 0.875rem);
    font-weight: 500;
    transition: all 0.15s;
  }

  .mc-btn-primary {
    background: var(--mc-primary);
    color: var(--text-primary-color, #fff);
  }

  .mc-btn-primary:hover {
    filter: brightness(1.1);
  }

  .mc-btn-secondary {
    background: var(--mc-surface-recessed);
    color: var(--mc-text);
  }

  .mc-btn-secondary:hover {
    background: color-mix(in srgb, var(--mc-text) 10%, transparent);
  }

  .mc-btn-compact {
    padding: 4px 8px;
    font-size: var(--ha-font-size-xs, 0.75rem);
  }

  .mc-btn-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 1px solid var(--mc-border);
    border-radius: 8px;
    background: none;
    cursor: pointer;
    color: var(--mc-text-secondary);
    font-size: 1rem;
    transition: all 0.15s;
  }

  .mc-btn-icon:hover {
    background: var(--mc-border);
    color: var(--mc-text);
  }

  .mc-inline-field-row {
    flex-direction: row;
    gap: 8px;
    align-items: center;
  }

  .mc-editor-tab-switcher {
    margin-bottom: 8px;
  }

  .mc-child-module-item {
    border: 1px solid var(--mc-border, var(--divider-color, #e5e7eb));
    border-radius: 8px;
    margin-bottom: 4px;
    overflow: hidden;
  }

  .mc-child-module-head {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    cursor: pointer;
    background: var(--secondary-background-color, #f5f5f5);
  }

  .mc-child-module-title {
    flex: 1;
    font-size: var(--ha-font-size-s, 0.875rem);
  }

  .mc-child-module-body {
    padding: 8px;
    border-top: 1px solid var(--mc-border, var(--divider-color, #e5e7eb));
  }

  .mc-child-module-add-row {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-top: 8px;
  }

  .mc-child-module-select {
    flex: 1;
    padding: 6px 8px;
    border: 1px solid var(--mc-border, var(--divider-color, #e5e7eb));
    border-radius: 8px;
    background: var(--card-background-color, #fff);
    font-size: var(--ha-font-size-s, 0.875rem);
  }

  .mc-option-row {
    display: flex;
    gap: 8px;
    align-items: flex-end;
    margin-bottom: 8px;
  }

  .mc-option-row .mc-field {
    flex: 1;
  }

  .mc-card-editor-section {
    border: 1px solid var(--divider-color, #e5e7eb);
    border-radius: 8px;
    overflow: hidden;
  }

  .mc-card-editor-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--primary-color, #6366f1);
    background: color-mix(in srgb, var(--primary-color, #6366f1) 6%, transparent);
    border-bottom: 1px solid var(--divider-color, #e5e7eb);
  }

  .mc-card-editor-icon {
    --mdc-icon-size: 16px;
  }

  .mc-card-editor-body {
    padding: 16px;
  }

  .mc-yaml-fallback textarea {
    width: 100%;
    min-height: 200px;
    font-family: monospace;
    font-size: 0.8125rem;
    resize: vertical;
    border: 1px solid var(--divider-color, #e5e7eb);
    border-radius: 6px;
    padding: 12px;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color, #1a1a2e);
    box-sizing: border-box;
  }

  .mc-yaml-fallback textarea:focus {
    outline: none;
    border-color: var(--primary-color, #6366f1);
  }

  .mc-yaml-fallback-note {
    margin-bottom: 8px;
    font-size: 0.8125rem;
    color: var(--secondary-text-color, #6b7280);
  }

  .mc-yaml-fallback-error {
    color: var(--error-color, #ef4444);
    font-size: 0.8125rem;
    margin-top: 4px;
  }

  .mc-yaml-fallback-help {
    margin-top: 4px;
    font-size: 0.75rem;
    color: var(--secondary-text-color, #6b7280);
  }

  .mc-editor-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100px;
    color: var(--secondary-text-color, #757575);
    font-size: 0.875rem;
  }

  /* Editor skeleton (loading state) */
  @keyframes mc-skel-shimmer {
    0%   { background-position: -240px 0; }
    100% { background-position: calc(240px + 100%) 0; }
  }

  .mc-skel {
    background: linear-gradient(
      90deg,
      color-mix(in srgb, var(--mc-text) 5%, transparent) 25%,
      color-mix(in srgb, var(--mc-text) 10%, transparent) 50%,
      color-mix(in srgb, var(--mc-text) 5%, transparent) 75%
    );
    background-size: 240px 100%;
    background-repeat: no-repeat;
    background-color: var(--mc-surface-recessed);
    border-radius: 6px;
    animation: mc-skel-shimmer 1.4s ease-in-out infinite;
  }

  .mc-skel-switcher {
    height: 44px;
    border-radius: var(--mc-radius-md);
    margin-bottom: 8px;
  }

  .mc-skel-line {
    height: 12px;
    margin-bottom: 20px;
  }

  .mc-skel-line-short {
    width: 60%;
  }

  .mc-skel-toolbar {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
  }

  .mc-skel-spacer {
    flex: 1;
  }

  .mc-skel-icon-btn {
    width: 32px;
    height: 32px;
    border-radius: 6px;
  }

  .mc-skel-pill {
    width: 100px;
    height: 32px;
    border-radius: 8px;
  }

  .mc-skel-card-header {
    height: 44px;
    margin-bottom: 12px;
    border-radius: 8px;
  }

  .mc-skel-row {
    height: 96px;
    margin-bottom: 12px;
    border-radius: 8px;
  }

  /* Condition items */
  .mc-condition-item {
    padding: 16px;
    border: 1px solid var(--mc-border);
    border-radius: var(--mc-radius-md);
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
  }

  .mc-condition-item .mc-btn-icon {
    position: absolute;
    top: 8px;
    right: 8px;
  }

  .mc-conditions-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 8px 0;
  }

  /* Conditional Appearance section */
  .mc-cond-appearance-section {
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid var(--mc-border, var(--divider-color, #e5e7eb));
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .mc-cond-appearance-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--mc-text, var(--primary-text-color));
  }

  .mc-cond-appearance-header ha-icon {
    --mdc-icon-size: 18px;
    color: var(--primary-color, #6366f1);
  }

  .mc-cond-appearance-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .mc-cond-appearance-rule {
    border: 1px solid var(--mc-border, var(--divider-color, #e5e7eb));
    border-radius: 8px;
    background: color-mix(in srgb, var(--primary-color, #6366f1) 4%, transparent);
    overflow: hidden;
  }

  .mc-cond-appearance-rule.expanded {
    border-color: color-mix(in srgb, var(--primary-color, #6366f1) 30%, var(--mc-border, var(--divider-color, #e5e7eb)));
  }

  .mc-cond-appearance-rule-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    cursor: pointer;
    user-select: none;
    background: color-mix(in srgb, var(--primary-color, #6366f1) 6%, transparent);
  }

  .mc-cond-appearance-rule-header:hover {
    background: color-mix(in srgb, var(--primary-color, #6366f1) 10%, transparent);
  }

  .mc-cond-appearance-rule-header ha-icon {
    --mdc-icon-size: 18px;
    color: var(--mc-text-secondary, var(--secondary-text-color));
  }

  .mc-cond-appearance-rule-name {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--mc-text, var(--primary-text-color));
    padding: 4px 6px;
    border-radius: 4px;
    min-width: 0;
  }

  .mc-cond-appearance-rule-name:hover,
  .mc-cond-appearance-rule-name:focus {
    background: var(--mc-bg, var(--card-background-color, #fff));
    outline: 1px solid var(--mc-border, var(--divider-color, #e5e7eb));
  }

  .mc-cond-appearance-rule-count {
    font-size: 0.7rem;
    color: var(--mc-text-secondary, var(--secondary-text-color));
    padding: 2px 6px;
    background: var(--mc-bg, var(--card-background-color, #fff));
    border-radius: 10px;
    border: 1px solid var(--mc-border, var(--divider-color, #e5e7eb));
  }

  .mc-cond-appearance-rule-body {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: var(--mc-bg, var(--card-background-color, #fff));
  }

  .mc-cond-appearance-subhead {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--mc-text-secondary, var(--secondary-text-color));
    margin-top: 6px;
  }

  .mc-cond-appearance-subhead:first-child {
    margin-top: 0;
  }

  /* Action config */
  .mc-action-config {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
    // border: 1px solid var(--mc-border);
    border-radius: 6px;
  }

  /* Card Settings Modal */
  .mc-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 16px;
  }

  .mc-modal {
    background: var(--card-background-color, #fff);
    border-radius: 12px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    width: 480px;
    max-width: 100%;
    max-height: 85vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .mc-modal-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 18px 20px;
    border-bottom: 1px solid var(--divider-color, #e5e7eb);
    background: var(--card-background-color, #fff);
  }

  .mc-modal-header ha-icon {
    color: var(--primary-color, #6366f1);
    --mdc-icon-size: 24px;
  }

  .mc-modal-title {
    flex: 1;
    font-size: var(--ha-font-size-l, 1.25rem);
    font-weight: 600;
    color: var(--primary-text-color, #1a1a2e);
  }

  .mc-modal-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    background: none;
    cursor: pointer;
    color: var(--secondary-text-color, #6b7280);
    border-radius: 6px;
    font-size: 1.5rem;
    line-height: 1;
  }

  .mc-modal-close:hover {
    background: var(--divider-color, #e5e7eb);
    color: var(--primary-text-color, #1a1a2e);
  }

  .mc-modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
  }

  .mc-modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 16px 20px;
    border-top: 1px solid var(--divider-color, #e5e7eb);
  }

  /* Interactive feedback — focus-visible, active, tap highlight */
  /* Font-family inherit */
  /* Input focus ring enhancement */
  .mc-field input:focus-visible,
  .mc-field select:focus-visible,
  .mc-field textarea:focus-visible,
  .mc-entity-field input:focus-visible,
  .mc-card-name-input:focus-visible {
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--mc-primary) 25%, transparent);
  }

  /* Modal backdrop blur */
  .mc-modal-overlay {
    backdrop-filter: blur(4px);
  }
`,...Re],tt=v`
  /* Shared picker field + picker modal shell. Use as [editorSystem, pickerStyles]. */
  :host {
    display: block;
    min-width: 0;
  }

  /* ── Closed field: value (or input) + select button ───────────── */
  .mc-picker-row {
    display: flex;
    gap: 8px;
    align-items: stretch;
    min-width: 0;
  }

  .mc-picker-row > .input,
  .mc-picker-row > .mc-picker-value {
    flex: 1 1 auto;
    min-width: 0;
  }

  .mc-picker-row > .btn {
    flex: none;
  }

  .mc-picker-value {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 40px;
    padding: 6px 12px;
    border: 1px solid var(--mc-field-border);
    border-radius: var(--mc-radius);
    background: var(--mc-surface);
    color: var(--mc-text);
    text-align: left;
    transition: border-color 0.15s ease-out;
  }

  .mc-picker-value:hover {
    border-color: var(--mc-text-2);
  }

  .mc-picker-value > ha-icon {
    flex: none;
    --mdc-icon-size: 20px;
    color: var(--mc-text-2);
  }

  .mc-picker-value-text {
    flex: 1;
    min-width: 0;
    display: grid;
    line-height: 1.35;
  }

  .mc-picker-value-name {
    font-size: 0.875rem;
    overflow-wrap: anywhere;
  }

  .mc-picker-value-id {
    font-family: var(--mc-mono);
    font-size: 0.75rem;
    color: var(--mc-text-2);
    overflow-wrap: anywhere;
  }

  .mc-picker-value .dot {
    background: var(--mc-success);
  }

  .mc-picker-value .dot.is-off {
    background: var(--mc-field-border);
  }

  .mc-picker-value .dot.is-unavailable {
    background: var(--mc-error-ink);
  }

  /* ── Overlay / backdrop ────────────────────────────────────────── */
  .mc-picker-overlay {
    position: fixed;
    inset: 0;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background: rgba(0, 0, 0, 0.38);
  }

  /* ── Modal container ───────────────────────────────────────────── */
  .mc-picker-modal {
    position: relative;
    display: flex;
    flex-direction: column;
    width: var(--mc-picker-width, 440px);
    max-width: 100%;
    max-height: min(80vh, 720px);
    overflow: hidden;
    background: var(--mc-surface);
    color: var(--mc-text);
    border-radius: 16px;
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.22), 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  /* ── Header: title + icon buttons ──────────────────────────────── */
  .mc-picker-header {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 12px 12px 12px 20px;
    border-bottom: 1px solid var(--mc-divider);
    cursor: grab;
    user-select: none;
  }

  .mc-picker-header:active {
    cursor: grabbing;
  }

  .mc-picker-title {
    flex: 1;
    min-width: 0;
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.3;
  }

  /* ── Toolbar rows under the header (search, filters, breadcrumbs) ─ */
  .mc-picker-search {
    padding: 12px 16px;
    display: grid;
    gap: 12px;
    border-bottom: 1px solid var(--mc-divider);
  }

  .mc-picker-search .input {
    min-height: 40px;
  }

  /* ── Scrollable list ───────────────────────────────────────────── */
  .mc-picker-list {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding: 8px;
    display: grid;
    align-content: start;
    gap: 2px;
  }

  .mc-picker-category,
  .mc-picker-domain {
    padding: 12px 12px 4px;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--mc-text-2);
  }

  .mc-picker-category:first-child,
  .mc-picker-domain:first-child {
    padding-top: 4px;
  }

  /* ── List row ──────────────────────────────────────────────────── */
  .mc-picker-item {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    min-height: 48px;
    padding: 6px 12px;
    border: 1px solid transparent;
    border-radius: var(--mc-radius);
    background: transparent;
    color: var(--mc-text);
    text-align: left;
    cursor: pointer;
    transition: background-color 0.15s ease-out;
  }

  .mc-picker-item:hover {
    background: var(--mc-surface-2);
  }

  .mc-picker-item.selected,
  .mc-picker-item[aria-selected='true'] {
    background: var(--mc-accent-tint);
    border-color: color-mix(in srgb, var(--mc-accent) 45%, transparent);
  }

  .mc-picker-item:focus-visible {
    outline-offset: -2px;
  }

  .mc-picker-item-icon {
    flex: none;
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    color: var(--mc-text-2);
    --mdc-icon-size: 20px;
  }

  .mc-picker-item.selected .mc-picker-item-icon,
  .mc-picker-item[aria-selected='true'] .mc-picker-item-icon {
    color: var(--mc-accent-ink);
  }

  .mc-picker-item-content {
    flex: 1;
    min-width: 0;
    display: grid;
    line-height: 1.35;
  }

  .mc-picker-item-name {
    font-size: 0.875rem;
    font-weight: 500;
    overflow-wrap: anywhere;
  }

  .mc-picker-item-id {
    font-family: var(--mc-mono);
    font-size: 0.75rem;
    color: var(--mc-text-2);
    overflow-wrap: anywhere;
  }

  .mc-picker-item-desc,
  .mc-picker-item-meta {
    font-size: 0.75rem;
    color: var(--mc-text-2);
    margin-top: 2px;
  }

  .mc-picker-item-desc {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .mc-picker-item > .chip {
    flex: none;
    max-width: 40%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .mc-picker-item-thumb {
    flex: none;
    width: 40px;
    height: 40px;
    border-radius: var(--mc-radius);
    object-fit: cover;
    background: var(--mc-surface-2);
  }

  .mc-picker-item-actions {
    display: flex;
    gap: 2px;
    flex: none;
  }

  .mc-picker-item-chev {
    flex: none;
    --mdc-icon-size: 20px;
    color: var(--mc-text-2);
  }

  /* ── Breadcrumbs (media picker) ────────────────────────────────── */
  .mc-picker-breadcrumbs {
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 8px 12px;
    border-bottom: 1px solid var(--mc-divider);
    overflow-x: auto;
    white-space: nowrap;
    flex-shrink: 0;
    --mdc-icon-size: 16px;
  }

  .mc-picker-breadcrumbs > ha-icon {
    color: var(--mc-text-2);
    flex: none;
  }

  .mc-breadcrumb-current {
    padding: 0 8px;
    font-size: 0.8125rem;
    font-weight: 500;
  }

  /* ── Empty / loading states ────────────────────────────────────── */
  .mc-picker-empty,
  .mc-picker-loading {
    padding: 32px 16px;
    text-align: center;
    font-size: 0.8125rem;
    color: var(--mc-text-2);
  }

  /* ── Footer ────────────────────────────────────────────────────── */
  .mc-picker-footer {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 8px;
    padding: 12px 16px;
    border-top: 1px solid var(--mc-divider);
  }

  /* ── Positioned modal (after first drag/resize) ─────────────── */
  .mc-modal--positioned {
    position: fixed;
    margin: 0;
    max-width: none;
    max-height: none;
  }

  /* ── Maximized modal ────────────────────────────────────────── */
  .mc-modal--maximized {
    position: fixed;
    margin: 0;
    max-width: none;
    max-height: none;
    transition: left 0.2s ease-out, top 0.2s ease-out, width 0.2s ease-out, height 0.2s ease-out;
  }

  /* ── Resize handle ──────────────────────────────────────────── */
  .mc-modal-resize-handle {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 10;
    width: 16px;
    height: 16px;
    cursor: nwse-resize;
    opacity: 0.35;
    border-radius: 0 0 16px 0;
    background: linear-gradient(135deg, transparent 50%, var(--mc-text-2) 50%);
  }

  .mc-modal-resize-handle:hover {
    opacity: 0.7;
  }
`,it=v`
  :host {
    --mc-picker-width: 480px;
  }

  .mc-picker-header {
    cursor: default;
  }
`,nt=v`
  :host {
    display: block;
  }

  .mc-yaml-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-height: 300px;
  }

  .mc-yaml-editor-wrapper {
    border: 1px solid var(--divider-color, #e5e7eb);
    border-radius: 8px;
    overflow: hidden;
    position: relative;
  }

  .mc-yaml-textarea {
    width: 100%;
    min-height: 300px;
    padding: 12px;
    border: none;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    font-size: var(--ha-font-size-s, 0.875rem);
    line-height: 1.5;
    resize: vertical;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color, #1a1a2e);
    outline: none;
    tab-size: 2;
    box-sizing: border-box;
  }

  .mc-yaml-error {
    padding: 8px 12px;
    background: color-mix(in srgb, var(--error-color, #ef4444) 10%, transparent);
    color: var(--error-color, #ef4444);
    border-radius: 6px;
    font-size: var(--ha-font-size-xs, 0.75rem);
  }

  .mc-yaml-status {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: var(--ha-font-size-xs, 0.75rem);
    color: var(--secondary-text-color, #6b7280);
    padding: 4px 0;
  }

  .mc-yaml-status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--success-color, #22c55e);
  }

  .mc-yaml-status-dot.error {
    background: var(--error-color, #ef4444);
  }
`,rt=v`
  .mc-template-form {
    display: grid;
    gap: 16px;
    padding: 16px 20px;
  }

  .mc-template-error {
    font-size: 0.8125rem;
    color: var(--mc-error-ink);
  }

  .mc-template-overwrite {
    font-size: 0.8125rem;
    color: var(--mc-warn-ink);
  }

  .mc-template-confirm {
    display: grid;
    gap: 8px;
    padding: 12px 16px;
    background: var(--mc-surface-2);
    border-bottom: 1px solid var(--mc-divider);
  }

  .mc-template-confirm-text {
    font-size: 0.8125rem;
  }

  .mc-template-confirm-actions,
  .mc-template-edit-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 8px;
  }

  .mc-template-edit-form {
    display: grid;
    gap: 12px;
    padding: 16px;
    background: var(--mc-surface-2);
    border-bottom: 1px solid var(--mc-divider);
  }

  .mc-template-edit-form textarea.input,
  .mc-template-form textarea.input {
    min-height: 64px;
    font-family: inherit;
    font-size: 0.875rem;
  }
`,at=v`
  :host {
    --mc-picker-width: 800px;
  }
`,ot=v`
  :host {
    --mc-picker-width: 480px;
  }
`,st=v`
  :host {
    --mc-picker-width: 500px;
  }

  .mc-font-preview {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 64px;
    margin: 12px 16px 0;
    padding: 12px;
    border: 1px solid var(--mc-divider);
    border-radius: var(--mc-radius-lg);
    background: var(--mc-surface-2);
    text-align: center;
  }

  .mc-font-preview-text {
    font-size: 1.5rem;
    line-height: 1.3;
    color: var(--mc-text);
    overflow-wrap: anywhere;
  }
`,lt=v`
  :host {
    --mc-picker-width: 480px;
  }
`,ct=v`
  :host {
    --mc-picker-width: 340px;
  }

  /* ── Color field: swatch + text input ──────────────────────── */
  .swatch {
    position: relative;
    overflow: hidden;
    padding: 3px;
  }

  .swatch-fill {
    position: absolute;
    inset: 3px;
    border-radius: 5px;
    background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
    background-size: 8px 8px;
    background-position: 0 0, 0 4px, 4px -4px, -4px 0;
  }

  .swatch-fill > span {
    position: absolute;
    inset: 0;
    border-radius: inherit;
  }

  /* ── Popup body ────────────────────────────────────────────── */
  .mc-color-body {
    display: grid;
    gap: 16px;
    padding: 16px;
    overflow-y: auto;
  }

  .mc-color-area {
    position: relative;
    width: 100%;
    height: 180px;
    border-radius: var(--mc-radius);
    cursor: crosshair;
    touch-action: none;
  }

  .mc-color-area-gradient {
    position: absolute;
    inset: 0;
    border-radius: var(--mc-radius);
    background: linear-gradient(to right, #fff, transparent), linear-gradient(to top, #000, transparent);
  }

  .mc-color-area-pointer,
  .mc-slider-thumb {
    position: absolute;
    width: 16px;
    height: 16px;
    border: 2px solid #fff;
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.3);
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .mc-slider-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .mc-slider-label {
    width: 16px;
    flex: none;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--mc-text-2);
  }

  .mc-slider-track {
    position: relative;
    flex: 1;
    height: 12px;
    border-radius: 9999px;
    cursor: pointer;
    touch-action: none;
  }

  .mc-slider-thumb {
    top: 50%;
  }

  .mc-hue-track {
    background: linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000);
  }

  .mc-opacity-track {
    background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
    background-size: 8px 8px;
    background-position: 0 0, 0 4px, 4px -4px, -4px 0;
  }

  .mc-opacity-gradient {
    position: absolute;
    inset: 0;
    border-radius: inherit;
  }

  .mc-slider-row > .input {
    flex: none;
    width: 64px;
    min-height: 32px;
    padding: 4px 8px;
    text-align: center;
  }

  .mc-input-row {
    display: grid;
    grid-template-columns: minmax(0, 2fr) repeat(3, minmax(0, 1fr));
    gap: 8px;
  }

  .mc-input-row .field {
    gap: 4px;
  }

  .mc-input-row .lbl {
    font-size: 0.75rem;
    color: var(--mc-text-2);
  }

  .mc-input-row .input {
    min-width: 0;
    padding: 8px;
    font-family: var(--mc-mono);
    font-size: 0.8125rem;
  }

  .mc-color-section {
    display: grid;
    gap: 8px;
  }

  .mc-color-section-header {
    font-size: 0.8125rem;
    font-weight: 500;
  }

  .mc-color-grid {
    display: grid;
    grid-template-columns: repeat(8, minmax(0, 1fr));
    gap: 4px;
  }

  .mc-color-swatch,
  .mc-saved-swatch {
    position: relative;
    padding: 0;
    border: 1px solid var(--mc-divider);
    border-radius: 6px;
  }

  .mc-color-swatch {
    aspect-ratio: 1;
  }

  .mc-color-swatch:hover,
  .mc-saved-swatch:hover {
    border-color: var(--mc-text-2);
  }

  .mc-color-swatch.var-color {
    display: grid;
    place-items: center;
    overflow: hidden;
    font-size: 0.625rem;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
  }

  .mc-saved-colors {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .mc-saved-swatch {
    width: 32px;
    height: 32px;
  }

  .mc-saved-pick {
    position: absolute;
    inset: 0;
    padding: 0;
    border: 0;
    border-radius: inherit;
    background: transparent;
  }

  .mc-saved-pick:focus-visible {
    outline-offset: 1px;
  }

  .mc-saved-swatch .mc-remove-btn {
    position: absolute;
    top: -8px;
    right: -8px;
    display: none;
    place-items: center;
    width: 18px;
    height: 18px;
    padding: 0;
    border: 1px solid var(--mc-divider);
    border-radius: 50%;
    background: var(--mc-surface);
    color: var(--mc-text-2);
    --mdc-icon-size: 12px;
  }

  .mc-saved-swatch:hover .mc-remove-btn,
  .mc-saved-swatch:focus-within .mc-remove-btn {
    display: grid;
  }

  .mc-saved-swatch .mc-remove-btn:hover {
    color: var(--mc-error-ink);
  }
`;const dt=new class{constructor(){this.modules=new Map}register(e){this.modules.set(e.metadata.type,e)}get(e){return this.modules.get(e)}getAll(){return Array.from(this.modules.values())}getByCategory(e){return this.getAll().filter(t=>t.metadata.category===e)}getMetadata(){return this.getAll().map(e=>e.metadata)}search(e){const t=e.toLowerCase();return this.getAll().filter(e=>e.metadata.name.toLowerCase().includes(t)||e.metadata.description.toLowerCase().includes(t)||e.metadata.type.toLowerCase().includes(t))}createDefault(e){const t=this.get(e);return t?t.createDefault():null}has(e){return this.modules.has(e)}get types(){return Array.from(this.modules.keys())}};function pt(e,t,i,n,r){return{key:e,cssProperty:t,label:i,type:n,...r?{options:r}:{}}}const ut=[{label:"Visible",value:"visible"},{label:"Hidden",value:"hidden"},{label:"Scroll",value:"scroll"},{label:"Auto",value:"auto"}],ht=[{label:"Border-box",value:"border-box"},{label:"Padding-box",value:"padding-box"},{label:"Content-box",value:"content-box"}],mt=[{label:"None",value:"none"},{label:"Solid",value:"solid"},{label:"Dashed",value:"dashed"},{label:"Dotted",value:"dotted"},{label:"Double",value:"double"},{label:"Groove",value:"groove"},{label:"Ridge",value:"ridge"},{label:"Inset",value:"inset"},{label:"Outset",value:"outset"}],gt=mt;function ft(e,t,i,n={}){return{key:e,cssProperty:"",label:t,type:i,virtual:!0,...n}}const bt={border_length_align:"border_length",border_length_sides:"border_length"},vt=[{id:"spacing",name:"Spacing & Box Model",icon:"mdi:arrow-expand-all",leading:["padding","margin","width","min_height"],properties:[pt("margin","margin","Margin","box"),pt("padding","padding","Padding","box"),pt("width","width","Width","unit"),pt("height","height","Height","unit"),pt("min_width","min-width","Min width","unit"),pt("min_height","min-height","Min height","unit"),pt("max_width","max-width","Max width","unit"),pt("max_height","max-height","Max height","unit"),pt("box_sizing","box-sizing","Box sizing","select",[{label:"Content-box",value:"content-box"},{label:"Border-box",value:"border-box"}])]},{id:"borders",name:"Borders & Outlines",icon:"mdi:border-all",leading:["border_radius","border_width","border_style","border_color","border_length","border_length_align","border_length_sides","box_shadow"],properties:[pt("border","border","Border","text"),pt("border_top","border-top","Border top","text"),pt("border_right","border-right","Border right","text"),pt("border_bottom","border-bottom","Border bottom","text"),pt("border_left","border-left","Border left","text"),pt("border_width","border-width","Border width","unit"),{...pt("border_style","border-style","Border style","select",mt),emptyLabel:"Solid when width is set"},pt("border_color","border-color","Border color","color"),ft("border_length","Border length","unit",{units:["%","px"],help:"Shorten the border line, e.g. 40% for a short accent line."}),ft("border_length_align","Alignment","segmented",{defaultValue:"center",options:[{label:"Start",value:"start"},{label:"Center",value:"center"},{label:"End",value:"end"}]}),ft("border_length_sides","Sides","select",{emptyLabel:"All",options:[{label:"Top",value:"top"},{label:"Right",value:"right"},{label:"Bottom",value:"bottom"},{label:"Left",value:"left"}]}),pt("border_radius","border-radius","Border radius","box"),pt("outline","outline","Outline","text"),pt("outline_width","outline-width","Outline width","unit"),pt("outline_style","outline-style","Outline style","select",gt),pt("outline_color","outline-color","Outline color","color"),pt("outline_offset","outline-offset","Outline offset","unit"),pt("box_shadow","box-shadow","Box shadow","text")]},{id:"positioning",name:"Positioning & Layout",icon:"mdi:page-layout-body",properties:[pt("position","position","Position","select",[{label:"Static",value:"static"},{label:"Relative",value:"relative"},{label:"Absolute",value:"absolute"},{label:"Fixed",value:"fixed"},{label:"Sticky",value:"sticky"}]),pt("top","top","Top","unit"),pt("right","right","Right","unit"),pt("bottom","bottom","Bottom","unit"),pt("left","left","Left","unit"),pt("inset","inset","Inset","unit"),pt("display","display","Display","select",[{label:"Block",value:"block"},{label:"Inline",value:"inline"},{label:"Inline-block",value:"inline-block"},{label:"Flex",value:"flex"},{label:"Inline-flex",value:"inline-flex"},{label:"Grid",value:"grid"},{label:"Inline-grid",value:"inline-grid"},{label:"None",value:"none"},{label:"Contents",value:"contents"}]),pt("visibility","visibility","Visibility","select",[{label:"Visible",value:"visible"},{label:"Hidden",value:"hidden"},{label:"Collapse",value:"collapse"}]),pt("opacity","opacity","Opacity","text"),pt("z_index","z-index","Z-index","number"),pt("overflow","overflow","Overflow","select",ut),pt("overflow_x","overflow-x","Overflow X","select",ut),pt("overflow_y","overflow-y","Overflow Y","select",ut),pt("float","float","Float","select",[{label:"None",value:"none"},{label:"Left",value:"left"},{label:"Right",value:"right"}]),pt("clear","clear","Clear","select",[{label:"None",value:"none"},{label:"Left",value:"left"},{label:"Right",value:"right"},{label:"Both",value:"both"}]),pt("cursor","cursor","Cursor","select",[{label:"Auto",value:"auto"},{label:"Default",value:"default"},{label:"Pointer",value:"pointer"},{label:"Move",value:"move"},{label:"Text",value:"text"},{label:"Wait",value:"wait"},{label:"Crosshair",value:"crosshair"},{label:"Not-allowed",value:"not-allowed"},{label:"Grab",value:"grab"},{label:"None",value:"none"}]),pt("pointer_events","pointer-events","Pointer events","select",[{label:"Auto",value:"auto"},{label:"None",value:"none"}])]},{id:"typography",name:"Typography",icon:"mdi:format-font",leading:["color","font_family","font_weight","font_size","text_transform"],properties:[pt("font_family","font-family","Font family","font"),pt("font_size","font-size","Font size","unit"),pt("font_weight","font-weight","Font weight","select",[{label:"Normal",value:"normal"},{label:"Bold",value:"bold"},{label:"100",value:"100"},{label:"200",value:"200"},{label:"300",value:"300"},{label:"400",value:"400"},{label:"500",value:"500"},{label:"600",value:"600"},{label:"700",value:"700"},{label:"800",value:"800"},{label:"900",value:"900"}]),pt("font_style","font-style","Font style","select",[{label:"Normal",value:"normal"},{label:"Italic",value:"italic"},{label:"Oblique",value:"oblique"}]),pt("font_variant","font-variant","Font variant","text"),pt("color","color","Color","color"),pt("text_align","text-align","Text align","select",[{label:"Left",value:"left"},{label:"Center",value:"center"},{label:"Right",value:"right"},{label:"Justify",value:"justify"}]),pt("text_decoration","text-decoration","Text decoration","select",[{label:"None",value:"none"},{label:"Underline",value:"underline"},{label:"Overline",value:"overline"},{label:"Line-through",value:"line-through"}]),pt("text_transform","text-transform","Text transform","select",[{label:"None",value:"none"},{label:"Uppercase",value:"uppercase"},{label:"Lowercase",value:"lowercase"},{label:"Capitalize",value:"capitalize"}]),pt("text_indent","text-indent","Text indent","unit"),pt("text_overflow","text-overflow","Text overflow","select",[{label:"Clip",value:"clip"},{label:"Ellipsis",value:"ellipsis"}]),pt("text_shadow","text-shadow","Text shadow","text"),pt("line_height","line-height","Line height","text"),pt("letter_spacing","letter-spacing","Letter spacing","unit"),pt("word_spacing","word-spacing","Word spacing","unit"),pt("white_space","white-space","White space","select",[{label:"Normal",value:"normal"},{label:"Nowrap",value:"nowrap"},{label:"Pre",value:"pre"},{label:"Pre-wrap",value:"pre-wrap"},{label:"Pre-line",value:"pre-line"},{label:"Break-spaces",value:"break-spaces"}]),pt("word_break","word-break","Word break","select",[{label:"Normal",value:"normal"},{label:"Break-all",value:"break-all"},{label:"Keep-all",value:"keep-all"},{label:"Break-word",value:"break-word"}]),pt("overflow_wrap","overflow-wrap","Overflow wrap","select",[{label:"Normal",value:"normal"},{label:"Break-word",value:"break-word"},{label:"Anywhere",value:"anywhere"}])]},{id:"backgrounds",name:"Backgrounds",icon:"mdi:image-area",properties:[pt("background","background","Background","text"),pt("background_color","background-color","Background color","color"),pt("background_image","background-image","Background image","image"),pt("background_position","background-position","Background position","text"),pt("background_size","background-size","Background size","select",[{label:"Auto",value:"auto"},{label:"Cover",value:"cover"},{label:"Contain",value:"contain"}]),pt("background_repeat","background-repeat","Background repeat","select",[{label:"Repeat",value:"repeat"},{label:"No-repeat",value:"no-repeat"},{label:"Repeat-x",value:"repeat-x"},{label:"Repeat-y",value:"repeat-y"},{label:"Space",value:"space"},{label:"Round",value:"round"}]),pt("background_attachment","background-attachment","Background attachment","select",[{label:"Scroll",value:"scroll"},{label:"Fixed",value:"fixed"},{label:"Local",value:"local"}]),pt("background_clip","background-clip","Background clip","select",ht),pt("background_origin","background-origin","Background origin","select",ht),pt("backdrop_filter","backdrop-filter","Backdrop filter","text")]},{id:"flexbox",name:"Flexbox",icon:"mdi:view-column",properties:[pt("flex_direction","flex-direction","Direction","select",[{label:"Row",value:"row"},{label:"Row-reverse",value:"row-reverse"},{label:"Column",value:"column"},{label:"Column-reverse",value:"column-reverse"}]),pt("flex_wrap","flex-wrap","Wrap","select",[{label:"Nowrap",value:"nowrap"},{label:"Wrap",value:"wrap"},{label:"Wrap-reverse",value:"wrap-reverse"}]),pt("justify_content","justify-content","Justify content","select",[{label:"Flex-start",value:"flex-start"},{label:"Flex-end",value:"flex-end"},{label:"Center",value:"center"},{label:"Space-between",value:"space-between"},{label:"Space-around",value:"space-around"},{label:"Space-evenly",value:"space-evenly"}]),pt("align_items","align-items","Align items","select",[{label:"Stretch",value:"stretch"},{label:"Flex-start",value:"flex-start"},{label:"Flex-end",value:"flex-end"},{label:"Center",value:"center"},{label:"Baseline",value:"baseline"}]),pt("align_content","align-content","Align content","select",[{label:"Stretch",value:"stretch"},{label:"Flex-start",value:"flex-start"},{label:"Flex-end",value:"flex-end"},{label:"Center",value:"center"},{label:"Space-between",value:"space-between"},{label:"Space-around",value:"space-around"}]),pt("gap","gap","Gap","unit"),pt("row_gap","row-gap","Row gap","unit"),pt("column_gap","column-gap","Column gap","unit"),pt("flex","flex","Flex","text"),pt("flex_grow","flex-grow","Flex grow","number"),pt("flex_shrink","flex-shrink","Flex shrink","number"),pt("flex_basis","flex-basis","Flex basis","unit"),pt("align_self","align-self","Align self","select",[{label:"Auto",value:"auto"},{label:"Stretch",value:"stretch"},{label:"Flex-start",value:"flex-start"},{label:"Flex-end",value:"flex-end"},{label:"Center",value:"center"},{label:"Baseline",value:"baseline"}]),pt("order","order","Order","number")]},{id:"grid",name:"CSS Grid",icon:"mdi:grid",properties:[pt("grid_template_columns","grid-template-columns","Template columns","text"),pt("grid_template_rows","grid-template-rows","Template rows","text"),pt("grid_template_areas","grid-template-areas","Template areas","text"),pt("grid_auto_columns","grid-auto-columns","Auto columns","text"),pt("grid_auto_rows","grid-auto-rows","Auto rows","text"),pt("grid_auto_flow","grid-auto-flow","Auto flow","select",[{label:"Row",value:"row"},{label:"Column",value:"column"},{label:"Dense",value:"dense"},{label:"Row dense",value:"row dense"},{label:"Column dense",value:"column dense"}]),pt("grid_column","grid-column","Column","text"),pt("grid_row","grid-row","Row","text"),pt("grid_area","grid-area","Area","text")]},{id:"transitions",name:"Transitions & Animations",icon:"mdi:animation",leading:["animations"],properties:[ft("animations","Animations","animations"),pt("transition","transition","Transition","text"),pt("transition_property","transition-property","Transition property","text"),pt("transition_duration","transition-duration","Transition duration","text"),pt("transition_timing_function","transition-timing-function","Transition timing","text"),pt("transition_delay","transition-delay","Transition delay","text"),pt("transform","transform","Transform","text"),pt("transform_origin","transform-origin","Transform origin","text"),pt("animation_name","animation-name","Animation name","text"),pt("animation_duration","animation-duration","Animation duration","text"),pt("animation_timing_function","animation-timing-function","Animation timing","text"),pt("animation_delay","animation-delay","Animation delay","text"),pt("animation_iteration_count","animation-iteration-count","Iteration count","text"),pt("animation_direction","animation-direction","Animation direction","select",[{label:"Normal",value:"normal"},{label:"Reverse",value:"reverse"},{label:"Alternate",value:"alternate"},{label:"Alternate-reverse",value:"alternate-reverse"}]),pt("animation_fill_mode","animation-fill-mode","Fill mode","select",[{label:"None",value:"none"},{label:"Forwards",value:"forwards"},{label:"Backwards",value:"backwards"},{label:"Both",value:"both"}]),pt("animation_play_state","animation-play-state","Play state","select",[{label:"Running",value:"running"},{label:"Paused",value:"paused"}]),pt("filter","filter","Filter","text")]},{id:"lists-tables",name:"Lists & Tables",icon:"mdi:format-list-bulleted",properties:[pt("list_style","list-style","List style","text"),pt("list_style_type","list-style-type","List style type","select",[{label:"None",value:"none"},{label:"Disc",value:"disc"},{label:"Circle",value:"circle"},{label:"Square",value:"square"},{label:"Decimal",value:"decimal"},{label:"Lower-alpha",value:"lower-alpha"},{label:"Upper-alpha",value:"upper-alpha"},{label:"Lower-roman",value:"lower-roman"},{label:"Upper-roman",value:"upper-roman"}]),pt("list_style_position","list-style-position","List style position","select",[{label:"Outside",value:"outside"},{label:"Inside",value:"inside"}]),pt("list_style_image","list-style-image","List style image","text"),pt("border_collapse","border-collapse","Border collapse","select",[{label:"Separate",value:"separate"},{label:"Collapse",value:"collapse"}]),pt("border_spacing","border-spacing","Border spacing","unit"),pt("table_layout","table-layout","Table layout","select",[{label:"Auto",value:"auto"},{label:"Fixed",value:"fixed"}]),pt("caption_side","caption-side","Caption side","select",[{label:"Top",value:"top"},{label:"Bottom",value:"bottom"}])]}];const yt={margin:["top","right","bottom","left"].map(e=>({key:`margin_${e}`,cssProperty:`margin-${e}`})),padding:["top","right","bottom","left"].map(e=>({key:`padding_${e}`,cssProperty:`padding-${e}`})),border_radius:["top_left","top_right","bottom_right","bottom_left"].map(e=>({key:`border_${e}_radius`,cssProperty:`border-${e.replace("_","-")}-radius`}))};function wt(e){return[e,...(yt[e]||[]).map(e=>e.key)]}class xt{static evaluate(e,t){if(!e?.conditions?.length)return!0;if(!t)return!0;const i=e.conditions.map(e=>xt.evaluateCondition(e,t));return"any"===e.mode?i.some(Boolean):i.every(Boolean)}static evaluateCondition(e,t){switch(e.type){case"state":return xt.evaluateStateCondition(e,t);case"attribute":return xt.evaluateAttributeCondition(e,t);case"time":return xt.evaluateTimeCondition(e);default:return!0}}static evaluateStateCondition(e,t){if(!e.entity)return!0;const i=t.states[e.entity];if(!i)return!1;const n=i.state;if(void 0!==e.state&&""!==e.state)return n===e.state;if(void 0!==e.state_not&&""!==e.state_not)return n!==e.state_not;const r=Number(n);if(!isNaN(r)){if(void 0!==e.above&&r<=e.above)return!1;if(void 0!==e.below&&r>=e.below)return!1}return!0}static evaluateAttributeCondition(e,t){if(!e.entity||!e.attribute)return!0;const i=t.states[e.entity];if(!i)return!1;const n=String(i.attributes[e.attribute]??"");if(void 0!==e.state&&""!==e.state)return n===e.state;if(void 0!==e.state_not&&""!==e.state_not)return n!==e.state_not;const r=Number(n);if(!isNaN(r)){if(void 0!==e.above&&r<=e.above)return!1;if(void 0!==e.below&&r>=e.below)return!1}return!0}static evaluateTimeCondition(e){const t=new Date,i=60*t.getHours()+t.getMinutes();if(e.after){const t=e.after.split(":").map(Number);if(t.length>=2){if(i<60*t[0]+t[1])return!1}}if(e.before){const t=e.before.split(":").map(Number);if(t.length>=2){if(i>=60*t[0]+t[1])return!1}}return!0}}const _t=function(){const e={};for(const t of vt)for(const i of t.properties)if(!i.virtual){e[i.key]=i.cssProperty;for(const t of yt[i.key]||[])e[t.key]=t.cssProperty}return e}();function $t(e){if(!e)return"";const t=[],i=e;for(const[e,n]of Object.entries(_t)){const r=i[e];void 0!==r&&"string"==typeof r&&""!==r&&t.push(`${n}: ${r}`)}const n=function(e){if(Ct(e.border_style))return;const t=Bt(e);if(!Rt.some(e=>t[e].widthSet&&!t[e].styleSet))return;const i=Rt.map(e=>t[e].style);return i.every(e=>e===i[0])?i[0]:i.join(" ")}(i);n&&t.push(`border-style: ${n}`),"string"==typeof e.color&&""!==e.color&&(t.push(`--mc-design-color: ${e.color}`),t.push("--icon-primary-color: currentColor"));const r=function(e){const t={},i=Ct(e.border_radius);if(i){const e=i.indexOf("/"),n=Tt(e>=0?i.slice(0,e):i),r=e>=0?Tt(i.slice(e+1)):[];if(n.length){const e=Mt(n),i=r.length?Mt(r):void 0;kt.forEach((n,r)=>t[n]=i?`${e[r]} ${i[r]}`:e[r])}}for(const i of kt){const n=Ct(e[St[i]]);n&&(t[i]=n)}return t}(i);for(const e of kt)r[e]&&t.push(`--mc-design-radius-${e}: ${r[e]}`);const a=Ct(i.background_color)??Ct(i.background);return a&&t.push(`--mc-design-bg: ${a}`),e.css&&t.push(e.css),t.join("; ")}const kt=["tl","tr","br","bl"],St={tl:"border_top_left_radius",tr:"border_top_right_radius",br:"border_bottom_right_radius",bl:"border_bottom_left_radius"};function Ct(e){return"string"==typeof e&&""!==e.trim()?e.trim():void 0}function Tt(e){const t=[];let i=0,n="";for(const r of e)"("===r?i++:")"===r&&(i=Math.max(0,i-1)),/\s/.test(r)&&0===i?(n&&t.push(n),n=""):n+=r;return n&&t.push(n),t}function Mt(e){const[t,i=t,n=t,r=i]=e;return[t,i,n,r]}function At(e,t,i){if(!e?.conditional?.length||!t)return e;const{conditional:n,...r}=e,a={...r};for(const e of n){const n=e.conditions.map(e=>!1!==e.use_module_entity&&i&&!e.entity?{...e,entity:i}:e),r={conditions:n,mode:e.mode};if(xt.evaluate(r,t)){const t=e.design;for(const[e,i]of Object.entries(t))void 0!==i&&(a[e]=i)}}return a}function Et(e){return Array.from({length:Math.max(e,1)},()=>"1fr").join(" ")}function Pt(e){return/^\d+(?:-\d+)*$/.test(e)?e.split("-").length:null}function zt(e,t){if(!e)return Et(t??1);const i={1:"1fr","1-1":"1fr 1fr","1-2":"1fr 2fr","2-1":"2fr 1fr","1-1-1":"1fr 1fr 1fr","1-2-1":"1fr 2fr 1fr"};if(i[e])return t&&Pt(e)&&Pt(e)!==t?Et(t):i[e];if(/^\d+(?:-\d+)+$/.test(e)){const i=e.split("-").length;return t&&i!==t?Et(t):e.split("-").map(e=>`${Math.max(Number(e)||1,1)}fr`).join(" ")}return e}const Rt=["top","right","bottom","left"],It=new Set(["none","hidden","solid","dashed","dotted","double","groove","ridge","inset","outset"]),Lt={thin:"1px",medium:"3px",thick:"5px"},Ot={start:"0",center:"0.5",end:"1"},Dt=e=>/^(-?[\d.]+[a-z%]*|thin|medium|thick|(calc|min|max|clamp)\(.*\))$/i.test(e),Nt=e=>Lt[e.toLowerCase()]??e;const Ft=()=>({width:"3px",style:"none",color:"currentColor",widthSet:!1,styleSet:!1});function jt(e){const t=Ft(),i=[];for(const n of Tt(e))It.has(n.toLowerCase())?(t.style=n.toLowerCase(),t.styleSet=!0):Dt(n)?(t.width=Nt(n),t.widthSet=!0):i.push(n);return i.length&&(t.color=i.join(" ")),t}function Bt(e){const t=Ct(e.border),i=Object.fromEntries(Rt.map(e=>[e,t?jt(t):Ft()]));for(const t of Rt){const n=Ct(e[`border_${t}`]);n&&(i[t]=jt(n))}const n=(t,n,r=e=>e)=>{const a=Ct(e[t]);a&&function(e){const[t,i=t,n=t,r=i]=Tt(e);return[t,i,n,r]}(a).forEach((e,t)=>{const a=i[Rt[t]];a[n]=r(e),"width"===n&&(a.widthSet=!0),"style"===n&&(a.styleSet=!0)})};n("border_width","width",Nt),n("border_style","style",e=>e.toLowerCase()),n("border_color","color");for(const e of Rt)i[e].widthSet&&!i[e].styleSet&&(i[e].style="solid");return i}function qt(e){const t=e||{},i=Ct(t.border_length);if(!i||"100%"===i)return;const n=Bt(t),r=Ct(t.border_length_sides),a=r&&Rt.includes(r)?[r]:Rt,o=e=>n[e].widthSet||n[e].styleSet,s=new Set(a.filter(e=>!o(e)&&(r||!Rt.some(o))));for(const e of s)Object.assign(n[e],{width:"2px",style:"solid"});const l=a.filter(e=>{const t=n[e];return"none"!==t.style&&"hidden"!==t.style&&!/^0+(\.0+)?[a-z%]*$/i.test(t.width)});if(!l.length)return;const c=Ot[Ct(t.border_length_align)??"center"]??"0.5",d=`min(${i}, 100%)`,p=`calc((100% - ${d}) * ${c})`,u=`calc((100% - ${d}) * ${c} + ${d})`,h=l.map(e=>{const t=n[e],i=`linear-gradient(${"top"===e||"bottom"===e?"to right":"to bottom"}, transparent ${p}, #000 ${p}, #000 ${u}, transparent ${u})`;return{side:e,style:`inset: 0; border-radius: inherit; border-${e}: ${t.width} ${t.style} ${t.color}; -webkit-mask-image: ${i}; mask-image: ${i}`}}),m=e=>(e=>s.has(e)||o(e)&&"none"!==n[e].style&&"hidden"!==n[e].style)(e)?n[e].width:"0px",g=`${Rt.map(e=>`${e}: calc(-1 * ${m(e)})`).join("; ")}; border-radius: inherit`,f=[...[...s].map(e=>`border-${e}-width: ${n[e].width}; border-${e}-style: solid`),"border-color: transparent"],b=[t.overflow,t.overflow_x,t.overflow_y].map(e=>Ct(e)).filter(Boolean);if(b.length&&b.every(e=>"hidden"===e||"clip"===e)){const e=[...new Set(l.map(e=>n[e].width))],t=e.every(e=>/^[\d.]+px$/.test(e))?`${Math.max(...e.map(e=>parseFloat(e)))}px`:1===e.length?e[0]:`max(${e.join(", ")})`;f.push("overflow: clip",`overflow-clip-margin: ${t}`)}return{style:f.join("; "),overlayStyle:g,lines:h}}let Ht=0;function Gt(e="mc"){Ht++;return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).substring(2,6)}_${Ht}`}const Ut=new Set(["off","unavailable","unknown","idle","standby"]),Vt=new Set(["alarm_control_panel","alert","automation","binary_sensor","calendar","camera","climate","cover","device_tracker","fan","group","humidifier","input_boolean","lawn_mower","light","lock","media_player","person","plant","remote","schedule","script","siren","sun","switch","timer","update","vacuum","valve","water_heater"]);function Wt(e){if(!e)return!1;const t=e.entity_id.split(".")[0],i=e.state;if(Ut.has(i))return!1;switch(t){case"alarm_control_panel":return"disarmed"!==i;case"cover":case"valve":return"closed"!==i;case"device_tracker":case"person":return"not_home"!==i;case"lock":return"locked"!==i;case"vacuum":return!["docked","paused","returning"].includes(i);case"lawn_mower":return["mowing","error"].includes(i);case"plant":return"problem"===i;case"timer":return"active"===i;case"camera":return"streaming"===i;case"sun":return"above_horizon"===i;default:return!0}}function Kt(e){const t=e.rgb_color;if(Array.isArray(t)&&t.length>=3&&t.every(e=>"number"==typeof e))return`rgb(${t[0]}, ${t[1]}, ${t[2]})`;const i=e.hs_color;if(Array.isArray(i)&&i.length>=2&&"number"==typeof i[0]&&"number"==typeof i[1]){const[e,t,n]=function(e,t){const i=Math.max(0,Math.min(100,t))/100,n=t=>{const n=(t+e/60)%6;return 1-i*Math.max(0,Math.min(n,4-n,1))};return[n(5),n(3),n(1)].map(e=>Math.round(255*e))}(i[0],i[1]);return`rgb(${e}, ${t}, ${n})`}}function Qt(e){if(!e)return;const t=e.entity_id.split(".")[0];if(!Vt.has(t))return;if(!Wt(e))return`var(--state-${t}-inactive-color, var(--state-inactive-color, var(--disabled-text-color)))`;const i=Kt(e.attributes||{});if(i)return i;return`var(--state-${t}-${e.state.replace(/[^a-z0-9_-]/gi,"_")}-color, var(--state-${t}-active-color, var(--state-active-color, var(--primary-color))))`}const Yt=["icon","button","light","weather"],Xt=["animation_preset","animation_target","animation_speed","animation_trigger","animation_state","animation_color"],Zt={slow:1.6,normal:1,fast:.6},Jt=["normal","reverse","alternate","alternate-reverse"],ei=e=>"string"==typeof e&&""!==e.trim()?e.trim():void 0;function ti(e){if("number"==typeof e&&Number.isFinite(e)&&e>=0)return+e.toFixed(3)+"s";const t=ei(e);return t?/^\d*\.?\d+$/.test(t)?+(+t).toFixed(3)+"s":/^\d*\.?\d+m?s$/.test(t)?t:void 0:void 0}function ii(e){const t=ei(e);if(!t)return;const i=Le.find(e=>e.id===t);return i?i.css:/^cubic-bezier\(\s*-?[\d.]+\s*(,\s*-?[\d.]+\s*){3}\)$/.test(t)||/^steps\(\s*\d+\s*(,\s*(start|end|jump-start|jump-end|jump-none|jump-both)\s*)?\)$/.test(t)?t:void 0}function ni(e){const t=ei(e);return t&&/^[#\w\s(),.%+-]+$/.test(t)?t:void 0}function ri(e){if("infinite"===e)return"infinite";const t="string"==typeof e?Number(e):e;return"number"==typeof t&&Number.isFinite(t)&&t>0?String(+t.toFixed(2)):void 0}function ai(e,t){const i="string"==typeof t?Number(t):t;return"number"==typeof i&&Number.isFinite(i)?Math.min(e.intensity.max,Math.max(e.intensity.min,i)):e.defaults.intensity}function oi(e){const t="string"==typeof e&&""!==e.trim()?Number(e):e;return"number"==typeof t&&Number.isFinite(t)?Math.min(100,Math.max(0,t)):void 0}function si(e){const{duration:t,delay:i,easing:n,iterations:r,direction:a,intensity:o}=e.defaults;return{duration:t,delay:i,easing:n,iterations:r,direction:a,intensity:o,...Ie(e)?{strength:100}:{}}}function li(e,t){const i=Ve(e)??He[0];return{id:t,preset:i.id,target:"module",trigger:"always",...si(i)}}function ci(e,t){const i=Ve(t);if(!i)return{...e,preset:t};const{strength:n,...r}=e;return{...r,preset:i.id,...si(i)}}function di(e){if(!e)return[];if(Array.isArray(e.animations))return e.animations.filter(e=>!!e&&"object"==typeof e&&!!ei(e.preset)).map((e,t)=>ei(e.id)?e:{...e,id:`anim-${t}`});const t=ei(e.animation_preset);if(!t)return[];const i=Ve(t),n={id:"legacy",preset:t};if(e.animation_target&&(n.target=e.animation_target),e.animation_trigger&&(n.trigger=e.animation_trigger),e.animation_state&&(n.state=e.animation_state),e.animation_color&&(n.color=e.animation_color),!i)return[n];const r=si(i),a=Zt[e.animation_speed||"normal"]??1;return[{...n,...r,duration:+(o=r.duration,(o.endsWith("ms")?parseFloat(o)/1e3:parseFloat(o))*a).toFixed(3)+"s"}];var o}function pi(e){const t={animations:e.length?e:void 0};for(const e of Xt)t[e]=void 0;return t}function ui(e,t){switch(e.trigger){case"entity_on":return Wt(t);case"state":{const i=(e.state||"").trim();return!!i&&!!t&&t.state===i}default:return!0}}const hi={rotate:"rotation",translate:"position",scale:"scale",opacity:"opacity",filter:"filter","box-shadow":"glow"};function mi(e,t){return e.flatMap(e=>"fx"===e?[]:"glow"===e?[t?"filter":"box-shadow"]:[e])}const gi=(e,t)=>t&&"icon"===e.target;const fi=.618034;function bi(e){return Array.from({length:e},(t,i)=>{const n=60/e*(i*fi%1-.5);return{x:+Math.min(96,Math.max(4,(i+.5)/e*100+n)).toFixed(1),phase:+(i*fi%1).toFixed(3),k:e>1?+(i/e).toFixed(3):0}})}function vi(e,t,i={}){const n=!1!==i.allowIcon,r={m:[],i:[],mi:[]},a=[],o={},s=[];for(const i of di(e)){const e=Ve(i.preset);if(!e||!ui(i,t))continue;const l=e.defaults,c=ti(i.duration)??l.duration,d=ti(i.delay)??l.delay,p=`${c} ${ii(i.easing)??ii(l.easing)} ${d} ${ri(i.iterations)??ri(l.iterations)} ${Jt.includes(i.direction)?i.direction:l.direction}`,u=[`--mca-${e.id}-i: ${ai(e,i.intensity)}`],h=ni(i.color);h&&u.push(`--mca-${e.id}-c: ${h}`);const m=Ie(e)?oi(i.strength):void 0;if(void 0!==m&&100!==m&&u.push(`--mca-${e.id}-s: ${+(m/100).toFixed(3)}`),void 0!==e.particles){const t="count"===e.particles?Math.min(12,Math.round(ai(e,i.intensity))):e.particles;s.push({preset:e.id,front:!!e.front,style:[`--mc-fx-anim: mc-anim-${e.id} ${p}`,`--mc-fx-dur: ${c}`,`--mc-fx-delay: ${d}`,...u].join("; "),particles:bi(Math.max(1,t))});continue}a.push(...u);const g=gi(i,n);r.mi.push(`mc-anim-${e.id} ${p}`),g?(r.i.push(`mc-anim-${e.id}${e.iconKeyframes?"-icon":""} ${p}`),e.origin&&!o.i&&(o.i=e.origin)):(r.m.push(`mc-anim-${e.id} ${p}`),e.origin&&!o.m&&(o.m=e.origin))}if(!r.mi.length&&!s.length)return;const l=[];r.m.length&&l.push(`--mc-anim-m: ${r.m.join(", ")}`),r.i.length&&l.push(`--mc-anim-i: ${r.i.join(", ")}`,`--mc-anim-mi: ${r.mi.join(", ")}`),o.m&&l.push(`--mc-anim-om: ${o.m}`),o.i&&l.push(`--mc-anim-oi: ${o.i}`),l.push(...function(e){const t=new Map;for(const i of e){const e=i.slice(0,i.indexOf(":"));t.delete(e),t.set(e,i)}return[...t.values()]}(a));const c=ni(e?.color)??ni(Qt(t));c&&l.push(`--mc-anim-color: ${c}`);const d=[r.m.length?"module":"",r.i.length?"icon":""].filter(Boolean).join(" ");return{...d?{targets:d}:{},style:l.join("; "),fx:s}}function yi(e){if(null===e||"object"!=typeof e)return e;if(Array.isArray(e))return e.map(e=>yi(e));const t={};for(const i of Object.keys(e))t[i]=yi(e[i]);return t}function wi(e,t){const i=yi(e);i.type=t.type,i.template=t.template;const n=new Set(t.not_synced||[]);n.size>0&&(i.not_synced=[...n]);const r=["use_page_theme","theme","background","background_image","border_radius","padding","box_shadow","card_height","overflow","css"];for(const e of r)n.has(e)&&void 0!==t[e]&&(i[e]=t[e]);const a=new Map,o=new Map,s=new Map;for(const e of t.rows||[]){e.id&&a.set(e.id,e);for(const t of e.columns||[]){t.id&&o.set(t.id,t);for(const e of t.modules||[])e.id&&s.set(e.id,e)}}const l=new Set((i.rows||[]).map(e=>e.id).filter(Boolean));i.rows=(i.rows||[]).map(e=>{const t=e.id?a.get(e.id):void 0;if(t){const i=new Set(t.not_synced||[]);i.size>0&&(e.not_synced=[...i]),i.has("layout")&&void 0!==t.layout&&(e.layout=t.layout),i.has("design")&&t.design&&(e.design={...e.design,...t.design}),i.has("gap")&&void 0!==t.gap&&(e.gap=t.gap),i.has("padding")&&void 0!==t.padding&&(e.padding=t.padding)}const i=new Set((e.columns||[]).map(e=>e.id).filter(Boolean));if(e.columns=(e.columns||[]).map(e=>{const t=e.id?o.get(e.id):void 0;if(t){const i=new Set(t.not_synced||[]);i.size>0&&(e.not_synced=[...i]),i.has("design")&&t.design&&(e.design={...e.design,...t.design}),i.has("gap")&&void 0!==t.gap&&(e.gap=t.gap),i.has("padding")&&void 0!==t.padding&&(e.padding=t.padding),i.has("vertical_align")&&void 0!==t.vertical_align&&(e.vertical_align=t.vertical_align)}const i=new Set((e.modules||[]).map(e=>e.id).filter(Boolean));if(e.modules=(e.modules||[]).map(e=>{const t=e.id?s.get(e.id):void 0;if(t){const i=new Set(t.not_synced||[]);i.size>0&&(e.not_synced=[...i]);const n=["text","icon","entity","image","content","label","attribute","prefix","suffix","url","service","service_data","data","use_entity","entity_display","use_entity_icon","use_entity_color","icon_color","size"];for(const r of n)i.has(r)&&void 0!==t[r]&&(e[r]=t[r]);if(t.design&&i.has("design"))e.design={...e.design,...t.design};else if(t.design){const n=t.design,r={...e.design||{}};let a=!1;for(const e of i){if(!e.startsWith("design."))continue;const t=wt(e.slice(7));if(!(t.length>1)||t.some(e=>void 0!==n[e]))for(const e of t)t.length>1&&delete r[e],void 0!==n[e]&&(r[e]=n[e]),a=!0}a&&(e.design=r)}t.actions&&(i.has("actions")||[...i].some(e=>e.startsWith("actions.")))&&(e.actions={...e.actions,...t.actions})}return e}),t)for(const n of t.modules||[])n.id&&!i.has(n.id)&&e.modules.push(yi(n));return e}),t)for(const n of t.columns||[])n.id&&!i.has(n.id)&&e.columns.push(yi(n));return e});for(const e of t.rows||[])e.id&&!l.has(e.id)&&i.rows.push(yi(e));return i}class xi{static validate(e){const t=[],i=[];if(!e||"object"!=typeof e)return{valid:!1,errors:["Config must be an object"],warnings:i};const n=e;return n.type&&"string"==typeof n.type||t.push("Config must have a type"),Array.isArray(n.rows)?(n.rows.forEach((e,n)=>{e.columns&&Array.isArray(e.columns)?e.columns.forEach((e,r)=>{e.modules&&Array.isArray(e.modules)?e.modules.forEach((e,a)=>{if(e.type)if(dt.has(e.type)){const i=dt.get(e.type);if(i){const o=i.validate(e);t.push(...o.map(t=>`Row ${n}, Col ${r}, Module ${a} (${e.type}): ${t}`))}}else i.push(`Row ${n}, Col ${r}, Module ${a}: unknown type "${e.type}"`);else t.push(`Row ${n}, Col ${r}, Module ${a}: missing type`)}):t.push(`Row ${n}, Column ${r} must have a modules array`)}):t.push(`Row ${n} must have a columns array`)}),{valid:0===t.length,errors:t,warnings:i}):(t.push("Config must have a rows array"),{valid:!1,errors:t,warnings:i})}}const _i={en:JSON.parse('{"card":{"name":"Magic Card","description":"A fully open-source multi-module card"},"editor":{"mode_form":"Form","mode_yaml":"YAML","add_row":"Add row","add_module":"Add module","delete":"Delete","undo":"Undo","redo":"Redo"},"tabs":{"general":"General","actions":"Actions","conditions":"Conditions","design":"Design"},"modules":{"text":"Text","icon":"Icon","info":"Info","image":"Image","markdown":"Markdown","bar":"Bar","graphs":"Graph","camera":"Camera","button":"Button","slider":"Slider","spinbox":"Spinbox","dropdown":"Dropdown","light":"Light","gauge":"Gauge","horizontal":"Horizontal","vertical":"Vertical","tabs":"Tabs","separator":"Separator","clock":"Clock","weather":"Weather","forecast":"Forecast","video-bg":"Video background"},"actions_config":{"tap_action":"Tap action","hold_action":"Hold action","double_tap_action":"Double tap action","action_none":"None","action_more_info":"More info","action_toggle":"Toggle","action_navigate":"Navigate","action_url":"URL","action_perform_action":"Perform action","action_assist":"Assist"},"conditions":{"mode_every":"All conditions (AND)","mode_any":"Any condition (OR)","type_state":"State","type_attribute":"Attribute","type_time":"Time","type_template":"Template","add_condition":"Add condition"}}'),nl:JSON.parse('{"card":{"name":"Magic Card","description":"Een volledig open-source multi-module kaart"},"editor":{"mode_form":"Formulier","mode_yaml":"YAML","add_row":"Rij toevoegen","add_module":"Module toevoegen","delete":"Verwijderen","undo":"Ongedaan maken","redo":"Opnieuw"},"tabs":{"general":"Algemeen","actions":"Acties","conditions":"Condities","design":"Ontwerp"},"modules":{"text":"Tekst","icon":"Icoon","info":"Info","image":"Afbeelding","markdown":"Markdown","bar":"Balk","graphs":"Grafiek","camera":"Camera","button":"Knop","slider":"Schuifregelaar","spinbox":"Spinbox","dropdown":"Dropdown","light":"Lamp","gauge":"Meter","horizontal":"Horizontaal","vertical":"Verticaal","tabs":"Tabbladen","separator":"Scheidingslijn","clock":"Klok","weather":"Weer","forecast":"Weersvoorspelling","video-bg":"Video achtergrond"},"actions_config":{"tap_action":"Tik actie","hold_action":"Vasthoud actie","double_tap_action":"Dubbeltik actie","action_none":"Geen","action_more_info":"Meer info","action_toggle":"Schakel","action_navigate":"Navigeer","action_url":"URL","action_perform_action":"Actie uitvoeren","action_assist":"Assistent"},"conditions":{"mode_every":"Alle condities (EN)","mode_any":"Elke conditie (OF)","type_state":"Status","type_attribute":"Attribuut","type_time":"Tijd","type_template":"Template","add_condition":"Conditie toevoegen"}}')};let $i="en";var ki,Si=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};let Ci=ki=class extends _e{constructor(){super(...arguments),this.editMode=!1,this._templateFetched=!1,this._boundRequestUpdate=()=>this.requestUpdate(),this._holdTimers=new Map,this._cardInstanceId=Gt("cardinst")}static getConfigElement(){return document.createElement(d)}static getStubConfig(){return{type:`custom:${c}`,rows:[{id:Gt("row"),layout:"1",columns:[{id:Gt("col"),modules:[{id:Gt("text"),type:"text",text:"Welcome to Magic Card"}]}]}]}}setConfig(e){if(!e)throw new Error("No configuration provided");const t=xi.validate(e);if(!t.valid)throw new Error(`Invalid configuration: ${t.errors.join("; ")}`);const i=this._config?.template;this._config={...e,rows:e.rows||[]},e.template!==i&&(this._templateFetched=!1,this._templateConfig=void 0,this._resolvedConfig=void 0),this._config.rows=this._config.rows.map(e=>({...e,id:e.id||Gt("row"),columns:(e.columns||[]).map(e=>({...e,id:e.id||Gt("col"),modules:(e.modules||[]).map(e=>({...e,id:e.id||Gt(e.type)}))}))})),this._templateConfig&&(this._resolvedConfig=wi(this._templateConfig,this._config))}getCardSize(){return this._config?.rows?Math.max(this._config.rows.length,1):1}connectedCallback(){super.connectedCallback(),this.addEventListener("mc-request-update",this._boundRequestUpdate)}shouldUpdate(e){if(e.has("_config")||e.has("_resolvedConfig"))return!0;if(e.has("hass")&&this.hass){const i=e.get("hass");if(!i)return!0;if(i.language!==this.hass.language)return t=this.hass.language,$i=_i[t]?t:"en",!0;return this._getUsedEntities().some(e=>i.states[e]!==this.hass.states[e])}var t;return!0}updated(e){super.updated(e),this.editMode||(this._reconcileInstanceRegistration(),this.hass&&this._config?.template&&(this._templateFetched||(this._templateFetched=!0,this._fetchTemplate(this._config.template),this._subscribeTemplateEvents())))}_isEditorPreview(){return!!this.closest("hui-card-preview, hui-card-editor, hui-dialog-edit-card, hui-element-editor")}_cancelPendingRegister(){void 0!==this._pendingRegisterTimer&&(window.clearTimeout(this._pendingRegisterTimer),this._pendingRegisterTimer=void 0)}_reconcileInstanceRegistration(){if(!this.hass||this.editMode)return;const e=this.isConnected&&!!this._config?.template&&!this._isEditorPreview()?this._config.template:void 0;if(e!==this._registeredTemplate||void 0!==this._pendingRegisterTimer){if(this._cancelPendingRegister(),this._registeredTemplate&&this._registeredTemplate!==e){const e=this._registeredTemplate;this._registeredTemplate=void 0,this.hass.callWS({type:"magic_card_utils/unregister_card_instance",name:e,card_id:this._cardInstanceId}).catch(()=>{})}e&&this._registeredTemplate!==e&&(this._pendingRegisterTimer=window.setTimeout(()=>{if(this._pendingRegisterTimer=void 0,!this.hass)return;if(!this.isConnected)return;if(this._isEditorPreview())return;(this._config?.template||void 0)===e&&this._registeredTemplate!==e&&(this._registeredTemplate=e,this.hass.callWS({type:"magic_card_utils/register_card_instance",name:e,card_id:this._cardInstanceId}).catch(()=>{}))},ki._REGISTER_DEBOUNCE_MS))}}_getUsedEntities(){const e=this._resolvedConfig??this._config;if(!e)return[];const t=new Set;this._collectEntities(e.display,t);for(const i of e.conditional_appearance||[])for(const e of i.conditions||[])e.entity&&t.add(e.entity);for(const i of e.rows||[]){this._collectEntities(i.display,t);for(const e of i.columns||[]){this._collectEntities(e.display,t);for(const i of e.modules||[])i.entity&&t.add(i.entity),this._collectEntities(i.display,t),i.actions?.tap_action?.entity&&t.add(i.actions.tap_action.entity),i.actions?.hold_action?.entity&&t.add(i.actions.hold_action.entity),i.actions?.double_tap_action?.entity&&t.add(i.actions.double_tap_action.entity)}}return Array.from(t)}_collectEntities(e,t){if(e?.conditions)for(const i of e.conditions)i.entity&&t.add(i.entity)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mc-request-update",this._boundRequestUpdate),this._unsubTemplateEvents?.(),this._unsubTemplateEvents=void 0,this._cancelPendingRegister(),this._reconcileInstanceRegistration()}async _fetchTemplate(e){if(this.hass&&this._config)try{const t=await this.hass.callWS({type:"magic_card_utils/get_templates"}),i=t.templates?.[e];i&&this._config?.template===e&&(this._templateConfig=i.config,this._resolvedConfig=wi(this._templateConfig,this._config))}catch(t){console.warn("Magic Card: Failed to fetch template",e,t)}}_subscribeTemplateEvents(){!this._unsubTemplateEvents&&this.hass&&this.hass.connection.subscribeEvents(e=>{this._config?.template&&e.data.name===this._config.template&&this._fetchTemplate(this._config.template)},"magic_card_utils_template_updated").then(e=>{this._unsubTemplateEvents=e})}render(){const e=this._resolvedConfig??this._config;if(!e)return ne`<ha-card><div class="mc-error">No configuration</div></ha-card>`;if(!this.editMode&&e.display?.conditions?.length&&!this._evaluateDisplay(e.display))return ne``;const t=this._resolveCardAppearance(e),i=this._buildCardStyle(t),n=this._buildThemeStyle(t);return ne`
      <ha-card style=${n||ae}>
        <div class="mc-card-content" style=${i}>
          ${e.rows.map((e,t)=>this._renderRow(e,t))}
        </div>
      </ha-card>
    `}_resolveCardAppearance(e){const t=e.conditional_appearance;if(!t?.length)return e;let i=e;for(const e of t){const t={conditions:e.conditions,mode:e.mode};if(!this._evaluateDisplay(t))continue;const n=e.overrides||{},r={};for(const[e,t]of Object.entries(n))void 0!==t&&""!==t&&null!==t&&(r[e]=t);i={...i,...r}}return i}_buildThemeStyle(e){if(!this.hass)return"";if(!1!==e.use_page_theme)return"";const t=e.theme||this.hass.themes?.default_theme;if(!t)return"";const i=this.hass.themes?.themes?.[t];return i?Object.entries(i).map(([e,t])=>`${e.startsWith("--")?e:`--${e}`}: ${String(t)}`).join("; "):""}_buildCardStyle(e){const t=[];e.padding&&t.push(`padding: ${e.padding}`);const i=[];return e.background_image&&i.push(e.background_image),e.background&&i.push(e.background),i.length>0&&t.push(`background: ${i.join(" ")}`),e.background_image&&(t.push("background-size: cover"),t.push("background-position: center"),t.push("background-repeat: no-repeat")),e.border_radius&&t.push(`border-radius: ${e.border_radius}`),e.box_shadow&&t.push(`box-shadow: ${e.box_shadow}`),e.card_height&&t.push(`min-height: ${e.card_height}`),e.overflow&&t.push(`overflow: ${e.overflow}`),t.join("; ")}_isHiddenByDisplay(e){return!!e?.conditions?.length&&!this._evaluateDisplay(e)}_renderRow(e,t){const i=this._isHiddenByDisplay(e.display);if(i&&!this.editMode)return ne``;const n=`grid-template-columns: ${zt(e.layout||"1",e.columns?.length||1)}; gap: ${e.gap||"8px"}${e.padding?`; padding: ${e.padding}`:""}`,r=At(e.design,this.hass),a=$t(r),o=vi(r,void 0,{allowIcon:!1}),s=qt(r);return ne`
      <div
        class="mc-row"
        data-mc-row=${this.editMode?t:ae}
        data-mc-hidden=${this.editMode&&i?"":ae}
        data-mc-anim=${o?.targets??ae}
        data-mc-anim-fx=${o?.fx.length?"":ae}
        data-mc-border-fx=${s?"":ae}
        style="${n}; ${a}${[o?.style,s?.style].filter(Boolean).map(e=>`; ${e}`).join("")}"
      >
        ${e.columns.map((e,i)=>this._renderColumn(e,t,i))}${this._renderAnimFx(o)}${this._renderBorderFx(s)}
      </div>
    `}_renderColumn(e,t,i){const n=this._isHiddenByDisplay(e.display);if(n&&!this.editMode)return ne``;const r=`gap: ${e.gap||"8px"}${e.padding?`; padding: ${e.padding}`:""}`,a=At(e.design,this.hass),o=$t(a),s=vi(a,void 0,{allowIcon:!1}),l=qt(a);return ne`
      <div
        class="mc-column"
        data-valign=${e.vertical_align||ae}
        data-mc-col=${this.editMode?`${t}.${i}`:ae}
        data-mc-empty=${this.editMode&&!e.modules?.length?"":ae}
        data-mc-hidden=${this.editMode&&n?"":ae}
        data-mc-anim=${s?.targets??ae}
        data-mc-anim-fx=${s?.fx.length?"":ae}
        data-mc-border-fx=${l?"":ae}
        style="${r}; ${o}${[s?.style,l?.style].filter(Boolean).map(e=>`; ${e}`).join("")}"
      >
        ${(e.modules||[]).map((e,n)=>this._renderModule(e,t,i,n))}${this._renderAnimFx(s)}${this._renderBorderFx(l)}
      </div>
    `}_renderModule(e,t,i,n){const r=this._isHiddenByDisplay(e.display);if(r&&!this.editMode)return ne``;const a=dt.get(e.type);if(!a)return ne`<div class="mc-error">Unknown module: ${e.type}</div>`;const o=At(e.design,this.hass,e.entity),s=vi(o,e.entity?this.hass?.states[e.entity]:void 0),l=qt(o),c=[$t(o),s?.style,l?.style].filter(Boolean).join("; "),d=!this.editMode&&(e.actions?.tap_action||e.actions?.hold_action||e.actions?.double_tap_action);return ne`
      <div
        class="mc-module-wrapper ${d?"mc-hoverable":""}"
        role=${d?"button":ae}
        tabindex=${d?0:ae}
        aria-label=${d?this._getActionLabel(e):ae}
        data-mc-path=${this.editMode?`${t}.${i}.${n}`:ae}
        data-mc-hidden=${this.editMode&&r?"":ae}
        data-mc-anim=${s?.targets??ae}
        data-mc-anim-fx=${s?.fx.length?"":ae}
        data-mc-border-fx=${l?"":ae}
        style=${c}
        @pointerdown=${d?t=>this._onPointerDown(t,e):ae}
        @pointerup=${d?t=>this._onPointerUp(t,e):ae}
        @pointercancel=${d?e=>this._onPointerCancel(e):ae}
        @contextmenu=${d?e=>e.preventDefault():ae}
        @dblclick=${d?t=>this._handleAction(t,e,"double_tap"):ae}
        @keydown=${d?t=>this._onKeyDown(t,e):ae}
      >
        ${a.renderPreview(e,this.hass)}${this._renderAnimFx(s)}${this._renderBorderFx(l)}
      </div>
    `}_renderBorderFx(e){return e?ne`<span class="mc-border-fx" aria-hidden="true" style=${e.overlayStyle}>${e.lines.map(e=>ne`<i style=${e.style}></i>`)}</span>`:ae}_renderAnimFx(e){return e?.fx.length?ne`${e.fx.map(e=>ne`<span class="mc-anim-fx" data-fx=${e.preset} ?data-front=${e.front} style=${e.style} aria-hidden="true">${e.particles.map(e=>ne`<i style="--mc-anim-x: ${e.x}%; --mc-anim-phase: ${e.phase}; --mc-anim-k: ${e.k}"></i>`)}</span>`)}`:ae}_getActionLabel(e){const t=e.label||e.name;return t?`Activate ${t}`:`Activate ${e.type} module`}_onPointerDown(e,t){const i=e.currentTarget,n=window.setTimeout(()=>{this._holdTimers.delete(i),this._handleAction(e,t,"hold")},500);this._holdTimers.set(i,n)}_onPointerUp(e,t){const i=e.currentTarget,n=this._holdTimers.get(i);void 0!==n&&(window.clearTimeout(n),this._holdTimers.delete(i),this._handleAction(e,t,"tap"))}_onPointerCancel(e){const t=e.currentTarget,i=this._holdTimers.get(t);void 0!==i&&(window.clearTimeout(i),this._holdTimers.delete(t))}_onKeyDown(e,t){if("Enter"===e.key||" "===e.key){if(e.preventDefault(),e.ctrlKey||e.metaKey)return void this._handleAction(e,t,"double_tap");if(e.shiftKey)return void this._handleAction(e,t,"hold");this._handleAction(e,t,"tap")}}_evaluateDisplay(e){if(!e.conditions?.length)return!0;if(!this.hass)return!0;const t=e.conditions.map(e=>{switch(e.type){case"state":{if(!e.entity)return!0;const t=this.hass.states[e.entity];return!!t&&(void 0!==e.state&&""!==e.state?t.state===e.state:void 0!==e.state_not&&""!==e.state_not?t.state!==e.state_not:!(void 0!==e.above&&Number(t.state)<=e.above)&&!(void 0!==e.below&&Number(t.state)>=e.below))}case"attribute":{if(!e.entity||!e.attribute)return!0;const t=this.hass.states[e.entity];if(!t)return!1;const i=String(t.attributes[e.attribute]??"");return void 0!==e.state&&""!==e.state?i===e.state:void 0===e.state_not||""===e.state_not||i!==e.state_not}case"time":{const t=new Date,i=60*t.getHours()+t.getMinutes();if(e.after){const[t,n]=e.after.split(":").map(Number);if(i<60*t+n)return!1}if(e.before){const[t,n]=e.before.split(":").map(Number);if(i>=60*t+n)return!1}return!0}default:return!0}});return"any"===e.mode?t.some(Boolean):t.every(Boolean)}_handleAction(e,t,i){const n=`${i}_action`,r=t.actions?.[n];if(!r||"none"===r.action)return;r.haptic&&this.dispatchEvent(new CustomEvent("haptic",{bubbles:!0,composed:!0,detail:r.haptic}));const a=!1!==r.use_module_entity?r.entity||t.entity:r.entity;switch(r.action){case"more-info":a&&this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:a}}));break;case"toggle":if(a){const e=a.split(".")[0];this.hass?.callService(e,"toggle",{entity_id:a})}break;case"navigate":r.navigation_path&&(history.pushState(null,"",r.navigation_path),window.dispatchEvent(new Event("location-changed",{bubbles:!0,composed:!0})));break;case"url":if(r.url_path)try{const e=new URL(r.url_path,window.location.href);"http:"===e.protocol||"https:"===e.protocol?window.open(e.href,"_blank","noopener,noreferrer"):console.warn("Magic Card: Blocked unsafe URL protocol:",e.protocol)}catch{console.warn("Magic Card: Invalid URL:",r.url_path)}break;case"perform-action":if(r.service){const[e,t]=r.service.split(".");this.hass?.callService(e,t,{...r.data,...r.service_data})}break;case"assist":this.dispatchEvent(new CustomEvent("show-dialog",{bubbles:!0,composed:!0,detail:{dialogTag:"ha-voice-command-dialog",dialogImport:()=>{},dialogParams:{}}}));break;case"fire-dom-event":this.dispatchEvent(new CustomEvent("ll-custom",{bubbles:!0,composed:!0,detail:r.data||{}}))}}};Ci.styles=Je,Ci._REGISTER_DEBOUNCE_MS=1500,Si([Te({attribute:!1})],Ci.prototype,"hass",void 0),Si([Te({attribute:!1})],Ci.prototype,"editMode",void 0),Si([Me()],Ci.prototype,"_config",void 0),Si([Me()],Ci.prototype,"_resolvedConfig",void 0),Ci=ki=Si([ke(c)],Ci);class Ti{constructor(e=50){this.undoStack=[],this.redoStack=[],this.limit=e}push(e){this.undoStack.push(yi(e)),this.undoStack.length>this.limit&&this.undoStack.shift(),this.redoStack=[]}undo(e){return 0===this.undoStack.length?null:(this.redoStack.push(yi(e)),this.undoStack.pop())}redo(e){return 0===this.redoStack.length?null:(this.undoStack.push(yi(e)),this.redoStack.pop())}canUndo(){return this.undoStack.length>0}canRedo(){return this.redoStack.length>0}clear(){this.undoStack=[],this.redoStack=[]}get undoCount(){return this.undoStack.length}get redoCount(){return this.redoStack.length}}function Mi(e){return e&&void 0!==e.rowIndex?void 0===e.columnIndex?{kind:"row",row:e.rowIndex}:void 0===e.moduleIndex?{kind:"column",row:e.rowIndex,col:e.columnIndex}:{kind:"module",row:e.rowIndex,col:e.columnIndex,module:e.moduleIndex}:{kind:"card"}}function Ai(e){switch(e.kind){case"card":return null;case"row":return{rowIndex:e.row};case"column":return{rowIndex:e.row,columnIndex:e.col};case"module":return{rowIndex:e.row,columnIndex:e.col,moduleIndex:e.module}}}function Ei(e){switch(e.kind){case"card":return"card";case"row":return`r${e.row}`;case"column":return`r${e.row}.c${e.col}`;case"module":return`r${e.row}.c${e.col}.m${e.module}`}}function Pi(e){const t=/^r(\d+)(?:\.c(\d+)(?:\.m(\d+))?)?$/.exec(e);if(!t)return{kind:"card"};const i=Number(t[1]);if(void 0===t[2])return{kind:"row",row:i};const n=Number(t[2]);return void 0===t[3]?{kind:"column",row:i,col:n}:{kind:"module",row:i,col:n,module:Number(t[3])}}function zi(e,t){const i=e.rows||[];if("card"===t.kind)return t;const n=i[t.row];if(!n)return{kind:"card"};if("row"===t.kind)return t;const r=n.columns?.[t.col];if(!r)return{kind:"row",row:t.row};if("column"===t.kind)return t;const a=r.modules?.length||0;return 0===a?{kind:"column",row:t.row,col:t.col}:{...t,module:Math.min(t.module,a-1)}}function Ri(e){return(e.rows||[]).reduce((e,t)=>e+(t.columns||[]).reduce((e,t)=>e+(t.modules?.length??0),0),0)}function Ii(e){return dt.get(e.type)?.metadata.name||e.type}function Li(e){const t=e;for(const e of["entity","label","text","name"]){const i=t[e];if("string"==typeof i&&i.trim())return i}}function Oi(e){const t=e;for(const e of["label","text","name"]){if("text"===e&&t.use_entity)continue;const i=t[e];if("string"!=typeof i)continue;const n=i.trim().split("\n")[0];if(n&&!Ni.test(n))return n.length>40?`${n.slice(0,39)}…`:n}}function Di(e,t){const i=e.name?.trim()||"Card",n=zi(e,t);if("card"===n.kind)return{title:i,icon:"mdi:card-outline",crumbs:[i]};const r=`Row ${n.row+1}`;if("row"===n.kind)return{title:r,icon:"mdi:view-sequential-outline",crumbs:[i,r],subtitle:`Layout ${e.rows[n.row].layout||"1"}`};const a=`Column ${n.col+1}`;if("column"===n.kind){const t=e.rows[n.row].columns[n.col].modules?.length??0;return{title:a,icon:"mdi:view-column-outline",crumbs:[i,r,a],subtitle:`${t} module${1===t?"":"s"}`}}const o=e.rows[n.row].columns[n.col].modules[n.module],s=Ii(o);return{title:s,icon:dt.get(o.type)?.metadata.icon||"mdi:puzzle-outline",crumbs:[i,r,a,s],subtitle:Li(o)}}const Ni=/^[a-z_]+\.[a-z0-9_]+$/;function Fi(e){const t=e.split(/(?<=[._])/);return ne`${t.map((e,t)=>t?ne`<wbr>${e}`:e)}`}var ji=Symbol("NOT_RESOLVED");function Bi(e,t){return{tagName:e,nodeKind:"scalar",implicit:t.implicit??!1,matchByTagPrefix:t.matchByTagPrefix??!1,implicitFirstChars:t.implicitFirstChars??null,resolve:t.resolve,identify:t.identify,represent:t.represent??(e=>String(e)),representTagName:t.representTagName??(()=>e)}}function qi(e,t){const i=void 0===t.finalize;return{tagName:e,nodeKind:"sequence",implicit:!1,matchByTagPrefix:t.matchByTagPrefix??!1,create:t.create,addItem:t.addItem,finalize:t.finalize??(e=>e),carrierIsResult:i,identify:t.identify,represent:t.represent??(e=>e),representTagName:t.representTagName??(()=>e)}}function Hi(e,t){const i=void 0===t.finalize;return{tagName:e,nodeKind:"mapping",implicit:!1,matchByTagPrefix:t.matchByTagPrefix??!1,create:t.create,addPair:t.addPair,has:t.has,keys:t.keys,get:t.get,finalize:t.finalize??(e=>e),carrierIsResult:i,identify:t.identify,represent:t.represent??(e=>e),representTagName:t.representTagName??(()=>e)}}var Gi=Bi("tag:yaml.org,2002:str",{resolve:e=>e,identify:e=>"string"==typeof e}),Ui=["","~","null","Null","NULL"],Vi=Bi("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["","~","n","N"],resolve:e=>-1!==Ui.indexOf(e)?null:ji,identify:e=>null===e,represent:()=>"null"}),Wi=Bi("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["n"],resolve:(e,t)=>"null"===e||t&&""===e?null:ji,identify:e=>null===e,represent:()=>"null"}),Ki=["","~","null","Null","NULL"],Qi=Bi("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["","~","n","N"],resolve:e=>-1!==Ki.indexOf(e)?null:ji,identify:e=>null===e,represent:()=>"null"}),Yi=["true","True","TRUE"],Xi=["false","False","FALSE"],Zi=Bi("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["t","T","f","F"],resolve:e=>-1!==Yi.indexOf(e)||-1===Xi.indexOf(e)&&ji,identify:e=>"[object Boolean]"===Object.prototype.toString.call(e),represent:e=>e?"true":"false"}),Ji=["true"],en=["false"],tn=Bi("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["t","f"],resolve:e=>-1!==Ji.indexOf(e)||-1===en.indexOf(e)&&ji,identify:e=>"[object Boolean]"===Object.prototype.toString.call(e),represent:e=>e?"true":"false"}),nn=["true","True","TRUE","y","Y","yes","Yes","YES","on","On","ON"],rn=["false","False","FALSE","n","N","no","No","NO","off","Off","OFF"],an=Bi("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["y","Y","n","N","t","T","f","F","o","O"],resolve:e=>-1!==nn.indexOf(e)||-1===rn.indexOf(e)&&ji,identify:e=>"[object Boolean]"===Object.prototype.toString.call(e),represent:e=>e?"true":"false"}),on=new RegExp("^(?:0o[0-7]+|0x[0-9a-fA-F]+|[-+]?[0-9]+)$"),sn=new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");var ln=Bi("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-","+",..."0123456789"],resolve:function(e,t){if(t){if(!sn.test(e))return ji}else if(!on.test(e))return ji;const i=function(e){let t=e,i=1;return"-"!==t[0]&&"+"!==t[0]||("-"===t[0]&&(i=-1),t=t.slice(1)),t.startsWith("0b")?i*parseInt(t.slice(2),2):t.startsWith("0o")?i*parseInt(t.slice(2),8):t.startsWith("0x")?i*parseInt(t.slice(2),16):i*parseInt(t,10)}(e);return Number.isFinite(i)?i:ji},identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf("e")<0,represent:e=>e.toString(10)}),cn=new RegExp("^-?(?:0|[1-9][0-9]*)$"),dn=new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");var pn=Bi("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-",..."0123456789"],resolve:function(e,t){if(t){if(!dn.test(e))return ji}else if(!cn.test(e))return ji;const i=function(e){let t=e,i=1;return"-"!==t[0]&&"+"!==t[0]||("-"===t[0]&&(i=-1),t=t.slice(1)),t.startsWith("0b")?i*parseInt(t.slice(2),2):t.startsWith("0o")?i*parseInt(t.slice(2),8):t.startsWith("0x")?i*parseInt(t.slice(2),16):i*parseInt(t,10)}(e);return Number.isFinite(i)?i:ji},identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf("e")<0,represent:e=>e.toString(10)}),un=new RegExp("^(?:[-+]?0b[0-1_]+|[-+]?0[0-7_]+|[-+]?0x[0-9a-fA-F_]+|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+|[-+]?(?:0|[1-9][0-9_]*))$");var hn=Bi("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-","+",..."0123456789"],resolve:function(e){if(!un.test(e))return ji;const t=function(e){let t=e.replace(/_/g,""),i=1;if("-"!==t[0]&&"+"!==t[0]||("-"===t[0]&&(i=-1),t=t.slice(1)),t.startsWith("0b"))return i*parseInt(t.slice(2),2);if(t.startsWith("0x"))return i*parseInt(t.slice(2),16);if(t.includes(":")){let e=0;for(const i of t.split(":"))e=60*e+Number(i);return i*e}return"0"!==t&&"0"===t[0]?i*parseInt(t,8):i*parseInt(t,10)}(e);return Number.isFinite(t)?t:ji},identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf("e")<0,represent:e=>e.toString(10)}),mn=new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),gn=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");var fn=Bi("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-","+",".",..."0123456789"],resolve:function(e){if(!mn.test(e))return ji;let t=e.toLowerCase();const i="-"===t[0]?-1:1;if("+-".includes(t[0])&&(t=t.slice(1)),".inf"===t)return 1===i?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(".nan"===t)return NaN;const n=i*parseFloat(t);return Number.isFinite(n)||gn.test(e)?n:ji},identify:e=>"number"==typeof e&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf("e")>=0),represent:function(e){if(isNaN(e))return".nan";if(e===Number.POSITIVE_INFINITY)return".inf";if(e===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(e,-0))return"-0.0";const t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace("e",".e"):t}}),bn=new RegExp("^-?(?:0|[1-9][0-9]*)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$"),vn=new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");var yn=Bi("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-",..."0123456789"],resolve:function(e,t){if(t){if(!vn.test(e))return ji;let t=e.toLowerCase();const i="-"===t[0]?-1:1;if("+-".includes(t[0])&&(t=t.slice(1)),".inf"===t)return 1===i?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(".nan"===t)return NaN;const n=i*parseFloat(t);return Number.isFinite(n)?n:ji}if(!bn.test(e))return ji;const i=Number(e);return Number.isFinite(i)?i:ji},identify:e=>"number"==typeof e&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf("e")>=0),represent:function(e){if(isNaN(e))return".nan";if(e===Number.POSITIVE_INFINITY)return".inf";if(e===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(e,-0))return"-0.0";const t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace("e",".e"):t}}),wn=new RegExp("^(?:[-+]?(?:(?:[0-9][0-9_]*)?\\.[0-9_]*)(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),xn=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");var _n=Bi("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-","+",".",..."0123456789"],resolve:function(e){if(!wn.test(e))return ji;let t=e.toLowerCase().replace(/_/g,"");const i="-"===t[0]?-1:1;if("+-".includes(t[0])&&(t=t.slice(1)),".inf"===t)return 1===i?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(".nan"===t)return NaN;let n=0;if(t.includes(":")){for(const e of t.split(":"))n=60*n+Number(e);n*=i}else n=i*parseFloat(t);return Number.isFinite(n)||xn.test(e)?n:ji},identify:e=>"number"==typeof e&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf("e")>=0),represent:function(e){if(isNaN(e))return".nan";if(e===Number.POSITIVE_INFINITY)return".inf";if(e===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(e,-0))return"-0.0";const t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace("e",".e"):t}}),$n=Bi("tag:yaml.org,2002:merge",{implicit:!0,implicitFirstChars:["<"],resolve:(e,t)=>"<<"===e||t&&""===e?"<<":ji,identify:()=>!1}),kn=/^[A-Za-z0-9+/]*={0,2}$/;var Sn=Bi("tag:yaml.org,2002:binary",{resolve:function(e){const t=e.replace(/\s/g,"");if(t.length%4!=0||!kn.test(t))return ji;const i=atob(t),n=new Uint8Array(i.length);for(let e=0;e<i.length;e++)n[e]=i.charCodeAt(e);return n},identify:e=>"[object Uint8Array]"===Object.prototype.toString.call(e),represent:function(e){let t="";for(let i=0;i<e.length;i++)t+=String.fromCharCode(e[i]);return btoa(t)}}),Cn=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),Tn=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function Mn(e,t,i,n=0,r=0,a=0,o=0){const s=new Date(Date.UTC(e,t,i,n,r,a,o));return s.setUTCFullYear(e,t,i),s}var An=Bi("tag:yaml.org,2002:timestamp",{implicit:!0,implicitFirstChars:[..."0123456789"],resolve:function(e){let t=Cn.exec(e);if(null===t&&(t=Tn.exec(e)),null===t)return ji;const i=+t[1],n=+t[2]-1,r=+t[3];if(!t[4]){const e=Mn(i,n,r);return e.getUTCFullYear()!==i||e.getUTCMonth()!==n||e.getUTCDate()!==r?ji:e}const a=+t[4],o=+t[5],s=+t[6];let l=0;if(a>23||o>59||s>59)return ji;if(t[7]){let e=t[7].slice(0,3);for(;e.length<3;)e+="0";l=+e}const c=Mn(i,n,r,a,o,s,l);if(c.getUTCFullYear()!==i||c.getUTCMonth()!==n||c.getUTCDate()!==r)return ji;if(t[9]){const e=+t[10],i=+(t[11]||0);if(e>23||i>59)return ji;const n=6e4*(60*e+i);c.setTime(c.getTime()-("-"===t[9]?-n:n))}return c},identify:e=>e instanceof Date,represent:e=>e.toISOString()}),En=qi("tag:yaml.org,2002:seq",{create:()=>[],addItem:(e,t)=>{e.push(t)},identify:Array.isArray});function Pn(e){if(null===e||"object"!=typeof e||Array.isArray(e))return!1;const t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function zn(e,t){const i={};for(const n of t)void 0!==e[n]&&(i[n]=e[n]);return i}var Rn=qi("tag:yaml.org,2002:omap",{create:()=>({list:[],seen:new Set}),addItem:(e,t)=>{let i;if(t instanceof Map){if(1!==t.size)return"cannot resolve an ordered map item";i=t.keys().next().value}else{if(!Pn(t))return"cannot resolve an ordered map item";{const e=Object.keys(t);if(1!==e.length)return"cannot resolve an ordered map item";i=e[0]}}return e.seen.has(i)?"duplicate key in ordered map":(e.seen.add(i),e.list.push(t),"")},finalize:e=>e.list,identify:()=>!1}),In=qi("tag:yaml.org,2002:pairs",{create:()=>[],addItem:(e,t)=>{if(t instanceof Map)return 1!==t.size?"cannot resolve a pairs item":(e.push(t.entries().next().value),"");if("[object Object]"!==Object.prototype.toString.call(t))return"cannot resolve a pairs item";const i=t,n=Object.keys(i);return 1!==n.length?"cannot resolve a pairs item":(e.push([n[0],i[n[0]]]),"")},identify:()=>!1}),Ln=Hi("tag:yaml.org,2002:map",{create:()=>({}),identify:Pn,represent:e=>{const t=new Map;for(const i of Object.keys(e))t.set(i,e[i]);return t},addPair:(e,t,i)=>{if(null!==t&&"object"==typeof t)return"object-based map does not support complex keys";const n=String(t);return"__proto__"===n?Object.defineProperty(e,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[n]=i,""},has:(e,t)=>(null===t||"object"!=typeof t)&&Object.prototype.hasOwnProperty.call(e,String(t)),keys:e=>Object.keys(e),get:(e,t)=>{const i=String(t);return Object.prototype.hasOwnProperty.call(e,i)?e[i]:null}}),On=Hi("tag:yaml.org,2002:set",{create:()=>new Set,identify:e=>e instanceof Set,represent:e=>{const t=new Map;for(const i of e)t.set(i,null);return t},addPair:(e,t,i)=>null!==i?"cannot resolve a set item":(e.add(t),""),has:(e,t)=>e.has(t),keys:e=>e.keys(),get:()=>null});var Dn=class e{tags;implicitScalarTags;implicitScalarByFirstChar;implicitScalarAnyFirstChar;defaultScalarTag;defaultSequenceTag;defaultMappingTag;exact;prefix;constructor(e){const t=function(e){const t=[];for(const i of e){let e=t.length;for(let n=0;n<t.length;n++){const r=t[n];if(r.nodeKind===i.nodeKind&&r.tagName===i.tagName&&r.matchByTagPrefix===i.matchByTagPrefix){e=n;break}}t[e]=i}return t}(e),i=[],n={scalar:Object.create(null),sequence:Object.create(null),mapping:Object.create(null)},r={scalar:[],sequence:[],mapping:[]};for(const e of t){if("scalar"===e.nodeKind&&e.implicit){if(e.matchByTagPrefix)throw new Error("Implicit scalar tags cannot match by tag prefix");i.push(e)}switch(e.nodeKind){case"scalar":e.matchByTagPrefix?r.scalar.push(e):n.scalar[e.tagName]=e;break;case"sequence":e.matchByTagPrefix?r.sequence.push(e):n.sequence[e.tagName]=e;break;case"mapping":e.matchByTagPrefix?r.mapping.push(e):n.mapping[e.tagName]=e}}const a=i.filter(e=>null===e.implicitFirstChars),o=new Set;for(const e of i)if(null!==e.implicitFirstChars)for(const t of e.implicitFirstChars)o.add(t);const s=new Map;for(const e of o)s.set(e,i.filter(t=>null===t.implicitFirstChars||-1!==t.implicitFirstChars.indexOf(e)));const l=n.scalar["tag:yaml.org,2002:str"];if(!l)throw new Error("schema does not define the default scalar tag (tag:yaml.org,2002:str)");this.tags=t,this.implicitScalarTags=i,this.implicitScalarByFirstChar=s,this.implicitScalarAnyFirstChar=a,this.defaultScalarTag=l,this.defaultSequenceTag=n.sequence["tag:yaml.org,2002:seq"],this.defaultMappingTag=n.mapping["tag:yaml.org,2002:map"],this.exact=n,this.prefix=r}lookupScalarTag(e){const t=this.exact.scalar[e];if(t)return t;for(const t of this.prefix.scalar)if(e.startsWith(t.tagName))return t}lookupSequenceTag(e){const t=this.exact.sequence[e];if(t)return t;for(const t of this.prefix.sequence)if(e.startsWith(t.tagName))return t}lookupMappingTag(e){const t=this.exact.mapping[e];if(t)return t;for(const t of this.prefix.mapping)if(e.startsWith(t.tagName))return t}resolveImplicitScalarTag(e){const t=this.implicitScalarByFirstChar.get(e.charAt(0))??this.implicitScalarAnyFirstChar;for(const i of t){const t=i.resolve(e,!1,i.tagName);if(t!==ji)return{value:t,tag:i}}const i=this.defaultScalarTag;return{value:i.resolve(e,!1,i.tagName),tag:i}}withTags(...t){let i=[];for(const e of t)i=i.concat(e);return new e([...this.tags,...i])}},Nn=new Dn([Gi,En,Ln]),Fn=(new Dn([...Nn.tags,Wi,tn,pn,yn]),new Dn([...Nn.tags,Vi,Zi,ln,fn])),jn=new Dn([...Nn.tags,Qi,an,hn,_n,An,$n,Sn,Rn,In,On]).withTags({...hn,resolve:(e,t,i)=>{const n=hn.resolve(e,t,i);return n===ji?ln.resolve(e,t,i):n}},{..._n,resolve:(e,t,i)=>{const n=_n.resolve(e,t,i);return n===ji?fn.resolve(e,t,i):n}});Hi("tag:yaml.org,2002:map",{create:()=>new Map,addPair:(e,t,i)=>(e.set(t,i),""),has:(e,t)=>e.has(t),keys:e=>e.keys(),get:(e,t)=>e.get(t),identify:e=>e instanceof Map||Pn(e),represent:e=>{if(e instanceof Map)return e;const t=new Map,i=e;for(const e of Object.keys(i))t.set(e,i[e]);return t}});function Bn(e){if(Array.isArray(e)){const t=Array.prototype.slice.call(e);for(let e=0;e<t.length;e++){if(Array.isArray(t[e]))return null;"object"==typeof t[e]&&"[object Object]"===Object.prototype.toString.call(t[e])&&(t[e]="[object Object]")}return String(t)}return"object"==typeof e&&"[object Object]"===Object.prototype.toString.call(e)?"[object Object]":String(e)}Hi("tag:yaml.org,2002:map",{create:()=>({}),identify:Pn,represent:e=>{const t=new Map;for(const i of Object.keys(e))t.set(i,e[i]);return t},addPair:(e,t,i)=>{const n=Bn(t);return null===n?"nested arrays are not supported inside keys":("__proto__"===n?Object.defineProperty(e,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[n]=i,"")},has:(e,t)=>{const i=Bn(t);return null!==i&&Object.prototype.hasOwnProperty.call(e,i)},keys:e=>Object.keys(e),get:(e,t)=>{const i=String(t);return Object.prototype.hasOwnProperty.call(e,i)?e[i]:null}});var qn={maxLength:79,indent:1,linesBefore:3,linesAfter:2};function Hn(e,t,i,n,r){let a="",o="";const s=Math.floor(r/2)-1;return n-t>s&&(a=" ... ",t=n-s+a.length),i-n>s&&(o=" ...",i=n+s-o.length),{str:a+e.slice(t,i).replace(/\t/g,"→")+o,pos:n-t+a.length}}function Gn(e,t){return" ".repeat(Math.max(t-e.length,0))+e}function Un(e,t){let i="";return e.mark?(e.mark.name&&(i+=`in "${e.mark.name}" `),i+=`(${e.mark.line+1}:${e.mark.column+1})`,!t&&e.mark.snippet&&(i+=`\n\n${e.mark.snippet}`),`${e.reason} ${i}`):e.reason}var Vn=class e extends Error{reason;mark;constructor(e,t){super(),this.name="YAMLException",this.reason=e,this.mark=t,this.message=Un(this,!1),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}toString(e){return`${this.name}: ${Un(this,e)}`}static throwAt(t,i,n,r=""){let a=0,o=0;for(let e=0;e<i;e++){const i=t.charCodeAt(e);10===i?(a++,o=e+1):13===i&&(a++,10===t.charCodeAt(e+1)&&e++,o=e+1)}const s={name:r,buffer:t,position:i,line:a,column:i-o};throw s.snippet=function(e,t){if(!e.buffer)return null;const i={...qn,...t},n=/\r?\n|\r|\0/g,r=[0],a=[];let o,s=-1;for(;o=n.exec(e.buffer);)a.push(o.index),r.push(o.index+o[0].length),e.position<=o.index&&s<0&&(s=r.length-2);s<0&&(s=r.length-1);let l="";const c=Math.min(e.line+i.linesAfter,a.length).toString().length,d=i.maxLength-(i.indent+c+3);for(let t=1;t<=i.linesBefore&&!(s-t<0);t++){const n=Hn(e.buffer,r[s-t],a[s-t],e.position-(r[s]-r[s-t]),d);l=`${" ".repeat(i.indent)}${Gn((e.line-t+1).toString(),c)} | ${n.str}\n${l}`}const p=Hn(e.buffer,r[s],a[s],e.position,d);l+=`${" ".repeat(i.indent)}${Gn((e.line+1).toString(),c)} | ${p.str}\n`,l+=`${"-".repeat(i.indent+c+3+p.pos)}^\n`;for(let t=1;t<=i.linesAfter&&!(s+t>=a.length);t++){const n=Hn(e.buffer,r[s+t],a[s+t],e.position-(r[s]-r[s+t]),d);l+=`${" ".repeat(i.indent)}${Gn((e.line+t+1).toString(),c)} | ${n.str}\n`}return l.replace(/\n$/,"")}(s),new e(n,s)}},Wn=1,Kn=2,Qn=3,Yn=4,Xn=5,Zn=6,Jn=1,er=2,tr=3,ir=4,nr=5,rr=1,ar=2,or=1,sr=2,lr=3;function cr(e){switch(e){case 48:return"\0";case 97:return"";case 98:return"\b";case 116:case 9:return"\t";case 110:return"\n";case 118:return"\v";case 102:return"\f";case 114:return"\r";case 101:return"";case 32:return" ";case 34:return'"';case 47:return"/";case 92:return"\\";case 78:return"";case 95:return" ";case 76:return"\u2028";case 80:return"\u2029";default:return""}}var dr=new Array(256),pr=new Array(256);for(let e=0;e<256;e++)dr[e]=cr(e)?1:0,pr[e]=cr(e);function ur(e){return e<=65535?String.fromCharCode(e):String.fromCharCode(55296+(e-65536>>10),56320+(e-65536&1023))}function hr(e){return e>=48&&e<=57?e-48:(32|e)-97+10}function mr(e){return 120===e?2:117===e?4:8}function gr(e,t,i){let n=0;for(;t<i;){const i=e.charCodeAt(t);if(10===i)n++,t++;else if(13===i)n++,t++,10===e.charCodeAt(t)&&t++;else{if(32!==i&&9!==i)break;t++}}return{position:t,breaks:n}}function fr(e){return 1===e?" ":"\n".repeat(e-1)}function br(e,t,i,n,r,a){const o=n<0?0:n,s=e.slice(t,i).replace(/\r\n?/g,"\n"),l=""===s?[]:(s.endsWith("\n")?s.slice(0,-1):s).split("\n");let c="",d=!1,p=0,u=!1;for(const e of l){let t=0;for(;t<o&&32===e.charCodeAt(t);)t++;if(n<0||t>=e.length){p++;continue}const i=e.slice(o),r=i.charCodeAt(0);a?32===r||9===r?(u=!0,c+="\n".repeat(d?1+p:p)):u?(u=!1,c+="\n".repeat(p+1)):0===p?d&&(c+=" "):c+="\n".repeat(p):c+="\n".repeat(d?1+p:p),c+=i,d=!0,p=0}return r===lr?c+="\n".repeat(d?1+p:p):r!==sr&&d&&(c+="\n"),c}function vr(e,t){if(-1===t.valueStart)return"";const{valueStart:i,valueEnd:n}=t;if(t.fast)return e.slice(i,n);switch(t.style){case er:return function(e,t,i){let n="",r=t,a=t,o=t;for(;r<i;){const t=e.charCodeAt(r);if(39===t)n+=e.slice(a,r)+"'",r+=2,a=o=r;else if(10===t||13===t){n+=e.slice(a,o);const t=gr(e,r,i);n+=fr(t.breaks),r=a=o=t.position}else r++,32!==t&&9!==t&&(o=r)}return n+e.slice(a,i)}(e,i,n);case tr:return function(e,t,i){let n="",r=t,a=t,o=t;for(;r<i;){const t=e.charCodeAt(r);if(92===t){n+=e.slice(a,r),r++;const t=e.charCodeAt(r);if(10===t||13===t)r=gr(e,r,i).position;else if(t<256&&dr[t])n+=pr[t],r++;else{let i=mr(t),a=0;for(;i>0;i--)r++,a=(a<<4)+hr(e.charCodeAt(r));n+=ur(a),r++}a=o=r}else if(10===t||13===t){n+=e.slice(a,o);const t=gr(e,r,i);n+=fr(t.breaks),r=a=o=t.position}else r++,32!==t&&9!==t&&(o=r)}return n+e.slice(a,i)}(e,i,n);case ir:return br(e,i,n,t.indent,t.chomping,!1);case nr:return br(e,i,n,t.indent,t.chomping,!0);default:return function(e,t,i){let n="",r=t,a=t,o=t;for(;r<i;){const t=e.charCodeAt(r);if(10===t||13===t){n+=e.slice(a,o);const t=gr(e,r,i);n+=fr(t.breaks),r=a=o=t.position}else r++,32!==t&&9!==t&&(o=r)}return n+e.slice(a,o)}(e,i,n)}}var yr=Object.assign(Object.create(null),{"!":"!","!!":"tag:yaml.org,2002:"});function wr(e){return encodeURI(e).replace(/!/g,"%21")}function xr(e,t){if(e.startsWith("!<")&&e.endsWith(">"))return decodeURIComponent(e.slice(2,-1));const i=e.indexOf("!",1),n=-1===i?"!":e.slice(0,i+1),r=t?.[n]??yr[n]??n;return decodeURIComponent(r)+decodeURIComponent(e.slice(n.length))}function _r(e){let t=e;return 33===t.charCodeAt(0)?(t=t.slice(1),`!${wr(t)}`):"tag:yaml.org,2002:"===t.slice(0,18)?`!!${wr(t.slice(18))}`:`!<${wr(t)}>`}var $r=-1,kr={filename:"",schema:Fn,json:!1,maxTotalMergeKeys:1e4,maxAliases:-1};function Sr(e){return"tagStart"in e&&e.tagStart!==$r?e.tagStart:"anchorStart"in e&&e.anchorStart!==$r?e.anchorStart:"valueStart"in e&&e.valueStart!==$r?e.valueStart:"start"in e?e.start:0}function Cr(e,t){Vn.throwAt(e.source,e.position,t,e.filename)}function Tr(e,t,i,n){try{return i.finalize(n)}catch(i){if(i instanceof Vn)throw i;Vn.throwAt(e.source,t,i instanceof Error?i.message:String(i),e.filename)}}function Mr(e,t){const i=vr(e.source,t),n=t.tagStart===$r?"":e.source.slice(t.tagStart,t.tagEnd),r=e.schema.defaultScalarTag;if(""!==n){if("!"===n)return{value:i,tag:r};const t=xr(n,e.tagHandlers),a=e.schema.lookupScalarTag(t);if(a){const n=a.resolve(i,!0,t);return n===ji&&Cr(e,`cannot resolve a node with !<${t}> explicit tag`),{value:n,tag:a}}const o=e.schema.lookupMappingTag(t)??e.schema.lookupSequenceTag(t);if(o){""!==i&&Cr(e,`cannot resolve a node with !<${t}> explicit tag`);const n=o.create(t);return{value:o.carrierIsResult?n:Tr(e,e.position,o,n),tag:o}}Cr(e,`unknown scalar tag !<${t}>`)}return t.style===Jn?e.schema.resolveImplicitScalarTag(i):{value:r.resolve(i,!1,r.tagName),tag:r}}function Ar(e,t,i){const n=t.tagStart===$r?"":e.source.slice(t.tagStart,t.tagEnd);return""===n||"!"===n?i:xr(n,e.tagHandlers)}function Er(e){return"mapping"===e.nodeKind}function Pr(e){e.totalMergeKeys++,-1!==e.maxTotalMergeKeys&&e.totalMergeKeys>e.maxTotalMergeKeys&&Cr(e,`merge keys exceeded maxTotalMergeKeys (${e.maxTotalMergeKeys})`)}function zr(e,t,i,n){Pr(e);for(const r of n.keys(i)){if(Pr(e),t.tag.has(t.value,r))continue;const a=t.tag.addPair(t.value,r,n.get(i,r));a&&Cr(e,a),t.overridable??=new Set,t.overridable.add(r)}}function Rr(e,t,i,n,r){if(e.position=t.keyPosition,t.keyIsMerge)return void function(e,t,i,n){if(e.position=t.keyPosition,Er(n))zr(e,t,i,n);else if("sequence"===n.nodeKind&&Array.isArray(i)){i.length>100&&Cr(e,"abnormal merge sequence size");for(const n of i){const i=e.nodeTags.get(n);i||Cr(e,"cannot merge mappings; the provided source object is unacceptable"),zr(e,t,n,i)}}else Cr(e,"cannot merge mappings; the provided source object is unacceptable")}(e,t,n,r);e.json||!t.tag.has(t.value,i)||t.overridable?.has(i)||Cr(e,"duplicated mapping key");const a=t.tag.addPair(t.value,i,n);a&&Cr(e,a),t.overridable?.delete(i)}function Ir(e,t,i){const n=e.frames[e.frames.length-1];if("document"===n.kind)n.value=t,n.hasValue=!0;else if("sequence"===n.kind){Er(i)&&e.nodeTags.set(t,i);const r=n.tag.addItem(n.value,t,n.index++);r&&Cr(e,r)}else if(n.hasKey){const r=n.key;n.key=void 0,n.hasKey=!1,Rr(e,n,r,t,i)}else n.key=t,n.keyPosition=e.position,n.hasKey=!0,n.keyIsMerge="tag:yaml.org,2002:merge"===i.tagName}function Lr(e,t,i,n,r){if(t.anchorStart!==$r){const a={value:i,tag:n,isValueFinal:r};return e.anchors.set(e.source.slice(t.anchorStart,t.anchorEnd),a),a}return null}var Or=-1,Dr=Object.prototype.hasOwnProperty,Nr=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,Fr=/[,\[\]{}]/,jr=/^(?:!|!!|![0-9A-Za-z-]+!)$/,Br=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$,_.!~*'()\[\]])`,qr=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$.~*'()_])`,Hr=new RegExp(`^(?:${Br})*$`),Gr=new RegExp(`^(?:${qr})+$`),Ur=new RegExp(`^(?:!(?:${Br})*|${qr}(?:${Br})*)$`),Vr={filename:"",maxDepth:100};function Wr(e,t,i,n,r,a,o){e.events.push({type:Kn,start:t,anchorStart:i,anchorEnd:n,tagStart:r,tagEnd:a,style:o})}function Kr(e,t,i,n,r,a,o){e.events.push({type:Qn,start:t,anchorStart:i,anchorEnd:n,tagStart:r,tagEnd:a,style:o})}function Qr(e,t){e.events.splice(t.eventsLength,0,{type:Qn,start:t.position,anchorStart:Or,anchorEnd:Or,tagStart:Or,tagEnd:Or,style:ar})}function Yr(e,t,i,n,r,a,o,s,l=or,c=-1,d=!1){e.events.push({type:Yn,valueStart:t,valueEnd:i,anchorStart:n,anchorEnd:r,tagStart:a,tagEnd:o,style:s,chomping:l,indent:c,fast:d})}function Xr(e){e.events.push({type:Zn})}function Zr(e){Yr(e,Or,Or,Or,Or,Or,Or,Jn)}function Jr(){return{anchorStart:Or,anchorEnd:Or,tagStart:Or,tagEnd:Or}}function ea(e){return{position:e.position,line:e.line,lineStart:e.lineStart,lineIndent:e.lineIndent,firstTabInLine:e.firstTabInLine,eventsLength:e.events.length}}function ta(e,t){e.position=t.position,e.line=t.line,e.lineStart=t.lineStart,e.lineIndent=t.lineIndent,e.firstTabInLine=t.firstTabInLine,e.events.length=t.eventsLength}function ia(e,t){Vn.throwAt(e.input.slice(0,e.length),e.position,t,e.filename)}function na(e){return 10===e||13===e}function ra(e){return 9===e||32===e}function aa(e){return ra(e)||na(e)}function oa(e){return 0===e||aa(e)}function sa(e){return 44===e||91===e||93===e||123===e||125===e}function la(e){return e>=48&&e<=57?e-48:-1}function ca(e){if(e>=48&&e<=57)return e-48;const t=32|e;return t>=97&&t<=102?t-97+10:-1}function da(e){return 120===e?2:117===e?4:85===e?8:0}function pa(e){return 48===e||97===e||98===e||116===e||9===e||110===e||118===e||102===e||114===e||101===e||32===e||34===e||47===e||92===e||78===e||95===e||76===e||80===e}function ua(e){10===e.input.charCodeAt(e.position)?e.position++:(e.position++,10===e.input.charCodeAt(e.position)&&e.position++),e.line++,e.lineStart=e.position,e.lineIndent=0,e.firstTabInLine=-1}function ha(e,t){let i=0,n=e.input.charCodeAt(e.position),r=e.position===e.lineStart||aa(e.input.charCodeAt(e.position-1));for(;0!==n;){for(;ra(n);)r=!0,9===n&&-1===e.firstTabInLine&&(e.firstTabInLine=e.position),n=e.input.charCodeAt(++e.position);if(t&&r&&35===n)do{n=e.input.charCodeAt(++e.position)}while(!na(n)&&0!==n);if(!na(n))break;for(ua(e),i++,r=!0,n=e.input.charCodeAt(e.position);32===n;)e.lineIndent++,n=e.input.charCodeAt(++e.position)}return i}function ma(e,t=e.position){const i=e.input.charCodeAt(t);if((45===i||46===i)&&i===e.input.charCodeAt(t+1)&&i===e.input.charCodeAt(t+2)){const i=e.input.charCodeAt(t+3);return 0===i||aa(i)}return!1}function ga(e){e.position===e.lineStart&&65279===e.input.charCodeAt(e.position)&&(e.position++,e.lineStart=e.position)}function fa(e){if(e.position!==e.lineStart)return!1;if(ma(e))return!0;if(65279!==e.input.charCodeAt(e.position))return!1;const t=ea(e);ga(e),ha(e,!0);const i=e.input.charCodeAt(e.position),n=e.position===e.lineStart&&(37===i||45===i&&ma(e));return ta(e,t),n}function ba(e){let t=e.input.charCodeAt(e.position);for(;0!==t&&!na(t);)t=e.input.charCodeAt(++e.position)}function va(e,t,i){Nr.test(e.input.slice(t,i))&&ia(e,"the stream contains non-printable characters")}function ya(e,t,i){if(33!==e.input.charCodeAt(e.position))return!1;t.tagStart!==Or&&ia(e,"duplication of a tag property");const n=e.position;let r=!1,a=!1,o="!",s=e.input.charCodeAt(++e.position);60===s?(r=!0,s=e.input.charCodeAt(++e.position)):33===s&&(a=!0,o="!!",s=e.input.charCodeAt(++e.position));let l,c=e.position;if(r){for(;0!==s&&62!==s;)s=e.input.charCodeAt(++e.position);62!==s&&ia(e,"unexpected end of the stream within a verbatim tag"),l=e.input.slice(c,e.position),e.position++}else{for(;!(0===s||aa(s)||i&&sa(s));)33===s&&(a?ia(e,"tag suffix cannot contain exclamation marks"):(o=e.input.slice(c-1,e.position+1),jr.test(o)||ia(e,"named tag handle cannot contain such characters"),a=!0,c=e.position+1)),s=e.input.charCodeAt(++e.position);l=e.input.slice(c,e.position),Fr.test(l)&&ia(e,"tag suffix cannot contain flow indicator characters")}return l&&!(r?Hr.test(l):Gr.test(l))&&ia(e,`tag name cannot contain such characters: ${l}`),r||"!"===o||"!!"===o||Dr.call(e.tagHandlers,o)||ia(e,`undeclared tag handle "${o}"`),t.tagStart=n,t.tagEnd=e.position,!0}function wa(e,t){if(38!==e.input.charCodeAt(e.position))return!1;t.anchorStart!==Or&&ia(e,"duplication of an anchor property"),e.position++;const i=e.position;for(;0!==e.input.charCodeAt(e.position)&&!aa(e.input.charCodeAt(e.position))&&!sa(e.input.charCodeAt(e.position));)e.position++;return e.position===i&&ia(e,"name of an anchor node must contain at least one character"),t.anchorStart=i,t.anchorEnd=e.position,!0}function xa(e,t){if(42!==e.input.charCodeAt(e.position))return!1;t.anchorStart===Or&&t.tagStart===Or||ia(e,"alias node should not have any properties"),e.position++;const i=e.position;for(;0!==e.input.charCodeAt(e.position)&&!aa(e.input.charCodeAt(e.position))&&!sa(e.input.charCodeAt(e.position));)e.position++;return e.position===i&&ia(e,"name of an alias node must contain at least one character"),function(e,t,i){e.events.push({type:Xn,anchorStart:t,anchorEnd:i})}(e,i,e.position),!0}function _a(e,t){ha(e,!1),e.lineIndent<t&&ia(e,"deficient indentation")}function $a(e,t,i,n){if(!function(e,t){const i=e.input.charCodeAt(e.position),n=1===t;if(0===i||aa(i)||35===i||38===i||42===i||33===i||124===i||62===i||39===i||34===i||37===i||64===i||96===i||n&&sa(i))return!1;if(63===i||45===i){const t=e.input.charCodeAt(e.position+1);if(oa(t)||n&&sa(t))return!1}return!0}(e,i))return!1;const r=e.position;let a=e.position,o=e.input.charCodeAt(e.position);const s=1===i;let l=!1;for(;0!==o&&!fa(e);){if(58===o){const t=e.input.charCodeAt(e.position+1);if(oa(t)||s&&sa(t))break}else if(35===o){if(aa(e.input.charCodeAt(e.position-1)))break}else{if(s&&sa(o))break;if(na(o)){const i=e.position,n=e.line,r=e.lineStart,a=e.lineIndent;if(ha(e,!1),e.lineIndent>=t){l=!0,o=e.input.charCodeAt(e.position);continue}e.position=i,e.line=n,e.lineStart=r,e.lineIndent=a;break}}ra(o)||(a=e.position+1),o=e.input.charCodeAt(++e.position)}return a!==r&&(va(e,r,a),Yr(e,r,a,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,Jn,or,-1,!l),!0)}function ka(e,t){const i=e.line;ha(e,!0),(e.line>i&&e.lineIndent<t||-1!==e.firstTabInLine&&e.lineIndent<t)&&ia(e,"deficient indentation")}function Sa(e,t,i){if(-1!==e.firstTabInLine||45!==e.input.charCodeAt(e.position)||!oa(e.input.charCodeAt(e.position+1)))return!1;for(Wr(e,e.position,i.anchorStart,i.anchorEnd,i.tagStart,i.tagEnd,rr);45===e.input.charCodeAt(e.position)&&oa(e.input.charCodeAt(e.position+1));){-1!==e.firstTabInLine&&(e.position=e.firstTabInLine,ia(e,"tab characters must not be used in indentation"));const i=e.line;e.position++;const n=ha(e,!0)>0;if(-1!==e.firstTabInLine&&45===e.input.charCodeAt(e.position)&&oa(e.input.charCodeAt(e.position+1))&&ia(e,"bad indentation of a sequence entry"),n&&e.lineIndent<=t?Zr(e):Ta(e,t,3,!1,!0),ha(e,!0),e.lineIndent<t||e.position>=e.length)break;e.lineIndent>t&&ia(e,"bad indentation of a sequence entry"),e.line===i&&45===e.input.charCodeAt(e.position)&&oa(e.input.charCodeAt(e.position+1))&&ia(e,"bad indentation of a sequence entry")}return Xr(e),!0}function Ca(e,t,i,n){let r=!1,a=!1,o=!1,s=!1;if(-1!==e.firstTabInLine)return!1;let l=e.input.charCodeAt(e.position);for(;0!==l;){r||-1===e.firstTabInLine||(e.position=e.firstTabInLine,ia(e,"tab characters must not be used in indentation"));const c=e.input.charCodeAt(e.position+1),d=e.line;if(63!==l&&58!==l||!oa(c)){r&&(Zr(e),r=!1);const t=ea(e);if(!Ta(e,i,2,!1,!0))break;if(e.line===d){for(l=e.input.charCodeAt(e.position);ra(l);)l=e.input.charCodeAt(++e.position);if(58===l)l=e.input.charCodeAt(++e.position),oa(l)||ia(e,"a whitespace character is expected after the key-value separator within a block mapping"),o||(e.events.splice(t.eventsLength,0,{type:Qn,start:t.position,anchorStart:n.anchorStart,anchorEnd:n.anchorEnd,tagStart:n.tagStart,tagEnd:n.tagEnd,style:rr}),o=!0),a=!0,r=!1,s=!1;else{if(!a)return n.anchorStart===Or&&n.tagStart===Or||(ta(e,t),!1);ia(e,"expected ':' after a mapping key")}}else{if(!a)return n.anchorStart===Or&&n.tagStart===Or||(ta(e,t),!1);ia(e,"can not read a block mapping entry; a multiline key may not be an implicit key")}}else o||(Kr(e,e.position,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,rr),o=!0),63===l?(r&&Zr(e),a=!0,r=!0):(r||(Zr(e),a=!0),r=!1),e.position+=1,s=!0;if(Ta(e,t,4,!0,s)&&(s=!1),r||s&&(Zr(e),s=!1),ha(e,!0),l=e.input.charCodeAt(e.position),(e.line===d||e.lineIndent>t)&&0!==l)ia(e,"bad indentation of a mapping entry");else if(e.lineIndent<t)break}return!!a&&(r&&Zr(e),o&&Xr(e),!0)}function Ta(e,t,i,n,r,a=!0){e.depth>=e.maxDepth&&ia(e,`nesting exceeded maxDepth (${e.maxDepth})`),e.depth++;let o=1,s=!1,l=!1,c=null;const d=Jr();let p=4===i||3===i,u=p;const h=p;if(n&&ha(e,!0)&&(s=!0,o=e.lineIndent>t?1:e.lineIndent===t?0:-1),1===o)for(;;){const n=e.input.charCodeAt(e.position),r=ea(e);if(s&&1!==o&&(33===n||38===n))break;if(s&&h&&(d.tagStart!==Or||d.anchorStart!==Or)&&(33===n||38===n)){const i=ea(e),n=t+1;if(Ca(e,e.position-e.lineStart,n,d)&&e.events[i.eventsLength]?.type===Qn)return e.depth--,!0;ta(e,i)}if(s&&(33===n&&d.tagStart!==Or||38===n&&d.anchorStart!==Or))break;if(!ya(e,d,1===i)&&!wa(e,d))break;null===c&&(c=r),ha(e,!0)?(s=!0,u=h,o=e.lineIndent>t?1:e.lineIndent===t?0:-1):u=!1}if(u&&(u=s||r),1===o||4===i){const n=1===i||2===i?t:t+1,r=e.position-e.lineStart;if(1===o)if(u&&(Sa(e,r,d)||Ca(e,r,n,d))||function(e,t,i){const n=e.input.charCodeAt(e.position),r=123===n,a=e.position;let o=!0;if(91!==n&&123!==n)return!1;const s=r?125:93;for(r?Kr(e,a,i.anchorStart,i.anchorEnd,i.tagStart,i.tagEnd,ar):Wr(e,a,i.anchorStart,i.anchorEnd,i.tagStart,i.tagEnd,ar),e.position++;0!==e.input.charCodeAt(e.position);){ka(e,t);let i=e.input.charCodeAt(e.position);if(i===s)return e.position++,Xr(e),!0;o?44===i&&ia(e,"expected the node content, but found ','"):ia(e,"missed comma between flow collection entries");let n=!1,a=!1;63===i&&aa(e.input.charCodeAt(e.position+1))&&(n=a=!0,e.position+=1,ka(e,t));const l=e.line,c=ea(e),d=Ta(e,t,1,!1,!0);ka(e,t),i=e.input.charCodeAt(e.position),(r||a||e.line===l)&&58===i?(n=!0,e.position++,ka(e,t),r||Qr(e,c),d||Zr(e),Ta(e,t,1,!1,!0)||Zr(e),ka(e,t),r||Xr(e)):r&&n?(d||Zr(e),Zr(e)):r?Zr(e):n&&(Qr(e,c),d||Zr(e),Zr(e),Xr(e)),i=e.input.charCodeAt(e.position),44===i?(o=!0,e.position++):o=!1}ia(e,"unexpected end of the stream within a flow collection")}(e,n,d))l=!0;else{const t=e.input.charCodeAt(e.position);if(null!==c&&a&&h&&!u&&124!==t&&62!==t){const t=ea(e),i=c.position-c.lineStart;ta(e,c),Ca(e,i,n,Jr())&&e.events[t.eventsLength]?.type===Qn?l=!0:ta(e,t)}!l&&(p&&function(e,t,i){const n=e.input.charCodeAt(e.position);let r=or,a=-1,o=!1;if(124!==n&&62!==n)return!1;const s=124===n?ir:nr;for(e.position++;0!==e.input.charCodeAt(e.position);){const i=e.input.charCodeAt(e.position),n=la(i);if(43===i||45===i)r!==or&&ia(e,"repeat of a chomping mode identifier"),r=43===i?lr:sr,e.position++;else{if(!(n>=0))break;0===n&&ia(e,"bad explicit indentation width of a block scalar; it cannot be less than one"),o&&ia(e,"repeat of an indentation width identifier"),a=t+n-1,o=!0,e.position++}}let l=!1;for(;ra(e.input.charCodeAt(e.position));)l=!0,e.position++;l&&35===e.input.charCodeAt(e.position)&&ba(e),na(e.input.charCodeAt(e.position))?ua(e):0!==e.input.charCodeAt(e.position)&&ia(e,"a line break is expected");let c=o?a:-1,d=0;const p=e.position;let u=e.position;for(;0!==e.input.charCodeAt(e.position);){const i=e.position;let n=0;for(;32===e.input.charCodeAt(i+n);)n++;const r=e.input.charCodeAt(i+n);if(0===r){c>=0?n>c&&(u=i+n):n>0&&(u=i+n);break}if(fa(e))break;if(!o&&-1===c&&na(r)&&(d=Math.max(d,n)),o||-1!==c||na(r)||(9===r&&n<t&&(e.position=i+n,ia(e,"tab characters must not be used in indentation")),n>=t&&n<d&&(e.position=i+n,ia(e,"bad indentation of a mapping entry"))),-1===c&&0!==r&&!na(r)&&n<t){e.lineIndent=n,e.position=i+n;break}o||0===r||na(r)||-1!==c||(c=n);const a=-1===c?t+1:c;if(0!==r&&!na(r)&&n<a){e.lineIndent=n,e.position=i+n;break}ba(e),u=e.position,na(e.input.charCodeAt(e.position))&&(ua(e),u=e.position)}return va(e,p,u),Yr(e,p,u,i.anchorStart,i.anchorEnd,i.tagStart,i.tagEnd,s,r,c),!0}(e,n,d)||function(e,t,i){if(39!==e.input.charCodeAt(e.position))return!1;e.position++;const n=e.position;let r=!0;for(;0!==e.input.charCodeAt(e.position);){const a=e.input.charCodeAt(e.position);if(39===a){if(39===e.input.charCodeAt(e.position+1)){r=!1,e.position+=2;continue}const t=e.position;return e.position++,Yr(e,n,t,i.anchorStart,i.anchorEnd,i.tagStart,i.tagEnd,er,or,-1,r),!0}na(a)?(r=!1,_a(e,t)):e.position===e.lineStart&&ma(e)?ia(e,"unexpected end of the document within a single quoted scalar"):9!==a&&a<32?ia(e,"expected valid JSON character"):e.position++}ia(e,"unexpected end of the stream within a single quoted scalar")}(e,n,d)||function(e,t,i){if(34!==e.input.charCodeAt(e.position))return!1;e.position++;const n=e.position;let r=!0;for(;0!==e.input.charCodeAt(e.position);){const a=e.input.charCodeAt(e.position);if(34===a){const t=e.position;return e.position++,Yr(e,n,t,i.anchorStart,i.anchorEnd,i.tagStart,i.tagEnd,tr,or,-1,r),!0}if(92===a){r=!1;const i=e.input.charCodeAt(++e.position);if(na(i))_a(e,t);else if(pa(i))e.position++;else{let t=da(i);for(0===t&&ia(e,"unknown escape sequence");t-- >0;)e.position++,ca(e.input.charCodeAt(e.position))<0&&ia(e,"expected hexadecimal character");e.position++}}else na(a)?(r=!1,_a(e,t)):e.position===e.lineStart&&ma(e)?ia(e,"unexpected end of the document within a double quoted scalar"):9!==a&&a<32?ia(e,"expected valid JSON character"):e.position++}ia(e,"unexpected end of the stream within a double quoted scalar")}(e,n,d)||xa(e,d)||$a(e,n,i,d))&&(l=!0)}else 0===o&&(l=u&&Sa(e,r,d))}return p=p&&!l,l||d.anchorStart===Or&&d.tagStart===Or&&!p||(Yr(e,Or,Or,d.anchorStart,d.anchorEnd,d.tagStart,d.tagEnd,Jn),l=!0),e.depth--,l||d.anchorStart!==Or||d.tagStart!==Or}function Ma(e){if(e.lineIndent>0||37!==e.input.charCodeAt(e.position))return!1;e.position++;const t=e.position;for(;0!==e.input.charCodeAt(e.position)&&!aa(e.input.charCodeAt(e.position));)e.position++;const i=e.input.slice(t,e.position),n=[];for(0===i.length&&ia(e,"directive name must not be less than one character in length");0!==e.input.charCodeAt(e.position)&&!na(e.input.charCodeAt(e.position));){for(;ra(e.input.charCodeAt(e.position));)e.position++;if(35===e.input.charCodeAt(e.position)||na(e.input.charCodeAt(e.position))||0===e.input.charCodeAt(e.position))break;const t=e.position;for(;0!==e.input.charCodeAt(e.position)&&!aa(e.input.charCodeAt(e.position));)e.position++;n.push(e.input.slice(t,e.position))}if(na(e.input.charCodeAt(e.position))&&ua(e),"YAML"===i){e.directives.some(e=>"yaml"===e.kind)&&ia(e,"duplication of %YAML directive"),1!==n.length&&ia(e,"YAML directive accepts exactly one argument");const t=/^([0-9]+)\.([0-9]+)$/.exec(n[0]);null===t&&ia(e,"ill-formed argument of the YAML directive"),1!==parseInt(t[1],10)&&ia(e,"unacceptable YAML version of the document"),e.directives.push({kind:"yaml",version:n[0]})}else if("TAG"===i){2!==n.length&&ia(e,"TAG directive accepts exactly two arguments");const[t,i]=n;jr.test(t)||ia(e,"ill-formed tag handle (first argument) of the TAG directive"),Dr.call(e.tagHandlers,t)&&ia(e,`there is a previously declared suffix for "${t}" tag handle`),Ur.test(i)||ia(e,"ill-formed tag prefix (second argument) of the TAG directive"),e.tagHandlers[t]=i,e.directives.push({kind:"tag",handle:t,prefix:i})}return!0}function Aa(e){e.directives=[],e.tagHandlers=Object.create(null);let t=!1;for(ha(e,!0);Ma(e);)t=!0,ha(e,!0);let i=!1,n=!1,r=!0;if(0===e.lineIndent&&45===e.input.charCodeAt(e.position)&&45===e.input.charCodeAt(e.position+1)&&45===e.input.charCodeAt(e.position+2)&&oa(e.input.charCodeAt(e.position+3))){i=!0;const t=e.line;e.position+=3,ha(e,!0),r=e.line>t}else t&&ia(e,"directives end mark is expected");const a=e.events.length;if(!i&&e.position===e.lineStart&&46===e.input.charCodeAt(e.position)&&ma(e))return e.position+=3,void ha(e,!0);if(function(e,t,i){e.events.push({type:Wn,explicitStart:t,explicitEnd:i,directives:e.directives})}(e,i,!1),Ta(e,e.lineIndent-1,4,!1,r,r)||Zr(e),ha(e,!0),e.position===e.lineStart&&ma(e)&&(n=46===e.input.charCodeAt(e.position),n)){const t=e.line;e.position+=3,ha(e,!0),e.line===t&&e.position<e.length&&ia(e,"end of the stream or a document separator is expected")}const o=e.events[a];o?.type===Wn&&(o.explicitEnd=n),Xr(e),!n&&e.position<e.length&&!fa(e)&&ia(e,"end of the stream or a document separator is expected")}var Ea={...Vr,...kr};function Pa(e,t={}){const i={...Ea,...t},n=String(e),r=Object.keys(Vr),a=Object.keys(kr);return function(e,t){const i={...kr,...t,events:e,documents:[],eventIndex:0,position:0,frames:[],anchors:new Map,nodeTags:new Map,tagHandlers:Object.create(null),totalMergeKeys:0,aliasCount:0};for(;i.eventIndex<i.events.length;){const e=i.events[i.eventIndex++];switch(i.position=Sr(e),e.type){case Wn:i.anchors=new Map,i.nodeTags=new Map,i.aliasCount=0,i.tagHandlers=Object.create(null);for(const t of e.directives)"tag"===t.kind&&(i.tagHandlers[t.handle]=t.prefix);i.frames.push({kind:"document",position:i.position,value:void 0,hasValue:!1});break;case Yn:{const{value:t,tag:n}=Mr(i,e);Lr(i,e,t,n,!0),Ir(i,t,n);break}case Kn:{const t=Ar(i,e,"tag:yaml.org,2002:seq"),n=i.schema.lookupSequenceTag(t);n||Cr(i,`unknown sequence tag !<${t}>`);const r=n.create(t),a=Lr(i,e,r,n,n.carrierIsResult);i.frames.push({kind:"sequence",position:i.position,value:r,tag:n,anchor:a,index:0});break}case Qn:{const t=Ar(i,e,"tag:yaml.org,2002:map"),n=i.schema.lookupMappingTag(t);n||Cr(i,`unknown mapping tag !<${t}>`);const r=n.create(t),a=Lr(i,e,r,n,n.carrierIsResult);i.frames.push({kind:"mapping",position:i.position,value:r,tag:n,anchor:a,key:void 0,keyPosition:i.position,hasKey:!1,keyIsMerge:!1,overridable:null});break}case Xn:{-1!==i.maxAliases&&++i.aliasCount>i.maxAliases&&Cr(i,`aliases exceeded maxAliases (${i.maxAliases})`);const t=i.source.slice(e.anchorStart,e.anchorEnd),n=i.anchors.get(t);n||Cr(i,`unidentified alias "${t}"`),n.isValueFinal||Cr(i,`recursive alias "${t}" is not supported for tag ${n.tag.tagName} because it uses finalize()`),Ir(i,n.value,n.tag);break}case Zn:{const e=i.frames.pop();if("mapping"===e.kind&&e.hasKey&&(i.position=e.keyPosition,Cr(i,"incomplete mapping pair in event stream")),"document"===e.kind)i.documents.push(e.value);else{const t=e.tag.carrierIsResult?e.value:Tr(i,e.position,e.tag,e.value);e.anchor&&(e.anchor.value=t,e.anchor.isValueFinal=!0),Ir(i,t,e.tag)}break}}}return i.documents}(function(e,t){const i=e.length,n={...Vr,...t,input:`${e}\0`,length:i,position:0,line:0,lineStart:0,lineIndent:0,firstTabInLine:-1,depth:0,directives:[],tagHandlers:Object.create(null),events:[]},r=e.indexOf("\0");for(-1!==r&&Vn.throwAt(e,r,"null byte is not allowed in input",n.filename);n.position<n.length&&(ga(n),ha(n,!0),!(n.position>=n.length));){const e=n.position;Aa(n),n.position===e&&ia(n,"can not read a document")}return n.events}(n,zn(i,r)),{...zn(i,a),source:n})}var za=Symbol("INVALID");function Ra(e){const t=new Set([e.defaultScalarTag,e.defaultSequenceTag,e.defaultMappingTag].filter(e=>void 0!==e)),i=e.implicitScalarTags,n=e.tags.filter(e=>!("scalar"===e.nodeKind&&e.implicit||t.has(e))),r=e.tags.filter(e=>t.has(e));return[...i.map(e=>({tag:e,implicitTag:!0})),...n.map(e=>({tag:e,implicitTag:!1})),...r.map(e=>({tag:e,implicitTag:!0}))]}function Ia(e,t){if(!e.noRefs&&null!==t&&"object"==typeof t){const i=e.refs.get(t);if(i)return void 0===i.anchor&&(i.anchor="ref_"+e.refCounter++),{kind:"alias",anchor:i.anchor}}const i=function(e,t){for(let i=0,n=e.representTypes.length;i<n;i+=1){const{tag:n,implicitTag:r}=e.representTypes[i];if(n.identify(t)){let e;return e=n.matchByTagPrefix?n.representTagName(t):n.tagName,{tag:n,tagName:e,implicitTag:r}}}return null}(e,t);if(!i){if(void 0===t)return za;if(e.skipInvalid)return za;throw new Vn(`unacceptable kind of an object to dump ${Object.prototype.toString.call(t)}`)}const{tag:n,tagName:r,implicitTag:a}=i,o=a?r:_r(r);if("scalar"===n.nodeKind)return{kind:"scalar",tag:o,tagged:!a,style:Jn,value:n.represent(t)};if("sequence"===n.nodeKind){const i=n.represent(t),r={kind:"sequence",tag:o,tagged:!a,style:rr,items:[]};e.noRefs||e.refs.set(t,r);for(let t=0,n=i.length;t<n;t+=1){let n=Ia(e,i[t]);n===za&&void 0===i[t]&&(n=Ia(e,null)),n!==za&&r.items.push(n)}return r}const s=n.represent(t),l={kind:"mapping",tag:o,tagged:!a,style:rr,items:[]};e.noRefs||e.refs.set(t,l);for(const[t,i]of s){const n=Ia(e,t);if(n===za)continue;const r=Ia(e,i);r!==za&&l.items.push({key:n,value:r})}return l}function La(e,t,i={}){const n=Ia({representTypes:Ra(t),noRefs:i.noRefs??!1,skipInvalid:i.skipInvalid??!1,refs:new Map,refCounter:0},e);return[{contents:n===za?null:n,directives:[]}]}var Oa=Symbol("visit:break"),Da=Symbol("visit:skip");function Na(e,t,i){const n=t(e,i);if(n===Oa)return!0;if(n===Da)return!1;const r=i.depth+1;switch(e.kind){case"sequence":for(const i of e.items)if(Na(i,t,{depth:r,parent:e,isKey:!1}))return!0;break;case"mapping":for(const{key:i,value:n}of e.items){if(Na(i,t,{depth:r,parent:e,isKey:!0}))return!0;if(Na(n,t,{depth:r,parent:e,isKey:!1}))return!0}}return!1}function Fa(e,t){for(const i of e)if(i.contents&&Na(i.contents,t,{depth:0,parent:null,isKey:!1}))return}function ja(e,t){return!!(e&1<<t)}var Ba={applyQuoteFlowKeysOption:function(e){if(!e.presenterOptions.quoteFlowKeys)return;if(!e.isKey||!e.flowOnly||e.style!==Jn)return;e.style=tr},doubleQuoteForInvisibles:function(e){e.style===Jn&&/[\t\x7F-\xA0\u2028\u2029\uFEFF\uFFFE\uFFFF]/.test(e.node.value)&&(e.style=tr)},doubleQuoteWhitespaceOnly:function(e){e.style===Jn&&/^\s+$/.test(e.node.value)&&(e.style=tr)},applyForceQuotesOption:function(e){if(!e.presenterOptions.forceQuotes)return;if(e.isKey||e.style!==Jn)return;if(e.node.tag!==e.presenterOptions.schema.defaultScalarTag.tagName)return;e.style=e.node.value.includes("\n")?tr:qa(e)},tryLongOrMultilineAsBlock:function(e){if(e.style!==Jn||e.isKey)return;const t=e.node.value,i=-1!==t.indexOf("\n");if(!ja(e.allowedStylesMask,ir))return void(i&&(e.style=tr));const n=e.presenterOptions.lineWidth;if(-1===n)return void(i&&(e.style=ir));const r=Math.max(Math.min(n,40),n-e.shiftOfContent);let a=0,o=!1;for(;a<=t.length;){let e=t.length;const i=t.indexOf("\n",a);-1!==i&&(e=i);const n=t.slice(a,e);if(n.length>r&&" "!==n[0]&&/ [^ \t]/.test(n)&&(o=!0),-1===i)break;a=i+1}o?e.style=nr:i&&(e.style=ir)},quoteInvalidPlain:function(e){e.style!==Jn||ja(e.allowedStylesMask,Jn)||(e.style=qa(e))},fallbackToDoubleQuoted:function(e){ja(e.allowedStylesMask,e.style)||(e.style=tr)}};function qa(e){return"single"===e.presenterOptions.quoteStyle&&ja(e.allowedStylesMask,er)?er:tr}function Ha(e,t){return e|1<<t}var Ga="[ \\t]",Ua="(?:(?!(?:[\\n\\r]|\\uFEFF))[\\x09\\x0A\\x0D\\x20-\\x7E\\x85\\xA0-\\uD7FF\\uE000-\\uFFFD\\u{10000}-\\u{10FFFF}])",Va=`(?:(?!${Ga})${Ua})`,Wa="[\\x09\\x20-\\uD7FF\\uE000-\\uFFFF\\u{10000}-\\u{10FFFF}]",Ka="[-?:,\\[\\]{}#&*!|>'\"%@`]",Qa=`(?:(?![,\\[\\]{}])${Va})`,Ya=`(?:(?:(?![:#])${Va})|:(?=${Va}))#*`,Xa=`(?:(?:(?![:#])${Qa})|:(?=${Qa}))#*`,Za=`(?:${Ga}*${Ya})*`,Ja=`(?:${Ga}*${Xa})*`,eo=`${`(?:(?:(?!${Ka})${Va})|[?:-](?=${Va}))`}#*${Za}`,to=`${`(?:(?:(?!${Ka})${Va})|[?:-](?=${Qa}))`}#*${Ja}`,io=eo,no=to,ro=`${to}(?:${`\\n+${Xa}${Ja}`})*`,ao=new RegExp(`^(?:${`${eo}(?:${`\\n+${Ya}${Za}`})*`})$`,"u"),oo=new RegExp(`^(?:${ro})$`,"u"),so=new RegExp(`^(?:${io})$`,"u"),lo=new RegExp(`^(?:${no})$`,"u"),co=new RegExp(`^(?:${Wa})*$`,"u"),po=new RegExp(`^(?:${Wa}|\\n)*$`,"u"),uo=new RegExp(`^(?:${Ua}|\\n)*$`,"u"),ho=/^(?:---|\.\.\.)(?=$|[ \t\n\r])/,mo=/^(?:---|\.\.\.)(?=$|[ \t\n\r])/m;function go(e){let t=Ha(0,tr);(function(e){const t=e.node.value;if(""!==t){if(!(e.isKey?e.flowOnly?lo:so:e.flowOnly?oo:ao).test(t))return!1;if(0===e.shiftOfFirstLine&&ho.test(t))return!1;if(0===e.shiftOfContent){const e=t.indexOf("\n");if(-1!==e){const i=t.slice(e+1);if(mo.test(i))return!1}}}const i=e.presenterOptions.schema.resolveImplicitScalarTag(t).tag.tagName;return!(!e.node.tagged&&i!==e.node.tag||!e.node.tagged&&"="===t&&i===e.presenterOptions.schema.defaultScalarTag.tagName)})(e)&&(t=Ha(t,Jn)),function(e){const t=e.node.value;if(!(e.isKey?co:po).test(t))return!1;if(/[ \t]\n|\n[ \t]/.test(t))return!1;if(!e.isKey&&0===e.shiftOfContent){const e=t.indexOf("\n");if(-1!==e&&mo.test(t.slice(e+1)))return!1}return!0}(e)&&(t=Ha(t,er)),function(e){if(e.flowOnly||!uo.test(e.node.value))return!1;const t=e.shiftOfContent-e.shiftOfParent;return!(t<1||t>9&&/^\n* /.test(e.node.value)||0===e.shiftOfContent&&mo.test(e.node.value))}(e)&&(t=Ha(Ha(t,ir),nr)),e.allowedStylesMask=t}function fo(e){switch(e.style){case Jn:return function(e){return bo(e.node.value,e.shiftOfContent)}(e);case er:return function(e){return`'${bo(e.node.value,e.shiftOfContent).replace(/'/g,"''")}'`}(e);case ir:return function(e){const t=e.node.value;return"|"+yo(t,e.shiftOfParent,e.shiftOfContent)+wo(vo(t,e.shiftOfContent))}(e);case nr:return function(e){const t=e.node.value,i=e.presenterOptions.lineWidth;let n=1/0;-1!==i&&(n=Math.max(Math.min(i,40),i-e.shiftOfContent));return">"+yo(t,e.shiftOfParent,e.shiftOfContent)+wo(vo(function(e,t){const i=/(\n+)([^\n]*)/g;let n=e.indexOf("\n");-1===n&&(n=e.length);i.lastIndex=n;let r,a,o=_o(e.slice(0,n),t),s="\n"===e[0]||xo(e[0]);for(;a=i.exec(e);){const e=a[1],i=a[2];r=""!==i&&xo(i[0]),o+=e+(s||r||""===i?"":"\n")+_o(i,t),s=r}return o}(t,n),e.shiftOfContent))}(e);case tr:return function(e){return`"${t=e.node.value,t.replace($o,ko)}"`;var t}(e)}}function bo(e,t){let i=e.indexOf("\n");if(-1===i)return e;const n=" ".repeat(t);let r=e.slice(0,i);const a=/(\n+)([^\n]*)/g;let o;for(a.lastIndex=i;o=a.exec(e);){const e=o[1].length,t=o[2];r+="\n".repeat(e+1)+n+t}return r}function vo(e,t){const i=" ".repeat(t);let n=0,r="";const a=e.length;for(;n<a;){let t;const o=e.indexOf("\n",n);-1===o?(t=e.slice(n),n=a):(t=e.slice(n,o+1),n=o+1),t.length&&"\n"!==t&&(r+=i),r+=t}return r}function yo(e,t,i){const n=function(e){return/^\n* /.test(e)}(e)?String(i-t):"",r="\n"===e[e.length-1];return`${n}${!r||"\n"!==e[e.length-2]&&"\n"!==e?r?"":"-":"+"}\n`}function wo(e){return"\n"===e[e.length-1]?e.slice(0,-1):e}function xo(e){return" "===e||"\t"===e}function _o(e,t){if(""===e||xo(e[0]))return e;const i=/ [^ \t]/g;let n,r,a=0,o=0,s=0,l="";for(;n=i.exec(e);)s=n.index,s-a>t&&(r=o>a?o:s,l+=`\n${e.slice(a,r)}`,a=r+1),o=s;return l+="\n",e.length-a>t&&o>a?l+=`${e.slice(a,o)}\n${e.slice(o+1)}`:l+=e.slice(a),l.slice(1)}var $o=/["\\\x00-\x1F\x7F-\xA0\u2028\u2029\uD800-\uDFFF\uFEFF\uFFFE\uFFFF]/gu;function ko(e){switch(e){case"\0":return"\\0";case"":return"\\a";case"\b":return"\\b";case"\t":return"\\t";case"\n":return"\\n";case"\v":return"\\v";case"\f":return"\\f";case"\r":return"\\r";case"":return"\\e";case'"':return'\\"';case"\\":return"\\\\";case"":return"\\N";case" ":return"\\_";case"\u2028":return"\\L";case"\u2029":return"\\P"}const t=e.charCodeAt(0),i=t.toString(16).toUpperCase();return t<=255?`\\x${"0".repeat(2-i.length)}${i}`:`\\u${"0".repeat(4-i.length)}${i}`}var So={indent:2,seqNoIndent:!1,seqInlineFirst:!0,lineWidth:80,flowBracketPadding:!1,flowSkipCommaSpace:!1,flowSkipColonSpace:!1,quoteFlowKeys:!1,quoteStyle:"single",forceQuotes:!1,scalarStyleRules:Object.keys(Ba).map(e=>Reflect.get(Ba,e)),tagBeforeAnchor:!1};function Co(e,t){return`\n${" ".repeat(e.indent*t)}`}function To(e,t,i,n){let r="";for(let a=0,o=i.items.length;a<o;a+=1){const o=Ao(e,t+1,i.items[a],i,{block:!0,compact:e.seqInlineFirst,isblockseq:!0}).text;n&&""===r||(r+=Co(e,t)),""===o||10===o.charCodeAt(0)?r+="-":r+="- ",r+=o}return r}function Mo(e,t,i){return"alias"===t.kind||(t.tagged||void 0!==t.anchor||e.indent<2&&i>0)}function Ao(e,t,i,n,r){if("alias"===i.kind)return e.openEnded=!1,{text:`*${i.anchor}`,noBody:!1};const{block:a=!1,iskey:o=!1,isblockseq:s=!1}=r;let l=r.compact??!1;const c=void 0!==i.anchor;let d;Mo(e,i,t)&&(l=!1);let p=i.tagged;const u=a&&("mapping"===i.kind||"sequence"===i.kind)&&i.style===rr&&0!==i.items.length;if("mapping"===i.kind)d=u?function(e,t,i,n){let r="";for(let a=0,o=i.items.length;a<o;a+=1){let o="";n&&""===r||(o+=Co(e,t));const{key:s,value:l}=i.items[a],c=("mapping"===s.kind||"sequence"===s.kind)&&s.style===rr&&0!==s.items.length||"scalar"===s.kind&&(s.style===ir||s.style===nr),d=Ao(e,t+1,s,i,c?{block:!0,compact:!0,isblockseq:!Mo(e,s,t+1)}:{block:!0,compact:!0,iskey:!0}),p=d.text,u="scalar"===s.kind&&-1!==s.value.indexOf("\n"),h=p.length>1024&&/^[\s\S]{1025}/u.test(p),m=c||u||h;m&&(p&&10===p.charCodeAt(0)?o+="?":o+="? "),o+=p,m&&(o+=Co(e,t));const g=Ao(e,t+1,l,i,{block:!0,compact:m,isblockseq:m&&!Mo(e,l,t+1)}).text,f="scalar"===s.kind&&d.noBody&&(s.tagged||void 0!==s.anchor),b=m||"alias"!==s.kind&&!f?"":" ";""===g||10===g.charCodeAt(0)?o+=`${b}:`:o+=`${b}: `,o+=g,r+=o}return r}(e,t,i,l):function(e,t,i){let n="";for(const{key:r,value:a}of i.items){let o="";""!==n&&(o+=","+(e.flowSkipCommaSpace?"":" "));const s=Ao(e,t,r,i,{iskey:!0}),l=s.text,c=Ao(e,t,a,i,{}).text,d=e.flowSkipColonSpace||""===c?"":" ",p="scalar"===r.kind&&s.noBody&&(r.tagged||void 0!==r.anchor);o+=`${l}${"alias"===r.kind||p?" ":""}:${d}${c}`,n+=o}const r=e.flowBracketPadding&&""!==n?" ":"";return`{${r}${n}${r}}`}(e,t,i);else if("sequence"===i.kind)d=u?e.seqNoIndent&&!s&&t>0?To(e,t-1,i,l):To(e,t,i,l):function(e,t,i){let n="";for(let r=0,a=i.items.length;r<a;r+=1){const a=Ao(e,t,i.items[r],i,{}).text;r>0&&(n+=","+(e.flowSkipCommaSpace?"":" ")),n+=a}const r=e.flowBracketPadding&&i.items.length>0?" ":"";return`[${r}${n}${r}]`}(e,t,i);else{const r=function(e,t,i,n,r,a){return{node:t,parent:i,level:n,isKey:r,flowOnly:a,shiftOfParent:0===n?-1:e.indent*(n-1),shiftOfContent:e.indent*Math.max(1,n),shiftOfFirstLine:0===n?0:e.indent*n,presenterOptions:e,allowedStylesMask:0,style:t.style}}(e,i,n,t,o,!a);go(r);for(const t of e.scalarStyleRules)t(r);d=fo(r),e.openEnded=(r.style===ir||r.style===nr)&&("\n"===i.value||i.value.endsWith("\n\n")),p=i.tagged||""===d&&r.flowOnly&&"sequence"===n?.kind&&!c||r.style!==Jn&&i.tag!==e.defaultScalarTagName}"mapping"!==i.kind&&"sequence"!==i.kind||u||(e.openEnded=!1),u&&l&&t>0&&e.indent>2&&(d=`${" ".repeat(e.indent-2)}${d}`);const h=""===d;let m=d;if(p||c){const t=[],n=p?function(e){return e.tagged?e.tag:_r(e.tag)}(i):null,r=c?`&${i.anchor}`:null;e.tagBeforeAnchor?(null!==n&&t.push(n),null!==r&&t.push(r)):(null!==r&&t.push(r),null!==n&&t.push(n));const a=""===d||10===d.charCodeAt(0)?"":" ";m=`${t.join(" ")}${a}${d}`}return{text:m,noBody:h}}function Eo(e){return("sequence"===e.kind||"mapping"===e.kind)&&e.style===rr&&0!==e.items.length&&!e.tagged&&void 0===e.anchor}function Po(e){let t="";for(const i of e.directives){if("yaml"===i.kind){t+=`%YAML ${i.version}\n`;continue}const{handle:e,prefix:n}=i;t+=`%TAG ${e} ${n}\n`}return t}function zo(e,t){const i=function(e){const t={...So,...e};return t.flowSkipColonSpace&&(t.quoteFlowKeys=!0),{...t,defaultScalarTagName:t.schema.defaultScalarTag.tagName,openEnded:!1}}(t);let n="",r=!1;for(let t=0;t<e.length;t+=1){const a=e[t];i.openEnded=!1;const o=Po(a),s=""!==o,l=a.explicitStart||s||t>0&&!r;if(n+=o,null===a.contents)l&&(n+="---\n");else if(l){const e=Ao(i,0,a.contents,null,{block:!0,compact:!0}).text;n+=`---${""===e?"":s||Eo(a.contents)?"\n":" "}${e}\n`}else n+=Ao(i,0,a.contents,null,{block:!0,compact:!0}).text+"\n";r=a.explicitEnd||i.openEnded,r&&(n+="...\n")}return n}var Ro={...So,schema:jn,skipInvalid:!1,noRefs:!1,flowLevel:-1,sortKeys:!1,transform:()=>{}};function Io(e,t){const i=String(e),n=String(t);return i<n?-1:i>n?1:0}const Lo=Fn.withTags($n);function Oo(e){try{return function(e,t={}){const i={...Ro,...t},n=La(e,i.schema,{noRefs:i.noRefs,skipInvalid:i.skipInvalid});if(i.flowLevel>=0&&Fa(n,(e,t)=>{if(!(t.depth<i.flowLevel))return"sequence"!==e.kind&&"mapping"!==e.kind||(e.style=ar),Da}),i.sortKeys){const e=!0===i.sortKeys?Io:i.sortKeys;Fa(n,t=>{"mapping"===t.kind&&t.items.sort((t,i)=>e("scalar"===t.key.kind?t.key.value:"","scalar"===i.key.kind?i.key.value:""))})}return i.transform(n),zo(n,{...zn(i,Object.keys(So)),schema:i.schema})}(e,{indent:2,lineWidth:120,noRefs:!0,sortKeys:!1})}catch{return""}}function Do(e){try{return function(e,t){const i=Pa(e,t);if(0===i.length)throw new Vn("expected a document, but the input is empty");if(1===i.length)return i[0];throw new Vn("expected a single document in the stream, but found more")}(e,{schema:Lo})}catch{return null}}const No="magic-card:design-clipboard";function Fo(e){const t=yi(e||{});for(const e of Object.keys(t))("not_synced"===e||e.startsWith("_")||void 0===t[e]||""===t[e])&&delete t[e];return t}function jo(e){const t=Fo(e);try{localStorage.setItem(No,JSON.stringify(t))}catch{}try{navigator.clipboard?.writeText(Oo(t))?.catch(()=>{})}catch{}return t}function Bo(){try{const e=localStorage.getItem(No);if(!e)return;const t=JSON.parse(e);return(e=>!!e&&"object"==typeof e&&!Array.isArray(e))(t)?t:void 0}catch{return}}function qo(e,t,i){const n=Fo(t),r=di(n).map(e=>({...e,id:Gt("anim")}));const a=(e=>(e||[]).map(e=>({...e,id:Gt("rule"),conditions:(e.conditions||[]).map(e=>e.id?{...e,id:Gt("cond")}:e)})))(n.conditional),o="replace"===i?{}:Fo(e),s={...o,...n},l="replace"===i?r:[...di(o),...r];for(const[e,t]of Object.entries(pi(l)))void 0===t?delete s[e]:s[e]=t;const c="replace"===i?a:[...o.conditional||[],...a];return c.length?s.conditional=c:delete s.conditional,s}class Ho{constructor(e){this.fireEvent=e,this.undoRedo=new Ti,this.listeners=new Set,this.state={config:{type:"custom:magic-card",rows:[]},selectedPath:null,activeTab:"general",editorMode:"form",isDirty:!1},this.dispatchConfigChanged=function(e,t){let i=null;const n=function(...n){null!==i&&clearTimeout(i),i=setTimeout(()=>{e.apply(this,n),i=null},t)};return n.cancel=()=>{null!==i&&(clearTimeout(i),i=null)},n}(e=>{this.fireEvent(e)},200)}subscribe(e){return this.listeners.add(e),e(this.state),()=>this.listeners.delete(e)}notify(){this.listeners.forEach(e=>e(this.state))}getState(){return this.state}getConfig(){return this.state.config}getSelectedModule(){const e=this.state.selectedPath;return void 0===e?.rowIndex||void 0===e?.columnIndex||void 0===e?.moduleIndex?null:this.state.config.rows[e.rowIndex]?.columns[e.columnIndex]?.modules[e.moduleIndex]??null}_clampedPath(e,t){return Ai(zi(e,Mi(t)))}setConfig(e){const t=yi(e);this.state={...this.state,config:t,isDirty:!1,selectedPath:this._clampedPath(t,this.state.selectedPath)},this.notify()}updateConfig(e,t=!0){t&&this.undoRedo.push(this.state.config);const i=yi(e);this.state={...this.state,config:i,isDirty:!0,selectedPath:this._clampedPath(i,this.state.selectedPath)},this.notify(),this.dispatchConfigChanged(this.state.config)}setEditorMode(e){this.state={...this.state,editorMode:"yaml"===e?"yaml":"form"},this.notify()}setSelectedPath(e){this.state={...this.state,selectedPath:this._clampedPath(this.state.config,e)},this.notify()}setActiveTab(e){this.state={...this.state,activeTab:e},this.notify()}_equalLayout(e){return Array.from({length:Math.max(e,1)},()=>"1").join("-")}addRow(e="1"){const t=yi(this.state.config),i=e.split("-").length,n=Array.from({length:i},()=>({id:Gt("col"),modules:[]}));t.rows.push({id:Gt("row"),layout:e,columns:n}),this.updateConfig(t)}deleteRow(e){const t=yi(this.state.config);t.rows.splice(e,1),this.updateConfig(t)}moveRow(e,t){if(e===t)return;const i=yi(this.state.config),[n]=i.rows.splice(e,1);i.rows.splice(t,0,n),this.updateConfig(i)}updateRow(e,t){const i=yi(this.state.config);i.rows[e]={...i.rows[e],...t},this.updateConfig(i)}setRowLayout(e,t){const i=yi(this.state.config),n=i.rows[e];if(!n)return;const r=Math.max(t.split("-").length,1);for(;n.columns.length<r;)n.columns.push({id:Gt("col"),modules:[]});for(;n.columns.length>r;){const e=n.columns.pop(),t=n.columns[n.columns.length-1];t.modules=[...t.modules||[],...e.modules||[]]}n.layout=t,this.updateConfig(i)}addColumn(e){const t=yi(this.state.config),i=t.rows[e];i.columns.push({id:Gt("col"),modules:[]}),i.layout=this._equalLayout(i.columns.length),this.updateConfig(t)}deleteColumn(e,t){const i=yi(this.state.config),n=i.rows[e];n.columns.splice(t,1),0===n.columns.length?i.rows.splice(e,1):n.layout=this._equalLayout(n.columns.length),this.updateConfig(i)}updateColumn(e,t,i){const n=yi(this.state.config);n.rows[e].columns[t]={...n.rows[e].columns[t],...i},this.updateConfig(n)}_designItem(e,t){const i=e.rows[t.row],n=void 0!==t.col?i?.columns[t.col]:void 0;return void 0!==t.module?n?.modules[t.module]:void 0!==t.col?n:i}copyDesign(e){jo(this._designItem(this.state.config,e)?.design)}pasteDesign(e,t){const i=Bo();if(!i)return!1;const n=yi(this.state.config),r=this._designItem(n,e);if(!r)return!1;const a=r.design||{},o=qo(r.design,i,t);if(r.design=o,n.template){const t=new Set(r.not_synced||[]);if(void 0===e.module)t.add("design");else for(const e of new Set([...Object.keys(a),...Object.keys(o)]))JSON.stringify(a[e])!==JSON.stringify(o[e])&&t.add(`design.${e}`);r.not_synced=[...t]}return this.updateConfig(n),!0}addModule(e,t,i){const n=yi(this.state.config),r=dt.createDefault(i);if(!r)return;n.rows[e].columns[t].modules.push(r);const a=n.rows[e].columns[t].modules.length-1;this.updateConfig(n),this.setSelectedPath({rowIndex:e,columnIndex:t,moduleIndex:a})}deleteModule(e,t,i){const n=yi(this.state.config);n.rows[e].columns[t].modules.splice(i,1);const r=this.state.selectedPath;r?.rowIndex===e&&r.columnIndex===t&&void 0!==r.moduleIndex&&r.moduleIndex>i&&(this.state={...this.state,selectedPath:{...r,moduleIndex:r.moduleIndex-1}}),this.updateConfig(n)}updateModule(e,t,i,n){const r=yi(this.state.config),a=r.rows[e].columns[t].modules[i];r.rows[e].columns[t].modules[i]={...a,...n},this.updateConfig(r)}moveModule(e,t,i,n,r,a){const o=yi(this.state.config),[s]=o.rows[e].columns[t].modules.splice(i,1);o.rows[n].columns[r].modules.splice(a,0,s),this.updateConfig(o)}duplicateModule(e,t,i){const n=yi(this.state.config),r=n.rows[e].columns[t].modules,a=yi(r[i]);a.id=Gt(a.type),r.splice(i+1,0,a),this.state={...this.state,selectedPath:{rowIndex:e,columnIndex:t,moduleIndex:i+1}},this.updateConfig(n)}duplicateRow(e){const t=yi(this.state.config),i=yi(t.rows[e]);i.id=Gt("row");for(const e of i.columns){e.id=Gt("col");for(const t of e.modules)t.id=Gt(t.type)}t.rows.splice(e+1,0,i),this.state={...this.state,selectedPath:{rowIndex:e+1}},this.updateConfig(t)}moveModuleBy(e,t,i,n){const r=this.state.config.rows[e]?.columns[t]?.modules,a=i+n;return!(!r||a<0||a>=r.length)&&(this.state={...this.state,selectedPath:{rowIndex:e,columnIndex:t,moduleIndex:a}},this.moveModule(e,t,i,e,t,a),!0)}undo(){const e=this.undoRedo.undo(this.state.config);e&&(this.state={...this.state,config:e,isDirty:!0,selectedPath:this._clampedPath(e,this.state.selectedPath)},this.notify(),this.dispatchConfigChanged(e))}redo(){const e=this.undoRedo.redo(this.state.config);e&&(this.state={...this.state,config:e,isDirty:!0,selectedPath:this._clampedPath(e,this.state.selectedPath)},this.notify(),this.dispatchConfigChanged(e))}canUndo(){return this.undoRedo.canUndo()}canRedo(){return this.undoRedo.canRedo()}destroy(){this.dispatchConfigChanged.cancel(),this.listeners.clear(),this.undoRedo.clear()}}function Go(e){const t=[];e.not_synced?.length&&t.push({location:"Card",paths:[...e.not_synced]});for(let i=0;i<(e.rows||[]).length;i++){const n=e.rows[i];n.not_synced?.length&&t.push({location:`Row ${i+1}`,paths:[...n.not_synced]});for(let e=0;e<(n.columns||[]).length;e++){const r=n.columns[e];r.not_synced?.length&&t.push({location:`Row ${i+1} / Col ${e+1}`,paths:[...r.not_synced]});for(let e=0;e<(r.modules||[]).length;e++){const i=r.modules[e];if(i.not_synced?.length){const e=i.label||i.type;t.push({location:`${e}`,paths:[...i.not_synced]})}}}}return t}function Uo(e,t,i){const n=new Set(e||[]);return i?n.add(t):n.delete(t),Array.from(n)}function Vo(e){return Array.from({length:Math.max(e,1)},()=>1)}function Wo(e,t){if(/^\d+(?:-\d+)*$/.test(e)){const i=e.split("-").map(e=>Math.max(Number(e)||1,1));if(i.length===t)return i}return Vo(t)}var Ko=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};let Qo=class extends _e{constructor(){super(...arguments),this.variant="pane",this._collapsed=new Set,this._focusKey=null,this._menu=null,this._drop=null,this._pendingFocus=null,this._drag=null,this._ignoreClickUntil=0,this._lastSelKey="",this._onOutsidePointer=e=>{const t=this.shadowRoot?.querySelector(".menu"),i=e.composedPath();t&&i.includes(t)||this._menu&&i.includes(this._menu.trigger)||this._closeMenu(!1)},this._onViewportChange=e=>{const t=this.shadowRoot?.querySelector(".menu");t&&e.composedPath().includes(t)||this._closeMenu(!1)}}connectedCallback(){super.connectedCallback(),this.stateManager&&!this._unsubscribe&&this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe?.(),this._unsubscribe=void 0,this._subscribedTo=void 0,this._closeMenu(!1)}willUpdate(e){e.has("stateManager")&&this.stateManager!==this._subscribedTo&&this._subscribe()}updated(){if(this._pendingFocus){const e=this._pendingFocus;this._pendingFocus=null;const t=this._item(e)||this._item(this._selectedKey)||this._item("card");t&&(this._focusKey=t.dataset.key||null,t.focus())}}_subscribe(){this._unsubscribe?.(),this._subscribedTo=this.stateManager,this.stateManager?this._unsubscribe=this.stateManager.subscribe(e=>{this._state=e;const t=Ei(Mi(e.selectedPath));t!==this._lastSelKey&&(this._lastSelKey=t,this._revealSelection(t))}):this._unsubscribe=void 0}_revealSelection(e){const t=Pi(e);if("module"===t.kind||"column"===t.kind){const e=this._rowId(t.row);if(e&&this._collapsed.has(e)){const t=new Set(this._collapsed);t.delete(e),this._collapsed=t}}this.updateComplete.then(()=>{const t=this._item(e);this.isConnected&&t&&"function"==typeof t.scrollIntoView&&t.scrollIntoView({block:"nearest"})})}get _rows(){return this._state?.config.rows||[]}get _selectedKey(){return Ei(Mi(this._state?.selectedPath??null))}_rowId(e){const t=this._rows[e];return t?t.id||`#${e}`:void 0}_isOpen(e){return!this._collapsed.has(this._rowId(e)||"")}_item(e){return this.shadowRoot?.querySelector(`[role="treeitem"][data-key="${e}"]`)||null}_visibleItems(){return Array.from(this.shadowRoot?.querySelectorAll('[role="treeitem"]')||[])}_select(e){this._focusKey=Ei(e),this.stateManager?.setSelectedPath(Ai(e))}_setCollapsed(e,t){const i=this._rowId(e);if(!i||this._collapsed.has(i)===t)return;const n=new Set(this._collapsed);t?n.add(i):n.delete(i),this._collapsed=n}_fire(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,detail:t}))}_addModule(e,t){this._fire("add-module",{rowIndex:e,colIndex:t})}_requestAddRow(){this._fire("request-add-row")}_moveRow(e,t){const i=this.stateManager;if(!i||e===t||t<0||t>=this._rows.length)return;const n=i.getState().selectedPath;if(i.moveRow(e,t),n&&void 0!==n.rowIndex){const r=function(e,t,i){return e===t?i:t<e&&e<=i?e-1:i<=e&&e<t?e+1:e}(n.rowIndex,e,t);r!==n.rowIndex&&i.setSelectedPath({...n,rowIndex:r})}}_onItemClick(e){if(Date.now()<this._ignoreClickUntil)return;const t=e.currentTarget.dataset.key;t&&this._select(Pi(t))}_onKeydown(e){const t=e.composedPath()[0];if((i=t)instanceof Element&&(i.matches('input, textarea, select, [contenteditable]:not([contenteditable="false"])')||!0===i.isContentEditable))return;var i;if(this._menu)return void this._onMenuKeydown(e);const n=t instanceof Element?t.closest('[role="treeitem"]'):null;if(!n||n!==t)return;const r=Pi(n.dataset.key||"card"),a=this.stateManager;if(!a)return;const o=()=>{e.preventDefault(),e.stopPropagation()};if(e.altKey&&("ArrowUp"===e.key||"ArrowDown"===e.key)){const t="ArrowUp"===e.key?-1:1;if("module"===r.kind)o(),a.moveModuleBy(r.row,r.col,r.module,t)&&(this._pendingFocus=Ei({...r,module:r.module+t}),this.requestUpdate());else if("row"===r.kind){o();const e=r.row+t;e>=0&&e<this._rows.length&&(this._moveRow(r.row,e),this._pendingFocus=Ei({kind:"row",row:e}),this.requestUpdate())}return}switch(e.key){case"ArrowDown":case"ArrowUp":case"Home":case"End":{o();const t=this._visibleItems(),i=t.indexOf(n),r="ArrowDown"===e.key?Math.min(t.length-1,i+1):"ArrowUp"===e.key?Math.max(0,i-1):"Home"===e.key?0:t.length-1;return void this._focusItem(t[r])}case"ArrowRight":return void("row"===r.kind&&(o(),this._isOpen(r.row)?this._focusItem(this._item(Ei({kind:"column",row:r.row,col:0}))):this._setCollapsed(r.row,!1)));case"ArrowLeft":return void("row"===r.kind?(o(),this._setCollapsed(r.row,!0)):"column"!==r.kind&&"module"!==r.kind||(o(),this._focusItem(this._item(Ei("module"===r.kind?{kind:"column",row:r.row,col:r.col}:{kind:"row",row:r.row})))));case"Enter":case" ":return o(),void this._select(r);case"Delete":case"Backspace":if("module"===r.kind){o(),a.deleteModule(r.row,r.col,r.module);const e=this._rows[r.row]?.columns[r.col]?.modules?.length??0;this._pendingFocus=Ei(e?{...r,module:Math.min(r.module,e-1)}:{kind:"column",row:r.row,col:r.col}),this.requestUpdate()}return;case"ContextMenu":case"F10":if(("ContextMenu"===e.key||e.shiftKey)&&("row"===r.kind||"column"===r.kind)){const e=n.parentElement?.querySelector(".more");e&&(o(),this._openMenu(r.kind,r.row,"column"===r.kind?r.col:void 0,e))}return;default:return}}_focusItem(e){e&&(this._focusKey=e.dataset.key||null,e.focus())}_openMenu(e,t,i,n){if(this._menu&&this._menu.trigger===n)return void this._closeMenu(!0);const r=n.getBoundingClientRect(),a=window.innerHeight||0,o="row"===e?366:242,s=Math.max(8,(window.innerWidth||0)-r.right),l=a&&r.bottom+4+o>a&&r.top-4-o>0?`bottom:${a-r.top+4}px`:`top:${r.bottom+4}px`;this._menu={kind:e,row:t,col:i,trigger:n,style:`${l};right:${s}px`},document.addEventListener("pointerdown",this._onOutsidePointer,!0),window.addEventListener("resize",this._onViewportChange),window.addEventListener("scroll",this._onViewportChange,!0),window.addEventListener("wheel",this._onViewportChange,{capture:!0,passive:!0}),this.renderRoot.addEventListener("scroll",this._onViewportChange,!0),this.renderRoot.addEventListener("wheel",this._onViewportChange,{capture:!0,passive:!0}),this.updateComplete.then(()=>{this.shadowRoot?.querySelector('.menu [role="menuitem"]:not([disabled])')?.focus()})}_closeMenu(e){const t=this._menu;document.removeEventListener("pointerdown",this._onOutsidePointer,!0),window.removeEventListener("resize",this._onViewportChange),window.removeEventListener("scroll",this._onViewportChange,!0),window.removeEventListener("wheel",this._onViewportChange,!0),this.renderRoot?.removeEventListener("scroll",this._onViewportChange,!0),this.renderRoot?.removeEventListener("wheel",this._onViewportChange,!0),t&&(this._menu=null,e&&t.trigger.isConnected&&t.trigger.focus())}_onMenuKeydown(e){if("Escape"===e.key)return e.preventDefault(),e.stopPropagation(),void this._closeMenu(!0);if("Tab"===e.key)return void this._closeMenu(!1);if(!["ArrowDown","ArrowUp","Home","End"].includes(e.key))return;const t=Array.from(this.shadowRoot?.querySelectorAll('.menu [role="menuitem"]:not([disabled])')||[]);if(!t.length)return;e.preventDefault(),e.stopPropagation();const i=t.indexOf(this.shadowRoot?.activeElement);let n=0;"ArrowDown"===e.key?n=i<0?0:(i+1)%t.length:"ArrowUp"===e.key?n=i<0?t.length-1:(i-1+t.length)%t.length:"End"===e.key&&(n=t.length-1),t[n].focus()}_menuAction(e){this._closeMenu(!0),e()}_onRowDragStart(e,t){this._closeMenu(!1),this._drag={type:"row",row:t},e.dataTransfer&&(e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",JSON.stringify(this._drag))),e.currentTarget.closest("li")?.classList.add("dragging"),e.stopPropagation()}_onModuleDragStart(e,t,i,n){this._closeMenu(!1),this._drag={type:"module",row:t,col:i,module:n},e.dataTransfer&&(e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",JSON.stringify(this._drag))),e.currentTarget.closest("li")?.classList.add("dragging"),e.stopPropagation()}_onDragEnd(e){e.currentTarget.closest("li")?.classList.remove("dragging"),this._drag=null,this._drop=null,this._ignoreClickUntil=Date.now()+250}_isLowerHalf(e,t){const i=t.getBoundingClientRect();return e.clientY>i.top+i.height/2}_setDrop(e){const t=this._drop;t&&e&&t.type===e.type&&t.index===e.index&&("row"===t.type||"module"===e.type&&t.row===e.row&&t.col===e.col)||!t&&!e||(this._drop=e)}_onRowDragOver(e,t){"row"===this._drag?.type&&(e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect="move"),this._setDrop({type:"row",index:this._isLowerHalf(e,e.currentTarget)?t+1:t}))}_onRowDrop(e){e.preventDefault();const t=this._drag,i=this._drop;if(this._drag=null,this._drop=null,"row"!==t?.type||"row"!==i?.type)return;const n=i.index>t.row?i.index-1:i.index;this._moveRow(t.row,n)}_onModuleDragOver(e,t,i,n){if("module"!==this._drag?.type)return;e.preventDefault(),e.stopPropagation(),e.dataTransfer&&(e.dataTransfer.dropEffect="move");const r=this._isLowerHalf(e,e.currentTarget)?n+1:n;this._setDrop({type:"module",row:t,col:i,index:r})}_onSlotDragOver(e,t,i,n){"module"===this._drag?.type&&(e.preventDefault(),e.stopPropagation(),e.dataTransfer&&(e.dataTransfer.dropEffect="move"),this._setDrop({type:"module",row:t,col:i,index:n}))}_dropModule(e){if("module"!==this._drag?.type)return;e.preventDefault(),e.stopPropagation();const t=this._drag,i=this._drop;if(this._drag=null,this._drop=null,this._ignoreClickUntil=Date.now()+300,"module"!==t?.type||"module"!==i?.type||!this.stateManager)return;let n=i.index;t.row===i.row&&t.col===i.col&&t.module<n&&(n-=1),t.row===i.row&&t.col===i.col&&t.module===n||(this.stateManager.moveModule(t.row,t.col,t.module,i.row,i.col,n),this.stateManager.setSelectedPath({rowIndex:i.row,columnIndex:i.col,moduleIndex:n}))}_onTreeDragLeave(e){const t=e.relatedTarget;t&&e.currentTarget.contains(t)||(this._drop=null)}_itemAttrs(e,t,i){return{current:e===t,tab:e===i?0:-1}}render(){const e=this._rows,t=this._selectedKey,i=this._resolveFocusKey(t),n=this._state?.config.name?.trim()||"Card",r=this._itemAttrs("card",t,i);return ne`
      <div class="outline-root" @keydown=${this._onKeydown}>
        <ul
          class="tree"
          role="tree"
          aria-label="Card structure"
          @dragleave=${this._onTreeDragLeave}
        >
          <li role="none">
            <div class="line">
              <div
                class="item card-item k-card"
                role="treeitem"
                aria-level="1"
                data-key="card"
                tabindex=${r.tab}
                aria-selected=${r.current?"true":"false"}
                aria-current=${r.current?"true":ae}
                @click=${this._onItemClick}
              >
                <ha-icon icon="mdi:card-outline"></ha-icon>
                <span class="text"><span class="name">${n}</span></span>
              </div>
            </div>
          </li>
          ${e.map((e,n)=>this._renderRow(e,n,t,i))}
        </ul>
        ${e.length?ne`
              <div class="foot">
                <button type="button" class="btn btn-secondary btn-sm" @click=${this._requestAddRow}>
                  <ha-icon icon="mdi:plus"></ha-icon>Add row
                </button>
              </div>
            `:ne`
              <div class="empty card-empty">
                <ha-icon icon="mdi:view-sequential-outline"></ha-icon>
                <strong>No rows yet</strong>
                <p>Rows hold columns, columns hold modules.</p>
                <button type="button" class="btn btn-text btn-sm" @click=${this._requestAddRow}>
                  <ha-icon icon="mdi:plus"></ha-icon>Add row
                </button>
              </div>
            `}
        ${this._renderMenu()}
      </div>
    `}_resolveFocusKey(e){if(this._focusKey&&this._keyRendered(this._focusKey))return this._focusKey;if(this._keyRendered(e))return e;const t=Pi(e);return"card"!==t.kind&&this._keyRendered(`r${t.row}`)?`r${t.row}`:"card"}_keyRendered(e){const t=Pi(e);if("card"===t.kind)return!0;const i=this._rows[t.row];if(!i)return!1;if("row"===t.kind)return!0;if(!this._isOpen(t.row))return!1;const n=i.columns[t.col];return!!n&&("column"===t.kind||t.module<(n.modules?.length??0))}_renderGlyph(e){const t=Wo(e.layout||"1",e.columns.length);return ne`
      <span class="layout-glyph" aria-hidden="true" style="grid-template-columns:${t.map(e=>`${e}fr`).join(" ")}">
        ${t.map(()=>ne`<i></i>`)}
      </span>
    `}_renderRow(e,t,i,n){const r=Ei({kind:"row",row:t}),a=this._itemAttrs(r,i,n),o=this._isOpen(t),s=this._drop,l="row"===s?.type&&s.index===t,c="row"===s?.type&&t===this._rows.length-1&&s.index===t+1,d="row"===this._menu?.kind&&this._menu.row===t;return ne`
      <li
        role="none"
        class="row ${l?"drop-before":""} ${c?"drop-after":""}"
        @dragover=${e=>this._onRowDragOver(e,t)}
        @drop=${this._onRowDrop}
      >
        <div class="line">
          <button
            type="button"
            class="caret"
            tabindex="-1"
            aria-expanded=${o?"true":"false"}
            aria-label="${o?"Collapse":"Expand"} row ${t+1}"
            @click=${()=>this._setCollapsed(t,o)}
          >
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </button>
          <div
            class="item row-item k-row"
            role="treeitem"
            aria-level="2"
            data-key=${r}
            tabindex=${a.tab}
            aria-expanded=${o?"true":"false"}
            aria-selected=${a.current?"true":"false"}
            aria-current=${a.current?"true":ae}
            draggable="true"
            @dragstart=${e=>this._onRowDragStart(e,t)}
            @dragend=${this._onDragEnd}
            @click=${this._onItemClick}
          >
            ${"pane"===this.variant?ne`${this._renderGlyph(e)}<span class="text"><span class="name">Row ${t+1} · ${e.layout||"1"}</span></span>`:ne`<span class="text"><span class="name">Row ${t+1}</span></span>${this._renderGlyph(e)}`}
          </div>
          <button
            type="button"
            class="icon-btn sm more"
            aria-label="Row ${t+1} actions"
            aria-haspopup="menu"
            aria-expanded=${d?"true":"false"}
            @click=${e=>this._openMenu("row",t,void 0,e.currentTarget)}
          >
            <ha-icon icon="mdi:dots-vertical"></ha-icon>
          </button>
        </div>
        ${o?ne`<ul role="group">${e.columns.map((e,r)=>this._renderColumn(t,r,e.modules??[],i,n))}</ul>`:ae}
      </li>
    `}_renderColumn(e,t,i,n,r){const a=Ei({kind:"column",row:e,col:t}),o=this._itemAttrs(a,n,r),s=i.length,l=this._drop,c="module"===l?.type&&l.row===e&&l.col===t?l.index:-1,d="column"===this._menu?.kind&&this._menu.row===e&&this._menu.col===t;return ne`
      <li role="none" class="col">
        <div class="line" @dragover=${i=>this._onSlotDragOver(i,e,t,0)} @drop=${this._dropModule}>
          <div
            class="item col-item k-column"
            role="treeitem"
            aria-level="3"
            data-key=${a}
            tabindex=${o.tab}
            aria-selected=${o.current?"true":"false"}
            aria-current=${o.current?"true":ae}
            @click=${this._onItemClick}
          >
            <span class="text"><span class="name">Column ${t+1}</span></span>
            <span class="chip is-count">${s}<span class="sr-only"> module${1===s?"":"s"}</span></span>
          </div>
          <button
            type="button"
            class="icon-btn sm more"
            aria-label="Row ${e+1} column ${t+1} actions"
            aria-haspopup="menu"
            aria-expanded=${d?"true":"false"}
            @click=${i=>this._openMenu("column",e,t,i.currentTarget)}
          >
            <ha-icon icon="mdi:dots-vertical"></ha-icon>
          </button>
        </div>
        ${s?ne`<ul role="group">${i.map((i,a)=>this._renderModule(i,e,t,a,s,c,n,r))}</ul>`:ne`
              <div
                class="empty col-empty ${0===c?"drop-into":""}"
                data-empty=${a}
                @dragover=${i=>this._onSlotDragOver(i,e,t,0)}
                @drop=${this._dropModule}
              >
                <p>Empty column</p>
                <button type="button" class="btn btn-text btn-sm" @click=${()=>this._addModule(e,t)}>
                  <ha-icon icon="mdi:plus"></ha-icon>Add module
                </button>
              </div>
            `}
      </li>
    `}_renderModule(e,t,i,n,r,a,o,s){const l=Ei({kind:"module",row:t,col:i,module:n}),c=this._itemAttrs(l,o,s),d=dt.get(e.type)?.metadata.icon||"mdi:puzzle-outline",p=Oi(e),u="string"==typeof e.entity&&Ni.test(e.entity)?e.entity:void 0,h=!!e.not_synced?.length;return ne`
      <li
        role="none"
        class="mod ${a===n?"drop-before":""} ${n===r-1&&a===r?"drop-after":""}"
        @dragover=${e=>this._onModuleDragOver(e,t,i,n)}
        @drop=${this._dropModule}
      >
        <div
          class="item mod-item k-module"
          role="treeitem"
          aria-level="4"
          data-key=${l}
          tabindex=${c.tab}
          aria-selected=${c.current?"true":"false"}
          aria-current=${c.current?"true":ae}
          draggable="true"
          @dragstart=${e=>this._onModuleDragStart(e,t,i,n)}
          @dragend=${this._onDragEnd}
          @click=${this._onItemClick}
        >
          <ha-icon icon=${d}></ha-icon>
          <span class="text">
            <span class="name">${Ii(e)}${p?` · ${p}`:""}</span>
            ${u?ne`<span class="sub is-entity">${Fi(u)}</span>`:ae}
          </span>
          ${h?ne`<span class="ovr-dot" title="Has local overrides"></span><span class="sr-only">Has local overrides</span>`:ae}
        </div>
      </li>
    `}_renderMenu(){const e=this._menu,t=this.stateManager;if(!e||!t)return ae;const i=this._rows,n=i[e.row];if(!n)return ae;const r=(e,t,i,n={})=>ne`
      <button
        type="button"
        role="menuitem"
        class=${n.danger?"danger":""}
        ?disabled=${n.disabled}
        @click=${()=>this._menuAction(i)}
      >
        <ha-icon icon=${e}></ha-icon>${t}
      </button>
    `,a=e.row,o="row"===e.kind?{row:a}:{row:a,col:e.col},s=!Bo(),l=ne`
      <hr />
      ${r("mdi:content-copy","Copy design",()=>t.copyDesign(o))}
      ${r("mdi:content-paste","Paste design",()=>t.pasteDesign(o,"replace"),{disabled:s})}
      ${r("mdi:set-merge","Merge pasted design",()=>t.pasteDesign(o,"merge"),{disabled:s})}
    `,c="row"===e.kind?ne`
          ${r("mdi:table-column-plus-after","Add column",()=>t.addColumn(a))}
          ${r("mdi:content-duplicate","Duplicate row",()=>t.duplicateRow(a))}
          ${l}
          <hr />
          ${r("mdi:arrow-up","Move up",()=>this._moveRow(a,a-1),{disabled:0===a})}
          ${r("mdi:arrow-down","Move down",()=>this._moveRow(a,a+1),{disabled:a>=i.length-1})}
          <hr />
          ${r("mdi:delete-outline","Delete row",()=>{t.deleteRow(a),this._pendingFocus=a>0?Ei({kind:"row",row:a-1}):"card"},{danger:!0})}
        `:ne`
          ${r("mdi:plus","Add module",()=>this._addModule(a,e.col))}
          ${l}
          <hr />
          ${r("mdi:delete-outline","Delete column",()=>t.deleteColumn(a,e.col),{danger:!0,disabled:n.columns.length<=1})}
        `,d="row"===e.kind?`Row ${a+1} actions`:`Row ${a+1} column ${(e.col??0)+1} actions`;return ne`<div class="menu" role="menu" aria-label=${d} style=${e.style}>${c}</div>`}};Qo.styles=[Re,v`
      :host {
        display: block;
        container: mc-outline / inline-size;
        --o-item-h: 36px;
        --o-mod-h: 36px;
        --o-icon: 18px;
        --o-gap: 8px;
        --o-font: 0.8125rem;
      }
      :host([variant='pane']) {
        --o-item-h: 40px;
        --o-mod-h: 48px;
        --o-icon: 20px;
        --o-gap: 12px;
        --o-font: 0.875rem;
      }

      .tree,
      .tree ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      .tree ul {
        padding-left: 12px;
        margin-left: 12px;
        border-left: 1px solid var(--mc-divider);
      }
      .line {
        display: flex;
        align-items: center;
        gap: 2px;
        min-width: 0;
      }

      .item {
        flex: 1;
        min-width: 0;
        display: flex;
        align-items: center;
        gap: var(--o-gap);
        min-height: var(--o-item-h);
        padding: 6px 8px;
        border: 1px solid transparent;
        border-radius: var(--mc-radius);
        font-size: var(--o-font);
        color: var(--mc-text);
        cursor: pointer;
        user-select: none;
        transition: background-color 0.15s ease-out, border-color 0.15s ease-out;
      }
      .item:hover {
        background: var(--mc-surface-2);
      }
      .item:focus-visible {
        outline-offset: -2px;
      }
      /* Selected item: 12% wash + ink of its level (.k-card / .k-row / .k-column / .k-module). */
      .item[aria-current='true'] {
        background: var(--k-tint);
        color: var(--k-ink);
      }
      :host([variant='pane']) .item[aria-current='true'] {
        border-color: color-mix(in srgb, var(--k) 45%, transparent);
      }
      .item > ha-icon {
        --mdc-icon-size: var(--o-icon);
        color: var(--mc-text-2);
        flex: none;
      }
      .item[aria-current='true'] > ha-icon {
        color: var(--k-ink);
      }
      .text {
        flex: 1;
        min-width: 0;
        display: grid;
      }
      .name {
        font-weight: 500;
        overflow-wrap: anywhere;
      }
      .sub {
        font-size: 0.75rem;
        color: var(--mc-text-2);
        overflow-wrap: anywhere;
        line-height: 1.35;
      }
      .sub.is-entity {
        font-family: var(--mc-mono);
      }
      .mod-item {
        min-height: var(--o-mod-h);
      }
      :host([variant='pane']) .mod-item {
        padding: 6px 12px;
      }
      .card-item {
        margin-left: 26px;
      }
      .col-item {
        min-height: 32px;
        padding: 4px 8px;
      }
      .col-item .name {
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--mc-text-2);
      }
      .col-item[aria-current='true'] .name {
        color: var(--k-ink);
      }
      .ovr-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--warning-color, #ff9800);
        flex: none;
      }

      .caret {
        width: 24px;
        height: 24px;
        border: 0;
        padding: 0;
        border-radius: 6px;
        background: transparent;
        display: grid;
        place-items: center;
        color: var(--mc-text-2);
        flex: none;
      }
      .caret:hover {
        background: var(--mc-surface-2);
      }
      .caret ha-icon {
        --mdc-icon-size: 18px;
        transition: transform 0.15s ease-out;
      }
      .caret[aria-expanded='false'] ha-icon {
        transform: rotate(-90deg);
      }
      .layout-glyph {
        display: inline-grid;
        gap: 2px;
        width: 28px;
        height: 14px;
        flex: none;
      }
      .layout-glyph i {
        display: block;
        border-radius: 2px;
        background: currentColor;
        opacity: 0.45;
      }
      .more[aria-expanded='true'] {
        background: var(--mc-surface-2);
        color: var(--mc-text);
      }

      .col-empty {
        gap: 4px;
        padding: 8px 12px;
        margin: 2px 0 4px;
        border-radius: var(--mc-radius);
      }
      .col-empty p {
        font-size: 0.75rem;
      }

      /* drop indicator: 2px accent insertion line */
      .row,
      .mod {
        position: relative;
      }
      .drop-before::before,
      .drop-after::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        height: 2px;
        border-radius: 1px;
        background: var(--mc-accent);
        pointer-events: none;
        z-index: 1;
      }
      .drop-before::before {
        top: -1px;
      }
      .drop-after::after {
        bottom: -1px;
      }
      .col-empty.drop-into {
        border-color: var(--mc-accent);
        background: var(--mc-accent-tint);
      }
      .dragging {
        opacity: 0.5;
      }

      .foot {
        padding: 12px 0 4px;
      }
      .foot .btn {
        width: 100%;
      }
      .card-empty {
        margin-top: 8px;
      }

      .menu {
        position: fixed;
        min-width: 200px;
      }
      .menu button {
        width: 100%;
        font-size: 0.875rem;
        color: var(--mc-text);
      }
      .menu button:disabled {
        opacity: 0.45;
        cursor: not-allowed;
        background: transparent;
      }
      .menu button.danger,
      .menu button.danger ha-icon {
        color: var(--mc-error-ink);
      }

      /* Narrow pane (phone dialog): reclaim indentation so entity ids keep their width. */
      @container mc-outline (max-width: 419px) {
        .row > ul {
          padding-left: 0;
          margin-left: 26px;
          border-left: 0;
        }
        .col > ul {
          padding-left: 6px;
          margin-left: 6px;
        }
        :host([variant='pane']) .mod-item {
          padding: 6px 8px;
          gap: 8px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .item,
        .caret ha-icon {
          transition: none;
        }
      }
    `],Ko([Te({attribute:!1})],Qo.prototype,"stateManager",void 0),Ko([Te({reflect:!0})],Qo.prototype,"variant",void 0),Ko([Me()],Qo.prototype,"_state",void 0),Ko([Me()],Qo.prototype,"_collapsed",void 0),Ko([Me()],Qo.prototype,"_focusKey",void 0),Ko([Me()],Qo.prototype,"_menu",void 0),Ko([Me()],Qo.prototype,"_drop",void 0),Qo=Ko([ke("mc-structure-outline")],Qo);var Yo=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};let Xo=class extends _e{constructor(){super(...arguments),this.compact=!1,this._menuOpen=!1,this._onOutside=e=>{e.composedPath().includes(this)||this._closeMenu(!1)},this._onMenuKeydown=e=>{if("Escape"===e.key)return e.preventDefault(),e.stopPropagation(),void this._closeMenu(!0);if("ArrowDown"!==e.key&&"ArrowUp"!==e.key&&"Home"!==e.key&&"End"!==e.key)return;e.preventDefault();const t=this._items();if(!t.length)return;const i=t.indexOf(this.shadowRoot?.activeElement);let n=0;"ArrowDown"===e.key?n=(i+1)%t.length:"ArrowUp"===e.key?n=(i-1+t.length)%t.length:"End"===e.key&&(n=t.length-1),t[n].focus()},this._toggleMenu=()=>{this._menuOpen?this._closeMenu(!1):this._openMenu()}}disconnectedCallback(){super.disconnectedCallback(),this._listen(!1)}_fire(e){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0}))}_listen(e){e?window.addEventListener("pointerdown",this._onOutside,!0):window.removeEventListener("pointerdown",this._onOutside,!0)}async _openMenu(){this._menuOpen=!0,this._listen(!0),await this.updateComplete,this._items()[0]?.focus()}_closeMenu(e){this._menuOpen&&(this._menuOpen=!1,this._listen(!1),e&&this.updateComplete.then(()=>this.shadowRoot?.querySelector(".manage")?.focus()))}_items(){return Array.from(this.shadowRoot?.querySelectorAll('.menu [role="menuitem"]:not([disabled])')||[])}_act(e){this._closeMenu(!0),this._fire(e)}render(){const e=this.config?.template;if(!e)return ne`
        <div class="tpl-bar">
          <div class="tpl-text">
            ${this.compact?ae:ne`<span class="tpl-label">Not linked to a template</span>`}
            <button
              type="button"
              class="chip manage"
              aria-haspopup="menu"
              aria-expanded=${this._menuOpen?"true":"false"}
              @click=${this._toggleMenu}
            >
              <ha-icon icon="mdi:link-variant-off"></ha-icon>No template<ha-icon icon="mdi:chevron-down"></ha-icon>
            </button>
          </div>
          ${this._menuOpen?ne`
                <div class="menu" role="menu" aria-label="Template actions" @keydown=${this._onMenuKeydown}>
                  <button type="button" role="menuitem" @click=${()=>this._act("template-load")}>
                    <ha-icon icon="mdi:folder-open-outline"></ha-icon>Load template…
                  </button>
                  <button type="button" role="menuitem" @click=${()=>this._act("template-create")}>
                    <ha-icon icon="mdi:plus"></ha-icon>Create template from this card
                  </button>
                </div>
              `:ae}
        </div>
      `;const t=this.config?Go(this.config):[],i=t.reduce((e,t)=>e+t.paths.length,0),n=`${i} ${1===i?"override":"overrides"}`;return ne`
      <div class="tpl-bar linked">
        <div class="tpl-text">
          ${this.compact?ae:ne`<span class="tpl-label">Template</span>`}
          <span class="chips">
            <button
              type="button"
              class="chip is-accent manage"
              title="Template actions"
              aria-haspopup="menu"
              aria-expanded=${this._menuOpen?"true":"false"}
              @click=${this._toggleMenu}
            >
              <ha-icon icon="mdi:link-variant"></ha-icon><span class="nm">${e}</span><ha-icon icon="mdi:chevron-down"></ha-icon>
            </button>
            ${i>0?ne`<span class="chip is-warn">${n}</span>`:ne`<span class="chip">In sync</span>`}
          </span>
        </div>
        ${!this.compact&&i>0?ne`
              <div class="tpl-actions">
                <button type="button" class="btn btn-text btn-sm" @click=${()=>this._fire("template-resync")}>
                  <ha-icon icon="mdi:sync"></ha-icon>Re-sync ${n}
                </button>
              </div>
            `:ae}
        ${this._menuOpen?this._renderMenu(e,t,i):ae}
      </div>
    `}_renderMenu(e,t,i){return ne`
      <div class="menu" role="menu" aria-label="Template actions" @keydown=${this._onMenuKeydown}>
        <p class="menu-note">
          Linked to template <span class="mono">${e}</span>.
          ${i?`${i} field${1===i?"":"s"} differ locally.`:"Fully in sync."}
        </p>
        ${t.length?ne`
              <ul class="ovr">
                ${t.map(e=>ne`<li><span class="loc">${e.location}</span><span class="paths mono">${e.paths.map(e=>e.replace("design.","")).join(", ")}</span></li>`)}
              </ul>
            `:ae}
        <button type="button" role="menuitem" ?disabled=${0===i} @click=${()=>this._act("template-resync")}>
          <ha-icon icon="mdi:sync"></ha-icon>Re-sync ${i} ${1===i?"override":"overrides"}
        </button>
        <button type="button" role="menuitem" @click=${()=>this._act("template-save")}>
          <ha-icon icon="mdi:content-save-outline"></ha-icon>Save to template
        </button>
        <hr />
        <button type="button" role="menuitem" class="danger" @click=${()=>this._act("template-unlink")}>
          <ha-icon icon="mdi:link-variant-off"></ha-icon>Unlink from template
        </button>
      </div>
    `}};function Zo(...e){return e.filter(e=>void 0!==e&&""!==e).map(e=>String(e)).join(".")}function Jo(e,t){return e.basePath?Zo(e.basePath,t):t}Xo.styles=[Re,v`
      :host {
        display: block;
      }
      .tpl-bar {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px 12px;
        padding: 12px;
        border-radius: var(--mc-radius-lg);
        background: var(--mc-surface-2);
      }
      .tpl-text {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        flex: 1 1 200px;
        min-width: 0;
        font-size: 0.8125rem;
        color: var(--mc-text-2);
      }
      .tpl-text .chip .nm {
        overflow-wrap: anywhere;
        white-space: normal;
        line-height: 1.25;
      }
      /* A long template name wraps inside its chip: give the lines room instead of touching the border. */
      .tpl-text .chip:has(.nm) {
        padding-block: 3px;
      }
      .tpl-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        margin-left: auto;
      }
      /* The chips stay together; when space runs out the "Template" label moves above them. */
      .chips {
        display: inline-flex;
        flex-wrap: nowrap;
        align-items: center;
        gap: 8px;
        min-width: 0;
      }
      .manage[aria-expanded='true'] {
        background: var(--mc-surface);
        color: var(--mc-text);
      }
      .manage ha-icon:last-child {
        transition: transform 0.15s ease-out;
      }
      .manage[aria-expanded='true'] ha-icon:last-child {
        transform: rotate(180deg);
      }
      .menu {
        top: calc(100% + 6px);
        left: 0;
        width: min(320px, 100%);
      }
      :host([compact]) .tpl-bar {
        padding: 0;
        background: none;
        border-radius: 0;
        gap: 8px;
      }
      :host([compact]) .tpl-text {
        flex: 0 1 auto;
      }
      :host([compact]) .tpl-actions {
        margin-left: 0;
      }
      :host([compact]) .menu {
        width: 320px;
        max-width: calc(100vw - 32px);
      }
      .menu-note {
        margin: 0;
      }
      .ovr {
        list-style: none;
        margin: 0 0 4px;
        padding: 0 12px 8px;
        display: grid;
        gap: 6px;
        font-size: 0.75rem;
        border-bottom: 1px solid var(--mc-divider);
      }
      .ovr li {
        display: grid;
        gap: 2px;
      }
      .ovr .loc {
        font-weight: 500;
        color: var(--mc-text);
      }
      .ovr .paths {
        font-size: 0.75rem;
        color: var(--mc-warn-ink);
        overflow-wrap: anywhere;
      }
      .menu button:disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }
      .menu button.danger,
      .menu button.danger ha-icon {
        color: var(--mc-error-ink);
      }
    `],Yo([Te({attribute:!1})],Xo.prototype,"config",void 0),Yo([Te({attribute:!1})],Xo.prototype,"hass",void 0),Yo([Te({type:Boolean,reflect:!0})],Xo.prototype,"compact",void 0),Yo([Me()],Xo.prototype,"_menuOpen",void 0),Xo=Yo([ke("mc-template-bar")],Xo);var es=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};let ts=class extends _e{constructor(){super(...arguments),this.synced=!1,this.hasTemplate=!1,this.propertyPath="",this.hideIfNoTemplate=!1}_handleClick(e){e.preventDefault(),e.stopPropagation(),this.dispatchEvent(new CustomEvent("sync-toggle",{detail:{synced:this.synced,propertyPath:this.propertyPath},bubbles:!0,composed:!0}))}render(){return this.hasTemplate?this.synced?ne`
        <button
          class="sync"
          type="button"
          title="Synced with the template. Click to keep a local value that won't sync."
          @click=${this._handleClick}
        >
          <ha-icon icon="mdi:link-variant"></ha-icon><span class="sr-only">Synced with template</span>
        </button>
      `:ne`
      <button
        class="sync is-over"
        type="button"
        title="Overridden locally. Click to re-sync from the template."
        @click=${this._handleClick}
      >
        <ha-icon icon="mdi:link-variant-off"></ha-icon>
        Overridden
      </button>
    `:this.hideIfNoTemplate?ae:ne``}};ts.styles=[Re,v`
      :host {
        display: inline-flex;
        align-items: center;
        flex: none;
      }
    `],es([Te({type:Boolean})],ts.prototype,"synced",void 0),es([Te({type:Boolean})],ts.prototype,"hasTemplate",void 0),es([Te({type:String})],ts.prototype,"propertyPath",void 0),es([Te({type:Boolean})],ts.prototype,"hideIfNoTemplate",void 0),ts=es([ke("mc-sync-indicator")],ts);class is{constructor(e,t={}){this._modal=null,this._positioned=!1,this._maximized=!1,this._dragged=!1,this._preMaxRect=null,this._dragStartX=0,this._dragStartY=0,this._dragStartLeft=0,this._dragStartTop=0,this._isDragging=!1,this._resizeStartX=0,this._resizeStartY=0,this._resizeStartW=0,this._resizeStartH=0,this._isResizing=!1,this._onPointerMoveBound=this._onPointerMove.bind(this),this._onPointerUpBound=this._onPointerUp.bind(this),this._onTouchMoveBound=this._onTouchMove.bind(this),this._onTouchEndBound=this._onTouchEnd.bind(this),this._host=e,this._minWidth=t.minWidth??320,this._minHeight=t.minHeight??240,e.addController(this)}hostDisconnected(){this._removeGlobalListeners()}get isMaximized(){return this._maximized}consumeDragFlag(){return!!this._dragged&&(this._dragged=!1,!0)}reset(){this._removeGlobalListeners(),this._modal&&(this._modal.classList.remove("mc-modal--positioned","mc-modal--maximized"),this._modal.style.removeProperty("left"),this._modal.style.removeProperty("top"),this._modal.style.removeProperty("width"),this._modal.style.removeProperty("height"),this._modal.style.removeProperty("position"),this._modal.style.removeProperty("margin"),this._modal.style.removeProperty("max-width"),this._modal.style.removeProperty("max-height")),this._modal=null,this._positioned=!1,this._maximized=!1,this._dragged=!1,this._preMaxRect=null,this._isDragging=!1,this._isResizing=!1}bindModal(e){this._modal=e}handleHeaderPointerDown(e){this._shouldIgnoreTarget(e.target)||(e.preventDefault(),this._ensureModal(e),this._modal&&(this._ensurePositioned(),this._isDragging=!0,this._dragStartX=e.clientX,this._dragStartY=e.clientY,this._dragStartLeft=parseInt(this._modal.style.left)||0,this._dragStartTop=parseInt(this._modal.style.top)||0,document.addEventListener("pointermove",this._onPointerMoveBound),document.addEventListener("pointerup",this._onPointerUpBound)))}handleHeaderTouchStart(e){if(this._shouldIgnoreTarget(e.target))return;if(1!==e.touches.length)return;if(this._ensureModalFromTouch(e),!this._modal)return;this._ensurePositioned();const t=e.touches[0];this._isDragging=!0,this._dragStartX=t.clientX,this._dragStartY=t.clientY,this._dragStartLeft=parseInt(this._modal.style.left)||0,this._dragStartTop=parseInt(this._modal.style.top)||0,document.addEventListener("touchmove",this._onTouchMoveBound,{passive:!1}),document.addEventListener("touchend",this._onTouchEndBound)}handleResizePointerDown(e){e.preventDefault(),e.stopPropagation(),this._ensureModal(e),this._modal&&(this._ensurePositioned(),this._isResizing=!0,this._resizeStartX=e.clientX,this._resizeStartY=e.clientY,this._resizeStartW=this._modal.offsetWidth,this._resizeStartH=this._modal.offsetHeight,document.addEventListener("pointermove",this._onPointerMoveBound),document.addEventListener("pointerup",this._onPointerUpBound))}handleResizeTouchStart(e){if(1!==e.touches.length)return;if(e.stopPropagation(),this._ensureModalFromTouch(e),!this._modal)return;this._ensurePositioned();const t=e.touches[0];this._isResizing=!0,this._resizeStartX=t.clientX,this._resizeStartY=t.clientY,this._resizeStartW=this._modal.offsetWidth,this._resizeStartH=this._modal.offsetHeight,document.addEventListener("touchmove",this._onTouchMoveBound,{passive:!1}),document.addEventListener("touchend",this._onTouchEndBound)}toggleMaximize(){if(this._modal){if(this._maximized)this._modal.classList.remove("mc-modal--maximized"),this._preMaxRect&&(this._modal.style.left=this._preMaxRect.left+"px",this._modal.style.top=this._preMaxRect.top+"px",this._modal.style.width=this._preMaxRect.width+"px",this._modal.style.height=this._preMaxRect.height+"px"),this._maximized=!1;else{this._ensurePositioned(),this._preMaxRect={left:parseInt(this._modal.style.left)||0,top:parseInt(this._modal.style.top)||0,width:this._modal.offsetWidth,height:this._modal.offsetHeight};const e=16;this._modal.style.left=e+"px",this._modal.style.top=e+"px",this._modal.style.width=window.innerWidth-2*e+"px",this._modal.style.height=window.innerHeight-2*e+"px",this._modal.classList.add("mc-modal--maximized"),this._maximized=!0}this._host.requestUpdate()}}_shouldIgnoreTarget(e){const t=e.tagName.toLowerCase();return"button"===t||"input"===t||"select"===t||"textarea"===t||"ha-icon"===t||null!==e.closest("button")}_ensureModal(e){if(!this._modal){const t=e.currentTarget;this._modal=t.closest(".mc-modal, .mc-picker-modal")}}_ensureModalFromTouch(e){if(!this._modal){const t=e.currentTarget;this._modal=t.closest(".mc-modal, .mc-picker-modal")}}_ensurePositioned(){if(this._positioned||!this._modal)return;const e=this._modal.getBoundingClientRect();this._modal.style.position="fixed",this._modal.style.left=e.left+"px",this._modal.style.top=e.top+"px",this._modal.style.width=e.width+"px",this._modal.style.height=e.height+"px",this._modal.style.margin="0",this._modal.style.maxWidth="none",this._modal.style.maxHeight="none",this._modal.classList.add("mc-modal--positioned"),this._positioned=!0}_onPointerMove(e){this._handleMove(e.clientX,e.clientY)}_onPointerUp(){this._handleEnd(),document.removeEventListener("pointermove",this._onPointerMoveBound),document.removeEventListener("pointerup",this._onPointerUpBound)}_onTouchMove(e){if(1!==e.touches.length)return;e.preventDefault();const t=e.touches[0];this._handleMove(t.clientX,t.clientY)}_onTouchEnd(){this._handleEnd(),document.removeEventListener("touchmove",this._onTouchMoveBound),document.removeEventListener("touchend",this._onTouchEndBound)}_handleMove(e,t){if(this._modal){if(this._isDragging){const i=e-this._dragStartX,n=t-this._dragStartY;this._modal.style.left=this._dragStartLeft+i+"px",this._modal.style.top=this._dragStartTop+n+"px",this._dragged=!0}if(this._isResizing){const i=e-this._resizeStartX,n=t-this._resizeStartY,r=Math.max(this._minWidth,this._resizeStartW+i),a=Math.max(this._minHeight,this._resizeStartH+n);this._modal.style.width=r+"px",this._modal.style.height=a+"px",this._dragged=!0}}}_handleEnd(){this._isDragging=!1,this._isResizing=!1}_removeGlobalListeners(){document.removeEventListener("pointermove",this._onPointerMoveBound),document.removeEventListener("pointerup",this._onPointerUpBound),document.removeEventListener("touchmove",this._onTouchMoveBound),document.removeEventListener("touchend",this._onTouchEndBound)}}function ns(e){return t=>{"Escape"===t.key&&(t.preventDefault(),t.stopPropagation(),e())}}function rs(e,t,i){return ne`
    <div
      class="mc-picker-header"
      @pointerdown=${e=>t.handleHeaderPointerDown(e)}
      @touchstart=${e=>t.handleHeaderTouchStart(e)}
    >
      <h2 class="mc-picker-title">${e}</h2>
      <button
        type="button"
        class="icon-btn sm"
        aria-label=${t.isMaximized?"Restore size":"Maximize"}
        title=${t.isMaximized?"Restore size":"Maximize"}
        @click=${()=>t.toggleMaximize()}
      >
        <ha-icon icon=${t.isMaximized?"mdi:window-restore":"mdi:window-maximize"}></ha-icon>
      </button>
      <button type="button" class="icon-btn" aria-label="Close" title="Close" @click=${i}>
        <ha-icon icon="mdi:close"></ha-icon>
      </button>
    </div>
  `}function as(e,t,i){return ne`
    <div class="with-icon">
      <ha-icon icon="mdi:magnify"></ha-icon>
      <input
        class="input"
        type="text"
        placeholder=${e}
        aria-label=${e}
        .value=${t}
        @input=${e=>i(e.target.value)}
      />
    </div>
  `}function os(e){return ne`
    <div
      class="mc-modal-resize-handle"
      @pointerdown=${t=>e.handleResizePointerDown(t)}
      @touchstart=${t=>e.handleResizeTouchStart(t)}
    ></div>
  `}var ss=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};let ls=class extends _e{constructor(){super(...arguments),this.value="",this.entityId="",this._modalCtrl=new is(this),this._showModal=!1,this._searchQuery="",this._selectedAttribute=""}_openModal(){this._selectedAttribute=this.value,this._showModal=!0,this._searchQuery=""}_closeModal(){this._modalCtrl.reset(),this._showModal=!1}_handleSave(){this.value=this._selectedAttribute,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:this._selectedAttribute},bubbles:!0,composed:!0})),this._closeModal()}_selectAttribute(e){this._selectedAttribute=e}_onInputChange(e){const t=e.target.value;this.value=t,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:t},bubbles:!0,composed:!0}))}_getAttributes(){if(!this.hass||!this.entityId)return[];const e=this.hass.states[this.entityId];return e?Object.entries(e.attributes).map(([e,t])=>({name:e,value:String(t??"")})).filter(e=>{if(!this._searchQuery)return!0;const t=this._searchQuery.toLowerCase();return e.name.toLowerCase().includes(t)||e.value.toLowerCase().includes(t)}).sort((e,t)=>e.name.localeCompare(t.name)):[]}_getAttributeValue(){if(!this.hass||!this.entityId||!this.value)return null;const e=this.hass.states[this.entityId];if(!e)return null;const t=e.attributes[this.value];return void 0!==t?String(t):null}render(){const e=this.hass&&this.entityId?this.hass.states[this.entityId]:void 0,t=e?Object.keys(e.attributes).sort((e,t)=>e.localeCompare(t)):[];if(!t.length)return ne`
        <input
          type="text"
          class="input mono"
          .value=${this.value}
          placeholder="attribute"
          aria-label="Attribute"
          spellcheck="false"
          @input=${this._onInputChange}
        />
        ${this._showModal?this._renderModal():""}
      `;const i=this.value&&!t.includes(this.value)?[this.value,...t]:t;return ne`
      <div class="select">
        <select
          class="input"
          aria-label="Attribute"
          .value=${this.value}
          @change=${e=>{this._onInputChange(e)}}
        >
          <option value="" ?selected=${!this.value}>State (no attribute)</option>
          ${i.map(e=>ne`<option value=${e} ?selected=${e===this.value}>${e}</option>`)}
        </select>
        <ha-icon icon="mdi:chevron-down"></ha-icon>
      </div>
      ${this._showModal?this._renderModal():""}
    `}_renderModal(){const e=this._getAttributes();return ne`
      <div class="mc-picker-overlay" @click=${()=>{this._modalCtrl.consumeDragFlag()||this._closeModal()}}>
        <div class="mc-picker-modal" role="dialog" @keydown=${ns(()=>this._closeModal())} aria-label="Select attribute" @click=${e=>e.stopPropagation()}>
          ${rs("Select attribute",this._modalCtrl,()=>this._closeModal())}
          <div class="mc-picker-search">
            ${as("Search attributes",this._searchQuery,e=>{this._searchQuery=e})}
          </div>
          <div class="mc-picker-list" role="listbox" aria-label="Attributes">
            ${e.length>0?e.map(e=>ne`
                  <button
                    type="button"
                    role="option"
                    class="mc-picker-item"
                    aria-selected=${this._selectedAttribute===e.name?"true":"false"}
                    @click=${()=>this._selectAttribute(e.name)}
                  >
                    <span class="mc-picker-item-icon"><ha-icon icon="mdi:tag-text-outline"></ha-icon></span>
                    <span class="mc-picker-item-content">
                      <span class="mc-picker-item-name">${e.name}</span>
                      <span class="mc-picker-item-id">${e.value.length>60?e.value.slice(0,60)+"...":e.value}</span>
                    </span>
                  </button>
                `):ne`<div class="mc-picker-empty">No attributes found</div>`}
          </div>
          <div class="mc-picker-footer">
            <button type="button" class="btn btn-secondary" @click=${this._closeModal}>Cancel</button>
            <button type="button" class="btn btn-primary" @click=${this._handleSave}>Save</button>
          </div>
          ${os(this._modalCtrl)}
        </div>
      </div>
    `}};ls.styles=[Re,tt],ss([Te({attribute:!1})],ls.prototype,"hass",void 0),ss([Te({type:String})],ls.prototype,"value",void 0),ss([Te({type:String})],ls.prototype,"entityId",void 0),ss([Me()],ls.prototype,"_showModal",void 0),ss([Me()],ls.prototype,"_searchQuery",void 0),ss([Me()],ls.prototype,"_selectedAttribute",void 0),ls=ss([ke("mc-attribute-picker")],ls);var cs=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};const ds=["top","right","bottom","left"],ps=["px","em","rem","%","vw","vh"],us=/^-?(\d+\.?\d*|\.\d+)$/,hs=/^(-?(?:\d+\.?\d*|\.\d+))(px|rem|em|%|vh|vw)?$/,ms={top:{label:"Top",icon:"mdi:border-top-variant"},right:{label:"Right",icon:"mdi:border-right-variant"},bottom:{label:"Bottom",icon:"mdi:border-bottom-variant"},left:{label:"Left",icon:"mdi:border-left-variant"}},gs={top:{label:"Top left",icon:"mdi:border-top-variant"},right:{label:"Top right",icon:"mdi:border-right-variant"},bottom:{label:"Bottom right",icon:"mdi:border-bottom-variant"},left:{label:"Bottom left",icon:"mdi:border-left-variant"}};let fs=class extends _e{constructor(){super(...arguments),this.design={},this.baseName="padding",this._linked=!1,this._unitChoice={}}_getSuffixKey(e,t){if("border_radius"===e){return{top:"border_top_left_radius",right:"border_top_right_radius",bottom:"border_bottom_right_radius",left:"border_bottom_left_radius"}[t]||`${e}_${t}`}return`${e}_${t}`}_shorthandSides(){const e=String(this.design[this.baseName]??"").trim();if(!e)return;const[t,i=t,n=t,r=i]=e.split(/\s+/);return{top:t,right:i,bottom:n,left:r}}_getValue(e){const t=this._shorthandSides();if(t)return t[e];return this.design[this._getSuffixKey(this.baseName,e)]||""}_sideUnit(e){const t=this._getValue(e).match(hs);return t&&t[2]?t[2]:this._unitChoice[e]||"px"}_displayValue(e){const t=e.match(hs);return t?t[1]:e}_withUnit(e,t){const i=e.trim();return i?us.test(i)?`${i}${t}`:i:""}_emitSides(e){const t={[this.baseName]:void 0},i=this._shorthandSides();for(const n of ds)void 0!==e[n]?t[this._getSuffixKey(this.baseName,n)]=e[n]:i?.[n]&&(t[this._getSuffixKey(this.baseName,n)]=i[n]);this.onChange(t)}_handleValueChange(e,t){const i=this._withUnit(t,this._sideUnit(this._linked?"top":e));this._linked?this._emitSides({top:i,right:i,bottom:i,left:i}):this._emitSides({[e]:i})}_handleUnitChange(e,t){const i=this._linked?ds:[e],n=this._getValue(this._linked?"top":e).match(hs),r={...this._unitChoice},a={};for(const e of i)r[e]=t,n&&(a[e]=`${n[1]}${t}`);this._unitChoice=r,Object.keys(a).some(e=>a[e]!==this._getValue(e))&&this._emitSides(a)}_toggleLink(){if(this._linked=!this._linked,!this._linked)return;const e=this._getValue("top"),t=this._sideUnit("top");this._unitChoice={top:t,right:t,bottom:t,left:t},e&&ds.some(t=>this._getValue(t)!==e)&&this._emitSides({top:e,right:e,bottom:e,left:e})}_renderSide(e){const t="border_radius"===this.baseName?gs[e]:ms[e],i=this._linked?"top":e,n=this._getValue(i),r=this._sideUnit(i),a=ps.includes(r)?ps:[...ps,r],o=!n||hs.test(n);return ne`
      <div class="box-side">
        <label class="box-side-label" for="side-${e}">
          <ha-icon icon=${t.icon}></ha-icon>${t.label}
        </label>
        <div class="unit">
          <input
            class="input"
            id="side-${e}"
            type="text"
            inputmode="decimal"
            placeholder="0"
            .value=${this._displayValue(n)}
            @input=${t=>this._handleValueChange(e,t.target.value)}
          />
          <div class="select">
            <select
              class="input"
              aria-label="${t.label} unit"
              .value=${r}
              ?disabled=${!o}
              @change=${t=>this._handleUnitChange(e,t.target.value)}
            >
              ${a.map(e=>ne`<option value=${e} ?selected=${e===r}>${e}</option>`)}
            </select>
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </div>
        </div>
      </div>
    `}render(){return ne`
      <div class="box">
        <div class="box-grid">${ds.map(e=>this._renderSide(e))}</div>
        <div class="box-foot">
          <button
            type="button"
            class="btn btn-text btn-sm"
            aria-pressed=${this._linked?"true":"false"}
            @click=${this._toggleLink}
          >
            <ha-icon icon="mdi:link-variant"></ha-icon>Same on all sides
          </button>
        </div>
      </div>
    `}};function bs(e,t,i){if(!(t&&i&&!!i.templateName))return ne`<div class="field-head"><label>${e}</label></div>`;const n=!function(e,t){const i=e.basePath?Zo(e.basePath,t):t;return e.notSynced.includes(i)}(i,t),r=Jo(i,t);return ne`
    <div class="field-head">
      <label>${e}</label>
      <mc-sync-indicator
        .synced=${n}
        .hasTemplate=${!0}
        .propertyPath=${r}
        .hideIfNoTemplate=${!0}
        @sync-toggle=${e=>{const t=new CustomEvent("field-sync-toggle",{detail:{propertyPath:e.detail.propertyPath,synced:e.detail.synced},bubbles:!0,composed:!0});e.target.dispatchEvent(t)}}
      ></mc-sync-indicator>
    </div>
  `}function vs(e,t){return ne`<div class=${"mc-field-hint"+(t?` ${t}`:"")}>${e}</div>`}function ys(e){const t=(e||"").trim();if(!t)return{top:"",right:"",bottom:"",left:""};const i=t.split(/\s+/);return 1===i.length?{top:i[0],right:i[0],bottom:i[0],left:i[0]}:2===i.length?{top:i[0],right:i[1],bottom:i[0],left:i[1]}:3===i.length?{top:i[0],right:i[1],bottom:i[2],left:i[1]}:{top:i[0]||"",right:i[1]||"",bottom:i[2]||"",left:i[3]||""}}function ws(e){const{top:t,right:i,bottom:n,left:r}=e;if(t||i||n||r)return t===i&&i===n&&n===r?t||void 0:t===n&&i===r?`${t||"0"} ${i||"0"}`:i===r?`${t||"0"} ${i||"0"} ${n||"0"}`:`${t||"0"} ${i||"0"} ${n||"0"} ${r||"0"}`}function xs(e,t,i,n,r,a){return ne`
    <div class="mc-field">
      ${bs(e,n,r)}
      <input
        class="input ${a?.mono?"mono":""}"
        type="text"
        spellcheck=${a?.mono?"false":ae}
        placeholder=${a?.placeholder??ae}
        .value=${t||""}
        @input=${e=>i(e.target.value)}
      />
    </div>
  `}function _s(e,t,i,n,r,a){return ne`
    <div class="mc-field">
      ${bs(e,r,a)}
      <textarea
        class="input"
        .value=${t||""}
        rows=${String(n?.rows??4)}
        placeholder=${n?.placeholder??ae}
        @input=${e=>i(e.target.value)}
      ></textarea>
    </div>
  `}function $s(e,t,i,n,r,a){return ne`
    <div class="mc-field">
      ${bs(e,r,a)}
      <input
        class="input"
        type="number"
        .value=${String(t??"")}
        min=${n?.min??ae}
        max=${n?.max??ae}
        step=${n?.step??ae}
        @input=${e=>i(Number(e.target.value))}
      />
    </div>
  `}function ks(e,t,i,n,r,a,o){return ne`
    <div class="mc-field">
      ${e?bs(e,r,a):ae}
      <div class="select">
        <select
          class="input"
          aria-label=${e||ae}
          ?disabled=${!!o?.disabled}
          @change=${e=>n(e.target.value)}
        >
          ${i.map(e=>ne`<option value=${e.value} ?selected=${t===e.value}>${e.label}</option>`)}
        </select>
        <ha-icon icon="mdi:chevron-down"></ha-icon>
      </div>
    </div>
  `}function Ss(e,t,i,n,r,a){const o=i.some(e=>e.value===t)?t:i[0]?.value;return ne`
    <div class="mc-field">
      ${bs(e,r,a)}
      <div class="seg full" role="radiogroup" aria-label=${e} @keydown=${e=>{const t=i.findIndex(e=>e.value===o),r={ArrowRight:(t+1)%i.length,ArrowDown:(t+1)%i.length,ArrowLeft:(t-1+i.length)%i.length,ArrowUp:(t-1+i.length)%i.length,Home:0,End:i.length-1}[e.key];if(void 0===r)return;e.preventDefault();const a=e.currentTarget;n(i[r].value),requestAnimationFrame(()=>a.querySelector(`[data-val="${i[r].value}"]`)?.focus())}}>
        ${i.map(e=>{const t=e.value===o;return ne`<button
            type="button"
            role="radio"
            data-val=${e.value}
            aria-checked=${t?"true":"false"}
            tabindex=${t?"0":"-1"}
            @click=${()=>n(e.value)}
          >${e.label}</button>`})}
      </div>
    </div>
  `}function Cs(e,t,i,n,r,a){return ne`
    <div class="switch-row">
      <div class="txt">
        ${bs(e,n,r)}
        ${a?ne`<p class="help">${a}</p>`:ae}
      </div>
      <button
        type="button"
        class="switch"
        role="switch"
        aria-checked=${t?"true":"false"}
        aria-label=${e}
        @click=${()=>i(!t)}
      ></button>
    </div>
  `}function Ts(e,t,i,n,r,a,o){return ne`
    <div class="mc-field">
      ${bs(e,a,o)}
      <mc-entity-picker
        .hass=${n}
        .value=${t||""}
        .domain=${r||""}
        @value-changed=${e=>i(e.detail.value)}
      ></mc-entity-picker>
    </div>
  `}function Ms(e,t,i,n,r){return ne`
    <div class="mc-field">
      ${bs(e,n,r)}
      <mc-color-picker
        .value=${t||""}
        .label=${e}
        @value-changed=${e=>i(e.detail.value)}
      ></mc-color-picker>
    </div>
  `}function As(e,t,i,n,r,a){return ne`
    <div class="mc-field">
      ${bs(e,n,r)}
      <mc-unit-field
        .value=${t||""}
        .label=${e}
        .placeholder=${a||""}
        @value-changed=${e=>i(e.detail.value)}
      ></mc-unit-field>
    </div>
  `}function Es(e,t,i,n,r,a){const o={[n]:t||""};return ne`
    <div class="mc-field">
      ${bs(e,r,a)}
      <mc-box-field
        .design=${o}
        .onChange=${e=>i(function(e,t,i){const n=ys(e);return"string"==typeof i[t]?ws(ys(i[t])):("string"==typeof i[`${t}_top`]&&(n.top=i[`${t}_top`]),"string"==typeof i[`${t}_right`]&&(n.right=i[`${t}_right`]),"string"==typeof i[`${t}_bottom`]&&(n.bottom=i[`${t}_bottom`]),"string"==typeof i[`${t}_left`]&&(n.left=i[`${t}_left`]),"border_radius"===t&&("string"==typeof i.border_top_left_radius&&(n.top=i.border_top_left_radius),"string"==typeof i.border_top_right_radius&&(n.right=i.border_top_right_radius),"string"==typeof i.border_bottom_right_radius&&(n.bottom=i.border_bottom_right_radius),"string"==typeof i.border_bottom_left_radius&&(n.left=i.border_bottom_left_radius)),ws(n))}(t,n,e))}
        .baseName=${n}
      ></mc-box-field>
    </div>
  `}function Ps(e,t,i,n,r,a){return ne`
    <div class="mc-field">
      ${bs(e,r,a)}
      <mc-icon-picker
        .hass=${n}
        .value=${t||""}
        @value-changed=${e=>i(e.detail.value||"")}
      ></mc-icon-picker>
    </div>
  `}function zs(e,t,i,n,r,a,o){return ne`
    <div class="mc-field">
      ${bs(e,a,o)}
      <mc-media-picker
        .hass=${n}
        .value=${t||""}
        .mediaType=${r||""}
        @value-changed=${e=>i(e.detail.value)}
      ></mc-media-picker>
    </div>
  `}function Rs(e,t,i,n,r,a,o){if(!r||!n)return ne``;const s=n.states[r];return s&&0!==Object.keys(s.attributes).length?ne`
    <div class="mc-field">
      ${bs(e,a,o)}
      <mc-attribute-picker
        .hass=${n}
        .value=${t||""}
        .entityId=${r}
        @value-changed=${e=>i(e.detail.value)}
      ></mc-attribute-picker>
    </div>
  `:ne``}fs.styles=[Re,v`
      :host {
        display: block;
        min-width: 0;
        container-type: inline-size;
      }
      .box {
        display: grid;
        gap: 8px;
      }
      /* per-side value + unit: a compact .unit (narrower unit select than the 76px default) */
      .box-side .unit > .input {
        min-width: 5ch;
        padding-left: 10px;
        padding-right: 6px;
      }
      .box-side .unit > .select {
        width: 64px;
      }
      .box-side .unit > .select select {
        padding-left: 8px;
        padding-right: 24px;
      }
      .box-side .unit > .select > ha-icon {
        right: 4px;
      }
      .box-foot .btn[aria-pressed='true'] {
        background: var(--mc-accent-tint);
      }
      /* the 2x2 holds down to ~200px of field width (studio inspector, 360px pane); one column only below */
      @container (max-width: 200px) {
        .box-grid {
          grid-template-columns: minmax(0, 1fr);
        }
      }
    `],cs([Te({attribute:!1})],fs.prototype,"design",void 0),cs([Te({attribute:!1})],fs.prototype,"onChange",void 0),cs([Te({type:String})],fs.prototype,"baseName",void 0),cs([Me()],fs.prototype,"_linked",void 0),cs([Me()],fs.prototype,"_unitChoice",void 0),fs=cs([ke("mc-box-field")],fs);const Is=[{label:"State",value:"state"},{label:"Attribute",value:"attribute"},{label:"Time",value:"time"},{label:"Template",value:"template"}],Ls=[{value:"every",label:"All match (AND)"},{value:"any",label:"Any matches (OR)"}],Os=[{label:"equals",value:"eq"},{label:"not equals",value:"ne"}];function Ds(e,t,i){return ne`
    <div class="mc-field">
      ${bs(e)}
      <input class="input" type="time" .value=${t||""} @input=${e=>i(e.target.value)} />
    </div>
  `}function Ns(e,t,i,n){const r=e=>n?e:void 0;switch(e.type){case"state":case"attribute":return ne`
        ${Ts("Entity",e.entity,e=>t({entity:e}),i,void 0,r("entity"),n)}
        ${"attribute"===e.type?xs("Attribute",e.attribute,e=>t({attribute:e}),r("attribute"),n):ae}
        ${function(e,t,i,n){const r=!e.state&&!!e.state_not,a=(r?e.state_not:e.state)||"";return ne`
    <div class="two">
      ${ks("Operator",r?"ne":"eq",Os,e=>t("ne"===e?{state:void 0,state_not:a}:{state:a,state_not:void 0}))}
      ${xs(i,a,e=>t(r?{state_not:e}:{state:e}),n?r?"state_not":"state":void 0,n)}
    </div>
  `}(e,t,"attribute"===e.type?"Value":"State",n)}
      `;case"time":return ne`
        <div class="two">
          ${Ds("After",e.after,e=>t({after:e}))}
          ${Ds("Before",e.before,e=>t({before:e}))}
        </div>
      `;case"template":return _s("Template",e.template,e=>t({template:e}),{rows:3},r("template"),n);default:return ne``}}function Fs(e,t,i,n,r,a="module"){if(!e.length)return ne`
      <div class="empty">
        <ha-icon icon="mdi:eye-check-outline"></ha-icon>
        <strong>Always visible</strong>
        <p>Add a condition to show this ${a} only when it matters.</p>
        <button type="button" class="btn btn-secondary btn-sm" @click=${i.onAdd}>
          <ha-icon icon="mdi:plus"></ha-icon>Add condition
        </button>
      </div>
    `;const o=r?.basePath;return ne`
    <div class="group">
      <p class="help lead">Show this ${a} when…</p>
      ${function(e,t,i,n="Match"){return ne`
    <div class="field">
      ${n?bs(n,i?"mode":void 0,i):ae}
      <div class="seg full" role="radiogroup" aria-label="Condition match" @keydown=${i=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(i.key))return;i.preventDefault();const n="every"===e?"any":"every";t(n);const r=i.currentTarget;requestAnimationFrame(()=>r.querySelector(`[data-val="${n}"]`)?.focus())}}>
        ${Ls.map(i=>ne`
            <button
              type="button"
              role="radio"
              data-val=${i.value}
              aria-checked=${e===i.value?"true":"false"}
              tabindex=${e===i.value?"0":"-1"}
              @click=${()=>t(i.value)}
            >${i.label}</button>
          `)}
      </div>
    </div>
  `}(t,i.onMode,r,"")}
    </div>
    <div class="group cond-list">
      ${e.map((e,t)=>{const a=r?{...r,basePath:o?`${o}.conditions.${t}`:`conditions.${t}`}:void 0,s=e=>i.onUpdate(t,e);return ne`
          <div class="cond">
            <div class="cond-head">
              <span class="n">Condition ${t+1}</span>
              <button
                type="button"
                class="icon-btn sm danger"
                aria-label="Remove condition ${t+1}"
                title="Remove condition"
                @click=${()=>i.onRemove(t)}
              >
                <ha-icon icon="mdi:delete-outline"></ha-icon>
              </button>
            </div>
            ${ks("Type",e.type,Is,e=>s({type:e}),a?"type":void 0,a)}
            ${Ns(e,s,n,a)}
          </div>
        `})}
      <div>
        <button type="button" class="btn btn-secondary btn-sm" @click=${i.onAdd}>
          <ha-icon icon="mdi:plus"></ha-icon>Add condition
        </button>
      </div>
    </div>
  `}function js(e){const t=Object.keys(e?.themes?.themes||{}).sort((e,t)=>e.localeCompare(t,void 0,{sensitivity:"base"}));return[{label:"Dashboard default",value:"__default__"},...t.map(e=>({label:e,value:e}))]}const Bs=()=>({id:Gt("cond"),type:"state",entity:"",state:""});function qs(e,t,i,n,r){const a=e.conditional_appearance||[],o=e=>t("conditional_appearance",e),s=()=>{const e=Gt("appr");r.expand(e),o([...a,{id:e,name:`Rule ${a.length+1}`,conditions:[],mode:"every",overrides:{}}])},l=e=>{r.collapse(e),o(a.filter(t=>t.id!==e))},c=(e,t)=>o(a.map(i=>i.id===e?{...i,...t}:i));return ne`
    <section class="group">
      <div class="group-head">
        <ha-icon icon="mdi:palette-swatch-outline"></ha-icon>
        <h3>Conditional appearance</h3>
      </div>
      ${a.length?ne`
            <p class="help">Override appearance fields while conditions match. Rules apply in order; later rules win.</p>
            ${a.map(e=>function(e,t,i,n,r,a){const o=n.expanded.has(e.id),s=e.conditions||[],l=e.overrides||{},c=`rule-body-${e.id}`,d=(t,i)=>{const n={...l};void 0===i||""===i||null===i?delete n[t]:n[t]=i,r(e.id,{overrides:n})},p=l.use_page_theme;return ne`
    <div class="cond rule">
      <div class="cond-head">
        <button
          type="button"
          class="icon-btn sm"
          aria-expanded=${o?"true":"false"}
          aria-controls=${c}
          aria-label=${o?"Collapse rule":"Expand rule"}
          @click=${()=>n.toggle(e.id)}
        >
          <ha-icon icon=${o?"mdi:chevron-down":"mdi:chevron-right"}></ha-icon>
        </button>
        <input
          class="input rule-name"
          type="text"
          aria-label="Rule name"
          placeholder="Rule name"
          .value=${e.name||""}
          @input=${t=>r(e.id,{name:t.target.value})}
        />
        <span class="chip is-count">${s.length} cond.</span>
        <button
          type="button"
          class="icon-btn sm danger"
          aria-label="Remove rule"
          title="Remove rule"
          @click=${()=>a(e.id)}
        >
          <ha-icon icon="mdi:delete-outline"></ha-icon>
        </button>
      </div>
      ${o?ne`
            <div class="rule-body" id=${c}>
              <div class="sub-head">Conditions</div>
              ${Fs(s,e.mode||"every",{onAdd:()=>r(e.id,{conditions:[...s,Bs()]}),onUpdate:(t,i)=>r(e.id,{conditions:s.map((e,n)=>n===t?{...e,...i}:e)}),onRemove:t=>r(e.id,{conditions:s.filter((e,i)=>i!==t)}),onMode:t=>r(e.id,{mode:t})},t,void 0,"rule")}
              <div class="sub-head">Appearance overrides</div>
              <p class="help">Only fields you set override. Leave blank to fall through to the base settings.</p>
              ${Ms("Background color",l.background,e=>d("background",e))}
              ${zs("Background image",l.background_image,e=>d("background_image",e),t,"image")}
              ${Cs("Override dashboard theme",!1===p,e=>d("use_page_theme",!e&&void 0))}
              ${!1===p?ks("Card theme",l.theme||"__default__",i,e=>d("theme","__default__"===e?void 0:e)):ae}
              ${As("Border radius",l.border_radius,e=>d("border_radius",e))}
              ${Es("Padding",l.padding,e=>d("padding",e),"padding")}
              ${xs("Box shadow",l.box_shadow,e=>d("box_shadow",e))}
              ${As("Card height",l.card_height,e=>d("card_height",e))}
            </div>
          `:ae}
    </div>
  `}(e,i,n,r,c,l))}
            <div>
              <button type="button" class="btn btn-secondary btn-sm" @click=${s}>
                <ha-icon icon="mdi:plus"></ha-icon>Add appearance rule
              </button>
            </div>
          `:ne`
            <div class="empty">
              <ha-icon icon="mdi:palette-swatch-outline"></ha-icon>
              <strong>No appearance rules</strong>
              <p>Change card fields, like background color, while conditions match.</p>
              <button type="button" class="btn btn-secondary btn-sm" @click=${s}>
                <ha-icon icon="mdi:plus"></ha-icon>Add appearance rule
              </button>
            </div>
          `}
    </section>
  `}function Hs(e,t,i){return t?ne`<button
    type="button"
    class="icon-btn sm field-reset"
    aria-label="Reset ${e}"
    title="Reset to default"
    @click=${e=>{e.stopPropagation(),i()}}
  >
    <ha-icon icon="mdi:backup-restore"></ha-icon>
  </button>`:ae}var Gs=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};const Us="magic-card-saved-colors",Vs=["#ffffff","#f3f4f6","#d1d5db","#9ca3af","#6b7280","#374151","#1f2937","#000000","#ef4444","#f97316","#eab308","#22c55e","#14b8a6","#3b82f6","#8b5cf6","#ec4899","#fecaca","#fed7aa","#fef08a","#bbf7d0","#99f6e4","#bfdbfe","#ddd6fe","#fbcfe8","var(--primary-color)","var(--accent-color)","var(--primary-text-color)","var(--secondary-text-color)","var(--card-background-color)","var(--divider-color)","var(--success-color)","var(--error-color)"];let Ws=class extends _e{constructor(){super(...arguments),this.value="",this.label="",this._isOpen=!1,this._hsva={h:0,s:100,v:100,a:1},this._savedColors=[],this._hexInput="",this._modalCtrl=new is(this),this._dragging=null,this._handleAreaPointerDown=e=>{this._dragging="area",e.target.setPointerCapture(e.pointerId),this._updateArea(e)},this._handleHuePointerDown=e=>{this._dragging="hue",e.target.setPointerCapture(e.pointerId),this._updateHue(e)},this._handleOpacityPointerDown=e=>{this._dragging="opacity",e.target.setPointerCapture(e.pointerId),this._updateOpacity(e)},this._handlePointerMove=e=>{this._dragging&&("area"===this._dragging?this._updateArea(e):"hue"===this._dragging?this._updateHue(e):"opacity"===this._dragging&&this._updateOpacity(e))},this._handlePointerUp=()=>{this._dragging=null}}connectedCallback(){super.connectedCallback(),this._loadSavedColors(),this._parseValue(this.value)}updated(e){e.has("value")&&!this._isOpen&&this._parseValue(this.value)}_loadSavedColors(){try{const e=localStorage.getItem(Us);this._savedColors=e?JSON.parse(e):[]}catch{this._savedColors=[]}}_saveSavedColors(){try{localStorage.setItem(Us,JSON.stringify(this._savedColors))}catch{}}_parseValue(e){if(!e)return this._hsva={h:0,s:0,v:100,a:1},void(this._hexInput="");if(e.startsWith("var("))return void(this._hexInput=e);const t=this._colorToHsva(e);t?(this._hsva=t,this._hexInput=this._hsvaToHex(t)):this._hexInput=e}_colorToHsva(e){const t=e.match(/^#([0-9a-f]{3,8})$/i);if(t){let e=t[1];3===e.length&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),4===e.length&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]);const i=parseInt(e.slice(0,2),16)/255,n=parseInt(e.slice(2,4),16)/255,r=parseInt(e.slice(4,6),16)/255,a=8===e.length?parseInt(e.slice(6,8),16)/255:1;return this._rgbToHsva(i,n,r,a)}const i=e.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);if(i){const e=parseInt(i[1])/255,t=parseInt(i[2])/255,n=parseInt(i[3])/255,r=i[4]?parseFloat(i[4]):1;return this._rgbToHsva(e,t,n,r)}return null}_rgbToHsva(e,t,i,n){const r=Math.max(e,t,i),a=r-Math.min(e,t,i),o=100*r,s=0===r?0:a/r*100;let l=0;if(0!==a)switch(r){case e:l=60*((t-i)/a+(t<i?6:0));break;case t:l=60*((i-e)/a+2);break;case i:l=60*((e-t)/a+4)}return{h:l,s,v:o,a:n}}_hsvaToRgb(e){const t=e.h/60,i=e.s/100,n=e.v/100,r=n*i,a=r*(1-Math.abs(t%2-1)),o=n-r;let s=0,l=0,c=0;return t<1?(s=r,l=a):t<2?(s=a,l=r):t<3?(l=r,c=a):t<4?(l=a,c=r):t<5?(s=a,c=r):(s=r,c=a),{r:Math.round(255*(s+o)),g:Math.round(255*(l+o)),b:Math.round(255*(c+o)),a:e.a}}_hsvaToHex(e){const t=this._hsvaToRgb(e),i="#"+t.r.toString(16).padStart(2,"0")+t.g.toString(16).padStart(2,"0")+t.b.toString(16).padStart(2,"0");return e.a<1?i+Math.round(255*e.a).toString(16).padStart(2,"0"):i}_hsvaToRgbaString(e){const t=this._hsvaToRgb(e);return e.a<1?`rgba(${t.r}, ${t.g}, ${t.b}, ${e.a.toFixed(2)})`:`rgb(${t.r}, ${t.g}, ${t.b})`}_getCurrentColor(){return this._hexInput.startsWith("var(")?this._hexInput:this._hsvaToHex(this._hsva)}_emitChange(){const e=this._getCurrentColor();this.dispatchEvent(new CustomEvent("value-changed",{bubbles:!0,composed:!0,detail:{value:e}}))}_openModal(){this._parseValue(this.value),this._isOpen=!0}_closeModal(){this._modalCtrl.reset(),this._isOpen=!1}_handleSave(){this._emitChange(),this._closeModal()}_updateArea(e){const t=e.currentTarget.getBoundingClientRect(),i=Math.max(0,Math.min(1,(e.clientX-t.left)/t.width)),n=Math.max(0,Math.min(1,(e.clientY-t.top)/t.height));this._hsva={...this._hsva,s:100*i,v:100*(1-n)},this._hexInput=this._hsvaToHex(this._hsva)}_updateHue(e){const t=e.currentTarget.getBoundingClientRect(),i=Math.max(0,Math.min(1,(e.clientX-t.left)/t.width));this._hsva={...this._hsva,h:360*i},this._hexInput=this._hsvaToHex(this._hsva)}_updateOpacity(e){const t=e.currentTarget.getBoundingClientRect(),i=Math.max(0,Math.min(1,(e.clientX-t.left)/t.width));this._hsva={...this._hsva,a:i},this._hexInput=this._hsvaToHex(this._hsva)}_handleHexInput(e){const t=e.target.value;this._hexInput=t;const i=this._colorToHsva(t);i&&(this._hsva=i)}_selectPreset(e){if(e.startsWith("var("))this._hexInput=e;else{const t=this._colorToHsva(e);t&&(this._hsva=t,this._hexInput=this._hsvaToHex(t))}}_addSavedColor(){const e=this._getCurrentColor();this._savedColors.includes(e)||(this._savedColors=[e,...this._savedColors].slice(0,12),this._saveSavedColors())}_removeSavedColor(e,t){t.stopPropagation(),this._savedColors=this._savedColors.filter(t=>t!==e),this._saveSavedColors()}_handleTextInput(e){const t=e.target.value;this.dispatchEvent(new CustomEvent("value-changed",{bubbles:!0,composed:!0,detail:{value:t}}))}render(){const e=this.value||"transparent",t=this.label||"color";return ne`
      <div class="color">
        <button
          type="button"
          class="swatch"
          aria-label=${`Pick ${t.toLowerCase()}`}
          title="Open color picker"
          @click=${this._openModal}
        >
          <span class="swatch-fill"><span style="background: ${e}"></span></span>
        </button>
        <input
          class="input mono"
          type="text"
          spellcheck="false"
          .value=${this.value||""}
          placeholder="#rrggbb or var(--name)"
          aria-label=${t}
          @input=${this._handleTextInput}
        />
      </div>
      ${this._isOpen?this._renderModal():ae}
    `}_renderModal(){const e=this._hsvaToRgb(this._hsva),t=`hsl(${this._hsva.h}, 100%, 50%)`,i=this._hexInput.startsWith("var(")?this._hexInput:this._hsvaToRgbaString(this._hsva);return ne`
      <div class="mc-picker-overlay" @click=${()=>{this._modalCtrl.consumeDragFlag()||this._closeModal()}}>
        <div class="mc-picker-modal" role="dialog" @keydown=${ns(()=>this._closeModal())} aria-label="Color picker" @click=${e=>e.stopPropagation()}>
          ${rs("Color picker",this._modalCtrl,()=>this._closeModal())}

          <div class="mc-color-body">
            <div
              class="mc-color-area"
              style="background: ${t}"
              @pointerdown=${this._handleAreaPointerDown}
              @pointermove=${this._handlePointerMove}
              @pointerup=${this._handlePointerUp}
            >
              <div class="mc-color-area-gradient"></div>
              <div
                class="mc-color-area-pointer"
                style="left: ${this._hsva.s}%; top: ${100-this._hsva.v}%; background: ${i}"
              ></div>
            </div>

            <div class="mc-slider-row">
              <span class="mc-slider-label">H</span>
              <div
                class="mc-slider-track mc-hue-track"
                @pointerdown=${this._handleHuePointerDown}
                @pointermove=${this._handlePointerMove}
                @pointerup=${this._handlePointerUp}
              >
                <div
                  class="mc-slider-thumb"
                  style="left: ${this._hsva.h/360*100}%; background: ${t}"
                ></div>
              </div>
              <input
                class="input"
                type="text"
                inputmode="numeric"
                aria-label="Hue"
                .value=${Math.round(this._hsva.h).toString()}
                @input=${e=>{const t=parseInt(e.target.value)||0;this._hsva={...this._hsva,h:Math.max(0,Math.min(360,t))},this._hexInput=this._hsvaToHex(this._hsva)}}
              />
            </div>

            <div class="mc-slider-row">
              <span class="mc-slider-label">A</span>
              <div
                class="mc-slider-track mc-opacity-track"
                @pointerdown=${this._handleOpacityPointerDown}
                @pointermove=${this._handlePointerMove}
                @pointerup=${this._handlePointerUp}
              >
                <div
                  class="mc-opacity-gradient"
                  style="background: linear-gradient(to right, transparent, ${this._hsvaToHex({...this._hsva,a:1})})"
                ></div>
                <div
                  class="mc-slider-thumb"
                  style="left: ${100*this._hsva.a}%"
                ></div>
              </div>
              <input
                class="input"
                type="text"
                inputmode="numeric"
                aria-label="Opacity percent"
                .value=${Math.round(100*this._hsva.a).toString()}
                @input=${e=>{const t=parseInt(e.target.value)||0;this._hsva={...this._hsva,a:Math.max(0,Math.min(100,t))/100},this._hexInput=this._hsvaToHex(this._hsva)}}
              />
            </div>

            <div class="mc-input-row">
              <label class="field">
                <span class="lbl">Hex</span>
                <input class="input" type="text" spellcheck="false" .value=${this._hexInput} @input=${this._handleHexInput} />
              </label>
              <label class="field">
                <span class="lbl">R</span>
                <input class="input" type="text" .value=${e.r.toString()} readonly />
              </label>
              <label class="field">
                <span class="lbl">G</span>
                <input class="input" type="text" .value=${e.g.toString()} readonly />
              </label>
              <label class="field">
                <span class="lbl">B</span>
                <input class="input" type="text" .value=${e.b.toString()} readonly />
              </label>
            </div>

            <div class="mc-color-section">
              <span class="mc-color-section-header">Presets</span>
              <div class="mc-color-grid">
                ${Vs.map(e=>ne`
                  <button
                    type="button"
                    class="mc-color-swatch ${e.startsWith("var(")?"var-color":""}"
                    style="background: ${e}"
                    title=${e}
                    aria-label=${e}
                    @click=${()=>this._selectPreset(e)}
                  >${e.startsWith("var(")?"var":""}</button>
                `)}
              </div>
            </div>

            <div class="mc-color-section">
              <span class="mc-color-section-header">Saved colors</span>
              <div class="mc-saved-colors">
                ${this._savedColors.map(e=>ne`
                  <div class="mc-saved-swatch" style="background: ${e}">
                    <button
                      type="button"
                      class="mc-saved-pick"
                      title=${e}
                      aria-label=${`Use ${e}`}
                      @click=${()=>this._selectPreset(e)}
                    ></button>
                    <button
                      type="button"
                      class="mc-remove-btn"
                      aria-label=${`Remove ${e}`}
                      @click=${t=>this._removeSavedColor(e,t)}
                    >
                      <ha-icon icon="mdi:close"></ha-icon>
                    </button>
                  </div>
                `)}
                <button
                  type="button"
                  class="icon-btn sm"
                  title="Save current color"
                  aria-label="Save current color"
                  @click=${this._addSavedColor}
                >
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>
            </div>
          </div>
          <div class="mc-picker-footer">
            <button type="button" class="btn btn-secondary" @click=${this._closeModal}>Cancel</button>
            <button type="button" class="btn btn-primary" @click=${this._handleSave}>Save</button>
          </div>
          ${os(this._modalCtrl)}
        </div>
      </div>
    `}};Ws.styles=[Re,tt,ct],Gs([Te({type:String})],Ws.prototype,"value",void 0),Gs([Te({type:String})],Ws.prototype,"label",void 0),Gs([Me()],Ws.prototype,"_isOpen",void 0),Gs([Me()],Ws.prototype,"_hsva",void 0),Gs([Me()],Ws.prototype,"_savedColors",void 0),Gs([Me()],Ws.prototype,"_hexInput",void 0),Ws=Gs([ke("mc-color-picker")],Ws);var Ks=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};const Qs=["px","em","rem","%","vw","vh","auto"];let Ys=class extends _e{constructor(){super(...arguments),this.value="",this.label="",this.placeholder="",this.disabled=!1}get _units(){return this.units?.length?this.units:Qs}_parseValue(){const e="auto"===this._units[0]?"px":this._units[0];if(!this.value)return{number:"",unit:e};if("auto"===this.value)return{number:"",unit:"auto"};const t=this._units.filter(e=>"auto"!==e).sort((e,t)=>t.length-e.length),i=this.value.match(new RegExp(`^(-?[\\d.]+)\\s*(${t.join("|")})?$`));return i?{number:i[1],unit:i[2]||e}:{number:this.value,unit:e}}_emitChange(e,t){let i="";"auto"===t?i="auto":e&&(i=`${e}${t}`),this.dispatchEvent(new CustomEvent("value-changed",{bubbles:!0,composed:!0,detail:{value:i}}))}render(){const{number:e,unit:t}=this._parseValue();return ne`
      <div class="unit">
        <input
          class="input"
          type="text"
          inputmode="decimal"
          aria-label=${this.label||ae}
          .value=${"auto"===t?"":e}
          placeholder=${this.placeholder||"0"}
          ?disabled=${this.disabled||"auto"===t}
          @input=${e=>{const i=e.target.value;this._emitChange(i,t)}}
        />
        <div class="select">
          <select
            class="input"
            aria-label=${this.label?`${this.label} unit`:"Unit"}
            .value=${t}
            ?disabled=${this.disabled}
            @change=${t=>{const i=t.target.value;this._emitChange(e,i)}}
          >
            ${this._units.map(e=>ne`<option value=${e} ?selected=${t===e}>${e}</option>`)}
          </select>
          <ha-icon icon="mdi:chevron-down"></ha-icon>
        </div>
      </div>
    `}};Ys.styles=[Re,v`
      :host {
        display: block;
        min-width: 0;
      }
    `],Ks([Te({type:String})],Ys.prototype,"value",void 0),Ks([Te({type:String})],Ys.prototype,"label",void 0),Ks([Te({type:String})],Ys.prototype,"placeholder",void 0),Ks([Te({type:Boolean})],Ys.prototype,"disabled",void 0),Ks([Te({attribute:!1})],Ys.prototype,"units",void 0),Ys=Ks([ke("mc-unit-field")],Ys);var Xs=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};let Zs=class extends _e{constructor(){super(...arguments),this.value="",this.mediaType="",this._modalCtrl=new is(this),this._showModal=!1,this._searchQuery="",this._items=[],this._loading=!1,this._error="",this._breadcrumbs=[],this._selectedItem=null}_onInputChange(e){const t=e.target.value;this.value=t,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:t},bubbles:!0,composed:!0}))}_openModal(){this._showModal=!0,this._searchQuery="",this._selectedItem=null,this._breadcrumbs=[{title:"Media",media_content_id:""}],this._browseMedia("")}_closeModal(){this._modalCtrl.reset(),this._showModal=!1,this._items=[],this._error=""}async _browseMedia(e){if(this.hass){this._loading=!0,this._error="",this._selectedItem=null;try{const t={type:"media_source/browse_media"};e&&(t.media_content_id=e);const i=await this.hass.callWS(t);this._items=i.children||[]}catch{this._error="No media sources available",this._items=[]}this._loading=!1}}_navigateToFolder(e){this._breadcrumbs=[...this._breadcrumbs,{title:e.title,media_content_id:e.media_content_id}],this._searchQuery="",this._browseMedia(e.media_content_id)}_navigateToBreadcrumb(e){const t=this._breadcrumbs[e];this._breadcrumbs=this._breadcrumbs.slice(0,e+1),this._searchQuery="",this._browseMedia(t.media_content_id)}_selectItem(e){this._selectedItem=e}async _handleSave(){if(this._selectedItem&&this.hass){try{const e=`url('${(await this.hass.callWS({type:"media_source/resolve_media",media_content_id:this._selectedItem.media_content_id})).url}')`;this.value=e,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:e},bubbles:!0,composed:!0}))}catch{const e=`url('${this._selectedItem.media_content_id}')`;this.value=e,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:e},bubbles:!0,composed:!0}))}this._closeModal()}else this._closeModal()}_getFilteredItems(){let e=this._items;if(this.mediaType&&(e=e.filter(e=>!!e.can_expand||this._matchesMediaType(e.media_class))),this._searchQuery){const t=this._searchQuery.toLowerCase();e=e.filter(e=>e.title.toLowerCase().includes(t))}return e}_matchesMediaType(e){const t=e.toLowerCase();return"image"===this.mediaType?"image"===t||"photo"===t||"picture"===t:"video"!==this.mediaType||("video"===t||"movie"===t||"clip"===t)}_getItemIcon(e){if(e.can_expand)return"mdi:folder";const t=e.media_class.toLowerCase();return"image"===t||"photo"===t||"picture"===t?"mdi:image":"video"===t||"movie"===t||"clip"===t?"mdi:video":"music"===t||"audio"===t||"song"===t?"mdi:music":"mdi:file"}render(){return ne`
      <div class="with-icon with-action">
        <ha-icon icon=${"video"===this.mediaType?"mdi:video-outline":"mdi:image-outline"}></ha-icon>
        <input
          type="text"
          class="input"
          .value=${this.value}
          placeholder="/local/images/background.jpg"
          aria-label="Media URL or path"
          spellcheck="false"
          @input=${this._onInputChange}
        />
        <button
          type="button"
          class="icon-btn sm field-action browse"
          aria-label="Browse media"
          title="Browse media"
          @click=${this._openModal}
        >
          <ha-icon icon="mdi:folder-open-outline"></ha-icon>
        </button>
      </div>
      ${this._showModal?this._renderModal():""}
    `}_renderModal(){const e=this._getFilteredItems();return ne`
      <div class="mc-picker-overlay" @click=${()=>{this._modalCtrl.consumeDragFlag()||this._closeModal()}}>
        <div class="mc-picker-modal" role="dialog" @keydown=${ns(()=>this._closeModal())} aria-label="Select media" @click=${e=>e.stopPropagation()}>
          ${rs("Select media",this._modalCtrl,()=>this._closeModal())}

          ${this._renderBreadcrumbs()}

          <div class="mc-picker-search">
            ${as("Filter items",this._searchQuery,e=>{this._searchQuery=e})}
          </div>

          <div class="mc-picker-list" role="listbox" aria-label="Media">
            ${this._loading?ne`<div class="mc-picker-loading">Loading...</div>`:this._error?ne`<div class="mc-picker-empty">${this._error}</div>`:e.length>0?e.map(e=>this._renderItem(e)):ne`<div class="mc-picker-empty">No items found</div>`}
          </div>
          <div class="mc-picker-footer">
            <button type="button" class="btn btn-secondary" @click=${this._closeModal}>Cancel</button>
            <button type="button" class="btn btn-primary" @click=${this._handleSave} ?disabled=${!this._selectedItem}>Save</button>
          </div>
          ${os(this._modalCtrl)}
        </div>
      </div>
    `}_renderBreadcrumbs(){return this._breadcrumbs.length<=1?ne``:ne`
      <nav class="mc-picker-breadcrumbs" aria-label="Media folders">
        ${this._breadcrumbs.map((e,t)=>t===this._breadcrumbs.length-1?ne`<span class="mc-breadcrumb-current" aria-current="page">${e.title}</span>`:ne`
            <button type="button" class="btn btn-text btn-sm" @click=${()=>this._navigateToBreadcrumb(t)}>${e.title}</button>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          `)}
      </nav>
    `}_renderItem(e){const t=this._selectedItem?.media_content_id===e.media_content_id,i=this._getItemIcon(e);return ne`
      <button
        type="button"
        role="option"
        class="mc-picker-item"
        aria-selected=${t?"true":"false"}
        @click=${()=>{e.can_expand?this._navigateToFolder(e):e.can_play&&this._selectItem(e)}}
      >
        ${e.thumbnail?ne`<img class="mc-picker-item-thumb" src=${e.thumbnail} alt="" />`:ne`<span class="mc-picker-item-icon"><ha-icon icon=${i}></ha-icon></span>`}
        <span class="mc-picker-item-content">
          <span class="mc-picker-item-name">${e.title}</span>
        </span>
        ${e.can_expand?ne`<ha-icon class="mc-picker-item-chev" icon="mdi:chevron-right"></ha-icon>`:ne`<span class="chip">${e.media_class}</span>`}
      </button>
    `}};Zs.styles=[Re,tt,ot],Xs([Te({attribute:!1})],Zs.prototype,"hass",void 0),Xs([Te({type:String})],Zs.prototype,"value",void 0),Xs([Te({type:String})],Zs.prototype,"mediaType",void 0),Xs([Me()],Zs.prototype,"_showModal",void 0),Xs([Me()],Zs.prototype,"_searchQuery",void 0),Xs([Me()],Zs.prototype,"_items",void 0),Xs([Me()],Zs.prototype,"_loading",void 0),Xs([Me()],Zs.prototype,"_error",void 0),Xs([Me()],Zs.prototype,"_breadcrumbs",void 0),Xs([Me()],Zs.prototype,"_selectedItem",void 0),Zs=Xs([ke("mc-media-picker")],Zs);var Js=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};const el=[{name:"Arial",family:"Arial, sans-serif",category:"Sans-serif",isLocal:!0},{name:"Helvetica",family:"Helvetica, sans-serif",category:"Sans-serif",isLocal:!0},{name:"Times New Roman",family:'"Times New Roman", serif',category:"Serif",isLocal:!0},{name:"Georgia",family:"Georgia, serif",category:"Serif",isLocal:!0},{name:"Courier New",family:'"Courier New", monospace',category:"Monospace",isLocal:!0},{name:"Verdana",family:"Verdana, sans-serif",category:"Sans-serif",isLocal:!0},{name:"Tahoma",family:"Tahoma, sans-serif",category:"Sans-serif",isLocal:!0},{name:"Trebuchet MS",family:'"Trebuchet MS", sans-serif',category:"Sans-serif",isLocal:!0},{name:"Comic Sans MS",family:'"Comic Sans MS", cursive',category:"Cursive",isLocal:!0},{name:"Impact",family:"Impact, sans-serif",category:"Sans-serif",isLocal:!0}],tl=[{name:"Roboto",family:"Roboto, sans-serif",category:"Sans-serif"},{name:"Open Sans",family:'"Open Sans", sans-serif',category:"Sans-serif"},{name:"Lato",family:"Lato, sans-serif",category:"Sans-serif"},{name:"Montserrat",family:"Montserrat, sans-serif",category:"Sans-serif"},{name:"Oswald",family:"Oswald, sans-serif",category:"Sans-serif"},{name:"Source Sans Pro",family:'"Source Sans Pro", sans-serif',category:"Sans-serif"},{name:"Raleway",family:"Raleway, sans-serif",category:"Sans-serif"},{name:"PT Sans",family:'"PT Sans", sans-serif',category:"Sans-serif"},{name:"Merriweather",family:"Merriweather, serif",category:"Serif"},{name:"Playfair Display",family:'"Playfair Display", serif',category:"Serif"},{name:"Lora",family:"Lora, serif",category:"Serif"},{name:"PT Serif",family:'"PT Serif", serif',category:"Serif"},{name:"Noto Sans",family:'"Noto Sans", sans-serif',category:"Sans-serif"},{name:"Ubuntu",family:"Ubuntu, sans-serif",category:"Sans-serif"},{name:"Poppins",family:"Poppins, sans-serif",category:"Sans-serif"},{name:"Nunito",family:"Nunito, sans-serif",category:"Sans-serif"},{name:"Inconsolata",family:"Inconsolata, monospace",category:"Monospace"},{name:"Fira Code",family:'"Fira Code", monospace',category:"Monospace"},{name:"Source Code Pro",family:'"Source Code Pro", monospace',category:"Monospace"},{name:"Dancing Script",family:'"Dancing Script", cursive',category:"Cursive"}];let il=class extends _e{constructor(){super(...arguments),this.value="",this._modalCtrl=new is(this),this._showModal=!1,this._searchQuery="",this._selectedFont=null,this._activeTab="local"}_onInputChange(e){const t=e.target.value;this.value=t,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:t},bubbles:!0,composed:!0}))}_openModal(){this._showModal=!0,this._searchQuery="",this._selectedFont=null}_closeModal(){this._modalCtrl.reset(),this._showModal=!1}_selectFont(e){this._selectedFont=e}_handleSave(){if(!this._selectedFont)return void this._closeModal();const e=this._selectedFont.family;this.value=e,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:e},bubbles:!0,composed:!0})),this._closeModal()}_getFilteredFonts(){const e="local"===this._activeTab?el:tl;if(!this._searchQuery)return e;const t=this._searchQuery.toLowerCase();return e.filter(e=>e.name.toLowerCase().includes(t)||e.category.toLowerCase().includes(t))}_getFontIcon(e){switch(e.toLowerCase()){case"serif":default:return"mdi:format-font";case"sans-serif":return"mdi:format-text";case"monospace":return"mdi:code-tags";case"cursive":return"mdi:script-text"}}render(){return ne`
      <div class="mc-picker-row">
        <input
          type="text"
          class="input"
          .value=${this.value}
          placeholder="Font family"
          aria-label="Font family"
          @input=${this._onInputChange}
        />
        <button type="button" class="btn btn-secondary" @click=${this._openModal}>Browse</button>
      </div>
      ${this._showModal?this._renderModal():ae}
    `}_setTab(e){this._activeTab=e,this._searchQuery=""}_renderModal(){const e=this._getFilteredFonts();return ne`
      <div class="mc-picker-overlay" @click=${()=>{this._modalCtrl.consumeDragFlag()||this._closeModal()}}>
        <div class="mc-picker-modal" role="dialog" @keydown=${ns(()=>this._closeModal())} aria-label="Select font" @click=${e=>e.stopPropagation()}>
          ${rs("Select font",this._modalCtrl,()=>this._closeModal())}

          <div class="mc-picker-search">
            <div class="seg full" role="tablist" aria-label="Font source">
              <button
                type="button"
                role="tab"
                aria-selected=${"local"===this._activeTab?"true":"false"}
                @click=${()=>this._setTab("local")}
              >
                <ha-icon icon="mdi:desktop-classic"></ha-icon>
                Local fonts
              </button>
              <button
                type="button"
                role="tab"
                aria-selected=${"google"===this._activeTab?"true":"false"}
                @click=${()=>this._setTab("google")}
              >
                <ha-icon icon="mdi:google"></ha-icon>
                Google Fonts
              </button>
            </div>
            ${as("Search fonts",this._searchQuery,e=>{this._searchQuery=e})}
          </div>

          ${this._selectedFont?this._renderPreview():ae}

          <div class="mc-picker-list" role="listbox" aria-label="Fonts">
            ${e.length>0?e.map(e=>this._renderFontItem(e)):ne`<div class="mc-picker-empty">No fonts found</div>`}
          </div>
          <div class="mc-picker-footer">
            <button type="button" class="btn btn-secondary" @click=${this._closeModal}>Cancel</button>
            <button type="button" class="btn btn-primary" @click=${this._handleSave} ?disabled=${!this._selectedFont}>Save</button>
          </div>
          ${os(this._modalCtrl)}
        </div>
      </div>
    `}_renderPreview(){return this._selectedFont?ne`
      <div class="mc-font-preview">
        <div class="mc-font-preview-text" style="font-family: ${this._selectedFont.family}">
          The quick brown fox jumps over the lazy dog
        </div>
      </div>
    `:ne``}_renderFontItem(e){const t=this._selectedFont?.name===e.name;return ne`
      <button
        type="button"
        role="option"
        class="mc-picker-item"
        aria-selected=${t?"true":"false"}
        @click=${()=>this._selectFont(e)}
      >
        <span class="mc-picker-item-icon"><ha-icon icon=${this._getFontIcon(e.category)}></ha-icon></span>
        <span class="mc-picker-item-content">
          <span class="mc-picker-item-name" style="font-family: ${e.family}">${e.name}</span>
          <span class="mc-picker-item-meta">${e.category}</span>
        </span>
        <span class="chip">${e.isLocal?"Local":"Google"}</span>
      </button>
    `}};il.styles=[Re,tt,st],Js([Te({attribute:!1})],il.prototype,"hass",void 0),Js([Te({type:String})],il.prototype,"value",void 0),Js([Me()],il.prototype,"_showModal",void 0),Js([Me()],il.prototype,"_searchQuery",void 0),Js([Me()],il.prototype,"_selectedFont",void 0),Js([Me()],il.prototype,"_activeTab",void 0),il=Js([ke("mc-font-picker")],il);var nl=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};let rl=class extends _e{constructor(){super(...arguments),this.value="",this.label="Entity",this.domain="",this._modalCtrl=new is(this),this._showModal=!1,this._searchQuery="",this._selectedEntityId=""}_openModal(){this._selectedEntityId=this.value,this._showModal=!0,this._searchQuery=""}_closeModal(){this._modalCtrl.reset(),this._showModal=!1}_handleSave(){this.value=this._selectedEntityId,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:this._selectedEntityId},bubbles:!0,composed:!0})),this._closeModal()}_selectEntity(e){this._selectedEntityId=e,this._searchQuery=e}_onInputChange(e){const t=e.target.value;this.value=t,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:t},bubbles:!0,composed:!0}))}_getFilteredEntities(){if(!this.hass)return[];const e=Object.entries(this.hass.states).filter(([e])=>!(this.domain&&!e.startsWith(this.domain+"."))).map(([e,t])=>({id:e,name:t.attributes.friendly_name||e,state:this.hass.formatEntityState(t),icon:t.attributes.icon||this._domainIcon(e.split(".")[0])})).filter(e=>{if(!this._searchQuery)return!0;const t=this._searchQuery.toLowerCase();return e.id.toLowerCase().includes(t)||e.name.toLowerCase().includes(t)}).sort((e,t)=>e.name.localeCompare(t.name));return e.slice(0,100)}_getEntityInfo(){if(!this.hass||!this.value)return null;const e=this.hass.states[this.value];if(!e)return null;return{name:e.attributes.friendly_name||this.value,icon:e.attributes.icon||this._domainIcon(this.value.split(".")[0]),state:e.state,stateText:this.hass.formatEntityState(e)}}_dotClass(e){return"unavailable"===e||"unknown"===e?"dot is-unavailable":"off"===e||"closed"===e||"not_home"===e||"idle"===e?"dot is-off":"dot"}_domainIcon(e){return{light:"mdi:lightbulb",switch:"mdi:toggle-switch",sensor:"mdi:eye",binary_sensor:"mdi:checkbox-marked-circle",climate:"mdi:thermostat",cover:"mdi:window-shutter",fan:"mdi:fan",media_player:"mdi:cast",camera:"mdi:video",lock:"mdi:lock",automation:"mdi:robot",script:"mdi:script-text",scene:"mdi:palette",input_boolean:"mdi:toggle-switch-outline",input_number:"mdi:ray-vertex",input_select:"mdi:format-list-bulleted",input_text:"mdi:form-textbox",person:"mdi:account",weather:"mdi:weather-partly-cloudy",sun:"mdi:white-balance-sunny",vacuum:"mdi:robot-vacuum",water_heater:"mdi:water-boiler",humidifier:"mdi:air-humidifier",alarm_control_panel:"mdi:shield-home"}[e]||"mdi:help-circle"}render(){const e=this._getEntityInfo(),t=e?.icon||(this.value.includes(".")?this._domainIcon(this.value.split(".")[0]):"mdi:shape-outline");return ne`
      <div class="with-icon with-action">
        <ha-icon icon=${t}></ha-icon>
        <input
          type="text"
          class="input mono"
          .value=${this.value}
          placeholder="entity_id"
          aria-label=${this.label}
          spellcheck="false"
          @input=${this._onInputChange}
        />
        <button
          type="button"
          class="icon-btn sm field-action browse"
          aria-label="Browse entities"
          title="Browse entities"
          @click=${this._openModal}
        >
          <ha-icon icon="mdi:magnify"></ha-icon>
        </button>
      </div>
      ${e?ne`
            <p class="entity-meta">
              <span class=${this._dotClass(e.state)}></span>
              <span>${e.name} · ${e.stateText}</span>
            </p>
          `:""}

      ${this._showModal?this._renderModal():""}
    `}_renderModal(){const e=this._getFilteredEntities();return ne`
      <div class="mc-picker-overlay" @click=${()=>{this._modalCtrl.consumeDragFlag()||this._closeModal()}}>
        <div class="mc-picker-modal" role="dialog" @keydown=${ns(()=>this._closeModal())} aria-label="Select entity" @click=${e=>e.stopPropagation()}>
          ${rs("Select entity",this._modalCtrl,()=>this._closeModal())}
          <div class="mc-picker-search">
            ${as("Search entities",this._searchQuery,e=>{this._searchQuery=e})}
          </div>
          <div class="mc-picker-list" role="listbox" aria-label="Entities">
            ${e.length>0?e.map(e=>ne`
                  <button
                    type="button"
                    role="option"
                    class="mc-picker-item"
                    aria-selected=${this._selectedEntityId===e.id?"true":"false"}
                    @click=${()=>this._selectEntity(e.id)}
                  >
                    <span class="mc-picker-item-icon"><ha-icon icon=${e.icon}></ha-icon></span>
                    <span class="mc-picker-item-content">
                      <span class="mc-picker-item-name">${e.name}</span>
                      <span class="mc-picker-item-id">${e.id}</span>
                    </span>
                    <span class="chip">${e.state}</span>
                  </button>
                `):ne`<div class="mc-picker-empty">No entities found</div>`}
          </div>
          <div class="mc-picker-footer">
            <button type="button" class="btn btn-secondary" @click=${this._closeModal}>Cancel</button>
            <button type="button" class="btn btn-primary" @click=${this._handleSave}>Save</button>
          </div>
          ${os(this._modalCtrl)}
        </div>
      </div>
    `}};rl.styles=[Re,tt],nl([Te({attribute:!1})],rl.prototype,"hass",void 0),nl([Te({type:String})],rl.prototype,"value",void 0),nl([Te({type:String})],rl.prototype,"label",void 0),nl([Te({type:String})],rl.prototype,"domain",void 0),nl([Me()],rl.prototype,"_showModal",void 0),nl([Me()],rl.prototype,"_searchQuery",void 0),nl([Me()],rl.prototype,"_selectedEntityId",void 0),rl=nl([ke("mc-entity-picker")],rl);var al=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};const ol=[{value:"state",label:"State"},{value:"attribute",label:"Attribute"},{value:"time",label:"Time"},{value:"template",label:"Template"}];let sl=class extends _e{render(){if(!this.condition)return ne``;const e=this.condition;return ne`
      <div class="cond">
        <div class="cond-head">
          <div class="select">
            <select
              class="input"
              aria-label="Condition type"
              @change=${e=>this.onChange?.({type:e.target.value})}
            >
              ${ol.map(t=>ne`<option value=${t.value} ?selected=${e.type===t.value}>${t.label}</option>`)}
            </select>
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </div>
          <button
            type="button"
            class="icon-btn sm danger"
            aria-label="Remove condition"
            title="Remove condition"
            @click=${()=>this.onRemove?.()}
          >
            <ha-icon icon="mdi:delete-outline"></ha-icon>
          </button>
        </div>
        ${this._renderFields(e)}
      </div>
    `}_textField(e,t,i,n="text"){return ne`
      <label class="field">
        <span class="field-head"><span class="lbl">${e}</span></span>
        <input
          class="input"
          type=${n}
          .value=${t||""}
          @input=${e=>i(e.target.value)}
        />
      </label>
    `}_renderFields(e){switch(e.type){case"state":case"attribute":{const t=!1!==e.use_module_entity,i=t?this.moduleEntity||e.entity||"":e.entity||"";return ne`
          ${this.moduleEntity?ne`
                <div class="switch-row">
                  <span class="txt">Use module entity</span>
                  <button
                    type="button"
                    class="switch"
                    role="switch"
                    aria-checked=${t?"true":"false"}
                    aria-label="Use module entity"
                    @click=${()=>this.onChange?.({use_module_entity:!t})}
                  ></button>
                </div>
              `:ae}
          ${t&&this.moduleEntity?ae:ne`
                <div class="field">
                  <div class="field-head"><span class="lbl">Entity</span></div>
                  <mc-entity-picker
                    .hass=${this.hass}
                    .value=${e.entity||""}
                    @value-changed=${e=>this.onChange?.({entity:e.detail.value})}
                  ></mc-entity-picker>
                </div>
              `}
          ${"attribute"===e.type?ne`
                <div class="field">
                  <div class="field-head"><span class="lbl">Attribute</span></div>
                  <mc-attribute-picker
                    .hass=${this.hass}
                    .value=${e.attribute||""}
                    .entityId=${i}
                    @value-changed=${e=>this.onChange?.({attribute:e.detail.value})}
                  ></mc-attribute-picker>
                </div>
              `:ae}
          <div class="two">
            ${this._textField("Equals",e.state,e=>this.onChange?.({state:e}))}
            ${this._textField("Not equals",e.state_not,e=>this.onChange?.({state_not:e}))}
          </div>
        `}case"time":return ne`
          <div class="two">
            ${this._textField("After",e.after,e=>this.onChange?.({after:e}),"time")}
            ${this._textField("Before",e.before,e=>this.onChange?.({before:e}),"time")}
          </div>
        `;case"template":return ne`
          <label class="field">
            <span class="field-head"><span class="lbl">Template</span></span>
            <textarea
              class="input"
              rows="3"
              placeholder="{{ states('sensor.example') == 'on' }}"
              .value=${e.template||""}
              @input=${e=>this.onChange?.({template:e.target.value})}
            ></textarea>
          </label>
        `;default:return ne``}}};sl.styles=[Re,v`
      :host {
        display: block;
      }
      .cond-head .select {
        flex: 1;
      }
    `],al([Te({attribute:!1})],sl.prototype,"condition",void 0),al([Te({attribute:!1})],sl.prototype,"hass",void 0),al([Te({attribute:!1})],sl.prototype,"moduleEntity",void 0),al([Te({attribute:!1})],sl.prototype,"onChange",void 0),al([Te({attribute:!1})],sl.prototype,"onRemove",void 0),sl=al([ke("mc-condition-row")],sl);var ll=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};const cl=[{value:"always",label:"Always"},{value:"entity_on",label:"While entity is on"},{value:"state",label:"While state equals…"}],dl=[{value:"normal",label:"Normal"},{value:"reverse",label:"Reverse"},{value:"alternate",label:"Alternate"},{value:"alternate-reverse",label:"Alternate reverse"}],pl=["infinite","1","2","3","5"];let ul=class extends _e{constructor(){super(...arguments),this.animations=[],this.allowIcon=!1,this.allowTrigger=!1,this._custom=new Set}_write(e){this.onChange?.(e)}_update(e,t){this._write(this.animations.map((i,n)=>n===e?t:i))}_patch(e,t){const i={...this.animations[e],...t};for(const[e,n]of Object.entries(t))void 0!==n&&""!==n||delete i[e];this._update(e,i)}_add(){this._write([...this.animations,li(He[0].id,Gt("anim"))])}_remove(e){this._write(this.animations.filter((t,i)=>i!==e))}_field(e,t,i){return ne`
      <div class="field">
        <div class="field-head">${i?ne`<label for=${i}>${e}</label>`:ne`<span class="lbl">${e}</span>`}</div>
        ${t}
      </div>
    `}_select(e,t,i,n){return ne`
      <div class="select">
        <select class="input" id=${e} @change=${e=>n(e.target.value)}>
          ${i.map(e=>ne`<option value=${e.value} ?selected=${e.value===t}>${e.label}</option>`)}
        </select>
        <ha-icon icon="mdi:chevron-down"></ha-icon>
      </div>
    `}_presetSelect(e,t,i){const n=!!Ve(i);return ne`
      <div class="select">
        <select
          class="input"
          id=${e}
          @change=${e=>this._update(t,ci(this.animations[t],e.target.value))}
        >
          ${n?ae:ne`<option value=${i} selected>${i} (unknown)</option>`}
          ${Ge.map(e=>ne`<optgroup label=${e}>
              ${He.filter(t=>t.group===e).map(e=>ne`<option value=${e.id} ?selected=${e.id===i}>${e.name}</option>`)}
            </optgroup>`)}
        </select>
        <ha-icon icon="mdi:chevron-down"></ha-icon>
      </div>
    `}_target(e,t){const i="icon"===t.target?"icon":"module",n=t=>this._patch(e,{target:t});return ne`
      <div class="seg full" role="radiogroup" aria-label="Target" @keydown=${e=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key))return;e.preventDefault();const t="module"===i?"icon":"module",r=e.currentTarget;n(t),requestAnimationFrame(()=>r.querySelector(`[data-val="${t}"]`)?.focus())}}>
        ${[{value:"module",label:"Module"},{value:"icon",label:"Icon"}].map(e=>{const t=e.value===i;return ne`<button
            type="button"
            role="radio"
            data-val=${e.value}
            aria-checked=${t?"true":"false"}
            tabindex=${t?"0":"-1"}
            @click=${()=>n(e.value)}
          >${e.label}</button>`})}
      </div>
    `}_repeat(e,t,i){const n=t.iterations??Ve(t.preset)?.defaults.iterations??"infinite",r=this._custom.has(t.id)||!pl.includes(String(n)),a=[...pl.map(e=>({value:e,label:"infinite"===e?"Infinite":e})),{value:"custom",label:"Custom"}];return this._field("Repeat",this._select(i,r?"custom":String(n),a,i=>{const r=new Set(this._custom);if("custom"===i)return r.add(t.id),this._custom=r,void("infinite"===n&&this._patch(e,{iterations:10}));r.delete(t.id),this._custom=r,this._patch(e,{iterations:"infinite"===i?"infinite":Number(i)})}),i)}_block(e,t,i){const n=Ve(e.preset),r=n?.defaults,a=e=>`an-${t}-${e}`,o=e.trigger??"always",s=e.iterations??r?.iterations??"infinite",l=this._custom.has(e.id)||!pl.includes(String(s)),c=e.easing??r?.easing??"ease",d=Le.map(e=>({value:e.id,label:e.label}));return Le.some(e=>e.id===c)||d.push({value:c,label:c}),ne`
      <div class="cond">
        <div class="cond-head">
          <span class="n">Animation ${t+1} <span class="sub">· ${n?.name??e.preset}</span></span>
          <button
            type="button"
            class="icon-btn sm danger"
            aria-label="Delete animation ${t+1}"
            title="Delete animation"
            @click=${()=>this._remove(t)}
          >
            <ha-icon icon="mdi:delete-outline"></ha-icon>
          </button>
        </div>
        ${i?ne`<p class="help anim-note">${i}</p>`:ae}
        ${this._field("Preset",this._presetSelect(a("preset"),t,e.preset),a("preset"))}
        ${this.allowIcon?this._field("Target",this._target(t,e)):ae}
        ${this.allowTrigger?this._field("Play",this._select(a("play"),o,cl,e=>this._patch(t,{trigger:e})),a("play")):ae}
        ${this.allowTrigger&&"state"===o?this._field("State value",ne`<input
                class="input"
                id=${a("state")}
                type="text"
                .value=${e.state||""}
                @input=${e=>this._patch(t,{state:e.target.value})}
              />`,a("state")):ae}
        ${this._field("Color",ne`<mc-color-picker
            .value=${e.color||""}
            .label=${"Animation color"}
            @value-changed=${e=>this._patch(t,{color:e.detail.value})}
          ></mc-color-picker>`)}
        ${n&&Ie(n)?this._field("Strength (%)",ne`<input
                class="input"
                id=${a("strength")}
                type="number"
                min="0"
                max="100"
                step="5"
                .value=${String(e.strength??100)}
                @input=${e=>{const i=e.target.value;this._patch(t,{strength:""===i?void 0:Number(i)})}}
              />`,a("strength")):ae}
        <div class="two">
          ${this._field("Duration",this._time(t,"duration",e.duration??r?.duration,r?.duration))}
          ${this._field("Delay",this._time(t,"delay",e.delay??r?.delay,r?.delay))}
        </div>
        <div class="two">
          ${this._field("Easing",this._select(a("easing"),c,d,e=>this._patch(t,{easing:e})),a("easing"))}
          ${this._repeat(t,e,a("repeat"))}
        </div>
        ${l?this._field("Repeat count",ne`<input
                class="input"
                id=${a("count")}
                type="number"
                min="1"
                step="1"
                .value=${"number"==typeof s?String(s):""}
                @input=${e=>{const i=Number(e.target.value);Number.isFinite(i)&&i>0&&this._patch(t,{iterations:i})}}
              />`,a("count")):ae}
        <div class="two">
          ${this._field("Direction",this._select(a("dir"),e.direction??r?.direction??"normal",dl,e=>this._patch(t,{direction:e})),a("dir"))}
          ${n?this._field((e=>e.intensity.unit?`${e.intensity.label} (${e.intensity.unit})`:e.intensity.label)(n),ne`<input
                  class="input"
                  id=${a("int")}
                  type="number"
                  min=${n.intensity.min}
                  max=${n.intensity.max}
                  step=${n.intensity.step??1}
                  .value=${String(e.intensity??n.defaults.intensity)}
                  @input=${e=>{const i=e.target.value;this._patch(t,{intensity:""===i?void 0:Number(i)})}}
                />`,a("int")):ae}
        </div>
        ${n?ne`<div class="foot">
              <button type="button" class="btn btn-text btn-sm" @click=${()=>{return this._update(t,ci(i=e,i.preset));var i}}>
                <ha-icon icon="mdi:restore"></ha-icon>Reset to preset
              </button>
            </div>`:ae}
      </div>
    `}_time(e,t,i,n){return ne`<mc-unit-field
      .value=${i??""}
      .label=${"duration"===t?"Duration":"Delay"}
      .units=${["s","ms"]}
      .placeholder=${(n??"0s").replace(/m?s$/,"")}
      @value-changed=${i=>this._patch(e,{[t]:i.detail.value})}
    ></mc-unit-field>`}render(){const e=function(e,t={}){const i=!1!==t.allowIcon;return e.map((t,n)=>{const r=Ve(t.preset);if(!r)return;const a=mi(r.channels,gi(t,i));for(let o=n-1;o>=0;o--){const n=Ve(e[o].preset);if(!n||gi(e[o],i)!==gi(t,i))continue;const s=mi(n.channels,gi(e[o],i)).find(e=>a.includes(e));if(!s)continue;const l=r.channels.includes("glow")||n.channels.includes("glow"),c="filter"===s&&l?"glow":hi[s];return`Overrides ${n.name}: both animate the ${c}`}})}(this.animations,{allowIcon:this.allowIcon});return ne`
      <div class="list">
        ${this.animations.map((t,i)=>this._block(t,i,e[i]))}
        <div>
          <button type="button" class="btn btn-text btn-sm" @click=${()=>this._add()}>
            <ha-icon icon="mdi:plus"></ha-icon>Add animation
          </button>
        </div>
      </div>
    `}};ul.styles=[Re,v`
      :host {
        display: block;
        min-width: 0;
      }
      .list {
        display: grid;
        gap: 12px;
      }
      .cond-head .n .sub {
        font-weight: 400;
        color: var(--mc-text-2);
      }
      .foot {
        display: flex;
        justify-content: flex-start;
      }
    `],ll([Te({attribute:!1})],ul.prototype,"animations",void 0),ll([Te({type:Boolean})],ul.prototype,"allowIcon",void 0),ll([Te({type:Boolean})],ul.prototype,"allowTrigger",void 0),ll([Te({attribute:!1})],ul.prototype,"onChange",void 0),ll([Me()],ul.prototype,"_custom",void 0),ul=ll([ke("mc-animation-list")],ul);var hl=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};const ml={box_shadow:"0 2px 8px rgba(0, 0, 0, .12)",text_shadow:"0 1px 2px rgba(0, 0, 0, .3)",transition:"all 0.2s ease-out",transform:"scale(1.02)"};let gl=class extends _e{constructor(){super(...arguments),this.design={},this.hasTemplate=!1,this.notSynced=[],this.moduleEntity="",this.target="module",this.moduleType="",this._openSectors=new Set,this._searchQuery="",this._activeView="default",this._pasteMenu=!1,this._clipStatus="",this._onOutsidePaste=e=>{const t=this.shadowRoot?.querySelector(".design-clip");t&&e.composedPath().includes(t)||this._closePasteMenu(!1)}}_getActiveRule(){if("default"!==this._activeView)return this.design.conditional?.find(e=>e.id===this._activeView)}_getActiveDesign(){const e=this._getActiveRule();return e?e.design:this.design}_getValue(e){return this._getActiveDesign()[e]||""}_isSet(e){const t=this._getActiveDesign();return"animations"===e.type?di(t).length>0:wt(e.key).some(e=>void 0!==t[e]&&""!==t[e])}_keysOf(e){return"animations"===e.type?Object.keys(pi([])):wt(e.key)}_reset(e){const t=e.flatMap(e=>this._keysOf(e)),i=this._getActiveRule();if(i){const e={...i.design};for(const i of t)delete e[i];return void this._updateRule(i.id,{design:e})}const n=Object.fromEntries(t.map(e=>[e,void 0]));this.hasTemplate&&(n._markNotSynced=1===e.length?e[0].key:e.map(e=>e.key)),this.onChange(n)}_handlePropertyChange(e,t){const i=this._getActiveRule();if(i){const n={...i.design,[e]:t||void 0};return void this._updateRule(i.id,{design:n})}const n={[e]:t||void 0};this.hasTemplate&&(n._markNotSynced=e),this.onChange(n)}_handleAnimationsChange(e){const t=pi(e),i=this._getActiveRule();if(i){const e={...i.design,...t};for(const i of Object.keys(t))void 0===e[i]&&delete e[i];return void this._updateRule(i.id,{design:e})}this.hasTemplate&&(t._markNotSynced="animations"),this.onChange(t)}_handleSyncToggle(e,t){t?this.onChange({_markNotSynced:e}):this.onChange({_markSynced:e})}_toggleSector(e){const t=new Set(this._openSectors);t.has(e)?t.delete(e):t.add(e),this._openSectors=t}_countSetProperties(e){const t=this._getActiveDesign();return e.properties.filter(e=>"animations"===e.type?di(t).length>0:wt(e.key).some(e=>void 0!==t[e]&&""!==t[e])).length}_isVisible(e){const t={...this.design,...this._getActiveDesign()};return!bt[e.key]||!!t[bt[e.key]]}_filterProperties(e){const t=e.filter(e=>this._isVisible(e));if(!this._searchQuery)return t;const i=this._searchQuery.toLowerCase();return t.filter(e=>e.label.toLowerCase().includes(i)||e.cssProperty.toLowerCase().includes(i)||e.key.toLowerCase().includes(i)||(yt[e.key]||[]).some(e=>e.cssProperty.includes(i)||e.key.includes(i)))}_announce(e){this._clipStatus=e,window.clearTimeout(this._clipTimer),this._clipTimer=window.setTimeout(()=>this._clipStatus="",2500)}_copyDesign(){jo(this.design),this._announce("Design copied")}_pasteDesign(e){this._closePasteMenu(!0);const t=Bo();if(!t)return;const i=qo(this.design,t,e),n=function(e,t){const i={};for(const n of Object.keys(e||{}))n in t||(i[n]=void 0);return Object.assign(i,t)}(this.design,i),r=this.design,a=Object.keys(n).filter(e=>JSON.stringify(r[e])!==JSON.stringify(n[e]));this.hasTemplate&&a.length&&(n._markNotSynced=a),this._activeView="default",this.onChange(n),this._announce("Design pasted")}_openPasteMenu(){this._pasteMenu?this._closePasteMenu(!0):(this._pasteMenu=!0,document.addEventListener("pointerdown",this._onOutsidePaste,!0),this.updateComplete.then(()=>this.shadowRoot?.querySelector('.design-clip [role="menuitem"]')?.focus()))}_closePasteMenu(e){document.removeEventListener("pointerdown",this._onOutsidePaste,!0),this._pasteMenu&&(this._pasteMenu=!1,e&&this.updateComplete.then(()=>this.shadowRoot?.querySelector(".design-clip .paste")?.focus()))}_onPasteMenuKey(e){if("Escape"===e.key)return e.preventDefault(),e.stopPropagation(),void this._closePasteMenu(!0);if("Tab"===e.key)return this._closePasteMenu(!1);if("ArrowDown"!==e.key&&"ArrowUp"!==e.key)return;e.preventDefault();const t=[...this.shadowRoot?.querySelectorAll('.design-clip [role="menuitem"]')||[]],i=t.indexOf(this.shadowRoot?.activeElement);t[(i+("ArrowDown"===e.key?1:-1)+t.length)%t.length]?.focus()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("pointerdown",this._onOutsidePaste,!0),window.clearTimeout(this._clipTimer)}_renderClipboard(){const e=!!Bo();return ne`
      <div class="design-clip">
        <button type="button" class="btn btn-text btn-sm" @click=${()=>this._copyDesign()}>
          <ha-icon icon="mdi:content-copy"></ha-icon>Copy design
        </button>
        <button
          type="button"
          class="btn btn-text btn-sm paste"
          aria-haspopup="menu"
          aria-expanded=${this._pasteMenu?"true":"false"}
          ?disabled=${!e}
          title=${e?"Paste the copied design":"Copy a design first"}
          @click=${()=>this._openPasteMenu()}
        >
          <ha-icon icon="mdi:content-paste"></ha-icon>Paste design
        </button>
        <span class="clip-status" role="status" aria-live="polite">${this._clipStatus}</span>
        ${this._pasteMenu?ne`<div class="menu" role="menu" aria-label="Paste design" @keydown=${e=>this._onPasteMenuKey(e)}>
              <button type="button" role="menuitem" @click=${()=>this._pasteDesign("replace")}>
                <ha-icon icon="mdi:content-paste"></ha-icon>Replace design
              </button>
              <button type="button" role="menuitem" @click=${()=>this._pasteDesign("merge")}>
                <ha-icon icon="mdi:set-merge"></ha-icon>Merge into design
              </button>
            </div>`:ae}
      </div>
    `}_addRule(){const e=[...this.design.conditional||[]],t={id:Gt("rule"),name:`Rule ${(this.design.conditional?.length??0)+1}`,conditions:[],mode:"every",design:{}};e.push(t),this.onChange({conditional:e}),this._activeView=t.id}_removeRule(e){const t=(this.design.conditional||[]).filter(t=>t.id!==e);this.onChange({conditional:t.length?t:void 0}),this._activeView="default"}_updateRule(e,t){const i=(this.design.conditional||[]).map(i=>i.id===e?{...i,...t}:i);this.onChange({conditional:i})}_updateRuleName(e,t){this._updateRule(e,{name:t})}_updateRuleMode(e,t){this._updateRule(e,{mode:t})}_updateRuleConditions(e,t){this._updateRule(e,{conditions:t})}_addConditionToRule(e){const t=[...e.conditions,{id:Gt("cond"),type:"state"}];this._updateRuleConditions(e.id,t)}_updateCondition(e,t,i){const n=e.conditions.map((e,n)=>n===t?{...e,...i}:e);this._updateRuleConditions(e.id,n)}_removeCondition(e,t){const i=e.conditions.filter((e,i)=>i!==t);this._updateRuleConditions(e.id,i)}_renderField(e,t,i=ae,n,r,a=ae){return ne`
      <div class="field">
        <div class="field-head">
          ${n?ne`<label for=${n}>${e}</label>`:ne`<span class="lbl">${e}</span>`}
          ${a}${i}
        </div>
        ${t}
        ${r?ne`<p class="help">${r}</p>`:ae}
      </div>
    `}_renderProperty(e){const t=this._getValue(e.key),i="default"!==this._activeView,n=`design.${e.key}`,r=this.hasTemplate&&!this.notSynced.includes(n),a=`dp-${e.key}`,o=this.hasTemplate&&!i?ne`
          <mc-sync-indicator
            .synced=${r}
            .hasTemplate=${this.hasTemplate}
            @sync-toggle=${()=>this._handleSyncToggle(e.key,r)}
          ></mc-sync-indicator>
        `:ae,s="animations"===e.type?ae:Hs(e.label,this._isSet(e),()=>this._reset([e])),l=(t,i=ae,n,r)=>this._renderField(e.label,t,i,n,r,s);switch(e.type){case"animations":{const e="module"===this.target;return l(ne`
            <mc-animation-list
              .animations=${di(this._getActiveDesign())}
              .allowIcon=${e&&Yt.includes(this.moduleType)}
              .allowTrigger=${e}
              .onChange=${e=>this._handleAnimationsChange(e)}
            ></mc-animation-list>
          `,o)}case"box":if(i){const t=this._getActiveRule(),i=t.design;return l(ne`
              <mc-box-field
                .design=${i}
                .onChange=${e=>{const i={...t.design,...e};this._updateRule(t.id,{design:i})}}
                .baseName=${e.key}
              ></mc-box-field>
            `)}return l(ne`
            <mc-box-field
              .design=${this.design}
              .onChange=${t=>this.onChange(this.hasTemplate?{...t,_markNotSynced:e.key}:t)}
              .baseName=${e.key}
            ></mc-box-field>
          `,o);case"unit":return l(ne`
            <mc-unit-field
              .value=${t}
              .label=${e.label}
              .units=${e.units}
              .placeholder=${c=e.key,d={...this.design,...this._getActiveDesign()},/^(min_|max_)?(width|height)$/.test(c)||"flex_basis"===c?"auto":"font_size"===c?"inherit":"border_length"===c?"100":"border_width"===c&&d.border_length?"2px".replace("px",""):"0"}
              @value-changed=${t=>this._handlePropertyChange(e.key,t.detail.value)}
            ></mc-unit-field>
          `,o,void 0,e.help);case"color":return l(ne`
            <mc-color-picker
              .value=${t}
              .label=${e.label}
              @value-changed=${t=>this._handlePropertyChange(e.key,t.detail.value)}
            ></mc-color-picker>
          `,o);case"image":return l(ne`
            <mc-media-picker
              .hass=${this.hass}
              .value=${t}
              .mediaType=${"image"}
              @value-changed=${t=>this._handlePropertyChange(e.key,t.detail.value)}
            ></mc-media-picker>
          `,o);case"font":return l(ne`
            <mc-font-picker
              .hass=${this.hass}
              .value=${t}
              @value-changed=${t=>this._handlePropertyChange(e.key,t.detail.value)}
            ></mc-font-picker>
          `,o);case"select":return l(ne`
            <div class="select">
              <select
                class="input"
                id=${a}
                @change=${t=>this._handlePropertyChange(e.key,t.target.value)}
              >
                <option value="" ?selected=${!t}>${e.emptyLabel??"Not set"}</option>
                ${this._renderOptions(e.options||[],t)}
              </select>
              <ha-icon icon="mdi:chevron-down"></ha-icon>
            </div>
          `,o,a);case"segmented":{const i=e.options||[],n=i.some(e=>e.value===t)?t:e.defaultValue??i[0]?.value,r=t=>{const r=i.findIndex(e=>e.value===n),a={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1},o="Home"===t.key?0:"End"===t.key?i.length-1:void 0!==a[t.key]?(r+a[t.key]+i.length)%i.length:-1;if(o<0)return;t.preventDefault();const s=t.currentTarget;this._handlePropertyChange(e.key,i[o].value),requestAnimationFrame(()=>s.querySelector(`[data-val="${i[o].value}"]`)?.focus())};return l(ne`
            <div class="seg full" role="radiogroup" aria-label=${e.label} @keydown=${r}>
              ${i.map(t=>{const i=t.value===n;return ne`<button
                  type="button"
                  role="radio"
                  data-val=${t.value}
                  aria-checked=${i?"true":"false"}
                  tabindex=${i?"0":"-1"}
                  @click=${()=>this._handlePropertyChange(e.key,t.value)}
                >${t.label}</button>`})}
            </div>
          `,o)}case"number":return l(ne`
            <input
              class="input"
              id=${a}
              type="number"
              .value=${t}
              @input=${t=>this._handlePropertyChange(e.key,t.target.value)}
            />
          `,o,a);default:return l(ne`
            <input
              class="input mono"
              id=${a}
              type="text"
              spellcheck="false"
              placeholder=${ml[e.key]??ae}
              .value=${t}
              @input=${t=>this._handlePropertyChange(e.key,t.target.value)}
            />
          `,o,a)}var c,d}_renderOptions(e,t){const i=e=>ne`<option value=${e.value} ?selected=${t===e.value}>${e.label}</option>`,n=[...new Set(e.map(e=>e.group))];return 1===n.length&&void 0===n[0]?e.map(i):n.map(t=>ne`<optgroup label=${t??""}>${e.filter(e=>e.group===t).map(i)}</optgroup>`)}_renderSector(e){const t=this._filterProperties(function(e){const t=e.leading||[],i=t.map(t=>e.properties.find(e=>e.key===t)).filter(e=>!!e);return[...i,...e.properties.filter(e=>!t.includes(e.key))]}(e));if(0===t.length)return ae;const i=this._openSectors.has(e.id)||!!this._searchQuery,n=this._countSetProperties(e),r=`sb-${e.id}`;return ne`
      <div class="sector">
        <button
          type="button"
          class="sector-btn"
          aria-expanded=${i?"true":"false"}
          aria-controls=${r}
          @click=${()=>this._toggleSector(e.id)}
        >
          <ha-icon icon=${e.icon}></ha-icon>
          <span class="nm">${e.name}</span>
          ${n>0?ne`<span class="chip is-count">${n} set</span>`:ae}
          <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
        </button>
        ${i?ne`<div class="sector-body" id=${r}>
              ${n>0?ne`<div class="sector-reset-row">
                    <button
                      type="button"
                      class="btn btn-text btn-sm sector-reset"
                      aria-label="Reset section ${e.name}"
                      title="Clear every value in this section"
                      @click=${()=>this._reset(e.properties.filter(e=>this._isSet(e)))}
                    >
                      <ha-icon icon="mdi:backup-restore"></ha-icon>Reset section
                    </button>
                  </div>`:ae}
              ${this._renderPropertyList(t)}
            </div>`:ae}
      </div>
    `}_renderPropertyList(e){const t=e=>!!e&&("unit"===e.type||"select"===e.type||"number"===e.type),i=[];for(let n=0;n<e.length;n++){const r=e[n];t(r)&&t(e[n+1])?(i.push(ne`<div class="two">${this._renderProperty(r)}${this._renderProperty(e[n+1])}</div>`),n++):i.push(this._renderProperty(r))}return i}_renderRulePicker(){const e=this.design.conditional||[],t=e.length,i=t?`${t} conditional rule${1===t?"":"s"}. Rules override Default only while their conditions match.`:"Add a rule to change the look when conditions match.";return ne`
      <div class="rule-pick">
        <div class="field">
          <div class="field-head"><label for="design-view">Editing design for</label></div>
          <div class="select">
            <select
              class="input"
              id="design-view"
              aria-describedby="design-view-help"
              @change=${e=>{this._activeView=e.target.value}}
            >
              <option value="default" ?selected=${"default"===this._activeView}>Default</option>
              ${e.map((e,t)=>ne`<option value=${e.id} ?selected=${this._activeView===e.id}>Rule: ${e.name||`Rule ${t+1}`}</option>`)}
            </select>
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </div>
          <p class="help" id="design-view-help">${i}</p>
        </div>
        <div>
          <button type="button" class="btn btn-text btn-sm" @click=${()=>this._addRule()}>
            <ha-icon icon="mdi:plus"></ha-icon>Add conditional rule
          </button>
        </div>
      </div>
    `}_renderRuleHeader(e){const t="any"===e.mode?"any":"every";return ne`
      <div class="rule-head">
        <h3>Rule</h3>
        <button
          type="button"
          class="btn btn-text btn-sm danger-text"
          @click=${()=>this._removeRule(e.id)}
        >
          <ha-icon icon="mdi:delete-outline"></ha-icon>Delete rule
        </button>
      </div>
      <div class="field">
        <div class="field-head"><label for="rule-name">Rule name</label></div>
        <input
          class="input"
          id="rule-name"
          type="text"
          .value=${e.name||""}
          placeholder="Rule name"
          @input=${t=>this._updateRuleName(e.id,t.target.value)}
        />
      </div>
      <div class="field">
        <div class="field-head"><span class="lbl">Match</span></div>
        <div class="seg full" role="radiogroup" aria-label="Condition match">
          ${[{v:"every",l:"All match (AND)"},{v:"any",l:"Any matches (OR)"}].map(i=>ne`
              <button
                type="button"
                role="radio"
                aria-checked=${t===i.v?"true":"false"}
                @click=${()=>this._updateRuleMode(e.id,i.v)}
              >${i.l}</button>
            `)}
        </div>
      </div>
    `}_renderRuleConditions(e){return ne`
      <div class="rule-conds">
        ${e.conditions.length?e.conditions.map((t,i)=>ne`
                <mc-condition-row
                  .condition=${t}
                  .hass=${this.hass}
                  .moduleEntity=${this.moduleEntity}
                  .onChange=${t=>this._updateCondition(e,i,t)}
                  .onRemove=${()=>this._removeCondition(e,i)}
                ></mc-condition-row>
              `):ne`<p class="help">No conditions yet. The rule applies once a condition is added and matches.</p>`}
        <div>
          <button type="button" class="btn btn-secondary btn-sm" @click=${()=>this._addConditionToRule(e)}>
            <ha-icon icon="mdi:plus"></ha-icon>Add condition
          </button>
        </div>
      </div>
    `}_handleCustomCssChange(e){const t=this._getActiveRule();if(t){const i={...t.design,css:e||void 0};return void this._updateRule(t.id,{design:i})}this.onChange({css:e||void 0})}_getCustomCssValue(){const e=this._getActiveRule();return e?e.design.css||"":this.design.css||""}render(){const e=vt.filter(e=>this._filterProperties(e.properties).length>0),t=this._getActiveRule();return"default"===this._activeView||t||(this._activeView="default"),ne`
      <div class="panel">
        <div class="group">
          ${this._renderClipboard()}
          ${this._renderRulePicker()}
          ${t?ne`
                <div class="rule">
                  ${this._renderRuleHeader(t)}
                  ${this._renderRuleConditions(t)}
                </div>
              `:ae}
        </div>

        <div class="group">
          <div class="with-icon">
            <ha-icon icon="mdi:magnify"></ha-icon>
            <input
              class="input"
              type="search"
              placeholder="Search CSS properties, e.g. padding"
              aria-label="Search CSS properties"
              .value=${this._searchQuery}
              @input=${e=>{this._searchQuery=e.target.value}}
            />
          </div>
          ${0===e.length?ne`<p class="no-results">No CSS property matches "${this._searchQuery}".</p>`:ne`<div class="sectors">${e.map(e=>this._renderSector(e))}</div>`}
        </div>

        <div class="group">
          <div class="field">
            <div class="field-head">
              <label for="custom-css">Custom CSS</label>
              ${Hs("Custom CSS",!!this._getCustomCssValue(),()=>this._handleCustomCssChange(""))}
            </div>
            <textarea
              class="input"
              id="custom-css"
              spellcheck="false"
              .value=${this._getCustomCssValue()}
              @input=${e=>this._handleCustomCssChange(e.target.value)}
              rows="4"
              placeholder="Applied to this ${this.target} only"
            ></textarea>
          </div>
        </div>
      </div>
    `}};gl.styles=[Re,v`
      :host {
        display: block;
        min-width: 0;
      }
      .panel {
        display: grid;
        gap: 20px;
      }
      .rule-pick {
        display: grid;
        gap: 8px;
      }
      .rule {
        display: grid;
        gap: 16px;
        padding: 12px;
        border: 1px solid var(--mc-divider);
        border-radius: var(--mc-radius-lg);
      }
      .rule-head {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .rule-head h3 {
        margin: 0;
        flex: 1;
        font-size: 0.875rem;
        font-weight: 500;
      }
      .danger-text {
        color: var(--mc-error-ink);
      }
      .danger-text:hover {
        background: color-mix(in srgb, var(--mc-error-ink) 10%, transparent);
      }
      .rule-conds {
        display: grid;
        gap: 12px;
      }
      .no-results {
        margin: 0;
      }
      .design-clip {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 4px 8px;
      }
      .design-clip .menu {
        top: calc(100% + 4px);
        left: 0;
        min-width: 200px;
      }
      .design-clip .clip-status {
        font-size: 0.75rem;
        color: var(--mc-text-2);
      }
      .sector-reset-row {
        display: flex;
        justify-content: flex-end;
        margin: -4px -8px -8px 0;
      }
    `],hl([Te({attribute:!1})],gl.prototype,"design",void 0),hl([Te({attribute:!1})],gl.prototype,"hass",void 0),hl([Te({attribute:!1})],gl.prototype,"onChange",void 0),hl([Te({type:Boolean})],gl.prototype,"hasTemplate",void 0),hl([Te({attribute:!1})],gl.prototype,"notSynced",void 0),hl([Te({type:String})],gl.prototype,"moduleEntity",void 0),hl([Te({type:String})],gl.prototype,"target",void 0),hl([Te({type:String})],gl.prototype,"moduleType",void 0),hl([Me()],gl.prototype,"_openSectors",void 0),hl([Me()],gl.prototype,"_searchQuery",void 0),hl([Me()],gl.prototype,"_activeView",void 0),hl([Me()],gl.prototype,"_pasteMenu",void 0),hl([Me()],gl.prototype,"_clipStatus",void 0),gl=hl([ke("mc-design-panel")],gl);const fl=["1","1-1","2-1","1-2","1-1-1"];function bl(e,t,i){const n=t.columns.length,r=t.layout||(a=n,Array.from({length:Math.max(a,1)},()=>"1").join("-"));var a;const o=fl.includes(r)?fl:[...fl,r],s=t=>{t!==r&&i.setRowLayout(e,t)};return ne`
    <div class="field">
      <div class="field-head"><span class="lbl" id="row-layout-lbl">Column layout</span></div>
      <div class="seg full" role="radiogroup" aria-labelledby="row-layout-lbl" @keydown=${e=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key))return;e.preventDefault();const t=o.indexOf(r),i="ArrowLeft"===e.key||"ArrowUp"===e.key?-1:1,n="Home"===e.key?0:"End"===e.key?o.length-1:(t+i+o.length)%o.length,a=o[n];s(a);const l=e.currentTarget;requestAnimationFrame(()=>l.querySelector(`[data-val="${a}"]`)?.focus())}}>
        ${o.map(e=>{const t=e===r;return ne`
            <button
              type="button"
              role="radio"
              data-val=${e}
              aria-checked=${t?"true":"false"}
              tabindex=${t?"0":"-1"}
              @click=${()=>s(e)}
            >${e}</button>
          `})}
      </div>
      <p class="help">Removing a column moves its modules into the column to its left.</p>
    </div>
  `}const vl=[{label:"Top",value:"start"},{label:"Center",value:"center"},{label:"Bottom",value:"end"},{label:"Stretch",value:"stretch"}];function yl(e,t,i,n){return ne`<mc-design-panel .design=${t} .hass=${i} .target=${e} .onChange=${n}></mc-design-panel>`}function wl(e,t,i){const n={...e.design,...t};for(const e of Object.keys(n))void 0!==n[e]&&""!==n[e]||delete n[e];const r={design:n};return i.getConfig().template&&!e.not_synced?.includes("design")&&(r.not_synced=[...e.not_synced||[],"design"]),r}function xl(e,t,i,n){const r=t.conditions||[];return ne`
      ${Fs(r,t.mode||"every",{onAdd:()=>i({...t,conditions:[...r,{id:`cond-${Date.now()}`,type:"state",entity:"",state:""}]}),onUpdate:(e,n)=>i({...t,conditions:r.map((t,i)=>i===e?{...t,...n}:t)}),onRemove:e=>{const n=r.filter((t,i)=>i!==e);i({...t,conditions:n.length?n:void 0})},onMode:e=>i({...t,mode:e})},n,void 0,e)}
  `}const _l=[{label:"None",value:"none"},{label:"Toggle",value:"toggle"},{label:"More info",value:"more-info"},{label:"Navigate",value:"navigate"},{label:"Call service",value:"perform-action"},{label:"URL",value:"url"}],$l=[{key:"tap_action",title:"Tap",icon:"mdi:gesture-tap"},{key:"hold_action",title:"Hold",icon:"mdi:gesture-tap-hold"},{key:"double_tap_action",title:"Double tap",icon:"mdi:gesture-double-tap"}];var kl=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};let Sl=class extends _e{constructor(){super(...arguments),this.value="",this.label="Service",this._modalCtrl=new is(this),this._showModal=!1,this._searchQuery=""}_openModal(){this._showModal=!0,this._searchQuery=""}_closeModal(){this._modalCtrl.reset(),this._showModal=!1}_selectService(e){this.value=e,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:e},bubbles:!0,composed:!0})),this._closeModal()}_onInputChange(e){const t=e.target.value;this.value=t,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:t},bubbles:!0,composed:!0}))}_getServices(){if(!this.hass?.services)return[];const e=[];for(const[t,i]of Object.entries(this.hass.services))for(const[n,r]of Object.entries(i))e.push({domain:t,service:n,name:r.name||n,description:r.description||""});return e}_getFilteredServices(){const e=this._getServices(),t=this._searchQuery.toLowerCase(),i=t?e.filter(e=>e.domain.includes(t)||e.service.includes(t)||e.name.toLowerCase().includes(t)):e,n=new Map;for(const e of i)n.has(e.domain)||n.set(e.domain,[]),n.get(e.domain).push(e);const r=Array.from(n.entries()).sort(([e],[t])=>e.localeCompare(t)).slice(0,20).map(([e,t])=>({domain:e,services:t.sort((e,t)=>e.service.localeCompare(t.service))}));return r}_domainIcon(e){return{light:"mdi:lightbulb",switch:"mdi:toggle-switch",climate:"mdi:thermostat",cover:"mdi:window-shutter",fan:"mdi:fan",media_player:"mdi:cast",camera:"mdi:video",lock:"mdi:lock",automation:"mdi:robot",script:"mdi:script-text",scene:"mdi:palette",input_boolean:"mdi:toggle-switch-outline",input_number:"mdi:ray-vertex",input_select:"mdi:format-list-bulleted",notify:"mdi:bell",tts:"mdi:speaker-message",homeassistant:"mdi:home-assistant",persistent_notification:"mdi:bell-ring",logbook:"mdi:book-open",recorder:"mdi:database",system_log:"mdi:file-document",frontend:"mdi:view-dashboard",group:"mdi:group",vacuum:"mdi:robot-vacuum",counter:"mdi:counter",timer:"mdi:timer"}[e]||"mdi:cog"}render(){return ne`
      <div class="with-icon with-action">
        <ha-icon icon="mdi:cog-outline"></ha-icon>
        <input
          type="text"
          class="input mono"
          .value=${this.value}
          placeholder="domain.service"
          aria-label=${this.label}
          spellcheck="false"
          @input=${this._onInputChange}
        />
        <button
          type="button"
          class="icon-btn sm field-action browse"
          aria-label="Browse services"
          title="Browse services"
          @click=${this._openModal}
        >
          <ha-icon icon="mdi:magnify"></ha-icon>
        </button>
      </div>

      ${this._showModal?this._renderModal():""}
    `}_renderModal(){const e=this._getFilteredServices();return ne`
      <div class="mc-picker-overlay" @click=${()=>{this._modalCtrl.consumeDragFlag()||this._closeModal()}}>
        <div class="mc-picker-modal" role="dialog" @keydown=${ns(()=>this._closeModal())} aria-label="Select service" @click=${e=>e.stopPropagation()}>
          ${rs("Select service",this._modalCtrl,()=>this._closeModal())}
          <div class="mc-picker-search">
            ${as("Search services",this._searchQuery,e=>{this._searchQuery=e})}
          </div>
          <div class="mc-picker-list" role="listbox" aria-label="Services">
            ${e.length>0?e.map(e=>ne`
                  <div class="mc-picker-domain">${e.domain}</div>
                  ${e.services.map(e=>ne`
                    <button
                      type="button"
                      role="option"
                      class="mc-picker-item"
                      aria-selected=${this.value===`${e.domain}.${e.service}`?"true":"false"}
                      @click=${()=>this._selectService(`${e.domain}.${e.service}`)}
                    >
                      <span class="mc-picker-item-icon"><ha-icon icon=${this._domainIcon(e.domain)}></ha-icon></span>
                      <span class="mc-picker-item-content">
                        <span class="mc-picker-item-name">${e.name}</span>
                        <span class="mc-picker-item-id">${e.domain}.${e.service}</span>
                        ${e.description?ne`<span class="mc-picker-item-desc">${e.description}</span>`:""}
                      </span>
                    </button>
                  `)}
                `):ne`<div class="mc-picker-empty">No services found</div>`}
          </div>
          <div class="mc-picker-footer">
            <button type="button" class="btn btn-secondary" @click=${this._closeModal}>Cancel</button>
          </div>
          ${os(this._modalCtrl)}
        </div>
      </div>
    `}};Sl.styles=[Re,tt,lt],kl([Te({attribute:!1})],Sl.prototype,"hass",void 0),kl([Te({type:String})],Sl.prototype,"value",void 0),kl([Te({type:String})],Sl.prototype,"label",void 0),kl([Me()],Sl.prototype,"_showModal",void 0),kl([Me()],Sl.prototype,"_searchQuery",void 0),Sl=kl([ke("mc-service-picker")],Sl);var Cl=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};let Tl=class extends _e{constructor(){super(...arguments),this.value="",this.label="Icon",this._modalCtrl=new is(this),this._showModal=!1,this._searchQuery="",this._selectedIcon=""}_openModal(){this._selectedIcon=this.value,this._showModal=!0,this._searchQuery=""}_closeModal(){this._modalCtrl.reset(),this._showModal=!1}_handleSave(){this.value=this._selectedIcon,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:this._selectedIcon},bubbles:!0,composed:!0})),this._closeModal()}_selectIcon(e){this._selectedIcon=e.detail.value,this._searchQuery=e.detail.value}_onInputChange(e){const t=e.target.value;this.value=t,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:t},bubbles:!0,composed:!0}))}render(){return ne`
      <div class="with-icon with-action">
        <ha-icon .icon=${this.value||"mdi:emoticon-outline"}></ha-icon>
        <input
          type="text"
          class="input mono"
          .value=${this.value}
          placeholder="mdi:icon"
          aria-label=${this.label}
          spellcheck="false"
          @input=${this._onInputChange}
        />
        <button
          type="button"
          class="icon-btn sm field-action browse"
          aria-label="Browse icons"
          title="Browse icons"
          @click=${this._openModal}
        >
          <ha-icon icon="mdi:magnify"></ha-icon>
        </button>
      </div>

      ${this._showModal?this._renderModal():""}
    `}_renderModal(){return ne`
      <div class="mc-picker-overlay" @click=${()=>{this._modalCtrl.consumeDragFlag()||this._closeModal()}}>
        <div class="mc-picker-modal" role="dialog" @keydown=${ns(()=>this._closeModal())} aria-label="Select icon" @click=${e=>e.stopPropagation()}>
          ${rs("Select icon",this._modalCtrl,()=>this._closeModal())}
          <div class="mc-picker-search">
            ${as("Search icons",this._searchQuery,e=>{this._searchQuery=e})}
          </div>
          <div class="mc-picker-list">
            <ha-icon-picker
              .hass=${this.hass}
              .value=${this._selectedIcon}
              .search=${this._searchQuery}
              @value-changed=${this._selectIcon}
            ></ha-icon-picker>
          </div>
          <div class="mc-picker-footer">
            <button type="button" class="btn btn-secondary" @click=${this._closeModal}>Cancel</button>
            <button type="button" class="btn btn-primary" @click=${this._handleSave}>Save</button>
          </div>
          ${os(this._modalCtrl)}
        </div>
      </div>
    `}};Tl.styles=[Re,tt,at],Cl([Te({attribute:!1})],Tl.prototype,"hass",void 0),Cl([Te({type:String})],Tl.prototype,"value",void 0),Cl([Te({type:String})],Tl.prototype,"label",void 0),Cl([Me()],Tl.prototype,"_showModal",void 0),Cl([Me()],Tl.prototype,"_searchQuery",void 0),Cl([Me()],Tl.prototype,"_selectedIcon",void 0),Tl=Cl([ke("mc-icon-picker")],Tl);var Ml=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};const Al=[{type:"alarm-panel",name:"Alarm panel",description:"Alarm control panel",icon:"mdi:shield-home",category:"built-in"},{type:"area",name:"Area",description:"Show area devices and entities",icon:"mdi:texture-box",category:"built-in"},{type:"button",name:"Button",description:"Action button for an entity",icon:"mdi:gesture-tap-button",category:"built-in"},{type:"calendar",name:"Calendar",description:"Calendar display",icon:"mdi:calendar",category:"built-in"},{type:"conditional",name:"Conditional",description:"Show cards based on conditions",icon:"mdi:eye-check",category:"built-in"},{type:"entities",name:"Entities",description:"List of entity rows",icon:"mdi:format-list-bulleted",category:"built-in"},{type:"entity",name:"Entity",description:"Single entity display",icon:"mdi:card-text",category:"built-in"},{type:"entity-filter",name:"Entity filter",description:"Filtered entity list",icon:"mdi:filter",category:"built-in"},{type:"gauge",name:"Gauge",description:"Gauge visualization",icon:"mdi:gauge",category:"built-in"},{type:"glance",name:"Glance",description:"Quick overview of entities",icon:"mdi:eye",category:"built-in"},{type:"grid",name:"Grid",description:"Grid layout of cards",icon:"mdi:view-grid",category:"built-in"},{type:"heading",name:"Heading",description:"Section heading",icon:"mdi:format-header-1",category:"built-in"},{type:"history-graph",name:"History graph",description:"Entity history graph",icon:"mdi:chart-line",category:"built-in"},{type:"horizontal-stack",name:"Horizontal stack",description:"Stack cards horizontally",icon:"mdi:arrow-split-vertical",category:"built-in"},{type:"humidifier",name:"Humidifier",description:"Humidifier control",icon:"mdi:air-humidifier",category:"built-in"},{type:"iframe",name:"iFrame",description:"Embed a webpage",icon:"mdi:web",category:"built-in"},{type:"light",name:"Light",description:"Light control card",icon:"mdi:lightbulb",category:"built-in"},{type:"logbook",name:"Logbook",description:"Entity logbook entries",icon:"mdi:book-open-variant",category:"built-in"},{type:"map",name:"Map",description:"Map with entity locations",icon:"mdi:map",category:"built-in"},{type:"markdown",name:"Markdown",description:"Rendered Markdown text",icon:"mdi:language-markdown",category:"built-in"},{type:"media-control",name:"Media control",description:"Media player controls",icon:"mdi:cast",category:"built-in"},{type:"picture",name:"Picture",description:"Display an image",icon:"mdi:image",category:"built-in"},{type:"picture-elements",name:"Picture elements",description:"Image with interactive elements",icon:"mdi:image-edit",category:"built-in"},{type:"picture-entity",name:"Picture entity",description:"Entity with background image",icon:"mdi:image-area",category:"built-in"},{type:"picture-glance",name:"Picture glance",description:"Image with entity icons",icon:"mdi:image-multiple",category:"built-in"},{type:"plant-status",name:"Plant status",description:"Plant monitor display",icon:"mdi:flower",category:"built-in"},{type:"sensor",name:"Sensor",description:"Sensor with graph",icon:"mdi:eye",category:"built-in"},{type:"shopping-list",name:"Shopping list",description:"Shopping list card",icon:"mdi:cart",category:"built-in"},{type:"statistic",name:"Statistic",description:"Long-term statistic",icon:"mdi:chart-box",category:"built-in"},{type:"statistics-graph",name:"Statistics graph",description:"Statistics graph",icon:"mdi:chart-bell-curve",category:"built-in"},{type:"thermostat",name:"Thermostat",description:"Climate control card",icon:"mdi:thermostat",category:"built-in"},{type:"tile",name:"Tile",description:"Compact tile card",icon:"mdi:square-rounded",category:"built-in"},{type:"todo-list",name:"To-Do List",description:"To-do list card",icon:"mdi:checkbox-marked-outline",category:"built-in"},{type:"vertical-stack",name:"Vertical stack",description:"Stack cards vertically",icon:"mdi:arrow-split-horizontal",category:"built-in"},{type:"weather-forecast",name:"Weather forecast",description:"Weather forecast card",icon:"mdi:weather-partly-cloudy",category:"built-in"}];let El=class extends _e{constructor(){super(...arguments),this.value="",this._modalCtrl=new is(this),this._showModal=!1,this._searchQuery="",this._selectedCardType=""}_openModal(){this._selectedCardType=this.value,this._showModal=!0,this._searchQuery=""}_closeModal(){this._modalCtrl.reset(),this._showModal=!1}_handleSave(){this.value=this._selectedCardType,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:this._selectedCardType},bubbles:!0,composed:!0})),this._closeModal()}_selectCard(e){this._selectedCardType=e,this._searchQuery=e}_onInputChange(e){const t=e.target.value;this.value=t,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:t},bubbles:!0,composed:!0}))}_getCustomCards(){const e=window.customCards;return Array.isArray(e)?e.map(e=>({type:`custom:${e.type}`,name:e.name||e.type,description:e.description||"Custom card",icon:"mdi:puzzle",category:"custom"})):[]}_getFilteredCards(){const e=this._searchQuery.toLowerCase(),t=t=>!e||(t.type.toLowerCase().includes(e)||t.name.toLowerCase().includes(e)||t.description.toLowerCase().includes(e));return{builtIn:Al.filter(t),custom:this._getCustomCards().filter(t)}}render(){return ne`
      <div class="mc-picker-row">
        <input
          type="text"
          class="input mono"
          .value=${this.value}
          placeholder="button, custom:mushroom-light-card"
          aria-label="Card type"
          spellcheck="false"
          @input=${this._onInputChange}
        />
        <button type="button" class="btn btn-secondary" @click=${this._openModal}>Select</button>
      </div>

      ${this._showModal?this._renderModal():""}
    `}_renderModal(){const{builtIn:e,custom:t}=this._getFilteredCards(),i=e.length>0||t.length>0;return ne`
      <div class="mc-picker-overlay" @click=${()=>{this._modalCtrl.consumeDragFlag()||this._closeModal()}}>
        <div class="mc-picker-modal" role="dialog" @keydown=${ns(()=>this._closeModal())} aria-label="Select card" @click=${e=>e.stopPropagation()}>
          ${rs("Select card",this._modalCtrl,()=>this._closeModal())}
          <div class="mc-picker-search">
            ${as("Search cards",this._searchQuery,e=>{this._searchQuery=e})}
          </div>
          <div class="mc-picker-list" role="listbox" aria-label="Cards">
            ${i?ne`
                  ${e.length>0?ne`
                    <div class="mc-picker-category">Built-in cards</div>
                    ${e.map(e=>this._renderCardItem(e))}
                  `:""}
                  ${t.length>0?ne`
                    <div class="mc-picker-category">Custom cards (HACS)</div>
                    ${t.map(e=>this._renderCardItem(e))}
                  `:""}
                `:ne`<div class="mc-picker-empty">No cards found</div>`}
          </div>
          <div class="mc-picker-footer">
            <button type="button" class="btn btn-secondary" @click=${this._closeModal}>Cancel</button>
            <button type="button" class="btn btn-primary" @click=${this._handleSave}>Save</button>
          </div>
          ${os(this._modalCtrl)}
        </div>
      </div>
    `}_renderCardItem(e){return ne`
      <button
        type="button"
        role="option"
        class="mc-picker-item"
        aria-selected=${this._selectedCardType===e.type?"true":"false"}
        @click=${()=>this._selectCard(e.type)}
      >
        <span class="mc-picker-item-icon"><ha-icon icon=${e.icon}></ha-icon></span>
        <span class="mc-picker-item-content">
          <span class="mc-picker-item-name">${e.name}</span>
          <span class="mc-picker-item-id">${e.type}</span>
        </span>
        <span class="chip">${"custom"===e.category?"Custom":"Built-in"}</span>
      </button>
    `}};El.styles=[Re,tt],Ml([Te({type:String})],El.prototype,"value",void 0),Ml([Me()],El.prototype,"_showModal",void 0),Ml([Me()],El.prototype,"_searchQuery",void 0),Ml([Me()],El.prototype,"_selectedCardType",void 0),El=Ml([ke("mc-card-picker")],El);var Pl=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};const zl={general:{label:"General"},actions:{label:"Actions"},conditions:{label:"Conditions"},design:{label:"Design"}},Rl=["general","actions","conditions","design"],Il={card:["general","design","conditions"],row:["general","actions","conditions","design"],column:["general","conditions","design"]};let Ll=class extends _e{constructor(){super(...arguments),this.variant="pane",this._tabs={card:"general",row:"general",column:"general",module:"general"},this._expandedRules=new Set,this._focusTab=!1,this._onSyncToggle=e=>{const t=this.stateManager,i=t?.getConfig();if(!t||!i?.template)return;const{propertyPath:n,synced:r}=e.detail,a=this._selection();switch(a.kind){case"card":t.updateConfig({...i,not_synced:Uo(i.not_synced,n,r)});break;case"row":t.updateRow(a.row,{not_synced:Uo(i.rows[a.row]?.not_synced,n,r)});break;case"column":t.updateColumn(a.row,a.col,{not_synced:Uo(i.rows[a.row]?.columns[a.col]?.not_synced,n,r)});break;case"module":{const e=this._module(a);if(!e)return;t.updateModule(a.row,a.col,a.module,{not_synced:Uo(e.not_synced,n,r)});break}}}}connectedCallback(){super.connectedCallback(),this.stateManager&&!this._unsubscribe&&this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe?.(),this._unsubscribe=void 0,this._subscribedTo=void 0}willUpdate(e){e.has("stateManager")&&this.stateManager!==this._subscribedTo&&this._subscribe()}updated(){const e=this.shadowRoot?.querySelector('[role="tab"][aria-selected="true"]');if(!e)return;const t=e.parentElement;e.offsetLeft<t.scrollLeft?t.scrollLeft=e.offsetLeft-4:e.offsetLeft+e.offsetWidth>t.scrollLeft+t.clientWidth&&(t.scrollLeft=e.offsetLeft+e.offsetWidth-t.clientWidth+4),this._focusTab&&(this._focusTab=!1,e.focus())}_subscribe(){this._unsubscribe?.(),this._subscribedTo=this.stateManager,this._unsubscribe=this.stateManager?.subscribe(e=>{this._state=e})}setTab(e){const t=this._selection();this._tabsFor(t).includes(e)&&(this._tabs={...this._tabs,[t.kind]:e})}_selection(){return Mi(this._state?.selectedPath??null)}_module(e){if("module"===e.kind)return this._state?.config.rows[e.row]?.columns[e.col]?.modules[e.module]}_tabsFor(e){if("module"!==e.kind)return Il[e.kind];const t=this._module(e),i=t?dt.get(t.type):void 0;if(!i)return["general"];const n=i.getAvailableTabs();return Rl.filter(e=>n.includes(e))}_activeTab(e,t){const i=this._tabs[e.kind];return t.includes(i)?i:t[0]}_goTo(e){this.stateManager?.setSelectedPath(Ai(e))}_onTabKeydown(e,t,i,n){const r=i.indexOf(n),a={ArrowRight:(r+1)%i.length,ArrowLeft:(r-1+i.length)%i.length,Home:0,End:i.length-1}[e.key];void 0!==a&&(e.preventDefault(),this._focusTab=!0,this._tabs={...this._tabs,[t.kind]:i[a]})}get _rulesState(){const e=e=>{this._expandedRules=e};return{expanded:this._expandedRules,toggle:t=>{const i=new Set(this._expandedRules);i.has(t)?i.delete(t):i.add(t),e(i)},expand:t=>e(new Set(this._expandedRules).add(t)),collapse:t=>{const i=new Set(this._expandedRules);i.delete(t),e(i)}}}render(){const e=this._state?.config;if(!e||!this.stateManager)return ne``;const t=this._selection(),i=this._tabsFor(t),n=this._activeTab(t,i);return ne`
      <div class="insp" @field-sync-toggle=${this._onSyncToggle}>
        <div class="insp-head">
          ${this._renderIdentity(e,t)}
          <div class="seg full tabs" role="tablist" aria-label="Settings">
            ${i.map(e=>{const r=e===n;return ne`
                <button
                  type="button"
                  role="tab"
                  id="tab-${e}"
                  aria-controls="panel-${e}"
                  aria-selected=${r?"true":"false"}
                  tabindex=${r?"0":"-1"}
                  @click=${()=>this.setTab(e)}
                  @keydown=${e=>this._onTabKeydown(e,t,i,n)}
                >
                  ${zl[e].label}
                </button>
              `})}
          </div>
        </div>
        <div class="insp-body" role="tabpanel" id="panel-${n}" aria-labelledby="tab-${n}">
          ${this._renderBody(e,t,n)}
        </div>
      </div>
    `}_renderIdentity(e,t){const i=Di(e,t),n=zi(e,t),r=(e,t)=>ne`<button type="button" class="crumb" title="Select ${e}" @click=${()=>this._goTo(t)}>${e}</button>`,a=ne`<span aria-hidden="true"> · </span>`,o=(e,t)=>`${e} ${t}${1===e?"":"s"}`;let s,l=i.title,c=i.icon;switch(n.kind){case"card":l=`Card · ${i.title}`,s=ne`${o((e.rows||[]).length,"row")} · ${o(Ri(e),"module")}`;break;case"row":{const t=e.rows[n.row];c="mdi:table-row",s=ne`${o(t.columns.length,"column")} · layout ${t.layout||"1"}`;break}case"column":{const t=e.rows[n.row].columns[n.col].modules?.length??0;s=ne`${r(`Row ${n.row+1}`,{kind:"row",row:n.row})}${a}${o(t,"module")}`;break}case"module":{const t=e.rows[n.row].columns[n.col].modules[n.module],o=Oi(t);o&&(l=`${i.title} · ${o}`);const c="string"==typeof t.entity&&Ni.test(t.entity)?t.entity:"";s=ne`${r(`Row ${n.row+1}`,{kind:"row",row:n.row})}${a}${r(`Column ${n.col+1}`,{kind:"column",row:n.row,col:n.col})}${c?ne`${a}<span class="mono">${Fi(c)}</span>`:ae}`;break}}return ne`
      <div class="insp-id">
        <span class="ico k-${n.kind}"><ha-icon icon=${c}></ha-icon></span>
        <div class="txt">
          <h2>${l}</h2>
          <p class="path">${s}</p>
        </div>
      </div>
    `}_renderBody(e,t,i){const n=this.stateManager;switch(t.kind){case"card":return this._renderCard(e,i);case"row":{const r=e.rows[t.row];return r?"design"===i?function(e,t,i,n){return yl("row",t.design||{},n,n=>i.updateRow(e,wl(t,n,i)))}(t.row,r,n,this.hass):"conditions"===i?function(e,t,i,n){return xl("row",t.display||{},t=>i.updateRow(e,{display:t}),n)}(t.row,r,n,this.hass):"actions"===i?function(e,t,i){const n=t.actions||{};return ne`
    ${$l.map(r=>ne`
        <section class="group">
          <div class="group-head"><ha-icon icon=${r.icon}></ha-icon><h3>${r.title}</h3></div>
          ${ks("Action",n[r.key]?.action||"none",_l,n=>i.updateRow(e,{actions:{...t.actions,[r.key]:"none"===n?void 0:{action:n}}}))}
        </section>
      `)}
  `}(t.row,r,n):function(e,t,i){const n=t.columns.map(e=>e.vertical_align||"start");return ne`
    <div class="group">
      ${bl(e,t,i)}
      ${As("Gap between columns",t.gap,t=>i.updateRow(e,{gap:t}),void 0,void 0,"12")}
      ${ks("Vertical alignment",n[0]||"start",vl,t=>{const n=i.getConfig().rows[e].columns.map(e=>({...e,vertical_align:t}));i.updateRow(e,{columns:n})})}
      ${Es("Padding",t.padding,t=>i.updateRow(e,{padding:t}),"padding")}
    </div>
  `}(t.row,r,n):ne``}case"column":{const r=e.rows[t.row]?.columns[t.col];return r?"design"===i?function(e,t,i,n,r){return yl("column",i.design||{},r,r=>n.updateColumn(e,t,wl(i,r,n)))}(t.row,t.col,r,n,this.hass):"conditions"===i?function(e,t,i,n,r){return xl("column",i.display||{},i=>n.updateColumn(e,t,{display:i}),r)}(t.row,t.col,r,n,this.hass):function(e,t,i,n){return ne`
    <div class="group">
      ${ks("Vertical alignment",i.vertical_align||"start",vl,i=>n.updateColumn(e,t,{vertical_align:i}))}
      ${As("Gap",i.gap,i=>n.updateColumn(e,t,{gap:i}))}
      ${Es("Padding",i.padding,i=>n.updateColumn(e,t,{padding:i}),"padding")}
    </div>
  `}(t.row,t.col,r,n):ne``}case"module":return this._renderModule(e,t,i)}}_renderCard(e,t){const i=this.stateManager,n=e.template?{templateName:e.template,notSynced:e.not_synced||[],basePath:""}:void 0,r=(e,t)=>{const n=i.getConfig(),r={...n,[e]:t};n.template&&(r.not_synced=Uo(n.not_synced,e,!0)),i.updateConfig(r)};return"design"===t?function(e,t,i,n){return ne`
    <div class="group">
      ${Ms("Background color",e.background,e=>t("background",e),"background",i)}
      ${zs("Background image",e.background_image,e=>t("background_image",e),n,"image","background_image",i)}
      <div class="two">
        ${As("Border radius",e.border_radius,e=>t("border_radius",e),"border_radius",i)}
        ${As("Card height",e.card_height,e=>t("card_height",e),"card_height",i,"auto")}
      </div>
      ${Es("Padding",e.padding,e=>t("padding",e),"padding","padding",i)}
      ${xs("Box shadow",e.box_shadow,e=>t("box_shadow",e),"box_shadow",i,{placeholder:"Theme default",mono:!0})}
    </div>
  `}(e,r,n,this.hass):"conditions"===t?function(e,t,i,n,r,a,o){const s=e.display||{},l=s.conditions||[],c=e=>t({...s,...e});return ne`
    ${qs(e,r,n,a,o)}
    <section class="group">
      <div class="group-head">
        <ha-icon icon="mdi:eye-outline"></ha-icon>
        <h3>Display conditions</h3>
      </div>
      ${Fs(l,s.mode||"every",{onAdd:()=>c({conditions:[...l,Bs()]}),onUpdate:(e,t)=>c({conditions:l.map((i,n)=>n===e?{...i,...t}:i)}),onRemove:e=>c({conditions:l.filter((t,i)=>i!==e)}),onMode:e=>c({mode:e})},n,i?{...i,basePath:"display"}:void 0,"card")}
    </section>
  `}(e,e=>r("display",e),n,this.hass,r,js(this.hass),this._rulesState):function(e,t,i,n){const r=!1!==e.use_page_theme;return ne`
    <div class="group">
      ${xs("Name",e.name,e=>t("name",e),"name",i)}
      ${Cs("Use dashboard theme",r,e=>t("use_page_theme",e),"use_page_theme",i,"Turn off to pick a theme for this card only.")}
      ${ks("Card theme",r?"__default__":e.theme||"__default__",js(n),e=>t("theme","__default__"===e?void 0:e),"theme",i,{disabled:r})}
    </div>
  `}(e,r,n,this.hass)}_renderModule(e,t,i){const n=this._module(t);if(!n)return ne``;const r=dt.get(n.type);if(!r)return ne`
        <div class="empty">
          <ha-icon icon="mdi:puzzle-remove-outline"></ha-icon>
          <strong>Unknown module type</strong>
          <p class="mono">${n.type}</p>
        </div>
      `;const a=e.template,o=e=>this.stateManager.updateModule(t.row,t.col,t.module,e),s=a?function(e,t){return i=>{const n=new Set(i.not_synced||[]),r=e,a=i,o=new Set(["id","type","not_synced","design","actions","display"]);for(const e of Object.keys(a))o.has(e)||a[e]!==r[e]&&n.add(e);a.not_synced=Array.from(n),t(i)}}(n,o):o,l=e=>ne`<p class="help">No ${e} for this module.</p>`;switch(i){case"actions":return r.renderActionsTab?r.renderActionsTab(n,this.hass,s,a):l("actions");case"conditions":return r.renderConditionsTab?r.renderConditionsTab(n,this.hass,s,a):l("conditions");case"design":return r.renderDesignTab?r.renderDesignTab(n,this.hass,s,a):l("design options");default:return r.renderGeneralTab(n,this.hass,s,a)}}};Ll.styles=[...et,v`
      :host {
        display: block;
        min-width: 0;
      }
      .insp-head {
        padding: 16px 16px 12px;
        display: grid;
        gap: 12px;
        border-bottom: 1px solid var(--mc-divider);
      }
      .insp-body {
        padding: 16px;
        display: grid;
        gap: 20px;
        align-content: start;
        min-width: 0;
      }
      :host([variant='pane']) .insp-head {
        padding: 0 0 12px;
      }
      :host([variant='pane']) .insp-body {
        padding: 16px 0 0;
      }
      .insp-id {
        display: flex;
        align-items: flex-start;
        gap: 12px;
      }
      .insp-id .ico {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        display: grid;
        place-items: center;
        /* level colour (.k-card / .k-row / .k-column / .k-module), matching the canvas frame */
        background: var(--k-tint);
        flex: none;
        color: var(--k-ink);
        --mdc-icon-size: 22px;
      }
      .insp-id .txt {
        flex: 1;
        min-width: 0;
      }
      .insp-id h2 {
        margin: 0;
        font-size: 1rem;
        font-weight: 500;
        line-height: 1.3;
        overflow-wrap: anywhere;
      }
      .path {
        margin: 0;
        font-size: 0.75rem;
        color: var(--mc-text-2);
        overflow-wrap: anywhere;
      }
      .path .mono {
        font-size: 0.75rem;
      }
      /* path segments navigate up, but read as the mockup's plain path text */
      .crumb {
        border: 0;
        background: transparent;
        padding: 0;
        border-radius: 2px;
        font-size: inherit;
        color: inherit;
      }
      .crumb:hover {
        color: var(--mc-accent-ink);
        text-decoration: underline;
      }
      .tabs {
        position: relative;
      }
      /* studio: fixed 340px panel, tighter padding so all four tabs fit (mockup) */
      :host([variant='studio']) .tabs > button {
        padding: 0 8px;
      }
      .cond-list {
        display: grid;
        gap: 12px;
      }
      .rule {
        background: color-mix(in srgb, var(--mc-surface-2) 40%, transparent);
      }
      .rule .cond {
        background: var(--mc-surface);
      }
      .rule .rule-name {
        flex: 1;
        min-width: 0;
        min-height: 32px;
        padding: 4px 8px;
      }
      .rule-body {
        display: grid;
        gap: 16px;
      }
      .rule-body .sub-head {
        font-size: 0.8125rem;
        font-weight: 500;
        color: var(--mc-text);
      }
      .layout-seg > button {
        justify-content: center;
        min-width: 48px;
      }
      .layout-glyph {
        display: inline-grid;
        gap: 2px;
        width: 28px;
        height: 14px;
        flex: none;
      }
      .layout-glyph i {
        display: block;
        border-radius: 2px;
        background: currentColor;
        opacity: 0.45;
      }
      [aria-checked='true'] > .layout-glyph i {
        opacity: 1;
      }
      p.help {
        margin: 0;
      }
      .mc-action-config {
        display: grid;
        gap: 16px;
        padding: 0;
      }
    `],Pl([Te({attribute:!1})],Ll.prototype,"stateManager",void 0),Pl([Te({attribute:!1})],Ll.prototype,"hass",void 0),Pl([Te({reflect:!0})],Ll.prototype,"variant",void 0),Pl([Me()],Ll.prototype,"_state",void 0),Pl([Me()],Ll.prototype,"_tabs",void 0),Pl([Me()],Ll.prototype,"_expandedRules",void 0),Ll=Pl([ke("mc-inspector")],Ll);var Ol=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};let Dl=class extends _e{constructor(){super(...arguments),this._suppressUpdate=!1}connectedCallback(){super.connectedCallback(),this.stateManager&&(this._unsubscribe=this.stateManager.subscribe(e=>{this._editorState=e}))}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe?.()}_getOrderedYamlConfig(){const e=this._editorState?.config;if(!e)return{};const{type:t,name:i,template:n,...r}=e;return{type:t,name:i,template:n,...r}}render(){return ne`
      <div class="mc-yaml-container">
        <div class="mc-yaml-editor-wrapper">
          <ha-yaml-editor
            .hass=${this.hass}
            .defaultValue=${this._getOrderedYamlConfig()}
            @value-changed=${this._onYamlChanged}
          ></ha-yaml-editor>
        </div>
      </div>
    `}_onYamlChanged(e){const t=e.detail.value;if(this._editorState){this._suppressUpdate=!0;try{if(t&&"object"==typeof t){const e={...t,type:this._editorState.config.type};this.stateManager.updateConfig(e)}}catch{}finally{this._suppressUpdate=!1}}}};Dl.styles=[et,nt],Ol([Te({attribute:!1})],Dl.prototype,"stateManager",void 0),Ol([Te({attribute:!1})],Dl.prototype,"hass",void 0),Ol([Me()],Dl.prototype,"_editorState",void 0),Dl=Ol([ke("mc-yaml-editor")],Dl);var Nl=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};const Fl=[{id:"form",label:"Form"},{id:"yaml",label:"YAML"}];let jl=class extends _e{constructor(){super(...arguments),this._focusMode=!1}get inspector(){return this.shadowRoot?.querySelector("mc-inspector")??null}connectedCallback(){super.connectedCallback(),this.stateManager&&!this._unsubscribe&&this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe?.(),this._unsubscribe=void 0,this._subscribedTo=void 0}willUpdate(e){e.has("stateManager")&&this.stateManager!==this._subscribedTo&&this._subscribe()}updated(){this._focusMode&&(this._focusMode=!1,this.shadowRoot?.querySelector('.mode [aria-selected="true"]')?.focus())}_subscribe(){this._unsubscribe?.(),this._subscribedTo=this.stateManager,this._unsubscribe=this.stateManager?.subscribe(e=>{this._state=e})}_onModeKeydown(e,t){const i=Fl.findIndex(e=>e.id===t),n={ArrowRight:(i+1)%Fl.length,ArrowLeft:(i-1+Fl.length)%Fl.length,Home:0,End:Fl.length-1}[e.key];void 0!==n&&(e.preventDefault(),this._focusMode=!0,this.stateManager?.setEditorMode(Fl[n].id))}focusStudioButton(){const e=this.shadowRoot?.querySelector(".studio-cta .btn-primary");e?e.focus():this.shadowRoot?.querySelector('.mode [aria-selected="true"]')?.focus()}_openStudio(){this.dispatchEvent(new CustomEvent("open-studio",{bubbles:!0,composed:!0}))}render(){const e=this._state,t=this.stateManager;if(!e||!t)return ne``;const i="yaml"===e.editorMode?"yaml":"form";return ne`
      <div class="pane-head">
        <div class="seg mode" role="tablist" aria-label="Editor mode">
          ${Fl.map(e=>{const n=e.id===i;return ne`
              <button
                type="button"
                role="tab"
                aria-selected=${n?"true":"false"}
                tabindex=${n?"0":"-1"}
                @click=${()=>t.setEditorMode(e.id)}
                @keydown=${e=>this._onModeKeydown(e,i)}
              >${e.label}</button>
            `})}
        </div>
        <button type="button" class="icon-btn" title="Undo" aria-label="Undo" ?disabled=${!t.canUndo()} @click=${()=>t.undo()}>
          <ha-icon icon="mdi:undo"></ha-icon>
        </button>
        <button type="button" class="icon-btn" title="Redo" aria-label="Redo" ?disabled=${!t.canRedo()} @click=${()=>t.redo()}>
          <ha-icon icon="mdi:redo"></ha-icon>
        </button>
      </div>
      <div class="pane-inner">
        <mc-template-bar .config=${e.config} .hass=${this.hass}></mc-template-bar>
        ${"yaml"===i?ne`<mc-yaml-editor .stateManager=${t} .hass=${this.hass}></mc-yaml-editor>`:ne`
              ${this._renderCta(e)}
              <section aria-labelledby="sec-structure">
                <div class="sec-title">
                  <h3 id="sec-structure">Structure</h3>
                  <button type="button" class="btn btn-text btn-sm" @click=${()=>t.setSelectedPath(null)}>
                    <ha-icon icon="mdi:card-outline"></ha-icon>Card settings
                  </button>
                </div>
                <mc-structure-outline .stateManager=${t} variant="pane"></mc-structure-outline>
              </section>
              <div class="insp-wrap">
                <mc-inspector .stateManager=${t} .hass=${this.hass} variant="pane"></mc-inspector>
              </div>
            `}
      </div>
    `}_renderCta(e){const t=e.config,i=t.rows||[],n=Ri(t);return ne`
      <div class="studio-cta">
        <div class="cta-top">
          ${this._renderThumb(t,e)}
          <div class="cta-text">
            <h3>${t.name?.trim()||"Untitled card"}</h3>
            <p>
              ${i.length} row${1===i.length?"":"s"} · ${n} module${1===n?"":"s"}. Build visually with
              layers, canvas and the full inspector.
            </p>
          </div>
        </div>
        <button type="button" class="btn btn-primary" @click=${this._openStudio}>
          <ha-icon icon="mdi:arrow-expand"></ha-icon>Open studio
        </button>
      </div>
    `}_renderThumb(e,t){const i=Mi(t.selectedPath),n=e.rows||[];return ne`
      <div class="thumb" aria-hidden="true">
        ${n.length?n.map((e,t)=>{const n=Wo(e.layout||"1",e.columns.length).map(e=>`${e}fr`).join(" ");return ne`
                <div class="t-row" style="grid-template-columns:${n}">
                  ${e.columns.map((e,n)=>ne`
                      <div class="t-col">
                        ${e.modules?.length?e.modules.map((e,r)=>ne`<span
                                class="t-mod ${"module"===i.kind&&i.row===t&&i.col===n&&i.module===r?"on":""}"
                              ></span>`):ne`<span class="t-mod none"></span>`}
                      </div>
                    `)}
                </div>
              `}):ne`<span class="t-mod none"></span>`}
      </div>
    `}};jl.styles=[Re,v`
      :host {
        display: block;
        min-width: 0;
      }
      .pane-head {
        position: sticky;
        top: 0;
        z-index: 2;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        background: var(--mc-surface);
        border-bottom: 1px solid var(--mc-divider);
      }
      .pane-head .seg {
        margin-right: auto;
      }
      .pane-inner {
        padding: 16px;
        display: grid;
        gap: 24px;
        min-width: 0;
      }
      .studio-cta {
        display: grid;
        gap: 16px;
        padding: 20px;
        border: 1px solid var(--mc-divider);
        border-radius: var(--mc-radius-lg);
      }
      .cta-top {
        display: flex;
        align-items: flex-start;
        gap: 16px;
        min-width: 0;
      }
      .cta-text {
        min-width: 0;
      }
      .studio-cta h3 {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 500;
        line-height: 1.3;
        overflow-wrap: anywhere;
      }
      .studio-cta p {
        margin: 4px 0 0;
        color: var(--mc-text-2);
        font-size: 0.875rem;
      }
      .studio-cta .btn {
        justify-self: start;
      }
      .thumb {
        flex: none;
        width: 72px;
        display: grid;
        gap: 4px;
        padding: 6px;
        border-radius: var(--mc-radius);
        background: var(--mc-surface-2);
      }
      .t-row {
        display: grid;
        gap: 4px;
      }
      .t-col {
        display: grid;
        gap: 3px;
        align-content: start;
      }
      .t-mod {
        display: block;
        height: 7px;
        border-radius: 2px;
        background: var(--mc-field-border);
        opacity: 0.55;
      }
      .t-mod.on {
        background: var(--mc-accent);
        opacity: 1;
      }
      .t-mod.none {
        opacity: 0.2;
      }
      .sec-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 8px;
      }
      .sec-title h3 {
        margin: 0;
        font-size: 1rem;
        font-weight: 500;
      }
      .insp-wrap {
        padding-top: 20px;
        border-top: 1px solid var(--mc-divider);
        min-width: 0;
      }
    `],Nl([Te({attribute:!1})],jl.prototype,"stateManager",void 0),Nl([Te({attribute:!1})],jl.prototype,"hass",void 0),Nl([Me()],jl.prototype,"_state",void 0),jl=Nl([ke("mc-pane-editor")],jl);function Bl(e,t,i){return Math.max(t,Math.min(e,Math.max(t,i)))}var ql=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};const Hl={phone:{label:"Phone",width:360,icon:"mdi:cellphone"},tablet:{label:"Tablet",width:560,icon:"mdi:tablet"},desktop:{label:"Desktop",width:760,icon:"mdi:monitor"}},Gl=["pointerdown","pointerup","mousedown","mouseup","touchstart","touchend","dblclick","contextmenu","keyup"],Ul=new Set(["pointerdown","pointerup","touchstart","touchend"]),Vl=["hass-action","hass-more-info"],Wl=new Set(["render_template","auth/sign_path","camera_thumbnail","weather/subscribe_forecast","magic_card_utils/get_templates","media_source/resolve_media","media_source/browse_media"]),Kl=/^recorder\/(clear|import|update|change|adjust|backup|async_)/;function Ql(e){if("string"!=typeof e||!e)return!1;if(Wl.has(e))return!0;const t=e.slice(e.lastIndexOf("/")+1);return!(!e.startsWith("get")&&!t.startsWith("get")&&"list"!==t)||(!(!e.startsWith("subscribe")&&!t.startsWith("subscribe"))||(!!e.startsWith("history/")||!!e.startsWith("recorder/")&&!Kl.test(e)))}const Yl=e=>e&&"object"==typeof e?e.type:void 0;function Xl(e){return new Proxy(e,{get(e,t){const i=Reflect.get(e,t,e);return"function"!=typeof i?i:"sendMessagePromise"===t?(t,...n)=>Ql(Yl(t))?i.call(e,t,...n):Promise.resolve(void 0):"sendMessage"===t?(t,...n)=>{Ql(Yl(t))&&i.call(e,t,...n)}:i.bind(e)}})}function Zl(e){const t=e.callWS?.bind(e),i=e.connection;return{...e,...i?{connection:Xl(i)}:{},callService:async()=>{},callApi:async()=>{},callWS:async e=>Ql(e?.type)&&t?t(e):void 0}}function Jl(e){const t=e.composedPath()[0];return!!(t&&t instanceof HTMLElement)&&(/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)||t.isContentEditable)}function ec(e){const t=e.dataset;if(t.mcPath){const[e,i,n]=t.mcPath.split(".").map(Number);return{kind:"module",row:e,col:i,module:n}}if(t.mcCol){const[e,i]=t.mcCol.split(".").map(Number);return{kind:"column",row:e,col:i}}return t.mcRow?{kind:"row",row:Number(t.mcRow)}:null}function tc(e){for(const t of e){if(!(t instanceof HTMLElement))continue;const e=ec(t);if(e)return{el:t,sel:e}}return null}function ic(e){return`k-${e.kind}`}let nc=class extends _e{constructor(){super(...arguments),this.device="phone",this._hoverLabel="",this._hoverSel=null,this._cardError="",this._hoverEl=null,this._placeQueued=!1,this._block=e=>{"pointerdown"!==e.type&&"mousedown"!==e.type||this.focusCanvas(),e.stopPropagation(),Ul.has(e.type)||e.preventDefault()},this._stop=e=>{e.stopPropagation()},this._onCardClick=e=>{var t;e.stopPropagation(),e.preventDefault(),this._select((t=e.composedPath(),tc(t)?.sel??null??{kind:"card"})),this.focusCanvas()},this._onCardKeydown=e=>{if("Tab"===e.key)return;if(e.stopPropagation(),Jl(e)&&"Escape"!==e.key)return void e.preventDefault();const t=new KeyboardEvent(e.type,{key:e.key,code:e.code,ctrlKey:e.ctrlKey,metaKey:e.metaKey,altKey:e.altKey,shiftKey:e.shiftKey,repeat:e.repeat,bubbles:!0,composed:!0,cancelable:!0}),i=this.shadowRoot?.querySelector(".canvas");i&&i.dispatchEvent(t),(t.defaultPrevented||"Escape"!==e.key)&&e.preventDefault()},this._onGroundClick=e=>{e.composedPath().some(e=>e instanceof HTMLElement&&e.classList.contains("float-bar"))||this._select({kind:"card"})},this._onKeydown=e=>{if(Jl(e)||!this.stateManager)return;const t=this._sel,i=(e.ctrlKey||e.metaKey)&&!e.altKey;"module"!==t.kind||!e.altKey||"ArrowUp"!==e.key&&"ArrowDown"!==e.key?"module"!==t.kind||"Delete"!==e.key&&"Backspace"!==e.key||i?"module"===t.kind&&i&&"d"===e.key.toLowerCase()?(e.preventDefault(),this._op("duplicate")):"Escape"===e.key&&"card"!==t.kind&&(e.preventDefault(),this._select("module"===t.kind?{kind:"column",row:t.row,col:t.col}:"column"===t.kind?{kind:"row",row:t.row}:{kind:"card"})):(e.preventDefault(),this._op("delete")):(e.preventDefault(),this._op("ArrowUp"===e.key?"up":"down"))},this._onPointerMove=e=>{const t=e.composedPath(),i=this._card,n=tc(t)??(i&&t.includes(i)?{el:i,sel:{kind:"card"}}:null),r=n?.el??null;if(r===this._hoverEl)return;this._hoverEl=r,this._hoverSel=n?.sel??null;const a=this._state?.config;this._hoverLabel=n&&a&&"card"!==n.sel.kind?Di(a,n.sel).title:"",this._placeHover()},this._onPointerLeave=()=>{this._hoverEl=null,this._hoverSel=null,this._placeHover()},this._queuePlace=()=>{if(this._placeQueued)return;this._placeQueued=!0;const e=this._card;(e?e.updateComplete:Promise.resolve(!0)).then(()=>requestAnimationFrame(()=>{this._placeQueued=!1,this._place()}))}}focusCanvas(){this.shadowRoot?.querySelector(".canvas")?.focus({preventScroll:!0})}connectedCallback(){super.connectedCallback(),this.stateManager&&!this._unsubscribe&&this._subscribe(),this.hasUpdated&&this._observe(),window.addEventListener("resize",this._queuePlace)}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe?.(),this._unsubscribe=void 0,this._subscribedTo=void 0,this._ro?.disconnect(),this._ro=void 0,window.removeEventListener("resize",this._queuePlace)}willUpdate(e){e.has("stateManager")&&this.stateManager!==this._subscribedTo&&this._subscribe()}_subscribe(){this._unsubscribe?.(),this._subscribedTo=this.stateManager,this._unsubscribe=this.stateManager?.subscribe(e=>{this._state=e})}firstUpdated(){const e=document.createElement(c);e.editMode=!0,this._card=e,this.hass&&(e.hass=Zl(this.hass)),this._syncCard();const t=this.shadowRoot.querySelector(".card-host");for(const e of Gl)t.addEventListener(e,this._block,!0);t.addEventListener("click",this._onCardClick,!0),t.addEventListener("keydown",this._onCardKeydown,!0);for(const e of Vl)t.addEventListener(e,this._stop);t.appendChild(e),this._observe()}_observe(){if(this._ro||"undefined"==typeof ResizeObserver)return;this._ro=new ResizeObserver(this._queuePlace);const e=this.shadowRoot?.querySelector(".canvas-inner");e&&this._ro.observe(e),this._card&&this._ro.observe(this._card)}updated(e){e.has("hass")&&this._card&&this.hass&&(this._card.hass=Zl(this.hass)),e.has("_state")&&this._syncCard(),this._queuePlace()}_syncCard(){const e=this._card,t=this._state?.config;if(!e||!t||t===this._cardConfig)return;this._cardConfig=t;const i={...t};delete i.template;try{e.setConfig(i),this._cardError=""}catch(e){this._cardError=e instanceof Error?e.message:String(e)}}get _sel(){return Mi(this._state?.selectedPath??null)}_select(e){this.stateManager?.setSelectedPath(Ai(e))}_op(e){const t=this.stateManager,i=this._sel;t&&"module"===i.kind&&("up"===e||"down"===e?t.moveModuleBy(i.row,i.col,i.module,"up"===e?-1:1):"duplicate"===e?t.duplicateModule(i.row,i.col,i.module):t.deleteModule(i.row,i.col,i.module))}async _onBarClick(e,t){const i=t.currentTarget;this._op(e),await this.updateComplete,"delete"!==e&&!i.disabled&&i.isConnected&&"module"===this._sel.kind||this.focusCanvas()}_rectOf(e){const t=this._card;if(!t)return null;const i=function(e){switch(e.kind){case"card":return null;case"row":return`[data-mc-row="${e.row}"]`;case"column":return`[data-mc-col="${e.row}.${e.col}"]`;case"module":return`[data-mc-path="${e.row}.${e.col}.${e.module}"]`}}(e),n=i?t.shadowRoot?.querySelector(i):t;if(!n)return null;const r=n.getBoundingClientRect();return r.width||r.height?r:null}_place(){const e=this.shadowRoot,t=e?.querySelector(".canvas-inner"),i=e?.querySelector(".sel-frame"),n=e?.querySelector(".float-bar");if(!t||!i||!n)return;const r=this._sel,a=this._rectOf(r),o=e?.querySelector(".canvas");if(!a)return i.hidden=!0,n.hidden=!0,o?.classList.remove("framed"),void this._placeHover();const s=t.getBoundingClientRect(),l=a.top-s.top-6,c=a.left-s.left-6,d=a.width+12,p=a.height+12;if(i.hidden=!1,Object.assign(i.style,{top:`${l}px`,left:`${c}px`,width:`${d}px`,height:`${p}px`}),"module"!==r.kind)n.hidden=!0;else{n.hidden=!1;const e=o,i=`${r.row}.${r.col}.${r.module}`,a=[...this._card?.shadowRoot?.querySelectorAll("[data-mc-path]")??[]].filter(e=>e.dataset.mcPath!==i).map(e=>e.getBoundingClientRect()).filter(e=>e.width||e.height).map(e=>({top:e.top-s.top,left:e.left-s.left,width:e.width,height:e.height})),u={top:e.scrollTop,left:e.scrollLeft,width:Math.min(e.clientWidth,t.clientWidth),height:e.clientHeight},h=function(e,t,i,n){const r=n.top+8,a=n.top+n.height-8,o=n.left+8,s=n.left+n.width-8,l=Bl(e.left+e.width-t.width,o,s-t.width),c=(e,n)=>{const l={top:e,left:n,width:t.width,height:t.height};return!(e<r||e+t.height>a||n<o||n+t.width>s||i.some(e=>function(e,t){return e.left<t.left+t.width&&t.left<e.left+e.width&&e.top<t.top+t.height&&t.top<e.top+e.height}(l,e)))},d=[[e.top+e.height+8,l],[e.top-28-8-t.height,l],[e.top,e.left+e.width+8]];for(const[e,t]of d)if(c(e,t))return{top:e,left:t};return{top:Bl(e.top+8,r,a-t.height),left:Bl(e.left+e.width-t.width-8,o,s-t.width)}}({top:l,left:c,width:d,height:p},{width:n.offsetWidth,height:n.offsetHeight},a,u);Object.assign(n.style,{top:`${h.top}px`,left:`${h.left}px`})}o?.classList.toggle("framed",!i.hidden),this._placeHover()}_placeHover(){const e=this.shadowRoot,t=e?.querySelector(".canvas-inner"),i=e?.querySelector(".hover-frame");if(!t||!i)return;const n=this._hoverEl,r=!!this._hoverSel&&function(e,t){return Ei(e)===Ei(t)}(this._hoverSel,this._sel);if(!n||!n.isConnected||r)return void(i.hidden=!0);const a=t.getBoundingClientRect(),o=n.getBoundingClientRect();i.hidden=!1,Object.assign(i.style,{top:o.top-a.top-4+"px",left:o.left-a.left-4+"px",width:`${o.width+8}px`,height:`${o.height+8}px`})}render(){const e=this._state,t=Hl[this.device]||Hl.phone,i=this._sel,n=e?.config,r=n?Di(n,i).title:"",a="module"===i.kind?n?.rows[i.row]?.columns[i.col]?.modules?.length??0:0,o="module"===i.kind&&0===i.module,s="module"===i.kind&&i.module>=a-1;return ne`
      <div
        class="canvas"
        tabindex="0"
        role="region"
        aria-label="Canvas, ${r} selected"
        aria-describedby="canvas-hint"
        @click=${this._onGroundClick}
        @keydown=${this._onKeydown}
        @scroll=${this._queuePlace}
        @pointermove=${this._onPointerMove}
        @pointerleave=${this._onPointerLeave}
      >
        <div class="canvas-inner">
          <div class="device" style="--device-w:${t.width}px" @transitionend=${this._queuePlace}>
            <div class="device-label"><span>${t.label} · ${t.width} px</span><span>Live data</span></div>
            ${this._cardError?ne`<p class="card-error" role="status">Preview not updated: ${this._cardError}</p>`:ae}
            <div class="card-host"></div>
          </div>
          <div class="hover-frame ${ic(this._hoverSel??{kind:"module",row:0,col:0,module:0})}"
            hidden aria-hidden="true">${this._hoverLabel?ne`<span class="tag">${this._hoverLabel}</span>`:ae}</div>
          <div class="sel-frame ${ic(i)}" hidden aria-hidden="true">
            ${"card"===i.kind?ae:ne`<span class="tag">${r}</span>`}
            ${"module"===i.kind?ne`<i class="h tl"></i><i class="h tr"></i><i class="h bl"></i><i class="h br"></i>`:ae}
          </div>
          <div class="float-bar" role="toolbar" aria-label="Module actions" hidden>
            <button type="button" class="icon-btn sm" aria-label="Move up" title="Move up (Alt+Up)" ?disabled=${o}
              @click=${e=>this._onBarClick("up",e)}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
            <button type="button" class="icon-btn sm" aria-label="Move down" title="Move down (Alt+Down)" ?disabled=${s}
              @click=${e=>this._onBarClick("down",e)}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
            <span class="sep" aria-hidden="true"></span>
            <button type="button" class="icon-btn sm" aria-label="Duplicate" title="Duplicate (Ctrl+D)"
              @click=${e=>this._onBarClick("duplicate",e)}><ha-icon icon="mdi:content-copy"></ha-icon></button>
            <button type="button" class="icon-btn sm danger" aria-label="Delete" title="Delete (Del)"
              @click=${e=>this._onBarClick("delete",e)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
          </div>
        </div>
      </div>
      <p class="canvas-hint" id="canvas-hint">
        Click a module to select it. <kbd>Alt</kbd> + <kbd>Up</kbd>/<kbd>Down</kbd> moves it, <kbd>Del</kbd> removes it.
      </p>
    `}};nc.styles=[Re,v`
      :host {
        position: relative;
        display: grid;
        grid-template-rows: minmax(0, 1fr);
        min-height: 0;
        min-width: 0;
      }
      .canvas {
        overflow: auto;
        min-height: 0;
        background-color: var(--mc-canvas);
        background-image: radial-gradient(var(--mc-canvas-dot) 1px, transparent 1.2px);
        background-size: 16px 16px;
      }
      /* The selection frame is the focus indicator; a subtle ring only when nothing is framed. */
      .canvas:focus-visible {
        /* --mc-text-2: non-accent, >= 3:1 against --mc-canvas in light (5.2:1) and dark (6.0:1) */
        outline: 2px solid var(--mc-text-2);
        outline-offset: -2px;
      }
      .canvas.framed:focus-visible {
        outline: none;
      }
      .canvas-inner {
        position: relative;
        min-height: 100%;
        padding: 56px 24px 96px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .device {
        width: var(--device-w, 360px);
        max-width: 100%;
        transition: width 0.22s ease-out;
      }
      .device-label {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 8px;
        font-size: 0.75rem;
        color: var(--mc-text-2);
      }
      .card-host {
        cursor: default;
      }
      .card-error {
        margin: 0 0 8px;
        font-size: 0.75rem;
        color: var(--mc-error-ink);
        overflow-wrap: anywhere;
      }
      .hover-frame,
      .sel-frame {
        position: absolute;
        pointer-events: none;
      }
      /* Colours per level come from .k-card / .k-row / .k-column / .k-module (--k, --k-fill, --k-ink). */
      .hover-frame {
        z-index: 3;
        border: 1px solid color-mix(in srgb, var(--k) 70%, transparent);
        border-radius: 11px;
      }
      .hover-frame .tag {
        position: absolute;
        left: 0;
        top: -22px;
        padding: 2px 8px;
        border-radius: 6px;
        font-size: 0.75rem;
        font-weight: 500;
        line-height: 1.5;
        white-space: nowrap;
        background: var(--mc-surface);
        color: var(--k-ink);
        box-shadow: 0 0 0 1px color-mix(in srgb, var(--k) 55%, transparent);
      }
      .sel-frame {
        z-index: 4;
        border: 2px solid var(--k);
        border-radius: 10px;
        transition: border-color 0.15s ease-out, top 0.2s ease-out, left 0.2s ease-out, width 0.2s ease-out, height 0.2s ease-out;
      }
      .sel-frame .h {
        position: absolute;
        width: 8px;
        height: 8px;
        background: var(--mc-surface);
        border: 2px solid var(--k);
        border-radius: 2px;
      }
      .sel-frame .h.tl { left: -5px; top: -5px; }
      .sel-frame .h.tr { right: -5px; top: -5px; }
      .sel-frame .h.bl { left: -5px; bottom: -5px; }
      .sel-frame .h.br { right: -5px; bottom: -5px; }
      .sel-frame .tag {
        position: absolute;
        left: -2px;
        top: -28px;
        padding: 2px 8px;
        border-radius: 6px;
        background: var(--k-fill);
        color: var(--mc-on-accent);
        font-size: 0.75rem;
        font-weight: 500;
        line-height: 1.5;
        white-space: nowrap;
      }
      .float-bar {
        position: absolute;
        z-index: 5;
        display: flex;
        gap: 2px;
        padding: 4px;
        border-radius: 10px;
        background: var(--mc-surface);
        border: 1px solid var(--mc-divider);
        box-shadow: var(--mc-shadow-float);
        transition: top 0.2s ease-out, left 0.2s ease-out;
      }
      .float-bar .sep {
        width: 1px;
        margin: 4px 2px;
        background: var(--mc-divider);
      }
      .canvas-hint {
        position: absolute;
        left: 16px;
        bottom: 16px;
        z-index: 3;
        max-width: calc(100% - 32px);
        margin: 0;
        padding: 6px 10px;
        font-size: 0.75rem;
        color: var(--mc-text-2);
        background: var(--mc-surface);
        border: 1px solid var(--mc-divider);
        border-radius: var(--mc-radius);
      }
      @media (max-width: 640px) {
        .canvas-hint {
          display: none;
        }
        /* Stacked studio: the canvas grows to fit the card; the studio workspace does the scrolling. */
        :host {
          grid-template-rows: auto;
        }
        .canvas {
          overflow: visible;
        }
        .canvas-inner {
          padding: 56px 16px 64px;
        }
      }
      kbd {
        font-family: var(--mc-mono);
        font-size: 0.75rem;
        padding: 0 4px;
        border: 1px solid var(--mc-divider);
        border-radius: 4px;
        background: var(--mc-surface-2);
      }
    `],ql([Te({attribute:!1})],nc.prototype,"stateManager",void 0),ql([Te({attribute:!1})],nc.prototype,"hass",void 0),ql([Te()],nc.prototype,"device",void 0),ql([Me()],nc.prototype,"_state",void 0),ql([Me()],nc.prototype,"_hoverLabel",void 0),ql([Me()],nc.prototype,"_hoverSel",void 0),ql([Me()],nc.prototype,"_cardError",void 0),nc=ql([ke("mc-studio-canvas")],nc);var rc=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};const ac=[{id:"form",label:"Form"},{id:"yaml",label:"YAML"}],oc=Object.keys(Hl);function sc(e,t,i){return{ArrowRight:(t+1)%i,ArrowLeft:(t-1+i)%i,Home:0,End:i-1}[e]}let lc=class extends _e{constructor(){super(...arguments),this.open=!1,this._device="phone",this._showLayers=!1,this._focusSel=null,this._close=()=>{this.dispatchEvent(new CustomEvent("studio-close",{bubbles:!0,composed:!0}))},this._onCancel=e=>{e.preventDefault(),this._close()},this._onNativeClose=()=>{this.open&&this._close()},this._onKeydown=e=>{e.stopPropagation();const t=this.stateManager;if(!t||e.defaultPrevented)return;const i=e.key.toLowerCase();if((e.ctrlKey||e.metaKey)&&!e.altKey&&("z"===i||"y"===i)){if(function(e){const t=e.composedPath()[0];return t instanceof HTMLElement&&(/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)||t.isContentEditable)}(e))return;return e.preventDefault(),void("y"===i||e.shiftKey?t.redo():t.undo())}if("Escape"!==e.key)return;if(this._showLayers&&window.matchMedia?.("(max-width: 900px)").matches)return e.preventDefault(),this._showLayers=!1,void(this._focusSel=".layers-toggle");e.composedPath().some(e=>e instanceof HTMLElement&&"dialog"===e.getAttribute("role"))&&e.preventDefault()}}get inspector(){return this.shadowRoot?.querySelector("mc-inspector")??null}get _dialog(){return this.shadowRoot?.querySelector("dialog")??null}connectedCallback(){super.connectedCallback(),this.stateManager&&!this._unsubscribe&&this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe?.(),this._unsubscribe=void 0,this._subscribedTo=void 0}willUpdate(e){e.has("stateManager")&&this.stateManager!==this._subscribedTo&&this._subscribe()}_subscribe(){this._unsubscribe?.(),this._subscribedTo=this.stateManager,this._unsubscribe=this.stateManager?.subscribe(e=>{this._state=e})}updated(e){e.has("open")&&this._syncOpen(),this._focusSel&&(this.shadowRoot?.querySelector(this._focusSel)?.focus(),this._focusSel=null)}_syncOpen(){const e=this._dialog;if(e)if(this.open&&!e.open){e.showModal(),this._showLayers=!1;const t=this.shadowRoot?.querySelector("mc-studio-canvas");t?.updateComplete.then(()=>t.focusCanvas())}else!this.open&&e.open&&e.close()}_onModeKeydown(e,t){const i=sc(e.key,ac.findIndex(e=>e.id===t),ac.length);void 0!==i&&(e.preventDefault(),this._focusSel='.mode [aria-selected="true"]',this.stateManager?.setEditorMode(ac[i].id))}_onDeviceKeydown(e){const t=sc(e.key,oc.indexOf(this._device),oc.length);void 0!==t&&(e.preventDefault(),this._device=oc[t],this._focusSel='.devices [aria-checked="true"]')}_renderTopbar(e,t){const i=this.stateManager;return ne`
      <header class="topbar">
        <div class="grp">
          <button type="button" class="btn btn-secondary btn-sm" @click=${this._close}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>Back to dialog
          </button>
          <button
            type="button"
            class="icon-btn layers-toggle"
            aria-label=${this._showLayers?"Hide layers":"Show layers"}
            title="Layers"
            aria-controls="layers"
            aria-expanded=${this._showLayers?"true":"false"}
            @click=${()=>{this._showLayers=!this._showLayers}}
          >
            <ha-icon icon="mdi:layers-outline"></ha-icon>
          </button>
          <span class="vr" aria-hidden="true"></span>
          <div class="title">
            <strong>${e.config.name?.trim()||"Untitled card"}</strong>
            <mc-template-bar compact .config=${e.config} .hass=${this.hass}></mc-template-bar>
          </div>
        </div>
        <span class="spacer"></span>
        <div class="grp">
          <div class="seg mode" role="tablist" aria-label="Editor mode">
            ${ac.map(e=>{const n=e.id===t;return ne`<button
                type="button"
                role="tab"
                aria-selected=${n?"true":"false"}
                tabindex=${n?"0":"-1"}
                @click=${()=>i.setEditorMode(e.id)}
                @keydown=${e=>this._onModeKeydown(e,t)}
              >${e.label}</button>`})}
          </div>
          <div class="seg devices" role="radiogroup" aria-label="Canvas width" ?hidden=${"form"!==t}>
            ${oc.map(e=>{const t=Hl[e],i=e===this._device;return ne`<button
                type="button"
                role="radio"
                aria-checked=${i?"true":"false"}
                tabindex=${i?"0":"-1"}
                aria-label="${t.label}, ${t.width} pixels"
                title="${t.label} - ${t.width} px"
                @click=${()=>{this._device=e}}
                @keydown=${this._onDeviceKeydown}
              ><ha-icon icon=${t.icon}></ha-icon></button>`})}
          </div>
        </div>
        <span class="spacer"></span>
        <div class="grp">
          <button type="button" class="icon-btn" aria-label="Undo (Ctrl+Z)" title="Undo (Ctrl+Z)"
            ?disabled=${!i.canUndo()} @click=${()=>i.undo()}><ha-icon icon="mdi:undo"></ha-icon></button>
          <button type="button" class="icon-btn" aria-label="Redo (Ctrl+Y)" title="Redo (Ctrl+Y)"
            ?disabled=${!i.canRedo()} @click=${()=>i.redo()}><ha-icon icon="mdi:redo"></ha-icon></button>
          <button type="button" class="btn btn-primary btn-sm" @click=${this._close}>
            <ha-icon icon="mdi:check"></ha-icon>Done
          </button>
        </div>
      </header>
    `}render(){const e=this._state,t=this.stateManager,i="yaml"===e?.editorMode?"yaml":"form",n=e?Ri(e.config):0;return ne`
      <dialog
        class="studio ${this._showLayers?"show-layers":""}"
        aria-label="Magic Card studio"
        @cancel=${this._onCancel}
        @close=${this._onNativeClose}
        @keydown=${this._onKeydown}
      >
        ${e&&t&&this.open?ne`
              ${this._renderTopbar(e,i)}
              <div class="workspace">
                <nav class="panel layers" id="layers" aria-label="Layers">
                  <div class="panel-title">
                    <h2>Layers</h2>
                    <span class="chip is-count">${n} module${1===n?"":"s"}</span>
                  </div>
                  <mc-structure-outline .stateManager=${t} variant="layers"></mc-structure-outline>
                </nav>
                <div class="center">
                  ${"form"===i?ne`<mc-studio-canvas .stateManager=${t} .hass=${this.hass} .device=${this._device}></mc-studio-canvas>`:ne`
                        <div class="center-alt">
                          <div class="yaml-view"><mc-yaml-editor .stateManager=${t} .hass=${this.hass}></mc-yaml-editor></div>
                        </div>
                      `}
                </div>
                <aside class="panel inspector" aria-label="Inspector">
                  <mc-inspector .stateManager=${t} .hass=${this.hass} variant="studio"></mc-inspector>
                </aside>
              </div>
            `:ne``}
        <slot></slot>
      </dialog>
    `}};lc.styles=[Re,v`
      :host {
        display: contents;
      }
      dialog.studio {
        width: 100vw;
        height: 100vh;
        height: 100dvh;
        max-width: none;
        max-height: none;
        margin: 0;
        padding: 0;
        border: 0;
        inset: 0;
        background: var(--mc-ground);
        color: var(--mc-text);
        font-size: 0.875rem;
        line-height: 1.5;
        overflow: hidden;
        opacity: 0;
        transform: scale(0.985);
        transition: opacity 0.2s ease-out, transform 0.2s ease-out;
      }
      dialog.studio[open] {
        display: grid;
        grid-template-rows: auto minmax(0, 1fr);
        opacity: 1;
        transform: none;
      }
      @starting-style {
        dialog.studio[open] {
          opacity: 0;
          transform: scale(0.985);
        }
      }
      dialog.studio::backdrop {
        background: transparent;
      }
      @media (prefers-reduced-motion: reduce) {
        dialog.studio {
          transition: none;
        }
      }

      /* topbar */
      .topbar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px 12px;
        padding: 8px 12px;
        background: var(--mc-surface);
        border-bottom: 1px solid var(--mc-divider);
        position: relative;
        z-index: 6;
      }
      .grp {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 0;
      }
      .title {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 0;
        flex-wrap: wrap;
      }
      .title strong {
        font-size: 1rem;
        font-weight: 500;
        overflow-wrap: anywhere;
      }
      .vr {
        width: 1px;
        height: 24px;
        background: var(--mc-divider);
      }
      .spacer {
        flex: 1;
      }
      .layers-toggle {
        display: none;
      }

      /* workspace */
      .workspace {
        position: relative;
        display: grid;
        grid-template-columns: 240px minmax(0, 1fr) 340px;
        min-height: 0;
      }
      .panel {
        background: var(--mc-surface);
        min-height: 0;
        min-width: 0;
        overflow-y: auto;
      }
      .layers {
        border-right: 1px solid var(--mc-divider);
        padding: 12px 8px;
      }
      .inspector {
        border-left: 1px solid var(--mc-divider);
      }
      .panel-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 4px 8px 8px;
      }
      .panel-title h2 {
        margin: 0;
        font-size: 0.8125rem;
        font-weight: 500;
        color: var(--mc-text-2);
      }
      .center {
        position: relative;
        display: grid;
        grid-template-rows: minmax(0, 1fr);
        min-height: 0;
        min-width: 0;
      }
      .center-alt {
        padding: 24px;
        overflow: auto;
        min-height: 0;
      }
      .yaml-view {
        max-width: 760px;
        margin: 0 auto;
        background: var(--mc-surface);
        border: 1px solid var(--mc-divider);
        border-radius: var(--mc-radius-lg);
        overflow: hidden;
      }

      @media (max-width: 1180px) {
        .workspace {
          grid-template-columns: 220px minmax(0, 1fr) 320px;
        }
      }
      @media (max-width: 900px) {
        .workspace {
          grid-template-columns: minmax(0, 1fr) min(340px, 100%);
        }
        .layers {
          display: none;
          position: absolute;
          z-index: 7;
          left: 0;
          top: 0;
          bottom: 0;
          width: 260px;
          box-shadow: var(--mc-shadow-float);
        }
        .show-layers .layers {
          display: block;
        }
        .layers-toggle {
          display: inline-grid;
        }
      }
      @media (max-width: 640px) {
        .workspace {
          grid-template-columns: minmax(0, 1fr);
          grid-template-rows: auto auto;
          align-content: start;
          overflow-y: auto;
        }
        .center {
          grid-template-rows: auto;
          min-height: 320px;
        }
        .inspector {
          border-left: 0;
          border-top: 1px solid var(--mc-divider);
          overflow: visible;
        }
        .layers {
          max-width: 100%;
        }
      }
    `],rc([Te({attribute:!1})],lc.prototype,"stateManager",void 0),rc([Te({attribute:!1})],lc.prototype,"hass",void 0),rc([Te({type:Boolean})],lc.prototype,"open",void 0),rc([Me()],lc.prototype,"_state",void 0),rc([Me()],lc.prototype,"_device",void 0),rc([Me()],lc.prototype,"_showLayers",void 0),lc=rc([ke("mc-studio")],lc);var cc=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};const dc={content:"Content",controls:"Controls",layout:"Layout",advanced:"Advanced"};let pc=class extends _e{constructor(){super(...arguments),this._searchQuery="",this._category="all"}firstUpdated(){this.shadowRoot?.querySelector(".mc-picker-search input")?.focus()}render(){const e=this._searchQuery?dt.search(this._searchQuery):dt.getAll(),t=new Map;for(const i of p){if("all"!==this._category&&this._category!==i)continue;const n=e.filter(e=>e.metadata.category===i).map(e=>e.metadata);n.length>0&&t.set(i,n)}const i=["all",...p];return ne`
      <div class="mc-picker-overlay" @click=${this._onOverlayClick}>
        <div
          class="mc-picker-modal"
          role="dialog"
          aria-label="Add module"
          @click=${e=>e.stopPropagation()}
          @keydown=${this._onDialogKeyDown}
        >
          <div class="mc-picker-header">
            <h2 class="mc-picker-title">Add module</h2>
            <button type="button" class="icon-btn" aria-label="Close" title="Close" @click=${this._onClose}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="mc-picker-search">
            ${as("Search modules",this._searchQuery,e=>{this._searchQuery=e})}
            <div class="seg full" role="radiogroup" aria-label="Module category">
              ${i.map(e=>ne`
                  <button
                    type="button"
                    role="radio"
                    aria-checked=${this._category===e?"true":"false"}
                    @click=${()=>{this._category=e}}
                  >
                    ${"all"===e?"All":dc[e]??e}
                  </button>
                `)}
            </div>
          </div>
          <div class="mc-picker-list">
            ${0===t.size?ne`
              <div class="mc-picker-empty">
                ${this._searchQuery?`No modules match "${this._searchQuery}".`:"No modules in this category."}
              </div>
            `:Array.from(t.entries()).map(([e,t])=>ne`
                ${"all"===this._category?ne`<div class="mc-picker-category">${dc[e]??e}</div>`:""}
                ${t.map(e=>ne`
                    <button
                      type="button"
                      class="mc-picker-item"
                      @click=${()=>this._onSelect(e)}
                      aria-label=${`Add ${e.name} module`}
                    >
                      <span class="mc-picker-item-icon"><ha-icon icon=${e.icon}></ha-icon></span>
                      <span class="mc-picker-item-content">
                        <span class="mc-picker-item-name">${e.name}</span>
                        <span class="mc-picker-item-desc">${e.description}</span>
                      </span>
                    </button>
                  `)}
              `)}
          </div>
        </div>
      </div>
    `}_onSelect(e){this.dispatchEvent(new CustomEvent("module-selected",{bubbles:!0,composed:!0,detail:{type:e.type}}))}_onClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}_onOverlayClick(){this._onClose()}_onDialogKeyDown(e){"Escape"===e.key&&(e.preventDefault(),e.stopPropagation(),this._onClose())}};pc.styles=[Re,tt,it],cc([Me()],pc.prototype,"_searchQuery",void 0),cc([Me()],pc.prototype,"_category",void 0),pc=cc([ke("mc-module-selector")],pc);var uc=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};let hc=class extends _e{constructor(){super(...arguments),this._modalCtrl=new is(this),this.mode="create",this._templateName="",this._templateDescription="",this._searchQuery="",this._error="",this._confirmLoad=null,this._showOverwrite=!1,this._templates={},this._loading=!0,this._saving=!1,this._editingTemplate=null,this._editName="",this._editDescription=""}connectedCallback(){super.connectedCallback(),this._loadTemplates()}updated(e){super.updated(e),e.has("hass")&&this.hass&&0===Object.keys(this._templates).length&&!this._loading&&this._loadTemplates()}async _loadTemplates(){this._loading=!0;try{if(this.hass){const e=await this.hass.callWS({type:"magic_card_utils/get_templates"});this._templates=e.templates||{}}}catch{this._templates={},this._error="Magic Card integration not found. Please install it via HACS and add the integration."}this._loading=!1}async _saveTemplate(e,t){this._saving=!0;try{return this.hass?(await this.hass.callWS({type:"magic_card_utils/save_template",name:e,template:t}),this._templates={...this._templates,[e]:t},this._saving=!1,!0):(this._error="Home Assistant connection unavailable.",this._saving=!1,!1)}catch{return this._error="Failed to save template.",this._saving=!1,!1}}async _deleteTemplate(e){try{if(!this.hass)return!1;await this.hass.callWS({type:"magic_card_utils/delete_template",name:e});const t={...this._templates};return delete t[e],this._templates=t,!0}catch{return this._error="Failed to delete template.",!1}}_close(){this._modalCtrl.reset(),this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}async _handleCreateSave(){const e=this._templateName.trim();if(!e)return void(this._error="Template name is required.");if(this._templates[e]&&!this._showOverwrite)return void(this._showOverwrite=!0);if(!this.config)return void(this._error="No config available to save.");const t={config:yi(this.config)},i=this._templateDescription.trim();i&&(t.description=i);if(await this._saveTemplate(e,t)){const t=yi(this.config);t.template=e,this.dispatchEvent(new CustomEvent("template-selected",{detail:{config:t},bubbles:!0,composed:!0})),this._close()}}_handleLoadConfirm(e){const t=this._templates[e];if(!t)return;const i=yi(t.config);i.type="custom:magic-card",i.template=e,this.dispatchEvent(new CustomEvent("template-selected",{detail:{config:i},bubbles:!0,composed:!0})),this._close()}async _handleDelete(e){await this._deleteTemplate(e),this._confirmLoad===e&&(this._confirmLoad=null),this._editingTemplate===e&&(this._editingTemplate=null)}_startEdit(e){const t=this._templates[e];this._editingTemplate=e,this._editName=e,this._editDescription=t?.description||"",this._confirmLoad=null}_cancelEdit(){this._editingTemplate=null,this._editName="",this._editDescription=""}async _saveEdit(){if(!this._editingTemplate||!this.hass)return;const e=this._editingTemplate,t=this._editName.trim();if(!t)return void(this._error="Template name is required.");const i=this._templates[e];if(!i)return;const n={...i,description:this._editDescription.trim()||void 0};if(t!==e){if(this._templates[t])return void(this._error=`A template named "${t}" already exists.`);await this._deleteTemplate(e)}await this._saveTemplate(t,n)&&(this._editingTemplate=null,this._editName="",this._editDescription="",this._error="")}_getFilteredTemplates(){const e=Object.keys(this._templates).sort((e,t)=>e.localeCompare(t));if(!this._searchQuery)return e;const t=this._searchQuery.toLowerCase();return e.filter(e=>e.toLowerCase().includes(t))}render(){const e="create"===this.mode?"Create template":"Load template";return ne`
      <div class="mc-picker-overlay" @click=${()=>{this._modalCtrl.consumeDragFlag()||this._close()}}>
        <div class="mc-picker-modal" role="dialog" @keydown=${ns(()=>this._close())} aria-label=${e} @click=${e=>e.stopPropagation()}>
          ${rs(e,this._modalCtrl,()=>this._close())}
          ${"create"===this.mode?this._renderCreate():this._renderLink()}
          ${os(this._modalCtrl)}
        </div>
      </div>
    `}_renderCreate(){return ne`
      <div class="mc-template-form">
        <div class="field">
          <div class="field-head"><label for="tpl-name">Template name</label></div>
          <input
            id="tpl-name"
            class="input"
            type="text"
            .value=${this._templateName}
            @input=${e=>{this._templateName=e.target.value,this._error="",this._showOverwrite=!1}}
          />
        </div>
        <div class="field">
          <div class="field-head"><label for="tpl-desc">Description (optional)</label></div>
          <textarea
            id="tpl-desc"
            class="input"
            .value=${this._templateDescription}
            @input=${e=>{this._templateDescription=e.target.value}}
          ></textarea>
        </div>
        ${this._error?ne`<div class="mc-template-error" role="alert">${this._error}</div>`:ae}
        ${this._showOverwrite?ne`
              <div class="mc-template-overwrite">
                A template named "${this._templateName.trim()}" already exists. Overwrite?
              </div>
            `:ae}
      </div>
      <div class="mc-picker-footer">
        <button type="button" class="btn btn-secondary" @click=${this._close}>Cancel</button>
        ${this._showOverwrite?ne`<button type="button" class="btn btn-primary" ?disabled=${this._saving} @click=${this._handleCreateSave}>Overwrite</button>`:ne`<button type="button" class="btn btn-primary" ?disabled=${!this._templateName.trim()||this._saving} @click=${this._handleCreateSave}>Save</button>`}
      </div>
    `}_renderEditForm(){return ne`
      <div class="mc-template-edit-form">
        <div class="field">
          <div class="field-head"><label for="tpl-edit-name">Template name</label></div>
          <input
            id="tpl-edit-name"
            class="input"
            type="text"
            .value=${this._editName}
            @input=${e=>{this._editName=e.target.value,this._error=""}}
            @click=${e=>e.stopPropagation()}
          />
        </div>
        <div class="field">
          <div class="field-head"><label for="tpl-edit-desc">Description (optional)</label></div>
          <textarea
            id="tpl-edit-desc"
            class="input"
            .value=${this._editDescription}
            @input=${e=>{this._editDescription=e.target.value}}
            @click=${e=>e.stopPropagation()}
          ></textarea>
        </div>
        ${this._error?ne`<div class="mc-template-error" role="alert">${this._error}</div>`:ae}
        <div class="mc-template-edit-actions">
          <button type="button" class="btn btn-secondary btn-sm" @click=${this._cancelEdit}>Cancel</button>
          <button
            type="button"
            class="btn btn-primary btn-sm"
            ?disabled=${!this._editName.trim()||this._saving}
            @click=${this._saveEdit}
          >
            Save
          </button>
        </div>
      </div>
    `}_renderLink(){if(this._loading)return ne`<div class="mc-picker-loading">Loading templates...</div>`;const e=this._getFilteredTemplates();return ne`
      <div class="mc-picker-search">
        ${as("Search templates",this._searchQuery,e=>{this._searchQuery=e})}
      </div>
      ${this._confirmLoad?ne`
            <div class="mc-template-confirm">
              <div class="mc-template-confirm-text">
                Load "${this._confirmLoad}"? This will replace your current config.
              </div>
              <div class="mc-template-confirm-actions">
                <button type="button" class="btn btn-secondary btn-sm" @click=${()=>{this._confirmLoad=null}}>Cancel</button>
                <button type="button" class="btn btn-primary btn-sm" @click=${()=>this._handleLoadConfirm(this._confirmLoad)}>Load</button>
              </div>
            </div>
          `:ae}
      ${this._editingTemplate?this._renderEditForm():ae}
      <div class="mc-picker-list">
        ${e.length>0?e.map(e=>ne`
                <div
                  class="mc-picker-item ${this._confirmLoad===e?"selected":""}"
                  role="button"
                  tabindex="0"
                  @click=${()=>{this._confirmLoad=e}}
                  @keydown=${t=>{t.target!==t.currentTarget||"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._confirmLoad=e)}}
                >
                  <span class="mc-picker-item-icon"><ha-icon icon="mdi:file-document-outline"></ha-icon></span>
                  <span class="mc-picker-item-content">
                    <span class="mc-picker-item-name">${e}</span>
                    ${this._templates[e]?.description?ne`<span class="mc-picker-item-meta">${this._templates[e].description}</span>`:ae}
                  </span>
                  <span class="mc-picker-item-actions">
                    <button
                      type="button"
                      class="icon-btn sm"
                      title="Edit template"
                      aria-label=${`Edit template ${e}`}
                      @click=${t=>{t.stopPropagation(),this._startEdit(e)}}
                    >
                      <ha-icon icon="mdi:pencil-outline"></ha-icon>
                    </button>
                    <button
                      type="button"
                      class="icon-btn sm danger"
                      title="Delete template"
                      aria-label=${`Delete template ${e}`}
                      @click=${t=>{t.stopPropagation(),this._handleDelete(e)}}
                    >
                      <ha-icon icon="mdi:delete-outline"></ha-icon>
                    </button>
                  </span>
                </div>
              `):ne`<div class="mc-picker-empty">No templates saved</div>`}
      </div>
      <div class="mc-picker-footer">
        <button type="button" class="btn btn-secondary" @click=${this._close}>Cancel</button>
      </div>
    `}};hc.styles=[Re,tt,rt],uc([Te({type:String})],hc.prototype,"mode",void 0),uc([Te({attribute:!1})],hc.prototype,"config",void 0),uc([Te({attribute:!1})],hc.prototype,"hass",void 0),uc([Me()],hc.prototype,"_templateName",void 0),uc([Me()],hc.prototype,"_templateDescription",void 0),uc([Me()],hc.prototype,"_searchQuery",void 0),uc([Me()],hc.prototype,"_error",void 0),uc([Me()],hc.prototype,"_confirmLoad",void 0),uc([Me()],hc.prototype,"_showOverwrite",void 0),uc([Me()],hc.prototype,"_templates",void 0),uc([Me()],hc.prototype,"_loading",void 0),uc([Me()],hc.prototype,"_saving",void 0),uc([Me()],hc.prototype,"_editingTemplate",void 0),uc([Me()],hc.prototype,"_editName",void 0),uc([Me()],hc.prototype,"_editDescription",void 0),hc=uc([ke("mc-template-picker")],hc);var mc=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};let gc=class extends _e{constructor(){super(),this._showModuleSelector=!1,this._showTemplatePicker=null,this._linkedTemplate=null,this._showSyncDialog=!1,this._studioOpen=!1,this._studioMounted=!1,this._initialTemplateFetched=!1,this._closeStudio=async()=>{this._studioOpen&&(this._studioOpen=!1,await this.updateComplete,await(this.shadowRoot?.querySelector("mc-studio")?.updateComplete),this.shadowRoot?.querySelector("mc-pane-editor")?.focusStudioButton())},this._handleAddRow=()=>{this._linkedTemplate?(this._pendingSyncAction=()=>this._stateManager.addRow("1"),this._showSyncDialog=!0):this._stateManager.addRow("1")},this._cancelSync=()=>{this._showSyncDialog=!1,this._pendingSyncAction=void 0},this._handleSyncNo=()=>{this._pendingSyncAction?.(),this._showSyncDialog=!1,this._pendingSyncAction=void 0},this._handleSyncYes=async()=>{this._pendingSyncAction?.(),this._showSyncDialog=!1,this._pendingSyncAction=void 0,await this._saveToTemplate()},this._resyncAll=()=>{const e=function(e){const t=yi(e);delete t.not_synced;for(const e of t.rows||[]){delete e.not_synced;for(const t of e.columns||[]){delete t.not_synced;for(const e of t.modules||[])delete e.not_synced}}return t}(this._stateManager.getConfig());this._stateManager.updateConfig(e),this._linkedTemplate&&this.hass&&(this._initialTemplateFetched=!1,this._fetchAndApplyTemplate(this._linkedTemplate,e))},this._saveToTemplate=async()=>{if(!this._linkedTemplate||!this.hass)return;const e=function(e){const t={...e};return delete t.not_synced,Array.isArray(t.rows)&&(t.rows=t.rows.map(e=>{const t={...e};return delete t.not_synced,Array.isArray(t.columns)&&(t.columns=t.columns.map(e=>{const t={...e};return delete t.not_synced,Array.isArray(t.modules)&&(t.modules=t.modules.map(e=>{const t={...e};return delete t.not_synced,t})),t})),t})),delete t.template,t}(this._stateManager.getConfig());try{await this.hass.callWS({type:"magic_card_utils/save_template",name:this._linkedTemplate,template:{config:e}})}catch(e){console.warn("Magic Card Editor: Failed to save template",this._linkedTemplate,e)}},this._unlinkTemplate=()=>{const e={...this._stateManager.getConfig()};delete e.template,this._stateManager.updateConfig(e)},this._onTemplateSelected=e=>{this._stateManager.updateConfig(e.detail.config),this._showTemplatePicker=null},this._onAddModule=e=>{this._moduleSelectorTarget=e.detail,this._showModuleSelector=!0},this._onModuleSelected=e=>{this._moduleSelectorTarget&&this._stateManager.addModule(this._moduleSelectorTarget.rowIndex,this._moduleSelectorTarget.colIndex,e.detail.type),this._showModuleSelector=!1,this._moduleSelectorTarget=void 0},this.addEventListener("add-module",this._onAddModule),this.addEventListener("request-add-row",this._handleAddRow),this.addEventListener("template-create",()=>{this._showTemplatePicker="create"}),this.addEventListener("template-load",()=>{this._showTemplatePicker="link"}),this.addEventListener("template-resync",this._resyncAll),this.addEventListener("template-save",this._saveToTemplate),this.addEventListener("template-unlink",this._unlinkTemplate),this.addEventListener("open-studio",()=>this.openStudio()),this.addEventListener("studio-close",this._closeStudio)}connectedCallback(){super.connectedCallback(),this._stateManager=new Ho(e=>{this.dispatchEvent(new CustomEvent("config-changed",{bubbles:!0,composed:!0,detail:{config:e}}))}),this._unsubscribe=this._stateManager.subscribe(e=>{this._editorState=e,this._linkedTemplate=e.config.template??null}),this._pendingConfig&&(this._stateManager.setConfig(this._pendingConfig),this._pendingConfig=void 0)}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe?.(),this._stateManager?.destroy()}setConfig(e){this._stateManager?(this._stateManager.setConfig(e),e.template&&this.hass&&!this._initialTemplateFetched&&(this._initialTemplateFetched=!0,this._fetchAndApplyTemplate(e.template,e))):this._pendingConfig=e}selectByKey(e){this._stateManager?.setSelectedPath(Ai(Pi(e)))}setInspectorTab(e){const t=this.shadowRoot?.querySelector("mc-pane-editor");t?.inspector?.setTab(e),this.shadowRoot?.querySelector("mc-studio")?.inspector?.setTab(e)}openStudio(){this._studioMounted=!0,this._studioOpen=!0}async _fetchAndApplyTemplate(e,t){if(this.hass)try{const i=await this.hass.callWS({type:"magic_card_utils/get_templates"}),n=i.templates?.[e];if(n){const e=wi(n.config,t);this._stateManager.setConfig(e)}}catch(t){console.warn("Magic Card Editor: Failed to fetch template",e,t)}}render(){if(!this._editorState)return ne`<div class="loading" aria-busy="true" aria-label="Loading editor"></div>`;const e=this._renderOverlays(this._editorState);return ne`
      <mc-pane-editor .stateManager=${this._stateManager} .hass=${this.hass}></mc-pane-editor>
      ${this._studioMounted?ne`
            <mc-studio .stateManager=${this._stateManager} .hass=${this.hass} .open=${this._studioOpen}>
              ${this._studioOpen?e:ae}
            </mc-studio>
          `:ae}
      ${this._studioOpen?ae:e}
    `}_renderOverlays(e){return ne`
      ${this._showModuleSelector?ne`
            <mc-module-selector
              @module-selected=${this._onModuleSelected}
              @close=${()=>{this._showModuleSelector=!1}}
            ></mc-module-selector>
          `:ae}
      ${this._showTemplatePicker?ne`
            <mc-template-picker
              .mode=${this._showTemplatePicker}
              .config=${e.config}
              .hass=${this.hass}
              @close=${()=>{this._showTemplatePicker=null}}
              @template-selected=${this._onTemplateSelected}
            ></mc-template-picker>
          `:ae}
      ${this._showSyncDialog?this._renderSyncDialog():ae}
    `}_renderSyncDialog(){return ne`
      <div class="scrim" @click=${this._cancelSync}>
        <div
          class="dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sync-title"
          aria-describedby="sync-text"
          @click=${e=>e.stopPropagation()}
          @keydown=${e=>{"Escape"===e.key&&(e.preventDefault(),e.stopPropagation(),this._cancelSync())}}
        >
          <h2 id="sync-title">Update linked cards?</h2>
          <p id="sync-text">
            This card is linked to template <span class="mono">${this._linkedTemplate}</span>. Do you want to update all
            linked cards with this structural change?
          </p>
          <div class="actions">
            <button type="button" class="btn btn-secondary" @click=${this._handleSyncNo}>Only this card</button>
            <button type="button" class="btn btn-primary" @click=${this._handleSyncYes}>Update all linked cards</button>
          </div>
        </div>
      </div>
    `}updated(){if(this._showSyncDialog){const e=this.shadowRoot?.querySelector(".dialog");e&&!e.contains(this.shadowRoot.activeElement)&&e.querySelector(".btn-primary")?.focus()}}};gc.styles=[Re,v`
      :host {
        display: block;
      }
      .loading {
        min-height: 240px;
      }
      .scrim {
        position: fixed;
        inset: 0;
        z-index: 100;
        display: grid;
        place-items: center;
        padding: 16px;
        background: rgba(0, 0, 0, 0.4);
      }
      .dialog {
        width: min(420px, 100%);
        display: grid;
        gap: 12px;
        padding: 24px;
        border-radius: var(--mc-radius-lg);
        background: var(--mc-surface);
        box-shadow: var(--mc-shadow-float);
      }
      .dialog h2 {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 500;
      }
      .dialog p {
        margin: 0;
        font-size: 0.875rem;
        color: var(--mc-text-2);
        overflow-wrap: anywhere;
      }
      .actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: 8px;
        margin-top: 8px;
      }
    `],mc([Te({attribute:!1})],gc.prototype,"hass",void 0),mc([Te({attribute:!1})],gc.prototype,"lovelace",void 0),mc([Me()],gc.prototype,"_editorState",void 0),mc([Me()],gc.prototype,"_showModuleSelector",void 0),mc([Me()],gc.prototype,"_moduleSelectorTarget",void 0),mc([Me()],gc.prototype,"_showTemplatePicker",void 0),mc([Me()],gc.prototype,"_linkedTemplate",void 0),mc([Me()],gc.prototype,"_showSyncDialog",void 0),mc([Me()],gc.prototype,"_pendingSyncAction",void 0),mc([Me()],gc.prototype,"_studioOpen",void 0),gc=mc([ke(d)],gc);class fc{getAvailableTabs(){return["general","actions","conditions","design"]}validate(e){return[]}_buildSyncContext(e,t){if(t)return{templateName:t,notSynced:e.not_synced||[],basePath:""}}_syncedOnChange(e,t,i){return(n,r)=>{if(i){const t=new Set(e.not_synced||[]);t.add(n),r.not_synced=Array.from(t)}t(r)}}renderActionsTab(e,t,i,n){const r=e.actions,a=this._buildSyncContext(e,n),o=e.entity;return ne`${[{key:"tap_action",title:"Tap",icon:"mdi:gesture-tap"},{key:"hold_action",title:"Hold",icon:"mdi:gesture-tap-hold"},{key:"double_tap_action",title:"Double tap",icon:"mdi:gesture-double-tap"}].map(s=>ne`
        <section class="group">
          <div class="group-head"><ha-icon icon=${s.icon}></ha-icon><h3>${s.title}</h3></div>
          ${this._renderActionConfig(r?.[s.key],t=>((t,a)=>{const o={...e,actions:{...r,[t]:a}};if(n){const i=new Set(e.not_synced||[]);for(const[e,n]of Object.entries(a))void 0!==n&&i.add(`actions.${t}.${e}`);o.not_synced=Array.from(i)}i(o)})(s.key,t),t,o,(e=>{if(a)return{...a,basePath:`actions.${e}`}})(s.key))}
        </section>
      `)}`}renderConditionsTab(e,t,i,n){const r=e.display,a=r?.conditions||[],o=r?.mode||"every",s=this._buildSyncContext(e,n),l=t=>{i({...e,display:{...r,...t}})},c=s?{...s,basePath:"display"}:void 0;return Fs(a,o,{onAdd:()=>{const e={id:Gt("cond"),type:"state",entity:"",state:""};l({conditions:[...a,e]})},onUpdate:(e,t)=>{l({conditions:a.map((i,n)=>n===e?{...i,...t}:i)})},onRemove:e=>{l({conditions:a.filter((t,i)=>i!==e)})},onMode:e=>l({mode:e})},t,c,"module")}renderDesignTab(e,t,i,n){const r=e.design||{},a=!!n,o=e.not_synced||[];return ne`<mc-design-panel
      .design=${r}
      .hass=${t}
      .hasTemplate=${a}
      .notSynced=${o}
      .moduleEntity=${e.entity||""}
      .moduleType=${e.type||""}
      .onChange=${t=>{const n={...r},a={...e};if(t._markNotSynced){const i=[].concat(t._markNotSynced),n=new Set(e.not_synced||[]);for(const e of i)n.add(`design.${e}`);a.not_synced=Array.from(n),delete t._markNotSynced}if(t._markSynced){const i=`design.${t._markSynced}`,n=new Set(e.not_synced||[]);n.delete(i),a.not_synced=Array.from(n),delete t._markSynced}for(const[e,i]of Object.entries(t))void 0===i||""===i?delete n[e]:n[e]=i;i({...a,design:n})}}
    ></mc-design-panel>`}_renderActionConfig(e,t,i,n,r){const a=e||{action:"none"},o="more-info"===a.action||"toggle"===a.action,s=!1!==a.use_module_entity,l={...a.data||{}},c="string"==typeof l.entity_id?l.entity_id:"";delete l.entity_id;const d=Object.keys(l).length?Oo(l).trimEnd():"",p=e=>t({...a,data:Object.keys(e).length?e:void 0});return ne`
      <div class="mc-action-config">
        ${ks("Action",a.action,[{label:"None",value:"none"},{label:"Toggle",value:"toggle"},{label:"More info",value:"more-info"},{label:"Navigate",value:"navigate"},{label:"Call service",value:"perform-action"},{label:"URL",value:"url"},{label:"Assist",value:"assist"}],e=>t({...a,action:e}),"action",r)}
        ${o&&n?Cs("Use module entity",s,e=>t({...a,use_module_entity:e,entity:e?void 0:a.entity}),"use_module_entity",r):ae}
        ${!o||n&&s?ae:Ts("Entity",a.entity,e=>t({...a,entity:e}),i,void 0,"entity",r)}
        ${"toggle"===a.action&&n&&s?ne`<p class="help">Toggles <span class="mono">${n}</span> (the module entity).</p>`:ae}
        ${"navigate"===a.action?xs("Navigation path",a.navigation_path,e=>t({...a,navigation_path:e}),"navigation_path",r):ae}
        ${"url"===a.action?xs("URL",a.url_path,e=>t({...a,url_path:e}),"url_path",r):ae}
        ${"perform-action"===a.action?ne`
              ${function(e,t,i,n,r,a){return ne`
    <div class="mc-field">
      ${bs(e,r,a)}
      <mc-service-picker
        .hass=${n}
        .value=${t||""}
        @value-changed=${e=>i(e.detail.value)}
      ></mc-service-picker>
    </div>
  `}("Service",a.service,e=>t({...a,service:e}),i,"service",r)}
              ${xs("Target entity",c,e=>{const t={...a.data||{}};e.trim()?t.entity_id=e.trim():delete t.entity_id,p(t)},"data",r,{placeholder:"entity_id",mono:!0})}
              <div class="mc-field">
                ${bs("Service data","data",r)}
                <textarea
                  class="input"
                  rows="3"
                  spellcheck="false"
                  .value=${d}
                  @input=${e=>{const t=e.target.value,i=t.trim()?Do(t):{};i&&"object"==typeof i&&!Array.isArray(i)&&p(c?{...i,entity_id:c}:{...i})}}
                ></textarea>
                <p class="help">YAML. Leave empty to call the service without data.</p>
              </div>
            `:ae}
      </div>
    `}}const bc=[{label:"State",value:"state"},{label:"Name",value:"name"},{label:"Name and state",value:"name_state"}];function vc(e,t){const i=e.formatEntityName,n=i?.(t)||t.attributes.friendly_name;return"string"==typeof n&&n?n:t.entity_id}dt.register(new class extends fc{constructor(){super(...arguments),this.metadata={type:"text",name:"Text",description:"Display static or template text",category:"content",icon:"mdi:format-text"}}createDefault(){return{id:Gt("text"),type:"text",text:"Hello World"}}renderPreview(e,t){const i=e;return i.use_entity&&i.entity?ne`<div class="mc-module mc-text">${this._entityText(i,t)}</div>`:ne`<div class="mc-module mc-text">${i.text||""}</div>`}_entityText(e,t){const i=e.entity,n=t?.states?.[i];if(!t||!n)return ne`${i} <span class="mc-text-muted">unavailable</span>`;const r=e.entity_display||"state";if("name"===r)return vc(t,n);const a=function(e,t,i){if(i){const n=e.formatEntityAttributeValue?.(t,i);return n??String(t.attributes[i]??"")}const n=e.formatEntityState?.(t);if(void 0!==n)return n;const r=t.attributes.unit_of_measurement;return`${t.state}${r?` ${String(r)}`:""}`}(t,n,e.attribute);return"name_state"===r?`${vc(t,n)}: ${a}`:a}renderGeneralTab(e,t,i,n){const r=e,a=this._buildSyncContext(e,n);return ne`
      <div class="mc-tab-content">
        ${r.use_entity?ae:ne`
              ${xs("Text",r.text,e=>i({...r,text:e}),"text",a)}
              ${Cs("Use template",r.use_template,e=>i({...r,use_template:e}),"use_template",a)}
              ${r.use_template?vs("Use Jinja2 templates: {{ states('sensor.temp') }}"):ae}
            `}
        ${Cs("Use entity",r.use_entity,e=>i({...r,use_entity:e}),"use_entity",a,"Shows an entity's state or name instead of the text.")}
        ${r.use_entity?ne`
              ${Ts("Entity",r.entity,e=>i({...r,entity:e}),t,void 0,"entity",a)}
              ${Rs("Attribute",r.attribute,e=>i({...r,attribute:e||void 0}),t,r.entity,"attribute",a)}
              ${Ss("Display",r.entity_display,bc,e=>i({...r,entity_display:e}),"entity_display",a)}
            `:ae}
      </div>
    `}validate(e){const t=[],i=e;return i.use_entity?i.entity||t.push("Entity is required"):i.text||i.use_template||t.push("Text content is required"),t}});dt.register(new class extends fc{constructor(){super(...arguments),this.metadata={type:"icon",name:"Icon",description:"Display an icon from MDI or entity",category:"content",icon:"mdi:emoticon-outline"}}createDefault(){return{id:Gt("icon"),type:"icon",icon:"mdi:home",size:"24px"}}renderPreview(e,t){const i=e;let n=i.icon||"mdi:help";if(i.use_entity_icon&&i.entity&&t){const e=t.states[i.entity];e?.attributes.icon&&(n=e.attributes.icon)}const r=(i.use_entity_color&&i.entity?Qt(t?.states[i.entity]):void 0)||i.icon_color||"inherit";return ne`
      <div class="mc-module mc-icon" style="--mc-icon-size: ${i.size||"24px"}; color: ${r}">
        <ha-icon class="mc-anim-icon" .icon=${n}></ha-icon>
      </div>
    `}renderGeneralTab(e,t,i,n){const r=e,a=this._buildSyncContext(e,n);return ne`
      <div class="mc-tab-content">
        ${Ts("Entity",r.entity,e=>i({...r,entity:e}),t,void 0,"entity",a)}
        ${Rs("Attribute",r.attribute,e=>i({...r,attribute:e}),t,r.entity,"attribute",a)}
        ${Cs("Use entity icon",r.use_entity_icon,e=>i({...r,use_entity_icon:e}),"use_entity_icon",a)}
        ${Cs("Use entity color",r.use_entity_color,e=>i({...r,use_entity_color:e}),"use_entity_color",a,"Colors the icon like Home Assistant does for this entity's state.")}
        ${r.use_entity_icon?ae:Ps("Icon",r.icon,e=>i({...r,icon:e}),t,"icon",a)}
        ${xs("Size",r.size,e=>i({...r,size:e}),"size",a)}
      </div>
    `}});dt.register(new class extends fc{constructor(){super(...arguments),this.metadata={type:"info",name:"Info",description:"Display entity name, state, and attributes",category:"content",icon:"mdi:information-outline"}}createDefault(){return{id:Gt("info"),type:"info",show_name:!0,show_state:!0,show_unit:!0}}renderPreview(e,t){const i=e,n=i.entity&&t?t.states[i.entity]:void 0,r=n?.attributes.friendly_name||i.entity||"No entity",a=n?t.formatEntityState(n):"—";return ne`
      <div class="mc-module mc-info">
        ${i.show_name?ne`<span class="mc-info-name">${r}</span>`:ae}
        ${i.show_state?ne`<span class="mc-info-state">
              ${i.prefix||""}${i.attribute&&n?String(n.attributes[i.attribute]??"—"):a}${i.suffix||""}
            </span>`:ae}
        ${i.secondary_info&&n?ne`<span class="mc-info-secondary"
              >${String(n.attributes[i.secondary_info]??"")}</span
            >`:ae}
      </div>
    `}renderGeneralTab(e,t,i,n){const r=e,a=this._buildSyncContext(e,n);return ne`
      <div class="mc-tab-content">
        ${Ts("Entity",r.entity,e=>i({...r,entity:e}),t,void 0,"entity",a)}
        ${Rs("Attribute",r.attribute,e=>i({...r,attribute:e}),t,r.entity,"attribute",a)}
        ${Cs("Show name",r.show_name,e=>i({...r,show_name:e}),"show_name",a)}
        ${Cs("Show state",r.show_state,e=>i({...r,show_state:e}),"show_state",a)}
        ${Cs("Show unit",r.show_unit,e=>i({...r,show_unit:e}),"show_unit",a)}
        ${xs("Prefix",r.prefix,e=>i({...r,prefix:e}),"prefix",a)}
        ${xs("Suffix",r.suffix,e=>i({...r,suffix:e}),"suffix",a)}
        ${Rs("Secondary info",r.secondary_info,e=>i({...r,secondary_info:e}),t,r.entity,"secondary_info",a)}
      </div>
    `}});dt.register(new class extends fc{constructor(){super(...arguments),this.metadata={type:"image",name:"Image",description:"Display a static image or entity picture",category:"content",icon:"mdi:image-outline"}}createDefault(){return{id:Gt("image"),type:"image",image:"",entity_picture:!1,aspect_ratio:"16:9",fit:"cover"}}renderPreview(e,t){const i=e;let n=i.image||"";if(i.entity_picture&&i.entity&&t){const e=t.states[i.entity];e?.attributes.entity_picture&&(n=e.attributes.entity_picture)}const r=i.fit||"cover",a=i.aspect_ratio||"16:9";return ne`
      <div
        class="mc-module mc-image"
        style="aspect-ratio: ${a.replace(":","/")};"
      >
        ${n?ne`<img
              src=${n}
              style="object-fit: ${r};"
              alt=""
            />`:ne`<div class="mc-image-fallback">
              <ha-icon icon="mdi:image-off"></ha-icon>
            </div>`}
      </div>
    `}renderGeneralTab(e,t,i,n){const r=e,a=this._buildSyncContext(e,n);return ne`
      <div class="mc-tab-content">
        ${Ts("Entity",r.entity,e=>i({...r,entity:e}),t,void 0,"entity",a)}
        ${Rs("Attribute",r.attribute,e=>i({...r,attribute:e}),t,r.entity,"attribute",a)}
        ${Cs("Use entity picture",r.entity_picture,e=>i({...r,entity_picture:e}),"entity_picture",a)}
        ${r.entity_picture?ae:zs("Image URL",r.image,e=>i({...r,image:e}),t,"image","image",a)}
        ${xs("Aspect ratio",r.aspect_ratio,e=>i({...r,aspect_ratio:e}),"aspect_ratio",a)}
        ${ks("Fit",r.fit,[{label:"Cover",value:"cover"},{label:"Contain",value:"contain"},{label:"Fill",value:"fill"},{label:"None",value:"none"}],e=>i({...r,fit:e}),"fit",a)}
      </div>
    `}validate(e){const t=[],i=e;return i.image||i.entity_picture||t.push("An image URL or entity picture source is required"),i.entity_picture&&!i.entity&&t.push("Entity is required when using entity picture"),t}});const yc=2,wc=e=>(...t)=>({_$litDirective$:e,values:t});class xc{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}class _c extends xc{constructor(e){if(super(e),this.it=ae,e.type!==yc)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===ae||null==e)return this._t=void 0,this.it=e;if(e===re)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}_c.directiveName="unsafeHTML",_c.resultType=1;const $c=wc(_c);function kc(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Sc={async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null};function Cc(e){Sc=e}var Tc={exec:()=>null};function Mc(e){let t=[];return i=>{let n=Math.max(0,Math.min(3,i-1)),r=t[n];return r||(r=e(n),t[n]=r),r}}function Ac(e,t=""){let i="string"==typeof e?e:e.source,n={replace:(e,t)=>{let r="string"==typeof t?t:t.source;return r=r.replace(Pc.caret,"$1"),i=i.replace(e,r),n},getRegex:()=>new RegExp(i,t)};return n}var Ec=((e="")=>{try{return!!new RegExp("(?<=1)(?<!1)"+e)}catch{return!1}})(),Pc={codeRemoveIndent:/^(?: {0,3}\t| {1,4})/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,endingSpaceTabChar:/[ \t]$/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,leadingSpaceTab:/^[ \t]+/,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,numericCharacterReference:/&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));/,numericCharacterReferenceOrAmpersand:/&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[\t ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:Mc(e=>new RegExp(`^ {0,${e}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`)),hrRegex:Mc(e=>new RegExp(`^ {0,${e}}((?:-[ \t]*){3,}|(?:_[ \t]*){3,}|(?:\\*[ \t]*){3,})(?:\\n+|$)`)),fencesBeginRegex:Mc(e=>new RegExp(`^ {0,${e}}(?:\`\`\`|~~~)`)),headingBeginRegex:Mc(e=>new RegExp(`^ {0,${e}}#`)),htmlBeginRegex:Mc(e=>new RegExp(`^ {0,${e}}(?:</?(?:${Bc})(?: +|$|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`,"i")),blockquoteBeginRegex:Mc(e=>new RegExp(`^ {0,${e}}>`))},zc=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Rc=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,Ic=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |fences|blockquote|heading|hr|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Lc=Ac(Ic).replace(/bull/g,Rc).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/hr/g,/ {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Oc=Ac(Ic).replace(/bull/g,Rc).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/hr/g,/ {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Dc=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/,Nc=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Fc=Ac(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Nc).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),jc=Ac(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g,Rc).getRegex(),Bc="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",qc=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Hc=Ac("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)|<(?!(?:script|pre|style|textarea)(?![a-z0-9-]))([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)|</[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$))","i").replace("comment",qc).replace("tag",Bc).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Gc=e=>Ac(Dc).replace("hr",zc).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list",e).replace("html"," {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag",Bc).getRegex(),Uc=Gc(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/),Vc=Gc(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/),Wc={blockquote:Ac(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Vc).getRegex(),code:/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,def:Fc,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,hr:zc,html:Hc,lheading:Lc,list:jc,newline:/^(?:[ \t]*(?:\n|$))+/,paragraph:Uc,table:Tc,text:/^[^\n]+/},Kc=Ac("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",zc).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}\t)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html"," {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag",Bc).getRegex(),Qc={...Wc,lheading:Oc,table:Kc,paragraph:Ac(Dc).replace("hr",zc).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Kc).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html"," {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag",Bc).getRegex()},Yc={...Wc,html:Ac("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",qc).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Tc,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ac(Dc).replace("hr",zc).replace("heading"," *#{1,6} *[^\n]").replace("lheading",Lc).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Xc=/^( {2,}|\\)\n(?!\s*$)[ \t]*/,Zc=/[\p{P}\p{S}]/u,Jc=/[\s\p{P}\p{S}]/u,ed=/[^\s\p{P}\p{S}]/u,td=Ac(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Jc).getRegex(),id=/(?!~)[\p{P}\p{S}]/u,nd=Ac(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Ec?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),rd=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,ad=Ac(rd,"u").replace(/punct/g,Zc).getRegex(),od=Ac(rd,"u").replace(/punct/g,id).getRegex(),sd=Ac(/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/,"u").replace(/openQuote/g,/[\p{Pi}\p{Ps}"']/u).replace(/punct/g,Zc).getRegex(),ld="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",cd=Ac(ld,"gu").replace(/notPunctSpace/g,ed).replace(/punctSpace/g,Jc).replace(/punct/g,Zc).getRegex(),dd=Ac(ld,"gu").replace(/notPunctSpace/g,/(?:[^\s\p{P}\p{S}]|~)/u).replace(/punctSpace/g,/(?!~)[\s\p{P}\p{S}]/u).replace(/punct/g,id).getRegex(),pd=Ac("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)","gu").replace(/notPunctSpace/g,ed).replace(/punctSpace/g,Jc).replace(/punct/g,Zc).getRegex(),ud=Ac("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ed).replace(/punctSpace/g,Jc).replace(/punct/g,Zc).getRegex(),hd=Ac("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)","gu").replace(/notPunctSpace/g,ed).replace(/punctSpace/g,Jc).replace(/punct/g,Zc).getRegex(),md=Ac(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,Zc).getRegex(),gd=Ac("^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)","gu").replace(/notPunctSpace/g,ed).replace(/punctSpace/g,Jc).replace(/punct/g,Zc).getRegex(),fd=Ac(/\\(punct)/,"gu").replace(/punct/g,Zc).getRegex(),bd=Ac(/(`+)(?:[^`]|[^`][\s\S]*?[^`])\1(?!`)|`+|\\(punct)/,"gu").replace(/punct/g,Zc).getRegex(),vd=Ac(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),yd=Ac(qc).replace("(?:--\x3e|$)","--\x3e").getRegex(),wd=Ac("^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",yd).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),xd=/\[(?:\\[\s\S]|[^\[\]\\])*\]/,_d=Ac(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace("brackets",xd).getRegex(),$d=Ac(/^!?\[(label)\]\([ \t\n]*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?[ \t\n]*\)/).replace("label",_d).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),kd=Ac(/^!?\[(label)\]\[(ref)\]/).replace("label",_d).replace("ref",Nc).getRegex(),Sd=Ac(/^!?\[(ref)\](?:\[\])?/).replace("ref",Nc).getRegex(),Cd=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/,Td=Ac(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace("brackets",xd).getRegex(),Md=Ac("reflink|nolink(?!\\()","g").replace("reflink",Ac(/^!?\[(label)\]\[(ref)\]/).replace("label",Td).replace("ref",Cd).getRegex()).replace("nolink",Ac(/^!?\[(ref)\](?:\[\])?/).replace("ref",Cd).getRegex()).getRegex(),Ad=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ed=Ac(/(?:mailto:email|xmpp:email(?:\/[A-Za-z0-9@.]+)?)/).replace(/email/g,/[A-Za-z0-9._+-]+@[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(),Pd={_backpedal:Tc,anyPunctuation:fd,anyPunctuationOutsideCode:bd,autolink:vd,blockSkip:nd,br:Xc,code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,del:Tc,delLDelim:Tc,delRDelim:Tc,emStrongLDelim:ad,emStrongRDelimAst:cd,emStrongRDelimUnd:ud,escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,link:$d,nolink:Sd,punctuation:td,reflink:kd,reflinkSearch:Md,tag:wd,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,url:Tc},zd={...Pd,emStrongLDelim:sd,emStrongRDelimAst:pd,emStrongRDelimUnd:hd,link:Ac(/^!?\[(label)\]\((.*?)\)/).replace("label",_d).getRegex(),reflink:Ac(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",_d).getRegex()},Rd={...Pd,emStrongRDelimAst:dd,emStrongLDelim:od,delLDelim:md,delRDelim:gd,url:Ac(/^emailProtocol|^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("emailProtocol",Ed).replace("protocol",Ad).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ac(/^(?:[^a-zA-Z0-9](?=emailProtocol)|(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9](?=emailProtocol)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))))/).replace("protocol",Ad).replace(/emailProtocol/g,/(?:mailto|xmpp):/).getRegex()},Id={...Rd,br:Ac(Xc).replace("{2,}","*").getRegex(),text:Ac(Rd.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ld={normal:Wc,gfm:Qc,pedantic:Yc},Od={normal:Pd,gfm:Rd,breaks:Id,pedantic:zd},Dd={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Nd=e=>Dd[e];function Fd(e,t){if(t){if(Pc.escapeTest.test(e))return e.replace(Pc.escapeReplace,Nd)}else if(Pc.escapeTestNoEncode.test(e))return e.replace(Pc.escapeReplaceNoEncode,Nd);return e}function jd(e){try{e=encodeURI(e).replace(Pc.percentDecode,"%")}catch{return null}return e}function Bd(e,t){let i=e.replace(Pc.findPipe,(e,t,i)=>{let n=!1,r=t;for(;--r>=0&&"\\"===i[r];)n=!n;return n?"|":" |"}),n=i.split(Pc.splitPipe),r=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;r<n.length;r++)n[r]=n[r].trim().replace(Pc.slashPipe,"|");return n}function qd(e,t,i){let n=e.length;if(0===n)return"";let r=0;for(;r<n;){let a=e.charAt(n-r-1);if(a!==t||i){if(a===t||!i)break;r++}else r++}return e.slice(0,n-r)}function Hd(e){let t=e.split("\n"),i=t.length-1;for(;i>=0&&Pc.blankLine.test(t[i]);)i--;return t.length-i<=2?e:t.slice(0,i+1).join("\n")}function Gd(e){return e.trim().toLowerCase().toUpperCase().toLowerCase()}function Ud(e,t){if(-1===e.indexOf(t[0])&&-1===e.indexOf(t[1]))return-1;let i=0;for(let n=0;n<e.length;n++)if("\\"===e[n])n++;else if(e[n]===t[0])i++;else if(e[n]===t[1]&&(i--,i<0))return n;return i>0?-2:-1}function Vd(e,t=0){let i=t,n="";for(let t of e)if("\t"===t){let e=4-i%4;n+=" ".repeat(e),i+=e}else n+=t,i++;return n}function Wd(e,t,i,n,r){let a=t.href,o=t.title||null,s=e[1].replace(r.other.outputLinkReplace,"$1"),l="!"===e[0].charAt(0),c=n.state.inLink,d=n.state.linkEmitted,p=n.state.inRawBlock;n.state.inLink=!0,n.state.linkEmitted=!1;let u=n.inlineTokens(s),h=n.state.linkEmitted;if(n.state.linkEmitted=d,n.state.inLink=c,!l){if(h)return void(n.state.inRawBlock=p);n.state.linkEmitted=!0}return{type:l?"image":"link",raw:i,href:a,title:o,text:s,tokens:u}}function Kd(e,t,i,n){if(!t.includes("<"))return!1;for(let r=0;r<t.length;r++){if("\\"===t[r]){r++;continue}if("`"===t[r]){let e=n.inline.code.exec(t.slice(r));if(e){r+=e[0].length-1;continue}}if("<"!==t[r])continue;let a=e.slice(i+r),o=n.inline.tag.exec(a)||n.inline.autolink.exec(a);if(o){if(o[0].length>t.length-r)return!0;r+=o[0].length-1}}return!1}var Qd=class{options;rules;lexer;constructor(e){this.options=e||Sc}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let e=this.options.pedantic?t[0]:Hd(t[0]),i=e.replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e,codeBlockStyle:"indented",text:i}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let e=t[0],i=function(e,t,i){let n=e.match(i.other.indentCodeCompensation);if(null===n)return t;let r=n[1];return t.split("\n").map(e=>{let t=e.match(i.other.beginningSpace);if(null===t)return e;let[n]=t;return e.slice(Math.min(n.length,r.length))}).join("\n")}(e,t[3]||"",this.rules);return{type:"code",raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let t=qd(e,"#");(this.options.pedantic||!t||this.rules.other.endingSpaceTabChar.test(t))&&(e=t.trim())}return{type:"heading",raw:qd(t[0],"\n"),depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:qd(t[0],"\n")}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let e=qd(t[0],"\n").split("\n"),i="",n="",r=[];for(;e.length>0;){let t,a=!1,o=[];for(t=0;t<e.length;t++)if(this.rules.other.blockquoteStart.test(e[t]))o.push(e[t]),a=!0;else{if(a)break;o.push(e[t])}e=e.slice(t);let s=o.join("\n"),l=s.replace(this.rules.other.blockquoteSetextReplace,"\n    $1").replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}\n${s}`:s,n=n?`${n}\n${l}`:l;let c=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(l,r,!0),this.lexer.state.top=c,0===e.length)break;let d=r.at(-1);if("code"===d?.type||"heading"===d?.type||"hr"===d?.type||"html"===d?.type)break;if("blockquote"===d?.type){let t=d,a=e.join("\n"),o=t.raw+"\n"+a.replace(this.rules.other.blockquoteSetextReplace2,""),s=this.blockquote(o);r[r.length-1]=s;let l=o.substring(s.raw.length).replace(/^\n/,""),c=l?l.split("\n").length:0,p=c?e.slice(0,-c):e;p.length>0&&(i=`${i}\n${p.join("\n")}`),n=n.substring(0,n.length-t.text.length)+s.text;break}if("list"===d?.type){let t=d,a=t.raw+"\n"+e.join("\n"),o=this.list(a);r[r.length-1]=o,i=i.substring(0,i.length-d.raw.length)+o.raw,n=n.substring(0,n.length-t.raw.length)+o.raw,e=a.substring(r.at(-1).raw.length).split("\n");continue}}return{type:"blockquote",raw:i,tokens:r,text:n}}}list(e){let t=this.rules.block.list.exec(e);if(t){let i=e,n=()=>i.length-e.length,r=t[1].trim(),a=r.length>1,o={type:"list",raw:"",ordered:a,start:a?+r.slice(0,-1):"",loose:!1,items:[]};r=a?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=a?r:"[*+-]");let s=this.rules.other.listItemRegex(r),l=!1;for(;e;){let r=!1,a="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;let c=n();e=e.substring(t[0].length);let d=t[2].split("\n",1)[0],p=t[1].length,u=this.options.pedantic?Vd(d,p):d.replace(this.rules.other.leadingSpaceTab,e=>Vd(e,p)),h=e.split("\n",1)[0],m=!u.trim(),g=0;if(this.options.pedantic?(g=2,a=u.trimStart()):m?g=p+1:(g=u.search(this.rules.other.nonSpaceChar),g=g>4?1:g,a=u.slice(g),g+=p),m&&this.rules.other.blankLine.test(h)&&(e=e.substring(h.length+1),r=!0),!r){let t=this.rules.other.nextBulletRegex(g),i=this.rules.other.hrRegex(g),n=this.rules.other.fencesBeginRegex(g),r=this.rules.other.headingBeginRegex(g),o=this.rules.other.htmlBeginRegex(g),s=this.rules.other.blockquoteBeginRegex(g);for(;e;){let l,c=e.split("\n",1)[0];if(h=c,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),l=h):l=h.replace(this.rules.other.leadingSpaceTab,e=>Vd(e)),n.test(h)||r.test(h)||o.test(h)||s.test(h)||t.test(h)||i.test(h))break;if(l.search(this.rules.other.nonSpaceChar)>=g||!h.trim())a+="\n"+l.slice(g);else{if(m||u.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||n.test(u)||r.test(u)||i.test(u))break;a+="\n"+h}m=!h.trim(),e=e.substring(c.length+1),u=l.slice(g)}}let f=i.slice(c,n());o.loose||(l?o.loose=!0:this.rules.other.doubleBlankLine.test(f)&&(l=!0)),o.items.push({type:"list_item",raw:f,task:!!this.options.gfm&&this.rules.other.listIsTask.test(a),loose:!1,text:a,tokens:[]})}let c=o.items.at(-1);if(!c)return;c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd(),o.raw=i.slice(0,n()).trimEnd();for(let e of o.items)if(this.lexer.state.top=!1,e.tokens=this.lexer.blockTokens(e.text,[]),!o.loose){let t=e.tokens.filter(e=>"space"===e.type),i=t.length>0&&t.some(e=>this.rules.other.anyLine.test(e.raw));o.loose=i}for(let e of o.items){let t=e.tokens[0];if(!e.task||"text"!==t?.type&&"paragraph"!==t?.type)e.task&&(e.task=!1);else{e.text=e.text.replace(this.rules.other.listReplaceTask,""),t.raw=t.raw.replace(this.rules.other.listReplaceTask,""),t.text=t.text.replace(this.rules.other.listReplaceTask,"");for(let e=this.lexer.inlineQueue.length-1;e>=0;e--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[e].src)){this.lexer.inlineQueue[e].src=this.lexer.inlineQueue[e].src.replace(this.rules.other.listReplaceTask,"");break}let i=this.rules.other.listTaskCheckbox.exec(e.raw);if(i){let t={type:"checkbox",raw:i[0]+" ",checked:"[ ]"!==i[0]};e.checked=t.checked,o.loose?e.tokens[0]&&["paragraph","text"].includes(e.tokens[0].type)&&"tokens"in e.tokens[0]&&e.tokens[0].tokens?(e.tokens[0].raw=t.raw+e.tokens[0].raw,e.tokens[0].text=t.raw+e.tokens[0].text,e.tokens[0].tokens.unshift(t)):e.tokens.unshift({type:"paragraph",raw:t.raw,text:t.raw,tokens:[t]}):e.tokens.unshift(t)}}}if(o.loose)for(let e of o.items){e.loose=!0;for(let t of e.tokens)"text"===t.type&&(t.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t){let e=Hd(t[0]);return{type:"html",block:!0,raw:e,pre:"pre"===t[1]||"script"===t[1]||"style"===t[1],text:e}}}def(e){let t=this.rules.block.def.exec(e);if(t){if(!this.rules.other.startAngleBracket.test(t[2])&&-1!==Ud(t[2],"()"))return;let e=Gd(t[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",n=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:e,raw:qd(t[0],"\n"),href:i,title:n}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let i=Bd(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),r=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split("\n"):[],a={type:"table",raw:qd(t[0],"\n"),header:[],align:[],rows:[]};if(i.length===n.length){for(let e of n)this.rules.other.tableAlignRight.test(e)?a.align.push("right"):this.rules.other.tableAlignCenter.test(e)?a.align.push("center"):this.rules.other.tableAlignLeft.test(e)?a.align.push("left"):a.align.push(null);for(let e=0;e<i.length;e++)a.header.push({text:i[e],tokens:this.lexer.inline(i[e]),header:!0,align:a.align[e]});for(let e of r)a.rows.push(Bd(e,a.header.length).map((e,t)=>({text:e,tokens:this.lexer.inline(e),header:!1,align:a.align[t]})));return a}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t){let e=t[1].trim();return{type:"heading",raw:qd(t[0],"\n"),depth:"="===t[2].charAt(0)?1:2,text:e,tokens:this.lexer.inline(e)}}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let e="\n"===t[1].charAt(t[1].length-1)?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){if(!1===this.lexer.state.linkParenPossible)return;let t=this.rules.inline.link.exec(e);if(t){let i="!"===t[0].charAt(0)?2:1;if(!this.options.pedantic&&Kd(e,t[1],i,this.rules))return;let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let e=qd(n.slice(0,-1),"\\");if((n.length-e.length)%2==0)return}else{let e=Ud(t[2],"()");if(-2===e)return;if(e>-1){let i=(0===t[0].indexOf("!")?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],a="";if(this.options.pedantic){let e=this.rules.other.pedanticHrefTitle.exec(r);e&&(r=e[1],a=e[3])}else a=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(r=this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r.slice(1):r.slice(1,-1)),Wd(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:a&&a.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let i;if((i=this.rules.inline.reflink.exec(e))||(i=this.rules.inline.nolink.exec(e))){let n="!"===i[0].charAt(0)?2:1;if(!this.options.pedantic&&Kd(e,i[1],n,this.rules))return;let r=t[Gd((i[2]||i[1]).replace(this.rules.other.multipleSpaceGlobal," "))];if(!r){let e=i[0].charAt(0);return{type:"text",raw:e,text:e}}return Wd(i,r,i[0],this.lexer,this.rules)}}emStrong(e,t,i=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(n&&(n[1]||n[2]||n[3]||n[4])&&(!n[4]||!i.match(this.rules.other.unicodeAlphaNumeric))&&(!n[1]&&!n[3]||!i||this.rules.inline.punctuation.exec(i))){let r,a,o=[...n[0]].length-1,s=o,l=0,c=n[0][0],d=i===c,p="*"===c?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(p.lastIndex=0,t=t.slice(-1*e.length+o);null!==(n=p.exec(t));){if(r=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!r)continue;if(a=[...r].length,n[3]||n[4]){s+=a;continue}if(n[5]||n[6]){if(o%3&&!((o+a)%3)){l+=a;continue}if(d)break}if(s-=a,s>0)continue;a=Math.min(a,a+s+l);let t=[...n[0]][0].length,i=e.slice(0,o+n.index+t+a);if(Math.min(o,a)%2){let e=i.slice(1,-1);return{type:"em",raw:i,text:e,tokens:this.lexer.inlineTokens(e)}}let c=i.slice(2,-2);return{type:"strong",raw:i,text:c,tokens:this.lexer.inlineTokens(c)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(e),n=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return i&&n&&(e=e.substring(1,e.length-1)),{type:"codespan",raw:t[0],text:e}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e,t,i=""){let n=this.rules.inline.delLDelim.exec(e);if(n&&(!n[1]||!i||this.rules.inline.punctuation.exec(i))){let i,r,a=[...n[0]].length-1,o=a,s=this.rules.inline.delRDelim;for(s.lastIndex=0,t=t.slice(-1*e.length+a);null!==(n=s.exec(t));){if(i=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!i||(r=[...i].length,r!==a))continue;if(n[3]||n[4]){o+=r;continue}if(o-=r,o>0)continue;r=Math.min(r,r+o);let t=[...n[0]][0].length,s=e.slice(0,a+n.index+t+r),l=s.slice(a,-a);return{type:"del",raw:s,text:l,tokens:this.lexer.inlineTokens(l)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let e,i;return"@"===t[2]?(e=t[1],i="mailto:"+e):(e=t[1],i=e),{type:"link",raw:t[0],text:e,href:i,autolink:!0,tokens:[{type:"text",raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,i;if("@"===t[2])e=t[0],i="mailto:"+e;else{let n;do{n=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??""}while(n!==t[0]);e=t[0],i="www."===t[1]?"http://"+t[0]:t[0]}return{type:"link",raw:t[0],text:e,href:i,autolink:!0,tokens:[{type:"text",raw:e,text:e}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let e=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:e?t[0]:(i=t[0],Pc.numericCharacterReference.test(i)?i.replace(Pc.numericCharacterReferenceOrAmpersand,(e,t,i)=>{if(void 0===t&&void 0===i)return"&amp;";let n=void 0===t?Number.parseInt(i,16):Number.parseInt(t,10);return 0===n||n>1114111||n>=55296&&n<=57343?"�":38===n?"&amp;":String.fromCodePoint(n)}):i),escaped:e}}var i}},Yd=class e{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Sc,this.options.tokenizer=this.options.tokenizer||new Qd,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,linkEmitted:!1,linkParenPossible:!0,top:!0};let t={other:Pc,block:Ld.normal,inline:Od.normal};this.options.pedantic?(t.block=Ld.pedantic,t.inline=Od.pedantic):this.options.gfm&&(t.block=Ld.gfm,this.options.breaks?t.inline=Od.breaks:t.inline=Od.gfm),this.tokenizer.rules=t}static get rules(){return{block:Ld,inline:Od}}static lex(t,i){return new e(i).lex(t)}static lexInline(t,i){return new e(i).inlineTokens(t)}lex(e){e=e.replace(Pc.carriageReturn,"\n"),this.blockTokens(e,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let t=this.inlineQueue[e];this.inlineTokens(t.src,t.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],i=!1){this.tokenizer.lexer=this,this.options.pedantic&&(e=e.replace(Pc.tabCharGlobal,"    ").replace(Pc.spaceLine,""));let n=1/0;for(;e;){if(!(e.length<n)){this.infiniteLoopError(e.charCodeAt(0));break}let r;if(n=e.length,this.options.extensions?.block?.some(i=>!!(r=i.call({lexer:this},e,t))&&(e=e.substring(r.raw.length),t.push(r),!0)))continue;if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length);let i=t.at(-1);1===r.raw.length&&void 0!==i?i.raw+="\n":t.push(r);continue}if(r=this.tokenizer.code(e)){e=e.substring(r.raw.length);let i=t.at(-1);"paragraph"===i?.type||"text"===i?.type?(i.raw+=(i.raw.endsWith("\n")?"":"\n")+r.raw,i.text+="\n"+r.text,this.inlineQueue.at(-1).src=i.text):t.push(r);continue}if(r=this.tokenizer.fences(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.heading(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.hr(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.blockquote(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.list(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.html(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.def(e)){e=e.substring(r.raw.length);let i=t.at(-1);"paragraph"===i?.type||"text"===i?.type?(i.raw+=(i.raw.endsWith("\n")?"":"\n")+r.raw,i.text+="\n"+r.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title},t.push(r));continue}if(r=this.tokenizer.table(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.lheading(e)){e=e.substring(r.raw.length),t.push(r);continue}let a=e;if(this.options.extensions?.startBlock){let t,i=1/0,n=e.slice(1);this.options.extensions.startBlock.forEach(e=>{t=e.call({lexer:this},n),"number"==typeof t&&t>=0&&(i=Math.min(i,t))}),i<1/0&&i>=0&&(a=e.substring(0,i+1))}if(this.state.top&&(r=this.tokenizer.paragraph(a))){let n=t.at(-1);i&&"paragraph"===n?.type?(n.raw+=(n.raw.endsWith("\n")?"":"\n")+r.raw,n.text+="\n"+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=n.text):t.push(r),i=a.length!==e.length,e=e.substring(r.raw.length);continue}if(r=this.tokenizer.text(e)){e=e.substring(r.raw.length);let i=t.at(-1);"text"===i?.type?(i.raw+=(i.raw.endsWith("\n")?"":"\n")+r.raw,i.text+="\n"+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):t.push(r);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}linkInText(e){if(!e.includes("["))return!1;let t=this.tokenizer.rules.inline.link;for(let i of e.matchAll(this.tokenizer.rules.inline.blockSkip))if(t.test(i[0])&&"!"!==e.charAt(i.index-1))return!0;for(let t of e.matchAll(this.tokenizer.rules.inline.reflinkSearch)){let e=t[0],i=e.lastIndexOf("[");if("!"!==e.charAt(0)&&Object.hasOwn(this.tokens.links,Gd(e.slice(i+1,-1)))&&!(i>1&&this.linkInText(e.slice(1,i-1))))return!0}return!1}inlineTokens(e,t=[]){this.tokenizer.lexer=this;let i=this.state.linkParenPossible;this.state.linkParenPossible=i&&e.includes(")");try{return this.#e(e,t)}finally{this.state.linkParenPossible=i}}#e(e,t){let i=e;if(this.tokens.links&&e.includes("[")){let e=this.tokenizer.rules.inline.reflinkSearch,t=i=>{let n=i.lastIndexOf("[");if(!Object.hasOwn(this.tokens.links,Gd(i.slice(n+1,-1))))return i;if(n>1&&"!"!==i.charAt(0)){let r=i.slice(1,n-1);if(this.linkInText(r))return"["+r.replace(e,t)+"]["+"a".repeat(i.length-n-2)+"]"}return"["+"a".repeat(i.length-2)+"]"};i=i.replace(e,t)}i=i.replace(this.tokenizer.rules.inline.anyPunctuationOutsideCode,(e,t,i)=>i?"+".repeat(e.length):t?t+e.slice(t.length,-t.length).replace(/`/g,"+")+t:e),i=i.replace(this.tokenizer.rules.inline.blockSkip,(e,t,i)=>{let n=i?i.length:0;return e.slice(0,n)+"["+"a".repeat(e.length-n-2)+"]"}),i=this.options.hooks?.emStrongMask?.call({lexer:this},i)??i;let n=!1,r="",a=1/0;for(;e;){if(!(e.length<a)){this.infiniteLoopError(e.charCodeAt(0));break}let o;if(a=e.length,n||(r=""),n=!1,this.options.extensions?.inline?.some(i=>!!(o=i.call({lexer:this},e,t))&&(e=e.substring(o.raw.length),t.push(o),!0)))continue;if(o=this.tokenizer.escape(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.tag(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.link(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(o.raw.length);let i=t.at(-1);"text"===o.type&&"text"===i?.type?(i.raw+=o.raw,i.text+=o.text):t.push(o);continue}if(o=this.tokenizer.emStrong(e,i,r)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.codespan(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.br(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.del(e,i,r)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.autolink(e)){e=e.substring(o.raw.length),t.push(o);continue}if(!this.state.inLink&&(o=this.tokenizer.url(e))){e=e.substring(o.raw.length),t.push(o);continue}let s=e;if(this.options.extensions?.startInline){let t,i=1/0,n=e.slice(1);this.options.extensions.startInline.forEach(e=>{t=e.call({lexer:this},n),"number"==typeof t&&t>=0&&(i=Math.min(i,t))}),i<1/0&&i>=0&&(s=e.substring(0,i+1))}if(o=this.tokenizer.inlineText(s)){e=e.substring(o.raw.length),"_"!==o.raw.slice(-1)&&(r=o.raw.slice(-1)),n=!0;let i=t.at(-1);"text"===i?.type?(i.raw+=o.raw,i.text+=o.text):t.push(o);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return t}infiniteLoopError(e){let t="Infinite loop on byte: "+e;if(!this.options.silent)throw new Error(t);console.error(t)}},Xd=class{options;parser;constructor(e){this.options=e||Sc}space(e){return""}code({text:e,lang:t,escaped:i}){let n=(t||"").match(Pc.notSpaceStart)?.[0],r=e?e.replace(Pc.endingNewline,"")+"\n":"";return n?'<pre><code class="language-'+Fd(n)+'">'+(i?r:Fd(r,!0))+"</code></pre>\n":"<pre><code>"+(i?r:Fd(r,!0))+"</code></pre>\n"}blockquote({tokens:e}){return`<blockquote>\n${this.parser.parse(e)}</blockquote>\n`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>\n`}hr(e){return"<hr>\n"}list(e){let t=e.ordered,i=e.start,n="";for(let t=0;t<e.items.length;t++){let i=e.items[t];n+=this.listitem(i)}let r=t?"ol":"ul";return"<"+r+(t&&1!==i?' start="'+i+'"':"")+">\n"+n+"</"+r+">\n"}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>\n`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>\n`}table(e){let t="",i="";for(let t=0;t<e.header.length;t++)i+=this.tablecell(e.header[t]);t+=this.tablerow({text:i});let n="";for(let t=0;t<e.rows.length;t++){let r=e.rows[t];i="";for(let e=0;e<r.length;e++)i+=this.tablecell(r[e]);n+=this.tablerow({text:i})}return n&&(n=`<tbody>${n}</tbody>`),"<table>\n<thead>\n"+t+"</thead>\n"+n+"</table>\n"}tablerow({text:e}){return`<tr>\n${e}</tr>\n`}tablecell(e){let t=this.parser.parseInline(e.tokens),i=e.header?"th":"td";return(e.align?`<${i} align="${e.align}">`:`<${i}>`)+t+`</${i}>\n`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Fd(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,text:i,tokens:n,autolink:r}){let a=r?Fd(i,!0):this.parser.parseInline(n),o=jd(e);if(null===o)return a;let s='<a href="'+(e=Fd(o,r))+'"';return t&&(s+=' title="'+Fd(t)+'"'),s+=">"+a+"</a>",s}image({href:e,title:t,text:i,tokens:n}){n&&(i=this.parser.parseInline(n,this.parser.textRenderer));let r=jd(e);if(null===r)return Fd(i);let a=`<img src="${Fd(e=r)}" alt="${Fd(i)}"`;return t&&(a+=` title="${Fd(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Fd(e.text)}},Zd=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Jd=class e{options;renderer;textRenderer;constructor(e){this.options=e||Sc,this.options.renderer=this.options.renderer||new Xd,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Zd}static parse(t,i){return new e(i).parse(t)}static parseInline(t,i){return new e(i).parseInline(t)}parse(e){this.renderer.parser=this;let t="";for(let i=0;i<e.length;i++){let n=e[i];if(this.options.extensions?.renderers?.[n.type]){let e=n,i=this.options.extensions.renderers[e.type].call({parser:this},e);if(!1!==i||!["space","hr","heading","code","table","blockquote","list","checkbox","html","def","paragraph","text"].includes(e.type)){t+=i||"";continue}}let r=n;switch(r.type){case"space":t+=this.renderer.space(r);break;case"hr":t+=this.renderer.hr(r);break;case"heading":t+=this.renderer.heading(r);break;case"code":t+=this.renderer.code(r);break;case"table":t+=this.renderer.table(r);break;case"blockquote":t+=this.renderer.blockquote(r);break;case"list":t+=this.renderer.list(r);break;case"checkbox":t+=this.renderer.checkbox(r);break;case"html":t+=this.renderer.html(r);break;case"def":t+=this.renderer.def(r);break;case"paragraph":t+=this.renderer.paragraph(r);break;case"text":t+=this.renderer.text(r);break;default:{let e='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(e),"";throw new Error(e)}}}return t}parseInline(e,t=this.renderer){this.renderer.parser=this;let i="";for(let n=0;n<e.length;n++){let r=e[n];if(this.options.extensions?.renderers?.[r.type]){let e=this.options.extensions.renderers[r.type].call({parser:this},r);if(!1!==e||!["escape","html","link","image","checkbox","strong","em","codespan","br","del","text"].includes(r.type)){i+=e||"";continue}}let a=r;switch(a.type){case"escape":case"text":i+=t.text(a);break;case"html":i+=t.html(a);break;case"link":i+=t.link(a);break;case"image":i+=t.image(a);break;case"checkbox":i+=t.checkbox(a);break;case"strong":i+=t.strong(a);break;case"em":i+=t.em(a);break;case"codespan":i+=t.codespan(a);break;case"br":i+=t.br(a);break;case"del":i+=t.del(a);break;default:{let e='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(e),"";throw new Error(e)}}}return i}},ep=class{options;block;constructor(e){this.options=e||Sc}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(e=this.block){return e?Yd.lex:Yd.lexInline}provideParser(e=this.block){return e?Jd.parse:Jd.parseInline}};function tp(e,t){if(Array.isArray(t))for(let i=0;i<t.length;i++)e.push(t[i]);else e.push(t)}var ip=new class{defaults={async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null};options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=Jd;Renderer=Xd;TextRenderer=Zd;Lexer=Yd;Tokenizer=Qd;Hooks=ep;constructor(...e){this.use(...e)}walkTokens(e,t){let i=[];for(let n of e)switch(tp(i,t.call(this,n)),n.type){case"table":{let e=n;for(let n of e.header)tp(i,this.walkTokens(n.tokens,t));for(let n of e.rows)for(let e of n)tp(i,this.walkTokens(e.tokens,t));break}case"list":{let e=n;tp(i,this.walkTokens(e.items,t));break}default:{let e=n;this.defaults.extensions?.childTokens?.[e.type]?this.defaults.extensions.childTokens[e.type].forEach(n=>{let r=e[n].flat(1/0);tp(i,this.walkTokens(r,t))}):e.tokens&&tp(i,this.walkTokens(e.tokens,t))}}return i}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(e=>{let i={...e};if(i.async=this.defaults.async||i.async||!1,e.extensions&&(e.extensions.forEach(e=>{if(!e.name)throw new Error("extension name required");if("renderer"in e){let i=t.renderers[e.name];t.renderers[e.name]=i?function(...t){let n=e.renderer.apply(this,t);return!1===n&&(n=i.apply(this,t)),n}:e.renderer}if("tokenizer"in e){if(!e.level||"block"!==e.level&&"inline"!==e.level)throw new Error("extension level must be 'block' or 'inline'");let i=t[e.level];i?i.unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&("block"===e.level?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:"inline"===e.level&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}"childTokens"in e&&e.childTokens&&(t.childTokens[e.name]=e.childTokens)}),i.extensions=t),e.renderer){let t=this.defaults.renderer||new Xd(this.defaults);for(let i in e.renderer){if(!(i in t))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let n=i,r=e.renderer[n],a=t[n];t[n]=(...e)=>{let i=r.apply(t,e);return!1===i&&(i=a.apply(t,e)),i||""}}i.renderer=t}if(e.tokenizer){let t=this.defaults.tokenizer||new Qd(this.defaults);for(let i in e.tokenizer){if(!(i in t))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let n=i,r=e.tokenizer[n],a=t[n];t[n]=(...e)=>{let i=r.apply(t,e);return!1===i&&(i=a.apply(t,e)),i}}i.tokenizer=t}if(e.hooks){let t=this.defaults.hooks||new ep;for(let i in e.hooks){if(!(i in t))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let n=i,r=e.hooks[n],a=t[n];ep.passThroughHooks.has(i)?t[n]=e=>{if(this.defaults.async&&ep.passThroughHooksRespectAsync.has(i))return(async()=>{let i=await r.call(t,e);return a.call(t,i)})();let n=r.call(t,e);return a.call(t,n)}:t[n]=(...e)=>{if(this.defaults.async)return(async()=>{let i=await r.apply(t,e);return!1===i&&(i=await a.apply(t,e)),i})();let i=r.apply(t,e);return!1===i&&(i=a.apply(t,e)),i}}i.hooks=t}if(e.walkTokens){let t=this.defaults.walkTokens,n=e.walkTokens;i.walkTokens=function(e){let i=[];return i.push(n.call(this,e)),t&&tp(i,t.call(this,e)),i}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Yd.lex(e,t??this.defaults)}parser(e,t){return Jd.parse(e,t??this.defaults)}parseMarkdown(e){return(t,i)=>{let n={...i},r={...this.defaults,...n},a=this.onError(!!r.silent,!!r.async);if(!0===this.defaults.async&&!1===n.async)return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||null===t)return a(new Error("marked(): input parameter is undefined or null"));if("string"!=typeof t)return a(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(r.hooks&&(r.hooks.options=r,r.hooks.block=e),r.async)return(async()=>{let i=r.hooks?await r.hooks.preprocess(t):t,n=await(r.hooks?await r.hooks.provideLexer(e):e?Yd.lex:Yd.lexInline)(i,r),a=r.hooks?await r.hooks.processAllTokens(n):n;r.walkTokens&&await Promise.all(this.walkTokens(a,r.walkTokens));let o=await(r.hooks?await r.hooks.provideParser(e):e?Jd.parse:Jd.parseInline)(a,r);return r.hooks?await r.hooks.postprocess(o):o})().catch(a);try{r.hooks&&(t=r.hooks.preprocess(t));let i=(r.hooks?r.hooks.provideLexer(e):e?Yd.lex:Yd.lexInline)(t,r);r.hooks&&(i=r.hooks.processAllTokens(i)),r.walkTokens&&this.walkTokens(i,r.walkTokens);let n=(r.hooks?r.hooks.provideParser(e):e?Jd.parse:Jd.parseInline)(i,r);return r.hooks&&(n=r.hooks.postprocess(n)),n}catch(e){return a(e)}}}onError(e,t){return i=>{if(i.message+="\nPlease report this to https://github.com/markedjs/marked.",e){let e="<p>An error occurred:</p><pre>"+Fd(i.message+"",!0)+"</pre>";return t?Promise.resolve(e):e}if(t)return Promise.reject(i);throw i}}};function np(e,t){return ip.parse(e,t)}np.options=np.setOptions=function(e){return ip.setOptions(e),np.defaults=ip.defaults,Cc(np.defaults),np},np.getDefaults=kc,np.defaults=Sc,np.use=function(...e){return ip.use(...e),np.defaults=ip.defaults,Cc(np.defaults),np},np.walkTokens=function(e,t){return ip.walkTokens(e,t)},np.parseInline=ip.parseInline,np.Parser=Jd,np.parser=Jd.parse,np.Renderer=Xd,np.TextRenderer=Zd,np.Lexer=Yd,np.lexer=Yd.lex,np.Tokenizer=Qd,np.Hooks=ep,np.parse=np;np.options,np.setOptions,np.walkTokens,np.parseInline,Jd.parse,Yd.lex;np.setOptions({breaks:!0,gfm:!0});dt.register(new class extends fc{constructor(){super(...arguments),this.metadata={type:"markdown",name:"Markdown",description:"Render markdown-formatted content",category:"content",icon:"mdi:language-markdown"}}createDefault(){return{id:Gt("markdown"),type:"markdown",content:"**Hello** _World_"}}_resolveContent(e,t,i,n){if(!t||!i)return e;const r=t.states[i];if(!r)return e;const a=r.state,o=n?String(r.attributes[n]??""):"";return e.replace(/\{\{\s*state\s*\}\}/g,a).replace(/\{\{\s*attribute\s*\}\}/g,o).replace(/\{\{\s*entity\s*\}\}/g,i)}renderPreview(e,t){const i=e,n=this._resolveContent(i.content||"",t,i.entity,i.attribute),r=np.parse(n);return ne`
      <div class="mc-module mc-markdown">${$c(r)}</div>
    `}renderGeneralTab(e,t,i,n){const r=e,a=this._buildSyncContext(e,n);return ne`
      <div class="mc-tab-content">
        ${_s("Content",r.content,e=>i({...r,content:e}),{rows:6,placeholder:"**Bold**, _italic_, `code`"},"content",a)}
        ${vs("Supports full Markdown. Use {{ state }}, {{ attribute }}, {{ entity }} for dynamic values.")}
        ${Ts("Entity (for templates)",r.entity,e=>i({...r,entity:e}),t,void 0,"entity",a)}
        ${Rs("Attribute",r.attribute,e=>i({...r,attribute:e}),t,r.entity,"attribute",a)}
      </div>
    `}validate(e){const t=[];return e.content||t.push("Markdown content is required"),t}});dt.register(new class extends fc{constructor(){super(...arguments),this.metadata={type:"bar",name:"Bar",description:"Display a progress bar based on entity state",category:"content",icon:"mdi:chart-bar"}}createDefault(){return{id:Gt("bar"),type:"bar",min:0,max:100,bar_height:"8px",bar_color:"var(--primary-color, #03a9f4)",bar_background:"var(--divider-color, #e0e0e0)",show_value:!0,direction:"horizontal"}}renderPreview(e,t){const i=e,n=i.min??0,r=i.max??100,a=i.entity&&t?t.states[i.entity]:void 0,o=a?parseFloat(a.state):n,s=Math.min(Math.max(o,n),r),l=r!==n?(s-n)/(r-n)*100:0;let c=i.bar_color||"var(--primary-color, #03a9f4)";if(i.severity&&i.severity.length>0)for(const e of i.severity)if(s>=e.from&&s<=e.to){c=e.color;break}const d=i.bar_background||"var(--divider-color, #e0e0e0)",p=i.bar_height||"8px";return"vertical"===i.direction?ne`
        <div class="mc-module mc-bar mc-bar-vertical">
          ${i.show_value?ne`<span class="mc-bar-value">${a?t.formatEntityState(a):"—"}</span>`:ae}
          <div
            class="mc-bar-track"
            style="width: ${p}; height: 100%; background: ${d};"
          >
            <div
              class="mc-bar-fill"
              style="height: ${l}%; background: ${c};"
            ></div>
          </div>
        </div>
      `:ne`
      <div class="mc-module mc-bar mc-bar-horizontal">
        <div
          class="mc-bar-track"
          style="height: ${p}; background: ${d};"
        >
          <div
            class="mc-bar-fill"
            style="width: ${l}%; background: ${c};"
          ></div>
        </div>
        ${i.show_value?ne`<span class="mc-bar-value">${a?t.formatEntityState(a):"—"}</span>`:ae}
      </div>
    `}renderGeneralTab(e,t,i,n){const r=e,a=this._buildSyncContext(e,n);return ne`
      <div class="mc-tab-content">
        ${Ts("Entity",r.entity,e=>i({...r,entity:e}),t,void 0,"entity",a)}
        ${Rs("Attribute",r.attribute,e=>i({...r,attribute:e}),t,r.entity,"attribute",a)}
        ${$s("Min",r.min,e=>i({...r,min:e}),void 0,"min",a)}
        ${$s("Max",r.max,e=>i({...r,max:e}),void 0,"max",a)}
        ${xs("Bar height",r.bar_height,e=>i({...r,bar_height:e}),"bar_height",a)}
        ${Ms("Bar color",r.bar_color,e=>i({...r,bar_color:e}),"bar_color",a)}
        ${Ms("Bar background",r.bar_background,e=>i({...r,bar_background:e}),"bar_background",a)}
        ${Cs("Show value",r.show_value,e=>i({...r,show_value:e}),"show_value",a)}
        ${ks("Direction",r.direction,[{label:"Horizontal",value:"horizontal"},{label:"Vertical",value:"vertical"}],e=>i({...r,direction:e}),"direction",a)}
      </div>
    `}validate(e){const t=[],i=e;return i.entity||t.push("Entity is required for bar module"),void 0!==i.min&&void 0!==i.max&&i.min>=i.max&&t.push("Min must be less than max"),t}});const rp=new Map,ap=new Set;dt.register(new class extends fc{constructor(){super(...arguments),this.metadata={type:"graphs",name:"Graph",description:"Display entity history as a line graph",category:"content",icon:"mdi:chart-line"}}createDefault(){return{id:Gt("graphs"),type:"graphs",hours_to_show:24,points_per_hour:2,line_width:2,fill:!0,show_points:!1,show_labels:!0}}_fetchHistory(e,t,i,n,r){if(ap.has(t))return;ap.add(t);const a=new Date,o=new Date(a.getTime()-36e5*n);e.callWS({type:"history/history_during_period",start_time:o.toISOString(),end_time:a.toISOString(),entity_ids:[i],minimal_response:!0,significant_changes_only:!0}).then(e=>{const a=(e[i]||[]).map(e=>{const t=Number(r?e.a?.[r]:e.s);return isNaN(t)?null:t}).filter(e=>null!==e);rp.set(t,{points:a,timestamp:Date.now(),entityId:i,hours:n})}).catch(e=>{console.warn("magic-card: failed to fetch history for",i,e)}).finally(()=>{ap.delete(t)})}_buildPath(e,t,i){if(0===e.length)return"";const n=Math.min(...e),r=Math.max(...e)-n||1,a=i-8;return e.map((i,o)=>{const s=1===e.length?t/2:o/(e.length-1)*t,l=4+a-(i-n)/r*a;return`${0===o?"M":"L"}${s.toFixed(1)},${l.toFixed(1)}`}).join(" ")}renderPreview(e,t){const i=e,n=i.line_color||"var(--mc-primary)",r=i.fill_color||"var(--mc-primary)",a=i.hours_to_show||24,o=200,s=60;let l=null;if(i.entity&&t){const e=rp.get(i.id);(!e||e.entityId!==i.entity||e.hours!==a||Date.now()-e.timestamp>3e5)&&this._fetchHistory(t,i.id,i.entity,a,i.attribute),e&&e.entityId===i.entity&&(l=e.points)}const c=null!==l&&l.length>1,d=c?l:null,p=d?this._buildPath(d,o,s):"M0,50 Q30,30 60,35 T120,20 T200,30",u=d?`${this._buildPath(d,o,s)} L200,60 L0,60 Z`:"M0,50 Q30,30 60,35 T120,20 T200,30 L200,60 L0,60 Z",h=d&&i.show_points?d.map((e,t)=>{const i=Math.min(...d),n=Math.max(...d)-i||1;return{x:1===d.length?100:t/(d.length-1)*o,y:56-(e-i)/n*52}}):[];return ne`
      <div class="mc-module mc-graphs">
        <svg viewBox="0 0 ${o} ${s}" preserveAspectRatio="none" style="height: 60px">
          ${i.fill?ne`<path d="${u}" fill="${r}" opacity="0.15" />`:""}
          <path d="${p}"
            fill="none" stroke="${n}" stroke-width="${i.line_width||2}" />
          ${i.show_points&&!c?ne`
                <circle cx="0" cy="50" r="3" fill="${n}" />
                <circle cx="60" cy="35" r="3" fill="${n}" />
                <circle cx="120" cy="20" r="3" fill="${n}" />
                <circle cx="200" cy="30" r="3" fill="${n}" />
              `:""}
          ${h.map(e=>ne`<circle cx="${e.x}" cy="${e.y}" r="3" fill="${n}" />`)}
        </svg>
        ${i.show_labels?ne`<div class="mc-graphs-label">
              ${i.entity||"No entity"} &mdash; ${a}h
              ${i.entity?c?"":ne` <span style="opacity:0.5">(loading...)</span>`:""}
            </div>`:""}
      </div>
    `}renderGeneralTab(e,t,i,n){const r=e,a=this._buildSyncContext(e,n);return ne`
      <div class="mc-tab-content">
        ${Ts("Entity",r.entity,e=>i({...r,entity:e}),t,void 0,"entity",a)}
        ${Rs("Attribute",r.attribute,e=>i({...r,attribute:e}),t,r.entity,"attribute",a)}
        ${$s("Hours to show",r.hours_to_show,e=>i({...r,hours_to_show:e}),{min:1,max:168},"hours_to_show",a)}
        ${$s("Points per hour",r.points_per_hour,e=>i({...r,points_per_hour:e}),{min:1,max:60},"points_per_hour",a)}
        ${Ms("Line color",r.line_color,e=>i({...r,line_color:e}),"line_color",a)}
        ${$s("Line width",r.line_width,e=>i({...r,line_width:e}),{min:1,max:10},"line_width",a)}
        ${Cs("Fill",r.fill,e=>i({...r,fill:e}),"fill",a)}
        ${Ms("Fill color",r.fill_color,e=>i({...r,fill_color:e}),"fill_color",a)}
        ${Cs("Show points",r.show_points,e=>i({...r,show_points:e}),"show_points",a)}
        ${Cs("Show labels",r.show_labels,e=>i({...r,show_labels:e}),"show_labels",a)}
      </div>
    `}});dt.register(new class extends fc{constructor(){super(...arguments),this.metadata={type:"camera",name:"Camera",description:"Display a camera entity stream",category:"content",icon:"mdi:camera-outline"}}createDefault(){return{id:Gt("camera"),type:"camera",aspect_ratio:"16:9",show_controls:!0}}renderPreview(e,t){const i=e,n=i.entity&&t?t.states[i.entity]:void 0,r=n?.attributes.entity_picture,a=n?.attributes.friendly_name||i.entity||"No camera";return ne`
      <div class="mc-module mc-camera" style="aspect-ratio: ${(i.aspect_ratio||"16:9").replace(":","/")}">
        ${r?ne`<img src="${r}" alt="${a}" />`:ne`<div class="mc-camera-fallback">
              <ha-icon icon="mdi:cctv"></ha-icon>${a}
            </div>`}
      </div>
    `}renderGeneralTab(e,t,i,n){const r=e,a=this._buildSyncContext(e,n);return ne`
      <div class="mc-tab-content">
        ${Ts("Camera entity",r.entity,e=>i({...r,entity:e}),t,"camera","entity",a)}
        ${Rs("Attribute",r.attribute,e=>i({...r,attribute:e}),t,r.entity,"attribute",a)}
        ${xs("Aspect ratio",r.aspect_ratio,e=>i({...r,aspect_ratio:e}),"aspect_ratio",a)}
        ${Cs("Show controls",r.show_controls,e=>i({...r,show_controls:e}),"show_controls",a)}
      </div>
    `}});dt.register(new class extends fc{constructor(){super(...arguments),this.metadata={type:"slider",name:"Slider",description:"Range slider for controlling numeric values",category:"controls",icon:"mdi:tune-vertical"}}createDefault(){return{id:Gt("slider"),type:"slider",show_value:!0,direction:"horizontal"}}_toNumber(e){if("number"==typeof e&&Number.isFinite(e))return e;if("string"==typeof e){const t=Number(e);if(Number.isFinite(t))return t}}_clamp(e,t,i){return Math.max(t,Math.min(i,e))}_getCurrentValue(e,t,i){const{min:n,max:r}=i;if(!e)return Math.round((n+r)/2);const a=e.attributes,o=e.entity_id.split(".")[0];if(t){const e=this._toNumber(a[t]);if(void 0!==e)return this._clamp(e,n,r)}let s;switch(o){case"light":{const e=this._toNumber(a.brightness),t=this._toNumber(a.brightness_pct);void 0!==t?s=t:void 0!==e&&(s=Math.round(e/255*100));break}case"fan":s=this._toNumber(a.percentage);break;case"cover":s=this._toNumber(a.current_position);break;case"media_player":{const e=this._toNumber(a.volume_level);s=void 0!==e?Math.round(100*e):void 0;break}case"climate":s=this._toNumber(a.temperature);break;default:s=void 0}return void 0===s&&(s=this._toNumber(e.state)),void 0===s?Math.round((n+r)/2):this._clamp(s,n,r)}_getEntityLimits(e,t){if(!e)return{min:0,max:100,step:1};const i=e.entity_id.split(".")[0],n=e.attributes;switch(i){case"input_number":case"number":default:return{min:Number(n.min??0),max:Number(n.max??100),step:Number(n.step??1)};case"light":return"color_temp"===t?{min:Number(n.min_mireds??153),max:Number(n.max_mireds??500),step:1}:{min:0,max:100,step:1};case"fan":return{min:0,max:100,step:Number(n.percentage_step??1)};case"cover":case"media_player":return{min:0,max:100,step:1};case"climate":return{min:Number(n.min_temp??7),max:Number(n.max_temp??35),step:Number(n.target_temp_step??.5)}}}_createSliderHandler(e,t,i,n){const r="vertical"===i.direction,{min:a,max:o,step:s}=n;return n=>{n.stopPropagation();const l=n.currentTarget;l.setPointerCapture(n.pointerId);const c=e=>{const t=l.getBoundingClientRect();return r?Math.max(0,Math.min(1,1-(e.clientY-t.top)/t.height)):Math.max(0,Math.min(1,(e.clientX-t.left)/t.width))};l.style.setProperty("--slider-value",String(c(n)));const d=e=>{l.style.setProperty("--slider-value",String(c(e)))},p=n=>{l.removeEventListener("pointermove",d),l.removeEventListener("pointerup",p);const r=c(n),u=a+r*(o-a),h=Math.round(u/s)*s;this._callEntityService(e,t,h,i.attribute)};l.addEventListener("pointermove",d),l.addEventListener("pointerup",p)}}_callEntityService(e,t,i,n){const r=t.split(".")[0];switch(r){case"input_number":case"number":default:e.callService(r,"set_value",{entity_id:t,value:i});break;case"light":n&&"brightness"!==n?"color_temp"===n&&e.callService("light","turn_on",{entity_id:t,color_temp:Math.round(i)}):e.callService("light","turn_on",{entity_id:t,brightness_pct:Math.round(i)});break;case"fan":e.callService("fan","set_percentage",{entity_id:t,percentage:Math.round(i)});break;case"cover":e.callService("cover","set_cover_position",{entity_id:t,position:Math.round(i)});break;case"media_player":e.callService("media_player","volume_set",{entity_id:t,volume_level:i/100});break;case"climate":e.callService("climate","set_temperature",{entity_id:t,temperature:i})}}renderPreview(e,t){const i=e,n=i.entity&&t?t.states[i.entity]:void 0,r=this._getEntityLimits(n,i.attribute),{min:a,max:o,step:s}=r,l=this._getCurrentValue(n,i.attribute,r),c="vertical"===i.direction,d=this._clamp(o>a?(l-a)/(o-a):0,0,1),p=i.design||{},u=p.color||i.slider_color||"var(--primary-color, #03a9f4)",h=p.background||i.track_color,m=String(s<1?Math.round(l/s)*s:Math.round(l)),g=i.entity&&t?this._createSliderHandler(t,i.entity,i,r):void 0;return ne`
      <div
        class="mc-module mc-slider mc-slider-container ${c?"mc-slider-container--vertical":"mc-slider-container--horizontal"}"
      >
        <div
          class="mc-tile-slider ${c?"mc-tile-slider--vertical":""}"
          style="--slider-value: ${d}; --mc-slider-color: ${u}; ${h?`--mc-slider-background: ${h};`:""} touch-action: none;"
          @pointerdown=${g}
          @click=${e=>e.stopPropagation()}
        >
          <div class="mc-tile-slider-background"></div>
          <div class="mc-tile-slider-bar"></div>
        </div>
        ${i.show_value?ne`<span class="mc-slider-value">
              ${m}
            </span>`:ae}
      </div>
    `}renderGeneralTab(e,t,i,n){const r=this._buildSyncContext(e,n),a=e;return ne`
      <div class="mc-tab-content">
        ${Ts("Entity",a.entity,e=>i({...a,entity:e}),t,void 0,"entity",r)}
        ${Rs("Attribute",a.attribute,e=>i({...a,attribute:e}),t,a.entity,"attribute",r)}
        ${Cs("Show value",a.show_value,e=>i({...a,show_value:e}),"show_value",r)}
        ${ks("Direction",a.direction,[{label:"Horizontal",value:"horizontal"},{label:"Vertical",value:"vertical"}],e=>i({...a,direction:e}),"direction",r)}
      </div>
    `}});dt.register(new class extends fc{constructor(){super(...arguments),this.metadata={type:"button",name:"Button",description:"Interactive button with icon, label, and optional state display",category:"controls",icon:"mdi:gesture-tap"}}createDefault(){return{id:Gt("button"),type:"button",label:"Button",icon:"mdi:power",show_state:!1,button_style:"default"}}renderPreview(e,t){const i=e,n=i.entity&&t?t.states[i.entity]:void 0,r=n?t.formatEntityState(n):void 0,a=i.label||"Button",o="icon-only"===i.button_style;return ne`
      <div class="mc-module mc-button mc-button--${i.button_style||"default"}">
        <button
          class="mc-button-inner mc-button-inner--${i.button_style||"default"} ${o?"mc-button-inner--icon-only":""}"
        >
          ${i.icon?ne`<ha-icon class="mc-anim-icon" .icon=${i.icon}></ha-icon>`:ae}
          ${o?ae:ne`<span>${a}</span>`}
          ${i.show_state&&r?ne`<span class="mc-button-state">${r}</span>`:ae}
        </button>
      </div>
    `}renderGeneralTab(e,t,i,n){const r=this._buildSyncContext(e,n),a=e;return ne`
      <div class="mc-tab-content">
        ${Ts("Entity",a.entity,e=>i({...a,entity:e}),t,void 0,"entity",r)}
        ${Rs("Attribute",a.attribute,e=>i({...a,attribute:e}),t,a.entity,"attribute",r)}
        ${xs("Label",a.label,e=>i({...a,label:e}),"label",r)}
        ${Ps("Icon",a.icon,e=>i({...a,icon:e}),t,"icon",r)}
        ${Ss("Button style",a.button_style,[{label:"Default",value:"default"},{label:"Outline",value:"outline"},{label:"Flat",value:"flat"},{label:"Icon only",value:"icon-only"}],e=>i({...a,button_style:e}),"button_style",r)}
        ${Cs("Show state",a.show_state,e=>i({...a,show_state:e}),"show_state",r,'Shows "On" / "Off" next to the label.')}
      </div>
    `}});dt.register(new class extends fc{constructor(){super(...arguments),this.metadata={type:"slider",name:"Slider",description:"Range slider for controlling numeric values",category:"controls",icon:"mdi:tune-vertical"}}createDefault(){return{id:Gt("slider"),type:"slider",show_value:!0,direction:"horizontal"}}_toNumber(e){if("number"==typeof e&&Number.isFinite(e))return e;if("string"==typeof e){const t=Number(e);if(Number.isFinite(t))return t}}_clamp(e,t,i){return Math.max(t,Math.min(i,e))}_getCurrentValue(e,t,i){const{min:n,max:r}=i;if(!e)return Math.round((n+r)/2);const a=e.attributes,o=e.entity_id.split(".")[0];if(t){const e=this._toNumber(a[t]);if(void 0!==e)return this._clamp(e,n,r)}let s;switch(o){case"light":{const e=this._toNumber(a.brightness),t=this._toNumber(a.brightness_pct);void 0!==t?s=t:void 0!==e&&(s=Math.round(e/255*100));break}case"fan":s=this._toNumber(a.percentage);break;case"cover":s=this._toNumber(a.current_position);break;case"media_player":{const e=this._toNumber(a.volume_level);s=void 0!==e?Math.round(100*e):void 0;break}case"climate":s=this._toNumber(a.temperature);break;default:s=void 0}return void 0===s&&(s=this._toNumber(e.state)),void 0===s?Math.round((n+r)/2):this._clamp(s,n,r)}_getEntityLimits(e,t){if(!e)return{min:0,max:100,step:1};const i=e.entity_id.split(".")[0],n=e.attributes;switch(i){case"input_number":case"number":default:return{min:Number(n.min??0),max:Number(n.max??100),step:Number(n.step??1)};case"light":return"color_temp"===t?{min:Number(n.min_mireds??153),max:Number(n.max_mireds??500),step:1}:{min:0,max:100,step:1};case"fan":return{min:0,max:100,step:Number(n.percentage_step??1)};case"cover":case"media_player":return{min:0,max:100,step:1};case"climate":return{min:Number(n.min_temp??7),max:Number(n.max_temp??35),step:Number(n.target_temp_step??.5)}}}_createSliderHandler(e,t,i,n){const r="vertical"===i.direction,{min:a,max:o,step:s}=n;return n=>{n.stopPropagation();const l=n.currentTarget;l.setPointerCapture(n.pointerId);const c=e=>{const t=l.getBoundingClientRect();return r?Math.max(0,Math.min(1,1-(e.clientY-t.top)/t.height)):Math.max(0,Math.min(1,(e.clientX-t.left)/t.width))};l.style.setProperty("--slider-value",String(c(n)));const d=e=>{l.style.setProperty("--slider-value",String(c(e)))},p=n=>{l.removeEventListener("pointermove",d),l.removeEventListener("pointerup",p);const r=c(n),u=a+r*(o-a),h=Math.round(u/s)*s;this._callEntityService(e,t,h,i.attribute)};l.addEventListener("pointermove",d),l.addEventListener("pointerup",p)}}_callEntityService(e,t,i,n){const r=t.split(".")[0];switch(r){case"input_number":case"number":default:e.callService(r,"set_value",{entity_id:t,value:i});break;case"light":n&&"brightness"!==n?"color_temp"===n&&e.callService("light","turn_on",{entity_id:t,color_temp:Math.round(i)}):e.callService("light","turn_on",{entity_id:t,brightness_pct:Math.round(i)});break;case"fan":e.callService("fan","set_percentage",{entity_id:t,percentage:Math.round(i)});break;case"cover":e.callService("cover","set_cover_position",{entity_id:t,position:Math.round(i)});break;case"media_player":e.callService("media_player","volume_set",{entity_id:t,volume_level:i/100});break;case"climate":e.callService("climate","set_temperature",{entity_id:t,temperature:i})}}renderPreview(e,t){const i=e,n=i.entity&&t?t.states[i.entity]:void 0,r=this._getEntityLimits(n,i.attribute),{min:a,max:o,step:s}=r,l=this._getCurrentValue(n,i.attribute,r),c="vertical"===i.direction,d=this._clamp(o>a?(l-a)/(o-a):0,0,1),p=i.design||{},u=p.color||i.slider_color||"var(--primary-color, #03a9f4)",h=p.background||i.track_color,m=String(s<1?Math.round(l/s)*s:Math.round(l)),g=i.entity&&t?this._createSliderHandler(t,i.entity,i,r):void 0;return ne`
      <div
        class="mc-module mc-slider mc-slider-container ${c?"mc-slider-container--vertical":"mc-slider-container--horizontal"}"
      >
        <div
          class="mc-tile-slider ${c?"mc-tile-slider--vertical":""}"
          style="--slider-value: ${d}; --mc-slider-color: ${u}; ${h?`--mc-slider-background: ${h};`:""} touch-action: none;"
          @pointerdown=${g}
          @click=${e=>e.stopPropagation()}
        >
          <div class="mc-tile-slider-background"></div>
          <div class="mc-tile-slider-bar"></div>
        </div>
        ${i.show_value?ne`<span class="mc-slider-value">
              ${m}
            </span>`:ae}
      </div>
    `}renderGeneralTab(e,t,i,n){const r=this._buildSyncContext(e,n),a=e;return ne`
      <div class="mc-tab-content">
        ${Ts("Entity",a.entity,e=>i({...a,entity:e}),t,void 0,"entity",r)}
        ${Rs("Attribute",a.attribute,e=>i({...a,attribute:e}),t,a.entity,"attribute",r)}
        ${Cs("Show value",a.show_value,e=>i({...a,show_value:e}),"show_value",r)}
        ${ks("Direction",a.direction,[{label:"Horizontal",value:"horizontal"},{label:"Vertical",value:"vertical"}],e=>i({...a,direction:e}),"direction",r)}
      </div>
    `}});dt.register(new class extends fc{constructor(){super(...arguments),this.metadata={type:"spinbox",name:"Spinbox",description:"Numeric input with increment and decrement buttons",category:"controls",icon:"mdi:numeric"}}createDefault(){return{id:Gt("spinbox"),type:"spinbox",min:0,max:100,step:1}}_callEntityService(e,t,i,n){const r=t.split(".")[0];switch(r){case"input_number":case"number":default:e.callService(r,"set_value",{entity_id:t,value:i});break;case"light":n&&"brightness"!==n?"color_temp"===n&&e.callService("light","turn_on",{entity_id:t,color_temp:Math.round(i)}):e.callService("light","turn_on",{entity_id:t,brightness_pct:Math.round(i)});break;case"fan":e.callService("fan","set_percentage",{entity_id:t,percentage:Math.round(i)});break;case"climate":e.callService("climate","set_temperature",{entity_id:t,temperature:i})}}renderPreview(e,t){const i=e,n=i.entity&&t?t.states[i.entity]:void 0,r=i.min??0,a=i.max??100,o=i.step??1,s=n?i.attribute?Number(n.attributes[i.attribute]??r):Number(n.state):Math.round((r+a)/2);return ne`
      <div class="mc-module mc-spinbox">
        <button class="mc-spinbox-btn mc-spinbox-decrement" @click=${e=>{if(e.stopPropagation(),!i.entity||!t)return;const n=Math.max(r,s-o);this._callEntityService(t,i.entity,n,i.attribute)}}>
          &minus;
        </button>
        <span class="mc-spinbox-value">
          ${s}
        </span>
        <button class="mc-spinbox-btn mc-spinbox-increment" @click=${e=>{if(e.stopPropagation(),!i.entity||!t)return;const n=Math.min(a,s+o);this._callEntityService(t,i.entity,n,i.attribute)}}>
          +
        </button>
      </div>
    `}renderGeneralTab(e,t,i,n){const r=this._buildSyncContext(e,n),a=e;return ne`
      <div class="mc-tab-content">
        ${Ts("Entity",a.entity,e=>i({...a,entity:e}),t,void 0,"entity",r)}
        ${Rs("Attribute",a.attribute,e=>i({...a,attribute:e}),t,a.entity,"attribute",r)}
        ${$s("Min",a.min,e=>i({...a,min:e}),void 0,"min",r)}
        ${$s("Max",a.max,e=>i({...a,max:e}),void 0,"max",r)}
        ${$s("Step",a.step,e=>i({...a,step:e}),{min:.01,step:.01},"step",r)}
      </div>
    `}});dt.register(new class extends fc{constructor(){super(...arguments),this.metadata={type:"dropdown",name:"Dropdown",description:"Select dropdown for choosing from a list of options",category:"controls",icon:"mdi:form-dropdown"}}createDefault(){return{id:Gt("dropdown"),type:"dropdown",options:[{label:"Option 1",value:"option_1"},{label:"Option 2",value:"option_2"},{label:"Option 3",value:"option_3"}]}}_callEntityService(e,t,i){const n=t.split(".")[0];switch(n){case"input_select":e.callService("input_select","select_option",{entity_id:t,option:i});break;case"select":e.callService("select","select_option",{entity_id:t,option:i});break;case"input_text":e.callService("input_text","set_value",{entity_id:t,value:i});break;default:e.callService(n,"select_option",{entity_id:t,option:i})}}renderPreview(e,t){const i=e,n=i.entity&&t?t.states[i.entity]:void 0,r=n?i.attribute?String(n.attributes[i.attribute]??""):n.state:void 0,a=n?.attributes.options,o=i.options||[],s=o.length>0?o:(a||[]).map(e=>({label:e,value:e}));return ne`
      <div class="mc-module mc-dropdown">
        <select @change=${e=>{if(e.stopPropagation(),!i.entity||!t)return;const n=e.target.value;this._callEntityService(t,i.entity,n)}} @click=${e=>e.stopPropagation()}>
          ${s.length>0?s.map(e=>ne`
                  <option value=${e.value} ?selected=${r===e.value}>
                    ${e.label}
                  </option>
                `):ne`<option disabled selected>No options</option>`}
        </select>
      </div>
    `}renderGeneralTab(e,t,i,n){const r=this._buildSyncContext(e,n),a=e,o=a.options||[],s=(e,t,n)=>{const r=o.map((i,r)=>r===e?{...i,[t]:n}:i);i({...a,options:r})};return ne`
      <div class="mc-tab-content">
        ${Ts("Entity",a.entity,e=>i({...a,entity:e}),t,void 0,"entity",r)}
        ${Rs("Attribute",a.attribute,e=>i({...a,attribute:e}),t,a.entity,"attribute",r)}

        <div class="mc-section">
          <div class="mc-section-header">Custom options</div>
          ${vs("Leave empty to use entity's built-in options (input_select/select entities).","mc-field-hint-with-margin")}
          <div class="mc-options-list">
            ${o.map((e,t)=>ne`
                <div class="mc-option-item mc-option-row">
                  ${xs("Label",e.label,e=>s(t,"label",e))}
                  ${xs("Value",e.value,e=>s(t,"value",e))}
                  <button type="button" class="mc-btn-icon" aria-label="Remove option" title="Remove option" @click=${()=>(e=>{const t=o.filter((t,i)=>i!==e);i({...a,options:t})})(t)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
                </div>
              `)}
          </div>
          <button class="mc-btn mc-btn-secondary" @click=${()=>{const e=[...o,{label:`Option ${o.length+1}`,value:`option_${o.length+1}`}];i({...a,options:e})}}>Add option</button>
        </div>
      </div>
    `}});dt.register(new class extends fc{constructor(){super(...arguments),this.metadata={type:"light",name:"Light",description:"Light control with brightness, color temp, and color options",category:"controls",icon:"mdi:lightbulb-outline"}}createDefault(){return{id:Gt("light"),type:"light",show_brightness:!0,show_color_temp:!1,show_color:!1,compact:!1}}_createSliderHandler(e,t,i){return e=>{e.stopPropagation();const t=e.currentTarget;t.setPointerCapture(e.pointerId);const n=e=>{const i=t.getBoundingClientRect();return Math.max(0,Math.min(1,(e.clientX-i.left)/i.width))};t.style.setProperty("--slider-value",String(n(e)));const r=e=>{t.style.setProperty("--slider-value",String(n(e)))},a=e=>{t.removeEventListener("pointermove",r),t.removeEventListener("pointerup",a),i(n(e))};t.addEventListener("pointermove",r),t.addEventListener("pointerup",a)}}renderPreview(e,t){const i=e,n=i.entity&&t?t.states[i.entity]:void 0,r=!!n&&"on"===n.state,a=n?.attributes.brightness,o=void 0!==a?Math.round(a/255*100):void 0,s=n?.attributes.color_temp,l=n?.attributes.min_mireds??153,c=n?.attributes.max_mireds??500,d=n?.attributes.friendly_name||i.entity||"Light",p=`var(--mc-design-color, ${r?"var(--state-light-active-color, #fdd835)":"var(--state-icon-color, #9e9e9e)"})`,u=i.entity&&t?this._createSliderHandler(t,i.entity,e=>{t.callService("light","turn_on",{entity_id:i.entity,brightness_pct:Math.round(100*e)})}):void 0,h=i.entity&&t?this._createSliderHandler(t,i.entity,e=>{t.callService("light","turn_on",{entity_id:i.entity,color_temp:Math.round(l+e*(c-l))})}):void 0;return ne`
      <div
        class="mc-module mc-light ${i.compact?"mc-light--compact":""}"
      >
        <div class="mc-light-header">
          <ha-icon
            class="mc-anim-icon"
            .icon=${"mdi:lightbulb"}
            style="color: ${p};"
          ></ha-icon>
          ${i.compact?ne`<span class="mc-light-name--compact">${d}</span>`:ne`
                <div class="mc-light-info">
                  <div class="mc-light-name">${d}</div>
                  <div class="mc-light-secondary">
                    ${r?void 0!==o?`${o}%`:"On":"Off"}
                  </div>
                </div>
              `}
        </div>

        ${i.show_brightness?ne`
              <div class="mc-light-control mc-light-brightness">
                <ha-icon .icon=${"mdi:brightness-6"}></ha-icon>
                <div
                  class="mc-tile-slider"
                  style="--slider-value: ${(o??50)/100}; --mc-slider-color: var(--state-light-active-color, #fdd835); touch-action: none;"
                  @pointerdown=${u}
                  @click=${e=>e.stopPropagation()}
                >
                  <div class="mc-tile-slider-background"></div>
                  <div class="mc-tile-slider-bar"></div>
                </div>
                ${void 0!==o?ne`<span class="mc-light-value">${o}%</span>`:ae}
              </div>
            `:ae}

        ${i.show_color_temp?ne`
              <div class="mc-light-control mc-light-color-temp">
                <ha-icon .icon=${"mdi:thermometer"}></ha-icon>
                <div
                  class="mc-tile-slider"
                  style="--slider-value: ${((s??300)-l)/(c-l)}; --mc-slider-color: var(--mc-light-color-temp); touch-action: none;"
                  @pointerdown=${h}
                  @click=${e=>e.stopPropagation()}
                >
                  <div class="mc-tile-slider-background"></div>
                  <div class="mc-tile-slider-bar"></div>
                </div>
              </div>
            `:ae}

        ${i.show_color?ne`
              <div class="mc-light-control mc-light-color">
                <ha-icon .icon=${"mdi:palette"}></ha-icon>
                <input
                  type="color"
                  class="mc-light-color-input"
                  @input=${e=>{if(e.stopPropagation(),!i.entity||!t)return;const n=e.target.value,r=parseInt(n.slice(1,3),16),a=parseInt(n.slice(3,5),16),o=parseInt(n.slice(5,7),16);t.callService("light","turn_on",{entity_id:i.entity,rgb_color:[r,a,o]})}}
                  @click=${e=>e.stopPropagation()}
                />
              </div>
            `:ae}
      </div>
    `}renderGeneralTab(e,t,i,n){const r=this._buildSyncContext(e,n),a=e;return ne`
      <div class="mc-tab-content">
        ${Ts("Entity",a.entity,e=>i({...a,entity:e}),t,"light","entity",r)}
        ${Rs("Attribute",a.attribute,e=>i({...a,attribute:e}),t,a.entity,"attribute",r)}
        ${Cs("Show brightness",a.show_brightness,e=>i({...a,show_brightness:e}),"show_brightness",r)}
        ${Cs("Show color temp",a.show_color_temp,e=>i({...a,show_color_temp:e}),"show_color_temp",r)}
        ${Cs("Show color picker",a.show_color,e=>i({...a,show_color:e}),"show_color",r)}
        ${Cs("Compact mode",a.compact,e=>i({...a,compact:e}),"compact",r)}
      </div>
    `}validate(e){const t=[];return e.entity||t.push("Entity is required for light module"),t}});function op(){return dt.getAll().map(e=>({label:e.metadata.name,value:e.metadata.type}))}function sp(e){const{ownerId:t,scopeId:i,children:n,hass:r,template:a,expandedState:o,moduleTypes:s,onRefresh:l,onRemoveChild:c,onUpdateChild:d,onAddChild:p,addButtonLabel:u="Add",getItemLabel:h}=e,m=`mc-add-child-${t}-${i}`;return ne`
    <div class="mc-child-module-list">
      ${n.map((e,n)=>{const s=dt.get(e.type),p=`${t}:${i}:${n}`,u=o.get(p)??!1,m=s?.metadata.name||e.type,g=h?h(e,n,m):m;return ne`
          <div class="mc-child-module-item">
            <div class="mc-child-module-head" @click=${()=>(e=>{const n=`${t}:${i}:${e}`;o.set(n,!o.get(n)),l()})(n)}>
              ${s?.metadata.icon?ne`<ha-icon icon=${s.metadata.icon} style="--mdc-icon-size:18px"></ha-icon>`:ae}
              <span class="mc-child-module-title">${g}</span>
              <button
                type="button"
                class="mc-btn-icon mc-btn-small"
                aria-label="Remove module"
                title="Remove module"
                @click=${e=>{e.stopPropagation(),c(n)}}
              >
                <ha-icon icon="mdi:delete-outline"></ha-icon>
              </button>
            </div>
            ${u&&s?ne`<div class="mc-child-module-body">
                  ${s.renderGeneralTab(e,r,e=>d(n,e),a)}
                </div>`:ae}
          </div>
        `})}

      <div class="mc-child-module-add-row">
        <select id=${m} class="mc-child-module-select">
          ${s.map(e=>ne`<option value=${e.value}>${e.label}</option>`)}
        </select>
        <button
          class="mc-btn mc-btn-secondary"
          @click=${e=>{const t=e.currentTarget.parentElement,i=t?.querySelector("select");i&&p(i.value)}}
        >
          ${u}
        </button>
      </div>
    </div>
  `}dt.register(new class extends fc{constructor(){super(...arguments),this.metadata={type:"gauge",name:"Gauge",description:"Arc gauge for displaying numeric sensor values",category:"controls",icon:"mdi:speedometer"}}createDefault(){return{id:Gt("gauge"),type:"gauge",min:0,max:100,needle:!0,gauge_style:"half"}}renderPreview(e,t){const i=e,n=i.entity&&t?t.states[i.entity]:void 0,r=i.min??0,a=i.max??100,o=n?Number(n.state):Math.round((r+a)/2),s=Math.max(r,Math.min(a,o)),l=(s-r)/(a-r)*100,c=this._getSeverityColor(s,i.severity)||"var(--primary-color, #03a9f4)",d=("half"===i.gauge_style||i.gauge_style,"full"===i.gauge_style),p="quarter"===i.gauge_style;if(d){const e=l/100*360,t=(e-90)*(Math.PI/180),i=40,n=50,r=50+i*Math.cos(t),a=n+i*Math.sin(t);return ne`
        <div class="mc-module mc-gauge mc-gauge--full" style="text-align: center;">
          <svg viewBox="0 0 100 100" width="120" height="120">
            <circle cx="50" cy="50" r="40" fill="none" stroke="var(--divider-color, #e0e0e0)" stroke-width="8" />
            ${l>0?ne`<path
                  d="M 50 10 A 40 40 0 ${e>180?1:0} 1 ${r} ${a}"
                  fill="none"
                  stroke=${c}
                  stroke-width="8"
                  stroke-linecap="round"
                />`:""}
            <text x="50" y="54" text-anchor="middle" font-size="16" font-weight="600" fill="currentColor">
              ${s}
            </text>
          </svg>
        </div>
      `}if(p){const e=l/100*90,t=Math.PI/180*-90,i=(-90+e)*(Math.PI/180),n=44,r=10,a=90,o=r+n*Math.cos(t),d=a+n*Math.sin(t),p=r+n*Math.cos(i),u=a+n*Math.sin(i);return ne`
        <div class="mc-module mc-gauge mc-gauge--quarter" style="text-align: center;">
          <svg viewBox="0 0 100 100" width="120" height="120">
            <path d="M 10 46 A 44 44 0 0 1 54 90" fill="none" stroke="var(--divider-color, #e0e0e0)" stroke-width="8" />
            ${l>0?ne`<path
                  d="M ${o} ${d} A ${n} ${n} 0 0 1 ${p} ${u}"
                  fill="none"
                  stroke=${c}
                  stroke-width="8"
                  stroke-linecap="round"
                />`:""}
            <text x="20" y="80" text-anchor="start" font-size="18" font-weight="600" fill="currentColor">
              ${s}
            </text>
          </svg>
        </div>
      `}const u=l/100*180,h=(180+u)*(Math.PI/180),m=50+40*Math.cos(h),g=55+40*Math.sin(h);return ne`
      <div class="mc-module mc-gauge mc-gauge--half" style="text-align: center;">
        <svg viewBox="0 0 100 70" width="140" height="100">
          <path
            d="M 10 55 A 40 40 0 0 1 90 55"
            fill="none"
            stroke="var(--divider-color, #e0e0e0)"
            stroke-width="8"
            stroke-linecap="round"
          />
          ${l>0?ne`<path
                d="M 10 55 A 40 40 0 ${u>180?1:0} 1 ${m} ${g}"
                fill="none"
                stroke=${c}
                stroke-width="8"
                stroke-linecap="round"
              />`:""}
          ${i.needle?ne`
                <line
                  x1="50"
                  y1="55"
                  x2=${m}
                  y2=${g}
                  stroke=${c}
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <circle cx="50" cy="55" r="3" fill=${c} />
              `:""}
          <text x="50" y="50" text-anchor="middle" font-size="14" font-weight="600" fill="currentColor">
            ${s}
          </text>
          <text x="10" y="68" text-anchor="middle" font-size="8" fill="currentColor" opacity="0.6">${r}</text>
          <text x="90" y="68" text-anchor="middle" font-size="8" fill="currentColor" opacity="0.6">${a}</text>
        </svg>
      </div>
    `}renderGeneralTab(e,t,i,n){const r=this._buildSyncContext(e,n),a=e,o=a.severity||[],s=(e,t,n)=>{const r=o.map((i,r)=>r===e?{...i,[t]:n}:i);i({...a,severity:r})};return ne`
      <div class="mc-tab-content">
        ${Ts("Entity",a.entity,e=>i({...a,entity:e}),t,void 0,"entity",r)}
        ${Rs("Attribute",a.attribute,e=>i({...a,attribute:e}),t,a.entity,"attribute",r)}
        ${$s("Min",a.min,e=>i({...a,min:e}),void 0,"min",r)}
        ${$s("Max",a.max,e=>i({...a,max:e}),void 0,"max",r)}
        ${ks("Gauge style",a.gauge_style,[{label:"Half (semicircle)",value:"half"},{label:"Full (circle)",value:"full"},{label:"Quarter",value:"quarter"}],e=>i({...a,gauge_style:e}),"gauge_style",r)}
        ${Cs("Show needle",a.needle,e=>i({...a,needle:e}),"needle",r)}

        <div class="mc-section">
          <div class="mc-section-header">Severity ranges</div>
          <div class="mc-severity-list">
            ${o.map((e,t)=>ne`
                <div class="mc-severity-item" style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px;">
                  ${$s("From",e.from,e=>s(t,"from",e))}
                  ${$s("To",e.to,e=>s(t,"to",e))}
                  ${Ms("Color",e.color,e=>s(t,"color",e))}
                  <button type="button" class="mc-btn-icon" aria-label="Remove severity" title="Remove severity" @click=${()=>(e=>{const t=o.filter((t,i)=>i!==e);i({...a,severity:t})})(t)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
                </div>
              `)}
          </div>
          <button class="mc-btn mc-btn-secondary" @click=${()=>{const e=[...o,{from:0,to:100,color:"#4caf50"}];i({...a,severity:e})}}>Add severity range</button>
        </div>
      </div>
    `}_getSeverityColor(e,t){if(t&&0!==t.length)for(const i of t)if(e>=i.from&&e<=i.to)return i.color}});const lp=new Map;dt.register(new class extends fc{constructor(){super(...arguments),this.metadata={type:"horizontal",name:"Horizontal",description:"Arrange child modules in a row",category:"layout",icon:"mdi:arrow-split-vertical"}}createDefault(){return{id:Gt("horizontal"),type:"horizontal",modules:[],gap:"8px",align:"center",justify:"start"}}renderPreview(e,t){const i=e,n=i.modules||[];return ne`
      <div class="mc-module mc-horizontal"
        style="gap:${i.gap||"8px"}; align-items:${i.align||"center"}; justify-content:${i.justify||"start"}">
        ${n.length>0?n.map(e=>{const i=dt.get(e.type);return i?i.renderPreview(e,t):ne`<span class="mc-error">?</span>`}):ne`<span style="color:var(--mc-text-secondary);font-size:0.75rem">Empty row</span>`}
      </div>
    `}renderGeneralTab(e,t,i,n){const r=this._buildSyncContext(e,n),a=e,o=a.modules||[],s=op();return ne`
      <div class="mc-tab-content">
        ${xs("Gap",a.gap,e=>i({...a,gap:e}),"gap",r)}
        ${ks("Align",a.align,[{label:"Start",value:"start"},{label:"Center",value:"center"},{label:"End",value:"end"},{label:"Stretch",value:"stretch"}],e=>i({...a,align:e}),"align",r)}
        ${ks("Justify",a.justify,[{label:"Start",value:"start"},{label:"Center",value:"center"},{label:"End",value:"end"},{label:"Space between",value:"space-between"},{label:"Space around",value:"space-around"}],e=>i({...a,justify:e}),"justify",r)}

        <div class="mc-section">
          <div class="mc-section-header">Child Modules (${o.length})</div>
          ${this._renderChildModuleList(a,t,i,s,n)}
        </div>
      </div>
    `}_renderChildModuleList(e,t,i,n,r){const a=e.modules||[],o=t=>{i({...e,modules:t})};return ne`
      ${sp({ownerId:e.id,scopeId:"root",children:a,hass:t,template:r,expandedState:lp,moduleTypes:n,onRefresh:()=>i({...e}),onRemoveChild:e=>{o(a.filter((t,i)=>i!==e))},onUpdateChild:(e,t)=>{const i=[...a];i[e]=t,o(i)},onAddChild:e=>{const t=dt.createDefault(e);t&&o([...a,t])}})}
    `}});const cp=new Map;dt.register(new class extends fc{constructor(){super(...arguments),this.metadata={type:"vertical",name:"Vertical",description:"Arrange child modules in a column",category:"layout",icon:"mdi:arrow-split-horizontal"}}createDefault(){return{id:Gt("vertical"),type:"vertical",modules:[],gap:"8px",align:"stretch"}}renderPreview(e,t){const i=e,n=i.modules||[];return ne`
      <div class="mc-module mc-vertical"
        style="gap:${i.gap||"8px"}; align-items:${i.align||"stretch"}">
        ${n.length>0?n.map(e=>{const i=dt.get(e.type);return i?i.renderPreview(e,t):ne`<span class="mc-error">?</span>`}):ne`<span style="color:var(--mc-text-secondary);font-size:0.75rem">Empty column</span>`}
      </div>
    `}renderGeneralTab(e,t,i,n){const r=this._buildSyncContext(e,n),a=e,o=a.modules||[],s=op();return ne`
      <div class="mc-tab-content">
        ${xs("Gap",a.gap,e=>i({...a,gap:e}),"gap",r)}
        ${ks("Align",a.align,[{label:"Start",value:"start"},{label:"Center",value:"center"},{label:"End",value:"end"},{label:"Stretch",value:"stretch"}],e=>i({...a,align:e}),"align",r)}

        <div class="mc-section">
          <div class="mc-section-header">Child Modules (${o.length})</div>
          ${this._renderChildModuleList(a,t,i,s,n)}
        </div>
      </div>
    `}_renderChildModuleList(e,t,i,n,r){const a=e.modules||[],o=t=>{i({...e,modules:t})};return ne`
      ${sp({ownerId:e.id,scopeId:"root",children:a,hass:t,template:r,expandedState:cp,moduleTypes:n,onRefresh:()=>i({...e}),onRemoveChild:e=>{o(a.filter((t,i)=>i!==e))},onUpdateChild:(e,t)=>{const i=[...a];i[e]=t,o(i)},onAddChild:e=>{const t=dt.createDefault(e);t&&o([...a,t])}})}
    `}});const dp={1:[{label:"1 Col",value:"1"}],2:[{label:"1-1",value:"1-1"},{label:"1-2",value:"1-2"},{label:"2-1",value:"2-1"}],3:[{label:"1-1-1",value:"1-1-1"},{label:"1-2-1",value:"1-2-1"}]},pp=new Map,up=new Map;dt.register(new class extends fc{constructor(){super(...arguments),this.metadata={type:"row",name:"Row",description:"Grid row with columns, nestable inside any column",category:"layout",icon:"mdi:view-sequential-outline"}}createDefault(){return{id:Gt("row"),type:"row",columns:[{modules:[]},{modules:[]}],layout:"1-1",gap:"8px"}}renderPreview(e,t){const i=e,n=i.columns||[],r=zt(i.layout||"1");return ne`
      <div class="mc-module mc-nested-row" style="display:grid; grid-template-columns:${r}; gap:${i.gap||"8px"}">
        ${n.map(e=>ne`
          <div class="mc-nested-col">
            ${e.modules?.length?e.modules.map(e=>{const i=dt.get(e.type);return i?i.renderPreview(e,t):ne`<span class="mc-error">?</span>`}):ne`<span class="mc-placeholder-text">Empty</span>`}
          </div>
        `)}
      </div>
    `}renderGeneralTab(e,t,i,n){const r=this._buildSyncContext(e,n),a=e,o=a.columns||[],s=o.length,l=dp[s]||dp[1],c=pp.get(a.id)??0,d=Math.min(c,Math.max(s-1,0)),p=op();return ne`
      <div class="mc-tab-content">
        ${ks("Column layout",a.layout,l,e=>i({...a,layout:e}),"layout",r)}
        ${As("Gap",a.gap,e=>i({...a,gap:e}),"gap",r)}

        <!-- Column management -->
        <div class="mc-section">
          <div class="mc-section-header mc-section-header-split">
            <span>Columns (${s})</span>
            <div class="mc-section-header-actions">
              <button class="mc-btn mc-btn-secondary mc-btn-compact" @click=${()=>{const e=[...o,{modules:[]}];i({...a,columns:e})}}>+ Column</button>
              ${s>1?ne`
                <button class="mc-btn mc-btn-secondary mc-btn-compact" @click=${()=>{const e=o.slice(0,-1);d>=e.length&&pp.set(a.id,e.length-1),i({...a,columns:e})}}>- Column</button>
              `:ae}
            </div>
          </div>
        </div>

        <!-- Per-column child module management -->
        ${s>0?ne`
            <div class="mc-section">
              <div class="mc-section-header">Column content</div>
              <div class="mc-tabs-header mc-editor-tab-switcher">
                ${o.map((e,t)=>ne`
                    <button
                      class="mc-tab-button ${t===d?"active":""}"
                      @click=${()=>{pp.set(a.id,t),i({...a})}}
                    >Col ${t+1}</button>
                  `)}
              </div>
              ${this._renderChildModuleList(a,d,t,i,p,n)}
            </div>
          `:ae}
      </div>
    `}_renderChildModuleList(e,t,i,n,r,a){const o=e.columns[t].modules||[],s=i=>{const r=[...e.columns||[]];r[t]={...r[t],modules:i},n({...e,columns:r})};return ne`
      ${sp({ownerId:e.id,scopeId:`col-${t}`,children:o,hass:i,template:a,expandedState:up,moduleTypes:r,onRefresh:()=>n({...e}),onRemoveChild:e=>{s(o.filter((t,i)=>i!==e))},onUpdateChild:(e,t)=>{const i=[...o];i[e]=t,s(i)},onAddChild:e=>{const t=dt.createDefault(e);t&&s([...o,t])}})}
    `}});const hp=new Map,mp=new Map,gp=new Map;dt.register(new class extends fc{constructor(){super(...arguments),this.metadata={type:"tabs",name:"Tabs",description:"Tabbed container for groups of modules",category:"layout",icon:"mdi:tab"}}createDefault(){return{id:Gt("tabs"),type:"tabs",tabs:[{label:"Tab 1",modules:[]},{label:"Tab 2",modules:[]}],active_tab:0,tab_style:"default"}}renderPreview(e,t){const i=e,n=i.tabs||[],r=hp.get(i.id)??i.active_tab??0,a=n[r];return ne`
      <div class="mc-module mc-tabs" data-style=${i.tab_style||"default"}>
        <div class="mc-tabs-header">
          ${n.map((e,t)=>ne`
              <button class="mc-tab-button ${t===r?"active":""}"
                @click=${(e=>t=>{t.stopPropagation(),hp.set(i.id,e),t.target.dispatchEvent(new CustomEvent("mc-request-update",{bubbles:!0,composed:!0}))})(t)}>
                ${e.icon?ne`<ha-icon icon=${e.icon}></ha-icon>`:""}
                ${e.label}
              </button>
            `)}
        </div>
        <div class="mc-tabs-content">
          ${a?.modules?.length?a.modules.map(e=>{const i=dt.get(e.type);return i?i.renderPreview(e,t):ne`<span class="mc-error">?</span>`}):ne`<span class="mc-placeholder-text">Empty tab</span>`}
        </div>
      </div>
    `}renderGeneralTab(e,t,i,n){const r=this._buildSyncContext(e,n),a=e,o=a.tabs||[],s=mp.get(a.id)??0,l=Math.min(s,Math.max(o.length-1,0)),c=o[l],d=op();return ne`
      <div class="mc-tab-content">
        ${ks("Tab style",a.tab_style,[{label:"Default",value:"default"},{label:"Pills",value:"pills"},{label:"Underline",value:"underline"}],e=>i({...a,tab_style:e}),"tab_style",r)}

        <!-- Tab label list -->
        <div class="mc-section">
          <div class="mc-section-header">Tabs</div>
          ${o.map((e,t)=>ne`
              <div class="mc-field mc-inline-field-row">
                <input type="text" .value=${e.label}
                  @input=${e=>{const n=[...o];n[t]={...n[t],label:e.target.value},i({...a,tabs:n})}} />
                <button type="button" class="mc-btn-icon" aria-label="Remove tab" title="Remove tab" @click=${()=>{const e=o.filter((e,i)=>i!==t);l>=e.length&&e.length>0&&mp.set(a.id,e.length-1),i({...a,tabs:e})}}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
              </div>
            `)}
          <button class="mc-btn mc-btn-secondary" @click=${()=>{const e=[...o,{label:`Tab ${o.length+1}`,modules:[]}];i({...a,tabs:e})}}>Add tab</button>
        </div>

        <!-- Per-tab child module management -->
        ${o.length>0?ne`
            <div class="mc-section">
              <div class="mc-section-header">Tab content</div>
              <div class="mc-tabs-header mc-editor-tab-switcher">
                ${o.map((e,t)=>ne`
                    <button
                      class="mc-tab-button ${t===l?"active":""}"
                      @click=${()=>{mp.set(a.id,t),i({...a})}}
                    >${e.label}</button>
                  `)}
              </div>
              ${c?this._renderChildModuleList(a,l,t,i,d,n):ae}
            </div>
          `:ae}
      </div>
    `}_renderChildModuleList(e,t,i,n,r,a){const o=e.tabs[t].modules||[],s=i=>{const r=[...e.tabs||[]];r[t]={...r[t],modules:i},n({...e,tabs:r})};return ne`
      ${sp({ownerId:e.id,scopeId:`tab-${t}`,children:o,hass:i,template:a,expandedState:gp,moduleTypes:r,onRefresh:()=>n({...e}),onRemoveChild:e=>{s(o.filter((t,i)=>i!==e))},onUpdateChild:(e,t)=>{const i=[...o];i[e]=t,s(i)},onAddChild:e=>{const t=dt.createDefault(e);t&&s([...o,t])}})}
    `}});function fp(e,t=0){return setTimeout(e,t)}function bp(){return Date.now()}function vp(e,t="x"){const i=function(e){return window.getComputedStyle(e,null)}(e),n=i.transform||i.webkitTransform;if(!n||"none"===n)return 0;const r=new DOMMatrixReadOnly(n);return"x"===t?r.m41:r.m42}function yp(e){return"object"==typeof e&&null!==e&&!!e.constructor&&"Object"===Object.prototype.toString.call(e).slice(8,-1)}function wp(e){return"undefined"!=typeof HTMLElement&&e instanceof HTMLElement||!!e&&"object"==typeof e&&(1===e.nodeType||11===e.nodeType)}function xp(e,...t){const i=Object(e);for(let e=0;e<t.length;e+=1){const n=t[e];if(null==n||wp(n))continue;const r=n,a=Object.keys(Object(r));for(let e=0,t=a.length;e<t;e+=1){const t=a[e];if("__proto__"===t||"constructor"===t||"prototype"===t)continue;const n=Object.getOwnPropertyDescriptor(r,t);if(!n||!n.enumerable)continue;const o=r[t];yp(i[t])&&yp(o)?o.__swiper__?i[t]=o:xp(i[t],o):!yp(i[t])&&yp(o)?(i[t]={},o.__swiper__?i[t]=o:xp(i[t],o)):i[t]=o}}return i}function _p(e,t,i){e.style.setProperty(t,i)}function $p(e,t=""){const i=[...e.children];return e instanceof HTMLSlotElement&&i.push(...e.assignedElements()),t?i.filter(e=>e.matches(t)):i}function kp(e){try{console.warn(e)}catch{}}function Sp(e,t=[]){const i=document.createElement(e);return i.classList.add(...Array.isArray(t)?t:function(e=""){return e.trim().split(" ").filter(e=>!!e.trim())}(t)),i}function Cp(e,t){return window.getComputedStyle(e,null).getPropertyValue(t)}function Tp(e){if(e&&e.parentNode)return[...e.parentNode.children].indexOf(e)}function Mp(e,t){const i=[];let n=e.parentElement;for(;n;)t&&!n.matches(t)||i.push(n),n=n.parentElement;return i}function Ap(e,t,i){{const i=window.getComputedStyle(e,null);return e["width"===t?"offsetWidth":"offsetHeight"]+parseFloat(i.getPropertyValue("width"===t?"margin-right":"margin-top"))+parseFloat(i.getPropertyValue("width"===t?"margin-left":"margin-bottom"))}}function Ep(e){return(Array.isArray(e)?e:[e]).filter(e=>!!e)}function Pp(e,t=""){const i=globalThis.trustedTypes;e.innerHTML=void 0!==i?i.createPolicy("html",{createHTML:e=>e}).createHTML(t):t}let zp,Rp,Ip;function Lp(){return zp||(zp="undefined"==typeof window?{touch:!1}:{touch:"ontouchstart"in window||navigator.maxTouchPoints>0}),zp}function Op(e={}){return Rp||(Rp=function({userAgent:e}={}){if("undefined"==typeof window)return{ios:!1,android:!1};const t=Lp(),i=navigator.platform,n=e||navigator.userAgent,r={ios:!1,android:!1},a=/(Android);?[\s/]+([\d.]+)?/.test(n),o=/(iPhone\sOS|iOS|iPod)/.test(n),s=/iPad/.test(n),l="MacIntel"===i&&t.touch&&navigator.maxTouchPoints>1,c=s||l;return a&&!("Win32"===i)&&(r.os="android",r.android=!0),(c||o)&&(r.os="ios",r.ios=!0),r}(e)),Rp}function Dp(){return Ip||(Ip=function(){if("undefined"==typeof window)return{isSafari:!1,isWebView:!1,need3dFix:!1};const e=Op(),t=navigator.userAgent,i=t.toLowerCase(),n=i.includes("safari")&&!i.includes("chrome")&&!i.includes("android"),r=/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t);return{isSafari:n,isWebView:r,need3dFix:n||r&&e.ios}}()),Ip}dt.register(new class extends fc{constructor(){super(...arguments),this.metadata={type:"separator",name:"Separator",description:"Visual divider between modules",category:"layout",icon:"mdi:minus"}}getAvailableTabs(){return["general","conditions","design"]}createDefault(){return{id:Gt("separator"),type:"separator",separator_style:"solid",separator_color:"var(--divider-color, #e5e7eb)",separator_width:"1px",direction:"horizontal"}}renderPreview(e,t){const i=e;return"vertical"===i.direction?ne`
        <div class="mc-module mc-separator-vertical"
          style="border-left-style:${i.separator_style||"solid"}; border-left-color:${i.separator_color||"var(--divider-color)"}; border-left-width:${i.separator_width||"1px"}">
        </div>
      `:ne`
      <hr class="mc-module mc-separator"
        style="border-top-style:${i.separator_style||"solid"}; border-top-color:${i.separator_color||"var(--divider-color)"}; border-top-width:${i.separator_width||"1px"}" />
    `}renderGeneralTab(e,t,i,n){const r=this._buildSyncContext(e,n),a=e;return ne`
      <div class="mc-tab-content">
        ${ks("Direction",a.direction,[{label:"Horizontal",value:"horizontal"},{label:"Vertical",value:"vertical"}],e=>i({...a,direction:e}),"direction",r)}
        ${ks("Style",a.separator_style,[{label:"Solid",value:"solid"},{label:"Dashed",value:"dashed"},{label:"Dotted",value:"dotted"},{label:"None",value:"none"}],e=>i({...a,separator_style:e}),"separator_style",r)}
        ${Ms("Color",a.separator_color,e=>i({...a,separator_color:e}),"separator_color",r)}
        ${xs("Width",a.separator_width,e=>i({...a,separator_width:e}),"separator_width",r)}
      </div>
    `}});const Np=(e,t)=>{if(!e||e.destroyed||!e.params||!e.params.lazyPreload)return;const i=t.closest(e.isElement?"swiper-slide":`.${e.params.slideClass}`);if(i){let t=i.querySelector(`.${e.params.lazyPreloaderClass}`);!t&&e.isElement&&(i.shadowRoot?t=i.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`):requestAnimationFrame(()=>{if(i.shadowRoot){const t=i.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`);t&&!t.lazyPreloaderManaged&&t.remove()}})),t&&!t.lazyPreloaderManaged&&t.remove()}},Fp=(e,t)=>{if(!e.slides[t])return;const i=e.slides[t].querySelector('[loading="lazy"]');i&&i.removeAttribute("loading")},jp=e=>{if(!e||e.destroyed||!e.params||!e.params.lazyPreload)return;let t=e.params.lazyPreloadPrevNext;const i=e.slides.length;if(!i||!t||t<0)return;t=Math.min(t,i);const n="auto"===e.params.slidesPerView?e.slidesPerViewDynamic():Math.ceil(e.params.slidesPerView),r=e.activeIndex;if(e.params.grid&&(e.params.grid.rows??1)>1){const i=r,a=[i-t];return a.push(...Array.from({length:t}).map((e,t)=>i+n+t)),void e.slides.forEach((t,i)=>{void 0!==t.column&&a.includes(t.column)&&Fp(e,i)})}const a=r+n-1;if(e.params.rewind||e.params.loop)for(let n=r-t;n<=a+t;n+=1){const t=(n%i+i)%i;(t<r||t>a)&&Fp(e,t)}else for(let n=Math.max(r-t,0);n<=Math.min(a+t,i-1);n+=1)n!==r&&(n>a||n<r)&&Fp(e,n)};const Bp=(e,t)=>!!(e.grid&&t.grid&&t.grid.rows>1);var qp={setBreakpoint:function(){const e=this,{realIndex:t,initialized:i,params:n,el:r}=e,a=n.breakpoints;if(!a||a&&0===Object.keys(a).length)return;const o="window"!==n.breakpointsBase&&n.breakpointsBase?"container":n.breakpointsBase,s=["window","container"].includes(n.breakpointsBase)||!n.breakpointsBase?e.el:document.querySelector(n.breakpointsBase),l=e.getBreakpoint(a,o,s);if(!l||e.currentBreakpoint===l)return;const c=(l in a?a[l]:void 0)||e.originalParams,d=Bp(e,n),p=Bp(e,c),u=e.params.grabCursor,h=c.grabCursor,m=n.enabled;d&&!p?(r.classList.remove(`${n.containerModifierClass}grid`,`${n.containerModifierClass}grid-column`),e.emitContainerClasses()):!d&&p&&(r.classList.add(`${n.containerModifierClass}grid`),(c.grid.fill&&"column"===c.grid.fill||!c.grid.fill&&"column"===n.grid.fill)&&r.classList.add(`${n.containerModifierClass}grid-column`),e.emitContainerClasses()),u&&!h?e.unsetGrabCursor():!u&&h&&e.setGrabCursor();const g=(e,t)=>e[t];["navigation","pagination","scrollbar"].forEach(t=>{const i=g(c,t);if(void 0===i)return;const r=g(n,t),a="object"==typeof r&&null!==r&&r.enabled,o="object"==typeof i&&null!==i&&i.enabled,s=e[t];a&&!o&&s?.disable?.(),!a&&o&&s?.enable?.()});const f=c.direction&&c.direction!==n.direction,b=n.loop&&(c.slidesPerView!==n.slidesPerView||f),v=n.loop;f&&i&&e.changeDirection(),xp(e.params,c);const y=e.params.enabled,w=e.params.loop;Object.assign(e,{allowTouchMove:e.params.allowTouchMove,allowSlideNext:e.params.allowSlideNext,allowSlidePrev:e.params.allowSlidePrev}),m&&!y?e.disable():!m&&y&&e.enable(),e.currentBreakpoint=l,e.emit("_beforeBreakpoint",c),i&&(b?(e.loopDestroy(),e.updateSlides(),e.loopCreate(t)):!v&&w?(e.updateSlides(),e.loopCreate(t)):v&&!w&&e.loopDestroy()),e.emit("breakpoint",c)},getBreakpoint:function(e,t="window",i){if(!e||"container"===t&&!i)return;let n=!1;const r="window"===t?window.innerHeight:i.clientHeight,a=Object.keys(e).map(e=>{if("string"==typeof e&&0===e.indexOf("@")){const t=parseFloat(e.substr(1));return{value:r*t,point:e}}return{value:e,point:e}});a.sort((e,t)=>parseInt(String(e.value),10)-parseInt(String(t.value),10));for(let e=0;e<a.length;e+=1){const{point:r,value:o}=a[e];"window"===t?window.matchMedia(`(min-width: ${o}px)`).matches&&(n=r):o<=i.clientWidth&&(n=r)}return n||"max"}};var Hp={checkOverflow:function(){const e=this,{isLocked:t,params:i}=e,{slidesOffsetBefore:n}=i;if(n){const t=e.slides.length-1,i=e.slidesGrid[t]+e.slidesSizesGrid[t]+2*n;e.isLocked=e.size>i}else e.isLocked=1===e.snapGrid.length;!0===i.allowSlideNext&&(e.allowSlideNext=!e.isLocked),!0===i.allowSlidePrev&&(e.allowSlidePrev=!e.isLocked),t&&t!==e.isLocked&&(e.isEnd=!1),t!==e.isLocked&&e.emit(e.isLocked?"lock":"unlock")}};var Gp={addClasses:function(){const e=this,{classNames:t,params:i,rtl:n,el:r,device:a}=e,o=function(e,t){const i=[];return e.forEach(e=>{"object"==typeof e?Object.keys(e).forEach(n=>{e[n]&&i.push(t+n)}):"string"==typeof e&&i.push(t+e)}),i}(["initialized",i.direction,{"free-mode":e.params.freeMode&&i.freeMode.enabled},{autoheight:i.autoHeight},{rtl:n},{grid:i.grid&&i.grid.rows>1},{"grid-column":i.grid&&i.grid.rows>1&&"column"===i.grid.fill},{android:a.android},{ios:a.ios},{"css-mode":i.cssMode},{centered:i.cssMode&&i.centeredSlides},{"watch-progress":i.watchSlidesProgress}],i.containerModifierClass);t.push(...o),r.classList.add(...t),e.emitContainerClasses()},removeClasses:function(){const{el:e,classNames:t}=this;e&&"string"!=typeof e&&(e.classList.remove(...t),this.emitContainerClasses())}};const Up={init:!0,direction:"horizontal",oneWayMovement:!1,swiperElementNodeName:"SWIPER-CONTAINER",touchEventsTarget:"wrapper",initialSlide:0,speed:300,cssMode:!1,updateOnWindowResize:!0,resizeObserver:!0,nested:!1,createElements:!1,eventsPrefix:"swiper",enabled:!0,focusableElements:"input, select, option, textarea, button, video, label",width:null,height:null,preventInteractionOnTransition:!1,userAgent:null,url:null,edgeSwipeDetection:!1,edgeSwipeThreshold:20,autoHeight:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",breakpoints:void 0,breakpointsBase:"window",spaceBetween:0,slidesPerView:1,slidesPerGroup:1,slidesPerGroupSkip:0,slidesPerGroupAuto:!1,centeredSlides:!1,centeredSlidesBounds:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,normalizeSlideIndex:!0,centerInsufficientSlides:!1,snapToSlideEdge:!1,watchOverflow:!0,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,allowTouchMove:!0,threshold:5,touchMoveStopPropagation:!1,touchStartPreventDefault:!0,touchStartForcePreventDefault:!1,touchReleaseOnEdges:!1,uniqueNavElements:!0,resistance:!0,resistanceRatio:.85,watchSlidesProgress:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,loop:!1,loopAddBlankSlides:!0,loopAdditionalSlides:0,loopPreventsSliding:!0,rewind:!1,allowSlidePrev:!0,allowSlideNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",noSwipingSelector:null,passiveListeners:!0,maxBackfaceHiddenSlides:10,containerModifierClass:"swiper-",slideClass:"swiper-slide",slideBlankClass:"swiper-slide-blank",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",slideFullyVisibleClass:"swiper-slide-fully-visible",slideNextClass:"swiper-slide-next",slidePrevClass:"swiper-slide-prev",wrapperClass:"swiper-wrapper",lazyPreload:!0,lazyPreloaderClass:"swiper-lazy-preloader",lazyPreloadPrevNext:0,runCallbacksOnInit:!0,_emitClasses:!1};var Vp={on(e,t,i){const n=this;if(!n.eventsListeners||n.destroyed)return n;if("function"!=typeof t)return n;const r=i?"unshift":"push";return e.split(" ").forEach(e=>{n.eventsListeners[e]||(n.eventsListeners[e]=[]),n.eventsListeners[e][r](t)}),n},once(e,t,i){const n=this;if(!n.eventsListeners||n.destroyed)return n;if("function"!=typeof t)return n;const r=function(...i){n.off(e,r),r.__emitterProxy&&delete r.__emitterProxy,t.apply(n,i)};return r.__emitterProxy=t,n.on(e,r,i)},onAny(e,t){const i=this;if(!i.eventsListeners||i.destroyed)return i;if("function"!=typeof e)return i;const n=t?"unshift":"push";return i.eventsAnyListeners.indexOf(e)<0&&i.eventsAnyListeners[n](e),i},offAny(e){const t=this;if(!t.eventsListeners||t.destroyed)return t;if(!t.eventsAnyListeners)return t;const i=t.eventsAnyListeners.indexOf(e);return i>=0&&t.eventsAnyListeners.splice(i,1),t},off(e,t){const i=this;return!i.eventsListeners||i.destroyed?i:i.eventsListeners?(e.split(" ").forEach(e=>{void 0===t?i.eventsListeners[e]=[]:i.eventsListeners[e]&&i.eventsListeners[e].forEach((n,r)=>{(n===t||n.__emitterProxy&&n.__emitterProxy===t)&&i.eventsListeners[e].splice(r,1)})}),i):i},emit(...e){const t=this;if(!t.eventsListeners||t.destroyed)return t;if(!t.eventsListeners)return t;let i,n,r;if("string"==typeof e[0]||Array.isArray(e[0]))i=e[0],n=e.slice(1,e.length),r=t;else{const a=e[0];i=a.events,n=a.data??[],r=a.context||t}n.unshift(r);return(Array.isArray(i)?i:i.split(" ")).forEach(e=>{t.eventsAnyListeners&&t.eventsAnyListeners.length&&t.eventsAnyListeners.forEach(t=>{t.apply(r,[e,...n])}),t.eventsListeners&&t.eventsListeners[e]&&t.eventsListeners[e].forEach(e=>{e.apply(r,n)})}),t}};function Wp(e){const t=this;t.destroyed||t.enabled&&(t.allowClick||(t.params.preventClicks&&e.preventDefault(),t.params.preventClicksPropagation&&t.animating&&(e.stopPropagation(),e.stopImmediatePropagation())))}function Kp(){const e=this;e.destroyed||e.documentTouchHandlerProceeded||(e.documentTouchHandlerProceeded=!0,e.params.touchReleaseOnEdges&&(e.el.style.touchAction="auto"))}function Qp(e){const t=this;t.destroyed||(Np(t,e.target),"error"===e.type||t.params.cssMode||"auto"!==t.params.slidesPerView&&!t.params.autoHeight||t.update())}function Yp(){const e=this,{params:t,el:i}=e;if(i&&0===i.offsetWidth)return;t.breakpoints&&e.setBreakpoint();const{allowSlideNext:n,allowSlidePrev:r,snapGrid:a}=e,o=e.virtual&&e.params.virtual?.enabled;e.allowSlideNext=!0,e.allowSlidePrev=!0,e.updateSize(),e.updateSlides(),e.updateSlidesClasses();const s=o&&t.loop;if(!("auto"===t.slidesPerView||t.slidesPerView>1)||!e.isEnd||e.isBeginning||e.params.centeredSlides||s)e.params.loop&&!o?e.slideToLoop(e.realIndex,0,!1,!0):e.slideTo(e.activeIndex,0,!1,!0);else{const t=o?e.virtual.slides.length:e.slides.length;e.slideTo(t-1,0,!1,!0)}if(e.autoplay&&e.autoplay.running&&e.autoplay.paused){const t=e.autoplay;clearTimeout(t.resizeTimeout),t.resizeTimeout=setTimeout(()=>{e.autoplay&&e.autoplay.running&&e.autoplay.paused&&e.autoplay.resume()},500)}e.allowSlidePrev=r,e.allowSlideNext=n,e.params.watchOverflow&&a!==e.snapGrid&&e.checkOverflow()}function Xp(){const e=this;if(e.destroyed)return;const{wrapperEl:t,rtlTranslate:i,enabled:n}=e;if(!n)return;let r;e.previousTranslate=e.translate,e.isHorizontal()?e.translate=-t.scrollLeft:e.translate=-t.scrollTop,0===e.translate&&(e.translate=0),e.updateActiveIndex(),e.updateSlidesClasses();const a=e.maxTranslate()-e.minTranslate();r=0===a?0:(e.translate-e.minTranslate())/a,r!==e.progress&&e.updateProgress(i?-e.translate:e.translate),e.emit("setTranslate",e.translate,!1)}function Zp(e){const t=this;if(t.destroyed)return;const i=t.touchEventsData;let n=e.originalEvent??e;if("touchend"===n.type||"touchcancel"===n.type){const e=[...n.changedTouches].find(e=>e.identifier===i.touchId);if(!e||e.identifier!==i.touchId)return}else{if(null!==i.touchId)return;if(n.pointerId!==i.pointerId)return}if(["pointercancel","pointerout","pointerleave","contextmenu"].includes(n.type)){if(!(["pointercancel","contextmenu"].includes(n.type)&&(t.browser.isSafari||t.browser.isWebView)))return}i.pointerId=null,i.touchId=null,i.startEventPath=void 0,i.lastMoveEvent=void 0;const{params:r,touches:a,rtlTranslate:o,slidesGrid:s,enabled:l}=t;if(!l)return;if(!r.simulateTouch&&"mouse"===n.pointerType)return;if(i.allowTouchCallbacks&&t.emit("touchEnd",n),i.allowTouchCallbacks=!1,!i.isTouched)return i.isMoved&&r.grabCursor&&t.setGrabCursor(!1),i.isMoved=!1,void(i.startMoving=!1);r.grabCursor&&i.isMoved&&i.isTouched&&(!0===t.allowSlideNext||!0===t.allowSlidePrev)&&t.setGrabCursor(!1);const c=bp(),d=c-i.touchStartTime;if(t.allowClick){const e=n.path??(n.composedPath&&n.composedPath());t.updateClickedSlide(e&&e[0],e),t.emit("tap click",n),d<300&&c-i.lastClickTime<300&&t.emit("doubleTap doubleClick",n)}if(i.lastClickTime=bp(),fp(()=>{t.destroyed||(t.allowClick=!0)}),!i.isTouched||!i.isMoved||!t.swipeDirection||0===a.diff&&!i.loopSwapReset||i.currentTranslate===i.startTranslate&&!i.loopSwapReset)return i.isTouched=!1,i.isMoved=!1,void(i.startMoving=!1);let p;if(i.isTouched=!1,i.isMoved=!1,i.startMoving=!1,p=r.followFinger?o?t.translate:-t.translate:-(i.currentTranslate??0),r.cssMode)return;if(r.freeMode&&r.freeMode.enabled)return void t.freeMode.onTouchEnd({currentPos:p});const u=p>=-t.maxTranslate()&&!t.params.loop;let h=0,m=t.slidesSizesGrid[0];for(let e=0;e<s.length;e+=e<r.slidesPerGroupSkip?1:r.slidesPerGroup){const t=e<r.slidesPerGroupSkip-1?1:r.slidesPerGroup;void 0!==s[e+t]?(u||p>=s[e]&&p<s[e+t])&&(h=e,m=s[e+t]-s[e]):(u||p>=s[e])&&(h=e,m=s[s.length-1]-s[s.length-2])}let g=null,f=null;r.rewind&&(t.isBeginning?f=r.virtual?.enabled&&t.virtual?t.virtual.slides.length-1:t.slides.length-1:t.isEnd&&(g=0));const b=(p-s[h])/m,v=h<r.slidesPerGroupSkip-1?1:r.slidesPerGroup;if(d>r.longSwipesMs){if(!r.longSwipes)return void t.slideTo(t.activeIndex);"next"===t.swipeDirection&&(b>=r.longSwipesRatio?t.slideTo(r.rewind&&t.isEnd?g:h+v):t.slideTo(h)),"prev"===t.swipeDirection&&(b>1-r.longSwipesRatio?t.slideTo(h+v):null!==f&&b<0&&Math.abs(b)>r.longSwipesRatio?t.slideTo(f):t.slideTo(h))}else{if(!r.shortSwipes)return void t.slideTo(t.activeIndex);t.navigation&&(n.target===t.navigation.nextEl||n.target===t.navigation.prevEl)?n.target===t.navigation.nextEl?t.slideTo(h+v):t.slideTo(h):("next"===t.swipeDirection&&t.slideTo(null!==g?g:h+v),"prev"===t.swipeDirection&&t.slideTo(null!==f?f:h))}}function Jp(e){const t=this;if(t.destroyed)return;const i=t.touchEventsData,{params:n,touches:r,rtlTranslate:a,enabled:o}=t;if(!o)return;if(!n.simulateTouch&&"mouse"===e.pointerType)return;const s=e,l=s.originalEvent??s;if("pointermove"===l.type){if(null!==i.touchId)return;if(l.pointerId!==i.pointerId)return}let c;if("touchmove"===l.type){const e=[...l.changedTouches].find(e=>e.identifier===i.touchId);if(!e||e.identifier!==i.touchId)return;c=e}else c=l;if(!i.isTouched)return void(i.startMoving&&i.isScrolling&&t.emit("touchMoveOpposite",l));if(i.lastMoveEvent===l)return;i.lastMoveEvent=l;for(const n of i.startEventPath??[]){if(n===t.el)break;const i=n.swiper;i&&i!==t&&!i.destroyed&&i.params.nested&&i.touchEventsData.isTouched&&i.onTouchMove(e)}const d=c.pageX,p=c.pageY;if(l.preventedByNestedSwiper)return r.startX=d,void(r.startY=p);if(!t.allowTouchMove)return l.target.matches(i.focusableElements)||(t.allowClick=!1),void(i.isTouched&&(Object.assign(r,{startX:d,startY:p,currentX:d,currentY:p}),i.touchStartTime=bp()));if(n.touchReleaseOnEdges&&!n.loop)if(t.isVertical()){if(p<r.startY&&t.translate<=t.maxTranslate()||p>r.startY&&t.translate>=t.minTranslate())return i.isTouched=!1,void(i.isMoved=!1)}else{if(a&&(d>r.startX&&-t.translate<=t.maxTranslate()||d<r.startX&&-t.translate>=t.minTranslate()))return;if(!a&&(d<r.startX&&t.translate<=t.maxTranslate()||d>r.startX&&t.translate>=t.minTranslate()))return}if(document.activeElement&&document.activeElement.matches(i.focusableElements)&&document.activeElement!==l.target&&"mouse"!==l.pointerType&&document.activeElement.blur(),document.activeElement&&l.target===document.activeElement&&l.target.matches(i.focusableElements))return i.isMoved=!0,void(t.allowClick=!1);i.allowTouchCallbacks&&t.emit("touchMove",l),r.previousX=r.currentX,r.previousY=r.currentY,r.currentX=d,r.currentY=p;const u=r.currentX-r.startX,h=r.currentY-r.startY;if(t.params.threshold&&Math.sqrt(u**2+h**2)<t.params.threshold)return;if(void 0===i.isScrolling){let e;t.isHorizontal()&&r.currentY===r.startY||t.isVertical()&&r.currentX===r.startX?i.isScrolling=!1:u*u+h*h>=25&&(e=180*Math.atan2(Math.abs(h),Math.abs(u))/Math.PI,i.isScrolling=t.isHorizontal()?e>n.touchAngle:90-e>n.touchAngle)}if(i.isScrolling&&t.emit("touchMoveOpposite",l),void 0===i.startMoving&&(r.currentX===r.startX&&r.currentY===r.startY||(i.startMoving=!0)),i.isScrolling||"touchmove"===l.type&&i.preventTouchMoveFromPointerMove)return void(i.isTouched=!1);if(!i.startMoving)return;t.allowClick=!1,!n.cssMode&&l.cancelable&&l.preventDefault(),n.touchMoveStopPropagation&&!n.nested&&l.stopPropagation();let m=t.isHorizontal()?u:h,g=t.isHorizontal()?r.currentX-r.previousX:r.currentY-r.previousY;n.oneWayMovement&&(m=Math.abs(m)*(a?1:-1),g=Math.abs(g)*(a?1:-1)),r.diff=m,m*=n.touchRatio,a&&(m=-m,g=-g);const f=t.touchesDirection;t.swipeDirection=m>0?"prev":"next",t.touchesDirection=g>0?"prev":"next";const b=t.params.loop&&!n.cssMode,v="next"===t.touchesDirection&&t.allowSlideNext||"prev"===t.touchesDirection&&t.allowSlidePrev;if(!i.isMoved){if(b&&v&&t.loopFix({direction:t.swipeDirection}),i.startTranslate=t.getTranslate(),t.setTransition(0),t.animating){const e=new window.CustomEvent("transitionend",{bubbles:!0,cancelable:!0,detail:{bySwiperTouchMove:!0}});t.wrapperEl.dispatchEvent(e)}i.allowMomentumBounce=!1,!n.grabCursor||!0!==t.allowSlideNext&&!0!==t.allowSlidePrev||t.setGrabCursor(!0),t.emit("sliderFirstMove",l)}if((new Date).getTime(),!1!==n._loopSwapReset&&i.isMoved&&i.allowThresholdMove&&f!==t.touchesDirection&&b&&v&&Math.abs(m)>=1)return Object.assign(r,{startX:d,startY:p,currentX:d,currentY:p,startTranslate:i.currentTranslate}),i.loopSwapReset=!0,void(i.startTranslate=i.currentTranslate);t.emit("sliderMove",l),i.isMoved=!0;const y=i.startTranslate??0;i.currentTranslate=m+y;let w=!0,x=n.resistanceRatio;if(n.touchReleaseOnEdges&&(x=0),m>0?(b&&v&&i.allowThresholdMove&&i.currentTranslate>(n.centeredSlides?t.minTranslate()-t.slidesSizesGrid[t.activeIndex+1]-("auto"!==n.slidesPerView&&t.slides.length-n.slidesPerView>=2?t.slidesSizesGrid[t.activeIndex+1]+t.params.spaceBetween:0)-t.params.spaceBetween:t.minTranslate())&&t.loopFix({direction:"prev",setTranslate:!0,activeSlideIndex:0}),i.currentTranslate>t.minTranslate()&&(w=!1,n.resistance&&(i.currentTranslate=t.minTranslate()-1+(-t.minTranslate()+y+m)**x))):m<0&&(b&&v&&i.allowThresholdMove&&i.currentTranslate<(n.centeredSlides?t.maxTranslate()+t.slidesSizesGrid[t.slidesSizesGrid.length-1]+t.params.spaceBetween+("auto"!==n.slidesPerView&&t.slides.length-n.slidesPerView>=2?t.slidesSizesGrid[t.slidesSizesGrid.length-1]+t.params.spaceBetween:0):t.maxTranslate())&&t.loopFix({direction:"next",setTranslate:!0,activeSlideIndex:t.slides.length-("auto"===n.slidesPerView?t.slidesPerViewDynamic():Math.ceil(parseFloat(String(n.slidesPerView))))}),i.currentTranslate<t.maxTranslate()&&(w=!1,n.resistance&&(i.currentTranslate=t.maxTranslate()+1-(t.maxTranslate()-y-m)**x))),w&&(l.preventedByNestedSwiper=!0),!t.allowSlideNext&&"next"===t.swipeDirection&&(i.currentTranslate??0)<y&&(i.currentTranslate=y),!t.allowSlidePrev&&"prev"===t.swipeDirection&&(i.currentTranslate??0)>y&&(i.currentTranslate=y),t.allowSlidePrev||t.allowSlideNext||(i.currentTranslate=y),n.threshold>0){if(!(Math.abs(m)>n.threshold||i.allowThresholdMove))return void(i.currentTranslate=i.startTranslate);if(!i.allowThresholdMove)return i.allowThresholdMove=!0,r.startX=r.currentX,r.startY=r.currentY,i.currentTranslate=i.startTranslate,void(r.diff=t.isHorizontal()?r.currentX-r.startX:r.currentY-r.startY)}n.followFinger&&!n.cssMode&&((n.freeMode&&n.freeMode.enabled&&t.freeMode||n.watchSlidesProgress)&&(t.updateActiveIndex(),t.updateSlidesClasses()),n.freeMode&&n.freeMode.enabled&&t.freeMode&&t.freeMode.onTouchMove(),t.updateProgress(i.currentTranslate),t.setTranslate(i.currentTranslate??0))}function eu(e,t,i){const{params:n}=e,r=n.edgeSwipeDetection,a=n.edgeSwipeThreshold;return!r||!(i<=a||i>=window.innerWidth-a)||"prevent"===r&&(t.preventDefault(),!0)}function tu(e){const t=this;if(t.destroyed)return;const i=e.originalEvent??e,n=t.touchEventsData;if("pointerdown"===i.type){const e=i;if(null!==n.pointerId&&n.pointerId!==e.pointerId)return;n.pointerId=e.pointerId}else"touchstart"===i.type&&1===i.targetTouches.length&&(n.touchId=i.targetTouches[0].identifier);if("touchstart"===i.type)return void eu(t,i,i.targetTouches[0].pageX);const{params:r,touches:a,enabled:o}=t;if(!o)return;if(!r.simulateTouch&&"mouse"===i.pointerType)return;if(t.animating&&r.preventInteractionOnTransition)return;!t.animating&&r.cssMode&&r.loop&&t.loopFix();let s=i.target;if("wrapper"===r.touchEventsTarget&&!function(e,t){let i=t.contains(e);!i&&t instanceof HTMLSlotElement&&(i=[...t.assignedElements()].includes(e),i||(i=function(e,t){const i=[t];for(;i.length>0;){const t=i.shift();if(e===t)return!0;i.push(...t.children,...t.shadowRoot?t.shadowRoot.children:[],...t.assignedElements?t.assignedElements():[])}return!1}(e,t)));return i}(s,t.wrapperEl))return;const l=i;if("number"==typeof l.which&&3===l.which)return;if("number"==typeof l.button&&l.button>0)return;if(n.isTouched&&n.isMoved)return;const c=!!r.noSwipingClass&&""!==r.noSwipingClass,d=i.composedPath?i.composedPath():i.path;c&&i.target&&i.target.shadowRoot&&d&&(s=d[0]);const p=r.noSwipingSelector?r.noSwipingSelector:`.${r.noSwipingClass}`,u=!(!i.target||!i.target.shadowRoot);if(r.noSwiping&&(u?function(e,t){return function t(i){if(!i||i===document||i===window)return null;let n=i;n.assignedSlot&&(n=n.assignedSlot);const r=n.closest(e);if(!r&&!n.getRootNode)return null;const a=n.getRootNode();return r||t(a.host)}(t)}(p,s):s.closest(p)))return void(t.allowClick=!0);if(r.swipeHandler&&"string"==typeof r.swipeHandler&&!s.closest(r.swipeHandler))return;const h=i;a.currentX=h.pageX,a.currentY=h.pageY;const m=a.currentX,g=a.currentY;if(!eu(t,i,m))return;Object.assign(n,{isTouched:!0,isMoved:!1,allowTouchCallbacks:!0,isScrolling:void 0,startMoving:void 0}),a.startX=m,a.startY=g,n.touchStartTime=bp(),n.startEventPath=d,t.allowClick=!0,t.updateSize(),t.swipeDirection=void 0,r.threshold>0&&(n.allowThresholdMove=!1);let f=!0;s.matches(n.focusableElements)&&(f=!1,"SELECT"===s.nodeName&&(n.isTouched=!1)),document.activeElement&&document.activeElement.matches(n.focusableElements)&&document.activeElement!==s&&("mouse"===h.pointerType||"mouse"!==h.pointerType&&!s.matches(n.focusableElements))&&document.activeElement.blur();const b=f&&t.allowTouchMove&&r.touchStartPreventDefault;!r.touchStartForcePreventDefault&&!b||s.isContentEditable||i.preventDefault(),r.freeMode&&r.freeMode.enabled&&t.freeMode&&t.animating&&!r.cssMode&&t.freeMode.onTouchStart(),t.emit("touchStart",i)}const iu=(e,t)=>{const{params:i,el:n,wrapperEl:r,device:a}=e,o=!!i.nested,s="on"===t?"addEventListener":"removeEventListener",l=t;if(!n||"string"==typeof n)return;document[s]("touchstart",e.onDocumentTouchStart,{passive:!1,capture:o}),n[s]("touchstart",e.onTouchStart,{passive:!1}),n[s]("pointerdown",e.onTouchStart,{passive:!1}),document[s]("touchmove",e.onTouchMove,{passive:!1,capture:o}),document[s]("pointermove",e.onTouchMove,{passive:!1,capture:o}),document[s]("touchend",e.onTouchEnd,{passive:!0}),document[s]("pointerup",e.onTouchEnd,{passive:!0}),document[s]("pointercancel",e.onTouchEnd,{passive:!0}),document[s]("touchcancel",e.onTouchEnd,{passive:!0}),document[s]("pointerout",e.onTouchEnd,{passive:!0}),document[s]("pointerleave",e.onTouchEnd,{passive:!0}),document[s]("contextmenu",e.onTouchEnd,{passive:!0}),(i.preventClicks||i.preventClicksPropagation)&&n[s]("click",e.onClick,!0),i.cssMode&&r[s]("scroll",e.onScroll);const c=t=>{e[l](t,Yp,!0)};i.updateOnWindowResize?c(a.ios||a.android?"resize orientationchange observerUpdate":"resize observerUpdate"):c("observerUpdate"),i.lazyPreload&&(n[s]("load",e.onLoad,{capture:!0}),n[s]("error",e.onLoad,{capture:!0}))};var nu={attachEvents:function(){const e=this,{params:t}=e;e.onTouchStart=tu.bind(e),e.onTouchMove=Jp.bind(e),e.onTouchEnd=Zp.bind(e),e.onDocumentTouchStart=Kp.bind(e),t.cssMode&&(e.onScroll=Xp.bind(e)),e.onClick=Wp.bind(e),e.onLoad=Qp.bind(e),iu(e,"on")},detachEvents:function(){iu(this,"off")}};var ru={setGrabCursor:function(e){const t=this;if(!t.params.simulateTouch||t.params.watchOverflow&&t.isLocked||t.params.cssMode)return;const i="container"===t.params.touchEventsTarget?t.el:t.wrapperEl;t.isElement&&(t.__preventObserver__=!0),i.style.cursor="move",i.style.cursor=e?"grabbing":"grab",t.isElement&&requestAnimationFrame(()=>{t.__preventObserver__=!1})},unsetGrabCursor:function(){const e=this;e.params.watchOverflow&&e.isLocked||e.params.cssMode||(e.isElement&&(e.__preventObserver__=!0),e["container"===e.params.touchEventsTarget?"el":"wrapperEl"].style.cursor="",e.isElement&&requestAnimationFrame(()=>{e.__preventObserver__=!1}))}};var au={loopCreate:function(e,t){const i=this,{params:n,slidesEl:r}=i;if(!n.loop||i.virtual&&i.params.virtual?.enabled)return;const a=()=>{$p(r,`.${n.slideClass}, swiper-slide`).forEach((e,t)=>{e.setAttribute("data-swiper-slide-index",String(t))})},o=i.grid&&n.grid&&n.grid.rows>1;n.loopAddBlankSlides&&(n.slidesPerGroup>1||o)&&(()=>{const e=$p(r,`.${n.slideBlankClass}`);e.forEach(e=>{e.remove()}),e.length>0&&(i.recalcSlides(),i.updateSlides())})();const s=n.slidesPerGroup*(o?n.grid.rows:1),l=i.slides.length%s!==0,c=o&&i.slides.length%n.grid.rows!==0,d=e=>{for(let t=0;t<e;t+=1){const e=i.isElement?Sp("swiper-slide",[n.slideBlankClass]):Sp("div",[n.slideClass,n.slideBlankClass]);i.slidesEl.append(e)}};if(l){if(n.loopAddBlankSlides){d(s-i.slides.length%s),i.recalcSlides(),i.updateSlides()}else kp("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");a()}else if(c){if(n.loopAddBlankSlides){d(n.grid.rows-i.slides.length%n.grid.rows),i.recalcSlides(),i.updateSlides()}else kp("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");a()}else a();const p=n.centeredSlides||!!n.slidesOffsetBefore||!!n.slidesOffsetAfter;i.loopFix({slideRealIndex:e,direction:p?void 0:"next",initial:t})},loopFix:function(e={}){const{slideRealIndex:t,slideTo:i=!0,direction:n,setTranslate:r,activeSlideIndex:a,initial:o,byController:s,byMousewheel:l}=e;let c=a;const d=this;if(!d.params.loop)return;if(d.params.watchOverflow&&d.isLocked)return;d.emit("beforeLoopFix"),d.__loopFixInProgress__=!0;const{slides:p,allowSlidePrev:u,allowSlideNext:h,slidesEl:m,params:g}=d,{centeredSlides:f,slidesOffsetBefore:b,slidesOffsetAfter:v,initialSlide:y}=g,w=f||!!b||!!v;if(d.allowSlidePrev=!0,d.allowSlideNext=!0,d.virtual&&g.virtual?.enabled){if(i){const e=d.virtual.slides.length,t=d.virtual.slidesBefore??0;w||0!==d.snapIndex?w&&d.snapIndex<g.slidesPerView?d.slideTo(e+d.snapIndex,0,!1,!0):d.snapIndex===d.snapGrid.length-1&&d.slideTo(t,0,!1,!0):d.slideTo(e,0,!1,!0)}return d.allowSlidePrev=u,d.allowSlideNext=h,d.__loopFixInProgress__=!1,void d.emit("loopFix")}let x=g.slidesPerView;"auto"===x?x=d.slidesPerViewDynamic():(x=Math.ceil(parseFloat(String(g.slidesPerView))),w&&x%2==0&&(x+=1));const _=g.slidesPerGroupAuto?x:g.slidesPerGroup,$=e=>("function"==typeof e?e.call(d):e)||0,k=d.slidesGrid.length>1?(d.slidesGrid[d.slidesGrid.length-1]-d.slidesGrid[0])/(d.slidesGrid.length-1):d.size,S=k>0?$(b)/k:0,C=k>0?$(v)/k:0;let T=w?Math.max(_,(f?Math.ceil(x/2):0)+Math.ceil(Math.max(S,C))):_;T%_!==0&&(T+=_-T%_),T+=g.loopAdditionalSlides,d.loopedSlides=T;const M=d.grid&&g.grid&&g.grid.rows>1;p.length<x+T||"cards"===d.params.effect&&p.length<x+2*T?kp("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters"):M&&"row"===g.grid.fill&&kp("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");const A=[],E=[],P=M?Math.ceil(p.length/g.grid.rows):p.length,z=o&&P-y<x&&!w;let R=z?y:d.activeIndex;void 0===c?c=d.getSlideIndex(p.find(e=>e.classList.contains(g.slideActiveClass))):R=c;const I="next"===n||!n,L="prev"===n||!n;let O=0,D=0;const N=(M?p[c].column??0:c)+(w&&void 0===r?(f?-x/2+.5:0)-S:0);if(N<T){O=Math.max(T-N,_);for(let e=0;e<T-N;e+=1){const t=e-Math.floor(e/P)*P;if(M){const e=P-t-1;for(let t=p.length-1;t>=0;t-=1)p[t].column===e&&A.push(t)}else A.push(P-t-1)}}else if(N+x>P-T){D=Math.max(N-(P-2*T),_),z&&(D=Math.max(D,x-P+y+1));for(let e=0;e<D;e+=1){const t=e-Math.floor(e/P)*P;M?p.forEach((e,i)=>{e.column===t&&E.push(i)}):E.push(t)}}if(d.__preventObserver__=!0,requestAnimationFrame(()=>{d.__preventObserver__=!1}),"cards"===d.params.effect&&p.length<x+2*T&&(E.includes(c)&&E.splice(E.indexOf(c),1),A.includes(c)&&A.splice(A.indexOf(c),1)),L&&A.forEach(e=>{const t=p[e];t.swiperLoopMoveDOM=!0,m.prepend(t),t.swiperLoopMoveDOM=!1}),I&&E.forEach(e=>{const t=p[e];t.swiperLoopMoveDOM=!0,m.append(t),t.swiperLoopMoveDOM=!1}),d.recalcSlides(),"auto"===g.slidesPerView?d.updateSlides():M&&(A.length>0&&L||E.length>0&&I)&&d.slides.forEach((e,t)=>{d.grid.updateSlide(t,e,d.slides)}),g.watchSlidesProgress&&d.updateSlidesOffset(),i)if(A.length>0&&L){if(void 0===t){const e=d.slidesGrid[R],t=d.slidesGrid[R+O]-e;l?d.setTranslate(d.translate-t):(d.slideTo(R+Math.ceil(O),0,!1,!0),r&&(d.touchEventsData.startTranslate=d.touchEventsData.startTranslate-t,d.touchEventsData.currentTranslate=d.touchEventsData.currentTranslate-t))}else if(r){const e=M?A.length/g.grid.rows:A.length;d.slideTo(d.activeIndex+e,0,!1,!0),d.touchEventsData.currentTranslate=d.translate}}else if(E.length>0&&I)if(void 0===t){const e=d.slidesGrid[R],t=d.slidesGrid[R-D]-e;l?d.setTranslate(d.translate-t):(d.slideTo(R-D,0,!1,!0),r&&(d.touchEventsData.startTranslate=d.touchEventsData.startTranslate-t,d.touchEventsData.currentTranslate=d.touchEventsData.currentTranslate-t))}else{const e=M?E.length/g.grid.rows:E.length;d.slideTo(d.activeIndex-e,0,!1,!0)}d.allowSlidePrev=u,d.allowSlideNext=h;const F=d.controller?.control;if(F&&!s){const e={slideRealIndex:t,direction:n,setTranslate:r,activeSlideIndex:c,byController:!0};Array.isArray(F)?F.forEach(t=>{!t.destroyed&&t.params.loop&&t.loopFix({...e,slideTo:t.params.slidesPerView===g.slidesPerView&&i})}):F instanceof d.constructor&&F.params.loop&&F.loopFix({...e,slideTo:F.params.slidesPerView===g.slidesPerView&&i})}d.__loopFixInProgress__=!1,d.emit("loopFix")},loopDestroy:function(){const e=this,{params:t,slidesEl:i}=e;if(!t.loop||!i||e.virtual&&e.params.virtual?.enabled)return;e.recalcSlides();const n=[];e.slides.forEach(e=>{const t=e,i=void 0===t.swiperSlideIndex?Number(e.getAttribute("data-swiper-slide-index")):t.swiperSlideIndex;n[i]=e}),e.slides.forEach(e=>{e.removeAttribute("data-swiper-slide-index")}),n.forEach(e=>{i.append(e)}),e.recalcSlides(),e.slideTo(e.realIndex,0)}};function ou(e,t){return function(i={}){const n=Object.keys(i)[0],r=i[n];"object"==typeof r&&null!==r?(!0===e[n]&&(e[n]={enabled:!0}),"navigation"===n&&e[n]&&e[n].enabled&&!e[n].prevEl&&!e[n].nextEl&&(e[n].auto=!0),["pagination","scrollbar"].indexOf(n)>=0&&e[n]&&e[n].enabled&&!e[n].el&&(e[n].auto=!0),n in e&&"enabled"in r?("object"!=typeof e[n]||"enabled"in e[n]||(e[n].enabled=!0),e[n]||(e[n]={enabled:!1}),xp(t,i)):xp(t,i)):xp(t,i)}}var su={slideTo:function(e=0,t,i=!0,n,r){"string"==typeof e&&(e=parseInt(e,10));const a=this;let o=e;o<0&&(o=0);const{params:s,snapGrid:l,slidesGrid:c,previousIndex:d,activeIndex:p,rtlTranslate:u,wrapperEl:h,enabled:m}=a;if(!m&&!n&&!r||a.destroyed||a.animating&&s.preventInteractionOnTransition)return!1;void 0===t&&(t=a.params.speed);const g=Math.min(a.params.slidesPerGroupSkip,o);let f=g+Math.floor((o-g)/a.params.slidesPerGroup);f>=l.length&&(f=l.length-1);const b=-l[f];if(s.normalizeSlideIndex)for(let e=0;e<c.length;e+=1){const t=-Math.floor(100*b),i=Math.floor(100*c[e]),n=Math.floor(100*c[e+1]);void 0!==c[e+1]?t>=i&&t<n-(n-i)/2?o=e:t>=i&&t<n&&(o=e+1):t>=i&&(o=e)}if(a.initialized&&o!==p){if(!a.allowSlideNext&&(u?b>a.translate&&b>a.minTranslate():b<a.translate&&b<a.minTranslate()))return!1;if(!a.allowSlidePrev&&b>a.translate&&b>a.maxTranslate()&&(p||0)!==o)return!1}let v;o!==(d||0)&&i&&a.emit("beforeSlideChangeStart"),a.updateProgress(b),v=o>p?"next":o<p?"prev":"reset";const y=a.virtual&&a.params.virtual?.enabled;if(!(y&&r)&&(u&&-b===a.translate||!u&&b===a.translate))return a.updateActiveIndex(o),s.autoHeight&&a.updateAutoHeight(),a.updateSlidesClasses(),"slide"!==s.effect&&a.setTranslate(b),"reset"!==v&&(a.transitionStart(i,v),a.transitionEnd(i,v)),!1;if(s.cssMode){const e=a.isHorizontal(),i=u?b:-b;return 0===t?(y&&(a.wrapperEl.style.scrollSnapType="none",a._immediateVirtual=!0),y&&!a._cssModeVirtualInitialSet&&(a.params.initialSlide??0)>0?(a._cssModeVirtualInitialSet=!0,requestAnimationFrame(()=>{h[e?"scrollLeft":"scrollTop"]=i})):h[e?"scrollLeft":"scrollTop"]=i,y&&requestAnimationFrame(()=>{a.wrapperEl.style.scrollSnapType="",a._immediateVirtual=!1})):h.scrollTo({[e?"left":"top"]:i,behavior:"smooth"}),!0}const w=Dp().isSafari;return y&&!r&&w&&a.isElement&&a.virtual.update(!1,!1,o),a.setTransition(t),a.setTranslate(b),a.updateActiveIndex(o),a.updateSlidesClasses(),a.emit("beforeTransitionStart",t,n),a.transitionStart(i,v),0===t?a.transitionEnd(i,v):a.animating||(a.animating=!0,a.onSlideToWrapperTransitionEnd||(a.onSlideToWrapperTransitionEnd=function(e){a&&!a.destroyed&&e.target===this&&(a.wrapperEl.removeEventListener("transitionend",a.onSlideToWrapperTransitionEnd),a.onSlideToWrapperTransitionEnd=null,delete a.onSlideToWrapperTransitionEnd,a.transitionEnd(i,v))}),a.wrapperEl.addEventListener("transitionend",a.onSlideToWrapperTransitionEnd)),!0},slideToLoop:function(e=0,t,i=!0,n){if("string"==typeof e){e=parseInt(e,10)}const r=this;if(r.destroyed)return;void 0===t&&(t=r.params.speed);const a=r.grid&&r.params.grid&&r.params.grid.rows>1;let o=e;if(r.params.loop)if(r.virtual&&r.params.virtual?.enabled)o+=r.virtual.slidesBefore??0;else{let e;if(a){const t=o*r.params.grid.rows,i=r.slides.find(e=>Number(e.getAttribute("data-swiper-slide-index"))===t);e=i?.column??0}else e=r.getSlideIndexByData(o);const t=a?Math.ceil(r.slides.length/r.params.grid.rows):r.slides.length,{centeredSlides:i,slidesOffsetBefore:s,slidesOffsetAfter:l}=r.params,c=i||!!s||!!l;let d;"auto"===r.params.slidesPerView?d=r.slidesPerViewDynamic():(d=Math.ceil(parseFloat(String(r.params.slidesPerView))),c&&d%2==0&&(d+=1));let p=t-e<d;if(c&&(p=p||e<Math.ceil(d/2)),n&&c&&"auto"!==r.params.slidesPerView&&!a&&(p=!1),p){const i=c?e<r.activeIndex?"prev":"next":e-r.activeIndex-1<r.params.slidesPerView?"next":"prev";r.loopFix({direction:i,slideTo:!0,activeSlideIndex:"next"===i?e+1:e-t+1,slideRealIndex:"next"===i?r.realIndex:void 0})}if(a){const e=o*r.params.grid.rows,t=r.slides.find(t=>Number(t.getAttribute("data-swiper-slide-index"))===e);o=t?.column??0}else o=r.getSlideIndexByData(o)}return requestAnimationFrame(()=>{r.slideTo(o,t,i,n)}),r},slideNext:function(e,t=!0,i){const n=this,{enabled:r,params:a,animating:o}=n;if(!r||n.destroyed)return n;void 0===e&&(e=n.params.speed);let s=a.slidesPerGroup;"auto"===a.slidesPerView&&1===a.slidesPerGroup&&a.slidesPerGroupAuto&&(s=Math.max(n.slidesPerViewDynamic("current",!0),1));const l=n.activeIndex<a.slidesPerGroupSkip?1:s,c=n.virtual&&a.virtual?.enabled;if(a.loop){if(o&&!c&&a.loopPreventsSliding)return!1;if(n.loopFix({direction:"next"}),n._clientLeft=n.wrapperEl.clientLeft,n.activeIndex===n.slides.length-1&&a.cssMode)return requestAnimationFrame(()=>{n.slideTo(n.activeIndex+l,e,t,i)}),!0}return a.rewind&&n.isEnd?n.slideTo(0,e,t,i):n.slideTo(n.activeIndex+l,e,t,i)},slidePrev:function(e,t=!0,i){const n=this,{params:r,snapGrid:a,slidesGrid:o,rtlTranslate:s,enabled:l,animating:c}=n;if(!l||n.destroyed)return n;void 0===e&&(e=n.params.speed);const d=n.virtual&&r.virtual?.enabled;if(r.loop){if(c&&!d&&r.loopPreventsSliding)return!1;n.loopFix({direction:"prev"}),n._clientLeft=n.wrapperEl.clientLeft}function p(e){return e<0?-Math.floor(Math.abs(e)):Math.floor(e)}const u=p(s?n.translate:-n.translate),h=a.map(e=>p(e)),m=r.freeMode&&r.freeMode.enabled;let g=a[h.indexOf(u)-1];if(void 0===g&&(r.cssMode||m)){let e;a.forEach((t,i)=>{u>=t&&(e=i)}),void 0!==e&&(g=m?a[e]:a[e>0?e-1:e])}let f=0;if(void 0!==g&&(f=o.indexOf(g),f<0&&(f=n.activeIndex-1),"auto"===r.slidesPerView&&1===r.slidesPerGroup&&r.slidesPerGroupAuto&&(f=f-n.slidesPerViewDynamic("previous",!0)+1,f=Math.max(f,0))),r.rewind&&n.isBeginning){const r=n.params.virtual?.enabled&&n.virtual?n.virtual.slides.length-1:n.slides.length-1;return n.slideTo(r,e,t,i)}return r.loop&&0===n.activeIndex&&r.cssMode?(requestAnimationFrame(()=>{n.slideTo(f,e,t,i)}),!0):n.slideTo(f,e,t,i)},slideReset:function(e,t=!0,i){const n=this;if(!n.destroyed)return void 0===e&&(e=n.params.speed),n.slideTo(n.activeIndex,e,t,i)},slideToClosest:function(e,t=!0,i,n=.5){const r=this;if(r.destroyed)return;void 0===e&&(e=r.params.speed);let a=r.activeIndex;const o=Math.min(r.params.slidesPerGroupSkip,a),s=o+Math.floor((a-o)/r.params.slidesPerGroup),l=r.rtlTranslate?r.translate:-r.translate;if(l>=r.snapGrid[s]){const e=r.snapGrid[s];l-e>(r.snapGrid[s+1]-e)*n&&(a+=r.params.slidesPerGroup)}else{const e=r.snapGrid[s-1];l-e<=(r.snapGrid[s]-e)*n&&(a-=r.params.slidesPerGroup)}return a=Math.max(a,0),a=Math.min(a,r.slidesGrid.length-1),r.slideTo(a,e,t,i)},slideToClickedSlide:function(){const e=this;if(e.destroyed)return;const{params:t,slidesEl:i,clickedSlide:n,clickedIndex:r}=e;if(void 0===n||void 0===r)return;const a="auto"===t.slidesPerView?e.slidesPerViewDynamic():t.slidesPerView;let o,s=e.getSlideIndexWhenGrid(r);const l=e.isElement?"swiper-slide":`.${t.slideClass}`,c=e.grid&&e.params.grid&&e.params.grid.rows>1;if(t.loop){if(e.animating)return;o=parseInt(n.getAttribute("data-swiper-slide-index"),10),t.centeredSlides?e.slideToLoop(o):s>(c?(e.slides.length-a)/2-(e.params.grid.rows-1):e.slides.length-a)?(e.loopFix(),s=e.getSlideIndex($p(i,`${l}[data-swiper-slide-index="${o}"]`)[0]),fp(()=>{e.slideTo(s)})):e.slideTo(s)}else e.slideTo(s)}};function lu({swiper:e,runCallbacks:t,direction:i,step:n}){const{activeIndex:r,previousIndex:a}=e;let o=i;o||(o=r>a?"next":r<a?"prev":"reset"),e.emit(`transition${n}`),t&&"reset"===o?e.emit(`slideResetTransition${n}`):t&&r!==a&&(e.emit(`slideChangeTransition${n}`),"next"===o?e.emit(`slideNextTransition${n}`):e.emit(`slidePrevTransition${n}`))}var cu={setTransition:function(e,t){const i=this;i.params.cssMode||(i.wrapperEl.style.transitionDuration=`${e}ms`,i.wrapperEl.style.transitionDelay=0===e?"0ms":""),i.emit("setTransition",e,t)},transitionStart:function(e=!0,t){const i=this,{params:n}=i;n.cssMode||(n.autoHeight&&i.updateAutoHeight(),lu({swiper:i,runCallbacks:e,direction:t,step:"Start"}))},transitionEnd:function(e=!0,t){const i=this,{params:n}=i;i.animating=!1,n.cssMode||(i.setTransition(0),lu({swiper:i,runCallbacks:e,direction:t,step:"End"}))}};var du={getTranslate:function(e=(this.isHorizontal()?"x":"y")){const{params:t,rtlTranslate:i,translate:n,wrapperEl:r}=this;if(t.virtualTranslate)return i?-n:n;if(t.cssMode)return n;let a=vp(r,e);return a+=this.cssOverflowAdjustment(),i&&(a=-a),a||0},setTranslate:function(e,t){const i=this,{rtlTranslate:n,params:r,wrapperEl:a,progress:o}=i;let s,l=0,c=0;i.isHorizontal()?l=n?-e:e:c=e,r.roundLengths&&(l=Math.floor(l),c=Math.floor(c)),i.previousTranslate=i.translate,i.translate=i.isHorizontal()?l:c,r.cssMode?a[i.isHorizontal()?"scrollLeft":"scrollTop"]=i.isHorizontal()?-l:-c:r.virtualTranslate||(i.isHorizontal()?l-=i.cssOverflowAdjustment():c-=i.cssOverflowAdjustment(),a.style.transform=`translate3d(${l}px, ${c}px, 0px)`);const d=i.maxTranslate()-i.minTranslate();s=0===d?0:(e-i.minTranslate())/d,s!==o&&i.updateProgress(e),i.emit("setTranslate",i.translate,t)},minTranslate:function(){return-this.snapGrid[0]},maxTranslate:function(){return-this.snapGrid[this.snapGrid.length-1]},translateTo:function(e=0,t=this.params.speed,i=!0,n=!0,r){const a=this,{params:o,wrapperEl:s}=a;if(a.animating&&o.preventInteractionOnTransition)return!1;const l=a.minTranslate(),c=a.maxTranslate();let d;if(d=n&&e>l?l:n&&e<c?c:e,a.updateProgress(d),o.cssMode){const e=a.isHorizontal();return 0===t?s[e?"scrollLeft":"scrollTop"]=-d:s.scrollTo({[e?"left":"top"]:-d,behavior:"smooth"}),!0}return 0===t?(a.setTransition(0),a.setTranslate(d),i&&(a.emit("beforeTransitionStart",t,r),a.emit("transitionEnd"))):(a.setTransition(t),a.setTranslate(d),i&&(a.emit("beforeTransitionStart",t,r),a.emit("transitionStart")),a.animating||(a.animating=!0,a.onTranslateToWrapperTransitionEnd||(a.onTranslateToWrapperTransitionEnd=function(e){a&&!a.destroyed&&e.target===this&&(a.wrapperEl.removeEventListener("transitionend",a.onTranslateToWrapperTransitionEnd),a.onTranslateToWrapperTransitionEnd=null,delete a.onTranslateToWrapperTransitionEnd,a.animating=!1,i&&a.emit("transitionEnd"))}),a.wrapperEl.addEventListener("transitionend",a.onTranslateToWrapperTransitionEnd))),!0}};const pu=(e,t,i)=>{t&&!e.classList.contains(i)?e.classList.add(i):!t&&e.classList.contains(i)&&e.classList.remove(i)};const uu=(e,t,i)=>{t&&!e.classList.contains(i)?e.classList.add(i):!t&&e.classList.contains(i)&&e.classList.remove(i)};var hu={updateSize:function(){const e=this;let t,i;const n=e.el;t=void 0!==e.params.width&&null!==e.params.width?e.params.width:n.clientWidth,i=void 0!==e.params.height&&null!==e.params.height?e.params.height:n.clientHeight,0===t&&e.isHorizontal()||0===i&&e.isVertical()||(t=t-parseInt(Cp(n,"padding-left")||"0",10)-parseInt(Cp(n,"padding-right")||"0",10),i=i-parseInt(Cp(n,"padding-top")||"0",10)-parseInt(Cp(n,"padding-bottom")||"0",10),Number.isNaN(t)&&(t=0),Number.isNaN(i)&&(i=0),Object.assign(e,{width:t,height:i,size:e.isHorizontal()?t:i}))},updateSlides:function(){const e=this;function t(t,i){return parseFloat(t.getPropertyValue(e.getDirectionLabel(i))||"0")}const i=e.params,{wrapperEl:n,slidesEl:r,rtlTranslate:a,wrongRTL:o}=e,s=!(!e.virtual||!i.virtual?.enabled),l=s?e.virtual.slides.length:e.slides.length,c=$p(r,`.${e.params.slideClass}, swiper-slide`),d=s?e.virtual.slides.length:c.length;let p=[];const u=[],h=[],m=t=>"function"==typeof t?t.call(e):t,g=m(i.slidesOffsetBefore),f=m(i.slidesOffsetAfter),b=e.snapGrid.length,v=e.slidesGrid.length,y=e.size-g-f;let w=i.spaceBetween,x=-g,_=0,$=0;if(void 0===y)return;"string"==typeof w&&w.indexOf("%")>=0?w=parseFloat(w.replace("%",""))/100*y:"string"==typeof w&&(w=parseFloat(w)),e.virtualSize=-w-g-f,c.forEach(e=>{a?e.style.marginLeft="":e.style.marginRight="",e.style.marginBottom="",e.style.marginTop=""}),i.centeredSlides&&i.cssMode&&(_p(n,"--swiper-centered-offset-before",""),_p(n,"--swiper-centered-offset-after","")),i.cssMode&&(_p(n,"--swiper-slides-offset-before",`${g}px`),_p(n,"--swiper-slides-offset-after",`${f}px`));const k=i.grid&&i.grid.rows>1&&e.grid;k?e.grid.initSlides(c):e.grid&&e.grid.unsetSlides();let S=0;const C="auto"===i.slidesPerView&&i.breakpoints&&Object.keys(i.breakpoints).filter(e=>{const t=i.breakpoints[e];return void 0!==t?.slidesPerView}).length>0;for(let n=0;n<d;n+=1){S=0;const r=c[n];if(!r||(k&&e.grid.updateSlide(n,r,c),"none"!==Cp(r,"display"))){if(s&&"auto"===i.slidesPerView)i.virtual?.slidesPerViewAutoSlideSize&&(S=i.virtual.slidesPerViewAutoSlideSize),S&&r&&(i.roundLengths&&(S=Math.floor(S)),r.style[e.getDirectionLabel("width")]=`${S}px`);else if("auto"===i.slidesPerView){C&&(r.style[e.getDirectionLabel("width")]="");const n=getComputedStyle(r),a=r.style.transform,o=r.style.webkitTransform;if(a&&(r.style.transform="none"),o&&(r.style.webkitTransform="none"),i.roundLengths)S=e.isHorizontal()?Ap(r,"width"):Ap(r,"height");else{const e=t(n,"width"),i=t(n,"padding-left"),a=t(n,"padding-right"),o=t(n,"margin-left"),s=t(n,"margin-right"),l=n.getPropertyValue("box-sizing");if(l&&"border-box"===l)S=e+o+s;else{const{clientWidth:t,offsetWidth:n}=r;S=e+i+a+o+s+(n-t)}}a&&(r.style.transform=a),o&&(r.style.webkitTransform=o),i.roundLengths&&(S=Math.floor(S))}else S=(y-(i.slidesPerView-1)*w)/i.slidesPerView,i.roundLengths&&(S=Math.floor(S)),r&&(r.style[e.getDirectionLabel("width")]=`${S}px`);r&&(r.swiperSlideSize=S),h.push(S),i.centeredSlides?(x=x+S/2+_/2+w,0===_&&0!==n&&(x=x-y/2-w),0===n&&(x=x-y/2-w),Math.abs(x)<.001&&(x=0),i.roundLengths&&(x=Math.floor(x)),$%i.slidesPerGroup===0&&p.push(x),u.push(x)):(i.roundLengths&&(x=Math.floor(x)),($-Math.min(e.params.slidesPerGroupSkip,$))%e.params.slidesPerGroup===0&&p.push(x),u.push(x),x=x+S+w),e.virtualSize+=S+w,_=S,$+=1}}if(e.virtualSize=Math.max(e.virtualSize,y)+f,a&&o&&("slide"===i.effect||"coverflow"===i.effect)&&(n.style.width=`${e.virtualSize+w}px`),i.setWrapperSize&&(n.style[e.getDirectionLabel("width")]=`${e.virtualSize+w}px`),k&&e.grid.updateWrapperSize(S,p),!i.centeredSlides){const t="auto"!==i.slidesPerView&&i.slidesPerView%1!=0,n=i.snapToSlideEdge&&!i.loop&&("auto"===i.slidesPerView||t);let r=p.length;if(n){let e;if("auto"===i.slidesPerView){e=1;let t=0;for(let i=h.length-1;i>=0&&(t+=h[i]+(i<h.length-1?w:0),t<=y);i-=1)e=h.length-i}else e=Math.floor(i.slidesPerView);r=Math.max(d-e,0)}const a=[];for(let t=0;t<p.length;t+=1){let o=p[t];i.roundLengths&&(o=Math.floor(o)),n?t<=r&&a.push(o):p[t]<=e.virtualSize-y&&a.push(o)}p=a,Math.floor(e.virtualSize-y)-Math.floor(p[p.length-1])>1&&(n||p.push(e.virtualSize-y))}if(s&&i.loop){const t=h[0]+w,n=(e.virtual.slidesBefore??0)+(e.virtual.slidesAfter??0);if(i.slidesPerGroup>1){const e=Math.ceil(n/i.slidesPerGroup),r=t*i.slidesPerGroup;for(let t=0;t<e;t+=1)p.push(p[p.length-1]+r)}for(let r=0;r<n;r+=1)1===i.slidesPerGroup&&p.push(p[p.length-1]+t),u.push(u[u.length-1]+t),e.virtualSize+=t}if(0===p.length&&(p=[0]),0!==w){const t=e.isHorizontal()&&a?"marginLeft":e.getDirectionLabel("marginRight");c.filter((e,t)=>!(i.cssMode&&!i.loop)||t!==c.length-1).forEach(e=>{e.style[t]=`${w}px`})}if(i.centeredSlides&&i.centeredSlidesBounds){let e=0;h.forEach(t=>{e+=t+(w||0)}),e-=w;const t=e>y?e-y:0;p=p.map(e=>e<=0?-g:e>t?t+f:e)}if(i.centerInsufficientSlides){let e=0;if(h.forEach(t=>{e+=t+(w||0)}),e-=w,e<y){const t=(y-e)/2;p.forEach((e,i)=>{p[i]=e-t}),u.forEach((e,i)=>{u[i]=e+t})}}if(Object.assign(e,{slides:c,snapGrid:p,slidesGrid:u,slidesSizesGrid:h}),i.centeredSlides&&i.cssMode&&!i.centeredSlidesBounds){_p(n,"--swiper-centered-offset-before",-p[0]+"px"),_p(n,"--swiper-centered-offset-after",e.size/2-h[h.length-1]/2+"px");const t=-e.snapGrid[0],i=-e.slidesGrid[0];e.snapGrid=e.snapGrid.map(e=>e+t),e.slidesGrid=e.slidesGrid.map(e=>e+i)}if(d!==l&&e.emit("slidesLengthChange"),p.length!==b&&(e.params.watchOverflow&&e.checkOverflow(),e.emit("snapGridLengthChange")),u.length!==v&&e.emit("slidesGridLengthChange"),i.watchSlidesProgress&&e.updateSlidesOffset(),e.emit("slidesUpdated"),!(s||i.cssMode||"slide"!==i.effect&&"fade"!==i.effect)){const t=`${i.containerModifierClass}backface-hidden`,n=e.el.classList.contains(t);d<=i.maxBackfaceHiddenSlides?n||e.el.classList.add(t):n&&e.el.classList.remove(t)}},updateAutoHeight:function(e){const t=this,i=[],n=t.virtual&&t.params.virtual?.enabled;let r,a=0;"number"==typeof e?t.setTransition(e):!0===e&&t.setTransition(t.params.speed);const o=e=>n?t.slides[t.getSlideIndexByData(e)]:t.slides[e];if("auto"!==t.params.slidesPerView&&t.params.slidesPerView>1)if(t.params.centeredSlides)(t.visibleSlides||[]).forEach(e=>{i.push(e)});else for(r=0;r<Math.ceil(t.params.slidesPerView);r+=1){const e=t.activeIndex+r;if(e>t.slides.length&&!n)break;const a=o(e);a&&i.push(a)}else{const e=o(t.activeIndex);e&&i.push(e)}for(r=0;r<i.length;r+=1)if(void 0!==i[r]){const e=i[r].offsetHeight;a=e>a?e:a}(a||0===a)&&(t.wrapperEl.style.height=`${a}px`)},updateSlidesOffset:function(){const e=this,t=e.slides,i=e.isElement?e.isHorizontal()?e.wrapperEl.offsetLeft:e.wrapperEl.offsetTop:0;for(let n=0;n<t.length;n+=1)t[n].swiperSlideOffset=(e.isHorizontal()?t[n].offsetLeft:t[n].offsetTop)-i-e.cssOverflowAdjustment()},updateSlidesProgress:function(e=this&&this.translate||0){const t=this,i=t.params,{slides:n,rtlTranslate:r,snapGrid:a}=t;if(0===n.length)return;void 0===n[0].swiperSlideOffset&&t.updateSlidesOffset();let o=-e;r&&(o=e),t.visibleSlidesIndexes=[],t.visibleSlides=[];let s=i.spaceBetween;"string"==typeof s&&s.indexOf("%")>=0?s=parseFloat(s.replace("%",""))/100*t.size:"string"==typeof s&&(s=parseFloat(s));for(let e=0;e<n.length;e+=1){const l=n[e];let c=l.swiperSlideOffset??0;i.cssMode&&i.centeredSlides&&(c-=n[0].swiperSlideOffset??0);const d=l.swiperSlideSize??0,p=(o+(i.centeredSlides?t.minTranslate():0)-c)/(d+s),u=(o-a[0]+(i.centeredSlides?t.minTranslate():0)-c)/(d+s),h=-(o-c),m=h+t.slidesSizesGrid[e],g=h>=0&&h<=t.size-t.slidesSizesGrid[e],f=h>=0&&h<t.size-1||m>1&&m<=t.size||h<=0&&m>=t.size;f&&(t.visibleSlides.push(l),t.visibleSlidesIndexes.push(e)),uu(l,f,i.slideVisibleClass),uu(l,g,i.slideFullyVisibleClass),l.progress=r?-p:p,l.originalProgress=r?-u:u}},updateProgress:function(e){const t=this;if(void 0===e){const i=t.rtlTranslate?-1:1;e=t&&t.translate&&t.translate*i||0}const i=t.params,n=t.maxTranslate()-t.minTranslate();let{progress:r,isBeginning:a,isEnd:o}=t,s=t.progressLoop;const l=a,c=o;if(0===n)r=0,a=!0,o=!0;else{r=(e-t.minTranslate())/n;const i=Math.abs(e-t.minTranslate())<1,s=Math.abs(e-t.maxTranslate())<1;a=i||r<=0,o=s||r>=1,i&&(r=0),s&&(r=1)}if(i.loop){const i=t.getSlideIndexByData(0),n=t.getSlideIndexByData(t.slides.length-1),r=t.slidesGrid[i],a=t.slidesGrid[n],o=t.slidesGrid[t.slidesGrid.length-1],l=Math.abs(e);s=l>=r?(l-r)/o:(l+o-a)/o,s>1&&(s-=1)}Object.assign(t,{progress:r,progressLoop:s,isBeginning:a,isEnd:o}),(i.watchSlidesProgress||i.centeredSlides&&i.autoHeight)&&t.updateSlidesProgress(e),a&&!l&&t.emit("reachBeginning toEdge"),o&&!c&&t.emit("reachEnd toEdge"),(l&&!a||c&&!o)&&t.emit("fromEdge"),t.emit("progress",r)},updateSlidesClasses:function(){const e=this,{slides:t,params:i,slidesEl:n,activeIndex:r}=e,a=!(!e.virtual||!i.virtual?.enabled),o=e.grid&&i.grid&&i.grid.rows>1,s=e=>$p(n,`.${i.slideClass}${e}, swiper-slide${e}`)[0];let l,c,d;if(a)if(i.loop){const t=e.virtual.slides;let i=r-(e.virtual.slidesBefore??0);i<0&&(i=t.length+i),i>=t.length&&(i-=t.length),l=s(`[data-swiper-slide-index="${i}"]`)}else l=s(`[data-swiper-slide-index="${r}"]`);else o?(l=t.find(e=>e.column===r),d=t.find(e=>e.column===r+1),c=t.find(e=>e.column===r-1)):l=t[r];l&&(o||(d=function(e,t){const i=[];let n=e.nextElementSibling;for(;n;)t&&!n.matches(t)||i.push(n),n=n.nextElementSibling;return i}(l,`.${i.slideClass}, swiper-slide`)[0],i.loop&&!d&&(d=t[0]),c=function(e,t){const i=[];let n=e.previousElementSibling;for(;n;)t&&!n.matches(t)||i.push(n),n=n.previousElementSibling;return i}(l,`.${i.slideClass}, swiper-slide`)[0],i.loop&&0===!c&&(c=t[t.length-1]))),t.forEach(e=>{pu(e,e===l,i.slideActiveClass),pu(e,e===d,i.slideNextClass),pu(e,e===c,i.slidePrevClass)}),e.emitSlidesClasses()},updateActiveIndex:function(e){const t=this,i=t.rtlTranslate?t.translate:-t.translate,{snapGrid:n,params:r,activeIndex:a,realIndex:o,snapIndex:s}=t;let l,c=e;const d=e=>{const i=t.virtual.slides;let n=e-(t.virtual.slidesBefore??0);return n<0&&(n=i.length+n),n>=i.length&&(n-=i.length),n};if(void 0===c&&(c=function(e){const{slidesGrid:t,params:i}=e,n=e.rtlTranslate?e.translate:-e.translate;let r;for(let e=0;e<t.length;e+=1)void 0!==t[e+1]?n>=t[e]&&n<t[e+1]-(t[e+1]-t[e])/2?r=e:n>=t[e]&&n<t[e+1]&&(r=e+1):n>=t[e]&&(r=e);return i.normalizeSlideIndex&&(r<0||void 0===r)&&(r=0),r}(t)),n.indexOf(i)>=0)l=n.indexOf(i);else{const e=Math.min(r.slidesPerGroupSkip,c);l=e+Math.floor((c-e)/r.slidesPerGroup)}if(l>=n.length&&(l=n.length-1),c===a&&!t.params.loop)return void(l!==s&&(t.snapIndex=l,t.emit("snapIndexChange")));if(c===a&&t.params.loop&&t.virtual&&t.params.virtual?.enabled)return void(t.realIndex=d(c));const p=t.grid&&r.grid&&r.grid.rows>1;let u;if(t.virtual&&r.virtual?.enabled)u=r.loop?d(c):c;else if(p){const e=t.slides.find(e=>e.column===c);let i=parseInt(e.getAttribute("data-swiper-slide-index"),10);Number.isNaN(i)&&(i=Math.max(t.slides.indexOf(e),0)),u=Math.floor(i/r.grid.rows)}else if(t.slides[c]){const e=t.slides[c].getAttribute("data-swiper-slide-index");u=e?parseInt(e,10):c}else u=c;Object.assign(t,{previousSnapIndex:s,snapIndex:l,previousRealIndex:o,realIndex:u,previousIndex:a,activeIndex:c}),t.initialized&&jp(t),t.__loopFixInProgress__||(t.emit("activeIndexChange"),t.emit("snapIndexChange"),(t.initialized||t.params.runCallbacksOnInit)&&((t.__lastEmittedRealIndex__??o)!==u&&t.emit("realIndexChange"),t.emit("slideChange")),t.__lastEmittedRealIndex__=u)},updateClickedSlide:function(e,t){const i=this,n=i.params;let r=e.closest(`.${n.slideClass}, swiper-slide`);!r&&i.isElement&&t&&t.length>1&&t.includes(e)&&[...t.slice(t.indexOf(e)+1,t.length)].forEach(e=>{!r&&e.matches&&e.matches(`.${n.slideClass}, swiper-slide`)&&(r=e)});let a,o=!1;if(r)for(let e=0;e<i.slides.length;e+=1)if(i.slides[e]===r){o=!0,a=e;break}if(!r||!o)return i.clickedSlide=void 0,void(i.clickedIndex=void 0);i.clickedSlide=r,i.virtual&&i.params.virtual?.enabled?i.clickedIndex=parseInt(r.getAttribute("data-swiper-slide-index"),10):i.clickedIndex=a,n.slideToClickedSlide&&void 0!==i.clickedIndex&&i.clickedIndex!==i.activeIndex&&i.slideToClickedSlide()}};const mu={eventsEmitter:Vp,update:hu,translate:du,transition:cu,slide:su,loop:au,grabCursor:ru,events:nu,breakpoints:qp,checkOverflow:Hp,classes:Gp},gu={};class fu{static extendedDefaults;static defaults;constructor(...e){let t,i;if(1===e.length&&null!==e[0]&&"object"==typeof e[0]&&"Object"===Object.prototype.toString.call(e[0]).slice(8,-1)?i=e[0]:[t,i]=e,i||(i={}),i=xp({},i),t&&!i.el&&(i.el=t),i.el&&"string"==typeof i.el&&"undefined"!=typeof document&&document.querySelectorAll(i.el).length>1){const e=[];return document.querySelectorAll(i.el).forEach(t=>{const n=xp({},i,{el:t});e.push(new fu(n))}),e}const n=this;n.__swiper__=!0,n.support=Lp(),n.device=Op({userAgent:i.userAgent??void 0}),n.browser=Dp(),n.eventsListeners={},n.eventsAnyListeners=[],n.modules=[...n.__modules__||[]],i.modules&&Array.isArray(i.modules)&&i.modules.forEach(e=>{const t=e;"function"==typeof t&&n.modules.indexOf(t)<0&&n.modules.push(t)});const r={};n.modules.forEach(e=>{e({params:i,swiper:n,extendParams:ou(i,r),on:n.on.bind(n),once:n.once.bind(n),off:n.off.bind(n),emit:n.emit.bind(n)})});const a=xp({},Up,r);if(n.params=xp({},a,gu,i),n.originalParams=xp({},n.params),n.passedParams=xp({},i),n.params&&n.params.on){const e=n.params.on;Object.keys(e).forEach(t=>{const i=e[t];i&&n.on(t,i)})}return n.params&&n.params.onAny&&n.onAny(n.params.onAny),Object.assign(n,{enabled:n.params.enabled,el:t,classNames:[],slides:[],slidesGrid:[],snapGrid:[],slidesSizesGrid:[],isHorizontal:()=>"horizontal"===n.params.direction,isVertical:()=>"vertical"===n.params.direction,activeIndex:0,realIndex:0,isBeginning:!0,isEnd:!1,translate:0,previousTranslate:0,progress:0,velocity:0,animating:!1,cssOverflowAdjustment(){return Math.trunc(this.translate/2**23)*2**23},allowSlideNext:n.params.allowSlideNext,allowSlidePrev:n.params.allowSlidePrev,touchEventsData:{isTouched:void 0,isMoved:void 0,allowTouchCallbacks:void 0,touchStartTime:void 0,isScrolling:void 0,currentTranslate:void 0,startTranslate:void 0,allowThresholdMove:void 0,focusableElements:n.params.focusableElements,lastClickTime:0,clickTimeout:void 0,velocities:[],allowMomentumBounce:void 0,startMoving:void 0,pointerId:null,touchId:null},allowClick:!0,allowTouchMove:n.params.allowTouchMove,touches:{startX:0,startY:0,currentX:0,currentY:0,diff:0},imagesToLoad:[],imagesLoaded:0}),n.emit("_swiper"),n.params.init&&n.init(),n}getDirectionLabel(e){return this.isHorizontal()?e:{width:"height","margin-top":"margin-left","margin-bottom ":"margin-right","margin-left":"margin-top","margin-right":"margin-bottom","padding-left":"padding-top","padding-right":"padding-bottom",marginRight:"marginBottom"}[e]}isHorizontal(){return"horizontal"===this.params.direction}isVertical(){return"vertical"===this.params.direction}cssOverflowAdjustment(){return Math.trunc(this.translate/2**23)*2**23}getSlideIndex(e){const{slidesEl:t,params:i}=this,n=Tp($p(t,`.${i.slideClass}, swiper-slide`)[0]);return Tp(e)-(n??0)}getSlideIndexByData(e){return this.getSlideIndex(this.slides.find(t=>Number(t.getAttribute("data-swiper-slide-index"))===e))}getSlideIndexWhenGrid(e){return this.grid&&this.params.grid&&this.params.grid.rows>1&&("column"===this.params.grid.fill?e=Math.floor(e/this.params.grid.rows):"row"===this.params.grid.fill&&(e%=Math.ceil(this.slides.length/this.params.grid.rows))),e}recalcSlides(){const{slidesEl:e,params:t}=this;this.slides=$p(e,`.${t.slideClass}, swiper-slide`)}enable(){this.enabled||(this.enabled=!0,this.params.grabCursor&&this.setGrabCursor(),this.emit("enable"))}disable(){this.enabled&&(this.enabled=!1,this.params.grabCursor&&this.unsetGrabCursor(),this.emit("disable"))}setProgress(e,t){e=Math.min(Math.max(e,0),1);const i=this.minTranslate(),n=(this.maxTranslate()-i)*e+i;this.translateTo(n,void 0===t?0:t),this.updateActiveIndex(),this.updateSlidesClasses()}emitContainerClasses(){if(!this.params._emitClasses||!this.el)return;const e=this.el.className.split(" ").filter(e=>0===e.indexOf("swiper")||0===e.indexOf(this.params.containerModifierClass));this.emit("_containerClasses",e.join(" "))}getSlideClasses(e){return this.destroyed?"":e.className.split(" ").filter(e=>0===e.indexOf("swiper-slide")||0===e.indexOf(this.params.slideClass)).join(" ")}emitSlidesClasses(){if(!this.params._emitClasses||!this.el)return;const e=[];this.slides.forEach(t=>{const i=this.getSlideClasses(t);e.push({slideEl:t,classNames:i}),this.emit("_slideClass",t,i)}),this.emit("_slideClasses",e)}slidesPerViewDynamic(e="current",t=!1){const{params:i,slides:n,slidesGrid:r,slidesSizesGrid:a,size:o,activeIndex:s}=this;let l=1;if("number"==typeof i.slidesPerView)return i.slidesPerView;if(!o)return l;if(i.centeredSlides){let e=n[s]?Math.ceil(n[s].swiperSlideSize??0):0,t=!1;for(let i=s+1;i<n.length;i+=1)n[i]&&!t&&(e+=Math.ceil(n[i].swiperSlideSize??0),l+=1,e>o&&(t=!0));for(let i=s-1;i>=0;i-=1)n[i]&&!t&&(e+=n[i].swiperSlideSize??0,l+=1,e>o&&(t=!0))}else if("current"===e)for(let e=s+1;e<n.length;e+=1){(t?r[e]+a[e]-r[s]<o:r[e]-r[s]<o)&&(l+=1)}else for(let e=s-1;e>=0;e-=1){r[s]-r[e]<o&&(l+=1)}return l}update(){const e=this;if(!e||e.destroyed)return;const{snapGrid:t,params:i}=e;function n(){const t=e.rtlTranslate?-1*e.translate:e.translate,i=Math.min(Math.max(t,e.maxTranslate()),e.minTranslate());e.setTranslate(i),e.updateActiveIndex(),e.updateSlidesClasses()}let r;if(i.breakpoints&&e.setBreakpoint(),i.lazyPreload&&[...e.el.querySelectorAll('[loading="lazy"]')].forEach(t=>{t.complete&&Np(e,t)}),e.updateSize(),e.updateSlides(),e.updateProgress(),e.updateSlidesClasses(),i.freeMode?.enabled&&!i.cssMode)n(),i.autoHeight&&e.updateAutoHeight();else{if(("auto"===i.slidesPerView||i.slidesPerView>1)&&e.isEnd&&!i.centeredSlides){const t=e.virtual&&i.virtual?.enabled?e.virtual.slides.length:e.slides.length;r=e.slideTo(t-1,0,!1,!0)}else r=e.slideTo(e.activeIndex,0,!1,!0);r||n()}i.watchOverflow&&t!==e.snapGrid&&e.checkOverflow(),e.emit("update")}changeDirection(e,t=!0){const i=this,n=i.params.direction;return e||(e="horizontal"===n?"vertical":"horizontal"),e===n||"horizontal"!==e&&"vertical"!==e||(i.el.classList.remove(`${i.params.containerModifierClass}${n}`),i.el.classList.add(`${i.params.containerModifierClass}${e}`),i.emitContainerClasses(),i.params.direction=e,i.rtlTranslate="horizontal"===e&&i.rtl,i.slides.forEach(t=>{"vertical"===e?t.style.width="":t.style.height=""}),i.emit("changeDirection"),t&&i.update()),i}changeLanguageDirection(e){const t=this;t.rtl&&"rtl"===e||!t.rtl&&"ltr"===e||(t.rtl="rtl"===e,t.rtlTranslate="horizontal"===t.params.direction&&t.rtl,t.rtl?(t.el.classList.add(`${t.params.containerModifierClass}rtl`),t.el.dir="rtl"):(t.el.classList.remove(`${t.params.containerModifierClass}rtl`),t.el.dir="ltr"),t.update())}mount(e){const t=this;if(t.mounted)return!0;if("undefined"==typeof document)return!1;const i=e??t.params.el;let n=null;if("string"==typeof i?n=document.querySelector(i):i instanceof HTMLElement&&(n=i),!n)return!1;n.swiper=t;const r=n.parentNode;r&&r.host&&r.host.nodeName===t.params.swiperElementNodeName.toUpperCase()&&(t.isElement=!0);const a=()=>`.${(t.params.wrapperClass||"").trim().split(" ").join(".")}`;let o=(()=>{if(n&&n.shadowRoot){return n.shadowRoot.querySelector(a())}return $p(n,a())[0]})();!o&&t.params.createElements&&(o=Sp("div",t.params.wrapperClass),n.append(o),$p(n,`.${t.params.slideClass}`).forEach(e=>{o.append(e)}));const s=t.isElement?n.parentNode.host:null;return Object.assign(t,{el:n,wrapperEl:o,slidesEl:t.isElement&&!s.slideSlots?s:o,hostEl:t.isElement?s:n,mounted:!0,rtl:"rtl"===n.dir.toLowerCase()||"rtl"===Cp(n,"direction"),rtlTranslate:"horizontal"===t.params.direction&&("rtl"===n.dir.toLowerCase()||"rtl"===Cp(n,"direction")),wrongRTL:"-webkit-box"===Cp(o,"display")}),!0}init(e){const t=this;if(t.initialized)return t;if(!1===t.mount(e))return t;if(t.emit("beforeInit"),t.params.breakpoints&&t.setBreakpoint(),t.addClasses(),t.updateSize(),t.updateSlides(),t.params.watchOverflow&&t.checkOverflow(),t.params.grabCursor&&t.enabled&&t.setGrabCursor(),t.params.loop&&t.virtual&&t.params.virtual?.enabled?t.slideTo((t.params.initialSlide??0)+(t.virtual.slidesBefore??0),0,t.params.runCallbacksOnInit,!1,!0):t.slideTo(t.params.initialSlide,0,t.params.runCallbacksOnInit,!1,!0),t.params.loop&&t.loopCreate(void 0,!0),t.attachEvents(),t.params.lazyPreload){const e=[...t.el.querySelectorAll('[loading="lazy"]')];t.isElement&&e.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),e.forEach(e=>{e.complete&&Np(t,e)})}return t.initialized=!0,jp(t),t.emit("init"),t.emit("afterInit"),t}destroy(e=!0,t=!0){const i=this,{params:n,el:r,wrapperEl:a,slides:o}=i;return void 0===i.params||i.destroyed||(i.emit("beforeDestroy"),i.initialized=!1,i.detachEvents(),n.loop&&i.loopDestroy(),t&&(i.removeClasses(),r&&"string"!=typeof r&&r.removeAttribute("style"),a&&a.removeAttribute("style"),o&&o.length&&o.forEach(e=>{e.classList.remove(n.slideVisibleClass,n.slideFullyVisibleClass,n.slideActiveClass,n.slideNextClass,n.slidePrevClass),e.removeAttribute("style"),e.removeAttribute("data-swiper-slide-index")})),i.emit("destroy"),Object.keys(i.eventsListeners).forEach(e=>{i.off(e)}),!1!==e&&(i.el&&"string"!=typeof i.el&&(i.el.swiper=null),s=i,Object.keys(s).forEach(e=>{try{s[e]=null}catch{}try{delete s[e]}catch{}})),i.destroyed=!0),null;var s}static extendDefaults(e){xp(gu,e)}static installModule(e){fu.prototype.__modules__||(fu.prototype.__modules__=[]);const t=fu.prototype.__modules__;"function"==typeof e&&t.indexOf(e)<0&&t.push(e)}static use(e){return Array.isArray(e)?(e.forEach(e=>fu.installModule(e)),fu):(fu.installModule(e),fu)}}Object.defineProperty(fu,"extendedDefaults",{get:()=>gu}),Object.defineProperty(fu,"defaults",{get:()=>Up});const bu=mu,vu=fu.prototype;function yu(e,t,i,n){const r=i??{},a=t??{};return e.params.createElements&&Object.keys(n).forEach(t=>{if(!r[t]&&!0===r.auto){let i=$p(e.el,`.${n[t]}`)[0];i||(i=Sp("div",n[t]),i.className=n[t],e.el.append(i)),r[t]=i,a[t]=i}}),r}Object.keys(bu).forEach(e=>{const t=bu[e];Object.keys(t).forEach(e=>{vu[e]=t[e]})}),fu.use([({swiper:e,on:t,emit:i})=>{let n=null,r=null;const a=()=>{e&&!e.destroyed&&e.initialized&&(i("beforeResize"),i("resize"))},o=()=>{e&&!e.destroyed&&e.initialized&&i("orientationchange")};t("init",()=>{e.params.resizeObserver&&void 0!==window.ResizeObserver?(()=>{if(!e||e.destroyed||!e.initialized)return;let t=e.width,i=e.height;n=new ResizeObserver(n=>{r=window.requestAnimationFrame(()=>{let r=t,o=i;n.forEach(({contentBoxSize:t,contentRect:i,target:n})=>{if(n&&n!==e.el)return;const a=Array.isArray(t)?t[0]:t;r=i?i.width:a.inlineSize,o=i?i.height:a.blockSize}),r===t&&o===i||(t=r,i=o,a())})}),n.observe(e.el)})():(window.addEventListener("resize",a),window.addEventListener("orientationchange",o))}),t("destroy",()=>{r&&window.cancelAnimationFrame(r),n&&n.unobserve&&e.el&&(n.unobserve(e.el),n=null),window.removeEventListener("resize",a),window.removeEventListener("orientationchange",o)})},({swiper:e,extendParams:t,on:i})=>{const n=[],r=(t,i={})=>{const r=window.MutationObserver||window.WebkitMutationObserver;if(!r)return;const a=new r(t=>{if(e.__preventObserver__)return;if(1===t.length)return void e.emit("observerUpdate",t[0]);const i=function(){e.emit("observerUpdate",t[0])};window.requestAnimationFrame?window.requestAnimationFrame(i):window.setTimeout(i,0)});a.observe(t,{attributes:void 0===i.attributes||i.attributes,childList:e.isElement||void 0===i.childList||i.childList,characterData:void 0===i.characterData||i.characterData}),n.push(a)};t({observer:!1,observeParents:!1,observeSlideChildren:!1}),i("init",()=>{if(e.params.observer){if(e.params.observeParents){const t=Mp(e.hostEl);for(let e=0;e<t.length;e+=1)r(t[e])}r(e.hostEl,{childList:e.params.observeSlideChildren}),r(e.wrapperEl,{attributes:!1})}}),i("destroy",()=>{n.forEach(e=>{e.disconnect()}),n.splice(0,n.length)})}]);const wu='<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"/></svg>',xu=({swiper:e,extendParams:t,on:i,emit:n})=>{function r(){return e.params.navigation}function a(t){let i;return t&&"string"==typeof t&&e.isElement&&(i=e.el.querySelector(t)||e.hostEl.querySelector(t),i)?i:(t&&("string"==typeof t&&(i=[...document.querySelectorAll(t)]),e.params.uniqueNavElements&&"string"==typeof t&&i&&i.length>1&&1===e.el.querySelectorAll(t).length?i=e.el.querySelector(t):i&&1===i.length&&(i=i[0])),t&&!i?t:i)}function o(t,i){const n=r();Ep(t).forEach(t=>{t&&(t.classList[i?"add":"remove"](...n.disabledClass.split(" ")),"BUTTON"===t.tagName&&(t.disabled=i),e.params.watchOverflow&&e.enabled&&t.classList[e.isLocked?"add":"remove"](n.lockClass))})}function s(){const{nextEl:t,prevEl:i}=e.navigation;if(e.params.loop)return o(i,!1),void o(t,!1);o(i,e.isBeginning&&!e.params.rewind),o(t,e.isEnd&&!e.params.rewind)}function l(t){t.preventDefault(),(!e.isBeginning||e.params.loop||e.params.rewind)&&(e.slidePrev(),n("navigationPrev"))}function c(t){t.preventDefault(),(!e.isEnd||e.params.loop||e.params.rewind)&&(e.slideNext(),n("navigationNext"))}function d(){e.params.navigation=yu(e,e.originalParams.navigation,e.params.navigation,{nextEl:"swiper-button-next",prevEl:"swiper-button-prev"});const t=r();if(!t.nextEl&&!t.prevEl)return;const i=a(t.nextEl),n=a(t.prevEl);Object.assign(e.navigation,{nextEl:i,prevEl:n});const o=Ep(i),s=Ep(n),d=(i,n)=>{if(i){if(t.addIcons&&i.matches(".swiper-button-next,.swiper-button-prev")&&!i.querySelector("svg")){const e=document.createElement("div");Pp(e,wu);const t=e.querySelector("svg");t&&i.appendChild(t),e.remove()}i.addEventListener("click","next"===n?c:l)}!e.enabled&&i&&i.classList.add(...t.lockClass.split(" "))};o.forEach(e=>d(e,"next")),s.forEach(e=>d(e,"prev"))}function p(){const t=r(),{nextEl:i,prevEl:n}=e.navigation,a=Ep(i),o=Ep(n),s=(e,i)=>{e.removeEventListener("click","next"===i?c:l),e.classList.remove(...t.disabledClass.split(" "))};a.forEach(e=>s(e,"next")),o.forEach(e=>s(e,"prev"))}t({navigation:{nextEl:null,prevEl:null,addIcons:!0,hideOnClick:!1,disabledClass:"swiper-button-disabled",hiddenClass:"swiper-button-hidden",lockClass:"swiper-button-lock",navigationDisabledClass:"swiper-navigation-disabled"}}),e.navigation={nextEl:null,prevEl:null,arrowSvg:wu},i("init",()=>{!1===r().enabled?u():(d(),s())}),i("toEdge fromEdge lock unlock",()=>{s()}),i("destroy",()=>{p()}),i("enable disable",()=>{const t=r(),{nextEl:i,prevEl:n}=e.navigation,a=Ep(i),o=Ep(n);e.enabled?s():[...a,...o].filter(e=>!!e).forEach(e=>e.classList.add(t.lockClass))}),i("click",(t,i)=>{const a=r(),{nextEl:o,prevEl:s}=e.navigation,l=Ep(o),c=Ep(s),d=i.target;let p=c.includes(d)||l.includes(d);if(e.isElement&&!p){const e=i.composedPath?i.composedPath():[];e.length&&(p=e.find(e=>l.includes(e)||c.includes(e)))}if(a.hideOnClick&&!p){if(e.pagination&&e.params.pagination&&e.params.pagination.clickable&&(e.pagination.el===d||e.pagination.el.contains(d)))return;let t;l.length?t=l[0].classList.contains(a.hiddenClass):c.length&&(t=c[0].classList.contains(a.hiddenClass)),n(!0===t?"navigationShow":"navigationHide"),[...l,...c].filter(e=>!!e).forEach(e=>e.classList.toggle(a.hiddenClass))}});const u=()=>{const t=r();e.el.classList.add(...t.navigationDisabledClass.split(" ")),p()};Object.assign(e.navigation,{enable:()=>{const t=r();e.el.classList.remove(...t.navigationDisabledClass.split(" ")),d(),s()},disable:u,update:s,init:d,destroy:p})};function _u(e=""){return`.${e.trim().replace(/([.:!+/()[\]#>~*^$|=,'"@{}\\])/g,"\\$1").replace(/ /g,".")}`}const $u=e=>{if((e=>!!e.virtual&&!!e.params.virtual?.enabled)(e))return e.virtual.slides.length;const t=e.params.grid?.rows;return e.grid&&t&&t>1?e.slides.length/Math.ceil(t):e.slides.length},ku=({swiper:e,extendParams:t,on:i,emit:n})=>{const r="swiper-pagination";let a;t({pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:e=>e,formatFractionTotal:e=>e,bulletClass:`${r}-bullet`,bulletActiveClass:`${r}-bullet-active`,modifierClass:`${r}-`,currentClass:`${r}-current`,totalClass:`${r}-total`,hiddenClass:`${r}-hidden`,progressbarFillClass:`${r}-progressbar-fill`,progressbarOppositeClass:`${r}-progressbar-opposite`,clickableClass:`${r}-clickable`,lockClass:`${r}-lock`,horizontalClass:`${r}-horizontal`,verticalClass:`${r}-vertical`,paginationDisabledClass:`${r}-disabled`}}),e.pagination={el:null,bullets:[]};let o=0;function s(){return e.params.pagination}function l(){return!s().el||!e.pagination.el||Array.isArray(e.pagination.el)&&0===e.pagination.el.length}function c(e,t){const{bulletActiveClass:i}=s();if(!e)return;let n=e[("prev"===t?"previous":"next")+"ElementSibling"];n&&(n.classList.add(`${i}-${t}`),n=n[("prev"===t?"previous":"next")+"ElementSibling"],n&&n.classList.add(`${i}-${t}-${t}`))}function d(t){const i=t.target.closest(_u(s().bulletClass));if(!i)return;t.preventDefault();const n=(Tp(i)??0)*(e.params.slidesPerGroup??1);if(e.params.loop){if(e.realIndex===n)return;const t=(r=e.realIndex,a=n,o=e.slides.length,(a%=o)===1+(r%=o)?"next":a===r-1?"previous":void 0);"next"===t?e.slideNext():"previous"===t?e.slidePrev():e.slideToLoop(n)}else e.slideTo(n);var r,a,o}function p(){const t=e.rtl,i=s();if(l())return;const r=Ep(e.pagination.el);let d,p;const u=$u(e),h=e.params.loop?Math.ceil(u/(e.params.slidesPerGroup??1)):e.snapGrid.length;if(e.params.loop?(p=e.previousRealIndex||0,d=(e.params.slidesPerGroup??1)>1?Math.floor(e.realIndex/(e.params.slidesPerGroup??1)):e.realIndex):void 0!==e.snapIndex?(d=e.snapIndex,p=e.previousSnapIndex):(p=e.previousIndex||0,d=e.activeIndex||0),"bullets"===i.type&&e.pagination.bullets&&e.pagination.bullets.length>0){const n=e.pagination.bullets;let s=0,l=0,u=0;if(i.dynamicBullets){a=Ap(n[0],e.isHorizontal()?"width":"height");const t=e.isHorizontal()?"width":"height";r.forEach(e=>{e.style[t]=(a??0)*(i.dynamicMainBullets+4)+"px"}),i.dynamicMainBullets>1&&void 0!==p&&(o+=d-(p||0),o>i.dynamicMainBullets-1?o=i.dynamicMainBullets-1:o<0&&(o=0)),s=Math.max(d-o,0),l=s+(Math.min(n.length,i.dynamicMainBullets)-1),u=(l+s)/2}if(n.forEach(e=>{const t=["","-next","-next-next","-prev","-prev-prev","-main"].map(e=>`${i.bulletActiveClass}${e}`).flatMap(e=>"string"==typeof e&&e.includes(" ")?e.split(" "):[e]);e.classList.remove(...t)}),r.length>1)n.forEach(t=>{const n=Tp(t);n===d?t.classList.add(...i.bulletActiveClass.split(" ")):e.isElement&&t.setAttribute("part","bullet"),i.dynamicBullets&&void 0!==n&&(n>=s&&n<=l&&t.classList.add(...`${i.bulletActiveClass}-main`.split(" ")),n===s&&c(t,"prev"),n===l&&c(t,"next"))});else{const t=n[d];if(t&&t.classList.add(...i.bulletActiveClass.split(" ")),e.isElement&&n.forEach((e,t)=>{e.setAttribute("part",t===d?"bullet-active":"bullet")}),i.dynamicBullets){const e=n[s],t=n[l];for(let e=s;e<=l;e+=1)n[e]&&n[e].classList.add(...`${i.bulletActiveClass}-main`.split(" "));c(e,"prev"),c(t,"next")}}if(i.dynamicBullets){const r=Math.min(n.length,i.dynamicMainBullets+4),o=((a??0)*r-(a??0))/2-u*(a??0),s=t?"right":"left",l=e.isHorizontal()?s:"top";n.forEach(e=>{e.style[l]=`${o}px`})}}r.forEach((t,r)=>{if("fraction"===i.type&&(t.querySelectorAll(_u(i.currentClass)).forEach(e=>{e.textContent=String(i.formatFractionCurrent(d+1))}),t.querySelectorAll(_u(i.totalClass)).forEach(e=>{e.textContent=String(i.formatFractionTotal(h))})),"progressbar"===i.type){let n;n=i.progressbarOpposite?e.isHorizontal()?"vertical":"horizontal":e.isHorizontal()?"horizontal":"vertical";const r=(d+1)/h;let a=1,o=1;"horizontal"===n?a=r:o=r,t.querySelectorAll(_u(i.progressbarFillClass)).forEach(t=>{t.style.transform=`translate3d(0,0,0) scaleX(${a}) scaleY(${o})`,t.style.transitionDuration=`${e.params.speed}ms`})}"custom"===i.type&&i.renderCustom?(Pp(t,i.renderCustom(e,d+1,h)),0===r&&n("paginationRender",t)):(0===r&&n("paginationRender",t),n("paginationUpdate",t)),e.params.watchOverflow&&e.enabled&&t.classList[e.isLocked?"add":"remove"](i.lockClass)})}function u(){const t=s();if(l())return;const i=$u(e),r=Ep(e.pagination.el);let a="";if("bullets"===t.type){let n=e.params.loop?Math.ceil(i/(e.params.slidesPerGroup??1)):e.snapGrid.length;e.params.freeMode&&(e=>!!e.params.freeMode?.enabled)(e)&&n>i&&(n=i);for(let i=0;i<n;i+=1)t.renderBullet?a+=t.renderBullet.call(e,i,t.bulletClass):a+=`<${t.bulletElement} ${e.isElement?'part="bullet"':""} class="${t.bulletClass}"></${t.bulletElement}>`}"fraction"===t.type&&(a=t.renderFraction?t.renderFraction.call(e,t.currentClass,t.totalClass):`<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`),"progressbar"===t.type&&(a=t.renderProgressbar?t.renderProgressbar.call(e,t.progressbarFillClass):`<span class="${t.progressbarFillClass}"></span>`),e.pagination.bullets=[],r.forEach(i=>{"custom"!==t.type&&Pp(i,a||""),"bullets"===t.type&&e.pagination.bullets.push(...Array.from(i.querySelectorAll(_u(t.bulletClass))))}),"custom"!==t.type&&n("paginationRender",r[0])}function h(){e.params.pagination=yu(e,e.originalParams.pagination,e.params.pagination,{el:"swiper-pagination"});const t=s();if(!t.el)return;let i;if("string"==typeof t.el&&e.isElement&&(i=e.el.querySelector(t.el)),i||"string"!=typeof t.el||(i=[...document.querySelectorAll(t.el)]),i||(i=t.el),!i||Array.isArray(i)&&0===i.length)return;if(e.params.uniqueNavElements&&"string"==typeof t.el&&Array.isArray(i)&&i.length>1&&(i=[...e.el.querySelectorAll(t.el)],i.length>1)){const t=i.find(t=>Mp(t,".swiper")[0]===e.el);t&&(i=t)}Array.isArray(i)&&1===i.length&&(i=i[0]),Object.assign(e.pagination,{el:i});Ep(i).forEach(i=>{"bullets"===t.type&&t.clickable&&i.classList.add(...(t.clickableClass||"").split(" ")),i.classList.add(t.modifierClass+t.type),i.classList.add(e.isHorizontal()?t.horizontalClass:t.verticalClass),"bullets"===t.type&&t.dynamicBullets&&(i.classList.add(`${t.modifierClass}${t.type}-dynamic`),o=0,t.dynamicMainBullets<1&&(t.dynamicMainBullets=1)),"progressbar"===t.type&&t.progressbarOpposite&&i.classList.add(t.progressbarOppositeClass),t.clickable&&i.addEventListener("click",d),e.enabled||i.classList.add(t.lockClass)})}function m(){const t=s();if(l())return;const i=e.pagination.el;if(i){Ep(i).forEach(i=>{i.classList.remove(t.hiddenClass),i.classList.remove(t.modifierClass+t.type),i.classList.remove(e.isHorizontal()?t.horizontalClass:t.verticalClass),t.clickable&&(i.classList.remove(...(t.clickableClass||"").split(" ")),i.removeEventListener("click",d))})}e.pagination.bullets&&e.pagination.bullets.forEach(e=>e.classList.remove(...t.bulletActiveClass.split(" ")))}i("changeDirection",()=>{if(!e.pagination||!e.pagination.el)return;const t=s();Ep(e.pagination.el).forEach(i=>{i.classList.remove(t.horizontalClass,t.verticalClass),i.classList.add(e.isHorizontal()?t.horizontalClass:t.verticalClass)})}),i("init",()=>{!1===s().enabled?g():(h(),u(),p())}),i("activeIndexChange",()=>{void 0===e.snapIndex&&p()}),i("snapIndexChange",()=>{p()}),i("snapGridLengthChange",()=>{u(),p()}),i("destroy",()=>{m()}),i("enable disable",()=>{const{el:t}=e.pagination;if(t){const i=s();Ep(t).forEach(t=>t.classList[e.enabled?"remove":"add"](i.lockClass))}}),i("lock unlock",()=>{p()}),i("click",(t,i)=>{const r=i.target,a=Ep(e.pagination.el),o=s();if(o.el&&o.hideOnClick&&a&&a.length>0&&!r.classList.contains(o.bulletClass)){if(e.navigation&&(e.navigation.nextEl&&r===e.navigation.nextEl||e.navigation.prevEl&&r===e.navigation.prevEl))return;const t=a[0].classList.contains(o.hiddenClass);n(!0===t?"paginationShow":"paginationHide"),a.forEach(e=>e.classList.toggle(o.hiddenClass))}});const g=()=>{const t=s();e.el.classList.add(t.paginationDisabledClass);const{el:i}=e.pagination;if(i){Ep(i).forEach(e=>e.classList.add(t.paginationDisabledClass))}m()};Object.assign(e.pagination,{enable:()=>{const t=s();e.el.classList.remove(t.paginationDisabledClass);const{el:i}=e.pagination;if(i){Ep(i).forEach(e=>e.classList.remove(t.paginationDisabledClass))}h(),u(),p()},disable:g,render:u,update:p,init:h,destroy:m})};function Su(){return Su.c||(Su.c=i.n(n()))}function Cu(){return Cu.c||(Cu.c=i.n(s()))}function Tu(){return Tu.c||(Tu.c=i.n(r()))}function Mu(){return Mu.c||(Mu.c=i.n(o()))}function Au(){return Au.c||(Au.c=i.n(a()))}function Eu(){return Eu.c||(Eu.c=i.n(l()))}n(),s(),r(),o(),a(),l();var Pu=i(870),zu={};zu.styleTagTransform=Eu()(),zu.setAttributes=Mu()(),zu.insert=Tu()().bind(null,"head"),zu.domAPI=Cu()(),zu.insertStyleElement=Au()();Su()()(Pu.A,zu);Pu.A&&Pu.A.locals&&Pu.A.locals;var Ru=i(506),Iu={};Iu.styleTagTransform=Eu()(),Iu.setAttributes=Mu()(),Iu.insert=Tu()().bind(null,"head"),Iu.domAPI=Cu()(),Iu.insertStyleElement=Au()();Su()()(Ru.A,Iu);Ru.A&&Ru.A.locals&&Ru.A.locals;var Lu=i(124),Ou={};Ou.styleTagTransform=Eu()(),Ou.setAttributes=Mu()(),Ou.insert=Tu()().bind(null,"head"),Ou.domAPI=Cu()(),Ou.insertStyleElement=Au()();Su()()(Lu.A,Ou);Lu.A&&Lu.A.locals&&Lu.A.locals;const{I:Du}=ye,Nu=(e,t)=>{const i=e._$AN;if(void 0===i)return!1;for(const e of i)e._$AO?.(t,!1),Nu(e,t);return!0},Fu=e=>{let t,i;do{if(void 0===(t=e._$AM))break;i=t._$AN,i.delete(e),e=t}while(0===i?.size)},ju=e=>{for(let t;t=e._$AM;e=t){let i=t._$AN;if(void 0===i)t._$AN=i=new Set;else if(i.has(e))break;i.add(e),Hu(t)}};function Bu(e){void 0!==this._$AN?(Fu(this),this._$AM=e,ju(this)):this._$AM=e}function qu(e,t=!1,i=0){const n=this._$AH,r=this._$AN;if(void 0!==r&&0!==r.size)if(t)if(Array.isArray(n))for(let e=i;e<n.length;e++)Nu(n[e],!1),Fu(n[e]);else null!=n&&(Nu(n,!1),Fu(n));else Nu(this,e)}const Hu=e=>{e.type==yc&&(e._$AP??=qu,e._$AQ??=Bu)};class Gu extends xc{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,i){super._$AT(e,t,i),ju(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(Nu(this,e),Fu(this))}setValue(e){if((e=>void 0===e.strings)(this._$Ct))this._$Ct._$AI(e,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}class Uu{}const Vu=new WeakMap,Wu=wc(class extends Gu{render(e){return ae}update(e,[t]){const i=t!==this.G;return i&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),ae}rt(e){if(void 0!==this.G)if(this.isConnected||(e=void 0),"function"==typeof this.G){const t=this.ht??globalThis;let i=Vu.get(t);void 0===i&&(i=new WeakMap,Vu.set(t,i)),void 0!==i.get(this.G)&&this.G.call(this.ht,void 0),i.set(this.G,e),void 0!==e&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return"function"==typeof this.G?Vu.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});class Ku{static render(e,t){if(t&&!xt.evaluate(e.display,t))return ne``;const i=dt.get(e.type);if(!i)return ne`<div class="mc-error">Unknown module: ${e.type}</div>`;const n=$t(e.design);return ne`
      <div class="mc-module-wrapper" style=${n}>
        ${i.renderPreview(e,t)}
      </div>
    `}static renderAll(e,t){return e.map(e=>this.render(e,t))}}const Qu=new Map;dt.register(new class extends fc{constructor(){super(...arguments),this.metadata={type:"slider-layout",name:"Slider layout",description:"Arrange child modules in a slider",category:"layout",icon:"mdi:view-carousel-outline"}}createDefault(){return{id:Gt("slider-layout"),type:"slider-layout",modules:[],pagination:!0,navigation:!0}}renderCard(e,t){const i=e,n=i.modules||[],r=new Uu,a=`swiper-${i.id}`;return setTimeout(()=>{const e=r.value;e&&!e.swiper&&new fu(e,{modules:[xu,ku],pagination:!!i.pagination&&{el:".swiper-pagination"},navigation:!!i.navigation&&{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}})}),ne`
      <div class="mc-module mc-slider">
        <div class="swiper ${a}" ${Wu(r)}>
          <div class="swiper-wrapper">
            ${n.map(e=>ne`
              <div class="swiper-slide">
                ${Ku.render(e,t)}
              </div>
            `)}
          </div>
          ${i.pagination?ne`<div class="swiper-pagination"></div>`:""}
          ${i.navigation?ne`
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          `:""}
        </div>
      </div>
    `}renderPreview(e,t){const i=e,n=i.modules||[];return ne`
      <div class="mc-module mc-slider" style="padding: 16px; border: 1px dashed #ccc; position: relative;">
        <div style="display: flex; gap: 8px; overflow: hidden;">
            ${n.length>0?n.map(e=>{const i=dt.get(e.type);return ne`
                    <div style="flex-shrink: 0; width: 100px; height: 100px; border: 1px solid #eee; display: flex; align-items: center; justify-content: center;">
                        ${i?i.renderPreview(e,t):ne`<span class="mc-error">?</span>`}
                    </div>
                  `}):ne`<span style="color:var(--mc-text-secondary);font-size:0.75rem">Empty slider</span>`}
        </div>
        ${i.navigation?ne`
            <div style="position: absolute; top: 50%; left: 8px; transform: translateY(-50%);">&#10094;</div>
            <div style="position: absolute; top: 50%; right: 8px; transform: translateY(-50%);">&#10095;</div>
        `:""}
        ${i.pagination?ne`<div style="position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); display: flex; gap: 4px;">
            ${n.map(()=>ne`<div style="width: 8px; height: 8px; border-radius: 50%; background: #ccc;"></div>`)}
        </div>`:""}
      </div>
    `}renderGeneralTab(e,t,i,n){const r=this._buildSyncContext(e,n),a=e,o=a.modules||[],s=op();return ne`
      <div class="mc-tab-content">
        ${Cs("Pagination",a.pagination,e=>i({...a,pagination:e}),"pagination",r)}
        ${Cs("Navigation",a.navigation,e=>i({...a,navigation:e}),"navigation",r)}

        <div class="mc-section">
          <div class="mc-section-header">Slides (${o.length})</div>
          ${this._renderChildModuleList(a,t,i,s,n)}
        </div>
      </div>
    `}_renderChildModuleList(e,t,i,n,r){const a=e.modules||[],o=t=>{i({...e,modules:t})};return ne`
      ${sp({ownerId:e.id,scopeId:"slides",children:a,hass:t,template:r,expandedState:Qu,moduleTypes:n,onRefresh:()=>i({...e}),onRemoveChild:e=>{o(a.filter((t,i)=>i!==e))},onUpdateChild:(e,t)=>{const i=[...a];i[e]=t,o(i)},onAddChild:e=>{const t=dt.createDefault(e);t&&o([...a,t])},addButtonLabel:"Add slide",getItemLabel:(e,t,i)=>`${i} (Slide ${t+1})`})}
    `}});dt.register(new class extends fc{constructor(){super(...arguments),this.metadata={type:"clock",name:"Clock",description:"Display current time and date",category:"advanced",icon:"mdi:clock-outline"}}getAvailableTabs(){return["general","conditions","design"]}createDefault(){return{id:Gt("clock"),type:"clock",format_12h:!1,show_seconds:!1,show_date:!0,date_format:"short"}}renderPreview(e,t){const i=e,n=new Date,r={hour:"2-digit",minute:"2-digit",hour12:i.format_12h??!1};i.show_seconds&&(r.second="2-digit");const a=n.toLocaleTimeString(void 0,r),o=i.show_date?n.toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"}):"";return ne`
      <div class="mc-module mc-clock">
        <span class="mc-clock-time">${a}</span>
        ${i.show_date?ne`<span class="mc-clock-date">${o}</span>`:ae}
      </div>
    `}renderGeneralTab(e,t,i,n){const r=this._buildSyncContext(e,n),a=e;return ne`
      <div class="mc-tab-content">
        ${Cs("12-Hour Format",a.format_12h,e=>i({...a,format_12h:e}),"format_12h",r)}
        ${Cs("Show seconds",a.show_seconds,e=>i({...a,show_seconds:e}),"show_seconds",r)}
        ${Cs("Show date",a.show_date,e=>i({...a,show_date:e}),"show_date",r)}
        ${xs("Date format",a.date_format,e=>i({...a,date_format:e}),"date_format",r)}
      </div>
    `}});dt.register(new class extends fc{constructor(){super(...arguments),this.metadata={type:"weather",name:"Weather",description:"Display weather entity information",category:"advanced",icon:"mdi:weather-partly-cloudy"}}createDefault(){return{id:Gt("weather"),type:"weather",show_temperature:!0,show_condition:!0,show_forecast:!1,forecast_days:5}}renderPreview(e,t){const i=e,n=i.entity&&t?t.states[i.entity]:void 0,r=n?.attributes.temperature,a=n?.state||"unknown",o=n?.attributes.temperature_unit||"°C",s=this._conditionIcon(a);return ne`
      <div class="mc-module mc-weather">
        <ha-icon class="mc-anim-icon" icon=${s}></ha-icon>
        <div>
          ${i.show_temperature&&void 0!==r?ne`<div class="mc-weather-temp">${r}${o}</div>`:ae}
          ${i.show_condition?ne`<div class="mc-weather-condition">${a}</div>`:ae}
        </div>
      </div>
    `}renderGeneralTab(e,t,i,n){const r=this._buildSyncContext(e,n),a=e;return ne`
      <div class="mc-tab-content">
        ${Ts("Weather entity",a.entity,e=>i({...a,entity:e}),t,void 0,"entity",r)}
        ${Rs("Attribute",a.attribute,e=>i({...a,attribute:e}),t,a.entity,"attribute",r)}
        ${Cs("Show temperature",a.show_temperature,e=>i({...a,show_temperature:e}),"show_temperature",r)}
        ${Cs("Show condition",a.show_condition,e=>i({...a,show_condition:e}),"show_condition",r)}
        ${Cs("Show forecast",a.show_forecast,e=>i({...a,show_forecast:e}),"show_forecast",r)}
        ${a.show_forecast?$s("Forecast days",a.forecast_days,e=>i({...a,forecast_days:e}),{min:1,max:7},"forecast_days",r):ae}
      </div>
    `}_conditionIcon(e){return{"clear-night":"mdi:weather-night",cloudy:"mdi:weather-cloudy",fog:"mdi:weather-fog",hail:"mdi:weather-hail",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",partlycloudy:"mdi:weather-partly-cloudy",pouring:"mdi:weather-pouring",rainy:"mdi:weather-rainy",snowy:"mdi:weather-snowy","snowy-rainy":"mdi:weather-snowy-rainy",sunny:"mdi:weather-sunny",windy:"mdi:weather-windy","windy-variant":"mdi:weather-windy-variant",exceptional:"mdi:alert-circle-outline"}[e]||"mdi:weather-partly-cloudy"}});dt.register(new class extends fc{constructor(){super(...arguments),this.metadata={type:"forecast",name:"Forecast",description:"Display weather forecast data",category:"advanced",icon:"mdi:calendar-week-outline"}}createDefault(){return{id:Gt("forecast"),type:"forecast",forecast_type:"daily",num_forecasts:5,show_temperature:!0,show_precipitation:!0,show_wind:!1}}renderPreview(e,t){const i=e,n=i.entity&&t?t.states[i.entity]:void 0,r=(n?.attributes.forecast||[]).slice(0,i.num_forecasts||5);return r.length?ne`
      <div class="mc-module mc-forecast">
        ${r.map(e=>ne`
            <div class="mc-forecast-item">
              <span class="mc-forecast-label">
                ${e.datetime?new Date(e.datetime).toLocaleDateString(void 0,{weekday:"short"}):""}
              </span>
              <ha-icon icon="mdi:weather-partly-cloudy"></ha-icon>
              ${i.show_temperature?ne`<span class="mc-forecast-temp">${e.temperature??"--"}°</span>`:ae}
              ${i.show_precipitation&&void 0!==e.precipitation?ne`<span class="mc-forecast-label">${e.precipitation}mm</span>`:ae}
            </div>
          `)}
      </div>
    `:ne`
        <div class="mc-module mc-forecast">
          ${Array.from({length:i.num_forecasts||5}).map((e,t)=>ne`
              <div class="mc-forecast-item">
                <span class="mc-forecast-label">Day ${t+1}</span>
                <ha-icon icon="mdi:weather-partly-cloudy"></ha-icon>
                <span class="mc-forecast-temp">--°</span>
              </div>
            `)}
        </div>
      `}renderGeneralTab(e,t,i,n){const r=this._buildSyncContext(e,n),a=e;return ne`
      <div class="mc-tab-content">
        ${Ts("Weather entity",a.entity,e=>i({...a,entity:e}),t,void 0,"entity",r)}
        ${Rs("Attribute",a.attribute,e=>i({...a,attribute:e}),t,a.entity,"attribute",r)}
        ${ks("Forecast type",a.forecast_type,[{label:"Daily",value:"daily"},{label:"Hourly",value:"hourly"}],e=>i({...a,forecast_type:e}),"forecast_type",r)}
        ${$s("Number of forecasts",a.num_forecasts,e=>i({...a,num_forecasts:e}),{min:1,max:10},"num_forecasts",r)}
        ${Cs("Show temperature",a.show_temperature,e=>i({...a,show_temperature:e}),"show_temperature",r)}
        ${Cs("Show precipitation",a.show_precipitation,e=>i({...a,show_precipitation:e}),"show_precipitation",r)}
        ${Cs("Show wind",a.show_wind,e=>i({...a,show_wind:e}),"show_wind",r)}
      </div>
    `}});dt.register(new class extends fc{constructor(){super(...arguments),this.metadata={type:"video-bg",name:"Video background",description:"Display a video as a background",category:"advanced",icon:"mdi:video-outline"}}getAvailableTabs(){return["general","conditions","design"]}createDefault(){return{id:Gt("video-bg"),type:"video-bg",autoplay:!0,loop:!0,muted:!0}}renderPreview(e,t){const i=e;return i.url?ne`
      <div class="mc-module mc-video-bg">
        <video
          src=${i.url}
          poster=${i.poster||ae}
          ?autoplay=${i.autoplay}
          ?loop=${i.loop}
          ?muted=${i.muted}
          playsinline
        ></video>
      </div>
    `:ne`
        <div class="mc-module mc-video-bg mc-video-bg-placeholder">
          <ha-icon icon="mdi:video-off-outline"></ha-icon>
        </div>
      `}renderGeneralTab(e,t,i,n){const r=this._buildSyncContext(e,n),a=e;return ne`
      <div class="mc-tab-content">
        ${zs("Video URL",a.url,e=>i({...a,url:e}),t,"video","url",r)}
        ${zs("Poster image URL",a.poster,e=>i({...a,poster:e}),t,"image","poster",r)}
        ${Cs("Autoplay",a.autoplay,e=>i({...a,autoplay:e}),"autoplay",r)}
        ${Cs("Loop",a.loop,e=>i({...a,loop:e}),"loop",r)}
        ${Cs("Muted",a.muted,e=>i({...a,muted:e}),"muted",r)}
      </div>
    `}});class Yu{constructor(e){this.G=e}disconnect(){this.G=void 0}reconnect(e){this.G=e}deref(){return this.G}}class Xu{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??=new Promise(e=>this.Z=e)}resume(){this.Z?.(),this.Y=this.Z=void 0}}const Zu=e=>!(e=>null===e||"object"!=typeof e&&"function"!=typeof e)(e)&&"function"==typeof e.then,Ju=1073741823;const eh=wc(class extends Gu{constructor(){super(...arguments),this._$Cwt=Ju,this._$Cbt=[],this._$CK=new Yu(this),this._$CX=new Xu}render(...e){return e.find(e=>!Zu(e))??re}update(e,t){const i=this._$Cbt;let n=i.length;this._$Cbt=t;const r=this._$CK,a=this._$CX;this.isConnected||this.disconnected();for(let e=0;e<t.length&&!(e>this._$Cwt);e++){const o=t[e];if(!Zu(o))return this._$Cwt=e,o;e<n&&o===i[e]||(this._$Cwt=Ju,n=0,Promise.resolve(o).then(async e=>{for(;a.get();)await a.get();const t=r.deref();if(void 0!==t){const i=t._$Cbt.indexOf(o);i>-1&&i<t._$Cwt&&(t._$Cwt=i,t.setValue(e))}}))}return re}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}});var th=function(e,t,i,n){var r,a=arguments.length,o=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(a<3?r(o):a>3?r(t,i,o):r(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o};let ih=null,nh=null;async function rh(){return ih||(nh||(nh=window.loadCardHelpers()),ih=await nh,ih)}let ah=class extends _e{constructor(){super(...arguments),this._loading=!1}updated(e){if(e.has("cardType")&&this.cardType!==this._currentCardType)this._createElement();else{if(e.has("cardConfig")&&this._element){const e=JSON.stringify(this.cardConfig);if(e!==this._configHash){this._configHash=e;try{this._element.setConfig({type:this.cardType,...this.cardConfig||{}})}catch{}}}this._element&&this.hass&&(this._element.hass=this.hass)}}async _createElement(){if(this._loading)return;const e=this.renderRoot.querySelector(".mc-embedded-container");if(e){if(!this.cardType)return this._element=void 0,this._currentCardType=void 0,void(e.innerHTML="");this._loading=!0,this._currentCardType=this.cardType;try{const t=await rh(),i={type:this.cardType,...this.cardConfig||{}},n=t.createCardElement(i);this.hass&&(n.hass=this.hass),this._configHash=JSON.stringify(this.cardConfig),this._element=n,e.innerHTML="",e.appendChild(n)}catch(t){e.innerHTML="";const i=document.createElement("div");i.className="mc-embedded-error",i.textContent=`Failed to load "${this.cardType}": ${String(t)}`,e.appendChild(i)}finally{this._loading=!1}}}firstUpdated(){this.cardType&&this._createElement()}render(){return ne`<div class="mc-embedded-container">
      ${!this._element&&this.cardType?ne`<div class="mc-embedded-loading">Loading card...</div>`:ae}
    </div>`}};ah.styles=v`
    :host { display: block; }
    .mc-embedded-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 60px;
      color: var(--secondary-text-color, #6b7280);
      font-size: 0.875rem;
    }
    .mc-embedded-error {
      color: var(--error-color, #ef4444);
      padding: 8px;
      font-size: 0.875rem;
    }
  `,th([Te({attribute:!1})],ah.prototype,"hass",void 0),th([Te({type:String,attribute:"card-type"})],ah.prototype,"cardType",void 0),th([Te({attribute:!1})],ah.prototype,"cardConfig",void 0),ah=th([ke("mc-embedded-card")],ah);dt.register(new class extends fc{constructor(){super(...arguments),this.metadata={type:"custom-card",name:"Custom card",description:"Embed any 3rd party Lovelace card",category:"advanced",icon:"mdi:card-plus-outline"},this._editorCache=new Map}getAvailableTabs(){return["general","conditions","design"]}createDefault(){return{id:Gt("custom-card"),type:"custom-card",name:"",card_type:"",card_config:{}}}renderPreview(e,t){const i=e;return i.card_type?ne`
      <div class="mc-module mc-custom-card">
        <mc-embedded-card
          card-type=${i.card_type}
          .cardConfig=${i.card_config||{}}
          .hass=${t}
        ></mc-embedded-card>
      </div>
    `:ne`
        <div class="mc-module mc-custom-card mc-custom-card-placeholder">
          <ha-icon icon="mdi:card-plus-outline"></ha-icon>
          <span>No card type set</span>
        </div>
      `}async _getOrCreateEditor(e,t,i){const n=e.card_type;if(!n)return null;const r=this._editorCache.get(e.id);if(r&&r.cardType===n)return r.editor;try{const r=await rh(),a={type:n,...e.card_config||{}},o=r.createCardElement(a),s=o.localName;await Promise.race([customElements.whenDefined(s),new Promise((e,t)=>setTimeout(()=>t(new Error(`Timeout waiting for ${s}`)),5e3))]);const l=o.constructor;if("function"!=typeof l.getConfigElement)return this._editorCache.set(e.id,{editor:null,cardType:n,attempted:!0}),null;const c=await l.getConfigElement();c.localName?.includes("-")&&await Promise.race([customElements.whenDefined(c.localName),new Promise((e,t)=>setTimeout(()=>t(new Error(`Timeout waiting for ${c.localName}`)),5e3))]),t&&(c.hass=t);try{c.setConfig(a)}catch{}return c.addEventListener("config-changed",t=>{const n=t.detail?.config;if(n){const{type:t,...r}=n;i({...e,card_config:r,card_config_yaml:void 0})}}),this._editorCache.set(e.id,{editor:c,cardType:n,attempted:!0}),c}catch{return this._editorCache.set(e.id,{editor:null,cardType:n,attempted:!0}),null}}renderGeneralTab(e,t,i,n){const r=this._buildSyncContext(e,n),a=e;return ne`
      <div class="mc-tab-content">
        ${xs("Name",a.name,e=>i({...a,name:e}),"name",r)}
        ${vs("An optional label to help you identify this card in the editor.","mc-field-hint-tight")}
        ${function(e,t,i,n,r){return ne`
    <div class="mc-field">
      ${bs(e,n,r)}
      <mc-card-picker
        .value=${t||""}
        @value-changed=${e=>i(e.detail.value)}
      ></mc-card-picker>
    </div>
  `}("Card type",a.card_type,e=>{this._editorCache.delete(a.id),i({...a,card_type:e})})}
        ${a.card_type?ne`
            <div class="mc-card-editor-section">
              <div class="mc-card-editor-header">
                <ha-icon class="mc-card-editor-icon" icon="mdi:cog"></ha-icon>
                Card configuration
              </div>
              <div class="mc-card-editor-body">
                ${eh(this._renderEditorContent(a,t,i),ne`<div class="mc-editor-loading">Loading editor...</div>`)}
              </div>
            </div>
          `:ae}
      </div>
    `}async _renderEditorContent(e,t,i){const n=await this._getOrCreateEditor(e,t,i);if(n)return t&&(n.hass=t),ne`${n}`;const r=e.card_config_yaml??(e.card_config?Oo(e.card_config):""),a=Do(r);return ne`
      <div class="mc-yaml-fallback">
        <div class="mc-yaml-fallback-note">
          No visual editor available for this card type. Configure using YAML:
        </div>
        <textarea
          .value=${r}
          @input=${t=>{const n=t.target.value,r=Do(n);i(null!==r?{...e,card_config:r,card_config_yaml:n}:{...e,card_config_yaml:n})}}
          rows="12"
          placeholder="entity: sensor.temperature
name: My Sensor
show_state: true"
        ></textarea>
        ${""===r||null!==a?ae:ne`<div class="mc-yaml-fallback-error">
              Invalid YAML - card will use last valid configuration
            </div>`}
        <div class="mc-yaml-fallback-help">
          The <code>type</code> key is set automatically from Card Type. Do not include it here.
        </div>
      </div>
    `}validate(e){const t=[];return e.card_type||t.push("Card type is required"),t}}),window.customCards=window.customCards||[],window.customCards.push({type:c,name:"Magic Card",description:"A fully open-source multi-module card with advanced editor",preview:!0,documentationURL:"https://github.com/therealmcsparrow/magic-card"}),console.info("%c MAGIC-CARD %c v0.0.17-beta ","color: white; background: #6366f1; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;","color: #6366f1; background: #e0e7ff; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0;")})();