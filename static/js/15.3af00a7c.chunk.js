(this.webpackJsonptypescript=this.webpackJsonptypescript||[]).push([[15],{215:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var c=n(757),s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"success",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";c.a[e]({message:t,description:n})}},279:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return a}));var c=n(313),s=n.n(c),r=function(e){return s()(e).format("DD-MM-YYYY, h:mm a")},a=function(e){return(new Intl.NumberFormat).format(e)}},293:function(e,t,n){"use strict";var c=n(294),s=n.n(c),r=function(e){return s.a.create({baseURL:"https://mocsproduct.herokuapp.com",headers:{"Content-type":"application/json","cache-control":"no-cache"}})};r.propTypes={},t.a=r},445:function(e,t,n){"use strict";var c=n(209),s=n.n(c),r=n(218),a=n(293),i={signin:function(){var e=Object(r.a)(s.a.mark((function e(t){var n,c,r,i;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return");case 2:return n={username:t.username,password:t.password},e.prev=3,r=Object(a.a)(),e.next=7,r.post("/login/",n);case 7:return i=e.sent,e.next=10,i.data;case 10:c=e.sent,e.next=16;break;case 13:e.prev=13,e.t0=e.catch(3),console.log(e.t0);case 16:return e.abrupt("return",c);case 17:case"end":return e.stop()}}),e,null,[[3,13]])})));return function(t){return e.apply(this,arguments)}}(),getStaff:function(){var e=Object(r.a)(s.a.mark((function e(t){var n,c,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,c=Object(a.a)(),e.next=4,c.get("/staff/".concat(t));case 4:return r=e.sent,e.next=7,r.data;case 7:n=e.sent,console.log(n),n.status&&(n={status:!0,data:n.data}),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(0),console.log(e.t0),n={status:!1,message:"Profile not found"};case 16:return e.abrupt("return",n);case 17:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t){return e.apply(this,arguments)}}()};t.a=i},667:function(e,t,n){},764:function(e,t,n){"use strict";n.r(t);var c=n(209),s=n.n(c),r=n(218),a=n(237),i=n(778),j=n(406),l=n(407),d=n(445),o=n(215),u=n(279),b=n(0),h=n(3),p=(n(667),n(2)),O=[1,2,3,4];t.default=function(e){var t=Object(b.useState)({}),n=Object(a.a)(t,2),c=n[0],x=n[1],f=Object(h.h)().id;return Object(b.useEffect)((function(){(function(){var e=Object(r.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.getStaff(f);case 2:(t=e.sent).status?x(t.data):Object(o.a)("error","Failed",t.message);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(p.jsx)("div",{className:"profile-page",children:Object(p.jsxs)(j.a,{justify:"space-around",children:[Object(p.jsx)(l.a,{span:6,children:Object(p.jsxs)("div",{className:"salary",children:[Object(p.jsx)("div",{className:"title",children:Object(p.jsx)("h3",{children:"Salary Table"})}),Object(p.jsxs)("div",{className:"info",children:[Object(p.jsxs)("div",{children:[Object(p.jsx)("span",{children:"Top range:"}),Object(p.jsx)("div",{children:O.map((function(){return Object(p.jsx)(i.a,{})}))})]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("span",{children:"Salary:"}),Object(p.jsx)("h4",{children:Object(p.jsx)("b",{children:Object(u.b)(c.salary)||0})})]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("span",{children:"Bonus:"}),Object(p.jsx)("h4",{children:Object(p.jsx)("b",{children:Object(u.b)(c.bonus)||0})})]})]})]})}),Object(p.jsx)(l.a,{span:6,children:Object(p.jsxs)("div",{className:"profile",children:[Object(p.jsx)("div",{className:"title",children:Object(p.jsx)("h2",{style:{fontSize:"2.3vw"},children:"Profile"})}),Object(p.jsx)("div",{className:"avatar",style:{backgroundImage:c.avatar?'url("http://localhost:5000/public/uploads/1626881544984-1f1d4099-6fb5-45e8-9bdb-ab5e155c291d.jpg")':"black"}})]})}),Object(p.jsx)(l.a,{span:6,children:Object(p.jsxs)("div",{className:"detail",children:[Object(p.jsx)("div",{className:"title",children:Object(p.jsx)("h3",{children:"Detail"})}),Object(p.jsxs)("div",{className:"info",children:[Object(p.jsxs)("div",{children:[Object(p.jsx)("span",{children:"Full Name:"}),Object(p.jsx)("h4",{children:Object(p.jsx)("b",{children:c.name||"No Data"})})]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("span",{children:"Age:"}),Object(p.jsx)("h4",{children:Object(p.jsx)("b",{children:"20"})})]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("span",{children:"Phone:"}),Object(p.jsx)("h4",{children:Object(p.jsx)("b",{children:c.phone||"No phone"})})]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("span",{children:"Position:"}),Object(p.jsx)("h4",{children:Object(p.jsx)("b",{children:c.position||"No position"})})]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("span",{children:"Created At:"}),Object(p.jsx)("h4",{children:Object(p.jsx)("b",{children:Object(u.a)(c.createdAt)||"Null"})})]})]})]})})]})})}}}]);
//# sourceMappingURL=15.3af00a7c.chunk.js.map