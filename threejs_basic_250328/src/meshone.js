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

//   const renderer = new THREE.WebGLRenderer();
// アンチエイリアスの有効化(メッシュの輪郭が滑らかになる)
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xf3f3f3); // 背景色の変更

  document.body.appendChild(renderer.domElement);

//   // mapRand(): geometries配列からランダムにジオメトリをピックアップするために、ランダム値を返却する関数
//   function mapRand(min: ランダム値の下限を指定, max: ランダム値の上限を指定, isInt: trueで整数を返却。それ以外、浮動小数を返却 = false) {}

function mapRand(min, max, isInt = false) {
    let rand = Math.random() * (max - min) + min;
    rand = isInt ? Math.round(rand) : rand;
    return rand;
}

const POS_RANGE = 70;
const MAX_SCALE = 1.5;
const MESH_NUM = 50;
 const meshes = [];

  function randomMesh() {
    // ジオメトリを保持する配列
    const geometries = [
        new THREE.BoxGeometry(10, 10, 10),
        new THREE.SphereGeometry(8, 50, 50),
        new THREE.PlaneGeometry(20, 20),
        new THREE.TorusGeometry(10, 3, 20, 100)
      ];

    //   const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

      const color = new THREE.Color(`hsl(${mapRand(0, 360)}, 90%, 90%)`);

      const pos = {
        x: mapRand(-POS_RANGE, POS_RANGE),
        y: mapRand(-POS_RANGE, POS_RANGE),
        z: mapRand(-POS_RANGE, POS_RANGE),
      };

    //   const material = new THREE.MeshBasicMaterial({ color }); // 光の影響を受けない
      const material = new THREE.MeshLambertMaterial({ color }); // マットな見た目の表面を作成するのに適している&光の影響を受けるためライトが当たっていない状態は黒くなる
      const gIndex = mapRand(0, geometries.length - 1, true);
    //   const mesh = new THREE.Mesh(geometries[0], material);
    const mesh = new THREE.Mesh(geometries[gIndex], material);

    // Object3Dのメソッド
    mesh.position.set(pos.x, pos.y, pos.z);

    const scale = mapRand(1, MAX_SCALE)
    mesh.scale.set(scale, scale, scale);
    return mesh;
  }

  for (let i = 0; i < MESH_NUM; i++) {
    const mesh = randomMesh();
    meshes.push(mesh);
     }

//   const mesh = randomMesh();
//   scene.add(mesh);
  scene.add(...meshes);


  const axis = new THREE.AxesHelper(20);
  scene.add(axis);

  camera.position.z = 30;

  const control = new OrbitControls(camera, renderer.domElement);

  const light1 = new THREE.PointLight(0xe4e4e4, 300, 400, 1);
  const helper1 = new THREE.PointLightHelper(light1, 3, 0x0000ff);
  scene.add(light1, helper1);

  light1.position.set(10, 50, 100);

  const light2 = new THREE.PointLight(0xeeeeee, 50, 1000, 1);
  light2.position.set(-50, -10, 0);
  const helper2 = new THREE.PointLightHelper(light2, 3, 0xff0000);
  scene.add(light2, helper2);

  const amlight = new THREE.AmbientLight(0xe4e4e4, .6);
  scene.add(amlight);


  function animate() {
	requestAnimationFrame(animate);

	control.update();

	renderer.render(scene, camera);
  }

  animate();
}