// list variables
var navigation = document.querySelector("#navigation");
var startButton = document.querySelector("#startBtn");
var quizContainer = document.querySelector("#quizContainer");
var quizTitle = document.querySelector("#quizTitle");
var quizIntro = document.querySelector("#quizIntro");
var answerContainer = document.querySelector("#answerContainer");
var quizQuestion = document.querySelector("#quizQuestion");
var quizResult =  document.querySelector("#quizResult");
var counter = document.querySelector("#counter");

var initialsContainer = document.querySelector("#initialsContainer");
var submitButton = document.querySelector("#submitBtn");
var initialsInput = document.querySelector("#initials");
var scoreContainer = document.querySelector("#scoreContainer");
var scoreList = document.querySelector("#scoreList");
var finalScore = document.querySelector("#finalScore");
var showHighScore = document.querySelector("#showHighScore");

var optionA = document.querySelector("#optionA");
var optionB = document.querySelector("#optionB");
var optionC = document.querySelector("#optionC");
var optionD = document.querySelector("#optionD");

let score = 0;
let currentNum = 0;
let seconds = 60;
let countDownTimer;
let highScores = [];

// quiz questions
var questions = [
    {
        question: "What does window.alert() return?",
        options: {
            a: "a. An alert that indicates a window is open", 
            b: "b. An alert box appears with the message contained in the ()", 
            c: "c. A prompt with ok and cancel choices", 
            d: "d. You left a window open and a draft is coming in the house"
        },
        answer: "b"
    }, 
    {
        question: "What are the two types of values in JavaScript?",
        options: {
            a: "a. Literals and Variables",
            b: "b. Var and const",
            c: "c. Fixed values and Variable values",
            d: "d. none of the above"
        },
        answer: "c"
    }, 
    {
        question: "How many data types are there in JavaScript?",
        options: {
            a: "a. 3", 
            b: "b. 4", 
            c: "c. 7", 
            d: "d. 2"
        },
        answer: "a"
    },
    {
        question: "What are three branching conditional statements?",
        options: {
            a: "a. when, where, why", 
            b: "b. if-then, if-than-else, else if", 
            c: "c. that, this, equals", 
            d: "d. none of the above"
        },
        answer: "b"
    },
    {
        question: "What is the JavaScript <switch> statement used for?",
        options: {
            a: "a. to switch the order of statements in the .js file",
            b: "b. to perform different actions based on different conditions",
            c: "c. to switch whether a function runs or not",
            d: "d. None of the above"
        },
        answer: "b"
    }
]

var changeTimer = function() {
    countDownTimer = setInterval(timer, 1000);
}

// create timer
var timer = function() {
    seconds--;

    if (seconds < 0) {
        seconds = 0;
        highScoreInitials();
        clearInterval(countDownTimer);
    }
    counter.textContent = `Time: ${seconds}`;
}

// create question elements and set their text
var createQuestions = function(currentQuestionChoices) {
    // set the text inside the questions
    optionA.textContent = currentQuestionChoices.a;
    optionB.textContent = currentQuestionChoices.b;
    optionC.textContent = currentQuestionChoices.c;
    optionD.textContent = currentQuestionChoices.d;

    optionA.onclick = selectAnswerHandler;
    optionB.onclick = selectAnswerHandler;
    optionC.onclick = selectAnswerHandler;
    optionD.onclick = selectAnswerHandler;
};

// go through each of the answer options and return the correct answer
var findCorrectAnswer = function() {
    var currentQuestionChoices = questions[currentNum].options;
    quizQuestion.textContent = questions[currentNum].question;
    createQuestions(currentQuestionChoices);

    // get the key that matches the value of the answer
    var answerKey = function(answer) {
        return answer === questions[currentNum].answer;
    }

    // get an array of the options' keys and find the first one that matches the answer's value
    var findAnswer = Object.keys(questions[currentNum].options).find(answerKey);
    var answer = questions[currentNum].options[findAnswer];

    return answer;
}

// check their answer and show correct or incorrect message
var selectAnswerHandler = function(event) {
    setTimeout(function() {
        quizResult.classList.add("fade");
    }, 900);

    if (event.target.textContent === findCorrectAnswer()) {
        quizResult.textContent = "Correct!";
        quizResult.style.color = "#249233";
        score+=10;
    } else {
        quizResult.textContent = "Incorrect!";
        quizResult.style.color = "#fd0b0b";
        seconds-=10;
    }
    quizResult.classList.remove("fade");

    currentNum++;

    if (currentNum < questions.length) {
        findCorrectAnswer();
    } else {
        highScoreInitials();
    }
}

// show the high score
var highScoreInitials = function() {
    answerContainer.classList.add("hidden");
    initialsContainer.classList.remove("hidden");
    finalScore.textContent = `Your final score is ${score}`;
    clearInterval(countDownTimer);
}

// create the elements
var createHighScoreEl = function(scoreObject) {

    var scoreItemEl = document.createElement("li");
    scoreItemEl.className = "score-item";
    scoreItemEl.className = "score-list-item";

    var scoreInitialsEl = document.createElement("div");
    scoreInitialsEl.innerHTML = "<p>" + scoreObject.name + "</p>";

    var scoreNumberEl = document.createElement("div");
    scoreNumberEl.innerHTML = "<p>" + scoreObject.score + "</p>";

    scoreList.appendChild(scoreItemEl);
    scoreItemEl.appendChild(scoreInitialsEl);
    scoreItemEl.appendChild(scoreNumberEl);

    // add high score to array
    highScores.push(scoreObject);

    // save scores to local storage
    saveScores();
}

// save to local storage
var saveScores = function() {
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

// gets scores from local storage
var loadScores = function() {
    let savedScores = localStorage.getItem("highScores");

    // Sets to empty if scores is null
    if (!savedScores) {
        return false;
    } 

    savedScores = JSON.parse(savedScores);
    savedScores.forEach(function(score) {
        createHighScoreEl(score);
    });
}

// handle form submission
var highScoreHandler = function() {
    var initialsValue = initialsInput.value;

    var highScoreObject = {
        name: initialsValue,
        score: score
    };

    loadScores();
    createHighScoreEl(highScoreObject);

    navigation.classList.add("hidden");
    var backButton = document.createElement("button");
    backButton.textContent = "Go back";
    backButton.classList.add("primary-button");
    scoreContainer.appendChild(backButton);

    backButton.onclick = function() {
        reset();
        backButton.remove();
    }
}

// reset quiz
var reset = function() {
    score = 0;
    currentNum = 0;
    seconds = 60;

    scoreContainer.classList.add("hidden");
    quizTitle.classList.remove("hidden");
    quizIntro.classList.remove("hidden");
    navigation.classList.remove("hidden");
    startButton.classList.remove("hidden");

    counter.textContent = "Time: 0";
}

// submit high score
submitButton.onclick = function(e) {
    // Show alert if the input is empty
    if (initialsInput.value === '') {
        alert("Please enter your initials.");
        return false;
    }
    e.preventDefault();
    initialsContainer.classList.add("hidden");
    scoreContainer.classList.remove("hidden");
    highScoreHandler();
    initialsInput.value = '';
}

// start the quiz
startButton.onclick = function() {
    changeTimer();
    answerContainer.classList.remove("hidden");
    quizTitle.classList.add("hidden");
    quizIntro.classList.add("hidden");
    quizResult.classList.remove("hidden");
    startButton.classList.add("hidden");
    findCorrectAnswer();
}