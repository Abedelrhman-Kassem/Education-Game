let welcome = document.querySelector(".welcome");
let choice = document.querySelector(".choice");

setTimeout(() => {
  let x = 0;
  let writer = setInterval(() => {
    welcome.innerHTML += welcome.dataset.write[x];
    if (x == welcome.dataset.write.length - 1) {
      clearInterval(writer);
    }
    x++;
  }, 50);
}, 1000);

setTimeout(() => {
  let i = 0;
  let spanWriter = setInterval(() => {
    choice.textContent += choice.dataset.write[i];
    if (i == choice.dataset.write.length - 1) {
      clearInterval(spanWriter);
    }
    i++;
  }, 50);
}, 3200);

let links = document.querySelectorAll(".links a");
let firstLink = document.getElementById("link-one");
let secondLink = document.getElementById("link-two");

setTimeout(() => {
  firstLink.style.marginLeft = 0;
}, 4200);
setTimeout(() => {
  secondLink.style.marginLeft = 0;
}, 5000);

setTimeout(() => {
  links.forEach((link) => (link.style.transition = ".6s"));
}, 9000);
