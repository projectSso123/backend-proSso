(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[724],{4960:function(e,n,t){Promise.resolve().then(t.bind(t,2401))},7907:function(e,n,t){"use strict";var a=t(5313);t.o(a,"useRouter")&&t.d(n,{useRouter:function(){return a.useRouter}})},2401:function(e,n,t){"use strict";t.r(n);var a=t(3827),i=t(4090);t(3650);var l=t(7907);function c(){let e=(0,l.useRouter)(),[n,t]=(0,i.useState)({applicationname:"",homepageURL:"",description:"",callbackURL:""}),c=async()=>{try{let t=await fetch("http://localhost:8080/api/v1/registerclient",{method:"POST",mode:"cors",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({applicationname:n.applicationname,homepageURL:n.homepageURL,description:n.description,callbackURL:n.callbackURL})});if(t.ok){console.log(t);let n=await t.json();console.log(n),e.push("/registerclient/showclientdetails?".concat(new URLSearchParams({clientid:n.clientid})))}else console.log("errr - > ",t)}catch(e){console.log(e)}};return(0,a.jsxs)("div",{className:"main-box",children:[(0,a.jsx)("div",{className:"main-heading",children:(0,a.jsx)("h5",{children:"Register a new Application"})}),(0,a.jsxs)("form",{className:"form",onSubmit:e=>{e.preventDefault(),c()},children:[(0,a.jsx)("label",{children:"Application name"}),(0,a.jsx)("input",{type:"text",name:"applicationname",onChange:e=>{t({...n,[e.target.name]:e.target.value})}}),(0,a.jsx)("span",{children:"Something user will recognize"}),(0,a.jsx)("label",{children:"Homepage URL"}),(0,a.jsx)("input",{type:"text",name:"homepageURL",onChange:e=>{t({...n,[e.target.name]:e.target.value})}}),(0,a.jsx)("span",{children:"Full URL to your application Homepage"}),(0,a.jsx)("label",{children:"Application description"}),(0,a.jsx)("textarea",{type:"text",name:"description",onChange:e=>{t({...n,[e.target.name]:e.target.value})}}),(0,a.jsx)("span",{children:"Description of your application"}),(0,a.jsx)("label",{children:"Callback URL"}),(0,a.jsx)("input",{type:"text",name:"callbackURL",onChange:e=>{t({...n,[e.target.name]:e.target.value})}}),(0,a.jsx)("span",{children:"Your callback URL"}),(0,a.jsx)("button",{type:"submit",children:"Register Application"})]})]})}n.default=function(){return(0,a.jsx)("div",{children:(0,a.jsx)(c,{})})}},3650:function(){}},function(e){e.O(0,[971,69,744],function(){return e(e.s=4960)}),_N_E=e.O()}]);