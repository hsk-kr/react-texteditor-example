!function(){"use strict";var e,t,n,r,o,u,i,a,c,f,d,l,s={},p={};function b(e){var t=p[e];if(void 0!==t)return t.exports;var n=p[e]={id:e,loaded:!1,exports:{}},r=!0;try{s[e].call(n.exports,n,n.exports,b),r=!1}finally{r&&delete p[e]}return n.loaded=!0,n.exports}b.m=s,b.amdO={},e=[],b.O=function(t,n,r,o){if(n){o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[n,r,o];return}for(var i=1/0,u=0;u<e.length;u++){for(var n=e[u][0],r=e[u][1],o=e[u][2],a=!0,c=0;c<n.length;c++)i>=o&&Object.keys(b.O).every(function(e){return b.O[e](n[c])})?n.splice(c--,1):(a=!1,o<i&&(i=o));if(a){e.splice(u--,1);var f=r();void 0!==f&&(t=f)}}return t},b.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return b.d(t,{a:t}),t},n=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__},b.t=function(e,r){if(1&r&&(e=this(e)),8&r||"object"==typeof e&&e&&(4&r&&e.__esModule||16&r&&"function"==typeof e.then))return e;var o=Object.create(null);b.r(o);var u={};t=t||[null,n({}),n([]),n(n)];for(var i=2&r&&e;"object"==typeof i&&!~t.indexOf(i);i=n(i))Object.getOwnPropertyNames(i).forEach(function(t){u[t]=function(){return e[t]}});return u.default=function(){return e},b.d(o,u),o},b.d=function(e,t){for(var n in t)b.o(t,n)&&!b.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},b.f={},b.e=function(e){return Promise.all(Object.keys(b.f).reduce(function(t,n){return b.f[n](e,t),t},[]))},b.u=function(e){return"static/chunks/"+(({432:"ef956ed8",458:"0efca16a",664:"6d53c606"})[e]||e)+"."+({432:"b5cad519ea56e6a4",458:"e1d8fbe7515e4528",664:"c78d3c0599380fdf",736:"56f9c9cef489ccea",738:"dd837ce5c69af3bb",885:"8b628797aebac495",934:"efeef3ad0ef84bb6",974:"0a7d61820432e271"})[e]+".js"},b.miniCssF=function(e){return"static/css/"+({185:"2a5d6a05dbea883e",738:"86da14c69a079a4b",885:"d16919c2c75a7eea"})[e]+".css"},b.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||Function("return this")()}catch(e){if("object"==typeof window)return window}}(),b.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r={},o="_N_E:",b.l=function(e,t,n,u){if(r[e]){r[e].push(t);return}if(void 0!==n)for(var i,a,c=document.getElementsByTagName("script"),f=0;f<c.length;f++){var d=c[f];if(d.getAttribute("src")==e||d.getAttribute("data-webpack")==o+n){i=d;break}}i||(a=!0,(i=document.createElement("script")).charset="utf-8",i.timeout=120,b.nc&&i.setAttribute("nonce",b.nc),i.setAttribute("data-webpack",o+n),i.src=b.tu(e)),r[e]=[t];var l=function(t,n){i.onerror=i.onload=null,clearTimeout(s);var o=r[e];if(delete r[e],i.parentNode&&i.parentNode.removeChild(i),o&&o.forEach(function(e){return e(n)}),t)return t(n)},s=setTimeout(l.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=l.bind(null,i.onerror),i.onload=l.bind(null,i.onload),a&&document.head.appendChild(i)},b.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},b.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e},b.tt=function(){return void 0===u&&(u={createScriptURL:function(e){return e}},"undefined"!=typeof trustedTypes&&trustedTypes.createPolicy&&(u=trustedTypes.createPolicy("nextjs#bundler",u))),u},b.tu=function(e){return b.tt().createScriptURL(e)},b.p="/react-texteditor-example/_next/",i=function(e,t,n,r){var o=document.createElement("link");return o.rel="stylesheet",o.type="text/css",o.onerror=o.onload=function(u){if(o.onerror=o.onload=null,"load"===u.type)n();else{var i=u&&("load"===u.type?"missing":u.type),a=u&&u.target&&u.target.href||t,c=Error("Loading CSS chunk "+e+" failed.\n("+a+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=i,c.request=a,o.parentNode.removeChild(o),r(c)}},o.href=t,document.head.appendChild(o),o},a=function(e,t){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var o=n[r],u=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(u===e||u===t))return o}for(var i=document.getElementsByTagName("style"),r=0;r<i.length;r++){var o=i[r],u=o.getAttribute("data-href");if(u===e||u===t)return o}},c={272:0},b.f.miniCss=function(e,t){c[e]?t.push(c[e]):0!==c[e]&&({738:1,885:1})[e]&&t.push(c[e]=new Promise(function(t,n){var r=b.miniCssF(e),o=b.p+r;if(a(r,o))return t();i(e,o,t,n)}).then(function(){c[e]=0},function(t){throw delete c[e],t}))},f={272:0},b.f.j=function(e,t){var n=b.o(f,e)?f[e]:void 0;if(0!==n){if(n)t.push(n[2]);else if(272!=e){var r=new Promise(function(t,r){n=f[e]=[t,r]});t.push(n[2]=r);var o=b.p+b.u(e),u=Error();b.l(o,function(t){if(b.o(f,e)&&(0!==(n=f[e])&&(f[e]=void 0),n)){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;u.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",u.name="ChunkLoadError",u.type=r,u.request=o,n[1](u)}},"chunk-"+e,e)}else f[e]=0}},b.O.j=function(e){return 0===f[e]},d=function(e,t){var n,r,o=t[0],u=t[1],i=t[2],a=0;if(o.some(function(e){return 0!==f[e]})){for(n in u)b.o(u,n)&&(b.m[n]=u[n]);if(i)var c=i(b)}for(e&&e(t);a<o.length;a++)r=o[a],b.o(f,r)&&f[r]&&f[r][0](),f[r]=0;return b.O(c)},(l=self.webpackChunk_N_E=self.webpackChunk_N_E||[]).forEach(d.bind(null,0)),l.push=d.bind(null,l.push.bind(l))}();