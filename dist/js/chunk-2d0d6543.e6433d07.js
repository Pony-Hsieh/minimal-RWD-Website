(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d6543"],{"71a4":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("loading",{attrs:{active:t.isLoading},on:{"update:active":function(e){t.isLoading=e}}},[a("div",{staticClass:"loadingio-spinner-eclipse-qd52l2xe1a"},[a("div",{staticClass:"ldio-zf9gth3n7r"},[a("div")])])]),a("div",{staticClass:"container"},[a("h2",{staticClass:"text-center mt-4"},[t._v("\n            優惠券管理\n        ")]),a("div",{staticClass:"text-right"},[a("button",{staticClass:"btn btn-outline-primary",on:{click:function(e){return t.openCouponModal(!0)}}},[t._v("\n                新增 coupon\n            ")])]),0==t.coupons.length?a("p",{staticClass:"h5 text-center mt-5"},[t._v("\n            目前沒有優惠券喔~\n        ")]):t._e(),a("table",{staticClass:"table table-bordered table-striped table-responsive-lg mt-4"},[t._m(0),a("tbody",t._l(t.coupons,(function(e){return a("tr",{key:e.id},[a("td",{staticClass:"text-center align-middle"},[t._v("\n                        "+t._s(e.title)+"\n                    ")]),a("td",{staticClass:"align-middle"},[t._v("\n                        "+t._s(e.code)+"\n                    ")]),a("td",{staticClass:"text-center align-middle"},[t._v("\n                        "+t._s(t._f("couponTransfer")(e.percent))+"\n                    ")]),a("td",{staticClass:"text-center align-middle"},[e.is_enabled?a("span",{staticClass:"text-success"},[t._v("啟用")]):a("span",{staticClass:"text-secondary"},[t._v("停用")])]),a("td",{staticClass:"text-center align-middle"},[t._v("\n                        "+t._s(t._f("couponFormatTime")(e.due_date))+"\n                    ")]),a("td",{staticClass:"text-center align-middle"},[a("button",{staticClass:"btn btn-outline-info btn-sm",on:{click:function(a){return t.openCouponModal(!1,e)}}},[t._v("\n                            編輯\n                        ")])]),a("td",{staticClass:"text-center align-middle"},[a("button",{staticClass:"btn btn-outline-danger btn-sm",on:{click:function(a){return t.openDeleteModal(e.id,e.title)}}},[t._v("\n                            刪除\n                        ")])])])})),0)])]),a("nav",{staticClass:"mt-5 mb-4",attrs:{"aria-label":"Page navigation example"}},[a("ul",{staticClass:"pagination justify-content-center"},[a("li",{staticClass:"page-item",class:{disabled:!t.pagination.has_pre}},[a("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Previous"},on:{click:function(e){return e.preventDefault(),t.getProducts(t.pagination.current_page-1)}}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("«")])])]),t._l(t.pagination.total_pages,(function(e){return a("li",{key:e,staticClass:"page-item",class:{active:t.pagination.current_page===e}},[a("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.getProducts(e)}}},[t._v(t._s(e))])])})),a("li",{staticClass:"page-item",class:{disabled:!t.pagination.has_next}},[a("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Next"},on:{click:function(e){return e.preventDefault(),t.getProducts(t.pagination.current_page+1)}}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("»")])])])],2)]),a("div",{staticClass:"modal fade",attrs:{id:"couponModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[a("div",{staticClass:"modal-content"},[a("div",{staticClass:"modal-header"},[a("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[t.modalTitle?a("span",[t._v("新增優惠券")]):a("span",[t._v("編輯優惠券")])]),t._m(1)]),a("div",{staticClass:"modal-body"},[a("div",[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"title"}},[t._v("coupon 名稱")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempCoupon.title,expression:"tempCoupon.title"}],staticClass:"form-control",attrs:{id:"title",type:"text"},domProps:{value:t.tempCoupon.title},on:{input:function(e){e.target.composing||t.$set(t.tempCoupon,"title",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"code"}},[t._v("coupon 序號")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempCoupon.code,expression:"tempCoupon.code"}],staticClass:"form-control",attrs:{id:"code",type:"text"},domProps:{value:t.tempCoupon.code},on:{input:function(e){e.target.composing||t.$set(t.tempCoupon,"code",e.target.value)}}})]),a("div",{staticClass:"form-group"},[t._m(2),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempCoupon.percent,expression:"tempCoupon.percent"}],staticClass:"form-control",attrs:{id:"percent",type:"number",max:"100",min:"0"},domProps:{value:t.tempCoupon.percent},on:{input:function(e){e.target.composing||t.$set(t.tempCoupon,"percent",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"due_date"}},[t._v("使用截止期限")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempCoupon.due_date,expression:"tempCoupon.due_date"}],staticClass:"form-control",attrs:{id:"due_date",type:"date"},domProps:{value:t.tempCoupon.due_date},on:{input:function(e){e.target.composing||t.$set(t.tempCoupon,"due_date",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("div",{staticClass:"form-check"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempCoupon.is_enabled,expression:"tempCoupon.is_enabled"}],staticClass:"form-check-input",attrs:{id:"is_enabled",type:"checkbox","true-value":1,"false-value":0},domProps:{checked:Array.isArray(t.tempCoupon.is_enabled)?t._i(t.tempCoupon.is_enabled,null)>-1:t._q(t.tempCoupon.is_enabled,1)},on:{change:function(e){var a=t.tempCoupon.is_enabled,n=e.target,o=n.checked?1:0;if(Array.isArray(a)){var s=null,i=t._i(a,s);n.checked?i<0&&t.$set(t.tempCoupon,"is_enabled",a.concat([s])):i>-1&&t.$set(t.tempCoupon,"is_enabled",a.slice(0,i).concat(a.slice(i+1)))}else t.$set(t.tempCoupon,"is_enabled",o)}}}),a("label",{staticClass:"form-check-label",attrs:{for:"is_enabled"}},[t._v("啟用狀態")])])])])]),a("div",{staticClass:"modal-footer border-top-0"},[a("button",{staticClass:"btn btn-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v("\n                        關閉\n                    ")]),t.isNew?a("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.updateCoupon}},[t._v("\n                        確定新增\n                    ")]):a("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.updateCoupon}},[t._v("\n                        確定修改\n                    ")])])])])]),a("div",{staticClass:"modal fade",attrs:{id:"couponDeleteModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[a("div",{staticClass:"modal-content"},[t._m(3),a("div",{staticClass:"modal-body"},[a("span",{staticClass:"h6"},[t._v(t._s(t.deleteCouponTitle))])]),a("div",{staticClass:"modal-footer"},[a("div",{staticClass:"container-fluid"},[a("div",{staticClass:"row"},[a("button",{staticClass:"btn btn-secondary col mr-1",attrs:{type:"button","data-dismiss":"modal"}},[t._v("\n                                否，關閉此彈跳視窗\n                            ")]),a("button",{staticClass:"btn btn-danger col ml-1",attrs:{type:"button"},on:{click:t.deleteCoupon}},[t._v("\n                                是，刪除此\n                                coupon\n                            ")])])])])])])])],1)},o=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",{staticClass:"thead-dark"},[a("tr",[a("th",{staticClass:"text-center align-middle"},[t._v("\n                        coupon 名稱\n                    ")]),a("th",{staticClass:"text-center align-middle"},[t._v("\n                        coupon 序號\n                    ")]),a("th",{staticClass:"text-center align-middle"},[t._v("\n                        優惠內容\n                    ")]),a("th",{staticClass:"text-center align-middle"},[t._v("\n                        是否啟用\n                    ")]),a("th",{staticClass:"text-center align-middle"},[t._v("\n                        使用截止期限\n                    ")]),a("th",{staticClass:"text-center align-middle",attrs:{width:"100px"}},[t._v("\n                        編輯\n                    ")]),a("th",{staticClass:"text-center align-middle",attrs:{width:"100px"}},[t._v("\n                        刪除\n                    ")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("label",{attrs:{for:"percent"}},[t._v("優惠折數"),a("br"),t._v('(9折請輸入"90"，8折請輸入"80"，依此類推~)')])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal-header"},[a("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[t._v("\n                        欲刪除 coupon 名稱：\n                    ")]),a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])}],s=a("1157"),i=a.n(s),l={name:"AdminCoupon",data:function(){return{isLoading:!1,coupons:{},pagination:{},tempCoupon:{},isNew:!1,modalTitle:!0,deleteCouponID:"",deleteCouponTitle:""}},created:function(){this.getCouponList()},methods:{getCouponList:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=this,a="".concat("https://vue-course-api.hexschool.io","/api/").concat("reborn","/admin/coupons?page=").concat(t);e.isLoading=!0,e.$http.get(a).then((function(t){e.coupons=t.data.coupons,e.pagination=t.data.pagination,e.isLoading=!1}))},openCouponModal:function(t,e){t?(this.tempCoupon={},this.isNew=!0,this.modalTitle=!0):(this.tempCoupon=Object.assign({},e),this.isNew=!1,this.modalTitle=!1),i()("#couponModal").modal("show")},updateCoupon:function(){this.tempCoupon.due_date=new Date(this.tempCoupon.due_date).getTime();var t=this,e="".concat("https://vue-course-api.hexschool.io","/api/").concat("reborn","/admin/coupon"),a="post";t.isNew||(e="".concat("https://vue-course-api.hexschool.io","/api/").concat("reborn","/admin/coupon/").concat(t.tempCoupon.id),a="put"),t.$http[a](e,{data:t.tempCoupon}).then((function(e){e.data.success?(t.isNew?console.log("成功新增 coupon!"):console.log("成功編輯 coupon!"),i()("#couponModal").modal("hide"),t.getCouponList()):(t.isNew?alert("暫時無法新增 coupon，請稍後再試"):alert("暫時無法儲存 coupon 編輯內容，請稍後再試"),i()("#couponModal").modal("hide"))}))},openDeleteModal:function(t,e){this.deleteCouponID=t,this.deleteCouponTitle=e,i()("#couponDeleteModal").modal("show")},deleteCoupon:function(){var t=this,e="".concat("https://vue-course-api.hexschool.io","/api/").concat("reborn","/admin/coupon/").concat(this.deleteCouponID);t.$http.delete(e).then((function(e){console.log("deleteCoupon Response",e),e.data.success?(t.getCouponList(),t.deleteCouponID="",t.deleteCouponTitle="",alert("已成功刪除 coupon")):(t.deleteCouponID="",t.deleteCouponTitle="",alert("暫時無法刪除 coupon，請稍後再試一次")),i()("#couponDeleteModal").modal("hide")}))}}},c=l,d=a("2877"),r=Object(d["a"])(c,n,o,!1,null,null,null);e["default"]=r.exports}}]);
//# sourceMappingURL=chunk-2d0d6543.e6433d07.js.map