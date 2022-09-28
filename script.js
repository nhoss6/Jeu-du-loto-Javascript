const tableau = new Set();
const numero = new Set();
const bouton = document.querySelector("button");
const h3 = document.querySelector("#result h3");
const sectionResult = document.querySelector("#result ");
const sectionChoix = document.querySelector("#choix ");
const sectionChiffre = document.querySelector(".generate");
const sectionRetour = document.querySelector(".saisi");
const chiffreJoueur = new Set();
let verification;
let grille = "";
let compteur;
let nbrBons = 0;
let bonus;
let gains;
let complementaireJoueur;

bouton.addEventListener("click", onClick);

/*
Function permettant de générer aléatoirement les numéro gagnants, ainsi que le complémentaire gagnant
*/

function generateWinning() {
  if (numero.size === 0) {
    while (numero.size < 5) {
      compteur = Math.floor(Math.random() * 50 + 1);
      numero.add(compteur);
      //console.log(numero);
    }
    complementaire = Math.floor(Math.random() * 10 + 1);
  }
}

function recuperationNombres() {
  verification = true;
  complementaireJoueur = 0;
  complementaire = 0;
  gains = 0;
  const inputs = Array.from(document.getElementsByClassName("nombres"));
  console.log(inputs);

  inputs.forEach((input) => {
    let nb = parseInt(input.value);
    if (nb < 1 || nb > 50 || chiffreJoueur.has(nb)) {
      input.classList.add("warning");
      verification = false;
    } else {
      chiffreJoueur.add(nb);
      input.disabled = true;
      input.classList.remove("nombres", "warning");
      grille += `${nb}, `;
    }
  });

  var uComp = document.getElementById("complementaire");

  if (uComp.value < 1 || uComp.value > 10) {
    uComp.classList.add("warning");
  } else {
    uComp.disabled = true;
    uComp.classList.remove("warning");
    complementaireJoueur = parseInt(uComp.value);
  }
}

function verif() {
  for (let temp of chiffreJoueur) {
    //console.log(temp);
    if (numero.has(temp)) {
      nbrBons++;
      // console.log(nbrBons);
    }
  }
  if (complementaire == complementaireJoueur) {
    gains += 2000;
  }
}

function onClick() {
  nbrBons = 0;
  recuperationNombres();
  generateWinning();
  verif();
  if (verification) {
    sectionChoix.classList.add("hide");
    for (let temp2 of numero) {
      if (chiffreJoueur.has(temp2)) {
        sectionChiffre.innerHTML += `<span class="win">${temp2}</span>`;
      } else {
        sectionChiffre.innerHTML += `<span>${temp2}</span>`;
      }
    }

    if (complementaireJoueur == complementaire) {
      sectionChiffre.innerHTML += `<span class="win">${complementaire}</span>`;
    } else {
      sectionChiffre.innerHTML += `<span>${complementaire}</span>`;
    }
  }

  sectionResult.classList.remove("hide");
  sectionRetour.innerHTML = `<p>Pour rappel, voici votre grille : ${grille} et le complémentaire ${complementaireJoueur} </p>`;
  switch (nbrBons) {
    case 0:
      if (gains == 2000) {
        h3.innerHTML = `<p> Seulement le numéro complémentaire est bon! Vous gagnez ${gains} Euros </p>`;
      } else {
        h3.innerHTML =
          "<p> Vous n'avez rien gagné, mais vous pouvez retenter votre chance! </p>";
      }
      break;
    case 1:
      if (gains == 2000) {
        h3.innerHTML = `<p> Un numéro est bon et le complémentaire est bon! Vous gagnez ${gains} Euros </p>`;
      } else {
        h3.innerHTML =
          "<p> Vous n'avez rien gagné, mais vous pouvez retenter votre chance! </p>";
      }
      break;
    case 2:
      gains += 1000;
      h3.innerHTML = `<p> Vous avez donc gagné ${gains} Euros </p>`;
      break;
    case 3:
      gains += 5000;
      h3.innerHTML = `<p> Vous avez donc gagné ${gains} Euros </p>`;
      break;
    case 4:
      gains += 10000;
      h3.innerHTML = `<p> Vous avez donc gagné ${gains} Euros </p>`;
      break;
    case 5:
      gains += 100000;
      h3.innerHTML = `<p> Vous avez donc gagné ${gains} Euros </p>`;
      break;
  }

  console.log(gains, nbrBons);
}

//***************************            CODE PRINCIPAL              ************************************ */
