const express = require('express');
const router = express.Router();

const Food = require('../models/food_model.js');

router.use(express.static('public'));


// get edit page
router.get('/:id/edit', (req, res) => {
  Food.findById(req.params.id, (err, selectedItem) => {
    res.render(
      './food_pages/edit.ejs',
      {
        item: selectedItem,

      }
    )
  })
})

// get show page
router.get('/:id/show', (req, res) => {
  Food.findById(req.params.id, (err, selectedItem) => {
    res.render(
      './food_pages/show.ejs',
      {
        item: selectedItem,
        // user: req.session.currentUser.username
      }
    )
  })
})

// get new page
router.get('/new', (req, res) => {
  res.render(
    './food_pages/new.ejs'
  );
})

// get main  page
router.get('/', (req, res) => {
  // if(req.session.currentUser) {
    Food.find({}, (err, allFood) => {
      res.render(
        './food_pages/index.ejs',
      {
        items: allFood,

      });
    });

})

const makeFodMapsArr = (itemDetails) => {
  let fodMapsARR = []

  let fodmapObj1 = {
    servingSizeW1: itemDetails.servingSizeW1,
    servingSizeV1: itemDetails.servingSizeV1,
    oligos1: itemDetails.oligos1,
    fructos1: itemDetails.fructos1,
    polyols1: itemDetails.polyols1,
    lactos1: itemDetails.lactos1
  }
  fodMapsARR.push(fodmapObj1);

  let fodmapObj2 = {
    servingSizeW2: itemDetails.servingSizeW2,
    servingSizeV2: itemDetails.servingSizeV2,
    oligos2: itemDetails.oligos2,
    fructos2: itemDetails.fructos2,
    polyols2: itemDetails.polyols2,
    lactos2: itemDetails.lactos2
  }
  fodMapsARR.push(fodmapObj2);

  let fodmapObj3 = {
    servingSizeW3: itemDetails.servingSizeW3,
    servingSizeV3: itemDetails.servingSizeV3,
    oligos3: itemDetails.oligos3,
    fructos3: itemDetails.fructos3,
    polyols3: itemDetails.polyols3,
    lactos3: itemDetails.lactos3
  }

  fodMapsARR.push(fodmapObj3);
  return fodMapsARR
}

router.put('/:id', (req, res) => {
  req.body.fodmaps = makeFodMapsArr(req.body)
  Food.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedItem) => {
    res.redirect('/pantry')
  })
})



router.post('/', (req, res) => {
  req.body.fodmaps = makeFodMapsArr(req.body)
  Food.create(req.body, (err, newFood) => {
    console.log('new food: ' + newFood);
    res.redirect('/pantry')
  })
})

// // create array to push into FODMAPS array of objects to then store in DB.
// const makeFodMapsArr = (item) => {
//   // declare empty array for pushing fodmap objects into
//   let fodMapsARR = []
//   // make first fodmap object
//   let fodmapObj1 = {
//     servingSizeW1: item.servingSizeW1,
//     servingSizeV1: item.servingSizeV1,
//     oligos1: item.oligos1,
//     fructos1: item.fructos1,
//     polyols1: item.polyols1,
//     lactos1: item.lactos1
//   }
//   // push into arr
//   fodMapsARR.push(fodmapObj1);
//
//   let fodmapObj2 = {
//     servingSizeW2: item.servingSizeW2,
//     servingSizeV2: item.servingSizeV2,
//     oligos2: item.oligos2,
//     fructos2: item.fructos2,
//     polyols2: item.polyols2,
//     lactos2: item.lactos2
//   }
//   fodMapsARR.push(fodmapObj2);
//
//   let fodmapObj3 = {
//     servingSizeW3: item.servingSizeW3,
//     servingSizeV3: item.servingSizeV3,
//     oligos3: item.oligos3,
//     fructos3: item.fructos3,
//     polyols3: item.polyols3,
//     lactos3: item.lactos3
//   }
//   fodMapsARR.push(fodmapObj3);
//   // return the array for the put or post methods to add to their req.body
//   // console.log(fodMapsARR);
// }
//
// // create item
// router.post('/', (req, res) => {
//   req.body.fodmaps = makeFodMapsArr(req.body)
//   Food.create(req.body, (err, newFood) => {
//     res.redirect('/pantry')
//   })
// })
//
// // update item
// router.put('/:id', (req, res) => {
//   // send req.body to make fodmaps arry and then assign to req.body.fodmaps
//   req.body.fodmaps = makeFodMapsArr(req.body)
//   Food.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedItem) => {
//     res.redirect('/pantry')
//   })
// })

// delete item
router.delete('/:id', (req, res) => {
  Food.findByIdAndRemove(req.params.id, (err, selectedItem) => {
    res.redirect('/pantry')
  })
})



module.exports = router;
