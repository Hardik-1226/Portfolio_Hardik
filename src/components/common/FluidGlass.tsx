"use client";

/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import React, { useRef, useState, useEffect, memo, type ReactNode } from 'react';
import { Canvas, createPortal, useFrame, useThree, type ThreeElements } from '@react-three/fiber';
import {
  useFBO,
  useScroll,
  Scroll,
  Preload,
  ScrollControls,
  MeshTransmissionMaterial,
  Text
} from '@react-three/drei';
import { easing } from 'maath';

type Mode = 'lens' | 'bar' | 'cube';

export interface NavItem {
  label: string;
  link: string;
}

export type ModeProps = Record<string, unknown>;

export interface FluidGlassProps {
  mode?: Mode;
  lensProps?: ModeProps;
  barProps?: ModeProps;
  cubeProps?: ModeProps;
}

export default function FluidGlass({
  mode = 'lens',
  lensProps = {},
  barProps = {},
  cubeProps = {}
}: FluidGlassProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[500px] flex items-center justify-center bg-purple-950/20 rounded-3xl border border-white/10 backdrop-blur-xl">
        <div className="animate-pulse text-purple-300 font-headline font-bold text-xl">Loading 3D Fluid Glass...</div>
      </div>
    );
  }

  const Wrapper = mode === 'bar' ? Bar : mode === 'cube' ? Cube : Lens;
  const rawOverrides = mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps;

  const {
    navItems = [
      { label: 'Frontend', link: '#about' },
      { label: 'Backend', link: '#about' },
      { label: 'AI & Systems', link: '#about' },
      { label: 'DevOps', link: '#about' }
    ],
    ...modeProps
  } = rawOverrides;

  return (
    <div className="w-full h-full min-h-[550px] relative rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#120826]/80 via-[#0a0416]/90 to-[#120826]/80 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.8)]">
      <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <ScrollControls damping={0.2} pages={1.5} distance={0.4}>
          {mode === 'bar' && <NavItems items={navItems as NavItem[]} />}
          <Wrapper modeProps={modeProps}>
            <Scroll>
              <Typography />
              <SkillDisplay />
            </Scroll>
            <Preload />
          </Wrapper>
        </ScrollControls>
      </Canvas>
    </div>
  );
}

type MeshProps = ThreeElements['mesh'];

interface ModeWrapperProps extends MeshProps {
  children?: ReactNode;
  geometryType?: 'cylinder' | 'cube' | 'bar';
  lockToBottom?: boolean;
  followPointer?: boolean;
  modeProps?: ModeProps;
}

const ModeWrapper = memo(function ModeWrapper({
  children,
  geometryType = 'cylinder',
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  ...props
}: ModeWrapperProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState<THREE.Scene>(() => new THREE.Scene());

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
    const destY = lockToBottom ? -v.height / 2 + 0.2 : followPointer ? (pointer.y * v.height) / 2 : 0;
    if (ref.current) {
      easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps as {
    scale?: number;
    ior?: number;
    thickness?: number;
    anisotropy?: number;
    chromaticAberration?: number;
    [key: string]: unknown;
  };

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh
        ref={ref}
        scale={scale ?? 0.25}
        rotation-x={Math.PI / 2}
        {...props}
      >
        {geometryType === 'cylinder' && <cylinderGeometry args={[2.5, 2.5, 0.5, 64]} />}
        {geometryType === 'cube' && <boxGeometry args={[4.5, 4.5, 1.2]} />}
        {geometryType === 'bar' && <boxGeometry args={[8, 1.4, 0.8]} />}

        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? 5}
          anisotropy={anisotropy ?? 0.01}
          chromaticAberration={chromaticAberration ?? 0.1}
          roughness={0.02}
          transmission={1}
          color="#ffffff"
          {...(typeof extraMat === 'object' && extraMat !== null ? extraMat : {})}
        />
      </mesh>
    </>
  );
});

function Lens({ modeProps, ...p }: { modeProps?: ModeProps } & MeshProps) {
  return <ModeWrapper geometryType="cylinder" followPointer modeProps={modeProps} {...p} />;
}

function Cube({ modeProps, ...p }: { modeProps?: ModeProps } & MeshProps) {
  return <ModeWrapper geometryType="cube" followPointer modeProps={modeProps} {...p} />;
}

function Bar({ modeProps = {}, ...p }: { modeProps?: ModeProps } & MeshProps) {
  const defaultMat = {
    transmission: 1,
    roughness: 0,
    thickness: 10,
    ior: 1.15,
    color: '#ffffff',
    attenuationColor: '#ffffff',
    attenuationDistance: 0.25
  };

  return (
    <ModeWrapper
      geometryType="bar"
      lockToBottom
      followPointer={false}
      modeProps={{ ...defaultMat, ...modeProps }}
      {...p}
    />
  );
}

function NavItems({ items }: { items: NavItem[] }) {
  const group = useRef<THREE.Group>(null!);
  const { viewport, camera } = useThree();

  const DEVICE = {
    mobile: { max: 639, spacing: 0.25, fontSize: 0.04 },
    tablet: { max: 1023, spacing: 0.3, fontSize: 0.05 },
    desktop: { max: Infinity, spacing: 0.35, fontSize: 0.05 }
  };
  const getDevice = () => {
    if (typeof window === 'undefined') return 'desktop';
    const w = window.innerWidth;
    return w <= DEVICE.mobile.max ? 'mobile' : w <= DEVICE.tablet.max ? 'tablet' : 'desktop';
  };

  const [device, setDevice] = useState<keyof typeof DEVICE>(getDevice());

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { spacing, fontSize } = DEVICE[device];

  useFrame(() => {
    if (!group.current) return;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    group.current.position.set(0, -v.height / 2 + 0.25, 15.1);

    group.current.children.forEach((child, i) => {
      child.position.x = (i - (items.length - 1) / 2) * spacing;
    });
  });

  return (
    <group ref={group} renderOrder={10}>
      {items.map(({ label }) => (
        <Text
          key={label}
          fontSize={fontSize}
          color="#c084fc"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0}
          outlineBlur="20%"
          outlineColor="#000"
          outlineOpacity={0.5}
          renderOrder={10}
        >
          {label}
        </Text>
      ))}
    </group>
  );
}

function SkillDisplay() {
  const skillsData = [
    { cat: 'FRONTEND', skills: 'Next.js • React • TypeScript • Tailwind • Three.js' },
    { cat: 'BACKEND', skills: 'Node.js • Express • Python • PostgreSQL • MongoDB' },
    { cat: 'AI & TOOLS', skills: 'GenAI • LangChain • Docker • Git • Figma' }
  ];

  return (
    <group position={[0, 0, 10]}>
      {skillsData.map((item, idx) => (
        <group key={item.cat} position={[0, 0.4 - idx * 0.75, 0]}>
          <Text
            position={[0, 0.18, 0]}
            fontSize={0.16}
            color="#c084fc"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.1}
          >
            {`✦ ${item.cat} ✦`}
          </Text>
          <Text
            position={[0, -0.05, 0]}
            fontSize={0.13}
            color="#f8fafc"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.02}
          >
            {item.skills}
          </Text>
        </group>
      ))}
      <Text
        position={[0, -1.8, 0]}
        fontSize={0.1}
        color="#a78bfa"
        anchorX="center"
        anchorY="middle"
      >
        (Move cursor to refract and magnify skills with 3D fluid optical glass)
      </Text>
    </group>
  );
}

function Typography() {
  const DEVICE = {
    mobile: { fontSize: 0.2 },
    tablet: { fontSize: 0.35 },
    desktop: { fontSize: 0.45 }
  };
  const getDevice = () => {
    if (typeof window === 'undefined') return 'desktop';
    const w = window.innerWidth;
    return w <= 639 ? 'mobile' : w <= 1023 ? 'tablet' : 'desktop';
  };

  const [device, setDevice] = useState<keyof typeof DEVICE>(getDevice());

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { fontSize } = DEVICE[device];

  return (
    <Text
      position={[0, 1.4, 11]}
      fontSize={fontSize}
      letterSpacing={0.02}
      outlineWidth={0.01}
      outlineBlur="20%"
      outlineColor="#7c3aed"
      color="#ffffff"
      anchorX="center"
      anchorY="middle"
    >
      Hardik's Capabilities
    </Text>
  );
}
