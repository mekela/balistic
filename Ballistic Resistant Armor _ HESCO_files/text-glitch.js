(function() {
    $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();
    
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
    
        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    var exists;
    var maxMobile = 568;

    if ($('[class^=text-glitch]').length > 0) {
        exists = true;
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomizeGlitchPosition(){

        if ($(window).width() > 768) {
            var parent = $('.text-glitch-image .image');
            var limitx = parent.outerWidth();
            var limity = parent.outerHeight()+26;

            $('.text-glitch-image .glitch-shape').each(function() {
                var deltaxlimit = limitx - $(this).outerWidth()+10;
                var xAmount = getRandomInt(-10, deltaxlimit);
                var yAmount = getRandomInt(-10, limity);

                console.log('limity '+limity);
                console.log('yAmount '+yAmount);

                $(this).css({"top": yAmount+"px", "left": "auto", "right": xAmount+"px"});
            });
        } else {
            $('.text-glitch-image .glitch-shape').css({"top": "auto", "left": "auto", "right": "auto"});
        }
    }
    randomizeGlitchPosition();
    $(window).resize(function () { randomizeGlitchPosition(); });

    $('.text-glitch-image').mousemove(function(e) {
        var y = e.pageY;
        var x = e.pageX;
        var throttle = 25;
        var target = $(this);
        var offsetTop = target.offset().top;
        var offsetLeft = target.offset().left;
    
        var shapeOne = $(this).find('.shape-1');
        var shapeTwo = $(this).find('.shape-2');
        var shapeThree = $(this).find('.shape-3');

        var shapeOneMove = {
            x: ((x - target.offset().top)*-1) / throttle,
            y: ((y - target.offset().top)*-1) / throttle
        };

        var shapeTwoMove = {
            x: (x - target.offset().top) / throttle,
            y: ((y - target.offset().top)*-1) / throttle
        };

        var shapeThreeMove = {
            x: (x - target.offset().top) / throttle,
            y: (y - target.offset().top) / throttle
        };

        shapeOne.css({'transform': 'translate(' + shapeOneMove.x + 'px'});
        shapeTwo.css({'transform': 'translate(' + shapeTwoMove.x + 'px'});
        shapeThree.css({'transform': 'translate(' + shapeThreeMove.x + 'px'});

    });

    // $(window).on('scroll', function() {
    //     if (exists && $(window).width() > maxMobile) {

    //         $('[class^=text-glitch]').each(function() {
    //             var textGlitch = $(this);
                
    //             if (textGlitch.isInViewport()) {
    //                 var image = textGlitch.find('.image img');
    //                 var shapeOne = textGlitch.find('.image .shape-1');
    //                 var shapeTwo = textGlitch.find('.image .shape-2');
    //                 var shapeThree = textGlitch.find('.image .shape-3');
                    
    //                 var scrollTop = $(window).scrollTop();

    //                 var moveOffset = (textGlitch.offset().top - scrollTop) - $(window).height()/3;

    //                 var imageOffset = (moveOffset / 8)*-1;

    //                 image.css({
    //                     'transform': 'translateY(-' + imageOffset + 'px)'
    //                 });

    //                 var shapeOneOffset = (moveOffset / 3)*-1;

    //                 shapeOne.css({
    //                     'transform': 'translateY(-' + shapeOneOffset + 'px)'
    //                 });

    //                 var shapeTwoOffset = (moveOffset / 2.5)*-1;

    //                 shapeTwo.css({
    //                     'transform': 'translateY(-' + shapeTwoOffset + 'px)'
    //                 });

    //                 var shapeThreeOffset = (moveOffset / 2)*-1;

    //                 shapeThree.css({
    //                     'transform': 'translateY(-' + shapeThreeOffset + 'px)'
    //                 });
    //             }

    //         });
    //     }
    // });

})();
