<template>
    <div class="message-alert">
        <div class="alert alert-dismissible" :class="'alert-' + item.status" v-for="(item, i) in receiveMessages"
            :key="i" role="alert">
            <div v-html="item.message"></div>
            <button type="button" class="close" @click="removeMessage(i)" data-dismiss="alert" aria-label="Close">
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


        created() {
            const vm = this;
            vm.$alertMsg_Bus.$on("alertMsgEvent", (msg, status = "success", removeTime = 3000) => {
                vm.updateMessage(msg, status, removeTime);
            });
        },

    };
</script>


<style scope lang="scss">
    @import "@/assets/scss/components/alertMsg.scss";
</style>