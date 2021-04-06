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

    <h2 class="text-center mt-4">
      檢視訂單
    </h2>

    <div class="container">
      <p v-if="rawData.length == 0"
        class="h5 text-center my-5"
      >
        目前沒有訂單喔~
      </p>

      <!-- 訂單詳細資料 -->
      <table v-if="rawData.length != 0"
        class="table table-bordered table-striped table-responsive-xl mt-4 mw-100"
      >
        <thead class="thead-dark">
          <tr>
            <!-- id -->
            <th width="80px"
              class="text-center align-middle"
            >
              訂單 id
            </th>
            <!-- create_at -->
            <th width="100px"
              class="text-center align-middle"
            >
              下單時間
            </th>
            <!-- is_paid -->
            <th width="100px"
              class="text-center align-middle"
            >
              付款狀態
            </th>
            <!-- products -->
            <th width="250px"
              class="text-center align-middle"
            >
              購買商品
            </th>
            <!-- total -->
            <th width="120px"
              class="text-center align-middle"
            >
              訂單金額
            </th>
            <!-- message -->
            <th width="20%"
              class="text-center align-middle"
            >
              訂單留言
            </th>
            <!-- user: Object -->
            <th width="120px"
              class="text-center align-middle"
            >
              收件者資料
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(order, index) in rawData"
            :key="index"
          >
            <!-- 訂單 id -->
            <td class="align-middle"
              style="word-break: break-all;"
            >
              {{ order.id }}
            </td>
            <!-- 下單時間 -->
            <td class="text-center align-middle"
              style="word-break: keep-all;"
            >
              {{ order.create_at|formatTime }}
            </td>
            <!-- 付款狀態 -->
            <td class="text-center align-middle">
              <span v-if="order.is_paid"
                class="text-success"
              >已付</span>
              <span v-if="!order.is_paid"
                class="text-danger"
              >未付</span>
              <button v-if="!order.is_paid"
                class="btn btn-sm btn-primary mt-1"
                @click="payOrder(order.id)"
              >
                付款
              </button>
            </td>
            <!-- 購買商品 -->
            <td class="align-middle">
              <div v-for="(item ,i) in order.products"
                :key="i"
                class="d-flex flex-column justify-content-center align-items-center py-2"
              >
                <div class="d-flex justify-content-center align-items-center">
                  <!-- 商品圖片、商品名稱 -->
                  <div>
                    <img :src="item.product.imageUrl"
                      alt="item.product.title + ' 商品圖片'"
                    >
                    <div class="text-center mt-1">
                      {{ item.product.title }}
                    </div>
                  </div>
                  <!-- 購買數量 -->
                  <div class="ml-3">
                    數量： {{ item.qty }}
                  </div>
                </div>
              </div>
            </td>
            <!-- 訂單金額 -->
            <td class="text-center align-middle">
              {{ order.total|currency }}
            </td>
            <!-- 訂單留言 -->
            <td style="max-width: 20%;  word-break: break-all;">
              {{ order.message }}
            </td>
            <!-- 收件者資料 -->
            <td class="align-middle">
              訂購 email：
              <br>
              {{ order.user.email }}
              <br>
              <br>
              收件人地址：
              <br>
              {{ order.user.address }}
              <br>
              <br>
              收件人姓名：
              <br>
              {{ order.user.name }}
              <br>
              <br>
              收件人電話：
              <br>
              {{ order.user.tel }}
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 分頁功能 -->
      <nav v-if="rawData.length != 0"
        aria-label="Page navigation example"
        class="mt-5 mb-4"
      >
        <ul class="pagination justify-content-center">
          <li class="page-item"
            :class="{'disabled' : !pagination.has_pre }"
          >
            <a class="page-link"
              href="#"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
              <!-- sr-only 全稱是 screen reader only，意為：（僅供）屏幕閱讀器，這個 class 主要用於增強 accessbility（可訪問性）。 -->
            </a>
          </li>
          <li v-for="page in pagination.total_pages"
            :key="page"
            class="page-item"
            :class="{ 'active' : pagination.current_page === page }"
          >
            <a class="page-link"
              href="#"
              @click.prevent="getOrders(page)"
            >{{ page }}</a>
          </li>
          <li class="page-item"
            :class="{'disabled' : !pagination.has_next }"
          >
            <a class="page-link"
              href="#"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <FooterComponent />
  </div>
</template>


<script>
  import $ from "jquery";

  import HeaderComponent from '@/components/HeaderComponent.vue';
  import FooterComponent from '@/components/FooterComponent.vue';
  import AlertMsg from '@/components/AlertMsg.vue';

  export default {

    components: {
      HeaderComponent,
      FooterComponent,
      AlertMsg,
    },

    data() {
      return {
        isLoading: false,
        rawData: [],
        pagination: {},
        tempOrder: {
          products: {},
          user: "",
        },
      }
    },

    created() {
      this.getOrders();
    },

    methods: {

      getOrders(page = 1) {
        const vm = this;
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/orders?page=${page}`;
        vm.isLoading = true;

        // 從遠端取回 訂單 、 分頁 的資料
        vm.$http.get(api).then((response) => {
          vm.rawData = response.data.orders;
          vm.pagination = response.data.pagination;
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          vm.isLoading = false;
        });
      },

      // 訂單付款
      payOrder(orderId) {
        const vm = this;
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${orderId}`;
        vm.isLoading = true;

        vm.$http.post(api).then((response) => {
          if (response.data.success) {
            vm.$alertMsg_Bus.$emit("alertMsgEvent", "付款成功！");
            vm.getOrders();
            vm.isLoading = false;
          }
          else {
            vm.$alertMsg_Bus.$emit("alertMsgEvent", "付款失敗QQ<br/><br/>請重新整理頁面後再次付款，謝謝~", "danger");
            setTimeout(() => {
              location.reload();
            }, 3000);
          }
        });
      },

    },
  }
</script>

<style scoped lang="scss">
  @import "@/assets/scss/frontEnd/order.scss";
</style>