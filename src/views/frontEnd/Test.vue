<template>
  <div>
    <HeaderComponent />

    <div class="container all">
      <div class="row pt-5">
        <div class="col-12 col-lg-3">

          <!-- 類別 filter -->
          <div class="filterCard categoryFilter" :class="{'ing' : filterCardStatus['category'] === true}">
            <h5 @click="switchCardStatus('category')">
              依據 類別 篩選
              &nbsp; &nbsp; &nbsp;
              <i class="fas fa-angle-down"></i>
              &nbsp; &nbsp; &nbsp;
              <span v-if="filterCardStatus['category'] === true">展開</span>
              <span v-else>收闔</span>
            </h5>
            <div class="filterCardContent" :class="{'ing' : filterCardStatus['category'] === true}">
              <ul class="list-unstyled">
                <li>
                  <a href="">全部</a>
                </li>
                <li>
                  <a href="">男士</a>
                </li>
                <li>
                  <a href="">女士</a>
                </li>
                <li>
                  <a href="">鞋類</a>
                </li>
                <li>
                  <a href="">運動</a>
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
              <i class="fas fa-angle-down"></i>
              &nbsp; &nbsp; &nbsp;
              <span v-if="filterCardStatus['price'] === true">展開</span>
              <span v-else>收闔</span>
            </h5>
            <div class="filterCardContent">
              <vue-slider dot-size="20" max="10000" interval="100" :lazy="true" />

              <div class="w-100">
                <input type="number">
                到
                <input type="number">
              </div>

              <div class="w-100">
                <button type="button" class="btn btn-sm">
                  套用金額範圍
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="mt-5">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere ex soluta eos fugiat assumenda
      exercitationem
      aperiam! Deleniti, ipsum voluptas? Numquam, corrupti nostrum praesentium delectus aut quas voluptatibus
      pariatur
      et eveniet?
    </p>
    <p class="mt-5">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere ex soluta eos fugiat assumenda
      exercitationem
      aperiam! Deleniti, ipsum voluptas? Numquam, corrupti nostrum praesentium delectus aut quas voluptatibus
      pariatur
      et eveniet?
    </p>
    <p class="mt-5">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere ex soluta eos fugiat assumenda
      exercitationem
      aperiam! Deleniti, ipsum voluptas? Numquam, corrupti nostrum praesentium delectus aut quas voluptatibus
      pariatur
      et eveniet?
    </p>
    <p class="mt-5">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere ex soluta eos fugiat assumenda
      exercitationem
      aperiam! Deleniti, ipsum voluptas? Numquam, corrupti nostrum praesentium delectus aut quas voluptatibus
      pariatur
      et eveniet?
    </p>
    <p class="mt-5">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere ex soluta eos fugiat assumenda
      exercitationem
      aperiam! Deleniti, ipsum voluptas? Numquam, corrupti nostrum praesentium delectus aut quas voluptatibus
      pariatur
      et eveniet?
    </p>
    <p class="mt-5">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere ex soluta eos fugiat assumenda
      exercitationem
      aperiam! Deleniti, ipsum voluptas? Numquam, corrupti nostrum praesentium delectus aut quas voluptatibus
      pariatur
      et eveniet?
    </p>
    <p class="mt-5">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere ex soluta eos fugiat assumenda
      exercitationem
      aperiam! Deleniti, ipsum voluptas? Numquam, corrupti nostrum praesentium delectus aut quas voluptatibus
      pariatur
      et eveniet?
    </p>
    <p class="mt-5">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere ex soluta eos fugiat assumenda
      exercitationem
      aperiam! Deleniti, ipsum voluptas? Numquam, corrupti nostrum praesentium delectus aut quas voluptatibus
      pariatur
      et eveniet?
    </p>



    <!-- 測試 -->
    <!-- <div class="container">
            <div class="filterCard priceFilter mt-5" :class="{'ing' : filterCardStatus['price'] === true}">
                <h5 @click="switchCardStatus('price')" :class="{'ing' : filterCardStatus['price'] === true}">
                    依據 金額 篩選
                    &nbsp; &nbsp; &nbsp;
                    <i class="fas fa-angle-up" v-if="filterCardStatus['price'] === true"></i>
                    <i class="fas fa-angle-down" v-else></i>
                    &nbsp; &nbsp; &nbsp;
                    <span v-if="filterCardStatus['price'] === true">現在狀態：展開</span>
                    <span v-else>收闔</span>
                </h5>
                <div class="filterCardContent" :class="{'ing' : filterCardStatus['price'] === true}">
                    <div class="w-100">
                        <input type="number">
                        到
                        <input type="number">
                    </div>

                    <div class="w-100">
                        <button type="button" class="btn btn-sm">
                            套用金額範圍
                        </button>
                    </div>
                </div>
            </div>

            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem ea, nisi non qui vero repellat corrupti eius
            culpa eum, blanditiis explicabo voluptatum provident recusandae sequi assumenda libero beatae repellendus
            maiores?
        </div> -->




    <!-- <IgPost /> -->
    <!-- <FooterComponent /> -->

  </div>
</template>


<script>
  import HeaderComponent from '@/components/HeaderComponent.vue';
  import IgPost from '@/components/IgPost.vue';
  import FooterComponent from '@/components/FooterComponent.vue';

  export default {

    // name: 'ContactUs',

    components: {
      HeaderComponent,
      IgPost,
      FooterComponent,
    },

    data() {
      return {
        filterCardStatus: {
          category: true,
          price: true,
        },
        clientWidth: 0,
      }
    },

    watch: {
      "clientWidth": {
        handler: function (val) {
          if (val < 992) {
            // < 992 預設關閉
            this.filterCardStatus.category = false;
            this.filterCardStatus.price = false;
          }
          else {
            // > 992 保持開啟
            this.filterCardStatus.category = true;
            this.filterCardStatus.price = true;
          }
        },
      },
    },

    created() {
      // 回到頁面頂部
      document.body.scrollTop = document.documentElement.scrollTop = 0;

      const vm = this;
      vm.clientWidth = document.body.clientWidth;
      window.onresize = function () {
        vm.clientWidth = document.body.clientWidth;
      };
      if (vm.clientWidth < 992) {
        vm.filterCardStatus.category = false;
        vm.filterCardStatus.price = false;
      }
      else {
        vm.filterCardStatus.category = true;
        vm.filterCardStatus.price = true;
      }
    },

    mounted() {
      const vm = this;
      window.onresize = function () {
        vm.clientWidth = document.body.clientWidth;
      };
    },

    methods: {
      switchCardStatus(param) {
        if (this.clientWidth < 992) {
          this.filterCardStatus[param] = !this.filterCardStatus[param];
        }
      },
    },

  };
</script>

<style lang="scss">
  @import "@/assets/scss/kit/vue-slider-component.scss";
</style>

<style scoped lang="scss">
  @import "@/assets/scss/frontEnd/test.scss";
</style>