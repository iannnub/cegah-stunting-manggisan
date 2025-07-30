// Menunggu hingga seluruh konten halaman dimuat sebelum menjalankan script
document.addEventListener('DOMContentLoaded', () => {

    // --- BANK SOAL LENGKAP ---
    // Total 10 pertanyaan. Anda bisa menambahkannya lagi di sini.
    const bankSoal = [
        {
            question: 'Saat hamil, Ibu sering mual. Apa yang sebaiknya dilakukan?',
            options: [
                { text: 'Makan dalam porsi besar 2x sehari', img: 'Asset/21.svg', isCorrect: false },
                { text: 'Makan porsi kecil tapi sering', img: 'Asset/22.svg', isCorrect: true }
            ],
            feedback: 'Makan dalam porsi kecil tapi sering dapat membantu menjaga kadar gula darah stabil dan mengurangi rasa mual.'
        },
        {
            question: 'Apa manfaat utama Imunisasi Lengkap bagi bayi?',
            options: [
                { text: 'Membuat bayi cepat gemuk', img: 'images/pilihan-bayi-gemuk.png', isCorrect: false },
                { text: 'Melindungi dari penyakit berbahaya', img: 'images/pilihan-imunisasi.png', isCorrect: true }
            ],
            feedback: 'Imunisasi membentuk kekebalan tubuh untuk melawan berbagai penyakit menular yang berbahaya bagi bayi dan anak.'
        },
        {
            question: 'Bagaimana tekstur MPASI yang tepat untuk bayi usia 6 bulan?',
            options: [
                { text: 'Bubur Saring yang Halus (Puree)', img: 'images/resep-puree-alpukat.jpg', isCorrect: true },
                { text: 'Nasi Tim dengan Cincangan Kasar', img: 'images/resep-nasi-tim.jpg', isCorrect: false }
            ],
            feedback: 'Bayi usia 6 bulan baru belajar menelan, sehingga dimulai dengan tekstur bubur yang sangat halus (puree).'
        },
        {
            question: 'Kapan waktu terpenting untuk mencuci tangan pakai sabun?',
            options: [
                { text: 'Hanya setelah bermain di luar', img: 'images/pilihan-main-tanah.png', isCorrect: false },
                { text: 'Sebelum menyiapkan makan & setelah dari toilet', img: 'images/pilihan-cuci-tangan.png', isCorrect: true }
            ],
            feedback: 'Mencuci tangan di waktu-waktu kunci sangat efektif mencegah kuman penyebab diare yang bisa menghambat penyerapan gizi.'
        },
        {
            question: 'Bagaimana cara terbaik memantau pertumbuhan anak?',
            options: [
                { text: 'Rutin ke Posyandu setiap bulan', img: 'images/pilihan-posyandu.png', isCorrect: true },
                { text: 'Membandingkan dengan anak tetangga', img: 'images/pilihan-bandingkan-anak.png', isCorrect: false }
            ],
            feedback: 'Dengan rutin ke Posyandu, pertumbuhan anak akan dipantau menggunakan grafik standar, sehingga masalah bisa terdeteksi sejak dini.'
        },
        {
            question: 'Mana sumber protein hewani terbaik untuk MPASI?',
            options: [
                { text: 'Hati Ayam', img: 'Asset/22.svg', isCorrect: true },
                { text: 'Tahu dan Tempe', img: 'Asset/21.svg', isCorrect: false }
            ],
            feedback: 'Hati ayam kaya akan zat besi yang sangat mudah diserap tubuh, penting untuk mencegah anemia pada bayi.'
        },
        {
            question: 'Zat gizi apa yang penting untuk mencegah cacat lahir pada janin?',
            options: [
                { text: 'Vitamin C', img: 'images/pilihan-imunisasi.png', isCorrect: false },
                { text: 'Asam Folat', img: 'images/pilihan-posyandu.png', isCorrect: true }
            ],
            feedback: 'Asam folat sangat krusial di awal kehamilan untuk perkembangan otak dan tulang belakang janin yang sehat.'
        },
        {
            question: 'Untuk mencegah infeksi cacing, apa yang perlu dipastikan?',
            options: [
                { text: 'Memakai alas kaki saat bermain di tanah', img: 'images/pilihan-cuci-tangan.png', isCorrect: true },
                { text: 'Minum susu setiap hari', img: 'images/pilihan-bayi-gemuk.png', isCorrect: false }
            ],
            feedback: 'Memakai alas kaki dapat mencegah larva cacing masuk melalui kulit kaki, salah satu penyebab infeksi cacingan.'
        },
        {
            question: 'Jika anak GTM (Gerakan Tutup Mulut), apa yang sebaiknya dilakukan?',
            options: [
                { text: 'Memaksa anak untuk makan', img: 'images/pilihan-bandingkan-anak.png', isCorrect: false },
                { text: 'Membuat jadwal makan teratur & suasana menyenangkan', img: 'images/pilihan-makan-kecil.png', isCorrect: true }
            ],
            feedback: 'Memaksa makan bisa membuat anak trauma. Ciptakan suasana makan yang positif dan jadwal yang teratur.'
        },
        {
            question: 'Mana minuman yang sebaiknya DIHINDARI oleh balita?',
            options: [
                { text: 'Teh Manis atau Minuman Kemasan', img: 'Asset/21.svg', isCorrect: true },
                { text: 'Air Putih Matang', img: 'images/resep-puree-alpukat.jpg', isCorrect: false }
            ],
            feedback: 'Minuman manis mengandung banyak gula yang tidak baik untuk gigi dan bisa membuat anak kenyang sebelum makan makanan bergizi.'
        }
    ];

    // --- VARIABEL & ELEMEN DOM ---
    let skorBintang = 0;
    let currentMilestoneIndex = 0;
    let pertanyaanSaatIni = []; // Variabel untuk menyimpan 5 pertanyaan yang diacak

    const skorBintangEl = document.getElementById('skor-bintang');
    const karakterPemainEl = document.getElementById('karakter-pemain');
    const milestones = document.querySelectorAll('.milestone');
    const modalEl = document.getElementById('pertanyaan-modal');
    const modalJudulEl = document.getElementById('judul-pertanyaan');
    const modalPilihanEl = document.getElementById('pilihan-jawaban');
    const modalFeedbackEl = document.getElementById('feedback-jawaban');
    const hasilModalEl = document.getElementById('hasil-akhir-modal');
    const pesanHasilEl = document.getElementById('pesan-hasil-akhir');
    const skorFinalEl = document.getElementById('skor-final');
    const mainLagiBtn = document.getElementById('main-lagi-btn');
    const suaraBenar = document.getElementById('suara-benar');
    const suaraSalah = document.getElementById('suara-salah');

    // --- FUNGSI-FUNGSI ---

    function acakArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function siapkanPertanyaan() {
        acakArray(bankSoal);
        pertanyaanSaatIni = bankSoal.slice(0, 5);

        pertanyaanSaatIni.forEach((soal, index) => {
            const milestoneEl = milestones[index];
            soal.id = milestoneEl.id;
            soal.position = {
                top: milestoneEl.style.top,
                left: milestoneEl.style.left
            };
        });
    }

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
            try { suaraBenar.play(); } catch(e) {}
        } else {
            elemenPilihan.classList.add('incorrect');
            document.getElementById(milestone.id).dataset.completed = 'false';
            try { suaraSalah.play(); } catch(e) {}
        }

        setTimeout(() => {
            skorBintangEl.parentElement.classList.remove('bintang-pop');
        }, 500);

        setTimeout(() => {
            modalEl.style.display = 'none';
            lanjutkanPetualangan(milestone.id);
        }, 3000);
    }

    function lanjutkanPetualangan(completedMilestoneId) {
        const milestoneEl = document.getElementById(completedMilestoneId);
        if (milestoneEl.dataset.completed === 'true') {
            milestoneEl.classList.add('completed-true');
        } else {
            milestoneEl.classList.add('completed-false');
        }

        const dataMilestone = pertanyaanSaatIni.find(m => m.id === completedMilestoneId);
        if (dataMilestone) {
            karakterPemainEl.style.top = dataMilestone.position.top;
            karakterPemainEl.style.left = dataMilestone.position.left;
        }

        currentMilestoneIndex++;
        if (currentMilestoneIndex < pertanyaanSaatIni.length) {
            const nextMilestoneId = pertanyaanSaatIni[currentMilestoneIndex].id;
            const nextMilestoneEl = document.getElementById(nextMilestoneId);
            nextMilestoneEl.classList.remove('locked');
            nextMilestoneEl.addEventListener('click', () => tampilkanPertanyaan(pertanyaanSaatIni[currentMilestoneIndex]), { once: true });
        } else {
            setTimeout(tampilkanHasilAkhir, 1500);
        }
    }

    function tampilkanHasilAkhir() {
        pesanHasilEl.textContent = "Anda telah mempelajari langkah-langkah penting untuk mencegah stunting!";
        skorFinalEl.innerHTML = `Skor Anda: <span>${skorBintang} / ${pertanyaanSaatIni.length}</span> Bintang Gizi ⭐`;
        hasilModalEl.style.display = 'block';
    }
    
    function resetGame() {
        skorBintang = 0;
        currentMilestoneIndex = 0;
        skorBintangEl.textContent = '0';
        
        karakterPemainEl.style.top = '88%';
        karakterPemainEl.style.left = '2%';

        milestones.forEach(el => {
            el.classList.remove('completed-true', 'completed-false', 'locked');
            // Hapus event listener lama agar bisa ditambahkan lagi
            const newEl = el.cloneNode(true);
            el.parentNode.replaceChild(newEl, el);
        });

        hasilModalEl.style.display = 'none';
        initGame();
    }

    function initGame() {
        siapkanPertanyaan();
        
        const newMilestones = document.querySelectorAll('.milestone');
        newMilestones.forEach((el, index) => {
            if (index > 0) {
                el.classList.add('locked');
            } else {
                el.classList.remove('locked');
                el.addEventListener('click', () => tampilkanPertanyaan(pertanyaanSaatIni[0]), { once: true });
            }
        });
    }

    mainLagiBtn.addEventListener('click', resetGame);
    initGame();
});