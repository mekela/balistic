var Parallax = {};
var itemCount = 0;
var sectionCount = 0;

Parallax.init = function (){
    sectionCount = 0;

	window.onscroll = Parallax.updateScrollPosition;
	
	$('section').each(function () {
		if (!$(this).hasClass('large-banner')) {
			$(this).attr('data-index',sectionCount);
			sectionCount++;			
		}
	});

	$('.item').each(function() {
		itemCount++;
	});
	
	var section = $('section[data-index=0]');
	var visible = Parallax.isElementInViewport(section);
	
	if (visible) {
		section.children('*').css('visibility', 'visible');
		section.children('*:first-child').animate({
				opacity: 1
			}, 500, function() {
				Parallax.Animate($(this));	
			}
		);
	}	
};

Parallax.updateScrollPosition = function() {
	var scrollTop = $(window).scrollTop();
	var bannerOffset = (scrollTop/5) + 'px';
	var bgOffset = (scrollTop/10)-500 + 'px';
	var Offset = (scrollTop/10)-300 + 'px';
	var smOffset = (scrollTop/15) + 100 + 'px';

	if ($('html').hasClass('no-touch')) {
		$('.large-banner:not(".gallery") .valign').each(function() {
			$(this).css({
				'transform': 'translate(0,'+bannerOffset+')'
			});
		});

		// $( ".large-image-pod" ).find('.span5.valign').css({
		// 	'transform': 'translate(0,'+Offset+')'
		// });

		$('.large-image-pod').each(function() {
			var largePodOffset = (scrollTop/20) - $(this).outerHeight()/2 + 'px';

			$(this).find('.span5.valign').css({
				'transform': 'translate(0,'+largePodOffset+')'
			});
		});

		$( ".large-image-pod.parallax" ).find('.span5.valign').css({
			'transform': 'translate(0,'+smOffset+')'
		});


		$('.news-grid').css({
			'background-position': 'center '+bgOffset	
		});
		
		$('.product-range-products').css({
			'background-position': 'center '+bgOffset	
		});
		
		$('.subpages').css({
			'background-position': 'center '+bgOffset	
		});

		//large image pod offset
		// if ($('.large-image-pod').length > 0) {
        //
		// 	$('.large-image-pod').each(function() {
		// 		var podOffset = $(this).offset();
		// 		podOffset = podOffset.top;
		// 		var podBgOffset = ((podOffset - scrollTop)/10)*-1 + 'px';
        //
		// 		$(this).css({
		// 			'background-position': 'center '+podBgOffset
		// 		});
		// 	});
		// }

		// if ($('.span5.valign').length > 0) {
        //
		// 	$('.span5.valign').each(function() {
		// 		$(this).css({
		// 			'transform': 'translate(0,'+bannerOffset+')'
		// 		});
		// 	});

		$('.new-image-pod.parallax').each(function() {
			var item = $(this).find('[class^=span]');
			var itemVisible = Parallax.isItemInViewport($(this));
			var moveOffset = $(this).offset().top - scrollTop;

			if (itemVisible) {
				item.css({
					'top': (moveOffset/20)*-1+'px'
				});
			}
		});

		$('.featured-pod.parallax').each(function() {
			var item = $(this).find('[class^=span]');
			var itemVisible = Parallax.isItemInViewport($(this));
			var moveOffset = $(this).offset().top - scrollTop;

			if (itemVisible) {
				item.css({
					'top': (moveOffset/20)*-1+'px'
				});
			}
		});
		
		//contact details pod offset
		if ($('.contact-details').length > 0) {
			
			$('.contact-details').each(function() {
				var podOffset = $(this).offset();
				podOffset = podOffset.top;
				var podBgOffset = ((podOffset - scrollTop)/5)*-1 + 'px';
				
				$(this).css({
					'background-position': 'center '+podBgOffset	
				});
			});
		}
	}
	
	for (var j = 0; j < itemCount; j++) {
        var item = $('.item[data-item='+ j + ']');

		var itemVisible = Parallax.isItemInViewport(item);
		if (itemVisible) {
			item.css('visibility', 'visible');
			item.animate({
				opacity: 1
			}, 500);
		}
	}

	for (var i = 0; i < sectionCount; i++) {
	    var section = $('section[data-index=' + i + ']');

		var visible = Parallax.isElementInViewport(section);
	
		if (visible) {
			if (!section.hasClass('news-grid')) {
				section.children('*').css('visibility', 'visible');
				section.children('*:first-child').animate({
						opacity: 1
					}, 500, function() {
						Parallax.Animate($(this));	
					}
				);
			}
		}
	}
};

Parallax.isElementInViewport = function(el) {
	'use strict';
	//special bonus for those using jQuery
	if (typeof jQuery === "function" && el instanceof jQuery) {
		el = el[0];
	}
    if (el === null || el === undefined) return true;
	var rect = el.getBoundingClientRect();

	var innerHeight = window.innerHeight;	
	var heightOffset = rect.height;
	
	return (
		// (rect.top + heightOffset/3) <= (innerHeight || document.documentElement.clientHeight)
		(rect.top) <= (innerHeight)
	);
};

Parallax.isItemInViewport = function(ele) {
	'use strict';
	//special bonus for those using jQuery
	if (typeof jQuery === "function" && ele instanceof jQuery) {
		ele = ele[0];
	}

    if (typeof ele == 'undefined') {
        return false;
    }

	var rect = ele.getBoundingClientRect();

	return (
		// rect.top >= 0 &&
		// rect.left >= 0 &&
		// rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
		// rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
		
		(rect.top) <= (innerHeight)
	);
};

Parallax.Animate = function(elm) {
	elm.next().animate({
		opacity: 1
	}, 500, function() {
		Parallax.Animate(elm.next());
	});
};

Parallax.init();

$(window).load(function() {
	Parallax.updateScrollPosition();	
});