/* Local browser-only prototype. Never use this as authentication or production storage. */
(function () {
  "use strict";
  const KEY = "libers-showroom-demo-cars-v1";
  const DEFAULTS = [
    {id:"avanza-2019",make:"Toyota",model:"Avanza",year:2019,price:145000000,transmission:"Manual",km:"78.000 KM",status:"Demo",image:"images/avanza-2019/depan.png"},
    {id:"avanza-2021",make:"Toyota",model:"Avanza",year:2021,price:175000000,transmission:"Automatic",km:"Data contoh",status:"Demo",image:""},
    {id:"xenia-2018",make:"Daihatsu",model:"Xenia",year:2018,price:132000000,transmission:"Manual",km:"Data contoh",status:"Demo",image:""},
    {id:"xenia-2020",make:"Daihatsu",model:"Xenia",year:2020,price:145000000,transmission:"Automatic",km:"Data contoh",status:"Demo",image:""},
    {id:"innova-2017",make:"Toyota",model:"Kijang Innova",year:2017,price:215000000,transmission:"Manual",km:"Data contoh",status:"Demo",image:""},
    {id:"innova-2020",make:"Toyota",model:"Kijang Innova",year:2020,price:265000000,transmission:"Automatic",km:"Data contoh",status:"Demo",image:""},
    {id:"pajero-2019",make:"Mitsubishi",model:"Pajero Sport",year:2019,price:410000000,transmission:"Automatic",km:"Data contoh",status:"Demo",image:""},
    {id:"pajero-2021",make:"Mitsubishi",model:"Pajero Sport",year:2021,price:465000000,transmission:"Automatic",km:"Data contoh",status:"Demo",image:""}
  ];
  const $ = id => document.getElementById(id);
  const form = $("carForm"), list = $("adminList");
  let cars = load();
  function load() { try { const value = JSON.parse(localStorage.getItem(KEY)); if (Array.isArray(value)) return value; } catch (_) {} return DEFAULTS.map(car => Object.assign({}, car)); }
  function save() { localStorage.setItem(KEY, JSON.stringify(cars)); render(); }
  function escapeHTML(value) { return String(value == null ? "" : value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
  function money(value) { return "Rp" + new Intl.NumberFormat("id-ID").format(Number(value) || 0); }
  function render() {
    $("adminCount").textContent = cars.length + " unit simulasi tersimpan di browser ini";
    list.innerHTML = cars.length ? cars.map(car => '<div class="admin-row"><div><strong>' + escapeHTML(car.make + " " + car.model + " " + car.year) + '</strong><small>' + money(car.price) + ' • ' + escapeHTML(car.status || "Demo") + '</small></div><div class="admin-row-actions"><button class="edit-btn" type="button" data-edit="' + escapeHTML(car.id) + '">Edit</button><button class="delete-btn" type="button" data-delete="' + escapeHTML(car.id) + '">Hapus</button></div></div>').join("") : '<p class="panel-intro">Belum ada unit. Tambahkan unit contoh lewat formulir.</p>';
  }
  function resetForm() { form.reset(); $("carId").value = ""; $("year").value = 2020; $("price").value = 150000000; $("km").value = "Data contoh"; $("formTitle").textContent = "Tambah unit demo"; $("saveButton").textContent = "Simpan unit demo"; $("cancelEdit").hidden = true; }
  form.addEventListener("submit", event => {
    event.preventDefault();
    const id = $("carId").value || (String($("make").value + "-" + $("model").value + "-" + $("year").value).toLowerCase().replace(/[^a-z0-9]+/g,"-") + "-" + Date.now().toString(36));
    const item = {id:id,make:$("make").value,model:$("model").value.trim(),year:Number($("year").value),price:Number($("price").value),transmission:$("transmission").value,km:$("km").value.trim() || "Data contoh",status:$("status").value,image:$("image").value.trim()};
    if (!item.model || !Number.isFinite(item.price) || item.price < 0) return;
    const index = cars.findIndex(car => car.id === id);
    if (index >= 0) cars[index] = item; else cars.unshift(item);
    save(); resetForm(); alert("Data demo tersimpan di browser ini. Buka katalog pada browser yang sama untuk memeriksa hasilnya.");
  });
  list.addEventListener("click", event => {
    const edit = event.target.closest("[data-edit]"), remove = event.target.closest("[data-delete]");
    if (edit) {
      const car = cars.find(item => item.id === edit.dataset.edit); if (!car) return;
      $("carId").value = car.id; $("make").value = car.make; $("model").value = car.model; $("year").value = car.year; $("price").value = car.price; $("transmission").value = car.transmission || "Data contoh"; $("status").value = car.status || "Demo"; $("km").value = car.km || ""; $("image").value = car.image || "";
      $("formTitle").textContent = "Edit unit demo"; $("saveButton").textContent = "Simpan perubahan"; $("cancelEdit").hidden = false; form.scrollIntoView({behavior:"smooth",block:"start"});
    }
    if (remove) {
      const car = cars.find(item => item.id === remove.dataset.delete); if (!car) return;
      if (confirm("Hapus unit demo " + car.make + " " + car.model + "?")) { cars = cars.filter(item => item.id !== car.id); save(); if ($("carId").value === car.id) resetForm(); }
    }
  });
  $("cancelEdit").addEventListener("click", resetForm);
  $("resetDemo").addEventListener("click", () => { if (confirm("Pulihkan seluruh data demo awal? Perubahan lokal akan diganti.")) { cars = DEFAULTS.map(car => Object.assign({}, car)); save(); resetForm(); } });
  render();
})();