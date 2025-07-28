// Menunggu hingga seluruh konten halaman dimuat sebelum menjalankan script
document.addEventListener('DOMContentLoaded', () => {

    // --- DATA PERTANYAAN ---
    const milestoneData = [
        {
            id: 'milestone1',
            question: 'Saat hamil, Ibu sering mual. Apa yang sebaiknya dilakukan?',
            options: [
                { text: 'Makan dalam porsi besar 2x sehari', img: 'images/pilihan-makan-besar.png', isCorrect: false },
                { text: 'Makan porsi kecil tapi sering', img: 'images/pilihan-makan-kecil.png', isCorrect: true }
            ],
            feedback: 'Makan dalam porsi kecil tapi sering dapat membantu menjaga kadar gula darah stabil dan mengurangi rasa mual.',
            position: { top: '88%', left: '6%' }
        },
        {
            id: 'milestone2',
            question: 'Apa manfaat utama Imunisasi Lengkap bagi bayi?',
            options: [
                { text: 'Membuat bayi cepat gemuk', img: 'images/pilihan-bayi-gemuk.png', isCorrect: false },
                { text: 'Melindungi dari penyakit berbahaya', img: 'images/pilihan-imunisasi.png', isCorrect: true }
            ],
            feedback: 'Imunisasi membentuk kekebalan tubuh untuk melawan berbagai penyakit menular yang berbahaya bagi bayi dan anak.',
            position: { top: '12%', left: '31%' }
        },
        {
            id: 'milestone3',
            question: 'Bagaimana tekstur MPASI yang tepat untuk bayi usia 6 bulan?',
            options: [
                { text: 'Bubur Saring yang Halus (Puree)', img: 'images/resep-puree-alpukat.jpg', isCorrect: true },
                { text: 'Nasi Tim dengan Cincangan Kasar', img: 'images/resep-nasi-tim.jpg', isCorrect: false }
            ],
            feedback: 'Bayi usia 6 bulan baru belajar menelan, sehingga dimulai dengan tekstur bubur yang sangat halus (puree).',
            position: { top: '88%', left: '56%' }
        },
        {
            id: 'milestone4',
            question: 'Kapan waktu terpenting untuk mencuci tangan pakai sabun?',
            options: [
                { text: 'Hanya setelah bermain di luar', img: 'images/pilihan-main-tanah.png', isCorrect: false },
                { text: 'Sebelum menyiapkan makan & setelah dari toilet', img: 'images/pilihan-cuci-tangan.png', isCorrect: true }
            ],
            feedback: 'Mencuci tangan di waktu-waktu kunci sangat efektif mencegah kuman penyebab diare yang bisa menghambat penyerapan gizi.',
            position: { top: '12%', left: '81%' }
        },
        {
            id: 'milestone5',
            question: 'Bagaimana cara terbaik memantau pertumbuhan anak?',
            options: [
                { text: 'Rutin ke Posyandu setiap bulan', img: 'images/pilihan-posyandu.png', isCorrect: true },
                { text: 'Membandingkan dengan anak tetangga', img: 'images/pilihan-bandingkan-anak.png', isCorrect: false }
            ],
            feedback: 'Dengan rutin ke Posyandu, pertumbuhan anak akan dipantau menggunakan grafik standar, sehingga masalah bisa terdeteksi sejak dini.',
            position: { top: '88%', left: '94%' }
        }
    ];

    // --- VARIABEL & ELEMEN DOM ---
    let skorBintang = 0;
    let currentMilestoneIndex = 0;

    const skorBintangEl = document.getElementById('skor-bintang');
    const karakterPemainEl = document.getElementById('karakter-pemain');
    const milestones = document.querySelectorAll('.milestone');

    // Modal Pertanyaan
    const modalEl = document.getElementById('pertanyaan-modal');
    const modalJudulEl = document.getElementById('judul-pertanyaan');
    const modalPilihanEl = document.getElementById('pilihan-jawaban');
    const modalFeedbackEl = document.getElementById('feedback-jawaban');

    // Modal Hasil Akhir
    const hasilModalEl = document.getElementById('hasil-akhir-modal');
    const pesanHasilEl = document.getElementById('pesan-hasil-akhir');
    const skorFinalEl = document.getElementById('skor-final');
    const mainLagiBtn = document.getElementById('main-lagi-btn');
    
    // Suara
    const suaraBenar = document.getElementById('suara-benar');
    const suaraSalah = document.getElementById('suara-salah');

    // --- FUNGSI-FUNGSI ---

    function tampilkanPertanyaan(milestone) {
        modalJudulEl.textContent = milestone.question;
        modalPilihanEl.innerHTML = '';
        modalFeedbackEl.innerHTML = '';

        milestone.options.forEach(opt => {
            const pilihanDiv = document.createElement('div');
            pilihanDiv.classList.add('pilihan-item');
            pilihanDiv.innerHTML = `<img src="${opt.img}" alt="${opt.text}"><p>${opt.text}</p>`;
            pilihanDiv.addEventListener('click', () => handleJawaban(opt, milestone, pilihanDiv));
            modalPilihanEl.appendChild(pilihanDiv);
        });

        modalEl.style.display = 'block';
    }

    function handleJawaban(opsi, milestone, elemenPilihan) {
        document.querySelectorAll('.pilihan-item').forEach(el => el.style.pointerEvents = 'none');
        modalFeedbackEl.textContent = milestone.feedback;

        if (opsi.isCorrect) {
            skorBintang++;
            skorBintangEl.textContent = skorBintang;
            skorBintangEl.parentElement.classList.add('bintang-pop');
            elemenPilihan.classList.add('correct');
            document.getElementById(milestone.id).dataset.completed = 'true';
            try { suaraBenar.play(); } catch(e) {} // Memainkan suara benar
        } else {
            elemenPilihan.classList.add('incorrect');
            document.getElementById(milestone.id).dataset.completed = 'false';
            try { suaraSalah.play(); } catch(e) {} // Memainkan suara salah
        }

        // Hapus kelas animasi bintang setelah selesai
        setTimeout(() => {
            skorBintangEl.parentElement.classList.remove('bintang-pop');
        }, 500);

        setTimeout(() => {
            modalEl.style.display = 'none';
            lanjutkanPetualangan(milestone.id);
        }, 3000); // Beri waktu lebih lama agar pengguna sempat membaca feedback
    }

function lanjutkanPetualangan(completedMilestoneId) {
    const milestoneEl = document.getElementById(completedMilestoneId);
    
    // PERBAIKAN: Gunakan kelas CSS, bukan inline style
    if (milestoneEl.dataset.completed === 'true') {
        milestoneEl.classList.add('completed-true'); // Tambah kelas untuk jawaban BENAR
    } else {
        milestoneEl.classList.add('completed-false'); // Tambah kelas untuk jawaban SALAH
    }
    
    const dataMilestone = milestoneData.find(m => m.id === completedMilestoneId);
    if (dataMilestone) {
        karakterPemainEl.style.top = dataMilestone.position.top;
        karakterPemainEl.style.left = dataMilestone.position.left;
    }

    currentMilestoneIndex++;
    if (currentMilestoneIndex < milestoneData.length) {
        const nextMilestoneId = milestoneData[currentMilestoneIndex].id;
        const nextMilestoneEl = document.getElementById(nextMilestoneId);
        nextMilestoneEl.classList.remove('locked');
        nextMilestoneEl.addEventListener('click', () => tampilkanPertanyaan(milestoneData[currentMilestoneIndex]), { once: true });
    } else {
        setTimeout(tampilkanHasilAkhir, 1500);
    }
}

    function tampilkanHasilAkhir() {
        pesanHasilEl.textContent = "Anda telah mempelajari langkah-langkah penting untuk mencegah stunting!";
        skorFinalEl.innerHTML = `Skor Anda: <span>${skorBintang} / ${milestoneData.length}</span> Bintang Gizi ⭐`;
        hasilModalEl.style.display = 'block';
    }
    
    function resetGame() {
        skorBintang = 0;
        currentMilestoneIndex = 0;
        skorBintangEl.textContent = '0';
        
        karakterPemainEl.style.top = '10%'; // Posisi awal karakter
        karakterPemainEl.style.left = '5%';

        milestones.forEach(el => {
            el.classList.remove('completed');
            el.style.backgroundColor = '';
            el.dataset.completed = '';
        });

        hasilModalEl.style.display = 'none';
        initGame();
    }

    function initGame() {
        milestones.forEach((el, index) => {
            const milestone = milestoneData.find(m => m.id === el.id);
            if (index > 0) {
                el.classList.add('locked');
            } else {
                el.classList.remove('locked');
                el.addEventListener('click', () => tampilkanPertanyaan(milestone), { once: true });
            }
        });
    }

    mainLagiBtn.addEventListener('click', resetGame);
    initGame();
});