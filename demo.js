import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 600);

const container = document.getElementById('threejs-container');
container.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(3, 3, 3);
const material = new THREE.MeshStandardMaterial({ color: 0xFFFF00 });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
scene.add(light);

camera.position.z = 5;

window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();