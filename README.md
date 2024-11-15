# Autentikasi dan Pengambilan Data Profil dengan Google API

Nama: Brian Cahya Purnama  
NIM: H1D022009  
Shift Lama: C  
Shift Baru: D

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
