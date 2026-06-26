import"./assets/styles-JE8YjOlG.js";import{a as n}from"./assets/vendor-N5iQpiFS.js";function d(t,e,o){t.forEach(s=>{s.classList.remove(o)}),e.classList.add(o)}const g="https://dummyjson.com",a={CATEGORIES:"/products/category-list",PRODUCTS:"/products"};n.defaults.baseURL=g;function _(){return n.get(a.CATEGORIES).then(({data:t})=>t)}function p(){return n.get(a.PRODUCTS).then(({data:t})=>t)}const c={categoriesList:document.querySelector(".categories"),productsList:document.querySelector(".products")};function m(t){const o=["All",...t].map(r=>`<li class="categories__item">
        <button class="categories__btn" type="button">${r}</button>
      </li>`).join("");c.categoriesList.innerHTML=o;const s=document.querySelector(".categories__btn");s&&s.classList.add("categories__btn--active")}function L(t){const e=t.map(({id:o,thumbnail:s,title:r,brand:i,category:l,price:u})=>`<li class="products__item" data-id="${o}">
          <img class="products__image" src="${s}" alt="${r}" />
          <p class="products__title">${r}</p>
          <p class="products__brand">
            <span class="products__brand--bold">Brand: ${i}</span>
          </p>
          <p class="products__category">Category: ${l}</p>
          <p class="products__price">Price: ${u}$</p>
        </li>`).join("");c.productsList.insertAdjacentHTML("beforeend",e)}function f(){_().then(t=>{m(t)}).catch(t=>{console.log("помилка запиту сторiнки home",t)}),p().then(({products:t})=>{console.log(t),L(t)}).catch(t=>{console.log("помилка рендеру продуктiв")})}function b(t){const e=t.target.closest(".categories__btn");if(console.log(e),!e)return;const o=c.categoriesList.querySelectorAll(".categories__btn");d(o,e,"categories__btn--active")}document.addEventListener("DOMContentLoaded",f);c.categoriesList.addEventListener("click",b);
//# sourceMappingURL=index.js.map
