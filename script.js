let timer;
let deleteFirstPhotoDelay;
async function start() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    createBreedList(data.message);
  } catch (error) {
    console.log(error);
  }
}

start();

function createBreedList(breedList) {
  document.getElementById("breed").innerHTML = `
    <select onChange="loadByBreed(this.value)">
    <option>Search for a dog breed</option>
    ${Object.keys(breedList)
      .map(function (breed) {
        return `<option>${breed}</option>`;
      })
      .join("")}
    </select>`;
}

async function loadByBreed(breed) {
  if (breed != "Search for a dog breed") {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
    createSlideShow(data.message);
  }
}

function createSlideShow(images) {
  let currentPosition = 0;
  clearInterval(timer);
  clearTimeout(deleteFirstPhotoDelay);

  if (images.length > 1) {
    document.getElementById("slideshow").innerHTML = `
    <div class="slide">
    <img src=${images[0]} alt=${breed}/></div>
    <div class="slide"><img src=${images[1]} alt=${breed}/></div>
    `;

    currentPosition += 2;
    if (images.length == 2) currentPosition = 0;
    timer = setInterval(nextSlide, 3000);
  } else {
    document.getElementById("slideshow").innerHTML = `
    <div class="slide">
    <img src=${images[0]} alt=${breed}/></div>
    <div class="slide"></div>
    `;
  }

  function nextSlide() {
    document
      .getElementById("slideshow")
      .insertAdjacentHTML(
        "beforeend",
        ` <div class="slide"><img src=${images[currentPosition]} alt=${breed}/></div>`
      );

    deleteFirstPhotoDelay = setTimeout(function () {
      document.querySelector(".slide").remove();
    }, 1000);
    if (currentPosition + 1 >= images.length) {
      currentPosition = 0;
    } else {
      currentPosition++;
    }
  }
}
