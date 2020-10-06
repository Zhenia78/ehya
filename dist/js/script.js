$(document).ready(function () {

  let nav_dropdown = $(".nav__dropdown");
  let dropdown_link = $(".dropdown__link_sliding");
  let burger = $(".header__burger");
  let tabsItem = $(".tabs__item");
  let tabsText = $(".tabs__text");


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

  $(".dropdown-item-list_hidden").slideUp();

  dropdown_link.click(function () {
    if ($(this).attr("class") == "dropdown__link dropdown__link_sliding op dropdown__link_sliding-active") {
      dropdown_link.removeClass("dropdown__link_sliding-active");
      $(".dropdown-item-list_hidden").slideUp();
    } else {
      dropdown_link.removeClass("dropdown__link_sliding-active");
      $(".dropdown-item-list_hidden").slideUp();

      var drop = $(this).attr("data-href");
      $(this).addClass("dropdown__link_sliding-active");
      $(drop).slideDown(1000);
    }
  });

  burger.click(function () {
    $(this).toggleClass("header__burger_active");
    $(".dropdown").toggleClass("dropdown_active");
    $("body").toggleClass("body-active");
  });

  tabsItem.click(function () {
    tabsItem.removeClass("tabs__item_active");
    tabsText.removeClass("tabs__text_active");

    var target = $(this).attr("data-href");
    $(this).addClass("tabs__item_active");
    $(target).addClass("tabs__text_active");
  });


});