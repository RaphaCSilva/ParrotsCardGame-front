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