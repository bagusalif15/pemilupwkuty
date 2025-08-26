# Aplikasi Pemilihan Umum PWK UTY

Aplikasi pemilihan umum untuk Ketua dan Wakil Ketua HMPWK UTY Tahun 2025. Aplikasi ini telah dikonversi dari PHP menjadi aplikasi statis berbasis JavaScript untuk dapat dihosting di GitHub Pages.

## Fitur Aplikasi

- Form pemilihan dengan validasi data
- Visualisasi hasil pemilihan dengan chart
- Penyimpanan data di localStorage browser
- Export hasil pemilihan ke format CSV
- Tampilan responsif untuk berbagai ukuran layar

## Cara Penggunaan

1. Buka halaman utama untuk melakukan pemilihan
2. Isi data diri (nama, NPM, dan angkatan)
3. Pilih salah satu pasangan calon
4. Klik tombol "Kirim Pilihan"
5. Lihat hasil pemilihan di halaman hasil

## Cara Hosting di GitHub Pages

1. Fork atau clone repository ini ke akun GitHub Anda
2. Aktifkan GitHub Pages dari repository settings:
   - Buka tab "Settings" pada repository
   - Scroll ke bagian "GitHub Pages"
   - Pada "Source", pilih branch "main" atau "master"
   - Klik "Save"
3. Tunggu beberapa saat hingga website Anda aktif
4. Akses website melalui URL: `https://[username].github.io/pemilupwkuty`

## Perbedaan dengan Versi PHP

Versi statis ini menggunakan localStorage browser untuk menyimpan data pemilih, berbeda dengan versi PHP yang menggunakan database SQLite. Hal ini berarti:

- Data pemilihan hanya tersimpan di browser pengguna
- Data tidak tersinkronisasi antar perangkat
- Data akan hilang jika cache browser dibersihkan

Untuk penggunaan yang memerlukan penyimpanan data terpusat, disarankan untuk menggunakan versi PHP dengan hosting yang mendukung PHP dan SQLite/MySQL.

## Keamanan

Perlu diperhatikan bahwa aplikasi ini adalah contoh sederhana dan tidak direkomendasikan untuk pemilihan resmi tanpa modifikasi lebih lanjut untuk meningkatkan keamanan dan validasi data.

## Lisensi

Aplikasi ini bersifat open source dan dapat digunakan secara bebas.