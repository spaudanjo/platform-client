module.exports = [
    '_',
function (
    _
) {

    return {
        restrict: 'A',
        scope: {
            // id: '@',
            // name: '@',
            // model: '=',
            // required: '='
        },
        controller: [
            '$window',
            '$document',
            '$scope',
            function (
                $window,
                $document,
                $scope
            ) {
                debugger;

                headerScrollReact = function(headerHeight, lastScrollTop, parallaxReady) {
                    // When scrolling, fade content relative to scroll position and speed
                    $(window).scroll(function(event){
                        var scrollAmt = $(this).scrollTop();

                        if ((scrollAmt >= headerHeight) && (scrollAmt < headerHeight + 75)) {
                            // TRANSITION
                            $('.header').removeClass('header-full header-compact');
                            if (scrollAmt > lastScrollTop){
                                // Scrolling down
                                $('.header').delay(1500).addClass('header-transition');
                            } else {
                                // Scrolling up
                                $('.header').addClass('header-transition');
                            }
                        } else if (scrollAmt >= (headerHeight + 75)) {
                            // COMPACT
                            $('.header').removeClass('header-transition header-full').addClass('header-compact');
                        } else {
                            // FULL
                            $('.header').removeClass('header-transition header-compact').addClass('header-full');

                            if (parallaxReady == true) {
                                var deltaS = scrollAmt - lastScrollTop;
                                $('.parallax').css({
                                    bottom: "-=" + deltaS/4.5,
                                    opacity: "-=" + deltaS/200
                                });
                                lastScrollTop = scrollAmt;
                            }
                        }
                    });
                }

                debugger;
                if (!$('.header').hasClass('no-dynamic')) {
                    var headerHeight = $('.header-full').outerHeight(),
                    lastScrollTop = $(window).scrollTop();

                    $('.parallax').hide().fadeIn(400);

                    // If page loads with scroll position greater than 0
                    if (lastScrollTop != 0) {
                        $('.header').removeClass('header-transition header-full').addClass('header-compact');
                        headerScrollReact(headerHeight, lastScrollTop, false);
                        /*
                        var delta = headerHeight - lastScrollTop;
                        $('.parallax').css({
                        bottom: delta/4.5,
                        opacity: delta/200
                    });
                    */
                } else {
                    $('.header').height(headerHeight);
                    headerScrollReact(headerHeight, lastScrollTop, true);
                }
            }
        }]
    };
}];
