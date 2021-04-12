/* eslint-disable */
import type { Mesh } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import type { OrbitControls as OCType } from 'three/examples/jsm/controls/OrbitControls';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';

function Box(props: JSX.IntrinsicElements['mesh']) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<Mesh>(null!);
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame((state, delta) => {
    // console.log(delta);
    mesh.current.rotation.x += 0.01;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <circleGeometry args={[2, 10]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

extend({ OrbitControls });

const CameraControls = () => {
  const orbitControls = useRef<OCType>();
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());

  return (
    <orbitControls
      enableDamping
      maxPolarAngle={Math.PI * 0.5}
      ref={controls}
      args={[camera, domElement]}
    />
  );
};

export default function App() {
  return (
    <Canvas>
      <CameraControls />
      <axesHelper args={[2]} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <mesh>
        <sphereGeometry args={[1, 10]} />
        <meshStandardMaterial color={'red'} wireframe />
      </mesh>
    </Canvas>
  );
}
