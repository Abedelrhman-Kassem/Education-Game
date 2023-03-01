let container = document.querySelector(".container");
let question = document.querySelector(".question");
let word = document.querySelector(".word");
let choices = document.querySelector(".choices");
let button = document.querySelector("button");
let rightAnswers = 0;

async function getData(url) {
  try {
    let data = await fetch(url);
    let jsData = await data.json();

    let questionsNum = jsData.length;
    let current = jsData.splice(Math.floor(Math.random() * jsData.length), 1);
    let answers = Object.values(current[0]);
    answers = answers.slice(1, 5);

    createElements(current, answers);

    button.addEventListener("click", function () {
      if (jsData.length > 0) {
        countAnswers(current);
        current = jsData.splice(Math.floor(Math.random() * jsData.length), 1);
        answers = Object.values(current[0]);
        answers = answers.slice(1, 5);
        createElements(current, answers);
      } else {
        countAnswers(current);
        resultPopup(rightAnswers, questionsNum);
      }
    });
  } catch (reason) {
    throw error;
  }
}
getData("../json/reading.json").catch((reason) => console.log(Error(reason)));

function createElements(current, answers) {
  word.innerHTML = current[0].word;

  choices.innerHTML = `<div class="choice">
                        <input type="radio" checked name="answer" id="answer_1" /><label
                        for="answer_1"
                        >${answers.splice(
                          [Math.floor(Math.random() * answers.length)],
                          1
                        )}</label>
                        </div>

                        <div class="choice">
                        <input type="radio" name="answer" id="answer_2" /><label
                        for="answer_2"
                        >${answers.splice(
                          [Math.floor(Math.random() * answers.length)],
                          1
                        )}</label>
                        </div>
                        
                        <div class="choice">
                        <input type="radio" name="answer" id="answer_3" /><label
                        for="answer_3"
                        >${answers.splice(
                          [Math.floor(Math.random() * answers.length)],
                          1
                        )}</label>
                        </div>

                        <div class="choice">
                        <input type="radio" name="answer" id="answer_4" /><label
                        for="answer_4"
                        >${answers.splice(
                          [Math.floor(Math.random() * answers.length)],
                          1
                        )}</label>
                        </div>`;
}

function countAnswers(current) {
  let radiobuttons = document.getElementsByName("answer");
  radiobuttons.forEach((radio) => {
    let label = radio.nextElementSibling;
    if (radio.checked) {
      label.innerHTML === current[0].right_answer && ++rightAnswers;
    }
  });
}

function resultPopup(right, questionsNum) {
  container.innerHTML = `<div class="popup">
                            <div class="content">
                            Your Right Answers Is <span>${right}</span> From <span>${questionsNum}</span> Your
                            Appreciation is
                            </div>
                            <div class="buttons">
                            <button class="again-btn">Play Again</button>
                            <button class="another">Play Another Game</button>
                            </div>
                            </div>`;
  let contentDiv = document.querySelector(".content");
  if (right === questionsNum) contentDiv.innerHTML += `<span>Perfect</span>`;
  else if (right >= questionsNum / 2)
    contentDiv.innerHTML += `<span>Good</span>`;
  else contentDiv.innerHTML += `<span>Poor</span>`;

  let btn_again = document.querySelector(".again-btn");

  btn_again.addEventListener("mouseenter", () => {
    contentDiv.style.color = "#fff";
  });
  btn_again.addEventListener("mouseleave", () => {
    contentDiv.style.color = "#000";
  });
  btn_again.addEventListener("click", () => {
    location.reload();
  });

  let btn_another = document.querySelector(".another");

  btn_another.addEventListener("mouseenter", () => {
    contentDiv.style.color = "#fff";
  });
  btn_another.addEventListener("mouseleave", () => {
    contentDiv.style.color = "#000";
  });
  btn_another.addEventListener("click", () => {
    window.open("../index.html", "_self");
  });
}

setTimeout(() => {
  container.style.top = "15px";
}, 1000);

setTimeout(() => {
  let i = 0;
  let timer = setInterval(() => {
    let content = question.dataset.write;
    question.textContent += content[i];
    if (i++ === content.length - 1) {
      clearInterval(timer);
    }
  }, 50);
}, 1800);

setTimeout(() => {
  word.style.opacity = 1;
}, 3200);

setTimeout(() => {
  button.style.opacity = 1;
}, 3800);
