const scoreContainerNav = document.querySelector("#scoreContainerNav");
const scoreListNav = document.querySelector("#scoreListNav");


// Show high score from nav
window.onload = function() {
    let savedScores = localStorage.getItem("highScores");
    savedScores = JSON.parse(savedScores);

    console.log("savedScores");

    savedScores.forEach(function(score) {
        createHighScorePageEl(score);
    });

    const backButton = document.createElement("button");
    backButton.textContent = "Go back";
    backButton.classList.add("primary-button");
    scoreContainerNav.appendChild(backButton);

    backButton.onclick = function() {
        history.back();
        backButton.remove();
    }
}

// Create elements on highscore page
const createHighScorePageEl = function(scoreObject) {

    const scoreItemEl = document.createElement("li");
    scoreItemEl.className = "score-item";
    scoreItemEl.className = "score-list-item";

    const scoreInitialsEl = document.createElement("div");
    scoreInitialsEl.innerHTML = "<p>" + scoreObject.name + "</p>";

    const scoreNumberEl = document.createElement("div");
    scoreNumberEl.innerHTML = "<p>" + scoreObject.score + "</p>";

    scoreListNav.appendChild(scoreItemEl);
    scoreItemEl.appendChild(scoreInitialsEl);
    scoreItemEl.appendChild(scoreNumberEl);
}