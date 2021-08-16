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


  //  greenCard.on('click', () => {
  //     this.removeClass('card-close');
  //   });
    
    // const swiper = new Swiper('.swiper-container', {
    //   pagination: {
    //     el: '.swiper-pagination',
    //   },
    // });

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
