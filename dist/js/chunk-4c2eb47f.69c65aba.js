(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4c2eb47f"],{"04c8":function(t,e,r){},"3df8":function(t,e,r){"use strict";r("9af4")},"9af4":function(t,e,r){},b78f:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"wrapper"},[r("loading",{attrs:{active:t.isLoading},on:{"update:active":function(e){t.isLoading=e}}},[r("div",{staticClass:"loadingio-spinner-eclipse-qd52l2xe1a"},[r("div",{staticClass:"ldio-zf9gth3n7r"},[r("div")])])]),r("AlertMsg"),r("HeaderComponent"),r("div",{staticClass:"container all"},[r("div",{staticClass:"row pt-5"},[t._m(0),r("div",{staticClass:"col-12 col-lg-3"},[r("div",{staticClass:"filterCard categoryFilter",class:{ing:!0===t.filterCardStatus["category"]}},[r("h5",{on:{click:function(e){return t.switchCardStatus("category")}}},[t._v("\n                        依據 類別 篩選\n                             \n                        "),r("i",{staticClass:"fas fa-angle-down"})]),r("div",{staticClass:"filterCardContent",class:{ing:!0===t.filterCardStatus["category"]}},[r("ul",{staticClass:"list-unstyled categoryList"},[r("li",[r("a",{class:{nowCategory:"all"===t.showCategory},attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.showCategory="all",t.saveFilteredArray()}}},[t._v("全部")])]),r("li",[r("a",{class:{nowCategory:"rawMen"===t.showCategory},attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.showCategory="rawMen",t.saveFilteredArray()}}},[t._v("男士")])]),r("li",[r("a",{class:{nowCategory:"rawWomen"===t.showCategory},attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.showCategory="rawWomen",t.saveFilteredArray()}}},[t._v("女士")])]),r("li",[r("a",{class:{nowCategory:"rawShoes"===t.showCategory},attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.showCategory="rawShoes",t.saveFilteredArray()}}},[t._v("鞋類")])]),r("li",[r("a",{class:{nowCategory:"rawSports"===t.showCategory},attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.showCategory="rawSports",t.saveFilteredArray()}}},[t._v("運動")])])])])]),r("div",{staticClass:"filterCard priceFilter mt-5",class:{ing:!0===t.filterCardStatus["price"]}},[r("h5",{on:{click:function(e){return t.switchCardStatus("price")}}},[t._v("\n                        依據 金額 篩選\n                             \n                        "),r("i",{staticClass:"fas fa-angle-down"})]),r("div",{staticClass:"filterCardContent"},[r("vue-slider",{attrs:{"dot-size":"20",max:"5000",interval:"100",lazy:!0},model:{value:t.priceRange,callback:function(e){t.priceRange=e},expression:"priceRange"}}),r("div",{staticClass:"w-100"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.priceRange[0],expression:"priceRange[0]"}],attrs:{type:"number"},domProps:{value:t.priceRange[0]},on:{input:function(e){e.target.composing||t.$set(t.priceRange,0,e.target.value)}}}),t._v("\n                            到\n                            "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.priceRange[1],expression:"priceRange[1]"}],attrs:{type:"number"},domProps:{value:t.priceRange[1]},on:{input:function(e){e.target.composing||t.$set(t.priceRange,1,e.target.value)}}})]),r("div",{staticClass:"w-100"},[r("button",{staticClass:"btn btn-sm",attrs:{type:"button"},on:{click:t.saveFilteredArray}},[t._v("\n                                套用金額範圍\n                            ")])])],1)])]),r("main",{staticClass:"col-12 col-lg-9"},[r("div",{staticClass:"container-fluid"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-12 col-lg-6 p-0 pl-lg-4 showNowCategory",attrs:{id:"appliedCategoryTitle"}},[r("h3",{staticClass:"h4"},[t._v("\n                                "+t._s(t.showString[t.showCategory])+"\n                                ("+t._s(t.filteredArray.length)+")\n                            ")])]),r("div",{staticClass:"col-12 col-lg-6 p-0 pr-lg-4 filterDropDown"},[r("div",{staticClass:"container-fluid"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col p-0 mr-1"},[r("select",{directives:[{name:"model",rawName:"v-model",value:t.showCategory,expression:"showCategory"}],staticClass:"w-100",staticStyle:{height:"42px"},on:{change:[function(e){var r=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.showCategory=e.target.multiple?r:r[0]},t.saveFilteredArray]}},[r("option",{attrs:{value:"all",disabled:""}},[t._v("\n                                                選擇類別\n                                            ")]),r("option",{attrs:{value:"all"}},[t._v("\n                                                全部\n                                            ")]),r("option",{attrs:{value:"rawMen"}},[t._v("\n                                                男士\n                                            ")]),r("option",{attrs:{value:"rawWomen"}},[t._v("\n                                                女士\n                                            ")]),r("option",{attrs:{value:"rawShoes"}},[t._v("\n                                                鞋類\n                                            ")]),r("option",{attrs:{value:"rawSports"}},[t._v("\n                                                運動\n                                            ")])])]),r("div",{staticClass:"col p-0 ml-1"},[r("select",{directives:[{name:"model",rawName:"v-model",value:t.pageUnit,expression:"pageUnit"}],staticClass:"w-100",staticStyle:{height:"42px"},on:{change:[function(e){var r=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.pageUnit=e.target.multiple?r:r[0]},t.getPage]}},[r("option",{attrs:{value:"9",default:""}},[t._v("\n                                                每頁顯示 9 樣商品\n                                            ")]),r("option",{attrs:{value:"6"}},[t._v("\n                                                每頁顯示 6 樣商品\n                                            ")]),r("option",{attrs:{value:"3"}},[t._v("\n                                                每頁顯示 3 樣商品\n                                            ")])])])])])])]),r("div",{staticClass:"row productInfo"},t._l(t.showProducts,(function(e,a){return r("div",{key:a,staticClass:"col-12 col-sm-6 col-lg-4 singleProductInfo"},[r("div",{staticStyle:{cursor:"pointer"},on:{mouseover:function(r){return t.addHoverProduct(e.id)},mouseleave:t.removeHoverProduct,click:function(r){return r.preventDefault(),t.toSingleProductPage(e.id)}}},[r("img",{attrs:{src:e.imageUrl,alt:e.title+" 商品圖片"}})]),r("h4",{staticStyle:{cursor:"pointer"},on:{click:function(r){return r.preventDefault(),t.toSingleProductPage(e.id)}}},[t._v("\n                                "+t._s(e.title)+"\n                            ")]),r("div",{staticClass:"d-flex flex-column",staticStyle:{height:"80px",cursor:"pointer"},on:{click:function(r){return r.preventDefault(),t.toSingleProductPage(e.id)}}},[e.origin_price!==e.price?r("del",[t._v(t._s(t._f("currency")(e.origin_price)))]):t._e(),r("h5",[t._v(t._s(t._f("currency")(e.price)))])]),r("ul",{staticClass:"list-unstyled hoverWidget",class:{ing:t.hoverProductId===e.id},on:{mouseover:function(r){return t.addHoverProduct(e.id)},mouseleave:t.removeHoverProduct}},[r("li",{staticClass:"like"},[r("a",{attrs:{href:"#",title:"收藏此商品"},on:{click:function(t){t.preventDefault()}}},[r("i",{staticClass:"far fa-heart"})])]),r("li",{staticClass:"addCart"},[r("a",{attrs:{href:"#",title:"加入購物車"},on:{click:function(r){return r.preventDefault(),t.addToLSCart(e)}}},[r("i",{staticClass:"fas fa-cart-plus"})])])])])})),0),r("nav",{staticClass:"my-4",attrs:{"aria-label":"Page navigation example"}},[r("ul",{staticClass:"pagination justify-content-center"},[r("li",{staticClass:"page-item",class:{disabled:1===t.currentPageNumber}},[r("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Previous"},on:{click:function(e){return e.preventDefault(),t.updateCurrentPageNumber(t.currentPageNumber-1)}}},[r("span",{attrs:{"aria-hidden":"true"}},[t._v("«")]),r("span",{staticClass:"sr-only"},[t._v("Previous")])])]),t._l(t.totalPageNumber,(function(e){return r("li",{key:e,staticClass:"page-item",class:{active:t.currentPageNumber===e}},[r("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(r){return r.preventDefault(),t.updateCurrentPageNumber(e)}}},[t._v(t._s(e))])])})),r("li",{staticClass:"page-item",class:{disabled:t.currentPageNumber===t.totalPageNumber}},[r("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Next"},on:{click:function(e){return e.preventDefault(),t.updateCurrentPageNumber(t.currentPageNumber+1)}}},[r("span",{attrs:{"aria-hidden":"true"}},[t._v("»")]),r("span",{staticClass:"sr-only"},[t._v("Next")])])])],2)])])])])]),r("ShippingDescription"),r("IgPost"),r("FooterComponent")],1)},i=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"col-12 d-lg-none"},[r("h2",{staticClass:"text-center"},[t._v("\n                    商城\n                ")])])}],o=(r("ac6a"),r("c5f6"),r("1157")),s=r.n(o),n=r("f983"),c=r("4900"),l=r("c5a6"),u=r("e741"),d=r("a0f9"),g={name:"Shop",components:{HeaderComponent:n["a"],ShippingDescription:c["a"],IgPost:l["a"],FooterComponent:u["a"],AlertMsg:d["a"]},data:function(){return{isLoading:!1,rawProducts:[],rawCategoryProducts:{all:[],rawMen:[],rawWomen:[],rawShoes:[],rawSports:[]},showCategory:"all",showString:{all:"全部",rawMen:"男士",rawWomen:"女士",rawShoes:"鞋類",rawSports:"運動"},categoryFilterArray:[],priceRange:[0,5e3],priceFilterArray:[],filteredArray:[],showProducts:[],pageUnit:9,currentPageNumber:1,totalPageNumber:1,hoverProductId:"",userLSCartArr:[],clientWidth:0,filterCardStatus:{category:!0,price:!0}}},watch:{$route:function(t,e){t.query!==e.query&&(this.judgeCategoryByRouterParam(),this.saveFilteredArray(),this.scrollTop(),document.body.scrollTop=document.documentElement.scrollTop=0)},clientWidth:{handler:function(t){t<992?(this.filterCardStatus.category=!1,this.filterCardStatus.price=!1):(this.filterCardStatus.category=!0,this.filterCardStatus.price=!0)}}},created:function(){this.judgeCategoryByRouterParam(),this.getRawProducts(),this.getLSCart()},mounted:function(){var t=this;t.clientWidth=document.body.clientWidth,t.clientWidth<992?(t.filterCardStatus.category=!1,t.filterCardStatus.price=!1):(t.filterCardStatus.category=!0,t.filterCardStatus.price=!0);var e=document.querySelector("body"),r=new ResizeObserver((function(){t.clientWidth=document.body.clientWidth}));r.observe(e)},methods:{judgeCategoryByRouterParam:function(){"Men"===this.$route.query.category?this.showCategory="rawMen":"Women"===this.$route.query.category?this.showCategory="rawWomen":"Shoes"===this.$route.query.category?this.showCategory="rawShoes":"Sports"===this.$route.query.category&&(this.showCategory="rawSports")},getRawProducts:function(){var t=this,e="".concat("https://vue-course-api.hexschool.io","/api/").concat("reborn","/products/all");t.isLoading=!0,t.$http.get(e).then((function(e){t.rawProducts=e.data.products,t.rawCategoryProducts.all=t.rawProducts,t.makeRawCategoryArr(),t.applyCategoryFilter(),t.applyPriceFilter(),t.getPage(),t.saveFilteredArray(),t.judgeShowProductsByPage(),t.isLoading=!1}))},makeRawCategoryArr:function(){for(var t=this,e=0;e<t.rawProducts.length;e++)"男士"===t.rawProducts[e].category&&t.rawCategoryProducts.rawMen.push(t.rawProducts[e]),"女士"===t.rawProducts[e].category&&t.rawCategoryProducts.rawWomen.push(t.rawProducts[e]),"鞋類"===t.rawProducts[e].category&&t.rawCategoryProducts.rawShoes.push(t.rawProducts[e]),"運動"===t.rawProducts[e].category&&t.rawCategoryProducts.rawSports.push(t.rawProducts[e])},applyCategoryFilter:function(){var t=this;t.categoryFilterArray=[],t.categoryFilterArray=t.rawCategoryProducts[t.showCategory]},applyPriceFilter:function(){var t=this;t.priceRange[0]<0?(t.priceRange[0]=0,t.$alertMsg_Bus.$emit("alertMsgEvent","篩選金額需要介於 0 ~ 5000 之間喔~","warning")):t.priceRange[1]>5e3&&(t.priceRange[1]=5e3,t.$alertMsg_Bus.$emit("alertMsgEvent","篩選金額需要介於 0 ~ 5000 之間喔~","warning")),t.priceFilterArray=[];var e=t.categoryFilterArray.filter((function(e){if(e.price>=Number(t.priceRange[0])&&e.price<=Number(t.priceRange[1]))return 1===e.is_enabled}));t.priceFilterArray=e},saveFilteredArray:function(){this.applyCategoryFilter(),this.applyPriceFilter(),this.filteredArray=this.priceFilterArray,this.getPage()},getPage:function(){var t=this;t.totalPageNumber=Math.ceil(t.filteredArray.length/t.pageUnit),t.updateCurrentPageNumber(1)},updateCurrentPageNumber:function(t){this.currentPageNumber=t,this.judgeShowProductsByPage(),this.scrollTop()},judgeShowProductsByPage:function(){var t=this,e=t.filteredArray.filter((function(e,r){if(r>=(t.currentPageNumber-1)*t.pageUnit&&t.currentPageNumber*t.pageUnit-1>=r)return!0}));t.showProducts=e},switchCardStatus:function(t){this.clientWidth<992&&(this.filterCardStatus[t]=!this.filterCardStatus[t])},addHoverProduct:function(t){t!==this.hoverProductId&&(this.hoverProductId=t)},removeHoverProduct:function(){this.hoverProductId=""},getLSCart:function(){this.userLSCartArr=JSON.parse(localStorage.getItem("userLSCart"))||[],this.sendLSCartItemNum()},addToLSCart:function(t){var e=this,r=[],a={},i={product_id:t.id,qty:1,imageUrl:t.imageUrl,title:t.title,origin_price:t.origin_price,price:t.price,unit:t.unit};e.userLSCartArr=JSON.parse(localStorage.getItem("userLSCart"))||[],e.userLSCartArr.forEach((function(t){r.push(t.product_id)})),-1===r.indexOf(t.id)?(e.userLSCartArr.push(i),localStorage.setItem("userLSCart",JSON.stringify(e.userLSCartArr))):(e.userLSCartArr.forEach((function(r,i){t.id===r.product_id&&(a={product_id:r.product_id,qty:r.qty+1,imageUrl:r.imageUrl,title:r.title,origin_price:r.origin_price,price:r.price,unit:r.unit},e.userLSCartArr.splice(i,1))})),e.userLSCartArr.push(a),localStorage.setItem("userLSCart",JSON.stringify(e.userLSCartArr))),e.$alertMsg_Bus.$emit("alertMsgEvent","已加入 1 ".concat(t.unit,"<br>").concat(t.title,"<br>至購物車")),e.getLSCart()},sendLSCartItemNum:function(){this.$LSCartNum_Bus.$emit("LSCartItemNumEvent",this.userLSCartArr.length)},toSingleProductPage:function(t){this.$router.push({path:"/shop/singleProduct",query:{id:t}})},scrollTop:function(){if((document.body.clientWidth||document.documentElement.clientWidth)>=992)window.scrollTo({top:0,behavior:"smooth"});else if((document.body.scrollTop||document.documentElement.scrollTop)>=300){var t=s()("#appliedCategoryTitle").offset().top;window.scrollTo({top:t-80,behavior:"smooth"})}else if(!0===this.filterCardStatus.category||!0===this.filterCardStatus.price){var e=s()("#appliedCategoryTitle").offset().top;window.scrollTo({top:e-80,behavior:"smooth"})}else window.scrollTo({top:0})}}},p=g,h=(r("3df8"),r("f3e8"),r("2877")),f=Object(h["a"])(p,a,i,!1,null,"085976df",null);e["default"]=f.exports},f3e8:function(t,e,r){"use strict";r("04c8")}}]);
//# sourceMappingURL=chunk-4c2eb47f.69c65aba.js.map