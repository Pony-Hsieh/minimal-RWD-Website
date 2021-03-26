<template>
  <div>

    <HeaderComponent />

    <div class="container">

      <!-- 購物車品項 -->
      <div class="row">
        <div class="col">
          <h1 class="h3 text-center mt-4">
            購物車
          </h1>
          <hr>
          <!-- 如果 LS 購物車為空，則顯示此區塊 -->
          <div v-if="userLSCartArr.length === 0" class="text-center my-5">
            目前購物車內沒有商品喔~~
            <router-link to="/shop">
              點我去選購商品，GOGOGO ！！！
            </router-link>
          </div>
          <!-- 如果 LS 購物車有商品，則顯示此區塊 -->
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
              <tr v-for="item in showingCartArr" :key="item.product_id">

                <!-- 商品圖片、商品名稱 -->
                <td class="text-center py-2 py-sm-3">
                  <img :src="item.imageUrl" width="70px" :alt="item.title+' 圖片'" class="mb-sm-2">
                  <br>
                  {{ item.title }}
                </td>

                <!-- 數量 -->
                <td class="text-center editProductQty">
                  <!-- 減少 -->
                  <button type="button" class="qtyChange_btn" @click.prevent="minusLSCart(item)">
                    －
                  </button>
                  <input v-model.lazy="item.qty" type="number"
                    :class="{'ing':item.product_id === editingLSQtyItem.product_id}"
                    @click="judgeLSEditingQtyItem(item)" @keyup.esc="removeLSEditingQtyItem()"
                    @blur="editLSCartQty(item), removeLSEditingQtyItem()"
                    @keyup.enter="editLSCartQty(item), removeLSEditingQtyItem()">
                  <button type="button" class="qtyChange_btn" @click.prevent="plusLSCart(item)">
                    ＋
                  </button>
                </td>

                <!-- 單價 -->
                <td class="text-right pr-3 d-none d-sm-table-cell">
                  <!-- 依據是否套用 coupon 決定要顯示哪個套組 -->
                  <!-- 沒有 coupon -->
                  <div v-if="usingCoupon.percent === 100">
                    <!-- 如果 原價 和 售價 不同時，用 刪除線 顯示 原價 -->
                    <del v-if="item.origin_price !== item.price">
                      {{ item.origin_price | currency }}
                      <br>
                    </del>
                    <span>
                      {{ item.price | currency }}
                    </span>
                  </div>
                  <!-- 有使用 coupon -->
                  <div v-if="usingCoupon.percent !== 100">
                    <!-- 套用 coupon 的狀況下，直接使用 刪除線 顯示 原價 -->
                    <del>
                      {{ item.origin_price | currency }}
                      <br>
                    </del>
                    <span>
                      <!-- 但優惠價的計算，要使用 售價 再去折扣，而不是原價 -->
                      {{ item.price * usingCoupon.percent / 100 | currency }}
                    </span>
                  </div>
                </td>

                <!-- 小計 -->
                <td class="text-right pr-3">
                  <span v-if="item.final_total">
                    {{ item.final_total | currency }}
                  </span>
                  <span v-else>
                    {{ item.price * item.qty * usingCoupon.percent / 100 | currency }}
                  </span>
                </td>

                <!-- 移除 -->
                <td class="text-center">
                  <button type="button" class="btn btn-outline-danger btn-sm" @click="openLSDeleteModal(item)">
                    <i class="fas fa-times" />
                  </button>
                </td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 套用 coupon 相關 -->
      <div v-if="userLSCartArr.length !== 0" class="row">
        <div class="col-12">
          <div class="input-group input-group-md mt-5">
            <input v-model.trim="inputCouponCode" type="text" placeholder="請輸入 coupon 代碼" class="form-control">
            <div class="input-group-append">
              <button type="button" class="btn btn-primary" @click="applyCoupon">
                套用 coupon
              </button>
            </div>
          </div>
        </div>

        <div class="d-none d-lg-block col-lg-5"></div>
        <div v-if="usingCoupon.percent !== 100" class="col-12 col-sm-7 col-lg-4 my-3">
          已套用 coupon 名稱：{{ usingCoupon.title }}
          <br>
          已套用 coupon 代碼：{{ usingCoupon.code }}
        </div>
        <div v-if="usingCoupon.percent !== 100"
          class="col-12 col-sm-5 col-lg-3 d-flex justify-content-center justify-content-sm-end align-items-center ">
          <button type="button" class="btn btn-outline-danger btn-sm" @click="cancelCoupon">
            取消套用此 coupon
          </button>
        </div>
      </div>

      <!-- 訂單金額 -->
      <div class="row mt-5 cartTotal">
        <div class="col-3 col-lg-5"></div>
        <div class="col-9 col-lg-7 d-flex justify-content-between">
          <h6>總計</h6>
          <!-- 如果 LSTotal 與 LSFinal_total 不一樣 -->
          <del v-if="LSTotal !== LSFinal_total" class="h6 mr-1">{{ LSTotal | currency }}</del>
          <h6 v-else>
            {{ LSFinal_total | currency }}
          </h6>
        </div>
        <div v-if="LSTotal !== LSFinal_total" class="col-3 col-lg-5"></div>
        <div v-if="LSTotal !== LSFinal_total" class="col-9 col-lg-7 d-flex justify-content-between align-items-center">
          <h6 class="text-primary">
            折扣後價格
          </h6>
          <h5 class="mr-1">
            {{ LSFinal_total | currency }}
          </h5>
        </div>
      </div>

      <!-- 客戶收件資料及聯絡資料 、 送出訂單 -->
      <div v-if="userLSCartArr.length !== 0" class="row my-5 justify-content-center">
        <h5 class="col-12 text-center">
          訂購資訊
        </h5>
        <validation-observer v-slot="{ invalid }" class="col-md-6">
          <!-- 訂購行為 form @submit.prevent 的綁定函式要調整！！！！！ -->
          <!-- 訂購行為 form @submit.prevent 的綁定函式要調整！！！！！ -->
          <!-- 訂購行為 form @submit.prevent 的綁定函式要調整！！！！！ -->
          <form @submit.prevent="test">
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
              <button type="submit" :class="['btn','btn-danger', {'cursorNotAllowed' : invalid}]" :disabled="invalid">
                送出訂單
              </button>
            </div>

          </form>
        </validation-observer>
      </div>
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
                  是，將此商品移出購物車
                </button>
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

  export default {

    components: {
      HeaderComponent,
      FooterComponent,
    },

    data() {
      return {
        userLSCartArr: [],   // 暫存在 LS 中的購物車內容
        showingCartArr: [],
        LSTotal: 0,       // LS 購物車原價
        LSFinal_total: 0, // LS 購物車最終售價 (可能是有套用 coupon 的價格)

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

        form: { // 用來暫存訂購人資訊、以及收件資訊
          user: {
            name: "",
            email: "",
            tel: "",
            address: "",
          },
          message: "",
        },

        // isLoading: false,
      };
    },

    watch: {
      "inputCouponCode": function () {
        this.judgeCoupon();
      }
    },

    created() {
      this.getLSCart(); // 從 LS 中取得購物車資料
      this.calLSTotal(); // 計算 LS 總金額
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
        this.sendLSCartItemNum();
      },

      // 計算 LS 總金額
      calLSTotal() {
        const vm = this;

        // 重撈 LS 的資料(購物車、coupon)，確保為最新狀態
        vm.userLSCartArr = JSON.parse(localStorage.getItem("userLSCart")) || []; // 有機會可以嘗試使用 ?? (空位合併 Nullish Coalescing)

        if (vm.userLSCartArr.length !== 0) { // 代表目前 LS 購物車內有商品  // 如果 === 0，表示 LS 購物車為空，兩者就直接沿用預設值 0 即可，不必再做其他事
          if (JSON.parse(localStorage.getItem("LSCoupon")) !== null) {
            vm.usingCoupon = JSON.parse(localStorage.getItem("LSCoupon")); // 如果 LS 內有資料，就用 LS 的，否則使用預設的(已經寫在 data return 中)
          }
          // 透過迴圈計算 LS 購物車總金額
          // .reduce() 的寫法  // 如果使用 .reduce() ，就不用事先將金額歸 0
          vm.LSTotal = vm.userLSCartArr.reduce((accumulator, item) => {
            return accumulator + Number(item.price) * Number(item.qty);
          }, 0);
          // .forEach() 的寫法
          // vm.LSTotal = 0; // 將金額歸 0
          // vm.userLSCartArr.forEach((item) => {
          //   vm.LSTotal += Number(item.price) * Number(item.qty);
          // });
          vm.LSFinal_total = vm.LSTotal * (Number(vm.usingCoupon.percent) / 100);
        }
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
        if (Number(nowProduct.qty) === 0) { // 資料結構中的.qty 為 string 型別，因此要先轉換成 number 型別
          // console.log("輸入數量為 0");
          vm.openLSDeleteModal(nowProduct); // 開啟確認刪除用的 modal
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

      test() {
        console.log("發送資料~~~");
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


      // 判斷的話就不用撈 coupon 的詳細資料回來存在 LS 中
      judgeCoupon() {
        const vm = this;
        const couponApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
        // 因為你只是要確認這個 coupon 可用，沒有要拿詳細資料，所以購物車為空也沒關係，因此也就不用發送 cart API
        const coupon = {
          code: vm.inputCouponCode,
        };
        vm.$http.post(couponApi, { data: coupon }).then((response) => {
          // console.log(response);
          if (response.data.success) {
            vm.infoMsg = "有效優惠券";
          }
          else {
            vm.infoMsg = "抱歉，目前無法使用此優惠券。請嘗試其他優惠券，或聯繫客服人員，謝謝~~";
          }
        });
      },


      // 套用 coupon  // 實際行為只有將 coupon 資料存入 LSCoupon 中
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
                  vm.inputCouponCode = ""; // 資訊存入 LS 後將輸入欄位清空

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


      // 取消套用 coupon
      cancelCoupon() {
        localStorage.removeItem("LSCoupon"); // 將重設後的 coupon 資訊存入 LS
        this.usingCoupon = {
          title: "",
          code: "",
          percent: 100,
        };
        this.calLSTotal(); // 重新計算 LS 購物車金額
        this.infoMsg = "已取消套用 coupon";
      },


      // 將更新後的 LS 購物車數量 送到 HeaderComponent 中進行更新
      sendLSCartItemNum() {
        this.$LSCartNum_Bus.$emit("LSCartItemNumEvent", this.userLSCartArr.length);
      },


      // 前往單一訂單頁面
      toSingleOrderPage(orderId) {
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

  .cursorNotAllowed {
    cursor: not-allowed;
  }
</style>