"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function Interactive3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Geometry
    const geometry = new THREE.TorusKnotGeometry(1.5, 0.5, 100, 16);
    const material = new THREE.MeshStandardMaterial({
      color: 0xD8CEE6, // Muted Lavender
      metalness: 0.3,
      roughness: 0.6,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xA7BED3, 2); // Slate Blue
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xffffff, 1);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);


    // Mouse move listener
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      mouse.current.x = (clientX / innerWidth) * 2 - 1;
      mouse.current.y = -(clientY / innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Interaction
      torusKnot.rotation.y += (mouse.current.x * 0.5 - torusKnot.rotation.y) * 0.05;
      torusKnot.rotation.x += (-mouse.current.y * 0.5 - torusKnot.rotation.x) * 0.05;

      // Default rotation
      torusKnot.rotation.x = elapsedTime * 0.1;
      torusKnot.rotation.y = elapsedTime * 0.1;
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if(currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
