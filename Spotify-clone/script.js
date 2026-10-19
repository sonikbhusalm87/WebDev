console.log("Lets start js frontend");

let currentSong = new Audio();

let songs = [];


function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = Math.floor(seconds % 60);

  let formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${String(minutes).padStart(2, "0")} : ${formattedSeconds}`;
}

async function getSongs() {
    const response = await fetch("songs/songs.json");
    return await response.json();
}

const playMusic = (track, pause = false) => {
  currentSong.src = "songs/" + encodeURIComponent(track);
  console.log(track)

  if (!pause) {
    currentSong.play();
    play.src = "required_files/play.svg";
  }

  document.querySelector(".songinfo").innerHTML = track;
  document.querySelector(".songtime").innerHTML = "00 : 00 / 00 : 00";
    
};

async function main() {
  songs = await getSongs();
  playMusic(songs[0], true);

  console.log(songs);

  let songUL = document
    .querySelector(".songlist")
    .getElementsByTagName("ul")[0];

  for (const song of songs) {
    let decodedsong = song;

    songUL.innerHTML =
      songUL.innerHTML +
      `<li>
        <img class="invert" src="required_files/music.svg" alt="music">

        <div class="info">
          <div>${decodedsong}</div>
          <div>Sonik</div>
        </div>

        <div class="playnow">
          <span>Play Now</span>
          <img class="invert" src="required_files/pause.svg">
        </div>
      </li>`;
  }

  // these few lines are for clicking the songs in your library and when clicked the song plays

  Array.from(
    document.querySelector(".songlist").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      console.log(e.querySelector(".info").firstElementChild.innerHTML);

      playMusic(
        e.querySelector(".info").firstElementChild.innerHTML.trim()
      );
    });
  });

  // playing the song, pausing the song and changing the icon of play button to pause and vice versa

  play.addEventListener("click", () => {
    if (currentSong.paused) {
      play.src = "required_files/play.svg";
      currentSong.play();
    } else {
      play.src = "required_files/pause.svg";
      currentSong.pause();
    }
  });

  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerHTML =
      `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`;

    document.querySelector(".circle").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent =
      (e.offsetX / e.target.getBoundingClientRect().width) * 100;

    document.querySelector(".circle").style.left = percent + "%";

    currentSong.currentTime =
      (currentSong.duration * percent) / 100;
  });

  // Add event listener for hamburger

  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = 0;
  });

  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-100%";
  });

  // adding js to next and previous song buttons

  document.querySelector("#next").addEventListener("click", () => {
    let track = document.querySelector(".songinfo").innerHTML;

    let index = songs.findIndex(song => song === track);

    if (index < songs.length - 1) {
      playMusic(songs[index + 1]);
    }
  });

  document.querySelector("#previous").addEventListener("click", () => {
    let track = document.querySelector(".songinfo").innerHTML;

    let index = songs.findIndex(song => song === track);

    if (index > 0) {
      playMusic(songs[index - 1]);
    }
  });

  // adding js to volume slider

  document
    .querySelector(".range")
    .getElementsByTagName("input")[0]
    .addEventListener("change", (e) => {
      currentSong.volume = e.target.value / 100;
    });

    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {
        card.addEventListener("click", () => {
            playMusic(songs[index]);
        });
    });
        



}

main();