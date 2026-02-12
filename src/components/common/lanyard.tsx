'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, Text, useTexture } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { RoundedBoxGeometry } from 'three-stdlib';
import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial, RoundedBoxGeometry });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}

type LanyardProps = {
  imageUrl?: string;
  name?: string;
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  imageScale?: [number, number];
  fontSize?: number;
  fontWeight?: number;
  cardScale?: number;
};

export default function Lanyard({
  imageUrl = '/images/hardik-portrait.png',
  name = 'Hardik Varshney',
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  imageScale = [1.0, 1.0],
  fontSize = 0.18,
  fontWeight = 700,
  cardScale = 2.6
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band imageUrl={imageUrl} name={name} isMobile={isMobile} imageScale={imageScale} fontSize={fontSize} fontWeight={fontWeight} cardScale={cardScale} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({ imageUrl, name, maxSpeed = 50, minSpeed = 0, isMobile = false, imageScale = [1.0, 1.0], fontSize = 0.18, fontWeight = 700, cardScale = 2.6 }: { imageUrl: string; name: string; maxSpeed?: number; minSpeed?: number; isMobile?: boolean; imageScale?: [number, number]; fontSize?: number; fontWeight?: number; cardScale?: number }) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();

  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 } as const;
  const texture = useTexture(imageUrl);

  const [curve] = useState(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState<any>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.4, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      const dir = vec.clone().sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });
      
      // Safety check for valid positions before updating curve
      const p0 = j3.current.translation();
      const p1 = j2.current.lerped;
      const p2 = j1.current.lerped;
      const p3 = fixed.current.translation();
      
      if (p0 && p1 && p2 && p3 && 
          !isNaN(p0.x) && !isNaN(p0.y) && !isNaN(p0.z) &&
          !isNaN(p1.x) && !isNaN(p1.y) && !isNaN(p1.z) &&
          !isNaN(p2.x) && !isNaN(p2.y) && !isNaN(p2.z) &&
          !isNaN(p3.x) && !isNaN(p3.y) && !isNaN(p3.z)) {
        curve.points[0].copy(p0);
        curve.points[1].copy(p1);
        curve.points[2].copy(p2);
        curve.points[3].copy(p3);
        band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      }
      
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.42, 0.8, 0.08]} />
          <group
            scale={cardScale}
            position={[0, -0.8, 0]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              (e.target as any).releasePointerCapture?.(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e: any) => {
              (e.target as any).setPointerCapture?.(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh>
              <roundedBoxGeometry args={[0.85, 1.6, 0.1, 8, 0.08]} />
              <meshStandardMaterial color="#0f0b16" metalness={0.3} roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.25, 0.055]}>
              <planeGeometry args={[imageScale[0], imageScale[1]]} />
              <meshStandardMaterial map={texture} />
            </mesh>
            <Text
              position={[0, -0.45, 0.056]}
              fontSize={fontSize}
              fontWeight={400}
              color="#e8d4ff"
              anchorX="center"
              anchorY="middle"
              maxWidth={0.8}
              letterSpacing={0.02}
            >
              {name}
            </Text>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        {/* @ts-expect-error */}
        <meshLineGeometry attach="geometry" />
        {/* @ts-expect-error */}
        <meshLineMaterial
          attach="material"
          color="#e8d4ff"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-3, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
