const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".navigation");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
  menuToggle.classList.toggle("active");

  // nếu có đổi icon ☰ / ✕
  menuToggle.textContent = nav.classList.contains("active") ? "✕" : "☰";
});

document.addEventListener("click", (e) => {
  if (nav.classList.contains("active")) {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
      nav.classList.remove("active");
      menuToggle.classList.remove("active");
      menuToggle.textContent = "☰";
    }
  }
});

// Click vào trong menu sẽ di chuyển rồi ẩn menu đi
document.querySelectorAll(".navigation a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.textContent = "☰";
  });
});

// Ẩn hiện logo
const header = document.querySelector("header");
const logo = document.querySelector(".logo");
const infoSection = document.querySelector(".info");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  /* tính độ đậm theo scroll */
  let opacity = scrollY / 500;
  if (opacity > 0.85) opacity = 0.85;

  header.style.setProperty("--bg-opacity", opacity);

  /* hiện logo khi tới info */
  const infoTop = infoSection.getBoundingClientRect().top;
  if (infoTop <= 80) {
    logo.classList.add("show");
  } else {
    logo.classList.remove("show");
  }
});

/* click logo cuộn lên đầu */
logo.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Contact
function sendMail() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields ❌");
    return;
  }

  let parms = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  emailjs
    .send("service_97q1kc6", "template_79sgbsm", parms)
    .then(alert("Email sent successfully!! ✅"));

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
}

// update
function update() {
  alert("Tính năng này đang trong giai đoạn phát triển. Mong bạn thông cảm");
}

// Music
const songs = [
  { name: "Call Me Now", file: "music/Call_Me_Now.mp3" },
  {
    name: "Lost Frequencies",
    file: "music/Reality.mp3",
  },
  {
    name: "Scars To Your Beautiful",
    file: "music/ScarsToYourBeautiful.mp3",
  },
  {
    name: "Paper short love",
    file: "music/Paper_Short_Love.mp3",
  },
  {
    name: "We can be together",
    file: "music/We_Can_Be_Together.mp3",
  },
  {
    name: "Lo người ướt áo",
    file: "music/Lo_Người_Ướt_áo.mp3",
  },
  {
    name: "Travel",
    file: "music/Travel.mp3",
  },
  {
    name: "Nơi này có anh",
    file: "music/Nơi_Này_Có_Anh.mp3",
  },
];

let isShuffle = false;
let index = Math.floor(Math.random() * songs.length);
let isPlaying = false;
let isRepeat = false;
let firstInteraction = false;
let isEffectDisabled = true;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const icon = document.getElementById("icon");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");
const musicBtn = document.getElementById("musicBtn");

const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");

function loadSong(autoPlay = false) {
  audio.src = songs[index].file;
  title.textContent = songs[index].name;
  if (autoPlay) playSong();
}

function playSong() {
  if (isEffectDisabled) return;

  audio.play();
  isPlaying = true;
  playBtn.innerHTML = '<ion-icon name="pause" style="color:#fff;"></ion-icon>';
  icon.style.animationPlayState = "running";
  // musicBtn.classList.add("active");
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.innerHTML = '<ion-icon name="play" style="color:#fff;"></ion-icon>';
  icon.style.animationPlayState = "paused";
}

playBtn.onclick = () => (isPlaying ? pauseSong() : playSong());

prevBtn.onclick = () => {
  index = isShuffle
    ? Math.floor(Math.random() * songs.length)
    : (index - 1 + songs.length) % songs.length;
  loadSong(true);
};

nextBtn.onclick = () => {
  index = getNextIndex();
  loadSong(true);
};

function getNextIndex() {
  if (!isShuffle) {
    return (index + 1) % songs.length;
  }

  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * songs.length);
  } while (newIndex === index);

  return newIndex;
}

shuffleBtn.onclick = () => {
  isShuffle = !isShuffle;
  shuffleBtn.style.color = isShuffle ? "#00ff99" : "#999";
};

repeatBtn.onclick = () => {
  isRepeat = !isRepeat;
  repeatBtn.style.color = isRepeat ? "#00ff99" : "#999";
};

audio.ontimeupdate = () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  current.textContent = format(audio.currentTime);
  duration.textContent = format(audio.duration);
};

progress.oninput = () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
};
audio.onended = () => {
  if (isRepeat) {
    playSong();
  } else {
    index = getNextIndex();
    loadSong(true);
  }

  isPlaying = false;
  musicBtn.classList.remove("active");
};

document.addEventListener("click", () => {
  if (isEffectDisabled) return;

  if (!firstInteraction) {
    playSong();
    firstInteraction = true;
  }
});

function format(time) {
  if (!time) return "0:00";
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60);
  return `${m}:${s < 10 ? "0" + s : s}`;
}

loadSong(false);

const player = document.querySelector(".player");
const btnMusic = document.querySelector(".btnMusic");

btnMusic.addEventListener("click", () => {
  player.classList.toggle("active-popup");
});

// Bật tắt hiệu ứng
const effectButtons = document.querySelectorAll(".effect .nut");
const offBtn = effectButtons[effectButtons.length - 1];
effectButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn === offBtn) return;

    isEffectDisabled = false;
    btn.classList.toggle("active");
  });
});

offBtn.addEventListener("click", () => {
  isEffectDisabled = true;

  effectButtons.forEach((btn) => {
    btn.classList.remove("active");
  });

  pauseSong();
  audio.currentTime = 0;
  musicBtn.classList.remove("active");
});

// đã xong
const welcome = document.getElementById("welcome");
const app = document.getElementById("app");
const enterBtn = document.getElementById("enterBtn");

enterBtn.addEventListener("click", () => {
  isEffectDisabled = false;
  welcome.style.display = "none";
  app.classList.remove("hidden");
  playSong();
  firstInteraction = true;
});

// effect
