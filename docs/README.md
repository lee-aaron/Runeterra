# Hextech Draw Simulator

How many spiders do I really need in my Elise deck? 

Do I have enough stuns and recalls to make sure Yasuo pops off?

How many Poros do I want? (Trick question, it's all of them!)


Knowing how many of which cards to include in your deck has traditionally been a question best answered via continued playing and testing of the deck. Though calculations of draw chance are far from difficult, the average player would rarely commit to doing the math. 
The Hextech Draw Simulator (HDS) is a tool for deckbuilding and theorycrafting, in which players can choose ranges of cards they would like to draw by certain turns, and the HDS will report the probability of that occuring. The HDS will allow casual players to quickly get a feel for their deck's consistency, while expert players can couple their intuition and experience with quantifiable probabilities when tuning their decks.


We propose that the HDS should be added to the current Legends of Runeterra deckbuilding page, as it is a low-cost, easy to implement functionality with immense potential given supporting artwork and animation for the GUI.

## How the math works

The HDS's probability calculations utilize the hypergeometric distribution. As a disclaimer, we did not invent this distrubution, and there have been other [calculators that perform such calculations for card games such as Magic The Gathering] (http://www.magicworkstation.com/). The hypergeometric distrubution gives the probability of *k* successful draws of a range of *K* specified cards, in *n* number of draws from *N* total cards without replacement. Probabilities of wanting 'at least one copy' of a card are simply the sums of the the probabilities of having one copy, two copies, and three copies of a card.

Applying this distrubution for multiple turns is done by manipulating *K*, *n*, and *N*. 

*n* = 4 for turn one, *n* += *m* for a mulligan of m cards, and *n* += 1 for every other turn.

*N* = 40 for turn one, and *N* -= 4 for the mulligan, and *N* -= 1 for every other turn.

*K* = the number of a desired card for turn one, and in the case that the same set of cards are desired on other turns, *K* -= the sum of *k*'s (successfull draws of those cards so far).

*k* is determined by the player, who picks how many of what card shows up on a turn. 

## How the code works

Using the deck parser


## Further GUI and Functionality Ideas
* Changing visual themes based on the regions of the decks 
* Filtering by card type (value, tempo, fast/slow removal, etc)
* Comparing two decks side-by-side
* Hovering over adding/removing a card shows the updated probability of adding/removing a card
