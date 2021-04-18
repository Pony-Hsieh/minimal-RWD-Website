<template>
  <div class="message-alert">
    <div v-for="(item, i) in receiveMessages"
      :key="i"
      class="alert alert-dismissible"
      :class="'alert-' + item.status"
      role="alert"
    >
      <div v-html="item.message" />
      <button type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
        @click="removeMessage(i)"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>


<script>
  export default {

    // name: 'Navbar',

    data() {
      return {
        receiveMessages: [],
      };
    },


    created() {
      const vm = this;
      vm.$alertMsg_Bus.$on("alertMsgEvent", (msg, status = "success", removeTime = 3000) => {
        vm.updateMessage(msg, status, removeTime);
      });
    },


    methods: {

      updateMessage(message, status, removeTime) {
        const timestamp = Math.floor(new Date() / 1000);
        this.receiveMessages.push({
          message,
          status,
          timestamp,
        });
        this.removeMessageWithTiming(timestamp, removeTime);
      },

      removeMessage(num) {
        this.receiveMessages.splice(num, 1);
      },

      removeMessageWithTiming(timestamp, removeTime) {
        const vm = this;
        setTimeout(() => {
          vm.receiveMessages.forEach((item, i) => {
            if (item.timestamp === timestamp) {
              vm.receiveMessages.splice(i, 1);
            }
          });
        }, removeTime);
      },
    },

  };
</script>


<style scope lang="scss">
  @import "@/assets/scss/components/alertMsg.scss";
</style>