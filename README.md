This carousel was created to be simple, unopinionated, and easy to extend. It is written in vanilla ES2015, transpiles down with Babel, and supports SCSS.

# Demo

The `demo/` folder contains a working demo with sample HTML and a specific stylesheet that zwing-slider does not care about. The page can be restyled according to your wildest dreams, and the slider will continue to work as expected.

# To Build

```bash
yarn install
npm run build
```

The final files are placed in `demo` as `zwing-carousel.min.css` and `zwing-carousel.js`. The JS can further be uglified as required.

# Initialization

As can be seen from the demo HTML, simply call 

```javascript
new ZwingCarousel('yourElementSelector', { options });
```
 to initialze the carousel. The following options are available for further customization.

## Options

```javascript
{
	// Start at this item (0-n)
    startIndex: 0,
    
    // Do I want dot navigation?
    dots: false, 
    
     // In which of my page's elements should I add the dots?
    dotsContainerSelector: '.zwing-carousel__dots',
    
     // The active dot (if I want dots), should have this CSS class.
    activeDotClass: 'active',
    
     // The children of my carousel have this class.
    childSelector: '.zwing-carousel__item',
    
     // I have a next button. This is its selector.
    nextButtonSelector: '.zwing-carousel__button-next',
    
     // I have a previous button. This is its selector.
    prevButtonSelector: '.zwing-carousel__button-prev',
    
    // Do I want autoslide? How many seconds should each item show for?
    interval: false
}
```