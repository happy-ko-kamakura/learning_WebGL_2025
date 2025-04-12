import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";
import Stats from "stats-js";

init();

function mapRand(min, max, isInt = false) {
  let rand = Math.random() * (max - min) + min;
  rand = isInt ? Math.round(rand) : rand;
  return rand;
}

async function init() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
  );
  camera.position.z = 90;

  const renderer = new THREE.WebGLRenderer({
	antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Three.jsの影のレンダリングの有効化
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  const axis = new THREE.AxesHelper(100);
  axis.visible = false; // ヘルパーの非表示
  scene.add(axis);
  //04: Ambientライトの追加
  const amLight = new THREE.AmbientLight(0x3f3f46, 0.6);
  scene.add(amLight);

  //05: Pointライトの追加
  const pLight = new THREE.PointLight(0xffffff, 80, 300, 1);
  pLight.position.set(-26, 7, 50);
  const pHelper = new THREE.PointLightHelper(pLight, 3);
  pHelper.visible = false; // ヘルパーの非表示

  scene.add(pLight, pHelper);

  // 影をつくるライトの有効化
  pLight.castShadow = true;
  // ↓負荷大になる可能性あり
  pLight.shadow.mapSize.width = 1024;
  pLight.shadow.mapSize.height = 1024;

  //06: Directionalライトの追加
  const dLight = new THREE.DirectionalLight(0xaabbff, 2);
  dLight.position.set(0, 0, 1);
  const dHelper = new THREE.DirectionalLightHelper(dLight, 3);
  dHelper.visible = false; // ヘルパーの非表示

  scene.add(dLight, dHelper);

  //07: 定数の定義(メッシュ配置)
  const X_NUM = 10; //横軸
  const Y_NUM = 6;  //縦軸
  //01: 定数の定義(メッシュ作成準備)
  const SCALE = 30;
  const COLORS = { MAIN: "#f3f4f6", SUB: "#60a5fa" };

  //02: ジオメトリの作成
  const boxGeo = new THREE.BoxGeometry(SCALE, SCALE, SCALE);

  //03: マテリアルの作成
  const mainMate = new THREE.MeshLambertMaterial({ color: COLORS.MAIN });
  const subMate = mainMate.clone();
  subMate.color.set(COLORS.SUB);

  //08: メッシュの作成
  const boxes = [];

  for (let y = 0; y < Y_NUM; y++) {
	for (let x = 0; x < X_NUM; x++) {
	  const material = Math.random() < 0.2 ? subMate : mainMate;
      // 作成したジオメトリと組み合わせてメッシュを作成し、boxesに追加
	  const box = new THREE.Mesh(boxGeo, material);
	  boxes.push(box);
      // メッシュの配置
    //  box.position.x = x * SCALE;
    //  box.position.y = y * SCALE;
	  box.position.x = x * SCALE - (X_NUM * SCALE) / 2;
	  box.position.y = y * SCALE - (Y_NUM * SCALE) / 2;
	  box.position.z = mapRand(-10, 10);
      // メッシュ間のギャップの追加
	  box.scale.set(0.98, 0.98, 0.98);
	  box.castShadow = true;
	  box.receiveShadow = true;
	}
  }
  scene.add(...boxes);

  const control = new OrbitControls(camera, renderer.domElement);

  const gui = new GUI();
  const folder1 = gui.addFolder("PointLight");
  folder1.add(pLight.position, "x", -500, 500, 1);
  folder1.add(pLight.position, "y", -500, 500, 1);
  folder1.add(pLight.position, "z", -500, 500, 1);
  folder1.close();

  const folder2 = gui.addFolder("Color");

  folder2.addColor(COLORS, "MAIN").onChange(() => {
	mainMate.color.set(COLORS.MAIN);
  });

  folder2.addColor(COLORS, "SUB").onChange(() => {
	subMate.color.set(COLORS.SUB);
  });

  const stats = new Stats();
  stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild( stats.dom );

  function animate() {
	stats.begin();
	
	requestAnimationFrame(animate);

	control.update();

	renderer.render(scene, camera);

	stats.end();
  }

  animate();
}