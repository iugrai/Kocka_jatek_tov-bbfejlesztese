// letrejozzuk a szám változót és értéket is adunk neki
// változó létrehozása: deklarálás
// érték adás: value asignment
let szam = 9;


// value assignment 
// bal oldalon levő változóba bele töltődik a jobb oldalon levő érték

szam = 20;

// csak deklarálás

let myNumber;


// deklarálni három kulcsszóval lehet:
var a;
// nem használjuk
let b;
//  let-et akkor használjuk a később a változó értéket módosítani akarjuk
const c = 10;
// constans: akkor használjuk ha nem akarjuk módosítani az értéket a változónak
// szám nincs körülötte sposztróf/idézőjel
a = 10;
const pi = 3.14;

// string típusú változó: szöveg
let szoveg = 'hello';

console.log(szoveg.toUpperCase());

// tömb: olyan típus ami több másik típust tud tárolni
const myArray = [3, 'hello', a, ['a', 'b']];

console.log(myArray);

// a tömböt nullátol indexeljük:
console.log(myArray[0]);

// a 4 elelmű utolsó eleme a 3-adik eleme, 4 -edik elem nem létezik
console.logmyArray[4]);