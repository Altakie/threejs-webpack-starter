import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { Mesh, MeshStandardMaterial } from "three";

//Loading

const textureLoader = new THREE.TextureLoader();
const mountain = textureLoader.load(`/textures/mountain.jpg`);
const amogus = textureLoader.load(`/textures/amogus.png`);
const height = textureLoader.load(`/textures/height.jpg`);
const alpha = textureLoader.load(`/textures/alpha.jpg`);

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects (geometry/shape)
const geometry = new THREE.PlaneBufferGeometry(3, 3, 64, 64);

// Materials (skin over object)

const material = new THREE.MeshStandardMaterial({
  color: "grey",
  map: mountain,
  displacementMap: height,
  displacementScale: 0.3,
  alphaMap: alpha,
  transparent: true,
});

const materialGui = gui.addFolder("Material");

// Mesh (combination of object and material)
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

plane.rotation.x = 8.2;
plane.rotation.y = 3.2;
plane.position.y = 0;

const meshGui = gui.addFolder("Mesh");

meshGui.add(plane.rotation, "x").min(0).max(10).step(0.1);
meshGui.add(plane.rotation, "y").min(0).max(10).step(0.1);
meshGui.add(plane.position, "y").min(-10).max(10).step(0.1);

// Lights

//Light 1

const pointLight = new THREE.PointLight(0xca1515, 5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

const light1 = gui.addFolder("Light 1");
light1.add(pointLight.position, "x").max(10).min(0).step(0.1);
light1.add(pointLight.position, "y").max(10).min(0).step(0.1);
light1.add(pointLight.position, "z").max(10).min(0).step(0.1);
light1.add(pointLight.intensity, "").max(10).min(0).step(0.1);

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
camera.position.y = 1;
camera.position.z = 4;
scene.add(camera);

const cameraGUI = gui.addFolder("Camera");

cameraGUI.add(camera.rotation, "x").max(10).min(0).step(0.1);
cameraGUI.add(camera.rotation, "y").max(10).min(0).step(0.1);
cameraGUI.add(camera.rotation, "z").max(10).min(0).step(0.1);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  // alpha: true,
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
  const elapsedTime = 0.7 * clock.getElapsedTime();

  plane.rotation.z = elapsedTime;
  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
