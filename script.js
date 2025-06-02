const bgCanvas = document.getElementById('bg-canvas');
bgCanvas.style.display = "block";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 20, 60);

const renderer = new THREE.WebGLRenderer({ canvas: bgCanvas, alpha: true, antialias: true });
renderer.setClearColor(0x000000, 1);
renderer.setSize(window.innerWidth, window.innerHeight);

const gridSize = 40;
const gridDivisions = 40;
const geometry = new THREE.PlaneGeometry(gridSize, gridSize, gridDivisions, gridDivisions);

const material = new THREE.MeshBasicMaterial({
  color: 0x00ffd0,
  wireframe: true,
  opacity: 0.7, // More visible grid lines
  transparent: true
});

const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.x = -Math.PI / 2;
scene.add(mesh);

function animateMesh(time) {
  const pos = geometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    pos.setZ(i, Math.sin(x * 1.2 + time * 0.001) * Math.cos(y * 1.2 + time * 0.001) * 1.5);
  }
  pos.needsUpdate = true;
}

function animate(time) {
  animateMesh(time);
  mesh.rotation.z = Math.sin(time * 0.0002) * 0.1;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
