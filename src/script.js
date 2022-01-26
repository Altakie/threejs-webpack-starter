import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { Mesh, MeshStandardMaterial } from "three";

//Loading

const textureLoader = new THREE.TextureLoader();
const mountain = textureLoader.load(`/textures/mountain.jpg`);
const amogus = textureLoader.load(`/textures/amogus.png`);

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const geo = new THREE.PlaneBufferGeometry(3, 3, 64, 64);

for (let i = 0; i < 4; i++) {
  const mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(`/textures/${i}.jpg`),
  });

  const img = new THREE.Mesh(geo, mat);
  scene.add(img);
}

// Lights

//Light 1

const pointLight = new THREE.PointLight(0xca1515, 2);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

const light1 = gui.addFolder("Light 1");

const light1Color = {
  color: `#227ce2`,
};

light1.addColor(light1Color, "color").onChange(() => {
  pointLight.color.set(light1Color.color);
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 5;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

//Moves with mouse
document.addEventListener(`mousemove`, onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowX;
  mouseY = event.clientY - windowY;
}

//Moves with scroll

//Moves with arrow keys

document.addEventListener(`keydown`, ArrowKeys);

function ArrowKeys(input, e) {
  const key = input.code;
  switch (key) {
    case "ArrowLeft":
      sphere.position.x -= 0.1;
      e.preventDefault();
      break;
    case "ArrowRight":
      sphere.position.x += 0.1;
      e.preventDefault();
      break;
    case "ArrowDown":
      sphere.position.y -= 0.1;
      e.preventDefault();
      break;
    case "ArrowUp":
      sphere.position.y += 0.1;
      e.preventDefault();
      break;
  }
  console.log(input);
}

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
