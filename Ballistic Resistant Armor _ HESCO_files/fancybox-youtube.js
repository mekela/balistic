if (!window['YT']) { var YT = { loading: 0, loaded: 0 }; } if (!window['YTConfig']) { var YTConfig = {}; } if (!YT.loading) { YT.loading = 1; (function () { var l = []; YT.ready = function (f) { if (YT.loaded) { f(); } else { l.push(f); } }; window.onYTReady = function () { YT.loaded = 1; for (var i = 0; i < l.length; i++) { try { l[i](); } catch (e) { } } }; YT.setConfig = function (c) { for (var k in c) { if (c.hasOwnProperty(k)) { YTConfig[k] = c[k]; } } }; var a = document.createElement('script'); a.src = '//s.ytimg.com/yts/jsbin/www-widgetapi-vflvlw_TO.js'; a.async = true; var b = document.getElementsByTagName('script')[0]; b.parentNode.insertBefore(a, b); })(); }

// Fires whenever a player has finished loading
function onPlayerReady(event) {
    event.target.playVideo();
}

// Fires when the player's state changes.
function onPlayerStateChange(event) {
    // Go to the next video after the current one is finished playing
    if (event.data === 0) {
        $.fancybox.next();
    }
}

var maximumWidth = 568;
var maximumHeight = 400;

// The API will call this function when the page has finished downloading the JavaScript for the player API
function onYouTubePlayerAPIReady() {

    // Initialise the fancyBox after the DOM is loaded
    $(document).ready(function () {
        
        if ($(window).width() > 768) {
            maximumWidth = 970;
            maximumHeight = 546;
        }

        $('.fancybox').on('click', function(e) {
            e.preventDefault();
        });

        $(".fancybox")
            .fancybox({
                openEffect: 'none',
                closeEffect: 'none',
                nextEffect: 'none',
                prevEffect: 'none',
                padding: 0,
                margin: 0,
                width: '100%',
                maxWidth: maximumWidth,
                maxHeight: maximumHeight,
                beforeShow: function () {
                    // Find the iframe ID
                    var id = $.fancybox.inner.find('iframe').attr('id');

                    // Create video player object and add event listeners
                    var player = new YT.Player(id, {
                        events: {
                            'onReady': onPlayerReady,
                            'onStateChange': onPlayerStateChange
                        }
                    });
                },
                afterShow: function () {
                    $('.fancybox-wrap').prepend($('.fancybox-close'));                    
                }
            });
    });
}