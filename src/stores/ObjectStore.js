import create from 'zustand';

const useObjectStore = create(set => ({
    objPosition: { x: 0, y: 0.2, z: 0 },
    objRotation: { _x: Math.PI/2, _y: 0, _z: 0 },
    handleTranslation: (newPosition) => set(state => ({ objPosition: {...newPosition} })),
    handleRotation: (newRotation) => set(state => ({ objRotation: {_x: newRotation._x, _y: newRotation._y, _z: newRotation._z, } })),
}))


export { useObjectStore };