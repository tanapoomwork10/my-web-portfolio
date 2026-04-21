/* ============================================================
   MODAL.JS
   Project detail modals and certificate lightbox with career details
   ============================================================ */

// ════════════════════════════════════════
//  MODALS (project)
// ════════════════════════════════════════
function openModal(id) {
  document.getElementById('modal-' + id)?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById('modal-' + id)?.classList.remove('open');
  document.body.style.overflow = '';
}

// ════════════════════════════════════════
//  CERTIFICATE LIGHTBOX
// ════════════════════════════════════════
const CERT_DATA = {
  aws: { issuer:'Amazon Web Services', title:'AWS Academy Cloud Foundations', date:'21 Nov 2025', hours:'20 hours', verify:'https://www.credly.com/go/gN41dom2', desc:'ครอบคลุมพื้นฐาน Cloud Computing บน AWS ตั้งแต่ EC2, S3, VPC, IAM, RDS ช่วยให้เข้าใจโครงสร้างพื้นฐานของระบบ Cloud และออกแบบ Architecture ที่ปลอดภัยได้', skills:['Cloud Architecture','EC2 & S3','IAM Security','VPC Networking','RDS'], significance:'เสริมความรู้ด้าน Cybersecurity โดยตรง — เข้าใจ Infrastructure ทำให้วิเคราะห์ช่องโหว่ได้' },
  ux:  { issuer:'Google / Coursera', title:'Foundations of UX Design', date:'18 Apr 2026', hours:'Course Certificate', verify:'https://coursera.org/verify/2ZLHIIDQEWT6', desc:'หลักสูตรจาก Google ครอบคลุม UX Design Process, Design Thinking, User Research, Wireframing และ Accessibility', skills:['Design Thinking','User Research','Wireframing','Prototyping','Accessibility'], significance:'ช่วยออกแบบ Security Tool ที่ใช้งานง่ายสำหรับประชาชนทั่วไป' },
  bot: { issuer:'Coursera Project', title:'Build a Chatbot with Python & ChatGPT', date:'15 Feb 2025', hours:'Project Certificate', verify:'https://coursera.org/verify/ECJA8KCX2QL2', desc:'สร้าง Chatbot ด้วย Python และ OpenAI API ครอบคลุม Prompt Engineering, API Integration และ Conversation Flow', skills:['Python','OpenAI API','Prompt Engineering','Chatbot Architecture'], significance:'ประสบการณ์ตรง AI API สำหรับพัฒนา Security Chatbot ในอนาคต' }
};

function openCert(id) {
  const d = CERT_DATA[id]; if (!d) return;
  const imgSrc = document.getElementById('certImg-' + id)?.src || '';
  const lb = document.getElementById('certLightbox');
  lb.innerHTML = `<div class="cert-lightbox">
    <div class="cert-lb-img"><img src="${imgSrc}" alt="${d.title}"/><button class="modal-close" onclick="closeCert()">&times;</button></div>
    <div class="cert-lb-body">
      <div class="cert-lb-issuer">${d.issuer}</div>
      <div class="cert-lb-title hd">${d.title}</div>
      <div class="cert-lb-meta"><span>📅 ${d.date}</span><span>⏱ ${d.hours}</span></div>
      <p class="cert-lb-desc">${d.desc}</p>
      <div class="cert-lb-skills-title">SKILLS EARNED</div>
      <div class="cert-lb-skills">${d.skills.map(s=>`<span class="cert-lb-skill">${s}</span>`).join('')}</div>
      <div class="cert-lb-skills-title" style="margin-top:.9rem">CAREER SIGNIFICANCE</div>
      <p class="cert-lb-desc" style="margin-bottom:1.2rem">${d.significance}</p>
      <a href="${d.verify}" target="_blank" class="cert-lb-verify">↗ Verify Certificate</a>
    </div></div>`;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCert() {
  document.getElementById('certLightbox')?.classList.remove('open');
  document.body.style.overflow = '';
}

// Close on backdrop click / Escape
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-bg')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  document.querySelectorAll('.modal-bg.open').forEach(m => m.classList.remove('open'));
  document.body.style.overflow = '';
});
