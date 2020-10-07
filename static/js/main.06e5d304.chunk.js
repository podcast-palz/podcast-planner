(this.webpackJsonpproject6=this.webpackJsonpproject6||[]).push([[0],{43:function(e,t,a){e.exports=a.p+"static/media/logo.545e9040.png"},48:function(e,t,a){e.exports=a(89)},53:function(e,t,a){},54:function(e,t,a){},75:function(e,t,a){},76:function(e,t,a){},77:function(e,t,a){},78:function(e,t,a){},84:function(e,t,a){},85:function(e,t,a){},88:function(e,t,a){},89:function(e,t,a){"use strict";a.r(t);var n,r=a(0),l=a.n(r),s=a(40),i=a.n(s),c=(a(53),a(47)),o=a(8),u=a(9),m=a(11),d=a(10),p=(a(54),a(41)),h=a(12),f=a(42),g=a.n(f),y=(n={},Object(h.a)(n,"400","400 - There is something wrong on your end, please try again"),Object(h.a)(n,"401","401 - Wrong API key or problems with account"),Object(h.a)(n,"404","404 - No results found, please try again"),Object(h.a)(n,"429","429 - API quota exceeded - please try again later"),Object(h.a)(n,"500","500 - Unexpected server errors - please try again later"),n);function v(e,t){return g()({url:"https://listen-api.listennotes.com/api/v2/"+e,params:Object(p.a)({},t),headers:Object(h.a)({},"X-ListenAPI-Key","d370e5f11d0a4b14956d88517e75fd8a")})}function E(e){console.log(typeof e);var t=e.response.status,a="Unknown error, please refresh and try again";for(var n in y)t==n&&(a=y[n]);return a}var b=a(24),P=a.n(b);a(71),a(73);P.a.initializeApp({apiKey:"AIzaSyBwLq_-FMp8lGW3_AVNC71e_tUWM6vefR8",authDomain:"podcast-planner-fde21.firebaseapp.com",databaseURL:"https://podcast-planner-fde21.firebaseio.com",projectId:"podcast-planner-fde21",storageBucket:"podcast-planner-fde21.appspot.com",messagingSenderId:"457751978532",appId:"1:457751978532:web:5196b0b12f491402fcaeb1"});var N=P.a,S=a(18),k=a(2);a(75);function j(e){var t=e.setUserTime,a=e.userTime,n=e.selectGenre,r=e.genres,s=e.handleSubmit;return l.a.createElement("form",{action:"submit",className:"form"},l.a.createElement("label",{htmlFor:"time"},"Select Podcast Duration"),l.a.createElement("input",{onChange:t,type:"range",name:"time",id:"time",min:"0",max:"120",value:a}),l.a.createElement("span",null,a," minute(s)"),l.a.createElement("label",{htmlFor:"genre"}),l.a.createElement("select",{onChange:n,name:"genre",id:"genre"},l.a.createElement("option",{value:""},"Select Genre \u2b07"),r.map((function(e){return l.a.createElement("option",{className:"options",key:e.id,value:e.id},e.name)}))),l.a.createElement("button",{onClick:s,type:"submit",className:"headerButton"},"Submit"))}a(76);var _=a(43),T=a.n(_);a(77);function O(e){var t=e.loading;return l.a.createElement("div",{className:"loading-bar ".concat(t?"":"disabled")})}var C=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){var e=this.props,t=e.setUserTime,a=e.userTime,n=e.selectGenre,r=e.genres,s=e.handleSubmit,i=e.loading;return l.a.createElement("header",null,l.a.createElement("nav",{className:"navBar"},l.a.createElement("p",null,"Podcast Planner")),l.a.createElement("div",{className:"flexContainer wrapper"},l.a.createElement("div",{className:"containerOne"},l.a.createElement("img",{src:T.a,className:"logo"})),l.a.createElement("div",{className:"containerTwo"},l.a.createElement("h1",null,"Podcast Planner"),l.a.createElement("p",null,"Welcome to the Podcast Planner! Whether you're walking, hiking, road tripping or just plain hanging out, use this app to select podcast durations based on your journey time and create playlists!")),l.a.createElement("div",{className:"containerThree"},l.a.createElement(j,{setUserTime:t,userTime:a,selectGenre:n,genres:r,handleSubmit:s}))),l.a.createElement(O,{loading:i}),l.a.createElement("div",{className:"shape"}))}}]),a}(r.Component);a(78);function w(e){var t=e.podcasts,a=e.add,n=(e.isStarted,e.sort);return l.a.createElement("div",null,l.a.createElement("h2",{className:"podcastHeading"},"Your Podcast Selections:"),l.a.createElement("div",{className:"wrapper"},l.a.createElement("div",{className:"sortContainer"},l.a.createElement("div",{className:"childContainer"},l.a.createElement("p",{className:"sortTitle"},"Sort by Podcast Length:")),l.a.createElement("div",{className:"childTwoContainer"},l.a.createElement("button",{className:"sorting",onClick:function(){return n("asc")}},"Ascending \u2b06"),l.a.createElement("button",{className:"sorting",onClick:function(){return n("desc")}},"Descending \u2b07"))),l.a.createElement(l.a.Fragment,null,l.a.createElement("ul",{className:"podcastList"},t.map((function(e){return l.a.createElement("li",{className:"podcast",key:e.id},function(e){var t=e.audio_length_sec,n=(e.id,e.title_original),r=e.description_original,s=e.thumbnail,i=e.podcast.title_original,c=Math.round(parseInt(t/60)),o=r.split(" ").slice(0,20).join(" ");return o+="...",l.a.createElement(l.a.Fragment,null,l.a.createElement("h2",null,i),l.a.createElement(S.b,{to:{pathname:"/podcast/".concat(e.id),query:{podcast:e}}},l.a.createElement("img",{src:s,alt:""})),l.a.createElement("h3",null,n),l.a.createElement("p",null,"Length: ",c," minutes"),l.a.createElement("p",null,o),l.a.createElement("button",{onClick:function(){return a(e)}},"Add To Playlist"))}(e))}))))))}var I=a(15),A=a(16),x=(a(84),function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){var e;return Object(o.a)(this,a),(e=t.call(this)).state={currentTitle:""},e}return Object(u.a)(a,[{key:"componentDidMount",value:function(){this.setState({currentTitle:this.props.playlist.playlist_title})}},{key:"render",value:function(){var e=this,t=this.props,a=t.playlist,n=(t.title,t.removeItem),r=t.remove,s=t.setActive,i=t.current,c=(t.rename,t.updateName),o=t.userTime,u=a.key,m=a.playlist_title,d=[];return l.a.createElement("li",{key:u,className:"Playlist ".concat(u===i?"selected":""),onClick:function(){return s(u,e.state.currentTitle)}},l.a.createElement("h3",null,l.a.createElement("label",{className:"sr-only",htmlFor:u},m),l.a.createElement("input",{onChange:c,onKeyDown:function(e){"Enter"===e.key&&document.getElementById(a.key).blur()},type:"text",id:u,value:m,placeholder:"Untitled Playlist"})),l.a.createElement("button",{className:"Playlist-delete",onClick:function(){return r(u)}},l.a.createElement(I.a,{icon:A.c})),l.a.createElement("ul",null,a.data.map((function(e){if(e.data&&"playlist_title"!==e.key){var t=e.data,a=t.title_original,r=t.listennotes_url,s=t.audio_length_sec,i=parseInt(s)/60;return d.push(i),l.a.createElement("li",{key:e.key},l.a.createElement("a",{href:r,rel:"noreferrer"},a),l.a.createElement("button",{className:"remove",onClick:function(){return n(e.key)}},l.a.createElement(I.a,{icon:A.d})))}})),0!=d.length?l.a.createElement("li",null,Math.round(d.reduce((function(e,t){return e+t})))," / ",o," Minutes"):null))}}]),a}(r.Component));a(85);function F(e){var t=e.playlists,a=e.remove,n=e.removeItem,r=e.createPlaylist,s=e.setActive,i=e.current,c=e.rename,o=e.updateName,u=e.title,m=e.userTime;return l.a.createElement(l.a.Fragment,null,l.a.createElement("input",{type:"checkbox",name:"hamburger",id:"hamburger"}),l.a.createElement("label",{htmlFor:"hamburger"},l.a.createElement(I.a,{icon:A.a})),l.a.createElement("div",{className:"SideMenu"},l.a.createElement("h2",null,"Your Playlists"),l.a.createElement("button",{onClick:function(){return r(0)}},l.a.createElement(I.a,{icon:A.b})),l.a.createElement("ul",null,t.map((function(e){return l.a.createElement(x,{playlist:e,remove:a,removeItem:n,setActive:s,current:i,rename:c,updateName:o,title:u,userTime:m})})))))}var U=a(45),B=(a(88),function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return l.a.createElement("footer",null,l.a.createElement("div",{className:"footerBar"},l.a.createElement("div",{className:"wrapper container"},l.a.createElement("div",null,l.a.createElement(U.VerticleButton,{StopPosition:0,ShowAtPosition:130,EasingType:"easeOutCubic",AnimationDuration:500,ContainerClassName:"ScrollUpButton__Container",TransitionClassName:"ScrollUpButton__Toggled",style:{},ToggledStyle:{}})),l.a.createElement("div",{className:"containerDiv"},l.a.createElement("p",null," Podcast Planner!  Start Lisening Today "),l.a.createElement("p",{className:"junoMade"},"Podcast Planner Made by Nathan Kanigsberg, Paige Freeman-Cyopeck, Reda Waseem, & Alex Gould at Juno College 2020 ")))))}}]),a}(r.Component)),L=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(o.a)(this,a),t.call(this)}return Object(u.a)(a,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("h1",null,"Podcastinfo"))}}]),a}(r.Component),M=a(46),D=a.n(M),G=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){var e;return Object(o.a)(this,a),(e=t.call(this)).selectGenre=function(t){e.setState({genre:t.target.value,genreString:t.target[t.target.selectedIndex].text})},e.setUserTime=function(t){e.setState({userTime:t.target.value})},e.handleSubmit=function(t){t.preventDefault(),e.state.genre?e.getPodcasts():D()("Please select a genre!")},e.removePlaylistItem=function(t){var a=N.database().ref(),n=e.state,r=n.uid,l=n.currentPlaylist;a.child("users").child(r).child(l).child(t).remove()},e.removePlaylist=function(t){var a=N.database().ref(),n=e.state,r=n.uid;n.userPlaylists;a.child("users").child(r).child(t).remove(),e.setState({currentPlaylist:""})},e.addToPlaylist=function(t){var a=N.database().ref(),n=e.state,r=n.uid,l=n.userPlaylists,s=n.currentPlaylist;n.playlistName;l.length?a.child("users").child(r).child(s).push(t):e.createPlaylist(t)},e.createPlaylist=function(t){var a=N.database().ref(),n=e.state,r=n.uid,l=(n.currentPlaylist,n.playlistName,a.child("users").child(r).push().key);e.setState({currentPlaylist:l},(function(){a.child("users").child(r).child(l).set({playlist_title:"Untitled Playlist"}),a.child("users").child(r).child(l).push(t)}))},e.setActivePlaylist=function(t,a){e.setState({currentPlaylist:t,playlistName:a})},e.renamePlaylist=function(t){var a=N.database().ref(),n=e.state,r=n.uid,l=n.currentPlaylist,s=n.playlistName;a.child("users").child(r).child(l).child("playlist_title").set(s)},e.updatePlaylistName=function(t){var a=t.target.value;e.setState({playlistName:a},e.renamePlaylist)},e.nextPage=function(t){e.setState({offset:e.state.offset+10}),e.getPodcasts()},e.prevPage=function(t){e.setState({offset:e.state.offset-10}),e.getPodcasts()},e.sortPodcasts=function(t){var a=Object(c.a)(e.state.podcasts);a.sort((function(e,a){return"asc"===t?parseFloat(e.audio_length_sec)-parseFloat(a.audio_length_sec):parseFloat(a.audio_length_sec)-parseFloat(e.audio_length_sec)})),e.setState({podcasts:a})},e.state={genres:[],genre:"",genreString:"",podcasts:[],userTime:20,isStarted:!1,isLoading:!1,userPlaylist:[],uid:"",userPlaylists:[],currentPlaylist:"",playlistName:"",offset:10},e}return Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=this;v("genres",{top_level_only:1}).then((function(t){e.setState({genres:t.data.genres})})).catch((function(e){alert(E(e))})),N.database().ref().on("value",(function(t){var a=[],n=t.val();if(n){var r=n.users[e.state.uid];if(r){for(var l in r){e.state.currentPlaylist||e.setState({currentPlaylist:l});var s=[];for(var i in r[l])"playlist_title"!==i&&s.push({key:i,data:r[l][i]});a.push({key:l,playlist_title:r[l].playlist_title,data:s})}e.setState({userPlaylists:a})}else e.setState({userPlaylists:[]})}else e.setState({userPlaylists:[]})})),N.auth().signInAnonymously().catch((function(e){e.code,e.message})),N.auth().onAuthStateChanged((function(t){if(t){var a=t.uid;e.setState({uid:a})}}))}},{key:"getPodcasts",value:function(){var e=this;this.setState({isStarted:!0,isLoading:!0});var t=this.state,a=t.genre,n=t.genreString,r=t.userTime,l=t.offset;v("search",{q:n,len_min:4,len_max:parseInt(r)+5,offset:l,genre_ids:a,language:"English"}).then((function(t){e.setState({podcasts:t.data.results,isLoading:!1})})).catch((function(e){alert(E(e))}))}},{key:"render",value:function(){var e=this,t=this.state,a=t.isLoading,n=t.podcasts,r=t.userPlaylists,s=t.userTime,i=t.genres,c=t.currentPlaylist,o=t.playlistName;t.isStarted;return l.a.createElement(S.a,{basename:"/podcast-planner"},l.a.createElement("div",{className:"App"},l.a.createElement(k.a,{exact:!0,path:"/",render:function(t){return l.a.createElement(C,Object.assign({},t,{setUserTime:e.setUserTime,userTime:s,selectGenre:e.selectGenre,genres:i,handleSubmit:e.handleSubmit,loading:a}))}}),a?l.a.createElement("p",{className:"loading"},"Loading..."):l.a.createElement("div",{className:"podcastContainer"},l.a.createElement(k.a,{exact:!0,path:"/",render:function(t){return l.a.createElement(w,Object.assign({},t,{podcasts:n,add:e.addToPlaylist,sort:e.sortPodcasts}))}}),l.a.createElement("div",{class:"page wrapper"},0!=this.state.podcasts.length?l.a.createElement(l.a.Fragment,null,this.state.offset>=20?l.a.createElement("button",{className:"pageButton",onClick:function(){return e.prevPage()}},"\u2b05 Previous Page"):null,l.a.createElement("button",{className:"pageButton",onClick:function(){return e.nextPage()}},"Next Page \u27a1")):null)),l.a.createElement(k.a,{path:"/podcast/:podcastID",component:L}),l.a.createElement(k.a,{exact:!0,path:"/",render:function(t){return l.a.createElement(F,Object.assign({},t,{playlists:r,remove:e.removePlaylist,removeItem:e.removePlaylistItem,createPlaylist:e.createPlaylist,setActive:e.setActivePlaylist,current:c,rename:e.renamePlaylist,updateName:e.updatePlaylistName,userTime:e.state.userTime,title:o}))}}),l.a.createElement(k.a,{path:"/",render:function(e){return l.a.createElement(B,e)}})))}}]),a}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(G,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[48,1,2]]]);
//# sourceMappingURL=main.06e5d304.chunk.js.map