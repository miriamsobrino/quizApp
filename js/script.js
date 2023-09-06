const questions = [
  {
    title: "¿Cuál es el país más grande del mundo?",
    answers: [
      { text: "Estados Unidos", correct: false },
      { text: "Rusia", correct: true },
      { text: "China", correct: false },
      { text: "India", correct: false },
    ],
  },

  {
    title: '¿Quién dijo la frase "Pienso, luego existo"?',
    answers: [
      { text: "Sócrates", correct: false },
      { text: "Platón", correct: false },
      { text: "Galileo Galilei", correct: false },
      { text: "Descartes", correct: true },
    ],
  },

  {
    title: "¿Por cuáles elementos está formada la sal común?",
    answers: [
      { text: "Sodio y cloro", correct: true },
      { text: "Sodio y potasio", correct: false },
      { text: "Potasio y cloro", correct: false },
      { text: "Sodio y carbono", correct: false },
    ],
  },

  {
    title: "¿Cuál es el planeta más caliente?",
    answers: [
      { text: "Júpiter", correct: false },
      { text: "Marte", correct: false },
      { text: "Mercurio", correct: false },
      { text: "Venus", correct: true },
    ],
  },

  {
    title: "¿Cuál es la capital de Lituania?",
    answers: [
      { text: "Skojpe", correct: false },
      { text: "Vilna", correct: true },
      { text: "Almaty", correct: false },
      { text: "Riga", correct: false },
    ],
  },

  {
    title: "¿Cuál de estas palabras tiene un hiato?",
    answers: [
      { text: "Miércoles", correct: false },
      { text: "Cuento", correct: false },
      { text: "Biografía", correct: true },
      { text: "Murciélago", correct: false },
    ],
  },

  {
    title: "Qué futbolista ganó antes un balón de oro?",
    answers: [
      { text: "Leo Messi", correct: false },
      { text: "Karim Benzema", correct: false },
      { text: "Cristiano Ronaldo", correct: true },
      { text: "Luca Modrić", correct: false },
    ],
  },

  {
    title: "¿Cuántas veces ha pisado el hombre la luna?",
    answers: [
      { text: "Dos", correct: false },
      { text: "Cuatro", correct: false },
      { text: "Seis", correct: true },
      { text: "Solo una vez", correct: false },
    ],
  },

  {
    title: '¿Dónde podemos encontrar "El Guernica"?',
    answers: [
      { text: "Museo del Prado", correct: false },
      { text: "Museo Guggenheim", correct: false },
      { text: "Museo Thyssen", correct: false },
      { text: "Museo Reina Sofía", correct: true },
    ],
  },
  {
    title: "¿Cuánto duró “La Guerra de los Cien Años”?",
    answers: [
      { text: "100 años", correct: false },
      { text: "101 años", correct: false },
      { text: "110 años", correct: false },
      { text: "116 años", correct: true },
    ],
  },
];

const questionTitle = document.getElementById("question-title");
const currentQuestionBox = document.getElementById("current-question");
const btnStart = document.getElementById("btn-start");
const btnNext = document.getElementById("btn-next");
const answers = document.getElementById("answers");
const quiz = document.getElementById("quiz");
const scoreContainer = document.getElementById("score-container");
const scoreText = document.getElementById("score");
const quizDescription = document.getElementById("quiz-description");
const btnRestart = document.getElementById("btn-restart");

let score = 0;
let currentQuestionIndex = 0;
let currentQuestion = "";

btnStart.addEventListener("click", startQuiz);
btnRestart.addEventListener("click", startQuiz);

function startQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  btnNext.innerHTML = "";
  btnNext.classList.add("hidden");
  quiz.classList.remove("hidden");
  btnStart.classList.add("hidden");
  scoreContainer.classList.add("hidden");
  scoreText.classList.add("hidden");
  scoreContainer.classList.remove("flex");
  btnRestart.classList.add("hidden");
  quiz.classList.remove("main-height");
  quizDescription.innerText = "¿Cuánto sabes de cultura general?";
  while (answers.firstChild) {
    answers.removeChild(answers.firstChild);
  }
  showQuestions();
}

function showQuestions() {
  btnNext.disabled = true;
  btnNext.style.cursor = "not-allowed";
  currentQuestion = questions[currentQuestionIndex];
  currentQuestionBox.innerHTML =
    `<span class="size">${currentQuestionIndex + 1}</span>` +
    `<span class="black">/` +
    `<span class="black">${questions.length}</span>`;
  questionTitle.innerHTML = questions[currentQuestionIndex].title;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn-answer");
    answers.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
  if (currentQuestionIndex + 1 < questions.length) {
    btnNext.innerHTML = "Siguiente";
  } else {
    btnNext.innerHTML = "Ver puntuación";
  }
}

function selectAnswer(e) {
  const btnSelected = e.target;

  if (btnSelected.dataset.correct === "true") {
    btnSelected.classList.add("correct");
    btnNext.classList.remove("hidden");
    quiz.classList.add("main-height");
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      confettiRadius: 3,
    });

    score++;
  } else {
    btnSelected.classList.add("false");
    btnSelected.classList.add("shake-horizontal");
    btnNext.classList.remove("hidden");
    quiz.classList.add("main-height");
    Array.from(answers.children).forEach((button) => {
      if (button.dataset.correct) {
        button.classList.add("correct");
      }
    });
  }

  btnNext.disabled = false;
  btnNext.style.cursor = "pointer";

  Array.from(answers.children).forEach((button) => {
    button.disabled = true;
    button.style.cursor = "not-allowed";
  });
}

function showScore() {
  scoreText.innerHTML = `${score}/${questions.length}`;
  scoreText.classList.remove("hidden");
  scoreContainer.classList.remove("hidden");
  scoreContainer.classList.add("flex");
  quiz.classList.add("hidden");
  btnRestart.classList.remove("hidden");
  if (score < 2) {
    quizDescription.innerText = "Lo importante es participar...🤪";
  } else if (score <= 4) {
    quizDescription.innerText = "Deberías estudiar más...👎";
  } else if (score === 5) {
    quizDescription.innerText = "¡Ufff! Aprobado por los pelos...😅";
  } else if (score < 8) {
    quizDescription.innerText =
      "No está mal, ¡seguro que lo harás mejor la próxima vez! 👍";
  } else if (score < 10) {
    quizDescription.innerText = "¡Felicidades! 👏 Estás cerca de la excelencia";
  } else if (score === 10) {
    quizDescription.innerText =
      "¡Enhorabuena! 👏 Tu cerebro será donado a la ciencia 🤯";
  }
}

btnNext.addEventListener("click", nextQuestion);
function nextQuestion() {
  btnNext.disabled = false;
  btnNext.style.cursor = "pointer";
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    while (answers.firstChild) {
      answers.removeChild(answers.firstChild);
    }
    showQuestions();
  } else {
    showScore();
  }
}
