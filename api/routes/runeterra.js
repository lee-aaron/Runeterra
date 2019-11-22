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
      result.totalCount = card.count;
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

let binomials = [
  [1],
  [1,1],
  [1,2,1],
  [1,3,3,1],
  [1,4,6,4,1],
  [1,5,10,10,5,1],
  [1,6,15,20,15,6,1],
  [1,7,21,35,35,21,7,1],
  [1,8,28,56,70,56,28,8,1]
];

function binomial(n,k) {
  while(n >= binomials.length) {
    let s = binomials.length;
    let nextRow = [];
    nextRow[0] = 1;
    for(let i=1, prev=s-1; i<s; i++) {
      nextRow[i] = binomials[prev][i-1] + binomials[prev][i];
    }
    nextRow[s] = 1;
    binomials.push(nextRow);
  }
  return binomials[n][k];
}

function calculateBucket(bucket, N, deckCount,currTurn) {
  /* 
    N = total deck size
    n = number of cards drawing on this turn
    K = total sample size left
    k = the number of cards you want to draw
  */

  let cardCount = {}

  for (var i = 0; i < bucket.length; i++) {
    if ( bucket[i].cardCode in cardCount ) {
      cardCount[bucket[i].cardCode].currCount += 1
    } else {
      cardCount[bucket[i].cardCode] = bucket[i]
      cardCount[bucket[i].cardCode].currCount = 1
    }
    if ( !(bucket[i].cardCode in deckCount)) {
      deckCount[bucket[i].cardCode] = bucket[i].totalCount;
    }
  }


  if ( bucket.length > 0 ) {

    let totalProb = 1; 
    let n = currTurn + 4;


    for (key in cardCount) {
      let K = deckCount[key];
      let k = cardCount[key].currCount;
      let cardProb = 0;

      for (var kCurr = k; kCurr < K; kCurr++){
        cardProb += (binomial(K, kCurr) * binomial(N-K, n-kCurr) / binomial(N,n));
      }
      deckCount[key] -= k;
      N -= k;
      n -= k;   

      totalProb *= cardProb;
    }

    if ( !totalProb ) totalProb = 1;
    console.log(totalProb);
    return totalProb;

  }

  return 1;
}

router.post('/calculate', function(req, res, next) {
  let deckCount = {};
  let mulligan = req.body[0];
  let turn1 = req.body[1];
  let turn2 = req.body[2];
  let turn3 = req.body[3];
  let turn4 = req.body[4];
  let turn5 = req.body[5];
  let turn6 = req.body[6];
  let turn7 = req.body[7];
  let turn8 = req.body[8];
  let turn9 = req.body[9];
  let turn10 = req.body[10];
  let N = 40;
  let mulliganProb = calculateBucket(mulligan, N, deckCount,0);
  N -= mulligan.length;
  let turn1Prob = calculateBucket(turn1, N, deckCount,1);
  N -= turn1.length;
  let turn2Prob = calculateBucket(turn2, N, deckCount,2);
  N -= turn2.length;
  let turn3Prob = calculateBucket(turn3, N, deckCount,3);
  N -= turn3.length;
  let turn4Prob = calculateBucket(turn4, N, deckCount,4);
  N -= turn4.length;
  let turn5Prob = calculateBucket(turn5, N, deckCount,5);
  N -= turn5.length;
  let turn6Prob = calculateBucket(turn6, N, deckCount,6);
  N -= turn6.length;
  let turn7Prob = calculateBucket(turn7, N, deckCount,7);
  N -= turn7.length;
  let turn8Prob = calculateBucket(turn8, N, deckCount,8);
  N -= turn8.length;
  let turn9Prob = calculateBucket(turn9, N, deckCount,9);
  N -= turn9.length;
  let turn10Prob = calculateBucket(turn10, N, deckCount,10);
  let totalProb = mulliganProb * turn1Prob * turn2Prob * turn3Prob * turn4Prob * turn5Prob * turn6Prob * turn7Prob * turn8Prob * turn9Prob * turn10Prob;
  if (totalProb == 0) {
    totalProb = 1;
  }
  res.send({status: 'success', probability: [totalProb, mulliganProb, turn1Prob, turn2Prob, turn3Prob, turn4Prob, turn5Prob, turn6Prob, turn7Prob, turn8Prob, turn9Prob, turn10Prob]});
});

module.exports = router;