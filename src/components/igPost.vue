<template>
    <section class="wrapper">
        <div class="singleIgPost" @mouseover="igPostHover(1)" @mouseleave="removeIgPostHover(1)">
            <img class="img-fluid" :class="{'ing' : igPostStatus[1]}"
                src="https://preview.colorlib.com/theme/winter/img/instagram/inst_1.png" alt="ig post photo">
            <div class="filter" :class="{'ing' : igPostStatus[1]}"></div>
            <a href="#" class="igIcon" :class="{'ing' : igPostStatus[1]}" @click.prevent>
                <i class="fab fa-instagram"></i>
            </a>
        </div>
        <div class="singleIgPost" @mouseover="igPostHover(2)" @mouseleave="removeIgPostHover(2)">
            <img class="img-fluid" :class="{'ing' : igPostStatus[2]}"
                src="https://preview.colorlib.com/theme/winter/img/instagram/inst_2.png" alt="ig post photo">
            <div class="filter" :class="{'ing' : igPostStatus[2]}"></div>
            <a href="#" class="igIcon" :class="{'ing' : igPostStatus[2]}" @click.prevent>
                <i class="fab fa-instagram"></i>
            </a>
        </div>
        <div class="singleIgPost" @mouseover="igPostHover(3)" @mouseleave="removeIgPostHover(3)">
            <img class="img-fluid" :class="{'ing' : igPostStatus[3]}"
                src="https://preview.colorlib.com/theme/winter/img/instagram/inst_3.png" alt="ig post photo">
            <div class="filter" :class="{'ing' : igPostStatus[3]}"></div>
            <a href="#" class="igIcon" :class="{'ing' : igPostStatus[3]}" @click.prevent>
                <i class="fab fa-instagram"></i>
            </a>
        </div>
        <div class="singleIgPost" @mouseover="igPostHover(4)" @mouseleave="removeIgPostHover(4)">
            <img class="img-fluid" :class="{'ing' : igPostStatus[4]}"
                src="https://preview.colorlib.com/theme/winter/img/instagram/inst_4.png" alt="ig post photo">
            <div class="filter" :class="{'ing' : igPostStatus[4]}"></div>
            <a href="#" class="igIcon" :class="{'ing' : igPostStatus[4]}" @click.prevent>
                <i class="fab fa-instagram"></i>
            </a>
        </div>
        <div class="singleIgPost" @mouseover="igPostHover(5)" @mouseleave="removeIgPostHover(5)">
            <img class="img-fluid" :class="{'ing' : igPostStatus[5]}"
                src="https://preview.colorlib.com/theme/winter/img/instagram/inst_5.png" alt="ig post photo">
            <div class="filter" :class="{'ing' : igPostStatus[5]}"></div>
            <a href="#" class="igIcon" :class="{'ing' : igPostStatus[5]}" @click.prevent>
                <i class="fab fa-instagram"></i>
            </a>
        </div>
    </section>
</template>


<style scoped>
    .wrapper {
        max-width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .singleIgPost {
        position: relative;
        flex: 19.5% 0 0;
    }

    .singleIgPost img.ing {
        z-index: 1;
    }

    .filter {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #2f7dfc;
        opacity: 0;
        transition: 1s;
    }

    .filter.ing {
        opacity: 0.7;
        z-index: 2;
        transition: 1s;
    }

    .singleIgPost .igIcon {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        transition: 1s;
    }

    .singleIgPost .igIcon.ing {
        opacity: 1;
        z-index: 3;
        transition: 1s;
    }

    .igIcon i {
        color: #fff;
        font-size: 50px;
        opacity: 1;
    }

    @media (max-width: 576px) {

        .wrapper {
            justify-content: space-around;
            padding: 0 -15px;
        }

        .singleIgPost {
            flex: 33% 0 0;
            margin-bottom: 15px;
        }
    }
</style>


<script>
    export default {
        name: "igPost",
        data() {
            return {
                igPostStatus: {
                    1: false,
                    2: false,
                    3: false,
                    4: false,
                    5: false,
                }
            }
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