let imageContainer = document.querySelector(".image-container");
// let isFetching = false;

let getPhotos = async () => {
  try {

    let key = "FYeccTpej4SA0sFg11MDU91h8383d--XpbVYwwPPf_0";
    let url = `https://api.unsplash.com/photos/random?client_id=${key}&count=10`;
    let response = await fetch(url);
    let getPhotos = await response.json();
    createDom(getPhotos);
    console.log("getPhotos");
    
  } catch (err) {
    console.error(err);
  }
};

let createDom = (getPhotos) => {
  getPhotos.forEach((item) => {
     let img = document.createElement("img");
     img.src = item.urls.regular;
     img.classList.add("image");
     img.alt = "image";
     imageContainer.appendChild(img);
  });
};

window.addEventListener("scroll", () => {
     let scrolled = window.innerHeight + window.scrollY;
     let totalHeight = document.body.offsetHeight;
     if (scrolled >= totalHeight - 200) {
         console.log("Fetching more photos...");
         getPhotos();
     }
});

getPhotos();

