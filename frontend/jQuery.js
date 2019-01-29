$(document).ready(function() {
  $(window).scroll(function() {
    if(this.scrollTop() > 100) {
      // $(".navbar-container").addClass();
      $(".navbar-container .navbar .navbar-polygram-logo span").fadeOut(300);
    }
    else {
      // $(".navbar-container").removeClass();
      $(".navbar-container .navbar .navbar-polygram-logo span").fadeIn(300);
    }
  });
});