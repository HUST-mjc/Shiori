// 加 html5:true 兼容 file:// 协议；如果你用本地服务器打开，也可以去掉这两行
const sound1 = new Howl({
  src: ["./video/haita.mp3"],
  html5: true,
  preload: true,
});
const sound2 = new Howl({
  src: ["./video/TTK.mp3"],
  html5: true,
  preload: true,
});

const bgm = new Howl({
  src: ["./video/bgm.mp3"],
  html5: true,
  loop: true,
  volume: 0.2,
});

let bgmId = 0;
let count = 0;
let countFlag = false;
let autoClick = false;
let autoClickInterval = null;

let countElement = document.querySelector(".count");
let myFishElement = document.querySelector(".myFish");
let logoElement = document.querySelector(".logo");
let autoClickElement = document.querySelector("#autoClick");
let centerElement = document.querySelector("#center");

const localStorageCount = localStorage.getItem("count");
if (localStorageCount) {
  count = Number(localStorageCount);
  countElement.innerHTML = String(count);
}

function startAnimate() {
  countElement.style.transform = "scale(1.1)";
  myFishElement.style.transform = "scale(.95)";
  const div = document.createElement("div");
  div.classList.add("subtitleCountTip");
  div.innerText = "功德 + 1，栞栞佛祖保佑你";
  centerElement.appendChild(div);
  setTimeout(() => div.remove(), 1000);
}

function initAnimate() {
  countElement.style.transform = "scale(1)";
  myFishElement.style.transform = "scale(1)";
}

function counter() {
  countFlag = true;
  count++;
  countElement.innerHTML = String(count);
  startAnimate();

  const chosen = Math.random() < 0.5 ? sound1 : sound2;
  const other = chosen === sound1 ? sound2 : sound1;

  if (other.playing()) {
    other.stop();
  }

  chosen.stop();
  chosen.play();

  localStorage.setItem("count", String(count));
}

document.onkeyup = (e) => {
  if (e.key === " " && !countFlag) {
    counter();
  }
};

document.onkeydown = (e) => {
  if (e.key === " ") {
    countFlag = false;
    initAnimate();
  }
};

myFishElement.addEventListener("mouseup", () => counter());
myFishElement.addEventListener("mousedown", () => {
  setTimeout(initAnimate, 200);
});

logoElement.addEventListener("click", () => {
  if (bgm.playing() && bgm.state().toString() === "loaded") {
    bgm.pause(bgmId);
  } else {
    bgmId = bgmId !== 0 ? (bgm.play(bgmId), bgmId) : bgm.play();
  }
});

autoClickElement.addEventListener("click", () => {
  autoClick = !autoClick;
  if (autoClick) {
    autoClickElement.classList.add("confirm");
    autoClickInterval = setInterval(() => {
      counter();
      setTimeout(initAnimate, 200);
    }, 1000);
  } else {
    autoClickElement.classList.remove("confirm");
    clearInterval(autoClickInterval);
  }
}); 