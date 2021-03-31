<template>
  <footer class="container-fluid">
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-6 col-lg-2">
          <div class="singleFooterPart">
            <h5>Category</h5>
            <ul class="list-unstyled">
              <li>
                <a href="#" @click.prevent="routerTo('Men')">Male</a>
              </li>
              <li>
                <a href="#" @click.prevent="routerTo('Women')">Female</a>
              </li>
              <li>
                <a href="#" @click.prevent="routerTo('Sports')">Sports</a>
              </li>
              <li>
                <a href="#" @click.prevent="routerTo('Shoes')">Shoes</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-lg-2">
          <div class="singleFooterPart">
            <h5>Company</h5>
            <ul class="list-unstyled">
              <li>
                <a href="#" @click.prevent>About</a>
              </li>
              <li>
                <a href="#" @click.prevent>News</a>
              </li>
              <li>
                <a href="#" @click.prevent>FAQ</a>
              </li>
              <li>
                <a href="#" @click.prevent>Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-lg-3">
          <div class="singleFooterPart">
            <h5>Address</h5>
            <ul class="list-unstyled">
              <li>
                <span>200, Green block, NewYork</span>
              </li>
              <li>
                <span>+10 456 267 1678</span>
              </li>
              <li>
                <span>contact89@winter.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-lg-4">
          <div class="singleFooterPart">
            <h5>Newsletter</h5>
            <div class="subscribe">
              <form action="" class="d-flex" @submit.prevent>
                <input type="email" placeholder="Email Address">
                <button type="submit">
                  Subscribe
                </button>
              </form>
            </div>
            <div class="socialMedia">
              <a href="#" @click.prevent>
                <i class="fab fa-facebook-f" />
              </a>
              <a href="#" @click.prevent>
                <i class="fab fa-twitter" />
              </a>
              <a href="#" @click.prevent>
                <i class="fab fa-instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="copyright text-center">
        Copyright ©{{ copyrightYear }} All rights reserved | This template is made with by Colorlib
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'FooterComponent',

    data() {
      return {
        copyrightYear: '',
      };
    },

    created() {
      this.getCopyrightYear();
    },

    methods: {
      getCopyrightYear() {
        this.copyrightYear = new Date().getFullYear();
      },

      routerTo(categoryName) {
        this.$router.push({ path: '/shop', query: { category: categoryName } });
      },
    },
  };
</script>

<style scoped lang="scss">
  @import "@/assets/scss/components/footerComponent.scss";
</style>