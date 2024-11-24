# TUGAS 9 dan TUGAS 10 Praktikum Mobile

Nama: Brian Cahya Purnama  
NIM: H1D022009  
Shift Lama: C  
Shift Baru: D

# DAFTAR ISI
- [Tugas 9](#tugas-9)
- [Tugas 10](#tugas-10)

# Tugas 9

## Screenshot dan Penjelasan

### 1. Halaman Login & Alert Login Gagal

| Login Page | Alert Login Gagal |
|:----------:|:----------------:|
| <img src="https://github.com/user-attachments/assets/5b8f12d1-3b52-4404-b365-fc86adc0932c" width="300"/> | <img src="https://github.com/user-attachments/assets/9381af70-68dd-47c3-bba2-de6408367484" width="300"/> |

Halaman login munculin judul aplikasi dan tombol "Sign In with Google". Tombol ini make komponen `ion-button` sama ikon Google yang akan memicu proses autentikasi kalau diklik. Halaman merupakan landing page pertama ketika user ngakses aplikasi.

Kalau terjadi kesalahan saat proses login, aplikasi akan munculin alert yang memberitahu user bahwa login gagal dan meminta untuk mencoba kembali.

### 2. Popup Google Sign In

| Popup Pemilihan Akun | Proses Sign In |
|:-------------------:|:--------------:|
| <img src="https://github.com/user-attachments/assets/b7ec37e8-61a9-4a86-8b1c-884b59d52a25" width="300"/> | <img src="https://github.com/user-attachments/assets/bad7797c-6f12-485c-8aa5-80cddbbe8736" width="300"/> |

Ketika user menekan tombol Sign In, popup pemilihan akun Google muncul. Ini merupakan interface bawaan dari Google OAuth yang memungkinkan user milih akun yang akan digunakan untuk login. Proses ini menggunakan `@codetrix-studio/capacitor-google-auth` untuk menangani autentikasi di platform mobile.

### 3. Halaman Home & Profile

| Home Page | Profile Page |
|:---------:|:-----------:|
| <img src="https://github.com/user-attachments/assets/7098d21c-f844-40e2-8116-897885d4ddb2" width="300"/> | <img src="https://github.com/user-attachments/assets/73da8cb2-207b-49d8-b642-212790aaee97" width="300"/> |

#### Halaman Home
Setelah berhasil login, user diarahkan ke halaman Home. Halaman ini munculin header dengan judul "Home" dan tab menu di bagian bawah untuk navigasi. Router guard mastiin halaman ini cuma bisa diakses oleh user yang sudah terautentikasi.

#### Halaman Profile
Halaman profile nampilin informasi user yang didapat dari akun Google, termasuk:
- Foto profil (menggunakan komponen `ion-avatar`)
- Nama lengkap (diambil dari `displayName`)
- Email (diambil dari data akun Google)
Ada juga tombol logout di pojok kanan atas untuk mengakhiri sesi.

## Alur Autentikasi dan Pengambilan Data Profil

### 1. Inisialisasi Firebase dan Google Auth
- Aplikasi menginisialisasi Firebase dengan konfigurasi dari `firebase.ts`
- Google Auth diinisialisasi dengan client ID yang sudah terdaftar
- Pinia store (`auth.ts`) disiapkan untuk manajemen state autentikasi

### 2. Proses Login
- User menekan tombol "Sign In with Google"
- Method `loginWithGoogle()` di auth store dipanggil
- Capacitor Google Auth nampilin popup pemilihan akun
- Setelah user milih akun, Google ngembaliin token
- Token dipakai untuk membuat credential Firebase
- User data disimpen di state Pinia

### 3. Pengambilan Data Profil
- Setelah autentikasi berhasil, Firebase memberikan objek User
- Data profil (nama, email, foto) diambil dari objek User tersebut
- Data disimpen di Pinia store dan bisa diakses di seluruh aplikasi
- Komponen Profile mengakses data ini lewat computed property

### 4. Proteksi Route
- Router guard (`beforeEach`) meriksa status autentikasi
- Halaman yang perlu autentikasi (home, profile) dilindungi
- User yang belum login akan diarahin ke halaman login
- User yang sudah login tidak bisa ngakses halaman login lagi

### 5. Logout
- Saat user menekan tombol logout, `logout()` method dipanggil
- Firebase `signOut()` dan Google `signOut()` dieksekusi
- State user di Pinia dibersihkan
- User diarahkan kembali ke halaman login

# Tugas 10

## Screenshot dan Penjelasan

### 1. Menambah Todo
| Tampilan Awal | Form Add Todo | Hasil Penambahan |
|:-------------:|:-------------:|:----------------:|
| <img src="https://github.com/user-attachments/assets/3f3a616d-b60e-4746-b675-2fc8b475cbf4" width="300"/> | <img src="https://github.com/user-attachments/assets/49e08cb7-766b-4f1e-9395-c5496d585165" width="300"/> | <img src="https://github.com/user-attachments/assets/cb27617d-c11f-4c6f-93de-24f34ee81e58" width="300"/> |

Fitur menambah todo memungkinkan pengguna untuk membuat task baru. Proses dimulai dari tampilan awal yang menampilkan daftar todo yang ada. Ketika tombol "+" ditekan, form add todo akan muncul dimana pengguna dapat memasukkan judul task baru. Setelah mengisi dan menekan tombol submit, todo baru akan ditambahkan ke dalam daftar dan langsung ditampilkan di halaman utama.

### 2. Mengedit Todo
| Tampilan Todo | Form Edit | Hasil Edit |
|:-------------:|:---------:|:----------:|
| <img src="https://github.com/user-attachments/assets/73c16682-b999-4c74-be88-c85d3b83bb3e" width="300"/> | <img src="https://github.com/user-attachments/assets/8a280642-b475-4a0c-b39f-e2429b851a4d" width="300"/> | <img src="https://github.com/user-attachments/assets/b5f8adac-6e70-4108-a419-e49005bfb511" width="300"/> |

Untuk mengedit todo yang sudah ada, pengguna dapat menggeser ke kiri task todo yang telah dibuat sebelumnya lalu tekan tombol edit berwarna biru yang ikon pensil pada todo yang ingin diubah. Form edit akan muncul dengan data todo yang sudah ada, memungkinkan pengguna untuk mengubah judul task. Setelah perubahan disimpan, todo akan diperbarui dengan judul dan desc yang baru.

### 3. Menandai Todo Selesai
| Tampilan Awal | Hasil Setelah Ditandai |
|:-------------:|:----------------------:|
| <img src="https://github.com/user-attachments/assets/6ff14c13-67c6-4591-8b35-38b4d954c80c" width="300"/> | <img src="https://github.com/user-attachments/assets/e09d40a2-e199-4314-90da-820a9904156a" width="300"/> |

Pengguna dapat menandai todo sebagai selesai dengan menggeser ke kiri lagi task todo yang telah dibuat sebelumnya lalu tekan tombol check berwarna hijau. Ketika ditandai selesai, tampilan todo akan berubah di posisi "completed" untuk menandakan bahwa task tersebut telah diselesaikan. Status todo akan disimpan sehingga tetap terlihat sebagai selesai meskipun aplikasi diakses lagi.

### 4. Mengatur Todo Menjadi Aktif
| Todo Selesai | Hasil Pengaktifan |
|:------------:|:----------------:|
| <img src="https://github.com/user-attachments/assets/26107c50-6e1a-438d-8f2d-16e965eeb996" width="300"/> | <img src="https://github.com/user-attachments/assets/03e32aa1-7783-4753-b057-7c6bf594aee5" width="300"/> |

Todo yang sudah ditandai selesai dapat diaktifkan kembali dengan menggeser ke kiri task todo yang bagian completed lalu tekan tombol "x" berwarna kuning. Hal ini akan mengembalikan tampilan todo ke status aktif yang berada di atas dan menandakan bahwa task tersebut perlu dikerjakan lagi. Fitur ini fungisnya buat pengguna yang ngga sengaja menandai todo sebagai selesai.

### 5. Menghapus Todo
| Sebelum Dihapus | Setelah Dihapus |
|:---------------:|:---------------:|
| <img src="https://github.com/user-attachments/assets/ad841bcf-dd89-4811-a4e1-9a2dd39288dc" width="300"/> | <img src="https://github.com/user-attachments/assets/ee12cbf2-a057-4de9-a81a-176a2572ec29" width="300"/> |

Untuk menghapus todo, pengguna dapat menggeser ke kanan task todo yang ingin dihapus hingga muncul seperti tampilan tombol hapus (ikon tempat sampah). Setelah konfirmasi, todo akan dihapus secara permanen dari list. Operasi ini ngga ada alert konfirmasinya sehingga tidak dapat dibatalkan, makanya pengguna harus berhati-hati saat menghapus todo. Setelah dihapus, todo tidak akan muncul lagi dalam daftar dan tidak dapat dikembalikan.

## Build APK Ionic dan Konfigurasi Firebase untuk Android

Berikut adalah panduan untuk melakukan build APK dari aplikasi Ionic:

### 1. Persiapan Environment
Pastikan semua dependensi yang dibutuhkan sudah terinstal dengan benar di sistem Anda.
```bash
# Instal Ionic CLI secara global
npm install -g @ionic/cli

# Instal semua dependensi proyek
npm install
```
### 2. Menambahkan Platform Android
Tambahkan platform Android ke dalam proyek Ionic. Langkah ini hanya perlu dilakukan sekali saat pertama kali setup proyek.
```bash
ionic cap add android
```

### 3. Build Proyek Ionic
Lakukan build proyek Ionic untuk menghasilkan file-file yang dibutuhkan untuk aplikasi Android.
```bash
ionic build
```

### 4. Sinkronisasi dengan Capacitor
Setelah build selesai, lakukan sinkronisasi untuk memastikan semua perubahan terbaru masuk ke dalam proyek Android.
```bash
ionic cap sync android
```

### 5. Membuka Proyek di Android Studio
Buka proyek Android yang sudah di-generate untuk melakukan build APK.
```bash
ionic cap open android
```

### 6. Generate Signed APK
Setelah proyek terbuka di Android Studio, ikuti langkah-langkah berikut:
- Buka menu "Build" di toolbar Android Studio
- Pilih "Generate Signed Bundle / APK"
- Pada dialog yang muncul, pilih "APK"

<img src="https://github.com/user-attachments/assets/6ab17464-5dc1-4558-9503-2ee560eb6a1c" width="500">

- Setelah berhasil terbuat maka akan muncul BUILD SUCCESSFUL

<img src="https://github.com/user-attachments/assets/3d2f3c86-c08c-41ff-bf56-a127f885ea7b" width="500">

- Setelah proses build selesai, file APK dapat ditemukan di `android/app/build/outputs/apk/release/app-release.apk`

### 7. Config FIREBASE
- Buka CMD cari keystore dengan menuju ke direktori proyek Anda lalu ke direktori android dan ketikan:
```bash
gradlew signingReport
```

<img src="https://github.com/user-attachments/assets/544cb6dc-dc7d-401b-b837-c59a70d2211d" width="500">

- Buka Firebase Console, lalu buka project vue-firebasenya dan pergi ke project settings

<img src="https://github.com/user-attachments/assets/10d8046b-bc9b-44fb-be7e-81aea95cb0e0" width="500">

- Scroll ke bawah sampai menemukan "Your App" >> Klik "Add app" >> Pilih yang Android

- Ikuti langkah-langkahnya dan sesuaikan Package Name dengan appId yang ada di file `capacitor.config.ts`

- Masukan SHA-1 dan SHA-256 yang sudah didapatkan sebelumnya melalui `gradlew signingReport`

<img src="https://github.com/user-attachments/assets/7d8833e1-78b5-4650-8469-ca14108fc590" width="500">

- Aplikasi sudah terbuild dan siap dijalankan sesuai fungsinya 


