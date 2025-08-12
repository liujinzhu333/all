import { WebGLRenderer } from 'three';

function createRenderer() {
  const renderer = new WebGLRenderer({
    alpha: true,   // 启用alpha通道
    antialias: true, // 可选：抗锯齿
  });

  renderer.physicallyCorrectLights = true;

  return renderer;
}

export { createRenderer };