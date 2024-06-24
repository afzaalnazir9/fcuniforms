ACDiscountApp.CartPage.Show_CalculateTier = function () {
    var UpdateCartItem = function (item, updatedItemPrice, updatedLinePrice, isUpdate, index) {
        if (isUpdate) {
            var originalItemPrice = globalFields.ConvertToFixedDecimalNumber(item.original_price / 100), originalLinePrice = globalFields.ConvertToFixedDecimalNumber(item.original_line_price / 100);
            var condition1 = updatedItemPrice == originalItemPrice;
            updatedItemPrice = globalFields.ConvertToFixedDecimalString(updatedItemPrice), updatedLinePrice = globalFields.ConvertToFixedDecimalString(updatedLinePrice);
            if (condition1) {
/* Uncomment for unit price strike off */
//                 jQuery('.cart__price dd[data-cart-item-regular-price]').eq(index).html('<div><span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + updatedItemPrice + '" data-currency="' + globalFields.currency + '">' + globalFields.currencySymbol + updatedItemPrice + '</span></div>');
//                 jQuery('form[action="/cart"] tbody tr:eq(' + index + ') td:eq(3) div:first').html('<div><span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + updatedLinePrice + '" data-currency="' + globalFields.currency + '">' + globalFields.currencySymbol + updatedLinePrice + '</span></div>');
            }
            else {
                originalItemPrice = globalFields.ConvertToFixedDecimalString(originalItemPrice), originalLinePrice = globalFields.ConvertToFixedDecimalString(originalLinePrice);
//                 jQuery('.cart__price dd[data-cart-item-regular-price]').eq(index).html('<s><span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + originalItemPrice + '" data-currency="' + globalFields.currency + '">' + globalFields.currencySymbol + originalItemPrice + '</span></s></div> <div><span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + updatedItemPrice + '" data-currency="' + globalFields.currency + '">' + globalFields.currencySymbol + updatedItemPrice + '</span>');
//                 jQuery('form[action="/cart"] tbody tr:eq(' + index + ') td:eq(3) div:first').html('<s><span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + originalLinePrice + '" data-currency="' + globalFields.currency + '">' + globalFields.currencySymbol + originalLinePrice + '</span></s></div> <div><span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + updatedLinePrice + '" data-currency="' + globalFields.currency + '">' + globalFields.currencySymbol + updatedLinePrice + '</span>');
            }
        }
    }

   
    var UpdateCartSubtotal = function (isUpdate, updatedTotalPrice, originalTotalPrice) {
        if (isUpdate) {
            updatedTotalPrice = globalFields.ConvertToFixedDecimalString(updatedTotalPrice), originalTotalPrice = globalFields.ConvertToFixedDecimalString(originalTotalPrice);
            if (originalTotalPrice != updatedTotalPrice) {
                jQuery('.js-contents .totals .totals__subtotal-value').html('<s><span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + originalTotalPrice + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(originalTotalPrice, globalFields.amount) + '</span></s> <span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + updatedTotalPrice + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(updatedTotalPrice, globalFields.amount) + '</span>');
               jQuery('.drawer__footer .cart-drawer__footer .totals .totals__subtotal-value').html('<s><span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + originalTotalPrice + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(originalTotalPrice, globalFields.amount) + '</span></s> <span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + updatedTotalPrice + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(updatedTotalPrice, globalFields.amount) + '</span>');
            }
            else {
              jQuery('.js-contents .totals .totals__subtotal-value').html('<span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + updatedTotalPrice + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(updatedTotalPrice, globalFields.amount) + '</span>');
              jQuery('.drawer__footer .cart-drawer__footer .totals .totals__subtotal-value').html('<span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + updatedTotalPrice + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(updatedTotalPrice, globalFields.amount) + '</span>');
            }
        }
    }
  
     var UpdateSavingMessage = function (isUpdate) {
        if (priceDiff > 0 && isUpdate && globalFields.isCartPage) {
            var saveMessage = globalFields.settings.cart_saving_message.replace('{{discount_amount}}', '<span class="money" data-currency-' + globalFields.currency.toLowerCase() + '="' + globalFields.currencySymbol + priceDiff.toFixed(2) + '" data-currency="' + globalFields.currency + '">' + globalFields.formatMoney(priceDiff.toFixed(2), globalFields.amount) + '</span>');
            var saveHtml = '<span id="saved-banner">' + saveMessage + '</span>';
          if (jQuery(window).width() < 700) {
            jQuery('#saved-banner-div').length == 0 ? jQuery('.js-contents .totals').after('<div id="saved-banner-div" style="text-align: center;" class="col-md-14">' + saveHtml + '</div>') : jQuery('#saved-banner-div').html(saveHtml);
          }
          else{
            jQuery('#saved-banner-div').length == 0 ? jQuery('.js-contents .totals').after('<div id="saved-banner-div" style="text-align: end;" class="col-md-14">' + saveHtml + '</div>') : jQuery('#saved-banner-div').html(saveHtml);
          }
        }
        else if (globalFields.isCartPage) {
            jQuery('#saved-banner-div').remove();
        }
    }
  
    var CheckoutClickCart = function () {
        jQuery('.cart__footer .cart__ctas button[name="checkout"]').click(function () {
            // jQuery('[name="updates[]"]').each(function () {
            //     var qtyValue = this.value; var idAtrbtValue = jQuery(this).attr('id'); idAtrbtValue = idAtrbtValue.split('_'); idAtrbtValue = idAtrbtValue[1];
            //     idAtrbtValue = idAtrbtValue.split(':'); idAtrbtValue = idAtrbtValue[0];
            //     for (i = 0; i < globalFieldsCartPage_AC.cartObj.items.length; i++) {
            //         if (globalFieldsCartPage_AC.cartObj.items[i].variant_id == Number(idAtrbtValue)) { globalFieldsCartPage_AC.cartObj.items[i].quantity = Number(qtyValue); }
            //     }
            // });
            TieredPricingCart(globalFieldsCartPage_AC.cartObj, false);
            GetCode(false);
        });
    }

    var CheckoutClickAjax = function () {
        jQuery('.drawer__footer .cart__ctas button[name="checkout"]').click(function (e) {
            e.preventDefault();
            GetCode(true);
        });
    }

    var GetCode = function (isUpper) {
        if (priceDiff > 0) {
            $.ajax({
                type: "POST", async: false, url: "https://customerapp.anncode.com/tier/ACPGenerateCartCode",
              	data: { discountOff: priceDiff, subTotal: minimumDiscountSubtotal, discounType: "fixed_amount" },
                success: function (result) {
                  try{
                    if(result.status != 'error' || result.DiscountCode){
                      var data_ = JSON.stringify(result); var parsed_data = JSON.parse(data_); var PRID = parsed_data.PRID;
                      var DCID = parsed_data.DCID; var DiscountCode = parsed_data.DiscountCode;
                      SetCookie("discountCodes", PRID + "-" + DCID + "-" + DiscountCode, 30);
                      if (!isUpper) {
                          DiscountCodeCookie(DiscountCode);
                          jQuery('form[action="/cart"]').append('<input id="discount_input" type="hidden" name="discount" value="' + DiscountCode + '">');
                      } else {
                          DiscountCodeCookie(DiscountCode);
                          //jQuery('form.cart-form').append('<input id="discount_input" type="hidden" name="discount" value="' + DiscountCode + '">');
                          window.location.href = '/checkout?discount=' + DiscountCode;
                      }
                    }
                    else{ 
                      window.location.href = '/checkout';
                    }
                  }
                  catch(e){console.log(e);}
                },
                error: function (e) { console.log(e.statusText); }
            });
        }
        else if (isUpper) {
            window.location.href = '/checkout';
        }
    }

    var ReInvokeAjaxCartButton = function () {
        jQuery('.mb_cart.mb_item button.btn, .top-header .dropdown-cart button.btn').off("click"); CheckoutClickAjax();
    }

    var variantIdsToSend = [], minimumDiscountSubtotal = 0, priceDiff = 0;

    var TieredPricingCart = function (cartObject, isUpdate) {
        variantIdsToSend = []; minimumDiscountSubtotal = 0; priceDiff = 0; var updatedTotalPrice = 0; var actualTotalPrice = 0;
        var tierObj = globalFieldsCartPage_AC.cartSubTotalMetafield;
         let DiscountAppliedOnTag = true;
          if(tierObj != undefined && tierObj != "[]"){
           DiscountAppliedOnTag = tierObj.DiscountAppliedON != undefined ?  tierObj.DiscountAppliedON == 'Both_Store' || tierObj.DiscountAppliedON == 'Online_Store' ? true : false : false;
          }else{
           DiscountAppliedOnTag = false; 
          }
        if (tierObj != undefined && tierObj != "[]" && tierObj.status && DiscountAppliedOnTag && globalFields.StartEndDateValid(tierObj.start_date, tierObj.end_date)) {
            var calculatedTier = CalculateTierCartSubTotal(tierObj, globalFieldsCartPage_AC.is_quantity_total, true);
            if (!calculatedTier[3]) {
                for (k = 0; k < globalFieldsCartPage_AC.cartTiersArray.length; k++) {
                    var item = globalFieldsCartPage_AC.cartTiersArray[k];
                    actualTotalPrice += globalFields.ConvertToFixedDecimalNumber(item.item.original_line_price / 100);
                    if (!item.is_exclude) {
                        variantIdsToSend.push(item.item.variant_id);
                    }
                    if (tierObj.discount_type == 'percentage') {
                        var rslt = CalculateTier(item.item, calculatedTier[2], tierObj, isUpdate, k);
                    }
                }
              minimumDiscountSubtotal = actualTotalPrice;
                updatedTotalPrice = actualTotalPrice - calculatedTier[5];
                UpdateCartSubtotal(isUpdate, globalFields.ConvertToFixedDecimalNumber(updatedTotalPrice), globalFields.ConvertToFixedDecimalNumber(actualTotalPrice));
                priceDiff = calculatedTier[5];
                UpdateSavingMessage(isUpdate);
            }

        }
    }

    var CalculateTierCartSubTotal = function (tiers, is_quantity_total, isNotInRange) {
        var eligibleItems = jQuery.grep(globalFieldsCartPage_AC.cartTiersArray, function (n) { return !n.is_exclude; });
        var allVariantItemQty = 0;
        var eligibleSubtotal = 0;
        var discount_total = 0;
        for (j = 0; j < eligibleItems.length; j++) {
            allVariantItemQty += eligibleItems[j].item.quantity;
            eligibleSubtotal += globalFields.ConvertToFixedDecimalNumber(eligibleItems[j].item.original_line_price / 100);
        }
        var tierPrice = 0, minTier = 0, maxTier = '';
        for (i = 0; i < tiers.tier_min.length; i++) {
            tierPrice = parseFloat(tiers.tier_values[i]);
            minTier = parseInt(tiers.tier_min[i]), maxTier = tiers.tier_max[i] != 'max' ? parseInt(tiers.tier_max[i]) : tiers.tier_max[i];
            var condition1 = false, condition2 = false;
            if (is_quantity_total) {
                condition1 = allVariantItemQty >= minTier;
                condition2 = maxTier == "max" || allVariantItemQty <= maxTier;
            } else {
                condition1 = eligibleSubtotal >= minTier;
                condition2 = maxTier == "max" || eligibleSubtotal <= maxTier;
            }

            if (condition1 && condition2) {
                isNotInRange = false;
                if (tiers.discount_type == 'percentage') {
                    discount_total = parseFloat(globalFields.ConvertToFixedDecimalNumber((parseFloat(tierPrice) / 100) * globalFields.ConvertToFixedDecimalNumber(eligibleSubtotal)));
                }
                else if (tiers.discount_type == 'fixed') {
                    discount_total = globalFields.ConvertToFixedDecimalNumber(parseFloat(tierPrice));
                }
                break;
            }
        }
        return [minTier, maxTier, tierPrice, isNotInRange, eligibleSubtotal, discount_total];
    }

    var CalculateTier = function (item, tierPrice, itemTiers, isUpdate, index) {
        var updatedItemPrice = 0, updatedLinePrice = 0;
        if (itemTiers.discount_type == 'percentage') {
            var originalPriceCut = parseFloat(globalFields.ConvertToFixedDecimalNumber((parseFloat(tierPrice) / 100) * globalFields.ConvertToFixedDecimalNumber(item.original_price / 100)));
            updatedItemPrice = globalFields.ConvertToFixedDecimalNumber(globalFields.ConvertToFixedDecimalNumber(item.original_price / 100) - originalPriceCut);
        }
        //else if (itemTiers.discount_type == 'fixed') {
        //    updatedItemPrice = globalFields.ConvertToFixedDecimalNumber(globalFields.ConvertToFixedDecimalNumber(item.original_price / 100) - parseFloat(tierPrice));
        //}

        if (updatedItemPrice < 0) { updatedItemPrice = 0; }
        updatedLinePrice = globalFields.ConvertToFixedDecimalNumber(updatedItemPrice * item.quantity);
        UpdateCartItem(item, updatedItemPrice, updatedLinePrice, isUpdate, index);
    }

    var DiscountCodeCookie = function (discount_code) {
        $.ajax({
            type: "HEAD", url: "/discount/" + discount_code,
            success: function (_result) { },
            error: function (e) { console.log(e.statusText); }
        })
    }

    var FetchCartTiers = function () {
        jQuery.ajax({
            async: false,
            url: "/cart/?view=ac_cart_subtotal_tiers",
            success: function (result) {
                globalFieldsCartPage_AC.cartTiersArray = JSON.parse(result);
                TieredPricingCart(globalFieldsCartPage_AC.cartObj, true);
                CheckoutClickCart(); CheckoutClickAjax();
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

    try {
        var nativeFetch = window.fetch;
        window.fetch = function (...args) {
          
            //     console.log('detected fetch call');
            //     console.log(args[0]);
            if(args[0].includes("/cart/change") || args[0].includes("/cart/add")){
                setTimeout(function () {
                    fetch('/cart.js')
                        .then(r => r.json().then(data => ({ status: r.status, body: data })))
                        .then(obj => ProcessCartResponse("/cart.js", JSON.stringify(obj.body)));
                }, 500);
            }
            return nativeFetch.apply(window, args);
        }
    }
    catch (e) { }

    var ProcessCartResponse = function (splittedUrl, responseText) {
      
        if (splittedUrl != 'undefined' && splittedUrl != "" && splittedUrl != null) {
            splittedUrl = splittedUrl.split("?");
            if (splittedUrl[0] == "/cart.js" || splittedUrl[0] == "/cart/change.js") {
                globalFieldsCartPage_AC.cartObj = JSON.parse(responseText);
                setTimeout(function () {
                    FetchCartTiers();
                }, 500);
            }
        }
    }

    var SetCookie = function (cname, cvalue, exdays) { var d = new Date(); d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000)); var expires = "expires=" + d.toUTCString(); document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"; }

    TieredPricingCart(globalFieldsCartPage_AC.cartObj, true); CheckoutClickCart(); CheckoutClickAjax();
}

var globalFieldsCartPage_AC = new ACDiscountApp.CartPage.Global(); var cartObject = new ACDiscountApp.CartPage.Show_CalculateTier();