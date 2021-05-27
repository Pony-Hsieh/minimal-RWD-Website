# minimal 電商網站 作品說明
<br>

## 目錄
- [基本資訊](##基本資訊) 
- [使用套件](##使用套件) 
- [網頁功能](##網頁功能) 
- [待開發功能](##待開發功能) 
- [備註](##備註) 

<br>

---
<br>


## 基本資訊

* [GitHub Page](https://pony-hsieh.github.io/minimal-RWD-Website/dist/#/)

* [參考模板](https://colorlib.com/preview/#winter)

* [配色靈感](https://www.instagram.com/p/CLCCza3IjMs)

<br>

* 使用 Vue 2 開發；使用 Vue Cli 3 搭建專案

    下載完，解壓縮這個專案的壓縮檔後，記得先在終端機運行 
    <code> $ npm install </code>指令，把相關的套件安裝起來喔~

    如果沒安裝相關套件，就直接在終端機執行下面兩個指令的話，有可能會出錯：

    - 運行 開發環境 終端機指令：
    <code> $ npm run serve </code>

    - 運行 正式環境 終端機指令：
    <code> $ npm run build </code>

<br>

---
<br>



## 使用套件
<br>

可於 
[package.json](https://github.com/Pony-Hsieh/minimal-RWD-Website/blob/master/package.json) 
→ "dependencies" 查詢各套件使用版本

<br>

---
<br>



## 網頁功能
<br>

● 全體

1. Responsive Web Design (RWD) 響應式網頁設計，基本上都在 992px 變版(也就是 Bootstrap 4 的 lg)

    <br>

2. 搭配套件(vue-loading-overlay)，達成使用 AJAX 撈資料的過程中，有 loading 動畫的效果

    [動畫效果來源](https://loading.io/)
    
<br>
<br>


● [商城](https://pony-hsieh.github.io/minimal-RWD-Website/dist/#/shop)


1. 自行選擇一頁顯示的產品數量 (3、6、9)
    
    功能寫在 
    [Shop.vue](https://github.com/Pony-Hsieh/minimal-RWD-Website/blob/master/src/views/frontEnd/Shop.vue) 
    中的 getPage()

    <br>


2. 使用價格篩選產品

    功能寫在 
    [Shop.vue](https://github.com/Pony-Hsieh/minimal-RWD-Website/blob/master/src/views/frontEnd/Shop.vue) 
    中的 applyPriceFilter()

    <br>


3. 搭配套件(vue-slider-component)，達成透過滑動按鈕調整價格篩選區間的效果

<br>
<br>



● [購物車](https://pony-hsieh.github.io/minimal-RWD-Website/dist/#/member/cart)


1. 可透過輸入數字調整購物車內商品數量；

    如果輸入 0 ，會詢問消費者是否想要從購物車移除商品

    功能寫在 
    [Cart.vue](https://github.com/Pony-Hsieh/minimal-RWD-Website/blob/master/src/views/frontEnd/Cart.vue)
    中的 editLSCartQty(nowProduct)

    <br>


2. 即時驗證並提示使用者輸入的 coupon 是否可用

    可用 coupon：ALL_20_OFF

    功能寫在 
    [Cart.vue](https://github.com/Pony-Hsieh/minimal-RWD-Website/blob/master/src/views/frontEnd/Cart.vue)
    中的 judgeCoupon()

    <br>
    
    
3. 搭配套件(vee-validate)，即時驗證使用者輸入的資訊；並依據驗證結果提示使用者

<br>
<br>


● 其他

1. router 導航守衛，搭配 API 檢查使用者的登入狀況，並據此導引至不同頁面

    功能寫在 [main.js](https://github.com/Pony-Hsieh/minimal-RWD-Website/blob/master/src/main.js) 
    中的 router.beforeEach 那段
    
    <br>


2. 透過 router 轉址時傳遞參數(query)

    許多頁面都有實作此功能，例如 
    [Shop.vue](https://github.com/Pony-Hsieh/minimal-RWD-Website/blob/master/src/views/frontEnd/Shop.vue) 
    中的 toSingleProductPage(id)

    <br>


3. eventBus 跨元件通訊

    <br>


4. 使用 Bootstrap 搭配手刻 RWD

    例如： 手刻 RWD 漢堡選單；寫在 
    [HeaderComponent.vue](https://github.com/Pony-Hsieh/minimal-RWD-Website/blob/master/src/components/HeaderComponent.vue)、
    [headerComponent.scss](https://github.com/Pony-Hsieh/minimal-RWD-Website/blob/master/src/assets/scss/components/headerComponent.scss)
    中

    <br>


5. 使用 SCSS 管理 CSS 樣式

<br>

---
<br>



## 待開發功能
<br>

* 收藏商品功能

<br>

---
<br>



## 備註
<br>

如果對於修改前的網站有興趣，可前往參考。

[GitHub Page](https://pony-hsieh.github.io/vue-final-homework-2020.12.30/dist/#/)

[網頁原始碼](https://github.com/Pony-Hsieh/vue-final-homework-2020.12.30)



