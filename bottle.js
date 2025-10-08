// Bags product data - COMPLETELY SEPARATE FROM OTHER CATEGORIES
const bagsProducts = [
  {
    title: "Bottle 1",
    weight: "xx",
    approximate_price: "2400 TK",
    image: "./assets/bottle-1/bottle-1(1).jpg",
    additionalImages: generateAdditionalImages("bottle-1", "bottle-1", 24)
  },
  {
    title: "Bottle 1",
    weight: "xx",
    approximate_price: "3000 TK",
    image: "./assets/bottle-2/bottle-2(1).jpg",
    additionalImages: generateAdditionalImages("bottle-2", "bottle-2", 25)
  },
];

// Function to generate additional images using a for loop
function generateAdditionalImages(productCode, folderName, imageCount) {
  const images = [];
  for (let i = 1; i <= imageCount; i++) {
    images.push(`./assets/${folderName}/${productCode}(${i}).jpg`);
  }
  return images;
}

// DOM elements for bags page
const productGrid = document.getElementById("productGrid");
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalTitle = document.getElementById("modalTitle");
const imageCounter = document.getElementById("imageCounter");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const thumbnailContainer = document.getElementById("thumbnailContainer");

// Current image state
let currentProduct = null;
let currentImageIndex = 0;
let currentImages = [];

// Render product cards on bags page
function renderBagsProducts() {
  if (!productGrid) return;
  
  productGrid.innerHTML = bagsProducts
    .map(
      (product) => `
        <div class="product-card">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <button class="view-larger-btn" data-product='${JSON.stringify(product).replace(/'/g, "&#39;")}'>
                    <span class="view-larger-text">View Larger</span>
                </button>
                ${product.additionalImages && product.additionalImages.length > 0 ? 
                  `<button class="show-more-btn" data-product='${JSON.stringify(product).replace(/'/g, "&#39;")}'>
                    <span class="show-more-text">+${product.additionalImages.length} More</span>
                  </button>` : ''}
            </div>
            <div class="product-details">
                <h2 class="product-title">${product.title}</h2>
                <div class="product-info">
                    <p><span class="info-label">Weight:</span> ${product.weight}</p>
                    <p><span class="info-label">Approximate Price:</span> <span class="price-green">${product.approximate_price}</span></p>
                </div>
            </div>
        </div>
    `
    )
    .join("");

  // Add event listeners to all view buttons
  document.querySelectorAll(".view-larger-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const productData = JSON.parse(this.getAttribute("data-product"));
      openModalWithProduct(productData, 0);
    });
  });

  // Add event listeners to show more buttons
  document.querySelectorAll(".show-more-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const productData = JSON.parse(this.getAttribute("data-product"));
      openModalWithProduct(productData, 1); // Start from first additional image
    });
  });
}

// Open modal with product images
function openModalWithProduct(product, startIndex = 0) {
  currentProduct = product;
  currentImageIndex = startIndex;
  currentImages = [product.image, ...(product.additionalImages || [])];
  
  updateModalImage();
  imageModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Update modal image and controls
function updateModalImage() {
  modalImage.src = currentImages[currentImageIndex];
  modalTitle.textContent = currentProduct.title;
  imageCounter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;
  
  // Update button states
  prevBtn.disabled = currentImageIndex === 0;
  nextBtn.disabled = currentImageIndex === currentImages.length - 1;
  
  // Update thumbnails
  updateThumbnails();
}

// Update thumbnail navigation
function updateThumbnails() {
  thumbnailContainer.innerHTML = currentImages
    .map((image, index) => `
      <div class="thumbnail ${index === currentImageIndex ? 'active' : ''}" 
           data-index="${index}">
        <img src="${image}" alt="Thumbnail ${index + 1}">
      </div>
    `)
    .join('');
  
  // Add thumbnail click events
  document.querySelectorAll('.thumbnail').forEach(thumb => {
    thumb.addEventListener('click', function() {
      currentImageIndex = parseInt(this.getAttribute('data-index'));
      updateModalImage();
    });
  });
}

// Navigation functions
function nextImage() {
  if (currentImageIndex < currentImages.length - 1) {
    currentImageIndex++;
    updateModalImage();
  }
}

function prevImage() {
  if (currentImageIndex > 0) {
    currentImageIndex--;
    updateModalImage();
  }
}

function closeModal() {
  imageModal.classList.remove("active");
  document.body.style.overflow = "auto";
  currentProduct = null;
  currentImageIndex = 0;
  currentImages = [];
}

// Event listeners for bags page
if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeModal);
}
if (prevBtn) {
  prevBtn.addEventListener("click", prevImage);
}
if (nextBtn) {
  nextBtn.addEventListener("click", nextImage);
}

if (imageModal) {
  imageModal.addEventListener("click", function (e) {
    if (e.target === imageModal) {
      closeModal();
    }
  });
}

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (imageModal && imageModal.classList.contains("active")) {
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "Escape") closeModal();
  }
});

// Initialize bags page
document.addEventListener("DOMContentLoaded", function() {
  if (productGrid) {
    renderBagsProducts();
  }
});