# Showroom Libers Motor — Mobile-first website

Website katalog mobil bekas untuk Showroom Libers Motor, dibuat sebagai contoh yang mengutamakan tampilan ponsel dan tetap responsif di desktop.

## Cara menjalankan
Buka `index.html` di browser, atau jalankan melalui GitHub Pages. Tidak memerlukan framework, build tool, atau database.

## Fitur
- Layout mobile-first dan responsif.
- Katalog delapan unit yang tercantum di website sebelumnya.
- Filter merek, tahun, kisaran harga, dan pencarian.
- Detail unit dalam dialog.
- Tombol WhatsApp dengan pesan otomatis sesuai unit.
- Kontak, alamat, peta, dan tombol WhatsApp yang mudah ditemukan.
- Placeholder foto untuk unit yang belum memiliki foto.

## Sumber data dan catatan
Data unit, harga, spesifikasi, deskripsi, nomor WhatsApp, alamat, dan peta diambil dari versi sebelumnya di repository ini. Nomor kontak yang dipakai adalah **0812-6458-294** (tautan WhatsApp: `628126458294`), sesuai kontak pada halaman utama sebelumnya. Halaman detail lama berisi nomor WhatsApp berbeda, jadi nomor itu tidak dipakai.

Untuk Daihatsu Xenia 2018 dan 2020, data kilometer, warna, bahan bakar, pajak, dan kondisi tidak tersedia secara konsisten di halaman katalog. Karena itu, detail tersebut ditandai sebagai “Konfirmasi showroom”, bukan ditebak. Foto unit yang belum tersedia menggunakan placeholder.

**Catatan:** katalog ini merupakan contoh front-end statis. Data belum terhubung ke database/admin panel, jadi perubahan stok dan harga harus dilakukan di `script.js`. Pastikan harga, status ketersediaan, dan seluruh spesifikasi unit diverifikasi sebelum website dipakai sebagai kanal penjualan aktif.
