// 1. Inisialisasi Supabase
const SUPABASE_URL = 'https://dbxitmogfmxnlifidtmk.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRieGl0bW9nZm14bmxpZmlkdG1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNDI5MDQsImV4cCI6MjA4ODYxODkwNH0.pMg2WxwN8L-Tlb5tqgzC32-OPNgaY07K9Ud8OyCICw4'; 
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. Data Cerita
const storyData = {
    cerita1: {
        title: "Cerita berawal dari...",
        desc: "Cerita Berawal dari Kebutuhan akan bantuan dalam pekerjaan membuat Destra harus mencari kandidat tambahan..."
    },
    cerita2: {
        title: "Keinginan untuk mengenal",
        desc: "Pada 26 Oktober 2023, Destra memutuskan memberanikan diri mengajak Wyvanny bercengkrama..."
    },
    cerita3: {
        title: "Keadaan memperkuat keyakinan",
        desc: "Setelah pertemuan itu berlangsung Destra dan Wyvanny semakin dekat secara pribadi..."
    },
    cerita4: {
        title: "Kebahagiaan atas penerimaan",
        desc: "Yakin mereka menciptakan perencanaan demi perencanaan, pertimbangan demi pertimbangan..."
    }
};

// 3. Script Utama (DOMContentLoaded)
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('nasheed');
    const musicBtn = document.getElementById("music-btn");
    const cover = document.querySelector(".hero");
    const mainContent = document.getElementById("main-invitation");

    // Fungsi Buka Undangan
    window.openInvitation = function () {
        if (audio) {
            audio.play().catch(() => console.log("Autoplay blocked."));
        }
        if (mainContent) mainContent.style.display = "block";
        if (musicBtn) musicBtn.style.display = "flex";
        if (cover) {
            cover.classList.add("slide-up");
            setTimeout(() => {
                document.body.classList.remove("locked");
                cover.style.display = "none";
            }, 1000);
        }
    };

    // Toggle Musik
    window.toggleMusic = function () {
        if (!audio) return;
        if (audio.paused) {
            audio.play();
            musicBtn.innerText = "🎵";
        } else {
            audio.pause();
            musicBtn.innerText = "🔇";
        }
    };

    // Load Wishes dari Supabase
    loadWishes();
    
    // Jalankan Autoscroll
    startAutoScroll();
});

// 4. Fitur Countdown
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

// 5. Fitur Modal Story
window.openStory = function(id) {
    const modal = document.getElementById("story-modal");
    document.getElementById("modal-title").innerText = storyData[id].title;
    document.getElementById("modal-desc").innerText = storyData[id].desc;
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
};

window.closeStory = function() {
    document.getElementById("story-modal").style.display = "none";
    document.body.style.overflow = "auto";
};

// 6. Fitur Wish & Supabase
async function loadWishes() {
    const wishDisplay = document.getElementById('wish-display-container');
    const { data, error } = await _supabase
        .from('wish') 
        .select('nama, ucapan')
        .order('created_at', { ascending: false });

    if (error) return console.error(error);

    wishDisplay.innerHTML = '';
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'wish-item';
        div.innerHTML = `<h4>${item.nama}</h4><p>${item.ucapan}</p>`;
        wishDisplay.appendChild(div);
    });
}

const wishForm = document.getElementById('wish-form');
wishForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nama = document.getElementById('nama').value;
    const ucapan = document.getElementById('ucapan').value;
    const submitBtn = wishForm.querySelector('button');

    submitBtn.disabled = true;
    submitBtn.innerText = 'Mengirim...';

    const { error } = await _supabase.from('wish').insert([{ nama, ucapan }]);

    if (error) {
        alert('Gagal: ' + error.message);
    } else {
        wishForm.reset();
        loadWishes();
    }
    submitBtn.disabled = false;
    submitBtn.innerText = 'Kirim Ucapan';
});

// 7. Autoscroll Ucapan
let isUserScrolling = false;
function startAutoScroll() {
    const container = document.getElementById('wish-display-container');
    setInterval(() => {
        if (!isUserScrolling) {
            container.scrollTop += 1;
            if (container.scrollTop >= (container.scrollHeight - container.offsetHeight)) {
                container.scrollTop = 0;
            }
        }
    }, 40);
}

// 8. Fitur Copy Rekening (Fixed)
function showCopyFeedback(btn) {
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

window.copyAction = function(btn) {
    const norek = btn.getAttribute('data-rekening');
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(norek).then(() => showCopyFeedback(btn));
    } else {
        const textArea = document.createElement("textarea");
        textArea.value = norek;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showCopyFeedback(btn);
        } catch (err) {
            alert('Gagal menyalin');
        }
        document.body.removeChild(textArea);
    }
};
