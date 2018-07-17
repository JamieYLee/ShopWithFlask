// global variables
var cart = []

// displays all items through loo[]
function displayItems(response){
  //intialize output and length vars
  let output = '';
  let length = response.length;

  // loop through response
  for(var i=0; i<length; i++){
    output += `<div class="col-md-3 col-sm-3 product">
      <div class="row">
        <img src="http://placehold.it/200x200" alt="${response[i].name}">
      </div>
      <div class="row">
        <h4 class="prod_name">${response[i].name}</h4>
      </div>
      <div class="row">
        <h5 class="amount">$${response[i].price.toFixed(2)}</h5>
      </div>
      <div class="row">
        <button class="btn btn-primary" onclick="addToCart(${response[i].id})">Add to Cart</button>
      </div>
    </div>`;
  }

  // add output to prod_section
  $('#prod_section').html(output);
}

// gets products from json file
$.getJSON('../../assets/products.json', displayItems);

// add to cart
function addToCart(id){
  $.getJSON('./assets/products.json', function(response){
    $.each(response, function(index, product){
      if(product.id == id){
        cart.push(product);
        displayTotal();
        displayCart();
      }
    })
  });
}

// remove from cart
function removeFromCart(id){
  for(var i=0; i<cart.length; i++){
    if(cart[i].id == id){
      cart.splice(i, 1);
      displayTotal();
      displayCart();
      break;
    }
  }
}

function calcTotal(){
  let total = 0;
  $.each(cart, function(index, product){
    total += product.price;
  });
  return total;
}

// displays cart total
function displayTotal(){
  let total = calcTotal();

  $('#nav_total').html(`<a href="#">Cart Total: $${total.toFixed(2)}</a>`);
}

// displays cart
function displayCart(){
  console.log(cart);
  let output = '';
  duplicates = [];

  output += `<tr class="table_head">
    <th>#</th>
    <th>Your Items</th>
    <th>Price</th>
  </tr>`;

  $.each(cart, function(index, product){
    let flag = false;

    for(var j=0; j<duplicates.length; j++){
      if(product.id == duplicates[j]){
        flag = true;
        break;
      }
    }

    if(flag == false){
      output += `<tr class="cart_items">
      <td>${checkDuplicates(product.id)}</td>
      <td>${product.name}</td>
      <td>$${product.price} <span onclick="removeFromCart(${product.id})" class="badge pull-right">X</span></td>
      </tr>`;
    }
    duplicates.push(product.id);
  });

  output += `<tr class="cart_total">
    <th colspan="3">Total: $${calcTotal().toFixed(2)}</th>
  </tr>`;

  $('#cart').html(output);
}

function checkDuplicates(id){
  let count = 0;

  $.each(cart, function(index, product){
    if(product.id == id){
      count++;
    }
  });

  return count;
}
