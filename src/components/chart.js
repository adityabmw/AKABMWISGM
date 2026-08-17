export function renderRevenueChart(canvasId, data) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  if (!data || data.length === 0) {
    ctx.fillStyle = '#6a7f9a';
    ctx.font = '14px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('Belum ada data', w/2, h/2);
    return;
  }

  const max = Math.max(...data.map(d => d.value));
  const barWidth = w / data.length * 0.6;
  const gap = w / data.length * 0.4;

  data.forEach((d, i) => {
    const x = i * (barWidth + gap) + gap/2;
    const barHeight = (d.value / max) * (h - 40);
    ctx.fillStyle = '#1a8cff';
    ctx.fillRect(x, h - barHeight - 20, barWidth, barHeight);

    ctx.fillStyle = '#6a7f9a';
    ctx.font = '10px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(d.label || '', x + barWidth/2, h - 5);
  });
}

export function renderWOPieChart(canvasId, data) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const cx = w/2;
  const cy = h/2;
  const r = Math.min(w, h) / 2 - 10;

  ctx.clearRect(0, 0, w, h);

  if (!data || data.length === 0) {
    ctx.fillStyle = '#6a7f9a';
    ctx.font = '14px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('Tidak ada WO', cx, cy);
    return;
  }

  const colors = ['#1a8cff', '#facc15', '#4ade80', '#f87171', '#a78bfa'];
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let startAngle = -Math.PI/2;

  data.forEach((d, i) => {
    const sliceAngle = (d.value / total) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, startAngle, startAngle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();

    // Label
    const midAngle = startAngle + sliceAngle/2;
    const labelX = cx + (r/1.5) * Math.cos(midAngle);
    const labelY = cy + (r/1.5) * Math.sin(midAngle);
    ctx.fillStyle = '#fff';
    ctx.font = '10px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(d.label, labelX, labelY);

    startAngle += sliceAngle;
  });
}
