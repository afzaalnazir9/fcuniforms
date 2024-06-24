ACDiscountApp.CartPage.Show_CalculateTier = function () {
let flag = false;
 var UpdateCartItem = function (item, updatedItemPrice, updatedLinePrice, isNotInRange, isUpdate, index) {
          if (isUpdate) {
          var originalItemPrice = globalFields.ConvertToFixedDecimalNumber(item.original_price / 100), originalLinePrice = globalFields.ConvertToFixedDecimalNumber(item.original_line_price / 100);
          var condition1 = updatedItemPrice == originalItemPrice;
          updatedItemPrice = globalFields.ConvertToFixedDecimalString(updatedItemPrice), updatedLinePrice = globalFields.ConvertToFixedDecimalString(updatedLinePrice);
          if (isNotInRange || condition1) {
        
          if(item.original_price == item.discounted_price){
         /* itemcart*/ jQuery('.t4s-cartPage__items .t4s-cart_meta_prices').eq(index).html('<div><span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + updatedItemPrice + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(updatedItemPrice, globalFields.amount) + '</span></div>');
         /* D*/ jQuery('.t4s-drawer__main .t4s-mini_cart__info .t4s-mini_cart__meta').eq(index).html('<div><span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + updatedItemPrice + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(updatedItemPrice, globalFields.amount) + '</span></div>');
          }
          else{
          /* itemcart*/ jQuery('.t4s-cartPage__items .t4s-cart_meta_prices').eq(index).html('<div><span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + updatedItemPrice + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(updatedItemPrice, globalFields.amount) + '</span></div>');
          }
          
          jQuery('.t4s-cartPage__items .t4s-cart-item-price').eq(index).html('<div><span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + updatedLinePrice + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(updatedLinePrice, globalFields.amount) + '</span></div>');
          jQuery('.drawer__inner .cart-item__totals.right').eq(index).html('<div><span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + updatedLinePrice + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(updatedLinePrice, globalFields.amount) + '</span></div>');
          }
          else {
          originalItemPrice = globalFields.ConvertToFixedDecimalString(originalItemPrice), originalLinePrice = globalFields.ConvertToFixedDecimalString(originalLinePrice);
        
          if(item.original_price == item.discounted_price){
          /* itemcart*/ jQuery('.t4s-cartPage__items .t4s-cart_meta_prices').eq(index).html('<div class="cart-item__original-price"><s><span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + originalItemPrice + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(originalItemPrice, globalFields.amount) + '</span></s></div> <div><span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + updatedItemPrice + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(updatedItemPrice, globalFields.amount) + '</span></div>');
         /* D*/ jQuery('.t4s-drawer__main .t4s-mini_cart__info .t4s-mini_cart__meta').eq(index).html('<div class="cart-item__original-price"><s><span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + originalItemPrice + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(originalItemPrice, globalFields.amount) + '</span></s></div> <div><span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + updatedItemPrice + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(updatedItemPrice, globalFields.amount) + '</span></div>');
          
          }
          else{
         /* itemcart*/  jQuery('.t4s-cartPage__items .t4s-cart_meta_prices').eq(index).html('<div class="cart-item__original-price"><s><span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + originalItemPrice + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(originalItemPrice, globalFields.amount) + '</span></s></div> <div><span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + updatedItemPrice + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(updatedItemPrice, globalFields.amount) + '</span></div>');
          }
            
          jQuery('.t4s-cartPage__items .t4s-cart-item-price').eq(index).html('<div class="cart-item__original-price"><s><span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + originalLinePrice + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(originalLinePrice, globalFields.amount) + '</span></s></div> <div style="margin-left:5px"><span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + updatedLinePrice + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(updatedLinePrice, globalFields.amount) + '</span></div>');
          jQuery('.drawer__inner .cart-item__totals.right').eq(index).html('<div class="cart-item__original-price"><s><span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + originalLinePrice + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(originalLinePrice, globalFields.amount) + '</span></s></div> <div style="margin-left:5px"><span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + updatedLinePrice + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(updatedLinePrice, globalFields.amount) + '</span></div>');
          }
          }
           jQuery('.t4s-cart_discount_price').remove();
    }  


   var UpdateCartSubtotal = function (isUpdate, updatedTotalPrice, originalTotalPrice) {
       if (isUpdate) {
           updatedTotalPrice = globalFields.ConvertToFixedDecimalString(updatedTotalPrice), originalTotalPrice = globalFields.ConvertToFixedDecimalString(originalTotalPrice);
           if (originalTotalPrice != updatedTotalPrice) {
               jQuery('.t4s-drawer__bottom .t4s-col-auto.t4s-text-right').html('<s><span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + originalTotalPrice + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(originalTotalPrice, globalFields.amount) + '</span></s> <span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + updatedTotalPrice + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(updatedTotalPrice, globalFields.amount) + '</span>');
               jQuery('.t4s-cartPage__footer .t4s-cart__ttprice').html('<s><span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + originalTotalPrice + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(originalTotalPrice, globalFields.amount) + '</span></s> <span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + updatedTotalPrice + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(updatedTotalPrice, globalFields.amount) + '</span>');
           }
           else {
           jQuery('.t4s-drawer__bottom .t4s-col-auto.t4s-text-right').html('<span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + updatedTotalPrice + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(updatedTotalPrice, globalFields.amount) + '</span>');
           jQuery('.t4s-cartPage__footer .t4s-cart__ttprice').html('<span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + updatedTotalPrice + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(updatedTotalPrice, globalFields.amount) + '</span>');
           }
       }
   }

   var UpdateSavingMessage = function (isUpdate) {
       if (priceDiff > 0 && isUpdate && globalFields.isCartPage) {
           var saveMessage = globalFields.settings.cart_saving_message.replace('{{discount_amount}}', '<span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + priceDiff.toFixed(2) + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(priceDiff.toFixed(2), globalFields.amount) + '</span>');
           var saveHtml = '<span id="saved-banner">' + saveMessage + '</span>';
         if (jQuery(window).width() < 700) {
           jQuery('#saved-banner-div').length == 0 ? jQuery('.t4s-cartPage__footer  .t4s-cart-total').after('<div id="saved-banner-div" style="text-align: center;" class="col-md-14">' + saveHtml + '</div>') : jQuery('#saved-banner-div').html(saveHtml);
         }
         else{
           jQuery('#saved-banner-div').length == 0 ? jQuery('.t4s-cartPage__footer  .t4s-cart-total').after('<div id="saved-banner-div" style="text-align: end;" class="col-md-14">' + saveHtml + '</div>') : jQuery('#saved-banner-div').html(saveHtml);
         }
       }
       else if (globalFields.isCartPage) {
           jQuery('#saved-banner-div').remove();
       }
   }

   var CheckoutClickCart = function () {
     $('.t4s-cartPage__footer   .t4s-btn-group__checkout-update button[name="checkout"]').removeClass('t4s-btn__checkout');
       jQuery('.t4s-cartPage__footer   .t4s-btn-group__checkout-update button[name="checkout"]').click(function () {
           TieredPricingCart(globalFieldsCartPage_AC.cartObj, false);
           GetCode(false);
       });
   }

   var CheckoutClickAjax = function () {
    jQuery('.t4s-drawer__bottom button[name="checkout"]').click(function (e) {
        e.preventDefault();
        GetCode(true);
    });
}   

   var GetCode = function (isUpper) {
       if (priceDiff > 0 && !flag) {
           jQuery.ajax({
               type: "POST", async: false, url: "https://customerapp.anncode.com/tier/ACPGenerateDiscountCode",
               data: { priceDifference: priceDiff, subTotal: minimumDiscountSubtotal, variantIds: variantIdsToSend.toString() },
               success: function (result) {
                  flag = true;
                   var data_ = JSON.stringify(result); var parsed_data = JSON.parse(data_); var PRID = parsed_data.PRID;
                   var DCID = parsed_data.DCID; var DiscountCode = parsed_data.DiscountCode;
                   SetCookie("discountCodes", PRID + "-" + DCID + "-" + DiscountCode, 30);
                   if (!isUpper) {
                       DiscountCodeCookie(DiscountCode);
                       jQuery('form[action="/cart"]').append('<input id="discount_input" type="hidden" name="discount" value="' + DiscountCode + '">');
                         window.location.href = '/checkout?discount=' + DiscountCode;
                   } else {
                       DiscountCodeCookie(DiscountCode);
                       //jQuery('form.cart-form').append('<input id="discount_input" type="hidden" name="discount" value="' + DiscountCode + '">');
                       window.location.href = '/checkout?discount=' + DiscountCode;
                   }
               },
               error: function (e) { console.log(e.statusText); window.location.href = '/checkout'; }
           });
       }
       else if (isUpper) {
           window.location.href = '/checkout';
       }
     else{
       window.location.href = '/checkout';
     }
   }

   var ReInvokeAjaxCartButton = function () {
       jQuery('.mb_cart.mb_item button.btn, .top-header .dropdown-cart button.btn').off("click"); CheckoutClickAjax();
   }

   var variantIdsToSend = [], minimumDiscountSubtotal = 0, priceDiff = 0;
     var hide_buttons = null;
     var HideAdditionalPayments = function() {      
     hide_buttons = setInterval(function() {
       if(jQuery('.additional_checkout_buttons, .dynamic-checkout__content').length>0){
         jQuery('.additional_checkout_buttons, .dynamic-checkout__content').hide();
         clearInterval(hide_buttons);
       }
     }, 500);
   }
 
   var TieredPricingCart = function (cartObject, isUpdate) {
       variantIdsToSend = []; minimumDiscountSubtotal = 0; priceDiff = 0; var updatedTotalPrice = 0;
       for (k = 0; k < cartObject.items.length; k++) {
           var item = cartObject.items[k], isInRange = true; itemTiers = GetTiersFromTiersArray(item.variant_id);
         if (itemTiers != undefined && itemTiers.status && globalFields.StartEndDateValid(itemTiers.start_date, itemTiers.end_date)) {
           
           let DiscountAppliedOn = itemTiers.DiscountAppliedON != null &&  itemTiers.DiscountAppliedON  != '' &&  itemTiers.DiscountAppliedON != undefined ? true : false;
           let Location_Tag_s = itemTiers.Location_Tag_ != null &&  itemTiers.Location_Tag_  != '' &&  itemTiers.Location_Tag_ != undefined ? true : false;
              if(DiscountAppliedOn){
               if(Location_Tag_s){
                  let DiscountAppliedOnTag =itemTiers.DiscountAppliedON == 'Both_Store' || itemTiers.DiscountAppliedON == 'Online_Store' ? true : false;
                  let LocationObject = Object.keys(itemTiers.Location_Tag_);
                  if(LocationObject[0] == 'StoreLocation'){
                   let StoreLocationcheck =  itemTiers.Location_Tag_[LocationObject[0]].includes(globalFields.Storecountry) || itemTiers.Location_Tag_[LocationObject[0]].includes(globalFields.Storecity) ? true : false;
                   if(StoreLocationcheck && DiscountAppliedOnTag){
                       var rslt = CalculateTier(item, itemTiers, updatedTotalPrice, isUpdate, true, k);
                       updatedTotalPrice = rslt[0]; isInRange = rslt[1];
                       if (rslt[1]) {
                       updatedTotalPrice += globalFields.ConvertToFixedDecimalNumber(item.original_line_price / 100);
                       }
                     }else{
                     updatedTotalPrice += globalFields.ConvertToFixedDecimalNumber(item.original_line_price / 100);
                     }
                  }else{
                  let TierLocation = itemTiers.Location_Tag_[LocationObject[0]];
                  let CusotmerCountryLocation = globalFields.Customercountry;
                  let CusotmerCityLocation = globalFields.Customercity;
                  let CustomerLocationcheck_1 = (arr, arr1) =>{return arr.some(item => arr1.includes(item))};
                  let CustomerLocationcheck_2 = (arr2, arr3) =>{return arr2.some(item => arr3.includes(item))};
                  let CityValue = CustomerLocationcheck_1(TierLocation,CusotmerCountryLocation);
                  let CountryValue = CustomerLocationcheck_2(TierLocation,CusotmerCityLocation);
                    if(DiscountAppliedOnTag && (CityValue || CountryValue)){
                       var rslt = CalculateTier(item, itemTiers, updatedTotalPrice, isUpdate, true, k);
                       updatedTotalPrice = rslt[0]; isInRange = rslt[1];
                       if (rslt[1]) {
                       updatedTotalPrice += globalFields.ConvertToFixedDecimalNumber(item.original_line_price / 100);
                       }
                    }else{
                      updatedTotalPrice += globalFields.ConvertToFixedDecimalNumber(item.original_line_price / 100);
                    }
                  }
                                                  
                }else{
                 if(itemTiers.DiscountAppliedON == 'Both_Store' || itemTiers.DiscountAppliedON == 'Online_Store' ){
                  var rslt = CalculateTier(item, itemTiers, updatedTotalPrice, isUpdate, true, k);
                 updatedTotalPrice = rslt[0]; isInRange = rslt[1];
                 if (rslt[1]) {
                 updatedTotalPrice += globalFields.ConvertToFixedDecimalNumber(item.original_line_price / 100);
                 }
                }else{
                   updatedTotalPrice += globalFields.ConvertToFixedDecimalNumber(item.original_line_price / 100);
                }
                }
                
              }else{
               var rslt = CalculateTier(item, itemTiers, updatedTotalPrice, isUpdate, true, k);
               updatedTotalPrice = rslt[0]; isInRange = rslt[1];
               if (rslt[1]) {
               updatedTotalPrice += globalFields.ConvertToFixedDecimalNumber(item.original_line_price / 100);
               }
                
              }

           
            }
           else {
            UpdateCartItem(item, globalFields.ConvertToFixedDecimalNumber(item.original_price / 100), globalFields.ConvertToFixedDecimalNumber(item.original_line_price / 100), true, true, k);
            updatedTotalPrice += globalFields.ConvertToFixedDecimalNumber(item.original_line_price / 100);
           }
         
           if (!isInRange) {
               minimumDiscountSubtotal += globalFields.ConvertToFixedDecimalNumber(item.original_line_price / 100); variantIdsToSend.push(item.variant_id);
           }
       }
       UpdateCartSubtotal(isUpdate, globalFields.ConvertToFixedDecimalNumber(updatedTotalPrice), globalFields.ConvertToFixedDecimalNumber(cartObject.original_total_price / 100));
       priceDiff = globalFields.ConvertToFixedDecimalNumber((globalFields.ConvertToFixedDecimalNumber(cartObject.original_total_price / 100) - globalFields.ConvertToFixedDecimalNumber(updatedTotalPrice)));
       UpdateSavingMessage(isUpdate);
       jQuery('#cart-notification button[name="checkout"],.drawer__footer button[name="checkout"]').text('\n            Check out\n          ');
       jQuery('.cart__checkout-button.button').text('\n            Check out\n          ');
         if(priceDiff){
         HideAdditionalPayments();
       }
         setTimeout(function(){
         clearInterval(hide_buttons);
       }, 5000);
   }
setTimeout(function(){
     clearInterval(hide_buttons);
   }, 10000);
   
   var GetTiersFromTiersArray = function (variantId) {
       var tierObj = jQuery.grep(globalFieldsCartPage_AC.cartTiersArray, function (n) { return (n.variant_id === variantId); });
       if (tierObj[0].tiers == "[]") {
           return undefined;
       }
       else {
           return globalFields.GetTierObject(tierObj[0].tiers[0], variantId);
       }
   }

   var CalculateTier = function (item, itemTiers, updatedTotalPrice, isUpdate, isNotInRange, index) {
       for (i = 0; i < itemTiers.tier_min.length; i++) {
           var allVariantItemQty = 0;
           var tierPrice = parseFloat(itemTiers.tier_values[i]);
           var minTier = parseInt(itemTiers.tier_min[i]), maxTier = itemTiers.tier_max[i] != 'max' ? parseInt(itemTiers.tier_max[i]) : itemTiers.tier_max[i];
           var updatedItemPrice = 0, updatedLinePrice = 0, condition1 = false, condition2 = false;

           if (itemTiers.entity_type === 'products' || itemTiers.entity_type === 'collections') {
               var tempItemArray = [];
               if (itemTiers.entity_type === 'collections') {
                   var tempTierArray = jQuery.grep(globalFieldsCartPage_AC.cartTiersArray, function (n) { return (n.tiers != '[]' && n.tiers[0].entity_type == 'collections' && n.tiers[0].entity_id == itemTiers.entity_id); });
                   for (var m = 0; m < tempTierArray.length; m++) {
                       var temp = jQuery.grep(globalFieldsCartPage_AC.cartObj.items, function (n) { return (n.variant_id == tempTierArray[m].variant_id); });
                       if (temp.length != 0) {
                           tempItemArray.push(temp[0]);
                       }
                   }
               }
               else {
                   tempItemArray = jQuery.grep(globalFieldsCartPage_AC.cartObj.items, function (n) { return (n.product_id == item.product_id ); });
               }

               for (j = 0; j < tempItemArray.length; j++) { allVariantItemQty += tempItemArray[j].quantity; }
               condition1 = allVariantItemQty >= minTier;
               condition2 = maxTier == "max" || allVariantItemQty <= maxTier;
           }
           else {
               condition1 = item.quantity >= minTier;
               condition2 = maxTier == "max" || item.quantity <= maxTier;
           }

           if (condition1 && condition2) {
               isNotInRange = false;
               if (itemTiers.discount_type == 'percentage') {
                   var originalPriceCut = parseFloat(globalFields.ConvertToFixedDecimalNumber((parseFloat(tierPrice) / 100) * globalFields.ConvertToFixedDecimalNumber(item.original_price / 100)));
                   updatedItemPrice = globalFields.ConvertToFixedDecimalNumber(globalFields.ConvertToFixedDecimalNumber(item.original_price / 100) - originalPriceCut);
               }
               else if (itemTiers.discount_type == 'fixed') {
                   updatedItemPrice = globalFields.ConvertToFixedDecimalNumber(globalFields.ConvertToFixedDecimalNumber(item.original_price / 100) - parseFloat(tierPrice));
               }
               else if (itemTiers.discount_type == 'fixed_price') {
                   updatedItemPrice = globalFields.ConvertToFixedDecimalNumber(parseFloat(tierPrice));
               }

               if (updatedItemPrice < 0) { updatedItemPrice = 0; }
               updatedLinePrice = globalFields.ConvertToFixedDecimalNumber(updatedItemPrice * item.quantity);
               updatedTotalPrice += globalFields.ConvertToFixedDecimalNumber(updatedLinePrice);
               UpdateCartItem(item, updatedItemPrice, updatedLinePrice, isNotInRange, isUpdate, index);
           }
       }
       if (isNotInRange) {
           UpdateCartItem(item, globalFields.ConvertToFixedDecimalNumber(item.original_price / 100), globalFields.ConvertToFixedDecimalNumber(item.original_line_price / 100), isNotInRange, isUpdate, index);
       }
       return [updatedTotalPrice, isNotInRange];
   }

   var DiscountCodeCookie = function (discount_code) {
       jQuery.ajax({
           type: "HEAD", url: "/discount/" + discount_code,
           success: function (_result) { },
           error: function (e) { console.log(e.statusText); }
       })
   }

   // var FetchCartTiers = function () {
   //   if(globalFields.isProduct_Page){
   //     setTimeout(() => {
   //        let result = globalFields.productTiers();
   //        globalFieldsCartPage_AC.cartTiersArray.push(result);
   //        const uniqueArray = Array.from(new Set(globalFieldsCartPage_AC.cartTiersArray.map(obj => obj.variant_id))).map(variant_id => globalFieldsCartPage_AC.cartTiersArray.find(obj => obj.variant_id === variant_id));
   //        globalFieldsCartPage_AC.cartTiersArray = uniqueArray;
   //        jQuery('#cart-notification button[name="checkout"],.drawer__footer button[name="checkout"]').text('\n            Loading..\n          ');
   //        jQuery('.cart__checkout-button.button').text('\n            Loading..\n          ');
   //       TieredPricingCart(globalFieldsCartPage_AC.cartObj, true); CheckoutClickAjax();
   //     }, 800);
   //      }else{
   //     TieredPricingCart(globalFieldsCartPage_AC.cartObj, true); CheckoutClickAjax();
   //      }
   // }
      var FetchCartTiers = function () {
        jQuery.ajax({
            async: false,
            url: "/cart/?view=ac_cart_tiers",
            success: function (result) {
                globalFieldsCartPage_AC.cartTiersArray = JSON.parse(result);
                TieredPricingCart(globalFieldsCartPage_AC.cartObj, true);
            },
            error: function (e) { console.log(e.statusText); }
        });
    }
   /*
       var open = window.XMLHttpRequest.prototype.open, send = window.XMLHttpRequest.prototype.send, onReadyStateChange;
       function openReplacement(method, url, async, user, password) { return open.apply(this, arguments); }
       function sendReplacement(data) {
           this.onreadystatechange = function () {
               if (this.readyState == 4 && this.status == 200) {
                   ProcessCartResponse(this._url, this.responseText);
               }
           };
           return send.apply(this, arguments);
       }
       window.XMLHttpRequest.prototype.open = openReplacement; window.XMLHttpRequest.prototype.send = sendReplacement;
   */
   jQuery(document).ajaxComplete(function (event, xhr, settings) {
       ProcessCartResponse(settings.url, xhr.responseText);
   });

   var ProcessCartResponse = function (splittedUrl, responseText) {
       if (splittedUrl != 'undefined' && splittedUrl != "" && splittedUrl != null) {
           splittedUrl = splittedUrl.split("?");
           if (splittedUrl[0] == "/cart.js" || splittedUrl[0] == "/cart/change.js") {
                jQuery('#cart-notification button[name="checkout"],.drawer__footer button[name="checkout"]').text('\n            Loading...\n          ');
                jQuery('.cart__checkout-button.button').text('\n            Loading...\n          ');
               globalFieldsCartPage_AC.cartObj = JSON.parse(responseText);
               setTimeout(function () {
                   FetchCartTiers();
                   CheckoutClickAjax();
               }, 1200);
           }
       }
   }

   try{
       var nativeFetch = window.fetch;
       window.fetch = function(...args) {
         if(args[0].includes("/cart/change") || args[0].includes("/cart/add")){
           setTimeout(function () {
             fetch('/cart.js')
             .then(r =>  r.json().then(data => ({status: r.status, body: data})))
             .then(obj => ProcessCartResponse("/cart.js", JSON.stringify(obj.body)));
           }, 800);
         }
         return nativeFetch.apply(window, args);
       }
     }
     catch(e){}


    var CheckoutClickAjaxPopUp = function () {
      FetchCartTiers();
      
    // jQuery('.cart-item__quantity button[name="plus"],.cart-item__quantity button[name="minus"]').click(function (e) {
    // setTimeout(function () {
    // 
    // }, 800);
    // });
    }
    async function handleDiscount() {
        try {
          const response = await fetch("/discount/CLEAR");
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const contentType = response.headers.get("Content-Type");
      
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            // Continue processing or updating the UI as needed
          } else {
            $(".t4s-order-discount__item").remove();
            // Handle non-JSON content, such as HTML or other types
            // console.error("Unexpected content type:", contentType);
            // Handle specific error scenarios or display a user-friendly message
          }
        } catch (error) {
          // Handle errors
          // console.error("Error fetching discount:", error.message);
          // Handle specific error scenarios or display a user-friendly message
        }
      }
      
      // Call the function to initiate the fetch and handle the promise
      handleDiscount();
     setTimeout(function () {
             TieredPricingCart(globalFieldsCartPage_AC.cartObj, true); CheckoutClickCart(); CheckoutClickAjax();CheckoutClickAjaxPopUp();
           }, 1800);
   var SetCookie = function (cname, cvalue, exdays) { var d = new Date(); d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000)); var expires = "expires=" + d.toUTCString(); document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"; }
       $('.t4s-cartPage__footer   .t4s-btn-group__checkout-update button[name="checkout"]').removeClass('t4s-btn__checkout');

   TieredPricingCart(globalFieldsCartPage_AC.cartObj, true); CheckoutClickCart(); CheckoutClickAjax();CheckoutClickAjaxPopUp();
}

var globalFieldsCartPage_AC = new ACDiscountApp.CartPage.Global(); var cartObject = new ACDiscountApp.CartPage.Show_CalculateTier();