<template>
  <section class="wrapper igPostArea">
    <div class="singleIgPost"
      @mouseover="igPostHover(1)"
      @mouseleave="removeIgPostHover(1)"
    >
      <!-- 男子運動鞋 -->
      <img class="img-fluid"
        :class="{'ing' : igPostStatus[1]}"
        src="https://i.imgur.com/hHdPGZU.jpg"
        alt="ig post photo"
      >
      <div class="filter"
        :class="{'ing' : igPostStatus[1]}"
      />
      <a href="https://www.instagram.com/p/COC_z-gH1D7/"
        class="igIcon"
        :class="{'ing' : igPostStatus[1]}"
      >
        <i class="fab fa-instagram" />
      </a>
    </div>

    <div class="singleIgPost"
      @mouseover="igPostHover(2)"
      @mouseleave="removeIgPostHover(2)"
    >
      <!-- 女子 保暖帽T -->
      <img class="img-fluid"
        :class="{'ing' : igPostStatus[2]}"
        src="https://i.imgur.com/RxCKG3O.jpg"
        alt="ig post photo"
      >
      <div class="filter"
        :class="{'ing' : igPostStatus[2]}"
      />
      <a href="https://www.instagram.com/p/COC_yYanDjd/"
        class="igIcon"
        :class="{'ing' : igPostStatus[2]}"
      >
        <i class="fab fa-instagram" />
      </a>
    </div>

    <div class="singleIgPost"
      @mouseover="igPostHover(3)"
      @mouseleave="removeIgPostHover(3)"
    >
      <!-- 女子 帆布鞋 -->
      <img class="img-fluid"
        :class="{'ing' : igPostStatus[3]}"
        src="https://i.imgur.com/v5zsgn6.jpg"
        alt="ig post photo"
      >
      <div class="filter"
        :class="{'ing' : igPostStatus[3]}"
      />
      <a href="https://www.instagram.com/p/COC_1nDHyhp/"
        class="igIcon"
        :class="{'ing' : igPostStatus[3]}"
      >
        <i class="fab fa-instagram" />
      </a>
    </div>

    <div class="singleIgPost"
      @mouseover="igPostHover(4)"
      @mouseleave="removeIgPostHover(4)"
    >
      <!-- 男子排汗短褲 -->
      <img class="img-fluid"
        :class="{'ing' : igPostStatus[4]}"
        src="https://i.imgur.com/mu2x6Vo.jpg"
        alt="ig post photo"
      >
      <div class="filter"
        :class="{'ing' : igPostStatus[4]}"
      />
      <a href="https://www.instagram.com/p/COC_23eHr3C/"
        class="igIcon"
        :class="{'ing' : igPostStatus[4]}"
      >
        <i class="fab fa-instagram" />
      </a>
    </div>

    <div class="singleIgPost"
      @mouseover="igPostHover(5)"
      @mouseleave="removeIgPostHover(5)"
    >
      <!-- 男子 牛仔長褲 -->
      <img class="img-fluid"
        :class="{'ing' : igPostStatus[5]}"
        src="https://i.imgur.com/ew82x6i.jpg"
        alt="ig post photo"
      >
      <div class="filter"
        :class="{'ing' : igPostStatus[5]}"
      />
      <a href="https://www.instagram.com/p/COC_wVNHIgC/"
        class="igIcon"
        :class="{'ing' : igPostStatus[5]}"
      >
        <i class="fab fa-instagram" />
      </a>
    </div>
  </section>
</template>


<script>
  export default {
    // name: 'IgPost',
    data() {
      return {
        igPostStatus: {
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
        },
      };
    },
    methods: {
      igPostHover(param) {
        this.igPostStatus[param] = true;
      },
      removeIgPostHover(param) {
        this.igPostStatus[param] = false;
      },
    },
  };
</script>


<style scoped lang="scss">
  @import "@/assets/scss/components/igPost.scss";
</style>