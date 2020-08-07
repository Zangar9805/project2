window.onload = function () {
	var addEvent = function(){return document.addEventListener?function(a,c,d){if(a&&a.nodeName||a===window)a.addEventListener(c,d,!1);else if(a&&a.length)for(var b=0;b<a.length;b++)addEvent(a[b],c,d)}:function(a,c,d){if(a&&a.nodeName||a===window)a.attachEvent("on"+c,function(){return d.call(a,window.event)});else if(a&&a.length)for(var b=0;b<a.length;b++)addEvent(a[b],c,d)}}();


var carousel = (function() {
	if (document.querySelector) {
	
		// Initiate any variables needed globally
		var carousel = document.querySelector('.carousel'),
			carouselInner = carousel.querySelector('.carousel-inner'),
			settings = {
				margin: 0.015
			},
			slides = [],
			slideWidth,
			margin,
			direction,
			timeouts = [];
			
		
		// Hook for active carousel styling
		carousel.className += " carousel-active";
		
		
		var init = function() {
			populateSlides();
			positionSlides();
			addControls();
			
			addEvent(window, 'resize', function() {
				positionSlides();
			});
		};
		
		var populateSlides = function() {
			var objs = carouselInner.querySelectorAll('li');
			
			for (var i = objs.length >>> 0; i--;) {
				slides[i] = objs[i];
			}
			
			return slides;
		};
		
		var positionSlides = function() {

			slideWidth = slides[0].offsetWidth;
			margin = slideWidth * settings.margin;


			var carouselWidth = carousel.offsetWidth,
				centerOffset = (carouselWidth - slideWidth) * .5;
				
				
				// Center the first slide
				slides[0].style.left = centerOffset + "px";
				
				// Position the other slides around the first. Position the last slide to the left
				for (var i = 1; i < slides.length; i++) {
				
				if (i === slides.length - 1 && slides.length > 2) {
					slides[i].style.left = centerOffset - (slideWidth + margin) + "px";
				} else {
					slides[i].style.left = centerOffset + (slideWidth + margin) * i + "px";
				}
			}
		};
		
		var addControls = function() {
			var prev = document.createElement('button'),
				next = document.createElement('button');
				
			prev.className = 'carousel-control prev';
			prev.innerHTML = '〈';
			
		

			next.className = 'carousel-control next';
			next.innerHTML = '〉';
			
			carousel.appendChild(prev);
			carousel.appendChild(next);
			 
			addEvent(carousel, 'click', function(e) {
				var target = e.target;
				if (target.tagName == 'BUTTON' && target.className.indexOf('control') !== -1) {
					direction = (target.className.indexOf('next') !== -1) ? 'next' : 'prev';
					
					moveSlides(direction);
				}
			});
		};
		
		var moveSlides = function(direction) {
			var distance;
			
			carouselInner.className += ' animate';
			
			// Move the carouselInner in the right direction
			if (direction === 'prev') {
				distance = slideWidth + margin;
				
				reorderSlides(direction);
			} else if (direction === 'next') {
				distance = - slideWidth + margin;
			} else {
				distance = 0;
			}
			
			translate(distance);
			
			
			// Clear the timer, reset the positions etc.
			timeouts = [];
			
			timeouts.push(
				setTimeout(function() {
					stopAnimation();
					
					if (direction === 'next') {
						reorderSlides(direction);
					}
					
					translate(0);
					positionSlides();
				}, 300)
			);
		};
		
		var translate = function(x) {
			carouselInner.style.left = x + "px";
		};
		
		var stopAnimation = function() {
			carouselInner.className = carouselInner.className.replace(' animate', '');
		};
		
		var reorderSlides = function(direction) {
			if (direction === 'prev') {
				slides.unshift(slides.pop());
			} else if (direction === 'next') {
				slides.push(slides.shift());
			} else {
				
			}
		};
		
		
		init();
	}
})();
}