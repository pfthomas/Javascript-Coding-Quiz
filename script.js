var startButton = document.getElementById("start-button");
var quiz = document.getElementById("quiz");
var questions = document.getElementById("questions");
var choices = document.getElementById("choices");
var choice1 = document.getElementById("1");
var choice2 = document.getElementById("2");
var choice3 = document.getElementById("3");
var choice4 = document.getElementById("4");
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("time-left")
var score = document.querySelector("hiscore-container");

//declaring variables

//questions for quiz
//================================================================================
var quizQuestions = [{ 
    question: "_______ is the process of finding errors and fixing them within a program.",
    choices: ["Compiling", "Executing", "Debugging", "Scanning"],
    correctAnswer: 3 
}, { 
    question: "Javascript is an ___ language?",
    choices: ["Object-Oriented", "Object-Based", "Procedural", "None of the Above"],
    correctAnswer: 1
}, {
    question: "Which of the following keywords is used to define a variable in Javascript?",
    choices: ["var", "let", "Both A and B", "None of the above"],
    correctAnswer: 3,
}] 
//==================================================================================
//declaring variables
//================================================================================
var currentQuestion = 0;
var qnum = 0;
var correctAnswer = 0;
var currentScore;
//==================================================================================

startButton.addEventListener("click", startQuiz());
startButton.onclick = startQuiz();
choice1.addEventListener("click", choose1);
choice2.addEventListener("click", choose2);
choice3.addEventListener("click", choose3);
choice4.addEventListener("click", choose4);

submitInitials.addEventListener("click",function(event){
    storeHiScores(event);
})

viewHiScore.addEventListener("click", function(event){
    showHiScores(event);
})

//==========================================
//function to start the quiz
function startQuiz() {

currentQuestion = 0;
time = 60;
timeLeft.textContent = totalTime;
startButton.style.display = "none";
quiz.style.display = "block";
timer.style.display = "block";

displayQuestion();
startCountdown();
}

function displayQuestion(){
questions.textContext = quizQuestions[currentQuestion].question;
choice1.textContent = quizQuestions[currentQuestion].choices[0];
choice2.textContent = quizQuestions[currentQuestion].choices[1];
choice3.textContent = quizQuestions[currentQuestion].choices[2];
choice4.textContent = quizQuestions[currentQuestion].choices[3];

}

function checkQuestion(choice){

    if (questions[currentQuestion].choice === quizQuestions[currentQuestion].correctAnswer)
    {
        currentScore = currentScore + 10;

    }
    else {
        totalTime -= 5;
        timeLeft.textContent = totalTime;
    }

    currentQuestion++;

if (currentQuestion < quizQuestions.length) {
    displayQuestion();
} 
else {
    endGame();
}

}


function startCountdown()
{
    //setting timer
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount === 0) {
            clearInterval(timer);
            endGame();
        }
    })
}


function storeHiScores(event) {
    event.preventDefault();

    if (initialInput === "")
    {
        return;
    }


    var savedHiScores = localStorage.getItem("hi-scores");
    var scoresArray;

    if (savedHiScores === null) {
        scoresArray = [];
    }   
    else {
        scoresArray = JSON.parse(savedHiScores);
    }
    var userScore = {
        initials: initalInput.value, 
        score: finalScore.textContent
    };

    scoresArray.push(userScore);

    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("hi-scores", scoresArrayString);

    showHiScores();
}


function showHiScores() {

    startButton.style.display = "none";
    timer.style.display = "none";
    quiz.style.display = "none";
    completion.style.display = "none";
    score.style.display = "block";

    var savedHiScores = localStorage.getItem("hi-scores");

    if (savedHiScores === null) {
        return;
    }


    var storedHiScores = JSON.parse(savedHiScores);

    for (i=0; i < storedHiScores.length; i++) {
        var newHiScore = document.createElement("p");
        newHiScore.innerHTML = storedHiScores[i].initials +" "+ storedHiScores[i].score;
        listOfHiScores.appendChild(newHiScore);
    }
}