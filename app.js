import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyC0enY6cPbRzvBJ6GWEgwnPn0ZQFYeZU7Y",
    authDomain: "salleeprod.firebaseapp.com",
    projectId: "salleeprod",
    storageBucket: "salleeprod.appspot.com",
    messagingSenderId: "411805577535",
    appId: "1:411805577535:web:4e95101ada525671d5638a",
    measurementId: "G-V79WMHS82L",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Select tag
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const listProduct = $(".list-product");
const listCategorySub = $(".sub-mobile-category-list")
const listCategory = $(".mobile-category-list")
const listCategoryDesktop = $(".category-list")
const webApp = {
    loadProduct: async function () {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products =
            querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
        const html = products.map((product, index) => {
            return `
            <div class="col l-2-4 m-4 c-6 ">
            <a href="" class="home-product-item">
                <div class="home-product-item__img"
                    style="background-image: url(${product.avatar})">
                </div>
                <h4 class="home-product-item__name">${product.name} </h4>
                <div class="home-product-item-price">
                    <span class="home-product-item-price-old">${product.original_price_value}</span>
                    <span class="home-product-item-price-current">${product.current_price_value
                }</span>
                </div>
                <div class="home-product-item-action">
                    <!-- home-product-item-icon-like--liked -->
                    <span class="home-product-item-like home-product-item-icon-like--liked">
                        <i class="home-product-item-like-icon-empty far fa-heart"></i>
                        <i class="home-product-item-like-icon-fill fas fa-heart"></i>

                    </span>
                    <div class="home-product-item-rate">
                    ${product.original_rating_point}
                        <i class="home-product-item-rate__star--gold fas fa-star"></i>
                        <i class="home-product-item-rate__star--gold fas fa-star"></i>
                        <i class="home-product-item-rate__star--gold fas fa-star"></i>
                        <i class="home-product-item-rate__star--gold fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <span class="home-product-item-sold">
                        Đã bán 157
                    </span>

                </div>

                <div class="home-product-item-origin">
                    <span class="home-product-item-brand">
                        ${product.product_vendor_name}
                    </span>

                    <span class="home-product-item-origin-name">${product.product_type_name
                }</span>
                </div>

                <div class="home-product-item__favourite">
                    <i class="fas fa-check"></i>
                    Yêu thích
                </div>

                <div class="home-product-item__saleoff">
                    <span class="home-product-item-saleoff-percent">${((product.original_price_value - product.current_price_value) / product.original_price_value * 100).toFixed(0)} %</span>

                    <span class="home-product-item-saleoff-percent-lable">GIẢM</span>
                </div>


            </a>


        </div>`
        })
        listProduct.innerHTML = html.join("");
    },
    loadProductType: async function () {
        const querySnapshot = await getDocs(collection(db, "product_types"));
        const productTypes =
            querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
        const htmlSubCategory = productTypes.map((productType, index) => {
            return `
            <li class="sub-mobile-category-item sub-mobile-category-item--active">
                <a href="" class="sub-mobile-category-item__link">${productType.name}</a>
            </li>
            `
        });
        const htmlCategory = productTypes.map((productType, index) => {
            return `<li class="mobile-category-item">
            <a href="" class="mobile-category-link">${productType.name}</a>
        </li>`
        });
        const htmlCategoryDesktop = productTypes.map((productType, index) => {
            return `<li class="category-item">
            <a href="" class="category-item__link"><i
            class="${index === 0 ? "category-item--active-icon fas fa-caret-right" : ""
                } "></i>${productType.name}</a>
        </li>`
        });
        listCategorySub.innerHTML = htmlSubCategory.join("")
        listCategory.innerHTML = htmlCategory.join("")
        listCategoryDesktop.innerHTML = htmlCategoryDesktop.join("")
    },
    start: function () {
        this.loadProduct();
        this.loadProductType();
    },

}

window.addEventListener("load", function () {
    webApp.start();
});