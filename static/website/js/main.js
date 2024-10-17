(function() {

	"use strict";

	AOS.init({
		ease: 'slide',
		once: true
	});

	var slider = function(){

		var heroSlider = document.querySelectorAll('.hero-slider');

		if ( heroSlider.length > 0 ) {
			var heroSlider = tns({
				container: '.hero-slider',
				items: 1,
				mode: 'carousel',
				autoplay: true,
			  animateIn: 'tns-fadeIn',
		    animateOut: 'tns-fadeOut',
				speed: 700,
				nav: true,
				controls: false,
				autoplayButtonOutput: false,
			});
		}

		var carouselCourses = document.querySelectorAll('.carousel-courses');
		if ( carouselCourses.length > 0 ) {

			var coursesSlider = tns({
				container: '.carousel-courses',
				items: 1,
				mode: 'carousel',
				autoplay: true,
			  animateIn: 'tns-fadeIn',
		    animateOut: 'tns-fadeOut',
				speed: 700,
				nav: true,
				gutter: 20,
				controls: false,
				autoHeight: true,
				autoplayButtonOutput: false,
				responsive:{
					0:{
						items: 1,
						gutter: 0
					},
					600:{
						items: 2,
						gutter: 20
					},
					1000:{
						items: 3,
						gutter: 20
					}
				}
			});

		}

		var carouselSlider = document.querySelectorAll('.carousel-testimony');
		if ( carouselSlider.length > 0 ) {

			var testimonySlider = tns({
				container: '.carousel-testimony',
				items: 1,
				mode: 'carousel',
				autoplay: true,
			  animateIn: 'tns-fadeIn',
		    animateOut: 'tns-fadeOut',
				speed: 700,
				nav: true,
				gutter: 20,
				controls: false,
				autoplayButtonOutput: false,
				responsive:{
					0:{
						items: 1,
						gutter: 0
					},
					600:{
						items: 2,
						gutter: 20
					},
					1000:{
						items: 3,
						gutter: 20
					}
				}
			});

		}

	}
	slider();
	
	//COUNTER
	'use trict';
		// How long you want the animation to take, in ms
		const animationDuration = 2000;
		// Calculate how long each ‘frame’ should last if we want to update the animation 60 times per second
		const frameDuration = 1000 / 60;
		// Use that to calculate how many frames we need to complete the animation
		const totalFrames = Math.round( animationDuration / frameDuration );
		// An ease-out function that slows the count as it progresses
		const easeOutQuad = t => t * ( 2 - t );


		const numberWithCommas = n => {
			return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		}

		// The animation function, which takes an Element
		const animateCountUp = el => {
			let frame = 0;
			const countTo = parseInt( el.innerHTML, 10 );
			// Start the animation running 60 times per second
			const counter = setInterval( () => {
			frame++;
			// Calculate our progress as a value between 0 and 1
			// Pass that value to our easing function to get our
			// progress on a curve
			const progress = easeOutQuad( frame / totalFrames );
			// Use the progress value to calculate the current count
			const currentCount = Math.round( countTo * progress );

			// If the current count has changed, update the element
			if ( parseInt( el.innerHTML, 10 ) !== currentCount ) {
			el.innerHTML = numberWithCommas(currentCount);
		}

		// If we’ve reached our last frame, stop the animation
		if ( frame === totalFrames ) {
			clearInterval( counter );
		}
		}, frameDuration );
		};

		// Run the animation on all elements with a class of ‘countup’
		const runAnimations = () => {
			const countupEls = document.querySelectorAll( '.countup' );
			countupEls.forEach( animateCountUp );
		};




		// In Viewed
		var elements;
		var windowHeight;

		function init() {
			elements = document.querySelectorAll('.section-counter');
			windowHeight = window.innerHeight;
		}

		function checkPosition() {
			var i;
			for (i = 0; i < elements.length; i++) {
				var element = elements[i];
				var positionFromTop = elements[i].getBoundingClientRect().top;
			if (positionFromTop - windowHeight <= 0) {
			if( !element.classList.contains('viewed') ) {
			element.classList.add('viewed');
			runAnimations();
			} else {
			if ( element.classList.contains('viewed') ) {

			}
		}

		}
		}
		}

		window.addEventListener('scroll', checkPosition);
		window.addEventListener('resize', init);

		init();
		checkPosition();


	//GLIGHTBOX
	const lightbox = GLightbox({
	  touchNavigation: true,
	  loop: true,
	  autoplayVideos: true
	});


	document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
		faqItem.addEventListener('click', () => {
		  faqItem.parentNode.classList.toggle('faq-active');
		});
	  });

	  var swiper = new Swiper(".swiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: true
        },
        spaceBetween: 60,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        }
    });
	class StickyNavigation {
	
		constructor() {
			this.currentId = null;
			this.currentTab = null;
			this.tabContainerHeight = 70;
			let self = this;
			$('.et-hero-tab').click(function() { 
				self.onTabClick(event, $(this)); 
			});
			$(window).scroll(() => { this.onScroll(); });
			$(window).resize(() => { this.onResize(); });
		}
		
		onTabClick(event, element) {
			event.preventDefault();
			let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
			$('html, body').animate({ scrollTop: scrollTop }, 600);
		}
		
		onScroll() {
			this.checkTabContainerPosition();
		this.findCurrentTabSelector();
		}
		
		onResize() {
			if(this.currentId) {
				this.setSliderCss();
			}
		}
		
		checkTabContainerPosition() {
			let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
			if($(window).scrollTop() > offset) {
				$('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
			} 
			else {
				$('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
			}
		}
		
		findCurrentTabSelector(element) {
			let newCurrentId;
			let newCurrentTab;
			let self = this;
			$('.et-hero-tab').each(function() {
				let id = $(this).attr('href');
				let offsetTop = $(id).offset().top - self.tabContainerHeight;
				let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
				if($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
					newCurrentId = id;
					newCurrentTab = $(this);
				}
			});
			if(this.currentId != newCurrentId || this.currentId === null) {
				this.currentId = newCurrentId;
				this.currentTab = newCurrentTab;
				this.setSliderCss();
			}
		}
		
		setSliderCss() {
			let width = 0;
			let left = 0;
			if(this.currentTab) {
				width = this.currentTab.css('width');
				left = this.currentTab.offset().left;
			}
			$('.et-hero-tab-slider').css('width', width);
			$('.et-hero-tab-slider').css('left', left);
		}
		
	}
	
	new StickyNavigation();
})();


