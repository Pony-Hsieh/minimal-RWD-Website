<template>
  <div>
    <!-- 這是首頁 -->

    <HeaderComponent />

    <section class="banner">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-7">
            <h5 class="font-weight-light">
              Winter Fashion
            </h5>
            <h1 class="font-weight-bold">
              Fashion Collection 2019
            </h1>
            <router-link to="/shop"
              class="btn_shopdirect mt-2"
            >
              前往商城
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="container-fluid p-0 categoryDirect">
      <div class="row pt-4 mx-0">
        <div class="col-12 col-sm-6 col-lg-4 mt-0 px-lg-0 singleCategoryDirect">
          <div>
            <img src="https://preview.colorlib.com/theme/winter/img/feature_1.png"
              alt=""
              :class="{'ing': categoryDirectHover === 'Men'}"
              @mouseover="categoryDirectHover = 'Men'"
              @mouseleave="categoryDirectHover=''"
            >
            <a href="#"
              class="btn_shopdirect"
              @click.prevent="routerTo('Men')"
              @mouseover="categoryDirectHover = 'Men'"
              @mouseleave="categoryDirectHover='Men'"
            >
              選購 男士 商品
            </a>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-lg-4 mt-3 mt-sm-0 px-lg-0 singleCategoryDirect">
          <div>
            <img src="https://preview.colorlib.com/theme/winter/img/feature_2.png"
              alt=""
              :class="{'ing': categoryDirectHover === 'Women'}"
              @mouseover="categoryDirectHover = 'Women'"
              @mouseleave="categoryDirectHover=''"
            >
            <a href="#"
              class="btn_shopdirect"
              @click.prevent="routerTo('Women')"
              @mouseover="categoryDirectHover = 'Women'"
              @mouseleave="categoryDirectHover='Men'"
            >
              選購 女士 商品
            </a>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-lg-4 mt-3 mt-lg-0 px-lg-0 singleCategoryDirect">
          <div>
            <img src="https://preview.colorlib.com/theme/winter/img/feature_3.png"
              alt=""
              :class="{'ing': categoryDirectHover === 'Shoes'}"
              @mouseover="categoryDirectHover = 'Shoes'"
              @mouseleave="categoryDirectHover=''"
            >
            <a href="#"
              class="btn_shopdirect"
              @click.prevent="routerTo('Shoes')"
              @mouseover="categoryDirectHover = 'Shoes'"
              @mouseleave="categoryDirectHover='Men'"
            >
              選購 鞋類 商品
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="newArrival">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 mx-auto newArrivalTopSection">
            <div class="row">
              <div class="col-12 col-lg-8 mx-auto">
                <h3>New Arrival</h3>
              </div>
              <!-- tab -->
              <div class="col-12 col-lg-4 mx-auto">
                <ul class="list-unstyled tab">
                  <li>
                    <a href="#"
                      :class="{'ing':newArrivalCategoryTab === 'all'}"
                      @click.prevent="newArrivalCategoryTab = 'all'"
                    >全部</a>
                  </li>
                  <li>
                    <a href="#"
                      :class="{'ing':newArrivalCategoryTab === 'rawMen'}"
                      @click.prevent="newArrivalCategoryTab = 'rawMen'"
                    >男士</a>
                  </li>
                  <li>
                    <a href="#"
                      :class="{'ing':newArrivalCategoryTab === 'rawWomen'}"
                      @click.prevent="newArrivalCategoryTab = 'rawWomen'"
                    >女士</a>
                  </li>
                  <li>
                    <a href="#"
                      :class="{'ing':newArrivalCategoryTab === 'rawShoes'}"
                      @click.prevent="newArrivalCategoryTab = 'rawShoes'"
                    >鞋類</a>
                  </li>
                  <li>
                    <a href="#"
                      :class="{'ing':newArrivalCategoryTab === 'rawSports'}"
                      @click.prevent="newArrivalCategoryTab = 'rawSports'"
                    >運動</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>


          <!-- newArrivalProductHover -->
          <div class="col-12 p-lg-0 newArrivalProducts">
            <div class="row mx-0">
              <div v-for="item in newArrivalCategoryArr[newArrivalCategoryTab]"
                class="col-12 col-sm-4 singleNewArrivalProduct"
                @mouseover="newArrivalProductHover = item.id"
                @mouseleave="newArrivalProductHover=''"
              >
                <div class="overflow-hidden">
                  <img :src="item.imageUrl"
                    alt=""
                    :class="{'ing': newArrivalProductHover === item.id}"
                  >
                </div>
                <div class="filter"
                  :class="{'ing': newArrivalProductHover === item.id}"
                />
                <div class="productInfo"
                  :class="{'ing': newArrivalProductHover === item.id}"
                >
                  <h4>{{ item.title }}</h4>
                  <div class="cutomerRating">
                    <i class="fas fa-star" />
                    <i class="fas fa-star" />
                    <i class="fas fa-star" />
                    <i class="fas fa-star" />
                    <i class="fas fa-star" />
                  </div>
                  <h4>{{ item.price | currency }}</h4>
                  <!-- 加入購物車、加入收藏按鈕 -->
                  <ul class="list-unstyled hoverWidget"
                    @mouseover="newArrivalProductHover = item.id"
                    @mouseleave="newArrivalProductHover = item.id"
                  >
                    <li class="like">
                      <a href="#"
                        title="收藏此商品"
                        @click.prevent
                      >
                        <i class="far fa-heart" />
                      </a>
                    </li>
                    <li class="addCart">
                      <a href="#"
                        title="加入購物車"
                        @click.prevent="addToCart(item.id, item.title)"
                      >
                        <i class="fas fa-cart-plus" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ShippingDescription />
    <IgPost />
    <FooterComponent />
  </div>
</template>


<script>
  import HeaderComponent from '@/components/HeaderComponent.vue';
  import ShippingDescription from '@/components/ShippingDescription.vue';
  import IgPost from '@/components/IgPost.vue';
  import FooterComponent from '@/components/FooterComponent.vue';

  import eventBus from "@/eventBus";

  export default {

    // name: "Home",

    components: {
      HeaderComponent,
      ShippingDescription,
      IgPost,
      FooterComponent,
    },

    data() {
      return {
        imageUrl: "https://preview.colorlib.com/theme/winter/img/feature_1.png",
        categoryDirectHover: "", // 現在 hover 的是哪個類別

        rawNewArrivalArr: [],
        newArrivalCategoryArr: {
          all: [],
          rawMen: [],
          rawWomen: [],
          rawShoes: [],
          rawSports: [],
        },
        newArrivalCategoryTab: "all",
        newArrivalProductHover: "",

        originalCart: [], // 原本的購物車內容
        sameProductStatus: false, // 購物車內是否有同樣的商品 // 預設為沒有
        cartItemNum: 0,
      }
    },

    created() {
      // document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.getRawProducts();
      this.getCart();
    },

    methods: {

      getRawProducts() {
        const vm = this;
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`; // 這個成功取回資料

        // vm.isLoading = true; // 讀取效果

        // 從遠端取回 產品 、 分頁 的資料
        // 使用 ES6 的 promise 方法，所以使用 then 進行串接
        this.$http.get(api).then((response) => {
          // console.log(response); // 確認遠端撈回來的資料結構
          vm.rawNewArrivalArr = response.data.products.slice(0, 6);
          // vm.isLoading = false;  // 讀取效果
          vm.makeNewArrivalCategoryArr();
        });
      },

      makeNewArrivalCategoryArr() {
        const vm = this;
        vm.newArrivalCategoryArr.all = vm.rawNewArrivalArr;

        for (let i = 0; i < vm.rawNewArrivalArr.length; i++) {
          if (vm.rawNewArrivalArr[i].category === "男士") {
            vm.newArrivalCategoryArr.rawMen.push(vm.rawNewArrivalArr[i]);
          }
          if (vm.rawNewArrivalArr[i].category === "女士") {
            vm.newArrivalCategoryArr.rawWomen.push(vm.rawNewArrivalArr[i]);
          }
          if (vm.rawNewArrivalArr[i].category === "鞋類") {
            vm.newArrivalCategoryArr.rawShoes.push(vm.rawNewArrivalArr[i]);
          }
          if (vm.rawNewArrivalArr[i].category === "運動") {
            vm.newArrivalCategoryArr.rawSports.push(vm.rawNewArrivalArr[i]);
          }
        }
      },

      // 取得購物車內容
      getCart() {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
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
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        const vm = this;
        const cart = {
          product_id: id,
          qty: 1,
        };

        // 逐一比對原始購物車內的品項
        // 如果有，則跳出迴圈
        for (let i = 0; i < vm.originalCart.length; i++) {
          if (vm.originalCart[i].product_id === id) {
            vm.sameProductStatus = true;
            alert("購物車內已經有這項商品囉~");
            break;
          }
        }

        // 如果沒有，則將一件該商品加入購物車
        if (vm.sameProductStatus === false) {
          this.$http.post(api, { data: cart }).then((response) => {
            if (response.data.success) {
              alert(`成功將 ${title} 加入至購物車！`);
              vm.getCart();
            }
            else {
              alert("加入購物車失敗，請重整頁面後再試一次~");
            }
          });
        }

        vm.sameProductStatus = false; // 重設 購物車內是否有同樣的商品 的狀態
      },

      // 將更新後的數量送到 headerComponent 中進行更新
      sendCartItemNum() {
        eventBus.$emit("cartItemNumEvent", this.cartItemNum)
      },

      routerTo(categoryName) {
        this.$router.push(
          {
            path: '/shop',
            query: { category: categoryName },
          }
        );
      },
    },

  }
</script>


<style scoped>
  a {
    text-decoration: none;
  }

  .banner {
    height: 550px;
    background-color: #dde5e8;
  }

  .banner .container .row {
    /* 不太理解為什麼這裡還需要再加一次高度，之前不就已經在 .banner 寫過一次高度了嗎？ */
    height: 550px;
  }

  .banner a {
    width: 190px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }

  .btn_shopdirect {
    display: inline-block;
    /* padding: 19px 61px; */
    background-color: #2f7dfc;
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    -webkit-transition: 0.5s;
    transition: 0.5s;
  }

  .btn_shopdirect:hover {
    background-color: #fff;
    color: #2f7dfc;
  }

  /* 商城分類直達 */
  .categoryDirect {
    justify-content: space-between;
    position: relative;
  }

  .categoryDirect {
    background-color: #f4f4f4;
  }

  .categoryDirect img {
    max-width: 100%;
    transition: 0.5s;
  }

  .singleCategoryDirect>div {
    overflow: hidden;
  }

  .singleCategoryDirect:first-of-type {
    border-right: 10px solid #f4f4f4;
  }

  .singleCategoryDirect:nth-of-type(2) {
    border-right: 5px solid #f4f4f4;
    border-left: 5px solid #f4f4f4;
  }

  .singleCategoryDirect:last-of-type {
    border-left: 10px solid #f4f4f4;
  }

  .singleCategoryDirect img.ing {
    transform: scale(1.1);
  }

  .singleCategoryDirect a {
    width: 140px;
    height: 50px;
    line-height: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    white-space: nowrap;
  }

  @media (max-width: 992px) {

    .singleCategoryDirect:first-of-type {
      border-right: 0px;
    }

    .singleCategoryDirect:nth-of-type(2) {
      border-right: 0px;
      border-left: 0px;
    }

    .singleCategoryDirect:last-of-type {
      border-left: 0px;
    }
  }


  /* New Arrival */
  .newArrival {
    background-color: #f4f4f4;
  }

  .newArrival>.container-fluid>.row {
    padding-top: 70px;
    padding-bottom: 70px;
  }

  .newArrivalTopSection {
    max-width: 960px;
  }

  .newArrivalTopSection h3 {
    font-size: 30px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 30px;
  }

  .newArrivalTopSection>.row {
    justify-content: space-between;
    align-items: center;
  }

  @media(min-width:576px) {
    .newArrivalTopSection .col-12 {
      max-width: 720px;
      padding-left: 15px;
      padding-right: 15px;
    }
  }

  @media(min-width:992px) {
    .newArrivalTopSection h3 {
      font-size: 50px;
    }
  }


  .tab {
    margin-bottom: 30px;
  }

  .tab li {
    display: inline;
  }

  .tab li a {
    font-size: 16px;
    text-decoration: none;
    color: #000;
    margin-right: 20px;
    padding-bottom: 2px;
  }

  .tab li a.ing {
    color: #2f7dfc;
    border-bottom: 2px solid #2f7dfc;
  }

  .singleNewArrivalProduct {
    background-color: #fff;
    margin-bottom: 15px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }

  .singleNewArrivalProduct img {
    max-width: 100%;
    transition: 0.5s;
  }

  .singleNewArrivalProduct img.ing {
    transform: scale(1.1);
    transition: 0.5s;
  }

  .singleNewArrivalProduct .filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #2f7dfc;
    opacity: 0;
    transition: 0.5s;
  }

  .singleNewArrivalProduct .filter.ing {
    opacity: 0.7;
    transition: 0.5s;
  }

  .singleNewArrivalProduct .productInfo {
    position: absolute;
    top: 30%;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 20px;
    transition: 0.5s;
    opacity: 0;
  }

  .singleNewArrivalProduct .productInfo.ing {
    top: 30%;
    transition: 0.5s;
    opacity: 1;
  }

  .singleNewArrivalProduct .productInfo h4 {
    color: #fff;
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 0;
    /* 重置 margin-bottom */
  }

  .productInfo .cutomerRating {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 8px 0 2px 0;
  }

  .productInfo .cutomerRating i {
    color: #ffe400;
    font-size: 14px;
  }

  .singleNewArrivalProduct .hoverWidget {
    display: flex;
    justify-content: center;
  }

  .singleNewArrivalProduct .hoverWidget li {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #fff;
    margin: 0 7px;
  }

  .singleNewArrivalProduct .hoverWidget a {
    /* position: absolute; */
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .singleNewArrivalProduct .hoverWidget a:hover {
    background-color: #2f7dfc;
    color: #fff;
  }

  .singleNewArrivalProduct .hoverWidget a:active {
    transition-property: font-size;
    font-size: 24px;
  }


  @media (min-width: 576px) {

    .singleNewArrivalProduct:nth-child(2),
    .singleNewArrivalProduct:nth-child(5) {
      border-left: 15px solid #f4f4f4;
      border-right: 15px solid #f4f4f4;
    }

    .singleNewArrivalProduct .productInfo {
      position: absolute;
      top: 20%;
      left: 0;
      width: 100%;
      height: 100%;
      font-size: 20px;
      transition: 0.5s;
      opacity: 0;
    }

    .singleNewArrivalProduct .productInfo.ing {
      top: 17%;
      transition: 0.5s;
      opacity: 1;
    }
  }

  @media(min-width: 768px) {

    .banner {
      background-image: url("https://preview.colorlib.com/theme/winter/img/banner_img.png");
      background-position: 50% 50%;
      background-repeat: no-repeat;
      background-size: cover;
    }

    .singleNewArrivalProduct .productInfo {
      position: absolute;
      top: 35%;
      left: 0;
      width: 100%;
      height: 100%;
      font-size: 20px;
      transition: 0.5s;
      opacity: 0;
    }

    .singleNewArrivalProduct .productInfo.ing {
      top: 30%;
      transition: 0.5s;
      opacity: 1;
    }
  }

  @media (min-width: 992px) {

    .productInfo h4:nth-of-type(2) {
      margin: 18px 0 26px 0;
    }
  }
</style>