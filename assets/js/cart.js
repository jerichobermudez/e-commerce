const loadCart = () => {
  let cart = JSON.parse(localStorage.getItem('cart-items')) || [];
  let totalAmount = JSON.parse(localStorage.getItem('totalAmount')) || 0;
  let totalQuantity = JSON.parse(localStorage.getItem('totalQuantity')) || 0;

  $('nav').find('.item-count').html(totalQuantity);

  let cartItems = '';

  // Check if cart is not empty
  if (cart.length > 0) {
    $.each(cart, (key, item) => {
      cartItems += `
        <div class="col-8 p-0 mb-3">
          <div class="card rounded-0 m-0 shadow-0">
            <div class="card-body p-0">
              <div class="d-flex justify-content-between p-2">
                <div class="item-img">
                  <img src="assets/img/${item.image}" width="225">
                </div>
                <div class="item-info mx-2">
                  <p class="item-name fw-bold">${item.name}</p>
                  <p class="mb-0">Qty: <span class="item-quantity">${item.quantity}</span></p>
                  <p class="mb-0">Price: <span class="item-price">$${item.price}</span></p>
                </div>
              </div>
            </div>
            <div class="card-footer border-0 text-end py-2">
              <button class="btn btn-danger btn-sm rounded-0" onclick='removeItem(${item.id})'>Remove</button>
            </div>
          </div>
        </div>
        <div class="col-4 p-0">
          <div class="card rounded-0 m-0 shadow-0">
            <div class="card-body p-0">
              <div class="text-end me-3 p-2">
                <div class="item-price fw-bolder">$${item.total}</div>
              </div>
            </div>
          </div>
        </div><hr>`;
    });
  } else {
    cartItems = `
      <div class="col p-5">
        <span class="dropdown-item text-center pt-2 fw-bold">Your cart is empty.</span>
      </div>
    `;
  }

  // Update cart items
  $('main').find('.cart-items').html(cartItems);
  $('main').find('.subtotal').html(totalQuantity);
  $('main').find('.total, .estimated-total').html(`$${totalAmount}`);
}

const removeItem = (itemID) => {
  let message = `Are you sure you want to remove this item?\n\nThis action cannot be undone. Would you like to proceed?`;

  if (confirm(message)) {
    // Get the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart-items')) || [];
    
    // Find the item index in the cart
    const itemIndex = cart.findIndex(item => item.id === itemID);

    if (itemIndex !== -1) {
      // Remove the item from the cart
      cart.splice(itemIndex, 1);

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

      alert(`Item removed!`);

      // Reload cart to update the item listed
      loadCart();
    } else {
      alert('Item not found in the cart!');
    }
  }
}

loadCart();