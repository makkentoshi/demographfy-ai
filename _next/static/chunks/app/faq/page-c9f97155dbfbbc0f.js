(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[799],{66051:function(e,t,n){Promise.resolve().then(n.bind(n,72836))},72836:function(e,t,n){"use strict";n.d(t,{Accordion:function(){return er},AccordionContent:function(){return ea},AccordionItem:function(){return eo},AccordionTrigger:function(){return ei}});var r=n(57437),o=n(2265),i=n(67822),a=n(98575),u=n(6741),l=n(80886),c=n(66840),s=n(61188),d=n(71599),f=n(99255),p="Collapsible",[m,v]=function(e,t=[]){let n=[],i=()=>{let t=n.map(e=>o.createContext(e));return function(n){let r=n?.[e]||t;return o.useMemo(()=>({[`__scope${e}`]:{...n,[e]:r}}),[n,r])}};return i.scopeName=e,[function(t,i){let a=o.createContext(i),u=n.length;n=[...n,i];let l=t=>{let{scope:n,children:i,...l}=t,c=n?.[e]?.[u]||a,s=o.useMemo(()=>l,Object.values(l));return(0,r.jsx)(c.Provider,{value:s,children:i})};return l.displayName=t+"Provider",[l,function(n,r){let l=r?.[e]?.[u]||a,c=o.useContext(l);if(c)return c;if(void 0!==i)return i;throw Error(`\`${n}\` must be used within \`${t}\``)}]},function(...e){let t=e[0];if(1===e.length)return t;let n=()=>{let n=e.map(e=>({useScope:e(),scopeName:e.scopeName}));return function(e){let r=n.reduce((t,{useScope:n,scopeName:r})=>{let o=n(e)[`__scope${r}`];return{...t,...o}},{});return o.useMemo(()=>({[`__scope${t.scopeName}`]:r}),[r])}};return n.scopeName=t.scopeName,n}(i,...t)]}(p),[N,x]=m(p),h=o.forwardRef((e,t)=>{let{__scopeCollapsible:n,open:i,defaultOpen:a,disabled:u,onOpenChange:s,...d}=e,[p=!1,m]=(0,l.T)({prop:i,defaultProp:a,onChange:s});return(0,r.jsx)(N,{scope:n,disabled:u,contentId:(0,f.M)(),open:p,onOpenToggle:o.useCallback(()=>m(e=>!e),[m]),children:(0,r.jsx)(c.WV.div,{"data-state":j(p),"data-disabled":u?"":void 0,...d,ref:t})})});h.displayName=p;var b="CollapsibleTrigger",g=o.forwardRef((e,t)=>{let{__scopeCollapsible:n,...o}=e,i=x(b,n);return(0,r.jsx)(c.WV.button,{type:"button","aria-controls":i.contentId,"aria-expanded":i.open||!1,"data-state":j(i.open),"data-disabled":i.disabled?"":void 0,disabled:i.disabled,...o,ref:t,onClick:(0,u.M)(e.onClick,i.onOpenToggle)})});g.displayName=b;var w="CollapsibleContent",y=o.forwardRef((e,t)=>{let{forceMount:n,...o}=e,i=x(w,e.__scopeCollapsible);return(0,r.jsx)(d.z,{present:n||i.open,children:e=>{let{present:n}=e;return(0,r.jsx)(R,{...o,ref:t,present:n})}})});y.displayName=w;var R=o.forwardRef((e,t)=>{let{__scopeCollapsible:n,present:i,children:u,...l}=e,d=x(w,n),[f,p]=o.useState(i),m=o.useRef(null),v=(0,a.e)(t,m),N=o.useRef(0),h=N.current,b=o.useRef(0),g=b.current,y=d.open||f,R=o.useRef(y),C=o.useRef();return o.useEffect(()=>{let e=requestAnimationFrame(()=>R.current=!1);return()=>cancelAnimationFrame(e)},[]),(0,s.b)(()=>{let e=m.current;if(e){C.current=C.current||{transitionDuration:e.style.transitionDuration,animationName:e.style.animationName},e.style.transitionDuration="0s",e.style.animationName="none";let t=e.getBoundingClientRect();N.current=t.height,b.current=t.width,R.current||(e.style.transitionDuration=C.current.transitionDuration,e.style.animationName=C.current.animationName),p(i)}},[d.open,i]),(0,r.jsx)(c.WV.div,{"data-state":j(d.open),"data-disabled":d.disabled?"":void 0,id:d.contentId,hidden:!y,...l,ref:v,style:{"--radix-collapsible-content-height":h?"".concat(h,"px"):void 0,"--radix-collapsible-content-width":g?"".concat(g,"px"):void 0,...e.style},children:y&&u})});function j(e){return e?"open":"closed"}var C=n(29114),_="Accordion",A=["Home","End","ArrowDown","ArrowUp","ArrowLeft","ArrowRight"],[M,O,I]=(0,i.B)(_),[E,T]=function(e,t=[]){let n=[],i=()=>{let t=n.map(e=>o.createContext(e));return function(n){let r=n?.[e]||t;return o.useMemo(()=>({[`__scope${e}`]:{...n,[e]:r}}),[n,r])}};return i.scopeName=e,[function(t,i){let a=o.createContext(i),u=n.length;n=[...n,i];let l=t=>{let{scope:n,children:i,...l}=t,c=n?.[e]?.[u]||a,s=o.useMemo(()=>l,Object.values(l));return(0,r.jsx)(c.Provider,{value:s,children:i})};return l.displayName=t+"Provider",[l,function(n,r){let l=r?.[e]?.[u]||a,c=o.useContext(l);if(c)return c;if(void 0!==i)return i;throw Error(`\`${n}\` must be used within \`${t}\``)}]},function(...e){let t=e[0];if(1===e.length)return t;let n=()=>{let n=e.map(e=>({useScope:e(),scopeName:e.scopeName}));return function(e){let r=n.reduce((t,{useScope:n,scopeName:r})=>{let o=n(e)[`__scope${r}`];return{...t,...o}},{});return o.useMemo(()=>({[`__scope${t.scopeName}`]:r}),[r])}};return n.scopeName=t.scopeName,n}(i,...t)]}(_,[I,v]),S=v(),k=o.forwardRef((e,t)=>{let{type:n,...o}=e;return(0,r.jsx)(M.Provider,{scope:e.__scopeAccordion,children:"multiple"===n?(0,r.jsx)(L,{...o,ref:t}):(0,r.jsx)(U,{...o,ref:t})})});k.displayName=_;var[P,$]=E(_),[D,W]=E(_,{collapsible:!1}),U=o.forwardRef((e,t)=>{let{value:n,defaultValue:i,onValueChange:a=()=>{},collapsible:u=!1,...c}=e,[s,d]=(0,l.T)({prop:n,defaultProp:i,onChange:a});return(0,r.jsx)(P,{scope:e.__scopeAccordion,value:s?[s]:[],onItemOpen:d,onItemClose:o.useCallback(()=>u&&d(""),[u,d]),children:(0,r.jsx)(D,{scope:e.__scopeAccordion,collapsible:u,children:(0,r.jsx)(z,{...c,ref:t})})})}),L=o.forwardRef((e,t)=>{let{value:n,defaultValue:i,onValueChange:a=()=>{},...u}=e,[c=[],s]=(0,l.T)({prop:n,defaultProp:i,onChange:a}),d=o.useCallback(e=>s(function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return[...t,e]}),[s]),f=o.useCallback(e=>s(function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return t.filter(t=>t!==e)}),[s]);return(0,r.jsx)(P,{scope:e.__scopeAccordion,value:c,onItemOpen:d,onItemClose:f,children:(0,r.jsx)(D,{scope:e.__scopeAccordion,collapsible:!0,children:(0,r.jsx)(z,{...u,ref:t})})})}),[V,F]=E(_),z=o.forwardRef((e,t)=>{let{__scopeAccordion:n,disabled:i,dir:l,orientation:s="vertical",...d}=e,f=o.useRef(null),p=(0,a.e)(f,t),m=O(n),v="ltr"===(0,C.gm)(l),N=(0,u.M)(e.onKeyDown,e=>{var t;if(!A.includes(e.key))return;let n=e.target,r=m().filter(e=>{var t;return!(null===(t=e.ref.current)||void 0===t?void 0:t.disabled)}),o=r.findIndex(e=>e.ref.current===n),i=r.length;if(-1===o)return;e.preventDefault();let a=o,u=i-1,l=()=>{(a=o+1)>u&&(a=0)},c=()=>{(a=o-1)<0&&(a=u)};switch(e.key){case"Home":a=0;break;case"End":a=u;break;case"ArrowRight":"horizontal"===s&&(v?l():c());break;case"ArrowDown":"vertical"===s&&l();break;case"ArrowLeft":"horizontal"===s&&(v?c():l());break;case"ArrowUp":"vertical"===s&&c()}null===(t=r[a%i].ref.current)||void 0===t||t.focus()});return(0,r.jsx)(V,{scope:n,disabled:i,direction:l,orientation:s,children:(0,r.jsx)(M.Slot,{scope:n,children:(0,r.jsx)(c.WV.div,{...d,"data-orientation":s,ref:p,onKeyDown:i?void 0:N})})})}),H="AccordionItem",[q,B]=E(H),K=o.forwardRef((e,t)=>{let{__scopeAccordion:n,value:o,...i}=e,a=F(H,n),u=$(H,n),l=S(n),c=(0,f.M)(),s=o&&u.value.includes(o)||!1,d=a.disabled||e.disabled;return(0,r.jsx)(q,{scope:n,open:s,disabled:d,triggerId:c,children:(0,r.jsx)(h,{"data-orientation":a.orientation,"data-state":ee(s),...l,...i,ref:t,disabled:d,open:s,onOpenChange:e=>{e?u.onItemOpen(o):u.onItemClose(o)}})})});K.displayName=H;var G="AccordionHeader",J=o.forwardRef((e,t)=>{let{__scopeAccordion:n,...o}=e,i=F(_,n),a=B(G,n);return(0,r.jsx)(c.WV.h3,{"data-orientation":i.orientation,"data-state":ee(a.open),"data-disabled":a.disabled?"":void 0,...o,ref:t})});J.displayName=G;var Q="AccordionTrigger",X=o.forwardRef((e,t)=>{let{__scopeAccordion:n,...o}=e,i=F(_,n),a=B(Q,n),u=W(Q,n),l=S(n);return(0,r.jsx)(M.ItemSlot,{scope:n,children:(0,r.jsx)(g,{"aria-disabled":a.open&&!u.collapsible||void 0,"data-orientation":i.orientation,id:a.triggerId,...l,...o,ref:t})})});X.displayName=Q;var Y="AccordionContent",Z=o.forwardRef((e,t)=>{let{__scopeAccordion:n,...o}=e,i=F(_,n),a=B(Y,n),u=S(n);return(0,r.jsx)(y,{role:"region","aria-labelledby":a.triggerId,"data-orientation":i.orientation,...u,...o,ref:t,style:{"--radix-accordion-content-height":"var(--radix-collapsible-content-height)","--radix-accordion-content-width":"var(--radix-collapsible-content-width)",...e.style}})});function ee(e){return e?"open":"closed"}Z.displayName=Y;var et=n(94508),en=n(20653);let er=k,eo=o.forwardRef((e,t)=>{let{className:n,...o}=e;return(0,r.jsx)(K,{ref:t,className:(0,et.cn)("border-b",n),...o})});eo.displayName="AccordionItem";let ei=o.forwardRef((e,t)=>{let{className:n,children:o,...i}=e;return(0,r.jsx)(J,{className:"flex",children:(0,r.jsxs)(X,{ref:t,className:(0,et.cn)("flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",n),...i,children:[o,(0,r.jsx)(en.v4q,{className:"h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"})]})})});ei.displayName=X.displayName;let ea=o.forwardRef((e,t)=>{let{className:n,children:o,...i}=e;return(0,r.jsx)(Z,{ref:t,className:"overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",...i,children:(0,r.jsx)("div",{className:(0,et.cn)("pb-4 pt-0",n),children:o})})});ea.displayName=Z.displayName},94508:function(e,t,n){"use strict";n.d(t,{cn:function(){return i}});var r=n(61994),o=n(53335);function i(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return(0,o.m6)((0,r.W)(t))}},6741:function(e,t,n){"use strict";function r(e,t,{checkForDefaultPrevented:n=!0}={}){return function(r){if(e?.(r),!1===n||!r.defaultPrevented)return t?.(r)}}n.d(t,{M:function(){return r}})},67822:function(e,t,n){"use strict";n.d(t,{B:function(){return l}});var r=n(2265),o=n(73966),i=n(98575),a=n(37053),u=n(57437);function l(e){let t=e+"CollectionProvider",[n,l]=(0,o.b)(t),[c,s]=n(t,{collectionRef:{current:null},itemMap:new Map}),d=e=>{let{scope:t,children:n}=e,o=r.useRef(null),i=r.useRef(new Map).current;return(0,u.jsx)(c,{scope:t,itemMap:i,collectionRef:o,children:n})};d.displayName=t;let f=e+"CollectionSlot",p=r.forwardRef((e,t)=>{let{scope:n,children:r}=e,o=s(f,n),l=(0,i.e)(t,o.collectionRef);return(0,u.jsx)(a.g7,{ref:l,children:r})});p.displayName=f;let m=e+"CollectionItemSlot",v="data-radix-collection-item",N=r.forwardRef((e,t)=>{let{scope:n,children:o,...l}=e,c=r.useRef(null),d=(0,i.e)(t,c),f=s(m,n);return r.useEffect(()=>(f.itemMap.set(c,{ref:c,...l}),()=>void f.itemMap.delete(c))),(0,u.jsx)(a.g7,{[v]:"",ref:d,children:o})});return N.displayName=m,[{Provider:d,Slot:p,ItemSlot:N},function(t){let n=s(e+"CollectionConsumer",t);return r.useCallback(()=>{let e=n.collectionRef.current;if(!e)return[];let t=Array.from(e.querySelectorAll("[".concat(v,"]")));return Array.from(n.itemMap.values()).sort((e,n)=>t.indexOf(e.ref.current)-t.indexOf(n.ref.current))},[n.collectionRef,n.itemMap])},l]}},73966:function(e,t,n){"use strict";n.d(t,{b:function(){return i}});var r=n(2265),o=n(57437);function i(e,t=[]){let n=[],i=()=>{let t=n.map(e=>r.createContext(e));return function(n){let o=n?.[e]||t;return r.useMemo(()=>({[`__scope${e}`]:{...n,[e]:o}}),[n,o])}};return i.scopeName=e,[function(t,i){let a=r.createContext(i),u=n.length;function l(t){let{scope:n,children:i,...l}=t,c=n?.[e][u]||a,s=r.useMemo(()=>l,Object.values(l));return(0,o.jsx)(c.Provider,{value:s,children:i})}return n=[...n,i],l.displayName=t+"Provider",[l,function(n,o){let l=o?.[e][u]||a,c=r.useContext(l);if(c)return c;if(void 0!==i)return i;throw Error(`\`${n}\` must be used within \`${t}\``)}]},function(...e){let t=e[0];if(1===e.length)return t;let n=()=>{let n=e.map(e=>({useScope:e(),scopeName:e.scopeName}));return function(e){let o=n.reduce((t,{useScope:n,scopeName:r})=>{let o=n(e)[`__scope${r}`];return{...t,...o}},{});return r.useMemo(()=>({[`__scope${t.scopeName}`]:o}),[o])}};return n.scopeName=t.scopeName,n}(i,...t)]}},29114:function(e,t,n){"use strict";n.d(t,{gm:function(){return i}});var r=n(2265);n(57437);var o=r.createContext(void 0);function i(e){let t=r.useContext(o);return e||t||"ltr"}},99255:function(e,t,n){"use strict";n.d(t,{M:function(){return l}});var r,o=n(2265),i=n(61188),a=(r||(r=n.t(o,2)))["useId".toString()]||(()=>void 0),u=0;function l(e){let[t,n]=o.useState(a());return(0,i.b)(()=>{e||n(e=>e??String(u++))},[e]),e||(t?`radix-${t}`:"")}},71599:function(e,t,n){"use strict";n.d(t,{z:function(){return a}});var r=n(2265),o=n(98575),i=n(61188),a=e=>{var t,n;let a,l;let{present:c,children:s}=e,d=function(e){var t,n;let[o,a]=r.useState(),l=r.useRef({}),c=r.useRef(e),s=r.useRef("none"),[d,f]=(t=e?"mounted":"unmounted",n={mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}},r.useReducer((e,t)=>{let r=n[e][t];return null!=r?r:e},t));return r.useEffect(()=>{let e=u(l.current);s.current="mounted"===d?e:"none"},[d]),(0,i.b)(()=>{let t=l.current,n=c.current;if(n!==e){let r=s.current,o=u(t);e?f("MOUNT"):"none"===o||(null==t?void 0:t.display)==="none"?f("UNMOUNT"):n&&r!==o?f("ANIMATION_OUT"):f("UNMOUNT"),c.current=e}},[e,f]),(0,i.b)(()=>{if(o){var e;let t;let n=null!==(e=o.ownerDocument.defaultView)&&void 0!==e?e:window,r=e=>{let r=u(l.current).includes(e.animationName);if(e.target===o&&r&&(f("ANIMATION_END"),!c.current)){let e=o.style.animationFillMode;o.style.animationFillMode="forwards",t=n.setTimeout(()=>{"forwards"===o.style.animationFillMode&&(o.style.animationFillMode=e)})}},i=e=>{e.target===o&&(s.current=u(l.current))};return o.addEventListener("animationstart",i),o.addEventListener("animationcancel",r),o.addEventListener("animationend",r),()=>{n.clearTimeout(t),o.removeEventListener("animationstart",i),o.removeEventListener("animationcancel",r),o.removeEventListener("animationend",r)}}f("ANIMATION_END")},[o,f]),{isPresent:["mounted","unmountSuspended"].includes(d),ref:r.useCallback(e=>{e&&(l.current=getComputedStyle(e)),a(e)},[])}}(c),f="function"==typeof s?s({present:d.isPresent}):r.Children.only(s),p=(0,o.e)(d.ref,(a=null===(t=Object.getOwnPropertyDescriptor(f.props,"ref"))||void 0===t?void 0:t.get)&&"isReactWarning"in a&&a.isReactWarning?f.ref:(a=null===(n=Object.getOwnPropertyDescriptor(f,"ref"))||void 0===n?void 0:n.get)&&"isReactWarning"in a&&a.isReactWarning?f.props.ref:f.props.ref||f.ref);return"function"==typeof s||d.isPresent?r.cloneElement(f,{ref:p}):null};function u(e){return(null==e?void 0:e.animationName)||"none"}a.displayName="Presence"},66840:function(e,t,n){"use strict";n.d(t,{WV:function(){return u},jH:function(){return l}});var r=n(2265),o=n(54887),i=n(37053),a=n(57437),u=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"].reduce((e,t)=>{let n=r.forwardRef((e,n)=>{let{asChild:r,...o}=e,u=r?i.g7:t;return"undefined"!=typeof window&&(window[Symbol.for("radix-ui")]=!0),(0,a.jsx)(u,{...o,ref:n})});return n.displayName=`Primitive.${t}`,{...e,[t]:n}},{});function l(e,t){e&&o.flushSync(()=>e.dispatchEvent(t))}},26606:function(e,t,n){"use strict";n.d(t,{W:function(){return o}});var r=n(2265);function o(e){let t=r.useRef(e);return r.useEffect(()=>{t.current=e}),r.useMemo(()=>(...e)=>t.current?.(...e),[])}},80886:function(e,t,n){"use strict";n.d(t,{T:function(){return i}});var r=n(2265),o=n(26606);function i({prop:e,defaultProp:t,onChange:n=()=>{}}){let[i,a]=function({defaultProp:e,onChange:t}){let n=r.useState(e),[i]=n,a=r.useRef(i),u=(0,o.W)(t);return r.useEffect(()=>{a.current!==i&&(u(i),a.current=i)},[i,a,u]),n}({defaultProp:t,onChange:n}),u=void 0!==e,l=u?e:i,c=(0,o.W)(n);return[l,r.useCallback(t=>{if(u){let n="function"==typeof t?t(e):t;n!==e&&c(n)}else a(t)},[u,e,a,c])]}},61188:function(e,t,n){"use strict";n.d(t,{b:function(){return o}});var r=n(2265),o=globalThis?.document?r.useLayoutEffect:()=>{}}},function(e){e.O(0,[310,317,971,117,744],function(){return e(e.s=66051)}),_N_E=e.O()}]);