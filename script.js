// consts for buttons and for interacting with the quiz
const startButton = document.getElementById('start_button')
const nextQuestionButton = document.getElementById('next-btn')
const questionContainerEl = document.getElementById('question-container')
const rulesContainer = document.getElementById('container')
const questionEl = document.getElementById('question')
const answerButtonEl = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex
startButton.addEventListener('click', startQuiz)
nextQuestionButton.addEventListener('click', () => {
    currentQuestionIndex++
    showNextQuestion()
})

// timer: 75 seconds to complete the quiz
var timeEl = document.querySelector(".time");
var secondsLeft = 75;

function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds remaining!";

    if(secondsLeft === 0) {
      // keeps timer on track and on pace. Calls back to the setTime function?
      clearInterval(timerInterval);
      sendMessage("time is up!");
    }

  }, 1000);
}
// Trying to set up 5 sec penalty
// document.getElementById('wrong').addEventListener('click', function() {
//     sec -= 5;
//     document.querySelector(".time").innerHTML='00:'+sec;
// });
setTime();

// function to start Quiz App
function startQuiz() {
    startButton.classList.add("hide")
// Randomly pulls questions from the questions array below
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("hide")
    showNextQuestion()
}

// Will show the next question in the question Array
function showNextQuestion() {
    resetPage()
    showNewQuestion(shuffledQuestions[currentQuestionIndex])
}

function showNewQuestion(question) {
    rulesContainer.classList.add("hide")
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", pickAnswer)
        answerButtonEl.appendChild(button)
    })
}

function resetPage() {
    clearStatusClass(document.body)
    nextQuestionButton.classList.add("hide")
    while (answerButtonEl.firstChild) {
        answerButtonEl.removeChild(answerButtonEl.firstChild)
    }
}

// selects answers from question array below
function pickAnswer(e) {
    const pickedButton = e.target
    const correct = pickedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextQuestionButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

// Questions to be asked in the quiz (5 very basic questions about JavaScript)
const questions = [{
    question: "Who Invented JavaScript?",
    answers: [
        { text: "Gregory Leighton", correct: false },
        { text: "Brendan Eich", correct: true },
        { text: "Albrecht Java", correct: false }
    ]
},
{
    question: "What Year Was JavaScript Invented?",
    answers: [
        { text: 2020, correct: false },
        { text: 1981, correct: false },
        { text: 1995, correct: true } 
    ]
},
{
    question: "What is a Function in JavaScript?",
    answers: [
        { text: "A way to store code that we can use later", correct: true },
        { text: "The same thing as a function in mathematics", correct: false },
        { text: "I have no idea", correct: false }
    ]
},
{
    question: "What is a Variable in JavaScript?",
    answers: [
        { text: "A variable is anything that can vary", correct: false },
        { text: "A way that data can be stored and deployed", correct: true },
        { text: "A way that JavaScript works", correct: false }
    ]
},
{
    question: "Is JavaScript related to Java?",
    answers: [
        { text: "Yes", correct: false },
        { text: "No", correct: true },
        { text: "I think so", correct: false }
    ]
},
]
