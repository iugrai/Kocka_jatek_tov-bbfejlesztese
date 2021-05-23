
// DOM manipuláció: js-elmódosítjuk a html-t és a css-t
let scores, roundScore, activePlayer;

function init() {
  // a két játékos pontszáma, egy 2 elemű tömbbe lesz tárolva...
  // az első elem az első pontszáma, a második a második játékos pontszáma
  scores = [0, 0];

  // az aktuális játékos kör alatt megszerzett pontjai
  roundScore = 0;

  // mindig az első játékos kezd
  activePlayer = 0;

  // beállítjuk a kezdő elemeket az UI-on is

  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;

  // a játék kezdetekor a kockát eltüntetjük:
  // inline style-t adunk hozzás az img-hez...
  document.querySelector('.dice').style.display = 'none';
  // a gombokat megjelenítjük
  document.querySelector('.btn-roll').style.display = 'block';
  document.querySelector('.btn-hold').style.display = 'block';

  document.querySelector('#name-0').textContent = 'Player1';
  document.querySelector('#name-1').textContent = 'Player2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

init();

document.querySelector('.btn-new').addEventListener('click', init);

// ha a roll dice gombra kattint a user ...
document.querySelector('.btn-roll').addEventListener('click', function () {
  // console.log('rolling the dice...');
  // generálunk egy random számot 1 és 6 között

  let dice = Math.floor(Math.random() * 6) + 1;
  // console.log(dice);

  // 2. az eredményt megjelenítjük az UI-on:
  let diceDOM = document.querySelector('.dice');
  diceDOM.style.display = 'block';
  //                                          string concatenation, sztring összefűzés
  diceDOM.setAttribute('src', 'dice-' + dice + '.png');

  // 3. a dobot értéket kiszámoljuk, majd mejelenítük a piros dobozban
  roundScore = roundScore + dice;

  document.querySelector('#current-' + activePlayer).textContent = roundScore;

  // ha a játékos 1-est dogm a roundScore értékét elveszti, és a következő játékos jön

  if (dice !== 1) {
    // a doboz értékét kiszámoljuk, majd megjelenítjük a piros dobozban...

    document.querySelector('#current-' + activePlayer).textContent = roundScore;

    // ha a játékos 1-es doboott:
  } else {
    nextPlayer();
  }

});

// DRY: do not repeat yourself.

function nextPlayer() {
  // roundScore értéket nullázuk az UI-on is:
  document.querySelector('#current-' + activePlayer).textContent = 0;
  // a következő játékos jön
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  roundScore = 0;
  //  toogle: ha rajta volt a class akkor leveszi, ha nem volt rajta akkor rárakja
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');


}

// ha a hold gombra rányom a játékos
document.querySelector('.btn-hold').addEventListener('click', function () {
  // akkor a játékos megszerzi a kör alatt szerzett pontjait
  // az előző érték plusz a montani...
  scores[activePlayer] = scores[activePlayer] + roundScore;
  // update the UI
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
  if (scores[activePlayer] >= 20) {
    // játék vége
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    document.querySelector('.btn-roll').style.display = 'none';
    document.querySelector('.btn-hold').style.display = 'none';

    // ha nincs nyertes, akkor a következő játékos jön
  } else {

    nextPlayer();
  }
});



