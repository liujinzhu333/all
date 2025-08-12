import { 
  BoxGeometry, Mesh, MeshBasicMaterial, SphereGeometry, MeshStandardMaterial,
  MathUtils, TextureLoader,
} from 'three';

function createMaterial() {
  // create a texture loader.
  const textureLoader = new TextureLoader();
  // load a texture
  const texture = textureLoader.load(
  'src/assets/uv-test-bw.png',
  );
  // create a "standard" material using
  // the texture we just loaded as a color map
  const material = new MeshStandardMaterial({
    map: texture,
  });


  return material;
}

function createCube() {
  // create a geometry
  const geometry = new BoxGeometry(2, 2, 2);
  const sphere = new SphereGeometry(1, 30, 20);
  // sphere.position.set(10,10,10)

  // create a default (white) Basic material
  const material = createMaterial();
  const material2 = new MeshStandardMaterial({ color: "blue" });

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material);
  const cube_1 = new Mesh(geometry, material2);
  
  cube.add(cube_1)
  cube_1.scale.set(0.5, 0.5, 0.5)
  cube_1.rotation.set(1, 0.2, -0.8);
  cube_1.position.x = -1
  // cube.rotation.set(-0.5, -0.1, 0.8);
  cube.rotation.set(-0.5, -0.1, 0.8);
  const sp = new Mesh(sphere, material2)
  sp.position.x = 3;

  const radiansPerSecond = MathUtils.degToRad(30);
  cube.tick = (delta) => {
    // increase the cube's rotation each frame
    cube.rotation.z += radiansPerSecond * delta;
    cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
  };
  // cube.position
  return [cube, sp];
}

export { createCube };