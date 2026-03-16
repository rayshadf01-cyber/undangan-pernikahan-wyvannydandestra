// Gunakan DOMContentLoaded supaya script nunggu HTML siap dulu
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('nasheed');
    const musicBtn = document.getElementById("music-btn");
    const cover = document.querySelector(".hero");
    const mainContent = document.getElementById("main-invitation");

    // Fungsi Buka Undangan
    window.openInvitation = function () {
        // 1. Jalankan Musik dengan penanganan error (Promise)
        if (audio) {
            audio.play().catch(error => {
                console.log("Autoplay dicegah, musik akan jalan setelah interaksi.");
            });
        }

        // 2. Munculkan Konten & Tombol Musik
        if (mainContent) mainContent.style.display = "block";
        if (musicBtn) musicBtn.style.display = "flex";

        // 3. Animasi Cover
        if (cover) {
            cover.classList.add("slide-up");

            // Tunggu animasi selesai (1 detik sesuai durasi CSS)
            setTimeout(() => {
                document.body.classList.remove("locked");
                cover.style.display = "none"; // Hapus dari DOM biar enteng
            }, 1000);
        }
    };

    // Fungsi Toggle Musik (Jeda/Putar)
    window.toggleMusic = function () {
        if (!audio) return;

        if (audio.paused) {
            audio.play();
            musicBtn.innerText = "🎵";
            musicBtn.classList.remove('paused'); // Opsional jika ada CSS animasi
        } else {
            audio.pause();
            musicBtn.innerText = "🔇";
            musicBtn.classList.add('paused');
        }
    };
});

// Countdown
const targetDate = new Date("March 28, 2026 09:00:00").getTime();
setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;
    if (distance < 0) return;

    document.getElementById('days').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.getElementById('hours').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById('mins').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById('secs').innerText = Math.floor((distance % (1000 * 60)) / 1000);
}, 1000);

function sendToWA(tujuan) {
    const nama = document.getElementById('nama').value;
    const ucapan = document.getElementById('ucapan').value;
    if (!nama || !ucapan) {
        alert("Isi nama dan ucapan dulu!");
        return;
    }

    const noWanita = "6281268184765";
    const noPria = "6282297577745";
    const nomorTujuan = (tujuan === 'wanita') ? noWanita : noPria;
    const targetNama = (tujuan === 'wanita') ? "Wyvanny" : "Destra";

    const pesan = `Halo ${targetNama}, saya *${nama}*.\n\nBerikut ucapan & doa restu saya:\n"${ucapan}"`;
    window.open(`https://api.whatsapp.com/send?phone=${nomorTujuan}&text=${encodeURIComponent(pesan)}`, '_blank');
}
// Data Cerita (Ganti isinya sesuai keinginan lu)
const storyData = {
    cerita1: {
        title: "Cerita berawal dari...",
        desc: "Cerita Berawal dari Kebutuhan akan bantuan dalam pekerjaan membuat Destra harus mencari kandidat tambahan dan saat itu diputuskan 3 kandidat yang akan diwawancarai Destra. Sesi wawancara dan penilaian atas dokumen lamaran dilakukan Destra ke semua kandidatnya, namun ada 1 perempuan berkerudung yang berhasil memikat perhatian Destra. Setelah diskusi panjang dikantor akhirnya tanggal 28 April 2022 si perempuan berkerudung tersebutlah yang dipilih untuk menjadi rekan kerja Destra………. yaitu Wyvanny Della Hari demi hari dilalui Destra dan Wyvanny selama 2 tahun bersama secara profesional. Keadaan senang, sulit, jenuh, perdebatan dan diskusi kerja di kantor mereka lalui. Tanpa mereka sadari secara personal mereka ternyata sering bercerita tentang pengalamannya, permasalahan hidup, pandangan hidup dan saling menceritakan hayalan masa depan yang diimpikan membuat mereka semakin mengenal satu sama lain dan tak terasa ada rasa yang tumbuh diantara mereka."
    },
    cerita2: {
        title: "Keinginan untuk mengenal",
        desc: "Pada 26 Oktober 2023, Destra memutuskan memberanikan diri mengajak Wyvanny bercengkrama untuk saling mengenal lebih dalam satu sama lain, namun pada hari itu Destra melihat keragu-raguan di mata Wyvanny. Tanpa Destra sadari Wyvanny juga ingin mengenal Destra lebih jauh lagi tapi masalah yang Wyvanny hadapi saat itu membuatnya takut untuk menerima ajakan tersebut. Sore hari pada 01 April 2024 disaat libur lebaran terlintas nama Wyvanny dikepala Destra yang membuatnya menghubungi Wyvanny dan ternyata Destra datang diwaktu yang sangat tepat. Percakapan yang menenangkan dihari itu membuat Wyvanny berani untuk membuka kesempatan kepada Destra dan mengesampingkan ketakutan akan keadaan kedepannya.  Setibanya Wyvanny kembali dari kampung halamannya ditanggal 18 April 2024, Destra mengajak Wyvanny bertemu di sebuah restoran di tengah kota Jakarta pada jam pulang kantor, awalnya mereka berbincang dengan canggung namun seiring waktu berjalan mereka merasakan kenyamanan untuk saling membuka cerita tentang diri mereka masing-masing. Cerita keburukan, ketakutan dan masalah yang sedang dijalani mereka ungkap pada malam itu, namun hal itu bukannya membuat mereka pergi tapi menjadi awal keyakinan yang tumbuh diantara mereka."
    },
    cerita3: {
        title: "Keadaan memperkuat keyakinan",
        desc: "Setelah pertemuan itu berlangsung Destra dan Wyvanny semakin dekat secara pribadi melalui setiap bahagia dan suka bersama namun dibalik setiap kebahagiaan bersama terdapat kesulitan menimpa mereka yang membawa mereka untuk saling menguatkan satu sama lain. Dalam keadaan yang pelik mereka lalui tanpa mereka sadari membuat keyakinan dan kepercayaan mereka semakin kuat. Bagaimana sifat kepemimpinan dan bertanggung jawab Destra dapat ditangkap oleh Wyvanny dan bagaimana kesabaran dan dukungan Wyvanny yang dapat ditangkap oleh Destra. Badai yang telah mereka lalui itu menguatkan keyakinan mereka untuk memantapkan diri untuk bersama sehingga pada tanggal 19 Juli 2024 mereka menetapkan tanggal itu sebagai awal dari cerita perjuangan bersama mereka. Perasaan dan keyakinan mereka semakin kuat, namun jalan tidak selalu mulus pasti selalu ada hambatan yang datang menghadang. Yakin sudah pasti tapi rasa ragu tidak bisa dibohongi, Masjid Sunda Kelapa menjadi saksi sujud dan doa mereka kala itu ditanggal 22 Maret 2025 tepatnya malam bulan Ramadhan yang mereka harap malam itu adalah malam lailatul qadar. Allah menunjukkan kebesarannya kepada mereka dengan mengabulkan setiap doa yang mereka panjatkan dan dengan perjuangan bersama yang mereka lakukan mereka mampu memecahkan setiap keraguan yang ada."
    },
    cerita4: {
        title: "Kebahagiaan atas penerimaan",
        desc: "Yakin mereka menciptakan perencanaan demi perencanaan, pertimbangan demi pertimbangan dan keinginan demi keinginan. Kerja keras Destra lakukan dukungan Wyvanny berikan. Sampai waktu itu tiba, 19 Juli 2025 di lantai 46 The Plaza Office Tower sebuah cincin dan seikat bunga Destra berikan kepada Wyvanny sebagai bentuk keseriusan Destra kepada Wyvanny dan anggukan dengan senyum beserta tetesan air mata kebahagiaan diberikan Wyvanny sebagai bentuk ketulusan dan yakinnya Wyvanny kepada Destra. Mereka yakin semua rintangan dan hambatan akan mereka  hadapi dan lewati bersama. Perjuangan, perencanaan dan tujuan mereka semakin matang. Hingga hari itu tiba, 14 September 2025, bukan tentang ulang tahun Wyvanny kali ini tapi hari itu menjadi hari untuk membuktikan seberapa besar keseriusan mereka. Destra terbang melintasi pulau jawa menuju pulau Sumatera, bersama Wyvanny membawa harapan dan keberanian bersama mereka untuk meminta restu ibunda Wyvanny tercinta. Memperkenalkan Destra diawal menjadi tugas Wyvanny, namun selanjutnya menjadi tugas Destra bagaimana ia menyampaikan maksud dan tujuannya serta meminta restu dan doa ke ibunda tercinta Wyvanny. Rumah ke rumah Destra datangi untuk menyampaikan keinginan dan keyakinan Destra untuk bersama Wyvanny, hingga mereka akhirnya mendapatkan restu dan dukungan dari sanak keluarga Wyvanny. Wyvanny dan Destra menyadari bahwa hubungan diantara mereka tidak hanya menyatuka mereka sebagai insan namun juga membangun hubungan harmonis antara keluarga masing-masing. Pada tanggal 23 November 2025 pertemuan antar keluargapun terjadi, tidak bisa dipungkiri kemahiran Destra berbicara seketika redup dengan gugupnya pada acara pertemuan tersebut. Destra secara langsung didepan seluruh keluarga meminang Wyvanny untuk dijadikan sebagai istri, teman hidup dan pendamping dunia akhiratnya. “Ya, mami selaku ibunya Vanny merestuinya” itulah kalimat yang disampaikan Ibunda Wyvanny dan mampu menghangatkan hati serta menerbangkan kegelisahan selama ini yang bersarang di diri Wyvanny dan Destra. suka duka kalian berdua pas lagi bareng-bareng."
    },

};

function openStory(id) {
    const modal = document.getElementById("story-modal");
    const title = document.getElementById("modal-title");
    const desc = document.getElementById("modal-desc");

    // Masukin data teksnya
    title.innerText = storyData[id].title;
    desc.innerText = storyData[id].desc;

    // Reset posisi scroll modal ke atas setiap kali dibuka
    modal.scrollTop = 0;

    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Kunci background
}

function closeStory() {
    const modal = document.getElementById("story-modal");
    modal.style.display = "none";

    // Balikin scroll body asal bukan lagi di halaman Hero (Cover)
    if (!document.body.classList.contains('locked')) {
        document.body.style.overflow = "auto";
    }
}

// Tutup modal kalau user klik di luar kotak
window.onclick = function (event) {
    const modal = document.getElementById("story-modal");
    if (event.target == modal) {
        closeStory();
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const wishForm = document.getElementById('wish-form');
    const wishDisplay = document.getElementById('wish-display-container');

    // Fungsi untuk menampilkan semua ucapan
    function displayWishes() {
        const wishes = JSON.parse(localStorage.getItem('weddingWishes')) || [];
        wishDisplay.innerHTML = '';

        // Tampilkan dari yang paling baru (paling atas)
        wishes.reverse().forEach(data => {
            const wishDiv = document.createElement('div');
            wishDiv.className = 'wish-item';
            wishDiv.innerHTML = `
                <h4>${data.nama}</h4>
                <p>${data.ucapan}</p>
            `;
            wishDisplay.appendChild(wishDiv);
        });
    }

    // Jalankan saat pertama kali load
    displayWishes();

    // Event saat tombol Kirim diklik
    wishForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Mencegah reload halaman

        const nama = document.getElementById('nama').value;
        const ucapan = document.getElementById('ucapan').value;
setTimeout(() => {
        wishDisplay.scrollTo({
            top: wishDisplay.scrollHeight, // Ini yang bikin dia ke paling bawah
            behavior: 'smooth'             // Biar geraknya halus
        });
    }, 100);
        // Simpan ke localStorage
        const wishes = JSON.parse(localStorage.getItem('weddingWishes')) || [];
        wishes.push({
            nama,
            ucapan
        });
        localStorage.setItem('weddingWishes', JSON.stringify(wishes));

        // Reset form & update tampilan
        wishForm.reset();
        displayWishes();
    });
});
const container = document.getElementById('wish-display-container');
let isUserScrolling = false;
let autoScrollInterval;

function startAutoScroll() {
    // Bersihkan interval lama biar gak tumpang tindih
    clearInterval(autoScrollInterval);
    
    autoScrollInterval = setInterval(() => {
        // Hanya jalan kalau user GAK LAGI nge-scroll manual
        if (!isUserScrolling) {
            container.scrollTop += 1; // Kecepatan 1px

            // Jika sampai bawah, reset ke atas pelan-pelan
            if (container.scrollTop >= (container.scrollHeight - container.offsetHeight)) {
                container.scrollTop = 0;
            }
        }
    }, 40); // 40ms = pergerakan halus
}

// Deteksi saat jari nempel (User mulai scroll manual)
container.addEventListener('touchstart', () => {
    isUserScrolling = true;
});

// Deteksi saat jari lepas (Kasih jeda 2 detik baru autoscroll jalan lagi)
container.addEventListener('touchend', () => {
    setTimeout(() => {
        isUserScrolling = false;
    }, 2000); 
});

// Buat di Laptop (Mouse)
container.addEventListener('mouseenter', () => isUserScrolling = true);
container.addEventListener('mouseleave', () => isUserScrolling = false);


const form = document.getElementById('wish-form');

form.addEventListener('submit', e => {
    e.preventDefault();
    const submitBtn = form.querySelector('button');
    submitBtn.disabled = true;
    submitBtn.innerText = 'Mengirim...';

    // Ambil data dari input
    const body = {
        nama: document.getElementById('nama').value,
        ucapan: document.getElementById('ucapan').value
    };

    fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(body)
    })
    .then(res => {
        alert('Terima kasih atas ucapannya!');
        form.reset();
        loadWishes(); // Fungsi buat nampilin ulang list ucapan
    })
    .catch(error => console.error('Error!', error.message))
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Kirim Ucapan';
    });
});
// Jalankan fungsi

startAutoScroll();
// 1. PASTIKAN KEY-NYA DIAWALI DENGAN 'eyJh...'
const SUPABASE_URL = 'https://dbxitmogfmxnlifidtmk.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRieGl0bW9nZm14bmxpZmlkdG1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNDI5MDQsImV4cCI6MjA4ODYxODkwNH0.pMg2WxwN8L-Tlb5tqgzC32-OPNgaY07K9Ud8OyCICw4'; 
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadWishes() {
    const wishDisplay = document.getElementById('wish-display-container');
    if (!wishDisplay) return;

    // Pakai 'wish' sesuai nama tabel lo di dashboard
    const { data, error } = await _supabase
        .from('wish') 
        .select('nama, ucapan')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Gagal ambil data:", error.message);
        return;
    }

    wishDisplay.innerHTML = '';
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'wish-item';
        div.innerHTML = `<h4>${item.nama}</h4><p>${item.ucapan}</p>`;
        wishDisplay.appendChild(div);
    });
}

const wishForm = document.getElementById('wish-form');
if (wishForm) {
    wishForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nama = document.getElementById('nama').value;
        const ucapan = document.getElementById('ucapan').value;
        const submitBtn = wishForm.querySelector('button');

        submitBtn.disabled = true;
        submitBtn.innerText = 'Mengirim...';

        // DI SINI TADI LO TYPO 'wishes', GANTI JADI 'wish'
        const { error } = await _supabase
            .from('wish') 
            .insert([{ nama, ucapan }]);

        if (error) {
            alert('Gagal kirim: ' + error.message);
        } else {
            alert('Ucapan berhasil terkirim!');
            wishForm.reset();
            loadWishes(); 
        }

        submitBtn.disabled = false;
        submitBtn.innerText = 'Kirim Ucapan';
    });
}

// Jangan lupa panggil loadWishes pas halaman beres loading
document.addEventListener('DOMContentLoaded', loadWishes);

function copyAction(btn) {
    // Ambil angka dari atribut data-rekening
    const norek = btn.getAttribute('data-rekening');
    
    // Gunakan cara TextArea (paling ampuh untuk semua jenis HP)
    const el = document.createElement('textarea');
    el.value = norek;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    
    const selected = document.getSelection().rangeCount > 0 
        ? document.getSelection().getRangeAt(0) 
        : false;
        
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
    }

    // Efek Visual Tombol
    const originalText = btn.innerHTML;
    btn.innerHTML = "Copied!";
    btn.style.background = "#d4af37";
    btn.style.color = "#3d0303";

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = "rgba(255, 255, 255, 0.1)";
        btn.style.color = "white";
    }, 2000);
}

