(this["webpackJsonp@jeffersonucc/infocrypt"]=this["webpackJsonp@jeffersonucc/infocrypt"]||[]).push([[15],{736:function(e,s,t){"use strict";t.r(s);var c=t(20),n=(t(1),t(620)),r=t(621),i=function(e,s,t){return new Promise((function(c,n){var r=new XMLHttpRequest;r.withCredentials=!0,r.open(e,s),r.onload=function(){this.status>=200&&this.status<300?c(r.response):n({status:this.status,statusText:r.statusText})},r.onerror=function(){n({status:this.status,statusText:r.statusText})},"POST"==e&&t?(r.responseType="json",r.setRequestHeader("Content-Type","application/json"),r.send(JSON.stringify(t))):r.send()}))};s.default=function(){return Object(c.jsx)("div",{className:"c-app c-default-layout flex-row align-items-center",children:Object(c.jsx)(n.n,{children:Object(c.jsx)(n.M,{className:"justify-content-center",children:Object(c.jsx)(n.m,{md:"9",lg:"7",xl:"6",children:Object(c.jsxs)(n.h,{className:"mx-4",children:[Object(c.jsx)(n.i,{className:"p-4",children:Object(c.jsxs)(n.v,{children:[Object(c.jsx)("h1",{children:"Register"}),Object(c.jsx)("p",{className:"text-muted",children:"Connect Infocrypt with your key"}),Object(c.jsxs)(n.C,{className:"mb-3",children:[Object(c.jsx)(n.E,{children:Object(c.jsx)(n.F,{children:Object(c.jsx)(r.a,{name:"cil-user"})})}),Object(c.jsx)(n.B,{type:"text",placeholder:"Username",autoComplete:"username"})]}),Object(c.jsxs)(n.C,{className:"mb-3",children:[Object(c.jsx)(n.E,{children:Object(c.jsx)(n.F,{children:Object(c.jsx)(r.a,{name:"cil-lock-locked"})})}),Object(c.jsx)(n.B,{type:"password",placeholder:"OTP"})]})]})}),Object(c.jsx)(n.j,{className:"p-4",children:Object(c.jsxs)(n.M,{children:[Object(c.jsx)(n.m,{xs:"12",sm:"6",children:Object(c.jsx)(n.e,{color:"success",className:"mb-1",block:!0,children:Object(c.jsx)("span",{children:"OTP Register"})})}),Object(c.jsx)(n.m,{xs:"12",sm:"6",children:Object(c.jsx)(n.e,{color:"info",className:"mb-1",block:!0,onClick:function(){i("GET","https://infocrypt.jeffersonding.com/register").then((function(e){var s=JSON.parse(e);window.u2f.register(s.appId,[s],[],(function(e){i("POST","https://infocrypt.jeffersonding.com/verify",e)}))}))},children:Object(c.jsx)("span",{children:"U2F Register"})})})]})})]})})})})})}}}]);
//# sourceMappingURL=15.3ac71d56.chunk.js.map