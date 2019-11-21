var express = require('express');
var fs = require('fs');
var router = express.Router();
const { DeckEncoder } = require('runeterra');

// load source data
source = JSON.parse(fs.readFileSync('./data/set1-en_us.json'));
parsedSource = {};
for ( var desc in source ) {
  var card = source[desc];
  parsedSource[card.cardCode] = card;
}

function findCardDetail(card) {
  return parsedSource[card.code];
}

router.post('/', function (req, res, next) {
  try {
    let deck = DeckEncoder.decode(req.body.deck_code);

    let filteredDeck = [];

    // grab all deck info given the translated deck
    for (var card of deck) {
      var result = findCardDetail(card);
      result.count = card.count;
      filteredDeck.push(result);
    }

    res.send({status: 'success', deck: filteredDeck});
  } catch (e) {
    res.send({status: 'error'});
  }
});

router.get('/image/:id', function(req, res, next) {
  var path = __dirname.replace('routes', '') + "/data/cards/" + req.params.id + ".png";
  res.sendFile(path);
});

router.post('/calculate', function(req, res, next) {
  console.log(req.body);
  res.send({status: 'success', probability: 1});
});

module.exports = router;