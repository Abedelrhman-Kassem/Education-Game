let container = document.querySelector(".container");
let word = document.querySelector(".word");
let solutionDiv = document.querySelector(".solution");
let lettersDiv = document.querySelector(".letters");
let submitBtn = document.querySelector(".submit");

async function getData() {
  let data = await fetch("../json/writing.json");
  let jsData = await data.json();

  let current = jsData.splice(Math.floor(Math.random() * jsData.length), 1);

  putData(jsData, current);

  submitBtn.addEventListener("click", () => {
    let arr = [];
    for (let i = 0; i < solutionDiv.children.length; i++) {
      arr.unshift(solutionDiv.children[i].innerHTML);
    }

    if (arr.join("") === current[0].answer) {
      if (jsData.length > 0) {
        current = jsData.splice(Math.floor(Math.random() * jsData.length), 1);
        putData(jsData, current);
      } else popUp();
    } else {
      putData(jsData, current);
      // document.getElementById("wrong").play();
    }
  });
}
getData();

function putData(jsData, current) {
  word.innerHTML = current[0].word;
  lettersDiv.innerHTML = "";
  solutionDiv.innerHTML = "";

  let answer = current[0].answer;
  for (let i = 0; i < answer.length; i++) {
    let span = document.createElement("span");
    solutionDiv.prepend(span);
  }
  let answerArray = answer.split("");
  for (let i = 0; i < answerArray.length; ) {
    let span = document.createElement("span");
    span.innerHTML = answerArray.splice(
      Math.floor(Math.random() * answerArray.length),
      1
    );
    lettersDiv.append(span);
  }
  clickData(solutionDiv, lettersDiv);
}

function clickData(solutionDiv, lettersDiv) {
  let solutionLength = solutionDiv.childElementCount;
  let clickNum = 1;
  let lettersArray = Array.from(lettersDiv.children);
  lettersArray.forEach((span) => {
    span.addEventListener("click", function () {
      solutionDiv.children[solutionLength - clickNum++].innerHTML =
        this.innerHTML;
      this.remove();
    });
  });
}

function submit(current, solutionDiv) {
  let arr = [];
  for (let i = 0; i < solutionDiv.children.length; i++) {
    arr.unshift(solutionDiv.children[i].innerHTML);
  }
  console.log(arr.join("") === current[0].answer);
}

function popUp() {
  let newDiv = `<p class="end">Well Done You Passed The Quiz</p>
                <div class="buttons">
                <button class="again-btn">Play Again</button>
                <button class="another">Play Another Game</button>
                </div>`;
  container.innerHTML = newDiv;
  container.classList.add("pop");

  let p = document.querySelector(".end");

  let btn_again = document.querySelector(".again-btn");

  btn_again.addEventListener("mouseenter", () => {
    p.style.color = "#fff";
  });
  btn_again.addEventListener("mouseleave", () => {
    p.style.color = "#000";
  });
  btn_again.addEventListener("click", () => {
    location.reload();
  });

  let btn_another = document.querySelector(".another");

  btn_another.addEventListener("mouseenter", () => {
    p.style.color = "#fff";
  });
  btn_another.addEventListener("mouseleave", () => {
    p.style.color = "#000";
  });
  btn_another.addEventListener("click", () => {
    window.open("../index.html", "_self");
  });
}

setTimeout(() => {
  container.style.top = 0;
}, 1000);
