class ZwingCarousel {
	
	constructor(context, {
		startIndex = 0,
		dots = false,
		dotsContainerSelector = '.zwing-carousel__dots',
		childSelector = '.zwing-carousel__item',
		nextButtonSelector = '.zwing-carousel__button-next',
		prevButtonSelector = '.zwing-carousel__button-prev',
		activeDotClass = 'active',
		interval = false,
	} = {}) {
		
		this.context = document.querySelector(context);
		this.children = this.context.querySelectorAll(childSelector);
		this.carouselIndex = startIndex;
		this.dots = dots;
		this.dotsContainerSelector = dotsContainerSelector;
		this.nextButtonSelector = nextButtonSelector;
		this.prevButtonSelector = prevButtonSelector;
		this.activeDotClass = activeDotClass;
		
		this.namespace();
		this.bindTouch();
		this.bindButtons();
		this.navigate();
		dots && this.generateDots();
		interval && setInterval(() => this.goNext(), interval * 1000);
		
	}
	
	/**
	 * Bind touch events for mobile.
	 */
	bindTouch() {
		this.context.addEventListener('touchstart', (event) => this.initialTouch = event.changedTouches[0].screenX);
		this.context.addEventListener('touchend', (event) => this.swipe(event));
	}
	
	/**
	 * If there are buttons no navigate with, bind event listeners.
	 */
	bindButtons() {
		const _nextButton = document.querySelector(this.nextButtonSelector) || false;
		const _prevButton = document.querySelector(this.prevButtonSelector) || false;
		
		_nextButton && _nextButton.addEventListener('click', () => this.goNext());
		_prevButton && _prevButton.addEventListener('click', () => this.goPrev());
	}
	
	/**
	 * Namespace all CSS classes to avoid conflicts with selectors.
	 */
	namespace() {
		
		// Namespace the container.
		!this.context.classList.contains('zwing-carousel') && this.context.classList.add('zwing-carousel');
		
		// Namespace all the children.
		Array.from(this.children).forEach((child) => {
			!child.classList.contains('zwing-carousel__item') && child.classList.add('zwing-carousel__item');
		});
		
		// Namespace dots if we have them.
		this.dots && document.querySelector(this.dotsContainerSelector).classList.add('zwing-carousel__dots');
	}
	
	/**
	 * Navigate through the carousel, adding and removing classes where necessary.
	 */
	navigate() {
		const dots = document.querySelectorAll('.zwing__dot');
		
		// Loop!
		if (this.carouselIndex < 0) { this.carouselIndex = this.children.length - 1; }
		if (this.carouselIndex === this.children.length) { this.carouselIndex = 0; }
		
		// Reset!
		Array.from(this.children).forEach((child, index) => {
			child.classList.remove('zwing__active', 'zwing__prev', 'zwing__next');
			dots && dots[index] && dots[index].classList.remove(this.activeDotClass);
		});
		
		// Set classes!
		const _el = this.children && this.children[this.carouselIndex];
		const _prev = _el && _el.previousElementSibling;
		const _next = _el && _el.nextElementSibling;
		
		_el && _el.classList.add('zwing__active');
		_prev && _prev.classList.add('zwing__prev');
		_next && _next.classList.add('zwing__next');
		
		// Set dots!
		if (this.dots) {
			dots && dots[this.carouselIndex] && dots[this.carouselIndex].classList.add(this.activeDotClass);
		}
		
		// Dynamic height, with Web Animations (if allowed)!
		if (!this.context.animate) {
			this.context.animate({
					height: [`${this.context.offsetHeight}px`, `${_el.offsetHeight + 16}px`]
				},
				{
					duration: 300,
					easing: 'ease',
					fill: 'both',
				});
		} else {
			this.context.style.height = `${_el.offsetHeight + 16}px`;
		}
	}
	
	/**
	 * Navigate to a specific image.
	 * @param index {Number} - the index of the image to go to in the `this.children` array.
	 */
	goToImage(index) {
		this.carouselIndex = index;
		this.navigate();
	}
	
	/**
	 * Go to the previous image.
	 */
	goPrev() {
		this.carouselIndex--;
		this.navigate();
	}
	
	/**
	 * Go to the next image.
	 */
	goNext() {
		this.carouselIndex++;
		this.navigate();
	}
	
	/**
	 * Handle a swipe.
	 * @param event {Object}
	 */
	swipe(event) {
		const finalTouch = event && event.changedTouches[0].screenX;
		
		// If the final touch's offsetX is AFTER the initialTouch's offsetX, go back (it was a right swipe).
		if (finalTouch > this.initialTouch) {
			this.goPrev();
			return;
		}
		
		this.goNext();
		return;
	}
	
	/**
	 * Generate the dots for mobile navigation.
	 */
	generateDots() {
		const elem = document.querySelector(this.dotsContainerSelector);
		
		// ? No element?
		if (!elem) {
			console.warn('Could not generate dots, please specify a dotsContainerSelector that exists.');
			return;
		}
		
		// If there's only 1 item, warn and don't add dots.
		if (this.children.length <= 1) {
			console.warn('A carousel usually needs more than 1 item. ;)');
			return;
		}
		
		// For each child,
		Array.from(this.children).forEach((child, index) => {
			let dot = document.createElement('div'); // Create a div.
			dot.classList.add('zwing__dot'); // Give it a dot class.
			(index === 0) && dot.classList.add('active'); // First one is active by default.
			dot.addEventListener('click', () => this.goToImage(index)); // Make the dot a link.
			elem.appendChild(dot); // Append it to the dots container.
		});
	}
	
}