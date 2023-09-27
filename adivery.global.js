"use strict";var Adivery=(()=>{var y=Object.defineProperty;var S=Object.getOwnPropertyDescriptor;var E=Object.getOwnPropertyNames;var C=Object.prototype.hasOwnProperty;var D=(t,e)=>{for(var n in e)y(t,n,{get:e[n],enumerable:!0})},T=(t,e,n,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of E(e))!C.call(t,i)&&i!==n&&y(t,i,{get:()=>e[i],enumerable:!(o=S(e,i))||o.enumerable});return t};var x=t=>T(y({},"__esModule",{value:!0}),t);var Q={};D(Q,{configure:()=>U,requestInterstitialAd:()=>Z,requestNativeAd:()=>V,requestRewardedAd:()=>H});var z="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZlZmVmZSI+CiAgICA8cGF0aCBkPSJNMTguMyA1LjcxYy0uMzktLjM5LTEuMDItLjM5LTEuNDEgMEwxMiAxMC41OSA3LjExIDUuN2MtLjM5LS4zOS0xLjAyLS4zOS0xLjQxIDAtLjM5LjM5LS4zOSAxLjAyIDAgMS40MUwxMC41OSAxMiA1LjcgMTYuODljLS4zOS4zOS0uMzkgMS4wMiAwIDEuNDEuMzkuMzkgMS4wMi4zOSAxLjQxIDBMMTIgMTMuNDFsNC44OSA0Ljg5Yy4zOS4zOSAxLjAyLjM5IDEuNDEgMCAuMzktLjM5LjM5LTEuMDIgMC0xLjQxTDEzLjQxIDEybDQuODktNC44OWMuMzgtLjM4LjM4LTEuMDIgMC0xLjR6IiAvPgo8L3N2Zz4=",O="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZlZmVmZSI+CiAgICA8cGF0aCBkPSJNMy42MyAzLjYzYy0uMzkuMzktLjM5IDEuMDIgMCAxLjQxTDcuMjkgOC43IDcgOUg0Yy0uNTUgMC0xIC40NS0xIDF2NGMwIC41NS40NSAxIDEgMWgzbDMuMjkgMy4yOWMuNjMuNjMgMS43MS4xOCAxLjcxLS43MXYtNC4xN2w0LjE4IDQuMThjLS40OS4zNy0xLjAyLjY4LTEuNi45MS0uMzYuMTUtLjU4LjUzLS41OC45MiAwIC43Mi43MyAxLjE4IDEuMzkuOTEuOC0uMzMgMS41NS0uNzcgMi4yMi0xLjMxbDEuMzQgMS4zNGMuMzkuMzkgMS4wMi4zOSAxLjQxIDAgLjM5LS4zOS4zOS0xLjAyIDAtMS40MUw1LjA1IDMuNjNjLS4zOS0uMzktMS4wMi0uMzktMS40MiAwek0xOSAxMmMwIC44Mi0uMTUgMS42MS0uNDEgMi4zNGwxLjUzIDEuNTNjLjU2LTEuMTcuODgtMi40OC44OC0zLjg3IDAtMy44My0yLjQtNy4xMS01Ljc4LTguNC0uNTktLjIzLTEuMjIuMjMtMS4yMi44NnYuMTljMCAuMzguMjUuNzEuNjEuODVDMTcuMTggNi41NCAxOSA5LjA2IDE5IDEyem0tOC43MS02LjI5bC0uMTcuMTdMMTIgNy43NlY2LjQxYzAtLjg5LTEuMDgtMS4zMy0xLjcxLS43ek0xNi41IDEyYzAtMS43Ny0xLjAyLTMuMjktMi41LTQuMDN2MS43OWwyLjQ4IDIuNDhjLjAxLS4wOC4wMi0uMTYuMDItLjI0eiIgLz4KPC9zdmc+",v="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZlZmVmZSI+CiAgICA8cGF0aCBkPSJNMyAxMHY0YzAgLjU1LjQ1IDEgMSAxaDNsMy4yOSAzLjI5Yy42My42MyAxLjcxLjE4IDEuNzEtLjcxVjYuNDFjMC0uODktMS4wOC0xLjM0LTEuNzEtLjcxTDcgOUg0Yy0uNTUgMC0xIC40NS0xIDF6bTEzLjUgMmMwLTEuNzctMS4wMi0zLjI5LTIuNS00LjAzdjguMDVjMS40OC0uNzMgMi41LTIuMjUgMi41LTQuMDJ6TTE0IDQuNDV2LjJjMCAuMzguMjUuNzEuNi44NUMxNy4xOCA2LjUzIDE5IDkuMDYgMTkgMTJzLTEuODIgNS40Ny00LjQgNi41Yy0uMzYuMTQtLjYuNDctLjYuODV2LjJjMCAuNjMuNjMgMS4wNyAxLjIxLjg1QzE4LjYgMTkuMTEgMjEgMTUuODQgMjEgMTJzLTIuNC03LjExLTUuNzktOC40Yy0uNTgtLjIzLTEuMjEuMjItMS4yMS44NXoiIC8+Cjwvc3ZnPg==",p={appId:void 0,set(t){this.appId=t},get(){if(!this.appId)throw new Error("Unknown app id. Call Adivery.configure(APP_ID) first.");return this.appId},exists(){return!!this.appId}};function u(t,{attrs:e,parent:n,style:o}){let i=document.createElement(t);return Object.assign(i.style,o),e&&Object.assign(i,e),n&&n.appendChild(i),i}function b(){return navigator.userAgent.match(/(iPhone|iPod|iPad)/)?"iOS":navigator.userAgent.match(/Android/)?"Android":"Desktop"}function k(){return"PORTRAIT"}async function R(){return{device:{api_level:0,os:b(),http_agent:navigator.userAgent,screen_width:screen.width,screen_height:screen.height,screen_dpi:0},package:location.host,version_code:0,install_time:0,update_time:0,app_id:p.get()}}async function P(){let t=JSON.stringify(await R(),null,2);return(await fetch("https://fetch.adivery.com/api/v1/installation",{method:"POST",body:t,headers:{"content-type":"application/json"}})).json()}async function I(t,e){let n=JSON.stringify({placement_id:t,placement_type:e,screen_orientation:k()},null,2),i=await(await fetch("https://fetch.adivery.com/api/v1/ads",{method:"POST",body:n,headers:{"content-type":"application/json"}})).json();for(let s of(i==null?void 0:i.networks)||[])if((s==null?void 0:s.id)==="ADIVERY")return s;throw new Error("No fill")}function U(t){if(!p.exists()){if(!t)throw new Error("Adivery.configure: appId should be provided");p.set(t),P().then(()=>{},console.error)}}async function m(t){return(await fetch(t)).text()}function Y(t,e,n){let o=`
window.Environment = {
  getConfig() {
    return ${JSON.stringify(JSON.stringify(e))};
  },

  getMedia() {
    return ${JSON.stringify(JSON.stringify(n))};
  },

  onAdShown() {},

  onAdInitialized() {},

  onAdClicked() {},

  onAdRewarded() {
    window.parent.postMessage("onAdRewarded", "*");
  },

  onAdClosed() {
    window.parent.postMessage("onAdClosed", "*");
  },

  openUrl(url) {
    window.open(url, "_blank");
  },

  callTrackers(urls) {
    urls.forEach((url) => {
      var img = new Image();
      img.src = url;
    });
  },
};
`,i=t.replace("</head>",`<script>${o}<\/script></head>`);return URL.createObjectURL(new Blob([i],{type:"text/html"}))}async function j(t){let n=await(await fetch(t)).blob();return URL.createObjectURL(n)}async function f(t){return(await Promise.all(t.media.map(async({id:e,url:n})=>[e,await j(n)]))).reduce((e,[n,o])=>(e[n]=o,e),{})}async function V(t){var i,s;let e=await I(t,"NATIVE"),n=!1,o=a=>{for(let r of e.config.events[a]||[]){var d=new Image;d.src=r}};return{headline:e.config.headline,description:e.config.description,advertiser:e.config.advertiser,callToAction:e.config.call_to_action,image:await j(((i=e.media.find(a=>a.id==="image"))==null?void 0:i.url)||""),icon:await j(((s=e.media.find(a=>a.id==="icon"))==null?void 0:s.url)||""),recordImpression(){n||(n=!0,o("impression"))},recordClick(){if(n)o("click"),window.open(e.config.landing_url,"_blank");else throw new Error("Call ad.recordImpression() when ad is visible")}}}function w(...t){let e=document.createElement("div");Object.assign(e.style,{position:"absolute",border:"none",width:window.innerWidth+"px",height:window.innerHeight+"px",inset:"0"}),e.dir="ltr",e.style.setProperty("z-index","999999","important");for(let n of t)e.appendChild(n);return document.body.appendChild(e),function(){document.body.removeChild(e)}}function L(t,e){let n=u("div",{style:{position:"absolute",top:"0",[e]:"0",padding:"12px"}}),o=u("div",{style:{width:"24px",height:"24px",padding:"3px",boxSizing:"border-box",borderRadius:"12px",backgroundColor:"#3c4043"},parent:n});return u("img",{style:{width:"18px",height:"18px"},attrs:{src:t},parent:o}),n}function _(t){return new Promise((e,n)=>{let o=L(z,"right"),i=L(O,"left"),s=L(v,"left"),a=u("div",{style:{position:"absolute",left:"0",right:"0",bottom:"0",height:"4px"}}),d=u("div",{parent:a,style:{width:"0%",height:"100%",backgroundColor:"#fff",transition:"width 500ms"}}),r=u("video",{attrs:{muted:!1,playsInline:!0,src:t},style:{backgroundColor:"#000",width:"100%",height:"100%"}}),M=(()=>{let c=!1;return N=>{c||(c=!0,r.pause(),r.src="",A(),e(N))}})();r.ontimeupdate=()=>{console.log("onProgress",r.currentTime);let c=r.currentTime/r.duration*100;d.style.width=c+"%"},r.onended=()=>M("REWARDED"),r.onerror=()=>M("ERROR"),i.onclick=()=>{r.muted=!1,g()},s.onclick=()=>{r.muted=!0,g()},o.onclick=()=>{M("SKIPPED")};function g(){s.style.display=r.muted?"none":"block",i.style.display=r.muted?"block":"none"}let l=r.play();g(),l&&l.catch(c=>{r.muted=!0,r.play(),g()});let A=w(r,a,o,i,s)})}var h=function(){let t=!1,e=!1;return{show(n,o,i){let s=a=>{for(let r of o.events[a]||[]){var d=new Image;d.src=r}};return new Promise(a=>{if(t)throw new Error("Another fullscreen ad is displaying");t=!0,e=!1;function d(r){let M=r?{...o,video_status:r}:o,g=u("iframe",{attrs:{src:Y(n,M,i)},style:{width:"100%",height:"100%",border:"none"}});function l(){A(),window.onmessage=null,t=!1,e&&s("complete"),a(e)}window.onmessage=c=>{c.data==="onAdRewarded"&&(e=!0),c.data==="onAdClosed"&&l()};let A=w(g)}i.video?(_(i.video).then(async r=>{e=r=="REWARDED",d(r)}),s("impression")):d()})}}}();async function Z(t){let e=await I(t,"INTERSTITIAL"),n=await f(e),o=await m(e.bundle);return{show(){return h.show(o,e.config,n).then(()=>{})}}}async function H(t){let e=await I(t,"REWARDED"),n=await f(e),o=await m(e.bundle);return{show(){return h.show(o,e.config,n)}}}return x(Q);})();