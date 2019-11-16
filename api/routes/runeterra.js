var express = require('express');
var router = express.Router();
const { DeckEncoder } = require('runeterra');

router.get('/', function(req, res, next) {
  res.send('API is working properly');
});

router.post('/calculate', function (req, res, next) {
  try {
    const deck = DeckEncoder.decode(req.body.deck_code);
    console.log(deck);
    res.send('Success');
  } catch (e) {
    res.send('Error');
  }
});

module.exports = router;