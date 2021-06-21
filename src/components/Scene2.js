import React, { useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";

const Banana = (props) => {
    const group = useRef();
    const { nodes, materials } = useGLTF("/banana.gltf");
    
    return (
      <group ref={group} {...props} dispose={null}>
        <mesh
          geometry={nodes.Node.geometry}
          material={materials.material_0}
          scale={10}
          position={[0, 0.2, 0]} // To be set up with controllers
          rotation={[Math.PI / 2, 0, 0]} // To be set up with controllers
        />
      </group>
    );
  }

const EnvironmentContainer = () => {
    return (
        <>
          <Canvas camera={{ position: [1, 1, 1] }}>
            <ambientLight intensity={0.5} />
            <Suspense fallback={null}>
              <Banana />
              <Environment preset="city" />
            </Suspense>
            <OrbitControls />
            <axesHelper />
          </Canvas>
        </>
    )
}

export default EnvironmentContainer;