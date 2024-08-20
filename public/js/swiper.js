const swiper = new Swiper(".reviews__swiper", {
    // Optional parameters
    // direction: "vertical",
    // loop: true,
    // autoplay: {
    //   delay: 3000,
    // },
    // spaceBetween: 20,
    navigation: {
      enable: true,
      nextEl: ".reviews__next",
      prevEl: ".reviews__back",
    },
    slidesPerView: 3,
  });

const swiper2 = new Swiper(".news__swiper", {
    // Optional parameters
    // direction: "vertical",
    // loop: true,
    // autoplay: {
    //   delay: 3000,
    // },
    // spaceBetween: 20,
    navigation: {
      enable: true,
      nextEl: ".news__next",
      prevEl: ".news__back",
    },
    slidesPerView: 3,
  });