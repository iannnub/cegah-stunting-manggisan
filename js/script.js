// Menunggu hingga seluruh konten halaman dimuat sebelum menjalankan script
document.addEventListener('DOMContentLoaded', function() {

    // --- FUNGSI UNTUK NAVBAR AKTIF ---
    // Fungsi ini akan berjalan di setiap halaman untuk menandai link yang aktif.
    const currentPage = window.location.pathname.split('/').pop();
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

    // --- FUNGSI UNTUK HAMBURGER MENU ---
    const navbarNav = document.querySelector('.navbar-nav');
    const hamburgerMenu = document.querySelector('#hamburger-menu');

    if (hamburgerMenu) {
        hamburgerMenu.onclick = (e) => {
            navbarNav.classList.toggle('active');
            e.preventDefault();
        };

        // Klik di luar elemen untuk menghilangkan nav
        document.addEventListener('click', function (e) {
            if (!hamburgerMenu.contains(e.target) && !navbarNav.contains(e.target)) {
                navbarNav.classList.remove('active');
            }
        });
    }

    // --- FUNGSI UNTUK ACCORDION (Halaman Ibu Hamil) ---
    const accordionItems = document.querySelectorAll('.accordion-item');
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Tutup semua item lain
                accordionItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const content = otherItem.querySelector('.accordion-content');
                    content.style.maxHeight = null;
                    content.style.padding = '0 1.5rem';
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
    }

    // --- FUNGSI UNTUK FILTER RESEP (Halaman Resep) ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        const resepCards = document.querySelectorAll('.resep-card');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const filter = button.getAttribute('data-filter');
                resepCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- FUNGSI UNTUK FLIP CARD (Halaman Mitos & Fakta) ---
    const flipCards = document.querySelectorAll('.flip-card');
    if (flipCards.length > 0) {
        flipCards.forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('active');
            });
        });
    }

    // --- FUNGSI UNTUK MODAL RESEP (Halaman Resep) ---
    const resepModal = document.getElementById('resep-modal');
    if (resepModal) {
        const resepLinks = document.querySelectorAll('.resep-link');
        const closeBtn = resepModal.querySelector('.close-button');

        resepLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const title = link.dataset.title;
                const img = link.dataset.img;
                const ingredients = link.dataset.ingredients;
                const instructions = link.dataset.instructions;

                resepModal.querySelector('#modal-title').innerText = title;
                resepModal.querySelector('#modal-img').src = img;
                resepModal.querySelector('#modal-ingredients').innerHTML = ingredients;
                resepModal.querySelector('#modal-instructions').innerHTML = instructions;
                
                resepModal.style.display = 'block';
            });
        });

        const closeModal = () => {
            resepModal.style.display = 'none';
        };

        closeBtn.addEventListener('click', closeModal);
        window.addEventListener('click', (e) => {
            if (e.target == resepModal) {
                closeModal();
            }
        });
    }

    // --- FUNGSI UNTUK KALKULATOR HPL (Halaman Kalkulator) ---
    const hitungHplBtn = document.getElementById('hitung-hpl-btn');
    if (hitungHplBtn) {
        const hphtInput = document.getElementById('hpht-date');
        hitungHplBtn.addEventListener('click', () => {
            const hphtDateString = hphtInput.value;
            if (!hphtDateString) {
                alert('Silakan pilih tanggal HPHT terlebih dahulu!');
                return;
            }

            const hpht = new Date(hphtDateString);
            const today = new Date();
            const diffTime = today - hpht;

            if (diffTime < 0) {
                alert('Tanggal HPHT tidak boleh di masa depan!');
                return;
            }

            const hpl = new Date(hpht);
            hpl.setDate(hpht.getDate() + 280);

            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            const weeks = Math.floor(diffDays / 7);
            const days = diffDays % 7;

            let trimester = '';
            if (weeks <= 13) {
                trimester = 'Trimester Pertama';
            } else if (weeks >= 14 && weeks <= 27) {
                trimester = 'Trimester Kedua';
            } else {
                trimester = 'Trimester Ketiga';
            }

            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const formattedHPL = hpl.toLocaleDateString('id-ID', options);
            
            document.getElementById('hasil-tanggal-hpl').innerText = formattedHPL;
            document.getElementById('hasil-usia-kehamilan').innerText = `${weeks} minggu ${days} hari`;
            document.getElementById('hasil-trimester').innerText = trimester;
            document.getElementById('hasil-hpl').classList.remove('hidden');
        });
    }

    // --- FUNGSI UNTUK KALKULATOR GIZI (Halaman Kalkulator) ---
    const hitungGiziBtn = document.getElementById('hitung-gizi-btn');
    if (hitungGiziBtn) {
        hitungGiziBtn.addEventListener('click', () => {
            const usia = parseFloat(document.getElementById('gizi-usia').value);
            const tinggi = parseFloat(document.getElementById('gizi-tinggi').value);
            const berat = parseFloat(document.getElementById('gizi-berat').value);
            const trimester = parseInt(document.getElementById('gizi-trimester').value);
            const faktorAktivitas = parseFloat(document.getElementById('gizi-aktivitas').value);

            if (!usia || !tinggi || !berat || !trimester || !faktorAktivitas) {
                alert('Harap isi semua kolom dengan lengkap!');
                return;
            }

            const bmr = 655.1 + (9.563 * berat) + (1.850 * tinggi) - (4.676 * usia);
            let tdee = bmr * faktorAktivitas;

            if (trimester === 2) {
                tdee += 340;
            } else if (trimester === 3) {
                tdee += 450;
            }

            const protein = Math.round((tdee * 0.15) / 4);
            const karbohidrat = Math.round((tdee * 0.55) / 4);
            const lemak = Math.round((tdee * 0.30) / 9);
            const totalKalori = Math.round(tdee);

            document.getElementById('hasil-kalori').innerText = totalKalori;
            document.getElementById('hasil-karbo').innerText = karbohidrat;
            document.getElementById('hasil-protein').innerText = protein;
            document.getElementById('hasil-lemak').innerText = lemak;
            document.getElementById('hasil-gizi').classList.remove('hidden');
        });
    }

});