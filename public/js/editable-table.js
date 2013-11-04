(function(){define(["jquery","util","B64","underscore","templates","angular","jquery.event.drag","jquery.bootstrap.contextmenu","html2canvas"],function(e,t,n){var r,i,o;return i=angular.module("editable-table",[]),i.directive("sortArrow",function(){return{template:templates.sortArrow(),restrict:"E",scope:{model:"=",sortBy:"&",compareFunction:"&",hideArrows:"@"},replace:!0,transclude:!0,link:function(e,t){return e.ascending=!1,e.sort=function(){return e.sortBy?e.model=_.sortBy(e.model,function(t){return e.sortBy({o:t})}):e.compareFunction&&e.model.sort(function(t,n){return e.compareFunction({a:t,b:n})}),e.ascending?void 0:e.model.reverse()},e.elementToString=function(e){return e.hasClass("sortarrow")?r(t.find(".sortarrow-content")):!1},e.toggleSort=function(){return e.ascending=!e.ascending,e.sort()}}}}),r=function(t,n){var i,o,s;return null==n&&(n=!1),t.hasClass("dont-export")||n&&"none"===t.css("display")?"":(s=angular.element(t).scope(),s.elementToString&&(o=s.elementToString(t,n),o||"string"==typeof o)?o:(i=!1,o="",t.children().each(function(){var t;return t=r(e(this),n),t?(i&&(o+=" "),o+=t,i=!0):void 0}),i?o:t.text()))},o=function(t,n){var i;return null==n&&(n=!1),i=[],t.children().each(function(){var t;return t=e(this),t.hasClass("dont-export")||"TD"!==this.tagName&&"TH"!==this.tagName||n&&"none"===t.css("display")?void 0:i.push(r(t,n))}),i},i.directive("editableTable",["$parse",function(r){return{template:templates.editableTable(),restrict:"AE",replace:!0,transclude:!0,scope:{model:"=",addItem_:"&addItem",removeItem_:"&removeItem",canRemoveItem_:"&canRemoveItem",visible_:"@visible",reorders:"@reorders",tableClass_:"@tableClass",rowClicked_:"&rowClicked"},link:{post:function(i,s,l){var a,u,d,c,p,h,f,m,v;for(d=s.find("th").not(".controls"),h=d.length,a=e(templates.editableTcontext({id:i.tableId,n:h})).appendTo(e("body")),i.$watch(function(){return l.showGear},function(e){return i.showGear=null!=e?r(e)(i.$parent):!0}),i.$watch(function(){return l.tableClass},function(e){return i.tableClass=null!=e?e:"table table-striped table-bordered"}),i.$on("$destroy",function(){return a.remove()}),i.canRemoveItem=function(e,t){return null==l.canRemoveItem?null!=l.removeItem:i.canRemoveItem_({o:e,index:t})},c=function(){var t,r,i,l,a,u,d,c,p,h,f,m;for(r=[],s.find("tr").each(function(){var t;return t=e(this),t.hasClass("dont-export")?void 0:r.push(o(t,!0))}),c="",l=p=0,f=r.length;f>p;l=++p)for(d=r[l],l&&(c+="\r\n"),a=h=0,m=d.length;m>h;a=++h)t=d[a],a&&(c+=","),c+='"'+t.replace(/"/g,'""')+'"';return i=n.encode(c),u=e('<a id="downloader" download="table.csv" href="data:application/octet-stream;base64,'+i+'"></a>').appendTo(e("body")),u[0].click(),u.remove()},s.find("thead").contextmenu({target:".context-menu-"+i.tableId,before:function(t,n){var r;return r=o(n.find("tr")),a.find("li.hide-row").each(function(t,n){var o,s,l;return o=e(n),s=parseInt(o.data("index")),o.find(".item-label").html(r[s]),l=o.find("i"),i.visible[s]?(l.removeClass("fa-square-o"),l.addClass("fa-check-square-o")):(l.removeClass("fa-check-square-o"),l.addClass("fa-square-o"))}),!0},onItem:function(e,n){var r;return r=parseInt(n.data("index")),isNaN(r)&&(r=parseInt(n.parents("li").data("index"))),isNaN(r)?n.hasClass("export-csv")||n.parents(".export-csv")?c():void 0:t.safeApply(i,function(){return i.visible[r]=!i.visible[r],_.reduce(i.visible,function(e,t){return e||t},!1)?void 0:i.visible[r]=!i.visible[r]})}}),null==i.visible&&(i.visible=[]);i.visible.length<h;)i.visible.push(!0);for(i.$watch("visible_",function(e){var t,n,o,s;if(n=r(e),o=i.$parent,s=n(o),s&&s instanceof Array||!n.assign||(t=[],n.assign(o,t),s=t),s){for(;s.length<h;)s.push(!0);return i.visible=s}}),i.clearAutoCell=function(t){return null!==i.auto&&e(t[i.auto]).removeClass("a-width"),i.auto=null},i.updateAutoCell=function(t){var n,r,o,s,l,a,u,d;for(l=1000001,n=null,s=u=0,d=t.length;d>u;s=++u)if(o=t[s],i.visible[s]){if(r=e(o),r.hasClass("auto-width")){n=null;break}a=r.data("autoIndex"),isNaN(a)&&(a=1e6-r.width()),l>a&&(l=a,n=s)}return null!==n&&e(t[n]).addClass("a-width"),i.auto=n},v=[],p=f=0,m=d.length;m>f;p=++f)u=d[p],v.push(function(t,n){return i.$watch("visible["+t+"]",function(t){var r;return r=s.find("th").not(".controls"),i.clearAutoCell(r),i.updateAutoCell(r),t?e(n).removeClass("hidden-true"):e(n).addClass("hidden-true")}),i.$watch(function(){var r,o,s,l;if(!i.rowHovered)return 1;if(i.hover)return 1;if("none"===e(n).css("display"))return 1;for(r=o=s=t+1,l=d.length;l>=s?l>o:o>l;r=l>=s?++o:--o)if("none"!==e(d[r]).css("display"))return 1;return 2},function(e){return n.setAttribute("colspan",e)})}(p,u));return v}},controller:["$scope","$element",function(e){this.scope=e,e.tableId="tid"+Math.round(1e4*Math.random()),e.hover=!1,e.rowHovered=0}]}}]),i.directive("editableHeadTransclude",function(){return{require:"^editableTable",link:{post:function(n,r){return r.find("thead").hover(function(){return t.safeApply(n,function(){var t;if(n.showGear)return n.hover=!0,n.rowHovered++,n.headId="id"+Math.round(1e4*Math.random()),t=r.find("th:visible:last"),t.addClass("squeezedElement"),e(templates.editableTh({id:n.headId,tableId:n.tableId,width:t.width()})).appendTo(r.find("thead tr")).find("i.close.fa-cog").click(function(e){return setTimeout(function(){return r.find("thead").contextmenu("show",e)},1)})})},function(){return t.safeApply(n,function(){return n.hover?(n.hover=!1,n.rowHovered--,r.find(".controls").hide(),r.find(".squeezedElement").removeClass("squeezedElement"),r.find("#"+n.headId).remove()):void 0})})}},controller:["$transclude","$element",function(e,t){return e(function(e){return t.append(e)})}]}}),i.directive("editableTbody",function(){return{template:templates.editableTbody(),transclude:!0,restrict:"AE",require:"^editableTable",link:function(e,n,r,i){return e.getScope=function(){return i.scope},e.removeItem=function(e){var t;return t=i.scope.removeItem_,t?t({index:e}):i.scope.model.splice(e,1)},e.$watch(function(){return r.addItemLabel},function(){return e.addLabel=r.addItemLabel}),e.addItem=function(){return i.scope.addItem_(),setTimeout(function(){var e;return(e=t.focusableElement(n.find("tr:nth-last-child(2)")))?e.focus():void 0},1)},e.rowClicked=function(e){return i.scope.rowClicked_({$index:e})}}}}),i.directive("editableScriptTransclude",function(){return{require:"^editableTable",compile:function(n,r,i){return i(n,function(t){var r,i,o,s,l,a,u;for(r=e(t).filter("script").text().replace(/&lt;/gi,"<").replace(/&gt;/gi,">"),n.append(r),o=n.children("td").not(".controls"),u=[],s=l=0,a=o.length;a>l;s=++l)i=o[s],i.setAttribute("colspan","{{noColumns(hover, "+s+")}}"),u.push(e(i).addClass("hidden-{{!visible("+s+")}}"));return u}),{post:function(n,r,i,o){var s,l,a,u,d,c,p,h,f,m;return p=r.children("td").not(".controls"),n.noColumns=function(t,n){var r,i,s,l,a;if(t)return 1;if(!o.scope.rowHovered)return 1;if(r=p[n],"none"===e(r).css("display"))return 1;for(i=s=l=n+1,a=p.length;a>=l?a>s:s>a;i=a>=l?++s:--s)if("none"!==e(p[i]).css("display"))return 1;return 2},n.visible=function(e){try{return o.scope.visible[e]}catch(t){return!0}},n.mouseEnter=function(){var i;if(!n.hover&&o.scope.canRemoveItem(n.o,n.$index))return n.hover=!0,o.scope.rowHovered++,n.id="id"+Math.round(1e4*Math.random()),i=r.find("td:visible:last"),i.addClass("squeezedElement"),e(templates.editableTd({id:n.id,width:i.width(),tableId:o.scope.tableId})).appendTo(r).find("i.close").click(function(){return t.safeApply(n,function(){return n.removeItem(n.$index)})})},n.mouseLeave=function(){return n.hover?(n.hover=!1,o.scope.rowHovered--,r.find(".squeezedElement").removeClass("squeezedElement"),r.find("#"+n.id).remove()):void 0},a=null,h=function(t,n){var i,o,s,l,a,u,d,c,p,h;if(c=r.parent(),h=c.children(),d=h.length-1,!d)return null;if(l=e(h[d-1]),a=l.offset().top+l.outerHeight(),n>a+10)return null;if(p=c.offset(),n<p.top-10)return null;if(t<p.left||t>p.left+c.outerWidth())return null;for(i=0,o=d;o>i;)u=i+o>>1,s=e(h[u]),n<s.offset().top+s.outerHeight()/2?o=u:i=u+1;return{index:o,y:o===d?a:e(h[o]).offset().top}},s=null,l=null,u=d=0,c=null,m=function(e){var t;return s&&(s.css("left",e.pageX-u),s.css("top",e.pageY-d)),l?(t=h(e.pageX,e.pageY),!t||t.index!==c&&t.index!==c+1||(t=null),a&&!t?l.css("display","none"):t&&!a&&l.css("display","block"),t&&l.css("top",t.y+"px"),a=t):void 0},f=o.scope,r.on("draginit",function(){return f.reorders?r:!1}),r.on("dragstart",function(t){var n,i,o;return f.reorders?(o=r.parents("table"),c=r.index(),n=window.pageXOffset,i=window.pageYOffset,html2canvas(r[0],{scale:window.devicePixelRatio?window.devicePixelRatio:1,onrendered:function(o){var a,c,p,h,f,v,g,b,w,y,x;window.scrollTo(n,i),v=o.getContext("2d"),b=function(e){var t;return t=parseInt(e),isNaN(t)?0:t},x=r.find("td:visible"),a={left:b(x.css("border-left-width"))+b(r.css("border-left-width")),right:b(x.last().css("border-right-width"))+b(r.css("border-right-width")),top:b(x.css("border-top-width"))+b(r.css("border-top-width")),bottom:b(x.css("border-bottom-width"))+b(r.css("border-bottom-width"))},w=r.offset(),f=r.outerWidth(),h=r.outerHeight(),y={x:o.width/f,y:o.height/h},p={width:f-a.left-a.right,height:h-a.top-a.bottom},w.left=a.left*y.x,w.top=a.top*y.y,w.width=p.width*y.x,w.height=p.height*y.y,c=document.createElement("canvas"),s=e(c),s.attr("width",w.width),s.attr("height",w.height),s.css("width",p.width),s.css("height",p.height),c.getContext("2d").drawImage(o,-w.left,-w.top),s.css("border","1px solid #dddddd"),s.css("position","absolute"),s.css("opacity","0.6"),g=r.offset(),u=t.pageX-g.left,d=t.pageY-g.top,r.css("opacity","0.4"),l=e(document.createElement("div")),l.css("position","absolute"),l.css("border","1px solid #0088cc"),l.css("border-radius","1px"),l.css("width",r.outerWidth()),l.css("left",r.offset().left),l.css("display","none"),m(t),e(document.body).append(l),e(document.body).append(s)}}),l):!1}),r.on("drag",{distance:4},function(e){m(e)}),r.on("dragend",function(){var e;s&&(s.remove(),s=null),r.css("opacity","1"),l&&(l.remove(),l=null),f.reorders&&a&&(e=a.index,e>c&&e--,e!==c&&t.safeApply(f,function(){var t,n;return t=f.model,n=t.splice(c,1)[0],t.splice(e,0,n)}))})}}}}})})}).call(this);