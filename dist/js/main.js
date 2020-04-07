$(function () {

    $('.sl').slick({
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        arrows: false,
        vertical: true,
        responsive: [
            {
              breakpoint: 600,
              settings: {
                dots:false,
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]

    });
    
    
   $('.my-slider').slick({
       autoplay: true,
       autoplaySpeed: 2000,
       cssEase: 'ease-in',
       centerMode: true,
       arrows: false,
       pauseOnDotsHover:true,
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
    });
    
    
    $('.arts-popup').magnificPopup({
        delegate: 'a',
        type: 'image',
        mainClass: 'mfp-img-mobile',
        gallery:{
            enable: true,
            navigateByImgClick: true,
        },
        removalDelay: 300
    })

    $(document).ready(function() {
        $('.popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0,1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function(item) {
                    return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
                }
            }
        });
    });


});
 