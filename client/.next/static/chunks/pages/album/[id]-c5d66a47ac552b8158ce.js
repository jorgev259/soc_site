(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[847],{8817:function(e,t,r){var n,s=(n=r(7673))&&"object"==typeof n&&"default"in n?n.default:n,a=/https?|ftp|gopher|file/;function o(e){"string"==typeof e&&(e=g(e));var t=function(e,t,r){var n=e.auth,s=e.hostname,a=e.protocol||"",o=e.pathname||"",c=e.hash||"",l=e.query||"",i=!1;n=n?encodeURIComponent(n).replace(/%3A/i,":")+"@":"",e.host?i=n+e.host:s&&(i=n+(~s.indexOf(":")?"["+s+"]":s),e.port&&(i+=":"+e.port)),l&&"object"==typeof l&&(l=t.encode(l));var h=e.search||l&&"?"+l||"";return a&&":"!==a.substr(-1)&&(a+=":"),e.slashes||(!a||r.test(a))&&!1!==i?(i="//"+(i||""),o&&"/"!==o[0]&&(o="/"+o)):i||(i=""),c&&"#"!==c[0]&&(c="#"+c),h&&"?"!==h[0]&&(h="?"+h),{protocol:a,host:i,pathname:o=o.replace(/[?#]/g,encodeURIComponent),search:h=h.replace("#","%23"),hash:c}}(e,s,a);return""+t.protocol+t.host+t.pathname+t.search+t.hash}var c="http://",l="w.w",i=c+l,h=/^([a-z0-9.+-]*:\/\/\/)([a-z0-9.+-]:\/*)?/i,d=/https?|ftp|gopher|file/;function p(e,t){var r="string"==typeof e?g(e):e;e="object"==typeof e?o(e):e;var n=g(t),s="";r.protocol&&!r.slashes&&(s=r.protocol,e=e.replace(r.protocol,""),s+="/"===t[0]||"/"===e[0]?"/":""),s&&n.protocol&&(s="",n.slashes||(s=n.protocol,t=t.replace(n.protocol,"")));var a=e.match(h);a&&!n.protocol&&(e=e.substr((s=a[1]+(a[2]||"")).length),/^\/\/[^/]/.test(t)&&(s=s.slice(0,-1)));var l=new URL(e,i+"/"),p=new URL(t,l).toString().replace(i,""),u=n.protocol||r.protocol;return u+=r.slashes||n.slashes?"//":"",!s&&u?p=p.replace(c,u):s&&(p=p.replace(c,"")),d.test(p)||~t.indexOf(".")||"/"===e.slice(-1)||"/"===t.slice(-1)||"/"!==p.slice(-1)||(p=p.slice(0,-1)),s&&(p=s+("/"===p[0]?p.substr(1):p)),p}function u(){}u.prototype.parse=g,u.prototype.format=o,u.prototype.resolve=p,u.prototype.resolveObject=p;var m=/^https?|ftp|gopher|file/,x=/^(.*?)([#?].*)/,f=/^([a-z0-9.+-]*:)(\/{0,3})(.*)/i,j=/^([a-z0-9.+-]*:)?\/\/\/*/i,b=/^([a-z0-9.+-]*:)(\/{0,2})\[(.*)\]$/i;function g(e,t,r){if(void 0===t&&(t=!1),void 0===r&&(r=!1),e&&"object"==typeof e&&e instanceof u)return e;var n=(e=e.trim()).match(x);e=n?n[1].replace(/\\/g,"/")+n[2]:e.replace(/\\/g,"/"),b.test(e)&&"/"!==e.slice(-1)&&(e+="/");var a=!/(^javascript)/.test(e)&&e.match(f),c=j.test(e),h="";a&&(m.test(a[1])||(h=a[1].toLowerCase(),e=""+a[2]+a[3]),a[2]||(c=!1,m.test(a[1])?(h=a[1],e=""+a[3]):e="//"+a[3]),3!==a[2].length&&1!==a[2].length||(h=a[1],e="/"+a[3]));var d,p=(n?n[1]:e).match(/^https?:\/\/[^/]+(:[0-9]+)(?=\/|$)/),g=p&&p[1],v=new u,y="",w="";try{d=new URL(e)}catch(s){y=s,h||r||!/^\/\//.test(e)||/^\/\/.+[@.]/.test(e)||(w="/",e=e.substr(1));try{d=new URL(e,i)}catch(e){return v.protocol=h,v.href=h,v}}v.slashes=c&&!w,v.host=d.host===l?"":d.host,v.hostname=d.hostname===l?"":d.hostname.replace(/(\[|\])/g,""),v.protocol=y?h||null:d.protocol,v.search=d.search.replace(/\\/g,"%5C"),v.hash=d.hash.replace(/\\/g,"%5C");var N=e.split("#");!v.search&&~N[0].indexOf("?")&&(v.search="?"),v.hash||""!==N[1]||(v.hash="#"),v.query=t?s.decode(d.search.substr(1)):v.search.substr(1),v.pathname=w+(a?function(e){return e.replace(/['^|`]/g,(function(e){return"%"+e.charCodeAt().toString(16).toUpperCase()})).replace(/((?:%[0-9A-F]{2})+)/g,(function(e,t){try{return decodeURIComponent(t).split("").map((function(e){var t=e.charCodeAt();return t>256||/^[a-z0-9]$/i.test(e)?e:"%"+t.toString(16).toUpperCase()})).join("")}catch(e){return t}}))}(d.pathname):d.pathname),"about:"===v.protocol&&"blank"===v.pathname&&(v.protocol="",v.pathname=""),y&&"/"!==e[0]&&(v.pathname=v.pathname.substr(1)),h&&!m.test(h)&&"/"!==e.slice(-1)&&"/"===v.pathname&&(v.pathname=""),v.path=v.pathname+v.search,v.auth=[d.username,d.password].map(decodeURIComponent).filter(Boolean).join(":"),v.port=d.port,g&&!v.host.endsWith(g)&&(v.host+=g,v.port=g.slice(1)),v.href=w?""+v.pathname+v.search+v.hash:o(v);var _=/^(file)/.test(v.href)?["host","hostname"]:[];return Object.keys(v).forEach((function(e){~_.indexOf(e)||(v[e]=v[e]||null)})),v}t.parse=g,t.format=o,t.resolve=p,t.resolveObject=function(e,t){return g(p(e,t))},t.Url=u},6184:function(e,t,r){"use strict";r.d(t,{X:function(){return f}});var n=r(2809),s=r(1555),a=r(4184),o=r.n(a),c=r(5675),l=r(1664),i=r(2598),h=r(3554),d=r.n(h),p=r(5893);function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function m(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function x(e){var t=e.id,r=e.title,s=e.type,a=void 0===s?"album":s,h=e.coming,u=void 0!==h&&h;return(0,p.jsx)(l.default,{href:"/".concat(a,"/").concat(t),passHref:!0,children:(0,p.jsxs)("div",{className:o()(d().albumBox,(0,n.Z)({},d().coming,u)),children:[(0,p.jsx)("div",{className:d().img,children:(0,p.jsx)(c.default,{alt:r,src:(0,i.J)(t,a),layout:"responsive",width:300,height:300})}),(0,p.jsx)("div",{className:"text-wrap text-center px-1 py-2",children:u?"Coming Soon":r})]})})}function f(e){var t=e.xs,r=e.md;return e.items.map((function(e){return(0,p.jsx)(s.Z,{xs:t,md:r,className:"px-1 mb-3",children:(0,p.jsx)(x,m({},e))},e.id)}))}},2598:function(e,t,r){"use strict";r.d(t,{J:function(){return n}});var n=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"album";return"https://beta.sittingonclouds.net/live/".concat(t,"/").concat(e,".png")}},6751:function(e,t,r){"use strict";r.r(t),r.d(t,{__N_SSP:function(){return b},default:function(){return g}});var n=r(4051),s=r(1555),a=r(5005),o=r(7294),c=r(5675),l=r(4184),i=r.n(l),h=r(9008),d=r(8817),p=r(3893),u=r.n(p),m=r(6184),x=r(2598),f=r(5893),j=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:75,r=arguments.length>2?arguments[2]:void 0,n="/_next/image?url=".concat((0,x.J)(e),"&w=3840&q=").concat(t);return r?d.format({protocol:r.protocol||"http",host:r.headers.host,pathname:n}):n},b=!0;function g(e){var t=e.Album,r=e.imageUrl;return(0,f.jsxs)(n.Z,{children:[(0,f.jsxs)(h.default,{children:[(0,f.jsx)("title",{children:t.title}),(0,f.jsx)("meta",{property:"og:url",content:"/album/".concat(t.id)},"url"),(0,f.jsx)("meta",{property:"og:title",content:t.title},"title"),(0,f.jsx)("meta",{property:"og:description",content:t.subTitle||t.artists.map((function(e){return e.name})).join(" - ")},"desc"),(0,f.jsx)("meta",{property:"og:image",content:r},"image")]}),(0,f.jsxs)(s.Z,{className:i()(u().content,"px-5 pt-3"),style:{backgroundImage:'url("'.concat(j(t.id,100),'"), linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8))')},children:[(0,f.jsxs)(n.Z,{children:[(0,f.jsx)(s.Z,{lg:5,children:(0,f.jsx)(c.default,{layout:"responsive",width:300,height:300,alt:t.title,src:(0,x.J)(t.id)})}),(0,f.jsxs)(s.Z,{lg:7,className:"blackblock",children:[(0,f.jsx)("h1",{className:i()("text-center",u().title),children:t.title}),(0,f.jsx)("h6",{className:"text-center",children:t.subTitle}),(0,f.jsx)("table",{className:u().table,children:(0,f.jsxs)("tbody",{children:[(0,f.jsxs)("tr",{children:[(0,f.jsx)("th",{className:"width-row",children:"Release Date"}),(0,f.jsx)("td",{children:new Date(t.releaseDate).toLocaleString(void 0,{day:"numeric",month:"short",year:"numeric"})})]}),t.artists.length>0&&(0,f.jsxs)("tr",{children:[(0,f.jsx)("th",{children:"Artists"}),(0,f.jsx)("td",{children:t.artists.map((function(e){e.id;return e.name})).join(", ")})]}),(0,f.jsxs)("tr",{children:[(0,f.jsx)("th",{children:"Classification"}),(0,f.jsx)("td",{children:[t.classes.map((function(e){var t=e.name;return"".concat(t," Soundtrack")})).join(" & "),t.categories.map((function(e){return e.name})).join(", ")].filter((function(e){return""!==e})).join(" - ")})]}),t.label&&(0,f.jsxs)("tr",{children:[(0,f.jsx)("th",{children:"Published by"}),(0,f.jsx)("td",{children:(0,f.jsx)("a",{className:"btn btn-link p-0",href:"/publisher/".concat(t.label),children:t.label})})]}),t.platforms.length>0&&(0,f.jsxs)("tr",{children:[(0,f.jsx)("th",{children:"Platforms"}),(0,f.jsx)("td",{children:t.platforms.map((function(e,r){var n=e.id,s=e.name;return(0,f.jsxs)(o.Fragment,{children:[(0,f.jsx)("a",{className:"btn btn-link p-0",href:"/platform/".concat(n),children:s}),r!==t.platforms.length-1&&", "]},n)}))})]}),t.games.length>0&&(0,f.jsxs)("tr",{children:[(0,f.jsx)("th",{children:"Games"}),(0,f.jsx)("td",{children:t.games.map((function(e,r){var n=e.slug,s=e.name;return(0,f.jsxs)(o.Fragment,{children:[(0,f.jsx)("a",{className:"btn btn-link p-0",href:"/game/".concat(n),children:s}),r!==t.games.length-1&&", "]},n)}))})]}),t.animations.length>0&&(0,f.jsxs)("tr",{children:[(0,f.jsx)("th",{children:"Animations"}),(0,f.jsx)("td",{children:t.animations.map((function(e,r){var n=e.id,s=e.title;return(0,f.jsxs)(o.Fragment,{children:[(0,f.jsx)("a",{className:"btn btn-link p-0",href:"/anim/".concat(n),children:s}),r!==t.animations.length-1&&", "]},n)}))})]})]})}),(0,f.jsx)("h6",{className:"text-center",children:t.description})]})]}),(0,f.jsx)("hr",{}),(0,f.jsxs)(n.Z,{children:[(0,f.jsx)(v,{discs:t.discs}),(0,f.jsxs)(s.Z,{lg:6,className:"blackblock px-10px",children:[t.vgmdb&&(0,f.jsx)(n.Z,{children:(0,f.jsxs)(s.Z,{className:"mb-2 ml-2",children:[(0,f.jsx)("span",{children:"Check album at:"}),(0,f.jsx)("a",{className:"ms-2",target:"_blank",rel:"noopener noreferrer",href:t.vgmdb,children:(0,f.jsx)(c.default,{width:100,height:30,alt:"VGMdb",src:"/img/assets/vgmdblogo.png"})})]})}),t.stores.length>0&&(0,f.jsx)(n.Z,{className:"mt-2 px-3",children:(0,f.jsxs)(s.Z,{className:u().stores,style:{paddingLeft:"15px",paddingTop:"10px",paddingRight:"15px",paddingBottom:"10px"},children:[(0,f.jsx)("h1",{className:"text-center homeTitle",style:{fontSize:"40px"},children:"Buy The Original Soundtrack to support the artists"}),(0,f.jsx)("hr",{className:"style-white w-100 mt-0"}),(0,f.jsx)(n.Z,{children:t.stores.map((function(e,t){var r=e.url,n=e.provider;return(0,f.jsx)(s.Z,{md:6,className:"d-flex justify-content-center",children:(0,f.jsx)("a",{target:"_blank",rel:"noopener noreferrer",href:r,children:(0,f.jsx)(c.default,{width:190,height:65,alt:n,src:"/img/provider/".concat(n,".jpg")})})},t)}))})]})}),(0,f.jsx)("hr",{className:"style-white w-100"}),t.downloads.length>0&&t.downloads.map((function(e,t){var r=e.links,c=e.title;e.provider;return(0,f.jsx)(n.Z,{children:(0,f.jsxs)(s.Z,{children:[(0,f.jsx)(n.Z,{children:(0,f.jsx)(s.Z,{md:12,children:(0,f.jsx)("h2",{className:"text-center download-txt mb-0",children:c})})}),r.map((function(e,t){var r=e.url,c=(e.custom,e.directUrl,e.provider);return(0,f.jsxs)(o.Fragment,{children:[(0,f.jsx)(n.Z,{className:"mt-2",children:(0,f.jsx)(s.Z,{md:12,children:(0,f.jsx)("h5",{className:"text-center",children:c})})}),(0,f.jsx)(n.Z,{className:"mx-auto mb-3",children:(0,f.jsx)(s.Z,{className:"py-2",children:(0,f.jsx)(a.Z,{variant:"secondary",className:u().download,href:r,children:"Download"})})})]},t)})),(0,f.jsx)("hr",{className:"style-white w-100"})]})},t)}))]})]}),t.related.length>0&&(0,f.jsxs)(n.Z,{children:[(0,f.jsx)(s.Z,{children:(0,f.jsx)("div",{className:"blackblock w-100 m-3",children:(0,f.jsx)("h1",{className:"text-center ost-title",children:"RELATED SOUNDTRACKS"})})}),(0,f.jsx)(n.Z,{className:"links-list justify-content-center",children:(0,f.jsx)(m.X,{md:3,xs:6,items:t.related})})]})]})]})}function v(e){var t=e.discs,r=(0,o.useState)(0),a=r[0],c=r[1];return(0,f.jsx)(s.Z,{lg:6,children:(0,f.jsxs)("div",{className:"blackblock d-inline-block w-100",children:[(0,f.jsx)(n.Z,{children:(0,f.jsx)(s.Z,{children:(0,f.jsx)("h1",{className:i()("text-center",u().title),children:"TRACKLIST"})})}),t.length>1&&(0,f.jsx)(n.Z,{style:{transform:"translateY(2px)"},children:t.map((function(e,r){var n=e.number;return(0,f.jsx)(s.Z,{className:i()("text-center",{"ps-0":r>0,"pe-0":r<t.length-1}),children:(0,f.jsxs)("div",{onClick:function(){return c(n)},className:"py-2",style:{cursor:a===n?"":"pointer",borderStyle:"solid",borderWidth:"2px 2px 2px 2px",borderColor:"#efefef",borderRightStyle:t.length-1===r?"solid":"hidden",borderBottomWidth:a===n?"0px":"2px"},children:["Disc ",n+1]})},n)}))}),(0,f.jsx)(n.Z,{children:(0,f.jsx)(s.Z,{children:(0,f.jsx)("div",{style:{padding:"5px 5px 5px 5px",borderStyle:"solid",borderWidth:"2px 2px 2px 2px",borderColor:"#efefef",borderTopWidth:t.length>1?"0px":"2px"},children:(0,f.jsx)("table",{cellSpacing:"0",cellPadding:"1",border:"0",children:(0,f.jsx)("tbody",{children:t.length>0&&t[a].body.split("\n").map((function(e,t){return(0,f.jsxs)("tr",{children:[(0,f.jsx)("td",{className:"smallfont",style:{padding:"8px"},children:(0,f.jsx)("span",{className:"label",children:t+1})}),(0,f.jsx)("td",{className:"smallfont",width:"100%",style:{padding:"8px"},children:e})]},t)}))})})})})})]})})}},1842:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/album/[id]",function(){return r(6751)}])},3893:function(e){e.exports={title:"Album_title__wBA1W",table:"Album_table__z4X-P",content:"Album_content__2IqIr",stores:"Album_stores__1l3Tn",download:"Album_download__2Ultq",direct:"Album_direct__QfTe5",custom:"Album_custom__1SsLK"}},3554:function(e){e.exports={albumBox:"AlbumBoxes_albumBox__19Sjj",img:"AlbumBoxes_img__9QJdJ",coming:"AlbumBoxes_coming__1lGpA"}},2587:function(e){"use strict";function t(e,t){return Object.prototype.hasOwnProperty.call(e,t)}e.exports=function(e,r,n,s){r=r||"&",n=n||"=";var a={};if("string"!==typeof e||0===e.length)return a;var o=/\+/g;e=e.split(r);var c=1e3;s&&"number"===typeof s.maxKeys&&(c=s.maxKeys);var l=e.length;c>0&&l>c&&(l=c);for(var i=0;i<l;++i){var h,d,p,u,m=e[i].replace(o,"%20"),x=m.indexOf(n);x>=0?(h=m.substr(0,x),d=m.substr(x+1)):(h=m,d=""),p=decodeURIComponent(h),u=decodeURIComponent(d),t(a,p)?Array.isArray(a[p])?a[p].push(u):a[p]=[a[p],u]:a[p]=u}return a}},2361:function(e){"use strict";var t=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};e.exports=function(e,r,n,s){return r=r||"&",n=n||"=",null===e&&(e=void 0),"object"===typeof e?Object.keys(e).map((function(s){var a=encodeURIComponent(t(s))+n;return Array.isArray(e[s])?e[s].map((function(e){return a+encodeURIComponent(t(e))})).join(r):a+encodeURIComponent(t(e[s]))})).filter(Boolean).join(r):s?encodeURIComponent(t(s))+n+encodeURIComponent(t(e)):""}},7673:function(e,t,r){"use strict";t.decode=t.parse=r(2587),t.encode=t.stringify=r(2361)}},function(e){e.O(0,[774,888,179],(function(){return t=1842,e(e.s=t);var t}));var t=e.O();_N_E=t}]);