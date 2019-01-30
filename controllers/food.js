const express = require('express');
const router = express.Router();
const session = require('express-session')
const Food = require('../models/food_model.js');


router.use(express.static('public'));



// get edit page
router.get('/:id/edit', (req, res) => {
  Food.findById(req.params.id, (err, selectedItem) => {
    res.render(
      './food_pages/edit.ejs',
      {
        item: selectedItem,
        user: req.session.currentUser
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
        user: req.session.currentUser
      }
    )
  })
})

// get new page
router.get('/new', (req, res) => {
  res.render(
    './food_pages/new.ejs',
    {
      user: req.session.currentUser
    }
  );
})

// get main  page
router.get('/', (req, res) => {
  if(req.session.currentUser) {
    Food.find({}, (err, allFood) => {
      res.render(
        './food_pages/index.ejs',
        {
          items: allFood,
          user: req.session.currentUser
        }
      )
    })
  } else {
    res.render('./sessions/login.ejs')
  }
});



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


// delete item
router.delete('/:id', (req, res) => {
  Food.findByIdAndRemove(req.params.id, (err, selectedItem) => {
    res.redirect('/pantry')
  })
})



module.exports = router;
