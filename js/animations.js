/* ============================================================
   ANIMATIONS.JS
   GSAP ScrollTrigger scroll reveals + magnetic buttons + card tilt
   ============================================================ */

// ════════════════════════════════════════
//  MICRO-INTERACTIONS
// ════════════════════════════════════════
document.querySelectorAll('.pc').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width - .5;
    const y = (e.clientY-r.top)/r.height - .5;
    card.style.transform = `translateY(-6px) rotateX(${-y*4}deg) rotateY(${x*4}deg)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');
});
document.querySelectorAll('.btn-fill,.nav-cta').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    btn.style.transform = `translate(${(e.clientX-r.left-r.width/2)*.22}px,${(e.clientY-r.top-r.height/2)*.22}px) translateY(-2px)`;
  });
  btn.addEventListener('mouseleave', () => btn.style.transform = '');
});

// ════════════════════════════════════════
//  GSAP SCROLL ANIMATIONS
// ════════════════════════════════════════
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll('.sk').forEach(card => {
    ScrollTrigger.create({ trigger:card, start:'top 85%', once:true,
      onEnter: () => gsap.fromTo(card.querySelectorAll('.chip'),
        { opacity:0, scale:.8, y:10 },
        { opacity:1, scale:1, y:0, duration:.4, stagger:.04, ease:'back.out(1.4)' }
      )
    });
  });
  document.querySelectorAll('.tl-item').forEach((item, i) => {
    gsap.fromTo(item, { opacity:0, x:-30 }, { opacity:1, x:0, duration:.7, ease:'power3.out', delay:i*.06, scrollTrigger:{ trigger:item, start:'top 90%', once:true } });
  });
}
