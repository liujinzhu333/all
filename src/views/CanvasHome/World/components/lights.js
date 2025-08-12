import {
  AmbientLight,
  DirectionalLight,
  HemisphereLight,
} from 'three';

function createLights() {
  // const ambientLight = new AmbientLight('white', 2);
  const mainLight = new DirectionalLight('white', 7);
  const ambientLight = new HemisphereLight(
    'white', // bright sky color
    'darkslategrey', // dim ground color
    5, // intensity
  );

  mainLight.position.set(10, 10, 20);

  return { ambientLight, mainLight };
}

export { createLights };