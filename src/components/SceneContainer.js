import React, { useRef, useEffect, useCallback, Suspense, useState } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { useGLTF, Environment, Html, softShadows, Shadow } from "@react-three/drei";
import { useObjectStore, useAnnotationStore, useVideoStore } from '../stores';
import { ObjectControls } from '../ObjectControls';
import { DragControls } from 'three-stdlib';
import * as THREE from "three";
extend({ DragControls, ObjectControls })

softShadows()

const Banana = ({camPosition, ...props}) => {
    const group = useRef();
    const object = useRef();

    const { objectSelected, objPosition, objRotation, objScale, handleTranslation, handleRotation } = useObjectStore();
    const videoState = useVideoStore()
    const { addAnnotation, reviewMode } = useAnnotationStore()

    const { nodes, materials } = useGLTF(objectSelected.gltfFile);
    const [ hovered, setHover ] = useState(false)
    
    const { camera, gl: { domElement }} = useThree();

    camera.position.set( camPosition.xCamPos, camPosition.yCamPos, camPosition.zCamPos)
    const position = Object.values(objPosition)
    const rotation = Object.values(objRotation)

    const [vec] = useState(() => new THREE.Vector3())

    useFrame(() => {
      if (reviewMode) object.current.position.lerp(vec.set(objPosition.x, objPosition.y, objPosition.z), 0.1)
    })

    const handleKeys = useCallback((e) => {
      if (!e.shiftKey || !e.ctrlKey) {
        handleRotation(object.current.rotation)
      } return
    }, [handleRotation]); 

    useEffect(() => {
      window.addEventListener('keyup', handleKeys);
      return () => {
        window.removeEventListener('keyup', handleKeys);
      };
    }, [handleKeys]);
    
    useFrame((state) => {
      //state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 7, step)
      //state.camera.position.lerp(vec.set( position.xCamPos, position.yCamPos, 10), step)
      state.clock.autoStart = false
      state.camera.fov = camPosition.fov     
      state.camera.lookAt(0,0,0)
      state.camera.updateProjectionMatrix()
      object.current.updateMatrixWorld();
    })

    const annotateFrame = () => {
      let dataAnnotation = {
          id:(videoState.played * videoState.duration), 
          time: (videoState.played * videoState.duration),
          position: {x: object.current.position.x,y: object.current.position.y,z: object.current.position.z},
          rotation: {_x: object.current.rotation._x, _y: object.current.rotation._y, _z: object.current.rotation._z},
          scale: object.current.scale.x
      }
      addAnnotation(dataAnnotation)
    }
    
    return (
      <>
        <group ref={group} {...props} dispose={null}>       
            <mesh
              ref={object}
              geometry={nodes.Node.geometry}
              material={materials.material_0}
              scale={objScale}
              position={!reviewMode ? position : null} 
              rotation={rotation}
              onPointerUp={(e) => handleTranslation(object.current.position) }
            /> 
        </group>
        
        <mesh 
          receiveShadow 
          castShadow 
          position={[0, 0, -0.5]} 
          onClick={annotateFrame}
          onPointerOver={(e) => setHover(true)}
          onPointerOut={(e) => setHover(false)}
        >
            <sphereBufferGeometry args={[0.05, 64, 64]} />
            <meshPhysicalMaterial color={'purple'} clearcoat={1} clearcoatRoughness={0} />
            <Shadow position-y={-0.79} rotation-x={-Math.PI / 2} opacity={0.6} scale={[0.8, 0.8, 1]} />
            <directionalLight position={[4,3,3]} castShadow intensity={1.5} shadow-camera-far={70} />
            { hovered && 
              <Html>
                <div className="scene-tooltip">Click to annotate</div> 
              </Html> 
            }
        </mesh>
        
        { object.current && <dragControls args={[[ object.current ], camera, domElement]} /> }
        { object.current && <objectControls args={[camera, domElement, object.current ]}/>  }
      </>
    );
}

const Loader = () => {
  return <Html center> Loading... </Html>
}

const SceneContainer = ({position}) => {

    return (
        <>
          <Canvas shadows>   
            <ambientLight intensity={0.5} />
            <Suspense fallback={<Loader/>}>
              <Banana camPosition={position}/>
              <Environment preset="lobby" />                
            </Suspense>
            <axesHelper />      
          </Canvas>
        </>
    )
}

export default SceneContainer;
