const WHATSAPP_NUMBER = "628126458294";
const cars = [
  {id:"avanza-2019",brand:"avanza",make:"Toyota",model:"Avanza",year:2019,price:145000000,transmission:"Manual",km:"78.000 KM",color:"Putih",fuel:"Bensin",tax:"Hidup",condition:"Lecet tipis di bumper belakang",description:"Mobil keluarga irit, kondisi terawat, cocok buat harian dan usaha. Interior bersih, mesin normal, dan unit siap pakai.",image:"images/avanza-2019/depan.png",imageAlt:"Toyota Avanza 2019",priceBand:"low"},
  {id:"avanza-2021",brand:"avanza",make:"Toyota",model:"Avanza",year:2021,price:175000000,transmission:"Automatic",km:"42.000 KM",color:"Silver",fuel:"Bensin",tax:"Hidup",condition:"Lecet halus di pintu samping",description:"Unit muda, interior bersih, nyaman buat keluarga. Kondisi umum bagus dan siap pakai.",image:"",imageAlt:"Toyota Avanza 2021",priceBand:"mid"},
  {id:"xenia-2018",brand:"xenia",make:"Daihatsu",model:"Xenia",year:2018,price:132000000,transmission:"Manual",km:"Konfirmasi showroom",color:"Konfirmasi showroom",fuel:"Konfirmasi showroom",tax:"Konfirmasi showroom",condition:"Konfirmasi showroom",description:"Mobil keluarga ekonomis, perawatan mudah, cocok buat kebutuhan harian.",image:"",imageAlt:"Daihatsu Xenia 2018",priceBand:"low"},
  {id:"xenia-2020",brand:"xenia",make:"Daihatsu",model:"Xenia",year:2020,price:145000000,transmission:"Automatic",km:"Konfirmasi showroom",color:"Konfirmasi showroom",fuel:"Konfirmasi showroom",tax:"Konfirmasi showroom",condition:"Konfirmasi showroom",description:"Tampilan modern, kabin lega, cocok buat perjalanan jauh.",image:"",imageAlt:"Daihatsu Xenia 2020",priceBand:"low"},
  {id:"innova-2017",brand:"innova",make:"Toyota",model:"Kijang Innova",year:2017,price:215000000,transmission:"Manual",km:"89.000 KM",color:"Abu-abu",fuel:"Diesel",tax:"Hidup",condition:"Lecet ringan di spatbor depan",description:"Mobil besar, nyaman, cocok buat keluarga atau operasional. Kabin lega dan nyaman untuk perjalanan jauh.",image:"",imageAlt:"Kijang Innova 2017",priceBand:"mid"},
  {id:"innova-2020",brand:"innova",make:"Toyota",model:"Kijang Innova",year:2020,price:265000000,transmission:"Automatic",km:"36.000 KM",color:"Silver",fuel:"Diesel",tax:"Hidup",condition:"Baret sangat halus di pintu kiri",description:"Unit premium, cocok buat yang cari kenyamanan dan tampilan lebih modern. Kilometer rendah dan siap cek unit.",image:"",imageAlt:"Kijang Innova 2020",priceBand:"high"},
  {id:"pajero-2019",brand:"pajero",make:"Mitsubishi",model:"Pajero Sport",year:2019,price:410000000,transmission:"Automatic",km:"62.000 KM",color:"Hitam",fuel:"Diesel",tax:"Hidup",condition:"Lecet tipis di pintu belakang kanan",description:"SUV tangguh untuk perjalanan jauh maupun penggunaan harian. Unit terawat dengan pajak aktif.",image:"",imageAlt:"Mitsubishi Pajero Sport 2019",priceBand:"high"},
  {id:"pajero-2021",brand:"pajero",make:"Mitsubishi",model:"Pajero Sport",year:2021,price:465000000,transmission:"Automatic",km:"31.000 KM",color:"Putih",fuel:"Diesel",tax:"Hidup",condition:"Baret tipis di bumper belakang",description:"Unit lebih baru dengan fitur lengkap, cocok untuk pembeli yang mencari SUV premium.",image:"",imageAlt:"Mitsubishi Pajero Sport 2021",priceBand:"high"}
];
const grid = document.querySelector("#carGrid");
const searchInput = document.querySelector("#searchInput");
const brandFilter = document.querySelector("#brandFilter");
const priceFilter = document.querySelector("#priceFilter");
const yearFilter = document.querySelector("#yearFilter");
const resultCount = document.querySelector("#resultCount");
const emptyState = document.querySelector("#emptyState");
const dialog = document.querySelector("#carDialog");
const dialogContent = document.querySelector("#dialogContent");
const formatPrice = value => "Rp" + new Intl.NumberFormat("id-ID").format(value);
const slugBrand = brand => ({avanza:"Toyota",xenia:"Daihatsu",innova:"Toyota",pajero:"Mitsubishi"}[brand] || "");
const placeholder = (car, extraClass = "") => `<div class="car-placeholder ${extraClass}" role="img" aria-label="Placeholder foto ${car.make} ${car.model} ${car.year}"><span class="car-icon" aria-hidden="true">🚘</span><span>Foto unit segera tersedia</span></div>`;
function cardMarkup(car){
  const visual = car.image
    ? `<img class="car-image" src="${car.image}" alt="${car.imageAlt}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'car-placeholder car-placeholder-card',innerHTML:'<span class=&quot;car-icon&quot;>🚘</span><span>Foto unit segera tersedia</span>'}))">`
    : placeholder(car,"car-placeholder-card");
  const specs = [car.transmission,car.km !== "Konfirmasi showroom" ? car.km : ""].filter(Boolean).map(item=>`<span>${item}</span>`).join("");
  return `<article class="car-card">
    <div class="car-image-wrap">${visual}<span class="car-year">${car.year}</span><span class="car-status">Bisa nego</span></div>
    <div class="car-body"><span class="car-brand">${car.make}</span><h3 class="car-title">${car.model} ${car.year}</h3><div class="car-price">${formatPrice(car.price)} <small>/ nego</small></div>
    <div class="car-specs">${specs}</div><p class="car-desc">${car.description}</p>
    <div class="car-actions"><button class="detail-button" type="button" data-detail="${car.id}">Detail unit <span>↗</span></button><button class="wa-button" type="button" data-wa="${car.id}">Tanya unit</button></div></div>
  </article>`;
}
function getFilteredCars(){
  const term = searchInput.value.trim().toLocaleLowerCase("id");
  return cars.filter(car=>{
    const searchable = `${car.make} ${car.model} ${car.year} ${car.transmission}`.toLocaleLowerCase("id");
    return (!term || searchable.includes(term)) &&
      (brandFilter.value === "all" || car.brand === brandFilter.value) &&
      (priceFilter.value === "all" || (priceFilter.value === "low" ? car.price < 150000000 : priceFilter.value === "mid" ? car.price >= 150000000 && car.price <= 250000000 : car.price > 250000000)) &&
      (yearFilter.value === "all" || String(car.year) === yearFilter.value);
  });
}
function renderCars(){
  const filtered = getFilteredCars();
  grid.innerHTML = filtered.map(cardMarkup).join("");
  resultCount.textContent = filtered.length;
  emptyState.hidden = filtered.length !== 0;
  grid.hidden = filtered.length === 0;
}
function waLink(car){
  const message = `Halo Showroom Libers, saya tertarik dengan ${car.make} ${car.model} tahun ${car.year} dengan harga ${formatPrice(car.price)}. Apakah unit ini masih tersedia?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
function openDetails(id){
  const car = cars.find(item=>item.id===id);
  if(!car)return;
  const visual = car.image
    ? `<img src="${car.image}" alt="${car.imageAlt}" onerror="this.replaceWith(document.createTextNode('Foto unit belum tersedia'))">`
    : placeholder(car,"car-placeholder-card");
  const rows = [["Merek / model",`${car.make} ${car.model}`],["Tahun",car.year],["Transmisi",car.transmission],["Kilometer",car.km],["Warna",car.color],["Bahan bakar",car.fuel],["Pajak",car.tax],["Catatan kondisi",car.condition]];
  dialogContent.innerHTML = `<div class="dialog-content"><div class="dialog-image">${visual}</div><span class="car-brand">${car.make} • ${car.year}</span><h2 class="dialog-title" id="dialogTitle">${car.model} ${car.year}</h2><p class="dialog-price">${formatPrice(car.price)}</p><p class="dialog-meta">Harga masih bisa dinegosiasikan • Status dan detail terbaru dikonfirmasi showroom</p><div class="dialog-specs">${rows.map(([label,value])=>`<div class="dialog-spec"><small>${label}</small><strong>${value}</strong></div>`).join("")}</div><p class="dialog-description">${car.description}</p><div class="dialog-cta"><a class="button button-dark" href="${waLink(car)}" target="_blank" rel="noopener noreferrer">Tanya unit via WhatsApp ↗</a><button class="button button-outline" type="button" id="dialogBack">Kembali ke katalog</button></div></div>`;
  dialog.showModal();
  dialog.querySelector("#dialogBack").addEventListener("click",()=>dialog.close());
}
[searchInput,brandFilter,priceFilter,yearFilter].forEach(control=>control.addEventListener(control===searchInput?"input":"change",renderCars));
function resetFilters(){searchInput.value="";brandFilter.value="all";priceFilter.value="all";yearFilter.value="all";renderCars()}
document.querySelector("#resetFilters").addEventListener("click",resetFilters);
document.querySelector("#emptyReset").addEventListener("click",resetFilters);
document.querySelector("#dialogClose").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close()});
grid.addEventListener("click",event=>{
  const detailButton=event.target.closest("[data-detail]");
  const waButton=event.target.closest("[data-wa]");
  if(detailButton)openDetails(detailButton.dataset.detail);
  if(waButton){const car=cars.find(item=>item.id===waButton.dataset.wa);if(car)window.open(waLink(car),"_blank","noopener,noreferrer")}
});
renderCars();
