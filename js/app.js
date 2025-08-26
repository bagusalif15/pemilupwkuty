// app.js - Logika aplikasi untuk halaman utama

document.addEventListener('DOMContentLoaded', function() {
    // Render paslon cards
    renderPaslonCards();
    
    // Setup form submission
    setupFormSubmission();
});

// Fungsi untuk menampilkan kartu paslon
function renderPaslonCards() {
    const paslonContainer = document.getElementById('paslon-container');
    
    paslonData.forEach(paslon => {
        const paslonCard = document.createElement('div');
        paslonCard.className = 'col-md-4 mb-4';
        paslonCard.innerHTML = `
            <div class="card paslon-card h-100" onclick="selectPaslon(${paslon.id})" id="paslon-${paslon.id}">
                <img src="${paslon.foto}" class="card-img-top paslon-img" alt="${paslon.nama}">
                <div class="card-body">
                    <h5 class="card-title">${paslon.nama}</h5>
                    <p class="card-text">${paslon.deskripsi}</p>
                </div>
                <div class="card-footer bg-transparent">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="pilihan" id="pilihan-${paslon.id}" value="${paslon.id}" required>
                        <label class="form-check-label" for="pilihan-${paslon.id}">
                            Pilih ${paslon.nama}
                        </label>
                    </div>
                </div>
            </div>
        `;
        
        paslonContainer.appendChild(paslonCard);
    });
}

// Fungsi untuk memilih paslon
function selectPaslon(id) {
    // Hapus kelas selected dari semua card
    document.querySelectorAll('.paslon-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Tambahkan kelas selected ke card yang dipilih
    document.getElementById('paslon-' + id).classList.add('selected');
    
    // Pilih radio button yang sesuai
    document.getElementById('pilihan-' + id).checked = true;
}

// Fungsi untuk setup form submission
function setupFormSubmission() {
    const form = document.getElementById('voting-form');
    const errorAlert = document.getElementById('error-alert');
    const successAlert = document.getElementById('success-alert');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset alerts
        errorAlert.style.display = 'none';
        successAlert.style.display = 'none';
        
        // Ambil data form
        const nama = document.getElementById('nama').value.trim();
        const npm = document.getElementById('npm').value.trim();
        const angkatan = document.getElementById('angkatan').value;
        const pilihanElements = document.getElementsByName('pilihan');
        
        let pilihan = null;
        for (const el of pilihanElements) {
            if (el.checked) {
                pilihan = parseInt(el.value);
                break;
            }
        }
        
        // Validasi input
        if (!nama || !npm || !angkatan || !pilihan) {
            errorAlert.textContent = 'Semua field harus diisi!';
            errorAlert.style.display = 'block';
            return;
        }
        
        // Cek apakah NPM sudah pernah memilih
        if (checkNpmExists(npm)) {
            errorAlert.textContent = `NPM ${npm} sudah pernah melakukan pemilihan!`;
            errorAlert.style.display = 'block';
            return;
        }
        
        // Simpan data pemilih
        const voterData = {
            nama: nama,
            npm: npm,
            angkatan: angkatan,
            pilihan: pilihan
        };
        
        const saveResult = saveVoterData(voterData);
        
        if (saveResult) {
            successAlert.textContent = `Terima kasih ${nama}, pilihan Anda telah berhasil disimpan!`;
            successAlert.style.display = 'block';
            
            // Reset form
            form.reset();
            
            // Hapus kelas selected dari semua card
            document.querySelectorAll('.paslon-card').forEach(card => {
                card.classList.remove('selected');
            });
            
            // Redirect ke halaman hasil setelah 2 detik
            setTimeout(() => {
                window.location.href = 'hasil.html';
            }, 2000);
        } else {
            errorAlert.textContent = 'Terjadi kesalahan saat menyimpan data. Silakan coba lagi.';
            errorAlert.style.display = 'block';
        }
    });
}