var stage;
var layerTransform;

jQuery(function ($) {
  'use strict';
  console.log('Custom Badges...');

  createBadgeCanva();

  $(document).on('click', '.tabs-holder .tab-title', function () {
    if ($(this).hasClass('active')) return;

    $(document)
      .find('.tabs-holder .tabs-titles-holder .active')
      .removeClass('active');
    $(this).addClass('active');

    const target = '.' + $(this).data('target');

    $(document)
      .find('.tabs-holder .tab-content-holder .active')
      .removeClass('active');
    $(document).find('.tabs-holder').find(target).addClass('active');
  });

  $(document).on('click', '.panel-add-star', function (event) {
    event.preventDefault();
    const currVal = $(this).parent().find('input[type="text"]').val();
    $(this)
      .parent()
      .find('input[type="text"]')
      .val(currVal + '★');

    $(this).parent().find('input[type="text"]').trigger('paste');
  });

  $(document).on('click', '.backing-attachment-holder .item', function () {
    $(document)
      .find('input#backing-attachment')
      .val($(this).data('backing-attachment'));
    document.body.classList.remove('overflow-hidden');
    document.body.dispatchEvent(new CustomEvent('modalClosed'));
    $('#PopupModal-backing-attachment').removeAttr('open');
  });

  $(document).on('change', 'input.property-badge-size', function (event) {
    const tableBadgePrices = $(document)
      .find('.badge-quantity-pricing')
      .find('.badge-per-price');

    if ($(this).val() == 'Miniature') {
      $(document).find('.badge-full-size-dimension').addClass('hidden');
      $(document).find('.badge-mini-dimension').removeClass('hidden');
      $.each(tableBadgePrices, function (index, value) {
        $(this).text($(this).data('mini-price'));
      });
      $(document).find('th.badge-size').text('Miniature');
    } else {
      $(document).find('.badge-full-size-dimension').removeClass('hidden');
      $(document).find('.badge-mini-dimension').addClass('hidden');
      $.each(tableBadgePrices, function (index, value) {
        $(this).text($(this).data('full-price'));
      });
      $(document).find('th.badge-size').text('Full Size');
    }

    const quantity = $(document)
      .find('body.product-custom-badges input.quantity__input')
      .val();
    calculatePricing(quantity);
  });

  $(document).on(
    'change paste keyup',
    'body.product-custom-badges input.quantity__input',
    function () {
      const quantity = parseFloat($(this).val());
      calculatePricing(quantity);
    }
  );

  $('button.product-form__submit').on('click', function (event) {
    event.preventDefault();
    console.log('Add to Cart Pressed');

    layerTransform.nodes([]);

    const currButton = $(this);
    const form = $('form.u4a-custom-badges-form');
    currButton.attr('aria-disabled', true);
    currButton.addClass('loading');
    currButton.find('.loading-overlay__spinner').removeClass('hidden');

    if ($(document).find('.custom-seal-price').data('price') > 0) {
      $(document)
        .find('body.product-custom-badges input.quantity__input')
        .attr('min', '100');
    }

    if (form.validate().form()) {
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

    var dataURL = stage.toDataURL();
    product.images = [
      {
        attachment: dataURL.replace(/^data:image\/(png|jpg);base64,/, ''),
      },
    ];

    let title = $("meta[property='og:title']").attr('content');

    const currColor = $(document)
      .find('.property-badge-color:checked')
      .data('target');
    if (currColor == 'silver') {
      title = title + 'S';
    } else if (currColor == 'gold') {
      title = title + 'G';
    }

    if ($(document).find('.property-badge-size:checked').val() == 'Miniature') {
      title = title.replace('PB', 'MB');
    }

    product.title = title;
    product.sku = title;

    const totalPrice = $(document)
      .find('.badge-price .total-price')
      .data('price');
    const quantityVal = $(document)
      .find('body.product-custom-badges input.quantity__input')
      .val();

    product.price = parseFloat(
      parseFloat(totalPrice) / parseFloat(quantityVal)
    ).toFixed(2);

    console.log(product);

    const variantID = createProduct(product);

    console.log('Variant ID: ' + variantID);

    if (typeof variantID === 'undefined' || !variantID) {
      currButton.attr('aria-disabled', false);
      currButton.removeClass('loading');
      currButton.find('.loading-overlay__spinner').addClass('hidden');
      if (!alert('Something Went Wrong. Please Try Again')) {
        window.location.reload();
      }
      return;
    }

    const values = form.serializeArray();
    let formData = new FormData();

    $.each(values, function (i, val) {
      if (val.name == 'id') val.value = variantID;
      formData.append(val.name, val.value);
    });

    $.each(form.find('input[type="file"]'), function (i, tag) {
      $.each($(tag)[0].files, function (i, file) {
        formData.append(tag.name, file);
      });
    });

    let success = false;

    $.ajax({
      type: 'POST',
      url: '/cart/add.js',
      dataType: 'json',
      data: formData,
      processData: false,
      contentType: false,
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

  $(document).on('click', '#getProductionTemplate', function (event) {
    event.preventDefault();

    layerTransform.nodes([]);
    console.log('Get Production Template Pressed');

    const form = $('form.u4a-custom-badges-form');

    if ($(document).find('.custom-seal-price').data('price') > 0) {
      $(document)
        .find('body.product-custom-badges input.quantity__input')
        .attr('min', '100');
    }

    if (form.validate().form()) {
      console.log('validates');
    } else {
      console.log('does not validate');
      return;
    }

    const productionTemplate = $(document).find('#getProductionTemplateHolder');

    productionTemplate.removeClass('hidden');

    productionTemplate
      .find('.client-name')
      .text($(document).find('#prod-temp-name').val());

    productionTemplate
      .find('.curvature')
      .text($(document).find('#badge-curvature').val());

    productionTemplate
      .find('.seal-name')
      .text($(document).find('#seal-style').val());

    productionTemplate
      .find('.font-color')
      .text($(document).find('#badge-font-color').val());

    const svgPaths = $(document).find('#badges-svg').find('defs').find('path');
    const total = svgPaths.length;
    let iterations = parseInt(total);

    $(document).find('.prod-temp-panel').remove();

    $.each(svgPaths, function () {
      let text = '';
      if (iterations === total) {
        text = $(document).find('#badge-last-panel').val().toUpperCase();
      } else {
        text = $(document)
          .find(`#badge-panel-${iterations}`)
          .val()
          .toUpperCase();
      }

      $(
        `<div class="prod-temp-panel"><span>Line ${iterations}:</span> ${text}</div>`
      ).insertAfter('#getProductionTemplateHolder .font-color-holder');

      iterations--;
    });

    productionTemplate
      .find('.badge-packing')
      .text($(document).find('#backing-attachment').val());

    productionTemplate
      .find('.order-date')
      .text($(document).find('#prod-temp-date').val());

    productionTemplate
      .find('.invoice-numb')
      .text($(document).find('#prod-temp-invoice-number').val());

    productionTemplate
      .find('.design-sku')
      .text($(document).find('#prod-temp-design-sku').val());

    productionTemplate
      .find('.order-total')
      .text($(document).find('#prod-temp-total-orders').val() + ' total');

    productionTemplate.find('.additional-text').html(
      $(document)
        .find('#prod-temp-additional')
        .val()
        .replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2')
    );

    const quant = $(document)
      .find('body.product-custom-badges input.quantity__input')
      .val();

    productionTemplate.find('.quant').text(quant > 9 ? quant : '0' + quant);

    productionTemplate.find('.badge-image').attr('src', stage.toDataURL());

    return;
  });
});

function createProduct(product) {
  let variantID = '';
  $.ajax({
    type: 'POST',
    url: 'https://stark-island-04924.herokuapp.com/api/products',
    data: product,
    async: false,
    success: function (res) {
      console.log(res);
      variantID = res.variants[0].id;
    },
  });
  return variantID;
}

function createBadgeCanva() {
  stage = new Konva.Stage({
    container: 'custom-badge-image-container',
    width: 320,
    height: 486,
  });

  var layer = new Konva.Layer();

  stage.add(layer);

  var badgeImage = new Konva.Image({
    x: 0,
    y: 0,
    width: 320,
    height: 486,
  });
  layer.add(badgeImage);

  var imageObj = new Image();
  imageObj.onload = function () {
    badgeImage.image(imageObj);
  };
  imageObj.crossOrigin = 'Anonymous';
  imageObj.src = $('#canvas-image-placeholder').attr('src');

  $(document).on('change', 'input.property-badge-color', function () {
    const currTarget = $(this).data('target');
    $(document).find('.badge-placeholder').find('img').addClass('hidden');
    $(document)
      .find('.badge-placeholder')
      .find(`img.${currTarget}`)
      .removeClass('hidden');

    $(document)
      .find('.badge-quantity-pricing')
      .find('table')
      .addClass('hidden');
    $(document)
      .find('.badge-quantity-pricing')
      .find(`table.${currTarget}`)
      .removeClass('hidden');

    var imageObj = new Image();
    imageObj.onload = function () {
      badgeImage.image(imageObj);
    };
    imageObj.crossOrigin = 'Anonymous';
    imageObj.src = $(document)
      .find(`.custom-badge-image.${currTarget}`)
      .attr('xlink:href');

    const quantity = $(document)
      .find('body.product-custom-badges input.quantity__input')
      .val();
    calculatePricing(quantity);
  });

  layerTransform = new Konva.Transformer({
    keepRatio: true,
    centeredScaling: true,
    flipEnabled: false,
    enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    borderDash: [3, 3],
    anchorCornerRadius: 50,
    anchorFill: '#4affff',
    anchorStroke: '#4affff',
  });
  layer.add(layerTransform);

  let fillColor = '#000000';
  let fontFamily = 'Impact, Charcoal, sans-serif';

  var group = new Konva.Group({
    x: 0,
    y: -10,
  });

  const svgPaths = $(document).find('#badges-svg').find('defs').find('path');

  const svgPathsLength = svgPaths.length;
  let i = 1;
  $.each(svgPaths, function (indexInArray, valueOfElement) {
    group.add(
      new Konva.TextPath({
        fill: '#000000',
        fontSize: $(this).data('size'),
        fontFamily: fontFamily,
        fontStyle: 'bold',
        data: $(this).attr('d'),
        align: 'center',
        textBaseline: 'middle',
        name: `text-panel${svgPathsLength == i ? '-last' : i}`,
        draggable: true,
      })
    );

    i++;
  });

  layer.add(group);

  $(document).on('change', '#badge-font-family', function () {
    if ($(this).find(':selected').val() == 'Impact') {
      fontFamily = 'Impact, Charcoal, sans-serif';
    } else {
      fontFamily = 'Times New Roman, Times, serif';
    }

    var textpaths = group.find('TextPath');
    for (var i = 0; i < textpaths.length; i++) {
      var textpath = textpaths[i];
      textpath.fontFamily(fontFamily);
      textpath.draw();
    }
  });

  $(document).on('change', '#badge-font-color', function () {
    const currVal = $(this).find(':selected').val();
    if (currVal == 'Black') {
      fillColor = '#000000';
    } else if (currVal == 'Blue') {
      fillColor = '#0000ff';
    } else if (currVal == 'Red') {
      fillColor = '#ff0000';
    } else if (currVal == 'Green') {
      fillColor = '#005710';
    }

    var textpaths = group.find('TextPath');
    for (var i = 0; i < textpaths.length; i++) {
      var textpath = textpaths[i];
      textpath.fill(fillColor);
      textpath.draw();
    }
  });

  $(document).on('change paste keyup', '.badge-text-panel', function (event) {
    stage.find(`.${$(this).data('target')}`)[0].text($.trim($(this).val()));
  });

  $(document).on('change', 'input.property-last-badge-panel', function (event) {
    $(document).find('input#badge-last-panel').val('');
    stage.find('.text-panel-last')[0].text('');
    $(document).find('input#badge-last-panel').removeClass('hidden');
    $(document)
      .find('.last-panel-consecutive-numbers-holder')
      .addClass('hidden');
    $(document).find('.last-panel-manual-numbers-holder').addClass('hidden');

    $(document).find('#badge-last-panel-same-number').prop('checked', true);

    if ($(this).val() == 'Number') {
      $(document).find('.number-details-holder').removeClass('hidden');
      $(document).find('input#badge-last-panel').attr('type', 'number');
      $(document)
        .find('input#badge-last-panel')
        .attr('placeholder', 'Enter Number');
    } else {
      $(document).find('.number-details-holder').addClass('hidden');
      $(document).find('input#badge-last-panel').attr('type', 'text');
      $(document)
        .find('input#badge-last-panel')
        .attr('placeholder', 'Enter Text');
    }
  });

  $(document).on(
    'change',
    'input.property-badge-last-panel-number-details',
    function () {
      $(document).find('input#badge-last-panel').val('');
      stage.find('.text-panel-last')[0].text('');
      $(document).find('input#badge-last-panel').attr('type', 'number');
      $(document).find('input#consecutive-number-start').val('');
      $(document).find('input#consecutive-number-end').val('');
      $(document).find('#manual-number-input').val('');

      if ($(this).val() == 'Consecutive') {
        $(document)
          .find('.last-panel-consecutive-numbers-holder')
          .removeClass('hidden');
        $(document)
          .find('.last-panel-manual-numbers-holder')
          .addClass('hidden');
        $(document).find('input#badge-last-panel').addClass('hidden');
      } else if ($(this).val() == 'Manually Entered') {
        $(document)
          .find('.last-panel-consecutive-numbers-holder')
          .addClass('hidden');
        $(document)
          .find('.last-panel-manual-numbers-holder')
          .removeClass('hidden');
        $(document).find('input#badge-last-panel').addClass('hidden');
      } else {
        $(document)
          .find('.last-panel-consecutive-numbers-holder')
          .addClass('hidden');
        $(document)
          .find('.last-panel-manual-numbers-holder')
          .addClass('hidden');
        $(document).find('input#badge-last-panel').removeClass('hidden');
      }
    }
  );

  $(document).on('change paste keyup', '#manual-number-input', function () {
    $(document).find('input#badge-last-panel').attr('type', 'text');
    $(document).find('input#badge-last-panel').val($(this).val());
    stage
      .find('.text-panel-last')[0]
      .text($(document).find('input#badge-last-panel').val());
  });

  $(document).on(
    'change paste keyup',
    '#consecutive-number-start',
    function () {
      $(document).find('input#badge-last-panel').attr('type', 'text');
      $(document)
        .find('input#badge-last-panel')
        .val($(this).val() + '-' + $('#consecutive-number-end').val());

      stage
        .find('.text-panel-last')[0]
        .text($(document).find('input#badge-last-panel').val());
    }
  );

  $(document).on('change paste keyup', '#consecutive-number-end', function () {
    $(document).find('input#badge-last-panel').attr('type', 'text');
    $(document)
      .find('input#badge-last-panel')
      .val($('#consecutive-number-start').val() + '-' + $(this).val());

    stage
      .find('.text-panel-last')[0]
      .text($(document).find('input#badge-last-panel').val());
  });

  const sealImageDimensions = $(document).find('foreignObject');
  const width = parseInt(sealImageDimensions.attr('width'));
  const height = parseInt(sealImageDimensions.attr('height'));
  const xPos = parseInt(sealImageDimensions.attr('x'));
  const yPos = parseInt(sealImageDimensions.attr('y'));

  var sealImage = new Konva.Image({
    x: xPos,
    y: yPos,
    width: width,
    height: height,
  });

  const radius = parseFloat(width / 2);
  var groupArc = new Konva.Group({
    clipFunc: function (ctx) {
      ctx.arc(
        parseFloat(xPos + radius),
        parseFloat(yPos + radius),
        radius,
        0,
        Math.PI * 2,
        true
      );
    },
  });

  groupArc.add(sealImage);
  layer.add(groupArc);

  $(document).on(
    'click',
    '.tab-content-item-holder.select-seal .item',
    function () {
      $(document).find('input#seal-style').val($(this).data('badge-name'));

      var imageObj = new Image();
      imageObj.onload = function () {
        sealImage.image(imageObj);
      };
      imageObj.crossOrigin = 'Anonymous';
      imageObj.src = $(this).find('img').attr('src');

      $(document).find('input#custom-seal').val('');
      $(document).find('.custom-seal-details').html('');
      document.body.classList.remove('overflow-hidden');
      document.body.dispatchEvent(new CustomEvent('modalClosed'));
      $('#PopupModal-select-seal').removeAttr('open');

      const quantityHolder = $(document).find(
        'body.product-custom-badges input.quantity__input'
      );
      quantityHolder.val('1');
      quantityHolder.attr('min', '1');
      $(document).find('#custom-seal-price').val('');

      // Remove Seal Price
      removeCustomSealPrice();
    }
  );

  $(document).on('change', 'input#custom-seal', function (event) {
    const quantityHolder = $(document).find(
      'body.product-custom-badges input.quantity__input'
    );
    quantityHolder.val('1');
    quantityHolder.attr('min', '1');
    $(document).find('#custom-seal-price').val('');

    if (!event.target.files.length) {
      $(document).find('.custom-seal-details').addClass('error');
      $(document)
        .find('.custom-seal-details')
        .html('<small>No file selected</small>');
      $(document).find('input#seal-style').val('');
      $(this).val('');

      sealImage.image('');

      // Remove Seal Price
      removeCustomSealPrice();
    } else if ($(this).val().split('.').pop().toLowerCase() == 'png') {
      $(document).find('.custom-seal-details').removeClass('error');
      $(document)
        .find('.custom-seal-details')
        .html(`<small>${event.target.files[0].name}</small>`);
      document.body.classList.remove('overflow-hidden');
      document.body.dispatchEvent(new CustomEvent('modalClosed'));
      $('#PopupModal-select-seal').removeAttr('open');
      $(document)
        .find('input#seal-style')
        .val(`Custom (${event.target.files[0].name})`);

      var imageObj = new Image();
      imageObj.onload = function () {
        sealImage.image(imageObj);
      };
      imageObj.crossOrigin = 'Anonymous';
      imageObj.src = URL.createObjectURL(event.target.files[0]);

      quantityHolder.val('100');
      quantityHolder.attr('min', '100');
      $(document).find('#custom-seal-price').val('$500 USD');

      const quantity = $(document)
        .find('body.product-custom-badges input.quantity__input')
        .val();
      $(document).find('.badge-price .custom-seal-price').removeClass('hidden');
      $(document).find('.badge-price .custom-seal-price').data('price', 500);
      $(document)
        .find('.badge-price .custom-seal-price')
        .text('Custom Seal: $500 USD');

      calculatePricing(quantity);
    } else {
      console.log('invalid extension!');
      $(document).find('.custom-seal-details').addClass('error');
      $(document)
        .find('.custom-seal-details')
        .html('<small>Only PNG format allowed</small>');
      $(document).find('input#seal-style').val('');
      $(this).val('');

      sealImage.image('');

      // Remove Seal Price
      removeCustomSealPrice();
    }
  });

  stage.on('click tap', function (e) {
    const targetName = e.target.attrs.name;
    if (
      typeof targetName !== 'undefined' &&
      targetName &&
      /text-panel/i.test(targetName)
    ) {
      layerTransform.nodes([stage.find(`.${targetName}`)[0]]);
      layerTransform.moveToTop();
    } else {
      layerTransform.nodes([]);
    }
  });
}

function removeCustomSealPrice() {
  // Remove Seal Price
  const quantity = $(document)
    .find('body.product-custom-badges input.quantity__input')
    .val();
  $(document).find('.badge-price .custom-seal-price').addClass('hidden');
  $(document).find('.badge-price .custom-seal-price').data('price', 0);
  $(document).find('.badge-price .custom-seal-price').text('');
  $(document).find('#custom-seal-price').val('');
  calculatePricing(quantity);
}

function calculatePricing(quantity) {
  let perPiecePrice = parseFloat(
    $(document).find('.badge-price .price-per-quantity span')
  );
  const customSealPrice = parseFloat(
    $(document).find('.badge-price .custom-seal-price').data('price')
  );
  if (quantity <= 2) {
    perPiecePrice = parseFloat(
      $(document)
        .find('.badge-quantity-pricing')
        .find('table:visible')
        .find('.badge-per-price[data-quantity="1-2"]')
        .text()
    );
  } else if (quantity <= 5) {
    perPiecePrice = parseFloat(
      $(document)
        .find('.badge-quantity-pricing')
        .find('table:visible')
        .find('.badge-per-price[data-quantity="3-5"]')
        .text()
    );
  } else if (quantity <= 12) {
    perPiecePrice = parseFloat(
      $(document)
        .find('.badge-quantity-pricing')
        .find('table:visible')
        .find('.badge-per-price[data-quantity="6-12"]')
        .text()
    );
  } else if (quantity <= 24) {
    perPiecePrice = parseFloat(
      $(document)
        .find('.badge-quantity-pricing')
        .find('table:visible')
        .find('.badge-per-price[data-quantity="13-24"]')
        .text()
    );
  } else if (quantity <= 49) {
    perPiecePrice = parseFloat(
      $(document)
        .find('.badge-quantity-pricing')
        .find('table:visible')
        .find('.badge-per-price[data-quantity="25-49"]')
        .text()
    );
  } else if (quantity <= 99) {
    perPiecePrice = parseFloat(
      $(document)
        .find('.badge-quantity-pricing')
        .find('table:visible')
        .find('.badge-per-price[data-quantity="50-99"]')
        .text()
    );
  } else if (quantity <= 199) {
    perPiecePrice = parseFloat(
      $(document)
        .find('.badge-quantity-pricing')
        .find('table:visible')
        .find('.badge-per-price[data-quantity="100-199"]')
        .text()
    );
  } else if (quantity >= 200) {
    perPiecePrice = parseFloat(
      $(document)
        .find('.badge-quantity-pricing')
        .find('table:visible')
        .find('.badge-per-price[data-quantity="200 & Up"]')
        .text()
    );
  }

  $(document).find('.badge-price .price-per-quantity span').text(perPiecePrice);
  $(document)
    .find('#per-item-price')
    .val('$' + perPiecePrice + ' USD');

  const total = parseFloat(quantity * perPiecePrice + customSealPrice).toFixed(
    2
  );

  $(document).find('.badge-price .total-price').data('price', total);
  $(document).find('.badge-price .total-price span').text(digits(total));
}

function digits(number) {
  return number.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}
