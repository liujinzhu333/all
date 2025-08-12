import { Color, Scene } from 'three';

function createScene() {
  const scene = new Scene();

  // scene.background = new Color('rgba(0,0,0,0)', 0);
  scene.background = null;

  return scene;
}

export { createScene };