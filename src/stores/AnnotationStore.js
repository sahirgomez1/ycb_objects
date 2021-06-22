import create from 'zustand';

const useAnnotationStore = create(set => ({
    outputAnnotation : {url: "https://camera1-video.mp4", videoWidth: 500, videoHeight: 400 },
    addAnnotation : (value) => 
        set(state => ({ 
            outputAnnotation: {
                ...state.outputAnnotation, 
                annotations: [{
                    id:value.id, 
                    position: value.position,
                    rotation: value.rotation
                }] 
            }
        })),
  
}))


export { useAnnotationStore };