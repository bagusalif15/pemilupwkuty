// hasil.js - Logika untuk halaman hasil pemilihan

document.addEventListener('DOMContentLoaded', function() {
    // Render hasil pemilihan
    renderVotingResults();
    
    // Setup download CSV button
    setupDownloadButton();
    
    // Setup auto refresh
    setupAutoRefresh();
});

// Fungsi untuk menampilkan hasil pemilihan
function renderVotingResults() {
    const results = getVotingResults();
    const voters = getVoterData();
    const totalVoters = voters.length;
    
    // Update total pemilih
    document.getElementById('total-pemilih').textContent = totalVoters;
    document.getElementById('total-suara').textContent = totalVoters;
    
    // Persiapkan data untuk chart
    const labels = [];
    const data = [];
    const backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56'];
    
    // Persiapkan statistik
    const statistikContainer = document.getElementById('statistik-container');
    statistikContainer.innerHTML = '';
    
    paslonData.forEach((paslon, index) => {
        labels.push(paslon.nama);
        const votes = results[paslon.id] || 0;
        data.push(votes);
        
        // Hitung persentase
        const percentage = totalVoters > 0 ? ((votes / totalVoters) * 100).toFixed(2) : 0;
        
        // Tambahkan statistik
        const statElement = document.createElement('p');
        statElement.innerHTML = `${paslon.nama}: <strong>${votes} suara</strong> (${percentage}%)`;
        statistikContainer.appendChild(statElement);
    });
    
    // Inisialisasi chart
    const ctx = document.getElementById('voting-chart').getContext('2d');
    const votingChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Jumlah Suara',
                data: data,
                backgroundColor: backgroundColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                            const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                            return `${label}: ${value} suara (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Fungsi untuk setup tombol download CSV
function setupDownloadButton() {
    document.getElementById('download-csv').addEventListener('click', function() {
        downloadCsv();
    });
}

// Fungsi untuk setup auto refresh
function setupAutoRefresh() {
    // Auto refresh setiap 30 detik
    setInterval(function() {
        renderVotingResults();
    }, 30000);
}