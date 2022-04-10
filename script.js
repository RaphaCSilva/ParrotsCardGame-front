// PROMPT //
let quantas = prompt("quantas tu quer (numero par entre 4 e 14 pfvr)");
quantas = parseInt(quantas, 10);

while (isNaN(quantas)) {
  alert("isso não é numero");
  quantas = prompt("quantas tu quer (numero par entre 4 e 14 pfvr)");
  quantas = parseInt(quantas, 10);
}

if (quantas < 3 || quantas > 14 || quantas % 2 !== 0) {
  while (true) {
    alert("perai malandro tem que ser par entre 4 e 14");
    quantas = prompt("quantas tu quer (numero par entre 4 e 14 pfvr)");
    quantas = parseInt(quantas, 10);
    if (isNaN(quantas)) {
      alert("isso ai não é nem numero");
    }
    if (quantas === 4) {
      break;
    }
    if (quantas === 6) {
      break;
    }
    if (quantas === 8) {
      break;
    }
    if (quantas === 10) {
      break;
    }
    if (quantas === 12) {
      break;
    }
    if (quantas === 14) {
      break;
    }
  }
}

// PROMPT //
// ARRUMAR OS CARDS \/ \/ //

const container = document.querySelector(".container");
const imgsTotal = [
  "bobrossparrot.gif",
  "explodyparrot.gif",
  "fiestaparrot.gif",
  "metalparrot.gif",
  "revertitparrot.gif",
  "tripletsparrot.gif",
  "unicornparrot.gif"
];
const imgsuteis = [];
for (let i = 0; i < quantas / 2; i++) {
  imgsuteis[i] = imgsTotal[i];
}
const imgsuteisreal = [];
for (let i = 0; i < quantas; i++) {
  if (i % 2 === 0) {
    imgsuteisreal[i] = imgsuteis[i / 2];
  } else {
    imgsuteisreal[i] = imgsuteis[parseInt(i / 2, 10)];
  }
}

imgsuteisreal.sort(comparador);
function comparador() {
  return Math.random() - 0.5;
}

let cardHTML = "";

imgsuteisreal.forEach((img) => {
  cardHTML += `<div class="card" data-card="${img}">
    <div class="verso">
      <img src="images/${img}">
    </div>
    <div class="frente">  
      <img class="frente" src="images/front.png"/>
    </div>  
  </div>`;
});

container.innerHTML = cardHTML;
//ARRUMAR OS CARDS  /\ /\ //
// game \/ \/ //
const cards = document.querySelectorAll(".card");

function unlocked() {
  cards.forEach((card) => card.addEventListener("click", flipCard));
}
function locked(){
  cards.forEach((card) => card.removeEventListener("click", flipCard));
}
unlocked();

let contador = 0;
let clicadas = 0;
let pontos = 0;
let primeira, segunda;

function flipCard() {
  this.classList.add("flip");
  contador += 1;
  this.children[1].classList.add("none");
  this.children[0].classList.remove("none");

  if (contador === 1) {
    primeira = this;
    clicadas++;
    primeira.removeEventListener("click", flipCard);
  }
  if (contador === 2) {
    segunda = this;
    clicadas++;
    segunda.removeEventListener("click", flipCard);
    contador = 0;
    console.log(clicadas);
    console.log(pontos);
  }
  checar();
}

function checar() {
  if (primeira !== undefined && segunda !== undefined) {
    locked();
    if (primeira.dataset.card === segunda.dataset.card) {
      unlocked();
      console.log(primeira);
      console.log(segunda);
      primeira.removeEventListener("click", flipCard);
      segunda.removeEventListener("click", flipCard);
      primeira = undefined;
      segunda = undefined;
      pontos+=2;
      win();
    } else {
      reflip();
    }
  }
}
function reflip() {
  setTimeout(() => {
    primeira.classList.remove("flip");
    segunda.classList.remove("flip");
    primeira.children[0].classList.add("none");
    segunda.children[0].classList.add("none");
    primeira.children[1].classList.remove("none");
    segunda.children[1].classList.remove("none");
    primeira.addEventListener("click", flipCard);
    segunda.addEventListener("click", flipCard);
    primeira = undefined;
    segunda = undefined;
    unlocked();
  }, 1000);
}

// vitoria e replay //

function win(){
  if(pontos === quantas){
    let resposta = prompt("Parabens você ganhou em "+clicadas+" jogadas quer jogar de novo?");
    while(true){
      if(resposta === "sim"){
        replay();
        break;
      }
      if(resposta === "não"){
        break;
      }
      resposta = prompt("insira uma resposta valida por favor, responda com sim ou não, você quer jogar novamente ?");
    }
  }
}
function replay(){
  unlocked();
  cards.forEach((card) => card.classList.remove("flip"));
  cards.forEach((card) => card.children[1].classList.remove("none"));
  cards.forEach((card) => card.children[0].classList.add("none"));
  contador = 0;
  clicadas = 0;
  pontos = 0;
}