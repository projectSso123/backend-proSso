(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[547],{8627:function(e,t,r){Promise.resolve().then(r.bind(r,4354))},7907:function(e,t,r){"use strict";var i=r(5313);r.o(i,"useRouter")&&r.d(t,{useRouter:function(){return i.useRouter}})},4354:function(e,t,r){"use strict";r.r(t);var i=r(3827),n=r(4090),s=r(7907);t.default=()=>{let e=(0,s.useRouter)(),[t,r]=(0,n.useState)({clientName:"",redirectUri:""}),l=e=>{let{name:i,value:n}=e.target;r({...t,[i]:n})},c=async r=>{r.preventDefault();try{(await fetch("http://localhost:8080/api/client-registration",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).ok?e.push("/dashboard"):console.error("Client registration failed")}catch(e){console.error("Error registering client:",e)}};return(0,i.jsxs)("div",{children:[(0,i.jsx)("h1",{children:"Client Registration"}),(0,i.jsxs)("form",{onSubmit:c,children:[(0,i.jsxs)("div",{children:[(0,i.jsx)("label",{htmlFor:"clientName",children:"Client Name"}),(0,i.jsx)("input",{type:"text",id:"clientName",name:"clientName",value:t.clientName,onChange:l,required:!0})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("label",{htmlFor:"redirectUri",children:"Redirect URI"}),(0,i.jsx)("input",{type:"url",id:"redirectUri",name:"redirectUri",value:t.redirectUri,onChange:l,required:!0})]}),(0,i.jsx)("button",{type:"submit",children:"Register"})]})]})}}},function(e){e.O(0,[971,69,744],function(){return e(e.s=8627)}),_N_E=e.O()}]);