/* eslint-disable */
import type { Mesh } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';

extend({ OrbitControls });

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  // @ts-ignore
  useFrame((state) => controls.current.update());

  return (
    // @ts-ignore
    <orbitControls
      enableDamping
      maxPolarAngle={Math.PI / 2}
      ref={controls}
      args={[camera, domElement]}
    />
  );
};

const Rondavel = (props: JSX.IntrinsicElements['group']) => {
  return (
    <group {...props} position={[2, 0.5, 0]}>
      <mesh>
        <cylinderGeometry args={[1, 1, 1, 100]} />
        <meshStandardMaterial color={0x786d5f} />
      </mesh>
    </group>
  );
};

const Sphere = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef<Mesh>(null!);
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame((state, delta) => {
    mesh.current.rotation.x += 0.01;
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1, 100, 100]} />
      <meshStandardMaterial color={'red'} wireframe />
    </mesh>
  );
};

export default function App() {
  return (
    <Canvas>
      <CameraControls />
      <axesHelper args={[2]} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Rondavel />
      {/* <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} /> */}
      <Sphere />
    </Canvas>
  );
}
