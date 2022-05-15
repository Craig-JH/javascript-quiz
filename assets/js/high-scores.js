var scoreContainerNav = document.querySelector("#scoreContainerNav");
var scoreListNav = document.querySelector("#scoreListNav");


// show high score from nav
window.onload = function() {
    let savedScores = localStorage.getItem("highScores");
    savedScores = JSON.parse(savedScores);

    console.log("savedScores");

    savedScores.forEach(function(score) {
        createHighScorePageEl(score);
    });

    var backButton = document.createElement("button");
    backButton.textContent = "Go back";
    backButton.classList.add("primary-button");
    scoreContainerNav.appendChild(backButton);

    backButton.onclick = function() {
        history.back();
        backButton.remove();
    }
}

// create elements on highscore page
var createHighScorePageEl = function(scoreObject) {

    var scoreItemEl = document.createElement("li");
    scoreItemEl.className = "score-item";
    scoreItemEl.className = "score-list-item";

    var scoreInitialsEl = document.createElement("div");
    scoreInitialsEl.innerHTML = "<p>" + scoreObject.name + "</p>";

    var scoreNumberEl = document.createElement("div");
    scoreNumberEl.innerHTML = "<p>" + scoreObject.score + "</p>";

    scoreListNav.appendChild(scoreItemEl);
    scoreItemEl.appendChild(scoreInitialsEl);
    scoreItemEl.appendChild(scoreNumberEl);
}