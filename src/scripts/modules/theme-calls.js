AppName.Modules.ThemeModule = (function () {
    //Dependencies
    var core = AppName.Core;
  
    //////////////////////
    // Private Methods //
    ////////////////////
    const _privateCalls = () => {
      // private stuff

      $(window).on('load', function(){
        setTimeout(function () {
              $('.bounceball').addClass('paused');
              setTimeout(function () {
                $('.splash-screen').fadeOut();
              }, 500);
        }, 2000);
      });
  
      $("img.lazy").lazyload( {
        effect: "fadeIn"
      });

    // Careers Video
    $('.career-video').parent().click(function () {
        if($(this).children(".career-video").hasClass('side-videos')){ 
            var link = $(this).children(".career-video").attr('src');
            var mainLink = $(".career-video.main").attr('src');
            $(".career-video.main").attr('src', link);
            $(this).children(".career-video").attr('src', mainLink);
            $(".career-video.main").get(0).play();
            $(".play.main").hide();
        } else if($(this).children(".career-video").hasClass('main')){
            if($(".career-video.main").get(0).paused){ 
            $(".career-video.main").get(0).play();
            $(".play.main").hide();
            }else{ 
            $(".career-video.main").get(0).pause();
            $(".play.main").show();
            }
        } else{ 
            $(this).children(".career-video").get(0).pause();
            $(this).children(".play.side-videos").show();
        }
    });

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

    // Anchor Tag - Smooth Scroll
    $('.smooth-scroll').click( function (event) {
        event.preventDefault();
    
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 100
        }, 600);
    });

      // JAZZHR API - INTEGRATION
    
    const getAllUrl = 'https://api.resumatorapi.com/v1/jobs/status/open?apikey=Y4TE0u9Q29jddp8hDHeH7IAFtV8oRfQv';

      if ($('main').hasClass('careers')) {
        axios.get(getAllUrl)
            .then(function(response){

                let jobs = response.data;

                $('.loader').hide();

                jobs.forEach(function(job) {
                    $('.cards-wrapper').append(`
                    <div class="col-lg-4 col-md-6 cards">
                        <div class="card-inner">
                            <div class="details">
                                <p class="job-title">${job.title}.</p>
                                <p class="location">
                                    ${ (job.country_id == job.city) ? job.country_id : (!job.city) ? job.country_id : job.country_id +' | '+ job.city}
                                </p>
                                <p class="type">${job.type}</p>
                            </div>
                            <div class="btn-wrapper">
                                <a href="#" class="btn btn-yellow hover-round apply-now" data-board="${job.board_code}" data-job-id="${job.id}">Apply Now</a>
                            </div>
                        </div>
                    </div>
                    `);
                });

                $('.apply-now').on('click', e => {
                    e.preventDefault();
                    saveJobs(e);
                });

            })
        .catch(error => {
            console.log(error)
        });  
      } 


      if ($('main').hasClass('job-posted')) {

        let jobID = localStorage.getItem("data-job-id");

        if (jobID) {

            let url = 'https://api.resumatorapi.com/v1/jobs/'+jobID+'?apikey=Y4TE0u9Q29jddp8hDHeH7IAFtV8oRfQv'

            axios.get(url)
                .then(function(response){
                    let job = response.data;

                    console.log(job)
    
                    $('.details-wrapper').append(`
                        <h1 class="section-title">${job.title}.</h1>
                        <p class="location">${ (job.country_id == job.city) ? job.country_id : (!job.city) ? job.country_id : job.country_id +' | '+ job.city}</p>
                        <p class="type">${job.type}</p>
                        <button type="button" class="btn btn-yellow apply-now-banner hover-round" data-toggle="modal" data-target="#jazzForm">
                            Apply Now
                        </button>
                    `);
    
                   $('.job-description').append(job.description);
    
                   $('.modal-body').append(`
                        <iframe src="https://filtaglobal8c.applytojob.com/apply/embed/form/${job.board_code}" title="description" width="100%" height="600px"></iframe>
                   `);
    
                   $('.apply-now-modal').removeAttr('disabled');
                   $('.apply-now-refer').removeClass('disabled');
                   $('.loader').hide();
                })
            .catch(error => {
                console.log(error)
            }); 
    
    
            //RELATED JOBS
            axios.get(getAllUrl)
                .then(function(response){
    
                    let jobs = response.data;
                    $('.loader').hide();
    
                    let count = 0;
                    jobs.forEach(function(job) {
                       
                        if (count < 2) {
                            $('.more-cards').append(`
                                <div class="cards">
                                    <div class="card-inner">
                                        <div class="details">
                                            <p class="job-title">${job.title}.</p>
                                            <p class="location">${ (job.country_id == job.city) ? job.country_id : (!job.city) ? job.country_id : job.country_id +' | '+ job.city}</p>
                                            <p class="type">${job.type}</p>
                                        </div>
                                        <div class="btn-wrapper">
                                            <a href="#" class="btn btn-yellow hover-round apply-now" data-board="${job.board_code}" data-job-id="${job.id}">Apply Now</a>
                                        </div>
                                    </div>
                                </div>
                            `);
                        } 
                        count++;
                    });
    
                    $('.apply-now').on('click', e => {
                        e.preventDefault();
                        saveJobs(e);
                    });
    
                })
            .catch(error => {
                console.log(error)
            }); 

        } else {
            let host = window.location.hostname

            if (host == 'localhost') {
                window.location = '/careers.html';
            } else {
                window.location = '/careers';
            }
        }

      }

      function saveJobs(e) {
        let board = $(e.target).attr('data-board');
        let jobID = $(e.target).attr('data-job-id');
        let host = window.location.hostname

        localStorage.setItem("data-board", board);
        localStorage.setItem("data-job-id", jobID);

        if (host == 'localhost') {
            window.location = '/job-posted.html';
        } else {
            window.location = '/job-posted';
        }
      }
      

    
    };
  
    /////////////////////
    // Public Methods //
    ///////////////////
    const init = function () {
        _privateCalls();
    };
  
    return {
      init: init,
    };
  })();
  