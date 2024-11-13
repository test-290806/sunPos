THREE.Object3D.DefaultUp.set(0, 0, 1);
//----------------------------------------------------------------------------------------------------------------------------------
const textureLoader = new THREE.TextureLoader();
//----------------------------------------------------------------------------------------------------------------------------------
const sceneTexture = textureLoader.load("2k_stars_milky_way.jpg");
const scene = new THREE.Scene();
scene.background = sceneTexture;
//----------------------------------------------------------------------------------------------------------------------------------
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;
camera.position.x = 5;
camera.position.y = 5;
//----------------------------------------------------------------------------------------------------------------------------------
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth - 1, window.innerHeight - 1);
document.body.appendChild(renderer.domElement);
//----------------------------------------------------------------------------------------------------------------------------------
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
//----------------------------------------------------------------------------------------------------------------------------------
const gridHelper = new THREE.GridHelper(10, 10);
gridHelper.rotateX(Math.PI / 2);
scene.add(gridHelper);
//----------------------------------------------------------------------------------------------------------------------------------
const earthTexture = textureLoader.load("2k_earth_daymap.jpg");
const earthSphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const earthSphereMaterial = new THREE.MeshBasicMaterial({map: earthTexture});
const earthSphere = new THREE.Mesh(earthSphereGeometry, earthSphereMaterial);
earthSphere.rotation.x = Math.PI / 2;
scene.add(earthSphere);
//----------------------------------------------------------------------------------------------------------------------------------
const sunTexture = textureLoader.load("2k_sun.jpg");
const sunSphereGeometry = new THREE.SphereGeometry(2, 32, 32);
const sunSphereMaterial = new THREE.MeshBasicMaterial({map: sunTexture});
const sunSphere = new THREE.Mesh(sunSphereGeometry, sunSphereMaterial);
sunSphere.rotation.x = Math.PI / 2;
scene.add(sunSphere);
//----------------------------------------------------------------------------------------------------------------------------------
const observerSphereGeometry = new THREE.SphereGeometry(0.05, 32, 32);
const observerSphereMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide
});
const observerSphere = new THREE.Mesh(observerSphereGeometry, observerSphereMaterial);
//----------------------------------------------------------------------------------------------------------------------------------
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = false;
//----------------------------------------------------------------------------------------------------------------------------------
function generateEclipticOrbit() {
    const sun = new Sun();
    let eclipticOrbitPoints = [];
    for (let i = 0; i < 367; i++) {
        let coordinates = sun.rectangularEclipticCoordinates;
        eclipticOrbitPoints.push(new THREE.Vector3(coordinates.x * 10, coordinates.y * 10, coordinates.z * 10));
        sun.T.setDate(sun.T.getDate() + 1);
    }
    let material = new THREE.LineBasicMaterial({color: 0xFF0000});
    let geometry = new THREE.BufferGeometry().setFromPoints(eclipticOrbitPoints);
    return new THREE.Line(geometry, material);
}