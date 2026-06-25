// ===== CATALOG FILTER =====
const brandFilter = document.getElementById("brandFilter");
const priceFilter = document.getElementById("priceFilter");
const yearFilter = document.getElementById("yearFilter");
const cards = document.querySelectorAll(".car-card");
const emptyState = document.getElementById("emptyState");

if (brandFilter && priceFilter && yearFilter) {
  function filterCars() {
    const brandValue = brandFilter.value;
    const priceValue = priceFilter.value;
    const yearValue = yearFilter.value;
    let visibleCount = 0;

    cards.forEach((card) => {
      const brandMatch = brandValue === "all" || card.dataset.brand === brandValue;
      const priceMatch = priceValue === "all" || card.dataset.price === priceValue;
      const yearMatch = yearValue === "all" || card.dataset.year === yearValue;
      const isVisible = brandMatch && priceMatch && yearMatch;

      // FIX: pakai "flex" bukan "block" karena .car-card adalah flex container
      card.style.display = isVisible ? "flex" : "none";
      if (isVisible) visibleCount++;
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? "block" : "none";
    }
  }

  brandFilter.addEventListener("change", filterCars);
  priceFilter.addEventListener("change", filterCars);
  yearFilter.addEventListener("change", filterCars);
}

// ===== GALLERY THUMBNAIL SWITCHER =====
const mainImage = document.getElementById("mainImage");
const thumbImages = document.querySelectorAll(".thumb");

if (mainImage && thumbImages.length) {
  thumbImages.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      mainImage.src = thumb.dataset.large;
      mainImage.alt = thumb.alt;
      thumbImages.forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
    });
  });
}
