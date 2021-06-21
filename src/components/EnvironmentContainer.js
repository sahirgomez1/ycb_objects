import React, { useRef, useEffect, useCallback, Suspense } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { useGLTF, Environment, Html, softShadows, Shadow } from "@react-three/drei";
import { ObjectControls } from '../ObjectControls';
import { DragControls } from 'three-stdlib';
import { useObjectStore } from '../stores/ObjectStore';
extend({ DragControls, ObjectControls })

softShadows()

const Banana = ({camPosition, ...props}) => {
    const group = useRef();
    const object = useRef();
    const { nodes, materials } = useGLTF("/banana.gltf");

    const { objPosition, objRotation, handleTranslation, handleRotation } = useObjectStore()
    
    const { camera, gl: { domElement }} = useThree();
    camera.position.set( camPosition.xCamPos, camPosition.yCamPos, camPosition.zCamPos)
    const position = Object.values(objPosition)
    const rotation = Object.values(objRotation)

    const handleShiftKey = useCallback((e) => {
      if (!e.shiftKey) {
        handleRotation(object.current.rotation)
      } return
    }, [handleRotation]); 

    useEffect(() => {
      window.addEventListener('keyup', handleShiftKey);
      return () => {
        window.removeEventListener('keyup', handleShiftKey);
      };
    }, [handleShiftKey]);
    
    useFrame((state) => {
      //state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 7, step)
      //state.camera.position.lerp(vec.set( position.xCamPos, position.yCamPos, 10), step)
      state.camera.fov = camPosition.fov     
      state.camera.lookAt(0,0,0)
      state.camera.updateProjectionMatrix()
      object.current.updateMatrixWorld();
    })

    const annotateFrame = () => {
      console.log(object.current.position, object.current.rotation)
    }
    
    return (
      <>
        <group ref={group} {...props} dispose={null}>       
            <mesh
              ref={object}
              geometry={nodes.Node.geometry}
              material={materials.material_0}
              scale={props.objScale}
              position={position} 
              rotation={rotation}
              onPointerUp={(e) => handleTranslation(object.current.position) }
            /> 
        </group>
        
        <mesh 
          receiveShadow 
          castShadow 
          position={[0, 0, -0.5]} 
          onClick={annotateFrame}>
            <sphereBufferGeometry args={[0.05, 64, 64]} />
            <meshPhysicalMaterial color={'purple'} clearcoat={1} clearcoatRoughness={0} />
            <Shadow position-y={-0.79} rotation-x={-Math.PI / 2} opacity={0.6} scale={[0.8, 0.8, 1]} />
            <directionalLight position={[4,3,3]} castShadow intensity={1.5} shadow-camera-far={70} />
        </mesh>
        
        <dragControls args={[[ object.current ], camera, domElement]} /> 
        { object.current && <objectControls args={[camera, domElement, object.current ]}/>}
      </>
    );
}

const Loader = () => {
  return <Html center> Loading... </Html>
}

const EnvironmentContainer = ({position, ...props}) => {

    return (
        <>
          <Canvas shadows>   
            <ambientLight intensity={0.5} />
            <Suspense fallback={<Loader/>}>
              <Banana camPosition={position} objScale={props.objScale}/>
              <Environment preset="lobby" />                
            </Suspense>
            <axesHelper />      
          </Canvas>
        </>
    )
}

export default EnvironmentContainer;
