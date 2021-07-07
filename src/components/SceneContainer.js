import React, { useRef, useEffect, useCallback, Suspense, useState } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { useGLTF, Environment, Html, softShadows } from "@react-three/drei";
import { useObjectStore, useAnnotationStore, useVideoStore } from '../stores';
import { ObjectControls } from '../extensions/ObjectControls';
import { DragControls } from 'three-stdlib';
import * as THREE from "three";
extend({ DragControls, ObjectControls })

softShadows()

/**
 * The 3D Object component
 * 
 * @param {Object} camPosition The initial position of camera
 * @param {props} props The props from parent copmponent {SceneContainer}
 * @returns 
 */

const Banana = ({camPosition, ...props}) => {
    const group = useRef();
    const object = useRef();

    const { objectSelected, objPosition, objRotation, objScale, handleTranslation, handleRotation } = useObjectStore();
    const videoState = useVideoStore()
    const { addAnnotation, reviewMode } = useAnnotationStore()

    const { nodes, materials } = useGLTF(objectSelected.gltfFile);
    
    const { camera, gl: { domElement }} = useThree();

    camera.position.set( camPosition.xCamPos, camPosition.yCamPos, camPosition.zCamPos)
    const position = Object.values(objPosition)
    const rotation = Object.values(objRotation)

    const [vec] = useState(() => new THREE.Vector3())
    const [euler] = useState(() => new THREE.Euler())
    const [quaternion] = useState(() => new THREE.Quaternion());

    useFrame(() => {
      if (reviewMode) {
        object.current.position.lerp(
          vec.set(objPosition.x, objPosition.y, objPosition.z),
          0.1
        ); // Use lerp to linearly interpolate between two vectors.
        object.current.quaternion.slerp(
          quaternion.setFromEuler(
            euler.set(objRotation._x, objRotation._y, objRotation._z, "XYZ")
          ),
          0.1
        ); // Use slerp to handle the spherical linear interpolation between quaternions.
      }
    });

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
          id: Math.round(videoState.played * videoState.duration), 
          time: Math.round(videoState.played * videoState.duration), // Frame
          position: {x: object.current.position.x,y: object.current.position.y,z: object.current.position.z},
          rotation: {_x: object.current.rotation._x, _y: object.current.rotation._y, _z: object.current.rotation._z},
          scale: object.current.scale.x
      }
      if (!reviewMode) addAnnotation(dataAnnotation)
      return
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
              rotation={!reviewMode ? rotation : [Math.PI / 2, 0, 0]}
              onPointerUp={(e) => handleTranslation(object.current.position)}
              onClick={annotateFrame}
            /> 
        </group>
        
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
