// Fetching the container by its ID
const container1 = document.querySelector(".carousel-container-1");
const container2 = document.querySelector(".carousel-container-2");
const container3 = document.querySelector(".carousel-container-3");
const container4 = document.querySelector(".carousel-container-4");

// Creating a new Carousel Object using the Carousel class
const carouselObj1 = new Carousel(container1, 3000, 2000);
const carouselObj2 = new Carousel(container2, 9000, 1000);
const carouselObj3 = new Carousel(container3, 6000, 800);
const carouselObj4 = new Carousel(container4, 3000, 1500);
