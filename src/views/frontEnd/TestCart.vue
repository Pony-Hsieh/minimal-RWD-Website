<template>
  <div>


    <button type="button" class="btn btn-lg btn-outline-dark" @click="asyncTest">發送訂單至伺服器 = 送資料到伺服器購物車 +
      送出訂單至伺服器</button>

    <input v-model.lazy.trim="inputCouponCode" type="text" placeholder="請輸入 coupon 代碼" class="form-control">
    inputCouponCode{{ inputCouponCode }}
    <br />
    infoMsg{{ infoMsg }}

    <br />
    <!-- calLSTotal -->
    <button type="button" class="btn  btn-outline-primary" @click="calLSTotal">calLSTotal</button>
    <br />
    LSTotal {{LSTotal}}
    <br />
    LSFinal_total {{LSFinal_total}}


    <HeaderComponent />

    <!-- 新版購物車內容 -->
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="h3 text-center mt-4">
            新版購物車
          </h1>
          <hr>

          <!-- 如果購物車為空，則顯示此區塊 -->
          <div v-if="userLSCartArr.length === 0" class="text-center my-5">
            目前購物車內沒有商品喔，趕快ㄑ選購商品吧~~
            <router-link to="/shop">
              點我去選購商品，GOGOGO ！！！
            </router-link>
          </div>

          <table v-if="userLSCartArr.length !== 0" class="talbe mt-4 w-100 table-striped table-responsive-lg">
            <thead>
              <tr>
                <th width="120px" class="text-center py-3">
                  商品
                </th>
                <th width="200PX" class="text-center">
                  數量
                </th>
                <th width="120px" class="text-center d-none d-sm-table-cell">
                  單價
                </th>
                <th width="120px" class="text-center">
                  小計
                </th>
                <th width="100px" class="text-center">
                  移除
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- <tr v-for="item in userLSCartArr" :key="item.product_id"> -->
              <tr v-for="item in showingCartArr" :key="item.product_id">
                <!-- 商品圖片、商品名稱 -->
                <td class="text-center py-2 py-sm-3">
                  <img :src="item.imageUrl" width="70px" alt="" class="mb-sm-2">
                  <br>
                  {{ item.title }}
                </td>
                <!-- 數量 -->
                <td class="text-center editProductQty">
                  <!-- 減少 -->
                  <button class="qtyChange_btn" @click.prevent="minusLSCart(item)">
                    －
                  </button>
                  <input v-model.lazy="item.qty" type="number"
                    :class="{'ing':item.product_id === editingLSQtyItem.product_id}"
                    @click="judgeLSEditingQtyItem(item)" @keyup.esc="removeLSEditingQtyItem()"
                    @blur="editLSCartQty(item), removeLSEditingQtyItem()"
                    @keyup.enter="editLSCartQty(item), removeLSEditingQtyItem()">
                  <button class="qtyChange_btn" @click.prevent="plusLSCart(item)">
                    ＋
                  </button>
                </td>
                <!-- 單價 -->
                <td class="text-right pr-3 d-none d-sm-table-cell">
                  <!-- 如果原價和售價不同時，用刪除線顯示原價 -->
                  <del v-if="item.origin_price !== item.price">
                    {{ item.origin_price | currency }}
                    <br>
                  </del>
                  <span>
                    {{ item.price | currency }}
                  </span>
                  <!-- 有套用 coupon 時，顯示套用後的價格 -->
                  <!-- <span v-if="item.product.price !== item.final_total">
                    {{ item.final_total/item.qty | currency }}
                    <br>
                  </span>
                  <span v-else>
                    {{ item.product.price | currency }}
                  </span> -->
                </td>
                <!-- 小計 -->
                <td class="text-right pr-3">
                  <span v-if="item.final_total">
                    {{ item.final_total | currency }}
                  </span>
                  <span v-else>
                    {{ item.price * item.qty | currency }}
                  </span>
                </td>
                <!-- 移除 -->
                <td class="text-center">
                  <button class="btn btn-outline-danger btn-sm" @click="openLSDeleteModal(item)">
                    <i class="fas fa-times" />
                  </button>
                  <!-- 這邊要傳入 訂單id，也就是 item.id -->
                  <!-- 如果想要傳入 商品id 的話，那就是 item.product_id -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 套用優惠碼相關部分 -->

      <!-- 訂單金額 -->
      <!-- <div v-if="cartItem.length != 0" class="row mt-5 cartTotal">
                <div class="col-3 col-lg-5" />
                <div class="col-9 col-lg-7 d-flex justify-content-between">
                    <h6>總計</h6>
                    <del v-if="total !== final_total" class="h6 mr-1">{{ total | currency }}</del>
                    <h6 v-else>
                        {{ total | currency }}
                    </h6>
                </div>
                <div v-if="total !== final_total" class="col-3 col-lg-5" />
                <div v-if="total !== final_total"
                    class="col-9 col-lg-7 d-flex justify-content-between align-items-center">
                    <h6 class="text-primary">
                        折扣後價格
                    </h6>
                    <h5 class="mr-1">
                        {{ final_total | currency }}
                    </h5>
                </div>
            </div> -->

      <!-- 客戶收件資料及聯絡資料 、 送出訂單 -->
      <!-- <div v-if="cartItem.length != 0" class="row my-5 justify-content-center"> -->
      <div class="row my-5 justify-content-center">
        <h5 class="col-12 text-center">
          訂購資訊
        </h5>
        <validation-observer v-slot="{ invalid }" class="col-md-6">
          <form @submit.prevent="createOrder">
            <!-- 訂購人 email -->
            <validation-provider v-slot="{ errors, classes }" rules="required|email">
              <div class="form-group">
                <!-- 輸入框 -->
                <label for="userEmail">訂購人 email</label>
                <input id="userEmail" v-model="form.user.email" type="email" name="訂購人 email" class="form-control"
                  :class="classes">
                <!-- 錯誤訊息 -->
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </validation-provider>

            <!-- 收件人姓名 -->
            <validation-provider v-slot="{ errors, classes }" rules="required">
              <div class="form-group">
                <label for="userName">收件人姓名</label>
                <input id="userName" v-model="form.user.name" type="text" name="收件人姓名" class="form-control"
                  :class="classes">
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </validation-provider>

            <!-- 收件人電話 -->
            <validation-provider v-slot="{ errors, classes }" rules="required">
              <div class="form-group">
                <label for="userTel">收件人電話</label>
                <input id="userTel" v-model="form.user.tel" type="tel" name="收件人電話" class="form-control"
                  :class="classes">
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </validation-provider>

            <!-- 收件人地址 -->
            <validation-provider v-slot="{ errors, classes }" rules="required">
              <div class="form-group">
                <label for="userAddress">收件人地址</label>
                <input id="userAddress" v-model="form.user.address" type="text" name="收件人地址" class="form-control"
                  :class="classes">
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </validation-provider>

            <!-- 訂單留言 -->
            <div class="form-group">
              <label for="comment">留言</label>
              <textarea id="comment" v-model="form.message" class="form-control" style="resize: none; height: 200px;" />
            </div>


            <!-- 送出訂單 -->
            <div class="text-right">
              <button class="btn btn-danger" :disabled="invalid" @click.prevent="createOrder">
                送出訂單
              </button>
            </div>
          </form>
        </validation-observer>
      </div>

      <!-- minus、移除 確認刪除用 Modal  -->
      <div id="LSDeleteModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 id="exampleModalLabel" class="modal-title">
                欲移出購物車的商品名稱：
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <span class="h5">{{ deletingLSItem.title }}</span>
            </div>
            <div class="modal-footer">
              <div class="container">
                <div class="row">
                  <button type="button" class="btn btn-secondary col mr-1" data-dismiss="modal" @click="getLSCart">
                    否，關閉此彈跳視窗
                  </button>
                  <button type="button" class="btn btn-danger col ml-1" @click="deleteLSCart(deletingLSItem)">
                    <!-- <button type="button" class="btn btn-danger col ml-1" @click="deleteLSCart(this.deletingLSItem)"> -->
                    是，將此商品移出購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>


    <FooterComponent />

  </div>
</template>


<script>
  import $ from "jquery";

  import HeaderComponent from '@/components/HeaderComponent.vue';
  import FooterComponent from '@/components/FooterComponent.vue';

  import eventBus from '@/eventBus';

  export default {
    components: {
      HeaderComponent,
      FooterComponent
    },

    data: function () {
      return {

        userLSCartArr: [],   // 暫存在 LS 中的購物車內容
        showingCartArr: [],
        LSTotal: 0,       // LS 購物車原價
        LSFinal_total: 0, // LS 購物車最終售價 (可能是有套用 coupon 的價格)

        userLSCartArrNum: 0, // 暫存在 LS 中的購物車品項數量(有幾項不同種類的商品)
        userLSCompareArr: [],// 用以比對是否存在相同產品用的 array
        // 單一商品必須的資料結構
        // single: {
        //   product_id: "", // 商品 id   // API 需要
        //   qty: 1,         // 欲購買數量 // API 需要 
        //   imageUrl: "",  // 圖片網址
        //   title: "",     // 商品名稱
        //   origin_price: 0, // 單價
        //   price: 0,        // 折扣價(不包含 coupon 的折扣)
        // },

        deletingLSItem: {}, // 暫存 欲刪除 的商品內容
        editingLSQtyItem: {},    // 暫存 編輯數量中 的商品內容
        editingLSOriginalQty: 1, // 暫存 編輯數量中商品的 原始數量

        inputCouponCode: "", // 使用者輸入的 coupon code
        infoMsg: "", // 提示消費者這個 coupon 可否使用
        usingCoupon: { // 已經套用 的 coupon
          title: "", // coupon 名稱
          code: "", // 優惠碼
          percent: 100, // 折數，80 代表 8折
        },
        // couponData: {
        //   code: "ALL_20_OFF",
        //   due_date: 1641427200000,
        //   due_date_rawdata: "2022-01-06",
        //   id: "-MQLnAPEp4imvkTw-vc1",
        //   is_enabled: 1,
        //   num: "1",
        //   percent: 80,
        //   title: "全館 8 折  coupon",
        // },

        testUserData: { // 訂單測試用 使用者資料
          user: {
            name: "test",
            email: "test@gmail.com",
            tel: "0987654321",
            address: "台灣台灣台灣台灣"
          },
          message: "這是留言這是留言這是留言這是留言這是留言"
        },

        form: { // 用來暫存訂購人資訊、以及收件資訊
          user: {
            name: "",
            email: "",
            tel: "",
            address: "",
          },
          message: "",
        },



        // 以下應該可刪 ↓↓↓↓↓↓↓↓↓↓
        // 以下應該可刪 ↓↓↓↓↓↓↓↓↓↓
        total: "",       // 購物車原價
        final_total: "", // 購物車最終售價


        // isLoading: false,
        // status: {
        //   fileUploading: false,
        // },
      };
    },

    watch: {
      "inputCouponCode": function () {
        this.applyCoupon();
      }
    },

    created() {
      // this.getCart();
      this.getLSCart();
      this.getLSCoupon();
      this.scrollTop();
    },

    mounted() {
      const vm = this;
      $('#LSDeleteModal').on('hidden.bs.modal', () => { // 當 #LSDeleteModal 這個 modal 觸發 .hide 時，會執行這個函式的內容
        vm.getLSCart();
      });
    },

    methods: {

      // 從 LS 中取得購物車資料
      getLSCart() {
        this.userLSCartArr = JSON.parse(localStorage.getItem("userLSCart")) || []; // 有機會可以嘗試使用 ?? (空位合併 Nullish Coalescing)
        this.showingCartArr = (JSON.parse(localStorage.getItem("userLSCart")) || []).reverse(); // 反轉陣列，這樣最後新增的商品會在最上方  // .reverse() 會修改原始陣列，因此不能寫 this.userLSCartArr.reverse()
        this.userLSCartArrNum = this.userLSCartArr.length;
      },

      // 從 LS 中取得 coupon 資料
      getLSCoupon(){
        this.usingCoupon = JSON.parse(localStorage.getItem("LSCoupon")) || [];
      },

      // 新增 LS 購物車內商品，數量 +1
      plusLSCart(nowProduct) {
        const vm = this;
        let tempAddObj = {}; // 用以 暫存要加入購物車的資料

        for (let i = 0; i < vm.userLSCartArr.length; i++) { // 透過迴圈
          if (nowProduct.product_id === vm.userLSCartArr[i].product_id) { // 找相同的產品在哪
            tempAddObj = vm.userLSCartArr[i];
            tempAddObj.qty = Number(vm.userLSCartArr[i].qty) + 1;
            // Object.assign(tempAddObj, { qty: Number(vm.userLSCartArr[i].qty) + 1 }); // 這個寫法也 OK // 這個寫法應該比較適合用於一次修改大量物件屬性
            vm.userLSCartArr.splice(i, 1, tempAddObj); // 再將原本的資料刪除 // 並插入新的資料
            break; // 終止迴圈 // .forEach() 無法終止迴圈
          }
        }
        localStorage.setItem("userLSCart", JSON.stringify(vm.userLSCartArr)); // 並送往 LS 
        vm.getLSCart(); // 重新取得 LS 資料
      },


      // 減少 LS 購物車內商品，數量 -1
      minusLSCart(nowProduct) {
        const vm = this;

        // 先判斷目前的數量是否為 1
        // 是 → 跳出 modal 詢問使用者是否想要刪除此產品？
        if (nowProduct.qty === 1) {
          // console.log("是否想要移除此商品？");
          vm.deletingLSItem = nowProduct;
          $("#LSDeleteModal").modal("show");
        }
        // 否 → 調整 LS 數量
        else {
          let tempAddObj = {}; // 用以 暫存要加入購物車的資料
          for (let i = 0; i < vm.userLSCartArr.length; i++) { // 透過迴圈
            if (nowProduct.product_id === vm.userLSCartArr[i].product_id) { // 找相同的產品在哪
              tempAddObj = vm.userLSCartArr[i];
              tempAddObj.qty = Number(vm.userLSCartArr[i].qty) - 1;
              vm.userLSCartArr.splice(i, 1, tempAddObj); // 再將原本的資料刪除 // 並插入新的資料
              break; // 終止迴圈 // .forEach() 無法終止迴圈
            }
          }
          localStorage.setItem("userLSCart", JSON.stringify(vm.userLSCartArr)); // 並送往 LS 
          vm.getLSCart(); // 重新取得 LS 資料
        }
      },


      // 移除 LS 購物車內商品
      deleteLSCart(nowProduct) {
        const vm = this;
        vm.userLSCartArr.forEach((item, index) => { // 透過迴圈
          if (nowProduct.product_id === item.product_id) { // 找到該產品在哪
            vm.userLSCartArr.splice(index, 1); // 將該產品刪除
          }
        });
        localStorage.setItem("userLSCart", JSON.stringify(vm.userLSCartArr)); // 將更新的內容送往 LS
        vm.deletingLSItem = {}; // 清空 暫存 欲刪除商品的陣列
        vm.getLSCart(); // 重新取得 LS 資料
        $("#LSDeleteModal").modal("hide");
      },

      // 開啟確認刪除的 Modal
      openLSDeleteModal(nowProduct) {
        this.deletingLSItem = nowProduct; // 將欲刪除商品存入 data return 中
        $("#LSDeleteModal").modal("show");
      },


      // 將 欲編輯數量的商品資料 存入 data return 中
      judgeLSEditingQtyItem(nowProduct) {
        this.editingLSQtyItem = nowProduct;
        this.editingLSOriginalQty = nowProduct.qty;
      },

      // 直接編輯 LS 購物車內商品，數量自訂
      editLSCartQty(nowProduct) {
        const vm = this;
        // 數量為 0
        if (nowProduct.qty === "0") { // 資料結構中的.qty 為 string 型別，因此如果使用 number 型別會無法正確判斷
          // 開啟確認刪除用的 modal
          // console.log("輸入數量為 0");
          vm.openLSDeleteModal(nowProduct);
          return;
        }
        // 維持原數量
        else if (nowProduct.qty === vm.editingLSOriginalQty) {
          // console.log("輸入數量 與 原本 一致");
          return;
        }
        // 數量不為 0
        else {
          let tempAddObj = {}; // 用以 暫存要加入購物車的資料
          for (let i = 0; i < vm.userLSCartArr.length; i++) { // 透過迴圈
            if (nowProduct.product_id === vm.userLSCartArr[i].product_id) { // 找相同的產品在哪
              tempAddObj = vm.userLSCartArr[i];
              tempAddObj.qty = Number(nowProduct.qty);
              vm.userLSCartArr.splice(i, 1, tempAddObj); // 再將原本的資料刪除 // 並插入新的資料
              break; // 終止迴圈 // .forEach() 無法終止迴圈
            }
          }
          localStorage.setItem("userLSCart", JSON.stringify(vm.userLSCartArr)); // 並送往 LS 
          return;
        }
        vm.getLSCart(); // 重新取得 LS 資料
      },


      // 清空暫存用的物件
      removeLSEditingQtyItem() {
        this.editingLSQtyItem = {};
        this.editingLSOriginalQty = 1;
      },


      // 這個有成功直接將 LS 的資料取出並發送訂單喔~
      // 目前是綁在 createOrder()
      asyncTest() {
        const vm = this;
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;

        // 取得 LS 購物車內容
        let LSCart = JSON.parse(localStorage.getItem("userLSCart")); // 取出來會是 JSON 格式  // [{…}, {…}, {…}]
        let sendArr = [];
        let promiseArr = []; // 用以暫存 準備送出之 API 陣列 // let promiseArr = [vm.$http.post(api, { data: sendArr[i] }), vm.$http.post(api, { data: sendArr[i] })];

        LSCart.forEach((item) => { // 因為沒有終止迴圈的需求，所以可以使用 .forEacch() 
          let cart = {
            product_id: item.product_id,
            qty: item.qty,
          };
          sendArr.push(cart);
        });

        sendArr.forEach((item, index) => {
          // console.log(item);
          promiseArr.push(vm.$http.post(api, { data: item }))
        })

        // -------------------------------------- 以上為前置作業 ----------------------------------------------------------
        // -------------------------------------- 以上為前置作業 ----------------------------------------------------------
        // -------------------------------------- 以上為前置作業 ----------------------------------------------------------

        Promise.all(promiseArr).then((response) => { // 已經完成將 LS 加入伺服器購物車的行為 // console.log("加入購物車 response", response);
          vm.$http.get(api); // 取得 伺服器購物車的資料，確保已經加入
        }).then((response) => {
          if (response === undefined) { // 代表目前購物車還沒更新，但請求已經送出
            console.log("準備開始 confirmServerCart");
            confirmServerCart();
          }
        });

        // 用以確認已經將 LS 加入伺服器購物車內
        function confirmServerCart() {
          setTimeout(() => {
            vm.$http.get(api).then((response) => {
              if (response.data.success) {
                console.log(response);
                console.log("發送 order API");
                // 發送訂單 API
                const orderApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
                const receiveInfo = vm.testUserData;

                vm.$http.post(orderApi, { data: receiveInfo }).then((response) => {
                  console.log("已發送 order 請求", response); // 確認從遠端撈回來的資料結構
                  if (response.data.success) {
                    // vm.toSingleOrderPage(response.data.orderId)
                  }
                  else {
                    // console.log("訂購失敗QQ，請稍後再試一次");
                  }
                });
              }
              else {
                // console.log("多碼母我又來囉");
                confirmServerCart();
              }
            });
          }, 0);
        }

      },




      // 判斷的話就不用撈 coupon 的詳細資料回來存在 LS 中 // 判斷的話就不用撈 coupon 的詳細資料回來存在 LS 中
      judgeCoupon() {
        const vm = this;
        const couponApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
        // 因為你只是要確認這個 coupon 可用，沒有要拿詳細資料，所以購物車為空也沒關係，因此也就不用發送 cart API
        const coupon = {
          code: vm.inputCouponCode,
        };
        vm.$http.post(couponApi, { data: coupon }).then((response) => {
          console.log(response);
          if (response.data.success) {
            vm.infoMsg = "有效優惠券";
          }
          else {
            vm.infoMsg = "抱歉，目前無法使用此優惠券。請嘗試其他優惠券，或聯繫客服人員，謝謝~~";
          }
        });
      },


      // 套用 coupon 
      applyCoupon() {
        const vm = this;
        const couponApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
        const coupon = {
          code: vm.inputCouponCode,
        };
        const cartApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        const fakeCart = {
          product_id: "-MPseqW11lTu_HkgXL2j", // 男士 西裝外套
          qty: 1,
        };

        // 發送虛假購物車內容
        vm.$http.post(cartApi, { data: fakeCart }).then((response) => {

          // console.log("發送虛假購物車內容", response);

          vm.$http.post(couponApi, { data: coupon }).then((response) => {

            if (response.data.success) {
              // console.log("套用 coupon 的 response", response);
              vm.infoMsg = "成功套用優惠券！";

              setTimeout(() => {
                // console.log("準備取得 fake cart");
                vm.$http.get(cartApi).then((response) => {
                  // console.log("fakeCart 後的 response", response);
                  vm.usingCoupon.title = response.data.data.carts[0].coupon.title;
                  vm.usingCoupon.code = response.data.data.carts[0].coupon.code;
                  vm.usingCoupon.percent = response.data.data.carts[0].coupon.percent;

                  localStorage.setItem("LSCoupon", JSON.stringify(vm.usingCoupon)); // 將 coupon 資訊存入 LS

                  const fakeCartID = response.data.data.carts[0].id; // cart ID 要留著，因為刪除要用到
                  const deleteApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${fakeCartID}`;

                  vm.$http.delete(deleteApi).then((response) => {
                    // console.log("delete API 取得的 response", response);
                    vm.calLSTotal(); // 計算 LS 套用 coupon 後的金額
                    if (!response.data.success) {
                      vm.$http.delete(deleteApi); // 如果沒有成功刪除，就再發一次刪除的請求
                      vm.calLSTotal(); // 計算 LS 套用 coupon 後的金額
                    }
                  });
                });
              }, 500);
            }

            else {
              vm.infoMsg = "抱歉，目前無法使用此優惠券。請嘗試其他優惠券，或聯繫客服人員，謝謝~~";
            }

          });
        });
      },


      // 取消套用 coupon // 這個還需要微調一下
      cancelCoupon() {
        const vm = this;
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
        const coupon = {
          code: "0_OFF",
        };
        vm.$http.post(api, { data: coupon }).then((response) => {
          if (response.data.success) {
            // 重新計算 LS 購物車金額
            // vm.getCart();
          }
          else {
            vm.infoMsg = "取消套用 coupon 失敗，請稍後再嘗試一次，謝謝~~";
          }
        });
      },


      // 計算 LS 總金額
      calLSTotal() {
        const vm = this;
        vm.LSTotal = 0; // 將金額歸 0
        vm.LSFinal_total = 0; // 將金額歸 0
        
        // 重撈 LS 的資料(購物車、coupon)，確保為最新狀態
        vm.userLSCartArr = JSON.parse(localStorage.getItem("userLSCart")) || []; // 有機會可以嘗試使用 ?? (空位合併 Nullish Coalescing)
        vm.getLSCoupon();

        vm.userLSCartArr.forEach((item) => {
          vm.LSTotal += Number(item.price) * Number(item.qty);
        });
        vm.userLSCartArr.forEach((item) => {
          vm.LSFinal_total += Number(item.price) * Number(item.qty) * (Number(vm.usingCoupon.percent) / 100);
        });

      },


      // ----------------------------------------------------------------------------------------------------------------------------------------------------
      // ----------  以上為測試區域  ----------------------------------------------------------------------------------------------------------------------------------
      // ----------------------------------------------------------------------------------------------------------------------------------------------------



      // 從 server 取得購物車品項 // 留著作為一開始進入頁面要執行哪些行為的參考
      getCart() {
        const vm = this;
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        // vm.isLoading = true;

        // vm.$http.get(api).then((response) => {
        // console.log(response); // 確認從遠端撈回來的資料結構
        // vm.cartItem = response.data.data.carts;          // 將購物車 各品項 存入 data return 中
        // vm.cartItemNum = response.data.data.carts.length; // 將購物車 有幾樣商品 存入 data return 中
        // vm.sendCartItemNum(); // 將更新後的數量送到 headerComponent 中進行更新
        // vm.total = response.data.data.total;             // 將購物車 總價 存入 data return 中
        // vm.final_total = response.data.data.final_total; // 將購物車 折扣後價格 存入 data return 中
        // vm.judgeCoupon();
        // vm.isLoading = false;
        // });
      },

      // 不確定要不要刪，先留著
      // judgeCoupon() {
      //   const vm = this;
      //   if (vm.cartItem.length !== 0) {
      //     if (vm.cartItem[0].coupon.code !== "" && vm.cartItem[0].coupon.code !== "0_OFF") {
      //       vm.usingCoupon.title = vm.cartItem[0].coupon.title;
      //       vm.usingCoupon.code = vm.cartItem[0].coupon.code;
      //       // console.log(vm.usingCoupon);
      //     }
      //     else {
      //       vm.usingCoupon = {
      //         title: "",
      //         code: "",
      //       };
      //     }
      //   }
      // },




      // 回到頁面頂部
      scrollTop() {
        // if ((document.body.clientWidth || document.documentElement.clientWidth) >= 992) {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        // }
        // else {
        // document.body.scrollTop = document.documentElement.scrollTop = 35;
        // }
      },

      // 將更新後的數量送到 headerComponent 中進行更新
      sendCartItemNum() {
        eventBus.$emit("cartItemNumEvent", this.cartItemNum)
      },

      // 前往單一訂單頁面
      toSingleOrderPage(orderId) {
        // console.log(orderId);
        this.$router.push({ path: '/singleOrder', query: { orderId: orderId } });
      },
    },
  };
</script>


<style scoped>
  a {
    text-decoration: none;
  }

  .editProductQty {
    vertical-align: middle;
  }

  .qtyChange_btn {
    width: 30px;
    height: 30px;
    display: block;
    margin: 0 auto;
    border: 1px solid grey;
    border-radius: 0.2rem;
    outline: none;
    background: transparent;
  }

  .qtyChange_btn:active {
    background-color: #2f7dfc;
    color: #fff;
    border: none;
  }

  .editProductQty input::-webkit-outer-spin-button,
  .editProductQty input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    /* 拿掉數字輸入欄位的箭頭 */
  }

  .editProductQty input[type="number"] {
    -moz-appearance: textfield;
    /* 拿掉數字輸入欄位的箭頭 */
  }

  .editProductQty input {
    width: 30px;
    height: 30px;
    background: transparent;
    outline: none;
    border: none;
    text-align: center;
  }

  .editProductQty input.ing {
    outline: none;
    border: 1.5px solid #2f7dfc;
    border-radius: 0.2rem;
  }


  @media (min-width: 576px) {
    .qtyChange_btn {
      width: 34px;
      height: 34px;
      display: inline;
    }

    .editProductQty input {
      width: 34px;
      height: 34px;
    }
  }
</style>





<!-- 
<pre>
    雙擊(@dblclick)
        將原始數量(item.qty)存入 data return (originalQty)
    
    移出焦點(@blur)
    按下 enter 鍵(@keyup.enter)
    按下 esc 鍵(@keyup.esc)
        先判斷數量是否 >= 1
            否
                跳出提示告知使用者，數量至少需為 1
                清除暫存資料(originalQty)
            是
                比對 編輯後的數量 與 原始數量 是否一致
                    是 → 跳出迴圈
                    否 → 先將原始數量刪除，再下單指定數量
            
</pre> 
-->