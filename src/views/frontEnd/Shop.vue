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

        <div class="container all">
            <div class="row pt-5">
                <div class="col-12 d-lg-none">
                    <h2 class="text-center">
                        商城
                    </h2>
                </div>

                <!-- 套用 filter 區塊-->
                <div class="col-12 col-lg-3">
                    <!-- 類別 filter -->
                    <div class="filterCard categoryFilter" :class="{'ing' : filterCardStatus['category'] === true}">
                        <h5 @click="switchCardStatus('category')">
                            依據 類別 篩選
                            &nbsp; &nbsp; &nbsp;
                            <i class="fas fa-angle-down" />
                        </h5>
                        <div class="filterCardContent" :class="{'ing' : filterCardStatus['category'] === true}">
                            <ul class="list-unstyled categoryList">
                                <li>
                                    <a href="#" :class="{'nowCategory':showCategory === 'all'}"
                                        @click.prevent="showCategory = 'all', saveFilteredArray()">全部</a>
                                </li>
                                <li>
                                    <a href="#" :class="{'nowCategory':showCategory === 'rawMen'}"
                                        @click.prevent="showCategory = 'rawMen', saveFilteredArray()">男士</a>
                                </li>
                                <li>
                                    <a href="#" :class="{'nowCategory':showCategory === 'rawWomen'}"
                                        @click.prevent="showCategory = 'rawWomen', saveFilteredArray()">女士</a>
                                </li>
                                <li>
                                    <a href="#" :class="{'nowCategory':showCategory === 'rawShoes'}"
                                        @click.prevent="showCategory = 'rawShoes', saveFilteredArray()">鞋類</a>
                                </li>
                                <li>
                                    <a href="#" :class="{'nowCategory':showCategory === 'rawSports'}"
                                        @click.prevent="showCategory = 'rawSports', saveFilteredArray()">運動</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- 紅字來源XD -->
                    <!-- 金額 filter -->
                    <div class="filterCard priceFilter mt-5" :class="{'ing' : filterCardStatus['price'] === true}">
                        <h5 @click="switchCardStatus('price')">
                            依據 金額 篩選
                            &nbsp; &nbsp; &nbsp;
                            <i class="fas fa-angle-down" />
                        </h5>
                        <div class="filterCardContent">
                            <vue-slider v-model="priceRange" dot-size="20" max="5000" interval="100" :lazy="true" />

                            <div class="w-100">
                                <input v-model="priceRange[0]" type="number">
                                到
                                <input v-model="priceRange[1]" type="number">
                            </div>

                            <div class="w-100">
                                <button type="button" class="btn btn-sm" @click="saveFilteredArray">
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
                            <div id="appliedCategoryTitle" class="col-12 col-lg-6 p-0 pl-lg-4 showNowCategory">
                                <h3 class="h4">
                                    {{ showString[showCategory] }}
                                    ({{ filteredArray.length }})
                                </h3>
                            </div>
                            <div class="col-12 col-lg-6 p-0 pr-lg-4 filterDropDown">
                                <!-- 依據類別篩選 -->
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col p-0 mr-1">
                                            <select v-model="showCategory" class="w-100" style="height: 42px;"
                                                @change="saveFilteredArray">
                                                <option value="all" disabled>
                                                    選擇類別
                                                </option>
                                                <option value="all">
                                                    全部
                                                </option>
                                                <option value="rawMen">
                                                    男士
                                                </option>
                                                <option value="rawWomen">
                                                    女士
                                                </option>
                                                <option value="rawShoes">
                                                    鞋類
                                                </option>
                                                <option value="rawSports">
                                                    運動
                                                </option>
                                            </select>
                                        </div>
                                        <div class="col p-0 ml-1">
                                            <!-- 每頁顯示幾項商品 -->
                                            <select v-model="pageUnit" class="w-100" style="height: 42px;"
                                                @change="getPage">
                                                <option value="9" default>
                                                    每頁顯示 9 樣商品
                                                </option>
                                                <option value="6">
                                                    每頁顯示 6 樣商品
                                                </option>
                                                <option value="3">
                                                    每頁顯示 3 樣商品
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 顯示商品 -->
                        <div class="row productInfo">
                            <div v-for=" (item, index) in showProducts" :key="index"
                                class="col-12 col-sm-6 col-lg-4 singleProductInfo">
                                <div style="cursor: pointer;" @mouseover="addHoverProduct(item.id)"
                                    @mouseleave="removeHoverProduct" @click.prevent="toSingleProductPage(item.id)">
                                    <img :src="item.imageUrl" :alt="item.title + ' 商品圖片'">
                                </div>
                                <h4 style="cursor: pointer;" @click.prevent="toSingleProductPage(item.id)">
                                    {{ item.title }}
                                </h4>
                                <div class="d-flex flex-column" style="height: 80px;cursor: pointer;"
                                    @click.prevent="toSingleProductPage(item.id)">
                                    <del v-if="item.origin_price !== item.price">{{ item.origin_price | currency
                                        }}</del>
                                    <h5>{{ item.price | currency }}</h5>
                                </div>

                                <ul class="list-unstyled hoverWidget" :class="{'ing': hoverProductId === item.id}"
                                    @mouseover="addHoverProduct(item.id)" @mouseleave="removeHoverProduct">
                                    <li class="like">
                                        <a href="#" title="收藏此商品" @click.prevent>
                                            <i class="far fa-heart" />
                                        </a>
                                    </li>
                                    <li class="addCart">
                                        <a href="#" title="加入購物車" @click.prevent="addToLSCart(item)">
                                            <i class="fas fa-cart-plus" />
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
                                <li v-for="pageNum in totalPageNumber" :key="pageNum" class="page-item"
                                    :class="{ 'active' : currentPageNumber === pageNum }">
                                    <a class="page-link" href="#" @click.prevent="updateCurrentPageNumber(pageNum)">{{
                                        pageNum }}</a>
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

        <ShippingDescription />
        <IgPost />
        <FooterComponent />
    </div>
</template>


<script>
    import $ from "jquery";

    import HeaderComponent from "@/components/HeaderComponent.vue";
    import ShippingDescription from "@/components/ShippingDescription.vue";
    import IgPost from "@/components/IgPost.vue";
    import FooterComponent from "@/components/FooterComponent.vue";
    import AlertMsg from "@/components/AlertMsg.vue";

    export default {

        name: "Shop",


        components: {
            HeaderComponent,
            ShippingDescription,
            IgPost,
            FooterComponent,
            AlertMsg,
        },


        data() {
            return {
                isLoading: false,

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

                priceRange: [0, 5000],    // 用以暫存商品售價範圍
                // priceRawRange: [0, 10000],    // 用以暫存商品售價範圍
                priceFilterArray: [],      // 使用 金額過濾器 過濾後的陣列

                filteredArray: [], // 套用 類別 金額 過濾器之後的產品列表
                showProducts: [],  // 套用分頁功能後，要渲染出來的產品資料列表

                pageUnit: 9, // 每頁顯示幾項商品，預設 9 樣
                currentPageNumber: 1, // 目前所在頁數
                totalPageNumber: 1, // 總頁數

                hoverProductId: "",

                userLSCartArr: [], // LS 購物車內容

                clientWidth: 0,

                filterCardStatus: {
                    category: true,
                    price: true,
                },
            }
        },


        watch: { // 如果沒有監控 router 變化的話，就會造成使用 footerComponent 切換類別時無效的狀況
            "$route"(to, from) {
                // console.log("TO", to);
                // console.log("FROM", from);
                if (to.query !== from.query) {
                    this.judgeCategoryByRouterParam();
                    this.saveFilteredArray();
                    this.scrollTop();
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                }
            },
            "clientWidth": {
                handler: function (val) {
                    if (val < 992) {
                        // < 992 ，條件篩選器 預設關閉
                        this.filterCardStatus.category = false;
                        this.filterCardStatus.price = false;
                    }
                    else {
                        // > 992 ，條件篩選器 預設開啟 (並透過函式判斷保持開啟)
                        this.filterCardStatus.category = true;
                        this.filterCardStatus.price = true;
                    }
                },
            },
        },


        created() {
            this.judgeCategoryByRouterParam();
            this.getRawProducts();
            this.getLSCart();
        },


        mounted() {
            const vm = this;
            vm.clientWidth = document.body.clientWidth;
            if (vm.clientWidth < 992) {
                // < 992 ，條件篩選器 預設關閉
                vm.filterCardStatus.category = false;
                vm.filterCardStatus.price = false;
            }
            else {
                // > 992 ，條件篩選器 預設開啟 (並透過函式判斷保持開啟)
                vm.filterCardStatus.category = true;
                vm.filterCardStatus.price = true;
            }

            // 監聽尺寸變化方式 1
            /*
                window.onresize = function () {
                vm.clientWidth = document.body.clientWidth;
                };
            */

            // 監聽尺寸變化方式 2 (好像比較不耗效能)
            let el = document.querySelector("body");
            let bodyResizeObserver = new ResizeObserver(function () {
                vm.clientWidth = document.body.clientWidth;
            });
            bodyResizeObserver.observe(el);
        },


        methods: {

            // 依據 router 傳入的參數，判斷是否有需要預先套用 category filter
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


            // 取得所有商品資料
            getRawProducts() {
                const vm = this;
                const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`; // 這個成功取回資料
                vm.isLoading = true;

                // 從遠端取回 產品 、 分頁 的資料
                vm.$http.get(api).then((response) => {
                    // console.log(response); // 確認遠端撈回來的資料結構
                    vm.rawProducts = response.data.products;
                    vm.rawCategoryProducts.all = vm.rawProducts;
                    vm.makeRawCategoryArr();
                    vm.applyCategoryFilter();
                    vm.applyPriceFilter();
                    vm.getPage();
                    vm.saveFilteredArray();
                    vm.judgeShowProductsByPage();
                    vm.isLoading = false;
                });
            },


            // 製作各類別原始陣列
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


            // 套用 類別 過濾器
            applyCategoryFilter() {
                const vm = this;
                vm.categoryFilterArray = []; // 先將原本的陣列清空。 // 如果沒有加這行，符合篩選條件的內容就就會一直疊加到舊的陣列中
                vm.categoryFilterArray = vm.rawCategoryProducts[vm.showCategory];
                // console.log(vm.categoryFilterArray);
            },


            // 套用 金額 過濾器
            applyPriceFilter() {
                const vm = this;
                // 判斷使用者輸入的範圍是否介於設定的範圍值內；若否，則調整
                if (vm.priceRange[0] < 0) {
                    vm.priceRange[0] = 0;
                    vm.$alertMsg_Bus.$emit("alertMsgEvent", "篩選金額需要介於 0 ~ 5000 之間喔~", "warning");
                }
                else if (vm.priceRange[1] > 5000) {
                    vm.priceRange[1] = 5000;
                    vm.$alertMsg_Bus.$emit("alertMsgEvent", "篩選金額需要介於 0 ~ 5000 之間喔~", "warning");
                }
                vm.priceFilterArray = []; // 先將原本的陣列清空。 // 如果沒有加這行，符合篩選條件的內容就就會一直疊加到舊的陣列中
                let arr = vm.categoryFilterArray.filter(function (item) {
                    if (item.price >= Number(vm.priceRange[0]) && item.price <= Number(vm.priceRange[1])) {
                        return item.is_enabled === 1; // 如果商品有啟用，則顯示
                    }
                });
                vm.priceFilterArray = arr; // filterProductArray 使用 金額過濾器 過濾後的陣列
            },


            // 套用 類別+金額 過濾器
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
                this.scrollTop();
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


            // 切換 filterCard 狀態
            switchCardStatus(param) {
                if (this.clientWidth < 992) {
                    this.filterCardStatus[param] = !this.filterCardStatus[param];
                }
            },


            // hover 移入 行為
            addHoverProduct(productId) {
                if (productId !== this.hoverProductId) {
                    this.hoverProductId = productId;
                }
            },


            // hover 移出 行為
            removeHoverProduct() {
                this.hoverProductId = "";
            },


            // 取得 LS 購物車內容
            getLSCart() {
                this.userLSCartArr = JSON.parse(localStorage.getItem("userLSCart")) || []; // 有機會可以嘗試使用 ?? (空位合併 Nullish Coalescing)
                this.sendLSCartItemNum();
            },


            // 將商品加入 LS 購物車
            addToLSCart(nowProduct) {
                const vm = this;
                let compareArr = []; // 用以 比較是否有相同產品 用的陣列
                let tempAddObj = {}; // 用以 暫存要加入購物車的資料

                let addToLSObj = {
                    product_id: nowProduct.id, // 商品 id   // API 需要
                    qty: 1, // 欲購買數量 // 預設購買 1 項商品 // API 需要 
                    imageUrl: nowProduct.imageUrl, // 圖片網址
                    title: nowProduct.title, // 商品名稱
                    origin_price: nowProduct.origin_price, // 單價
                    price: nowProduct.price, // 折扣價(不包含 coupon 的折扣)
                    unit: nowProduct.unit, // 計量單位 (alertMsg 需要)
                };

                // 取得 LS，並存入 data return 中
                vm.userLSCartArr = JSON.parse(localStorage.getItem("userLSCart")) || []; // 有機會可以嘗試使用 ?? (空位合併 Nullish Coalescing)

                // 將 LS 內的產品 id 取出，一一放入比較用的陣列中
                vm.userLSCartArr.forEach((item) => {
                    compareArr.push(item.product_id);
                });

                // 判斷 LS 內是否有相同產品
                if (compareArr.indexOf(nowProduct.id) === -1) { // LS內 無 相同產品  // 直接加入(1項)該商品於陣列中，並送往 LS  // indexOf === -1 代表這個值不存在於陣列中
                    vm.userLSCartArr.push(addToLSObj);
                    localStorage.setItem("userLSCart", JSON.stringify(vm.userLSCartArr));
                }
                else { // LS內 已經有 相同產品  // 再跑一次迴圈，去找相同的產品在哪；加入新的數量於陣列末端；再將原本的資料刪除，並送往 LS
                    vm.userLSCartArr.forEach((item, index) => { // 透過迴圈
                        if (nowProduct.id === item.product_id) { // 找相同的產品在哪
                            tempAddObj = { // 將資料暫存起來
                                product_id: item.product_id,
                                qty: item.qty + 1,
                                imageUrl: item.imageUrl,
                                title: item.title,
                                origin_price: item.origin_price,
                                price: item.price,
                                unit: item.unit, // 計量單位 (alertMsg 需要)
                            };
                            vm.userLSCartArr.splice(index, 1); // 再將原本的資料刪除
                        }
                    });
                    vm.userLSCartArr.push(tempAddObj); // push 進 LS 陣列中
                    localStorage.setItem("userLSCart", JSON.stringify(vm.userLSCartArr)); // 並送往 LS
                }
                vm.$alertMsg_Bus.$emit("alertMsgEvent", `已加入 1 ${nowProduct.unit}<br>${nowProduct.title}<br>至購物車`);
                // 使用 $emit 傳遞多參數時，不可加上小括號，否則會導致接收端($on)無法正確接收。
                // 錯誤範例：
                // vm.$alertMsg_Bus.$emit("alertMsgEvent", (nowProduct.title, 1, nowProduct.unit, "success"));
                vm.getLSCart();
            },


            // 將更新後的 LS 購物車數量 送到 HeaderComponent 中進行更新
            sendLSCartItemNum() {
                this.$LSCartNum_Bus.$emit("LSCartItemNumEvent", this.userLSCartArr.length);
            },


            // 前往單一商品頁面
            toSingleProductPage(id) {
                this.$router.push({ path: "/shop/singleProduct", query: { id: id } });
            },


            // 回到頁面頂部
            scrollTop() {
                // 桌機板
                if ((document.body.clientWidth || document.documentElement.clientWidth) >= 992) {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });
                }
                // 行動版
                else {
                    if ((document.body.scrollTop || document.documentElement.scrollTop) >= 300) {
                        // 觸發條件通常為 切換至第 n 頁
                        let categoryTitleDistance = $("#appliedCategoryTitle").offset().top;
                        /*
                              offset() 語法是用來取得當前元素的位置偏移值，後面可以接上
                
                              top：由上面往下算
                              或是
                
                              left：由左向右計算
                            */
                        window.scrollTo({
                            top: (categoryTitleDistance - 80),
                            behavior: "smooth",
                        });
                    }
                    else if ((this.filterCardStatus.category === true || this.filterCardStatus.price === true)) {
                        // 觸發條件通常為 用戶另行套用篩選器
                        let categoryTitleDistance = $("#appliedCategoryTitle").offset().top;
                        window.scrollTo({
                            top: (categoryTitleDistance - 80),
                            behavior: "smooth",
                        });
                    }
                    else {
                        // 觸發條件通常為 第一次進到這個頁面
                        window.scrollTo({
                            top: 0,
                        });
                    }
                }
            },


            // 測試是否能夠透過點擊修改網址的參數
            // routeParamTest(category) {
            // this.$route.query = category;
            // console.log("測試是否能夠修改網址的參數", this.$route);
            // console.log(this.$route);
            // 測試失敗；原因：this.$route.query 為 唯讀，因此無法調整值
            // [Vue warn]: Error in v-on handler: "TypeError: Cannot assign to read only property 'query' of object
            // },

        },
    };
</script>


<style lang="scss">
    @import "@/assets/scss/kit/vue-slider-component.scss";
</style>


<style scoped lang="scss">
    @import "@/assets/scss/frontEnd/shop.scss";
</style>