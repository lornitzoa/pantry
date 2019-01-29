$(() => {


  const openFoodSearchModal = (e) => {
   $('.foodSearchModal').css('display', 'block');

 }

 const closeFoodSearchModal = () => {
   $('.foodSearchModal').css('display', 'none');
   // clearSearchResults();
 }

  const addToDB = (e) => {
    let $info = $(e.target).siblings().eq(0).children()
    // addToInputs()
    for(let i = 0; i < $info.length; i++) {
      let detail = $($info[i])
      addToInputs(detail)
    }
  }

  const addToInputs = (detail) => {
    let inputs = $('.inputs').children()
    for(let i = 0; i < inputs.length; i++) {
      // console.log($(inputs[i]).attr('class'));
      // console.log('input form: ' + $(inputs[i]).attr('class'));
      // console.log(('selected item: ' + $(detail).attr('class')));
      if ($(inputs[i]).attr('class') === $(detail).attr('class')) {
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
     console.log($fodmapsReStrung);
   }

 });

 $('.btnAddFromAPI').on('click', openFoodSearchModal);

 $('#btnCloseSearchModal').on('click', closeFoodSearchModal);

  // entire form on submit event listener taken from my unit 1 nutrition app
  $('form').on('submit', (e) => {
    e.preventDefault();
    let searchItem = $('input[type=text]').val();
    $.ajax(
      {
      method: "GET",
       url: `https://api.nutritionix.com/v1_1/search/${searchItem}?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Cnf_calories%2Cnf_protein%2Cnf_total_carbohydrate%2Cnf_total_fat%2Cnf_dietary_fiber%2Cnf_sugars&appId=de92457e&appKey=96aacdbf1c85e953bb7e7e62a56e0cae`,
       datatype : 'application/json',
      }
    ).then(
      (data) => {
        // console.log(data);
        for(let i = 0; i < data.hits.length; i++) {

          let $itemWrapper = $('<div>').addClass('wrapperDiv');
          let $btnAddItem = $('<button>').text('+');
          let $ddItemDiv = $('<div>').addClass('itemDiv');
          // let $ddNutrientDiv = $('<div>').addClass('nutrientDiv');
          let $ddItemName = $('<dd>').text(data.hits[i].fields.item_name).addClass('name');
          let $ddBrand = $('<dd>').text(data.hits[i].fields.brand_name).addClass('brand');
          let $ddTotCal = $('<dd>').text(data.hits[i].fields.nf_calories).addClass('calories');
          let $ddProtien = $('<dd>').text(data.hits[i].fields.nf_protein).addClass('protein');
          let $ddCarbs = $('<dd>').text(data.hits[i].fields.nf_total_carbohydrate).addClass('carbs');
          let $ddFat = $('<dd>').text(data.hits[i].fields.nf_total_fat).addClass('fat');
          let $ddFiber = $('<dd>').text(data.hits[i].fields.nf_dietary_fiber).addClass('fiber');
          let $ddSugars = $('<dd>').text(data.hits[i].fields.nf_sugars).addClass('sugar');


          $($ddItemDiv).append($ddItemName);
          $($ddItemDiv).append($ddBrand);
          $($ddItemDiv).append($ddTotCal);
          $($ddItemDiv).append($ddProtien);
          $($ddItemDiv).append($ddCarbs);
          $($ddItemDiv).append($ddFat);
          $($ddItemDiv).append($ddFiber);
          $($ddItemDiv).append($ddSugars);

          // add button to item wrapper
          $($itemWrapper).append($btnAddItem);
          // add item div to wrapper
          $($itemWrapper).append($ddItemDiv);
          // add item wrapper to dl resultsList
          $('dl').append($itemWrapper);

          $($btnAddItem).on('click', addToDB)

        }
      }
    )

  })
})
