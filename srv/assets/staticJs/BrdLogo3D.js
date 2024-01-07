import * as THREE from "three";
import { GLTFLoader } from "GLTFLoader";

const logo = new THREE.Object3D();

// useful mathematic constants
// const PI = Math.PI;

const glcanvas = document.getElementById("BrdLogo3D");
// console.dir(glcanvas);
const glcanvasBox = glcanvas.getBoundingClientRect();
// console.dir(glcanvasBox);

// init the scene
let WIDTH = glcanvasBox.width;
let HEIGHT = glcanvasBox.height;
let RATIO = WIDTH / HEIGHT;
const RENDERER = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
});

RENDERER.shadowMapEnabled = false;
RENDERER.setSize(WIDTH, HEIGHT);
glcanvas.appendChild(RENDERER.domElement);

const FIELDVIEW = 20;
const NEAR = 1;
const FAR = 300;
const CAMERA = new THREE.PerspectiveCamera(FIELDVIEW, RATIO, NEAR, FAR);
CAMERA.position.z = 50;

const SCENE = new THREE.Scene();

const DIR_LIGHT_W = new THREE.DirectionalLight(0xbbffbb, 1);
DIR_LIGHT_W.position.x = 10;
DIR_LIGHT_W.position.z = 10;
SCENE.add(DIR_LIGHT_W);

const DIR_LIGHT_G = new THREE.DirectionalLight(0xbbffbb, 0.8);
DIR_LIGHT_G.position.x = -20;
DIR_LIGHT_G.position.z = -10;
SCENE.add(DIR_LIGHT_G);

const GLTF_LOADER = new GLTFLoader();

const url = "/assets/gltf/BrdLogo3D2022.glb";
GLTF_LOADER.load(url, function (gltf) {
    const logoGltf = gltf.scene;
    logoGltf.scale.x = 80;
    logoGltf.scale.y = 80;
    logoGltf.scale.z = 80;
    logoGltf.position.x = 0.25;
    logoGltf.position.y = -7.5;
    logoGltf.position.z = 0;

    logo.add(logoGltf);
    logo.userData = { ok: true }

    SCENE.add(logo);
});

// render the scene
window.onresize = function () {
    WIDTH = glcanvasBox.width;
    HEIGHT = glcanvasBox.height;
    RATIO = WIDTH / HEIGHT;

    RENDERER.setSize(WIDTH, HEIGHT);

    CAMERA.aspect = RATIO;
    CAMERA.updateProjectionMatrix();
};

let lastTime = performance.now();

const rad360 = 2 * Math.PI; // radians per round

const rpmY = 5; // rounds per minute
const rpsY = rpmY / 60; // rounds per second
const radSecY = (rpsY * rad360) / 1000; // radians per millisecond

const wpmX = 16; // waves per minute
const wpsX = wpmX / 60; // waves per second
const waveAmplX = (22.5 / 360) * rad360; // Oscillation amplitude in radians
const apmlSecX = (wpsX * waveAmplX) / 1000; // radians per millisecond

let flipX = false;

const requestframe =
    self.requestAnimationFrame ||
    self.webkitRequestAnimationFrame ||
    self.msRequestAnimationFrame ||
    self.oRequestAnimationFrame;


function render() {

    const newTime = performance.now();
    const deltaTime = newTime - lastTime;
    lastTime = newTime;

    if (logo.userData && logo.userData.ok) {

        const deltaY = (radSecY * deltaTime); // radians Y per delta time
        logo.rotation.y += deltaY;

        const deltaX = (apmlSecX * deltaTime); // radians X per delta time
        if (!flipX) {
            if (logo.rotation.x > -waveAmplX) {
                logo.rotation.x -= deltaX;
            } else {
                logo.rotation.x = -waveAmplX;
                flipX = true;
            }
        } else {
            if (logo.rotation.x <= waveAmplX) {
                logo.rotation.x += deltaX;
            } else {
                logo.rotation.x = waveAmplX;
                flipX = false;
            }
        }
    }

    RENDERER.render(SCENE, CAMERA);
}

function loop() {
    render();
    requestframe(loop);
}

function threeStart() {
    loop();
}

threeStart();
