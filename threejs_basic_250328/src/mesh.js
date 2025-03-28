import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

init();

async function init() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // 位置調整とメッシュの大きさの設定
  const geometry1 = new THREE.BoxGeometry(10, 10, 10);
  const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const mesh1 = new THREE.Mesh(geometry1, material1);
  mesh1.position.x -= 25;
  scene.add(mesh1);

  const geometry2 = new THREE.BoxGeometry(10, 10, 10);
  const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const mesh2 = new THREE.Mesh(geometry2, material2);
  mesh2.position.x += 25;
  scene.add(mesh2);

  const geometry3 = new THREE.TorusGeometry(10, 2, 10, 100);
  const material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const mesh3 = new THREE.Mesh(geometry3, material3);
  scene.add(mesh3);

  const axis = new THREE.AxesHelper(20);
  scene.add(axis);

  camera.position.z = 30;

  const control = new OrbitControls(camera, renderer.domElement);

  function animate() {
	requestAnimationFrame(animate);


	control.update();

	renderer.render(scene, camera);
  }

  animate();
}