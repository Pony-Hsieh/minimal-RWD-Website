<template>
    <div>
        <h2 class="text-center mt-4">訂單管理</h2>

        <div class="container">

            <p class="h5 text-center my-5" v-if="rawData.length == 0">目前沒有訂單喔~</p>

            <!-- 訂單詳細資料 -->
            <!-- <table class="table table-bordered table-striped mt-4 w-100" v-if="rawData.length != 0"> -->
            <table class="table table-bordered table-striped table-responsive-lg mt-4 w-100" v-if="rawData.length != 0">
                <thead class="thead-dark">
                    <tr>
                        <!-- 訂單 id -->
                        <!-- <th width="5%">訂單 id</th> -->
                        <th width="100px">訂單 id</th>
                        <!-- create_at -->
                        <!-- <th width="10%">下單時間</th> -->
                        <th width="100px">下單時間</th>
                        <!-- is_paid -->
                        <!-- <th width="10%">付款狀態</th> -->
                        <th width="100px">付款狀態</th>
                        <!-- 購買商品 -->
                        <!-- <th width="25%">購買商品</th> -->
                        <th width="250px">購買商品</th>
                        <!-- total -->
                        <!-- <th width="12.5%">訂單金額</th> -->
                        <th width="120px">訂單金額</th>
                        <!-- 訂單留言 -->
                        <!-- <th width="12.5%">訂單留言</th> -->
                        <th width="200px">訂單留言</th>
                        <!-- user: Object -->
                        <!-- <th width="12.5%">收件者資料</th> -->
                        <th class="w-auto text-center align-middle">收件者資料</th>
                        <!-- 編輯訂單 -->
                        <!-- <th width="12.5%">編輯</th> -->
                        <th width="80px">編輯</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(order,index) in rawData" :key="index">
                        <!-- 訂單 id -->
                        <td class="" style="word-break: break-all;">{{order.id}}</td>
                        <!-- 下單時間 -->
                        <td class="text-center " style="word-break: keep-all;">
                            {{order.create_at|formatTime}}
                        </td>
                        <!-- 付款狀態 -->
                        <td class="text-center ">
                            <span v-if="order.is_paid" class="text-success">已付</span>
                            <span v-else class="text-danger">未付</span>
                        </td>
                        <!-- 購買商品 -->
                        <td class="">
                            <div v-for="item in order.products"
                                class="d-flex flex-column justify-content-center align-items-center py-2">
                                <div class="d-flex justify-content-center align-items-center">
                                    <!-- 商品圖片、商品名稱 -->
                                    <div>
                                        <!-- <img :src="item.product.imageUrl" alt="" style="width: 100px;" > -->
                                        <img :src="item.product.imageUrl" alt="" width="100px">
                                        <br>
                                        <div class="text-center mt-1">{{item.product.title}}</div>
                                    </div>
                                    <!-- 購買數量 -->
                                    <div class="ml-3">
                                        數量： {{item.qty}}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <!-- 訂單金額 -->
                        <td class="text-center ">{{order.total|currency}}</td>
                        <!-- 訂單留言 -->
                        <td class=" " style="word-break: break-all;" width="200px">
                            {{order.message}}</td>
                        <!-- 收件者資料 -->
                        <td class="">
                            訂購 email：
                            <br>
                            {{order.user.email}}
                            <br>
                            <br>
                            收件人地址：
                            <br>
                            {{order.user.address}}
                            <br>
                            <br>
                            收件人姓名：
                            <br>
                            {{order.user.name}}
                            <br>
                            <br>
                            收件人電話：
                            <br>
                            {{order.user.tel}}
                        </td>
                        <!-- 編輯訂單 -->
                        <td class="text-center ">
                            <button class="btn btn-sm btn-outline-info" @click="openAdjustModal(order)">編輯</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- 分頁功能 -->
            <nav aria-label="Page navigation example" class="mt-5 mb-4" v-if="rawData.length != 0">
                <ul class="pagination justify-content-center">
                    <li class="page-item" :class="{'disabled' : !pagination.has_pre }">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only">Previous</span>
                            <!-- sr-only 全稱是 screen reader only，意為：（僅供）屏幕閱讀器，這個 class 主要用於增強 accessbility（可訪問性）。 -->
                        </a>
                    </li>
                    <li class="page-item" :class="{ 'active' : pagination.current_page === page }"
                        v-for="page in pagination.total_pages" :key="page">
                        <a class="page-link" href="#" @click.prevent="getProducts(page)">{{ page }}</a>
                    </li>
                    <li class="page-item" :class="{'disabled' : !pagination.has_next }">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>

        </div>


        <!-- 編輯訂單 modal -->
        <div class="modal fade" id="orderAdjustModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>編輯訂單</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <!-- X 的符號 -->
                            <span aria-hidden="true" @click="closeAdjustModal">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">

                            <!-- 排版用 -->
                            <div class="col-2 d-none d-lg-block"></div>

                            <div class="col-12 col-lg-8">
                                <h4 class="h5">訂購商品</h4>
                                <div class="form-row border border-secondary rounded my-1 pt-4"
                                    v-for="item in tempOrder.products">
                                    <!-- 排版用 -->
                                    <div class="col-1 d-none d-lg-block"></div>
                                    <div class="form-group col-6 col-lg-5 d-flex flex-column align-items-center">
                                        <!-- 商品標題 -->
                                        <h5 class="text-center h6">{{item.product.title}}</h5>
                                        <!-- 商品圖片 -->
                                        <img :src="item.product.imageUrl" alt="" class="img-fluid">
                                    </div>
                                    <div class="form-group col-6 col-lg-4 d-flex flex-column justify-content-center">
                                        <h5 class="text-center h6">訂購數量</h5>
                                        <input type="number" min="0" class="form-control text-right" v-model="item.qty">
                                    </div>
                                    <!-- 排版用 -->
                                    <div class="col-2 d-none d-lg-block"></div>
                                </div>

                                <div class="form-group mt-3">
                                    <label for="title">
                                        <h4 class="text-center h5">訂單金額</h4>
                                    </label>
                                    <input type="number" class="form-control" id="title" v-model="tempOrder.total">
                                </div>

                                <div class="form-group">
                                    <label for="message" class="h5">訂單備註</label>
                                    <input type="text" class="form-control" id="message" v-model="tempOrder.message">
                                </div>

                                <div class="form-group mt-5">
                                    <h4 class="text-center h5">收件資訊</h4>
                                    <label for="email" class="mb-0 pl-1">訂購人 email</label>
                                    <input type="email" class="form-control" id="email" v-model="tempOrder.user.email">
                                    <label for="address" class="mt-3 mb-0 pl-1">收件地址</label>
                                    <input type="text" class="form-control" id="address"
                                        v-model="tempOrder.user.address">
                                    <label for="name" class="mt-3 mb-0 pl-1">收件人姓名</label>
                                    <input type="text" class="form-control" id="name" v-model="tempOrder.user.name">
                                    <label for="tel" class="mt-3 mb-0 pl-1">收件人電話</label>
                                    <input type="text" class="form-control" id="tel" v-model="tempOrder.user.tel">
                                </div>
                            </div>

                            <!-- 排版用 -->
                            <div class="col-2 d-none d-lg-block"></div>

                        </div>
                    </div>

                    <div class="modal-footer border-top-0 pt-0">
                        <div class="container-fluid">
                            <div class="row">
                                <!-- 排版用 -->
                                <div class="col-lg-2"></div>
                                <div class="col-lg-8 d-flex justify-content-end pr-0">
                                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"
                                        @click="closeAdjustModal">取消</button>
                                    <button type="button" class="btn btn-primary ml-1"
                                        @click="putAdjustOrderData(tempOrder.id)">確認</button>
                                </div>
                                <!-- 排版用 -->
                                <div class="col-lg-2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
    th {
        white-space: nowrap;
        text-align: center;
        vertical-align: middle
    }

    td {
        vertical-align: middle
    }
</style>


<script>
    import $ from "jquery";

    export default {
        name: "adminOrder",

        data() {
            return {
                rawData: [],
                pagination: {},
                tempOrder: {
                    products: {},
                    user: "",
                },
            }
        },

        methods: {

            getRawData(page = 1) {
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`; // 這個成功取回資料
                const vm = this;

                // 從遠端取回 產品 、 分頁 的資料
                this.$http.get(api).then((response) => {
                    // console.log("response", response); // 確認遠端撈回來的資料結構
                    vm.rawData = response.data.orders;
                    vm.pagination = response.data.pagination;
                });
            },

            // 開啟編輯訂單的 modal
            openAdjustModal(order) {
                this.tempOrder = order; // 先將傳入的參數暫存於 data return 內
                $("#orderAdjustModal").modal("show");
            },
            // 關閉編輯訂單的 modal
            closeAdjustModal() {
                this.tempOrder = { // 將 tempOrder 調回預設值
                    products: {},
                    user: "",
                };
                $("#orderAdjustModal").modal("hide");
            },

            // 送出編輯的內容
            putAdjustOrderData(orderID) {
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/order/${orderID}`;
                const vm = this;
                this.$http.put(api, { data: vm.tempOrder }).then((response) => {
                    // console.log("putAdjResponse", response); // 確認遠端撈回來的資料結構
                    if (response.data.success) {
                        vm.getRawData();
                    }
                    else {
                        alert("訂單編輯失敗，請重新整理頁面後再次編輯")
                    }
                    vm.closeAdjustModal();
                });
            },
        },

        created() {
            this.getRawData();
        },
    }
</script>