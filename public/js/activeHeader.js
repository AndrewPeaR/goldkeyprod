const links = document.querySelectorAll(".nav__item a");

if (links.length) {
  let location = window.location.href;
  let cur_url = '/' + location.split('/').pop();
  links.forEach((link) => {

    if (cur_url == link.getAttribute('href')) {
      link.classList.add('nav__item_active');
    }

    link.addEventListener("click", (e) => {
      links.forEach((link) => {
        link.classList.remove("nav__item_active");
      });
      link.classList.add("nav__item_active");
    });
  });
}