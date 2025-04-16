import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.debug.onShaderError = ( gl, program, vertexShader, fragmentShader ) => {
  const vertexShaderSource = gl.getShaderSource( vertexShader );
  const fragmentShaderSource = gl.getShaderSource( fragmentShader );
  console.groupCollapsed( "vertexShader" )
  console.log( vertexShaderSource )
  console.groupEnd()
  console.groupCollapsed( "fragmentShader" )
  console.log( fragmentShaderSource )
  console.groupEnd()
}


document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(2, 2, 2);
console.log(geometry)
const material = new THREE.ShaderMaterial({
  vertexShader: `
  // 頂点シェーダー
	varying vec2 vUv;

	void main() {
	  vUv = uv;
	  // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(posit, 1.0);
	}
  `,
  fragmentShader: `
	varying vec2 vUv;

  // gl_FragColorの赤と緑の成分をvUvに置き換え、青色成分には0.5を設定
	void main() {
    // gl_FragColor = vec4(0.0, 1.0, 0.0, 0.1);
    gl_FragColor = vec4(vUv, 0.5, 1.0);
	}
  `,
  // transparent: true,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x = cube.rotation.x + 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();