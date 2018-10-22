$(document).ready(function(){
    $('.users').slick({
        // prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
        // nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
        dots: false,
        infinite: true,
        centerMode: true,
        autoplay: false,
        mobileFirst:true,
        // speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        // cssEase: 'linear',
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
                    variableWidth: false,
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
// $('.your-class').slick({
//     prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
//     nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>"
// });