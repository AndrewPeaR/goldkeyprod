// Fancybox.bind("[data-fancybox='gallery']", {
//     // Your custom options
//   });


// function playPause(e) {
//     e.preventDefault();
//     var myVideo = document.getElementById("video1");
//     if (myVideo.paused) myVideo.play();
//     else myVideo.pause();
// }



// const lightbox = GLightbox({
//     selector: '.glightbox3'
// });

// lightboxVideo.on('slide_changed', ({ prev, current }) => {
//     console.log('Prev slide', prev);
//     console.log('Current slide', current);

//     const { slideIndex, slideNode, slideConfig, player } = current;

//     if (player) {
//         if (!player.ready) {
//             // If player is not ready
//             player.on('ready', (event) => {
//                 // Do something when video is ready
//             });
//         }

//         player.on('play', (event) => {
//             console.log('Started play');
//         });

//         player.on('volumechange', (event) => {
//             console.log('Volume change');
//         });

//         player.on('ended', (event) => {
//             console.log('Video ended');
//         });
//     }
// });