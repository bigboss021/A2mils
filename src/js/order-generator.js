/* ==========================================================================
   A²MILS AMDK - ORDER & PARTNERSHIP WHATSAPP GENERATOR
   ========================================================================== */

export function initOrderGenerator() {
  const form = document.getElementById('partnership-order-form');
  if (!form) return;

  const productSelect = document.getElementById('order-product-select');
  const qtyInput = document.getElementById('order-qty-input');
  const typeSelect = document.getElementById('order-type-select');
  const nameInput = document.getElementById('order-name-input');
  const phoneInput = document.getElementById('order-phone-input');
  const cityInput = document.getElementById('order-city-input');
  const noteInput = document.getElementById('order-note-input');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const city = cityInput ? cityInput.value.trim() : '';
    const product = productSelect ? productSelect.options[productSelect.selectedIndex].text : '';
    const qty = qtyInput ? qtyInput.value : '1';
    const type = typeSelect ? typeSelect.options[typeSelect.selectedIndex].text : '';
    const note = noteInput ? noteInput.value.trim() : '';

    if (!name || !city) {
      alert('Mohon lengkapi Nama dan Kota/Lokasi pengiriman Anda.');
      return;
    }

    // Compose formatted WhatsApp Message
    let message = `*HALO TIM SALES A²MILS (CV. SURYA NEDIKA ISABELLA / PT. TIRTA BOGA MEGA KREASI)*\n\n`;
    message += `Saya tertarik untuk melakukan pemesanan / mengajukan kemitraan produk Air Mineral A²mils dengan rincian berikut:\n\n`;
    message += `👤 *Nama:* ${name}\n`;
    message += `📱 *No. WhatsApp:* ${phone || '-'}\n`;
    message += `📍 *Kota / Wilayah:* ${city}\n`;
    message += `💼 *Jenis Kemitraan:* ${type}\n`;
    message += `📦 *Produk Diminati:* ${product}\n`;
    message += `🔢 *Estimasi Jumlah:* ${qty} Dus / Unit\n`;
    if (note) {
      message += `📝 *Catatan Khusus:* ${note}\n`;
    }
    message += `\nMohon info ketersediaan stok, harga terbaik (pricelist distributor), dan mekanisme pengiriman. Terima kasih! 🙏`;

    // WhatsApp Official Sales Number (Format 62...)
    const waNumber = '6282115886482';
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

    window.open(waUrl, '_blank');
  });
}
