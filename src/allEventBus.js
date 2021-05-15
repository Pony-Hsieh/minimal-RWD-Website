import Vue from "vue";

Vue.prototype.$alertMsg_Bus = new Vue();
// vm.$alertMsg_Bus.$on("alertMsgEvent", (msg, status = "success", removeTime = 3000) => {});
// 事件名稱： alertMsgEvent
// 傳入參數： 加入商品名稱；加入數量；商品計量單位；狀態

Vue.prototype.$LSCartNum_Bus = new Vue();
// vm.$LSCartNum_Bus.$on("LSCartItemNumEvent", (param) => {});
// 事件名稱： LSCartItemNumEvent
// 傳入參數： LS購物車目前有幾項不同的商品