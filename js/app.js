'use strict';

/* ═══════════════════════════════════════
   LOADER
═══════════════════════════════════════ */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader')?.classList.add('gone'), 1800);
});
setTimeout(() => document.getElementById('loader')?.classList.add('gone'), 3000);

/* ═══════════════════════════════════════
   CURSOR
═══════════════════════════════════════ */
(function () {
  const dot = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;
  document.addEventListener('mousemove', e => {
    dot.style.left = ring.style.left = e.clientX + 'px';
    dot.style.top  = ring.style.top  = e.clientY + 'px';
  });
  document.addEventListener('mousedown', () => {
    dot.style.transform  = 'translate(-50%,-50%) scale(1.8)';
    ring.style.transform = 'translate(-50%,-50%) scale(0.7)';
  });
  document.addEventListener('mouseup', () => {
    dot.style.transform = ring.style.transform = 'translate(-50%,-50%) scale(1)';
  });
})();

/* ═══════════════════════════════════════
   SCROLL PROGRESS
═══════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const bar = document.getElementById('prog');
  if (!bar) return;
  const max = document.body.scrollHeight - window.innerHeight;
  bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
});

/* ═══════════════════════════════════════
   NAV SCROLL SHADOW
═══════════════════════════════════════ */
window.addEventListener('scroll', () => {
  document.getElementById('nav')?.classList.toggle('scrolled', window.scrollY > 10);
});

/* ═══════════════════════════════════════
   HAMBURGER
═══════════════════════════════════════ */
window.toggleMenu = function () {
  document.getElementById('hb')?.classList.toggle('open');
  document.getElementById('mobnav')?.classList.toggle('open');
};

/* ═══════════════════════════════════════
   SMOOTH SCROLL TO SECTION
═══════════════════════════════════════ */
window.goTo = function (id) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
  document.getElementById('hb')?.classList.remove('open');
  document.getElementById('mobnav')?.classList.remove('open');
};

/* ═══════════════════════════════════════
   ACTIVE NAV ON SCROLL (IntersectionObserver)
═══════════════════════════════════════ */
(function () {
  const ids = ['hero','about','services','portfolio','projects','blog','contact'];
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        document.querySelectorAll('[data-sec]').forEach(b => {
          b.classList.toggle('on', b.dataset.sec === e.target.id);
        });
      }
    });
  }, { rootMargin: '-35% 0px -60% 0px' });

  document.addEventListener('DOMContentLoaded', () => {
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
  });
})();

/* ═══════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el => obs.observe(el));

  // skill bars
  const bobs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); bobs.unobserve(e.target); } });
  }, { threshold: 0.3 });
  document.querySelectorAll('.sb-fill').forEach(b => bobs.observe(b));
});

/* ═══════════════════════════════════════
   BACK TO TOP
═══════════════════════════════════════ */
window.addEventListener('scroll', () => {
  document.getElementById('btt')?.classList.toggle('on', window.scrollY > 500);
});
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btt')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});

/* ═══════════════════════════════════════
   DARK / LIGHT THEME
═══════════════════════════════════════ */
(function () {
  const saved = localStorage.getItem('reza-theme') || 'dark';
  if (saved === 'light') document.body.classList.add('light');
  updateThemeIcon();
})();

function updateThemeIcon() {
  const light = document.body.classList.contains('light');
  ['thbtn', 'thbtn2'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.textContent = light ? '🌙' : '☀️'; el.title = light ? 'Dark mode' : 'Light mode'; }
  });
}
window.toggleTheme = function () {
  document.body.classList.toggle('light');
  localStorage.setItem('reza-theme', document.body.classList.contains('light') ? 'light' : 'dark');
  updateThemeIcon();
};

/* ═══════════════════════════════════════
   TYPEWRITER
═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('tw');
  if (!el) return;
  const words = ['IT Specialist.', 'Web Developer.', 'Problem Solver.', 'Freelancer.'];
  let wi = 0, ci = 0, del = false;
  function tick() {
    const w = words[wi];
    el.textContent = del ? w.slice(0, --ci) : w.slice(0, ++ci);
    let ms = del ? 60 : 110;
    if (!del && ci === w.length)  { ms = 1800; del = true; }
    else if (del && ci === 0)     { del = false; wi = (wi + 1) % words.length; ms = 400; }
    setTimeout(tick, ms);
  }
  setTimeout(tick, 1400);
});

/* ═══════════════════════════════════════
   TOAST
═══════════════════════════════════════ */
function toast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('on');
  setTimeout(() => t.classList.remove('on'), 3800);
}

/* ═══════════════════════════════════════
   ORDER MODAL
═══════════════════════════════════════ */
window.openOrder = function (name, price) {
  document.getElementById('m-ttl').textContent = 'Order: ' + name;
  document.getElementById('m-price').textContent = price;
  document.getElementById('m-ov').classList.add('on');
  document.body.style.overflow = 'hidden';
};
window.closeOrder = function () {
  document.getElementById('m-ov').classList.remove('on');
  document.body.style.overflow = '';
};
window.submitOrder = function () {
  const name  = document.getElementById('o-name').value.trim();
  const email = document.getElementById('o-email').value.trim();
  if (!name || !email) { toast('⚠️ Isi nama dan email dulu ya!'); return; }
  closeOrder();
  toast('✅ Order terkirim! Saya akan hubungi kamu dalam 24 jam.');
  ['o-name','o-email','o-phone','o-desc'].forEach(id => { const e = document.getElementById(id); if (e) e.value = ''; });
};
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('m-ov')?.addEventListener('click', e => { if (e.target === e.currentTarget) closeOrder(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeOrder(); closeBlog(); } });
});

/* ═══════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════ */
window.submitForm = function () {
  const name  = document.getElementById('cf-n').value.trim();
  const email = document.getElementById('cf-e').value.trim();
  const msg   = document.getElementById('cf-m').value.trim();
  if (!name || !email || !msg) { toast('⚠️ Mohon isi semua kolom wajib ya!'); return; }
  toast('✅ Pesan terkirim! Saya akan balas dalam 24 jam.');
  ['cf-n','cf-e','cf-s','cf-m'].forEach(id => { const e = document.getElementById(id); if (e) e.value = ''; });
};

/* ═══════════════════════════════════════
   PROJECT FILTER
═══════════════════════════════════════ */
window.filterProj = function (cat, btn) {
  document.querySelectorAll('.flt').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.pj-card').forEach(c => {
    c.style.display = (cat === 'all' || c.dataset.cat === cat) ? '' : 'none';
  });
};

/* ═══════════════════════════════════════
   BLOG READER
═══════════════════════════════════════ */
const posts = [
  { id:1, emoji:'⚡', tag:'Performance', title:'How I Cut Website Load Time from 4.3s to 1.1s',
    date:'Jan 2025', time:'5 min read',
    body:`<p>Ketika klien mengeluhkan websitenya "terasa lambat", saya langsung cek PageSpeed Insights. Hasilnya? Load time 4.3 detik dan skor performa 38. Ini cara saya memperbaikinya.</p>
    <h3>Step 1: Convert Gambar ke WebP</h3>
    <p>Keuntungan terbesar dari optimasi gambar. Website ini punya 12 file PNG dengan total 8.4MB. Setelah dikonversi ke WebP menggunakan Squoosh, ukurannya turun jadi hanya 1.2MB — pengurangan 85% tanpa kehilangan kualitas yang terlihat.</p>
    <h3>Step 2: Minifikasi CSS dan JavaScript</h3>
    <p>Website ini punya banyak file CSS dan JS yang tidak diminifikasi. Menggunakan online minifier dan menggabungkan file menjadi bundle tunggal mengurangi HTTP request dari 18 menjadi 4. Ini saja menghemat 0.8 detik.</p>
    <h3>Step 3: Implementasi Lazy Loading</h3>
    <p>Menambahkan atribut loading="lazy" ke semua gambar di bawah fold. Browser hanya memuat gambar ketika akan masuk viewport, mengurangi berat halaman awal secara dramatis.</p>
    <h3>Step 4: Browser Caching Headers</h3>
    <p>Menambahkan cache-control header via .htaccess agar pengunjung yang kembali memuat aset dari cache lokal mereka, bukan dari server. Untuk website dengan pengunjung tetap, ini keuntungan besar.</p>
    <h3>Hasil Akhir</h3>
    <p>Load time turun dari 4.3s ke 1.1s. Skor performa naik dari 38 ke 97. Klien sangat puas, dan bounce rate turun 31% di bulan berikutnya.</p>` },
  { id:2, emoji:'🔒', tag:'IT Security', title:'Basic Network Security Checklist untuk Kantor Kecil',
    date:'Dec 2024', time:'7 min read',
    body:`<p>Setelah mengaudit lusinan jaringan kantor kecil, saya melihat kerentanan yang sama berulang terus. Kabar baiknya: sebagian besar bisa diperbaiki dalam waktu kurang dari satu jam.</p>
    <h3>1. Ganti Kredensial Router Default</h3>
    <p>Mengejutkan, sebagian besar router kantor masih menggunakan username dan password admin default. "admin / admin" memberi siapa saja di jaringan kontrol penuh atas router Anda. Segera ubah ini.</p>
    <h3>2. Pisahkan Wi-Fi Tamu dan Staf</h3>
    <p>Wi-Fi tamu Anda harus sepenuhnya terisolasi dari jaringan utama. Jika perangkat tamu terinfeksi malware, Anda tidak ingin itu bisa berkomunikasi dengan komputer bisnis dan file server Anda.</p>
    <h3>3. Update Firmware di Semua Perangkat</h3>
    <p>Router, switch, printer, dan kamera IP semuanya menjalankan firmware. Dalam audit saya, saya biasanya menemukan setidaknya satu perangkat yang menjalankan firmware berusia 2+ tahun.</p>
    <h3>4. Scan Port Terbuka</h3>
    <p>Menggunakan tool gratis seperti Nmap, Anda bisa melihat port mana yang terbuka di jaringan. Port yang tidak perlu terbuka harus ditutup — port terbuka adalah titik masuk potensial bagi penyerang.</p>
    <h3>5. Aktifkan WPA3 (atau minimal WPA2)</h3>
    <p>Jika router Anda masih menggunakan WEP atau WPA lama, itu sangat tidak aman. Upgrade ke WPA3 jika hardware mendukung, atau WPA2-AES sebagai minimum.</p>` },
  { id:3, emoji:'📱', tag:'Web Design', title:'Kenapa Saya Selalu Build Mobile-First',
    date:'Nov 2024', time:'4 min read',
    body:`<p>Dulu saya selalu mendesain versi desktop dulu lalu "membuatnya responsif" setelahnya. Hasilnya selalu berantakan. Beralih ke mobile-first mengubah segalanya.</p>
    <h3>Apa Artinya Mobile-First?</h3>
    <p>Mobile-first berarti Anda menulis CSS dasar untuk layar kecil dan menggunakan min-width media query untuk secara progresif meningkatkan layout untuk layar yang lebih besar. Kebalikan dari pendekatan tradisional.</p>
    <h3>Mengapa Menghasilkan Hasil Lebih Baik</h3>
    <p>Ketika Anda mulai dari kecil, Anda dipaksa untuk memprioritaskan konten. Tidak ada ruang untuk dekorasi berlebihan di layar 375px — hanya elemen esensial yang bertahan. Constraint ini secara alami menghasilkan desain yang lebih bersih, lebih cepat.</p>
    <h3>Google Setuju</h3>
    <p>Google menggunakan mobile-first indexing, artinya Google terutama menggunakan versi mobile konten Anda untuk ranking. Website yang bagus di desktop tapi buruk di mobile akan ranking lebih rendah.</p>
    <h3>Workflow Saya</h3>
    <p>Saya mulai setiap project dengan men-sketch layout mobile di kertas. Baru setelah puas dengan tampilan di 375px, saya mulai membangun. Enhancement untuk desktop datang terakhir. Hasilnya selalu website yang bekerja sempurna di setiap perangkat.</p>` },
  { id:4, emoji:'🛠', tag:'IT Tips', title:'Setup Remote Desktop Support yang Benar',
    date:'Oct 2024', time:'6 min read',
    body:`<p>Salah satu hal paling berharga yang saya lakukan untuk klien IT support adalah menyiapkan solusi remote desktop yang andal. Daripada menyetir ke lokasi untuk masalah yang butuh 5 menit untuk diperbaiki, saya bisa menyelesaikannya dalam hitungan detik dari meja saya.</p>
    <h3>Memilih Tool yang Tepat</h3>
    <p>Saya menggunakan AnyDesk untuk sebagian besar klien karena ringan, cepat, dan punya tier gratis. Untuk support Windows-ke-Windows, Windows Quick Assist bawaan bekerja baik untuk sesi sekali pakai tanpa perlu menginstal apapun.</p>
    <h3>Pertimbangan Keamanan</h3>
    <p>Tool remote access bisa menjadi risiko keamanan jika dikonfigurasi salah. Saya selalu menyiapkan unattended access dengan password yang kuat, mengaktifkan autentikasi dua faktor, dan memastikan klien mengerti kapan saya akan mengakses mesin mereka.</p>
    <h3>Proses Setup</h3>
    <p>Setup standar saya butuh sekitar 20 menit per klien: instal AnyDesk, konfigurasi unattended access, buat akun support khusus dengan izin terbatas, test koneksi, dan dokumentasikan kredensial akses dengan aman.</p>
    <h3>Apa yang Bisa Dilakukan Secara Remote</h3>
    <p>Sekitar 80% masalah IT umum bisa diselesaikan secara remote: instalasi dan update software, pembuangan virus, update driver, konfigurasi jaringan, setup email, dan troubleshooting umum.</p>` },
  { id:5, emoji:'🌐', tag:'Web Dev', title:'HTML, CSS, JS: Apa Kamu Benar-Benar Butuh Framework?',
    date:'Sep 2024', time:'5 min read',
    body:`<p>Setiap developer junior yang saya temui bertanya pertanyaan yang sama: "Haruskah saya belajar React dulu?" Jawaban jujur saya: pelajari fundamentalnya dulu, dan kamu akan terkejut seberapa jauh mereka membawamu.</p>
    <h3>Apa yang Sebenarnya Framework Selesaikan</h3>
    <p>Framework seperti React menyelesaikan masalah nyata: mengelola UI state yang kompleks, reusabilitas komponen, virtual DOM diffing untuk dataset besar. Ini tantangan nyata dalam aplikasi skala besar.</p>
    <h3>Apa yang Sebagian Besar Website Klien Butuhkan</h3>
    <p>Website restoran lokal. Portfolio freelancer. Landing page bisnis kecil. Blog pribadi. Tidak satupun dari ini membutuhkan JavaScript framework. Mereka butuh HTML bersih, CSS bagus, mungkin beberapa baris JS untuk menu mobile dan form kontak.</p>
    <h3>Argumen Performa</h3>
    <p>Website vanilla HTML tanpa build step, tanpa bundle, tanpa hydration delay hampir selalu mengungguli ekuivalen React-nya. Ketika skor Lighthouse penting — dan untuk SEO dan konversi memang penting — vanilla menang.</p>
    <h3>Kapan Menggunakan Framework</h3>
    <p>Ketika UI kamu memiliki state kompleks yang sering berubah. Ketika ada tim yang bekerja pada komponen yang sama. Ketika kamu membangun sesuatu yang lebih mirip app daripada website. Ini konteks yang tepat untuk framework.</p>` },
  { id:6, emoji:'🎯', tag:'Freelance', title:'Cara Menentukan Harga Layanan Web Development Freelance',
    date:'Aug 2024', time:'6 min read',
    body:`<p>Ketika saya mulai freelancing, saya tidak tahu cara menetapkan harga kerja saya. Saya akan mengenakan terlalu sedikit dan membenci proyek, atau quote terlalu tinggi dan kehilangan klien. Setelah puluhan proyek, saya telah mengembangkan framework yang berhasil.</p>
    <h3>Jangan Harga per Jam (di Awal)</h3>
    <p>Penetapan harga per jam menghukum kamu karena menjadi lebih cepat. Jika landing page kini butuh 3 jam daripada 8 jam seperti dulu, saya tidak seharusnya mendapat lebih sedikit. Harga berdasarkan nilai dan deliverable, bukan waktu.</p>
    <h3>Pahami Kisaran Budget Klien</h3>
    <p>Sebelum quote, tanya: "Apakah kamu punya budget dalam pikiran untuk proyek ini?" Sebagian besar klien akan memberitahu kamu, dan itu menjangkar percakapan. Jika mereka bilang Rp 5 juta dan minimum kamu Rp 4 juta, bagus.</p>
    <h3>Breakdown Scope dengan Jelas</h3>
    <p>Scope creep adalah pembunuh diam-diam profitabilitas freelance. Tuliskan persis apa yang termasuk dalam quote kamu: jumlah halaman, jumlah putaran revisi, apa yang terjadi jika requirement berubah, timeline.</p>
    <h3>Tambahkan Buffer</h3>
    <p>Apapun estimasi waktu yang kamu buat, tambahkan 30%. Proyek selalu lebih lama dari yang diperkirakan. Feedback klien butuh waktu. Revisi terjadi. Bangun buffer tersebut dan kamu akan konsisten deliver tepat waktu.</p>` }
];

window.openBlog = function (id) {
  const p = posts.find(x => x.id === id);
  if (!p) return;
  document.getElementById('br-tag').textContent   = p.emoji + ' ' + p.tag;
  document.getElementById('br-ttl').textContent   = p.title;
  document.getElementById('br-date').textContent  = '📅 ' + p.date;
  document.getElementById('br-time').textContent  = '⏱ ' + p.time;
  document.getElementById('br-body').innerHTML    = p.body;
  document.getElementById('br-ov').classList.add('on');
  document.body.style.overflow = 'hidden';
};
window.closeBlog = function () {
  document.getElementById('br-ov').classList.remove('on');
  document.body.style.overflow = '';
};
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('br-ov')?.addEventListener('click', e => { if (e.target === e.currentTarget) closeBlog(); });
});

/* mobile theme toggle visibility */
document.addEventListener('DOMContentLoaded', () => {
  const mq = window.matchMedia('(max-width:960px)');
  const check = e => { const el = document.getElementById('thbtn2'); if (el) el.style.display = e.matches ? 'flex' : 'none'; };
  mq.addEventListener('change', check); check(mq);
});
