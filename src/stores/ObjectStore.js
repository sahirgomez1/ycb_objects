import create from "zustand";

const useObjectStore = create((set) => ({
  defaultObjects: [
    { name: "Tomato Can", gltfFile: "/tomato_can.gltf" },
    { name: "Banana", gltfFile: "/banana.gltf" },
    { name: "Hammer", gltfFile: "/hammer.gltf" },
    { name: "Screw Driver", gltfFile: "/screwdriver.gltf" },
  ],
  objectSelected: { name: "Banana", gltfFile: "/banana.gltf" },
  objPosition: { x: 0, y: 0.2, z: 0 },
  objRotation: { _x: Math.PI / 2, _y: 0, _z: 0 },
  objScale: 3,
  handleSelectObject: (e) =>
    set((state) => ({
      objectSelected: state.defaultObjects.find((i) => i.name === e),
    })),
  handleTranslation: (newPosition) =>
    set((state) => ({ objPosition: { ...newPosition } })),
  handleRotation: (newRotation) =>
    set((state) => ({
      objRotation: {
        _x: newRotation._x,
        _y: newRotation._y,
        _z: newRotation._z,
      },
    })),
  setObjScale: (scale) => set((state) => ({ objScale: scale })),
}));

export default useObjectStore;
