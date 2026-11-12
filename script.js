const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const playingSong = document.getElementById("player-song-title");
const songArtist = document.getElementById("player-song-artist");
const allSongs = [
  {
    id: 0,
    title: "The Fallen",
    album: "8-bit",
    artist: "Sena",
    duration: "00:44",
    src: "assets/musics/8bit/the_fallen.mp3",
  },
  {
    id: 1,
    title: "The First Sin",
    album: "8-bit",
    artist: "Sena",
    duration: "00:32",
    src: "assets/musics/8bit/the-first-sin.mp3",
  },
  {
    id: 2,
    title: "Balance",
    album: "Darkness And Flowers",
    artist: "Sena",
    duration: "00:48",
    src: "assets/musics/darkness-and-flowers/balance.mp3",
  },
  {
    id: 3,
    title: "Bloom",
    album: "Darkness And Flowers",
    artist: "Sena",
    duration: "00:45",
    src: "assets/musics/darkness-and-flowers/bloom.mp3",
  },
  {
    id: 4,
    title: "Farewell",
    album: "Darkness And Flowers",
    artist: "Sena",
    duration: "02:07",
    src: "assets/musics/darkness-and-flowers/farewell.mp3",
  },
  {
    id: 5,
    title: "First Sight",
    album: "Darkness And Flowers",
    artist: "Sena",
    duration: "01:16",
    src: "assets/musics/darkness-and-flowers/first-sight.mp3",
  },
  {
    id: 6,
    title: "Lament",
    album: "Darkness And Flowers",
    artist: "Sena",
    duration: "01:16",
    src: "assets/musics/darkness-and-flowers/lament.mp3",
  },
  {
    id: 7,
    title: "Stay",
    album: "Darkness And Flowers",
    artist: "Sena",
    duration: "00:57",
    src: "assets/musics/darkness-and-flowers/stay.mp3",
  },
  {
    id: 8,
    title: "All Men Must Die",
    album: "Undefined",
    artist: "Sena",
    duration: "01:42",
    src: "assets/musics/undefined/all-men-must-die.mp3",
  },
  {
    id: 9,
    title: "Alt - Happy Birtday Violin",
    album: "Undefined",
    artist: "Sena",
    duration: "01:16",
    src: "assets/musics/undefined/alt-happy-birthday-violin.mp3",
  },
  {
    id: 10,
    title: "Boat",
    album: "Undefined",
    artist: "Sena",
    duration: "00:22",
    src: "assets/musics/undefined/boat.mp3",
  },
  {
    id: 11,
    title: "Cellolin",
    album: "Undefined",
    artist: "Sena",
    duration: "01:12",
    src: "assets/musics/undefined/cellolin.mp3",
  },
  {
    id: 12,
    title: "Cute Cafe",
    album: "Undefined",
    artist: "Sena",
    duration: "00:13",
    src: "assets/musics/undefined/cute-cafe.mp3",
  }, {
    id: 13,
    title: "Elite",
    album: "Undefined",
    artist: "Sena",
    duration: "00:40",
    src: "assets/musics/undefined/elite.mp3",
  }, {
    id: 14,
    title: "Fickle Gaze",
    album: "Undefined",
    artist: "Sena",
    duration: "00:48",
    src: "assets/musics/undefined/fickle-gaze.mp3",
  }, {
    id: 15,
    title: "Field",
    album: "Undefined",
    artist: "Sena",
    duration: "00:29",
    src: "assets/musics/undefined/field.mp3",
  }, {
    id: 16,
    title: "Galaxy",
    album: "Undefined",
    artist: "Sena",
    duration: "00:14",
    src: "assets/musics/undefined/galaxy.mp3",
  }, {
    id: 17,
    title: "Lost Magik",
    album: "Undefined",
    artist: "Sena",
    duration: "00:20",
    src: "assets/musics/undefined/lost-magik.mp3",
  }, {
    id: 18,
    title: "Reunited",
    album: "Undefined",
    artist: "Sena",
    duration: "00:12",
    src: "assets/musics/undefined/reunited.mp3",
  }, {
    id: 19,
    title: "Solitary Piano v1",
    album: "Undefined",
    artist: "Sena",
    duration: "00:16",
    src: "assets/musics/undefined/solitary-piano.mp3",
  }, {
    id: 20,
    title: "Solitary Piano v2",
    album: "Undefined",
    artist: "Sena",
    duration: "01:04",
    src: "assets/musics/undefined/solitary-piano-v2.mp3",
  }, {
    id: 21,
    title: "Wise Hands Rotten Head",
    album: "Undefined",
    artist: "Sena",
    duration: "00:57",
    src: "assets/musics/undefined/wise-hands-rotten-head.mp3",
  },
];

loadSongs();

const audio = new Audio();

const userData = {
  songs: allSongs,
  currentSong: null,
  songCurrentTime: 0,
};

const playSong = (id, start = true) => {
  const song = userData.songs.find((song) => song.id === id);
  audio.src = song.src;
  audio.title = song.title;
  if (userData.currentSong === null || start) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData.songCurrentTime;
  }
  userData.currentSong = song;
  playButton.classList.add("playing");
  setPlayerDisplay();
  highlightCurrentSong();
  setPlayButtonAccessibleText();
  audio.play();
};

const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;
  playButton.classList.remove("playing");
  audio.pause();
};

const getCurrentSongIndex = () => userData.songs.indexOf(userData.currentSong);

const getNextSong = () => userData.songs[getCurrentSongIndex() + 1];

const getPreviousSong = () => userData.songs[getCurrentSongIndex() - 1];

const playPreviousSong = () => {
  if (userData.currentSong === null) return;
  const previousSong = getPreviousSong();
  if (previousSong) {
    playSong(previousSong.id);
  } else {
    playSong(userData.songs[0].id);
  }
};

const playNextSong = () => {
  if (userData.currentSong === null) {
    playSong(userData.songs[0].id);
    return;
  }
  const nextSong = getNextSong();
  if (nextSong) {
    playSong(nextSong.id);
  } else {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    setPlayerDisplay();
    highlightCurrentSong();
    setPlayButtonAccessibleText();
    pauseSong();
  }
};

const setPlayerDisplay = () => {
  const currentTitle = userData.currentSong?.title;
  const currentArtist = userData.currentSong?.artist;

  playingSong.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";
};

const highlightCurrentSong = () => {
  const previousCurrentSong = document.querySelector('.playlist-song[aria-current="true"]');
  previousCurrentSong?.removeAttribute("aria-current");
  const songToHighlight = document.getElementById(
    `song-${userData.currentSong?.id}`
  );

  songToHighlight?.setAttribute("aria-current", "true");
};

const setPlayButtonAccessibleText = () => {
  const song = userData.currentSong;
  playButton.setAttribute("aria-label", userData.currentSong ? `Play ${song.title}` : "Play");
};

playButton.addEventListener("click", () => {
  if (userData.currentSong === null) {
    playSong(userData.songs[0].id);
  } else {
    playSong(userData.currentSong.id, false);
  }
});

const songs = document.querySelectorAll(".playlist-song");

songs.forEach((song) => {
  const id = song.getAttribute("id").slice(5);
  const songBtn = song.querySelector("button");
  songBtn.addEventListener("click", () => {
    playSong(Number(id));
  });
});

pauseButton.addEventListener("click", pauseSong);

nextButton.addEventListener("click", playNextSong);

previousButton.addEventListener("click", playPreviousSong);

audio.addEventListener("ended", playNextSong);

function loadSongs() {
  playlistSongs.innerHTML = ""

  for (let i = 0; i < allSongs.length; i++) {
    playlistSongs.innerHTML +=
      `
        <li id="song-${i}" class="playlist-song">
          <button class="playlist-song-info" >
            <span class="playlist-song-title">${allSongs[i].title}</span>
            <span class="playlist-song-artist">${allSongs[i].artist}</span>
            <span class="playlist-song-duration">${allSongs[i].duration}</span>
          </button>
        </li>
    `

    // add - <span class="playlist-song-album">${allSongs[i].album}</span>
  }
}