(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-20d744c4"],{"60cd":function(t,e,a){"use strict";a("95f7")},"95f7":function(t,e,a){},fbde:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("loading",{attrs:{active:t.isLoading},on:{"update:active":function(e){t.isLoading=e}}},[a("div",{staticClass:"loadingio-spinner-eclipse-qd52l2xe1a"},[a("div",{staticClass:"ldio-zf9gth3n7r"},[a("div")])])]),a("AlertMsg"),a("h2",{staticClass:"text-center mt-4"},[t._v("\n        訂單管理\n    ")]),a("div",{staticClass:"container"},[0==t.rawData.length?a("p",{staticClass:"h5 text-center my-5"},[t._v("\n            目前沒有訂單喔~\n        ")]):t._e(),0!=t.rawData.length?a("table",{staticClass:"table table-bordered table-striped table-responsive-lg mt-4 w-100"},[t._m(0),a("tbody",t._l(t.rawData,(function(e,s){return a("tr",{key:s},[a("td",{staticStyle:{"word-break":"break-all"}},[t._v("\n                        "+t._s(e.id)+"\n                    ")]),a("td",{staticClass:"text-center",staticStyle:{"word-break":"keep-all"}},[t._v("\n                        "+t._s(t._f("formatTime")(e.create_at))+"\n                    ")]),a("td",{staticClass:"text-center"},[e.is_paid?a("span",{staticClass:"text-success"},[t._v("已付")]):a("span",{staticClass:"text-danger"},[t._v("未付")])]),a("td",t._l(e.products,(function(e,s){return a("div",{key:s,staticClass:"d-flex flex-column justify-content-center align-items-center py-2"},[a("div",{staticClass:"d-flex justify-content-center align-items-center"},[a("div",[a("img",{attrs:{src:e.product.imageUrl,alt:e.product.title+" 商品圖片",width:"100px"}}),a("br"),a("div",{staticClass:"text-center mt-1"},[t._v("\n                                        "+t._s(e.product.title)+"\n                                    ")])]),a("div",{staticClass:"ml-3"},[t._v("\n                                    數量： "+t._s(e.qty)+"\n                                ")])])])})),0),a("td",{staticClass:"text-center"},[t._v("\n                        "+t._s(t._f("currency")(e.total))+"\n                    ")]),a("td",{staticClass:" ",staticStyle:{"word-break":"break-all"},attrs:{width:"200px"}},[t._v("\n                        "+t._s(e.message)+"\n                    ")]),a("td",[t._v("\n                        訂購 email：\n                        "),a("br"),t._v("\n                        "+t._s(e.user.email)+"\n                        "),a("br"),a("br"),t._v("\n                        收件人地址：\n                        "),a("br"),t._v("\n                        "+t._s(e.user.address)+"\n                        "),a("br"),a("br"),t._v("\n                        收件人姓名：\n                        "),a("br"),t._v("\n                        "+t._s(e.user.name)+"\n                        "),a("br"),a("br"),t._v("\n                        收件人電話：\n                        "),a("br"),t._v("\n                        "+t._s(e.user.tel)+"\n                    ")]),a("td",{staticClass:"text-center"},[a("button",{staticClass:"btn btn-sm btn-outline-info",on:{click:function(a){return t.openAdjustModal(e)}}},[t._v("\n                            編輯\n                        ")])])])})),0)]):t._e(),0!=t.rawData.length?a("nav",{staticClass:"mt-5 mb-4",attrs:{"aria-label":"Page navigation example"}},[a("ul",{staticClass:"pagination justify-content-center"},[a("li",{staticClass:"page-item",class:{disabled:!t.pagination.has_pre}},[t._m(1)]),t._l(t.pagination.total_pages,(function(e){return a("li",{key:e,staticClass:"page-item",class:{active:t.pagination.current_page===e}},[a("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.getProducts(e)}}},[t._v(t._s(e))])])})),a("li",{staticClass:"page-item",class:{disabled:!t.pagination.has_next}},[t._m(2)])],2)]):t._e()]),a("div",{staticClass:"modal fade",attrs:{id:"orderAdjustModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[a("div",{staticClass:"modal-content border-0"},[a("div",{staticClass:"modal-header bg-dark text-white"},[t._m(3),a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"},on:{click:t.closeAdjustModal}},[t._v("×")])])]),a("div",{staticClass:"modal-body"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-2 d-none d-lg-block"}),a("div",{staticClass:"col-12 col-lg-8"},[a("h4",{staticClass:"h5"},[t._v("\n                                訂購商品\n                            ")]),t._l(t.tempOrder.products,(function(e,s){return a("div",{key:s,staticClass:"form-row border border-secondary rounded my-1 pt-4"},[a("div",{staticClass:"col-1 d-none d-lg-block"}),a("div",{staticClass:"form-group col-6 col-lg-5 d-flex flex-column align-items-center"},[a("h5",{staticClass:"text-center h6"},[t._v("\n                                        "+t._s(e.product.title)+"\n                                    ")]),a("img",{staticClass:"img-fluid",attrs:{src:e.product.imageUrl,alt:""}})]),a("div",{staticClass:"form-group col-6 col-lg-4 d-flex flex-column justify-content-center"},[a("h5",{staticClass:"text-center h6"},[t._v("\n                                        訂購數量\n                                    ")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.qty,expression:"item.qty"}],staticClass:"form-control text-right",attrs:{type:"number",min:"0"},domProps:{value:e.qty},on:{input:function(a){a.target.composing||t.$set(e,"qty",a.target.value)}}})]),a("div",{staticClass:"col-2 d-none d-lg-block"})])})),a("div",{staticClass:"form-group mt-3"},[t._m(4),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.total,expression:"tempOrder.total"}],staticClass:"form-control",attrs:{id:"title",type:"number"},domProps:{value:t.tempOrder.total},on:{input:function(e){e.target.composing||t.$set(t.tempOrder,"total",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{staticClass:"h5",attrs:{for:"message"}},[t._v("訂單備註")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.message,expression:"tempOrder.message"}],staticClass:"form-control",attrs:{id:"message",type:"text"},domProps:{value:t.tempOrder.message},on:{input:function(e){e.target.composing||t.$set(t.tempOrder,"message",e.target.value)}}})]),a("div",{staticClass:"form-group mt-5"},[a("h4",{staticClass:"text-center h5"},[t._v("\n                                    收件資訊\n                                ")]),a("label",{staticClass:"mb-0 pl-1",attrs:{for:"email"}},[t._v("訂購人 email")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.user.email,expression:"tempOrder.user.email"}],staticClass:"form-control",attrs:{id:"email",type:"email"},domProps:{value:t.tempOrder.user.email},on:{input:function(e){e.target.composing||t.$set(t.tempOrder.user,"email",e.target.value)}}}),a("label",{staticClass:"mt-3 mb-0 pl-1",attrs:{for:"address"}},[t._v("收件地址")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.user.address,expression:"tempOrder.user.address"}],staticClass:"form-control",attrs:{id:"address",type:"text"},domProps:{value:t.tempOrder.user.address},on:{input:function(e){e.target.composing||t.$set(t.tempOrder.user,"address",e.target.value)}}}),a("label",{staticClass:"mt-3 mb-0 pl-1",attrs:{for:"name"}},[t._v("收件人姓名")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.user.name,expression:"tempOrder.user.name"}],staticClass:"form-control",attrs:{id:"name",type:"text"},domProps:{value:t.tempOrder.user.name},on:{input:function(e){e.target.composing||t.$set(t.tempOrder.user,"name",e.target.value)}}}),a("label",{staticClass:"mt-3 mb-0 pl-1",attrs:{for:"tel"}},[t._v("收件人電話")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempOrder.user.tel,expression:"tempOrder.user.tel"}],staticClass:"form-control",attrs:{id:"tel",type:"text"},domProps:{value:t.tempOrder.user.tel},on:{input:function(e){e.target.composing||t.$set(t.tempOrder.user,"tel",e.target.value)}}})])],2),a("div",{staticClass:"col-2 d-none d-lg-block"})])]),a("div",{staticClass:"modal-footer border-top-0 pt-0"},[a("div",{staticClass:"container-fluid"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-lg-2"}),a("div",{staticClass:"col-lg-8 d-flex justify-content-end pr-0"},[a("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button","data-dismiss":"modal"},on:{click:t.closeAdjustModal}},[t._v("\n                                    取消\n                                ")]),a("button",{staticClass:"btn btn-primary ml-1",attrs:{type:"button"},on:{click:function(e){return t.putAdjustOrderData(t.tempOrder.id)}}},[t._v("\n                                    確認\n                                ")])]),a("div",{staticClass:"col-lg-2"})])])])])])])],1)},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",{staticClass:"thead-dark"},[a("tr",[a("th",{attrs:{width:"100px"}},[t._v("\n                        訂單 id\n                    ")]),a("th",{attrs:{width:"100px"}},[t._v("\n                        下單時間\n                    ")]),a("th",{attrs:{width:"100px"}},[t._v("\n                        付款狀態\n                    ")]),a("th",{attrs:{width:"250px"}},[t._v("\n                        購買商品\n                    ")]),a("th",{attrs:{width:"120px"}},[t._v("\n                        訂單金額\n                    ")]),a("th",{attrs:{width:"200px"}},[t._v("\n                        訂單留言\n                    ")]),a("th",{staticClass:"w-auto text-center align-middle"},[t._v("\n                        收件者資料\n                    ")]),a("th",{attrs:{width:"80px"}},[t._v("\n                        編輯\n                    ")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Previous"}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("«")]),a("span",{staticClass:"sr-only"},[t._v("Previous")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Next"}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("»")]),a("span",{staticClass:"sr-only"},[t._v("Next")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[a("span",[t._v("編輯訂單")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("label",{attrs:{for:"title"}},[a("h4",{staticClass:"text-center h5"},[t._v("訂單金額")])])}],n=a("1157"),i=a.n(n),l=a("a0f9"),o={name:"AdminOrder",components:{AlertMsg:l["a"]},data:function(){return{isLoading:!1,rawData:[],pagination:{},tempOrder:{products:{},user:""}}},created:function(){this.getRawData()},methods:{getRawData:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=this,a="".concat("https://vue-course-api.hexschool.io","/api/").concat("reborn","/admin/orders?page=").concat(t);e.isLoading=!0,e.$http.get(a).then((function(t){e.rawData=t.data.orders,e.pagination=t.data.pagination,e.isLoading=!1}))},openAdjustModal:function(t){this.tempOrder=t,i()("#orderAdjustModal").modal("show")},closeAdjustModal:function(){this.tempOrder={products:{},user:""},i()("#orderAdjustModal").modal("hide")},putAdjustOrderData:function(t){var e=this,a="".concat("https://vue-course-api.hexschool.io","/api/").concat("reborn","/admin/order/").concat(t);e.$http.put(a,{data:e.tempOrder}).then((function(t){t.data.success?e.getRawData():(e.$alertMsg_Bus.$emit("alertMsgEvent","訂單編輯失敗，請重新整理頁面後再次編輯","danger"),setTimeout((function(){location.reload()}),3e3)),e.closeAdjustModal()}))}}},d=o,c=(a("60cd"),a("2877")),m=Object(c["a"])(d,s,r,!1,null,"28d8b9fc",null);e["default"]=m.exports}}]);
//# sourceMappingURL=chunk-20d744c4.64535506.js.map