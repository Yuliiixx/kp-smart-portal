// ========================================
// KP SMART PORTAL - MAIN SCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    initCountdown();
    initChecklistSimple();
    initFAQToggle();
    initAIFAQ();
    initMonitoringData();
    initChecklistAdvanced();

});


// ========================================
// 1. COUNTDOWN PERIODE KP
// ========================================
function initCountdown() {
    const deadline = new Date("March 31, 2026 23:59:59").getTime();
    const countdown = document.getElementById("countdown");
    const warning = document.getElementById("warning");

    if (!countdown) return;

    setInterval(() => {
        const now = new Date().getTime();
        const distance = deadline - now;

        if (distance <= 0) {
            countdown.innerHTML = "⛔ Periode telah ditutup";
            if (warning) warning.innerHTML = "";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        // countdown.innerHTML = `⏳ Sisa Waktu: ${days} Hari ${hours} Jam`;

        // if (warning) {
        //     warning.innerHTML = days <= 7 ? "⚠️ Deadline Hampir Tiba!" : "";
        // }

    }, 1000);
}


// ========================================
// 2. SMART CHECKLIST (SIMPLE)
// ========================================
function initChecklistSimple() {
    const checkboxes = document.querySelectorAll(".check-box input");
    const message = document.getElementById("checkMessage");

    if (!checkboxes.length || !message) return;

    checkboxes.forEach(box => {
        box.addEventListener("change", () => {
            const allChecked = [...checkboxes].every(cb => cb.checked);

            if (allChecked) {
                message.innerHTML = "✅ Berkas Lengkap dan Siap Diajukan";
                message.style.color = "#00e676";
            } else {
                message.innerHTML = "";
            }
        });
    });
}


// ========================================
// 3. FAQ TOGGLE
// ========================================
function initFAQToggle() {
    document.querySelectorAll(".faq-item").forEach(item => {
        const question = item.querySelector(".faq-question");
        if (!question) return;

        question.addEventListener("click", () => {
            item.classList.toggle("active");
        });
    });
}


// ========================================
// 4. KIRIM EMAIL
// ========================================
function kirimEmail() {
    const nama = getValue("nama");
    const nip = getValue("nip");
    const email = getValue("email");
    const satuan = getValue("satuan");
    const pesan = getValue("pesan");

    const subject = "Saran KP Smart Portal";

    const body = `Nama: ${nama}
NIP: ${nip}
Satuan Kerja: ${satuan}
Email: ${email}

Pesan:
${pesan}`;

    window.location.href =
        `mailto:antiyuli2828@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}


// ========================================
// 5. KIRIM WHATSAPP
// ========================================
function kirimWA() {
    const nama = getValue("nama");
    const nip = getValue("nip");
    const email = getValue("email");
    const satuan = getValue("satuan");
    const pesan = getValue("pesan");

    const text = `Halo Admin KP Smart Portal

Nama: ${nama}
NIP: ${nip}
Email: ${email}
Satuan Kerja: ${satuan}

Pesan:
${pesan}`;

    window.open(
        `https://wa.me/6281266673375?text=${encodeURIComponent(text)}`,
        "_blank"
    );
}


// ========================================
// 6. SMART KP ANALYZER
// ========================================
function cekKP() {
    const nip = getValue("nipCek").trim();
    const golTerakhir = getValue("golonganTerakhir");
    const tmt = parseInt(getValue("tmtSebelumnya"));
    const hasilBox = document.getElementById("hasilKP");

    if (!hasilBox) return;
    hasilBox.style.display = "block";

    // VALIDASI
    if (!/^\d{18}$/.test(nip)) {
        hasilBox.innerHTML = `<h3 style="color:#ff5252;">❌ NIP Tidak Valid</h3>`;
        return;
    }

    if (!golTerakhir) {
        hasilBox.innerHTML = `<h3 style="color:#ff5252;">❌ Pilih Golongan</h3>`;
        return;
    }

    if (!tmt) {
        hasilBox.innerHTML = `<h3 style="color:#ff5252;">❌ Isi Tahun TMT</h3>`;
        return;
    }

    const tahunCPNS = parseInt(nip.substring(8, 12));
    const tahunSekarang = new Date().getFullYear();

    // 🔥 LOGIKA BARU (PAKAI TMT)
    const tahunNaik = tmt + 4;
    const selisih = tahunNaik - tahunSekarang;

    const daftarGol = [
        "2a","2b","2c","2d",
        "3a","3b","3c","3d",
        "4a","4b","4c","4d"
    ];

    const index = daftarGol.indexOf(golTerakhir.toLowerCase());

    if (index === -1) {
        hasilBox.innerHTML = `<h3 style="color:#ff5252;">❌ Golongan Tidak Valid</h3>`;
        return;
    }

    if (index + 1 >= daftarGol.length) {
        hasilBox.innerHTML = `<h3 style="color:#00e676;">🎉 Golongan Tertinggi</h3>`;
        return;
    }

    const golBaru = daftarGol[index + 1];

    let statusInfo = "";
    let statusClass = "";

    if (selisih <= 0) {
        statusInfo = "🟢 Sudah memasuki periode kenaikan pangkat.";
        statusClass = "status-success";
    } else if (selisih <= 1) {
        statusInfo = "🟡 Mendekati periode kenaikan pangkat.";
        statusClass = "status-warning";
    } else {
        statusInfo = "🔵 Masih dalam masa kerja menuju periode berikutnya.";
        statusClass = "status-info";
    }

    hasilBox.innerHTML = `
    <h3>HASIL ANALISIS KENAIKAN PANGKAT</h3>

    <table>
        <tr>
            <td>Tahun CPNS</td>
            <td><strong>${tahunCPNS}</strong></td>
        </tr>

        <tr>
            <td>TMT Terakhir</td>
            <td><strong>${tmt}</strong></td>
        </tr>

        <tr>
            <td>Golongan Saat Ini</td>
            <td><strong>${golTerakhir.toUpperCase()}</strong></td>
        </tr>

        <tr>
            <td>Golongan Berikutnya</td>
            <td class="hasil-highlight">${golBaru.toUpperCase()}</td>
        </tr>

        <tr>
            <td>Tahun Kenaikan</td>
            <td class="hasil-highlight">${tahunNaik}</td>
        </tr>

        <tr>
            <td>Status</td>
            <td class="${statusClass}">${statusInfo}</td>
        </tr>
    </table>

    <p style="font-size:12px;color:#888;margin-top:10px;">
    *Perhitungan berdasarkan TMT terakhir + 4 tahun (kenaikan reguler)
    </p>
    `;
}


// ========================================
// 7. AI FAQ INTERACTIVE
// ========================================
function initAIFAQ() {
    document.querySelectorAll(".faq-trigger").forEach(item => {
        item.addEventListener("click", () => {
            const answerId = item.getAttribute("data-answer");
            const answerBox = document.getElementById(answerId);

            if (!answerBox) return;

            if (!answerBox.classList.contains("hidden")) {
                answerBox.classList.add("hidden");
                return;
            }

            document.querySelectorAll(".chat.ai").forEach(ai => {
                ai.classList.add("hidden");
            });

            setTimeout(() => {
                answerBox.classList.remove("hidden");
            }, 800);
        });
    });
    item.classList.add("active");
answerBox.scrollIntoView({ behavior: "smooth", block: "center" });
setTimeout(() => {
  answerBox.classList.remove("hidden");
}, 500);

}


// ========================================
// MONITORING DATA (GOOGLE SHEET - FINAL)
// ========================================
function initMonitoringData() {
    const container = document.getElementById("monitoring-data");
    const statistik = document.getElementById("statistik");

    if (!container || !statistik) return;

    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vTyocMTqM7AcXUHr14KFKWQwCyg7geN1qYHCQ89v5N8BJqLGUKqWJK8oJilxVwehe2aMVvm8mTOtwe5/pub?gid=0&single=true&output=csv")
    .then(res => res.text())
    .then(data => {

        console.log("DATA CSV:", data); // DEBUG

        const rows = data.trim().split("\n").slice(1);

        let total = rows.length;
        let lengkap = 0;
        let proses = 0;
        let belum = 0;

        let html = "";

        rows.forEach(row => {
            const cols = row.split(",");

            if (cols.length < 2) return;

            const satuan = cols[0].trim();
            const status = cols[1].trim();

            let icon = "❌";
            let warna = "red";

            if (status === "Lengkap") {
                icon = "✅";
                warna = "#00e676";
                lengkap++;
            } 
            else if (status === "Proses") {
                icon = "⏳";
                warna = "orange";
                proses++;
            } 
            else {
                belum++;
            }

            html += `
            <p style="margin:6px 0;">
                ${icon} <strong>${satuan}</strong> 
                <span style="color:${warna};">(${status})</span>
            </p>`;
        });

        container.innerHTML = html;

        const persen = Math.round((lengkap / total) * 100);

        statistik.innerHTML = `
            ${persen}% Berkas Lengkap <br>
            <small>✅ ${lengkap} | ⏳ ${proses} | ❌ ${belum}</small>
        `;
    })
    .catch(err => {
        console.error(err);
        container.innerHTML = "❌ Gagal ambil data";
        statistik.innerHTML = "-";
    });
}
// ========================================
// 9. SMART CHECKLIST (ADVANCED)
// ========================================
function initChecklistAdvanced() {
    const checkboxes = document.querySelectorAll('#checklist input');
    const statusText = document.getElementById('statusText');
    const formBtn = document.getElementById('formBtn');
    const qrImage = document.getElementById('qrImage');

    if (!checkboxes.length || !statusText) return;

    checkboxes.forEach(cb => {
        cb.addEventListener('change', updateChecklist);
    });

    function updateChecklist() {
        const total = checkboxes.length;
        let checked = 0;

        checkboxes.forEach(cb => {
            if (cb.checked) checked++;
        });

        if (checked === total) {
            statusText.innerHTML = "✅ Semua berkas lengkap";
            statusText.style.color = "#00e676";
            if (formBtn) formBtn.style.display = "block";
            if (qrImage) qrImage.style.display = "block";
        } else {
            statusText.innerHTML = "❌ Checklist belum lengkap";
            statusText.style.color = "red";
            if (formBtn) formBtn.style.display = "none";
            if (qrImage) qrImage.style.display = "none";
        }
    }
}


// ========================================
// HELPER FUNCTION
// ========================================
function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value : "";
}


// ========================================
// DETAIL TOGGLE (JENIS KP)
// ========================================
function initDetailToggle() {
    document.querySelectorAll(".btn-detail").forEach(btn => {
        btn.addEventListener("click", () => {

            const detail = btn.nextElementSibling;

            detail.classList.toggle("show");

            // Ubah teks tombol
            if (detail.classList.contains("show")) {
                btn.innerText = "Tutup Detail";
            } else {
                btn.innerText = "Lihat Detail";
            }

        });
    });
}

// panggil di DOMContentLoaded
initDetailToggle();


// TOGGLE CARD
document.querySelectorAll(".kp-header").forEach(header => {
  header.addEventListener("click", () => {
    const card = header.parentElement;

    document.querySelectorAll(".kp-card").forEach(c => c.classList.remove("active"));
    card.classList.add("active");
  });
});

// PROGRESS
document.querySelectorAll(".kp-card").forEach(card => {

  const checkboxes = card.querySelectorAll("input");
  const progress = card.querySelector(".progress");

  checkboxes.forEach(cb => {
    cb.addEventListener("change", () => {

      const total = checkboxes.length;
      const checked = [...checkboxes].filter(c => c.checked).length;

      progress.style.width = (checked / total) * 100 + "%";
    });
  });

});

// buka tutup card
document.querySelectorAll(".kp-header").forEach(header => {
  header.addEventListener("click", () => {
    const card = header.parentElement;

    document.querySelectorAll(".kp-card").forEach(c => c.classList.remove("active"));
    card.classList.add("active");
  });
});

// smart checklist
document.querySelectorAll(".kp-card").forEach(card => {

  const checkboxes = card.querySelectorAll("input");
  const progress = card.querySelector(".progress");
  const statusText = card.querySelector(".status-text");
  const button = card.querySelector(".btn-submit");

  function updateStatus() {
    const total = checkboxes.length;
    const checked = [...checkboxes].filter(c => c.checked).length;

    progress.style.width = (checked / total) * 100 + "%";

    if (checked === total) {
      statusText.innerHTML = "✅ Semua berkas lengkap";
      statusText.style.color = "#00e676";
      button.disabled = false;
    } else {
      statusText.innerHTML = "❌ Checklist belum lengkap";
      statusText.style.color = "red";
      button.disabled = true;
    }
  }

  checkboxes.forEach(cb => {
    cb.addEventListener("change", updateStatus);
  });

});

// dasar ukp

function toggleDasar() {
  const content = document.getElementById("dasarContent");
  const icon = document.getElementById("iconDasar");

  content.classList.toggle("show");

  if (content.classList.contains("show")) {
    icon.innerText = "−";
  } else {
    icon.innerText = "+";
  }
}