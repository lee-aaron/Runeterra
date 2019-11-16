var express = require('express');
var router = express.Router();
const { DeckEncoder } = require('runeterra');

let deck = [];

router.post('/', function (req, res, next) {
  try {
    deck = DeckEncoder.decode(req.body.deck_code);

    // grab all deck info given the translated deck


    res.send({status: 'success', deck: deck});
  } catch (e) {
    res.send({status: 'error'});
  }
});

module.exports = router;