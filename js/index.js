import { gameProductsArray } from "./array/arr.js";
import { indexSections, itemAddedDisplay } from "./containers/containers.js";
import { getCartItems } from "./cart/cartFunctions.js";

let itemCount = 0;
const addButton = document.querySelectorAll(".btn-price i");
const url = "https://imdev.no/wp-json/wc/store/products";

async function getWooProducts() {
  try {
    const response = await fetch(url);
    const result = await response.json();

    for (let index = 0; index < result.length; index++) {
      const games = result[index];
      const gameImagesArray = games.images;

      for (let index = 0; index < gameImagesArray.length; index++) {
        const gamesImages = gameImagesArray[index];

        indexSections.forEach(
          (indexSections) =>
            (indexSections.innerHTML += `<div class="product-list-item">
                                                  <div>
                                                      <a href="product-screen.html">
                                                      <img class="home-page-images" src="${gamesImages.src}" alt="picture of game">
                                                      <h3>${games.name}</h3>
                                                      <p>Seller: ${games.seller} <i class="fa-solid fa-circle-check"></i></p>
                                                      <p class="platform">${games.platform} <i class="fa-brands fa-windows"></i></p>
                                                      </a>
                                                  </div>
                                                  <div class="btn-price">
                                                      <i data-id="${games.id}" data-title="${games.name}" data-price="${games.prices.price}" data-platform="${games.platform}" data-image="${games.image}" class="buy-btn fa-solid fa-cart-plus"></i>
                                                      <h4>${games.price_html},-</h4>
                                                  </div>
                                              </div>`)
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
}

getWooProducts();

addButton.forEach((button) => {
  button.addEventListener("click", addItem);
});

function addItem() {
  const id = this.dataset.id;
  const title = this.dataset.title;
  const price = this.dataset.price;
  const platform = this.dataset.platform;
  const image = this.dataset.image;

  const currentItems = getCartItems();

  const gameDuplicate = currentItems.find(function (game) {
    return game.id === id;
  });

  if (!gameDuplicate) {
    const gameProduct = {
      id: id,
      title: title,
      price: price,
      platform: platform,
      image: image,
    };
    currentItems.push(gameProduct);
    saveAddedGames(currentItems);

    itemCount++;
    itemAddedDisplay.innerHTML =
      `<i class="fa-solid fa-cart-shopping"></i>` + itemCount;
  } else {
    alert("This item has already been added.");
  }
}

function saveAddedGames(cartItems) {
  localStorage.setItem("addedGames", JSON.stringify(cartItems));
}

// for (let index = 0; index < gameProductsArray.length; index++) {
//   const games = gameProductsArray[index];

//   indexSections.forEach(
//     (indexSections) =>
//       (indexSections.innerHTML += `<div class="product-list-item">
//                                         <div>
//                                             <a href="product-screen.html">
//                                             <img class="home-page-images" src="${games.image}" alt="picture of game">
//                                             <h3>${games.title}</h3>
//                                             <p>Seller: ${games.seller} <i class="fa-solid fa-circle-check"></i></p>
//                                             <p class="platform">${games.platform} <i class="fa-brands fa-windows"></i></p>
//                                             </a>
//                                         </div>
//                                         <div class="btn-price">
//                                             <i data-id="${games.id}" data-title="${games.title}" data-price="${games.price}" data-platform="${games.platform}" data-image="${games.image}" class="buy-btn fa-solid fa-cart-plus"></i>
//                                             <h4>${games.price},-</h4>
//                                         </div>
//                                     </div>`)
//   );
// }
