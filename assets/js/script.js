const loadCart = () => {
  let cart = JSON.parse(localStorage.getItem('cart-items')) || [];
  let totalAmount = JSON.parse(localStorage.getItem('totalAmount')) || 0;
  let totalQuantity = JSON.parse(localStorage.getItem('totalQuantity')) || 0;

  // Update the cart overview
  if (totalQuantity > 0) {
    $('.cart-nav-item')
      .find('.badge-notification')
      .removeClass('d-none')
      .html(totalQuantity);

    $('.cart-overview').find('.count').html(totalQuantity);
    $('.cart-overview').find('.total').html(`$${totalAmount}`);
  }

  let cartItems = '';

  // Check if cart is not empty
  if (cart.length > 0) {
    $.each(cart, (key, item) => {
      cartItems += `
      <li>
        <div class="d-flex justify-content-between p-2">
          <div class="item-img">
            <img src="assets/img/${item.image}" width="120px">
          </div>
          <div class="item-info mx-2">
            <p class="item-name fw-bold">${item.name}</p>
            <p class="mb-0">Price: <span class="item-price">$${item.price}</span></p>
            <p class="mb-0">Qty: <span class="item-quantity">${item.quantity}</span></p>
            <p class="item-price fw-bold mt-2 mb-0">Total: $${item.total}</p>
          </div>
        </div>
      </li>
      <li><hr class="dropdown-divider" /></li>
      `
    });

    $('.cart-overview').find('.go-to-checkout').removeClass('d-none');
  } else {
    cartItems = `
      <li>
        <span class="dropdown-item text-center pt-2 fw-bold">Your cart is empty.</span>
      </li>
    `;

    $('.cart-overview').find('.go-to-checkout').addClass('d-none');
  }

  // Update cart overview
  $('.cart-overview').find('.cart-items').html(cartItems);
}

const addToCart = (itemId, itemName, imgSrc, price) => {
  // Get cart from localStorage or create a new array if it doesn't exist
  let cart = JSON.parse(localStorage.getItem('cart-items')) || [];
  
  // Check if the item already exists in the cart
  const existingItemIndex = cart.findIndex(item => item.id === itemId);

  if (existingItemIndex !== -1) {
    // If item exists, update the quantity and total price
    cart[existingItemIndex].quantity += 1;
    cart[existingItemIndex].total = cart[existingItemIndex].quantity * cart[existingItemIndex].price;
  } else {
    // If item does not exist, create a new item object
    const totalPrice = 1 * price;
    const newItem = {
      id: itemId,
      name: itemName,
      image: imgSrc,
      quantity: 1,
      price: price,
      total: totalPrice
    };

    // Add new item to the cart
    cart.push(newItem);
  }

  // Sum of all items
  let totalAmount = cart.reduce((acc, item) => acc + item.total, 0);

  // Round global total to 2 decimal places
  totalAmount = parseFloat(totalAmount.toFixed(2));

  // Total count of quantity in cart
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Save updated cart and global total back to localStorage
  localStorage.setItem('cart-items', JSON.stringify(cart));
  localStorage.setItem('totalAmount', JSON.stringify(totalAmount));
  localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity));

  // Update the cart overview
  if (totalQuantity > 0) {
    $('.cart-nav-item')
      .find('.badge-notification')
      .removeClass('d-none')
      .html(totalQuantity);

    $('.cart-overview').find('.count').html(totalQuantity);
    $('.cart-overview').find('.total').html(`$${totalAmount}`);
  }

  let cartItems = '';
  if (cart.length > 0) {
    $.each(cart, (key, item) => {
      cartItems += `
      <li>
        <div class="d-flex justify-content-between p-2">
          <div class="item-img">
            <img src="assets/img/${item.image}" width="120px">
          </div>
          <div class="item-info mx-2">
            <p class="item-name fw-bold">${item.name}</p>
            <p class="mb-0">Price: <span class="item-price">$${item.price}</span></p>
            <p class="mb-0">Qty: <span class="item-quantity">${item.quantity}</span></p>
            <p class="item-price fw-bold mt-2 mb-0">Total: $${item.total}</p>
          </div>
        </div>
      </li>
      <li><hr class="dropdown-divider" /></li>
      `
    });
    
    $('.cart-overview').find('.go-to-checkout').removeClass('d-none');
  }

  $('.cart-overview').find('.cart-items').html(cartItems);
}

// Load cart on page load
loadCart();