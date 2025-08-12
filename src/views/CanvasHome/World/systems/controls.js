import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);

  // controls.enabled = false; // 禁用控件
  // 单禁模式
  // controls.enableRotate = false;
  // controls.enableZoom = false;
  // controls.enablePan = false;

  // controls.enablePan = false // 禁用平移
  // controls.enableDamping = true; // 启用阻尼

  // 自动旋转
  // controls.autoRotate = true;
  // controls.autoRotateSpeed = 1;
  // 缩放
  // controls.minDistance = 5;
  // controls.maxDistance = 20;
  // 旋转
  // controls.minAzimuthAngle = - Infinity; // default
  // controls.maxAzimuthAngle = Infinity; // default
  // 垂直旋转
  // controls.minPolarAngle = 0; // default
  // controls.maxPolarAngle = Math.PI; // default
  controls.tick = () => controls.update();
  
  return controls;
}

export { createControls };