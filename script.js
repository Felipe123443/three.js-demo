import * as THREE from 'three';

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);

renderer.domElement.id = 'threejs-canvas';
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
const scene = new THREE.Scene();

const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  flatShading: true
});

const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

mesh.position.x = 0.7;

const wireMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true
});

const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);

const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemiLight);

function animate(t = 0) {
  requestAnimationFrame(animate);
  mesh.rotation.y = t * 0.0001;
  renderer.render(scene, camera);
}

animate();
renderer.render(scene, camera);

// THREE.js end

document.addEventListener("DOMContentLoaded", () => {
  const target = document.querySelector("h1");
  let interval;
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:',.<>?/~`";

  const startEffect = () => {
    let iteration = 0;
    clearInterval(interval);

    interval = setInterval(() => {
      target.innerText = target.innerText
        .split("")
        .map((char, index) => {
          if (index < iteration) {
            return target.dataset.value[index];
          }
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join("");

      if (iteration >= target.dataset.value.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);
  };

  startEffect();

  setInterval(startEffect, 15000);
});

//   console effect

var data = [
  {
    AboutDevTypeText:
      "<span>About Learning Three.js<br/><br/>Are you ready to dive into the world of 3D graphics and bring your imagination to life?<br>Three.js is your gateway to creating stunning visual experiences directly in the browser.<br>From interactive animations to immersive virtual worlds, Three.js opens up endless possibilities for web development.</span><br/><br/><br/><span>Are you ready to learn Three.js?<br/> Y / N</span><br/>",
  },
];

var allElements = document.getElementsByClassName("typing");

setTimeout(function () {
  for (var j = 0; j < allElements.length; j++) {
    var currentElementId = allElements[j].id;
    var currentElementIdContent = data[0][currentElementId];
    var element = document.getElementById(currentElementId);
    var devTypeText = currentElementIdContent;

    var i = 0,
      isTag,
      text;
    (function type() {
      text = devTypeText.slice(0, ++i);
      if (text === devTypeText) return;
      element.innerHTML = text + `<span class='blinker'>&#32;</span>`;
      var char = text.slice(-1);
      if (char === "<") isTag = true;
      if (char === ">") isTag = false;
      if (isTag) return type();
      setTimeout(type, 60);
    })();
  }
}, 2500);