/* ==========================================================================
   A²MILS AMDK - INTERACTIVE HYDRATION CALCULATOR
   ========================================================================== */

export function initHydrationCalculator() {
  const weightSlider = document.getElementById('calc-weight-slider');
  const weightValDisplay = document.getElementById('calc-weight-val');
  const activityButtons = document.querySelectorAll('.activity-opt-btn');
  const resultLiters = document.getElementById('calc-res-liters');
  const resBottle600 = document.getElementById('calc-res-600ml');
  const resBottle330 = document.getElementById('calc-res-330ml');
  const resCup220 = document.getElementById('calc-res-220ml');
  const healthTip = document.getElementById('calc-health-tip');

  if (!weightSlider || !resultLiters) return;

  let currentWeight = parseInt(weightSlider.value, 10) || 65;
  let currentActivityFactor = 1.0;
  let currentActivityName = 'Santai';

  function updateCalculation() {
    // Standard baseline: 35ml per kg of body weight + 200ml tropical baseline
    let baseMl = currentWeight * 35 + 200;
    let totalMl = baseMl * currentActivityFactor;

    let liters = (totalMl / 1000).toFixed(1);
    let bottles600 = Math.ceil(totalMl / 600);
    let bottles330 = Math.ceil(totalMl / 330);
    let cups220 = Math.ceil(totalMl / 220);

    // Update UI elements with smooth animation
    if (resultLiters) resultLiters.innerHTML = `${liters} <span>L / Hari</span>`;
    if (resBottle600) resBottle600.textContent = `${bottles600} Botol`;
    if (resBottle330) resBottle330.textContent = `${bottles330} Botol`;
    if (resCup220) resCup220.textContent = `${cups220} Gelas`;

    // Personalized tips
    if (healthTip) {
      if (currentActivityFactor >= 1.4) {
        healthTip.textContent = `Untuk aktivitas intensif, minum 1 botol A²mils 600ml sebelum berolahraga dan minum bertahap setiap 20 menit untuk menjaga keseimbangan elektrolit alami.`;
      } else if (currentActivityFactor >= 1.2) {
        healthTip.textContent = `Aktivitas harian sedang membutuhkan hidrasi konstan. Siapkan A²mils 600ml di meja kerja Anda untuk menjaga konsentrasi optimal.`;
      } else {
        healthTip.textContent = `Cukupi kebutuhan ${liters} liter air mineral A²mils setiap hari untuk menjaga metabolisme tubuh dan kelembapan kulit alami.`;
      }
    }
  }

  // Weight Slider Event
  weightSlider.addEventListener('input', (e) => {
    currentWeight = parseInt(e.target.value, 10);
    if (weightValDisplay) weightValDisplay.textContent = `${currentWeight} kg`;
    updateCalculation();
  });

  // Activity Button Events
  activityButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      activityButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentActivityFactor = parseFloat(btn.getAttribute('data-factor')) || 1.0;
      currentActivityName = btn.getAttribute('data-name') || 'Santai';
      updateCalculation();
    });
  });

  // Initial Calculation
  updateCalculation();
}
