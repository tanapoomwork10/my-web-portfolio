/* ============================================================
   THREE-BG.JS
   Three.js r128 animated particle network — renders on #heroCanvas
   ============================================================ */

// ════════════════════════════════════════
//  THREE.JS BACKGROUND
// ════════════════════════════════════════
(function ThreeBG() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas || typeof THREE === 'undefined') return;
  const scene = new THREE.Scene();
  const cam   = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, .1, 2000);
  cam.position.z = 500;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha:true, antialias:true });
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  const count = 500, pos = new Float32Array(count*3);
  for (let i=0; i<count*3; i++) pos[i] = (Math.random()-.5)*1200;

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color:0x00E5FF, size:2, transparent:true, opacity:.4 }));
  scene.add(pts);

  const lpos = new Float32Array(220*6); let li = 0;
  for (let i=0; i<count&&li<220; i++) for (let j=i+1; j<count&&li<220; j++) {
    const dx=pos[i*3]-pos[j*3], dy=pos[i*3+1]-pos[j*3+1], dz=pos[i*3+2]-pos[j*3+2];
    if (Math.sqrt(dx*dx+dy*dy+dz*dz)<120) {
      lpos.set([pos[i*3],pos[i*3+1],pos[i*3+2],pos[j*3],pos[j*3+1],pos[j*3+2]], li*6); li++;
    }
  }
  const lgeo = new THREE.BufferGeometry();
  lgeo.setAttribute('position', new THREE.BufferAttribute(lpos, 3));
  scene.add(new THREE.LineSegments(lgeo, new THREE.LineBasicMaterial({ color:0x00E5FF, transparent:true, opacity:.06 })));

  let mx=0, my=0;
  document.addEventListener('mousemove', e => { mx=(e.clientX/innerWidth-.5)*2; my=(e.clientY/innerHeight-.5)*2; });
  window.addEventListener('resize', () => { cam.aspect=innerWidth/innerHeight; cam.updateProjectionMatrix(); renderer.setSize(innerWidth,innerHeight); });

  (function loop() {
    requestAnimationFrame(loop);
    pts.rotation.y += .0003; pts.rotation.x += .0001;
    cam.position.x += (mx*50 - cam.position.x)*.02;
    cam.position.y += (-my*50 - cam.position.y)*.02;
    cam.lookAt(scene.position);
    renderer.render(scene, cam);
  })();
})();
