class Carousel {
  constructor(container, holdDuration, transitionDuration) {
    this.container = container;
    this.holdDuration = holdDuration;
    this.transitionDuration = transitionDuration;
    this.imageWrapper = this.container.children[0];
    this.images = this.container.children[0].children;
    this.noOfImages = this.container.children[0].children.length;
    this.currentImg = 0;
    this.indicatorArr = [];
    this.distance = 0;

    // Executing all methods in init method
    this.init = () => {
      this.createNavigationButtons();
      this.configureCarousel();
      this.createIndicators();
      this.setActiveIndicator();
      this.addClickEvent();
      this.addIndicatorEvent();
      this.animate();
    };

    // Method to create image indicators
    this.createIndicators = () => {
      this.indicatorContainer = document.createElement("div");
      this.indicatorContainer.classList.add("indicator-wrapper");
      for (let i = 0; i < this.noOfImages; i++) {
        this.indicator = document.createElement("div");
        this.indicator.classList.add("indicator-dots");
        this.indicatorContainer.appendChild(this.indicator);

        this.indicatorArr.push(this.indicator);
      }
      this.container.appendChild(this.indicatorContainer);
    };

    // Method to create navigation button i.e. previous and next buttons
    this.createNavigationButtons = () => {
      this.previousBtn = document.createElement("div");
      this.previousBtn.innerHTML = "<";
      this.previousBtn.classList.add("nav-btn", "prev-btn");
      this.nextBtn = document.createElement("div");
      this.nextBtn.innerHTML = ">";
      this.nextBtn.classList.add("nav-btn", "next-btn");

      this.container.appendChild(this.previousBtn);
      this.container.appendChild(this.nextBtn);
    };

    // Method to set up initial carousel configurations
    this.configureCarousel = () => {
      this.imageWrapper.style.left = `-${
        this.currentImg * this.container.clientWidth
      }px`;

      for (let i = 0; i < this.noOfImages; i++) {
        this.container.children[0].children[
          i
        ].style.width = `${this.container.clientWidth}px`;
      }
    };

    // Method to verify the boundary and reassign position to the images
    this.checkBoundary = () => {
      if (this.currentImg === this.noOfImages) {
        this.currentImg = 0;
      }

      if (this.currentImg < 0) {
        this.currentImg = this.noOfImages - 1;
      }
    };

    // Method to add click events on the buttons
    this.addClickEvent = () => {
      this.nextBtn.addEventListener("click", () => {
        this.currentImg++;
        this.move();
      });

      this.previousBtn.addEventListener("click", () => {
        this.currentImg--;
        this.move();
      });
    };

    // Method to set the active indicator based on the position of the shown image
    this.setActiveIndicator = () => {
      for (let i = 0; i < this.indicatorArr.length; i++) {
        if (this.currentImg === i) {
          this.indicatorArr[i].classList.add("active-indicator");
        } else {
          this.indicatorArr[i].classList.remove("active-indicator");
        }
      }
    };

    // Method to add click event to the image indicators
    this.addIndicatorEvent = () => {
      for (let i = 0; i < this.indicatorArr.length; i++) {
        this.indicatorArr[i].addEventListener("click", () => {
          this.currentImg = i;
          this.move();
        });
      }
    };

    // Method to move the position of image wrapper based on the current image position
    this.move = (autoTransition) => {
      let transitionTimeout;
      this.checkBoundary();
      let transition = setInterval(() => {
        if (
          this.distance < this.currentImg * this.container.clientWidth &&
          this.currentImg !== 0
        ) {
          this.distance += 5;
          this.imageWrapper.style.left = `-${this.distance}px`;
        }

        if (
          this.distance > this.currentImg * this.container.clientWidth &&
          this.currentImg !== 0
        ) {
          this.distance -= 5;
          this.imageWrapper.style.left = `-${this.distance}px`;
        }

        if (this.distance !== 0 && this.currentImg === 0) {
          this.distance -= 5;
          this.imageWrapper.style.left = `-${this.distance}px`;
        }

        // if block that executes when the image reaches its final position after transition
        if (this.distance === this.currentImg * this.container.clientWidth) {
          // Clearing out the previous intervals and timeouts of setInterval and setTimeout function
          clearInterval(transition);
          clearInterval(autoTransition);
          clearTimeout(transitionTimeout);
          // Reassigning the setTimeout method after the image slide completes
          transitionTimeout = setTimeout(() => {
            this.animate();
          }, this.holdDuration);
        }
      }, this.transitionDuration / this.container.clientWidth);

      this.setActiveIndicator();
    };

    // Method to automatically animate the image carousel based on the hold duration of the instance
    this.animate = () => {
      let autoTransition = setInterval(() => {
        this.currentImg++;
        this.move(autoTransition);
      }, this.holdDuration);
    };

    this.init();
  }
}
