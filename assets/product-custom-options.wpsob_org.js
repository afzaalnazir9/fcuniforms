jQuery(function ($) {
  'use strict';
  console.log('custom js...');

  let chestPatchAmount = 0;
  let leftChestPatchAmount = 0;
  let rightChestPatchAmount = 0;
  let backPatchAmount = 0;
  let shoulderPatchAmount = 0;
  let leftShoulderPatchAmount = 0;
  let rightShoulderPatchAmount = 0;
  let totalExtraAmount = 0;
  let stockBadgeEngraving = false;
  let hemming = false;

  var baseProductCost = 0;

  // let totalFires = 0;

    function getNewBaseProductCost() {
    let baseProductCost2 = $('.t4s-product-price').html();
  if (baseProductCost2.includes('t4s-price-from')) {
    baseProductCost2 = baseProductCost2.split('</span>')[1];
  } else if (baseProductCost2.includes('</span></ins></span>')) {
    baseProductCost2 = baseProductCost2.split('</span></ins></span>')[0].split('<ins><span class="money">')[1].split('</span>')[0];
  }

     if (baseProductCost2.includes('USD')) {
  baseProductCost2 = baseProductCost2.split(' USD')[0];
     }
  baseProductCost2 = Number(baseProductCost2.replace('$', '').trim());
      return baseProductCost2;
  }
  
  function getBaseProductCost() {
    baseProductCost = $('.t4s-product-price').html();
  if (baseProductCost.includes('t4s-price-from')) {
    baseProductCost = baseProductCost.split('</span>')[1];
  } else if (baseProductCost.includes('</span></ins></span>')) {
    baseProductCost = baseProductCost.split('</span></ins></span>')[0].split('<ins><span class="money">')[1].split('</span>')[0];
  }

     if (baseProductCost.includes('USD')) {
  baseProductCost = baseProductCost.split(' USD')[0];
     }
  baseProductCost = Number(baseProductCost.replace('$', '').trim());
  console.log('Base product cost', baseProductCost)
  }
  
// $('.t4s-product-price').on('DOMSubtreeModified', function(){
//   console.log(++totalFires);
//   getBaseProductCost();
//   // if (chestPatchAmount > 0 || leftChestPatchAmount > 0 || rightChestPatchAmount > 0 || backPatchAmount > 0 || shoulderPatchAmount > 0 || leftShoulderPatchAmount > 0 || rightShoulderPatchAmount > 0 || stockBadgeEngraving || hemming) recalculatePrice();
  
// });
  

  $('#engrave-stock-badge').on('keyup', function (e) {
    const val = $("#engrave-stock-badge").val();
    console.log(val);
    if (val.length > 0) {
      stockBadgeEngraving = true
      totalExtraAmount = 7.99;
      recalculatePrice();
    } else {
      stockBadgeEngraving = false
      totalExtraAmount = 0;
      recalculatePrice();
    }
  });
  
  $(document).on('change', '#add-patches-to-shirt', function (event) {
    resetValues();

    if ($(this).val() == 'Yes') {
      $(document).find('.patchesLevel1').removeClass('hidden');

      $(document).find('.patchesLevel1').removeClass('hidden');

      
      $(document)
        .find('#tailoring-requires-additional-days')
        .prop('checked', true);
    } else {
      $(document).find('.patchesLevel1').addClass('hidden');
      $(document)
        .find('#tailoring-requires-additional-days')
        .prop('checked', false);
    }
  });

    $(document).on('change', '#add-striping', function (event) {
    resetValues();

    if ($(this).val() == 'Yes') {

      totalExtraAmount += 6.99;
      recalculatePrice();

      $(".patchesLevel1.expedited-shipping").hide();
      
      $(document).find('.patchesLevel2').removeClass('hidden');

      $(document).find('.patchesLevel2').removeClass('hidden');

      
      $(document)
        .find('#striping-requires-additional-days')
        .prop('checked', true);
    } else {

      totalExtraAmount -= 6.99;
      recalculatePrice();
      
      $(document).find('.patchesLevel2').addClass('hidden');
       $(".patchesLevel1.expedited-shipping").show();
      $(document)
        .find('#striping-requires-additional-days')
        .prop('checked', false);
    }
  });

  $(document).on('change', '#add-patches-on-chest', function (event) {
    const target = $(this).find(':selected').data('target');
    chestPatchAmount = $(this).find(':selected').data('amount');

    $(document)
      .find('.left-chest-patch')
      .find('input:radio')
      .prop('checked', false);

    $(document)
      .find('.right-chest-patch')
      .find('input:radio')
      .prop('checked', false);

    $('.left-chest-patch').find('.u4a-patch-value').text('');
    leftChestPatchAmount = 0;
    $('.right-chest-patch').find('.u4a-patch-value').text('');
    rightChestPatchAmount = 0;

    if (target == 'left-chest-patch') {
      $(document).find('.left-chest-patch').removeClass('hidden');
      $(document).find('.right-chest-patch').addClass('hidden');
    } else if (target == 'right-chest-patch') {
      $(document).find('.right-chest-patch').removeClass('hidden');
      $(document).find('.left-chest-patch').addClass('hidden');
    } else if (target == 'left-right-chest-patch') {
      $(document).find('.right-chest-patch').removeClass('hidden');
      $(document).find('.left-chest-patch').removeClass('hidden');
    } else {
      $(document).find('.right-chest-patch').addClass('hidden');
      $(document).find('.left-chest-patch').addClass('hidden');
    }
  });

  $(document).on('change', '#add-patches-on-shoulders', function (event) {
    const target = $(this).find(':selected').data('target');
    shoulderPatchAmount = $(this).find(':selected').data('amount');

    $(document)
      .find('.left-shoulder-patch')
      .find('input:radio')
      .prop('checked', false);

    $(document)
      .find('.right-shoulder-patch')
      .find('input:radio')
      .prop('checked', false);

    $('.left-shoulder-patch').find('.u4a-patch-value').text('');
    $('.right-shoulder-patch').find('.u4a-patch-value').text('');
    leftShoulderPatchAmount = 0;
    rightShoulderPatchAmount = 0;

    if (target == 'left-shoulder-patch') {
      $(document).find('.left-shoulder-patch').removeClass('hidden');
      $(document).find('.right-shoulder-patch').addClass('hidden');
    } else if (target == 'right-shoulder-patch') {
      $(document).find('.right-shoulder-patch').removeClass('hidden');
      $(document).find('.left-shoulder-patch').addClass('hidden');
    } else if (target == 'left-right-shoulder-patch') {
      $(document).find('.right-shoulder-patch').removeClass('hidden');
      $(document).find('.left-shoulder-patch').removeClass('hidden');
    } else {
      $(document).find('.right-shoulder-patch').addClass('hidden');
      $(document).find('.left-shoulder-patch').addClass('hidden');
    }
  });
  
  $(document).on('change', '#add-patches-on-back', function (event) {
    const target = $(this).find(':selected').data('target');
    chestPatchAmount = $(this).find(':selected').data('amount');

    $(document)
      .find('.back-patch')
      .find('input:radio')
      .prop('checked', false);

    $('.back-patch').find('.u4a-patch-value').text('');
    backPatchAmount = 0;
    
    if (target == 'back-patch') {
      $(document).find('.back-patch').removeClass('hidden');
    }
  });

  function recalculatePrice() {

    if (baseProductCost === 0) getBaseProductCost();
    else if (getNewBaseProductCost() < baseProductCost) {
        getBaseProductCost();
    }
      setTimeout(() => {
    
     const newPrice = chestPatchAmount + 
       leftChestPatchAmount + 
       rightChestPatchAmount + 
       backPatchAmount + 
       shoulderPatchAmount + 
       leftShoulderPatchAmount + 
       rightShoulderPatchAmount + 
       totalExtraAmount + baseProductCost;
      // $('.t4s-product-price').off('DOMSubtreeModified');
      $('.t4s-product-price').html('$' + newPrice.toFixed(2) + ' USD');
    }, 1000);
    
  }

$('#quantity').on('change', function() {
  console.log('New quantity', $('#quantity').val());
  setTimeout(() => recalculatePrice(), 1500);
});

$(document).on('click', '.t4s-quantity-selector', function() {

    const productQty = $('#quantity').val();
      if (productQty) {
        console.log('New product qty',productQty);
      setTimeout(() => recalculatePrice(), 1500);
      }

});

  
  
  
$(document).on('change', '#select-hemming-length', function (event) {
    const target = $(this).find(':selected').data('target');
    totalExtraAmount = $(this).find(':selected').data('amount');
    if (totalExtraAmount != 0) {
      hemming = true;
      recalculatePrice();
    } else {
      hemming = false;
      recalculatePrice();
    }
  });
  

  $(document).on(
    'change',
    '.back-patch input[type=radio]',
    function (event) {
      backPatchAmount = $(this).data('amount');
      const amount = parseFloat($(this).data('amount'))
        ? ' + $' + parseFloat($(this).data('amount'))
        : '';
      console.log(amount);

      $('.back-patch')
        .find('.u4a-patch-value')
        .text('- ' + $(this).val());

     recalculatePrice();

    }
    
  );

  $(document).on(
    'change',
    '.left-chest-patch input[type=radio]',
    function (event) {
      leftChestPatchAmount = $(this).data('amount');
      const amount = parseFloat($(this).data('amount'))
        ? ' + $' + parseFloat($(this).data('amount'))
        : '';
      console.log(amount);

      $('.left-chest-patch')
        .find('.u4a-patch-value')
        .text('- ' + $(this).val());

      recalculatePrice();

      
    }
  );

  
  $(document).on(
    'change',
    '.right-chest-patch input[type=radio]',
    function (event) {
      rightChestPatchAmount = $(this).data('amount');
      const amount = parseFloat($(this).data('amount'))
        ? ' + $' + parseFloat($(this).data('amount'))
        : '';
      console.log(amount);

      $('.right-chest-patch')
        .find('.u4a-patch-value')
        .text('- ' + $(this).val());

      recalculatePrice();
    }
  );

  $(document).on(
    'change',
    '.left-shoulder-patch input[type=radio]',
    function (event) {
      leftShoulderPatchAmount = $(this).data('amount');
      const amount = parseFloat($(this).data('amount'))
        ? ' + $' + parseFloat($(this).data('amount'))
        : '';
      console.log(amount);

      $('.left-shoulder-patch')
        .find('.u4a-patch-value')
        .text('- ' + $(this).val());

      recalculatePrice();
      
    }
  );

  $(document).on(
    'change',
    '.right-shoulder-patch input[type=radio]',
    function (event) {
      rightShoulderPatchAmount = $(this).data('amount');
      const amount = parseFloat($(this).data('amount'))
        ? ' + $' + parseFloat($(this).data('amount'))
        : '';
      console.log(amount);

      $('.right-shoulder-patch')
        .find('.u4a-patch-value')
        .text('- ' + $(this).val());

        recalculatePrice();

    }
  );


  $('button.t4s-product-form__submit').on('click', function (event) {
    const hasOptions = $('[data-swatch-option]').length;

  // check for whoelsale
    
    const optionsSelected = $('[data-id]').find('.is--selected').length;
    if (hasOptions !== optionsSelected) {
      event.preventDefault();
      return;
    }


    
    $(document).find('.variants-options').html('');
    $(document).find('#u4aAdditionalPrice').val('');
    
    if ($('#add-patches-to-shirt').val() !== 'Yes' && stockBadgeEngraving === false && hemming === false) return;
    
  console.log('About to add products')
    
    const currButton = $(this);
    currButton.attr('aria-disabled', true);
    currButton.addClass('loading');
    currButton.find('.loading-overlay__spinner').removeClass('hidden');
  
    event.preventDefault();
    console.log('Bada bing, bada boom');

    if (stockBadgeEngraving) { 
      totalExtraAmount = parseFloat('7.99');
  } else if (hemming) {
       totalExtraAmount = parseFloat('3.99');
      } else { 
      totalExtraAmount =
      parseFloat(chestPatchAmount) +
      parseFloat(leftChestPatchAmount) +
      parseFloat(rightChestPatchAmount) +
      parseFloat(shoulderPatchAmount) +
      parseFloat(leftShoulderPatchAmount) +
      parseFloat(backPatchAmount) +
      parseFloat(rightShoulderPatchAmount);
    }

    totalExtraAmount = totalExtraAmount.toFixed(2);

    if (totalExtraAmount > 0) {
      $(document)
        .find('#u4aAdditionalPrice')
        .val('$' + totalExtraAmount);
    } else {
      $(document).find('#u4aAdditionalPrice').val('');
    }

    const variantsHolder = $(document).find('.u4a-variants-holder');
    if (variantsHolder.length) {
      const fieldsets = variantsHolder.children('fieldset');
      $.each(fieldsets, function () {
        const variantName = $(this)
          .children('legend')
          .children('.variantName')
          .text();
        const variantValue = $(document)
          .find(`input[name=${variantName}]:checked`)
          .val();

        $(document)
          .find('.variants-options')
          .append(
            `<input type="hidden" name="properties[${variantName}]" value="${variantValue}" />`
          );
      });
    }

    if ($('.t4s-form__product').validate().form()) {
      console.log('validates');
    } else {
      console.log('does not validate');
      currButton.attr('aria-disabled', false);
      currButton.removeClass('loading');
      currButton.find('.loading-overlay__spinner').addClass('hidden');
      return;
    }

    // Create New Product
    let product = {};

    // const imgSrc = $(document).find('#variantImgURL').val()
    //   ? decodeURIComponent(
    //       ($(document).find('#variantImgURL').val() + '').replace(/\+/g, '%20')
    //     )
    //   : $("meta[property='og:image:secure_url']").attr('content');

  let imgSrc = '';

    const isVariant = $('.t4s_ratio.t4s-product__media').find('img').length > 0;

    if (isVariant) {
          imgSrc = $("meta[property='og:image:secure_url']").attr('content');
    } else imgSrc = $('.t4s-product__media-item.is--media-last').find('img').prop('currentSrc')
    const image = new Image();
    image.src = imgSrc;
    var width = image.width;
    var height = image.height;
    console.log('Height', height, 'Width', width);
    console.log(imgSrc);
    getBase64Image(imgSrc, width === 0 ? 550 : width, height === 0 ? 550 : height).done(function () {
      product.images = [
        {
          attachment: $(document)
            .find('#img-src-base64')
            .attr('src')
            .replace(/^data:image\/(png|jpg);base64,/, ''),
        },
      ];
      product.title = $("meta[property='og:title']").attr('content');
      product.sku = $(document).find('.t4s-sku-value').text();
      product.parentURL = window.location.href.split('products')[1];
      if (totalExtraAmount == 0) {
        product.price = parseFloat(
          parseFloat(totalExtraAmount) +
            parseFloat($('.t4s-product-price').html().split('$')[1])
        ).toFixed(2);
      } else {
        product.price = parseFloat($('.t4s-product-price').html().split('$')[1]);
      }

      console.log(product);

      const variantID = createProduct(product);
      console.log(variantID);
      if (typeof variantID === 'undefined' || !variantID) {
        currButton.attr('aria-disabled', false);
        currButton.removeClass('loading');
        currButton.find('.loading-overlay__spinner').addClass('hidden');
        if (!alert('Something Went Wrong. Please Try Again')) {
          window.location.reload();
        }
        return;
      }

      let values, index;

      // Get the parameters as an array
      values = $('.t4s-form__product').serializeArray();

      // Find and replace `content` if there
      for (index = 0; index < values.length; ++index) {
        if (values[index].name == 'id') {
          values[index].value = variantID;
          break;
        }
      }

      // Convert to URL-encoded string
      console.log(values);
      values = jQuery.param(values);
      console.log(values);

      let success = false;

      $.ajax({
        type: 'POST',
        url: '/cart/add.js',
        dataType: 'json',
        data: values,
        async: false,
        success: function (res) {
          success = true;
        },
      });
      if (!success) {
        currButton.attr('aria-disabled', false);
        currButton.removeClass('loading');
        currButton.find('.loading-overlay__spinner').addClass('hidden');
        if (!alert('Something Went Wrong. Please Try Again')) {
          window.location.reload();
        }
        return;
      }

      window.location.href = '/cart';
      return;
    });
  });


  

  function getBase64Image(img, width, height) {
    var dfrd1 = $.Deferred();
    var stage = new Konva.Stage({
      container: 'custom-patches-image-container',
      width,
      height,
    });
    var layer = new Konva.Layer();
    var patchImage = new Image();
    patchImage.onload = function () {
      var yoda = new Konva.Image({
        x: 0,
        y: 0,
        image: patchImage,
        width,
        height,
      });

      layer.add(yoda);
      stage.add(layer);
      var dataURL = stage.toDataURL();
      console.log('dataURL', dataURL);
      $('body').append(
        `<img src="${dataURL}" id="img-src-base64" class="hidden" />`
      );
      dfrd1.resolve();
    };
    patchImage.crossOrigin = 'Anonymous';
    patchImage.src = img;

    return dfrd1.promise();
  }

  function resetValues() {
    chestPatchAmount = 0;
    leftChestPatchAmount = 0;
    rightChestPatchAmount = 0;
    shoulderPatchAmount = 0;
    leftShoulderPatchAmount = 0;
    rightShoulderPatchAmount = 0;
    totalExtraAmount = 0;

    $('#add-patches-on-chest').val($('#target option:first').val());
    $(document).find('.left-chest-patch').addClass('hidden');
    $(document).find('.right-chest-patch').addClass('hidden');
    $('.left-chest-patch').find('.u4a-patch-value').text('');
    $('.right-chest-patch').find('.u4a-patch-value').text('');
    $(document)
      .find('.left-chest-patch')
      .find('input:radio')
      .prop('checked', false);
    $(document)
      .find('.right-chest-patch')
      .find('input:radio')
      .prop('checked', false);

    $('#add-patches-on-shoulders').val($('#target option:first').val());
    $(document).find('.left-shoulder-patch').addClass('hidden');
    $(document).find('.right-shoulder-patch').addClass('hidden');
    $('.left-shoulder-patch').find('.u4a-patch-value').text('');
    $('.right-shoulder-patch').find('.u4a-patch-value').text('');
    $(document)
      .find('.left-shoulder-patch')
      .find('input:radio')
      .prop('checked', false);

    $(document)
      .find('.right-shoulder-patch')
      .find('input:radio')
      .prop('checked', false);
  }

  function createProduct(product) {
    let variantID = '';
    $.ajax({
      type: 'POST',
      url: 'https://stark-island-04924.herokuapp.com/api/products?store=686d7b-2',
      data: product,
      async: false,
      success: function (res) {
        console.log(res);
        variantID = res.variants[0].id;
      },
    });
    return variantID;
  }

  $(document).on(
    'change',
    '.u4a-variants-holder fieldset input[type=radio]',
    function (event) {
      $(this)
        .parents('fieldset')
        .children('legend')
        .find('.selectedVariant')
        .text($(this).val());
    }
  );
});