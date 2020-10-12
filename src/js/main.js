import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let camera, scene, renderer, stats, orbitControls;
(function () {
  // Create scene object
  scene = new THREE.Scene();

  // Create and setup camera object
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 10;

  // Create and setup renderer object
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor("#dadada");
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Add THREE JS renderer element on the page
  document.body.appendChild(renderer.domElement);

  // Add stats panel
  stats = new Stats();
  stats.showPanel(1);
  document.body.appendChild(stats.domElement);

  // Add orbit controls
  orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.addEventListener(renderer);

  /***************************************************************************************************/
  /** Create sub elements **/
  /***************************************************************************************************/
  // Sphere
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(2, 10, 10),
    new THREE.MeshLambertMaterial({ color: 0xffcc00 })
  );
  scene.add(sphere);

  // Lights
  const pointLight = new THREE.PointLight(0xffffff, 1.2, 500);
  pointLight.position.set(0, 50, 25);
  scene.add(pointLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  /**
   * Render the scene and camera on the renderer object
   * This function runs with every frame change (if FPS is 60, it will run 60 times in second)
   */
  let brighten = true;
  const render = () => {
    requestAnimationFrame(render);
    orbitControls.update();

    // Animate sphere
    pointLight.intensity = brighten
      ? pointLight.intensity + 0.02
      : pointLight.intensity - 0.02;

    if (pointLight.intensity > 4) {
      brighten = false;
    } else if (pointLight.intensity < 1.2) {
      brighten = true;
    }

    renderer.render(scene, camera);
  };
  render();

  /***************************************************************************************************/
  /** Event Listeners **/
  /***************************************************************************************************/
  window.addEventListener("resize", () => {
    // Resize renderer on window resize
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Change camera aspect ratio on window resize
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
})();
