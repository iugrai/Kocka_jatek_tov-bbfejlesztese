// DOM Manipuláció: js-el módosítjuk a html-t és a css-t

let scores, roundScore, activePlayer;

// Homework1: új változót deklarálok az előző dobásnak:
let previousDices;
// Homework2: új változó a maximálisan elérhető pontszámnak

let finalScore;

function init() {
  // a két játékos pontszáma, egy 2 elemű tömbben lesz tárolva...
  // az első elem az első játékos pontszáma, a második a második játékos
  // pontszáma
  scores = [0, 0];

  // az aktuális játékos kör alatt megszerezett pontjai
  roundScore = 0;

  // mindíg az első játékos kezd
  activePlayer = 0;

  // Homework1: előző dobás kezdő értékei egy tömbben tároljuk

  previousDices = [0, 0];

  // beállítjuk a kezdő értékeket a UI-on is
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;

  // a játék kezdetekor a kockát eltüntetjük:
  // inline style-t adunk hozzá az img-hez...
  document.querySelector('.dice').style.display = 'none';
  // a gombokat megjelenítjük
  document.querySelector('.btn-roll').style.display = 'block';
  document.querySelector('.btn-hold').style.display = 'block';

  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}

init();

// Homework2: Lekérdezzük, hogy mit írt-e be értéket a játékos, ha igen akkor updateljuk a finalScore-t
document.querySelector('.btn-new').addEventListener('click', function () {

  if (parseInt(document.getElementsByClassName('final-score')[0].value) > 0) {
    finalScore = parseInt(document.getElementsByClassName('final-score')[0].value);
  }

  else {
    finalScore = 100;
  }
  console.log('Winning score is' + ':' + finalScore);
});



document.querySelector('.btn-new').addEventListener('click', init);



// ha a roll dice gombra kattint a user...
document.querySelector('.btn-roll').addEventListener('click', function () {
  console.log('rolling the dice...');
  // 1. generálunk egy random számot 1 és 6 között
  let dice = Math.floor(Math.random() * 6) + 1;

  // Homework1: aktív játékos dobása a konzolra kiírva:
  console.log('current dice of player' + activePlayer + ':' + dice);

  // 2. Az eredményt megjelnítjük a UI-on:
  let diceDOM = document.querySelector('.dice');
  diceDOM.style.display = 'block';
  //                            👇🏻string concatenation, sztring összefűzés
  diceDOM.setAttribute('src', 'dice-' + dice + '.png');

  // Homework1: Ha az aktív játékos két 6-st dob, 0-zuk az eredményt, kov. jatékos jön
  console.log('previous dice of a player' + activePlayer + ':' + previousDices[activePlayer]);

  if ((dice === 6) && (previousDices[activePlayer] === 6)) {
    scores[activePlayer] = 0;

    document.querySelector('#current-' + activePlayer).textContent = 0;

    nextPlayer();
  }

  // Tároljuk a tömbben a játékos előző dobását 
  previousDices[activePlayer] = dice;

  // Ha a ha játékos 1-est dob, a roundScore értékét elveszti, és
  // a következő játékos jön.

  if (dice !== 1) {
    // A dobot értéket kiszámoljuk, majd megjelenítjük a piros dobozban... 
    roundScore = roundScore + dice;

    document.querySelector('#current-' + activePlayer).textContent = roundScore;

    // ha a hátékos 1-est dobott:
  } else {
    nextPlayer();
  }

});


// DRY: do not repeat yourself.

function nextPlayer() {
  // roundScore értéket nullázzuk a UI-on is:
  document.querySelector('#current-' + activePlayer).textContent = 0;
  // a következő játékos jön
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  roundScore = 0;
  // toggle: ha rajta volt a class akkor leveszi, ha nem volt rajta
  // akkor rárakja...
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}


// ha a hold gombra rányom a játékos
document.querySelector('.btn-hold').addEventListener('click', function () {
  // a játékos megszerzi a kör alatt szerzett pontjait
  // az előző érték plusz a mostani...
  scores[activePlayer] = scores[activePlayer] + roundScore;
  // update the UI
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

  // ellenőrizzük hogy van e nyertes:
  if (scores[activePlayer] >= finalScore) {
    // játék vége
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'none';
    document.querySelector('.btn-hold').style.display = 'none';

    // ha nincs nyertes, akkor a következő játékos jön
  } else {
    nextPlayer();
  }
});



