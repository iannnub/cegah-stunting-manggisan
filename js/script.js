// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector('.navbar-nav');
const hamburgerMenu = document.querySelector('#hamburger-menu');

// Ketika hamburger menu di-klik
hamburgerMenu.onclick = (e) => {
  navbarNav.classList.toggle('active');
  e.preventDefault(); // Mencegah aksi default agar tidak pindah ke atas halaman
};

// Klik di luar elemen untuk menghilangkan nav
document.addEventListener('click', function (e) {
  if (!hamburgerMenu.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }
});

// Script untuk Accordion
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');

    header.addEventListener('click', () => {
        // Cek apakah item ini sudah aktif
        const isActive = item.classList.contains('active');

        // Tutup semua item lain
        accordionItems.forEach(otherItem => {
            otherItem.classList.remove('active');
            otherItem.querySelector('.accordion-content').style.maxHeight = 0;
            otherItem.querySelector('.accordion-content').style.padding = '0 1.5rem';
        });

        // Jika item tidak aktif, buka item ini
        if (!isActive) {
            item.classList.add('active');
            const content = item.querySelector('.accordion-content');
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.padding = '1rem 1.5rem';
        }
    });
});

// Script untuk Filter Galeri Resep
const filterButtons = document.querySelectorAll('.filter-btn');
const resepCards = document.querySelectorAll('.resep-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Hapus class 'active' dari semua tombol
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Tambah class 'active' ke tombol yang diklik
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        resepCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block'; // Tampilkan kartu
            } else {
                card.style.display = 'none'; // Sembunyikan kartu
            }
        });
    });
});

// Script untuk Flip Card di halaman Mitos-Fakta
const flipCards = document.querySelectorAll('.flip-card');

flipCards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('active');
    });
});

// ===============================================
// LOGIKA UNTUK HALAMAN KALKULATOR
// ===============================================

// Cek apakah elemen-elemen kalkulator ada di halaman saat ini
const hphtInput = document.getElementById('hpht-date');
const hitungBtn = document.getElementById('hitung-hpl-btn');

if (hphtInput && hitungBtn) {
    hitungBtn.addEventListener('click', () => {
        const hphtDateString = hphtInput.value;
        
        // 1. Validasi Input
        if (!hphtDateString) {
            alert('Silakan pilih tanggal HPHT terlebih dahulu!');
            return;
        }

        const hpht = new Date(hphtDateString);
        const today = new Date();
        
        // 2. Hitung HPL (berdasarkan aturan Naegele: tambah 280 hari)
        const hpl = new Date(hpht);
        hpl.setDate(hpht.getDate() + 280);

        // 3. Hitung Usia Kehamilan
        const diffTime = today - hpht;
        // Cek jika tanggal HPHT di masa depan
        if (diffTime < 0) {
            alert('Tanggal HPHT tidak boleh di masa depan!');
            return;
        }
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(diffDays / 7);
        const days = diffDays % 7;

        // 4. Tentukan Trimester
        let trimester = '';
        if (weeks <= 13) {
            trimester = 'Trimester Pertama';
        } else if (weeks >= 14 && weeks <= 27) {
            trimester = 'Trimester Kedua';
        } else {
            trimester = 'Trimester Ketiga';
        }

        // 5. Format tanggal HPL ke format Indonesia
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedHPL = hpl.toLocaleDateString('id-ID', options);
        
        // 6. Tampilkan Hasil
        document.getElementById('hasil-tanggal-hpl').innerText = formattedHPL;
        document.getElementById('hasil-usia-kehamilan').innerText = `${weeks} minggu ${days} hari`;
        document.getElementById('hasil-trimester').innerText = trimester;

        // 7. Tampilkan kotak hasil
        document.getElementById('hasil-hpl').classList.remove('hidden');
    });
}

// ===============================================
// LOGIKA UNTUK MODAL RESEP
// ===============================================
const resepModal = document.getElementById('resep-modal');
if (resepModal) {
    const resepLinks = document.querySelectorAll('.resep-link');
    const closeBtn = document.querySelector('.close-button');

    resepLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah link pindah halaman

            // Ambil data dari atribut 'data-'
            const title = link.dataset.title;
            const img = link.dataset.img;
            const ingredients = link.dataset.ingredients;
            const instructions = link.dataset.instructions;

            // Masukkan data ke dalam modal
            document.getElementById('modal-title').innerText = title;
            document.getElementById('modal-img').src = img;
            document.getElementById('modal-ingredients').innerHTML = ingredients;
            document.getElementById('modal-instructions').innerHTML = instructions;
            
            // Tampilkan modal
            resepModal.style.display = 'block';
        });
    });

    // Fungsi untuk menutup modal
    const closeModal = () => {
        resepModal.style.display = 'none';
    };

    // Event listener untuk tombol close
    closeBtn.addEventListener('click', closeModal);

    // Event listener untuk klik di luar modal
    window.addEventListener('click', (e) => {
        if (e.target == resepModal) {
            closeModal();
        }
    });
}
// Menandai link navbar yang aktif sesuai halaman
document.addEventListener('DOMContentLoaded', function() {
    // Mendapatkan nama file dari URL saat ini (contoh: "stunting.html")
    const currentPage = window.location.pathname.split('/').pop();

    // Mendapatkan semua link di navbar
    const navLinks = document.querySelectorAll('.navbar-nav a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');

        // Kasus khusus untuk halaman utama (index.html bisa jadi URL kosong)
        if ((currentPage === '' || currentPage === 'index.html') && linkPage === 'index.html') {
            link.classList.add('active-link');
        } 
        // Untuk halaman lainnya
        else if (linkPage === currentPage) {
            link.classList.add('active-link');
        }
    });
});

// ===============================================
// LOGIKA UNTUK KALKULATOR KEBUTUHAN GIZI
// ===============================================

const hitungGiziBtn = document.getElementById('hitung-gizi-btn');

if (hitungGiziBtn) {
    hitungGiziBtn.addEventListener('click', () => {
        // 1. Ambil semua nilai input
        const usia = parseFloat(document.getElementById('gizi-usia').value);
        const tinggi = parseFloat(document.getElementById('gizi-tinggi').value);
        const berat = parseFloat(document.getElementById('gizi-berat').value);
        const trimester = parseInt(document.getElementById('gizi-trimester').value);
        const faktorAktivitas = parseFloat(document.getElementById('gizi-aktivitas').value);

        // 2. Validasi input
        if (!usia || !tinggi || !berat || !trimester || !faktorAktivitas) {
            alert('Harap isi semua kolom dengan lengkap!');
            return;
        }

        // 3. Hitung BMR menggunakan rumus Harris-Benedict untuk wanita
        // BMR = 655.1 + (9.563 × berat in kg) + (1.850 × tinggi in cm) - (4.676 × usia in years)
        const bmr = 655.1 + (9.563 * berat) + (1.850 * tinggi) - (4.676 * usia);

        // 4. Hitung TDEE (Total Daily Energy Expenditure)
        let tdee = bmr * faktorAktivitas;

        // 5. Tambahkan kalori ekstra berdasarkan trimester
        if (trimester === 2) {
            tdee += 340;
        } else if (trimester === 3) {
            tdee += 450;
        }

        // 6. Hitung kebutuhan makronutrien (contoh persentase umum)
        // Protein: 15%, Karbohidrat: 55%, Lemak: 30%
        // 1g Karbo = 4 kkal, 1g Protein = 4 kkal, 1g Lemak = 9 kkal
        const protein = Math.round((tdee * 0.15) / 4);
        const karbohidrat = Math.round((tdee * 0.55) / 4);
        const lemak = Math.round((tdee * 0.30) / 9);
        const totalKalori = Math.round(tdee);

        // 7. Tampilkan hasil
        document.getElementById('hasil-kalori').innerText = totalKalori;
        document.getElementById('hasil-karbo').innerText = karbohidrat;
        document.getElementById('hasil-protein').innerText = protein;
        document.getElementById('hasil-lemak').innerText = lemak;

        // 8. Tampilkan kotak hasil
        document.getElementById('hasil-gizi').classList.remove('hidden');
    });
}