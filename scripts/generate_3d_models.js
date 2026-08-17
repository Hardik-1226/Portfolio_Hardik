const fs = require('fs');
const path = require('path');
const THREE = require('three');

global.FileReader = class FileReader {
  readAsArrayBuffer(blob) {
    setTimeout(async () => {
      let buf;
      if (blob.arrayBuffer) {
        buf = await blob.arrayBuffer();
      } else {
        buf = Buffer.from(blob);
      }
      this.result = buf;
      if (this.onload) this.onload({ target: { result: buf } });
    }, 10);
  }
};

const { GLTFExporter } = require('three/examples/jsm/exporters/GLTFExporter.js');

const outDir = path.join(__dirname, '..', 'public', 'assets', '3d');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function exportMesh(mesh, filename) {
  return new Promise((resolve, reject) => {
    const scene = new THREE.Scene();
    scene.add(mesh);

    const exporter = new GLTFExporter();
    exporter.parse(
      scene,
      (gltf) => {
        let buffer;
        if (gltf instanceof ArrayBuffer) {
          buffer = Buffer.from(gltf);
        } else {
          buffer = Buffer.from(JSON.stringify(gltf));
        }
        const filePath = path.join(outDir, filename);
        fs.writeFileSync(filePath, buffer);
        console.log(`Generated: ${filePath} (${buffer.length} bytes)`);
        resolve();
      },
      (err) => {
        console.error('Error generating ' + filename, err);
        reject(err);
      },
      { binary: true }
    );
  });
}

async function main() {
  const lensGeo = new THREE.CylinderGeometry(2, 2, 0.4, 64);
  const lensMesh = new THREE.Mesh(lensGeo, new THREE.MeshStandardMaterial());
  lensMesh.name = 'Cylinder';
  await exportMesh(lensMesh, 'lens.glb');

  const cubeGeo = new THREE.BoxGeometry(3, 3, 1);
  const cubeMesh = new THREE.Mesh(cubeGeo, new THREE.MeshStandardMaterial());
  cubeMesh.name = 'Cube';
  await exportMesh(cubeMesh, 'cube.glb');

  const barGeo = new THREE.BoxGeometry(8, 1.2, 0.6);
  const barMesh = new THREE.Mesh(barGeo, new THREE.MeshStandardMaterial());
  barMesh.name = 'Cube';
  await exportMesh(barMesh, 'bar.glb');

  console.log('All 3D models generated successfully!');
}

main();
