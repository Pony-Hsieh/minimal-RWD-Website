<template>
  <div class="wrapper">

    <loading :active.sync="isLoading">
      <div class="loadingio-spinner-eclipse-qd52l2xe1a">
        <div class="ldio-zf9gth3n7r">
          <div></div>
        </div>
      </div>
    </loading>

    <AlertMsg />

    <HeaderComponent />

    <!-- <section class="banner">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-11">
                        <h3 class="font-weight-light text-right text-white">
                            less is more
                        </h3>
                        <router-link to="/shop" class="btn_shopdirect mt-2 text-righ d-block">
                            前往商城
                        </router-link>
                    </div>
                    <div class="col-1"></div>
                </div>
            </div>
        </section> -->
    <section class="banner">
      <div class="container">
        <div class="row">
          <div class="col-11">
            <h3 class="font-weight-light text-white">
              less is more
            </h3>
          </div>
          <div class="col-1">
          </div>
          <div class="col-1">
          </div>
          <div class="col-11">
            <router-link to="/shop" class="btn_shopdirect mt-2">
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
            <img src="https://i.imgur.com/13UEze0.jpg" alt="MaleProductPhoto"
              :class="{'ing': categoryDirectHover === 'Men'}" @mouseover="categoryDirectHover = 'Men'"
              @mouseleave="categoryDirectHover=''">
            <a href="#" class="btn_shopdirect" @click.prevent="routerTo('Men')" @mouseover="categoryDirectHover = 'Men'"
              @mouseleave="categoryDirectHover='Men'">
              選購 男士 商品
            </a>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-lg-4 mt-3 mt-sm-0 px-lg-0 singleCategoryDirect">
          <div>
            <img src="https://i.imgur.com/0TzCFtq.jpg" alt="FemaleProductPhoto"
              :class="{'ing': categoryDirectHover === 'Women'}" @mouseover="categoryDirectHover = 'Women'"
              @mouseleave="categoryDirectHover=''">
            <a href="#" class="btn_shopdirect" @click.prevent="routerTo('Women')"
              @mouseover="categoryDirectHover = 'Women'" @mouseleave="categoryDirectHover='Men'">
              選購 女士 商品
            </a>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-lg-4 mt-3 mt-lg-0 px-lg-0 singleCategoryDirect">
          <div>
            <img src="https://i.imgur.com/3kAQgQp.jpg" alt="ShoesProductPhoto"
              :class="{'ing': categoryDirectHover === 'Shoes'}" @mouseover="categoryDirectHover = 'Shoes'"
              @mouseleave="categoryDirectHover=''">
            <a href="#" class="btn_shopdirect" @click.prevent="routerTo('Shoes')"
              @mouseover="categoryDirectHover = 'Shoes'" @mouseleave="categoryDirectHover='Men'">
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
                    <a href="#" :class="{'ing':newArrivalCategoryTab === 'all'}"
                      @click.prevent="newArrivalCategoryTab = 'all'">全部</a>
                  </li>
                  <li>
                    <a href="#" :class="{'ing':newArrivalCategoryTab === 'rawMen'}"
                      @click.prevent="newArrivalCategoryTab = 'rawMen'">男士</a>
                  </li>
                  <li>
                    <a href="#" :class="{'ing':newArrivalCategoryTab === 'rawWomen'}"
                      @click.prevent="newArrivalCategoryTab = 'rawWomen'">女士</a>
                  </li>
                  <li>
                    <a href="#" :class="{'ing':newArrivalCategoryTab === 'rawShoes'}"
                      @click.prevent="newArrivalCategoryTab = 'rawShoes'">鞋類</a>
                  </li>
                  <li>
                    <a href="#" :class="{'ing':newArrivalCategoryTab === 'rawSports'}"
                      @click.prevent="newArrivalCategoryTab = 'rawSports'">運動</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>


          <!-- newArrivalProductHover -->
          <div class="col-12 p-0 newArrivalProducts">
            <div class="row mx-0">
              <div v-for="item in newArrivalCategoryArr[newArrivalCategoryTab]"
                class="col-12 col-sm-4 singleNewArrivalProduct">
                <div @mouseover="newArrivalProductHover = item.id" @mouseleave="newArrivalProductHover=''">
                  <div class="overflow-hidden">
                    <img :src="item.imageUrl" :alt="item.title + ' 商品圖片'"
                      :class="{'ing': newArrivalProductHover === item.id}">
                  </div>
                  <div class="filter" :class="{'ing': newArrivalProductHover === item.id}"></div>
                  <div class="productInfo" :class="{'ing': newArrivalProductHover === item.id}">
                    <h4>{{ item.title }}</h4>
                    <div class="cutomerRating">
                      <i class="fas fa-star" />
                      <i class="fas fa-star" />
                      <i class="fas fa-star" />
                      <i class="fas fa-star" />
                      <i class="fas fa-star" />
                    </div>
                    <h4>{{ item.price | currency }}</h4>
                    <ul class="list-unstyled hoverWidget" @mouseover="newArrivalProductHover = item.id"
                      @mouseleave="newArrivalProductHover = item.id">
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
  import AlertMsg from '@/components/AlertMsg.vue';


  export default {

    components: {
      HeaderComponent,
      ShippingDescription,
      IgPost,
      FooterComponent,
      AlertMsg,
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

        userLSCartArr: [], // LS 購物車內容

        isLoading: false,
      }
    },

    created() {
      this.getRawProducts();
      this.getLSCart();
    },

    methods: {

      getRawProducts() {
        const vm = this;
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`; // 這個成功取回資料

        vm.$http.get(api).then((response) => {
          // console.log(response); // 確認遠端撈回來的資料結構
          vm.rawNewArrivalArr = response.data.products.slice(0, 6);
          vm.makeNewArrivalCategoryArr();
        });
      },

      // 製作 New Arrival 分類陣列
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

        // 重新取得 LS，並存入 data return 中
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
        vm.getLSCart();
      },

      // 將更新後的 LS 購物車數量 送到 HeaderComponent 中進行更新
      sendLSCartItemNum() {
        this.$LSCartNum_Bus.$emit("LSCartItemNumEvent", this.userLSCartArr.length);
      },

      // 前往商城並套用特定類別
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


<style scoped lang="scss">
  @import "@/assets/scss/frontEnd/home.scss";
</style>