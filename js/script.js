$(document).ready(function () {
  let carts = document.querySelectorAll('.add-cart');

  let products = [
    {
      Name: 'Chicken Hawaiia',
      tag: 'chicken-hawaiian',
      price: 400,
      inCart: 0
    },
    {
      Name: 'Roast Veg & Feta',
      tag: 'Roast-Veg-&-Feta',
      price: 650,
      inCart: 0
    },
    {
      Name: 'Meat Deluxe',
      tag: 'Meat-Deluxe',
      price: 450,
      inCart: 0
    },
    {
      Name: 'Chicken Macon BBQ',
      tag: 'Chicken-Macon-BBQ',
      price: 750,
      inCart: 0
    },
    {
      Name: 'Cheese Burger',
      tag: 'Cheese-Burger',
      price: 500,
      inCart: 0
    },
    {
      Name: 'Chicken & Beef Pepperoni',
      tag: 'Chicken-&-Beef-Pepperoni',
      price: 550,
      inCart: 0
    },
    {
      Name: 'Spicy-Boerewors',
      tag: 'Spicy-Boerewors',
      price: 1400,
      inCart: 0
    },
    {
      Name: 'Chicken & Beef Pepperoni',
      tag: 'Chicken-&-Beef-Pepperoni',
      price: 600,
      inCart: 0
    },
    {
      Name: 'Pizaa With Green And Red Pepper and Cheese',
      tag: 'green-and-red-pepper',
      price: 1450,
      inCart: 0
    },
    {
      Name: 'Sliced Pizza',
      tag: 'Sliced-Pizza',
      price: 850,
      inCart: 0
    },
    {
      Name: 'Beef Pizza',
      tag: 'Beef-Pizza',
      price: 1500,
      inCart: 0
    },
    {
      Name: 'Sliced Pizza with Red Sauce',
      tag: 'Sliced-Red-Sauce',
      price: 2500,
      inCart: 0
    },
    {
      Name: 'Pizza with Grren Leaves on Top',
      tag: 'Pizza-with-Grren-Leaves-on-Top',
      price: 1600,
      inCart: 0
    },
    {
      Name: 'Pizza With Cheese and Tomatoes',
      tag: 'Cheese-and-Tomatoes',
      price: 1050,
      inCart: 0
    },
    {
      Name: 'Sliced Vegetable Pizza',
      tag: 'Sliced-Vegetable-Pizza',
      price: 1300,
      inCart: 0
    }
  ]
  for (let i = 0; i < carts.length; i++) {
    //add an event listener
    carts[i].addEventListener('click', () => {
      cartNumbers(products[i]);
      totalCost(products[i]);
    })
  }
  function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
      document.querySelector('.cart-count').textContent = productNumbers;
    }
  }
  function cartNumbers(product) {
    console.log("The product clicked is", product);
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
      localStorage.setItem('cartNumbers', productNumbers + 1);
      document.querySelector('.cart-count').textContent = productNumbers + 1;

    }
    else {
      localStorage.setItem('cartNumbers', 1);
      document.querySelector('.cart-count').textContent = 1;
    }
    setItems(product);
  }
  function setItems(product) {
    let catItems = localStorage.getItem('ProductInCart');
    catItems = JSON.parse(catItems);
    if (catItems != null) {
      if (catItems[product.tag] == undefined) {
        catItems = {
          ...catItems,
          [product.tag]: product
        }

      }
      catItems[product.tag].inCart += 1;
    }
    else {
      catItems = {
        [product.tag]: product
      }

      product.inCart = 1;

    }

    localStorage.setItem("ProductInCart", JSON.stringify(catItems));
  }
  function totalCost(product) {
    console.log("The price of this product is ", product.price);
    let cartCost = localStorage.getItem('TotalCost');
    if (cartCost != null) {
      cartCost = parseInt(cartCost);
      localStorage.setItem("TotalCost", cartCost + product.price);
    }
    else {
      localStorage.setItem("TotalCost", product.price);
    }
  }
  function DisplayCart() {
    let items = localStorage.getItem("ProductInCart");
    items = JSON.parse(items);
    console.log(items);
    let productContainer = document.querySelector(".product-item");
    let cartCost = localStorage.getItem('TotalCost');

    if(items && productContainer)
    {
        productContainer.innerHTML='';
        Object.values(items).map(item =>{
          productContainer.innerHTML += `
          <div class="product">
            <ion-icon name="close-circle-outline"></ion-icon>
            <img src=".../img/${item.tag}.jpg" alt="">
            <span>${item.Name}</span>
        </div>
        <div class="price">${item.price}</div>
        <div class="quantity">
        <ion-icon name="caret-back-outline"></ion-icon>
        <span>${item.inCart}</span>
        <ion-icon name="caret-forward-outline"></ion-icon>
        </div>
        <div class="total">${item.inCart * item.price}</div>
          `;
          
        });
        productContainer.innerHTML +=`
        <h4 class="basketTotal">The Total is ${cartCost}</h4>
        `

    }
  }

  onLoadCartNumbers();
  DisplayCart();
});

