/* Demo front-end only. localStorage is per browser/device and is not a secure database. */
(function () {
  "use strict";
  const STORAGE_KEY = "libers-showroom-demo-cars-v1";
  const defaults = [
    {id:"avanza-2019",make:"Toyota",model:"Avanza",year:2019,price:145000000,transmission:"Manual",km:"78.000 KM",status:"Demo",image:"images/avanza-2019/depan.png"},
    {id:"avanza-2021",make:"Toyota",model:"Avanza",year:2021,price:175000000,transmission:"Automatic",km:"Data contoh",status:"Demo",image:""},
    {id:"xenia-2018",make:"Daihatsu",model:"Xenia",year:2018,price:132000000,transmission:"Manual",km:"Data contoh",status:"Demo",image:""},
    {id:"xenia-2020",make:"Daihatsu",model:"Xenia",year:2020,price:145000000,transmission:"Automatic",km:"Data contoh",status:"Demo",image:""},
    {id:"innova-2017",make:"Toyota",model:"Kijang Innova",year:2017,price:215000000,transmission:"Manual",km:"Data contoh",status:"Demo",image:""},
    {id:"innova-2020",make:"Toyota",model:"Kijang Innova",year:2020,price:265000000,transmission:"Automatic",km:"Data contoh",status:"Demo",image:""},
    {id:"pajero-2019",make:"Mitsubishi",model:"Pajero Sport",year:2019,price:410000000,transmission:"Automatic",km:"Data contoh",status:"Demo",image:""},
    {id:"pajero-2021",make:"Mitsubishi",model:"Pajero Sport",year:2021,price:465000000,transmission:"Automatic",km:"Data contoh",status:"Demo",image:""}
  ];
  const escapeHTML = value => String(value == null ? "" : value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const money = value => "Rp" + new Intl.NumberFormat("id-ID").format(Number(value) || 0);
  function readCars() {
    try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); if (Array.isArray(saved)) return saved; } catch (_) {}
    return defaults.map(car => Object.assign({}, car));
  }
  let cars = readCars();
  const grid = document.getElementById("carGrid");
  if (!grid) return;
  const search = document.getElementById("searchInput");
  const brand = document.getElementById("brandFilter");
  const year = document.getElementById("yearFilter");
  const price = document.getElementById("priceFilter");
  const count = document.getElementById("resultCount");
  const empty = document.getElementById("emptyState");
  const dialog = document.getElementById("carDialog");
  const dialogContent = document.getElementById("dialogContent");
  const visual = car => car.image ? '<img class="car-photo" src="' + escapeHTML(car.image) + '" alt="Foto contoh ' + escapeHTML(car.make + " " + car.model) + '" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><div class="car-placeholder" hidden><span>🚘</span><small>GAMBAR DEMO</small></div>' : '<div class="car-placeholder"><span>🚘</span><small>GAMBAR DEMO</small></div>';
  function filteredCars() {
    const term = search.value.trim().toLocaleLowerCase("id");
    return cars.filter(car => {
      const matchesTerm = (car.make + " " + car.model + " " + car.year).toLocaleLowerCase("id").includes(term);
      const matchesBrand = brand.value === "all" || car.make === brand.value;
      const matchesYear = year.value === "all" || String(car.year) === year.value;
      const p = Number(car.price) || 0;
      const matchesPrice = price.value === "all" || (price.value === "low" ? p < 150000000 : price.value === "mid" ? p >= 150000000 && p <= 250000000 : p > 250000000);
      return matchesTerm && matchesBrand && matchesYear && matchesPrice;
    });
  }
  function render() {
    const result = filteredCars();
    count.textContent = result.length;
    empty.hidden = result.length > 0;
    grid.hidden = result.length === 0;
    grid.innerHTML = result.map(car => '<article class="car-card"><div class="car-image-wrap">' + visual(car) + '<span class="demo-stamp">UNIT DEMO</span><span class="car-year">' + escapeHTML(car.year) + '</span></div><div class="car-body"><span class="car-brand">' + escapeHTML(car.make) + '</span><h3>' + escapeHTML(car.model) + ' ' + escapeHTML(car.year) + '</h3><p class="price">' + money(car.price) + ' <small>simulasi</small></p><div class="specs"><span>' + escapeHTML(car.transmission || "Data contoh") + '</span><span>' + escapeHTML(car.km || "Data contoh") + '</span></div><div class="card-bottom"><span class="stock-demo">● ' + escapeHTML(car.status || "Demo") + '</span><button type="button" data-detail="' + escapeHTML(car.id) + '">Lihat detail ↗</button></div></div></article>').join("");
  }
  function reset() { search.value = ""; brand.value = "all"; year.value = "all"; price.value = "all"; render(); }
  [search,brand,year,price].forEach(el => el.addEventListener(el === search ? "input" : "change", render));
  document.getElementById("resetFilters").addEventListener("click", reset);
  document.getElementById("emptyReset").addEventListener("click", reset);
  grid.addEventListener("click", event => {
    const button = event.target.closest("[data-detail]");
    if (!button) return;
    const car = cars.find(item => item.id === button.dataset.detail);
    if (!car) return;
    dialogContent.innerHTML = '<div class="detail-modal">' + visual(car) + '<span class="demo-stamp modal-stamp">DATA DEMO</span><p class="eyebrow eyebrow-dark">' + escapeHTML(car.make) + ' • ' + escapeHTML(car.year) + '</p><h2 id="dialogTitle">' + escapeHTML(car.model) + ' ' + escapeHTML(car.year) + '</h2><p class="price">' + money(car.price) + ' <small>harga simulasi</small></p><div class="detail-specs"><div><small>Transmisi</small><strong>' + escapeHTML(car.transmission || "Data contoh") + '</strong></div><div><small>Kilometer</small><strong>' + escapeHTML(car.km || "Data contoh") + '</strong></div><div><small>Status</small><strong>' + escapeHTML(car.status || "Demo") + '</strong></div></div><p>Ini adalah contoh halaman detail kendaraan. Spesifikasi, harga, kondisi, dan ketersediaan harus diverifikasi sebelum digunakan untuk pelanggan.</p><div class="contact-placeholder"><span>i</span><div><strong>Kontak belum diaktifkan</strong><small>Nomor resmi akan ditambahkan setelah dikonfirmasi.</small></div></div></div>';
    dialog.showModal();
  });
  document.getElementById("dialogClose").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
  render();
})();