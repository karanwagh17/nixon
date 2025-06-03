// slider

const slider = document.getElementById("slider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pagination = document.getElementById("pagination");
const paginationButtons = pagination.querySelectorAll(".pagination-button");

let position = 0;
const productsToShow = 3; // Number of products to display at once
const totalProducts = 10; // Total number of products
const productWidth = slider.children[0].offsetWidth; // Get the width of each product
const maxPosition = -(productWidth * (totalProducts - productsToShow));

// Function to update the slider's position
function updateSlider() {
  slider.style.transform = `translateX(${position}px)`;
  updatePagination();
}

// Function to update the active pagination button
function updatePagination() {
  const activeIndex = Math.abs(position / productWidth);
  paginationButtons.forEach((button) => button.classList.remove("active"));
  paginationButtons[activeIndex].classList.add("active");
}

// Next Button click event
nextBtn.addEventListener("click", () => {
  if (position > -(productWidth * (totalProducts - productsToShow))) {
    position -= productWidth;
    updateSlider();
  }
});

// Previous Button click event
prevBtn.addEventListener("click", () => {
  if (position < 0) {
    position += productWidth;
    updateSlider();
  }
});

// Pagination button click event
paginationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const index = parseInt(button.getAttribute("data-index"));
    position = -(productWidth * index);
    updateSlider();
  });
});

// Initialize the first pagination button as active
updatePagination();

// change images

let productData = [];

function fetchData() {
  fetch("https://nixon-r44n.onrender.com/products")
    .then((res) => res.json())
    .then((data) => {
      showData(data);
    });
}
fetchData();

function showData(thData) {
  let show = thData.map((el) =>
    getDatat(
      el.image[0],
      el.image[1],
      el.image[2],
      el.image[3],
      el.title,
      el.price
    )
  );
  slider.innerHTML = show.join(" ");
}

function getDatat(image, image2, image3, image4, title, price) {
  let mainData = `     <div class="product-card">
    <a href="discription.html?image=${encodeURIComponent(
      image
    )}&title=${encodeURIComponent(title)}&price=${encodeURIComponent(price)}">
            <img src=${image}  id="main-img">
            </a>
           <div class="max row">
            <div class="min-img first-min-img col-3">
              <img src=${image2}  id="" id="first-min">  </div>
              <div class="min-img col-3">
                <img src=${image3}  id="" id="second-min">  </div>
                <div class="min-img col-3">
                  <img src=${image4} width="100%"  "third-min">  </div>
                  <div class="min-img col-3">
                    <img src="assests/product 1.webp" width="100%"  id="fourth-min">  </div>
             <h5 class="title">${title}</h5>
              <p class="price">${price} </p>
            </div> 
          </div>`;

  return mainData;
}
// click logic

// SEVENTH SLIDER

let currentSlideIndex = 0;
const allSlides = document.querySelectorAll(".carousel-slide");
const totalCarouselSlides = allSlides.length;

function navigateSlide(direction) {
  currentSlideIndex += direction;

  if (currentSlideIndex >= totalCarouselSlides) {
    currentSlideIndex = 0;
  }

  if (currentSlideIndex < 0) {
    currentSlideIndex = totalCarouselSlides - 1;
  }

  document.querySelector(".carousel-wrapper").style.transform = `translateX(-${
    currentSlideIndex * 100
  }%)`;
}

// Auto-slide every 5 seconds
setInterval(() => {
  navigateSlide(1);
}, 5000);
