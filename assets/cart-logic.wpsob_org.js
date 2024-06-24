
// $(document).on('click', '.t4s-quantity-selector', function() {
//     setTimeout(() => {

//     // const productQty = $('#quantity').val();
//     //   if (productQty) {
//     //     console.log('New product qty',productQty);
//     //     let newPrice = window.wholesale_prices.filter(i => Number(productQty) >= Number(i.minQty));
//     //   newPrice = newPrice.sort((a, b) => Number(b.minQty) - Number(a.minQty));
//     //   newPrice = newPrice[0].price;
//     //   console.log(newPrice);
//     //   setTimeout(() => $('.t4s-product-price').html(`$${newPrice}`), 100);
//     //   }
      
//     const price = $('.t4s-cart__totalPrice').html();
//     console.log(price);
//     let priceInt = Number(price.split('$')[1].split(' ')[0]);
//     const remaining = 100 - priceInt;
//         console.log(remaining, typeof remaining);
//     if (remaining > 0) {
// 	const message = `You are <b>$${Number(remaining).toFixed(2)}</b> away from free shipping!<br>`;
//         $("#free-shipping-message").html(message);
//         $("#qualify-message").fadeIn('slow');
//     } else {

//         const message = `You qualify for free shipping!<br>`;
//         $("#free-shipping-message").html(message);
//              $("#qualify-message").fadeOut('fast');
//    }
//     }, 1000);

// });


// $('#quantity').change(function() {
//     setTimeout(() => {
//       const newQuantity = $('#quantity').val();
//       console.log('New quantity', newQuantity);
//       let newPrice = window.wholesale_prices.filter(i => Number(newQuantity) >= Number(i.minQty));
//       newPrice = newPrice.sort((a, b) => Number(b.minQty) - Number(a.minQty));
//       newPrice = newPrice[0].price;
//       console.log(newPrice);
//       setTimeout(() => $('.t4s-product-price').html(`$${newPrice}`), 100);

//     }, 50);

// });