EventCaller();
equalHeight(true);
Cart();

const navbarToggler = document.querySelector(".navbar-toggler");
const navbarMenu = document.querySelector(".navbar ul");
const navbarLinks = document.querySelectorAll(".navbar a");

navbarToggler.addEventListener("click", navbarTogglerClick);

function navbarTogglerClick() {
  navbarToggler.classList.toggle("open-navbar-toggler");
  navbarMenu.classList.toggle("open");
}

navbarLinks.forEach(elem => elem.addEventListener("click", navbarLinksClick));

function navbarLinksClick() {
  if (navbarMenu.classList.contains("open")) {
    navbarToggler.click();
  }
}

function EventCaller() {
  const searchRestaurantButton = document.querySelector("#search-restaurant");
  const searchSortimentButton = document.querySelector("#search-sortimente");
  const searchRestaurant = document.querySelector("#Search");
  const searchSortiment = document.querySelector("#Search_sortiment");
  const modalCartOpen = document.querySelector("#modal-open");
  const modalDetailsOpen = document.querySelector(".restaurant-info");
  const modalCloseButton = document.querySelectorAll(".close");

  if (searchRestaurantButton && searchSortimentButton != null) {
    searchRestaurantButton.addEventListener("click", searchPlaceholderShow);
    searchSortimentButton.addEventListener(
      "click",
      searchSortimentPlaceholderShow
    );
    searchRestaurant.addEventListener("keyup", search_restaurant);
    searchSortiment.addEventListener("keyup", search_sortiment);
  }
  if (modalCartOpen && modalCloseButton && modalDetailsOpen != null) {
    modalCartOpen.addEventListener("click", modalCart);
    modalDetailsOpen.addEventListener("click", modalDetalii);
    for (let i = 0; i < modalCloseButton.length; i++)
      modalCloseButton[i].addEventListener("click", closeModal);
    sortimentSelect();
    sortimentSelectBar();
  }

  document.addEventListener("scroll", scrollNavbar);
}

function sortimentSelect() {
  const SortimentTitle = document.querySelectorAll(".sortim-title");

  for (let i = 0; i < SortimentTitle.length; i++) {
    SortimentTitle[i].addEventListener("click", function() {
      const sortiment = document.querySelectorAll(".sortim");
      if (sortiment[i].style.display != "block") {
        sortiment[i].style.display = "block";
      } else {
        sortiment[i].style.display = "none";
      }
    });
  }
}

function sortimentSelectBar() {
  const SortimentBar = document.querySelectorAll(".restaurant-item");

  for (let i = 0; i < SortimentBar.length; i++) {
    SortimentBar[i].addEventListener("click", function() {
      const sortiment = document.querySelectorAll(".sortim");
      for (let all = 0; all < sortiment.length; all++)
        sortiment[all].style.display = "none";
      sortiment[i].style.display = "block";
    });
  }
}

function searchPlaceholderShow() {
  const SearchRestaurant = document.getElementById("Search");
  const SearchSortiment = document.getElementById("Search_sortiment");

  if (SearchRestaurant.style.display == "block") {
    SearchRestaurant.style.display = "none";
  } else {
    SearchRestaurant.style.display = "block";
    SearchSortiment.style.display = "none";
  }
}

function searchSortimentPlaceholderShow() {
  const SearchRestaurant = document.getElementById("Search");
  const SearchSortiment = document.getElementById("Search_sortiment");

  if (SearchSortiment.style.display == "block") {
    SearchSortiment.style.display = "none";
  } else {
    SearchSortiment.style.display = "block";
    SearchRestaurant.style.display = "none";
  }
}

// search
function search_restaurant() {
  const input = document.getElementById("Search");
  const filter = input.value.toLowerCase();
  const nodes = document.getElementsByClassName("rest-name");
  const hids = document.getElementsByClassName("rest-div");

  for (i = 0; i < nodes.length; i++) {
    if (nodes[i].innerText.toLowerCase().includes(filter)) {
      hids[i].style.display = "block";
    } else {
      hids[i].style.display = "none";
    }
  }
}

function search_sortiment() {
  const input = document.getElementById("Search_sortiment");
  const filter = input.value.toLowerCase();
  const nodes = document.getElementsByClassName("rest-sortiment");
  const hids = document.getElementsByClassName("rest-div");

  for (i = 0; i < nodes.length; i++) {
    if (nodes[i].innerText.toLowerCase().includes(filter)) {
      hids[i].style.display = "block";
    } else {
      hids[i].style.display = "none";
    }
  }
}

// modal cos
function modalCart() {
  const modal = document.getElementById("myModal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("myModal");
  const modal_detalii = document.getElementById("detalii");

  modal.style.display = "none";
  modal_detalii.style.display = "none";
}

window.addEventListener("click", function(event) {
  const modal = document.querySelector("#myModal");
  const modal_detalii = document.querySelector("#detalii");
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == modal_detalii) {
    modal_detalii.style.display = "none";
  }
});

function modalDetalii() {
  const modal_detalii = document.getElementById("detalii");
  modal_detalii.style.display = "block";
}

// CARRT
function Cart() {
  const addToCart = document.querySelectorAll(".add-to-cart");
  for (let i = 0; i < addToCart.length; i++) {
    const button = addToCart[i];
    button.addEventListener("click", addItemToCartClick);
  }
}

function addItemToCartClick(event) {
  const button = event.target;
  const shopitem = button.parentNode.parentNode;
  if (shopitem != null) {
    var title = shopitem.getElementsByClassName("item-title")[0].innerText;
    var detalii = shopitem.getElementsByClassName("item-detalii")[0].innerText;
    var pret = shopitem.getElementsByClassName("item-price")[0].innerText;
  }
  addItemToCart(title, pret, detalii);
  updateTotal();
}

function addItemToCart(title, pret, detalii) {
  const cartitem = document.createElement("div");
  cartitem.classList.add("produse-cos");
  const cartContainer = document.getElementsByClassName("cos-produs")[0];
  const cartItemName = cartContainer.getElementsByClassName("item-title");
  for (let i = 0; i < cartItemName.length; i++) {
    if (cartItemName[i].innerText == title) {
      alert("Deja adaugat");
      return;
    }
  }
  const cartitemscont = `<div class="produs-info">
  <h2 class="item-title">${title}</h2>
  <p class="item-info">${detalii}</p>
  </div>
  <p class="produs-pret">${pret}</p>
  <div class="produs-cantitate">
  <input class="produs-numar" onkeydown="return event.keyCode !== 69" value="1"  type="number" min="1" max="20"/>
  <button class="btn-remove" type="button">&times;</button>
  </div>`;
  cartitem.innerHTML = cartitemscont;
  cartContainer.appendChild(cartitem);
  cartitem
    .getElementsByClassName("btn-remove")[0]
    .addEventListener("click", removeItem);
  cartitem
    .getElementsByClassName("produs-numar")[0]
    .addEventListener("change", changeQuantity);
}

function removeItem(event) {
  const buttonClicked = event.target;
  buttonClicked.parentNode.parentNode.remove();
  updateTotal();
}

function changeQuantity(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  } else if (input.value > 20) {
    input.value = 20;
  } else if (input.value % 1 !== 0) {
    input.value = parseInt(input.value);
  }
  updateTotal();
}

function updateTotal() {
  const cartItemContainer = document.getElementsByClassName("cos-produs")[0];
  const CartItems = cartItemContainer.getElementsByClassName("produse-cos");
  let total = 0;
  for (let i = 0; i < CartItems.length; i++) {
    const CartItem = CartItems[i];
    const pretProduse = CartItem.getElementsByClassName("produs-pret")[0];
    const numarProduse = CartItem.getElementsByClassName("produs-numar")[0];
    const pret = parseFloat(pretProduse.innerText.replace("RON", ""));
    const cantitate = numarProduse.value;
    total = total + pret * cantitate;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("final-price")[0].innerText = total + " RON";
}

// resize
window.addEventListener("resize", function resize() {
  // modal resize
  const cartResize = document.querySelector("#myModal");
  const cosOpen = document.querySelector("#modal-open");
  const gridSet = document.querySelectorAll(".grid-item");
  const RecomandariSize = document.querySelectorAll(".daily-text p");
  if (cartResize && cosOpen != null) {
    if (window.matchMedia("(min-width: 1150px)").matches) {
      cartResize.style.display = "block";
      cosOpen.style.display = "none";
    } else {
      cartResize.style.display = "none";
      cosOpen.style.display = "block";
    }
  }
  // slider fix
  if (gridSet && gridSet[1] && gridSet[2] != null) {
    if (window.matchMedia("(min-width: 1150px)").matches) {
      for (let i = 0; i < gridSet.length; i++) {
        gridSet[i].style.display = "grid";
      }
      equalHeight(true);
    }
    if (window.matchMedia("(max-width: 1150px)").matches) {
      gridSet[0].style.display = "grid";
      gridSet[1].style.display = "grid";
      gridSet[2].style.display = "none";
      equalHeight(true);
    }
    if (window.matchMedia("(max-width: 760px)").matches) {
      gridSet[0].style.display = "grid";
      gridSet[1].style.display = "none";
      gridSet[2].style.display = "none";
      for (let i = 0; i < RecomandariSize.length; i++) {
        RecomandariSize[i].style.height = "65px";
      }
    }
  }
});

function equalHeight(resize) {
  const RecomandariSize = document.querySelectorAll(".daily-text p"),
    allHeights = [];

  if (resize === true) {
    for (let i = 0; i < RecomandariSize.length; i++) {
      RecomandariSize[i].style.height = "auto";
    }
  }
  for (let i = 0; i < RecomandariSize.length; i++) {
    const elementHeight = RecomandariSize[i].clientHeight;
    allHeights.push(elementHeight);
  }
  for (let i = 0; i < RecomandariSize.length; i++) {
    RecomandariSize[i].style.height = Math.max.apply(Math, allHeights) + "px";
  }
}

// slider
let slideIndex = 1;
showSlider(slideIndex);

function plusDivs(n) {
  showSlider((slideIndex += n));
}

function showSlider(n) {
  const gridSet = document.querySelectorAll(".grid-item");
  const RecomandariSize = document.querySelectorAll(".daily-text p");
  if (gridSet && RecomandariSize != null) {
    if (window.matchMedia("(max-width: 760px)").matches) {
      if (n > gridSet.length) {
        slideIndex = 1;
      }
      if (n < 1) {
        slideIndex = gridSet.length;
      }
      for (let i = 0; i < gridSet.length; i++) {
        gridSet[i].style.display = "none";
      }
      if (gridSet[slideIndex - 1] && RecomandariSize[slideIndex - 1] != null) {
        gridSet[slideIndex - 1].style.display = "grid";
        RecomandariSize[slideIndex - 1].style.height = "65px";
      }
    }
  }
}

function scrollNavbar() {
  const navbarMenu = document.querySelector(".navbar ul");
  const navbarToggler = document.querySelector(".navbar-toggler");
  if (document.querySelector(".open") != null) {
    navbarToggler.classList.toggle("open-navbar-toggler");
    navbarMenu.classList.toggle("open");
  }
}

const FooterSelect = document.querySelectorAll(".copyrights_support p");
for (let i = 0; i < FooterSelect.length; i++)
  FooterSelect[i].addEventListener("click", function() {
    if ([i] == 0) alert("Contact us at 0782.322.321");
    if ([i] == 1) alert("Copyright Dumnezeu 2019");
  });
