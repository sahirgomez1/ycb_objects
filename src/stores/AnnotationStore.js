import create from "zustand";

/**
 * Add new annotation item to the annotations array in the global state, it replaces old annotation or add new one.
 * 
 * @param {Array} list Array of current annotations 
 * @param {Object} annotation New object annotation.
 * @returns 
 */
const addRecord = (list, annotation) => {
  let ann_found = list.some((o) => o.id === annotation.id);   // Check if annotation already exists
  if (!ann_found) {
    list.push(annotation)
    list.sort((a, b) => {
      return a.time - b.time;
    });
    return list;
  } else {
    const modifiedList = list.map((o) => (o.id === annotation.id ? annotation : o));
    modifiedList.sort((a, b) => {
      return a.time - b.time;
    });
    return modifiedList;
  }
}; 

const useAnnotationStore = create((set, get) => ({
  outputAnnotation: {
    url: "",
    videoWidth: 0,
    videoHeight: 0,
    object_3d: "",
    annotations: [],
  },
  reviewMode: false,

  setReviewMode: () => set((state) => ({ reviewMode: !state.reviewMode })),
  setVideoMetadata: (e) =>
    set((state) => ({
      outputAnnotation: {
        ...state.outputAnnotation,
        url: e.props.url,
        videoHeight: e.getInternalPlayer().videoHeight,
        videoWidth: e.getInternalPlayer().videoWidth,
      },
    })),
  setObjectFile: (object) =>
    set((state) => ({
      outputAnnotation: {
        ...state.outputAnnotation,
        object_3d: object.gltfFile,
      },
    })),
  setAnnotationsFromFile: (fileContent) =>
    set((state) => ({ outputAnnotation: fileContent })),
  addAnnotation: (annotation) =>
    set((state) => ({
      outputAnnotation: {
        ...state.outputAnnotation,
        annotations: addRecord(state.outputAnnotation.annotations, annotation),
      },
    })),
  getCurrentAnnotations: () => {
    const currentAnnotations = get().outputAnnotation.annotations;
    return currentAnnotations;
  },
}));

export default useAnnotationStore;
