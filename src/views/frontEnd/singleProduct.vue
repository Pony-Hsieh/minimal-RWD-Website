<template>
    <div>
        <headerComponent />

        <div class="container">

            <main class="row product">
                <div class="col-12 col-lg-6 d-flex justify-content-center align-items-center">
                    <img :src="showProducts.imageUrl" alt="" class="img-fluid">
                </div>

                <div class="col-12 col-lg-6 mainProductInfo">
                    <div>
                        <h1>{{ showProducts.title }}</h1>
                        <a href="" @click.prevent title="將商品加入至收藏清單">
                            <i class="far fa-heart"></i>
                        </a>
                    </div>
                    <del v-if="showProducts.origin_price !== showProducts.price">
                        {{ showProducts.origin_price|currency }}
                    </del>
                    <h4>{{ showProducts.price|currency }}</h4>
                    <div>
                        <h5 class="d-inline">類別&emsp;&emsp;&emsp;：</h5>
                        <a href="" @click.prevent="routerTo(showProducts.category)">{{ showProducts.category }}</a>
                        <!-- 點擊連回商城，並套用該類別的過濾器 -->
                    </div>
                    <div>
                        <h5 class="d-inline"> 庫存狀態&emsp;：</h5>
                        <!-- 如果是啟用狀態，則顯示有庫存 -->
                        <span v-if="showProducts.is_enabled">有貨</span>
                        <span v-else class="text-secondary">已售完</span>
                    </div>
                    <hr>
                    <p>{{ showProducts.description }}</p>

                    <div class="cartRelevant">
                        <div class="cartCount">
                            <button @click="changeAddNum('minus')">&nbsp;&nbsp;－</button>
                            <input type="number" v-model="addNum" class=" text-center">
                            <button @click="changeAddNum('plus')">＋&nbsp;&nbsp;</button>
                        </div>
                        <div class="addToCartArea">
                            <button class="btn btn-primary"
                                @click="addToCart(showProducts.id,showProducts.title)">加入購物車</button>
                        </div>
                    </div>

                    <div class="socialMedia">
                        <ul class="list-unstyled">
                            <li class="facebook">
                                <a href="" @click.prevent title="分享到 Facebook">
                                    <i class="fab fa-facebook-f"></i>
                                </a>
                            </li>
                            <li class="twitter" @click.prevent title="分享到 twitter">
                                <a href="">
                                    <i class="fab fa-twitter"></i>
                                </a>
                            </li>
                            <li class="linkedin" @click.prevent title="分享到 Linkedin">
                                <a href="">
                                    <i class="fab fa-linkedin-in"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

            </main>

            <!-- <div class="row customerReview">
                <div class="col-12">
                    <h5 @click="customerReviewTab = 'description'"> Description</h5>
                    <h5 @click="customerReviewTab = 'specification'"> Specification </h5>
                    <h5 @click="customerReviewTab = 'comments'"> Comments </h5>
                    <h5 @click="customerReviewTab = 'reviews'"> Reviews </h5>
                </div>
                <div class="description col-12" v-show="customerReviewTab === 'description'">
                    <p>
                        Beryl Cook is one of Britain’s most talented and amusing artists .Beryl’s pictures feature women
                        of
                        all shapes and sizes enjoying themselves .Born between the two world wars, Beryl Cook eventually
                        left Kendrick School in Reading at the age of 15, where she went to secretarial school and then
                        into
                        an insurance office. After moving to London and then Hampton, she eventually married her next
                        door
                        neighbour from Reading, John Cook. He was an officer in the Merchant Navy and after he left the
                        sea
                        in 1956, they bought a pub for a year before John took a job in Southern Rhodesia with a motor
                        company. Beryl bought their young son a box of watercolours, and when showing him how to use it,
                        she
                        decided that she herself quite enjoyed painting. John subsequently bought her a child’s painting
                        set
                        for her birthday and it was with this that she produced her first significant work, a
                        half-length
                        portrait of a dark-skinned lady with a vacant expression and large drooping breasts. It was
                        aptly
                        named ‘Hangover’ by Beryl’s husband and

                        It is often frustrating to attempt to plan meals that are designed for one. Despite this fact,
                        we
                        are seeing more and more recipe books and Internet websites that are dedicated to the act of
                        cooking
                        for one. Divorce and the death of spouses or grown children leaving for college are all reasons
                        that
                        someone accustomed to cooking for more than one would suddenly need to learn how to adjust all
                        the
                        cooking practices utilized before into a streamlined plan of cooking that is more efficient for
                        one
                        person creating less
                    </p>
                </div>
                <div class="specification col-12" v-show="customerReviewTab === 'specification'">
                    <table class="table">
                        <tbody>
                            <tr>
                                <td>Width</td>
                                <td>128mm</td>
                            </tr>
                            <tr>
                                <td>Height</td>
                                <td>508mm</td>
                            </tr>
                            <tr>
                                <td>Depth</td>
                                <td>85mm</td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td>52gm</td>
                            </tr>
                            <tr>
                                <td>Quality checking</td>
                                <td>yes</td>
                            </tr>
                            <tr>
                                <td>Freshness Duration</td>
                                <td>3 days</td>
                            </tr>
                            <tr>
                                <td>When packeting</td>
                                <td>Without touch of hand</td>
                            </tr>
                            <tr>
                                <td>Each Box contains</td>
                                <td>60pcs</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="comments col-12" v-show="customerReviewTab === 'comments'">
                    <div class="container-fulid">
                        <div class="row">
                            <div class="col-12 col-lg-6">
                                123
                            </div>
                            <div class="col-12 col-lg-6">
                                456
                            </div>
                        </div>
                    </div>

                </div>
                <div class="reviews col-12" v-show="customerReviewTab === 'reviews'">


                </div>
            </div> -->

            <div class="row bestSellers">
                <div class="col-12">
                    <h3 class="h4">熱銷商品</h3>
                </div>
                <div v-for="item in bestSellers" class="col-12 col-sm-6 col-lg-3 singleBestSeller"
                    @mouseover="addHoverProduct(item.id)" @mouseleave="removeHoverProduct">
                    <div class="my-auto" @click.prevent="toSingleProductPage(item.id)" style="cursor: pointer;">
                        <img :src="item.imageUrl" alt="" class="img-fluid">
                    </div>
                    <h4 @click.prevent="toSingleProductPage(item.id)" style="cursor: pointer;">{{ item.title }}</h4>
                    <del v-if="item.origin_price !== item.price" class="d-block text-center"
                        @click.prevent="toSingleProductPage(item.id)" style="cursor: pointer;">
                        {{ item.origin_price|currency }}
                    </del>
                    <h5 @click.prevent="toSingleProductPage(item.id)" style="cursor: pointer;">{{ item.price|currency }}
                    </h5>

                    <!-- 加入購物車、加入收藏按鈕 -->
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


        </div>

        <shippingDescription />
        <igPost />
        <footerComponent />

    </div>
</template>


<style scoped>
    a {
        text-decoration: none;
    }

    .product {
        padding-top: 70px;
        padding-bottom: 70px;
    }

    h1 {
        font-size: 24px;
        font-weight: 700;
        color: #2a2a2a;
    }

    .product h4 {
        font-size: 24px;
        font-weight: 700;
        color: #2f7dfc;
    }

    .mainProductInfo {
        margin-top: 30px;
    }

    .mainProductInfo>div:first-of-type {
        display: flex;
        align-items: center;
    }

    .mainProductInfo>div:first-of-type a {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #fff;
        color: #7f7f7f;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 20px;
        margin-bottom: 10px;
        box-shadow: -14.142px 14.142px 20px 0px rgba(0, 0, 0, 0.1);
    }

    .mainProductInfo>div:first-of-type a:hover {
        background-color: #2f7dfc;
        color: #fff;
    }

    .mainProductInfo>div:first-of-type a:active {
        transform: scale(1.05);
    }

    .mainProductInfo>div:first-of-type i {
        font-size: 24px;
    }

    .mainProductInfo del {
        color: #606060;
    }

    .mainProductInfo a {
        /* color: #606060; */
        font-size: 14px;
    }

    .mainProductInfo span {
        font-size: 14px;
    }

    .product h5 {
        font-size: 14px;
        font-weight: 500;
    }

    @media (min-width: 992px) {
        .product {
            padding-top: 100px;
            padding-bottom: 100px;
        }
    }

    .cartRelevant {
        margin-top: 40px;
    }

    .cartCount {
        width: 150px;
        height: 50px;
        border: 1px solid #ddd;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        margin: 0 auto;
        margin-bottom: 25px;
        position: relative;
    }

    .cartCount button {
        /* width: 25%; */
        width: 50%;
        height: 48px;
        /* margin-top: 0px; */
        /* margin-bottom: -3px; */
        border: none;
        border-radius: 25px;
        outline: none;
        background-color: transparent;
    }

    .cartCount button:hover {
        cursor: pointer;
    }

    .cartCount button:active {
        background-color: #2f7dfc;
        color: #fff;
    }

    .cartCount button:first-of-type {
        text-align: left;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
    }

    .cartCount button:last-of-type {
        text-align: right;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
    }

    .cartCount input {
        width: 50%;
        height: 48px;
        /* background-color: transparent; */
        outline: none;
        border: none;
        z-index: 2;
    }

    .cartCount input::-webkit-outer-spin-button,
    .cartCount input::-webkit-inner-spin-button {
        /* 拿掉數字輸入框的上下箭頭 */
        -webkit-appearance: none;
    }

    .cartCount input[type="number"] {
        /* 拿掉數字輸入框的上下箭頭 */
        -moz-appearance: textfield;
    }

    .cartRelevant>button:active {
        transform: scale(1.05);
    }

    .addToCartArea {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: -10px;
    }

    .socialMedia>ul {
        width: 180px;
        margin: 0 auto;
        margin-top: 40px;
        display: flex;
        justify-content: space-evenly;
    }

    .socialMedia li {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        transition: 0.5s;
    }

    .socialMedia li:hover {
        background-color: #2f7dfc;
        transition: 0.5s;
    }

    .socialMedia li a {
        font-size: 18px;
        height: 100%;
        text-decoration: none;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .socialMedia .facebook {
        background-color: #3b5998;
    }

    .socialMedia .twitter {
        background-color: #55acee;
    }

    .socialMedia .linkedin {
        background-color: #0077b5;
    }

    .singleBestSeller {
        margin: 15px 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        /* align-items: flex-end; */
    }

    .singleBestSeller h4 {
        margin-top: 15px;
        font-size: 18px;
        text-align: center;
    }

    .singleBestSeller del {
        color: #606060;
    }

    .singleBestSeller h5 {
        font-size: 18px;
        text-align: center;
    }

    .bestSellers img {
        position: relative;
    }

    /* hover 小工具 */
    .bestSellers .hoverWidget {
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 60px;
        right: 35px;
        right: 10px;
        opacity: 0;
        transition: 0.5s;
    }

    .bestSellers .hoverWidget.ing {
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
        components: {
            headerComponent,
            shippingDescription,
            igPost,
            footerComponent,
        },

        data() {
            return {
                productId: "", // 這個頁面顯示的主要商品
                rawProducts: [],  // 所有商品資料
                showProducts: [], // 要顯示的主要商品資料
                addNum: 1, // 要加入購物車的主要商品數量
                originalCart: [],   // 儲存原本的商品資料(因為要先刪除再重新加入新的商品數量)
                originalCartNum: 0, // 儲存原本的商品資料(因為要先刪除再重新加入新的商品數量)
                cartItemNum: 0, // 將更新後的數量送到 headerComponent 中進行更新
                deletingOrderID: "",
                buyingProductId: "",    // 要加入購物車的商品id(可能是主要的商品或 bestSellers)
                buyingProductTitle: "", // 要加入購物車的商品title(可能是主要的商品或 bestSellers)
                // customerReviewTab: "", // 用以判斷現在要顯示哪個客戶回饋的哪個部分
                bestSellers: [],
                hoverProductId: "",
            }
        },

        methods: {

            judgeProductByRouterParam() {
                this.productId = this.$route.query.id;
                // console.log(this.productId);
            },

            getRawProducts() {
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`; // 這個成功取回資料
                const vm = this;

                // vm.isLoading = true; // 讀取效果

                // 從遠端取回 產品 、 分頁 的資料
                this.$http.get(api).then((response) => {
                    // console.log(response); // 確認遠端撈回來的資料結構
                    vm.rawProducts = response.data.products;
                    vm.bestSellers = vm.rawProducts.slice(0, 4); // 將 best sellers 存入 data return // slice() 方法會回傳一個新陣列物件，為原陣列選擇之 begin 至 end（不含 end）部分的淺拷貝（shallow copy）
                    vm.getTheProduct();  // 比對資料，取得特定商品資料
                    // vm.isLoading = false;  // 讀取效果
                });
            },

            // 取得特定商品資料並存入 data reutrn 中
            getTheProduct() {
                const vm = this;

                let theProduct = vm.rawProducts.find(function (item) {
                    return item.id === vm.productId
                });
                vm.showProducts = theProduct;
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
                this.$router.push({ path: '/shop', query: { category: sendCategory } });
            },

            // 調整加入購物車的數量
            changeAddNum(method) {
                if (method === "minus") {
                    if (this.addNum === 1) {
                        console.log("加入購物車的數量不能少於 1 喔~");
                    }
                    else {
                        this.addNum = this.addNum - 1;
                    }
                }
                if (method === "plus") {
                    this.addNum = this.addNum + 1;
                }
            },

            // 取得購物車內容
            getCart() {
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
                const vm = this;
                // vm.isLoading = true;
                this.$http.get(api).then((response) => {
                    // console.log(response); // 確認從遠端撈回來的資料結構
                    vm.originalCart = response.data.data.carts;
                    vm.cartItemNum = response.data.data.carts.length; // 將購物車 有幾樣商品 存入 data return 中
                    vm.sendCartItemNum();
                    // vm.isLoading = false;
                });
            },

            // 將商品加入購物車
            addToCart(id = productId, title) {
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
                const vm = this;
                let cart = {
                    product_id: id,
                    qty: Number(vm.addNum),
                };

                if (vm.addNum == 0) { // 這裡如果用 === 0 的話，好像會無法成功判斷，目前還不清楚原因
                    console.log("請至少添加一件商品至購物車~");
                }
                else {
                    // 如果發現這樣產品在購物車有商品了，那就先把取得原本的商品數量後，再把原本的刪掉，然後再加入新的數量
                    for (let i = 0; i < vm.originalCart.length; i++) {
                        // if (vm.originalCart[i].product_id === vm.productId) {
                        if (vm.originalCart[i].product_id === id) {
                            vm.originalCartNum = Number(vm.originalCart[i].qty); // 將原本的商品數量存入 data return
                            vm.deletingOrderID = vm.originalCart[i].id; // 將要刪掉的訂單存入 data return
                        }
                    }
                    vm.deleteCartItem(); // 刪掉原本在購物車內的商品

                    cart.qty = Number(vm.originalCartNum) + Number(vm.addNum);   // 調整要送出的商品數量
                    this.$http.post(api, { data: cart }).then((response) => {    // 重新下單指定數量
                        console.log(response);
                        if (response.data.success) {
                            alert(`成功加入 ${vm.addNum} 件 ${title} 至購物車！`);
                            vm.addNum = 1; // 將加入購物車的預設數值重設為 1
                            vm.getCart();
                        }
                    });
                }
            },

            // 刪除購物車內商品 // 這裡要用 訂單id
            deleteCartItem() {
                const vm = this;
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${vm.deletingOrderID}`;
                this.$http.delete(api).then((response) => {
                    // console.log(response); // 確認從遠端撈回來的資料結構
                    if (response.data.success) {
                        vm.deletingOrderID = "";   // 清空暫存的資料
                        // vm.getCart(); // 重新取得購物車內容
                    }
                    else {
                        vm.deletingOrderID = "";   // 清空暫存的資料
                        // vm.getCart(); // 重新取得購物車內容
                    }
                });
            },

            // 將更新後的數量送到 headerComponent 中進行更新
            sendCartItemNum() {
                eventBus.$emit("cartItemNumEvent", this.cartItemNum)
            },

            // 前往單一商品頁面
            toSingleProductPage(id) {
                if (id === this.$route.query.id) {
                    this.scrollTop();
                }
                else {
                    this.$router.push({ path: '/singleProduct', query: { id: id } });
                }
            },

            // hover 移入 行為
            addHoverProduct(productId) {
                // console.log(productId);
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

        watch: {
            '$route'(to, from) {
                // console.log("TO", to);
                // console.log("FROM", from);
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
            this.scrollTop();
            this.getCart();
        },
    };
</script>