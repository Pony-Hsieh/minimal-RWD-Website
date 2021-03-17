<template>
    <div>

        <headerComponent />

        <div class="container all">
            <div class="row pt-5">

                <!-- 套用 filter -->
                <div class="col-12 col-lg-3">

                    <!-- 類別 filter -->
                    <div class="filterCard">
                        <h5>依據 類別 篩選</h5>
                        <ul class="list-unstyled categoryList">
                            <li>
                                <a href="#" @click.prevent="showCategory = 'all', saveFilteredArray()">全部</a>
                                <!-- <a href="#" @click.prevent="showCategory = 'all', saveFilteredArray">全部</a> -->
                            </li>
                            <li>
                                <a href="#" @click.prevent="showCategory = 'rawMen', saveFilteredArray()">男士</a>
                            </li>
                            <li>
                                <a href="#" @click.prevent="showCategory = 'rawWomen', saveFilteredArray()">女士</a>
                            </li>
                            <li>
                                <a href="#" @click.prevent="showCategory = 'rawShoes', saveFilteredArray()">鞋類</a>
                            </li>
                            <li>
                                <a href="#" @click.prevent="showCategory = 'rawSports', saveFilteredArray()">運動</a>
                            </li>
                        </ul>
                    </div>

                    <!-- 金額 filter -->
                    <div class="filterCard priceFilter mt-5">
                        <h5>依據 金額 篩選</h5>
                        <div class="priceFilterInfo">

                            <vue-slider v-model="priceRange" dotSize="20" max="10000" interval="100" :lazy="true" />

                            <div class="w-100">
                                <input type="number" v-model="priceRange[0]">
                                到
                                <input type="number" v-model="priceRange[1]">
                            </div>

                            <div class="w-100">
                                <button class="btn btn-sm" @click="saveFilteredArray">
                                    套用金額範圍
                                </button>
                            </div>

                        </div>
                    </div>

                </div>

                <main class="col-12 col-lg-9">
                    <div class="container-fluid">
                        <!-- 顯示類別、該類別有幾項商品 -->
                        <div class="row">
                            <div class="col-12 col-lg-6 p-0 pl-lg-4">
                                <h3 class="h4" style="line-height: 42px;">{{ showString[showCategory] }}
                                    ({{
                                    filteredArray.length }})</h3>
                            </div>
                            <!-- <div class="col-12 col-lg-6 p-0 pr-lg-4 filterDropDown"
                                style="margin-top:20px; margin-bottom: 40px;"> -->
                            <div class="col-12 col-lg-6 p-0 pr-lg-4 filterDropDown">
                                <!-- 依據類別篩選 -->
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col p-0 mr-1">
                                            <select v-model="showCategory" @change="saveFilteredArray" class="w-100"
                                                style="height: 42px;">
                                                <option value="all" disabled>選擇類別</option>
                                                <option value="all">全部</option>
                                                <option value="rawMen">男士</option>
                                                <option value="rawWomen">女士</option>
                                                <option value="rawShoes">鞋類</option>
                                                <option value="rawSports">運動</option>
                                            </select>
                                        </div>
                                        <div class="col p-0 ml-1">
                                            <!-- 每頁顯示幾項商品 -->
                                            <select v-model="pageUnit" @change="getPage" class="w-100"
                                                style="height: 42px;">
                                                <option value="9" default>每頁顯示 9 樣商品</option>
                                                <option value="6">每頁顯示 6 樣商品</option>
                                                <option value="3">每頁顯示 3 樣商品</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 分頁功能 -->
                        <!-- <div class="row">
                            頁數列表
                            <ul :value="pageNum" v-for="pageNum in totalPageNumber" :key="pageNum">
                                <button @click="updateCurrentPageNumber(pageNum)">
                                    {{pageNum}}
                                </button>
                            </ul>
                        </div> -->

                        <!-- 分頁功能 -->
                        <nav aria-label="Page navigation example" class="my-4">
                            <ul class="pagination justify-content-center">
                                <!-- 上一頁 -->
                                <li class="page-item" :class="{'disabled' : currentPageNumber === 1}">
                                    <a class="page-link" href="#" aria-label="Previous"
                                        @click.prevent="updateCurrentPageNumber(currentPageNumber - 1)">
                                        <span aria-hidden="true">&laquo;</span>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                </li>
                                <!-- 各分頁 -->
                                <li class="page-item" :class="{ 'active' : currentPageNumber === pageNum }"
                                    v-for="pageNum in totalPageNumber" :key="pageNum">
                                    <a class="page-link" href="#"
                                        @click.prevent="updateCurrentPageNumber(pageNum)">{{pageNum}}</a>
                                </li>
                                <!-- 下一頁 -->
                                <li class="page-item" :class="{'disabled' : currentPageNumber === totalPageNumber}">
                                    <a class="page-link" href="#" aria-label="Next"
                                        @click.prevent="updateCurrentPageNumber(currentPageNumber + 1)">
                                        <span aria-hidden="true">&raquo;</span>
                                        <span class="sr-only">Next</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        <!-- 顯示商品 -->
                        <div class="row productInfo">
                            <div class="col-12 col-sm-6 col-lg-4 singleProductInfo"
                                v-for=" (item, index) in showProducts" :key="index">
                                <div @mouseover="addHoverProduct(item.id)" @mouseleave="removeHoverProduct"
                                    @click.prevent="toSingleProductPage(item.id)" style="cursor: pointer;">
                                    <img :src="item.imageUrl" alt="">
                                </div>
                                <h4 @click.prevent="toSingleProductPage(item.id)" style="cursor: pointer;">
                                    {{item.title}}
                                </h4>
                                <div class="d-flex flex-column" style="height: 80px;cursor: pointer;"
                                    @click.prevent="toSingleProductPage(item.id)">
                                    <del v-if="item.origin_price !== item.price">{{item.origin_price|currency}}</del>
                                    <h5>{{item.price|currency}}</h5>
                                </div>

                                <ul class="list-unstyled hoverWidget" :class="{'ing': hoverProductId === item.id}"
                                    @mouseover="addHoverProduct(item.id)" @mouseleave="removeHoverProduct">
                                    <li class="like">
                                        <a href="#" @click.prevent title="收藏此商品">
                                            <i class="far fa-heart"></i>
                                        </a>
                                    </li>
                                    <li class="addCart">
                                        <a href="#" @click.prevent="addToCart(item.id, item.title)" title="加入購物車">
                                            <i class="fas fa-cart-plus"></i>
                                        </a>
                                    </li>
                                </ul>

                            </div>

                        </div>

                        <!-- 分頁功能 -->
                        <nav aria-label="Page navigation example" class="my-4">
                            <ul class="pagination justify-content-center">
                                <!-- 上一頁 -->
                                <li class="page-item" :class="{'disabled' : currentPageNumber === 1}">
                                    <a class="page-link" href="#" aria-label="Previous"
                                        @click.prevent="updateCurrentPageNumber(currentPageNumber - 1)">
                                        <span aria-hidden="true">&laquo;</span>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                </li>
                                <!-- 各分頁 -->
                                <li class="page-item" :class="{ 'active' : currentPageNumber === pageNum }"
                                    v-for="pageNum in totalPageNumber" :key="pageNum">
                                    <a class="page-link" href="#"
                                        @click.prevent="updateCurrentPageNumber(pageNum)">{{pageNum}}</a>
                                </li>
                                <!-- 下一頁 -->
                                <li class="page-item" :class="{'disabled' : currentPageNumber === totalPageNumber}">
                                    <a class="page-link" href="#" aria-label="Next"
                                        @click.prevent="updateCurrentPageNumber(currentPageNumber + 1)">
                                        <span aria-hidden="true">&raquo;</span>
                                        <span class="sr-only">Next</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </main>

            </div>
        </div>

        <shippingDescription />
        <igPost />
        <footerComponent />

    </div>
</template>




<style>
    .vue-slider-process {
        background-color: #ff3368;
    }

    .vue-slider-dot-handle {
        background-color: #ff3368;
    }

    .vue-slider-dot-tooltip-inner {
        border-color: #ff3368;
        background-color: #ff3368;
    }

    .vue-slider-dot-handle-focus {
        -webkit-box-shadow: 0px 0px 1px 2px rgba(255, 51, 104, 0.36);
        box-shadow: 0px 0px 1px 2px rgba(255, 51, 104, 0.36);
    }

    .vue-slider-dot-handle:hover {
        background-color: #fff;
        border: 1px solid #ff3368;
    }
</style>

<style scoped>
    .container.all .row {
        max-width: 1110px;
    }

    /* 套用 filter */
    .filterCard {
        box-shadow: 0px 10px 10px 0px rgba(153, 153, 153, 0.1);
        padding-bottom: 5px;
    }

    .filterCard h5 {
        height: 50px;
        background-color: #e8f0f2;
        color: #2a2a2a;
        font-size: 14px;
        font-weight: 600;
        display: flex;
        align-items: center;
        margin-bottom: 0;
        padding-left: 30px;
    }

    .filterCard ul {
        margin: 15px;
    }

    .categoryList li {
        height: 38px;
    }

    .categoryList li a {
        width: 100%;
        height: 100%;
        padding: 0 15px;
        text-decoration: none;
        color: #000;
        display: flex;
        align-items: center;
    }

    .categoryList li a:hover {
        background-color: #2a2a2a;
        color: #e8f0f2;
        border-radius: 8px;
        transition: 0.5s;
    }

    .priceFilter h5 {
        margin-bottom: 15px;
    }

    .priceFilterInfo {
        padding: 15px;
    }

    .priceFilterInfo .w-100 {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
    }


    .priceFilterInfo input::-webkit-outer-spin-button,
    .priceFilterInfo input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        /* 拿掉數字輸入欄位的箭頭 */
    }

    .priceFilterInfo input[type="number"] {
        width: 33%;
        margin: 0 5px;
        text-align: right;
        -moz-appearance: textfield;
        /* 拿掉數字輸入欄位的箭頭 */
    }

    .priceFilter button {
        /* border: 1px solid #e8f0f2; */
        border: 1px solid #2a2a2a;
        transition: 0.5s;
    }

    .priceFilter button:hover {
        background-color: rgba(42, 42, 42, 0.6);
        /* color: #e8f0f2; */
        transition: 0.5s;
    }

    .priceFilter button:active {
        background-color: rgb(42, 42, 42);
        color: #e8f0f2;
        transition: 0.5s;

    }

    main {
        margin-top: 70px;
        margin-bottom: 40px;
    }

    .filterDropDown {
        margin-top: 20px;
        margin-bottom: 40px;
    }

    @media (min-width: 992px) {
        .filterDropDown {
            margin: 0;
        }
    }

    .singleProductInfo {
        height: 350px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
    }

    .singleProductInfo>div {
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .singleProductInfo img {
        max-width: 100%;
        max-height: 200px;
        position: relative;
    }

    .singleProductInfo h4 {
        font-size: 16px;
        color: #000;
        margin-top: 23px;
    }

    .singleProductInfo del {
        color: #606060;
    }

    .singleProductInfo h5 {
        font-size: 18px;
        height: 36px;
        line-height: 36px;
    }

    .singleProductInfo .hoverWidget {
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 60px;
        right: 35px;
        right: 10px;
        opacity: 0;
        transition: 0.5s;
    }

    .singleProductInfo .hoverWidget.ing {
        right: 35px;
        opacity: 1;
        transition: 0.5s;
    }

    .hoverWidget li {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #2f7dfc;
        font-size: 16px;
        line-height: 40px;
        text-align: center;
    }

    .hoverWidget li a {
        display: block;
        width: 100%;
        text-decoration: none;
        color: #fff;
        outline: none;

    }

    .hoverWidget li a:hover {
        background-color: #fff;
        color: #2f7dfc;
        border-radius: 50%;
        border: 1.5px solid #2f7dfc;
    }

    .hoverWidget li a:active {
        transform: scale(1.1);
    }

    .hoverWidget .like {
        margin-bottom: 10px;
    }
</style>

<script>
    import headerComponent from "../headerComponent";
    import shippingDescription from "../shippingDescription";
    import igPost from "../igPost";
    import footerComponent from "../footerComponent";

    import eventBus from '@/eventBus'

    export default {
        name: "shop",
        components: {
            headerComponent,
            shippingDescription,
            igPost,
            footerComponent,
        },

        data() {
            return {
                rawProducts: [],  // 所有商品資料
                rawCategoryProducts: {
                    all: [],
                    rawMen: [],
                    rawWomen: [],
                    rawShoes: [],
                    rawSports: [],
                },

                showCategory: "all", // 要顯示的類別 // 預設為全部商品
                showString: {
                    all: "全部",
                    rawMen: "男士",
                    rawWomen: "女士",
                    rawShoes: "鞋類",
                    rawSports: "運動",
                },
                categoryFilterArray: [],  // 使用 類別過濾器 過濾後的陣列

                priceRange: [0, 10000],   // 用以暫存商品售價範圍
                priceFilterArray: [],     // 使用 金額過濾器 過濾後的陣列

                filteredArray: [], // 套用 類別 金額 過濾器之後的產品列表
                showProducts: [],  // 套用分頁功能後，要渲染出來的產品資料列表


                pageUnit: 9,
                currentPageNumber: 1,
                totalPageNumber: 1,

                hoverProductId: "",

                originalCart: [], // 原本的購物車內容
                sameProductStatus: false, // 購物車內是否有同樣的商品
                cartItemNum: 0,
            }
        },

        methods: {

            judgeCategoryByRouterParam() {
                // console.log(this.$route.query.category);
                if (this.$route.query.category === "Men") {
                    this.showCategory = "rawMen"
                }
                else if (this.$route.query.category === "Women") {
                    this.showCategory = "rawWomen"
                }
                else if (this.$route.query.category === "Shoes") {
                    this.showCategory = "rawShoes"
                }
                else if (this.$route.query.category === "Sports") {
                    this.showCategory = "rawSports"
                }
            },

            getRawProducts() {
                // const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`; // 這個成功取回資料
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`; // 這個成功取回資料
                // const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`; // 這個無法取回資料
                const vm = this;

                // vm.isLoading = true; // 讀取效果

                // 從遠端取回 產品 、 分頁 的資料
                this.$http.get(api).then((response) => {
                    // console.log(response); // 確認遠端撈回來的資料結構
                    vm.rawProducts = response.data.products;
                    vm.rawCategoryProducts.all = vm.rawProducts;
                    vm.makeRawCategoryArr();
                    // vm.isLoading = false;  // 讀取效果
                    vm.applyCategoryFilter();
                    vm.applyPriceFilter();
                    vm.getPage();
                    vm.saveFilteredArray();
                    vm.judgeShowProductsByPage();
                });
            },

            makeRawCategoryArr() {
                const vm = this;

                for (let i = 0; i < vm.rawProducts.length; i++) {
                    if (vm.rawProducts[i].category === "男士") {
                        vm.rawCategoryProducts.rawMen.push(vm.rawProducts[i]);
                    }
                    if (vm.rawProducts[i].category === "女士") {
                        vm.rawCategoryProducts.rawWomen.push(vm.rawProducts[i]);
                    }
                    if (vm.rawProducts[i].category === "鞋類") {
                        vm.rawCategoryProducts.rawShoes.push(vm.rawProducts[i]);
                    }
                    if (vm.rawProducts[i].category === "運動") {
                        vm.rawCategoryProducts.rawSports.push(vm.rawProducts[i]);
                    }
                }
                // console.log(vm.rawCategoryProducts);
            },

            // 套用 類別 篩選器
            applyCategoryFilter() {
                const vm = this;
                vm.categoryFilterArray = []; // 先將原本的陣列清空。 // 如果沒有加這行，符合篩選條件的內容就就會一直疊加到舊的陣列中
                vm.categoryFilterArray = vm.rawCategoryProducts[vm.showCategory];
                // console.log(vm.categoryFilterArray);
            },

            // 套用 金額 過濾器
            applyPriceFilter() {
                const vm = this;
                vm.priceFilterArray = []; // 先將原本的陣列清空。 // 如果沒有加這行，符合篩選條件的內容就就會一直疊加到舊的陣列中
                let arr = vm.categoryFilterArray.filter(function (item) {
                    if (item.price >= vm.priceRange[0] && item.price <= vm.priceRange[1]) {
                        return item.is_enabled === 1; // 如果商品有啟用，則顯示
                    }
                });
                vm.priceFilterArray = arr; // filterProductArray 使用 金額過濾器 過濾後的陣列
            },

            saveFilteredArray() {
                this.applyCategoryFilter();
                this.applyPriceFilter();
                this.filteredArray = this.priceFilterArray;
                this.getPage();
            },

            // 取得頁數
            getPage() {
                const vm = this;
                vm.totalPageNumber = Math.ceil(vm.filteredArray.length / vm.pageUnit);
                vm.updateCurrentPageNumber(1); // 讓重新渲染後的頁面保持在第一頁
                // console.log(vm.totalPageNumber);
            },

            // 切換頁數使用 並 重新渲染商品頁面
            updateCurrentPageNumber(nowNumber) {
                this.currentPageNumber = nowNumber;
                this.judgeShowProductsByPage();
            },

            // 依據頁數決定要渲染的項目
            judgeShowProductsByPage() {
                const vm = this;

                // 製作要顯示的分頁項目內容陣列 
                let finalArr = vm.filteredArray.filter(function (item, index) {
                    if (index >= (vm.currentPageNumber - 1) * vm.pageUnit && vm.currentPageNumber * vm.pageUnit - 1 >= index) {
                        return true;
                    }
                });
                vm.showProducts = finalArr; // 將要渲染的項目存入 data return 中
            },

            // hover 移入 行為
            addHoverProduct(productId) {
                if (productId === this.hoverProductId) {
                    return
                }
                else {
                    this.hoverProductId = productId;
                }
            },
            // hover 移出 行為
            removeHoverProduct() {
                this.hoverProductId = "";
            },

            // 取得購物車內容
            getCart() {
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
                const vm = this;
                this.$http.get(api).then((response) => {
                    // console.log(response); // 確認從遠端撈回來的資料結構
                    // console.log("response.data.data.carts", response.data.data.carts); // 確認從遠端撈回來的資料結構
                    vm.originalCart = response.data.data.carts;
                    vm.cartItemNum = response.data.data.carts.length; // 將購物車 有幾樣商品 存入 data return 中
                    vm.sendCartItemNum();
                });
            },

            // 將商品加入購物車
            addToCart(id, title) {
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
                const vm = this;
                const cart = {
                    product_id: id,
                    qty: 1,
                };

                // 逐一比對原始購物車內的品項，如果有，則跳出迴圈
                for (let i = 0; i < vm.originalCart.length; i++) {
                    if (vm.originalCart[i].product_id === id) {
                        alert("目前購物車內已經有此商品囉~");
                    }
                }

                // 如果沒有的話，則將一件該商品加入購物車
                if (vm.sameProductStatus === false) {
                    this.$http.post(api, { data: cart }).then((response) => {
                        if (response.data.success) {
                            alert(`成功將 ${title} 加入至購物車！`);
                            vm.getCart();
                        }
                        else {
                            console.log("加入購物車失敗，請重整頁面後再試一次~");
                        }
                    });
                }
                // location.reload(); // 強制重整頁面 === F5 效果

            },

            // 前往單一商品頁面
            toSingleProductPage(id) {
                this.$router.push({ path: '/singleProduct', query: { id: id } });
            },

            // 將更新後的數量送到 headerComponent 中進行更新
            sendCartItemNum() {
                eventBus.$emit("cartItemNumEvent", this.cartItemNum)
            },

            // 回到頁面頂部
            scrollTop() {
                // if ((document.body.clientWidth || document.documentElement.clientWidth) >= 992) {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                // }
                // else {
                // document.body.scrollTop = document.documentElement.scrollTop = 666;
                // }
            },
        },

        watch: {
            '$route'(to, from) {
                // console.log("TO", to);
                // console.log("FROM", from);
                if (to.query !== from.query) {
                    this.judgeCategoryByRouterParam();
                    this.saveFilteredArray();
                    this.scrollTop();
                }
            }
        },

        created() {
            this.judgeCategoryByRouterParam();
            this.getRawProducts();
            this.scrollTop();
            this.getCart();
        },
    };
</script>