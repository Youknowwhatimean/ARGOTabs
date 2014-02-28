(function(){define(["util","ballot","judge","sorter","judgerules","team","underscore"],function(a,b,c,d,e,f){var g;return g=function(){function g(a,c){var f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x;this.tournament=a;if(c)for(i in c)l=c[i],this[i]=l;this.id==null&&(this.id=Math.floor(Math.random()*1e8)),this.tableOpts==null&&(this.tableOpts={}),this.teams==null&&(this.teams=[]),this.judges==null&&(this.judges=[]),this.freeJudges==null&&(this.freeJudges=[]),this.rooms==null&&(this.rooms=[]),this.freeRooms==null&&(this.freeRooms=[]),this.ballots==null&&(this.ballots=[]),this.ballotsPerMatch==null&&(this.ballotsPerMatch=null),this.maxMainJudges==null&&(this.maxMainJudges=null),this.maxShadowJudges==null&&(this.maxShadowJudges=null),this.maxPanelSize==null&&(this.maxPanelSize=null),this.inheritPairRank==null&&(this.inheritPairRank=!0),this.allowShadows==null&&(this.allowShadows=null),this.judgeMainPriority==null&&(this.judgeMainPriority=null),this.judgeMainOrder==null&&(this.judgeMainOrder=null),this.judgeShadowPriority==null&&(this.judgeShadowPriority=null),this.judgeShadowOrder==null&&(this.judgeShadowOrder=null),this.judgeShadowReport==null&&(this.judgeShadowReport=null),this.caMode==null&&(this.caMode=!0),this.showConflicts==null&&(this.showConflicts=!0),this.showShadowConflicts==null&&(this.showShadowConflicts=!0),this.showRanks==null&&(this.showRanks=!0),this.printCAMode==null&&(this.printCAMode=!1),this.pairRankSorter=d.teamRankSorter(this.pairRankSorter),this.judgeRules=new e(this.tournament,this.judgeRules),this.rankFrom==null&&(this.rankFrom={all:!0});if(c){u=this.ballots;for(g=m=0,q=u.length;m<q;g=++m)f=u[g],this.ballots[g]=new b(this,f)}else{v=this.tournament.teams;for(n=0,r=v.length;n<r;n++)k=v[n],this.registerTeam(k);w=this.tournament.judges;for(o=0,s=w.length;o<s;o++)h=w[o],this.registerJudge(h),h.rounds[this.id].participates=!0,this.freeJudges.push(h);x=this.tournament.rooms;for(p=0,t=x.length;p<t;p++)j=x[p],this.registerRoom(j)}}return g.prototype.ballotsPerMatchSolved=function(){return this.ballotsPerMatch!=null?this.ballotsPerMatch:this.tournament.ballotsPerMatch},g.prototype.maxMainJudgesSolved=function(){return this.maxMainJudges!=null?this.maxMainJudges:this.tournament.maxMainJudges},g.prototype.maxShadowJudgesSolved=function(){return this.maxShadowJudges!=null?this.maxShadowJudges:this.tournament.maxShadowJudges},g.prototype.maxPanelSizeSolved=function(){return this.maxPanelSize!=null?this.maxPanelSize:this.tournament.maxPanelSize},g.prototype.pairRankSorterSolved=function(){return this.inheritPairRank?this.tournament.pairRankSorter:this.pairRankSorter},g.prototype.allowShadowsSolved=function(){return this.allowShadows!=null?this.allowShadows:this.tournament.allowShadows},g.prototype.judgeMainPrioritySolved=function(){return this.judgeMainPriority!=null?this.judgeMainPriority:this.tournament.judgeMainPriority},g.prototype.judgeMainOrderSolved=function(){return this.judgeMainOrder!=null?this.judgeMainOrder:this.tournament.judgeMainOrder},g.prototype.judgeShadowPrioritySolved=function(){return this.judgeShadowPriority!=null?this.judgeShadowPriority:this.tournament.judgeShadowPriority},g.prototype.judgeShadowOrderSolved=function(){return this.judgeShadowOrder!=null?this.judgeShadowOrder:this.tournament.judgeShadowOrder},g.prototype.judgeShadowReportSolved=function(){return this.judgeShadowReport!=null?this.judgeShadowReport:this.tournament.judgeShadowReport},g.prototype.getName=function(){var a;return a=this.tournament.rounds.indexOf(this),a!==-1?"Round "+(a+1):"<undefined>"},g.prototype.unpackCycles=function(){var b,c,d,e,f;a.unpackCycles(this.teams,this.tournament.teams),a.unpackCycles(this.judges,this.tournament.judges),a.unpackCycles(this.freeJudges,this.tournament.judges),a.unpackCycles(this.rooms,this.tournament.rooms),a.unpackCycles(this.freeRooms,this.tournament.rooms),e=this.ballots,f=[];for(c=0,d=e.length;c<d;c++)b=e[c],f.push(b.unpackCycles());return f},g.prototype.previousRounds=function(){var a,b,c,d,e,f,g,h;a=[];if(this.rankFrom.all){g=this.tournament.rounds;for(c=0,e=g.length;c<e;c++){b=g[c];if(b===this)break;b.paired&&a.push(b)}}else{h=this.tournament.rounds;for(d=0,f=h.length;d<f;d++)b=h[d],b.paired&&this.rankFrom[b.id]&&a.push(b)}return a},g.prototype.registerJudge=function(a){var b;b=this.id;if(a.rounds[b]==null)return a.rounds[b]={participates:!1},this.judges.push(a)},g.prototype.unregisterJudge=function(b){var c;return c=b.rounds[this.id],c!=null&&c.ballot!=null&&(c.shadow?a.arrayRemove(c.ballot.shadows,b):a.arrayRemove(c.ballot.judges,b)),a.arrayRemove(this.judges,b),a.arrayRemove(this.freeJudges,b)},g.prototype.registerTeam=function(a){var b;b=this.id;if(a.rounds[b]==null)return a.rounds[b]={participates:!0},this.teams.push(a)},g.prototype.unregisterTeam=function(b){return a.arrayRemove(this.teams,b)},g.prototype.registerRoom=function(a){var b;b=this.id;if(a.rounds[b]==null)return a.rounds[b]={participates:!0},this.rooms.push(a),this.freeRooms.push(a)},g.prototype.unregisterRoom=function(b){var c;return c=b.rounds[this.id],c!=null&&c.ballot!=null&&(c.ballot.room=null),a.arrayRemove(this.rooms,b),a.arrayRemove(this.freeRooms,b)},g.prototype.sortByRank=function(a,b){var c;return b==null&&(b=this.previousRounds()),f.calculateStats(a,b),c=this.pairRankSorterSolved().boundComparator(),a.sort(function(a,b){return c(a.stats,b.stats)})},g.prototype.sortBallots=function(){return this.ballots.sort(function(a,b){return a.skillIndex-b.skillIndex})},g.prototype.pairingTeams=function(){var a;return a=this.id,_.filter(this.teams,function(b){return b.rounds[a].participates})},g.prototype.pairTeams=function(a,c,d){var e,f;d==null&&(d=0),f=new b(this),f.teams[0]=a,f.teams[1]=c,f.skillIndex=d;if(a==null||c==null)a==null&&(e=a,a=c,c=e,f.teams[0]=a,f.teams[1]=c),f.locked=!0;return this.ballots.push(f),a&&(a.rounds[this.id].ballot=f,a.stats.paired=!0),c&&(c.rounds[this.id].ballot=f,c.stats.paired=!0),f},g.prototype.pair=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,ba,bb,bc,bd,be,bf,bg,bh,bi,bj,bk,bl,bm,bn,bo,bp,bq,br=this;O=this.pairingTeams(),C=this.previousRounds(),this.sortByRank(O,C),p=this.id,n=!a.manualSides||a.algorithm!==1,d=a.balanceSides,d==null&&(d=!0),B=function(b,c,d){var e,f,g,h,i;d==null&&(d=0),i=!1;if(n&&b!=null&&c!=null){g=b.stats.side,h=c.stats.side,g===h&&a.sides===1&&(e=Math.abs(b.stats.prop-b.stats.opp),f=Math.abs(c.stats.prop-c.stats.opp),e>f?h=1-h:f>e&&(g=1-g));if(g===h)Math.random()>.5&&(i=!0);else if(g===1||h===0)i=!0}return i?br.pairTeams(c,b,d):br.pairTeams(b,c,d)},l=null;if(O.length&1&&a.algorithm!==1)if(!a.algorithm&&(a.randomBye||!C.length))l=O.splice(Math.floor(Math.random()*O.length),1);else{t=Number.MAX_VALUE,q=-1;for(o=R=bl=O.length-1;bl<=0?R<=0:R>=0;o=bl<=0?++R:--R){K=O[o],v=0;for(S=0,V=C.length;S<V;S++){I=C[S];try{K.rounds[I.id].ballot.teams[1]||v++}catch(bs){}}v<t&&(l=K,q=o,t=v)}O.splice(q,1)}if(a.sides===1)for(T=0,W=O.length;T<W;T++)N=O[T],D=N.stats.prop,A=N.stats.opp,A>D?N.stats.side=0:D>A&&(N.stats.side=1);else if(typeof a.sides=="object"){G=a.sides.roundId,m=a.sides.flip;for(U=0,Y=O.length;U<Y;U++)N=O[U],e=N.rounds[G].ballot,e!=null&&e.teams[1]!=null&&(N.stats.side=e.teams[1]===N^m)}a.algorithm===0&&(O=_.shuffle(O)),F={conditions:[],match:function(a,b){var c,d,e,f,g,h,i,j,k;i=this.conditions,f=i.length,e=new Array(f),h=new Array(f);for(d=k=0,j=i.length;k<j;d=++k)c=i[d],e[d]=Number.MAX_VALUE;return g=null,b(function(b){var c,d,f,j,k,l,m;if(b.stats.paired)return;if(b===a)return;d=0,k=!0;for(j=m=0,l=i.length;m<l;j=++m)f=i[j],h[j]=f(a,b),h[j]&&(k=!1),d===0&&(h[j]<e[j]?d=1:h[j]>e[j]&&(d=2));return d===1&&(c=e,e=h,h=c,g=b),k}),g}},a.hardSides&&F.conditions.push(function(a,b){return a.stats.side!=null&&b.stats.side!=null&&a.stats.side===b.stats.side?1:0}),a.minimizeReMeet&&F.conditions.push(function(a,b){var c,d,f;c=0;for(f=0,d=C.length;f<d;f++)I=C[f],e=a.rounds[I.id].ballot,e!=null&&(e.teams[0]===a&&e.teams[1]===b||e.teams[1]===a&&e.teams[0]===b)&&c++;return c}),a.noClubMatches&&F.conditions.push(function(a,b){return a.club!=null&&b.club!=null&&a.club===b.club?1:0}),J=0,u=O.length;switch(a.algorithm){case 1:bm=a.manualPairing;for(bf=0,Z=bm.length;bf<Z;bf++)z=bm[bf],B(z.prop,z.opp);break;case 0:case 2:for(o=bg=0,$=O.length;bg<$;o=++bg){K=O[o];if(K.stats.paired)continue;s=F.match(K,function(a){var b,c,d;for(b=c=d=o+1;d<=u?c<u:c>u;b=d<=u?++c:--c)if(a(O[b]))return}),B(K,s,J++)}break;case 3:j={},P=[];for(o=bh=0,ba=O.length;bh<ba;o=++bh)K=O[o],K.stats.rank=o,w=K.stats.wins,i=j[w],i==null&&(i=j[w]={teams:[],ballots:w},P.push(i)),i.teams.push(K);if(a.evenBrackets===1)for(bi=0,bb=O.length;bi<bb;bi++){K=O[bi],b=0,K.stats.oppRank=0;for(bj=0,bc=C.length;bj<bc;bj++)H=C[bj],c=K.rounds[H.id].ballot,c!=null&&(L=c.teams[0],M=c.teams[1],L===K&&M!=null&&M.stats!=null&&M.stats.rank!=null?(b++,K.stats.oppRank+=M.stats.rank):M===K&&L!=null&&L.stats!=null&&L.stats.rank!=null&&(b++,K.stats.oppRank+=L.stats.rank));b?K.stats.oppRank/=b:K.stats.oppRank=Number.MAX_VALUE}switch(a.evenBrackets){case 0:E=function(a,b,c){return a.teams.sort(function(a,b){return b.stats.rank-a.stats.rank}),a.teams=_.filter(a.teams,function(a){return b>0&&(c==null||c===a.stats.side)?(b--,y.teams.push(a),!1):!0})};break;case 1:E=function(a,b,c){var d,e,f,g;d=o+1,f=P[d],g=[];while(b&&d<Q)e=f.teams,e.sort(function(a,b){return b.stats.oppRank-a.stats.oppRank}),f.teams=e=_.filter(e,function(d){return b>0&&(c==null||c!==d.stats.side)?(b--,a.teams.push(d),!1):!0}),g.push(f=P[++d]);return g}}P.sort(function(a,b){return b.ballots-a.ballots}),Q=P.length;for(o=bk=0,bd=P.length;bk<bd;o=++bk){i=P[o],g=h=k=0,f=i.teams.length;if(!f)continue;bn=i.teams;for(bp=0,be=bn.length;bp<be;bp++){K=bn[bp];switch(K.stats.side){case 0:h++;break;case 1:g++;break;case void 0:k++}}y=P[o+1];if(y!=null){a.hardSides?g>h+k?E(i,g-h-k,1):h>g+k?E(i,h-g-k,0):f&1&&E(i,1):f&1&&E(i,1),r=o+1;while(y!=null&&y.length===0)y=P[++r];y!=null&&(f=i.teams.length,x=y.teams,f<a.matchesPerBracket*2&&(i.teams.forEach(function(a){return x.push(a)}),i.teams.length=0))}i.teams.sort(function(a,b){return a.stats.rank-b.stats.rank}),bo=i.teams;for(bq=0,X=bo.length;bq<X;bq++){K=bo[bq];if(K.stats.paired)continue;s=F.match(K,function(a){var b,c,d;c=i.teams;for(d=c.length-1;d>=0;d+=-1){b=c[d];if(a(b))return}}),B(K,s,J++)}}}return l!=null&&B(l,null,J),this.paired=!0,this.assignRooms(),a.shuffleRooms&&a.algorithm&&this.shuffleRooms(),this.assignJudges()},g.prototype.assignJudges=function(){var a,b,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I;j=this.id,f=_.sortBy(_.shuffle(_.filter(this.ballots,function(a){return!a.locked&&a.teams[0]&&a.teams[1]})),function(a){return a.skillIndex});for(x=0,B=f.length;x<B;x++){d=f[x],G=d.judges;for(y=0,C=G.length;y<C;y++)k=G[y],k.rounds[j].ballot=null;H=d.shadows;for(z=0,D=H.length;z<D;z++)k=H[z],k.rounds[j].ballot=null;d.judges=[],d.shadows=[]}l=_.shuffle(_.filter(this.judges,function(a){var b;return b=a.rounds[j],b.participates&&!b.ballot&&a.rank!==c.shadowRank})),v=_.shuffle(_.filter(this.judges,function(a){var b;return b=a.rounds[j],b.participates&&!b.ballot&&a.rank===c.shadowRank})),h=this.freeJudges=[],l.sort(function(a,b){return a.rank-b.rank}),q=f.length,r=l.length;if(r<q){w=q-r,v.length<w&&(w=v.length);for(i=A=0;0<=w?A<w:A>w;i=0<=w?++A:--A)l.push(v[i]);v.splice(0,w)}e=this.ballotsPerMatchSolved(),s=this.maxPanelSizeSolved(),p=this.maxShadowJudgesSolved(),o=this.maxMainJudgesSolved(),a=function(a,b,c){var d;return c==null&&(c=!1),c?b.shadows.push(a):b.judges.push(a),d=a.rounds[j],d.ballot=b,d.shadow=c},g=function(a,b){return 0},u=this.judgeRules,m=this.tournament.judgeRules,b=function(b,c,e,g,h){var i,l,n,o,p,r,s,t,v,w,x,y,z;for(w=0,t=f.length;w<t;w++)d=f[w],d.maxJudgeCount=h(d),d.judgeCount=0;r=0,n=p=b.length;while(n&&r!==q){r=0,y=c?-1:1;for(y>0?(x=0,v=f.length):x=f.length-1;y>0?x<v:x>=0;x+=y){d=f[x],d.maxJudgeCount<=d.judgeCount?r++:(d.judgeCount++,n--);if(!n)break}}i=1,z=[];while(i)i=0,z.push(function(){var c,h,n,p,q,r;q=e?-1:1,r=[];for(q>0?(n=0,c=f.length):n=f.length-1;q>0?n<c:n>=0;n+=q){d=f[n];if(d.judgeCount<=0)continue;l=null,o=Number.MAX_VALUE;for(p=0,h=b.length;p<h;p++){k=b[p];if(k.rounds[j].ballot==null){s=u.compatibilityFactor(k,d,m);if(s<o){o=s,l=k;if(!s)break}}}a(l,d,g),d.judgeCount--,r.push(i++)}return r}());return z},n=e,s<n&&(n=s),o<n&&(n=o),b(l,this.judgeMainOrderSolved(),this.judgeMainPrioritySolved(),!1,function(){return n}),l.forEach(function(a){if(a.rounds[j].ballot==null)return h.push(a)}),t=this.judgeShadowReportSolved(),b(t?h.concat(v):v,this.judgeShadowOrderSolved(),this.judgeShadowPrioritySolved(),!0,function(a){var b;return b=s-a.judges.length,p<b?p:b}),t&&(h.length=0,l.forEach(function(a){if(a.rounds[j].ballot==null)return h.push(a)})),v.forEach(function(a){if(a.rounds[j].ballot==null)return h.push(a)}),I=[];for(F=0,E=f.length;F<E;F++)d=f[F],delete d.maxJudgeCount,I.push(delete d.judgeCount);return I},g.prototype.assignRooms=function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n;b=_.filter(this.ballots,function(a){return!a.locked}),g=[];for(h=0,k=b.length;h<k;h++)a=b[h],a.room!=null&&g.push(a.room);n=this.freeRooms;for(i=0,l=n.length;i<l;i++)f=n[i],g.push(f);e=g.length,d=this.id;for(c=j=0,m=b.length;j<m;c=++j){a=b[c];if(c>=e)break;f=g[c],f.rounds[d].ballot=a,a.room=f}return g.splice(0,b.length),this.freeRooms=g},g.prototype.shuffleRooms=function(){var a,b,c,d,e,f,g,h,i,j,k,l,m;e=this.id,g=_.filter(this.ballots,function(a){return a.locked}),c=_.filter(this.ballots,function(a){return!a.locked}),i=_.map(c,function(a){return a.room}),c=_.shuffle(c),d=0,l=this.ballots,m=[];for(f=j=0,k=l.length;j<k;f=++j){a=l[f];if(a.locked)continue;b=c[d],h=i[d],h!=null&&(h.rounds[e].ballot=b),b.room=h,this.ballots[f]=b,m.push(d++)}return m},g.prototype.shuffle=function(){var a,b,c,d,e,f,g,h,i,j,k,l,m;c=[],e=[],l=this.ballots;for(f=0,i=l.length;f<i;f++)a=l[f],a.teams[0]!=null&&a.teams[1]!=null?e.push(a):c.push(a);e=_.shuffle(e);for(b=g=0,j=e.length;g<j;b=++g)a=e[b],this.ballots[b]=a;d=e.length,m=[];for(b=h=0,k=c.length;h<k;b=++h)a=c[b],m.push(this.ballots[b+d]=a);return m},g.prototype.toJSON=function(){var b,c,d,e,f,g;b=a.copyObject(this,["tournament"]),b.teams=a.packCycles(this.teams,this.tournament.teams),b.judges=a.packCycles(this.judges,this.tournament.judges),b.freeJudges=a.packCycles(this.freeJudges,this.tournament.judges),b.rooms=a.packCycles(this.rooms,this.tournament.rooms),b.freeRooms=a.packCycles(this.freeRooms,this.tournament.rooms),b.rankFrom={all:this.rankFrom.all},g=this.tournament.rounds;for(e=0,f=g.length;e<f;e++)c=g[e],d=this.rankFrom[c.id],d!=null&&(b.rankFrom[id]=d);return b},g.prototype.destroy=function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n;a=this.id,k=this.tournament.teams;for(e=0,h=k.length;e<h;e++)d=k[e],delete d.rounds[a];l=this.tournament.judges;for(f=0,i=l.length;f<i;f++)b=l[f],delete b.rounds[a];m=this.tournament.rooms,n=[];for(g=0,j=m.length;g<j;g++)c=m[g],n.push(delete c.rounds[a]);return n},g.allAlgos=[0,1,2,3],g.initialAlgos=[0,1],g.algoName=["Random","Manual","High-High Power Pairing","High-Low Power Pairing"],g}()})}).call(this)