import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { createLights } from './components/lights.js';
import { createMeshGroup } from './components/meshGroup.js';
import { createScene } from './components/scene.js';
import { Train } from './components/Train/Train.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

// let camera;
// let renderer;
// let scene;
class World {
  #camera = createCamera();
  #scene = createScene();
  #renderer = createRenderer();
  #loop = new Loop(this.#camera, this.#scene, this.#renderer);
  // 1. Create an instance of the World app
  constructor(container) {
    // camera = createCamera();
    // scene = createScene();
    // renderer = createRenderer();
    // container.append(renderer.domElement);

    container.append(this.#renderer.domElement);
    const controls = createControls(this.#camera, this.#renderer.domElement);
    const cubes = createCube();
    const { ambientLight, mainLight } = createLights();
    const meshGroup = createMeshGroup();

    this.#loop.updatables.push(controls, meshGroup);
    const train = new Train();

    this.#scene.add(ambientLight, mainLight, train);
    // this.#scene.add(ambientLight, mainLight, meshGroup);
    // this.#loop.updatables.push(cubes[0]);
    // scene.add(cube)
    // this.#scene.add(...cubes, ambientLight, mainLight)
    const resizer = new Resizer(container, this.#camera, this.#renderer);
    // resizer.onResize = () => {
    //   this.render()
    // }
    // this.#camera.position.set(1,2,3);
    // and/or rotate the camera
    // this.#camera.rotation.set(0.5, 0, 0);

    // then tell the controls to update
    // controls.update();
    // controls.saveState();
    
    controls.addEventListener('change', () => {
      this.render();
    });
  }

  // 2. Render the scene
  render() {
    this.#renderer.render(this.#scene, this.#camera);
    // renderer.render(scene, camera);
  }
  start() {
    this.#loop.start();
  }

  stop() {
    this.#loop.stop();
  }
}

export { World };