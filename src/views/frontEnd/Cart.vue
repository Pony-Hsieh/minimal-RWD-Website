<template>
    <div class="wrapper">
        <loading :active.sync="isLoading">
            <div class="loadingio-spinner-eclipse-qd52l2xe1a">
                <div class="ldio-zf9gth3n7r">
                    <div />
                </div>
            </div>
        </loading>

        <AlertMsg />

        <HeaderComponent />

        <main class="container my-5">
            <div>
                <h1 class="h2 text-center">
                    購物車
                </h1>
                <div class="d-flex justify-content-center align-items-center position-relative">
                    <div class="position-absolute" style="right: calc(50% + 10px);">
                        共計 {{ userLSCartArr.length }} 種商品
                    </div>
                    <div style="overflow:hidden; width:0; border-left: 1.5px solid #212529;">
                        |
                    </div>
                    <div class="position-absolute" style="left: calc(50% + 10px);">
                        {{ LSFinal_total | currency }}
                    </div>
                </div>
                <hr>
            </div>

            <div class="row">
                <!-- 購物車品項 -->
                <div class="col-12 col-lg-8">
                    <!-- 如果 LS 購物車為空，則顯示此區塊 -->
                    <div v-if="userLSCartArr.length === 0" class="text-center my-5">
                        目前購物車內沒有商品喔~~
                        <br>
                        <br>
                        <br>
                        <router-link to="/shop">
                            點我去選購商品，GOGOGO ！！！
                        </router-link>
                    </div>

                    <!-- 如果 LS 購物車有商品，則顯示此區塊 -->
                    <div v-if="userLSCartArr.length !== 0">
                        <h4 class="text-center">
                            商品資訊
                        </h4>
                        <table class="talbe mt-4 w-100 table-striped table-responsive-lg">
                            <thead>
                                <tr>
                                    <th width="150px" class="text-center py-3">
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
                                    <th width="180px" class="text-center">
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
                                        <button type="button" class="btn btn-outline-danger btn-sm"
                                            @click="openLSDeleteModal(item)">
                                            <i class="fas fa-times" />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>


                <!-- 其餘資訊 -->
                <div class="col-12 col-lg-4 pt-5 pt-lg-3 otherCartInfo">
                    <h4 class="text-center">
                        訂購資訊
                    </h4>

                    <!-- 訂單金額 -->
                    <div class="row orderTotalArea">
                        <!-- 小計 -->
                        <div class="col-12">
                            <div class="row">
                                <div class="col-sm-1 d-lg-none" />
                                <div class="col-12 col-sm-10 col-lg-12 d-flex justify-content-between">
                                    <h6>小計</h6>
                                    <h6 class="mr-1">
                                        {{ LSTotal | currency }}
                                    </h6>
                                </div>
                                <div class="col-sm-1 d-lg-none" />
                            </div>
                        </div>

                        <!-- 套用 coupon -->
                        <!-- 相等代表目前沒有套用 coupon -->
                        <div v-if="LSTotal === LSFinal_total" class="col-12">
                            <div class="row">
                                <div class="col-sm-1 d-lg-none" />
                                <div class="col-12 col-sm-10 col-lg-12">
                                    <div class="input-group input-group-sm">
                                        <input v-model.trim="inputCouponCode" type="text" placeholder="請輸入 coupon"
                                            class="form-control" @keyup.enter="applyCoupon">
                                        <div class="input-group-append">
                                            <button type="button" class="btn btn-primary" @click="applyCoupon">
                                                套用 coupon
                                            </button>
                                        </div>
                                    </div>
                                    <div v-if="couponVerify === true" class="text-success">
                                        有效優惠券
                                    </div>
                                    <div v-if="couponVerify === false">
                                        <div class="text-danger">
                                            抱歉，目前無法使用此優惠券。
                                        </div>
                                        <div> 請嘗試其他優惠券，或聯繫客服人員，</div>
                                        <div> 謝謝~~</div>
                                    </div>
                                </div>
                                <div class="col-sm-1 d-lg-none" />
                            </div>
                        </div>

                        <!-- 折抵 -->
                        <div v-if="LSTotal !== LSFinal_total" class="col-12">
                            <div class="row">
                                <div class="col-sm-1 d-lg-none" />
                                <div
                                    class="col-12 col-sm-10 col-lg-12 d-flex justify-content-between align-items-center">
                                    <h6>
                                        折抵
                                    </h6>
                                    <h6 class="mr-1">
                                        - {{ LSTotal - LSFinal_total | currency }}
                                    </h6>
                                </div>
                                <div class="col-sm-1 d-lg-none" />
                            </div>
                        </div>

                        <!-- 已套用 coupon 相關資訊 -->
                        <div v-if="usingCoupon.percent !== 100" class="col-12">
                            <div class="row">
                                <div class="col-sm-1 d-lg-none" />
                                <div class="col-12 col-sm-10 col-lg-12 d-flex justify-content-between align-items-center"
                                    style="margin-top: 14px; font-size: 15px;">
                                    <div>
                                        已套用 coupon 名稱：{{ usingCoupon.title }}
                                        <br>
                                        已套用 coupon 代碼：{{ usingCoupon.code }}
                                        <br>
                                        已套用 coupon 優惠：{{ usingCoupon.percent | couponTransfer }}
                                    </div>
                                    <div>
                                        <button type="button" class="btn btn-outline-danger btn-sm"
                                            @click="cancelCoupon">
                                            <i class="fas fa-times" />
                                        </button>
                                    </div>
                                </div>
                                <div class="col-sm-1 d-lg-none" />
                            </div>
                        </div>

                        <!-- 總計 -->
                        <div class="col-12">
                            <div class="row">
                                <div class="col-sm-1 d-lg-none" />
                                <div
                                    class="col-12 col-sm-10 col-lg-12 d-flex justify-content-between align-items-center mt-3">
                                    <h6 class="font-weight-bold">
                                        總計
                                    </h6>
                                    <h6 class="mr-1 font-weight-bold">
                                        {{ LSFinal_total | currency }}
                                    </h6>
                                </div>
                                <div class="col-sm-1 d-lg-none" />
                            </div>
                        </div>
                    </div>


                    <!-- 客戶收件資料及聯絡資料 、 送出訂單 -->
                    <div v-if="userLSCartArr.length !== 0" class="receiverInfoArea">
                        <h5 class="text-center">
                            收件資訊
                        </h5>
                        <div class="text-center">
                            * 表示必填
                        </div>
                        <validation-observer v-slot="{ invalid }">
                            <form @submit.prevent="sendOrder">
                                <!-- 訂購人 email -->
                                <validation-provider v-slot="{ errors, classes }" rules="required|email">
                                    <div class="form-group">
                                        <!-- 輸入框 -->
                                        <label for="userEmail">* 訂購人 email</label>
                                        <input id="userEmail" v-model="form.user.email" type="email" name="訂購人 email"
                                            class="form-control" :class="classes">
                                        <!-- 錯誤訊息 -->
                                        <span class="invalid-feedback">{{ errors[0] }}</span>
                                    </div>
                                </validation-provider>

                                <!-- 收件人姓名 -->
                                <validation-provider v-slot="{ errors, classes }" rules="required">
                                    <div class="form-group">
                                        <label for="userName">* 收件人姓名</label>
                                        <input id="userName" v-model="form.user.name" type="text" name="收件人姓名"
                                            class="form-control" :class="classes">
                                        <span class="invalid-feedback">{{ errors[0] }}</span>
                                    </div>
                                </validation-provider>

                                <!-- 收件人電話 -->
                                <validation-provider v-slot="{ errors, classes }" rules="required">
                                    <div class="form-group">
                                        <label for="userTel">* 收件人電話</label>
                                        <input id="userTel" v-model="form.user.tel" type="tel" name="收件人電話"
                                            class="form-control" :class="classes">
                                        <span class="invalid-feedback">{{ errors[0] }}</span>
                                    </div>
                                </validation-provider>

                                <!-- 收件人地址 -->
                                <validation-provider v-slot="{ errors, classes }" rules="required">
                                    <div class="form-group">
                                        <label for="userAddress">* 收件人地址</label>
                                        <input id="userAddress" v-model="form.user.address" type="text" name="收件人地址"
                                            class="form-control" :class="classes">
                                        <span class="invalid-feedback">{{ errors[0] }}</span>
                                    </div>
                                </validation-provider>

                                <!-- 訂單留言 -->
                                <div class="form-group">
                                    <label for="comment">留言</label>
                                    <textarea id="comment" v-model="form.message" class="form-control"
                                        style="resize: none; height: 200px;" />
                                </div>

                                <!-- 送出訂單 -->
                                <div class="my-5">
                                    <button type="submit"
                                        :class="['btn', 'btn-primary', 'btn-block', {'cursorNotAllowed' : invalid}]"
                                        :disabled="invalid">
                                        送出訂單
                                    </button>
                                </div>
                            </form>
                        </validation-observer>
                    </div>
                </div>
            </div>
        </main>

        <div class="filled" />

        <FooterComponent />

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
                                <button type="button" class="btn btn-secondary col mr-1" data-dismiss="modal"
                                    @click="getLSCart">
                                    否，關閉此彈跳視窗
                                </button>
                                <button type="button" class="btn btn-danger col ml-1"
                                    @click="deleteLSCart(deletingLSItem)">
                                    是，將此商品移出購物車
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import $ from "jquery";

    import HeaderComponent from "@/components/HeaderComponent.vue";
    import FooterComponent from "@/components/FooterComponent.vue";
    import AlertMsg from "@/components/AlertMsg.vue";

    export default {

        name: "Cart",


        components: {
            HeaderComponent,
            FooterComponent,
            AlertMsg,
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
                infoMsg: "",
                couponVerify: "",  // 提示消費者這個 coupon 可否使用

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

                isLoading: false,
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
            document.body.scrollTop = document.documentElement.scrollTop = 0; // 回到頁面頂部
        },


        mounted() {
            const vm = this;
            $("#LSDeleteModal").on("hidden.bs.modal", () => { // 當 #LSDeleteModal 這個 modal 觸發 .hide 時，會執行這個函式的內容
                vm.getLSCart();
            });
            vm.judgeFilled(); // 判斷是否需要加入填補空白區域的 div
        },


        methods: {

            // 從 LS 中取得購物車資料
            getLSCart() {
                this.userLSCartArr = JSON.parse(localStorage.getItem("userLSCart")) || []; // 有機會可以嘗試使用 ?? (空位合併 Nullish Coalescing)
                this.showingCartArr = (JSON.parse(localStorage.getItem("userLSCart")) || []).reverse(); // 反轉陣列，這樣最後新增的商品會在最上方  // .reverse() 會修改原始陣列，因此不能寫 this.userLSCartArr.reverse()
                this.sendLSCartItemNum();
                this.calLSTotal();
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


            // 判斷是否需要加入填補空白區域的 div
            judgeFilled() {
                let elBody = document.querySelector("body");
                let elMain = document.querySelector("main");
                let headerHeight = document.querySelector("header").offsetHeight;
                let footerHeight = document.querySelector("footer").offsetHeight;
                let mainHeight = elMain.offsetHeight;
                let mainMargin = Number(window.getComputedStyle(elMain).marginTop.replace("px", "")) + Number(window.getComputedStyle(elMain).marginBottom.replace("px", ""));
                let rawHeight = headerHeight + footerHeight + mainHeight + mainMargin;

                let bodyResizeObserver = new ResizeObserver(function () {
                    if (window.innerHeight > rawHeight) {
                        let h = window.innerHeight - rawHeight;
                        // console.log(`高度為 ${h}`);
                        document.querySelector(".filled").style.height = `${h}px`;
                    }
                    else {
                        document.querySelector(".filled").style.height = "0";
                        // console.log("無高度");
                    }
                });
                bodyResizeObserver.observe(elBody);
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
                    // return;  // return 會直接跳出 editLSCartQty 函式，所以不為 0 的行為不能在最後加 return
                }
                vm.getLSCart(); // 重新取得 LS 資料
            },


            // 清空暫存用的物件
            removeLSEditingQtyItem() {
                this.editingLSQtyItem = {};
                this.editingLSOriginalQty = 1;
            },


            // 發送訂單
            sendOrder() {
                const vm = this;
                const cartApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
                const couponApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
                const orderApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
                const receiveInfo = vm.form;
                const LSCoupon = JSON.parse(localStorage.getItem("LSCoupon"));
                vm.isLoading = true;

                clearServerCartFN();


                // 重新整理
                function reloadFN() {
                    vm.$alertMsg_Bus.$emit("alertMsgEvent", "訂購失敗QQ，請稍後再試一次", "danger");
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                }


                // 清空伺服器購物車
                function clearServerCartFN() {
                    vm.$http.get(cartApi)
                        .then((resolveRes) => {
                            if (resolveRes.data.data.carts.length === 0) { // 代表 server cart 本來就是空的
                                AddLSCartToServerCartFN();
                            }
                            else {
                                let deleteArr = [];
                                resolveRes.data.data.carts.forEach((item) => {
                                    let deleteId = item.id;
                                    let deleteCartApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${deleteId}`;
                                    deleteArr.push(vm.$http.delete(deleteCartApi));
                                });
                                Promise.all(deleteArr).then(
                                    (resolveRes) => {
                                        let checkPoint = 0;
                                        resolveRes.forEach((item) => {
                                            if (!item.data.success) {
                                                checkPoint += 1;
                                            }
                                        });
                                        if (checkPoint !== 0) { // 代表有購物車內容沒有成功刪除
                                            clearServerCartFN();
                                        }
                                        else { // 代表成功清空 server 購物車
                                            AddLSCartToServerCartFN();
                                        }
                                    },
                                    (rejectRes) => {
                                        clearServerCartFN();
                                    },
                                );
                            }
                        })
                        .catch(() => { // 連伺服器購物車資料都沒拿到
                            reloadFN();
                        });
                }


                // 取得 LS 購物車內容、發送 Promise 將內容加入至 伺服器購物車
                function AddLSCartToServerCartFN() {
                    let LSCart = JSON.parse(localStorage.getItem("userLSCart")); // 取出來會是 JSON 格式  // [{…}, {…}, {…}]
                    let sendArr = [];
                    let promiseArr = []; // 用以暫存 準備送出之 API 陣列 // let promiseArr = [vm.$http.post(api, { data: sendArr[i] }), vm.$http.post(api, { data: sendArr[i] })];
                    LSCart.forEach((item) => {
                        let cart = {
                            product_id: item.product_id,
                            qty: item.qty,
                        };
                        sendArr.push(cart);
                    });
                    sendArr.forEach((item, index) => {
                        promiseArr.push(vm.$http.post(cartApi, { data: item }))
                    });
                    Promise.all(promiseArr)
                        .then((resolveRes) => {
                            vm.$http.get(cartApi).then( // 發送取得伺服器購物車 api ，確保已經將 LS 購物車加入伺服器購物車
                                (resolveRes) => {
                                    if (resolveRes.data.data.carts.length >= 1) { // 代表已經將 LS 購物車加入伺服器購物車
                                        checkCouponFN(); // 檢查是否有 LScoupon
                                    }
                                },
                                (rejectRes) => {
                                    reloadFN();
                                },
                            );
                        })
                        .catch(() => { // 有任一個 加入購物車的 Promise rejected 的話，執行這裡；
                            reloadFN();
                        })
                }


                // 檢查、套用 coupon
                function checkCouponFN() {
                    if (LSCoupon !== null) { // 代表目前 LS 有存 LSCoupon
                        const coupon = {
                            code: LSCoupon.code,
                        };
                        vm.$http.post(couponApi, { data: coupon }) // 發送 套用　coupon API
                            .then((resolveRes) => {
                                if (resolveRes.data.success) { // 代表已經成功於伺服器購物車套用 coupon 了
                                    sendOrderFN();
                                }
                                else {
                                    reloadFN();
                                }
                            })
                            .catch(() => {
                                reloadFN();
                            });
                    }
                    else { // 代表目前 LS 沒有 LSCoupon
                        sendOrderFN();
                    }
                }


                // 發送訂單
                function sendOrderFN() {
                    vm.$http.post(orderApi, { data: receiveInfo })
                        .then((resolveRes) => {
                            if (resolveRes.data.success) {
                                localStorage.removeItem("userLSCart"); // 清空 LSCart
                                localStorage.removeItem("LSCoupon"); // 清空 Coupon
                                vm.toSingleOrderPage(resolveRes.data.orderId);
                            }
                            else {
                                reloadFN();
                            }
                        })
                        .catch(() => {
                            reloadFN();
                        });
                }
            },


            // 判斷的話就不用撈 coupon 的詳細資料回來存在 LS 中
            judgeCoupon() {
                if (this.inputCouponCode === "") {
                    this.couponVerify = "";
                    return;
                }
                const vm = this;
                const couponApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
                // 因為你只是要確認這個 coupon 可用，沒有要拿詳細資料，所以購物車為空也沒關係，因此也就不用發送 cart API
                const coupon = {
                    code: vm.inputCouponCode,
                };

                vm.$http.post(couponApi, { data: coupon })
                    .then((resolveRes) => {
                        if (resolveRes.data.success) {
                            vm.couponVerify = true;
                        }
                        else {
                            vm.couponVerify = false;
                        }
                    })
                    .catch(() => {
                        vm.couponVerify = false;
                    });
            },


            // 套用 coupon  // 實際行為只有將 coupon 資料存入 LSCoupon 中
            applyCoupon() {
                if (this.inputCouponCode === "") {
                    console.log("coupon 為空");
                    return;
                }
                const vm = this;
                const couponApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
                const coupon = {
                    code: vm.inputCouponCode,
                };
                const cartApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
                const fakeCart = {
                    product_id: "-MPseqW11lTu_HkgXL2j", // 男子 排汗短袖
                    qty: 1,
                };

                // 重新整理
                function reloadFN() {
                    vm.$alertMsg_Bus.$emit("alertMsgEvent", "coupon 套用失敗，請稍後再試一次", "danger");
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                }

                vm.isLoading = true;
                vm.$http.post(cartApi, { data: fakeCart }) // 發送虛假購物車請求
                    .then((resolveRes) => {
                        vm.$http.post(couponApi, { data: coupon }) // 發送 coupon API
                            .then((resolveRes) => {
                                if (resolveRes.data.success) { // 代表有成功套用 coupon 
                                    vm.$http.get(cartApi) // 取得虛假購物車資料 (內含 coupon 詳細資料)
                                        .then((resolveRes) => {
                                            // 因為套用新 coupon 的話，所有的都會套用，舊有的也會被覆蓋掉，所以只要取第一項產品的 coupon 資料即可
                                            vm.usingCoupon.title = resolveRes.data.data.carts[0].coupon.title;
                                            vm.usingCoupon.code = resolveRes.data.data.carts[0].coupon.code;
                                            vm.usingCoupon.percent = resolveRes.data.data.carts[0].coupon.percent;
                                            localStorage.setItem("LSCoupon", JSON.stringify(vm.usingCoupon)); // 將 coupon 資訊存入 LS
                                            vm.inputCouponCode = ""; // 資訊存入 LS 後將輸入欄位清空
                                            vm.calLSTotal(); // 計算 LS 套用 coupon 後的金額
                                            vm.isLoading = false;
                                        })
                                        .catch(() => {
                                            reloadFN();
                                        });
                                }
                                else {
                                    vm.$alertMsg_Bus.$emit("alertMsgEvent", "coupon 套用失敗，請稍後再試一次", "danger");
                                    vm.isLoading = false;
                                }
                            })
                            .catch(() => {
                                reloadFN();
                            });
                    })
                    .catch((rejectRes) => {
                        reloadFN();
                    });
            },


            // 取消套用 coupon
            cancelCoupon() {
                localStorage.removeItem("LSCoupon");
                this.usingCoupon = {
                    title: "",
                    code: "",
                    percent: 100,
                };
                this.calLSTotal(); // 重新計算 LS 購物車金額
            },


            // 將更新後的 LS 購物車數量 送到 HeaderComponent 中進行更新
            sendLSCartItemNum() {
                this.$LSCartNum_Bus.$emit("LSCartItemNumEvent", this.userLSCartArr.length);
            },


            // 前往單一訂單頁面
            toSingleOrderPage(orderId) {
                this.$router.push({ path: "/singleOrder", query: { orderId: orderId } });
            },
            
        },
    };
</script>


<style scoped lang="scss">
    @import "@/assets/scss/frontEnd/cart.scss";
</style>