// make the array of words
const words = [
  "how",
  "and",
  "spend",
  "about",
  "communities",
  "you",
  "belong",
  "because",
  "enough",
  "probably",
  "take",
  "tend",
  "different",
  "joined",
  "play",
  "forget",
  "circle",
  "many",
  "first",
  "woman",
  "sklodowska",
  "physics",
  "prize",
  "husband",
  "Pirre",
  "Nobel",
  "thinking",
  "people",
  "music",
  "video",
  "studio",
  "production",
  "include",
  "those",
  "stage",
  "musican",
  "marine",
  "windMills",
  "Germany",
  "indonesia",
  "progrmming",
];

// get the items
TimeLeftSpan = document.querySelector(".timeLeft");
TotalSpan = document.querySelector(".control .total");
thecontainer = document.querySelector(".speedWordsGame");
theInput = document.querySelector(".speedWordsGame input");
thebutton = document.querySelector(".speedWordsGame button");
thechoosenWord = document.querySelector(".speedWordsGame .theWord");
theUpcomingWords = document.querySelector(".speedWordsGame .theUpcoming_words");
theLeftTime = document.querySelector(".timeLeft");
acheivedScore = document.querySelector(".speedWordsGame .got");
secondsSpan = document.querySelector(".message span:last-child");
theNormalvl = document.querySelector(".Normal");
lvlSpan = document.querySelector(".message > span");
arrowHolder = document.querySelector(".arrowHolder")

// Setting Levels
const lvls = {
  Easy: 3,
  Normal: 4,
  Hard: 2,
};
// Default Lvl
let defaultLevelName = "Normal"; // here you can change level
let defaultLevelSeconds = lvls[defaultLevelName];

document.querySelector(".decorated li:first-child").onclick = function () {
  theNormalvl.innerText = "Normal";
  lvlSpan.innerText = "Normal";
  secondsSpan.innerText = 4;
  TimeLeftSpan.innerText = 4;
  removeOpen();
};
document.querySelector(".decorated li:nth-child(2)").onclick = function () {
  theNormalvl.innerText = "Easy";
  lvlSpan.innerText = "Easy";
  secondsSpan.innerText = 3;
  TimeLeftSpan.innerText = 3;
  removeOpen();
};

document.querySelector(".decorated li:last-child").onclick = function () {
  theNormalvl.innerText = "Hard";
  lvlSpan.innerText = "Hard";
  secondsSpan.innerText = 2;
  TimeLeftSpan.innerText = 2;
  removeOpen();
};

function removeOpen() {
  document.querySelector(".decorated").classList.remove("open");
}
// addContent to page
lvlSpan.innerText = defaultLevelName;
secondsSpan.innerText = defaultLevelSeconds;
TimeLeftSpan.innerText = defaultLevelSeconds;
lenghtOfWords = words.length;
TotalSpan.innerText = lenghtOfWords;
// disablepasteEvent
theInput.onpaste = function () {
  return false;
};
// whenClick
thebutton.onclick = function () {
  setTimeout(function () {
    TimeLeftSpan.innerText = 6;
  }, 0);
  this.remove();
  theInput.focus();
  getRandomWord();
};
// get random word
function getRandomWord() {
  randomWord = words[Math.floor(Math.random() * words.length)];
  // get the indexOf the word
  wordIndex = words.indexOf(randomWord);
  // remove the word from the page by its index
  words.splice(wordIndex, 1);
  console.log(words);
  // empty the upcoming words
  theUpcomingWords.innerText = "";
  // put the randomword to the page
  span = document.createElement("span");
  thechoosenWord.innerText = randomWord;
  // createSpan and put it in the page
  words.forEach((word) => {
    span = document.createElement("span");
    span.innerText = word;
    theUpcomingWords.appendChild(span);
  });
  playwords();
}

acheivedScore.innerText = 0;
acheivedScoreLocak = 1;
function playwords() {
  if (lvlSpan.innerText === "Normal") {
    TimeLeftSpan.innerText = 4;
  }
  if (lvlSpan.innerText === "Easy") {
    TimeLeftSpan.innerText = 3;
  }
  if (lvlSpan.innerText === "Hard") {
    TimeLeftSpan.innerText = 2;
  }
  TimeLeftSpan.innerText = defaultLevelSeconds;

  // setting time up
  let start = setInterval(function () {
    theLeftTime.innerText--;
    if (theLeftTime.innerText === "0") {
      clearInterval(start);
      // chek if two words are the same
      if (theInput.value.toLowerCase() === randomWord.toLowerCase()) {
        theInput.value = "";
        acheivedScore.innerText++;
        localStorage.setItem("date", new Date().toString());
        window.localStorage.setItem("score", acheivedScoreLocak++);
        if (words.length > 0) {
          getRandomWord();
        } else {
          div = document.createElement("div");
          div.innerHTML = "Congratulations </br> All Answers Is Right";
          div.className = "good";
          theUpcomingWords.appendChild(div);
        }
      } else {
        span = document.createElement("span");
        restartBtn = document.createElement("button");
        restartBtn.appendChild(document.createTextNode("Restart"));
        restartBtn.className = "restartBtn";
        span.appendChild(document.createTextNode("GameOver"));
        span.appendChild(restartBtn)
        span.className = "GameOver";
        document.querySelector("body").appendChild(span);
        restartBtn.onclick = () => location.reload()
      }
    }
  }, 1000);
}
// when click on select
arrowHolder.addEventListener("click", function () {
  document.querySelector(".decorated").classList.toggle("open");
});