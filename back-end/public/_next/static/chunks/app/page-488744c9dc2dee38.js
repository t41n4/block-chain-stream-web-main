(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1931],{25893:function(){},89257:function(t,e,l){Promise.resolve().then(l.bind(l,21343)),Promise.resolve().then(l.t.bind(l,63222,23)),Promise.resolve().then(l.bind(l,32870))},22706:function(t,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"RouterContext",{enumerable:!0,get:function(){return s}});let i=l(21024),n=i._(l(2265)),s=n.default.createContext(null)},32870:function(t,e,l){"use strict";l.r(e);var i=l(57437),n=l(2265),s=l(84267);l(35629),l(85449),e.default=t=>{let{url:e}=t,l=(0,n.useRef)(null),[u,a]=(0,n.useState)(!1),[r,o]=(0,n.useState)(null);return(0,n.useEffect)(()=>{l.current&&(0,s.default)(l.current,{liveui:!0,liveTracker:!0,autoplay:!1,controls:!0,sources:[{src:e,type:"application/x-mpegURL"}],lowLatency:!0,enableWorker:!0,lowLatencyMode:!0,backBufferLength:90,playbackRates:[.5,1,1.5,2],plugins:{qualityLevels:{}}}).qualitySelectorHls()},[]),(0,i.jsx)("div",{className:"flex flex-col w-full h-[400px] justify-center items-center relative",children:(0,i.jsx)("video",{ref:l,className:"video-js vjs-default-skin w-full h-full flex flex-col justify-center items-center rounded-xl",controls:!0})})}},85449:function(){},21343:function(t,e,l){"use strict";l.r(e),e.default={src:"/_next/static/media/favicon.603d046c.ico",height:16,width:16,blurWidth:0,blurHeight:0}},35629:function(t,e,l){t.exports=function(t){"use strict";var e=t&&"object"==typeof t&&"default"in t?t:{default:t};let l=e.default.getComponent("MenuButton"),i=e.default.getComponent("Menu"),n=e.default.getComponent("Component"),s=e.default.dom;function u(t){let e=new l(t,{title:t.localize("Quality"),name:"QualityButton",createItems:()=>[],createMenu:()=>{let t=new i(this.player_,{menuButton:this});if(this.hideThreshold_=0,this.options_.title){var e;let l=s.createEl("li",{className:"vjs-menu-title",innerHTML:"string"!=typeof(e=this.options_.title)?e:e.charAt(0).toUpperCase()+e.slice(1),tabIndex:-1}),i=new n(this.player_,{el:l});this.hideThreshold_+=1,t.addItem(i)}if(this.items=this.createItems(),this.items)for(let e=0;e<this.items.length;e++)t.addItem(this.items[e]);return t}});return e}let a=e.default.getComponent("MenuItem"),r={vjsIconClass:"vjs-icon-hd",displayCurrentQuality:!1,placementIndex:0};class o{constructor(t,l){this.player=t,this.config=e.default.obj.merge(r,l),t.ready(()=>{this.player.addClass("vjs-quality-selector-hls"),this.player.qualityLevels&&(this.createQualityButton(),this.bindPlayerEvents())})}getHls(){return this.player.tech({IWillNotUseThisInPlugins:!0}).hls}bindPlayerEvents(){this.player.qualityLevels().on("addqualitylevel",this.onAddQualityLevel.bind(this))}createQualityButton(){let t=this.player;this._qualityButton=new u(t);let e=t.controlBar.children().length-2,l=t.controlBar.addChild(this._qualityButton,{componentClass:"qualitySelector"},this.config.placementIndex||e);if(l.addClass("vjs-quality-selector"),this.config.displayCurrentQuality)this.setButtonInnerText("auto");else{let t=` ${this.config.vjsIconClass||"vjs-icon-hd"}`;l.menuButton_.$(".vjs-icon-placeholder").className+=t}l.removeClass("vjs-hidden")}setButtonInnerText(t){this._qualityButton.menuButton_.$(".vjs-icon-placeholder").innerHTML=t}getQualityMenuItem(t){let e=this.player;return function(t,e,l,i){let n=new a(t,{label:e.label,selectable:!0,selected:e.selected||!1});return n.item=e,n.qualityButton=l,n.plugin=i,n.handleClick=function(){for(let t=0;t<this.qualityButton.items.length;++t)this.qualityButton.items[t].selected(!1);this.plugin.setQuality(this.item.value),this.selected(!0)},n}(e,t,this._qualityButton,this)}onAddQualityLevel(){let t=this.player,e=t.qualityLevels(),l=e.levels_||[],i=[];for(let t=0;t<l.length;++t){let{width:e,height:n}=l[t],s=e>n?n:e;if(s&&!i.filter(t=>t.item&&t.item.value===s).length){let t=this.getQualityMenuItem.call(this,{label:s+"p",value:s});i.push(t)}}i.sort((t,e)=>"object"!=typeof t||"object"!=typeof e||t.item.value<e.item.value?-1:t.item.value>e.item.value?1:0),i.push(this.getQualityMenuItem.call(this,{label:t.localize("Auto"),value:"auto",selected:!0})),this._qualityButton&&(this._qualityButton.createItems=function(){return i},this._qualityButton.update())}setQuality(t){let e=this.player.qualityLevels();this._currentQuality=t,this.config.displayCurrentQuality&&this.setButtonInnerText("auto"===t?t:`${t}p`);for(let l=0;l<e.length;++l){let{width:i,height:n}=e[l],s=i>n?n:i;e[l].enabled=s===t||"auto"===t}this._qualityButton.unpressButton()}getCurrentQuality(){return this._currentQuality||"auto"}}let c=function(t,e){let l=new o(t,e);return t.QualitySelectorHlsVjs=!0,l.defaultState={},l.VERSION="1.1.1",l},h=function(t){return c(this,e.default.obj.merge({},t))};return e.default.registerPlugin("qualitySelectorHls",h),h}(l(84267))}},function(t){t.O(0,[2532,9089,9625,3222,2971,596,1744],function(){return t(t.s=89257)}),_N_E=t.O()}]);