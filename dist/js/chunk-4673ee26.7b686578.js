(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4673ee26"],{"862f":function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"conainer-fluid p-0"},[s("form",{staticClass:"form-signin",on:{submit:function(t){return t.preventDefault(),e.signin(t)}}},[s("h1",{staticClass:"h3 mb-3 font-weight-normal"},[e._v("\n      管理員登入\n    ")]),s("label",{staticClass:"sr-only",attrs:{for:"inputEmail"}},[e._v("管理員帳號")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.username,expression:"user.username"}],staticClass:"form-control",attrs:{id:"inputEmail",type:"email",placeholder:"管理員帳號",required:""},domProps:{value:e.user.username},on:{input:function(t){t.target.composing||e.$set(e.user,"username",t.target.value)}}}),s("label",{staticClass:"sr-only",attrs:{for:"inputPassword"}},[e._v("管理員密碼")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.password,expression:"user.password"}],staticClass:"form-control",attrs:{id:"inputPassword",type:"password",placeholder:"管理員密碼",required:""},domProps:{value:e.user.password},on:{input:function(t){t.target.composing||e.$set(e.user,"password",t.target.value)}}}),e._m(0),s("button",{staticClass:"btn btn-primary btn-block",attrs:{type:"submit"}},[e._v("\n      登入\n    ")])])])},n=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"checkbox mb-3"},[s("label",[s("input",{attrs:{type:"checkbox",value:"remember-me"}}),e._v(" 記住我\n      ")])])}],r=(s("a481"),{data:function(){return{user:{username:"",password:""}}},created:function(){var e=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=e},methods:{signin:function(){var e=this,t="".concat("https://vue-course-api.hexschool.io","/admin/signin");e.$http.post(t,e.user).then((function(t){if(t.data.success){var s=t.data.token,a=t.data.expired;document.cookie="hexToken=".concat(s,";expires=").concat(new Date(a),";"),alert("登入成功，將前往管理員首頁"),e.$router.push("/admin_Dashboard")}else alert("登入失敗QQ，請稍後再嘗試一次"),location.reload()}))}}}),o=r,i=(s("c2a8"),s("2877")),u=Object(i["a"])(o,a,n,!1,null,"604798f8",null);t["default"]=u.exports},c2a8:function(e,t,s){"use strict";s("f26f")},f26f:function(e,t,s){}}]);
//# sourceMappingURL=chunk-4673ee26.7b686578.js.map