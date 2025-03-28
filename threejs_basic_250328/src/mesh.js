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

  const meshes = [];

  // 位置調整とメッシュの大きさの設定
  const geometry1 = new THREE.BoxGeometry(10, 10, 10);
  const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  //   const mesh1 = new THREE.Mesh(geometry1, material1);
  //   mesh1.position.x -= 25;
  //   scene.add(mesh1);
  meshes.push(new THREE.Mesh(geometry1, material1));
  meshes[0].position.x -= 25;

  //   const geometry2 = new THREE.BoxGeometry(10, 10, 10);
  const geometry2 = geometry1.clone();
  // cloneメソッドでオブジェクトを複製
  //   const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const material2 = material1.clone();
  material2.color.set(0x00ff00);
  //   const mesh2 = new THREE.Mesh(geometry2, material2);
  //   mesh2.position.x += 25;
  //   scene.add(mesh2);
  meshes.push(new THREE.Mesh(geometry2, material2));
  meshes[1].position.x += 25;

  const geometry3 = new THREE.TorusGeometry(10, 2, 10, 100);
  //   const material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const material3 = material1.clone();
  material3.color.set("#0000ff");
  const mesh3 = new THREE.Mesh(geometry3, material3);
  //   scene.add(mesh3);
  meshes.push(new THREE.Mesh(geometry3, material3));

  const axis = new THREE.AxesHelper(20);
  scene.add(axis);
  //配列に対して不特定多数のメッシュを格納し、それをシーンに追加したい時に有効
  //   scene.add(mesh1, mesh2, mesh3)
  scene.add(...meshes);

  camera.position.z = 30;

  const control = new OrbitControls(camera, renderer.domElement);

  function animate() {
	requestAnimationFrame(animate);
  
    meshes[0].rotation.x += 0.01;
    meshes[1].rotation.y += 0.01;
    meshes[2].rotation.z += 0.01;

	control.update();

	renderer.render(scene, camera);
  }

  // requestAnimationFrameでは各処理がループして実行されるため、animate内で実行する処理はなるべく少なくして、パフォーマンスを考慮した実装にすべし

  animate();
}


// cloneメソッドが使用可能なクラス
// ・ジオメトリ
// ・メッシュ
// ・ライト
// ・カメラ
// ・シーン
// ・テクスチャ
// ・メッシュのプロパティのpositionやrotation