/* ==========================================================================
   A²MILS AMDK - PRODUCT INTERACTION & DETAIL MODAL
   ========================================================================== */

export const productData = {
  'cup-220ml': {
    id: 'cup-220ml',
    name: 'A²mils Gelas 220 ml',
    tagline: 'Praktis, Higienis & Siap Saji',
    category: 'cup',
    volume: '220 ml',
    packInfo: '1 Dus = 48 Gelas',
    bpom: 'BPOM RI MD 265228006191',
    sni: 'SNI 3553:2015',
    halal: 'Terverifikasi Halal Indonesia',
    shelfLife: '24 Bulan',
    image: '/assets/images/cup-220ml.png',
    description: 'A²mils Cup 220ml hadir dengan kemasan gelas plastik food grade steril dan tutup foil rapat anti-bocor. Sangat praktis untuk kebutuhan hajatan, pengajian, katering, rapat kantor, restoran, dan berbagai agenda sosial.',
    highlights: ['Segel Foil Kedap Udara', 'Plastik BPA-Free Higienis', 'Mudah Ditumpuk & Disimpan', 'Ekonomis & Efisien']
  },
  'bottle-330ml': {
    id: 'bottle-330ml',
    name: 'A²mils Botol 330 ml',
    tagline: 'Kompak, Elegan & Mudah Dibawa',
    category: 'bottle',
    volume: '330 ml',
    packInfo: '1 Dus = 24 Botol',
    bpom: 'BPOM RI MD 265228006191',
    sni: 'SNI 3553:2015',
    halal: 'Terverifikasi Halal Indonesia',
    shelfLife: '24 Bulan',
    image: '/assets/images/bottle-330ml.png',
    description: 'Kemasan botol mini yang ringkas dan modern, pas di tangan serta mudah dibawa bepergian. Cocok untuk acara seminar, sajian tamu hotel & resto (Horeca), serta meeting eksekutif.',
    highlights: ['Desain Ergonomis Slim', 'Tutup Segel Pengaman', 'Sangat Pas di Tas Kerja', 'Estetik untuk Meja Rapat']
  },
  'bottle-600ml': {
    id: 'bottle-600ml',
    name: 'A²mils Botol 600 ml',
    tagline: 'Hidrasi Maksimal Aktivitas Aktif',
    category: 'bottle',
    volume: '600 ml',
    packInfo: '1 Dus = 24 Botol',
    bpom: 'BPOM RI MD 265228006191',
    sni: 'SNI 3553:2015',
    halal: 'Terverifikasi Halal Indonesia',
    shelfLife: '24 Bulan',
    image: '/assets/images/bottle-600ml.png',
    description: 'Varian terfavorit A²mils dengan lekukan grip eksklusif yang nyaman digenggam saat berolahraga, bekerja, maupun perjalanan jarak jauh. Memberikan kesegaran mata air alami pegunungan Kuningan.',
    highlights: ['Grip Bergelombang Anti-Slip', 'Kapasitas Pas Hidrasi Harian', 'Kemasan 100% Recyclable', 'Mata Air Alami Terjaga']
  }
};

export function initProductInteractions() {
  // Product Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      productCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 3D Tilt Effect on mouse move
  productCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // Modal Handling
  const modalOverlay = document.getElementById('product-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const detailButtons = document.querySelectorAll('.btn-card-detail');
  const orderCardButtons = document.querySelectorAll('.btn-card-order');

  function openModal(productId) {
    const data = productData[productId];
    if (!data || !modalOverlay) return;

    document.getElementById('modal-img').src = data.image;
    document.getElementById('modal-img').alt = data.name;
    document.getElementById('modal-title').textContent = data.name;
    document.getElementById('modal-tagline').textContent = data.tagline;
    document.getElementById('modal-desc').textContent = data.description;
    document.getElementById('modal-spec-pack').textContent = data.packInfo;
    document.getElementById('modal-spec-bpom').textContent = data.bpom;
    document.getElementById('modal-spec-sni').textContent = data.sni;

    const highlightsList = document.getElementById('modal-highlights');
    if (highlightsList) {
      highlightsList.innerHTML = data.highlights
        .map((h) => `<li><span class="bullet-check">✓</span> ${h}</li>`)
        .join('');
    }

    const modalOrderBtn = document.getElementById('modal-order-btn');
    if (modalOrderBtn) {
      modalOrderBtn.onclick = () => {
        closeModal();
        const orderSection = document.getElementById('kemitraan');
        if (orderSection) {
          orderSection.scrollIntoView({ behavior: 'smooth' });
          const select = document.getElementById('order-product-select');
          if (select) select.value = productId;
        }
      };
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  detailButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const productId = btn.getAttribute('data-product');
      openModal(productId);
    });
  });

  orderCardButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const productId = btn.getAttribute('data-product');
      const orderSection = document.getElementById('kemitraan');
      if (orderSection) {
        orderSection.scrollIntoView({ behavior: 'smooth' });
        const select = document.getElementById('order-product-select');
        if (select) select.value = productId;
      }
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
}
