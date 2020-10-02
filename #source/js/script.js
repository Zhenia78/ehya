$(document).ready(function () {

  let nav_dropdown = $(".nav__dropdown");


  nav_dropdown.click(function () {
    if ($(this).attr("class") == "nav__item nav__dropdown nav__dropdown-active") {
      nav_dropdown.removeClass("nav__dropdown-active");
      $(".nav-dropdown-list").removeClass("nav-dropdown-list_visible");
    } else {
      nav_dropdown.removeClass("nav__dropdown-active");
      $(".nav-dropdown-list").removeClass("nav-dropdown-list_visible");

      var drop = $(this).attr("data-href");
      $(this).toggleClass("nav__dropdown-active");
      $(drop).toggleClass("nav-dropdown-list_visible");
    }
  });


});