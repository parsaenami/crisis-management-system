(this.webpackJsonphelp=this.webpackJsonphelp||[]).push([[0],{112:function(e,t,n){},113:function(e,t,n){},140:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n(0),c=n.n(r),i=n(10),o=n.n(i),s=(n(112),n(113),n(26)),l=n(14),b=n(15),j=n(58),d=n(178),u=n(5),h=n(177),m=Object(u.a)((function(e){return{root:{color:e.palette.getContrastText(e.palette.info.main),fontSize:e.spacing(2),backgroundColor:e.palette.info.main,"&:hover":{backgroundColor:e.palette.info.main}}}}))(h.a);m.propTypes={};var g=n.p+"static/media/helping-hand2.1e041efb.svg",O=n(11);var p="/crisis-management-system",x={HOME:"".concat(p,"/"),SIGN_IN:"".concat(p,"/account/"),ADD_NEED:"".concat(p,"/add_need/"),ABOUT:"".concat(p,"/about/"),PROFILE:"".concat(p,"/profile/")},f=Object(d.a)((function(e){var t;return{root:{height:"100%",display:"flex",flexDirection:"row-reverse",justifyContent:"space-between",alignItems:"center"},content:Object(b.a)({height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},e.breakpoints.up("md"),{alignItems:"flex-end",flexBasis:"50%"}),icon:{fontSize:e.spacing(8),margin:e.spacing(2,0),color:e.palette.text.secondary},title:{textAlign:"center",fontSize:e.spacing(5),fontWeight:"bold",color:e.palette.text.secondary},image:(t={width:e.spacing(32),height:e.spacing(32),margin:e.spacing(1,0),flexBasis:"40%"},Object(b.a)(t,e.breakpoints.down("sm"),{display:"none"}),Object(b.a)(t,"&#small",Object(b.a)({width:e.spacing(8),maxHeight:e.spacing(8),display:"block"},e.breakpoints.up("md"),{display:"none"})),t),hr:{color:e.palette.text.secondary},text:Object(b.a)({color:e.palette.text.secondary,fontSize:e.spacing(2.5),textAlign:"center",textAlignLast:"center",margin:e.spacing(6,0)},e.breakpoints.up("md"),{textAlign:"right",textAlignLast:"right"}),btnContainer:{width:"100%",margin:e.spacing(2,0)},btn:{width:"100%"}}})),v=function(e){var t=f();return Object(r.useEffect)((function(){return document.getElementsByTagName("body")[0].style.backgroundColor="#91DDEC",document.getElementsByTagName("header")[0].style.backgroundColor="#91DDEC",function(){document.getElementsByTagName("body")[0].style.backgroundColor="#F5F2EB",document.getElementsByTagName("header")[0].style.backgroundColor="#FDFFFA"}}),[]),Object(a.jsxs)("div",{className:t.root,children:[Object(a.jsxs)("div",{className:t.content,children:[Object(a.jsx)("img",{className:t.image,id:"small",src:g,alt:"hands"}),Object(a.jsx)(j.a,{variant:"h4",className:t.title,children:"\u0633\u0627\u0645\u0627\u0646\u0647\u200c\u06cc \u062b\u0628\u062a \u0646\u06cc\u0627\u0632\u0645\u0646\u062f\u06cc\u200c\u0647\u0627"}),Object(a.jsx)(j.a,{component:"span",className:t.text,children:"\u062f\u0631 \u0627\u06cc\u0646 \u0633\u0627\u0645\u0627\u0646\u0647 \u0634\u0645\u0627 \u0645\u06cc\u200c\u062a\u0648\u0627\u0646\u06cc\u062f \u062f\u0631 \u0632\u0645\u0627\u0646 \u0648\u0642\u0648\u0639 \u0628\u062d\u0631\u0627\u0646 \u0646\u06cc\u0627\u0632\u0647\u0627\u06cc \u062e\u0648\u062f \u0631\u0627 \u0648\u0627\u0631\u062f \u06a9\u0646\u06cc\u062f \u062a\u0627 \u062f\u0631 \u0627\u0633\u0631\u0639 \u0648\u0642\u062a\u060c \u0628\u0631\u0637\u0631\u0641 \u0634\u0648\u062f."}),Object(a.jsx)(s.b,{to:x.ADD_NEED,className:t.btnContainer,children:Object(a.jsx)(m,{className:t.btn,variant:"contained",size:"large",children:"\u062b\u0628\u062a \u0646\u06cc\u0627\u0632"})})]}),Object(a.jsx)("img",{className:t.image,src:g,alt:"hands"})]})},y=n(24),N=n(28),C=n(184),I=n(185),F=n(186),k=n(146),w=n(92),D=n.n(w),E=n(179),S=function(e){var t=e.children,n=e.window,a=Object(E.a)({disableHysteresis:!0,threshold:0,target:n?n():void 0});return c.a.cloneElement(t,{elevation:a?4:0})},B=n(180),T=n(181),A=n(182),M=n(183),z=n(193),U=n(91),_=n.n(U),H=Object(d.a)((function(e){return{icon:{color:e.palette.text.secondary},nav:{color:e.palette.text.secondary},close:{display:"flex",justifyContent:"flex-start"},list:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100vw",height:"100%","& *":{textAlign:"center",justifyContent:"center"}}}})),L=[{text:"\u0635\u0641\u062d\u0647\u200c\u06cc \u0627\u0635\u0644\u06cc",url:x.HOME},{text:"\u0648\u0631\u0648\u062f | \u062b\u0628\u062a\u200c\u0646\u0627\u0645",url:x.SIGN_IN},{text:"\u062b\u0628\u062a \u0646\u06cc\u0627\u0632",url:x.ADD_NEED},{text:"\u062f\u0631\u0628\u0627\u0631\u0647\u200c\u06cc \u0645\u0627",url:x.ABOUT}],G=function(e){var t=H(),n=Object(a.jsx)("div",{className:t.list,role:"presentation",onClick:e.toggleFn(!1),children:Object(a.jsx)(B.a,{children:L.map((function(e,n){return Object(a.jsxs)("div",{children:[Object(a.jsx)(T.a,{button:!0,children:Object(a.jsx)(s.b,{exact:!0,to:e.url,className:t.nav,children:Object(a.jsx)(A.a,{primary:e.text})})}),n!==L.length-1&&Object(a.jsx)(M.a,{})]},e.text)}))})});return Object(a.jsx)("nav",{children:Object(a.jsxs)(z.a,{anchor:"left",open:e.open,onClose:e.toggleFn(!1),onOpen:e.toggleFn(!0),children:[Object(a.jsx)("div",{className:t.close,children:Object(a.jsx)(k.a,{edge:"end",className:t.icon,"aria-label":"close",onClick:e.toggleFn(!1),children:Object(a.jsx)(_.a,{})})}),n]})})},W=n(70),P=n.n(W),R=Object(d.a)((function(e){return{btn:{color:e.palette.text.secondary,"&#home":Object(b.a)({},e.breakpoints.up("md"),{display:"none"}),"& img":{width:e.spacing(4),height:e.spacing(4)}},navContainer:Object(b.a)({display:"flex",flexDirection:"row-reverse",justifySelf:"flex-start",width:"100%"},e.breakpoints.down("sm"),{display:"none"}),icon:Object(b.a)({color:e.palette.text.secondary,marginLeft:"auto"},e.breakpoints.up("md"),{display:"none"}),header:{backgroundColor:e.palette.secondary.light,margin:e.spacing(0,-2),right:"unset",borderRadius:"0 0 8px 8px"},container:{padding:0}}})),J=function(e){var t=R(),n=Object(r.useState)(!1),c=Object(N.a)(n,2),i=c[0],o=c[1],l=function(e){return function(t){("keydown"!==t.type||"Tab"!==t.key&&"Shift"!==t.key)&&o(e)}};return Object(a.jsx)(S,Object(O.a)(Object(O.a)({},e),{},{children:Object(a.jsx)(C.a,{position:"fixed",className:t.header,children:Object(a.jsx)(I.a,{maxWidth:"lg",className:t.container,children:Object(a.jsxs)(F.a,{children:[e.location.pathname===x.HOME?Object(a.jsx)(s.b,{to:x.SIGN_IN,className:t.btn,id:"home",children:Object(a.jsx)(h.a,{color:"inherit",children:"\u0648\u0631\u0648\u062f | \u062b\u0628\u062a\u200c\u0646\u0627\u0645"})}):Object(a.jsx)(s.b,{to:x.HOME,className:t.btn,children:Object(a.jsx)(k.a,{edge:"start",children:Object(a.jsx)("img",{src:g,alt:"logo"})})}),Object(a.jsxs)("div",{className:t.navContainer,children:[Object(a.jsx)(s.b,{exact:!0,to:x.HOME,className:t.btn,children:Object(a.jsx)(h.a,{color:"inherit",children:"\u0635\u0641\u062d\u0647\u200c\u06cc \u0627\u0635\u0644\u06cc"})}),Object(a.jsx)(s.b,{to:x.ADD_NEED,className:t.btn,children:Object(a.jsx)(h.a,{color:"inherit",children:"\u062b\u0628\u062a \u0646\u06cc\u0627\u0632"})}),Object(a.jsx)(s.b,{to:x.ABOUT,className:t.btn,children:Object(a.jsx)(h.a,{color:"inherit",children:"\u062f\u0631\u0628\u0627\u0631\u0647\u200c\u06cc \u0645\u0627"})}),Object(a.jsx)(s.b,{to:x.SIGN_IN,className:t.btn,children:Object(a.jsx)(h.a,{color:"inherit",children:"\u0648\u0631\u0648\u062f | \u062b\u0628\u062a\u200c\u0646\u0627\u0645"})})]}),Object(a.jsx)(k.a,{edge:"end",className:t.icon,"aria-label":"menu",onClick:l(!0),children:Object(a.jsx)(D.a,{})}),Object(a.jsx)(G,{open:i,toggleFn:l})]})})})}))},q=n(190),V=n(191),K=n(93),Q=n.n(K),X=n(197),Y=Q()({direction:"rtl",palette:{primary:{main:"#140053",light:"#91DDEC"},secondary:{main:"#F5F2EB",light:"#FDFFFA"},info:{main:"#B8F4EC"},text:{primary:"#140053",secondary:"#4D4D4D",disabled:"#A5A5A5",hint:"#A5A5A5",light:"#707070"},background:{default:"#F5F2EB"}}});console.log(window.location.pathname);var Z=Y=Object(X.a)(Y),$=n(21),ee=n(189),te=n(97),ne=n(18),ae=n(94),re=n.n(ae),ce=n(99),ie=n(143),oe=n(176),se=Object(ne.b)({plugins:[].concat(Object(te.a)(Object(ce.a)().plugins),[re()()])}),le=Object(ie.a)(),be=function(e){return Object(a.jsx)(oe.b,{jss:se,generateClassName:le,children:e.children})},je=function(e){return Object(a.jsx)("div",{className:"fabContainer",children:e.buttons.map((function(e,t){return Object(a.jsx)(m,{variant:"contained",onClick:e.onClickFn,size:"large",children:e.title},t)}))})},de=n(96),ue=n.n(de),he=n(192),me=n(187),ge=n(195),Oe={firstName:"",lastName:"",phoneNumber:"",nationalId:"",address:"",location:{allow:!1,lat:"",long:""}},pe=function(e){return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(j.a,{gutterBottom:!0,color:"textSecondary",children:"\u0628\u0631\u0627\u06cc \u062b\u0628\u062a\u200c\u0646\u0627\u0645\u060c \u0627\u0637\u0644\u0627\u0639\u0627\u062a \u0632\u06cc\u0631 \u0631\u0627 \u0648\u0627\u0631\u062f \u0646\u0645\u0627\u06cc\u06cc\u062f."}),Object(a.jsx)(he.a,{variant:"filled",id:"firstName",name:"firstName",value:e.userInfo.firstName,label:"\u0646\u0627\u0645",onChange:e.onUserInfoChangeFn,error:!!e.errors.firstName,helperText:e.errors.firstName}),Object(a.jsx)(he.a,{variant:"filled",id:"lastName",name:"lastName",value:e.userInfo.lastName,label:"\u0646\u0627\u0645 \u062e\u0627\u0646\u0648\u0627\u062f\u06af\u06cc",onChange:e.onUserInfoChangeFn,error:!!e.errors.lastName,helperText:e.errors.lastName}),Object(a.jsx)(he.a,{variant:"filled",id:"phoneNumber",name:"phoneNumber",value:e.userInfo.phoneNumber,type:"number",label:"\u0634\u0645\u0627\u0631\u0647\u200c\u06cc \u062a\u0645\u0627\u0633",placeholder:"\u0628\u0631\u0627\u06cc \u0645\u062b\u0627\u0644: \u06f0\u06f9\u06f1\u06f2\u06f3\u06f4\u06f5\u06f6\u06f7\u06f8\u06f9",onChange:e.onUserInfoChangeFn,error:!!e.errors.phoneNumber,helperText:e.errors.phoneNumber}),Object(a.jsx)(he.a,{variant:"filled",id:"nationalId",name:"nationalId",value:e.userInfo.nationalId,type:"number",label:"\u06a9\u062f \u0645\u0644\u06cc",onChange:e.onUserInfoChangeFn,error:!!e.errors.nationalId,helperText:e.errors.nationalId}),Object(a.jsx)(he.a,{variant:"filled",id:"address",name:"address",value:e.userInfo.address,multiline:!0,label:"\u0622\u062f\u0631\u0633",onChange:e.onUserInfoChangeFn,error:!!e.errors.address,helperText:e.errors.address}),Object(a.jsx)(me.a,{control:Object(a.jsx)(ge.a,{edge:"start",checked:e.userInfo.location.allow,onChange:e.getLocation,name:"location",color:"primary"}),label:"\u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u0627\u0632 \u0644\u0648\u06a9\u06cc\u0634\u0646 \u0628\u0631\u0627\u06cc \u0622\u062f\u0631\u0633"}),!e.isMobileDisplay&&Object(a.jsx)(m,{variant:"contained",size:"large",onClick:e.submit,children:"\u062b\u0628\u062a\u200c\u0646\u0627\u0645\u0645 \u06a9\u0646"})]})},xe=n(196),fe=n(188),ve=n(98),ye=n(95),Ne=function(e){var t=e.inputRef,n=e.onChange,r=Object(ve.a)(e,["inputRef","onChange"]);return Object(a.jsx)(ye.a,Object(O.a)(Object(O.a)({},r),{},{getInputRef:t,onValueChange:function(t){n({target:{name:e.name,value:t.value}})},format:"#    #    #    #    #",mask:"_"}))},Ce=function(e){return Object(a.jsx)(he.a,{variant:"filled",className:e.className,label:e.label,value:e.value,onChange:e.onChangeFn,onBlur:e.onBlurFn,name:"otp-input",id:"otp-input",error:e.error,helperText:e.errorText,InputProps:{inputComponent:Ne},style:{textAlignLast:"center",direction:"ltr"}})},Ie=Object(d.a)((function(e){return{switch:{display:"flex",alignItems:"center",justifyContent:"center","& label:first-child":{padding:e.spacing(1.5),color:e.palette.primary.main}}}})),Fe=function(e){var t=Ie();return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(j.a,{gutterBottom:!0,color:"textSecondary",children:"\u0628\u0627 \u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u0627\u0632 \u0634\u0645\u0627\u0631\u0647\u200c\u06cc \u062a\u0645\u0627\u0633 \u0648 \u06cc\u0627 \u06a9\u062f \u0645\u0644\u06cc \u062e\u0648\u062f\u060c \u0648\u0627\u0631\u062f \u062d\u0633\u0627\u0628 \u06a9\u0627\u0631\u0628\u0631\u06cc \u062e\u0648\u062f \u0634\u0648\u06cc\u062f."}),Object(a.jsxs)("div",{className:t.switch,children:[Object(a.jsx)(xe.a,{color:"primary",htmlFor:"signin-switch",children:"\u0634\u0645\u0627\u0631\u0647\u200c\u06cc \u062a\u0645\u0627\u0633"}),Object(a.jsx)(me.a,{label:"\u06a9\u062f \u0645\u0644\u06cc",control:Object(a.jsx)(fe.a,{id:"signin-switch",color:"primary",value:e.type,onChange:e.setType})})]}),Object(a.jsx)(he.a,{variant:"filled",type:"number",label:e.type?"\u06a9\u062f \u0645\u0644\u06cc":"\u0634\u0645\u0627\u0631\u0647\u200c\u06cc \u062a\u0645\u0627\u0633",value:e.userNumber,onChange:e.onUserNumberChangeFn,error:!!e.error,helperText:e.error}),!e.isMobileDisplay&&Object(a.jsx)(m,{variant:"contained",size:"large",onClick:e.submit,children:"\u0648\u0631\u0648\u062f \u0628\u0647 \u062d\u0633\u0627\u0628 \u06a9\u0627\u0631\u0628\u0631\u06cc"})]})},ke=function(e){return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(j.a,{gutterBottom:!0,color:"textSecondary",children:"\u0628\u0631\u0627\u06cc \u0627\u062f\u0627\u0645\u0647 \u062f\u0627\u062f\u0646\u060c \u06a9\u062f \u067e\u0646\u062c \u0631\u0642\u0645\u06cc \u0627\u0631\u0633\u0627\u0644 \u0634\u062f\u0647 \u0628\u0647 \u0634\u0645\u0627\u0631\u0647\u200c\u06cc \u062a\u0645\u0627\u0633 \u062e\u0648\u062f \u0631\u0627 \u0648\u0627\u0631\u062f \u0646\u0645\u0627\u06cc\u06cc\u062f."}),Object(a.jsx)(Ce,{label:"\u06a9\u062f \u062a\u0623\u06cc\u06cc\u062f",value:e.code,onChangeFn:e.handleChange,onBlurFn:e.onBlur,error:!!e.error,errorText:e.error}),!e.isMobileDisplay&&Object(a.jsx)(m,{variant:"contained",size:"large",onClick:e.submit,children:"\u062a\u0623\u06cc\u06cc\u062f"})]})},we="\u067e\u0631 \u06a9\u0631\u062f\u0646 \u0627\u06cc\u0646 \u0642\u0633\u0645\u062a \u0627\u0644\u0632\u0627\u0645\u06cc \u0627\u0633\u062a",De="\u06a9\u062f \u0648\u0627\u0631\u062f \u0634\u062f\u0647 \u0628\u0627\u06cc\u062f \u06f5 \u0631\u0642\u0645 \u0628\u0627\u0634\u062f",Ee="\u062f\u0631 \u062d\u0627\u0644 \u062d\u0627\u0636\u0631 \u0627\u062c\u0627\u0632\u0647\u200c\u06cc \u062f\u0633\u062a\u0631\u0633\u06cc \u0628\u0647 \u0645\u0648\u0642\u0639\u06cc\u062a \u0645\u06a9\u0627\u0646\u06cc\u200c\u062a\u0627\u0646 \u0628\u0647 \u0645\u0627 \u062f\u0627\u062f\u0647 \u0646\u0634\u062f\u0647 \u0627\u0633\u062a. \u062f\u0631 \u0635\u0648\u0631\u062a \u062a\u0645\u0627\u06cc\u0644\u060c \u062f\u0631 \u062a\u0646\u0638\u06cc\u0645\u0627\u062a \u0645\u0631\u0648\u0631\u06af\u0631 \u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u0627\u0632 \u0645\u0648\u0642\u0639\u06cc\u062a \u0645\u06a9\u0627\u0646\u06cc \u0631\u0627 \u062a\u0623\u06cc\u06cc\u062f \u0648 \u0635\u0641\u062d\u0647 \u0631\u0627 \u0628\u0627\u0632\u0646\u0634\u0627\u0646\u06cc \u06a9\u0646\u06cc\u062f.",Se="\u0628\u0631\u0627\u06cc \u0627\u0645\u062f\u0627\u062f\u0631\u0633\u0627\u0646\u06cc \u0628\u0647\u062a\u0631 \u0628\u0647 \u062f\u0627\u0646\u0633\u062a\u0646 \u0645\u0648\u0642\u0639\u06cc\u062a \u0645\u06a9\u0627\u0646\u06cc \u0634\u0645\u0627 \u0646\u06cc\u0627\u0632 \u062f\u0627\u0631\u06cc\u0645. \u0644\u0637\u0641\u0627\u064b \u0627\u0645\u06a9\u0627\u0646 \u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u0627\u0632 \u0645\u0648\u0642\u0639\u06cc\u062a \u0645\u06a9\u0627\u0646\u06cc \u0631\u0627 \u062a\u0623\u06cc\u06cc\u062f \u06a9\u0646\u06cc\u062f.",Be=Object(d.a)((function(e){var t;return{media:(t={width:"100%",paddingBottom:e.spacing(9)},Object(b.a)(t,e.breakpoints.up("md"),{display:"flex",flexDirection:"row-reverse",alignItems:"flex-start"}),Object(b.a)(t,"& hr",{transform:"rotate(90deg)",alignSelf:"center",maxWidth:e.spacing(32.5)}),t),container:{position:"relative",display:"flex",flexDirection:"column",alignItems:"center",width:"100%","& > *":Object(b.a)({direction:"rtl",margin:e.spacing(1,0),width:400},e.breakpoints.down("xs"),{width:"100%"})},blurForm:{transition:"ease .3s",filter:function(e){return!e.breakpoint&&e.isOtp?"blur(3px)":""}},blurOtp:{transition:"ease .3s",filter:function(e){return e.breakpoint||e.isOtp?"":"blur(3px)"}},title:{display:"flex",flexDirection:"row-reverse",justifyContent:"space-between",alignItems:"center",width:"100%"},overlay:{position:"absolute",top:0,right:0,left:0,bottom:0,opacity:.4,zIndex:999,backgroundColor:e.palette.secondary.main},icon:{fontSize:e.spacing(4),margin:e.spacing(2,0),color:e.palette.text.light,position:"absolute",top:0,right:"50%",transform:"translate(45%, -50%)",backgroundColor:e.palette.secondary.main}}})),Te=function(e){var t=Object($.a)(),n=Object(ee.a)(t.breakpoints.down("sm")),c=function(){var e=Object(r.useState)({}),t=Object(N.a)(e,2),n=t[0],a=t[1],c=Object(r.useState)(null),i=Object(N.a)(c,2),o=i[0],s=i[1],l=function(e){var t=e.coords;a({latitude:t.latitude,longitude:t.longitude})},b=function(e){s(e.message)};return Object(r.useEffect)((function(){var e=navigator.geolocation;if(e){navigator.permissions.query({name:"geolocation"}).then((function(e){"prompt"===e.state?alert(Se):"denied"===e.state&&alert(Ee)}));var t=e.watchPosition(l,b);return function(){return e.clearWatch(t)}}s("Geolocation is not supported")}),[]),Object(O.a)(Object(O.a)({},n),{},{error:o})}(),i=c.latitude,o=c.longitude,s=c.error,l=Object(r.useState)(!0),d=Object(N.a)(l,2),u=d[0],m=d[1],g=Object(r.useState)(!1),p=Object(N.a)(g,2),x=p[0],f=p[1],v=Be(Object(O.a)(Object(O.a)({},e),{},{breakpoint:n,isOtp:x})),y=Object(r.useState)(""),C=Object(N.a)(y,2),I=C[0],F=C[1],k=Object(r.useState)(""),w=Object(N.a)(k,2),D=w[0],E=w[1],S=Object(r.useState)(!1),B=Object(N.a)(S,2),T=B[0],A=B[1],M=Object(r.useState)(Oe),z=Object(N.a)(M,2),U=z[0],_=z[1],H=Object(r.useState)(Oe),L=Object(N.a)(H,2),G=L[0],W=L[1],R=function(e){F(e.target.value),""===e.target.value?E(we):E("")},J=function(e){e.preventDefault();var t=T?U.nationalId:U.phoneNumber;t.length?(alert("\u06a9\u062f \u062a\u0623\u06cc\u06cc\u062f \u0628\u0631\u0627\u06cc \u06a9\u0627\u0631\u0628\u0631  \u0634\u0645\u0627\u0631\u0647\u200c\u06cc \u062a\u0645\u0627\u0633 / \u06a9\u062f \u0645\u0644\u06cc ".concat(t," \u0627\u0631\u0633\u0627\u0644 \u0634\u062f.")),console.log(U),f(!0)):W(u?Object(O.a)(Object(O.a)({},G),{},{firstName:U.firstName.length?"":we,lastName:U.lastName.length?"":we,phoneNumber:U.phoneNumber.length?"":we,nationalId:U.nationalId.length?"":we,address:U.address.length?"":we}):Object(O.a)(Object(O.a)({},G),{},Object(b.a)({},T?"nationalId":"phoneNumber",we)))},V=function(e){e.preventDefault(),I.length<5?E(De):alert(I)},K=function(){return Object(a.jsxs)("div",{className:P()(v.container,v.blurOtp),children:[!n&&!x&&Object(a.jsx)("div",{className:v.overlay}),Object(a.jsx)(ke,{isMobileDisplay:n,code:I,handleChange:R,submit:V,error:D})]})};return Object(a.jsx)(be,{children:Object(a.jsxs)(q.a,{theme:Z,children:[Object(a.jsxs)("div",{className:v.title,children:[Object(a.jsx)(j.a,{variant:"h3",children:x?"\u062a\u0623\u06cc\u06cc\u062f \u0634\u0645\u0627\u0631\u0647\u200c\u06cc \u062a\u0645\u0627\u0633":u?"\u062b\u0628\u062a\u200c\u0646\u0627\u0645":"\u0648\u0631\u0648\u062f"}),!x&&Object(a.jsx)(h.a,{variant:"outlined",size:"small",onClick:function(){return m(!u)},children:u?"\u0648\u0631\u0648\u062f":"\u062b\u0628\u062a\u200c\u0646\u0627\u0645"})]}),Object(a.jsx)("hr",{}),Object(a.jsxs)("div",{className:v.media,children:[Object(a.jsxs)("form",{className:P()(v.container,v.blurForm),children:[!n&&x&&Object(a.jsx)("div",{className:v.overlay}),n&&x?K():u?Object(a.jsx)(pe,{isMobileDisplay:n,submit:J,userInfo:U,errors:G,onUserInfoChangeFn:function(e){_(Object(O.a)(Object(O.a)({},U),{},Object(b.a)({},e.target.name,e.target.value))),W(Object(O.a)(Object(O.a)({},G),{},Object(b.a)({},e.target.name,""===e.target.value?we:"")))},getLocation:function(e){_(Object(O.a)(Object(O.a)({},U),{},{location:{allow:e.target.checked,lat:e.target.checked&&!s?i:"",long:e.target.checked&&!s?o:""}}))}}):Object(a.jsx)(Fe,{isMobileDisplay:n,submit:J,type:T,userNumber:T?U.nationalId:U.phoneNumber,onUserNumberChangeFn:function(e){_(Object(O.a)(Object(O.a)({},U),{},Object(b.a)({},T?"nationalId":"phoneNumber",e.target.value))),W(Object(O.a)(Object(O.a)({},G),{},Object(b.a)({},T?"nationalId":"phoneNumber",""===e.target.value?we:"")))},setType:function(e){return A(e.target.checked)},error:T?G.nationalId:G.phoneNumber})]}),!n&&Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)("div",{className:"position-relative w-100 align-self-center",children:[Object(a.jsx)("hr",{style:{borderWidth:2}}),Object(a.jsx)(ue.a,{className:v.icon})]}),K()]})]}),n&&Object(a.jsx)(je,{buttons:[{title:x?"\u062a\u0623\u06cc\u06cc\u062f":u?"\u062b\u0628\u062a\u200c\u0646\u0627\u0645\u0645 \u06a9\u0646":"\u0648\u0631\u0648\u062f \u0628\u0647 \u062d\u0633\u0627\u0628 \u06a9\u0627\u0631\u0628\u0631\u06cc",onClickFn:x?V:J}]})]})})},Ae=Object(d.a)((function(e){return{container:{display:"flex",flexDirection:"column",alignItems:"center",width:"100%"},title:{display:"flex",flexDirection:"row-reverse",justifyContent:"flex-start",alignItems:"center",width:"100%"}}})),Me=function(e){var t=Ae();return Object(a.jsxs)("div",{className:t.container,children:[Object(a.jsx)("div",{className:t.title,children:Object(a.jsx)(j.a,{variant:"h3",children:"\u062f\u0631\u0628\u0627\u0631\u0647\u200c\u06cc \u0645\u0627"})}),Object(a.jsx)("hr",{}),Object(a.jsx)(j.a,{gutterBottom:!0,color:"textSecondary",children:"\u0647\u0645\u0648\u0627\u0631\u0647 \u062f\u0631 \u0632\u0645\u0627\u0646 \u0648\u0642\u0648\u0639 \u0628\u062d\u0631\u0627\u0646\u200c\u0647\u0627\u06cc\u06cc \u0645\u0627\u0646\u0646\u062f \u0633\u06cc\u0644\u060c \u0632\u0644\u0632\u0644\u0647\u060c \u0622\u062a\u0634\u200c\u0633\u0648\u0632\u06cc \u0648... \u0648 \u0628\u062e\u0635\u0648\u0635 \u067e\u0633 \u0627\u0632 \u0622\u0646\u060c \u0645\u0647\u0645\u200c\u062a\u0631\u06cc\u0646 \u0627\u0642\u062f\u0627\u0645\u06cc \u06a9\u0647 \u0628\u0627\u06cc\u062f \u0635\u0648\u0631\u062a \u06af\u06cc\u0631\u062f\u060c \u0639\u0645\u0644\u06cc\u0627\u062a \u0627\u0645\u062f\u0627\u062f \u0648 \u06a9\u0645\u06a9\u200c\u0631\u0633\u0627\u0646\u06cc \u0628\u0647 \u0628\u0627\u0632\u0645\u0627\u0646\u062f\u06af\u0627\u0646 \u0648 \u0647\u0645\u0686\u0646\u06cc\u0646 \u0646\u062c\u0627\u062a\u200c\u06cc\u0627\u0641\u062a\u06af\u0627\u0646 \u062d\u0627\u062f\u062b\u0647 \u0627\u0633\u062a."}),Object(a.jsx)(j.a,{gutterBottom:!0,color:"textSecondary",children:"\u062f\u0631 \u0634\u0631\u0627\u06cc\u0637\u06cc \u06a9\u0647 \u0628\u0647 \u062f\u0644\u0627\u06cc\u0644 \u0645\u062e\u062a\u0644\u0641 \u0627\u0645\u06a9\u0627\u0646 \u062a\u0623\u062e\u06cc\u0631 \u062f\u0631 \u062f\u0631\u06cc\u0627\u0641\u062a \u06a9\u0645\u06a9 \u0648 \u06cc\u0627 \u0639\u062f\u0645 \u062a\u0637\u0627\u0628\u0642 \u06a9\u0645\u06a9\u200c\u0647\u0627\u06cc \u062f\u0631\u06cc\u0627\u0641\u062a\u06cc \u0628\u0627 \u0646\u06cc\u0627\u0632\u0647\u0627\u06cc \u0648\u0627\u0642\u0639\u06cc \u0645\u0648\u062c\u0648\u062f \u0628\u0627\u0634\u062f\u060c \u0627\u06cc\u0646 \u0633\u0627\u0645\u0627\u0646\u0647 \u0645\u06cc\u200c\u062a\u0648\u0627\u0646\u062f \u0628\u0627 \u062c\u0645\u0639\u200c\u0622\u0648\u0631\u06cc \u0648 \u062f\u0633\u062a\u0647\u200c\u0628\u0646\u062f\u06cc \u0646\u06cc\u0627\u0632\u0647\u0627\u06cc \u0627\u0641\u0631\u0627\u062f \u0622\u0633\u06cc\u0628\u200c\u062f\u06cc\u062f\u0647\u060c \u0641\u0631\u0622\u06cc\u0646\u062f \u0627\u0645\u062f\u0627\u062f\u0631\u0633\u0627\u0646\u06cc \u0628\u0647 \u0627\u06cc\u0646 \u062f\u0633\u062a\u0647 \u0627\u0632 \u0627\u0641\u0631\u0627\u062f \u0631\u0627 \u062a\u0633\u0631\u06cc\u0639 \u0628\u062e\u0634\u06cc\u062f\u0647 \u0648 \u06a9\u0627\u0631\u0622\u0645\u062f\u062a\u0631 \u06a9\u0646\u062f."})]})},ze=Object(y.a)(),Ue=Object(d.a)((function(e){return{root:{flexGrow:1,display:"flex",flexDirection:"column",alignItems:"center",height:"100vh",paddingTop:e.spacing(9)}}})),_e=function(){var e=Ue();return Object(a.jsx)(s.a,{history:ze,children:Object(a.jsxs)(q.a,{theme:Z,children:[Object(a.jsx)(V.a,{}),Object(a.jsx)(l.c,{children:Object(a.jsxs)(I.a,{maxWidth:"lg",className:e.root,children:[Object(a.jsx)(l.a,{path:x.HOME,component:J}),Object(a.jsx)(l.a,{exact:!0,path:x.HOME,component:v}),Object(a.jsx)(l.a,{exact:!0,path:x.SIGN_IN,component:Te}),Object(a.jsx)(l.a,{exact:!0,path:x.ABOUT,component:Me})]})})]})})},He=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,199)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),c(e),i(e)}))};n(139);o.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(_e,{})}),document.getElementById("root")),He()}},[[140,1,2]]]);
//# sourceMappingURL=main.000316e7.chunk.js.map