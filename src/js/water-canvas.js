/* ==========================================================================
   A²MILS AMDK - INTERACTIVE WATER CANVAS & FLOATING BUBBLES
   ========================================================================== */

export function initWaterCanvas() {
  const canvas = document.getElementById('water-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = canvas.parentElement.offsetWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight);

  let mouse = { x: width / 2, y: height / 2, radius: 120 };

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  });

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  class Bubble {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + Math.random() * 50;
      this.radius = Math.random() * 12 + 4;
      this.speed = Math.random() * 1.2 + 0.6;
      this.swaySpeed = Math.random() * 0.02 + 0.01;
      this.swayDistance = Math.random() * 40 + 15;
      this.angle = Math.random() * Math.PI * 2;
      this.alpha = Math.random() * 0.4 + 0.2;
    }

    update() {
      this.y -= this.speed;
      this.angle += this.swaySpeed;
      this.currentX = this.x + Math.sin(this.angle) * this.swayDistance;

      // Mouse repulsion
      const dx = mouse.x - this.currentX;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        this.currentX -= (dx / dist) * force * 15;
        this.y -= (dy / dist) * force * 15;
      }

      if (this.y < -30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.currentX, this.y, this.radius, 0, Math.PI * 2);

      // Radial bubble gradient
      const grad = ctx.createRadialGradient(
        this.currentX - this.radius * 0.3,
        this.y - this.radius * 0.3,
        this.radius * 0.1,
        this.currentX,
        this.y,
        this.radius
      );

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        grad.addColorStop(0, `rgba(56, 189, 248, ${this.alpha + 0.2})`);
        grad.addColorStop(0.7, `rgba(0, 225, 217, ${this.alpha * 0.5})`);
        grad.addColorStop(1, `rgba(0, 139, 158, 0.1)`);
      } else {
        grad.addColorStop(0, `rgba(255, 255, 255, ${this.alpha + 0.3})`);
        grad.addColorStop(0.6, `rgba(0, 225, 217, ${this.alpha * 0.6})`);
        grad.addColorStop(1, `rgba(0, 139, 158, 0.15)`);
      }

      ctx.fillStyle = grad;
      ctx.fill();

      // Highlight droplet rim
      ctx.lineWidth = 1;
      ctx.strokeStyle = isDark ? `rgba(0, 225, 217, ${this.alpha * 0.6})` : `rgba(255, 255, 255, ${this.alpha * 0.8})`;
      ctx.stroke();

      ctx.restore();
    }
  }

  const bubbleCount = Math.min(Math.floor(width / 35), 45);
  const bubbles = Array.from({ length: bubbleCount }, () => new Bubble());

  function animate() {
    ctx.clearRect(0, 0, width, height);
    bubbles.forEach((b) => {
      b.update();
      b.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}
