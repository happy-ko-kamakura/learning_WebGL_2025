import * as THREE from "three";

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

// ジオメトリ
// const geometry = new THREE.BoxGeometry(); // 立方体
// const geometry = new THREE.PlaneGeometry(10, 10, 5, 2); // 平面 (width, height, widthSegments: 平面横方向のセグメント数, heightSegments: 平面縦方向のセグメント数)
// const geometry = new THREE.SphereGeometry(5,5) // 球体 (radius: 半径, widthSegments: 横のセグメント数, heightSegments: 縦のセグメント数, ...);
const geometry = new THREE.TorusGeometry(5, 1, 50, 50) // ドーナツ型 (radius: 半径, tube: 太さ, radialSegments: （ドーナツの輪のセグメント数） オブジェクトの中心から外側に向かう放射状のセグメントの数, tubularSegments: チューブのセグメント数） オブジェクトのチューブの周りのセグメントの数)

const material = new THREE.MeshBasicMaterial({
  color: "#fafafa",
  wireframe: true // true: セグメントを視覚的に確認
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 15;

let i = 0;
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();
