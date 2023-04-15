// make the array of words
const getData = async () => {
  const res = await fetch("https://abdelrhman-shibl44.github.io/speed-words/data/data.json");
  const data = await res.json();
  const words = data.map((item) => item.word);
  return words;
}

// get the items
const totalSpan   = document.querySelector(".control .total");
const container  = document.querySelector(".speedWordsGame");
const input  = document.querySelector(".speedWordsGame input");
const button  = document.querySelector(".speedWordsGame button");
const choosenWord = document.querySelector(".speedWordsGame .theWord");
const upcomingWords  = document.querySelector(".speedWordsGame .theUpcoming_words");
const leftTime = document.querySelector(".timeLeft");
const score = document.querySelector(".speedWordsGame .got");
const seconds = document.querySelector(".message span:last-child");
const normalVl  = document.querySelector(".Normal");
const levelSpan = document.querySelector(".message > span");
const arrowHolder = document.querySelector(".arrowHolder");
let state = sessionStorage.getItem("state") || "Normal"
// Setting Levels
const lvls = {
  Easy: 6,
  Normal: 4,
  Hard: 2,
};
// Default Lvl
let defaultLevelName = state || "Normal"; // here you can change level
let defaultLevelSeconds = lvls[defaultLevelName];

document.querySelector(".decorated li:first-child").onclick = function () {
  sessionStorage.setItem("state", "Normal")
  normalVl.innerText = "Normal"
  levelSpan.innerText ="Normal"
  seconds.innerText = 4;
  leftTime.innerText = 4;
  removeOpen();
};
document.querySelector(".decorated li:nth-child(2)").onclick = function () {
  sessionStorage.setItem("state", "Easy")
  normalVl.innerText = "Easy"
  levelSpan.innerText ="Easy" 
  seconds.innerText = 6;
  leftTime.innerText = 6;
  removeOpen();
};

document.querySelector(".decorated li:last-child").onclick = function () {
  sessionStorage.setItem("state","Hard")
  normalVl.innerText = "Hard"
  levelSpan.innerText = "Hard"
  seconds.innerText = 2;
  leftTime.innerText = 2;
  removeOpen();
};


function removeOpen() {
  document.querySelector(".decorated").classList.remove("open");
}
// addContent to page
levelSpan.innerText = state
normalVl.innerText = state
seconds.innerText = defaultLevelSeconds;
leftTime.innerText = defaultLevelSeconds;
// disablepasteEvent
input.onpaste = function () {
  return false;
};
// whenClick
button.onclick = function () {
  setTimeout(function () {
    leftTime.innerText = 6;
  }, 100);
  this.remove();
  input.focus();
  getRandomWord();
};
// get random word
let words = []
async function getRandomWord() {
  words = await getData();
  const lengthOfWords = words.length;
  totalSpan.innerText = lengthOfWords;
   randomWord = words[Math.floor(Math.random() * lengthOfWords)];
   // get the indexOf the word
  const wordIndex = words.indexOf(randomWord);
   // remove the word from the page by its index
  words.splice(wordIndex, 1);
   // empty the upcoming words
  upcomingWords.innerText = "";
   // put the randomword to the page
  choosenWord.innerText = randomWord;
   // createSpan and put it in the page
  words.splice(0,50).forEach((word) => {
    const span = document.createElement("span");
    span.innerText = word;
    upcomingWords.appendChild(span);
  });
  playwords();
}
// start interval
let start = null

score.innerText = 0;
scoreLocak = 1;
function playwords() {
  leftTime.innerText = defaultLevelSeconds;
  if (levelSpan.innerText === "Normal") {
    leftTime.innerText = 4;
  }
  if (levelSpan.innerText === "Easy") {
    leftTime.innerText = 6;
  }
  if (levelSpan.innerText === "Hard") {
    leftTime.innerText = 2;
  }

  // setting time up
  start = setInterval( async function () {
    leftTime.innerText--;
    if (leftTime.innerText === "0") {
      clearInterval(start);
      // chek if two words are the same
        checkWords()
    }
  }, 1000);
}

// when click enter get the next word 
input.addEventListener("keydown", (e) => {
  if(e.key === "Enter"){
    checkWords()
    clearInterval(start);
    e.target.value = "";
  }
});
// check words 
  const checkWords = () => {
    if (input.value.toLowerCase() === randomWord.toLowerCase()) {
      input.value = "";
      score.innerText++;
      localStorage.setItem("date", new Date().toString());
      window.localStorage.setItem("score", scoreLocak++);
      if (words.length > 0) {
        getRandomWord();
    } else {
      div = document.createElement("div");
      div.innerHTML = "Congratulations </br> All Answers Is Right";
      div.className = "success";
      upcomingWords.appendChild(div);
    }
  } else {
    span = document.createElement("span");
    restartBtn = document.createElement("button");
    restartBtn.appendChild(document.createTextNode("Restart"));
    restartBtn.className = "restartBtn";
    span.appendChild(document.createTextNode("Wrong word"));
    span.appendChild(restartBtn);
    span.className = "GameOver";
    document.querySelector("body").appendChild(span);
    restartBtn.onclick = () => location.reload();
  }
}
// when click on select
arrowHolder.addEventListener("click", function () {
  document.querySelector(".decorated").classList.toggle("open");
});
