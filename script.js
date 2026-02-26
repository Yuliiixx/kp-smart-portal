// =============================
// COUNTDOWN PERIODE KP
// =============================

const deadline = new Date("March 31, 2026 23:59:59").getTime();
const countdown = document.getElementById("countdown");
const warning = document.getElementById("warning");

const interval = setInterval(() => {

    const now = new Date().getTime();
    const distance = deadline - now;

    if (distance <= 0) {
        clearInterval(interval);
        countdown.innerHTML = "⛔ Periode telah ditutup";
        warning.innerHTML = "";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    countdown.innerHTML = `⏳ Sisa Waktu: ${days} Hari ${hours} Jam`;

    if (days <= 7) {
        warning.innerHTML = "⚠️ Deadline Hampir Tiba!";
    }

}, 1000);


// =============================
// SMART CHECKLIST
// =============================

document.querySelectorAll(".check-box input").forEach(box => {
    box.addEventListener("change", () => {

        const allChecked = [...document.querySelectorAll(".check-box input")]
            .every(cb => cb.checked);

        const message = document.getElementById("checkMessage");

        if (allChecked) {
            message.innerHTML = "✅ Berkas Lengkap dan Siap Diajukan";
            message.style.color = "#00e676";
        } else {
            message.innerHTML = "";
        }
    });
});


// =============================
// FAQ TOGGLE
// =============================

document.querySelectorAll(".faq-item").forEach(item => {
    item.querySelector(".faq-question").addEventListener("click", () => {
        item.classList.toggle("active");
    });
});


// =============================
// KIRIM EMAIL
// =============================

function kirimEmail() {

    const nama = document.getElementById("nama").value;
    const nip = document.getElementById("nip").value;
    const email = document.getElementById("email").value;
    const satuan = document.getElementById("satuan").value;
    const pesan = document.getElementById("pesan").value;

    const subject = "Saran KP Smart Portal";
    const body = `Nama: ${nama}
NIP: ${nip}
Satuan Kerja: ${satuan}
Email: ${email}

Pesan:
${pesan}`;

    window.location.href =
        `mailto:emailkamu@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}


// =============================
// KIRIM WHATSAPP
// =============================

function kirimWA() {

    const nama = document.getElementById("nama").value;
    const nip = document.getElementById("nip").value;
    const email = document.getElementById("email").value;
    const satuan = document.getElementById("satuan").value;
    const pesan = document.getElementById("pesan").value;

    const text = `Halo Admin KP Smart Portal

Nama: ${nama}
NIP: ${nip}
Email: ${email}
Satuan Kerja: ${satuan}

Pesan:
${pesan}`;

    window.open(
        `https://wa.me/6281234567890?text=${encodeURIComponent(text)}`,
        '_blank'
    );
}


// =============================
// SMART KP ANALYZER
// =============================

function cekKP() {

    const nip = document.getElementById("nipCek").value.trim();
    const golTerakhir = document.getElementById("golonganTerakhir").value;
    const hasilBox = document.getElementById("hasilKP");

    hasilBox.style.display = "block";

    // VALIDASI NIP
    if (!/^\d{18}$/.test(nip)) {
        hasilBox.innerHTML = `
        <h3 style="color:#ff5252;">❌ NIP Tidak Valid</h3>
        <p>Pastikan NIP terdiri dari 18 digit angka.</p>
        `;
        return;
    }

    // VALIDASI GOLONGAN
    if (golTerakhir === "") {
        hasilBox.innerHTML = `
        <h3 style="color:#ff5252;">❌ Golongan Belum Dipilih</h3>
        <p>Silakan pilih golongan terakhir Anda.</p>
        `;
        return;
    }

    // AMBIL TAHUN PENGANGKATAN DARI NIP
    const tahunMasuk = parseInt(nip.substring(8, 12));
    const tahunSekarang = new Date().getFullYear();

    let tahunNaik = tahunMasuk;

    // Estimasi kenaikan reguler 4 tahunan
    while (tahunNaik <= tahunSekarang) {
        tahunNaik += 4;
    }

    // Urutan golongan
    const daftarGol = [
        "2a","2b","2c","2d",
        "3a","3b","3c","3d",
        "4a","4b","4c","4d"
    ];

    const indexTerakhir = daftarGol.indexOf(golTerakhir.toLowerCase());

    if (indexTerakhir === -1) {
        hasilBox.innerHTML = `
        <h3 style="color:#ff5252;">❌ Data Golongan Tidak Valid</h3>
        `;
        return;
    }

    const indexBaru = indexTerakhir + 1;

    if (indexBaru >= daftarGol.length) {
        hasilBox.innerHTML = `
        <h3 style="color:#00e676;">🎉 Selamat</h3>
        <p>Anda sudah berada pada golongan tertinggi.</p>
        `;
        return;
    }

    const golBaru = daftarGol[indexBaru];

    const selisih = tahunNaik - tahunSekarang;

    let statusInfo = "";

    if (selisih <= 1) {
        statusInfo = "🟢 Sudah mendekati periode kenaikan pangkat.";
    } else if (selisih <= 2) {
        statusInfo = "🟡 Masih dalam masa penilaian.";
    } else {
        statusInfo = "🔵 Masih dalam masa kerja menuju periode berikutnya.";
    }

    // OUTPUT HASIL
   let statusClass = "";

if (selisih <= 1) {
    statusInfo = "Sudah mendekati periode kenaikan pangkat.";
    statusClass = "status-success";
} else if (selisih <= 2) {
    statusInfo = "Masih dalam masa penilaian.";
    statusClass = "status-warning";
} else {
    statusInfo = "Masih dalam masa kerja menuju periode berikutnya.";
    statusClass = "status-info";
}

hasilBox.innerHTML = `
<h3>HASIL ANALISIS KENAIKAN PANGKAT</h3>

<table>
<tr>
<td>Tahun Pengangkatan</td>
<td><strong>${tahunMasuk}</strong></td>
</tr>

<tr>
<td>Golongan Saat Ini</td>
<td><strong>${golTerakhir.toUpperCase()}</strong></td>
</tr>

<tr>
<td>Prediksi Golongan Berikutnya</td>
<td class="hasil-highlight">${golBaru.toUpperCase()}</td>
</tr>

<tr>
<td>Estimasi Tahun Kenaikan</td>
<td class="hasil-highlight">${tahunNaik}</td>
</tr>

<tr>
<td>Status Periode</td>
<td class="${statusClass}">${statusInfo}</td>
</tr>
</table>

<p style="margin-top:20px; font-size:12px; color:#777;">
*Analisis berdasarkan estimasi kenaikan reguler 4 tahunan.
Keputusan final mengikuti regulasi resmi dan verifikasi administrasi.
</p>
`;
}