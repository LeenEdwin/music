//Imported Data

const menuArray = [
  {
    name: "Pizza",
    ingredients: ["pepperoni", "mushrom ", "mozarella "],
    id: 0,
    price: 14,
    emoji: "🍕"
  },
  {
    name: "Hamburger",
    ingredients: ["beef", "cheese", "lettuce"],
    price: 12,
    emoji: "🍔",
    id: 1
  },
  {
    name: "Beer",
    ingredients: ["grain, hops, yeast, water"],
    price: 12,
    emoji: "🍺",
    id: 2
  }
];

//Feed Code

//import {menuArray} from './data.js';

const checkout = document.getElementById("checkout");
const modal = document.getElementById("modal");
const orderBtn = document.getElementById("order-btn");
const modalTwo = document.getElementById("modal-2");
const name = document.getElementById("name");

let cartArray = [];

document.addEventListener("click", function(e) {
  if (e.target.dataset.addButton) {
    handleAddItemClick(Number(e.target.dataset.addButton));
    console.log(cartArray)
  } else if (e.target.dataset.remove) {
    handleRemoveItemClick(Number(e.target.dataset.remove));
  } else if (e.target.dataset.order) {
    modal.style.display = "flex";
    console.log("Order placed")
  } else if (e.target.dataset.pay) {
    handleUserMsg();
  }
});

function handleAddItemClick(itemId) {
  checkout.style.display = "flex";
  // gets the matching item and puts it into cartArray
  const clickedItem = menuArray.filter(function (menuItems) {
    return menuItems.id === itemId;
  })[0];
  cartArray.push(clickedItem);
  handleForEach();
  console.log(clickedItem)
}

function handleRemoveItemClick(removeItemId) {
  let totalPriceArray = [];
  let invoiceHtml = ``;
  let totalPrice = 0;
  const clickedCartItem = cartArray.filter(function(orderedItems, index) {
    return index === removeItemId;
  })[0];
  cartArray.splice(removeItemId, 1);
  handleForEach();
}

function handleForEach() {
  let totalPriceArray = [];
  let invoiceHtml = ``;
  let totalPrice = 0;
  cartArray.forEach(function (orderedItem, index) {
    invoiceHtml += `
                        <div class="item-invoice">
                            <div class="remove-wpr">
                                <h2 class="item-invoice-name">${orderedItem.name}</h2>
                                <button class="remove-btn" 
                                data-remove="${index}">remove</button>
                            </div>
                            <h3 class="item-invoice-price">$${orderedItem.price}</h3>
                        </div>
                    `;
      totalPriceArray.push(orderedItem.price);
    });

    // this is the for code to get our total price
   for (let i = 0; i < totalPriceArray.length; i++) {
      totalPrice = totalPrice + totalPriceArray[i];
    }
    let totalHtml = `
          <h2 class="total-price-string">Total price:</h2>
          <h3 class="total-price">$${totalPrice}</h3>
      `;
    // this renders our code to the respective sections/containers
    document.getElementById("item-invoices").innerHTML = invoiceHtml;
    document.getElementById("total").innerHTML = totalHtml;
}

function renderMenu() {
  let itemsFeed = ``;
  menuArray.forEach(function (menuItem) {
    itemsFeed += `
      <div class="items">
        <div class="items-wpr">
            <h1 class="item-emoji">${menuItem.emoji}</h1>
               <div class="item-disc">
                  <h2 class="item-name">${menuItem.name}</h2>
                      <p1 class="item-ingr">${menuItem.ingredients}</p1>
                         <h3 class="item-price">$${menuItem.price}</h3>
                </div>
           </div>
     <button id="add-item" class="add-item" data-add-button="${menuItem.id}">+</button>
      </div>
                `;
  });
  document.getElementById("items").innerHTML = itemsFeed;
}

renderMenu();