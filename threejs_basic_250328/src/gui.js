import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";

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
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  const axis = new THREE.AxesHelper(100);
  axis.visible = false;
  scene.add(axis);
  const amLight = new THREE.AmbientLight(0x3f3f46, 0.6);
  scene.add(amLight);

  const pLight = new THREE.PointLight(0xffffff, 80, 300, 1);
  pLight.position.set(-26, 7, 50);
  const pHelper = new THREE.PointLightHelper(pLight, 3);
  // pHelper.visible = false;
  pHelper.visible = true;

  scene.add(pLight, pHelper);

  pLight.castShadow = true;
  pLight.shadow.mapSize.width = 1024;
  pLight.shadow.mapSize.height = 1024;

  const dLight = new THREE.DirectionalLight(0xaabbff, 2);
  dLight.position.set(0, 0, 1);
  const dHelper = new THREE.DirectionalLightHelper(dLight, 3);
  dHelper.visible = false;

  scene.add(dLight, dHelper);
  const X_NUM = 10;
  const Y_NUM = 6;
  const SCALE = 30;
  const COLORS = { MAIN: "#f3f4f6", SUB: "#60a5fa" };

  const boxGeo = new THREE.BoxGeometry(SCALE, SCALE, SCALE);

  const mainMate = new THREE.MeshLambertMaterial({ color: COLORS.MAIN });
  const subMate = mainMate.clone();
  subMate.color.set(COLORS.SUB);

  const boxes = [];

  for (let y = 0; y < Y_NUM; y++) {
	for (let x = 0; x < X_NUM; x++) {
	  const material = Math.random() < 0.2 ? subMate : mainMate;
	  const box = new THREE.Mesh(boxGeo, material);
	  boxes.push(box);
	  box.position.x = x * SCALE - (X_NUM * SCALE) / 2;
	  box.position.y = y * SCALE - (Y_NUM * SCALE) / 2;
	  box.position.z = mapRand(-10, 10);
	  box.scale.set(0.98, 0.98, 0.98);
	  box.castShadow = true;
	  box.receiveShadow = true;
	}
  }
  scene.add(...boxes);

  const control = new OrbitControls(camera, renderer.domElement);

  // lil-guiを初期化x
  const gui = new GUI();

  // lil-guiではフォルダを作成してUIを整理可能
  const folder1 = gui.addFolder("PointLight");

  // pLightのx軸方向の位置を変更するUIを追加
  // gui.add(pLight.position, "x", -500, 500, 1);
  //gui.add(object: コントロールにバインドするオブジェクト。このオブジェクトの特定のプロパティがGUIによって制御される, 'property': コントロールにバインドするオブジェクトのプロパティの名前。文字列形式で指定され、このプロパティの値がユーザーのインタラクションによって更新, min: 数値コントロールの最小値。この値はスライダーの下限を定義, max: 数値コントロールの最大値。この値はスライダーの上限を定義, step: 数値の増減のステップ（間隔）。スライダーを動かしたときに、値が変化する単位);
  folder1.add(pLight.position, "x", -500, 500, 1);
  folder1.add(pLight.position, "y", -500, 500, 1);
  folder1.add(pLight.position, "z", -500, 500, 1);
  // 画面表示時のフォルダの開閉状態はopen / closeメソッドで制御することができる
  folder1.close();

  const folder2 = gui.addFolder("Color");
  // folder2.addColor(COLORS, "MAIN");
  folder2.addColor(COLORS, "MAIN").onChange(() => {
    mainMate.color.set(COLORS.MAIN);
     });
  // gui.addColor(object: カラーピッカーにバインドするオブジェクト。このオブジェクトの特定のプロパティがカラーピッカーによって制御される, 'property': カラーピッカーにバインドするオブジェクトのプロパティの名前。文字列形式で指定され、このプロパティは色の値を表す);

  folder2.addColor(COLORS, "SUB").onChange(() => {
    subMate.color.set(COLORS.SUB);
     });

  function animate() {
	
	requestAnimationFrame(animate);

	control.update();

	renderer.render(scene, camera);

  }

  animate();
}

// メッシュの色もGUIから変更可能(やかな設定が必要な場合などはコードを変更して適切な値を見つけ出すのは困難なためlil-guiを活用すべき)