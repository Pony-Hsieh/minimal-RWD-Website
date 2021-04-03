import Vue from 'vue';

Vue.prototype.$alertMsg_Bus = new Vue();
// vm.$alertMsg_Bus.$emit("alertMsgEvent", vm.showProduct.title, vm.addNum, vm.showProduct.unit, "success");
// 事件名稱： alertMsgEvent
// 傳入參數： 加入商品名稱；加入數量；商品計量單位；狀態

Vue.prototype.$LSCartNum_Bus = new Vue();
// this.$LSCartNum_Bus.$emit("LSCartItemNumEvent", this.userLSCartArr.length);
// 事件名稱： LSCartItemNumEvent
// 傳入參數： LS購物車目前有幾項不同的商品