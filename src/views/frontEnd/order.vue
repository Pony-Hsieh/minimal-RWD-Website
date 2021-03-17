<template>
    <div>

        <headerComponent />

        <h2 class="text-center mt-4">檢視訂單</h2>

        <div class="container">

            <p class="h5 text-center my-5" v-if="rawData.length == 0">目前沒有訂單喔~</p>

            <!-- 訂單詳細資料 -->
            <table class="table table-bordered table-striped table-responsive-xl mt-4 mw-100"
                v-if="rawData.length != 0">
                <thead class="thead-dark">
                    <tr>
                        <!-- id -->
                        <th width="80px" class="text-center align-middle">訂單 id</th>
                        <!-- create_at -->
                        <th width="100px" class="text-center align-middle">下單時間</th>
                        <!-- is_paid -->
                        <th width="100px" class="text-center align-middle">付款狀態</th>
                        <!-- products -->
                        <th width="250px" class="text-center align-middle">購買商品</th>
                        <!-- total -->
                        <th width="120px" class="text-center align-middle">訂單金額</th>
                        <!-- message -->
                        <!-- <th width="120px" class="text-center align-middle">訂單留言</th> -->
                        <th width="20%" class="text-center align-middle">訂單留言</th>
                        <!-- user: Object -->
                        <!-- <th class="w-auto text-center align-middle">收件者資料</th> -->
                        <th width="120px" class="text-center align-middle">收件者資料</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(order,index) in rawData" :key="index">
                        <!-- 訂單 id -->
                        <td class="align-middle" style="word-break: break-all;">{{order.id}}</td>
                        <!-- 下單時間 -->
                        <td class="text-center align-middle" style="word-break: keep-all;">
                            {{order.create_at|formatTime}}
                        </td>
                        <!-- 付款狀態 -->
                        <td class="text-center align-middle">
                            <span v-if="order.is_paid" class="text-success">已付</span>
                            <span v-if="!order.is_paid" class="text-danger">未付</span>
                            <button v-if="!order.is_paid" class="btn btn-sm btn-primary mt-1"
                                @click="payOrder(order.id)">付款</button>
                        </td>
                        <!-- 購買商品 -->
                        <td class="align-middle">
                            <div v-for="item in order.products"
                                class="d-flex flex-column justify-content-center align-items-center py-2">
                                <div class="d-flex justify-content-center align-items-center">
                                    <!-- 商品圖片、商品名稱 -->
                                    <div>
                                        <img :src="item.product.imageUrl" alt="" style="width: 100px;">
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
                        <td class="text-center align-middle">{{order.total|currency}}</td>
                        <!-- 訂單留言 -->
                        <td style="max-width: 20%;  word-break: break-all;">{{order.message}}</td>
                        <!-- <td style="max-width: 20%;  word-wrap:break-word;" class="align-middle">{{order.message}}</td> -->
                        <!-- 收件者資料 -->
                        <td class="align-middle">
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

        <footerComponent />

    </div>
</template>


<script>
    import $ from "jquery";

    import headerComponent from "../headerComponent";
    import footerComponent from "../footerComponent";

    export default {
        name: "order",

        components: {
            headerComponent,
            footerComponent
        },

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
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/orders?page=${page}`;
                const vm = this;

                // 從遠端取回 訂單 、 分頁 的資料
                this.$http.get(api).then((response) => {
                    // console.log("response", response); // 確認遠端撈回來的資料結構
                    vm.rawData = response.data.orders;
                    vm.pagination = response.data.pagination;
                });
            },

            // 訂單付款
            payOrder(orderId) {
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${orderId}`;
                const vm = this;

                this.$http.post(api).then((response) => {
                    // console.log("response", response); // 確認遠端撈回來的資料結構
                    if (response.success) {
                        alert("付款成功！");
                        vm.getRawData();
                    }
                });
            },

        },

        created() {
            this.getRawData();
        },
    }
</script>