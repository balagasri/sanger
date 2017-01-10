$(window).on('load resize', function () {
    var header_height = $('.header').height();
    /* $('.inside-look-component').css({
        marginTop: header_height
    , }); */
	
	onScrollSetHeaderSpacing();
});
$(window).load(function () {
    var header_height = $('.header').height();
    /* $('.inside-look-component').css({
        marginTop: header_height
    }); */
});
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}
$(function () {
    $("#nav").tinyNav();
    $(window).bind('scroll', function () {
        /*if ($(window).scrollTop() > 15) {
            $(' .secoundary_bar').css({
                padding: '20px 0'
            , });
        }
        else {
            $(' .secoundary_bar').css({
                padding: '30px 0'
            , });
        }*/
        /*   scroll fixed nav */
        var headerHeight = $('.header').outerHeight(true);
        var navHeight = $('.navigation').outerHeight(true);
        var navTopHeight = $('.navigation-top').outerHeight(true);
        var navTopOffset = $('.navigation-top').offset().top;
        var scrollDiff = navTopOffset - headerHeight;
        /* if ($(window).scrollTop() > (scrollDiff+navTopHeight)) {
            $('.navigation').addClass('navigation-fixed');
			$('.navigation-top').css('height',navHeight+'px');
        }
        else {
            $('.navigation').removeClass('navigation-fixed');
			$('.navigation-top').css('height','initial');
        } */
        /* if ($(window).scrollTop() > (scrollDiff) && $("#form-component").offset().top + headerHeight + navHeight < scrollPos) {} */
        //if ($(window).scrollTop() > (scrollDiff) && $(window).scrollTop() < $("#form-component").offset().top - headerHeight - navHeight) {}
        if ($(window).scrollTop() > (scrollDiff)) {
            $('.navigation').addClass('navigation-fixed');
            $('.navigation-top').css('height', navHeight + 'px');
        }
        else {
            $('.navigation').removeClass('navigation-fixed');
            //$('.navigation-top').css('height', 'initial');
            $('.navigation-top').css('height', '0px');
        }
    });
});
//goto form component on click on "READ FULL REPORT"
/* $(".goto-form-component").click(function (event) {
    event.preventDefault();
    var sectionId = $(this).attr("href");
    var headerHeight = $('.header').outerHeight(true);
    var navHeight = $('.navigation').outerHeight(true);
    var currentSectionOffsetTop = $(sectionId).offset().top - headerHeight;
    //goto related section with animation
    $("html, body").animate({
        scrollTop: currentSectionOffsetTop + 2
    }, 1000);
}); */
//goto related section based on id of section inside variable "sectionId" as parameter
$(".inside-look-component .navigation ul li a").click(function (event) {
    event.preventDefault();
    var sectionId = $(this).attr("data-section-id");
    //console.log(sectionId);
    //$(".inside-look-component .navigation ul li a").removeClass("active");
    //$(this).addClass("active");
    goToPageSection(sectionId);
});

function goToPageSection(sectionId) {
    var headerHeight = $('.header').outerHeight(true);
    var navHeight = $('.navigation').outerHeight(true);
	if($(window).width() > 767){
		if($(window).scrollTop() > 250){
			//do nothing
		}else{
			headerHeight = headerHeight - ((31 - 8) * 2);
		}
	}
	else if(($(window).width() >= 550) && ($(window).width() <= 767)){
		if($(window).scrollTop() > 250){
			//do nothing
		}else{
			headerHeight = headerHeight - ((15 - 8) * 2);
		}
	}
	else if(($(window).width() >= 450) && ($(window).width() <= 549)){
		if($(window).scrollTop() > 250){
			//do nothing
		}else{
			headerHeight = headerHeight - ((22 - 8) * 2);
		}
	}
	else if(($(window).width() < 450)){
		if($(window).scrollTop() > 250){
			//do nothing
		}else{
			headerHeight = headerHeight - ((22 - 8) * 2);
		}
	}
    var currentSectionOffsetTop = $(sectionId).offset().top - headerHeight - navHeight;
    //goto related section with animation
	if (navigator.userAgent.search("Firefox") > -1) {
        $("html, body").animate({
            scrollTop: currentSectionOffsetTop + 8
        }, 1000);
    }
	else{
		$("html, body").animate({
			scrollTop: currentSectionOffsetTop + 7
		}, 1000);
	}
}
/* function goToPageSection(sectionId) {
    var headerHeight = $('.header').outerHeight(true);
    var navHeight = $('.navigation').outerHeight(true);
    var currentSectionOffsetTop = $(sectionId).offset().top - headerHeight - navHeight;
    //goto related section with animation
    if (navigator.userAgent.search("Firefox") > -1) {
        $("html, body").animate({
            scrollTop: currentSectionOffsetTop + 5
        }, 300);
    }
    else {
        $("html, body").animate({
            scrollTop: currentSectionOffsetTop
        }, 300);
    }
} */
$(document).on("scroll", onScroll);
//set navigation active based on content on scrolling
function onScroll(event) {
    var headerHeight = $('.header').outerHeight(true);
    var navHeight = $('.navigation').outerHeight(true);
    var scrollPos = $(document).scrollTop();
    $('.inside-look-component .navigation ul li a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        //console.log($(currLink.attr("href")));
        if (refElement.position().top <= scrollPos + headerHeight + navHeight - 3 && refElement.position().top + refElement.height() > scrollPos + headerHeight + navHeight - 95) {
            $('.inside-look-component .navigation ul li a').removeClass("active");
            currLink.addClass("active");
        }
        else {
            currLink.removeClass("active");
        }
    });
}


//setting ".secoundary_bar" spacing as based on scroll to reduce spacing to show some more content for readability based on actual padding of ".secoundary_bar". And also calculating height based on ".secoundary_bar" padding including inside "$('.header').height(true)" at function "goToPageSection(sectionId)" at top of function on scroll to go to particular location.
/*
 Ex.: Here, headerHeight = headerHeight - ((31 - 8) * 2);  based on width is greater than 767
31 is actual padding of ".secoundary_bar",
8 is current padding of ".secoundary_bar",
2 is used to multiply remaining padding as it used top, bottom(two sides). 
Here, (31 - 8) = 23 * 2 = 46.
Here, Remove 46 from headerHeight to get new header height after page is scrolled to given point

This process is applied to other media queries also at 3 places 
1.	set padding in media queries.
2.	use actial padding from media queries inside function onScrollSetHeaderSpacing() to set reduce spacing on scrolling.
3.	use reduced padding and actual padding at function "goToPageSection(sectionId)" to calculate header height with reduced padding
*/

$(document).on("scroll", onScrollSetHeaderSpacing);
function onScrollSetHeaderSpacing(){
	//console.log($(window).width());
	if($(window).width() > 767){
		/* if($(window).scrollTop() > 100){
			$(".header .secoundary_bar").css("padding","8px 0");
		}else{
			$(".header .secoundary_bar").css("padding","31px 0");
		} */
		if($(window).scrollTop() > 250){
			$(".header .secoundary_bar").css("padding-top","8px");
			$(".header .secoundary_bar").css("padding-bottom","8px");
		}else{
			$(".header .secoundary_bar").css("padding-top","31px");
			$(".header .secoundary_bar").css("padding-bottom","31px");
		}
	}
	else if(($(window).width() >= 550) && ($(window).width() <= 767)){
		if($(window).scrollTop() > 250){
			$(".header .secoundary_bar").css("padding-top","8px");
			$(".header .secoundary_bar").css("padding-bottom","8px");
		}else{
			$(".header .secoundary_bar").css("padding-top","15px");
			$(".header .secoundary_bar").css("padding-bottom","15px");
		}
	}
	else if(($(window).width() >= 450) && ($(window).width() <= 549)){
		if($(window).scrollTop() > 250){
			$(".header .secoundary_bar").css("padding-top","8px");
			$(".header .secoundary_bar").css("padding-bottom","8px");
		}else{
			$(".header .secoundary_bar").css("padding-top","22px");
			$(".header .secoundary_bar").css("padding-bottom","22px");
		}
	}
	else if(($(window).width() < 450)){
		if($(window).scrollTop() > 250){
			$(".header .secoundary_bar").css("padding-top","8px");
			$(".header .secoundary_bar").css("padding-bottom","8px");
			$(".header .secoundary_bar .logo-block .grid .refer-text").css("margin-top","12px");
		}else{
			$(".header .secoundary_bar").css("padding-top","22px");
			$(".header .secoundary_bar").css("padding-bottom","22px");
			$(".header .secoundary_bar .logo-block .grid .refer-text").css("margin-top","30px");
		}
	}
}
