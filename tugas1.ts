import readline = require('readline');

// Interfaces Tipe Data
interface Transaksi {
  idTransaksi: string;
  namaPelanggan: string;
  nomorWA: string;
  namaLayanan: string;
  detailDetail: string;
  totalBayar: number;
  isLunas: boolean;
}

// Database Lokal (Simulasi Array)
const databaseLokal: Transaksi[] = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function helperQuestion(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

// ---------- Helper validasi input ----------

async function inputTeks(query: string): Promise<string> {
  while (true) {
    const jawaban = (await helperQuestion(query)).trim();
    if (jawaban !== "") return jawaban;
    console.log(" [!] Input tidak boleh kosong.");
  }
}

async function inputAngka(query: string, min: number, bulat = false): Promise<number> {
  while (true) {
    const nilai = Number(await helperQuestion(query));
    if (Number.isNaN(nilai) || nilai < min || (bulat && !Number.isInteger(nilai))) {
      console.log(` [!] Masukkan ${bulat ? "bilangan bulat" : "angka"} minimal ${min}.`);
      continue;
    }
    return nilai;
  }
}

async function inputDurasi(): Promise<number> {
  while (true) {
    const durasi = Number(await helperQuestion("Pilih Durasi (1 untuk 1-Hari, 2 untuk 2-Hari): "));
    if (durasi === 1 || durasi === 2) return durasi;
    console.log(" [!] Durasi hanya boleh 1 atau 2.");
  }
}

// Ubah 08xxx / +628xxx menjadi 628xxx dan validasi panjangnya
async function inputNomorWA(): Promise<string> {
  while (true) {
    let nomor = (await helperQuestion("Masukkan No WhatsApp (628...): ")).replace(/\D/g, "");
    if (nomor.startsWith("0")) nomor = "62" + nomor.slice(1);
    if (/^62\d{8,13}$/.test(nomor)) return nomor;
    console.log(" [!] Nomor tidak valid. Contoh: 628123456789");
  }
}

// ---------- Program utama ----------

async function mainBeeLaundry(): Promise<void> {
  console.log("==========================================");
  console.log("       SISTEM TRANSAKSI BEE LAUNDRY       ");
  console.log("==========================================\n");

  // Input Data Pelanggan
  const namaPelanggan: string = await inputTeks("Masukkan Nama Pelanggan   : ");
  const nomorWA: string = await inputNomorWA();

  console.log("\n--- PILIHAN LAYANAN BEE LAUNDRY ---");
  console.log("1. Cuci Kiloan (Min. 3kg)");
  console.log("2. Cuci + Setrika Kiloan (Min. 3kg)");
  console.log("3. Cuci Satuan");
  console.log("4. Setrika Saja");

  const pilihanMenu: number = parseInt(await helperQuestion("Pilih Opsi Layanan (1-4): "), 10);

  let namaLayanan: string = "";
  let detailDetail: string = "";
  let totalBayar: number = 0;

  // SWITCH CASE SELEKSI KONDISI
  switch (pilihanMenu) {
    case 1:
    case 2: {
      // Kiloan: Cuci (5000/4000) dan Cuci + Setrika (8000/6000)
      const isSetrika: boolean = pilihanMenu === 2;
      namaLayanan = isSetrika ? "Cuci + Setrika Kiloan" : "Cuci Kiloan";

      const inputBerat: number = await inputAngka("Masukkan Berat (kg): ", 0.1);
      const durasi: number = await inputDurasi();

      // Operator perbandingan & logika
      let tarifPerKg: number;
      if (durasi === 1) {
        tarifPerKg = isSetrika ? 8000 : 5000;
      } else {
        tarifPerKg = isSetrika ? 6000 : 4000;
      }

      // Kondisi minimal 3kg
      let beratEfektif: number = inputBerat;
      if (inputBerat < 3) {
        beratEfektif = 3;
        console.log(" [!] Berat di bawah 3kg, dikenakan tarif minimal 3kg.");
      }

      totalBayar = beratEfektif * tarifPerKg; // Operator Aritmatika (*)
      detailDetail = `Berat: ${inputBerat}kg (Dihitung: ${beratEfektif}kg), Durasi: ${durasi} Hari @Rp${tarifPerKg}/kg`;
      break;
    }

    case 3: {
      namaLayanan = "Cuci Satuan";
      console.log("\n  Kategori Pakaian Satuan:");
      console.log("  1. Baju / Kemeja (Rp12.000/pcs)");
      console.log("  2. Almamater / Pakaian Tebal (Rp25.000/pcs)");

      let hargaSatuan: number = 0;
      let namaKategori: string = "";

      while (hargaSatuan === 0) {
        const tipeSatuan: number = parseInt(await helperQuestion("  Pilih Kategori (1/2): "), 10);
        if (tipeSatuan === 1) {
          hargaSatuan = 12000;
          namaKategori = "Baju/Kemeja";
        } else if (tipeSatuan === 2) {
          hargaSatuan = 25000;
          namaKategori = "Almamater/Pakaian Tebal";
        } else {
          console.log(" [!] Pilihan tidak valid, masukkan 1 atau 2.");
        }
      }

      const jumlahPcs: number = await inputAngka("  Masukkan Jumlah Pcs: ", 1, true);

      totalBayar = jumlahPcs * hargaSatuan;
      detailDetail = `Kategori: ${namaKategori}, Jumlah: ${jumlahPcs} pcs @Rp${hargaSatuan}`;
      break;
    }

    case 4: {
      namaLayanan = "Setrika Saja";
      const inputBerat: number = await inputAngka("Masukkan Berat (kg): ", 0.1);
      const tarifPerKg: number = 4000;

      totalBayar = inputBerat * tarifPerKg;
      detailDetail = `Berat: ${inputBerat}kg @Rp${tarifPerKg}/kg`;
      break;
    }

    default: {
      console.log("Opsi pilihan tidak valid!");
      return;
    }
  }

  // Tipe data boolean
  const isLunas: boolean = true;

  // Simpan ke Database Lokal (Array)
  const idTransaksiBaru: string = `BEE-${Date.now().toString().slice(-6)}`;
  const dataTransaksi: Transaksi = {
    idTransaksi: idTransaksiBaru,
    namaPelanggan,
    nomorWA,
    namaLayanan,
    detailDetail,
    totalBayar,
    isLunas
  };

  databaseLokal.push(dataTransaksi);

  const totalRupiah: string = dataTransaksi.totalBayar.toLocaleString("id-ID");

  // Buat Link Struk WhatsApp Online
  const teksPesan: string = `*STRUK DIGITAL BEE LAUNDRY*\n` +
    `ID: ${dataTransaksi.idTransaksi}\n` +
    `Nama: ${dataTransaksi.namaPelanggan}\n` +
    `Layanan: ${dataTransaksi.namaLayanan}\n` +
    `Detail: ${dataTransaksi.detailDetail}\n` +
    `Total Bayar: Rp${totalRupiah}\n` +
    `Status: ${dataTransaksi.isLunas ? 'LUNAS' : 'BELUM LUNAS'}\n\n` +
    `Terima kasih telah mempercayakan pakaian Anda di Bee Laundry!`;

  const linkWhatsApp: string = `https://wa.me/${nomorWA}?text=${encodeURIComponent(teksPesan)}`;

  // Tampilan Output Struk CLI
  console.log("\n==========================================");
  console.log("             STRUK TRANSAKSI              ");
  console.log("==========================================");
  console.log(`ID Transaksi   : ${dataTransaksi.idTransaksi}`);
  console.log(`Nama Pemilik   : ${dataTransaksi.namaPelanggan}`);
  console.log(`No. WhatsApp   : ${dataTransaksi.nomorWA}`);
  console.log(`Layanan        : ${dataTransaksi.namaLayanan}`);
  console.log(`Detail Pesanan : ${dataTransaksi.detailDetail}`);
  console.log(`Total Bayar    : Rp${totalRupiah}`);
  console.log(`Simpan Database: BERHASIL (Total Record: ${databaseLokal.length})`);
  console.log("------------------------------------------");
  console.log("KIRIM STRUK ONLINE KE WHATSAPP (URL):");
  console.log(linkWhatsApp);
  console.log("==========================================\n");
}

// Jalankan program
mainBeeLaundry()
  .catch((err) => console.error("Terjadi kesalahan:", err))
  .finally(() => rl.close());