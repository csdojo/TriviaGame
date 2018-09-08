
$("#quiz").hide();
$("#results").hide();
$("#submit").hide();
$("#start").show();
var clockRunning = false;

$("#start").on("click", function () {
  $("#quiz").show();
  $("#submit").show();
  $("#start").hide();
  buildQuiz();

  var timeLeft = 20;
  var elem = document.getElementById('time');

  var timerId = setInterval(countdown, 1000);

  function countdown() {
    clockRunning = true;
    if (timeLeft == -1) {
      clearTimeout(timerId);
      doSomething();

    } else {
      elem.innerHTML = timeLeft + ' seconds';
      timeLeft--;
      $("#submit").on("click", function () {
        $("#quiz").hide();
        clearTimeout(timerId);
        showResults();
        $("#results").show();
        $("#submit").hide();
      });
    }
  }
});

function buildQuiz() {
  // we'll need a place to store the HTML output

  var output = [];

  // for each question...
  myQuestions.forEach((currentQuestion, questionNumber) => {
    // we'll want to store the list of answer choices
    var answers = [];

    // and for each available answer...
    for (letter in currentQuestion.answers) {
      // ...add an HTML radio button
      answers.push(
        `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
      );
    }

    // add this question and its answers to the output
    output.push(
      `<div class="question"> ${currentQuestion.question} </div>
          <div style="color:rgb(253, 211, 155)" class="answers"> ${answers.join("")} </div>`
    );

  });

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join("");
}

function doSomething() {
  $("#button").hide();
  $(".lead").hide();
  $("#time").hide();
  $("#quiz").hide();
  $("#submit").hide();
  $("#results").show();
  showResults();
}
function showResults() {
  // gather answer containers from our quiz
  var answerContainers = quizContainer.querySelectorAll(".answers");

  // keep track of user's answers
  let numCorrect = 0;
  let numIncorrect = 0;
  let unanswered = 0;

  // for each question...
  myQuestions.forEach((currentQuestion, questionNumber) => {
    // find selected answer
    var answerContainer = answerContainers[questionNumber];
    var selector = `input[name=question${questionNumber}]:checked`;
    var userAnswer = (answerContainer.querySelector(selector) || {}).value;
    // console.log(userAnswer);

    console.log(typeof userAnswer, userAnswer, userAnswer == "undefined", userAnswer == undefined)
    // if answer is correct
    if (userAnswer === currentQuestion.correctAnswer) {
      // add to the number of correct answers
      numCorrect++;
      console.log("correct", numCorrect, numIncorrect, unanswered);

    } else if (userAnswer == undefined) {
            console.log("none", numCorrect, numIncorrect, unanswered);

            unanswered++;

    } else {
            console.log("wrong",numCorrect,  numIncorrect, unanswered);

      numIncorrect++;
    }

  });


  resultsContainer.innerHTML = `ALL DONE! <br> Correct Answers: ${numCorrect} <br> Incorrect Answers: ${numIncorrect}<br> Unanswered: ${unanswered}`;
}

var quizContainer = document.getElementById("quiz");
var resultsContainer = document.getElementById("results");
var submitButton = document.getElementById("submit");
var myQuestions = [
  {
    question: "What causes sunspots to appear on the surface of the Sun?",
    answers: {

      a: "An object crashes in.",
      b: "A burst of energy comes out.",
      c: "The magnetic field is distorted."
    },
    correctAnswer: "c"
  },
  {
    question: "Why does Mars appear red?",
    answers: {

      a: "Rust",
      b: "Ice",
      c: "Carbon Dioxide"
    },
    correctAnswer: "a"
  },
  {
    question: "Who discovered Pluto?",
    answers: {
      a: "Clyde Tombaugh",
      b: "Percival Lowell",
      c: "Tycho Brahe",
      d: "Galileo Galilei"
    },
    correctAnswer: "a"
  },
  {
    question: "What is the Sun mostly made of?",
    answers: {
      a: "Hydrogen",
      b: "Carbon",
      c: "Helium",
    },
    correctAnswer: "a"
  },
];
