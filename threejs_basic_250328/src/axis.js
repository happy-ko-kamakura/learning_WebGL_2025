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

  const geometry = new THREE.TorusGeometry(5, 2, 50, 20);
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  
  //オブジェクト（メッシュ）の初期位置は3D空間上の原点(0, 0, 0)の地点
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const axis = new THREE.AxesHelper(20);
  scene.add(axis);

  camera.position.z = 15;

  const control = new OrbitControls(camera, renderer.domElement);
	
  let i = 0;
  function animate() {
	requestAnimationFrame(animate);
    // mesh.rotation.x += 0.01; // X軸（右方向に伸びる赤い線）を中心にオブジェクトが回転
    // mesh.rotation.y += 0.02; // Y軸（縦方向に伸びる緑の線）を中心にオブジェクトが回転
    // mesh.rotation.z += 0.02 // Z軸（青の線）を中心にオブジェクトが回転
    // mesh.position.z += 0.02
    // mesh.position.z = 5
    // mesh.position.set(0, 0, 5);
    // geometry.translate(0.01, 0.01, 0.01);
    // mesh.scale.x = 2; // スケール　なるべくmesh.scaleを使うべし◎
    // mesh.scale.x += 0.002;
    // geometry.scale(1, 1.02, 1); // のびのび



	control.update();
	renderer.render(scene, camera);
  }

  animate();
}