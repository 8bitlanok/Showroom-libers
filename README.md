# Showroom Libers — Demo Portofolio

Website katalog mobil bekas untuk demonstrasi portofolio. Dipublikasikan melalui GitHub Pages dan dibuat dengan HTML, CSS, dan JavaScript biasa.

## Halaman
- `index.html`: katalog publik demo, pencarian, filter, dan detail kendaraan.
- `admin-demo.html`: simulasi dashboard untuk menambah, mengedit, dan menghapus data demo.
- `script.js`: katalog demo; membaca data lokal browser jika tersedia.
- `admin-demo.js`: alur pengelolaan data demo lokal.
- `style.css`: tampilan responsif untuk HP dan desktop.

## Penting: batasan prototipe
- Seluruh harga, status stok, spesifikasi, dan data kendaraan adalah data simulasi dan harus diverifikasi sebelum situs digunakan secara resmi.
- Foto kendaraan yang tampil diberi penanda demo; jangan anggap sebagai bukti unit tersedia.
- Nomor WhatsApp dan kontak eksternal sengaja tidak diaktifkan sampai nomor resmi dikonfirmasi.
- Dashboard menggunakan `localStorage` browser. Data hanya tersedia di browser/perangkat yang sama, bukan tersinkron ke pengunjung lain.
- Dashboard ini tidak memiliki autentikasi dan bukan dashboard produksi. Jangan masukkan data pelanggan atau informasi rahasia.
- GitHub Pages hanya menyajikan file statis. Untuk admin sungguhan dibutuhkan backend/database, autentikasi, aturan akses, dan penyimpanan foto yang aman.

## Cara mencoba
1. Buka situs GitHub Pages.
2. Pilih **Buka dashboard demo**.
3. Tambah/edit/hapus unit contoh.
4. Kembali ke katalog pada browser dan perangkat yang sama untuk melihat perubahan.
5. Gunakan tombol pulihkan data demo awal untuk mengembalikan katalog contoh.

## Checklist sebelum peluncuran resmi
- [ ] Verifikasi nama usaha, logo, alamat, jam operasional, dan kontak resmi.
- [ ] Verifikasi setiap kendaraan, harga, kilometer, spesifikasi, kondisi, dan status stok.
- [ ] Ganti seluruh foto placeholder dengan foto unit yang benar dan berizin.
- [ ] Pastikan tombol kontak mengarah ke nomor resmi.
- [ ] Implementasikan backend, autentikasi admin, kebijakan akses, serta unggah gambar yang aman.
- [ ] Uji aksesibilitas, HP/desktop, filter, formulir, dan keamanan.
- [ ] Pindahkan ke hosting yang sesuai sebelum penggunaan bisnis resmi.

## Deploy
GitHub Pages dikonfigurasi dari branch `main`, root repository. Perubahan pada branch tersebut akan memicu publikasi GitHub Pages.
