$.noConflict();
jQuery(document).ready(function ($) {
  $("body #root .app-container .app-body header nav .navbar-heart-pop-up").hide();

  $(".navbar-heart").click(() => {
    $(".navbar-heart-pop-up").css({ "display": "block" });
  });
});