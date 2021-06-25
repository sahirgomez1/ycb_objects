import create from 'zustand';

const addRecord = (list, annotation) => {
  let ann_found = list.some(o => o.id === annotation.id);
  if (!ann_found) list.push(annotation);
  list.map(o => (o.id === annotation.id) ? annotation : o)
  return list;
}

const useAnnotationStore = create(set => ({
    outputAnnotation : { url: "", videoWidth: 0, videoHeight: 0, annotations:[] },
    addAnnotation : (video_metadata, annotation) => 
        set(state => ({ 
            outputAnnotation: {
                ...state.outputAnnotation,
                url: video_metadata.url, 
                videoWidth: video_metadata.videoWidth, 
                videoHeight: video_metadata.videoHeight, 
                annotations: addRecord(state.outputAnnotation.annotations, annotation)
            }
        })),
  
}))


export { useAnnotationStore };
