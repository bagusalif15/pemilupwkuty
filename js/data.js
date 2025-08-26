// data.js - Menyimpan data statis untuk aplikasi pemilihan

// Data pasangan calon
const paslonData = [
    {
        id: 1,
        nama: 'Paslon 01',
        foto: 'images/paslon1.svg',
        deskripsi: 'Vittorio Paskalis Diki Aryanto & Vishnu Brana Lumintu'
    },
    {
        id: 2,
        nama: 'Paslon 02',
        foto: 'images/paslon2.svg',
        deskripsi: 'Zahra Salsabila & Devano Danindra'
    },
    {
        id: 3,
        nama: 'Paslon 03',
        foto: 'images/paslon3.svg',
        deskripsi: 'Rifky Cahya Wardana & Eva Siatono'
    }
];

// Fungsi untuk menyimpan data pemilih di localStorage
function saveVoterData(voterData) {
    // Ambil data pemilih yang sudah ada
    const existingVoters = getVoterData();
    
    // Tambahkan waktu pemilihan
    voterData.waktu = new Date().toISOString();
    
    // Tambahkan ID unik
    voterData.id = existingVoters.length > 0 ? Math.max(...existingVoters.map(v => v.id)) + 1 : 1;
    
    // Tambahkan data pemilih baru
    existingVoters.push(voterData);
    
    // Simpan kembali ke localStorage
    localStorage.setItem('pemilihData', JSON.stringify(existingVoters));
    
    return true;
}

// Fungsi untuk mengambil data pemilih dari localStorage
function getVoterData() {
    const data = localStorage.getItem('pemilihData');
    return data ? JSON.parse(data) : [];
}

// Fungsi untuk memeriksa apakah NPM sudah pernah memilih
function checkNpmExists(npm) {
    const voters = getVoterData();
    return voters.some(voter => voter.npm === npm);
}

// Fungsi untuk menghitung hasil voting
function getVotingResults() {
    const voters = getVoterData();
    const results = {};
    
    // Inisialisasi hasil untuk setiap paslon
    paslonData.forEach(paslon => {
        results[paslon.id] = 0;
    });
    
    // Hitung suara untuk setiap paslon
    voters.forEach(voter => {
        if (results[voter.pilihan] !== undefined) {
            results[voter.pilihan]++;
        }
    });
    
    return results;
}

// Fungsi untuk mendapatkan statistik per angkatan
function getStatsByAngkatan() {
    const voters = getVoterData();
    const stats = {};
    
    // Hitung jumlah pemilih per angkatan
    voters.forEach(voter => {
        if (!stats[voter.angkatan]) {
            stats[voter.angkatan] = 0;
        }
        stats[voter.angkatan]++;
    });
    
    return stats;
}

// Fungsi untuk menghasilkan data CSV
function generateCsvData() {
    const voters = getVoterData();
    const results = getVotingResults();
    const statsByAngkatan = getStatsByAngkatan();
    const totalVoters = voters.length;
    
    // Buat array untuk menyimpan baris CSV
    let csvRows = [];
    
    // Judul
    csvRows.push(['HASIL PEMILIHAN UMUM PWK UTY']);
    csvRows.push(['Tanggal Export: ' + new Date().toLocaleString()]);
    csvRows.push(['Total Pemilih: ' + totalVoters]);
    csvRows.push([]);
    
    // Ringkasan hasil
    csvRows.push(['RINGKASAN HASIL']);
    csvRows.push(['Pasangan Calon', 'Jumlah Suara', 'Persentase']);
    
    paslonData.forEach(paslon => {
        const votes = results[paslon.id] || 0;
        const percentage = totalVoters > 0 ? ((votes / totalVoters) * 100).toFixed(2) + '%' : '0%';
        csvRows.push([paslon.nama, votes, percentage]);
    });
    
    csvRows.push([]);
    
    // Statistik per angkatan
    csvRows.push(['STATISTIK PEMILIH PER ANGKATAN']);
    csvRows.push(['Angkatan', 'Jumlah Pemilih']);
    
    // Urutkan angkatan
    const sortedAngkatan = Object.keys(statsByAngkatan).sort();
    
    sortedAngkatan.forEach(angkatan => {
        csvRows.push([angkatan, statsByAngkatan[angkatan]]);
    });
    
    // Konversi array ke string CSV
    let csvContent = csvRows.map(row => row.join(',')).join('\n');
    
    return csvContent;
}

// Fungsi untuk mengunduh data sebagai file CSV
function downloadCsv() {
    const csvContent = generateCsvData();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'hasil_pemilihan_pwk_uty.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}