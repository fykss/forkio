document.addEventListener('click', function(e){
    if (e.target.closest('.header__navbar-nav-toggle')) {
        document.getElementsByClassName('header__navbar-nav')[0].classList.toggle('active')
        //
    }
});


$(document).ready(function(){
    $('.users').slick({
        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        dots: false,
        arrows: true,
        infinite: true,
        centerMode: true,
        autoplay: false,
        mobileFirst:true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        cssEase: 'linear',
        variableWidth: true,
        variableHeight: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    mobileFirst: true,
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    variableWidth: true,
                    focusOnSelect: false
                }
            },
            {
                breakpoint: 481,
                settings: {
                    autoplay:false,
                    mobileFirst:true,
                    centerMode: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 401,
                settings: {
                    autoplay: false,
                    mobileFirst:true,
                    centerMode: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 320,
                settings: {
                    autoplay:false,
                    mobileFirst:true,
                    centerMode: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]

    });
});



// window.onresize = function(event) {
//     if (event.currentTarget.outerWidth < 320) {
//         $("section").hide();
//     }
// };

// window.onresize = function(event) {
//     if(event.currentTarget.outerWidth > 319){
//         console.info("hiding");
//         $(".fa-10x").hide();
//         // $("header, section, footer").not("section.less320").show();
//     }else{
//         console.info("showing");
//         $(".fa-10x").show().css({'color': '#8d81ac'});
//     }
// };

