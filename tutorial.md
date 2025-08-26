# Tutorial Penggunaan Aplikasi Pemilihan di GitHub Pages

Dokumen ini berisi panduan lengkap untuk menggunakan aplikasi pemilihan umum PWK UTY yang telah dikonversi menjadi aplikasi statis untuk GitHub Pages.

## Daftar Isi

1. [Pengenalan](#pengenalan)
2. [Cara Menghosting di GitHub Pages](#cara-menghosting-di-github-pages)
3. [Cara Menggunakan Aplikasi](#cara-menggunakan-aplikasi)
4. [Penjelasan Teknis](#penjelasan-teknis)
5. [Keterbatasan dan Solusi](#keterbatasan-dan-solusi)

## Pengenalan

Aplikasi ini adalah versi statis dari aplikasi pemilihan umum PWK UTY yang sebelumnya dibuat dengan PHP dan SQLite. Versi statis ini telah dikonversi untuk dapat dihosting di GitHub Pages, yang tidak mendukung bahasa pemrograman server-side seperti PHP.

Perbedaan utama antara versi PHP dan versi statis:

- **Penyimpanan Data**: Versi PHP menggunakan database SQLite, sedangkan versi statis menggunakan localStorage browser
- **Pemrosesan Data**: Versi PHP memproses data di server, sedangkan versi statis memproses data di browser pengguna
- **Sinkronisasi**: Versi PHP menyimpan data secara terpusat, sedangkan versi statis menyimpan data di perangkat masing-masing pengguna

## Cara Menghosting di GitHub Pages

### Langkah 1: Membuat Repository GitHub

1. Buat akun GitHub jika belum memiliki
2. Login ke akun GitHub
3. Klik tombol "+" di pojok kanan atas, pilih "New repository"
4. Isi nama repository: `pemilupwkuty`
5. Pilih visibility: Public
6. Klik "Create repository"

### Langkah 2: Mengunggah File Aplikasi

#### Metode 1: Menggunakan GitHub Web Interface

1. Pada repository yang baru dibuat, klik "uploading an existing file"
2. Drag and drop semua file aplikasi (kecuali file PHP dan database)
3. Klik "Commit changes"

#### Metode 2: Menggunakan Git Command Line

1. Clone repository kosong yang baru dibuat
   ```
   git clone https://github.com/username/pemilupwkuty.git
   ```
2. Salin semua file aplikasi ke folder repository lokal
3. Tambahkan file ke staging area
   ```
   git add .
   ```
4. Commit perubahan
   ```
   git commit -m "Initial commit"
   ```
5. Push ke GitHub
   ```
   git push origin main
   ```

### Langkah 3: Mengaktifkan GitHub Pages

1. Buka repository di GitHub
2. Klik tab "Settings"
3. Scroll ke bagian "GitHub Pages"
4. Pada "Source", pilih branch "main" atau "master"
5. Klik "Save"
6. Tunggu beberapa saat hingga website aktif
7. Akses website melalui URL yang ditampilkan: `https://username.github.io/pemilupwkuty`

## Cara Menggunakan Aplikasi

### Halaman Utama (Form Pemilihan)

1. Buka URL aplikasi di browser
2. Isi data diri:
   - Nama Pemilih
   - Nomor Pokok Mahasiswa (NPM)
   - Angkatan
3. Pilih salah satu pasangan calon dengan mengklik kartu paslon
4. Klik tombol "Kirim Pilihan"
5. Jika berhasil, Anda akan diarahkan ke halaman hasil

### Halaman Hasil Pemilihan

1. Lihat hasil pemilihan dalam bentuk pie chart
2. Lihat statistik pemilihan di bagian bawah chart
3. Untuk mengunduh hasil dalam format CSV, klik tombol "Download CSV"
4. Untuk kembali ke halaman pemilihan, klik tombol "Kembali ke Form Pemilihan"

## Penjelasan Teknis

### Struktur Aplikasi

- **index.html**: Halaman utama dengan form pemilihan
- **hasil.html**: Halaman untuk menampilkan hasil pemilihan
- **js/data.js**: Menyimpan data statis dan fungsi untuk mengelola data
- **js/app.js**: Logika aplikasi untuk halaman utama
- **js/hasil.js**: Logika aplikasi untuk halaman hasil
- **images/**: Folder berisi gambar paslon

### Penyimpanan Data

Aplikasi ini menggunakan localStorage browser untuk menyimpan data pemilih. Data disimpan dalam format JSON dengan struktur sebagai berikut:

```json
[
  {
    "id": 1,
    "nama": "Nama Pemilih",
    "npm": "12345678",
    "angkatan": "2022",
    "pilihan": 1,
    "waktu": "2023-08-27T12:34:56.789Z"
  },
  ...
]
```

## Keterbatasan dan Solusi

### Keterbatasan

1. **Data Tidak Terpusat**: Data tersimpan di browser masing-masing pengguna, tidak terpusat di server
2. **Tidak Ada Sinkronisasi**: Data tidak tersinkronisasi antar perangkat
3. **Data Dapat Hilang**: Data akan hilang jika cache browser dibersihkan
4. **Keamanan Terbatas**: Data dapat dimanipulasi oleh pengguna yang memahami localStorage

### Solusi Alternatif

1. **Menggunakan Backend API**: Jika membutuhkan penyimpanan terpusat, dapat mengintegrasikan dengan backend API seperti Firebase, Supabase, atau layanan backend lainnya
2. **Menggunakan Hosting dengan PHP**: Jika ingin tetap menggunakan versi PHP, gunakan hosting yang mendukung PHP seperti InfinityFree, 000webhost, atau hosting berbayar
3. **Menggunakan Database Cloud**: Untuk penyimpanan data yang lebih aman, dapat menggunakan database cloud seperti Firebase Firestore atau MongoDB Atlas

---

Dengan mengikuti panduan ini, Anda dapat menghosting dan menggunakan aplikasi pemilihan umum PWK UTY di GitHub Pages dengan mudah. Jika memiliki pertanyaan atau mengalami masalah, silakan buat issue di repository GitHub.