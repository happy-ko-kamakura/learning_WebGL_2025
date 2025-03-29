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

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor('lightsteelblue');

  // 影を追加するための設定
  renderer.shadowMap.enabled = true;

  document.body.appendChild(renderer.domElement);
  
  const floor = new THREE.Mesh(
	new THREE.PlaneGeometry(500, 500),
	new THREE.MeshStandardMaterial({
	  color: 0xf4f4f4,
	  side: THREE.DoubleSide,
	})
  );
  floor.rotation.x = THREE.MathUtils.degToRad(90);
  floor.position.y = -10;
  scene.add(floor);

  // 影をつける際は必要最低限のライトとメッシュを選択するように！
  floor.receiveShadow = true;

  const geometry = new THREE.TorusKnotGeometry(5, 1.5, 100, 100);

  const basic = new THREE.MeshBasicMaterial({ color: 0x3f7b9d });
  const mesh1 = new THREE.Mesh(geometry, basic);
  mesh1.position.x -= 20;

  const lambert = new THREE.MeshLambertMaterial({ color: 0x3f7b9d });
  const mesh2 = new THREE.Mesh(geometry, lambert);

  const standard = new THREE.MeshStandardMaterial({
	color: 0x3f7b9d,
	roughness: 0,
  });
  const mesh3 = new THREE.Mesh(geometry, standard);
  mesh3.position.x += 20;

  // 光を遮って影を作る元になるメッシュを選択
  mesh1.castShadow = true;
  mesh3.castShadow = true;
  
  scene.add(mesh1, mesh2, mesh3);

  const axis = new THREE.AxesHelper(20);
  scene.add(axis);

  camera.position.z = 30;

  const control = new OrbitControls(camera, renderer.domElement);

  const plight = new THREE.PointLight(0xffffff, 20, 80, 1);
  plight.position.y = 10;
  const pHelper = new THREE.PointLightHelper(plight, 3, 'blue');
  scene.add(pHelper);
  scene.add(plight);

  // 影を作る元になるライト
  plight.castShadow = true;

  let rad = 0;
  const RADIUS = 10;
  function animate() {
	requestAnimationFrame(animate);
	
	rad += 0.01;
	plight.position.x = RADIUS * Math.cos(rad);
	plight.position.z = RADIUS * Math.sin(rad);

	control.update();

	renderer.render(scene, camera);
  }

  animate();
}