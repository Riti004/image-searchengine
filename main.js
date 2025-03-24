const accessKey = "itpBkJfyfO3vgr8trWygvORY7AXYONNNYX5NDn0ib-E";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");
const loader = document.getElementById("loader");
const footer = document.querySelector("footer");

let keyword = "";
let page = 1;

// Function to Fetch Images
async function searchImage() {
    keyword = searchBox.value;
    
    if (keyword.trim() === "") {
        alert("Please enter a search term.");
        return;
    }

    // Show Loader
    loader.style.display = "block";
    showMoreBtn.style.display = "none";

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (page === 1) {
            searchResult.innerHTML = "";
        }

        const results = data.results;

        results.forEach((result) => {
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.classList.add("image-container");

            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description || "Image";

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });

        if (results.length > 0) {
            showMoreBtn.style.display = "block";
        } else {
            showMoreBtn.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching images:", error);
    } finally {
        // Hide Loader
        loader.style.display = "none";
    }
}

// Event Listeners
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImage();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImage();
});

// Show Footer Only on Scroll
window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        footer.style.opacity = "1";
        footer.style.transform = "translateY(0)";
    } else {
        footer.style.opacity = "0";
        footer.style.transform = "translateY(20px)";
    }
});
