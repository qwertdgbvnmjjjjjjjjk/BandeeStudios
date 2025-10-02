// Mobile nav toggle
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    mobileNav.hidden = expanded;
  });
}

// Smooth scroll for in‑page links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1 && document.querySelector(id)) {
      e.preventDefault();
      document.querySelector(id).scrollIntoView({behavior:'smooth'});
      if (mobileNav) { mobileNav.hidden = true; menuBtn?.setAttribute('aria-expanded','false'); }
    }
  })
})

// Parallax on hero media
const parallax = document.getElementById('parallax');
if (parallax){
  parallax.addEventListener('pointermove', (e) => {
    const rect = parallax.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    parallax.style.transform = `perspective(900px) rotateY(${x*4}deg) rotateX(${-y*4}deg)`;
  });
  parallax.addEventListener('pointerleave', ()=>{ parallax.style.transform = 'none'; });
}

// Tilt effect for cards
const tiltEls = document.querySelectorAll('.tilt');
tiltEls.forEach(el => {
  el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left)/r.width - .5) * 6;
    const y = ((e.clientY - r.top)/r.height - .5) * -6;
    el.style.transform = `translateY(-4px) rotateX(${y}deg) rotateY(${x}deg)`;
  });
  el.addEventListener('pointerleave', ()=>{ el.style.transform = ''; });
});

// Scroll reveal
const reveal = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){ entry.target.animate([
      {opacity:0, transform:'translateY(16px)'},
      {opacity:1, transform:'translateY(0)'}], {duration:500, easing:'ease-out'});
      reveal.unobserve(entry.target);
    }
  })
},{threshold:.08});
document.querySelectorAll('section .card, .g-item, .step').forEach(el=>reveal.observe(el));

// Footer year and form
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
if (form) {
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const subject = encodeURIComponent(`Project inquiry from ${data.name}`);
    const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
    window.location.href = `mailto:studio@example.com?subject=${subject}&body=${body}`;
    if (note) { note.textContent = 'Thanks! Your email client should open shortly.'; note.style.display = 'block'; }
  });
}
