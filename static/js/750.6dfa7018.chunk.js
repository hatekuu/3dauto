"use strict";(self.webpackChunk_3dauto=self.webpackChunk_3dauto||[]).push([[750],{9750:(e,t,s)=>{s.r(t),s.d(t,{default:()=>d});var a=s(5043),r=s(6244),i=s(443),n=s(3402),o=(s(2183),s(579));const l=new n.qw({id:"greencard-hgxjomf"}),d=()=>{const[e,t]=(0,a.useState)(!1);return(0,o.jsx)("div",{className:"container-wrapper",children:(0,o.jsxs)("div",{className:"containers",children:[e&&(0,o.jsx)("div",{className:"spinner",children:"Loading..."}),(0,o.jsx)(r.Ay,{schema:{type:"object",required:["email","password","confirm"],properties:{email:{type:"string",title:"T\xean \u0111\u0103ng nh\u1eadp"},password:{type:"string",title:"M\u1eadt kh\u1ea9u",format:"password"},confirm:{type:"string",title:"X\xe1c nh\u1eadn m\u1eadt kh\u1ea9u",format:"password"}}},validator:i.Ay,uiSchema:{"ui:submitButtonOptions":{props:{disabled:!1},norender:!1,submitText:"\u0110\u0103ng k\xfd"}},onSubmit:async e=>{let{formData:s}=e;t(!0);const{email:a,password:r,confirm:i}=s;if(r===i)try{await l.emailPasswordAuth.registerUser({email:a,password:r}),window.location.href="/3dauto/login",window.location.reload()}catch(n){console.log(n)}finally{t(!1)}else alert("password not match"),t(!1)},disabled:e}),(0,o.jsx)("p",{className:"text-blue-500  mt-4 cursor-pointer  hover:underline",onClick:()=>window.location.href="/3dauto/login",children:"Tr\u1edf l\u1ea1i \u0111\u0103ng nh\u1eadp"})]})})}},2183:()=>{}}]);
//# sourceMappingURL=750.6dfa7018.chunk.js.map