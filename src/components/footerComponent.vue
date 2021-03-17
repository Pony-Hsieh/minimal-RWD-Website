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
                                <a href="" @click.prevent>News</a>
                            </li>
                            <li>
                                <a href="" @click.prevent>FAQ</a>
                            </li>
                            <li>
                                <a href="" @click.prevent>Contact</a>
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
                            <form action="" class="d-flex">
                                <input type="email" placeholder="Email Address">
                                <button type="submit" @click.prevent>Subscribe</button>
                            </form>
                        </div>
                        <div class="socialMedia">
                            <a href="" @click.prevent>
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="" @click.prevent>
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="" @click.prevent>
                                <i class="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="copyright text-center">
                Copyright ©{{copyrightYear}} All rights reserved | This template is made with by Colorlib
            </div>

        </div>
    </footer>
</template>


<style scoped>
    .container-fluid {
        background-color: #000;
        color: #fff;
    }

    .container {
        padding: 70px 0 25px 0;
    }

    .singleFooterPart h5 {
        margin-bottom: 15px;
    }

    .singleFooterPart li {
        margin-bottom: 14px;
        display: block;
    }

    .singleFooterPart li a {
        text-decoration: none;
        color: #fff;
        transition: 0.5s;
    }

    .singleFooterPart li a:hover {
        text-decoration: none;
        color: #2f7dfc;
        transition: 0.5s;
    }

    .singleFooterPart li span {
        color: #fff;
        transition: 0.5s;
    }

    .singleFooterPart li span:hover {
        color: #2f7dfc;
        transition: 0.5s;
        cursor: pointer;
    }

    .singleFooterPart li:nth-child(3) span {
        color: #2f7dfc;
        cursor: text;
    }

    .subscribe form {
        width: 100%;
    }

    .subscribe input {
        width: 80%;
        padding: 14px 15px;
        font-size: 13px;
        border: 1px solid #2f7dfc;
        background-color: transparent;
        color: #fff;
        outline: none;
    }

    .subscribe button {
        height: 50px;
        background-color: #2f7dfc;
        color: #fff;
        text-align: center;
        line-height: 10px;
        border: 2px solid #2f7dfc;
        padding: 14px 20px;
        transition: 0.5s;
        outline: none;
    }

    .subscribe button:active {
        background-color: #fff;
        color: #2f7dfc;
        border: 2px solid #fff;
        transition: 0.5s;
    }

    .socialMedia {
        display: flex;
        margin-top: 20px;
    }

    .socialMedia a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #1a1a1a;
        text-decoration: none;
        color: #fff;
        margin-right: 10px;
        transition: 0.5s;
    }

    .socialMedia a:hover {
        color: #1a1a1a;
        background-color: #fff;
        transition: 0.5s;
    }

    .copyright {
        margin-top: 20px;
        border-top: 1px solid #777;
        padding-top: 20px;
    }
</style>


<script>
    export default {
        name: "footerComponent",

        data() {
            return {
                copyrightYear: "",
            }
        },

        methods: {
            getCopyrightYear() {
                this.copyrightYear = new Date().getFullYear();
            },

            routerTo(categoryName) {
                this.$router.push({ path: '/shop', query: { category: categoryName } });
            },
        },

        created() {
            this.getCopyrightYear();
        },
    };
</script>