/***********************************************
* Loading gif
***********************************************/
$(window).load(function() {
  setTimeout(function () {
    $(".loading").fadeOut("slow");
  }, 1000);
});

/***********************************************
* Slideshow Gallery
***********************************************/
jQuery('#intro-slides').slippry({
  // general elements & wrapper
  slippryWrapper: '<div class="sy-box pictures-slider" />', // wrapper to wrap everything, including pager

  // options
  adaptiveHeight: false, // height of the sliders adapts to current slide
  captions: false, // Position: overlay, below, custom, false

  // pager
  pager: false,

  // controls
  controls: false,
  autoHover: false,

  // transitions
  transition: 'kenburns', // fade, horizontal, kenburns, false
  kenZoom: 0,
  speed: 6500 // time the transition takes (ms)
});


/***********************************************
* Intense - Image zooming
***********************************************/
window.onload = function() {
  var elements = document.querySelectorAll( '.zoom, .portfolio-item' );
  Intense( elements );
}

/***********************************************
* Hamburger menu behaviour
***********************************************/
$(window).scroll(function() {
  if($(document).scrollTop() > 1){
    $('#hamburger').removeClass('dark');
  }
  else {
    $('#hamburger').addClass('dark');
  }
});

// Animate icon on click
$(document).ready(function(){
  $('#hamburger').click(function(){
    $(this).toggleClass('open');
    $('.navbar-abel').toggleClass('open');
  });

  /*
   * Customly Styled Select input field
   */
  [].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {
    new SelectFx(el);
  } );

});

// // Set hamburger icon color depending on background (light or dark)
// document.addEventListener('DOMContentLoaded', function () {
//   BackgroundCheck.init({
//     targets: '.bg-check',
//     images: '.bg'
//   });
// });


/***********************************************
* Smooth scrolling
***********************************************/
$('a').click(function(e){

  // If internal link
  if (/#/.test(this.href)) {
    e.preventDefault();

    var target = $( $.attr(this, 'href') );
    $('body,html').animate({'scrollTop': target.offset().top}, 1000, function(){ animating = false; });
  }

});

/***********************************************
 * Внутреняя
 ***********************************************/

/*
 * Owl Carousel for Gallery
 */
    var adminAuth = $('meta[data-admin=on]')[0];
    if (adminAuth) {
        console.log("admin mode on");
        //console.log(adminAuth);
    } else {
        //console.log(adminAuth);
        var sync1 = $("#mg-gallery");
        var sync2 = $("#mg-gallery-thumb");
        sync1.owlCarousel({
          navigation : true,
          singleItem : true,
          pagination: false,
          afterAction : syncPosition,
          navigationText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>'],

        });

        sync2.owlCarousel({
          items : 3,
          itemsDesktop: [1199,3],
          itemsDesktopSmall: [979,3],
          itemsTablet: [768,3],
          itemsMobile: [479,3],
          navigation : false,
          pagination: false,
          navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
          afterInit : function(el){
            el.find(".owl-item").eq(0).addClass("synced");
          }

        });

        function syncPosition(el){
          var current = this.currentItem;
          $("#mg-gallery-thumb")
              .find(".owl-item")
              .removeClass("synced")
              .eq(current)
              .addClass("synced")
          if($("#mg-gallery-thumb").data("owlCarousel") !== undefined){
            center(current)
          }
        }

        sync2.on("click", ".owl-item", function(e){
          e.preventDefault();
          var number = $(this).data("owlItem");
          sync1.trigger("http://www.vohotka.ru/app/pages/static/js/owl.goTo",number);
        });
    }

    function center(number){
      var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
      var num = number;
      var found = false;
      for(var i in sync2visible){
        if(num === sync2visible[i]){
          var found = true;
        }
      }

      if(found===false){
        if(num>sync2visible[sync2visible.length-1]){
          sync2.trigger("http://www.vohotka.ru/app/pages/static/js/owl.goTo", num - sync2visible.length+2)
        }else{
          if(num - 1 === -1){
            num = 0;
          }
          sync2.trigger("http://www.vohotka.ru/app/pages/static/js/owl.goTo", num);
        }
      } else if(num === sync2visible[sync2visible.length-1]){
        sync2.trigger("http://www.vohotka.ru/app/pages/static/js/owl.goTo", sync2visible[1])
      } else if(num === sync2visible[0]){
        sync2.trigger("http://www.vohotka.ru/app/pages/static/js/owl.goTo", num-1)
      }
    }





/*
 * Room Search form Check in and out Datepicker
 */
$('.input-group.mg-check-in').datepicker({
  startDate: "dateToday",
  autoclose: true
});

$('.input-group.mg-check-in').on('hide', function (e) {


  if (e.dates.length) {
    var strDate = e.date;
    strDate.setDate(strDate.getDate() + 1);

    // $('.mg-check-out').datepicker('clearDates');
    $('.mg-check-out').datepicker('setStartDate', strDate);
  }

  $(e.currentTarget).removeClass('focus');

});

$('.input-group.mg-check-in').on('show', function (e) {

  $(e.currentTarget).addClass('focus');

});

$('.input-group.mg-check-out').on('show', function (e) {

  $(e.currentTarget).addClass('focus');

});

$('.input-group.mg-check-out').on('hide', function (e) {

  $(e.currentTarget).removeClass('focus');

});

$('.input-group.mg-check-in').on('changeDate', function (e) {

  if (e.dates.length) {
    var inDate = e.date,
        outDate = $('.mg-check-out').datepicker('getDate');

    if (outDate && inDate >= outDate) {
      $('.mg-check-out').datepicker('clearDates');
    }

  } else {
    $('.mg-check-out').datepicker('clearDates');
  }
});

$('.input-group.mg-check-out').datepicker({
  startDate: "dateToday",
  autoclose: true
});