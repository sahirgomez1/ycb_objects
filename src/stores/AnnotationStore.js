import create from "zustand";

const addRecord = (list, annotation) => {
  let ann_found = list.some((o) => o.id === annotation.id);   // Check if annotation already exists
  if (!ann_found) {
    list.push(annotation)
    return list;
  } else {
    const modifiedList = list.map((o) => (o.id === annotation.id ? annotation : o));
    return modifiedList;
  }
};

const useAnnotationStore = create((set, get) => ({
  outputAnnotation: { url: "", videoWidth: 0, videoHeight: 0, annotations: [] },
  setVideoMetadata: (e) =>
    set((state) => ({
      outputAnnotation: {
        ...state.outputAnnotation,
        url: e.props.url,
        videoHeight: e.getInternalPlayer().videoHeight,
        videoWidth: e.getInternalPlayer().videoWidth
      },
    })),
  addAnnotation: (annotation) =>
    set(
      (state) => (
        {
          outputAnnotation: {
            ...state.outputAnnotation,
            annotations: addRecord(state.outputAnnotation.annotations, annotation),
          },
        }
      )
    ),
  getCurrentAnnotations: () => {
    const currentAnnotations = get().outputAnnotation.annotations;
    return currentAnnotations;
  },
}));

export { useAnnotationStore };
