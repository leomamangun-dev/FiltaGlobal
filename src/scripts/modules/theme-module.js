AppName.Modules.ThemeModule = (function () {
  //Dependencies
  var core = AppName.Core;

  //////////////////////
  // Private Methods //
  ////////////////////
  const _privateMethod = () => {
    // private stuff

    var greyCard = $('.card-grey')
    var yellowCard = $('.card-yellow')
    var greenCard = $('.card-green')
    var purpleCard = $('.card-purple')
   
    $('.video-banner').parent().click(function () {

      if($(this).children(".video-banner").get(0).paused){ 

          $(this).children(".video-banner").get(0).play();
          $(this).children(".playpause").hide();
          console.log(this)
        }else{ 

           $(this).children(".video-banner").get(0).pause();
           $(this).children(".playpause").show();
        }
    });


    $(".video-banner").on(
      "timeupdate", 
      function(event){

        var currentTime = this.currentTime;
        var duration = this.duration;

        var percentageCompleted = (currentTime / duration) * 100;

        $('.progress').attr('data-value', percentageCompleted);
        updateProgress();

        if (percentageCompleted == 100) {
          $('.progress').attr('data-value', 0);
          $('.progress-bar').removeAttr('style');
        }
    });



    function updateProgress() {
      $(".progress").each(function() {

        var value = $(this).attr('data-value');
        var left = $(this).find('.progress-left .progress-bar');
        var right = $(this).find('.progress-right .progress-bar');
    
        if (value > 0) {
          if (value <= 50) {
            right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
          } else {
            right.css('transform', 'rotate(180deg)')
            left.css('transform', 'rotate(' + percentageToDegrees(value - 50) + 'deg)')
          }
        }
      })
    }

    function onTrackedVideoFrame(currentTime, duration){
      $("#current").text(currentTime); //Change #current to currentTime
      $("#duration").text(duration)
    }

    function percentageToDegrees(percentage) {
      return percentage / 100 * 360
    }
   

    // Slide Drag
    if ($('.list-slides-holder').length) {
      const slider = document.querySelector('.list-slides-holder');
      let mouseDown = false;
      let startX, scrollLeft;
  
      let startDragging = function (e) {
        mouseDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      };
      let stopDragging = function (event) {
        mouseDown = false;
      };
  
      slider.addEventListener('mousemove', (e) => {
        e.preventDefault();
        if(!mouseDown) { return; }
        const x = e.pageX - slider.offsetLeft;
        const scroll = x - startX;
        slider.scrollLeft = scrollLeft - scroll;
      });
  
      slider.addEventListener('mousedown', startDragging, false);
      slider.addEventListener('mouseup', stopDragging, false);
      slider.addEventListener('mouseleave', stopDragging, false);
    }

    
    // Footer Dropdown

    $('.has-item').on('click', e => {

      let open = $(e.target).parent().find('.footer-dropdown').hasClass('active')

      if(open) {
        $(e.target).parent().find('.footer-dropdown').removeClass('active');
      } else {
        $(e.target).parent().find('.footer-dropdown').addClass('active');      
      }
      e.preventDefault();
    });

    // Mobile Nav    
    $('.navbar-toggler').on('click', ()=> {
      if (!$('.nav-contents').hasClass('show')) {
        $('.nav-contents').addClass('show');
      } else {
        $('.nav-contents').removeClass('show');
      }
    })


    // Slick Countries - Homepage
    $('.countries-up').slick({
      speed: 4000,
      autoplaySpeed: 0,
      cssEase: 'linear',
      infinite: true,
      variableWidth: true,
      autoplay: true,
      arrows: false,
      dots: false
    });

    // Slick Countries - Homepage
    $('.countries-down').slick({
      speed: 4000,
      autoplaySpeed: 0,
      cssEase: 'linear',
      rtl: true,
      infinite: true,
      variableWidth: true,
      autoplay: true,
      arrows: false,
      dots: false
    });

    // Swiper Testimonials - Homepage
    const swiper = new Swiper(".mySwiper", {
      cssMode: true,
      loop: true,
      navigation: {
        nextEl: ".button-next",
        prevEl: ".button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
      }
    });

    //Swiper Cards - Resources Section

    const swiperCards = new Swiper(".swiper-box", {
      effect: "fade",
      fadeEffect: { crossFade: true },
      navigation: {
        nextEl: ".button-next",
        prevEl: ".button-prev",
      },
      on: {
        init: function () {
          navColorSetter(this.activeIndex);
        },
      },
    });

    function navColorSetter(index) {
      if(index % 2 == 0 ) {
        $('.button-next').addClass('nav-bg-dark');
        $('.button-prev').addClass('nav-bg-white');
      } else {
        $('.button-prev').addClass('nav-bg-white');
        $('.button-next').addClass('nav-bg-dark');
      }

    }

    // Cards - Homepage
    greyCard.on('click', () => {
      var closed = greyCard.hasClass('card-close');

      if (closed || yellowCard.hasClass('card-close') || greenCard.hasClass('card-close')) {
        greyCard.removeClass('card-close');
        yellowCard.removeClass('card-close');
        greenCard.removeClass('card-close');
      }
    });
    
    yellowCard.on('click', () => {
      var closed = yellowCard.hasClass('card-close');

      if (closed || greenCard.hasClass('card-close')) {
        yellowCard.removeClass('card-close');
        greenCard.removeClass('card-close');
      } else {
        greyCard.addClass('card-close');
      }
    });

    greenCard.on('click', () => {
      var closed = greenCard.hasClass('card-close');

      if (closed) {
        greenCard.removeClass('card-close');
      } else {

        if(!yellowCard.hasClass('card-close') || !greyCard.hasClass('card-close')) {
           yellowCard.addClass('card-close');
           greyCard.addClass('card-close');
        } else {
          yellowCard.addClass('card-close');
        }
      }
    });

   purpleCard.on('click', () => {
    if(!yellowCard.hasClass('card-close') || !greyCard.hasClass('card-close') || !greenCard.hasClass('card-close')) {

      yellowCard.addClass('card-close');
      greyCard.addClass('card-close');
      greenCard.addClass('card-close');

    } else {
        greenCard.addClass('card-close');
    }
   });

    // var feed = new Instafeed({
    //   accessTokenTimeout: 5000,
    //   apiTimeout: 5000,
    //   accessToken: 'IGQVJYQTFpXzRVVVkzT1ZA0cXl6RTctNWgyQUE2RC1uQi1FNzZAVdTNsdXBfYXptUW5Pa19wQjVYbW5vSXJ2a3dLNGMyNngxZA0tsQ19MeEZAta2daT3dESlR6V1dhMXo4OFZA6X2o5TmZAhUUJ5OUNnLVMzSwZDZD',
    //   target: 'instafeed',
    //   template:'<div class="items item-3"><a href="{{link}}" target="_blank"><img src="{{image}}"><div class="rollover"></div></a></div>',
    //   limit: 3,
    // });

    // var feed_footer = new Instafeed({
    //   accessTokenTimeout: 5000,
    //   apiTimeout: 5000,
    //   accessToken: 'IGQVJYQTFpXzRVVVkzT1ZA0cXl6RTctNWgyQUE2RC1uQi1FNzZAVdTNsdXBfYXptUW5Pa19wQjVYbW5vSXJ2a3dLNGMyNngxZA0tsQ19MeEZAta2daT3dESlR6V1dhMXo4OFZA6X2o5TmZAhUUJ5OUNnLVMzSwZDZD',
    //   target: 'instafeed_footer',
    //   template:'<div class="items item-3"><a href="{{link}}" target="_blank"><img src="{{image}}"><div class="rollover"></div></a></div>',
    //   limit: 7,
    // });

    // feed_footer.run();
    // feed.run();
  };

  /////////////////////
  // Public Methods //
  ///////////////////
  const init = function () {
    _privateMethod();
  };

  return {
    init: init,
  };
})();
