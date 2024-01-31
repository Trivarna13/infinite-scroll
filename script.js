const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = 0;

const apiUrl = `https://dog.ceo/api/breeds/image/random/10`;

function imgLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
	}
}

function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArray.message.length;
	photosArray.message.forEach((photo) => {
		const img = document.createElement("img");
		setAttributes(img, {
			src: photo,
			alt: "Random dog image",
		});
		img.addEventListener("load", imgLoaded);
		imageContainer.appendChild(img);
	});
}

async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
	} catch (error) {
		console.error(error);
	}
}

window.addEventListener("scroll", () => {
	if (
		window.innerHeight + window.scrollY >=
			document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false;
		getPhotos();
	}
});

getPhotos();
