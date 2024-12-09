/*Hampurilaismenu js */
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Lista tietoturvafaktoista
const facts = [
  "Tiesitkö? “Salasana” on suomalaisten kolmanneksi yleisin salasana. Varmista, että käytät vahvoja salasanoja, jotta pysyt turvassa netissä!",
  "Vinkki: Käytä kaksivaiheista tunnistautumista, jotta tilisi pysyy paremmin suojattuna!",
  "Älä käytä samaa salasanaa eri palveluissa – jos salasana vuotaa, kaikki tilisi voivat olla vaarassa.",
  "Huijarit kalassa! Älä syötä tietojasi epäilyttäville sivuille, tai päädyt rikollisten saaliiksi.",
];

// Elementti, johon teksti asetetaan
const cloudTextElement = document.getElementById("cloud-text-facts");

// Alkuindeksi
let currentFactIndex = 0;

// Odota, että DOM on ladattu, mutta ei odota kaikkia kuvia ja resursseja
document.addEventListener("DOMContentLoaded", () => {
  // Asetetaan ensimmäinen teksti heti, kun DOM on valmis
  cloudTextElement.textContent = facts[currentFactIndex];

  // Päivitä teksti 4 sekunnin välein
  setInterval(() => {
    currentFactIndex = (currentFactIndex + 1) % facts.length; // Siirtyy seuraavaan faktaan ja palaa alkuun
    cloudTextElement.textContent = facts[currentFactIndex];
  }, 4000); // 4000 ms = 4 sekuntia
});

/* Tietoturvakoe js */
function checkAnswer(button, isCorrect) {
  const feedback = document.querySelector(".feedback");

  // Asetetaan Poppins-fontti
  feedback.style.fontFamily = "'Poppins', sans-serif";

  if (isCorrect) {
    feedback.textContent = "Oikein! Hienoa työtä!";
    feedback.style.color = "#006400"; // Tummanvihreä (vastaa värejä)
  } else {
    feedback.textContent = "Ei ihan oikein. Koeta uudestaan.";
    feedback.style.color = "#ff0000"; // Punainen (väri väärälle vastaukselle)
  }

  // Nappien tyyli
  document.querySelectorAll(".answer").forEach((btn) => {
    btn.style.backgroundColor = "#ecd625"; // Keltainen
    btn.style.color = "#100d49"; // Tummansininen
    btn.style.fontFamily = "'Poppins', sans-serif"; // Fontti
    btn.style.backgroundColor = "#100d49"; // Tummansininen tausta
  });

  button.style.backgroundColor = isCorrect ? "#006400" : "#ff8c00"; // Vihreä tai oranssi
  button.style.color = "#fff"; // Valkoinen teksti
  button.style.fontFamily = "'Poppins', sans-serif"; // Fontti
}

/*------------------------------------------------------------------------------------------------------------*/
/*Tässä javascript koodia tietoturva kysymyksille */
// Kysymykset ja vastaukset
const questions = [
  {
    question: "Mikä on tärkein sääntö tietoturvassa?",
    answers: [
      { text: "Käytä aina samaa salasanaa", correct: false },
      { text: "Älä koskaan vaihda salasanoja", correct: false },
      { text: "Luo vahva ja uniikki salasana", correct: true },
    ],
  },
  {
    question: "Miten voit suojata itsesi huijausviesteiltä?",
    answers: [
      { text: "Avaa kaikki sähköpostit", correct: false },
      { text: "Älä koskaan avaa epäilyttäviä liitteitä", correct: true },
      { text: "Jaa salasanoja ystäville", correct: false },
    ],
  },
  {
    question: "Mikä on kaksivaiheinen tunnistautuminen?",
    answers: [
      { text: "Salasanan vaihtaminen kerran vuodessa", correct: false },
      {
        text: "Toinen vahvistuspyyntö käyttäjältä, kuten koodi puhelimeen",
        correct: true,
      },
      { text: "Salasanan syöttäminen kahteen kertaan", correct: false },
    ],
  },
  {
    question: "Puhelimesi ilmoittaa ohjelmistopäivityksestä. Mitä teet?",
    answers: [
      { text: "Et lataa, koska päivitykset ovat vapaaehtoisia", correct: false },
      { text: "Lataat ja asennat sen myöhemmin, kun jaksat", correct: false },
      { text: "Lataat ja asennat sen heti, kun mahdollista", correct: true },
    ],
  },
  {
    question: "Saat viestin, jossa väitetään, että voitit miljoona euroa. Mitä teet?",
    answers: [
      { text: "Vastaat heti. Mikä tuuri!", correct: false },
      { text: "Poistat viestin vastaamatta siihen, se on huijaus", correct: true },
      { text: "Kysyt lähettäjältä lisätietoja", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;

// Näyttää uuden kysymyksen ja luo vastauspainikkeet dynaamisesti
function loadNewQuestion() {
  const questionData = questions[currentQuestionIndex];
  const questionElement = document.querySelector(".question");
  const answerContainer = document.querySelector(".answers");
  const feedback = document.querySelector(".feedback");

  // Asetetaan Poppins-fontti kaikille elementeille
  questionElement.style.fontFamily = "'Poppins', sans-serif";
  feedback.style.fontFamily = "'Poppins', sans-serif";
  answerContainer.style.fontFamily = "'Poppins', sans-serif";

  questionElement.textContent = questionData.question;

  // Tyhjennetään aiemmat painikkeet ja palaute
  answerContainer.innerHTML = "";
  feedback.textContent = "";

  // Luodaan uudet vastauspainikkeet
  questionData.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("answer");
    button.textContent = answer.text;
    button.onclick = () => checkAnswer(button, answer.correct);
    answerContainer.appendChild(button);
  });

  // Päivitetään seuraava kysymys
  currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
}

// Tarkistaa vastauksen ja näyttää palautteen
function checkAnswer(button, isCorrect) {
  const feedback = document.querySelector(".feedback");

  // Nollataan kaikkien painikkeiden värit ennen uuden vastausvärin asettamista
  document.querySelectorAll(".answer").forEach((btn) => {
    btn.style.backgroundColor = ""; // Palautetaan alkuperäinen väri
    btn.style.color = ""; // Palautetaan tekstin väri
  });

  // Värit painikkeille
  if (isCorrect) {
    feedback.textContent = "Oikein! Hienoa työtä!";
    feedback.style.color = "green";
    feedback.style.fontFamily = "'Poppins', sans-serif";
    button.style.backgroundColor = "green";
  } else {
    feedback.textContent = "Ei ihan oikein. Koeta uudestaan.";
    feedback.style.color = "red";
    feedback.style.fontFamily = "'Poppins', sans-serif";
    button.style.backgroundColor = "red";
  }

  button.style.color = "white"; // Tekstin väri valkoiseksi
  button.style.fontFamily = "'Poppins', sans-serif"; // Fontti kaikille painikkeille
}

// Ladataan ensimmäinen kysymys sivun latauksessa
window.onload = loadNewQuestion;
