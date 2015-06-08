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
                    $window.scroll(function(event){
                        debugger;
                        var scrollAmt = angular.element(this).scrollTop();

                        if ((scrollAmt >= headerHeight) && (scrollAmt < headerHeight + 75)) {
                            // TRANSITION
                            angular.element('.header').removeClass('header-full header-compact');
                            if (scrollAmt > lastScrollTop){
                                // Scrolling down
                                angular.element('.header').delay(1500).addClass('header-transition');
                            } else {
                                // Scrolling up
                                angular.element('.header').addClass('header-transition');
                            }
                        } else if (scrollAmt >= (headerHeight + 75)) {
                            // COMPACT
                            angular.element('.header').removeClass('header-transition header-full').addClass('header-compact');
                        } else {
                            // FULL
                            angular.element('.header').removeClass('header-transition header-compact').addClass('header-full');

                            if (parallaxReady == true) {
                                var deltaS = scrollAmt - lastScrollTop;
                                angular.element('.parallax').css({
                                    bottom: "-=" + deltaS/4.5,
                                    opacity: "-=" + deltaS/200
                                });
                                lastScrollTop = scrollAmt;
                            }
                        }
                    });
                }

                if (!angular.element(document.querySelector('.header')).hasClass('no-dynamic')) {
                    var headerHeight = angular.element(document.querySelector('.header-full')).outerHeight(),
                    lastScrollTop = $window.scrollTop();

                    angular.element(document.querySelector('.parallax')).hide().fadeIn(400);

                    // If page loads with scroll position greater than 0
                    if (lastScrollTop != 0) {
                        angular.element(document.querySelector('.header')).removeClass('header-transition header-full').addClass('header-compact');
                        headerScrollReact(headerHeight, lastScrollTop, false);
                        /*
                        var delta = headerHeight - lastScrollTop;
                        $('.parallax').css({
                        bottom: delta/4.5,
                        opacity: delta/200
                    });
                    */
                } else {
                    angular.element(document.querySelector('.header')).height(headerHeight);
                    headerScrollReact(headerHeight, lastScrollTop, true);
                }
            }
        }]
    };
}];
