let imageContainer = document.querySelector(".image-container");
let loadingSpinner = document.querySelector(".loading-spinner");

let getPhotos = async () => {
  try {
    // Show loading spinner
    loadingSpinner.style.display = "block";

    let key = "FYeccTpej4SA0sFg11MDU91h8383d--XpbVYwwPPf_0";
    let url = `https://api.unsplash.com/photos/random?client_id=${key}&count=10`;
    let response = await fetch(url);
    let photos = await response.json();
    createDom(photos);
  } catch (err) {
    console.error("Error fetching photos:", err);
  }finally {
    // Hide loading spinner
    loadingSpinner.style.display = "none";
  }
};

let createDom = (photos) => {
  photos.forEach((item) => {
    let img = document.createElement("img");
    img.src = item.urls.regular;
    img.classList.add("image");
    img.alt = item.alt_description || "Unsplash Image";
    imageContainer.appendChild(img);
  });
};

// Debounce function to optimize scroll event
let debounce = (func, delay) => {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, delay);
  };
};

let checkScroll = () => {
  let scrolled = window.innerHeight + window.scrollY;
  let totalHeight = document.body.offsetHeight - 10;
  if (scrolled >= totalHeight) {
    console.log("Fetching more photos...");
    getPhotos();
  }
};

// Add debounced scroll event listener
window.addEventListener("scroll", debounce(checkScroll, 200));

// Initial load of photos
getPhotos();