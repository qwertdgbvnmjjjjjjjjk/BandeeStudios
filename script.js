// Simple parallax demo
const parallax = document.getElementById('parallax');
if(parallax){
  parallax.addEventListener('pointermove', (e) => {
    const rect = parallax.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    parallax.style.transform = `perspective(600px) rotateY(${x*5}deg) rotateX(${-y*5}deg)`;
  });
  parallax.addEventListener('pointerleave', ()=>{ parallax.style.transform = 'none'; });
}
