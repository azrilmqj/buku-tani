# Buku Tani

Aplikasi web (PWA) pencatat kas, pupuk subsidi, harga jual, dan kasbon untuk kelompok tani di Lombok Timur.

**Demo:** [ISI: link GitHub Pages, misalnya https://azrilmqj.github.io/buku-tani/]

![Tangkapan layar Buku Tani](docs/screenshot.png)
<!-- ISI: ambil tangkapan layar dari HP, simpan di folder docs/ -->

## Latar belakang

Proyek ini lahir dari pertanyaan sederhana: aplikasi apa yang benar-benar berguna bagi orang di sekitar saya? Saya tinggal di Lombok Timur, jadi saya meriset kebutuhan di Desa Kotaraja (Kecamatan Sikur) dan sekitarnya. Pertanian (padi, jagung, pisang) dan usaha olahan rumahan adalah penggerak ekonomi di sana.

## Masalah yang ingin diselesaikan

Dari makalah pengabdian masyarakat dan pemberitaan, tiga masalah muncul berulang di Lombok Timur:

1. **Harga jual tidak stabil dan posisi tawar petani lemah.** Harga sering jatuh saat panen raya, dan tengkulak berpengaruh besar pada harga.
2. **Keterbatasan modal.** Petani sering bergantung pada pinjaman untuk biaya tanam.
3. **Pupuk subsidi sulit diurus.** Pupuk langka di awal musim tanam, dan penebusannya mengharuskan pencatatan per orang sehingga ketua kelompok tani kerepotan.

Daftar sumber ada di bagian Referensi.

## Fitur

- **Kas:** catat pengeluaran dan pemasukan, lihat untung atau rugi per bulan atau keseluruhan.
- **Pupuk:** catat jatah pupuk subsidi tiap anggota dan pantau penebusannya.
- **Harga:** catat harga dari berbagai pembeli, lihat harga tertinggi dan rata-rata per komoditas sebagai pegangan menawar.
- **Kasbon:** catat pinjaman modal dan cicilannya sampai lunas.
- **Cadangan data:** salin dan pulihkan data lewat teks.
- **Offline:** setelah dibuka sekali, aplikasi tetap jalan tanpa internet dan bisa dipasang di layar utama HP.

## Teknologi

| Bagian | Pilihan | Alasan |
|---|---|---|
| Tampilan dan logika | HTML, CSS, dan JavaScript biasa | Tahap awal: sederhana, ringan, tanpa proses build |
| Penyimpanan | `localStorage` | Tanpa server dan tanpa akun, data aman di HP pengguna |
| Offline dan instalasi | Service worker dan web manifest (PWA) | Sinyal di desa tidak selalu stabil |
| Hosting | GitHub Pages | Gratis dan mudah dibagikan lewat tautan |

## Struktur proyek

```
buku-tani/
├── index.html
├── css/style.css
├── js/
│   ├── storage.js   data, penyimpanan lokal, fungsi bantu
│   ├── dialogs.js   formulir dan aksi tambah, tebus, bayar, cadangan
│   ├── views.js     tampilan tiap tab
│   └── app.js       render utama dan navigasi
├── manifest.json
├── sw.js
└── icons/
```

## Menjalankan di komputer

Service worker butuh server lokal (tidak bisa dari `file://`):

```bash
python3 -m http.server 8000
```

Lalu buka `http://localhost:8000`.

## Status dan keterbatasan

- Ini **prototipe tahap awal**.
- Dasar masalah berasal dari sumber sekunder (makalah dan berita), **belum dari wawancara langsung** dengan petani Kotaraja. Fitur-fiturnya masih hipotesis yang perlu diuji ke pengguna nyata.
- Data tersimpan per perangkat, jadi belum ada data bersama untuk satu kelompok.
- Memakai `localStorage`: kalau data situs dihapus dari peramban, data ikut hilang. Gunakan fitur cadangan secara berkala.

## Rencana pengembangan

- [ ] Ubah (edit) data yang sudah dicatat
- [ ] Pencarian dan filter
- [ ] Laporan musim tanam yang bisa dibagikan lewat WhatsApp
- [ ] Data bersama dalam satu kelompok (akun kelompok dan sinkronisasi)
- [ ] Uji coba dengan pengguna nyata

## Lisensi

[MIT](LICENSE)

## Referensi

- Potensi pertanian dan olahan di Desa Kotaraja: https://journal.unram.ac.id/index.php/pepadu/article/view/2183
- Kendala petani di Lombok Timur (modal, harga, tengkulak): https://ejournal.45mataram.ac.id/index.php/economina/article/download/1822/1571/10781
- Petani tomat dan bawang merugi saat harga murah: https://www.jpnn.com/news/petani-ntb-curhat-soal-harga-sandiaga-uno-berikan-solusinya
- Pupuk subsidi langka di Tetebatu: https://jppipa.unram.ac.id/index.php/jpmpi/article/download/9290/5934/48444
- Kerepotan penebusan pupuk subsidi di Sembalun: https://ekonomi.republika.co.id/berita/skk31j423/suara-hati-petani-di-kaki-gunung-rinjani
- UMKM pisang sale di Tetebatu Selatan: https://jppipa.unram.ac.id/index.php/jpmpi/article/download/1544/1088/7458
