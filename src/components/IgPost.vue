<template>
  <section class="wrapper">
    <div class="singleIgPost" @mouseover="igPostHover(1)" @mouseleave="removeIgPostHover(1)">
      <img class="img-fluid" :class="{'ing' : igPostStatus[1]}"
        src="https://preview.colorlib.com/theme/winter/img/instagram/inst_1.png" alt="ig post photo">
      <div class="filter" :class="{'ing' : igPostStatus[1]}" />
      <a href="#" class="igIcon" :class="{'ing' : igPostStatus[1]}" @click.prevent>
        <i class="fab fa-instagram" />
      </a>
    </div>
    <div class="singleIgPost" @mouseover="igPostHover(2)" @mouseleave="removeIgPostHover(2)">
      <img class="img-fluid" :class="{'ing' : igPostStatus[2]}"
        src="https://preview.colorlib.com/theme/winter/img/instagram/inst_2.png" alt="ig post photo">
      <div class="filter" :class="{'ing' : igPostStatus[2]}" />
      <a href="#" class="igIcon" :class="{'ing' : igPostStatus[2]}" @click.prevent>
        <i class="fab fa-instagram" />
      </a>
    </div>
    <div class="singleIgPost" @mouseover="igPostHover(3)" @mouseleave="removeIgPostHover(3)">
      <img class="img-fluid" :class="{'ing' : igPostStatus[3]}"
        src="https://preview.colorlib.com/theme/winter/img/instagram/inst_3.png" alt="ig post photo">
      <div class="filter" :class="{'ing' : igPostStatus[3]}" />
      <a href="#" class="igIcon" :class="{'ing' : igPostStatus[3]}" @click.prevent>
        <i class="fab fa-instagram" />
      </a>
    </div>
    <div class="singleIgPost" @mouseover="igPostHover(4)" @mouseleave="removeIgPostHover(4)">
      <img class="img-fluid" :class="{'ing' : igPostStatus[4]}"
        src="https://preview.colorlib.com/theme/winter/img/instagram/inst_4.png" alt="ig post photo">
      <div class="filter" :class="{'ing' : igPostStatus[4]}" />
      <a href="#" class="igIcon" :class="{'ing' : igPostStatus[4]}" @click.prevent>
        <i class="fab fa-instagram" />
      </a>
    </div>
    <div class="singleIgPost" @mouseover="igPostHover(5)" @mouseleave="removeIgPostHover(5)">
      <img class="img-fluid" :class="{'ing' : igPostStatus[5]}"
        src="https://preview.colorlib.com/theme/winter/img/instagram/inst_5.png" alt="ig post photo">
      <div class="filter" :class="{'ing' : igPostStatus[5]}" />
      <a href="#" class="igIcon" :class="{'ing' : igPostStatus[5]}" @click.prevent>
        <i class="fab fa-instagram" />
      </a>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'IgPost',
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