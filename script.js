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
  let a = await fetch(`/Spotify-clone/songs/`);
  let response = await a.text();

  let div = document.createElement("div");
  div.innerHTML = response;

  let links = div.getElementsByTagName("a");

  //let songs = [];

  for (let i = 0; i < links.length; i++) {
    const element = links[i];

    if (element.href.endsWith(".mp3")) {
      let filename = decodeURIComponent(element.href.split("%5C").pop());

      songs.push(
        `/Spotify-clone/songs/${encodeURIComponent(filename)}`
      );
    }
  }

  return songs;
}

const playMusic = (track, pause = false) => {
  currentSong.src = "/Spotify-clone/songs/" + track;
  console.log(track)

  if (!pause) {
    currentSong.play();
    play.src = "required_files/play.svg";
  }

  document.querySelector(".songinfo").innerHTML = track;
  document.querySelector(".songtime").innerHTML = "00 : 00 / 00 : 00";
    
};

async function main() {
  let songs = await getSongs("songs/");
  playMusic(decodeURIComponent(songs[0].split("/").pop()), true);

  console.log(songs);

  let songUL = document
    .querySelector(".songlist")
    .getElementsByTagName("ul")[0];

  for (const song of songs) {
    let decodedsong = decodeURIComponent(song.split("/").pop());

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
    percent =
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

    let index = songs.findIndex(
      (song) => decodeURIComponent(song.split("/").pop()) === track
    );

    if (index < songs.length - 1) {
      playMusic(
        decodeURIComponent(songs[index + 1].split("/").pop())
      );
    }
  });

  document.querySelector("#previous").addEventListener("click", () => {
    let track = document.querySelector(".songinfo").innerHTML;

    let index = songs.findIndex(
      (song) => decodeURIComponent(song.split("/").pop()) === track
    );

    if (index > 0) {
      playMusic(
        decodeURIComponent(songs[index - 1].split("/").pop())
      );
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
            playMusic(decodeURIComponent(songs[index].split("/").pop()));
        });
    });
        



}

main();