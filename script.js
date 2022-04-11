// PROMPT //
let quantas;
function inicio(){
  quantas = prompt("Com quantas cartas você quer jogar ? (numero par entre 4 e 14 por favor)");
  quantas = parseInt(quantas, 10);

  while (isNaN(quantas)) {
    alert("isso ai não é um numero");
    quantas = prompt("Com quantas cartas você quer jogar ? (numero par entre 4 e 14 por favor)");
    quantas = parseInt(quantas, 10);
  }

  if (quantas < 3 || quantas > 14 || quantas % 2 !== 0) {
    while (true) {
      alert("por favor, o numero tem que ser par entre 4 e 14");
      quantas = prompt("Com quantas cartas você quer jogar ? (numero par entre 4 e 14 por favor)");
      quantas = parseInt(quantas, 10);
      if (isNaN(quantas)) {
        alert("isso ai não é um numero");
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
}
inicio();

// ARRUMAR OS CARDS//

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
let imgsuteis = [];
let imgsuteisreal = [];
let cardHTML = "";

let times = 0;
let timem = 0;
let idInterval;
function contar() {
  idInterval = setInterval(aumentarContador, 1000);
}

function aumentarContador() {
  times++;
  document.querySelector(".timer").innerHTML = (timem+":"+times);
  if(times === 59){
    times=0;
    timem++;
  }
}

function embaralhador(){
  cardHTML = "";
  imgsuteis = [];
  imgsuteisreal = [];
  for (let i = 0; i < quantas / 2; i++) {
    imgsuteis[i] = imgsTotal[i];
  }
  
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
  contar();
}

embaralhador();

// game//
let cards = document.querySelectorAll(".card");

function unlocked() {
  cards.forEach((card) => card.addEventListener("click", flipCard));
}
function locked(){
  cards.forEach((card) => card.removeEventListener("click", flipCard));
}
function certaslocked(){
  let cardscertas = document.querySelectorAll(".certa");
  cardscertas.forEach((card) => card.removeEventListener("click", flipCard));
}

unlocked();

let contador = 0;
let clicadas = 0;
let pontos = 0;
let primeira, segunda;

function flipCard() {
  this.classList.add("flip");
  contador ++;
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
  }
  checar();
}

function checar() {
  if (primeira !== undefined && segunda !== undefined) {
    locked();
    if (primeira.dataset.card === segunda.dataset.card) {
      unlocked();
      primeira.classList.add("certa");
      segunda.classList.add("certa");
      certaslocked();
      primeira = undefined;
      segunda = undefined;
      pontos+=2;
      setTimeout(win,1000);
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
    certaslocked();
  }, 1000);
}

// vitoria e replay //

function win(){
  if(pontos === quantas){
    if(timem === 0){
      alert("Parabens você ganhou em "+clicadas+" jogadas e " + times + " segundos");
    }
    if(timem === 1){
      alert("Parabens você ganhou em "+clicadas+" jogadas, "+ timem + " minuto e "+ times + " segundos");
    }
    if(timem > 1){
      alert("Parabens você ganhou em "+clicadas+" jogadas, "+ timem + " minutos e "+ times + " segundos");
    }
    clearInterval(idInterval);
    times = 0;
    timem = 0;
    while(true){
      resposta = prompt("Você quer jogar novamente? Responda com sim ou não, por favor.");
      if(resposta === "sim"){
        replay();
        break;
      }
      if(resposta === "não"){
        break;
      }  
      alert("responda com sim ou não");    
    }
  }
}

function replay(){
  quantas = 0;
  container.innerHTML = "";
  inicio();
  embaralhador();
  cards = document.querySelectorAll(".card");
  unlocked();
  contador = 0;
  clicadas = 0;
  pontos = 0;
}
