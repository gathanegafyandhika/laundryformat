# 🐝 Bee Laundry - Sistem Transaksi CLI

Aplikasi command-line berbasis **TypeScript** dan **Node.js** untuk mencatat transaksi laundry, menghitung total biaya otomatis, dan membuat **link struk digital via WhatsApp**.

Proyek ini dibuat sebagai tugas UTS.

## ✨ Fitur

- Input data pelanggan (nama dan nomor WhatsApp) dengan validasi
- 4 pilihan layanan: Cuci Kiloan, Cuci + Setrika Kiloan, Cuci Satuan, dan Setrika Saja
- Perhitungan harga otomatis, termasuk **minimal 3 kg** untuk layanan kiloan
- Normalisasi nomor WhatsApp (`0812...` dan `+62812...` menjadi `62812...`)
- Validasi input: angka tidak valid, nilai negatif, dan pilihan di luar menu akan diminta ulang
- Penyimpanan transaksi ke database lokal (array in-memory)
- Struk transaksi di terminal beserta link `wa.me` dengan teks struk siap kirim

## 💰 Daftar Harga

| Layanan | Durasi 1 Hari | Durasi 2 Hari |
|---|---|---|
| Cuci Kiloan (min. 3 kg) | Rp5.000/kg | Rp4.000/kg |
| Cuci + Setrika Kiloan (min. 3 kg) | Rp8.000/kg | Rp6.000/kg |

| Layanan | Harga |
|---|---|
| Cuci Satuan - Baju / Kemeja | Rp12.000/pcs |
| Cuci Satuan - Almamater / Pakaian Tebal | Rp25.000/pcs |
| Setrika Saja | Rp4.000/kg |

## 🧰 Prasyarat

- [Node.js](https://nodejs.org/) (disarankan versi LTS terbaru)
- npm

## 🚀 Instalasi dan Menjalankan

```bash
# 1. Clone repository
git clone https://github.com/<username>/<nama-repo>.git
cd <nama-repo>

# 2. Install dependensi
npm install

# 3. Compile TypeScript ke JavaScript
npx tsc

# 4. Jalankan program
node tugas1.js
```

## 🖥️ Contoh Penggunaan

```text
==========================================
       SISTEM TRANSAKSI BEE LAUNDRY
==========================================

Masukkan Nama Pelanggan   : Budi
Masukkan No WhatsApp (628...): 081234567890

--- PILIHAN LAYANAN BEE LAUNDRY ---
1. Cuci Kiloan (Min. 3kg)
2. Cuci + Setrika Kiloan (Min. 3kg)
3. Cuci Satuan
4. Setrika Saja
Pilih Opsi Layanan (1-4): 1
Masukkan Berat (kg): 2
Pilih Durasi (1 untuk 1-Hari, 2 untuk 2-Hari): 1
 [!] Berat di bawah 3kg, dikenakan tarif minimal 3kg.

==========================================
             STRUK TRANSAKSI
==========================================
ID Transaksi   : BEE-123456
Nama Pemilik   : Budi
No. WhatsApp   : 6281234567890
Layanan        : Cuci Kiloan
Detail Pesanan : Berat: 2kg (Dihitung: 3kg), Durasi: 1 Hari @Rp5000/kg
Total Bayar    : Rp15.000
Simpan Database: BERHASIL (Total Record: 1)
------------------------------------------
KIRIM STRUK ONLINE KE WHATSAPP (URL):
https://wa.me/6281234567890?text=...
==========================================
```

## 📁 Struktur Proyek

```text
.
├── tugas1.ts          # Source code utama
├── tsconfig.json      # Konfigurasi TypeScript
├── package.json
└── package-lock.json
```

## 🛠️ Teknologi

- TypeScript (mode `strict`)
- Node.js dengan modul `readline`
- `@types/node`

## ⚠️ Catatan

- Data transaksi disimpan di array dalam memori, jadi **hilang saat program ditutup**.
- Status pembayaran saat ini selalu `LUNAS`.

## 📄 Lisensi

[ISC](https://opensource.org/licenses/ISC)
