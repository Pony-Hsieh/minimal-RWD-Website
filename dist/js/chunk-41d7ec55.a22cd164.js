(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-41d7ec55"],{"042f":function(t,r,e){"use strict";e.r(r);var o=function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",{staticClass:"wrapper"},[e("AlertMsg"),e("HeaderComponent"),e("div",{staticClass:"container"},[e("main",{staticClass:"row product"},[e("div",{staticClass:"col-12 col-lg-6 d-flex justify-content-center align-items-center"},[e("img",{staticClass:"img-fluid",attrs:{src:t.showProduct.imageUrl,alt:t.showProduct.title+" 商品圖片"}})]),e("div",{staticClass:"col-12 col-lg-6 mainProductInfo"},[e("div",[e("h1",[t._v(t._s(t.showProduct.title))]),e("a",{attrs:{href:"#",title:"將商品加入至收藏清單"},on:{click:function(t){t.preventDefault()}}},[e("i",{staticClass:"far fa-heart"})])]),t.showProduct.origin_price!==t.showProduct.price?e("del",[t._v("\n          "+t._s(t._f("currency")(t.showProduct.origin_price))+"\n        ")]):t._e(),e("h4",[t._v(t._s(t._f("currency")(t.showProduct.price)))]),e("div",[e("h5",{staticClass:"d-inline"},[t._v("\n            類別   ：\n          ")]),e("a",{attrs:{href:"#"},on:{click:function(r){return r.preventDefault(),t.routerTo(t.showProduct.category)}}},[t._v(t._s(t.showProduct.category))])]),e("div",[e("h5",{staticClass:"d-inline"},[t._v("\n            庫存狀態 ：\n          ")]),t.showProduct.is_enabled?e("span",[t._v("有貨")]):e("span",{staticClass:"text-secondary"},[t._v("已售完")])]),e("hr"),e("div",{domProps:{innerHTML:t._s(t.showProduct.description)}}),e("div",{staticClass:"cartRelevant"},[e("div",{staticClass:"cartCount"},[e("button",{attrs:{type:"button"},on:{click:function(r){return t.changeAddNum("minus")}}},[t._v("\n                －\n            ")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.addNum,expression:"addNum"}],staticClass:" text-center",attrs:{type:"number"},domProps:{value:t.addNum},on:{input:function(r){r.target.composing||(t.addNum=r.target.value)}}}),e("button",{attrs:{type:"button"},on:{click:function(r){return t.changeAddNum("plus")}}},[t._v("\n              ＋  \n            ")])]),e("div",{staticClass:"addToCartArea"},[e("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.addToLSCart}},[t._v("\n              加入購物車\n            ")])])]),e("div",{staticClass:"socialMedia"},[e("ul",{staticClass:"list-unstyled"},[e("li",{staticClass:"facebook"},[e("a",{attrs:{href:"",title:"分享到 Facebook"},on:{click:function(t){t.preventDefault()}}},[e("i",{staticClass:"fab fa-facebook-f"})])]),e("li",{staticClass:"twitter",attrs:{title:"分享到 twitter"},on:{click:function(t){t.preventDefault()}}},[t._m(0)]),e("li",{staticClass:"linkedin",attrs:{title:"分享到 Linkedin"},on:{click:function(t){t.preventDefault()}}},[t._m(1)])])])])]),e("div",{staticClass:"row bestSellers"},[t._m(2),t._l(t.bestSellers,(function(r,o){return e("div",{key:o,staticClass:"col-12 col-sm-6 col-lg-3 singleBestSeller",on:{mouseover:function(e){return t.addHoverProduct(r.id)},mouseleave:t.removeHoverProduct}},[e("div",{staticClass:"my-auto",staticStyle:{cursor:"pointer"},on:{click:function(e){return e.preventDefault(),t.toSingleProductPage(r.id)}}},[e("img",{staticClass:"img-fluid",attrs:{src:r.imageUrl,alt:r.title+" 商品圖片"}})]),e("h4",{staticStyle:{cursor:"pointer"},on:{click:function(e){return e.preventDefault(),t.toSingleProductPage(r.id)}}},[t._v("\n          "+t._s(r.title)+"\n        ")]),r.origin_price!==r.price?e("del",{staticClass:"d-block text-center",staticStyle:{cursor:"pointer"},on:{click:function(e){return e.preventDefault(),t.toSingleProductPage(r.id)}}},[t._v("\n          "+t._s(t._f("currency")(r.origin_price))+"\n        ")]):t._e(),e("h5",{staticStyle:{cursor:"pointer"},on:{click:function(e){return e.preventDefault(),t.toSingleProductPage(r.id)}}},[t._v("\n          "+t._s(t._f("currency")(r.price))+"\n        ")]),e("ul",{staticClass:"list-unstyled hoverWidget",class:{ing:t.hoverProductId===r.id},on:{mouseover:function(e){return t.addHoverProduct(r.id)},mouseleave:t.removeHoverProduct}},[e("li",{staticClass:"like"},[e("a",{attrs:{href:"#",title:"收藏此商品"},on:{click:function(t){t.preventDefault()}}},[e("i",{staticClass:"far fa-heart"})])]),e("li",{staticClass:"addCart"},[e("a",{attrs:{href:"#",title:"加入購物車"},on:{click:function(e){return e.preventDefault(),t.addToLSCart(r)}}},[e("i",{staticClass:"fas fa-cart-plus"})])])])])}))],2)]),e("ShippingDescription"),e("IgPost"),e("FooterComponent")],1)},i=[function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("a",{attrs:{href:""}},[e("i",{staticClass:"fab fa-twitter"})])},function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("a",{attrs:{href:""}},[e("i",{staticClass:"fab fa-linkedin-in"})])},function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",{staticClass:"col-12"},[e("h3",{staticClass:"h4"},[t._v("\n          熱銷商品\n        ")])])}],n=(e("ac6a"),e("c5f6"),e("7514"),e("f983")),s=e("4900"),c=e("c5a6"),a=e("e741"),u=e("a0f9"),d={components:{HeaderComponent:n["a"],ShippingDescription:s["a"],IgPost:c["a"],FooterComponent:a["a"],AlertMsg:u["a"]},data:function(){return{isLoading:!1,rawProducts:[],showProduct:[],productId:"",userLSCartArr:[],addNum:1,bestSellers:[],hoverProductId:""}},watch:{$route:function(t,r){t.query!==r.query?(this.judgeProductByRouterParam(),this.getRawProducts(),this.scrollTop()):this.scrollTop()}},created:function(){this.judgeProductByRouterParam(),this.getRawProducts(),this.getLSCart(),this.scrollTop()},methods:{judgeProductByRouterParam:function(){this.productId=this.$route.query.id},getRawProducts:function(){var t=this,r="".concat("https://vue-course-api.hexschool.io","/api/").concat("reborn","/products/all");t.isLoading=!0,t.$http.get(r).then((function(r){t.rawProducts=r.data.products,t.bestSellers=t.rawProducts.slice(0,4),t.getTheProduct(),t.isLoading=!1}))},getTheProduct:function(){var t=this,r=t.rawProducts.find((function(r){return r.id===t.productId}));t.showProduct=r},routerTo:function(t){var r="";"男士"===t?r="Men":"女士"===t?r="Women":"鞋類"===t?r="Shoes":"運動"===t&&(r="Sports"),this.$router.push({path:"/shop",query:{category:r}})},getLSCart:function(){this.userLSCartArr=JSON.parse(localStorage.getItem("userLSCart"))||[],this.sendLSCartItemNum()},changeAddNum:function(t){var r=this;"minus"===t?1===r.addNum?r.$alertMsg_Bus.$emit("alertMsgEvent","加入購物車的數量不能少於 1 喔~","warning",2e3):r.addNum=r.addNum-1:r.addNum=r.addNum+1},addToLSCart:function(){var t=this,r=[],e={},o={product_id:t.showProduct.id,qty:Number(t.addNum),imageUrl:t.showProduct.imageUrl,title:t.showProduct.title,origin_price:t.showProduct.origin_price,price:t.showProduct.price,unit:t.showProduct.unit};t.userLSCartArr=JSON.parse(localStorage.getItem("userLSCart"))||[],t.userLSCartArr.forEach((function(t){r.push(t.product_id)})),-1===r.indexOf(t.showProduct.id)?(t.userLSCartArr.push(o),localStorage.setItem("userLSCart",JSON.stringify(t.userLSCartArr))):(t.userLSCartArr.forEach((function(r,o){t.showProduct.id===r.product_id&&(e={product_id:r.product_id,qty:Number(r.qty)+Number(t.addNum),imageUrl:r.imageUrl,title:r.title,origin_price:r.origin_price,price:r.price,unit:r.unit},t.userLSCartArr.splice(o,1))})),t.userLSCartArr.push(e),localStorage.setItem("userLSCart",JSON.stringify(t.userLSCartArr))),t.$alertMsg_Bus.$emit("alertMsgEvent","已加入 ".concat(t.addNum," ").concat(t.showProduct.unit,"<br>").concat(t.showProduct.title,"<br>至購物車")),t.addNum=1,t.getLSCart()},sendLSCartItemNum:function(){this.$LSCartNum_Bus.$emit("LSCartItemNumEvent",this.userLSCartArr.length)},toSingleProductPage:function(t){t===this.$route.query.id?this.scrollTop():this.$router.push({path:"/shop/singleProduct",query:{id:t}})},addHoverProduct:function(t){t!==this.hoverProductId&&(this.hoverProductId=t)},removeHoverProduct:function(){this.hoverProductId=""},scrollTop:function(){(document.body.clientWidth||document.documentElement.clientWidth)>=992?document.body.scrollTop=document.documentElement.scrollTop=100:document.body.scrollTop=document.documentElement.scrollTop=35}}},l=d,f=(e("d22c"),e("2877")),h=Object(f["a"])(l,o,i,!1,null,"f372627e",null);r["default"]=h.exports},"0a49":function(t,r,e){var o=e("9b43"),i=e("626a"),n=e("4bf8"),s=e("9def"),c=e("cd1c");t.exports=function(t,r){var e=1==t,a=2==t,u=3==t,d=4==t,l=6==t,f=5==t||l,h=r||c;return function(r,c,p){for(var m,v,g=n(r),C=i(g),P=o(c,p,3),_=s(C.length),S=0,y=e?h(r,_):a?h(r,0):void 0;_>S;S++)if((f||S in C)&&(m=C[S],v=P(m,S,g),t))if(e)y[S]=v;else if(v)switch(t){case 3:return!0;case 5:return m;case 6:return S;case 2:y.push(m)}else if(d)return!1;return l?-1:u||d?d:y}}},1169:function(t,r,e){var o=e("2d95");t.exports=Array.isArray||function(t){return"Array"==o(t)}},"41ad":function(t,r,e){},7514:function(t,r,e){"use strict";var o=e("5ca1"),i=e("0a49")(5),n="find",s=!0;n in[]&&Array(1)[n]((function(){s=!1})),o(o.P+o.F*s,"Array",{find:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),e("9c6c")(n)},cd1c:function(t,r,e){var o=e("e853");t.exports=function(t,r){return new(o(t))(r)}},d22c:function(t,r,e){"use strict";e("41ad")},e853:function(t,r,e){var o=e("d3f4"),i=e("1169"),n=e("2b4c")("species");t.exports=function(t){var r;return i(t)&&(r=t.constructor,"function"!=typeof r||r!==Array&&!i(r.prototype)||(r=void 0),o(r)&&(r=r[n],null===r&&(r=void 0))),void 0===r?Array:r}}}]);
//# sourceMappingURL=chunk-41d7ec55.a22cd164.js.map