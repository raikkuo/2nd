// EDIT ME: everything for the gallery, songs and letter lives here.
//
// PHOTOS: put your pictures in a folder called "photos" next to index.html.
// SONGS:  put your mp3 files in a folder called "songs" next to index.html
//         (same place as index.html, so: songs/song1.mp3, songs/song2.mp3 ...).
//         The "file" name below must match the mp3 name EXACTLY (spelling, capitals, ".mp3").
//         Want more songs? Copy one { ... } line in the songs list and change it.
// COVERS: put album art in a folder called "covers" next to index.html (jpg or png, square works best).
//         Set each song's "cover" to that file, e.g. cover: "covers/song1.jpg".
//         Leave it as "" (or delete the line) and the song title shows on the record instead.
// If a file is missing, the site shows a cute placeholder instead of breaking.

const CONTENT = {
  // The exact moment you became a couple: YYYY-MM-DDTHH:MM (24-hour time, your local time).
  startDate: "2026-08-01T15:00",

  photos: [
    { file: "photos/1.jpg", caption: "Our first date", emoji: "\u2615" },
    { file: "photos/2.jpg", caption: "That silly selfie", emoji: "\uD83E\uDD33" },
    { file: "photos/3.jpg", caption: "The day I knew", emoji: "\uD83D\uDC96" },
    { file: "photos/4.jpg", caption: "Best meal together", emoji: "\uD83C\uDF5C" },
    { file: "photos/5.jpg", caption: "Lost but happy", emoji: "\uD83D\uDDFA\uFE0F" },
    { file: "photos/6.jpg", caption: "Sleepy you", emoji: "\uD83D\uDE34" },
    { file: "photos/7.jpg", caption: "Our favorite spot", emoji: "\uD83C\uDF05" },
    { file: "photos/8.jpg", caption: "Us, just us", emoji: "\uD83D\uDC91" }
  ],

  songs: [
    { title: "your favourite song c:", artist: "Safe and Sound: Taylor Swift", file: "Taylor Swift feat. The Civil Wars Safe & Sound (from The Hunger Games Soundtrack) (1).mp3", color: "#ff5d8f", cover: "images (5).jpg",
      why: "you really do know how to pick your favourites." },
    { title: "song that fits you", artist: "Just the way you are: Bruno Mars", file: "Bruno Mars - Just The Way You Are (Audio).mp3", color: "#6ec1ff", cover: "images (2).jpg",
      why: "for you ." },
    { title: "our song:p", artist:"Dumaloy: SUD", file: "SUD - Dumaloy (Official Audio).mp3", color: "#7be0c3", cover: "images (4).jpg",
      why: "the song that will always remind me that it will always be you." },
    { title: "song that i relate to the most before.", artist: "Tsunami: NIKI", file: "NIKI - Tsunami (Official Lyric Video).mp3", color: "#ffd166", cover: "images (3).jpg",
      why: "i fell so deeply in love with you in such an unexpected time, like a tsunami that can't be stopped." }
  ],

  letter: {
    greeting: "happy 2nd monthsary, aki. ",
    paragraphs: [
      "i honestly can't believe it's already been two months since we became us. it may only be two months, but you've already become such a big part of my life. so many little moments with you have made me happy, and Im really thankful for every single one of them.",
      "Thank you for loving me, for staying by my side, and for accepting me even when I'm not the easiest person to deal with. I know we won't always have perfect days, and sometimes we'll misunderstand each other or get upset, but I still want you to know that Ill always choose you and choose to fix things with you.",
      "I love the way we can be silly together, talk about random things, annoy each other, laugh together, and just be ourselves.i hope we get to experience so much more together and make even more memories that we'll look back on someday.",
      "thank you for being my person, bab. i'm so happy that it's you. i love you so, so much. happy 2nd monthsary to us. "
    ],
    sign: "from your,"
  }
};
