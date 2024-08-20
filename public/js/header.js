const allBurger = document.querySelectorAll(".burger");

allBurger.forEach((el) => {
  el.addEventListener("click", function () {
    allBurger.forEach((el) => el.classList.toggle("active"));
    document.querySelector(".nav").classList.toggle("open");
    // Блокировка скролла при открытом бургер меню
    document.querySelector("body").classList.toggle("block-scroll");
  });
});
