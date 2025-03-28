import * as THREE from "three";

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function createCube(x, y, z, size) {
  const geometry = new THREE.BoxGeometry(size,size,size);
  const material = new THREE.MeshNormalMaterial();
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(x, y, z);
  scene.add(cube);
}

createCube(-4, 0, -5, 2);
createCube(0, 0, 0, 2);
createCube(4, 0, 5, 2);

const canvasAspect = window.innerWidth / window.innerHeight;

// PerspectiveCamera
// const camera = new THREE.PerspectiveCamera(75, canvasAspect, 0.1, 1000);
// const camera = new THREE.PerspectiveCamera(fov: カメラの視野角を度数で表す(カメラが見ることのできるシーンの広さを決定), aspect: カメラの横と縦の比率, near: カメラに投影する最短の距離, far: カメラに投影する最長の距離)

// OrthographicCamera
const size = 10;
const camera = new THREE.OrthographicCamera(-size * canvasAspect, size * canvasAspect, size, -size, 1, 100);

camera.position.z = 10;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();