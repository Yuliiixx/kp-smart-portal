// COUNTDOWN
const deadline = new Date("March 31, 2026 23:59:59").getTime();
const countdown = document.getElementById("countdown");
const warning = document.getElementById("warning");

setInterval(() => {
const now = new Date().getTime();
const distance = deadline - now;
const days = Math.floor(distance/(1000*60*60*24));

countdown.innerHTML = "⏳ Sisa Waktu: " + days + " Hari";

if(days <= 7){
warning.innerHTML = "⚠️ Deadline Hampir Tiba!";
}
},1000);

// CHECKLIST
document.querySelectorAll(".check-box input").forEach(box=>{
box.addEventListener("change",()=>{
const allChecked = [...document.querySelectorAll(".check-box input")].every(cb=>cb.checked);
document.getElementById("checkMessage").innerHTML = allChecked ? "✅ Berkas Siap Diajukan" : "";
});
});

// FAQ
document.querySelectorAll(".faq-item").forEach(item=>{
item.querySelector(".faq-question").addEventListener("click",()=>{
item.classList.toggle("active");
});
});

// EMAIL
function kirimEmail(){
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

window.location.href = `mailto:emailkamu@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// WHATSAPP
function kirimWA(){
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

window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(text)}`,'_blank');
}

function cekKP(){

const nip = document.getElementById("nipCek").value;
const golTerakhir = document.getElementById("golonganTerakhir").value;
const hasilBox = document.getElementById("hasilKP");

if(nip.length < 12){
hasilBox.style.display="block";
hasilBox.innerHTML="❌ NIP tidak valid.";
return;
}

if(golTerakhir === ""){
hasilBox.style.display="block";
hasilBox.innerHTML="❌ Silakan pilih golongan terakhir.";
return;
}

const tahunMasuk = parseInt(nip.substring(8,12));
const tahunSekarang = new Date().getFullYear();

let tahunNaik = tahunMasuk;

// cari kenaikan terdekat (2002,2006,...)
while(tahunNaik <= tahunSekarang){
tahunNaik += 4;
}

// daftar urutan golongan
const daftarGol = ["2a","2b","2c","2d","3a","3b","3c","3d","4a","4b","4c","4d"];

let indexTerakhir = daftarGol.indexOf(golTerakhir.toLowerCase());

if(indexTerakhir === -1){
hasilBox.style.display="block";
hasilBox.innerHTML="❌ Golongan tidak valid.";
return;
}

// naik +1 saja
let indexBaru = indexTerakhir + 1;

if(indexBaru >= daftarGol.length){
hasilBox.style.display="block";
hasilBox.innerHTML="🎉 Anda sudah berada di golongan tertinggi.";
return;
}

let golBaru = daftarGol[indexBaru];

hasilBox.style.display="block";
hasilBox.innerHTML = `
<h3>📊 Hasil Analisis</h3>
<p>Tahun Pengangkatan PNS: <strong>${tahunMasuk}</strong></p>
<p>🎯 Kamu naik pangkat ke golongan <strong>${golBaru.toUpperCase()}</strong> pada tahun <strong>${tahunNaik}</strong>.</p>
`;
}
