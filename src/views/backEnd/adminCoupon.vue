<template>
    <div>
        <div class="container">
            <h2 class="text-center mt-4">優惠券管理</h2>

            <div class="text-right">
                <!-- <button class="btn btn-outline-dark" @click="openCouponModal(true)">新增 coupon</button> -->
                <button class="btn btn-outline-primary" @click="openCouponModal(true)">新增 coupon</button>
            </div>

            <p class="h5 text-center mt-5" v-if="coupons.length == 0">目前沒有優惠券喔~</p>

            <table class="table table-bordered table-striped table-responsive-lg mt-4">
                <thead class="thead-dark">
                    <tr>
                        <!-- title -->
                        <th class="text-center align-middle">coupon 名稱</th>

                        <!-- code -->
                        <th class="text-center align-middle">coupon 序號</th>

                        <!-- percent -->
                        <th class="text-center align-middle">優惠內容</th>

                        <!-- is_enabled -->
                        <th class="text-center align-middle">是否啟用</th>

                        <!-- due_date -->
                        <th class="text-center align-middle">使用截止期限</th>

                        <th width="100px" class="text-center align-middle">編輯</th>
                        <th width="100px" class="text-center align-middle">刪除</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in coupons" :key="item.id">
                        <!-- <td>{{item}}</td> -->
                        <!-- coupon 名稱 -->
                        <td class="text-center align-middle">{{ item.title }}</td>
                        <!-- coupon 序號 -->
                        <td class="align-middle">{{ item.code }}</td>
                        <!-- 優惠內容 -->
                        <td class="text-center align-middle">{{ item.percent|couponTransfer }}</td>
                        <!-- 是否啟用 -->
                        <td class="text-center align-middle">
                            <span v-if="item.is_enabled" class="text-success">啟用</span>
                            <span v-else class="text-secondary">停用</span>
                        </td>
                        <!-- 使用截止期限 -->
                        <td class="text-center align-middle">{{ item.due_date|couponFormatTime }}</td>
                        <td class="text-center align-middle">
                            <button class="btn btn-outline-info btn-sm"
                                @click="openCouponModal(false, item)">編輯</button>
                            <!-- <button class="btn btn-outline-primary btn-sm"
                                @click="openCouponModal(false, item)">編輯</button> -->
                        </td>
                        <td class="text-center align-middle">
                            <button class="btn btn-outline-danger btn-sm"
                                @click="openDeleteModal(item.id, item.title)">刪除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- 顯示分頁 -->
        <nav aria-label="Page navigation example" class="mt-5 mb-4">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{'disabled' : !pagination.has_pre }">
                    <a class="page-link" href="#" aria-label="Previous"
                        @click.prevent="getProducts(pagination.current_page - 1)">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item" :class="{ 'active' : pagination.current_page === page }"
                    v-for="page in pagination.total_pages" :key="page">
                    <a class="page-link" href="#" @click.prevent="getProducts(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{'disabled' : !pagination.has_next }">
                    <a class="page-link" href="#" aria-label="Next"
                        @click.prevent="getProducts(pagination.current_page + 1)">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>


        <!-- 新增、修改 coupon Modal -->
        <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span v-if="modalTitle">新增優惠券</span>
                            <span v-else>編輯優惠券</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- <div class="col-12"> -->
                        <div>
                            <div class="form-group">
                                <label for="title">coupon 名稱</label>
                                <input type="text" class="form-control" id="title" v-model="tempCoupon.title">
                            </div>
                            <div class="form-group">
                                <label for="code">coupon 序號</label>
                                <input type="text" class="form-control" id="code" v-model="tempCoupon.code">
                            </div>
                            <div class="form-group">
                                <label for="percent">優惠折數<br>(9折請輸入"90"，8折請輸入"80"，依此類推~)</label>
                                <input type="number" max="100" min="0" class="form-control" id="percent"
                                    v-model="tempCoupon.percent">
                            </div>
                            <div class="form-group">
                                <label for="due_date">使用截止期限</label>
                                <input type="date" class="form-control" id="due_date" v-model="tempCoupon.due_date">
                            </div>
                            <div class="form-group">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="is_enabled"
                                        v-model="tempCoupon.is_enabled" v-bind:true-value="1" v-bind:false-value="0">
                                    <label class="form-check-label" for="is_enabled">啟用狀態</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer border-top-0">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
                        <button type="button" class="btn btn-primary" @click="updateCoupon" v-if="isNew">確定新增</button>
                        <button type="button" class="btn btn-primary" @click="updateCoupon" v-else>確定修改</button>
                        <!-- <button type="button" class="btn btn-success" @click="testData">測試資料結構</button> -->
                    </div>
                </div>
            </div>
        </div>

        <!-- 確認刪除用 Modal  -->
        <div class="modal fade" id="couponDeleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">欲刪除 coupon 名稱：</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <span class="h6">{{ this.deleteCouponTitle }}</span>
                    </div>
                    <div class="modal-footer">
                        <div class="container-fluid">
                            <div class="row">
                                <button type="button" class="btn btn-secondary col mr-1"
                                    data-dismiss="modal">否，關閉此彈跳視窗</button>
                                <!-- <div class="col-2 d-sm-none"></div> -->
                                <button type="button" class="btn btn-danger col ml-1" @click="deleteCoupon">是，刪除此
                                    coupon</button>
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

    export default {
        data: function () {
            return {
                coupons: {},  // 儲存從遠端撈回來，之前上傳的 coupon 資料
                pagination: {}, // 作為分頁功能使用
                tempCoupon: {}, // 儲存彈跳 Modal 的資料
                isNew: false,
                modalTitle: true, // true:"新增"、false:"編輯"
                deleteCouponID: "", // 暫時儲存欲刪除 coupon 之 ID
                deleteCouponTitle: "", // 暫時儲存欲刪除 coupon 之 title
            };
        },
        methods: {

            // 取得 coupon 列表
            getCouponList(page = 1) {
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
                const vm = this;
                // vm.isLoading = true;

                // 從遠端取回 產品 、 分頁 的資料
                this.$http.get(api).then((response) => {
                    // console.log(response);  // 確認資料結構
                    vm.coupons = response.data.coupons;
                    vm.pagination = response.data.pagination;  // 作為分頁功能使用
                    // vm.isLoading = false;
                });
            },

            openCouponModal(isNew, item) {
                if (isNew) {
                    // 如果是新增 coupon，就做這些事情
                    this.tempCoupon = {};
                    this.isNew = true;
                    this.modalTitle = true;
                }
                else {
                    // 如果是編輯 coupon，就做這些事情
                    this.tempCoupon = Object.assign({}, item);
                    this.isNew = false;
                    this.modalTitle = false;
                }

                $("#couponModal").modal("show");
            },

            testData() {
                // this.tempCoupon.due_date = new Date(this.tempCoupon.due_date_rawdata).getTime();
                console.log(this.tempCoupon);
                console.log(this.tempCoupon.num);
            },

            updateCoupon() {
                // this.tempCoupon.due_date = new Date(this.tempCoupon.due_date_rawdata).getTime();
                // 將日期轉為 unixTimeStamp
                this.tempCoupon.due_date = new Date(this.tempCoupon.due_date).getTime();
                // console.log(this.tempCoupon);

                let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
                let httpMethod = "post";
                const vm = this;

                if (!vm.isNew) {
                    // 如果是要編輯 coupon，有這些前置作業要做
                    api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
                    httpMethod = "put";
                }

                this.$http[httpMethod](api, { data: vm.tempCoupon }).then((response) => {
                    // this.$http.post(api, { data: vm.tempCoupon }).then((response) => { 
                    // 注意這兩行的差別喔，我原本以為中括號前面要有點，後來發現不用，目前還不太清楚為什麼

                    // console.log("updateCouponResponse", response);  // 先將資料取回，確定從遠端取回的資料結構
                    if (response.data.success) {
                        if (vm.isNew) {
                            console.log("成功新增 coupon!");
                        }
                        else {
                            console.log("成功編輯 coupon!");
                        }
                        $("#couponModal").modal("hide"); // 將 新增or修改產品的Modal 關掉
                        vm.getCouponList(); // 重新取得遠端的資料(讓目前的頁面資料保持最新)
                    }
                    else {
                        if (vm.isNew) {
                            alert("暫時無法新增 coupon，請稍後再試");
                        }
                        else {
                            alert("暫時無法儲存 coupon 編輯內容，請稍後再試");
                        }
                        $("#couponModal").modal("hide"); // 將 新增or修改產品的Modal 關掉
                        // vm.getCouponList(); // 這裡我不太懂耶，就已經失敗了，為什麼還要再從遠端撈一次資料？我目前覺得這個行為可以不用
                    }
                });
            },

            // 確認刪除此 coupon?
            openDeleteModal(id, title) {
                this.deleteCouponID = id;        // 將 id 存入自己的資料結構
                this.deleteCouponTitle = title;  // 將 title 存入自己的資料結構
                // console.log("deleteCouponID", this.deleteCouponID); // 確認有成功存入
                // console.log("deleteCouponTitle", this.deleteCouponTitle); // 確認有成功存入
                $("#couponDeleteModal").modal("show");
            },

            // 是，刪除此 coupon
            deleteCoupon() {
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${this.deleteCouponID}`;
                const vm = this;

                this.$http.delete(api).then((response) => {
                    console.log("deleteCoupon Response", response); // 先將資料取回，確定從遠端取回的資料結構

                    if (response.data.success) {
                        vm.getCouponList(); // 重新取得遠端的資料(讓目前的頁面資料保持最新)
                        vm.deleteCouponID = "";    // 清空待刪除的 coupon id
                        vm.deleteCouponTitle = ""; // 清空待刪除的 coupon title
                        alert("已成功刪除 coupon"); // 告知後台管理員已成功刪除產品
                        // $("#couponDeleteModal").modal("hide"); // 將 刪除用的Modal 關掉
                    }
                    else {
                        vm.deleteCouponID = "";    // 清空待刪除的 coupon id
                        vm.deleteCouponTitle = ""; // 清空待刪除的 coupon title
                        alert("暫時無法刪除 coupon，請稍後再試一次");
                        // $("#couponDeleteModal").modal("hide"); // 將 刪除用的Modal 關掉
                    }
                    $("#couponDeleteModal").modal("hide"); // 將 刪除用的Modal 關掉
                });
            },



        },
        created() {
            this.getCouponList();
        },
    }
</script>