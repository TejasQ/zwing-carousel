This carousel was created to be simple, unopinionated, and easy to extend. It is written in vanilla ES2015, transpiles down with Babel, and supports SCSS.

# Demo

The `demo/` folder contains a working demo with sample HTML and a specific stylesheet that zwing-slider does not care about. The page can be restyled according to your wildest dreams, and the slider will continue to work as expected.

# To Build

`yarn install`

`npm run build`

The final files are placed in `demo` as `zwing-carousel.min.css` and `zwing-carousel.js`. The JS can further be uglified as required.

# Initialization

As can be seen from the demo HTML, simply call `new ZwingCarousel('yourElementSelector', { options })` to initialze the carousel. The following options are available for further customization.

## Options

```
{
    startIndex: 0, // Start at this item (0-n)
    dots: false, // Do I want dot navigation?
    dotsContainerSelector: '.zwing-carousel__dots', // In which of my page's elements should I add the dots?
    activeDotClass: 'active', // The active dot (if I want dots), should have this CSS class.
    childSelector: '.zwing-carousel__item', // The children of my carousel have this class.
    nextButtonSelector: '.zwing-carousel__button-next', // I have a next button. This is its selector.
    prevButtonSelector: '.zwing-carousel__button-prev', // I have a previous button. This is its selector.
    interval: false // Do I want autoslide? How many seconds should each item show for?
}
```