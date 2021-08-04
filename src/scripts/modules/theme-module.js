AppName.Modules.ThemeModule = (function () {
  //Dependencies
  var core = AppName.Core;

  //////////////////////
  // Private Methods //
  ////////////////////
  const _privateMethod = () => {
    // private stuff

    const swiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
      },
    });

    var feed = new Instafeed({
      accessTokenTimeout: 5000,
      apiTimeout: 5000,
      accessToken: 'IGQVJYQTFpXzRVVVkzT1ZA0cXl6RTctNWgyQUE2RC1uQi1FNzZAVdTNsdXBfYXptUW5Pa19wQjVYbW5vSXJ2a3dLNGMyNngxZA0tsQ19MeEZAta2daT3dESlR6V1dhMXo4OFZA6X2o5TmZAhUUJ5OUNnLVMzSwZDZD',
      target: 'instafeed',
      template:'<div class="items item-3"><a href="{{link}}" target="_blank"><img src="{{image}}"></a></div>',
      limit: 3,
    });

    var feed_footer = new Instafeed({
      accessTokenTimeout: 5000,
      apiTimeout: 5000,
      accessToken: 'IGQVJYQTFpXzRVVVkzT1ZA0cXl6RTctNWgyQUE2RC1uQi1FNzZAVdTNsdXBfYXptUW5Pa19wQjVYbW5vSXJ2a3dLNGMyNngxZA0tsQ19MeEZAta2daT3dESlR6V1dhMXo4OFZA6X2o5TmZAhUUJ5OUNnLVMzSwZDZD',
      target: 'instafeed_footer',
      template:'<div class="items item-3"><a href="{{link}}" target="_blank"><img src="{{image}}"></a></div>',
      limit: 7,
    });

    feed_footer.run();
    feed.run();
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
