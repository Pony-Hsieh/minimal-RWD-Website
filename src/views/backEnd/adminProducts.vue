<template>
    <div>
        <div class="container">
            <h2 class="text-center mt-4">產品管理</h2>

            <div class="text-right">
                <button class="btn btn-outline-primary" @click="openModal(true)">建立新產品</button>
            </div>

            <p class="h5 text-center mt-5" v-if="products.length == 0">目前沒有產品喔~</p>
            <!-- <p class="h5 text-center mt-5">目前沒有產品喔~</p> -->

            <!-- 產品列表 -->
            <table class="table table-bordered table-striped table-responsive-lg mt-4" v-if="products.length != 0">
                <thead class="thead-dark">
                    <tr>
                        <th width="120px" class="text-center align-middle">產品圖片</th>
                        <th width="80px" class="text-center align-middle">分類</th>
                        <th class="text-center align-middle" style="min-width: 90px;">產品名稱</th>
                        <th width="80px" class="text-center align-middle">原價</th>
                        <th width="80px" class="text-center align-middle">售價</th>
                        <th width="100px" class="text-center align-middle">啟用狀態</th>
                        <th width="80px" class="text-center align-middle">編輯</th>
                        <th width="80px" class="text-center align-middle">刪除</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in products" :key="item.id">
                        <td class="text-center py-3">
                            <img v-bind:src="item.imageUrl" width="80px" alt="">
                        </td>
                        <td class="text-center align-middle">{{ item.category }}</td>
                        <td class="align-middle">{{ item.title }}</td>
                        <td class="text-right align-middle">{{ item.origin_price | currency }}</td>
                        <td class="text-right align-middle">{{ item.price | currency }}</td>
                        <td class="text-center align-middle">
                            <span v-if="item.is_enabled" class="text-success">啟用</span>
                            <span v-else class="text-secondary">停用</span>
                        </td>
                        <td class="text-center align-middle">
                            <button class="btn btn-outline-info btn-sm" @click="openModal(false, item)">編輯</button>
                        </td>
                        <td class="text-center align-middle">
                            <button class="btn btn-outline-danger btn-sm"
                                @click="openDeleteModal(item.id, item.title)">刪除</button>
                        </td>
                    </tr>
                </tbody>
            </table>

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
        </div>

        <!-- 新增、編輯產品 Modal -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <!-- <span>新增產品</span> -->
                            <span v-if="modalTitle">新增產品</span>
                            <span v-else>編輯產品</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            <!-- X 的符號 -->
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="imageUrl">輸入圖片網址</label>
                                    <input type="text" class="form-control" id="imageUrl" v-model="tempProduct.imageUrl"
                                        placeholder="請輸入圖片連結">
                                </div>
                                <div class="form-group">
                                    <label for="customFile">或 上傳圖片
                                        <!-- <i class="fas fa-spinner fa-spin"></i> -->
                                    </label>
                                    <input type="file" id="customFile" class="form-control" ref="files">
                                </div>

                                <!-- 這個應該是用於預覽圖片     -->
                                <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                                    v-bind:src="tempProduct.imageUrl" class="img-fluid" alt="">
                                <!-- 這邊有點不太懂，可以再自行推敲一下 -->
                                <!-- 因為其他地方都是使用 v-model ，只有這邊使用 v-bind:src -->
                            </div>
                            <div class="col-sm-8">
                                <div class="form-group">
                                    <label for="title">標題</label>
                                    <input type="text" class="form-control" id="title" v-model="tempProduct.title"
                                        placeholder="請輸入標題">
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="category">分類</label>
                                        <input type="text" class="form-control" id="category"
                                            v-model="tempProduct.category" placeholder="請輸入分類">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="price">單位</label>
                                        <input type="unit" class="form-control" id="unit" v-model="tempProduct.unit"
                                            placeholder="請輸入單位">
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="origin_price">原價</label>
                                        <input type="number" class="form-control" id="origin_price"
                                            v-model="tempProduct.origin_price" placeholder="請輸入原價">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="price">售價</label>
                                        <input type="number" class="form-control" id="price" v-model="tempProduct.price"
                                            placeholder="請輸入售價">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="description">產品描述</label>
                                    <textarea type="text" class="form-control" id="description"
                                        v-model="tempProduct.description" placeholder="請輸入產品描述"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="content">說明內容</label>
                                    <textarea type="text" class="form-control" id="content"
                                        v-model="tempProduct.content" placeholder="請輸入產品說明內容"></textarea>
                                </div>
                                <div class="form-group">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="is_enabled"
                                            v-model="tempProduct.is_enabled" v-bind:true-value="1"
                                            v-bind:false-value="0">
                                        <label class="form-check-label" for="is_enabled">
                                            是否啟用
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer border-top-0">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 確認刪除用 Modal  -->
        <div class="modal fade" id="productDeleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">欲刪除商品名稱：</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <span class="h5">{{ this.deleteProductTitle }}</span>
                    </div>
                    <div class="modal-footer">
                        <div class="container-fluid">
                            <div class="row">
                                <button type="button" class="btn btn-secondary col mr-1"
                                    data-dismiss="modal">否，關閉此彈跳視窗</button>
                                <button type="button" class="btn btn-danger col ml-1"
                                    @click="deleteProduct">是，刪除此商品</button>
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
                pagination: {},
                products: [],     // 儲存從遠端撈回來，之前上傳的產品資料
                tempProduct: {},  // 儲存彈跳 Modal 的資料
                modalTitle: true, // true:"新增"、false:"編輯"
                isNew: false,     // 用來判斷是新增或是編輯產品
                deleteProductID: "", // 暫時儲存欲刪除產品之 ID
                deleteProductTitle: "", // 暫時儲存欲刪除產品之 title (商品名稱)
                isLoading: false,
                status: {
                    fileUploading: false,
                },
            };
        },

        methods: {
            getProducts(page = 1) {
                // page = 1 為參數預設值，如果有其他的就用其他的，如果沒有就用 1

                // const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
                const vm = this;
                // vm.isLoading = true;

                // 從遠端取回 產品 、 分頁 的資料
                this.$http.get(api).then((response) => {
                    // console.log(response.data);
                    vm.products = response.data.products;
                    vm.pagination = response.data.pagination;
                    vm.isLoading = false;
                });
            },

            openModal(isNew, item) {
                if (isNew) {
                    // 因為有預傳參數，所以新增就會進到這裡
                    // 如果是新增產品，就做這些事情
                    this.tempProduct = {};
                    this.isNew = true;
                    this.modalTitle = true;
                }
                else {
                    // 因為有預傳參數，所以編輯就會進到這裡
                    // 如果是編輯產品，就做這些事情
                    this.tempProduct = Object.assign({}, item);
                    this.isNew = false;
                    this.modalTitle = false;
                }
                $("#productModal").modal("show"); // 這個語法是BS4裡面寫的 // 官方文件：https://getbootstrap.com/docs/4.1/components/modal/#modalshow
            },

            // 將 Modal 的產品內容記錄至伺服器內，包含新增、修改
            updateProduct() {
                let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
                let httpMethod = "post";
                const vm = this;

                if (!vm.isNew) {
                    // 如果是要編輯產品，有這些前置作業要做
                    api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
                    httpMethod = "put";
                }

                this.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
                    // this.$http.post(api, { data: vm.tempProduct }).then((response) => { 
                    // 注意這兩行的差別喔，我原本以為中括號前面要有點，後來發現不用，目前還不太清楚為什麼

                    // console.log(response.data);
                    if (response.data.success) {
                        $("#productModal").modal("hide"); // 將 新增or修改產品的Modal 關掉
                        vm.getProducts(); // 重新取得遠端的資料(讓目前的頁面資料保持最新)
                    }
                    else {
                        $("#productModal").modal("hide"); // 將 新增or修改產品的Modal 關掉
                        // vm.getProducts(); // 這裡我不太懂耶，就已經失敗了，為什麼還要再從遠端撈一次資料？我目前覺得這個行為可以不用
                        console.log("無法成功新增產品");
                    }
                });
            },

            // 刪除
            openDeleteModal(id, title) {
                this.deleteProductID = id;        // 將 id 存入自己的資料結構
                this.deleteProductTitle = title;  // 將 title 存入自己的資料結構
                // console.log("deleteProductID", this.deleteProductID); // 確認有成功存入
                // console.log("deleteProductTitle", this.deleteProductTitle); // 確認有成功存入
                $("#productDeleteModal").modal("show");
            },

            // 是，刪除此產品
            deleteProduct() {
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${this.deleteProductID}`;
                const vm = this;

                this.$http.delete(api).then((response) => {
                    // console.log("response", response); // 先將資料取回，確定從遠端取回的資料結構
                    if (response.data.success) {
                        vm.deleteProductID = "";    // 清空待刪除的商品 id
                        vm.deleteProductTitle = ""; // 清空待刪除的商品 title
                        vm.getProducts(); // 重新取得遠端的資料(讓目前的頁面資料保持最新)
                        alert("已成功刪除產品"); // 告知後台管理員已成功刪除產品
                        $("#productDeleteModal").modal("hide"); // 將 刪除用的Modal 關掉
                    }
                    else {
                        vm.deleteProductID = "";    // 清空待刪除的商品 id
                        vm.deleteProductTitle = ""; // 清空待刪除的商品 title
                        alert("暫時無法刪除產品，請稍後再試一次");
                    }
                });
            },



        },

        created() {
            this.getProducts();
            // console.log("this.products", this.products);
        },
    };
</script>