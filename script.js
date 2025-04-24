var resultMessage = document.getElementById("resultMessage");
var timerElement = document.getElementById("timer");
var questionElement = document.querySelector(".question");
var answerElement = document.querySelector(".answer");
var resultElement = document.querySelector(".ruselt");
var scoreElement = document.getElementById("score");
var gameOverElement = document.querySelector(".gameover");
var submitButton = document.querySelector(".btn");
var nextButton = document.querySelector(".btn1");
var finalScoreElement = document.getElementById("finalScore");
var btnfinal = document.querySelector("#message");
var timerInterval;
var score = 0;
var questionCount = 0;
var maxQuestions = 10;
var correctAnswer = 0;

function stopTimer() {
  clearInterval(timerInterval);
}

function startTimer() {
  stopTimer();
  var seconds = 10;
  timerElement.innerHTML = `Time: ${seconds}s`;
  timerInterval = setInterval(() => {
    seconds--;
    timerElement.innerHTML = `Time: ${seconds}s`;
    if (seconds <= 0) {
      handleTimeout();
    }
  }, 1000);
}

function handleTimeout() {
  stopTimer();
  showResult(`⏰ Time's up! Correct: ${correctAnswer}`, "orange");
  nextQuestion();
}

function checkAnswer() {
  stopTimer();
  var userAnswer = parseInt(answerElement.value);
  if (!isNaN(userAnswer)) {
    if (userAnswer === correctAnswer) {
      score++;
      showResult("✅ Correct!", "green");
    } else {
      showResult(`❌ Wrong! Correct: ${correctAnswer}`, "red");
    }
    nextQuestion();
  }
}
function showResult(message, color) {
  resultElement.innerHTML = message;
  resultElement.style.color = color;
  resultElement.style.display = "block";
}

function nextQuestion() {
  questionCount++;
  answerElement.value = "";
  if (questionCount < maxQuestions) {
    setTimeout(generateQuestion, 1500);
  } else {
    endGame();
  }
}

function generateQuestion() {
  resultElement.style.display = "none";
  questionElement.style.display = "block";
  answerElement.style.display = "block";
  nextButton.style.display = "inline-block";
  submitButton.style.display = "none";
  var num1 = Math.floor(Math.random() * 10) + 1;
  var num2 = Math.floor(Math.random() * 10) + 1;
  correctAnswer = num1 * num2;
  questionElement.innerHTML = `What is ${num1} x ${num2}?`;
  startTimer();
}
function hey() {
  nextButton.innerHTML = "Next";
  submitButton.style.display = "none";
  nextButton.style.cssText = `
        background-color: #52e2fc;     color: white;     padding: 10px;     height: 5vh;     width: 80px;     border: none;     border-radius: 10%;     cursor: pointer;     font-size: 16px;     transition: background-color 0.3s ease;     display: flex;     align-items: center;     justify-content: center;     margin-top: 20px;     margin-left: auto;     margin-right: auto;     margin-buttom: 50px;     text-align: center;     display: flex;     justify-content: center;     align-items: center;     font-weight: bold;;
    nextButton.style.display = "flex";
    scoreElement.style.display = "none";
    answerElement.style.display = "block";
    questionElement.style.display = "block";
    resultElement.style.display = "block";
    `;
  generateQuestion();
}
submitButton.addEventListener("click", hey);
function endGame() {
  stopTimer();

  document.getElementById("gamecontainer").style.display = "none";
  gameOverElement.style.display = "block";
  finalScoreElement.innerHTML = `Your score: ${score}/10`;
  clearInterval(timerInterval);
  checkScore();
  timerElement.style.display = "none";
  btnfinal.style.display = "block";
  resultElement.style.display = "none";
}
function checkScore() {
  if (score >= 5) {
    resultMessage.innerHTML = "🏆 You passed! 🎉";
    resultMessage.style.color = "green";
  } else {
    resultMessage.innerHTML = "💔 Try again! 😢";
    resultMessage.style.color = "red";
  }
  resultMessage.style.display = "block";
}

function restartGame() {
  score = 0;
  questionCount = 0;
  gameOverElement.style.display = "none";
  document.getElementById("gamecontainer").style.display = "block";
  resultElement.style.display = "none";
  scoreElement.style.display = "none";
  timerElement.style.display = "block";
  submitButton.style.display = "inline-block";
  nextButton.style.display = "none";
  answerElement.style.display = "none";
  questionElement.style.display = "none";
  hey();
}
submitButton.addEventListener("click", hey);
nextButton.addEventListener("click", checkAnswer);
answerElement.addEventListener("keydown", function (event) {
  if (event.key === "Enter") checkAnswer();
});
