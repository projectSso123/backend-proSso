(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{9878:function(n,e,t){Promise.resolve().then(t.bind(t,9952))},9952:function(n,e,t){"use strict";t.r(e),t.d(e,{default:function(){return j}});var i=t(3827),r=t(9712),o=t(6093);function a(){let n=(0,o._)(["\n  padding:10px;\n  min-height: 70vh;\n  width:50vw;\n  background-color:rgba(255,255,255, 0.25);\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);\n  border-radius:12px;\n  margin:40px auto;\n  padding:5px;\n  display: grid;\n  grid-template-columns: 100%;\n  grid-template-rows: 20px 30px 59px 160px;\n \n  @media (max-width: 700px) {\n    width:90vw;\n    margin: 50px auto;\n    height: 60vh;\n}\n  @media (max-width: 1024px) {\n    width:80vw;\n    margin: 50px auto;\n    height: 60vh;\n}\n\n"]);return a=function(){return n},n}function s(){let n=(0,o._)(["\n  float: inline-end;\n  width: 100%;\n  grid-row: 4; \n  display: flex;\n  margin-top: auto;\n  flex-direction: column;\n  align-items: center;\n  gap:20px;\n  justify-content:flex-start;\n"]);return s=function(){return n},n}function l(){let n=(0,o._)(["\n width: 100%;\n font-weight: 900;\n grid-row: 3; \n\n\n  text-align: center;\n\n  color: whitesmoke;\n  font-size: 28px;\n"]);return l=function(){return n},n}function d(){let n=(0,o._)(["\ncolor:rgba(255,255,255, 0.50);;\nfont-size: small;\ndisplay: block;\nwidth: 100%;\ntext-align: end;\nborder-bottom: 1px solid gray;\n"]);return d=function(){return n},n}function c(){let n=(0,o._)(["\nheight: 50px;\npadding-left: 5px;\nbox-shadow: 0 0 4px rgba(0, 0, 0, 0.5);\nborder-radius: 5px;\nwidth: 50%;\ncolor:whitesmoke;\nfont-weight: 600;\nbackground:rgba(255,255,255, 0.40);\n&::placeholder{\n    font-weight: 400;\n    padding:5px;\n    color:rgba(255,255,255, 0.50);\n}\n&:focus{\n    outline: none;\n}\n\n@media (max-width: 500px) {\n    width:90%;\n}\n\n"]);return c=function(){return n},n}function h(){let n=(0,o._)(["\nwidth: 50%;\npadding: 5px;\nbackground:rgb(4,2,115);\nheight: 50px;\ncolor:whitesmoke;\nbox-shadow: 0 0 15px rgba(0, 0, 0, 0.5);\ntransition: transform 0.1s ease;\n@media (max-width: 500px) {\n    width:90%;\n    \n}\n&:active{\n    transform: scale(0.95);\n    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);\n}\n"]);return h=function(){return n},n}let u=r.ZP.div(a()),p=r.ZP.form(s()),x=r.ZP.h1(l()),g=r.ZP.label(d()),w=r.ZP.input(c()),m=r.ZP.button(h());var f=t(4090);t(951);let b={dark:{primary:"black",text:"white"},light:{primary:"white",text:"black"}};function j(){let[n,e]=(0,f.useState)(1);return(0,i.jsxs)(r.f6,{theme:b,children:[2===n&&(0,i.jsx)(y,{handleSignup:n=>{e(n)}}),1===n&&(0,i.jsx)(k,{})]})}function k(){let[n,e]=(0,f.useState)({email:"",password:""}),[t,r]=(0,f.useState)("");(0,f.useEffect)(()=>{r(new URLSearchParams(window.location.search).get("origin"))},[]);let o=t=>{e({...n,[t.target.name]:t.target.value})},a=async e=>{e.preventDefault();try{let e=await fetch("/api/login",{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:n.email,password:n.password})});if(e.ok){let n=await e.json();window.opener.postMessage({data:n},t),window.close()}else console.log("failed")}catch(n){console.log(n)}};return(0,i.jsxs)(u,{children:[(0,i.jsx)(g,{children:"Sign up with Root"}),(0,i.jsx)(x,{children:"Login"}),(0,i.jsxs)(p,{children:[(0,i.jsx)(w,{placeholder:"email",name:"email",onChange:o}),(0,i.jsx)(w,{placeholder:"password",name:"password",onChange:o}),(0,i.jsx)(m,{onClick:a,children:"Proceed"})]})]})}function y(n){let{handleSignup:e}=n,[t,r]=(0,f.useState)(1),o=()=>r(t+1);return(0,i.jsxs)(u,{children:[(0,i.jsx)(g,{children:"Sign up with Root"}),(0,i.jsx)(x,{children:"SignUp"}),(0,i.jsxs)(p,{children:[t<=1&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(w,{placeholder:"name",required:!0}),(0,i.jsx)(w,{placeholder:"usename",required:!0}),(0,i.jsx)(m,{type:"submit",onClick:o,children:"Continue"})]}),2===t&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(w,{type:"email",placeholder:"email",required:!0}),(0,i.jsx)(m,{type:"submit",onClick:o,children:"Continue"})]}),3===t&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(w,{type:"password",placeholder:"password",required:!0}),(0,i.jsx)(w,{type:"password",placeholder:"re-enter password",required:!0}),(0,i.jsx)(m,{type:"submit",onClick:()=>{e(1)},children:"Continue"})]})]})]})}}},function(n){n.O(0,[345,971,69,744],function(){return n(n.s=9878)}),_N_E=n.O()}]);