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
  
  scene.add(mesh1, mesh2, mesh3);

  const axis = new THREE.AxesHelper(20);
  scene.add(axis);

  camera.position.z = 30;

  const control = new OrbitControls(camera, renderer.domElement);

  // AmbientLight: シーン全体を均等に照らすライトになり、影を作成しない
//   const amlight = new THREE.AmbientLight( 0xffffff );
//   //   const light = new THREE.AmbientLight(color: 光の色, intensity: 光の強度); 
//   scene.add(amlight);

// DirectionalLight: 特定の方向に向けて均一に光を照射する平行ライト
//   const light = new THREE.DirectionalLight(color: 光の色, intensity: 光の強度);
//   light.position.set(x, y, z); // 光源の位置
//   light.target = targetMesh; // 照射対象


  const dlight = new THREE.DirectionalLight( 0xffffff, 1 );

//   dlight.position.set(-1, 0, 0);
// dlight.position.set(1, 1, 0);

// !! targetを指定する場合はtargetのシーンへの追加と、animate関数内でのヘルパーの更新を行う必要がある
dlight.target.position.set(0, 10, 5);
scene.add(dlight, dlight.target);
//   scene.add(dlight);

// Spotlight: 特定の方向に光を照射するライトで、円錐形の光を作成する際に使用する
// const light = new THREE.SpotLight(color, intensity, distance: 光が届く最大距離, angle: 光の広がり角度。ラジアンで指定, penumbra: ペナンブラ（半影）の効果。0（デフォルト値）から1の間で指定(光と影の境界をどの程度ボヤかすかの指定), decay: 光の減衰率);
// light.position.set(x, y, z);
// light.target = targetMesh;
// const spotlight = new THREE.SpotLight(0xffffff, 500, 0, THREE.MathUtils.degToRad(40), 1);
//  spotlight.position.set(40, 0, 20);
//  scene.add(spotlight);
//  const spotHelper = new THREE.SpotLightHelper(spotlight, 'red');
// scene.add(spotHelper);

const plight = new THREE.PointLight(0xffffff, 20, 80, 1);
// plight.position.set(10, -6, 10);
plight.position.y = 10;
const pHelper = new THREE.PointLightHelper(plight, 3, 'blue');
scene.add(pHelper);
scene.add(plight);

// PointLight: 定の点から全方向に光を放射する点光源として使用することができる
// const light = new THREE.PointLight(color, intensity, distance, decay);
// light.position.set(x, y, z);

// DirectionalLightHelper: ライトがどの位置にあるのか確認するため
// const dHelper = new THREE.DirectionalLightHelper(dlight);
const dHelper = new THREE.DirectionalLightHelper(dlight, 3, 'red');
// scene.add(dlight, dHelper);

let rad = 0;
const RADIUS = 10;
  function animate() {
	requestAnimationFrame(animate);

    rad += 0.01;
    plight.position.x = RADIUS * Math.cos(rad);
    plight.position.z = RADIUS * Math.sin(rad);

    dHelper.update();
	control.update();

	renderer.render(scene, camera);
  }

  animate();
}