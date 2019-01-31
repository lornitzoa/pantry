$(() => {


  const openFoodSearchModal = (e) => {
   $('.foodSearchModal').css('display', 'block');

 }

 const closeFoodSearchModal = () => {
   $('.foodSearchModal').css('display', 'none');
   clearSearchResults();
 }

  const addToDB = (e) => {
    let $info = $(e.target).parents().eq(1).children()
    for(let i = 1; i < $info.length; i++) {
      // console.log($($info[i]).children());
      // console.log($($info[i]).length);
      let $detailsDivs = $($info[i]).children()
      // console.log($detailsDivs.length);
      for(let x = 0; x < $detailsDivs.length; x++) {
        // console.log($($detailsDivs[x]).attr('id'));
        // console.log($($detailsDivs[x]).text());
        addToInputs($detailsDivs[x])
      }
    }
  }

  const addToInputs = (detail) => {
    let inputs = $('.mainDetails').children()
    for(let i = 0; i < inputs.length; i++) {
      let inputBox = $(inputs[i])//.attr('class');
      let selectedItem = $(detail).attr('id');
      // console.log(inputBox);
      // console.log(selectedItem);
      if ($(inputs[i]).attr('class') == $(detail).attr('id')) {
        $(inputs[i]).val($(detail).text());
      }
    }
  }


 $('.fodmapInput').change((e) => {
   let $fodmapsArr = $('.fodmapsDiv').children()
   // console.log($fodmapsArr);
   let $fodmapsReStrung = [];
   for(let i = 0; i < $fodmapsArr.length; i++) {
     let $fodArr = $($fodmapsArr[i]).children();
     let $fodmapsObj = {};
     for(let x = 0; x < $fodArr.length; x++) {
       // $fodmapsObj[$fodArr[x].name] = $fodArr[x].text();
       // console.log($fodArr[x].name);
       // console.log($($fodArr[x]).val());
       $fodmapsObj[$fodArr[x].name] = $($fodArr[x]).val();


     }
     // console.log($fodmapsObj);
     $fodmapsReStrung.push($fodmapsObj)
     // console.log($fodmapsReStrung);
   }

 });

 const clearSearchResults = () => {
  let $listItemsArr = $('.resultsList').children()
  for(let i = 1; i < $listItemsArr.length; i++) {
    $listItemsArr[i].remove();
  }
}

 $('#btnAddFromAPI').on('click', openFoodSearchModal);

 $('#btnCloseSearchModal').on('click', closeFoodSearchModal);

$('#btnClearSearch').on('click',clearSearchResults)

  // entire form on submit event listener taken from my unit 1 nutrition app
  $('#searchItems').on('submit', (e) => {
    e.preventDefault();
    let searchItem = $('input[type=text]').val();
    $.ajax(
      {
      method: "GET",
       url: `https://api.nutritionix.com/v1_1/search/${searchItem}?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Cnf_serving_size_qty%2Cnf_serving_size_unit%2Cnf_serving_weight_grams%2Cnf_calories%2Cnf_protein%2Cnf_total_carbohydrate%2Cnf_total_fat%2Cnf_dietary_fiber%2Cnf_sugars&appId=de92457e&appKey=96aacdbf1c85e953bb7e7e62a56e0cae`,
       datatype : 'application/json',
      }
    ).then(
      (data) => {
        // console.log(data);
        for(let i = 0; i < data.hits.length; i++) {
          // create containing divs for item details to assist with formatting
          let $itemWrapper = $('<div>').addClass('wrapperDiv');
          let $btnDiv = $('<div>').addClass('btnDiv')
          let $btnAddItem = $('<button>').text('+').addClass('pageBtns');
          let $ddItemDiv = $('<div>').addClass('itemDiv');
          let $ddServingVDiv = $('<div>').addClass('servingDiv');
          let $ddNutrientDiv = $('<div>').addClass('nutrientDiv')
          // let $ddNutrientDiv = $('<div>').addClass('nutrientDiv');
          // create dds for item details and add classes and ids
          let $ddItemName = $('<dd>').text(data.hits[i].fields.item_name).attr('id','name').addClass('itemName');
          let $ddBrand = $('<dd>').text(data.hits[i].fields.brand_name).attr('id','brand').addClass('itemName');
          let $ddServQty = $('<dd>').text(data.hits[i].fields.nf_serving_size_qty).attr('id','servingSizeQty').addClass('servingV');
          let $ddServUn = $('<dd>').text(data.hits[i].fields.nf_serving_size_unit).attr('id','servingSizeUn').addClass('servingV');
          let $ddServGram = $('<dd>').text(data.hits[i].fields.nf_serving_weight_grams).attr('id','servingWeight').addClass('nutrient');
          let $ddTotCal = $('<dd>').text(data.hits[i].fields.nf_calories).attr('id','calories').addClass('nutrient');
          let $ddProtien = $('<dd>').text(data.hits[i].fields.nf_protein).attr('id','protein').addClass('nutrient');
          let $ddCarbs = $('<dd>').text(data.hits[i].fields.nf_total_carbohydrate).attr('id','carbs').addClass('nutrient');
          let $ddFat = $('<dd>').text(data.hits[i].fields.nf_total_fat).attr('id','fat').addClass('nutrient');
          let $ddFiber = $('<dd>').text(data.hits[i].fields.nf_dietary_fiber).attr('id','fiber').addClass('nutrient');
          let $ddSugars = $('<dd>').text(data.hits[i].fields.nf_sugars).attr('id','sugar').addClass('nutrient');

          // add item name info to item div
          $($ddItemDiv).append($ddItemName);
          $($ddItemDiv).append($ddBrand);
          // add serving volume info to serving div
          $($ddServingVDiv).append($ddServQty);
          $($ddServingVDiv).append($ddServUn);
          // add everything else including serving weight to nutrient div
          $($ddNutrientDiv).append($ddServGram);
          $($ddNutrientDiv).append($ddTotCal);
          $($ddNutrientDiv).append($ddProtien);
          $($ddNutrientDiv).append($ddCarbs);
          $($ddNutrientDiv).append($ddFat);
          $($ddNutrientDiv).append($ddFiber);
          $($ddNutrientDiv).append($ddSugars);
          //add button to button div
          $($btnDiv).append($btnAddItem)
          // add button to item wrapper
          $($itemWrapper).append($btnDiv);
          // add item div to wrapper
          $($itemWrapper).append($ddItemDiv);
          // add serving div to wrapper
          $($itemWrapper).append($ddServingVDiv);
          // add nutrient div to wrapper
          $($itemWrapper).append($ddNutrientDiv);
          // add item wrapper to dl resultsList
          $('dl').append($itemWrapper);

          // add event listener to add button
          $($btnAddItem).on('click', addToDB)

        }
      }
    )

  })
})
