(function(e){function t(t){for(var s,a,n=t[0],d=t[1],l=t[2],m=0,u=[];m<n.length;m++)a=n[m],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&u.push(o[a][0]),o[a]=0;for(s in d)Object.prototype.hasOwnProperty.call(d,s)&&(e[s]=d[s]);c&&c(t);while(u.length)u.shift()();return r.push.apply(r,l||[]),i()}function i(){for(var e,t=0;t<r.length;t++){for(var i=r[t],s=!0,n=1;n<i.length;n++){var d=i[n];0!==o[d]&&(s=!1)}s&&(r.splice(t--,1),e=a(a.s=i[0]))}return e}var s={},o={app:0},r=[];function a(t){if(s[t])return s[t].exports;var i=s[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=e,a.c=s,a.d=function(e,t,i){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)a.d(i,s,function(t){return e[t]}.bind(null,s));return i},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var n=window["webpackJsonp"]=window["webpackJsonp"]||[],d=n.push.bind(n);n.push=t,n=n.slice();for(var l=0;l<n.length;l++)t(n[l]);var c=d;r.push([0,"chunk-vendors"]),i()})({0:function(e,t,i){e.exports=i("56d7")},"019f":function(e,t,i){},"0e5b":function(e,t,i){},"19cf":function(e,t,i){"use strict";i("8cde")},"1e88":function(e,t,i){},"26de":function(e,t,i){},"290a":function(e,t,i){"use strict";i("a667")},"2e7b":function(e,t,i){},3422:function(e,t,i){"use strict";i("2e7b")},3673:function(e,t,i){},"4ce9":function(e,t,i){"use strict";i("9e17")},"56d7":function(e,t,i){"use strict";i.r(t);var s=i("2b0e"),o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("app-navbar"),i("main",{class:{mobile:e.isMobileMode}},[i("router-view")],1)],1)},r=[],a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("nav",{attrs:{id:"navbar"}},[i("div",{staticClass:"nav-home"},[i("router-link",{attrs:{to:"/",exact:""}},[i("img",{staticClass:"logo-title",attrs:{src:e.isMobileMode?"/logo-mobile.PNG":"/logo.PNG"}})])],1),i("div",{staticClass:"nav-auth"},[i("router-link",{attrs:{to:"/my-account",exact:""}},[i("div",{staticClass:"icon-wrapper"},[i("font-awesome-icon",{attrs:{icon:"user-circle"}}),e.isLoggedIn?e._e():i("span",{staticClass:"hidden-text login"},[e._v("Log in")]),e.isLoggedIn?i("span",{staticClass:"username"},[e._v(e._s(e.username))]):e._e()],1)]),i("div",{staticClass:"icon-wrapper"},[e.isLoggedIn?i("font-awesome-icon",{attrs:{icon:"sign-out-alt",alt:"Log out"},on:{click:e.destroySession}}):e._e(),e.isLoggedIn?i("span",{staticClass:"hidden-text logout",on:{click:e.destroySession}},[e._v("Log out")]):e._e()],1)],1)])},n=[],d=i("2f62"),l={computed:{...Object(d["b"])(["isMobileMode"]),isLoggedIn(){return this.$store.getters.isAuthenticated},username(){return this.$store.state.auth.name}},methods:{async destroySession(){window.sessionStorage.clear(),window.location.reload()}}},c=l,m=(i("3422"),i("2877")),u=Object(m["a"])(c,a,n,!1,null,"f3e4bc3e",null),h=u.exports,v={components:{"app-navbar":h},data(){return{windowWidth:window.innerWidth}},mounted(){window.addEventListener("resize",()=>{this.windowWidth=window.innerWidth,this.$store.commit("isMobile",this.isMobile)})},computed:{isMobile(){return this.windowWidth<=768},...Object(d["b"])(["isMobileMode"])}},p=v,f=Object(m["a"])(p,o,r,!1,null,null,null),g=f.exports,I=i("8c4f"),b=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("h1",{staticClass:"section-header"},[e._v("MOVIES")]),i("div",{staticClass:"all-movies"},e._l(e.movieList,(function(e){return i("movie-item",{key:e.id,attrs:{id:e.id,title:e.title,imageUrl:e.imageUrl}})})),1)])},T=[],w=i("bc3a"),_=i.n(w),y=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("base-card",[i("h3",{staticClass:"movie-title"},[e._v(e._s(e.title))]),i("img",{staticClass:"movie-img",attrs:{src:e.imageUrl}}),i("base-button",{attrs:{link:"",to:e.movieDetails}},[e._v("+ info")])],1)},Z=[],k={props:["id","title","imageUrl"],computed:{movieDetails(){return this.$route.path+"/"+this.id}}},O=k,S=(i("8edb"),Object(m["a"])(O,y,Z,!1,null,null,null)),C=S.exports,M={components:{movieItem:C},data(){return{movieList:[]}},beforeMount(){this.loadMovies()},methods:{loadMovies(){_.a.get("http://localhost:3000/movies").then(e=>{this.movieList=e.data}).catch(e=>console.log(e))}}},E=M,$=(i("ffbd"),Object(m["a"])(E,b,T,!1,null,null,null)),A=$.exports,j=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("h1",{staticClass:"section-header"},[e._v(e._s(e.title))]),i("div",{staticClass:"movie-details"},[i("div",{staticClass:"movie-cover"},[i("img",{staticClass:"movie-img",attrs:{src:e.imageUrl}})]),i("div",{staticClass:"movie-sessions"},[i("p",{staticClass:"movie-description"},[e._v(e._s(e.description))]),i("filters-bar",{attrs:{sessions:e.sessions,title:e.title,imageUrl:e.imageUrl},on:{"save-session":e.saveSession}})],1)])])},U=[],P=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"filters"}},[i("span",{staticClass:"select-tickets"},[e._v("Select your ticket for this week:")]),i("form",{on:{submit:function(t){return t.preventDefault(),e.saveSession(t)}}},[i("select",{directives:[{name:"model",rawName:"v-model",value:e.day,expression:"day"}],on:{change:[function(t){var i=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.day=t.target.multiple?i:i[0]},function(t){return e.selectedDay()}]}},[i("option",{attrs:{value:"",disabled:"",selected:""}},[e._v("Select day")]),i("option",{attrs:{value:"1"}},[e._v("Monday")]),i("option",{attrs:{value:"2"}},[e._v("Tuesday")]),i("option",{attrs:{value:"3"}},[e._v("Wednesday")]),i("option",{attrs:{value:"4"}},[e._v("Thursday")]),i("option",{attrs:{value:"5"}},[e._v("Friday")]),i("option",{attrs:{value:"6"}},[e._v("Saturday")]),i("option",{attrs:{value:"0"}},[e._v("Sunday")])]),i("select",{directives:[{name:"model",rawName:"v-model",value:e.sessionId,expression:"sessionId"}],on:{change:[function(t){var i=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.sessionId=t.target.multiple?i:i[0]},function(t){return e.selectedSession()}]}},[i("option",{attrs:{value:"",disabled:"",selected:""}},[e._v("Select session")]),0===e.filteredSessions.length?i("option",{attrs:{value:"",disabled:""}},[e._v("No sessions available")]):e._e(),e._l(e.filteredSessions,(function(t){return i("option",{key:t.id,attrs:{id:t.id},domProps:{value:t.id}},[e._v(" "+e._s(t.timeFormatted)+" ")])}))],2),i("p",{staticClass:"auth-errors"},[e._v(e._s(e.errorMessage))]),i("base-button",[e._v("BOOK TICKET")])],1)])},x=[],D={props:{sessions:{type:Array},title:{type:String},imageUrl:{type:String}},data(){return{day:"",sessionId:"",sessionTime:"",filteredSessions:[],sameDayChecker:[],selectionError:{noSession:null,differentDay:!1},errorMessage:""}},updated(){0===this.sameDayChecker.length?this.selectionError.differentDay=!0:(this.selectionError.differentDay=!1,this.sessionTime=this.sameDayChecker.time),""===this.sessionId?this.selectionError.noSession=!0:this.selectionError.noSession=!1},methods:{selectedDay(){this.filteredSessions=[],this.sameDayChecker=[],this.errorMessage="",this.filterSessions()},selectedSession(){this.sameDayChecker=this.filteredSessions.find(e=>e.id===this.sessionId),this.errorMessage=""},filterSessions(){var e=this;this.sessions.map((function(t){let i=new Date(t.time).getDay();i==e.day&&e.filteredSessions.push(t),e.formatTime()}))},formatTime(){this.filteredSessions.map((function(e){let t=e.time.slice(11,16);e.timeFormatted=t}))},saveSession(){const e={sessionId:this.sessionId,sessionTime:this.sessionTime,movieTitle:this.title,imageUrl:this.imageUrl};this.$emit("save-session",e);let t="";this.selectionError.noSession||this.selectionError.differentDay||null==this.selectionError.noSession?this.errorMessage="Please, select a valid session":(t=this.$store.getters.isAuthenticated?"/checkout":"/auth?redirect=checkout",this.$router.replace(t))}}},L=D,F=(i("e372"),Object(m["a"])(L,P,x,!1,null,"082f665a",null)),N=F.exports,B={data(){return{id:this.$route.params.id,selectedMovie:{}}},components:{filtersBar:N},computed:{sessions(){return this.selectedMovie.sessions},title(){return this.selectedMovie.title},description(){return this.selectedMovie.description},imageUrl(){return this.selectedMovie.imageUrl}},created(){this.loadMovie()},methods:{loadMovie(){_.a.get("http://localhost:3000/movies/"+this.id).then(e=>{this.selectedMovie=e.data}).catch(e=>console.log(e))},saveSession(e){this.$store.dispatch("saveSession",e)}}},V=B,q=(i("6aee"),Object(m["a"])(V,j,U,!1,null,null,null)),W=q.exports,J=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"auth"}},[i("base-card",{class:{mobile:e.isMobileMode}},["pending"==e.orderStatus?i("div",{staticClass:"complete-order-message"},[i("p",[e._v("Please, log in or sign up to complete your order")])]):e._e(),i("form",{on:{submit:function(t){return t.preventDefault(),e.submitForm(t)}}},[i("div",{ref:"auth",staticClass:"auth-panel"},[i("div",{staticClass:"login-tab",class:{active:1===e.selectedTab},on:{click:function(t){return e.changeViewMode("login",1)}}},[e._v(" "+e._s(e.login)+" ")]),i("div",{staticClass:"signup-tab",class:{active:2===e.selectedTab},on:{click:function(t){return e.changeViewMode("signup",2)}}},[e._v(" "+e._s(e.signup)+" ")])]),2===e.selectedTab?i("div",{staticClass:"form-control"},[i("label",{attrs:{for:"name"}},[e._v("Name")]),i("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.name,expression:"name",modifiers:{trim:!0}}],attrs:{type:"text",id:"name"},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})]):e._e(),i("div",{staticClass:"form-control"},[i("label",{attrs:{for:"email"}},[e._v("E-Mail")]),i("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.email,expression:"email",modifiers:{trim:!0}}],attrs:{type:"email",id:"email"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})]),i("div",{staticClass:"form-control"},[i("label",{attrs:{for:"password"}},[e._v("Password")]),i("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.password,expression:"password",modifiers:{trim:!0}}],attrs:{type:"password",id:"password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})]),2===e.selectedTab?i("div",{staticClass:"form-control"},[i("label",{attrs:{for:"password"}},[e._v("Repeat password")]),i("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.repeatPassword,expression:"repeatPassword",modifiers:{trim:!0}}],attrs:{type:"password",id:"repeatPassword"},domProps:{value:e.repeatPassword},on:{input:function(t){t.target.composing||(e.repeatPassword=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})]):e._e(),i("div",{staticClass:"auth-errors"},[i("p",[e._v(e._s(e.emptyFieldsError))]),i("p",[e._v(e._s(e.authControllerError))]),2===e.selectedTab?i("p",[e._v(e._s(e.signupError))]):e._e()]),i("div",{staticClass:"button-wrapper"},[i("button",{staticClass:"auth-button"},[e._v(e._s(e.buttonText))])])])])],1)},z=[],G={data(){return{name:"",email:"",password:"",repeatPassword:"",formIsValid:!0,loginError:"",signupError:"",emptyFieldsError:null,viewMode:"login",selectedTab:1}},mounted(){this.loginError,this.signupError,this.$store.commit("clearErrorMessage",null)},updated(){""!=this.email&&""!=this.password&&(this.emptyFieldsError="")},computed:{...Object(d["b"])(["isMobileMode"]),login(){return"Log in"},signup(){return"Sign up"},authControllerError(){return this.$store.state.auth.err},buttonText(){return"login"===this.viewMode?this.login:this.signup},orderStatus(){return this.$store.state.orders.orderStatus}},methods:{changeViewMode(e,t=0){this.viewMode=e,t>0&&(this.selectedTab=t),this.name="",this.email="",this.password="",this.repeatPassword="",this.signupError="",this.emptyFieldsError="",this.$store.commit("clearErrorMessage",null)},async submitForm(){this.$store.commit("clearErrorMessage",null);try{if("login"===this.viewMode)""===this.email||""===this.password?(this.formIsValid=!1,this.emptyFieldsError="All the fields need to be filled",this.$store.commit("clearErrorMessage",null)):await this.$store.dispatch("login",{email:this.email,password:this.password});else{if(this.formIsValid=!0,""===this.name||""===this.email||""===this.password||""===this.repeatPassword)return this.formIsValid=!1,void(this.emptyFieldsError="All the fields need to be filled");if(this.name.length<3)return this.formIsValid=!1,void(this.signupError="The name entered is too short");if(this.password.length<6)return this.formIsValid=!1,void(this.signupError="The password must contain a minimum of 6 characters");if(this.password!=this.repeatPassword)return this.formIsValid=!1,void(this.signupError="The passwords entered don't match. Please, try again");if(!this.email.includes("@"))return this.formIsValid=!1,void(this.signupError="Please enter a valid e-mail");if(this.password!=this.repeatPassword)return this.formIsValid=!1,void(this.signupError="The passwords entered don't match. Please, try again");await this.$store.dispatch("signup",{name:this.name,email:this.email,password:this.password})}}catch(e){console.log(e)}this.redirectAfterAuth()},async redirectAfterAuth(){let e=this.$store.state.orders.orderStatus;console.log(this.authControllerError),"string"!=typeof this.authControllerError&&"All the fields need to be filled"!=this.emptyFieldsError&&("pending"==e?this.$router.replace(this.$route.query.redirect):this.$router.replace("/my-account"))}}},K=G,H=(i("a9d7"),Object(m["a"])(K,J,z,!1,null,null,null)),R=H.exports,Y=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"checkout"}},[i("h1",{staticClass:"section-header"},[e._v("CHECKOUT")]),i("div",{staticClass:"checkout-panel"},[i("div",{staticClass:"booking-image"},[i("img",{staticClass:"movie-img",attrs:{src:e.imageUrl}})]),i("div",{staticClass:"booking-details"},[i("h3",[e._v("Booking details:")]),"inactive"!=this.orderStatus?i("div",{staticClass:"booking-data"},[i("div",[i("font-awesome-icon",{attrs:{icon:"ticket-alt"}}),e._v(" 1 ticket")],1),i("div",[i("font-awesome-icon",{attrs:{icon:"film"}}),e._v(" "+e._s(e.movieTitle))],1),i("div",[i("font-awesome-icon",{attrs:{icon:"calendar-alt"}}),e._v(" "+e._s(e.day)+"/"+e._s(e.month)+"/"+e._s(e.year)+" at "+e._s(e.hour))],1)]):e._e(),"pending"==this.orderStatus?i("div",{staticClass:"complete-order"},[i("p",[e._v("Complete order?")]),i("span",{on:{click:e.cancelOrder}},[i("font-awesome-icon",{attrs:{icon:"times"}})],1),i("span",{on:{click:e.completeOrder}},[i("font-awesome-icon",{attrs:{icon:"check"}})],1)]):e._e(),"completed"==this.orderStatus?i("div",[i("h3",{staticClass:"booking-completed"},[e._v("Booking completed!")]),i("p",[e._v("You will receive an e-mail shortly with the reference number to show at the box office")]),i("base-button",{attrs:{link:"",to:"my-account"}},[e._v("Go to My Account")])],1):e._e(),"inactive"==this.orderStatus?i("div",[i("p",{staticClass:"booking-cancelled"},[e._v("Your booking has been cancelled. You will be redirected to the home page")])]):e._e()])])])},Q=[],X={data(){return{day:"",month:"",year:"",hour:""}},beforeCreate(){"pending"!=this.$store.state.orders.orderStatus&&this.$router.replace("/my-account")},computed:{movieTitle(){return this.$store.state.orders.movieTitle},orderStatus(){return this.$store.state.orders.orderStatus},imageUrl(){return this.$store.state.orders.imageUrl}},created(){this.sessionTime()},methods:{sessionTime(){let e=this.$store.state.orders.sessionTime;this.day=e.slice(8,10),this.month=e.slice(5,7),this.year=e.slice(0,4),this.hour=e.slice(11,16)},completeOrder(){let e=this.$store.state.orders.sessionId,t={sessionId:e};this.$store.dispatch("registerOrder",t),this.$store.dispatch("loadOrders")},cancelOrder(){let e={userId:null,sessionId:null,sessionTime:"",movieTitle:"",orderStatus:"inactive"};this.$store.dispatch("cancelOrder",e),setTimeout(()=>this.$router.push({path:"/movies"}),5e3)}}},ee=X,te=(i("fc3b"),Object(m["a"])(ee,Y,Q,!1,null,null,null)),ie=te.exports,se=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"my-account"}},[i("div",{staticClass:"panel"},[i("profile"),i("bookings")],1)])},oe=[],re=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"profile"}},[i("div",{staticClass:"user-info"},[i("h1",{staticClass:"section-header"},[e._v("PROFILE")]),i("p",{staticClass:"user-name"},[e._v(e._s(e.name))]),i("p",{staticClass:"user-email"},[e._v(e._s(e.email))])]),this.deletionIsActive?i("div",{staticClass:"delete-order"},[i("p",[e._v("Are you sure you want to delete your account?")]),i("span",{on:{click:function(t){t.preventDefault(),e.deletionIsActive=!1}}},[i("font-awesome-icon",{attrs:{icon:"times"}})],1),i("span",{on:{click:function(t){return t.preventDefault(),e.deleteAccount(t)}}},[i("font-awesome-icon",{attrs:{icon:"check"}})],1)]):e._e(),i("div",{staticClass:"user-actions"},[this.deletionIsActive?e._e():i("a",{attrs:{href:""},on:{click:function(t){return t.preventDefault(),e.activateDeletion(t)}}},[e._v("Delete account")])])])},ae=[],ne={data(){return{deletionIsActive:!1}},computed:{name(){return this.$store.state.auth.name},email(){return this.$store.state.auth.email}},methods:{activateDeletion(){this.deletionIsActive=!0},deleteAccount(){let e=this.$store.getters.userId;this.$store.dispatch("deleteUser",e),this.deletionIsActive=!1,this.$router.replace("/auth")}}},de=ne,le=(i("4ce9"),Object(m["a"])(de,re,ae,!1,null,null,null)),ce=le.exports,me=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"bookings"}},[i("h1",{staticClass:"section-header"},[e._v("BOOKINGS")]),0==e.orderDataObj.length?i("div",{staticClass:"no-orders"},[i("div",[e._v("No orders available")]),i("base-button",{attrs:{link:"",to:"movies"}},[e._v("Go to Movies")])],1):e._e(),e._l(e.orderDataObj,(function(t){return i("div",{key:t.key,staticClass:"booking-details"},[i("div",{staticClass:"order-title"},[e._v(e._s(t.title))]),i("div",{staticClass:"order-date"},[e._v("Day: "+e._s(t.date))]),i("div",{staticClass:"order-hour"},[e._v("Hour: "+e._s(t.hour))]),e.deletionIsActive?e._e():i("span",{on:{click:function(i){return i.preventDefault(),e.activateDeletion(t.orderId)}}},[i("font-awesome-icon",{attrs:{icon:"trash-alt"}})],1),e.deletionIsActive&&t.orderId==e.selectedOrder?i("div",{staticClass:"delete-order"},[i("div",[e._v("Are you sure you want to delete this order?")]),i("span",{on:{click:function(t){t.preventDefault(),e.deletionIsActive=!1}}},[i("font-awesome-icon",{attrs:{icon:"times"}})],1),i("span",{on:{click:function(i){return i.preventDefault(),e.deleteOrder(t)}}},[i("font-awesome-icon",{attrs:{icon:"check"}})],1)]):e._e()])}))],2)},ue=[],he={data(){return{sessionTime:[],movieTitle:[],orderId:[],dates:[],hours:[],orderDataObj:[],deletionIsActive:!1,selectedOrderId:null}},computed:{selectedOrder(){return this.selectedOrderId}},created(){this.loadOrders()},methods:{async loadOrders(){await this.$store.dispatch("loadOrders");let e=this.$store.getters.allOrders;var t=this;e.map(e=>{t.sessionTime.push(e.session.time),t.movieTitle.push(e.session.movie.title),t.orderId.push(e.id)}),this.formatData()},async formatData(){var e=this;this.sessionTime.map(t=>{let i=t.slice(8,10),s=t.slice(5,7),o=t.slice(0,4),r=i+"/"+s+"/"+o;e.dates.push(r),e.hours.push(t.slice(11,16))}),this.orders()},async orders(){this.orderDataObj=this.dates.map((e,t)=>({date:e,hour:this.hours[t],title:this.movieTitle[t],orderId:this.orderId[t]}))},async deleteOrder(e){this.$store.dispatch("deleteOrder",e.orderId),console.log("order removed from database and store");const t=this.orderDataObj.indexOf(e);this.orderDataObj.splice(t,1),console.log("order removed from DOM"),this.selectedOrderId=null,this.deletionIsActive=!1},activateDeletion(e){this.selectedOrderId=e,this.deletionIsActive=!0}}},ve=he,pe=(i("19cf"),Object(m["a"])(ve,me,ue,!1,null,null,null)),fe=pe.exports,ge={components:{profile:ce,bookings:fe}},Ie=ge,be=(i("290a"),Object(m["a"])(Ie,se,oe,!1,null,null,null)),Te=be.exports,we=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("h1",{staticClass:"not-found"},[e._v("Page not found")])},_e=[],ye={},Ze=ye,ke=(i("d61d"),Object(m["a"])(Ze,we,_e,!1,null,null,null)),Oe=ke.exports,Se=[{path:"/",redirect:"/movies"},{path:"/movies",component:A},{path:"/movies/:id",component:W},{path:"/auth",component:R,meta:{requiresUnauth:!0}},{path:"/checkout",component:ie,meta:{requiresAuth:!0}},{path:"/my-account",component:Te,meta:{requiresAuth:!0}},{path:"/:notFound(.*)",component:Oe}],Ce=i("0e44"),Me={setUser(e,t){e.userId=t.userId,e.name=t.name,e.email=t.email,e.token=t.token},authError(e,t){e.err=t},deleteUser(e,t){e.userId=t.userId,e.name=t.name,e.email=t.email,e.token=t.token,e.err=t.err},clearErrorMessage(e,t){e.err=t}},Ee={async signup(e,t){let i={name:t.name,email:t.email,password:t.password},{name:s,email:o,password:r}=i;await _.a.post("http://localhost:3000/users/signup",{name:s,email:o,password:r}).then(t=>{t.data.err?e.commit("authError",t.data.err):(i.token=t.data.token,i.userId=t.data.user.id,e.commit("setUser",i))}).catch(e=>console.log(e))},async login(e,t){let i={email:t.email,password:t.password},{email:s,password:o}=i;await _.a.post("http://localhost:3000/users/login",{email:s,password:o}).then(t=>{t.data.err?e.commit("authError",t.data.err):(i.userId=t.data.user.id,i.token=t.data.token,i.name=t.data.user.name,e.commit("setUser",i))}).catch(e=>{console.log(e)})},deleteUser(e,t){let i=t;_.a.delete("http://localhost:3000/users/"+i).then(e=>{console.log(e)}).catch(e=>console.log(e));let s={userId:null,name:"",email:"",token:"",err:""};e.commit("deleteUser",s)}},$e={userId(e){return e.userId},token(e){return e.token},isAuthenticated(e){return!!e.token}},Ae={state(){return{userId:null,name:"",email:"",token:"",err:""}},mutations:Me,actions:Ee,getters:$e},je={saveSession(e,t){let i={sessionId:t.sessionId,sessionTime:t.sessionTime,movieTitle:t.movieTitle,imageUrl:t.imageUrl};e.commit("saveSession",i)},registerOrder(e,t){let i={userId:e.getters.userId,sessionId:t.sessionId},{userId:s,sessionId:o}=i;_.a.post(`http://localhost:3000/users/${s}/orders`,{userId:s,sessionId:o}).then(()=>{e.commit("registerOrder",i)}).catch(e=>console.log(e))},cancelOrder(e,t){let i={userId:t.userId,sessionId:t.sessionId,sessionTime:t.sessionTime,movieTitle:t.movieTitle,orderStatus:t.orderStatus};e.commit("cancelOrder",i)},async loadOrders(e){let t=e.getters.userId,i=[];await _.a.get(`http://localhost:3000/users/${t}/orders`).then(e=>{i=e.data.orders}).catch(e=>console.log(e)),e.commit("loadOrders",i)},deleteOrder(e,t){let i=t;_.a.delete("http://localhost:3000/users/orders/"+i).then(()=>{let t=i,s=this.$store.getters.allOrders,o=s.filter(e=>e.id!=t);e.commit("updateOrders",o)}).catch(e=>console.log(e))}},Ue={allOrders(e){return e.allOrders}},Pe={saveSession(e,t){e.sessionId=t.sessionId,e.sessionTime=t.sessionTime,e.movieTitle=t.movieTitle,e.imageUrl=t.imageUrl,e.orderStatus="pending"},registerOrder(e,t){e.userId=t.userId,e.sessionId=t.sessionId,e.orderStatus="completed"},cancelOrder(e,t){e.userId=t.userId,e.sessionId=t.sessionId,e.sessionTime=t.sessionTime,e.movieTitle=t.movieTitle,e.orderStatus=t.orderStatus},loadOrders(e,t){e.allOrders=t},updateOrders(e,t){e.allOrders=t}},xe={state(){return{userId:null,sessionId:null,sessionTime:"",movieTitle:"",orderStatus:"inactive",imageUrl:"",allOrders:[]}},mutations:Pe,actions:je,getters:Ue},De={registerMovies(e){let t=e.getters.allMovies;for(let a=0;a<t.length;a++){var i=t[a].id,s=t[a].title,o=t[a].description,r=t[a].imageUrl;_.a.post("http://localhost:3000/movies",{id:i,title:s,description:o,imageUrl:r}).then(e=>{console.log("movies created",e.data)}).catch(e=>console.log(e))}},registerSessions(e){let t=e.getters.allSessions;for(let o=0;o<t.length;o++){var i=t[o].time,s=t[o].movieId;_.a.post("http://localhost:3000/sessions",{time:i,movieId:s}).then(e=>{console.log("sessions created",e.data)}).catch(e=>console.log(e))}}},Le={allMovies(e){return e.movies},allSessions(e){return e.sessions}},Fe={},Ne={state(){return{movies:[{id:1,title:"Jumanji",description:"The story centers on a supernatural board game that releases jungle-based hazards upon its players with every turn they take. As a boy in 1969, Alan Parrish became trapped inside the game itself while playing with his friend Sarah Whittle. Twenty-six years later, siblings Judy and Peter Shepherd find the game, begin playing and then unwittingly release the now-adult Alan. After tracking down Sarah, the quartet resolves to finish the game in order to reverse all of the destruction it has caused.",imageUrl:"https://upload.wikimedia.org/wikipedia/en/b/b6/Jumanji_poster.jpg"},{id:2,title:"Inglourious Basterds",description:"A few Jewish soldiers are on an undercover mission to bring down the Nazi government and put an end to the war. Meanwhile, a woman wants to avenge the death of her family from a German officer.",imageUrl:"https://i2.wp.com/salaocho.com/wp-content/uploads/2019/09/inglourious-basterds-poster.jpg"},{id:3,title:"Jurassic Park",description:"Jurassic Park is a 1993 American science fiction adventure giant monster film directed by Steven Spielberg and produced by Kathleen Kennedy and Gerald R. Molen.",imageUrl:"https://images-na.ssl-images-amazon.com/images/I/616P7JHa2OL._AC_SY741_.jpg"},{id:4,title:"The Jungle Book",description:"Mowgli is a boy brought up in the jungle by a pack of wolves. When Shere Khan, a tiger, threatens to kill him, a panther and a bear help him escape his clutches.",imageUrl:"https://images-na.ssl-images-amazon.com/images/I/A1ueTokSaUL._RI_.jpg"},{id:5,title:"Papá Piquillo",description:"When his young grandson suffers an accident, Papá Piquillo does everything to take him to be treated in Australia.",imageUrl:"http://es.web.img3.acsta.net/medias/nmedia/18/69/34/02/20430874.jpg"},{id:6,title:"Billy Elliot",description:"The life of 11-year-old Billy Elliot, a coal miner's son in Northern England, is forever changed one day when he stumbles upon a ballet class during his weekly boxing lesson. Before long, he finds himself in dance, demonstrating the kind of raw talent seldom seen by the class' exacting instructor, Mrs. Wilkinson. With a tart tongue and a never-ending stream of cigarettes in her hand, Mrs. Wilkinson's zest for teaching is revived when she sees Billy's potential.",imageUrl:"https://www.cineworld.co.uk/xmedia-cw/repo/feats/posters/HO00007293-md.jpg"}],sessions:[{id:1,time:"2020-01-13T17:30:00.000Z",movieId:1},{id:2,time:"2020-01-13T20:30:00.000Z",movieId:1},{id:3,time:"2020-01-13T17:30:00.000Z",movieId:2},{id:4,time:"2020-01-13T20:30:00.000Z",movieId:2},{id:5,time:"2020-01-13T17:30:00.000Z",movieId:3},{id:6,time:"2020-01-13T20:30:00.000Z",movieId:3},{id:7,time:"2020-01-13T17:30:00.000Z",movieId:4},{id:8,time:"2020-01-13T20:30:00.000Z",movieId:4},{id:9,time:"2020-01-13T17:30:00.000Z",movieId:5},{id:10,time:"2020-01-13T20:30:00.000Z",movieId:5},{id:11,time:"2020-01-13T17:30:00.000Z",movieId:6},{id:12,time:"2020-01-13T20:30:00.000Z",movieId:6},{id:13,time:"2020-01-14T17:30:00.000Z",movieId:1},{id:14,time:"2020-01-14T20:30:00.000Z",movieId:1},{id:15,time:"2020-01-14T17:30:00.000Z",movieId:2},{id:16,time:"2020-01-14T20:30:00.000Z",movieId:2},{id:17,time:"2020-01-14T17:30:00.000Z",movieId:3},{id:18,time:"2020-01-14T20:30:00.000Z",movieId:3},{id:19,time:"2020-01-14T17:30:00.000Z",movieId:4},{id:20,time:"2020-01-14T20:30:00.000Z",movieId:4},{id:21,time:"2020-01-14T17:30:00.000Z",movieId:5},{id:22,time:"2020-01-14T20:30:00.000Z",movieId:5},{id:23,time:"2020-01-14T17:30:00.000Z",movieId:6},{id:24,time:"2020-01-14T20:30:00.000Z",movieId:6},{id:25,time:"2020-01-15T17:30:00.000Z",movieId:1},{id:26,time:"2020-01-15T20:30:00.000Z",movieId:1},{id:27,time:"2020-01-15T17:30:00.000Z",movieId:2},{id:28,time:"2020-01-15T20:30:00.000Z",movieId:2},{id:29,time:"2020-01-15T17:30:00.000Z",movieId:3},{id:30,time:"2020-01-15T20:30:00.000Z",movieId:3},{id:31,time:"2020-01-15T17:30:00.000Z",movieId:4},{id:32,time:"2020-01-15T20:30:00.000Z",movieId:4},{id:33,time:"2020-01-15T17:30:00.000Z",movieId:5},{id:34,time:"2020-01-15T20:30:00.000Z",movieId:5},{id:35,time:"2020-01-15T17:30:00.000Z",movieId:6},{id:36,time:"2020-01-15T20:30:00.000Z",movieId:6},{id:37,time:"2020-01-16T17:30:00.000Z",movieId:1},{id:38,time:"2020-01-16T20:30:00.000Z",movieId:1},{id:39,time:"2020-01-16T17:30:00.000Z",movieId:2},{id:40,time:"2020-01-16T20:30:00.000Z",movieId:2},{id:41,time:"2020-01-16T17:30:00.000Z",movieId:3},{id:42,time:"2020-01-16T20:30:00.000Z",movieId:3},{id:43,time:"2020-01-16T17:30:00.000Z",movieId:4},{id:44,time:"2020-01-16T20:30:00.000Z",movieId:4},{id:45,time:"2020-01-16T17:30:00.000Z",movieId:5},{id:46,time:"2020-01-16T20:30:00.000Z",movieId:5},{id:47,time:"2020-01-16T17:30:00.000Z",movieId:6},{id:48,time:"2020-01-16T20:30:00.000Z",movieId:6},{id:49,time:"2020-01-17T12:30:00.000Z",movieId:1},{id:50,time:"2020-01-17T18:30:00.000Z",movieId:1},{id:51,time:"2020-01-17T22:00:00.000Z",movieId:1},{id:52,time:"2020-01-17T12:30:00.000Z",movieId:2},{id:53,time:"2020-01-17T18:30:00.000Z",movieId:2},{id:54,time:"2020-01-17T21:30:00.000Z",movieId:2},{id:55,time:"2020-01-17T12:30:00.000Z",movieId:3},{id:56,time:"2020-01-17T18:30:00.000Z",movieId:3},{id:57,time:"2020-01-17T22:00:00.000Z",movieId:3},{id:58,time:"2020-01-17T12:30:00.000Z",movieId:4},{id:59,time:"2020-01-17T18:30:00.000Z",movieId:4},{id:60,time:"2020-01-17T22:30:00.000Z",movieId:4},{id:61,time:"2020-01-17T12:30:00.000Z",movieId:5},{id:62,time:"2020-01-17T18:30:00.000Z",movieId:5},{id:63,time:"2020-01-17T22:00:00.000Z",movieId:5},{id:64,time:"2020-01-17T12:30:00.000Z",movieId:6},{id:65,time:"2020-01-17T18:30:00.000Z",movieId:6},{id:66,time:"2020-01-17T21:30:00.000Z",movieId:6},{id:67,time:"2020-01-18T12:30:00.000Z",movieId:1},{id:68,time:"2020-01-18T18:30:00.000Z",movieId:1},{id:69,time:"2020-01-18T22:00:00.000Z",movieId:1},{id:70,time:"2020-01-18T12:30:00.000Z",movieId:2},{id:71,time:"2020-01-18T18:30:00.000Z",movieId:2},{id:72,time:"2020-01-18T21:30:00.000Z",movieId:2},{id:73,time:"2020-01-18T12:30:00.000Z",movieId:3},{id:74,time:"2020-01-18T18:30:00.000Z",movieId:3},{id:75,time:"2020-01-18T22:00:00.000Z",movieId:3},{id:76,time:"2020-01-18T12:30:00.000Z",movieId:4},{id:77,time:"2020-01-18T18:30:00.000Z",movieId:4},{id:78,time:"2020-01-18T22:30:00.000Z",movieId:4},{id:79,time:"2020-01-18T12:30:00.000Z",movieId:5},{id:80,time:"2020-01-18T18:30:00.000Z",movieId:5},{id:81,time:"2020-01-18T22:00:00.000Z",movieId:5},{id:82,time:"2020-01-18T12:30:00.000Z",movieId:6},{id:83,time:"2020-01-18T18:30:00.000Z",movieId:6},{id:84,time:"2020-01-18T21:30:00.000Z",movieId:6},{id:85,time:"2020-01-19T12:30:00.000Z",movieId:1},{id:86,time:"2020-01-19T18:30:00.000Z",movieId:1},{id:87,time:"2020-01-19T22:00:00.000Z",movieId:1},{id:88,time:"2020-01-19T12:30:00.000Z",movieId:2},{id:89,time:"2020-01-19T18:30:00.000Z",movieId:2},{id:90,time:"2020-01-19T21:30:00.000Z",movieId:2},{id:91,time:"2020-01-19T12:30:00.000Z",movieId:3},{id:92,time:"2020-01-19T18:30:00.000Z",movieId:3},{id:93,time:"2020-01-19T22:00:00.000Z",movieId:3},{id:94,time:"2020-01-19T12:30:00.000Z",movieId:4},{id:95,time:"2020-01-19T18:30:00.000Z",movieId:4},{id:96,time:"2020-01-19T22:30:00.000Z",movieId:4},{id:97,time:"2020-01-19T12:30:00.000Z",movieId:5},{id:98,time:"2020-01-19T18:30:00.000Z",movieId:5},{id:99,time:"2020-01-19T22:00:00.000Z",movieId:5},{id:100,time:"2020-01-19T12:30:00.000Z",movieId:6},{id:101,time:"2020-01-19T18:30:00.000Z",movieId:6},{id:102,time:"2020-01-19T21:30:00.000Z",movieId:6}]}},mutations:Fe,actions:De,getters:Le};s["a"].use(d["a"]);const Be=new d["a"].Store({plugins:[Object(Ce["a"])({storage:window.sessionStorage})],modules:{movies:Ne,auth:Ae,orders:xe},state(){return{isMobile:null}},mutations:{isMobile(e,t){e.isMobile=t}},getters:{isMobileMode(e){return e.isMobile}}});var Ve=i("2106"),qe=i.n(Ve),We=i("ecee"),Je=i("c074"),ze=i("ad3d"),Ge=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"button-wrapper"},[e.link?i("router-link",{staticClass:"base-button",attrs:{to:e.to}},[e._t("default")],2):i("button",{staticClass:"base-button"},[e._t("default")],2)],1)},Ke=[],He={props:{link:{type:Boolean,required:!1,default:!1},to:{type:String,required:!1,default:"/"}}},Re=He,Ye=(i("bfa7"),Object(m["a"])(Re,Ge,Ke,!1,null,"646dce42",null)),Qe=Ye.exports,Xe=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"card"},[e._t("default")],2)},et=[],tt=(i("7a5d"),{}),it=Object(m["a"])(tt,Xe,et,!1,null,"75e939fe",null),st=it.exports;_.a.interceptors.request.use((function(e){const t=Be.getters.token;return t&&(e.headers["Authorization"]="Bearer "+t),e}),(function(e){return Promise.reject(e)})),_.a.defaults.withCredentials=!0,s["a"].use(qe.a,_.a),We["c"].add(Je["d"],Je["h"],Je["g"],Je["b"],Je["f"],Je["e"],Je["c"],Je["a"]),s["a"].component("base-button",Qe),s["a"].component("base-card",st),s["a"].component("font-awesome-icon",ze["a"]),s["a"].use(I["a"]);const ot=new I["a"]({routes:Se,mode:"history"});t["default"]=ot;ot.beforeEach((function(e,t,i){e.meta.requiresAuth&&!Be.getters.isAuthenticated?i("/auth"):e.meta.requiresUnauth&&Be.getters.isAuthenticated?i("/movies"):i()})),new s["a"]({el:"#app",router:ot,store:Be,render:e=>e(g)})},"5c7e":function(e,t,i){},"62ea":function(e,t,i){},"6aee":function(e,t,i){"use strict";i("62ea")},"7a5d":function(e,t,i){"use strict";i("fb55")},8705:function(e,t,i){},"8cde":function(e,t,i){},"8edb":function(e,t,i){"use strict";i("1e88")},"9e17":function(e,t,i){},a667:function(e,t,i){},a9d7:function(e,t,i){"use strict";i("019f")},bfa7:function(e,t,i){"use strict";i("8705")},d61d:function(e,t,i){"use strict";i("0e5b")},e372:function(e,t,i){"use strict";i("3673")},fb55:function(e,t,i){},fc3b:function(e,t,i){"use strict";i("5c7e")},ffbd:function(e,t,i){"use strict";i("26de")}});
//# sourceMappingURL=app.449956fa.js.map