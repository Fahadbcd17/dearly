// Categories data for the main page
const categories = [
  {
    name: "Bags",
    description: "Premium quality bags for every occasion",
    thumbnail: "./assets/back-pack-1/back-pack-1(1).jpg",
    page: "bags.html"
  },
  {
    name: "Bottle",
    description: "Premium quality bottle",
    thumbnail: "./assets/bottle-2/bottle-2(1).jpg",
    page: "bottle.html"
  },
  // {
  //   name: "Accessories",
  //   description: "Complete your look with our accessories",
  //   thumbnail: "./assets/categories/accessories-thumbnail.jpg",
  //   page: "accessories.html"
  // }
];

// DOM elements
const categoriesGrid = document.getElementById("categoriesGrid");

// Render categories on main page
function renderCategories() {
  if (!categoriesGrid) return;
  
  categoriesGrid.innerHTML = categories
    .map(
      (category) => `
        <a href="${category.page}" class="category-card">
          <img src="${category.thumbnail}" alt="${category.name}" class="category-image">
          <div class="category-info">
            <h3 class="category-name">${category.name}</h3>
            <p class="category-description">${category.description}</p>
          </div>
        </a>
    `
    )
    .join("");
}

// Initialize main page
document.addEventListener("DOMContentLoaded", function() {
  if (categoriesGrid) {
    renderCategories();
  }
});