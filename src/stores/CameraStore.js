import create from "zustand";

const useCameraStore = create((set) => ({
  camPosition: { xCamPos: 5, yCamPos: 5, zCamPos: 8,fov: 4 },

  handleCameraPosition: (newPosition) =>
    set((state) => ({
      camPosition: {
        xCamPos: newPosition.xCamPos,
        yCamPos: newPosition.yCamPos,
        zCamPos: newPosition.zCamPos,
        fov: newPosition.fov,
      },
    })),
}));

export default useCameraStore;