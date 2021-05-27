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

        <div class="container">
            <main class="row product">
                <div class="col-12 col-lg-6 d-flex justify-content-center align-items-center">
                    <img :src="showProduct.imageUrl" :alt="showProduct.title + ' 商品圖片'" class="img-fluid">
                </div>

                <div class="col-12 col-lg-6 mainProductInfo">
                    <div>
                        <h1>{{ showProduct.title }}</h1>
                        <a href="#" title="將商品加入至收藏清單" @click.prevent>
                            <i class="far fa-heart" />
                        </a>
                    </div>
                    <del v-if="showProduct.origin_price !== showProduct.price">
                        {{ showProduct.origin_price | currency }}
                    </del>
                    <h4>{{ showProduct.price | currency }}</h4>
                    <div>
                        <h5 class="d-inline">
                            類別&emsp;&emsp;&emsp;：
                        </h5>
                        <a href="#" @click.prevent="routerTo(showProduct.category)">{{ showProduct.category }}</a>
                        <!-- 點擊連回商城，並套用該類別的過濾器 -->
                    </div>
                    <div>
                        <h5 class="d-inline">
                            庫存狀態&emsp;：
                        </h5>
                        <!-- 如果是啟用狀態，則顯示有庫存 -->
                        <span v-if="showProduct.is_enabled">有貨</span>
                        <span v-else class="text-secondary">已售完</span>
                    </div>
                    <hr>
                    <!-- <p>{{ showProduct.description }}</p> -->
                    <div v-html="showProduct.description" />

                    <div class="cartRelevant">
                        <div class="cartCount">
                            <button type="button" @click="changeAddNum('minus')">
                                &nbsp;&nbsp;－
                            </button>
                            <input v-model="addNum" type="number" class=" text-center">
                            <button type="button" @click="changeAddNum('plus')">
                                ＋&nbsp;&nbsp;
                            </button>
                        </div>
                        <div class="addToCartArea">
                            <button type="button" class="btn btn-primary" @click="addToLSCart">
                                加入購物車
                            </button>
                        </div>
                    </div>

                    <div class="socialMedia">
                        <ul class="list-unstyled">
                            <li class="facebook">
                                <a href="" title="分享到 Facebook" @click.prevent>
                                    <i class="fab fa-facebook-f" />
                                </a>
                            </li>
                            <li class="twitter" title="分享到 twitter" @click.prevent>
                                <a href="">
                                    <i class="fab fa-twitter" />
                                </a>
                            </li>
                            <li class="linkedin" title="分享到 Linkedin" @click.prevent>
                                <a href="">
                                    <i class="fab fa-linkedin-in" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>

            <div class="row bestSellers">
                <div class="col-12">
                    <h3 class="h4">
                        熱銷商品
                    </h3>
                </div>
                <div v-for="(item, index) in bestSellers" :key="index" class="col-12 col-sm-6 col-lg-3 singleBestSeller"
                    @mouseover="addHoverProduct(item.id)" @mouseleave="removeHoverProduct">
                    <div class="my-auto" style="cursor: pointer;" @click.prevent="toSingleProductPage(item.id)">
                        <img :src="item.imageUrl" :alt="item.title +' 商品圖片'" class="img-fluid">
                    </div>
                    <h4 style="cursor: pointer;" @click.prevent="toSingleProductPage(item.id)">
                        {{ item.title }}
                    </h4>
                    <del v-if="item.origin_price !== item.price" class="d-block text-center" style="cursor: pointer;"
                        @click.prevent="toSingleProductPage(item.id)">
                        {{ item.origin_price | currency }}
                    </del>
                    <h5 style="cursor: pointer;" @click.prevent="toSingleProductPage(item.id)">
                        {{ item.price | currency }}
                    </h5>

                    <!-- 加入購物車、加入收藏按鈕 -->
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
        </div>

        <ShippingDescription />
        <IgPost />
        <FooterComponent />
    </div>
</template>


<script>
    import HeaderComponent from "@/components/HeaderComponent.vue";
    import ShippingDescription from "@/components/ShippingDescription.vue";
    import IgPost from "@/components/IgPost.vue";
    import FooterComponent from "@/components/FooterComponent.vue";
    import AlertMsg from "@/components/AlertMsg.vue";

    export default {

        name: "SingleProduct",


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
                showProduct: [], // 要顯示的主要商品資料
                productId: "", // 這個頁面顯示的主要商品  // 將傳入的參數(商品 id) 存在這個變數
                userLSCartArr: [], // LS 購物車內容
                addNum: 1, // 要加入 LS 購物車的主要商品數量
                bestSellers: [],
                hoverProductId: "",
            }
        },


        watch: {
            "$route"(to, from) {
                if (to.query !== from.query) {
                    this.judgeProductByRouterParam();
                    this.getRawProducts(); // 取得原始資料
                    this.scrollTop();
                }
                else {
                    this.scrollTop();
                }
            }
        },


        created() {
            this.judgeProductByRouterParam();
            this.getRawProducts(); // 取得原始資料
            this.getLSCart();
            this.scrollTop();
        },


        methods: {

            // 將傳入的參數(商品 id) 存入 data reutrn 中
            judgeProductByRouterParam() {
                this.productId = this.$route.query.id;
            },


            // 取得 所有商品資料
            getRawProducts() {
                const vm = this;
                const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`; // 這個成功取回資料
                vm.isLoading = true; // 讀取效果

                // 從遠端取回 產品 、 分頁 的資料
                vm.$http.get(api).then((response) => {
                    vm.rawProducts = response.data.products;
                    vm.bestSellers = vm.rawProducts.slice(0, 4); // 將 best sellers 存入 data return // slice() 方法會回傳一個新陣列物件，為原陣列選擇之 begin 至 end（不含 end）部分的淺拷貝（shallow copy） // .splice() 和 .slice() 不同喔XD，不要看錯了
                    vm.getTheProduct();  // 比對資料，取得特定商品資料
                    vm.isLoading = false;  // 讀取效果
                });
            },


            // 從 所有商品資料 中，找到 特定商品資料 並存入 data reutrn 中
            getTheProduct() {
                const vm = this;
                let theProduct = vm.rawProducts.find((item) => {
                    return item.id === vm.productId;
                });
                vm.showProduct = theProduct;
            },


            // 前往商城並套用特定類別
            routerTo(categoryName) {
                let sendCategory = "";
                if (categoryName === "男士") {
                    sendCategory = "Men"
                }
                else if (categoryName === "女士") {
                    sendCategory = "Women"
                }
                else if (categoryName === "鞋類") {
                    sendCategory = "Shoes"
                }
                else if (categoryName === "運動") {
                    sendCategory = "Sports"
                }
                this.$router.push({ path: "/shop", query: { category: sendCategory } });
            },


            // 取得 LS 購物車內容
            getLSCart() {
                this.userLSCartArr = JSON.parse(localStorage.getItem("userLSCart")) || []; // 有機會可以嘗試使用 ?? (空位合併 Nullish Coalescing)
                this.sendLSCartItemNum();
            },


            // 調整加入 LS 購物車的數量
            changeAddNum(method) {
                const vm = this;
                if (method === "minus") {
                    if (vm.addNum === 1) {
                        vm.$alertMsg_Bus.$emit("alertMsgEvent", "加入購物車的數量不能少於 1 喔~", "warning", 2000);
                    }
                    else {
                        vm.addNum = vm.addNum - 1;
                    }
                }
                else {
                    vm.addNum = vm.addNum + 1;
                }
            },


            // 將商品加入 LS 購物車
            addToLSCart() {
                const vm = this;
                let compareArr = []; // 用以 比較是否有相同產品 用的陣列
                let tempAddObj = {}; // 用以 暫存要加入購物車的資料

                let addToLSObj = {
                    product_id: vm.showProduct.id, // 商品 id   // API 需要
                    qty: Number(vm.addNum), // 欲購買數量 // 預設購買 1 項商品 // API 需要 
                    imageUrl: vm.showProduct.imageUrl, // 圖片網址
                    title: vm.showProduct.title, // 商品名稱
                    origin_price: vm.showProduct.origin_price, // 單價
                    price: vm.showProduct.price, // 折扣價(不包含 coupon 的折扣)
                    unit: vm.showProduct.unit, // 計量單位 (alertMsg 需要)
                };

                // 取得 LS，並存入 data return 中
                vm.userLSCartArr = JSON.parse(localStorage.getItem("userLSCart")) || []; // 有機會可以嘗試使用 ?? (空位合併 Nullish Coalescing)

                // 將 LS 內的產品 id 取出，一一放入比較用的陣列中
                vm.userLSCartArr.forEach((item) => {
                    compareArr.push(item.product_id);
                });

                // 判斷 LS 內是否有相同產品
                if (compareArr.indexOf(vm.showProduct.id) === -1) { // LS內 無 相同產品  // 直接加入(1項)該商品於陣列中，並送往 LS  // indexOf === -1 代表這個值不存在於陣列中
                    vm.userLSCartArr.push(addToLSObj);
                    localStorage.setItem("userLSCart", JSON.stringify(vm.userLSCartArr));
                }
                else { // LS內 已經有 相同產品  // 再跑一次迴圈，去找相同的產品在哪；加入新的數量於陣列末端；再將原本的資料刪除，並送往 LS
                    vm.userLSCartArr.forEach((item, index) => { // 透過迴圈
                        if (vm.showProduct.id === item.product_id) { // 找相同的產品在哪
                            tempAddObj = { // 將資料暫存起來
                                product_id: item.product_id,
                                qty: Number(item.qty) + Number(vm.addNum),
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
                vm.$alertMsg_Bus.$emit("alertMsgEvent", `已加入 ${vm.addNum} ${vm.showProduct.unit}<br>${vm.showProduct.title}<br>至購物車`);
                vm.addNum = 1; // 重置加入購物車數量為預設數量 
                vm.getLSCart();
            },


            // 將更新後的 LS 購物車數量 送到 HeaderComponent 中進行更新
            sendLSCartItemNum() {
                this.$LSCartNum_Bus.$emit("LSCartItemNumEvent", this.userLSCartArr.length);
            },


            // 前往單一商品頁面
            toSingleProductPage(id) {
                if (id === this.$route.query.id) {
                    this.scrollTop();
                }
                else {
                    this.$router.push({ path: "/shop/singleProduct", query: { id: id } });
                }
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


            // 回到頁面頂部
            scrollTop() {
                if ((document.body.clientWidth || document.documentElement.clientWidth) >= 992) {
                    document.body.scrollTop = document.documentElement.scrollTop = 100;
                }
                else {
                    document.body.scrollTop = document.documentElement.scrollTop = 35;
                }
            },

        },
    };
</script>


<style scoped lang="scss">
    @import "@/assets/scss/frontEnd/singleProduct.scss";
</style>