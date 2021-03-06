require('./bootstrap');

$(function() {
  mediaCheck({
    media: '(max-width: 414px)',
    exit: function() {
      $('.opened').removeClass('opened');
    }
  });

  if ($('.home__join-time').length > 0) {
    var today = new Date(),
        sunday = new Date();

    sunday.setDate(today.getDate() - today.getDay());
    sunday.setHours(10);
    sunday.setMinutes(0);
    sunday.setSeconds(0);
    sunday.setMilliseconds(0);

    if (sunday < today) sunday.setDate(sunday.getDate() + 7);

    var countDownDate = new Date(sunday).getTime();

    var x = setInterval(function() {
      var now = new Date().getTime(),
          distance = countDownDate - now,
          days = addZero(Math.floor(distance / (1000 * 60 * 60 * 24))),
          hours = addZero(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
          minutes = addZero(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))),
          seconds = addZero(Math.floor((distance % (1000 * 60)) / 1000));

      $('.home__join-time').text(days + ":" + hours + ":" + minutes + ":" + seconds);
    }, 1000);
  }

  if ($('#flash-message').length > 0) {
    setTimeout(function() {
      $('#flash-message').fadeOut(500);
    }, 2000);
  }

  if ($('.card__container').length > 0) {
    var cardHover = true;

    $('.card__container').hover(function() {
      if (cardHover) {
        $(this).find('.card__description').stop().animate({
          height: "toggle",
          opacity: "toggle"
        }, 300);
      }
    });

    mediaCheck({
      media: '(max-width: 768px)',
      entry: function() {
        cardHover = false;
      },
      exit: function() {
        cardHover = true;
      }
    });
  }

  if ($('.about__tab-section').length > 0) {
  	var clickedTab = $('.about__tab-lists > .active'),
        tabWrapper = $('.about__tab-contents'),
        activeTab = tabWrapper.find('.active');

  	activeTab.show();

  	$('.about__tab-list').on('click', function() {
  		$('.about__tab-list').removeClass('active');
  		$(this).addClass('active');
  		clickedTab = $('.about__tab-lists .active');

  		activeTab.fadeOut(250, function() {
  			$('.about__tab-content').removeClass('active');

  			var clickedTabIndex = clickedTab.index();

  			$('.about__tab-content').eq(clickedTabIndex).addClass('active');
  			activeTab = $('.about__tab-contents > .active');
				activeTab.fadeIn(250);
        $('html, body').animate({
          scrollTop: $('.about__tab-section').offset().top
        }, 500);
  		});
  	});
  }

  if ($('.directions__banner-input').length > 0) {
    $('body').on('keypress', function(e) {
      if ($('.directions__input-from').is(':focus') && e.keyCode == 13) $('.directions__find-btn').trigger('click');
    });
  }

  if ($('.support__slider').length > 0) {
    $('.support__slider').slick({
      dots: false,
      infinite: true,
      slidesToShow: 1,
      arrows: false,
      fade: true,
      autoplay: true,
      autoplaySpeed: 10000
    });

    $('body').on('click', '.support__navigation-btn-prev', function(e) {
      e.preventDefault();

      $('.support__slider').slick('slickPrev');
    });

    $('body').on('click', '.support__navigation-btn-next', function(e) {
      e.preventDefault();

      $('.support__slider').slick('slickNext');
    });
  }

  if ($('.album__wrapper').length > 0) {
    var $album = $('.album__wrapper').masonry({
      itemSelector: '.album__card',
      percentPosition: true
    });

    $album.imagesLoaded().progress( function() {
      $album.masonry('layout');
    });
  }

  if ($('.photo__popup').length > 0) {
    $('.photo__popup').magnificPopup({
      type: 'image',
      mainClass: 'mfp-with-zoom',
      zoom: {
        enabled: true,
        duration: 300,
        easing: 'ease-in-out',
        opener: function(openerElement) {
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      },
      gallery: {
        enabled: true
      }
    });

    var $album = $('.photo__wrapper').masonry({
      itemSelector: '.photo__popup',
      percentPosition: true
    });

    $album.imagesLoaded().progress( function() {
      $album.masonry('layout');
    });
  }

  if ($('.open-popup-link').length > 0) {
    $('.open-popup-link').magnificPopup({
      type:'inline',
      midClick: true
    });
  }

  $('.js-lazy').Lazy();

  enter();

  $('body').on('click', '.nav__link-mobile, .nav__overlay', function(e) {
    e.preventDefault();

    $('.nav').toggleClass('opened');
    $('.nav__overlay').toggleClass('opened');
  });

  $('body').on('click', '.js-transition', function(e) {
    var that = this;

    e.preventDefault();
    if ($(this).hasClass('active') || $(this).hasClass('nav__link-mobile')) return false;

    exit();

    setTimeout(function() {
      location.href = $(that).attr('href');
    }, 500);
  });

  $('body').on('click', '.js-scroll', function(e) {
    e.preventDefault();

    var scrollTo = $(this).attr('href'),
        target = (scrollTo !== '' && scrollTo !== '#') ? $(scrollTo).offset().top : 0;

    $('html, body').animate({
      scrollTop: target
    }, 500);
  });

  $('body').on('click', '.messages__video-link', function(e) {
    e.preventDefault();

    if (!$(this).hasClass('messages__card-inner--active')) {
      var videoId = $(this).attr('href'),
          videoDesc = $(this).find('.messages__card-desc'),
          videoSeriesId = $(this).data('series-id'),
          videoSeriesTitle = $(this).data('series-title'),
          newVideoDesc = '',
          newVideoDate = $(this).find('.messages__card-date').text();

      $(videoDesc).each(function () {
        newVideoDesc = newVideoDesc + '<p>' + $(this).text() + '</p>';
      });

      $('.messages__card-inner--active').removeClass('messages__card-inner--active');
      $(this).addClass('messages__card-inner--active');
      $('.home__message-iframe').attr('src', 'https://www.youtube.com/embed/' + videoId + '?rel=0');

      if ($('.home__message-desc').length > 0) $('.home__message-desc').html(newVideoDesc);
      if ($('.home__message-title').length > 0) $('.home__message-title').text(newVideoDate);
      if ($('.home__message-series').length > 0) {
        $('.home__message-series').attr('href', '/series/' + videoSeriesId);
        var titleWord = (videoSeriesId == 1) ? ' 영상 ' : ' 시리즈 ';
        $('.home__message-series-title').text(videoSeriesTitle + titleWord + '더보기');
      }
    }

    setTimeout(function() {
      $('html, body').animate({
        scrollTop: 0
      }, 500);
    }, 500);
  });
});

function enter() {
  $('body').addClass('loaded');
}

function exit() {
  $('body').removeClass('loaded');
}

function addZero(n) {
  return n < 10 ? '0' + n : '' + n;
}
