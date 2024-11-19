let canciones = {
  imagenAlbum: "",
  artista: "",
  nombreCancion: "",
  cancionMp3: ""
};

let song = [];

let audioPlayer = null; 
let currentSong = null;

let cancionesPredefinidas = [
  {
    id: 1,
    imgAlbum: "img/absurd.jpg",
    nombreArtista: "Absurd",
    nombreCancion: "Mourning soul",
    cancionMp3: "audiosmp3/Absurd - Mourning Soul.mp3",
  },{
    id: 2,
    imgAlbum: "img/a77.jpg",
    nombreArtista: "Ataque 77",
    nombreCancion: "No me arrepiento de este amor",
    cancionMp3: "audiosmp3/Attaque 77 - No me arrepiento de este amor.mp3"
  },
  {
    id: 3,
    imgAlbum: "img/deicide.jpg",
    nombreArtista: "Deicide",
    nombreCancion: "Scars Of The Crucifix",
    cancionMp3: "audiosmp3/Scars Of The Crucifix.mp3"
  }
];

const togglePlaylist = document.getElementById("togglePlaylist");
const agregar = document.getElementById("agregar");

togglePlaylist.addEventListener("click", function() {
  
  let playList = document.createElement("section");
  playList.classList.add("playList");
  document.body.appendChild(playList);

  
  let closeButton = document.createElement("button");
  closeButton.classList.add("closeButton");
  closeButton.textContent = "x";
  playList.appendChild(closeButton);

  closeButton.addEventListener("click", function() {
    document.body.removeChild(playList);
  });

  
  cancionesPredefinidas.forEach(cancion => {
    let miniCard = document.createElement("div");
    miniCard.classList.add("miniCard");

    let img = document.createElement("img");
    img.src = cancion.imgAlbum;
    img.alt = `${cancion.nombreArtista} - ${cancion.nombreCancion}`;
    miniCard.appendChild(img);

    let artistName = document.createElement("p");
    artistName.textContent = `Artista: ${cancion.nombreArtista}`;
    miniCard.appendChild(artistName);

    let songName = document.createElement("p");
    songName.textContent = `Canción: ${cancion.nombreCancion}`;
    miniCard.appendChild(songName);

    miniCard.addEventListener("click",function(){
      let albumContainer = document.createElement("div")
      document.body.style.backgroundImage = 'none'
      albumContainer.classList.add("albumCenter") 
      document.body.appendChild(albumContainer)
      const nav = document.getElementById("nav");
      nav.style.opacity = "1";

      let imgcontainer = document.createElement("img");
      imgcontainer.src = cancion.imgAlbum;
      imgcontainer.alt = `${cancion.nombreArtista} - ${cancion.nombreCancion}`;
      albumContainer.appendChild(imgcontainer);
  
  })
    miniCard.addEventListener("click", function () {
      if (audioPlayer) {
        audioPlayer.pause(); 
      }

      currentSong = cancion; 
      audioPlayer = new Audio(cancion.cancionMp3); 
      audioPlayer.play(); 
    });

    playList.appendChild(miniCard);
  });
  let musicControls = document.createElement("div");
  musicControls.classList.add("music-controls");

  let pausePlayButton = document.createElement("button");
  pausePlayButton.id = "pausePlaySong";
  pausePlayButton.textContent = "⏯️ Pause/Play";
  musicControls.appendChild(pausePlayButton);

  
  pausePlayButton.addEventListener("click", function () {
    if (audioPlayer) {
      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
    }
  });

  playList.appendChild(musicControls);
});

agregar.addEventListener("click", function() {
  let addSong = document.createElement("section");
  addSong.classList.add("cancion");
  document.body.appendChild(addSong);

  let closeButtonSong = document.createElement("button");
  closeButtonSong.classList.add("closeButtonSong");
  closeButtonSong.textContent = "X";

  addSong.appendChild(closeButtonSong);

  closeButtonSong.addEventListener("click", function() {
    document.body.removeChild(addSong);
  });


  let form = document.createElement("form");
  form.classList.add("formularioCanciones");

  let imageLabel = document.createElement("label");
  imageLabel.textContent = "Imagen del Álbum";

  let imageInput = document.createElement("input");
  imageInput.type = "file";
  imageInput.accept = "image/*";
  form.appendChild(imageLabel);
  form.appendChild(imageInput);

  let artistLabel = document.createElement("label");
  artistLabel.textContent = "Nombre Del Artista";

  let artistInput = document.createElement("input");
  artistInput.type = "text";
  form.appendChild(artistLabel);
  form.appendChild(artistInput);

  let songName = document.createElement("label");
  songName.textContent = "Nombre De La Canción";

  let songInput = document.createElement("input");
  songInput.type = "text";
  form.appendChild(songName);
  form.appendChild(songInput);

  let songMP3 = document.createElement("label");
  songMP3.textContent = "Ingrese El Archivo Mp3";

  let songmp3Input = document.createElement("input");
  songmp3Input.type = "file";
  songmp3Input.accept = "audio/mp3";
  form.appendChild(songMP3);
  form.appendChild(songmp3Input);

  let submit = document.createElement("button");
  submit.textContent = "Añadir";
  submit.type = "submit";
  form.appendChild(submit);

  addSong.appendChild(form);

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    let nuevaCancion = {
      imagenAlbum: imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : "",
      artista: artistInput.value,
      nombreCancion: songInput.value,
      cancionMp3: songmp3Input.files[0] ? URL.createObjectURL(songmp3Input.files[0]) : ""
    };

    song.push(nuevaCancion);
    form.reset();
    console.log(song);
  });
});
