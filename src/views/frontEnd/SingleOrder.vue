<template>
  <div class="container-fluid p-0 wrapper">
    <HeaderComponent />

    <div class="container orderData">
      <h1 class="h3 text-center my-4">
        訂單資訊
      </h1>

      <div class="row my-3">
        <div class="col-4">
          <h3>訂單 id</h3>
        </div>
        <div class="col-8">
          <p style="word-break: break-all;">
            {{ orderData.id }}
          </p>
        </div>
      </div>

      <div class="row my-3">
        <div class="col-4">
          <h3>訂購時間</h3>
        </div>
        <div class="col-8">
          <p class="text-right">
            {{ orderData.create_at|formatTime }}
          </p>
        </div>
      </div>

      <div class="row my-3 orderProduct">
        <div class="col-4">
          <h3>訂購商品</h3>
        </div>
        <div class="col-8">
          <div v-for="item in orderData.products"
            class="my-4"
          >
            <h4>商品名稱：{{ item.product.title }}</h4>
            <img :src="item.product.imageUrl"
              alt=""
            >
            <h4 class="mt-2">
              購買數量：{{ item.qty }}
            </h4>
            <h4>小計：{{ item.final_total|currency }}</h4>
          </div>
        </div>
      </div>

      <div class="row my-3">
        <div class="col-4">
          <h3>訂單金額</h3>
        </div>
        <div class="col-8">
          <p>{{ orderData.total|currency }}</p>
        </div>
      </div>

      <div class="row my-3 is_paid">
        <div class="col-4">
          <h3>付款狀態</h3>
        </div>
        <div class="col-8 d-flex justify-content-center align-items-center">
          <p v-if="orderData.is_paid"
            class="m-0 text-success"
          >
            已付
          </p>
          <p v-if="!orderData.is_paid"
            class="m-0 text-danger"
          >
            未付
          </p>
          <button v-if="!orderData.is_paid"
            class="btn btn-sm btn-primary ml-3"
            @click.prevent="payOrder(orderData.id)"
          >
            付款
          </button>
        </div>
      </div>

      <div class="row my-3 userData">
        <div class="col-4">
          <h3>訂購資訊</h3>
        </div>
        <div class="col-8">
          <div>
            <h4>訂購email&nbsp;&nbsp;：</h4>
            <p>{{ orderData.user.email }}</p>
          </div>
          <div>
            <h4>收件人姓名：</h4>
            <p>{{ orderData.user.name }}</p>
          </div>
          <div>
            <h4>收件人電話：</h4>
            <p>{{ orderData.user.tel }}</p>
          </div>
          <div>
            <h4>收件地址&emsp;：</h4>
            <p>{{ orderData.user.address }}</p>
          </div>
        </div>
      </div>

      <div class="row my-3 userMessage">
        <div class="col-4">
          <h3>訂單留言</h3>
        </div>
        <div class="col-8">
          <p>{{ orderData.message }}</p>
        </div>
      </div>
    </div>

    <FooterComponent />
  </div>
</template>


<script>

  import HeaderComponent from '@/components/HeaderComponent.vue';
  import FooterComponent from '@/components/FooterComponent.vue';

  export default {
    // name: "singleOrder",

    components: {
      HeaderComponent,
      FooterComponent,
    },

    data() {
      return {
        orderId: "",
        orderData: {},
      }
    },

    created() {
      this.scrollTop();
      this.judgeOrderByRouterParam(); // 先將 訂單id 存入 data return 中
      this.getOrderData();
    },

    methods: {

      // 將 訂單id 存入 data return 中
      judgeOrderByRouterParam() {
        this.orderId = this.$route.query.orderId;
        console.log("this.$route.query.orderId", this.$route.query.orderId);
        console.log("this.orderId", this.orderId);
      },

      // 取得該訂單的資訊
      getOrderData() {
        const vm = this;
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`;
        vm.$http.get(api).then((response) => {
          console.log("orderResponse", response); // 確認遠端撈回來的資料結構
          if (response.data.success) {
            vm.orderData = response.data.order;
            console.log("vm.orderData", vm.orderData);
          }
        });
      },

      // 訂單付款
      payOrder() {
        const vm = this;
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`;

        vm.$http.post(api).then((response) => {
          // console.log("response", response); // 確認遠端撈回來的資料結構
          if (response.data.success) {
            alert("付款成功！");
            // console.log("付款成功！");
            vm.getOrderData();
            vm.scrollTop();
          }
        });
      },

      // 回到頁面頂部
      scrollTop() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      },

    },
  }
</script>


<style scoped lang="scss">
  @import "@/assets/scss/frontEnd/singleOrder.scss";
</style>