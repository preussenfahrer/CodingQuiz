// Variables selecting key HTML elements (div id "quiz" and "results", also the submit button)
var quizContainer = document.getElementById("quizholder");
var resultsContainer = document.getElementById("quizresults");
var answerButton = document.getElementById("quizbutton");

// Skeleton for building the quiz itself: these are the functions building the quiz and for showing the results
function quizBuilder() {
    // variable stores HTML output
    var output = [];

    // code for listing each question
    quizQuestions.forEach(
        (currentQuestion, questionNumber) => {
            // variable storing lists of answers to questions
            var answers = [];

            // variable for storing individual answers
            for (letter in currentQuestion.answers) {
                answers.push(
                    <label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        </input>
                        ${letter} :
                        ${currentQuestion.answers[letter]}
                    </label>
                );
            }
        }

        // add question and answers to output
        output.push(
            <div class="question">
                ${currentQuestion.question}
            </div>
            <div class="answers"> ${answers.join("")} </div>
        );
    )
}

function resultsShower() {

}

// display quiz right away (can add timer element here, maybe for an intro page?)
quizBuilder();

// when answer submitted, show results
answerButton.addEventListener('click', resultsShower);

// Quiz questions. Random topics for the purpose of practicing JS, will make more appropriate before final commit.
